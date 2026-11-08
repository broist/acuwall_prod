"use client";

import { ArrowRight, Phone } from "lucide-react";
import { LogoMark } from "@/components/Logo";
import { useT } from "@/i18n/LanguageProvider";

export default function CTA() {
  const t = useT();

  return (
    <section className="section-spacing relative" data-testid="cta-section">
      <div className="container-custom">
        <div className="relative overflow-hidden rounded-[32px] border border-white/[0.08] bg-tile p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] md:p-[72px]">
          <span className="tile-accent-line left-8 md:left-[72px]" aria-hidden="true" />
          {/* A teljes logó, halványan, a jobb oldalon */}
          <LogoMark className="pointer-events-none absolute right-5 top-7 h-24 w-24 opacity-20 md:right-14 md:top-1/2 md:h-[340px] md:w-[340px] md:-translate-y-1/2 md:opacity-[0.22]" />

          <div className="relative max-w-[640px]">
            <p className="kicker mb-4">{t.cta.eyebrow}</p>
            <h2 className="mb-5 text-[30px] font-bold leading-[1.06] tracking-[-0.03em] md:text-[50px]">
              {t.cta.titleBefore} <span className="text-accent-soft">{t.cta.titleAccent}</span>
            </h2>
            <p className="mb-9 max-w-[520px] leading-relaxed text-light-gray md:text-lg">{t.cta.description}</p>
            <div className="flex flex-col gap-3.5 sm:flex-row">
              <a
                href="#ajanlatkeres"
                className="btn-primary inline-flex min-h-[56px] items-center justify-center gap-3 !py-0 !pl-6 !pr-3.5 text-[17px]"
                data-testid="cta-quote-button"
              >
                {t.cta.quote}
                <span className="btn-arrow" aria-hidden="true">
                  <ArrowRight size={15} strokeWidth={2.4} />
                </span>
              </a>
              <a
                href="tel:+36308305556"
                className="btn-secondary inline-flex min-h-[56px] items-center justify-center gap-2.5 !py-0 text-[17px]"
                data-testid="cta-phone-button"
              >
                <Phone size={18} className="text-accent-soft" />
                +36 30 830 5556
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
