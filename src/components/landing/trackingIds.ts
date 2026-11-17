import type { TrackingIds } from "./tracking";

/**
 * A mérőazonosítók a szerver környezetéből (.env → docker-compose.yml).
 * Ugyanazokat használja a landing és a weboldal: egy GA4-tulajdon, egy
 * Google Ads konverzió. Az üres érték „nincs beállítva”.
 */
export function readTrackingIds(): TrackingIds {
  const clean = (value: string | undefined) => value?.trim() || undefined;

  return {
    ga4Id: clean(process.env.LANDING_GA4_ID),
    adsId: clean(process.env.LANDING_GOOGLE_ADS_ID),
    adsLabel: clean(process.env.LANDING_GOOGLE_ADS_LABEL),
    metaPixelId: clean(process.env.LANDING_META_PIXEL_ID),
  };
}
