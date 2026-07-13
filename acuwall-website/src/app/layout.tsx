import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "AcuWall - Csend. Tartósság. Professzionális zajvédelem.",
  description: "Az AcuWall zajvédő falrendszere hatékony és tartós megoldást kínál ipari telephelyek, logisztikai központok, utak és lakóövezetek zajterhelésének csökkentésére.",
  keywords: "zajvédő fal, zajcsillapítás, fabeton, vasbeton, zajvédelem, ipari zajvédelem, Magyarország",
  authors: [{ name: "AcuWall" }],
  openGraph: {
    title: "AcuWall - Professzionális zajvédelem",
    description: "Előregyártott zajvédő falrendszerek ipari és lakossági alkalmazásra.",
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
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
