"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useT } from "@/i18n/LanguageProvider";

export default function PrivacyContent() {
  const t = useT();

  return (
    <section className="section-spacing pt-32 md:pt-40">
      <div className="container-custom max-w-3xl">
        <Link
          href="/#ajanlatkeres"
          className="inline-flex items-center gap-2 text-light-gray hover:text-white text-sm mb-10 transition-colors"
        >
          <ArrowLeft size={16} />
          {t.privacy.back}
        </Link>

        <span className="eyebrow mb-6">{t.privacy.eyebrow}</span>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-10 tracking-tight">
          {t.privacy.titleBefore} <span className="text-accent">{t.privacy.titleAccent}</span>
        </h1>

        <div className="space-y-8 text-light-gray leading-relaxed">
          {t.privacy.sections.map((section) => (
            <div key={section.title} className="card p-7">
              <h2 className="text-white text-xl font-bold mb-3">{section.title}</h2>
              <p>
                {section.body}
                {section.contact && (
                  <>
                    <br />
                    {section.contact}
                  </>
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
