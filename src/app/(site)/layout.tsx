import type { Metadata } from "next";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import { SITE_URL } from "@/content/seoPages";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "AcuWall - Generálkivitelezés kulcsrakészen, egy felelőssel",
  description:
    "Az AcuWall épületek generálkivitelezését vállalja az ötlettől a kulcsátadásig: tervezés, alapozás, szerkezetépítés, tetőszerkezet, homlokzat, gépészet, elektromos szerelés és belsőépítészet — egy szerződésben.",
  keywords:
    "generálkivitelezés, generálkivitelező, kulcsrakész épület, kulcsrakész garázs, tároló, műhely, csarnok, irodaház, nyaraló, családi ház, kivitelezés Hajdú-Bihar és Szabolcs-Szatmár-Bereg vármegyében",
  authors: [{ name: "AcuWall" }],
  openGraph: {
    title: "AcuWall - Generálkivitelezés kulcsrakészen, egy felelőssel",
    description:
      "Építsünk együtt. Generálkivitelezés kulcsrakészen, egy felelőssel.",
    locale: "hu_HU",
    type: "website",
    siteName: "AcuWall",
    images: [{ url: "/images/epulettipusok/irodahaz.jpg", alt: "AcuWall — generálkivitelezés" }],
  },
};

/**
 * A cég adatai a keresőknek (schema.org). A Google ebből tudja, hogy
 * építőipari vállalkozásról van szó, és mely területen dolgozik.
 */
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  "@id": `${SITE_URL}/#ceg`,
  name: "AcuWall",
  slogan: "Építsünk együtt",
  description:
    "Generálkivitelezés az ötlettől a kulcsátadásig: tervezés, engedélyezés, szerkezetépítés, gépészet, villany és belsőépítészet egy szerződésben.",
  url: SITE_URL,
  logo: `${SITE_URL}/icon.png`,
  image: `${SITE_URL}/images/epulettipusok/irodahaz.jpg`,
  telephone: "+36308305556",
  email: "acuwall@acuwall.hu",
  areaServed: [
    { "@type": "AdministrativeArea", name: "Hajdú-Bihar vármegye" },
    { "@type": "AdministrativeArea", name: "Szabolcs-Szatmár-Bereg vármegye" },
  ],
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:00",
    closes: "17:00",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hu">
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <LanguageProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
