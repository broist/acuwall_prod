"use client";

import { FileCheck2, LineChart, ShieldCheck } from "lucide-react";
import { useT } from "@/i18n/LanguageProvider";

const icons = [FileCheck2, LineChart, ShieldCheck];

/**
 * A nyitókép aljára úszó, egybefüggő üvegsáv: három ígéret, vékony
 * elválasztókkal — nem három külön doboz.
 */
export default function TrustBar() {
  const items = useT().trustBar;

  return (
    <div className="relative z-20 container-custom -mt-10 md:-mt-16" data-testid="trust-bar">
      <div className="relative overflow-hidden rounded-[22px] border border-white/[0.1] bg-tile/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_24px_50px_rgba(0,0,0,0.35)] backdrop-blur-xl">
        <span className="tile-accent-line left-7" aria-hidden="true" />
        <div className="grid divide-y divide-white/[0.08] md:grid-cols-3 md:divide-x md:divide-y-0">
          {items.map((item, index) => {
            const Icon = icons[index] ?? ShieldCheck;
            return (
              <div key={item.title} className="flex items-center gap-4 px-6 py-5 md:px-7 md:py-6">
                <span className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-accent-soft/35 bg-accent/[0.08]">
                  <Icon size={19} strokeWidth={1.8} className="text-accent-soft" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[15px] font-semibold leading-snug text-white md:text-base">
                    {item.title}
                  </span>
                  <span className="mt-0.5 block text-sm text-light-gray">{item.subtitle}</span>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
