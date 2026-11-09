import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

/**
 * A hirdetési landing (/ajanlat) „Inkább visszahívjuk" végpontja.
 *
 * Aki a kérdéssor közben megakad, vagy inkább beszélne valakivel, csak a
 * telefonszámát hagyja meg — így nem vész el az érdeklődő. A levél az
 * AcuWallnak megy, az addig megadott válaszokkal.
 *
 * FONTOS: a levél szándékosan NEM tartalmaz „Lead ID:" sort és az
 * ajánlatkérő mezőcímkéit (Név, Épület típusa, …), mert az Octopus ezekből
 * ismeri fel és olvassa be az ajánlatkéréseket. Egy részleges, telefonszám
 * nélküli adatsorból hibás projekt jönne létre — a visszahívási kérést
 * a kollégák kézzel viszik tovább.
 */

const ADMIN_RECIPIENT = "acuwall@acuwall.hu";

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
  utm_source: "Forrás",
  utm_medium: "Csatorna",
  utm_campaign: "Kampány",
  utm_term: "Kulcsszó",
  utm_content: "Hirdetés",
  gclid: "Google kattintás-azonosító",
  fbclid: "Meta kattintás-azonosító",
  msclkid: "Microsoft kattintás-azonosító",
  referrer: "Hivatkozó oldal",
};

function sanitize(value: unknown, maxLength = 200) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 4;
const recentRequests = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const hits = (recentRequests.get(ip) ?? []).filter((time) => now - time < RATE_LIMIT_WINDOW_MS);
  hits.push(now);
  recentRequests.set(ip, hits);

  if (recentRequests.size > 500) {
    recentRequests.forEach((times, key) => {
      if (times.every((time) => now - time >= RATE_LIMIT_WINDOW_MS)) recentRequests.delete(key);
    });
  }

  return hits.length > RATE_LIMIT_MAX;
}

export async function POST(request: NextRequest) {
  try {
    const raw = (await request.json()) as Record<string, unknown>;

    const phone = sanitize(raw.phone, 40);
    const name = sanitize(raw.name, 120);
    const company = sanitize(raw.company, 100);
    const elapsedMs = typeof raw.elapsedMs === "number" ? raw.elapsedMs : 0;

    // Robot: kitöltötte a rejtett mezőt, vagy emberi tempónál gyorsabb volt.
    if (company || elapsedMs < 1500) {
      console.warn("Visszahívási kérés elutasítva (robotgyanú).");
      return NextResponse.json({ success: true });
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

    if (phone.replace(/\D/g, "").length < 9 || !/^[+\d\s()/-]+$/.test(phone)) {
      return NextResponse.json(
        { success: false, message: "Adjon meg egy érvényes telefonszámot." },
        { status: 422 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) throw new Error("RESEND_API_KEY is missing");

    const answers = [
      ["Mit építene", optionLabels[sanitize(raw.projectType, 40)]],
      ["Mekkora (m²)", sanitize(raw.floorArea, 10).replace(/\D/g, "")],
      ["Telek", optionLabels[sanitize(raw.plotStatus, 40)]],
      ["Terv / statika", optionLabels[sanitize(raw.needsPlanning, 40)]],
      ["Indulás", optionLabels[sanitize(raw.timeline, 40)]],
      ["Település", sanitize(raw.location, 160)],
    ].filter(([, value]) => value) as [string, string][];

    const marketing = Object.entries((raw.marketing ?? {}) as Record<string, unknown>)
      .filter(([key]) => key in MARKETING_LABELS)
      .map(([key, value]) => `${MARKETING_LABELS[key]}: ${sanitize(value, 300)}`)
      .filter((line) => !line.endsWith(": "));

    const rows = [
      `<p><strong>Telefon:</strong> <a href="tel:${escapeHtml(phone.replace(/[^\d+]/g, ""))}">${escapeHtml(phone)}</a></p>`,
      name ? `<p><strong>Megszólítás:</strong> ${escapeHtml(name)}</p>` : "",
      answers.length
        ? `<p><strong>Eddig megadott válaszok:</strong></p><ul>${answers
            .map(([label, value]) => `<li>${escapeHtml(label)}: ${escapeHtml(value)}</li>`)
            .join("")}</ul>`
        : "<p>A kérdéssorból még nem adott meg semmit.</p>",
      marketing.length ? `<p style="color:#777">${escapeHtml(marketing.join(" · "))}</p>` : "",
    ].join("");

    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"></head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 560px; margin: 0 auto; padding: 20px;">
          <div style="background:#E8380D;color:#fff;padding:18px;text-align:center;">
            <strong>LANDING · VISSZAHÍVÁSI KÉRÉS</strong>
          </div>
          <div style="background:#f9f9f9;padding:22px;">
            <p>Valaki a kérdéssor helyett inkább visszahívást kért. Hívjuk fel minél előbb.</p>
            ${rows}
          </div>
        </div>
      </body></html>`;

    const resend = new Resend(apiKey);
    const sent = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "AcuWall <onboarding@resend.dev>",
      to: [ADMIN_RECIPIENT],
      subject: `[Landing] Visszahívási kérés – ${phone}`,
      html,
    });

    if (sent.error) throw new Error(sent.error.message || "A levél küldése nem sikerült");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Landing visszahívási kérés hiba:", error);
    return NextResponse.json(
      { success: false, message: "Nem sikerült elküldeni a kérést." },
      { status: 500 }
    );
  }
}
