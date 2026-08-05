import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { emailCopy } from "@/i18n/emailCopy";

/**
 * A hirdetési landing (/ajanlat) ajánlatkérő végpontja.
 *
 * Ugyanazt csinálja, mint a weboldal /api/send-quote végpontja — belső
 * értesítő az AcuWallnak, visszaigazolás az ügyfélnek, opcionális lead
 * táblázat —, három különbséggel:
 *
 *   1. a Lead ID `ACW-LND-` előtagot kap,
 *   2. a levél tárgya `[Landing]` jelöléssel indul,
 *   3. a Projektleírás első sora „Forrás: Landing (hirdetés)”.
 *
 * FONTOS — az Octopus e-mailből olvassa ki a leadet (LeadIngestor):
 * a mezőcímkék szövege (Név, Épület típusa, Becsült alapterület, …) és a
 * záró „Ez egy automatikus értesítés…” sor nem módosítható, mert azokra
 * illeszkedik a feldolgozó. A címke és az érték maradhat külön sorban,
 * a parser átlép a sortörésen.
 */

interface LandingFormData {
  name: string;
  email: string;
  phone: string;
  location: string;
  projectType: string;
  floorArea: string;
  plotStatus: string;
  needsPlanning: string;
  timeline: string;
  message: string;
  /** Robotcsapda: valódi látogatónál mindig üres. */
  company?: string;
  /** Kitöltéssel töltött idő ezredmásodpercben. */
  elapsedMs?: number;
  /** Hirdetési paraméterek (utm_*, gclid, fbclid, referrer). */
  marketing?: Record<string, string>;
}

const LEAD_SOURCE = "Landing (hirdetés)";
const ADMIN_RECIPIENT = "acuwall@acuwall.hu";

/** Az option kódok magyar címkéi — szó szerint egyeznek a weboldaléval. */
const optionLabels: Record<string, string> = {
  garazs: "Garázs / tároló",
  muhely: "Műhely / csarnok",
  iroda: "Irodaház",
  nyaralo: "Nyaraló",
  lakoepulet: "Lakóház",
  "sajat-fejlesztes": "Saját fejlesztés",
  egyeb: "Egyéb",
  "sajat-telek": "Saját telek rendelkezésre áll",
  "vasarlas-alatt": "Telekvásárlás folyamatban",
  rendezendo: "Tereprendezés / bontás várható",
  "nincs-telek": "Még nincs telek",
  igen: "Igen, kér tervezést",
  "van-terv": "Van kész terve",
  reszben: "Részben van terve",
  "nem-tisztazott": "Még nem tisztázott",
  azonnal: "Azonnal / 1 hónapon belül",
  "1-3-honap": "1-3 hónapon belül",
  "3-6-honap": "3-6 hónapon belül",
  kesobb: "Később",
};

const MARKETING_LABELS: Record<string, string> = {
  utm_source: "Forrás (utm_source)",
  utm_medium: "Csatorna (utm_medium)",
  utm_campaign: "Kampány (utm_campaign)",
  utm_term: "Kulcsszó (utm_term)",
  utm_content: "Hirdetés (utm_content)",
  gclid: "Google kattintás-azonosító",
  fbclid: "Meta kattintás-azonosító",
  msclkid: "Microsoft kattintás-azonosító",
  referrer: "Hivatkozó oldal",
};

/* ------------------------------------------------------------------ */
/* Segédfüggvények                                                     */
/* ------------------------------------------------------------------ */

