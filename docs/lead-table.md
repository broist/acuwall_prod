# AcuWall lead tábla

Az ajánlatkérő rendszer emailt küld az AcuWallnak, visszaigazolást küld az ügyfélnek, és opcionálisan rögzíti a leadet egy Google Sheets táblázatba.

## Javasolt oszlopok

Ezeket az oszlopokat hozd létre a Google Sheets első sorában, ebben a sorrendben:

```text
Lead ID
Érkezés dátuma
Forrás
Lead státusz
Prioritás
Felelős
Következő teendő
Következő kapcsolat dátuma
Utolsó kapcsolat dátuma
Ajánlat státusz
Becsült projektérték
Elvesztés oka
Belső megjegyzés
Név
Email
Telefon
Projekt helyszíne
Épület típusa
Becsült alapterület
Rendeltetés
Készültségi szint
Telek státusz
Hatósági státusz
Gépészet / elektromos
Van terv / vázlat
Tervezett indulás
Projektleírás
```

## Google Apps Script webhook

Google Sheetsben: `Extensions` -> `Apps Script`, majd illeszd be ezt a kódot.

```js
const SHEET_NAME = "Leads";
const WEBHOOK_SECRET = "change-this-secret";

function doPost(e) {
  const secret = e.parameter.secret || "";
  if (secret !== WEBHOOK_SECRET) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: "Unauthorized" }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  const data = JSON.parse(e.postData.contents);
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

  sheet.appendRow([
    data.leadId,
    data.receivedAt,
    data.source,
    data.status,
    data.priority,
    data.owner,
    data.nextAction,
    data.nextContactDate,
    data.lastContactDate,
    data.quoteStatus,
    data.estimatedProjectValue,
    data.lostReason,
    data.note,
    data.name,
    data.email,
    data.phone,
    data.location,
    data.projectType,
    data.floorArea,
    data.intendedUse,
    data.readinessLevel,
    data.plotStatus,
    data.authorityStatus,
    data.needsUtilities,
    data.hasPlans,
    data.timeline,
    data.message,
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, leadId: data.leadId }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

Deploy: `Deploy` -> `New deployment` -> `Web app`.

Beállítás:

```text
Execute as: Me
Who has access: Anyone
```

Az elkészült Web app URL-t mentsd el. A Next API automatikusan hozzáteszi a `secret` query paramétert a `LEAD_WEBHOOK_SECRET` alapján.

```text
https://script.google.com/macros/s/....../exec
```

Ezt állítsd be a szerveren:

```env
LEAD_WEBHOOK_URL=https://script.google.com/macros/s/....../exec
LEAD_WEBHOOK_SECRET=change-this-secret
```

Megjegyzés: a Next API elküldi a `X-Lead-Webhook-Secret` headert is, de az Apps Script web app környezetben a header olvasása nem mindig megbízható. Ezért a Next API a `secret` query paramétert is hozzáfűzi, a fenti script pedig azt ellenőrzi.

## Üzleti működés

Beküldéskor a rendszer automatikusan ezeket állítja:

- `Lead státusz`: `Új lead`
- `Ajánlat státusz`: `Nincs ajánlat`
- `Következő teendő`: `Visszahívás / első egyeztetés`
- `Prioritás`: időzítés és projekttípus alapján automatikus előszűrés

Ha a lead tábla webhook hibázik, az email küldés ettől még lefut. Ez azért fontos, hogy egy Google Sheets hiba ne blokkolja az ajánlatkérést.
