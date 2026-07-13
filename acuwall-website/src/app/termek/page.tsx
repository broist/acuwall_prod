import ProductHero from "@/components/product/ProductHero";
import ProductDetails from "@/components/product/ProductDetails";
import TechnicalSpecs from "@/components/product/TechnicalSpecs";
import CrossSection from "@/components/product/CrossSection";
import Services from "@/components/product/Services";
import Applications from "@/components/product/Applications";
import CTA from "@/components/home/CTA";

export default function ProductPage() {
  return (
    <>
      <ProductHero />
      <ProductDetails />
      <CrossSection />
      <TechnicalSpecs />
      <Services />
      <Applications />
      <CTA />
    </>
  );
}
