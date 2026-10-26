import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import TrustBar from "@/components/home/TrustBar";
import Introduction from "@/components/home/Introduction";
import WhyUs from "@/components/home/WhyUs";
import FullService from "@/components/home/FullService";
import Lean from "@/components/home/Lean";
import Process from "@/components/home/Process";
import BuildingTypes from "@/components/home/BuildingTypes";
import FAQ from "@/components/home/FAQ";
import CTA from "@/components/home/CTA";
import QuoteSection from "@/components/home/QuoteSection";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Introduction />
      <WhyUs />
      <FullService />
      <Lean />
      <Process />
      <BuildingTypes />
      <FAQ />
      <CTA />
      <QuoteSection />
    </>
  );
}
