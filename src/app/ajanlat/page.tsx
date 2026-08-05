import { Check } from "lucide-react";
import { LogoMark } from "@/components/Logo";
import Analytics from "@/components/landing/Analytics";
import LandingSections from "@/components/landing/LandingSections";
import LandingWizard from "@/components/landing/LandingWizard";
import PhoneCta from "@/components/landing/PhoneCta";

/**
 * A mérőazonosítókat futásidőben olvassuk a környezetből, hogy egy új
 * Google Ads vagy Meta azonosítóhoz elég legyen a konténer újraindítása —
 * nem kell újraépíteni az egész weboldalt.
 */
export const dynamic = "force-dynamic";

const TRUST_POINTS = [
  "Tervezéstől a kulcsátadásig, egy szerződésben",
  "Országos kivitelezés, Magyarország bármely pontján",
  "Ütemezett fizetés, írásos garancia",
];

const TRUST_CHIPS = ["Egy felelős", "Országos kivitelezés", "Válasz 24 órán belül"];

export default function AjanlatLandingPage() {
  const trackingIds = {
    ga4Id: process.env.LANDING_GA4_ID,
    adsId: process.env.LANDING_GOOGLE_ADS_ID,
    adsLabel: process.env.LANDING_GOOGLE_ADS_LABEL,
    metaPixelId: process.env.LANDING_META_PIXEL_ID,
  };

  return (
    <div className="lp-glow">
      <header className="border-b border-white/[0.06]">
        <div className="container-custom flex h-16 items-center justify-between gap-4">
          <span className="flex items-center gap-2.5">
            <LogoMark className="h-9 w-9" />
            <span className="leading-tight">
              <span className="block text-lg font-bold tracking-tight">
                Acu<span className="text-accent">Wall</span>
              </span>
              <span className="block text-[10px] font-medium italic text-white/50">
                Építsünk együtt
              </span>
            </span>
          </span>
          <PhoneCta />
        </div>
      </header>

      <section className="grid-pattern pb-14 pt-6 md:pt-12 lg:pb-20 lg:pt-16">
        <div className="container-custom grid items-start gap-6 lg:grid-cols-[1fr_minmax(0,540px)] lg:gap-14">
          <div className="lg:pt-4">
            <span className="eyebrow mb-4 lg:mb-5">Ingyenes ajánlatkérés</span>
            <h1 className="text-[27px] font-bold leading-[1.12] tracking-tight sm:text-4xl lg:text-[42px]">
              Könnyűszerkezetes épület <span className="text-accent">kulcsrakészen</span>, egy
              felelőssel.
            </h1>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-light-gray md:text-lg lg:mt-5">
              Garázstól és műhelytől a lakóházig: megtervezzük és fel is építjük. Mondja el pár
              kattintásban, mit tervez — <strong className="text-white">24 órán belül</strong>{" "}
              személyesen válaszolunk.
            </p>

            <ul className="mt-8 hidden space-y-3.5 lg:block">
              {TRUST_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                    <Check size={14} strokeWidth={3} />
                  </span>
                  <span className="leading-relaxed text-white/85">{point}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 hidden lg:block">
              <PhoneCta variant="full" />
            </div>
          </div>

          <div className="mt-6 lg:mt-0">
            <LandingWizard />

            {/* Mobilon a bizalmi jelzések az űrlap alá kerülnek, hogy a
                kérdés minél magasabbra jusson a képernyőn. */}
            <div className="mt-5 flex flex-wrap justify-center gap-2 lg:hidden">
              {TRUST_CHIPS.map((chip) => (
                <span
                  key={chip}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-light-gray"
                >
                  <Check size={12} className="text-accent" strokeWidth={3} />
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <LandingSections />

      <Analytics {...trackingIds} />
    </div>
  );
}
