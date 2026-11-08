"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Phone, X } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { getReference, type ReferenceImage } from "@/content/references";

/**
 * Egy referencia-projekt oldala: fejléc, majd a fázisok egymás után, számozott
 * idővonalon, fázisonként 1–2 képpel. A képekre kattintva nagyban is megnézhetők.
 */
export default function ReferenceDetail({ slug }: { slug: string }) {
  const { t, locale } = useLanguage();
  const reference = getReference(slug);
  const [open, setOpen] = useState<ReferenceImage | null>(null);

  const close = useCallback(() => setOpen(null), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close]);

  if (!reference) return null;

  return (
    <>
      {/* Fejléc */}
      <section className="relative overflow-hidden pb-14 pt-32 md:pb-20 md:pt-40">
        <div className="container-custom">
          <Link
            href="/referenciak"
            className="mb-8 inline-flex items-center gap-2 text-sm text-light-gray transition-colors hover:text-white"
          >
            <ArrowLeft size={16} />
            {t.references.back}
          </Link>

          <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-16">
            <div>
              <p className="kicker mb-4">
                {reference.type[locale]}
                {reference.location ? ` · ${reference.location}` : ""}
                {reference.year ? ` · ${reference.year}` : ""}
              </p>
              <h1 className="mb-6 text-[36px] font-bold leading-[1.05] tracking-[-0.03em] md:text-[56px]">
                {reference.title[locale]}
              </h1>
              <p className="mb-8 max-w-[640px] leading-relaxed text-[#C9D4E3] md:text-lg">
                {reference.summary[locale]}
              </p>
              <ul className="flex flex-wrap gap-2">
                {reference.highlights.map((item) => (
                  <li
                    key={item.hu}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.1] bg-white/[0.05] px-3.5 py-1.5 text-sm text-white/90"
                  >
                    <Check size={14} strokeWidth={2.6} className="text-accent-soft" />
                    {item[locale]}
                  </li>
                ))}
              </ul>
            </div>

            <button
              type="button"
              onClick={() => setOpen(reference.cover)}
              className="relative aspect-[4/3] overflow-hidden rounded-[26px] border border-white/[0.08]"
            >
              <Image
                src={reference.cover.src}
                alt={reference.cover.alt[locale]}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </button>
          </div>
        </div>
      </section>

      {/* Fázisok — egymás után, számozott idővonalon */}
      <section className="pb-20 md:pb-28">
        <div className="container-custom">
          <h2 className="mb-12 text-[30px] font-bold tracking-[-0.03em] md:text-[44px]">
            {t.references.buildTitle}
          </h2>

          <ol className="relative">
            {reference.phases.map((phase, index) => {
              const isLast = index === reference.phases.length - 1;
              return (
                <li key={phase.title.hu} className="relative grid gap-6 pb-14 md:grid-cols-[72px_minmax(0,1fr)] md:gap-8 md:pb-20">
                  {/* Idővonal: szám és összekötő vonal */}
                  <div className="relative flex items-center gap-4 md:block">
                    <span
                      className={`relative z-10 inline-flex h-[52px] w-[52px] items-center justify-center rounded-full font-display text-lg font-bold ${
                        index === 0
                          ? "bg-accent-deep text-white shadow-[0_0_0_8px_rgba(232,56,13,0.15)]"
                          : "border border-[#2B4466] bg-[#15273F] text-white"
                      }`}
                    >
                      {index + 1}
                    </span>
                    {!isLast && (
                      <span
                        aria-hidden="true"
                        className="absolute left-[25px] top-[52px] hidden h-[calc(100%+3.5rem)] w-0.5 bg-[#1E3350] md:block md:h-[calc(100%+5rem)]"
                      />
                    )}
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-soft md:hidden">
                      {t.references.phaseLabel} {index + 1}/{reference.phases.length}
                    </span>
                  </div>

                  <div>
                    <p className="mb-2 hidden text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-soft md:block">
                      {t.references.phaseLabel} {index + 1}/{reference.phases.length}
                    </p>
                    <h3 className="mb-3 text-2xl font-bold text-white md:text-[28px]">{phase.title[locale]}</h3>
                    <p className="mb-7 max-w-[720px] leading-relaxed text-light-gray">{phase.description[locale]}</p>

                    <div
                      className={`grid gap-4 ${
                        phase.images.length > 1
                          ? "sm:grid-cols-2"
                          : phase.images[0]?.portrait
                            ? "max-w-[460px]"
                            : "max-w-[720px]"
                      }`}
                    >
                      {phase.images.map((image) => (
                        <button
                          key={image.src}
                          type="button"
                          onClick={() => setOpen(image)}
                          className={`group relative overflow-hidden rounded-[20px] border border-white/[0.07] ${
                            image.portrait && phase.images.length === 1 ? "aspect-[4/5]" : "aspect-[4/3]"
                          }`}
                        >
                          <Image
                            src={image.src}
                            alt={image.alt[locale]}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 45vw, 600px"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>

          {/* Felhívás */}
          <div className="relative mt-4 overflow-hidden rounded-[26px] border border-white/[0.08] bg-tile p-8 md:p-12">
            <span className="tile-accent-line left-8 md:left-12" aria-hidden="true" />
            <div className="flex flex-wrap items-center justify-between gap-8">
              <div className="max-w-[560px]">
                <h2 className="mb-3 text-[28px] font-bold tracking-[-0.02em] md:text-[36px]">{t.references.ctaTitle}</h2>
                <p className="leading-relaxed text-light-gray">{t.references.ctaText}</p>
              </div>
              <div className="flex flex-col gap-3.5 sm:flex-row">
                <a
                  href="/#ajanlatkeres"
                  className="btn-primary inline-flex min-h-[56px] items-center justify-center gap-3 !py-0 !pl-6 !pr-3.5"
                >
                  {t.cta.quote}
                  <span className="btn-arrow" aria-hidden="true">
                    <ArrowRight size={15} strokeWidth={2.4} />
                  </span>
                </a>
                <a
                  href="tel:+36308305556"
                  className="btn-secondary inline-flex min-h-[56px] items-center justify-center gap-2.5 !py-0"
                >
                  <Phone size={18} className="text-accent-soft" />
                  +36 30 830 5556
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nagyított kép */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={open.alt[locale]}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-primary-deep/95 p-4 backdrop-blur-sm"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label={t.references.close}
            className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <X size={22} />
          </button>
          <div className="relative h-full max-h-[88vh] w-full max-w-6xl">
            <Image src={open.src} alt={open.alt[locale]} fill className="object-contain" sizes="100vw" />
          </div>
        </div>
      )}
    </>
  );
}
