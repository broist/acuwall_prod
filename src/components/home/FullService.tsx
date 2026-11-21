"use client";

import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { useT } from "@/i18n/LanguageProvider";

/** Körvonalas sorszám a csempék sarkában. */
function OutlineNumber({ value, stroke }: { value: string; stroke: string }) {
  return (
    <span
      aria-hidden="true"
      className="font-display text-[64px] font-extrabold leading-none tracking-[-0.04em] text-tile [paint-order:stroke_fill]"
      style={{ WebkitTextStroke: `3px ${stroke}` }}
    >
      {value}
    </span>
  );
}

/** Vonalas, térbeli ház — a 3D modell csempe díszítése. */
function WireframeHouse() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 300 230"
      fill="none"
      className="pointer-events-none absolute right-7 top-[18px] hidden h-[230px] w-[300px] opacity-55 md:block"
    >
      {/* Rejtett élek (a ház túloldala) */}
      <g stroke="#3A5274" strokeWidth="1" strokeDasharray="3 4">
        <path d="M50 170 L150 120 L250 170" />
        <path d="M150 120 V60" />
        <path d="M50 110 L150 60 L250 110" />
      </g>
      <g stroke="#FF6A3D" strokeWidth="1.3" strokeLinejoin="round">
        {/* Falak */}
        <path d="M50 110 V170 L150 220 L250 170 V110" />
        <path d="M150 220 V160" />
        <path d="M50 110 L150 160 L250 110" />
        {/* Nyeregtető: oromfal elöl-balra, gerinc hátrafelé */}
        <path d="M50 110 L100 85 L150 160" />
        <path d="M100 85 L200 35 L250 110" />
        {/* Ajtó és ablak */}
        <path d="M90 190 V155 L110 165 V200" />
        <path d="M180 180 V160 L220 140 V160 Z" />
      </g>
      <g fill="#FF6A3D">
        <circle cx="100" cy="85" r="2.5" />
        <circle cx="200" cy="35" r="2.5" />
        <circle cx="50" cy="110" r="2.5" />
        <circle cx="150" cy="160" r="2.5" />
        <circle cx="250" cy="110" r="2.5" />
        <circle cx="150" cy="220" r="2.5" />
      </g>
    </svg>
  );
}

export default function FullService() {
  const t = useT();
  const [plans, statics, model, build] = t.fullService.services;

  return (
    <section id="szolgaltatasok" className="section-spacing relative" data-testid="full-service-section">
      <div className="container-custom">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-[680px]">
            <p className="kicker mb-4">{t.fullService.eyebrow}</p>
            <h2 className="text-[34px] font-bold leading-[1.05] tracking-[-0.03em] md:text-[54px]">
              {t.fullService.titleBefore}{" "}
              <span className="text-accent-soft">{t.fullService.titleAccent}</span>
            </h2>
          </div>
          <p className="max-w-[460px] leading-relaxed text-light-gray">{t.fullService.description}</p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {/* Kivitelezés — nagy, képes csempe */}
          <article
            className="relative flex min-h-[520px] flex-col justify-end overflow-hidden rounded-[26px] lg:row-span-2"
            data-testid="service-card-3"
          >
            <Image
              src="/images/epulettipusok/csarnok.jpg"
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(10,20,36,0.96)_12%,rgba(10,20,36,0.1)_72%)]" />
            <div className="relative p-8">
              <p className="kicker mb-2.5 !text-[13px]">04</p>
              <h3 className="mb-3 text-[32px] font-bold leading-tight tracking-[-0.02em] text-white">
                {build.title}
              </h3>
              <p className="mb-5 max-w-[460px] leading-relaxed text-[#C9D4E3]">{build.description}</p>
              <ul className="flex flex-wrap gap-2">
                {build.items.map((item) => (
                  <li key={item} className="rounded-full bg-white/10 px-3 py-1.5 text-[13px] text-white">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </article>

          {/* Tervek, Statika */}
          {[plans, statics].map((service, index) => (
            <article
              key={service.title}
              className="tile flex flex-col gap-6 p-8"
              data-testid={`service-card-${index}`}
            >
              <OutlineNumber value={`0${index + 1}`} stroke="#3A5274" />
              <div>
                <h3 className="mb-2 text-2xl font-bold text-white">{service.title}</h3>
                <p className="mb-5 text-[15px] leading-relaxed text-light-gray">{service.description}</p>
                <ul className="space-y-2">
                  {service.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-white/85">
                      <Check size={15} strokeWidth={2.6} className="mt-0.5 flex-shrink-0 text-accent-soft" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}

          {/* 3D modell — visszafogott kiemelés */}
          <article
            className="relative flex flex-wrap items-end justify-between gap-6 overflow-hidden rounded-[26px] border border-accent-soft/[0.38] bg-tile p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_24px_50px_rgba(0,0,0,0.25)] lg:col-span-2"
            data-testid="service-card-2"
          >
            <span className="tile-accent-line left-8" aria-hidden="true" />
            <WireframeHouse />
            <div className="relative max-w-[460px]">
              <div className="mb-10 flex items-center gap-3.5">
                <OutlineNumber value="03" stroke="#FF6A3D" />
                <span className="rounded-full border border-accent-soft/35 bg-accent/[0.12] px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-[#FFB79F]">
                  {t.fullService.modelBadge}
                </span>
              </div>
              <h3 className="mb-2 text-2xl font-bold text-white">{model.title}</h3>
              <p className="mb-3 text-[15px] leading-relaxed text-light-gray">{model.description}</p>
              <p className="text-sm text-white/70">{model.items.join(" · ")}</p>
            </div>
            <a
              href="#ajanlatkeres"
              className="relative inline-flex min-h-[48px] items-center gap-2.5 rounded-xl border border-accent-soft/55 px-5 text-[15px] font-semibold text-white transition-colors hover:bg-accent/10"
            >
              {t.fullService.modelCta}
              <ArrowRight size={16} strokeWidth={2.2} className="text-accent-soft" />
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
