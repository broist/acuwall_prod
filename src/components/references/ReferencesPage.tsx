"use client";

import ReferenceCards from "./ReferenceCards";
import { useT } from "@/i18n/LanguageProvider";

/** A /referenciak listaoldal tartalma. */
export default function ReferencesPage() {
  const t = useT();

  return (
    <section className="pb-24 pt-32 md:pb-32 md:pt-40">
      <div className="container-custom">
        <div className="mb-12 max-w-[760px]">
          <p className="kicker mb-4">{t.references.eyebrow}</p>
          <h1 className="text-[38px] font-bold leading-[1.05] tracking-[-0.03em] md:text-[60px]">
            {t.references.titleBefore} <span className="text-accent-soft">{t.references.titleAccent}</span>
          </h1>
        </div>
        <ReferenceCards />
      </div>
    </section>
  );
}
