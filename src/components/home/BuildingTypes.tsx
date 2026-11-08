"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useT } from "@/i18n/LanguageProvider";

/**
 * A képek és linkek nyelvfüggetlenek — az indexek a szótár types tömbjével
 * egyeznek (garázs, csarnok, iroda, nyaraló, lakóház, saját fejlesztés).
 */
const typeImages = [
  "/images/epulettipusok/garazs-tarolo.jpg",
  "/images/epulettipusok/csarnok.jpg",
  "/images/epulettipusok/irodahaz.jpg",
  "https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&fit=crop&w=1200&q=80",
  "https://images.pexels.com/photos/30503925/pexels-photo-30503925.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/12932834/pexels-photo-12932834.jpeg?auto=compress&cs=tinysrgb&w=1200&h=900&fit=crop",
];

/** Melyik kártya melyik részletes aloldalra visz (null: az ajánlatkérőre). */
const typeLinks = [
  "/garazs-tarolo-epites",
  "/csarnok-muhely-epites",
  "/irodahaz-epites",
  "/csaladi-haz-generalkivitelezes",
  "/csaladi-haz-generalkivitelezes",
  null,
];

/** Megjelenítési sorrend: a családi ház (lakóház) áll elöl. */
const displayOrder = [4, 0, 1, 2, 3, 5];

export default function BuildingTypes() {
  const t = useT();

  return (
    <section id="epulettipusok" className="section-spacing relative" data-testid="building-types-section">
      <div className="container-custom">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="kicker mb-4">{t.buildingTypes.eyebrow}</p>
            <h2 className="text-[34px] font-bold leading-[1.05] tracking-[-0.03em] md:text-[54px]">
              {t.buildingTypes.titleBefore}{" "}
              <span className="text-accent-soft">{t.buildingTypes.titleAccent}</span>
            </h2>
          </div>
          <p className="max-w-[420px] leading-relaxed text-light-gray">{t.buildingTypes.description}</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {displayOrder.map((index) => {
            const type = t.buildingTypes.types[index];
            return (
              <a
                key={type.title}
                href={typeLinks[index] ?? "#ajanlatkeres"}
                className="group relative flex min-h-[360px] flex-col justify-end overflow-hidden rounded-3xl md:min-h-[420px]"
                data-testid={`building-type-${index}`}
              >
                <Image
                  src={typeImages[index]}
                  alt={type.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <span className="absolute inset-0 bg-[linear-gradient(0deg,rgba(10,20,36,0.92)_8%,rgba(10,20,36,0)_60%)]" />
                <span className="relative flex items-end justify-between gap-3 p-6">
                  <span>
                    <span className="block font-display text-[22px] font-bold text-white">{type.title}</span>
                    <span className="block text-sm text-[#C9D4E3]">{type.subtitle}</span>
                  </span>
                  <span
                    className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-white/[0.14] transition-colors group-hover:bg-accent"
                    aria-hidden="true"
                  >
                    <ArrowUpRight size={18} className="text-white" />
                  </span>
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
