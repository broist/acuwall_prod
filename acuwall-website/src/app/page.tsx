import Hero from "@/components/home/Hero";
import Introduction from "@/components/home/Introduction";
import Advantages from "@/components/home/Advantages";
import HowItWorks from "@/components/home/HowItWorks";
import Gallery from "@/components/home/Gallery";
import CTA from "@/components/home/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Introduction />
      <Advantages />
      <HowItWorks />
      <Gallery />
      <CTA />
    </>
  );
}
