import type { Locale } from "./config";

/**
 * Az ügyfélnek küldött visszaigazoló e-mail szövegei.
 * Az AcuWall-nak érkező belső értesítő szándékosan mindig magyar marad.
 */
type EmailCopy = {
  subject: string;
  heading: string;
  greeting: (name: string) => string;
  intro: string;
  received: string;
  receivedStrong: string;
  receivedAfter: string;
  summaryTitle: string;
  labels: {
    location: string;
    buildingType: string;
    floorArea: string;
    timeline: string;
  };
  nextStep: string;
  urgent: string;
  urgentAfter: string;
  regards: string;
  team: string;
  footerMotto: string;
  footerContact: string;
};

export const emailCopy: Record<Locale, EmailCopy> = {
  hu: {
    subject: "Ajánlatkérés visszaigazolás - AcuWall",
    heading: "Köszönjük a projektadatokat!",
    greeting: (name) => `Kedves ${name}!`,
    intro:
      "Köszönjük, hogy az AcuWall kulcsrakész, könnyűszerkezetes épület kivitelezése iránt érdeklődik.",
    received: "Az adatlapot megkaptuk, és munkatársunk",
    receivedStrong: "24 órán belül",
    receivedAfter: "személyesen felveszi Önnel a kapcsolatot a megadott elérhetőségeken.",
    summaryTitle: "A projekt röviden:",
    labels: {
      location: "Helyszín",
      buildingType: "Épülettípus",
      floorArea: "Alapterület",
      timeline: "Tervezett indulás",
    },
    nextStep:
      "A következő egyeztetésen a műszaki tartalmat, a hatósági utat, a telekállapotot és az ütemezést pontosítjuk.",
    urgent: "Ha sürgős kérdése van, hívjon minket a",
    urgentAfter: "telefonszámon.",
    regards: "Üdvözlettel,",
    team: "AcuWall csapata",
    footerMotto: "AcuWall — Építsünk együtt.",
    footerContact: "Email: acuwall@acuwall.hu | Telefon: +36 30 830 5556",
  },

  en: {
    subject: "Quote request confirmation - AcuWall",
    heading: "Thank you for your project details!",
    greeting: (name) => `Dear ${name},`,
    intro:
      "Thank you for your interest in AcuWall's turnkey lightweight steel construction.",
    received: "We have received your form and a member of our team will contact you personally",
    receivedStrong: "within 24 hours",
    receivedAfter: "using the contact details you provided.",
    summaryTitle: "Your project in brief:",
    labels: {
      location: "Location",
      buildingType: "Type of building",
      floorArea: "Floor area",
      timeline: "Planned start",
    },
    nextStep:
      "In our next conversation we will clarify the technical scope, the permit process, the status of the plot and the schedule.",
    urgent: "If you have an urgent question, call us on",
    urgentAfter: ".",
    regards: "Kind regards,",
    team: "The AcuWall team",
    footerMotto: "AcuWall — Let's build together.",
    footerContact: "Email: acuwall@acuwall.hu | Phone: +36 30 830 5556",
  },

  de: {
    subject: "Bestätigung Ihrer Anfrage - AcuWall",
    heading: "Vielen Dank für Ihre Projektdaten!",
    greeting: (name) => `Sehr geehrte(r) ${name},`,
    intro:
      "vielen Dank für Ihr Interesse an der schlüsselfertigen Ausführung von Gebäuden in Stahlleichtbauweise durch AcuWall.",
    received: "Wir haben Ihr Formular erhalten und unser Mitarbeiter meldet sich",
    receivedStrong: "innerhalb von 24 Stunden",
    receivedAfter: "persönlich über die angegebenen Kontaktdaten bei Ihnen.",
    summaryTitle: "Ihr Projekt in Kürze:",
    labels: {
      location: "Standort",
      buildingType: "Gebäudetyp",
      floorArea: "Grundfläche",
      timeline: "Geplanter Baubeginn",
    },
    nextStep:
      "Im nächsten Gespräch präzisieren wir den technischen Umfang, den Genehmigungsweg, den Zustand des Grundstücks und den Zeitplan.",
    urgent: "Bei dringenden Fragen rufen Sie uns bitte unter",
    urgentAfter: "an.",
    regards: "Mit freundlichen Grüßen,",
    team: "Ihr AcuWall-Team",
    footerMotto: "AcuWall — Bauen wir gemeinsam.",
    footerContact: "E-Mail: acuwall@acuwall.hu | Telefon: +36 30 830 5556",
  },

  pl: {
    subject: "Potwierdzenie zapytania ofertowego - AcuWall",
    heading: "Dziękujemy za dane projektu!",
    greeting: (name) => `Szanowni Państwo, ${name},`,
    intro:
      "dziękujemy za zainteresowanie realizacją budynków w lekkiej konstrukcji stalowej pod klucz przez AcuWall.",
    received: "Otrzymaliśmy formularz, a nasz pracownik skontaktuje się z Państwem osobiście",
    receivedStrong: "w ciągu 24 godzin",
    receivedAfter: "na podane dane kontaktowe.",
    summaryTitle: "Projekt w skrócie:",
    labels: {
      location: "Lokalizacja",
      buildingType: "Typ budynku",
      floorArea: "Powierzchnia",
      timeline: "Planowany start",
    },
    nextStep:
      "Podczas kolejnej rozmowy doprecyzujemy zakres techniczny, ścieżkę urzędową, status działki i harmonogram.",
    urgent: "W pilnych sprawach prosimy o telefon pod numer",
    urgentAfter: ".",
    regards: "Z poważaniem,",
    team: "Zespół AcuWall",
    footerMotto: "AcuWall — Budujmy razem.",
    footerContact: "E-mail: acuwall@acuwall.hu | Telefon: +36 30 830 5556",
  },

  hr: {
    subject: "Potvrda upita za ponudu - AcuWall",
    heading: "Hvala na podacima o projektu!",
    greeting: (name) => `Poštovani ${name},`,
    intro:
      "hvala na interesu za izvedbu montažnih čeličnih zgrada po sistemu ključ u ruke tvrtke AcuWall.",
    received: "Zaprimili smo vaš obrazac, a naš djelatnik javit će vam se osobno",
    receivedStrong: "u roku od 24 sata",
    receivedAfter: "na navedene kontakte.",
    summaryTitle: "Projekt ukratko:",
    labels: {
      location: "Lokacija",
      buildingType: "Vrsta zgrade",
      floorArea: "Površina",
      timeline: "Planirani početak",
    },
    nextStep:
      "Na sljedećem sastanku precizirat ćemo tehnički opseg, postupak pred nadležnim tijelima, stanje parcele i vremenski plan.",
    urgent: "Ako imate hitno pitanje, nazovite nas na broj",
    urgentAfter: ".",
    regards: "Srdačan pozdrav,",
    team: "Tim AcuWall",
    footerMotto: "AcuWall — Gradimo zajedno.",
    footerContact: "E-mail: acuwall@acuwall.hu | Telefon: +36 30 830 5556",
  },
};
