"use client";

import { motion } from "framer-motion";
import { useT } from "@/i18n/LanguageProvider";

const stepNumbers = ["01", "02", "03", "04", "05"];

export default function Process() {
  const t = useT();

  return (
    <section id="folyamat" className="section-spacing relative bg-primary-deep/40" data-testid="process-section">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="eyebrow eyebrow-centered mb-6"
          >
            {t.process.eyebrow}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight mb-6"
          >
            {t.process.titleBefore}{" "}
            <span className="text-accent">{t.process.titleAccent}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-light-gray text-base md:text-lg leading-relaxed"
          >
            {t.process.description}
          </motion.p>
        </div>

        <div className="relative">
          {/* Összekötő vonal (desktop) */}
          <div className="hidden lg:block absolute top-7 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-x-6 gap-y-12">
            {t.process.steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.1 }}
                className="text-center relative"
                data-testid={`process-step-${stepNumbers[index]}`}
              >
                <div className="relative inline-flex mb-6">
                  <span className="accent-gradient inline-flex h-14 w-14 items-center justify-center rounded-full text-white font-bold shadow-lg shadow-accent/30">
                    {stepNumbers[index]}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-1.5">{step.title}</h3>
                <p className="text-accent text-[11px] font-semibold uppercase tracking-[0.2em] mb-4">
                  {step.label}
                </p>
                <p className="text-light-gray text-sm leading-relaxed max-w-[260px] mx-auto">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
