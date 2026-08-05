/**
 * Hirdetési mérés a landingen — GA4, Google Ads konverzió és Meta Pixel.
 *
 * Amíg nincs azonosító beállítva a szerver .env-jében, egyetlen sor mérőkód
 * sem töltődik be, és minden itteni függvény csendben nem csinál semmit.
 * Az azonosítók útja: .env -> src/app/ajanlat/page.tsx -> <Analytics />.
 */

export type TrackingIds = {
  ga4Id?: string;
  adsId?: string;
  adsLabel?: string;
  metaPixelId?: string;
};

export const CONSENT_STORAGE_KEY = "acuwall_landing_consent";

type TrackParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: ((...args: unknown[]) => void) & { queue?: unknown[]; loaded?: boolean };
    _fbq?: unknown;
  }
}

let ids: TrackingIds = {};

export function setTrackingIds(next: TrackingIds) {
  ids = next;
}

export function hasAnyTracker(next: TrackingIds = ids) {
  return Boolean(next.ga4Id || next.adsId || next.metaPixelId);
}

export function readConsent(): "granted" | "denied" | null {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

export function writeConsent(value: "granted" | "denied") {
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
  } catch {
    /* privát mód: a döntés csak erre a látogatásra él */
  }
}

/** Általános esemény — GA4-be megy, ha a látogató hozzájárult. */
export function trackEvent(event: string, params: TrackParams = {}) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", event, params);
}

/**
 * Sikeres ajánlatkérés: GA4 lead esemény + Google Ads konverzió + Meta lead.
 * Ez az a pont, amit a hirdetési rendszerek az optimalizáláshoz használnak.
 */
export function trackLead(params: TrackParams = {}) {
  if (typeof window === "undefined") return;

  window.gtag?.("event", "generate_lead", { currency: "HUF", value: 1, ...params });

  if (ids.adsId && ids.adsLabel) {
    window.gtag?.("event", "conversion", { send_to: `${ids.adsId}/${ids.adsLabel}` });
  }

  window.fbq?.("track", "Lead");
}
