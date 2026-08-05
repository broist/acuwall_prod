"use client";

import { PhoneCall } from "lucide-react";
import { CONTACT } from "./config";
import { trackEvent } from "./tracking";

/**
 * Telefonos CTA. A kattintást külön eseményként is mérjük, mert hirdetésnél
 * a hívás ugyanolyan értékes megkeresés, mint a kitöltött űrlap.
 */
export default function PhoneCta({
  variant = "compact",
  className = "",
}: {
  variant?: "compact" | "full";
  className?: string;
}) {
  const base =
    variant === "compact"
      ? "inline-flex h-11 items-center gap-2 rounded-xl border border-white/12 bg-white/[0.04] px-3.5 text-sm font-semibold text-white transition-colors hover:border-accent/40 hover:bg-accent/10"
      : "btn-secondary inline-flex items-center justify-center gap-2";

  return (
    <a
      href={CONTACT.phoneHref}
      onClick={() => trackEvent("telefon_kattintas", { hely: variant })}
      className={`${base} ${className}`}
      data-testid="landing-phone-cta"
    >
      <PhoneCall size={variant === "compact" ? 16 : 18} className="text-accent" />
      <span className={variant === "compact" ? "hidden sm:inline" : ""}>
        {CONTACT.phoneDisplay}
      </span>
      <span className={variant === "compact" ? "sm:hidden" : "hidden"}>Hívás</span>
    </a>
  );
}
