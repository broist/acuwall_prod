import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "AcuWall - Könnyűszerkezetes épület kulcsrakészen, egy felelőssel",
  description:
    "Az AcuWall könnyűszerkezetes épületek generálkivitelezését vállalja az ötlettől a kulcsátadásig: tervezés, statika, 3D modell, alapozás, acélváz, panel, gépészet, elektromos szerelés és belsőépítészet — egy szerződésben.",
  keywords:
    "könnyűszerkezetes épület, szendvicspanel, generálkivitelezés, kulcsrakész garázs, tároló, műhely, csarnok, irodaház, nyaraló, családi ház, acélváz, országos kivitelezés",
  authors: [{ name: "AcuWall" }],
  openGraph: {
    title: "AcuWall - Könnyűszerkezetes épület kulcsrakészen, egy felelőssel",
    description:
      "Az ötlettől a kulcsátadásig. Egy felelős. Egy szerződés. Egy kész épület.",
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
