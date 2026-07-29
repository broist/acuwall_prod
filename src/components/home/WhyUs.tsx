"use client";

import { motion } from "framer-motion";
import {
  KeyRound,
  ShieldCheck,
  Zap,
  FileCheck2,
  Camera,
  PhoneCall,
} from "lucide-react";
import { useT } from "@/i18n/LanguageProvider";

const reasonIcons = [KeyRound, ShieldCheck, Zap, FileCheck2, Camera, PhoneCall];

export default function WhyUs() {
  const t = useT();

  return (
    <section className="section-spacing relative bg-primary-deep/40" data-testid="why-us-section">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="eyebrow eyebrow-centered mb-6"
          >
            {t.whyUs.eyebrow}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight"
          >
            {t.whyUs.titleBefore} <span className="text-accent">{t.whyUs.titleAccent}</span>
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {t.whyUs.reasons.map((reason, index) => {
            const Icon = reasonIcons[index];
            return (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: (index % 3) * 0.1 }}
                className="card card-hover p-7 md:p-8"
                data-testid={`why-us-card-${index}`}
              >
                <span className="icon-tile mb-6">
                  <Icon size={22} />
                </span>
                <h3 className="text-lg md:text-xl font-bold text-white mb-3 leading-snug">
                  {reason.title}
                </h3>
                <p className="text-light-gray leading-relaxed">{reason.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
