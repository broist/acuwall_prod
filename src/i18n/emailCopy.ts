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
      "Köszönjük, hogy az AcuWall kulcsrakész generálkivitelezése iránt érdeklődik.",
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
      "Thank you for your interest in AcuWall's turnkey general contracting.",
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
};
