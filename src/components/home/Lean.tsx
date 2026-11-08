"use client";

import Image from "next/image";
import { ArrowDown, Check } from "lucide-react";
import { useT } from "@/i18n/LanguageProvider";

export default function Lean() {
  const t = useT();

  return (
    <section id="lean" className="section-spacing relative" data-testid="lean-section">
      <div className="container-custom">
        <div className="relative overflow-hidden rounded-[32px]">
          <Image
            src="/images/epulettipusok/csarnok.jpg"
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 1280px) 100vw, 1280px"
          />
          <div className="absolute inset-0 bg-primary-deep/[0.9]" />

          <div className="relative grid gap-12 p-8 md:p-14 lg:grid-cols-[1.15fr_1fr] lg:p-[72px]">
            <div>
              <p className="kicker mb-4">{t.lean.eyebrow}</p>
              <h2 className="mb-5 text-[30px] font-bold leading-[1.08] tracking-[-0.03em] md:text-[46px]">
                {t.lean.titleBefore} <span className="text-accent-soft">{t.lean.titleAccent}</span>
              </h2>
              <p className="mb-8 leading-relaxed text-[#C9D4E3]">
                {t.lean.leadBefore} <span className="font-medium text-white">{t.lean.leadHighlight}</span>
                {t.lean.leadAfter}
              </p>

              <h3 className="mb-4 text-lg font-bold text-white">{t.lean.howTitle}</h3>
              <ul className="space-y-3">
                {t.lean.pillars.map((pillar) => (
                  <li key={pillar.title} className="flex items-start gap-3">
                    <Check size={17} strokeWidth={2.6} className="mt-0.5 flex-shrink-0 text-accent-soft" />
                    <span className="text-[15px] leading-snug text-white/85">
                      <strong className="font-semibold text-white">{pillar.title}</strong> — {pillar.description}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-light-gray">
                {t.lean.reduceLabel}
              </p>
              {t.lean.reductions.map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between rounded-[18px] border border-white/[0.12] bg-white/[0.07] px-6 py-5"
                >
                  <span className="font-display text-[22px] font-bold text-white">{item}</span>
                  <ArrowDown size={22} strokeWidth={2.2} className="text-accent-soft" />
                </div>
              ))}

              <div className="mt-4 rounded-[18px] border border-white/[0.08] bg-primary-deep/60 p-6">
                <h3 className="mb-4 text-lg font-bold text-white">{t.lean.whyTitle}</h3>
                <ul className="flex flex-wrap gap-2">
                  {t.lean.benefits.map((benefit) => (
                    <li key={benefit} className="rounded-full bg-white/[0.08] px-3 py-1.5 text-[13px] text-white/90">
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
