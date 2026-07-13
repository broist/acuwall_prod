import SafetyHero from "@/components/safety/SafetyHero";
import SafetyServices from "@/components/safety/SafetyServices";
import SafetyProjects from "@/components/safety/SafetyProjects";
import SafetyBenefits from "@/components/safety/SafetyBenefits";
import SafetyQuoteForm from "@/components/safety/SafetyQuoteForm";

export default function SafetyPage() {
  return (
    <>
      <SafetyHero />
      <SafetyServices />
      <SafetyProjects />
      <SafetyBenefits />
      <SafetyQuoteForm />
    </>
  );
}
