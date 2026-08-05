import type { Metadata } from "next";
import "./landing.css";

const TITLE = "Ajánlatkérés – könnyűszerkezetes épület kulcsrakészen | AcuWall";
const DESCRIPTION =
  "Garázstól a lakóházig: megtervezzük és fel is építjük. Mondja el pár kattintásban, mit tervez — 24 órán belül személyesen válaszolunk. Ingyenes, nem kötelezi semmire.";

/**
 * A hirdetési landing külön layoutot kap: a weboldal fejléce és láblécе nem
 * jelenik meg rajta (lásd Header.tsx / Footer.tsx), hogy semmi ne vigye el a
 * figyelmet az űrlapról.
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

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return <div className="lp-page">{children}</div>;
}