function escapeHtml(value: string | undefined) {
  return (value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function labelValue(value: string | undefined) {
  if (!value) return "";
  return optionLabels[value] || value;
}

function formatValue(value: string | undefined, suffix = "") {
  const label = labelValue(value);
  if (!label) return "-";
  return `${escapeHtml(label)}${suffix}`;
}

function plainValue(value: string | undefined, suffix = "") {
  if (!value) return "-";
  return `${escapeHtml(value)}${suffix}`;
}

function field(label: string, value: string) {
  return `
    <div class="field">
      <span class="label">${label}:</span>
      <span class="value">${value}</span>
    </div>
  `;
}

function createLeadId() {
  const stamp = new Date()
    .toISOString()
    .replace(/[-:.TZ]/g, "")
    .slice(0, 14);
  const random = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `ACW-LND-${stamp}-${random}`;
}

function estimatePriority(formData: LandingFormData) {
  if (formData.timeline === "azonnal" || formData.timeline === "1-3-honap") return "Magas";
  if (formData.projectType === "lakoepulet" || formData.projectType === "nyaralo") return "Közepes";
  return "Normál";
}

/** A kampányadatokból egysoros összefoglaló a levélhez és a lead táblához. */
function marketingSummary(marketing: Record<string, string> | undefined) {
  if (!marketing) return "";
  const parts = Object.entries(marketing)
    .filter(([, value]) => value)
    .map(([key, value]) => `${MARKETING_LABELS[key] ?? key}: ${value}`);
  return parts.join(" · ");
}

function sanitize(value: unknown, maxLength = 500) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

/* ------------------------------------------------------------------ */
/* Egyszerű visszaélés-védelem                                         */
/* ------------------------------------------------------------------ */

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const recentSubmissions = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const hits = (recentSubmissions.get(ip) ?? []).filter(
    (time) => now - time < RATE_LIMIT_WINDOW_MS
  );
  hits.push(now);
  recentSubmissions.set(ip, hits);

  if (recentSubmissions.size > 500) {
    recentSubmissions.forEach((times, key) => {
      if (times.every((time) => now - time >= RATE_LIMIT_WINDOW_MS)) recentSubmissions.delete(key);
    });
  }

  return hits.length > RATE_LIMIT_MAX;
}

/* ------------------------------------------------------------------ */
/* Lead továbbítás (táblázat és/vagy Octopus)                          */
/* ------------------------------------------------------------------ */

function buildLeadPayload(formData: LandingFormData, leadId: string) {
  return {
    leadId,
    receivedAt: new Date().toISOString(),
    source: LEAD_SOURCE,
    status: "Új lead",
    priority: estimatePriority(formData),
    owner: "",
    nextAction: "Visszahívás / első egyeztetés",
    nextContactDate: "",
    lastContactDate: "",
    quoteStatus: "Nincs ajánlat",
    estimatedProjectValue: "",
    lostReason: "",
    note: marketingSummary(formData.marketing),
    name: formData.name,
    email: formData.email,
    phone: formData.phone,
    location: formData.location,
    projectType: labelValue(formData.projectType),
    floorArea: formData.floorArea,
    plotStatus: labelValue(formData.plotStatus),
    needsPlanning: labelValue(formData.needsPlanning),
    timeline: labelValue(formData.timeline),
    message: formData.message,
  };
}

/** Google Sheets lead tábla — ugyanaz a webhook, mint a weboldalnál. */
async function appendLeadRow(formData: LandingFormData, leadId: string) {
  const webhookUrl = process.env.LEAD_WEBHOOK_URL;
  if (!webhookUrl) return { ok: true, skipped: true as const };

  try {
    const targetUrl = new URL(webhookUrl);
    if (process.env.LEAD_WEBHOOK_SECRET && !targetUrl.searchParams.has("secret")) {
      targetUrl.searchParams.set("secret", process.env.LEAD_WEBHOOK_SECRET);
    }

    const response = await fetch(targetUrl.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.LEAD_WEBHOOK_SECRET
          ? { "X-Lead-Webhook-Secret": process.env.LEAD_WEBHOOK_SECRET }
          : {}),
      },
      body: JSON.stringify(buildLeadPayload(formData, leadId)),
    });

    return response.ok
      ? { ok: true }
      : { ok: false, error: `Lead webhook status ${response.status}` };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "ismeretlen hiba" };
  }
}

/**
 * Közvetlen becsatorna az Octopusba (POST /webhooks/lead).
 * Alapból kikapcsolva: az Octopus e-mailből is beolvassa a leadet, ez csak
 * gyorsabb út. Bekapcsolás: OCTOPUS_LEAD_URL + OCTOPUS_LEAD_TOKEN megadása
 * (az Octopus .env-jében pedig LEADS_WEBHOOK_TOKEN ugyanezzel az értékkel).
 * Az azonos lead_id miatt nem keletkezik dupla projekt.
 */
