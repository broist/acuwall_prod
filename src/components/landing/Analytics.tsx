"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Script from "next/script";
import { Cookie } from "lucide-react";
import {
  hasAnyTracker,
  readConsent,
  setTrackingIds,
  writeConsent,
  type TrackingIds,
} from "./tracking";

/**
 * Mérőkódok + hozzájárulási sáv.
 *
 * A sáv és a mérőkódok CSAK akkor jelennek meg, ha a szerveren be van állítva
 * legalább egy azonosító. Enélkül a landing teljesen süti- és mérőkódmentes,
 * így nincs teendő GDPR fronton sem.
 */
export default function Analytics(ids: TrackingIds) {
  const { ga4Id, adsId, metaPixelId } = ids;
  const enabled = hasAnyTracker(ids);

  const [consent, setConsent] = useState<"granted" | "denied" | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setTrackingIds(ids);
    setConsent(readConsent());
    setHydrated(true);
    // Az azonosítók a szerverről jönnek, a futás alatt nem változnak.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const decide = (value: "granted" | "denied") => {
    writeConsent(value);
    setConsent(value);
  };

  if (!enabled) return null;

  const granted = consent === "granted";
  const gtagId = ga4Id || adsId;

  return (
    <>
      {granted && gtagId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gtagId}`}
            strategy="afterInteractive"
          />
          <Script id="acuwall-gtag-init" strategy="afterInteractive">
            {[
              "window.dataLayer = window.dataLayer || [];",
              "function gtag(){dataLayer.push(arguments);}",
              "window.gtag = gtag;",
              "gtag('js', new Date());",
              ga4Id ? `gtag('config', '${ga4Id}');` : "",
              adsId ? `gtag('config', '${adsId}');` : "",
            ].join("\n")}
          </Script>
        </>
      )}

      {granted && metaPixelId && (
        <Script id="acuwall-meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${metaPixelId}');fbq('track','PageView');`}
        </Script>
      )}

      {hydrated && consent === null && (
        <div
          role="dialog"
          aria-label="Süti beállítások"
          className="fixed inset-x-0 bottom-0 z-[60] px-3 pb-3 lp-safe-bottom"
        >
          <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-primary-deep/95 backdrop-blur-xl p-4 shadow-2xl shadow-black/50 sm:flex sm:items-center sm:gap-4">
            <p className="flex-1 text-sm leading-relaxed text-light-gray">
              <Cookie size={16} className="mr-2 inline-block text-accent" aria-hidden="true" />
              Méréshez sütiket használnánk, hogy lássuk, melyik hirdetés működik. Az ajánlatkérés
              enélkül is ugyanúgy elküldhető.{" "}
              <Link href="/adatkezeles" className="text-accent underline-offset-2 hover:underline">
                Részletek
              </Link>
            </p>
            <div className="mt-3 flex gap-2 sm:mt-0 sm:flex-shrink-0">
              <button
                type="button"
                onClick={() => decide("denied")}
                className="flex-1 rounded-xl border border-white/15 px-4 py-2.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/5 sm:flex-none"
              >
                Csak a szükségesek
              </button>
              <button
                type="button"
                onClick={() => decide("granted")}
                className="flex-1 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover sm:flex-none"
              >
                Rendben
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
