"use client";

import { useEffect, useState } from "react";
import Analytics from "./Analytics";
import { hasAnyTracker, trackEvent, type TrackingIds } from "./tracking";

/**
 * Mérés a weboldalon (acuwall.hu) — ugyanaz a hozzájárulási sáv és ugyanazok
 * az azonosítók, mint a landingen.
 *
 * A weboldal oldalai statikusan, a GitHubon épülnek, ahol nincs .env, ezért
 * az azonosítókat futásidőben kérjük le (/api/tracking-ids). Amíg nincs
 * beállítva egy sem, semmi nem jelenik meg és semmi nem töltődik be.
 *
 * A telefonszámra kattintást egy helyen, az egész oldalra figyeljük (minden
 * `tel:` hivatkozás), így az új gomboknál sem kell külön mérést írni.
 */
export default function SiteAnalytics() {
  const [ids, setIds] = useState<TrackingIds | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/tracking-ids")
      .then((response) => (response.ok ? response.json() : {}))
      .then((data: TrackingIds) => {
        if (!cancelled) setIds(data);
      })
      .catch(() => {
        /* mérés nélkül is működik az oldal */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!ids || !hasAnyTracker(ids)) return;

    const onClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const link = target?.closest?.('a[href^="tel:"]');
      if (link) {
        trackEvent("telefon_kattintas", { hely: window.location.pathname });
      }
    };

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, [ids]);

  if (!ids || !hasAnyTracker(ids)) return null;

  return <Analytics {...ids} />;
}
