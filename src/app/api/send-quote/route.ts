import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

interface QuoteFormData {
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
}

interface LeadAppendResult {
  ok: boolean;
  leadId: string;
  skipped?: boolean;
  error?: string;
}

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

function field(label: string, value: string) {
  return `
    <div class="field">
      <span class="label">${label}:</span>
      <span class="value">${value}</span>
    </div>
  `;
}

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is missing");
  }

  return new Resend(apiKey);
}

function createLeadId() {
  const stamp = new Date().toISOString().replace(/[-:.TZ]/g, "").slice(0, 14);
  const random = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `ACW-${stamp}-${random}`;
}

function estimatePriority(formData: QuoteFormData) {
  if (formData.timeline === "azonnal" || formData.timeline === "1-3-honap") {
    return "Magas";
  }

  if (formData.projectType === "lakoepulet" || formData.projectType === "nyaralo") {
    return "Közepes";
  }

  return "Normál";
}

function buildLeadPayload(formData: QuoteFormData, leadId: string) {
  return {
    leadId,
    receivedAt: new Date().toISOString(),
    source: "Weboldal ajánlatkérő",
    status: "Új lead",
    priority: estimatePriority(formData),
    owner: "",
    nextAction: "Visszahívás / első egyeztetés",
    nextContactDate: "",
    lastContactDate: "",
    quoteStatus: "Nincs ajánlat",
    estimatedProjectValue: "",
    lostReason: "",
    note: "",
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

async function appendLead(formData: QuoteFormData, leadId: string): Promise<LeadAppendResult> {
  const webhookUrl = process.env.LEAD_WEBHOOK_URL;
  if (!webhookUrl) {
    return { ok: true, leadId, skipped: true };
  }

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

    if (!response.ok) {
      return {
        ok: false,
        leadId,
        error: `Lead webhook failed with status ${response.status}`,
      };
    }

    return { ok: true, leadId };
  } catch (error) {
    return {
      ok: false,
      leadId,
      error: error instanceof Error ? error.message : "Unknown lead webhook error",
    };
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData: QuoteFormData = await request.json();
    const resend = getResendClient();
    const leadId = createLeadId();
    const leadResult = await appendLead(formData, leadId);

    if (!leadResult.ok) {
      console.error("Lead append failed:", leadResult.error);
    }

    const adminFields = [
      field("Lead ID", escapeHtml(leadId)),
      field("Név", formatValue(formData.name)),
      field("Email", formatValue(formData.email)),
      field("Telefonszám", formatValue(formData.phone)),
      field("Projekt helyszíne", formatValue(formData.location)),
      field("Épület típusa", formatValue(formData.projectType)),
      field("Becsült alapterület", formatValue(formData.floorArea, " m²")),
      field("Telek állapota", formatValue(formData.plotStatus)),
      field("Szükséges tervezés / statika", formatValue(formData.needsPlanning)),
      field("Tervezett indulás", formatValue(formData.timeline)),
    ];

    const messageHtml = formData.message
      ? `
        <div class="field">
          <span class="label">Projektleírás:</span>
          <div class="value">${escapeHtml(formData.message).replace(/\n/g, "<br>")}</div>
        </div>
      `
      : "";

    const adminEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 640px; margin: 0 auto; padding: 20px; }
            .header { background-color: #E8380D; color: white; padding: 22px; text-align: center; }
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
              <h1>Új építési ajánlatkérés érkezett</h1>
            </div>
            <div class="content">
              ${
                leadResult.ok && !leadResult.skipped
                  ? ""
                  : `<div class="notice">Figyelem: a lead tábla rögzítés ${
                      leadResult.skipped ? "nincs bekapcsolva" : "hibára futott"
                    }. Az email ettől még megérkezett.</div>`
              }
              ${adminFields.join("")}
              ${messageHtml}
            </div>
            <div class="footer">
              <p>Ez egy automatikus értesítés az AcuWall ajánlatkérő űrlapjáról.</p>
            </div>
          </div>
        </body>
      </html>
    `;

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
              <h1>Köszönjük a projektadatokat!</h1>
            </div>
            <div class="content">
              <p>Kedves ${formatValue(formData.name)}!</p>
              <p>Köszönjük, hogy az AcuWall kulcsrakész, könnyűszerkezetes épület kivitelezése iránt érdeklődik.</p>
              <p>Az adatlapot megkaptuk, és munkatársunk <strong>24 órán belül</strong> személyesen felveszi Önnel a kapcsolatot a megadott elérhetőségeken.</p>
              <p>A projekt röviden:</p>
              <ul>
                <li>Helyszín: ${formatValue(formData.location)}</li>
                <li>Épülettípus: ${formatValue(formData.projectType)}</li>
                <li>Alapterület: ${formatValue(formData.floorArea, " m²")}</li>
                <li>Tervezett indulás: ${formatValue(formData.timeline)}</li>
              </ul>
              <p>A következő egyeztetésen a műszaki tartalmat, a hatósági utat, a telekállapotot és az ütemezést pontosítjuk.</p>
              <p>Ha sürgős kérdése van, hívjon minket a <strong>+36 30 830 5556</strong> telefonszámon.</p>
              <p style="margin-top: 30px;">Üdvözlettel,<br><strong>AcuWall csapata</strong></p>
            </div>
            <div class="footer">
              <p>AcuWall — Építsünk együtt.</p>
              <p>Email: acuwall@acuwall.hu | Telefon: +36 30 830 5556</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const adminEmail = await resend.emails.send({
      from: "AcuWall Ajánlatkérés <onboarding@resend.dev>",
      to: ["acuwall@acuwall.hu"],
      subject: `Új építési ajánlatkérés - ${formData.name}`,
      html: adminEmailHtml,
    });

    const customerEmail = await resend.emails.send({
      from: "AcuWall <onboarding@resend.dev>",
      to: [formData.email],
      subject: "Ajánlatkérés visszaigazolás - AcuWall",
      html: customerEmailHtml,
    });

    return NextResponse.json({
      success: true,
      message: "Emails sent successfully",
      leadId,
      leadSaved: leadResult.ok && !leadResult.skipped,
      leadSkipped: Boolean(leadResult.skipped),
      adminEmailId: adminEmail.data?.id,
      customerEmailId: customerEmail.data?.id,
    });
  } catch (error) {
    console.error("Error sending quote request:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to send quote request",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
