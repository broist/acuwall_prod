import { LogoMark } from "@/components/Logo";
import Analytics from "@/components/landing/Analytics";
import LandingWizard from "@/components/landing/LandingWizard";
import PhoneCta from "@/components/landing/PhoneCta";
import { CONTACT } from "@/components/landing/config";

/**
 * Szándékosan csupasz oldal: fejléc, űrlap, lábléc. Nincs alatta marketing
 * szekció, mert a hirdetésből érkező látogatónak egyetlen dolga van itt.
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
        <div className="mx-auto flex h-16 w-full max-w-2xl items-center justify-between gap-4 px-4 sm:px-6">
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
        <div className="mx-auto w-full max-w-2xl px-4 pb-14 pt-4 sm:px-6 sm:pt-6">
          {/* Egyetlen apró sor: a hirdetésből érkezőnek visszaigazolja, hogy jó
              helyen jár, de nem tolja lejjebb az űrlapot. */}
          <h1 className="mb-3.5 text-center text-[17px] font-semibold leading-snug tracking-tight sm:mb-4 sm:text-xl">
            Könnyűszerkezetes épület <span className="text-accent">kulcsrakészen</span>
          </h1>

          <LandingWizard />
        </div>
      </main>

      <footer className="border-t border-white/[0.06] bg-primary-deep">
        <div className="mx-auto flex w-full max-w-2xl flex-col items-center justify-between gap-3 px-4 py-6 text-[13px] text-medium-gray sm:flex-row sm:px-6">
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
