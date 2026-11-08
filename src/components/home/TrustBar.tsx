"use client";

import { FileCheck2, LineChart, ShieldCheck } from "lucide-react";
import { useT } from "@/i18n/LanguageProvider";

const icons = [FileCheck2, LineChart, ShieldCheck];

export default function TrustBar() {
  const items = useT().trustBar;

  return (
    <div className="relative z-20 container-custom -mt-10 md:-mt-16" data-testid="trust-bar">
      <div className="grid gap-4 md:grid-cols-3">
        {items.map((item, index) => {
          const Icon = icons[index] ?? ShieldCheck;
          return (
            <div
              key={item.title}
              className="flex items-start gap-4 rounded-[18px] border border-white/[0.06] bg-tile p-[22px]"
            >
              <span className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-accent/[0.14]">
                <Icon size={20} className="text-accent-soft" />
              </span>
              <span>
                <span className="block font-semibold leading-snug text-white">{item.title}</span>
                <span className="mt-0.5 block text-[15px] text-light-gray">{item.subtitle}</span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
