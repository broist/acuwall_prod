"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useT } from "@/i18n/LanguageProvider";

export default function FAQ() {
  const t = useT();
  const faqs = t.faq.items;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="gyik" className="section-spacing relative bg-primary-deep/40" data-testid="faq-section">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="eyebrow eyebrow-centered mb-6"
          >
            {t.faq.eyebrow}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight"
          >
            {t.faq.titleBefore} <span className="text-accent">{t.faq.titleAccent}</span>
            {t.faq.titleAfter}
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="card max-w-3xl mx-auto px-6 md:px-10 py-4"
        >
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className={index < faqs.length - 1 ? "border-b border-white/10" : ""}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center gap-5 py-6 text-left group"
                  aria-expanded={isOpen}
                  data-testid={`faq-question-${index}`}
                >
                  <span
                    className={`inline-flex h-10 w-10 items-center justify-center rounded-xl flex-shrink-0 transition-all duration-300 ${
                      isOpen
                        ? "accent-gradient text-white shadow-lg shadow-accent/30"
                        : "bg-accent/10 border border-accent/25 text-accent group-hover:bg-accent/20"
                    }`}
                  >
                    {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                  </span>
                  <span className="text-white text-base md:text-lg font-semibold">
                    {faq.question}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="text-light-gray leading-relaxed pb-7 pl-[60px] pr-2">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
