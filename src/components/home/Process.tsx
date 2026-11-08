"use client";

import { useT } from "@/i18n/LanguageProvider";

export default function Process() {
  const t = useT();
  const steps = t.process.steps;

  return (
    <section id="folyamat" className="section-spacing relative" data-testid="process-section">
      <div className="container-custom">
        <div className="mx-auto mb-16 max-w-[720px] text-center">
          <p className="kicker mb-4">{t.process.eyebrow}</p>
          <h2 className="mb-6 text-[34px] font-bold leading-[1.05] tracking-[-0.03em] md:text-[54px]">
            {t.process.titleBefore} <span className="text-accent-soft">{t.process.titleAccent}</span>
          </h2>
          <p className="leading-relaxed text-light-gray md:text-lg">{t.process.description}</p>
        </div>

        <ol className="grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((step, index) => {
            const isFirst = index === 0;
            const isLast = index === steps.length - 1;
            return (
              <li key={step.title} data-testid={`process-step-0${index + 1}`}>
                <div className="mb-6 flex items-center gap-3">
                  <span
                    className={`inline-flex h-[52px] w-[52px] flex-shrink-0 items-center justify-center rounded-full font-display text-lg font-bold ${
                      isFirst
                        ? "bg-accent-deep text-white shadow-[0_0_0_8px_rgba(232,56,13,0.15)]"
                        : "border border-[#2B4466] bg-[#15273F] text-white"
                    }`}
                  >
                    {index + 1}
                  </span>
                  {!isLast && (
                    <span
                      aria-hidden="true"
                      className={`hidden h-0.5 flex-1 lg:block ${
                        isFirst ? "bg-gradient-to-r from-accent-deep to-[#1E3350]" : "bg-[#1E3350]"
                      }`}
                    />
                  )}
                </div>
                <h3 className="mb-1 text-[21px] font-bold text-white">{step.title}</h3>
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-soft">
                  {step.label}
                </p>
                <p className="text-[15px] leading-relaxed text-light-gray">{step.description}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
