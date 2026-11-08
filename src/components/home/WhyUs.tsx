"use client";

import { KeyRound, ShieldCheck, Zap, FileCheck2, Camera, PhoneCall } from "lucide-react";
import { useT } from "@/i18n/LanguageProvider";

const reasonIcons = [KeyRound, ShieldCheck, Zap, FileCheck2, Camera, PhoneCall];

export default function WhyUs() {
  const t = useT();

  return (
    <section className="section-spacing relative" data-testid="why-us-section">
      <div className="container-custom">
        <div className="mb-12 max-w-[720px]">
          <p className="kicker mb-4">{t.whyUs.eyebrow}</p>
          <h2 className="text-[34px] font-bold leading-[1.05] tracking-[-0.03em] md:text-[54px]">
            {t.whyUs.titleBefore} <span className="text-accent-soft">{t.whyUs.titleAccent}</span>
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {t.whyUs.reasons.map((reason, index) => {
            const Icon = reasonIcons[index];
            return (
              <div
                key={reason.title}
                className="tile group relative overflow-hidden p-7 transition-colors duration-300 hover:border-accent-soft/35 md:p-8"
                data-testid={`why-us-card-${index}`}
              >
                <div className="mb-7 flex items-center justify-between">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/[0.14]">
                    <Icon size={22} className="text-accent-soft" />
                  </span>
                  <span
                    className="font-display text-[44px] font-extrabold leading-none tracking-[-0.04em] text-transparent [-webkit-text-stroke:1.5px_#3A5274]"
                    aria-hidden="true"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mb-3 text-lg font-bold leading-snug text-white md:text-xl">
                  {reason.title}
                </h3>
                <p className="leading-relaxed text-light-gray">{reason.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
