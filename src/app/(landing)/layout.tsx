import type { Metadata } from "next";
import "../globals.css";
import "./landing.css";

const TITLE = "Ajánlatkérés – generálkivitelezés kulcsrakészen | AcuWall";
const DESCRIPTION =
  "Garázstól a lakóházig: megtervezzük és fel is építjük. Mondja el pár kattintásban, mit tervez — 24 órán belül személyesen válaszolunk. Ingyenes, nem kötelezi semmire.";

/**
 * A hirdetési landing SAJÁT gyökér-elrendezése.
 *
 * Ez a Next.js "több gyökér-layout" mintája: a weboldal oldalai a (site)
 * csoportban futnak a fejléccel, lábléccel és a nyelvváltóval, a landing pedig
 * itt, teljesen külön. Így a menü nem elrejtve van a landingen, hanem nem is
 * létezik — függetlenül attól, hogy az oldal az ajanlat.acuwall.hu gyökerén
 * vagy az /ajanlat útvonalon nyílik meg.
 *
 * A noindex szándékos: a hirdetési oldal nem versenyezhet a főoldallal a
 * keresőben, és nem is keresőforgalomra készült.
 */
export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  robots: { index: false, follow: false },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    locale: "hu_HU",
    type: "website",
  },
};

export default function LandingRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hu">
      <body className="lp-page antialiased">{children}</body>
    </html>
  );
}
