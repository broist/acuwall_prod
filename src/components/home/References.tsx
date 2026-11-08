"use client";

import ReferenceCards from "@/components/references/ReferenceCards";
import { useT } from "@/i18n/LanguageProvider";

export default function References() {
  const t = useT();

  return (
    <section id="referenciak" className="section-spacing relative" data-testid="references-section">
      <div className="container-custom">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="kicker mb-4">{t.references.eyebrow}</p>
            <h2 className="text-[34px] font-bold leading-[1.05] tracking-[-0.03em] md:text-[54px]">
              {t.references.titleBefore} <span className="text-accent-soft">{t.references.titleAccent}</span>
            </h2>
          </div>
          <p className="max-w-[460px] leading-relaxed text-light-gray">{t.references.description}</p>
        </div>
        <ReferenceCards />
      </div>
    </section>
  );
}
