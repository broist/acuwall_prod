import { LogoMark } from "@/components/Logo";
import Analytics from "@/components/landing/Analytics";
import LandingHero from "@/components/landing/LandingHero";
import LandingProof from "@/components/landing/LandingProof";
import LandingWizard from "@/components/landing/LandingWizard";
import PhoneCta from "@/components/landing/PhoneCta";
import { CONTACT } from "@/components/landing/config";

/**
 * Az űrlap az első képernyőn van (mobilon is); alatta egy rövid bizalomépítő
 * rész (hogyan zajlik, referenciák, gyakori kérdések) azoknak, akik még
 * bizonytalanok — ez nem tolja lejjebb a kérdéssort.
 *
 * A mérőazonosítókat futásidőben olvassuk a környezetből, hogy egy új
 * Google Ads vagy Meta azonosítóhoz elég legyen a konténer újraindítása —
 * nem kell újraépíteni az egész weboldalt.
 */
export const dynamic = "force-dynamic";

export default function AjanlatLandingPage() {
  const trackingIds = {
    ga4Id: process.env.LANDING_GA4_ID,
    adsId: process.env.LANDING_GOOGLE_ADS_ID,
    adsLabel: process.env.LANDING_GOOGLE_ADS_LABEL,
    metaPixelId: process.env.LANDING_META_PIXEL_ID,
  };

  return (
    <div className="lp-glow flex min-h-screen flex-col">
      <header className="border-b border-white/[0.06]">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
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

      <main className="grid-pattern flex-1">
        <div className="mx-auto w-full max-w-6xl px-4 pb-10 pt-4 sm:px-6 sm:pt-6 lg:pb-16 lg:pt-12">
          {/* Mobilon egymás alatt (a kérdéssor az első képernyőn marad), asztali
              gépen a bevezető a kérdéssor mellett áll, és vele együtt görög. */}
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,580px)] lg:items-start lg:gap-16">
            <LandingHero />
            <div className="lg:sticky lg:top-8">
              <LandingWizard />
            </div>
          </div>
        </div>

        <LandingProof />
      </main>

      <footer className="border-t border-white/[0.06] bg-primary-deep">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-[13px] text-medium-gray sm:flex-row sm:px-6">
          <p>© {new Date().getFullYear()} AcuWall</p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <a href={CONTACT.emailHref} className="transition-colors hover:text-white">
              {CONTACT.email}
            </a>
            {/* Új lapon nyílik: a félig kitöltött űrlap ne vesszen el. */}
            <a
              href="/adatkezeles"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white"
            >
              Adatkezelési tájékoztató
            </a>
          </div>
        </div>
      </footer>

      <Analytics {...trackingIds} />
    </div>
  );
}
