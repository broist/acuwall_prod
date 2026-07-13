import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Fence/Wall quote form data
interface FenceQuoteFormData {
  name: string;
  email: string;
  phone: string;
  location: string;
  wallLength: string;
  wallHeight: string;
  needsConstruction: string;
  needsDemolition: string;
  needsTerrainWork: string;
  isFlat: string;
  message: string;
  type?: string;
}

// Safety quote form data
interface SafetyQuoteFormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
  type: string;
}

type QuoteFormData = FenceQuoteFormData | SafetyQuoteFormData;

function isSafetyQuote(data: QuoteFormData): data is SafetyQuoteFormData {
  return (data as SafetyQuoteFormData).type === "safety";
}

export async function POST(request: NextRequest) {
  try {
    const formData: QuoteFormData = await request.json();
    const isSafety = isSafetyQuote(formData);

    // Determine email subject and type
    const quoteType = isSafety ? "Munkavédelem" : "Kerítés";
    const emailSubject = `Új ajánlatkérés - ${quoteType}`;

    // Admin email HTML - different templates based on type
    let adminEmailHtml: string;

    if (isSafety) {
      // Safety quote template (simple)
      adminEmailHtml = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #FF3000; color: white; padding: 20px; text-align: center; }
              .type-badge { background-color: #FF5528; display: inline-block; padding: 8px 16px; border-radius: 20px; font-size: 14px; margin-top: 10px; }
              .content { background-color: #f9f9f9; padding: 20px; }
              .field { margin-bottom: 15px; }
              .label { font-weight: bold; color: #0F172A; }
              .value { color: #555; }
              .message-box { background-color: #fff; border-left: 4px solid #FF3000; padding: 15px; margin-top: 10px; }
              .footer { text-align: center; padding: 20px; color: #999; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Új munkavédelmi ajánlatkérés</h1>
                <div class="type-badge">🛡️ MUNKAVÉDELEM</div>
              </div>
              <div class="content">
                <div class="field">
                  <span class="label">Név:</span>
                  <span class="value">${formData.name}</span>
                </div>
                <div class="field">
                  <span class="label">Cégnév:</span>
                  <span class="value">${formData.company}</span>
                </div>
                <div class="field">
                  <span class="label">Email:</span>
                  <span class="value">${formData.email}</span>
                </div>
                <div class="field">
                  <span class="label">Telefonszám:</span>
                  <span class="value">${formData.phone}</span>
                </div>
                ${formData.message ? `
                <div class="field">
                  <span class="label">Üzenet:</span>
                  <div class="message-box">${formData.message.replace(/\n/g, '<br>')}</div>
                </div>
                ` : ''}
              </div>
              <div class="footer">
                <p>Ez egy automatikus értesítés az AcuWall munkavédelmi ajánlatkérési rendszerből.</p>
              </div>
            </div>
          </body>
        </html>
      `;
    } else {
      // Fence/Wall quote template (detailed)
      const fenceData = formData as FenceQuoteFormData;
      adminEmailHtml = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #FF3000; color: white; padding: 20px; text-align: center; }
              .type-badge { background-color: #FF5528; display: inline-block; padding: 8px 16px; border-radius: 20px; font-size: 14px; margin-top: 10px; }
              .content { background-color: #f9f9f9; padding: 20px; }
              .field { margin-bottom: 15px; }
              .label { font-weight: bold; color: #0F172A; }
              .value { color: #555; }
              .message-box { background-color: #fff; border-left: 4px solid #FF3000; padding: 15px; margin-top: 10px; }
              .footer { text-align: center; padding: 20px; color: #999; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Új kerítés/zajvédő fal ajánlatkérés</h1>
                <div class="type-badge">🧱 KERÍTÉS</div>
              </div>
              <div class="content">
                <div class="field">
                  <span class="label">Név:</span>
                  <span class="value">${fenceData.name}</span>
                </div>
                <div class="field">
                  <span class="label">Email:</span>
                  <span class="value">${fenceData.email}</span>
                </div>
                <div class="field">
                  <span class="label">Telefonszám:</span>
                  <span class="value">${fenceData.phone}</span>
                </div>
                <div class="field">
                  <span class="label">Projekt helyszíne:</span>
                  <span class="value">${fenceData.location}</span>
                </div>
                <div class="field">
                  <span class="label">Fal hossza:</span>
                  <span class="value">${fenceData.wallLength} méter</span>
                </div>
                <div class="field">
                  <span class="label">Fal magassága:</span>
                  <span class="value">${fenceData.wallHeight} méter</span>
                </div>
                <div class="field">
                  <span class="label">Szükséges kivitelezés:</span>
                  <span class="value">${fenceData.needsConstruction}</span>
                </div>
                <div class="field">
                  <span class="label">Bontási munka szükséges:</span>
                  <span class="value">${fenceData.needsDemolition}</span>
                </div>
                <div class="field">
                  <span class="label">Tereprendezés szükséges:</span>
                  <span class="value">${fenceData.needsTerrainWork}</span>
                </div>
                <div class="field">
                  <span class="label">A terület jelenleg sík:</span>
                  <span class="value">${fenceData.isFlat}</span>
                </div>
                ${fenceData.message ? `
                <div class="field">
                  <span class="label">Üzenet:</span>
                  <div class="message-box">${fenceData.message.replace(/\n/g, '<br>')}</div>
                </div>
                ` : ''}
              </div>
              <div class="footer">
                <p>Ez egy automatikus értesítés az AcuWall kerítés ajánlatkérési rendszerből.</p>
              </div>
            </div>
          </body>
        </html>
      `;
    }

    // Customer confirmation email HTML - same for both types
    let customerEmailHtml: string;
    
    if (isSafety) {
      customerEmailHtml = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #FF3000; color: white; padding: 30px; text-align: center; }
              .content { background-color: #f9f9f9; padding: 30px; }
              .footer { text-align: center; padding: 20px; color: #999; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Köszönjük ajánlatkérését!</h1>
              </div>
              <div class="content">
                <p>Kedves ${formData.name}!</p>
                <p>Köszönjük, hogy érdeklődik az AcuWall munkavédelmi szolgáltatásai iránt.</p>
                <p>Ajánlatkérését sikeresen megkaptuk, és munkatársunk <strong>24 órán belül</strong> felveszi Önnel a kapcsolatot a megadott elérhetőségeken.</p>
                <p>Ha bármilyen sürgős kérdése van, kérjük, hívjon minket a <strong>+36 30 830 5556</strong> telefonszámon.</p>
                <p style="margin-top: 30px;">Üdvözlettel,<br><strong>AcuWall csapata</strong></p>
              </div>
              <div class="footer">
                <p>AcuWall - Biztonság minden szinten.</p>
                <p>Email: acuwall@acuwall.hu | Telefon: +36 30 830 5556</p>
              </div>
            </div>
          </body>
        </html>
      `;
    } else {
      const fenceData = formData as FenceQuoteFormData;
      customerEmailHtml = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #FF3000; color: white; padding: 30px; text-align: center; }
              .content { background-color: #f9f9f9; padding: 30px; }
              .footer { text-align: center; padding: 20px; color: #999; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Köszönjük ajánlatkérését!</h1>
              </div>
              <div class="content">
                <p>Kedves ${fenceData.name}!</p>
                <p>Köszönjük, hogy érdeklődik az AcuWall zajvédő falrendszere iránt.</p>
                <p>Ajánlatkérését sikeresen megkaptuk, és munkatársunk <strong>24 órán belül</strong> felveszi Önnel a kapcsolatot a megadott elérhetőségeken.</p>
                <p>A projekt részletei:</p>
                <ul>
                  <li>Helyszín: ${fenceData.location}</li>
                  <li>Fal méretei: ${fenceData.wallLength}m × ${fenceData.wallHeight}m</li>
                </ul>
                <p>Ha bármilyen sürgős kérdése van, kérjük, hívjon minket a <strong>+36 30 830 5556</strong> telefonszámon.</p>
                <p style="margin-top: 30px;">Üdvözlettel,<br><strong>AcuWall csapata</strong></p>
              </div>
              <div class="footer">
                <p>AcuWall - Csend. Tartósság. Professzionális zajvédelem.</p>
                <p>Email: acuwall@acuwall.hu | Telefon: +36 30 830 5556</p>
              </div>
            </div>
          </body>
        </html>
      `;
    }

    // Send admin email
    const adminEmail = await resend.emails.send({
      from: "AcuWall Ajánlatkérés <onboarding@resend.dev>",
      to: ["acuwall@acuwall.hu"],
      subject: emailSubject,
      html: adminEmailHtml,
    });

    // Send customer confirmation email
    const customerEmail = await resend.emails.send({
      from: "AcuWall <onboarding@resend.dev>",
      to: [formData.email],
      subject: "Ajánlatkérés visszaigazolás - AcuWall",
      html: customerEmailHtml,
    });

    return NextResponse.json({
      success: true,
      message: "Emails sent successfully",
      adminEmailId: adminEmail.data?.id,
      customerEmailId: customerEmail.data?.id,
    });
  } catch (error) {
    console.error("Error sending emails:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to send emails",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
