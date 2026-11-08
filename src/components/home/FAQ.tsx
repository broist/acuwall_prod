"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { useT } from "@/i18n/LanguageProvider";

export default function FAQ() {
  const t = useT();
  const faqs = t.faq.items;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="gyik" className="section-spacing relative" data-testid="faq-section">
      <div className="container-custom grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.7fr)] lg:gap-16">
        <div>
          <p className="kicker mb-4">{t.faq.eyebrow}</p>
          <h2 className="text-[34px] font-bold leading-[1.05] tracking-[-0.03em] md:text-[54px]">
            {t.faq.titleBefore} <span className="text-accent-soft">{t.faq.titleAccent}</span>
            {t.faq.titleAfter}
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className={`rounded-[18px] border bg-tile transition-colors duration-300 ${
                  isOpen ? "border-accent-soft/35" : "border-white/[0.07]"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left md:px-7"
                  aria-expanded={isOpen}
                  data-testid={`faq-question-${index}`}
                >
                  <span className="text-base font-semibold text-white md:text-lg">{faq.question}</span>
                  <span
                    className={`inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full transition-colors ${
                      isOpen ? "bg-accent/[0.18] text-accent-soft" : "bg-white/[0.06] text-white/70"
                    }`}
                  >
                    {isOpen ? <Minus size={17} /> : <Plus size={17} />}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 leading-relaxed text-light-gray md:px-7">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