async function pushToOctopus(formData: LandingFormData, leadId: string, description: string) {
  const url = process.env.OCTOPUS_LEAD_URL;
  const token = process.env.OCTOPUS_LEAD_TOKEN;
  if (!url || !token) return { ok: true, skipped: true as const };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Octopus-Token": token },
      body: JSON.stringify({
        lead_id: leadId,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        building_type: labelValue(formData.projectType),
        area: formData.floorArea ? `${formData.floorArea} m²` : "",
        plot_status: labelValue(formData.plotStatus),
        design_needs: labelValue(formData.needsPlanning),
        planned_start: labelValue(formData.timeline),
        description,
      }),
    });

    return response.ok
      ? { ok: true }
      : { ok: false, error: `Octopus webhook status ${response.status}` };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "ismeretlen hiba" };
  }
}

/* ------------------------------------------------------------------ */
/* Végpont                                                             */
/* ------------------------------------------------------------------ */

export async function POST(request: NextRequest) {
  try {
    const raw = (await request.json()) as Partial<LandingFormData>;

    const formData: LandingFormData = {
      name: sanitize(raw.name, 120),
      email: sanitize(raw.email, 160),
      phone: sanitize(raw.phone, 40),
      location: sanitize(raw.location, 160),
      projectType: sanitize(raw.projectType, 40),
      floorArea: sanitize(raw.floorArea, 10).replace(/\D/g, ""),
      plotStatus: sanitize(raw.plotStatus, 40),
      needsPlanning: sanitize(raw.needsPlanning, 40),
      timeline: sanitize(raw.timeline, 40),
      message: sanitize(raw.message, 4000),
      company: sanitize(raw.company, 100),
      elapsedMs: typeof raw.elapsedMs === "number" ? raw.elapsedMs : 0,
      marketing: Object.fromEntries(
        Object.entries(raw.marketing ?? {})
          .filter(([key]) => key in MARKETING_LABELS)
          .map(([key, value]) => [key, sanitize(value, 300)])
      ),
    };

    // Robot: kitöltötte a rejtett mezőt, vagy emberi tempónál gyorsabb volt.
    if (formData.company || (formData.elapsedMs ?? 0) < 2500) {
      console.warn("Landing lead elutasítva (robotgyanú).");
      return NextResponse.json({ success: true, leadId: "" });
    }

    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "ismeretlen";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, message: "Túl sok próbálkozás. Kérjük, próbálja később." },
        { status: 429 }
      );
    }

    const invalid =
      formData.name.length < 2 ||
      !/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(formData.email) ||
      formData.phone.replace(/\D/g, "").length < 9 ||
      formData.location.length < 2;

    if (invalid) {
      return NextResponse.json(
        { success: false, message: "Hiányos vagy hibás adatok." },
        { status: 422 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) throw new Error("RESEND_API_KEY is missing");
    const resend = new Resend(apiKey);

    const leadId = createLeadId();
    const campaign = marketingSummary(formData.marketing);

    // Ez a szöveg kerül az Octopus projekt leírásába is.
    const descriptionLines = [
      `Forrás: ${LEAD_SOURCE}`,
      campaign ? `Kampány — ${campaign}` : "",
      formData.message,
    ].filter(Boolean);
    const descriptionText = descriptionLines.join("\n");

    const [leadRow, octopus] = await Promise.all([
      appendLeadRow(formData, leadId),
      pushToOctopus(formData, leadId, descriptionText),
    ]);

    if (!leadRow.ok) console.error("Lead tábla hiba:", leadRow.error);
    if (!octopus.ok) console.error("Octopus webhook hiba:", octopus.error);

    const adminFields = [
      field("Lead ID", escapeHtml(leadId)),
      field("Forrás", escapeHtml(LEAD_SOURCE)),
      field("Név", formatValue(formData.name)),
      field("Email", formatValue(formData.email)),
      field("Telefonszám", formatValue(formData.phone)),
      field("Projekt helyszíne", formatValue(formData.location)),
      field("Épület típusa", formatValue(formData.projectType)),
      field("Becsült alapterület", formatValue(formData.floorArea, " m²")),
      field("Telek állapota", formatValue(formData.plotStatus)),
      field("Szükséges tervezés / statika", formatValue(formData.needsPlanning)),
      field("Tervezett indulás", formatValue(formData.timeline)),
      campaign ? field("Kampány", escapeHtml(campaign)) : "",
    ].join("");

    // A Projektleírás blokk zárja a levelet — az Octopus innen olvassa ki a
    // leírást, egészen az „Ez egy automatikus…” sorig.
    const descriptionHtml = `
        <div class="field">
          <span class="label">Projektleírás:</span>
          <div class="value">${escapeHtml(descriptionText).replace(/\n/g, "<br>")}</div>
        </div>
      `;

    const adminEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 640px; margin: 0 auto; padding: 20px; }
            .header { background-color: #E8380D; color: white; padding: 22px; text-align: center; }
            .badge { display: inline-block; background: rgba(255,255,255,0.2); border-radius: 999px; padding: 4px 12px; font-size: 12px; letter-spacing: 1px; }
            .content { background-color: #f9f9f9; padding: 24px; }
            .field { margin-bottom: 14px; }
            .label { font-weight: bold; color: #0D1B2E; display: inline-block; min-width: 190px; }
            .value { color: #555; }
            .notice { background: #fff7ed; border: 1px solid #fed7aa; padding: 12px; margin-bottom: 16px; color: #9a3412; }
            .footer { text-align: center; padding: 20px; color: #999; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <span class="badge">LANDING</span>
              <h1>Új építési ajánlatkérés érkezett</h1>
            </div>
            <div class="content">
              ${
                leadRow.ok
                  ? ""
                  : `<div class="notice">Figyelem: a lead tábla rögzítés hibára futott. Az email ettől még megérkezett.</div>`
              }
              ${adminFields}
              ${descriptionHtml}
            </div>
            <div class="footer">
              <p>Ez egy automatikus értesítés az AcuWall ajánlatkérő űrlapjáról.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const copy = emailCopy.hu;

    const customerEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 640px; margin: 0 auto; padding: 20px; }
            .header { background-color: #E8380D; color: white; padding: 30px; text-align: center; }
            .content { background-color: #f9f9f9; padding: 30px; }
            .footer { text-align: center; padding: 20px; color: #999; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>${copy.heading}</h1>
            </div>
            <div class="content">
              <p>${escapeHtml(copy.greeting(formData.name))}</p>
              <p>${copy.intro}</p>
              <p>${copy.received} <strong>${copy.receivedStrong}</strong> ${copy.receivedAfter}</p>
              <p>${copy.summaryTitle}</p>
              <ul>
                <li>${copy.labels.location}: ${plainValue(formData.location)}</li>
                <li>${copy.labels.buildingType}: ${formatValue(formData.projectType)}</li>
                <li>${copy.labels.floorArea}: ${plainValue(formData.floorArea, " m²")}</li>
                <li>${copy.labels.timeline}: ${formatValue(formData.timeline)}</li>
              </ul>
              <p>${copy.nextStep}</p>
              <p>${copy.urgent} <strong>+36 30 830 5556</strong>${copy.urgentAfter}</p>
              <p style="margin-top: 30px;">${copy.regards}<br><strong>${copy.team}</strong></p>
            </div>
            <div class="footer">
              <p>${copy.footerMotto}</p>
              <p>${copy.footerContact}</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const fromAddress = process.env.RESEND_FROM_EMAIL || "AcuWall <onboarding@resend.dev>";

    const adminEmail = await resend.emails.send({
      from: fromAddress,
      to: [ADMIN_RECIPIENT],
      replyTo: formData.email,
      subject: `[Landing] Új építési ajánlatkérés - ${formData.name}`,
      html: adminEmailHtml,
    });

    if (adminEmail.error) {
      throw new Error(adminEmail.error.message || "Az értesítő levél küldése nem sikerült");
    }

    // A visszaigazolás hibája ne bukhassa meg a beküldést: a lead már megvan.
    const customerEmail = await resend.emails
      .send({
        from: fromAddress,
        to: [formData.email],
        subject: copy.subject,
        html: customerEmailHtml,
      })
      .catch((error) => {
        console.error("Visszaigazoló levél hiba:", error);
        return null;
      });

    return NextResponse.json({
      success: true,
      leadId,
      leadRowSaved: leadRow.ok && !("skipped" in leadRow),
      octopusPushed: octopus.ok && !("skipped" in octopus),
      adminEmailId: adminEmail.data?.id,
      customerEmailId: customerEmail?.data?.id,
    });
  } catch (error) {
    console.error("Landing ajánlatkérés hiba:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Nem sikerült elküldeni az ajánlatkérést.",
        error: error instanceof Error ? error.message : "ismeretlen hiba",
      },
      { status: 500 }
    );
  }
}
