import { NextResponse } from "next/server";
import { readTrackingIds } from "@/components/landing/trackingIds";

/**
 * A mérőazonosítók futásidőben, a weboldal (statikusan generált) oldalai
 * számára. A landing a saját, dinamikus oldalán közvetlenül olvassa őket; a
 * weboldal elrendezése viszont build-időben készül (a képet a GitHub építi,
 * ott nincs .env), ezért a böngésző innen kéri le. Csak publikus azonosítók —
 * ugyanezek a böngészőben a gtag-kérésekben amúgy is láthatók.
 */
export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json(readTrackingIds(), {
    headers: { "Cache-Control": "public, max-age=300" },
  });
}
