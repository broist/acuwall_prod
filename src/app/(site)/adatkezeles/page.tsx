import type { Metadata } from "next";
import PrivacyContent from "./PrivacyContent";

export const metadata: Metadata = {
  title: "Adatkezelési tájékoztató | AcuWall",
  description:
    "Az AcuWall ajánlatkérő űrlapján megadott személyes adatok kezelésének feltételei.",
  alternates: { canonical: "/adatkezeles" },
};

export default function AdatkezelesPage() {
  return <PrivacyContent />;
}
