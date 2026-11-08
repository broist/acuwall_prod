"use client";

import Image from "next/image";
import { FileSignature, ReceiptText, ShieldCheck } from "lucide-react";
import { useT } from "@/i18n/LanguageProvider";

const pillarIcons = [FileSignature, ReceiptText, ShieldCheck];

export default function Introduction() {
  const t = useT();

  return (
    <section id="bemutatkozas" className="section-spacing relative" data-testid="introduction-section">
      <div className="container-custom">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="kicker mb-4">{t.intro.eyebrow}</p>
            <h2 className="mb-8 text-[34px] font-bold leading-[1.05] tracking-[-0.03em] md:text-[54px]">
              {t.intro.titleBefore} <span className="text-accent-soft">{t.intro.titleAccent}</span>
              {t.intro.titleAfter}
            </h2>
            <div className="mb-10 space-y-5 text-base leading-relaxed text-light-gray md:text-lg">
              <p>{t.intro.paragraph1}</p>
              <p>{t.intro.paragraph2}</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {t.intro.pillars.map((pillar, index) => {
                const Icon = pillarIcons[index];
                return (
                  <div key={pillar.title} className="tile p-5">
                    <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent/[0.14]">
                      <Icon size={20} className="text-accent-soft" />
                    </span>
                    <h3 className="mb-2 font-bold leading-snug text-white">{pillar.title}</h3>
                    <p className="text-sm leading-relaxed text-light-gray">{pillar.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[26px] border border-white/[0.07]">
              <Image
                src="https://images.pexels.com/photos/4792498/pexels-photo-4792498.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1500&fit=crop"
                alt={t.intro.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-deep/60 via-transparent to-transparent" />
            </div>

            <div className="absolute -bottom-6 left-6 overflow-hidden rounded-[18px] border border-white/[0.08] bg-tile px-7 py-5 shadow-2xl shadow-black/40 md:-left-8">
              <span className="tile-accent-line left-7 !w-14" aria-hidden="true" />
              <p className="font-display text-xl font-bold leading-none text-white md:text-2xl">
                {t.intro.badgeTitle}
              </p>
              <p className="mt-1.5 text-sm text-light-gray">{t.intro.badgeSubtitle}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
