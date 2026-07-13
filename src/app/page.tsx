import Hero from "@/components/home/Hero";
import TrustBar from "@/components/home/TrustBar";
import Introduction from "@/components/home/Introduction";
import WhyUs from "@/components/home/WhyUs";
import FullService from "@/components/home/FullService";
import Process from "@/components/home/Process";
import BuildingTypes from "@/components/home/BuildingTypes";
import FAQ from "@/components/home/FAQ";
import CTA from "@/components/home/CTA";
import QuoteSection from "@/components/home/QuoteSection";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Introduction />
      <WhyUs />
      <FullService />
      <Process />
      <BuildingTypes />
      <FAQ />
      <CTA />
      <QuoteSection />
    </>
  );
}
