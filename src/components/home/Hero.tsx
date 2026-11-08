"use client";

import Image from "next/image";
import { ArrowRight, Phone } from "lucide-react";
import { useT } from "@/i18n/LanguageProvider";

export default function Hero() {
  const t = useT();

  return (
    <section
      id="fooldal"
      className="relative flex min-h-[760px] md:min-h-[860px] flex-col overflow-hidden"
      data-testid="hero-section"
    >
      <Image
        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2200&q=80"
        alt={t.hero.imageAlt}
        fill
        priority
        quality={85}
        sizes="100vw"
        className="object-cover object-[62%_50%] md:object-[70%_50%]"
      />
      {/* Bal oldalon sötétebb, hogy a szöveg jól olvasható legyen; alul a háttérbe olvad */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,20,36,0.7)_0%,rgba(10,20,36,0.82)_45%,#0A1424_100%)] md:bg-[linear-gradient(90deg,rgba(10,20,36,0.94)_0%,rgba(10,20,36,0.78)_45%,rgba(10,20,36,0.25)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-primary-deep to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-12 flex flex-1 flex-col justify-center pt-32 pb-24 md:pt-40 md:pb-32">
        <p
          className="animate-hero-in mb-7 inline-flex w-fit items-center gap-2.5 rounded-full border border-accent-soft/35 bg-accent/[0.14] py-1.5 pl-2.5 pr-3.5 text-sm font-medium text-[#FFD3C4]"
        >
          <span className="h-2 w-2 rounded-full bg-accent-soft" aria-hidden="true" />
          {t.hero.badge}
        </p>

        <h1
          style={{ animationDelay: "0.08s" }}
          className="animate-hero-in mb-7 max-w-[860px] text-[42px] font-bold leading-[1.03] tracking-[-0.035em] sm:text-6xl lg:text-[84px]"
          data-testid="hero-title"
        >
          {t.hero.titleBefore} <span className="text-accent-soft">{t.hero.titleAccent}</span>
        </h1>

        <p
          style={{ animationDelay: "0.18s" }}
          className="animate-hero-in mb-10 max-w-[620px] text-base leading-relaxed text-[#C9D4E3] md:text-[19px]"
          data-testid="hero-subtitle"
        >
          {t.hero.subtitleBefore}{" "}
          <strong className="font-semibold text-white">{t.hero.subtitleStrong}</strong>
          {t.hero.subtitleAfter}
        </p>

        <div
          style={{ animationDelay: "0.28s" }}
          className="animate-hero-in flex flex-col gap-3.5 sm:flex-row"
        >
          <a
            href="#ajanlatkeres"
            className="btn-primary inline-flex items-center justify-center gap-3 !py-0 !pl-7 !pr-3.5 min-h-[58px] text-[17px]"
            data-testid="hero-cta-quote"
          >
            {t.hero.cta}
            <span className="btn-arrow" aria-hidden="true">
              <ArrowRight size={15} strokeWidth={2.4} />
            </span>
          </a>
          <a
            href="tel:+36308305556"
            className="btn-secondary inline-flex items-center justify-center gap-2.5 !py-0 min-h-[58px] text-[17px]"
          >
            <Phone size={18} className="text-accent-soft" />
            +36 30 830 5556
          </a>
        </div>
      </div>
    </section>
  );
}
