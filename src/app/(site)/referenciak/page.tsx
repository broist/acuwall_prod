import type { Metadata } from "next";
import ReferencesPage from "@/components/references/ReferencesPage";

export const metadata: Metadata = {
  title: "Referenciák — elkészült munkáink fázisonként | AcuWall",
  description:
    "Az AcuWall generálkivitelezési munkái lépésről lépésre: a hőszigeteléstől a kész homlokzatig és a belső burkolatig, fázisonként fotókkal.",
  alternates: { canonical: "/referenciak" },
};

export default function Page() {
  return <ReferencesPage />;
}
