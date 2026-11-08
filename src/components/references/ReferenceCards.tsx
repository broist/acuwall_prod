"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { REFERENCES } from "@/content/references";

/** Referencia-kártyák rácsa — a főoldalon és a referencia-listaoldalon is ez jelenik meg. */
export default function ReferenceCards() {
  const { t, locale } = useLanguage();

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {REFERENCES.map((reference) => (
        <Link
          key={reference.slug}
          href={`/referenciak/${reference.slug}`}
          className="group tile flex flex-col overflow-hidden transition-colors duration-300 hover:border-accent-soft/35"
          data-testid={`reference-card-${reference.slug}`}
        >
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={reference.cover.src}
              alt={reference.cover.alt[locale]}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            />
          </div>
          <div className="flex flex-1 flex-col p-6 md:p-7">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-accent-soft">
              {reference.type[locale]}
              {reference.location ? ` · ${reference.location}` : ""}
              {reference.year ? ` · ${reference.year}` : ""}
            </p>
            <h3 className="mb-5 text-[22px] font-bold leading-snug text-white">{reference.title[locale]}</h3>
            <span className="mt-auto inline-flex items-center gap-2 text-[15px] font-semibold text-white">
              {t.references.cardCta}
              <ArrowUpRight
                size={17}
                className="text-accent-soft transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
