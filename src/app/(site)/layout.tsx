import type { Metadata } from "next";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/i18n/LanguageProvider";

export const metadata: Metadata = {
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
        <LanguageProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
