"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "Mi van, ha nincs tervem?",
    answer:
      "Semmi gond — a legtöbben így érkeznek. Elkészítjük a terveket, a statikai számítást és a 3D modellt, Ön pedig a teljes kép ismeretében dönt.",
  },
  {
    question: "Kell engedély egy garázshoz?",
    answer:
      "Mérettől és településtől függ. Az engedélyezési utat mi tisztázzuk a helyi hatóságokkal — Önnek ezzel nem kell foglalkoznia.",
  },
  {
    question: "Mit jelent a „kulcsrakész” kifejezés?",
    answer:
      "Azt, hogy az épületet használatra készen adjuk át: alapozás, acélváz, panel, gépészet, elektromos szerelés és belsőépítészet után. Nem félkész szerkezetet kap, hanem kész épületet.",
  },
  {
    question: "Mennyibe kerül?",
    answer:
      "Minden projekt egyedi, ezért pontos, tételes ajánlatot adunk. Amit leírunk, azt visszük végig — utólag nem kerülnek elő tételek.",
  },
  {
    question: "Mennyi idő?",
    answer:
      "A szerkezet és a homlokzat előregyártott, a helyszíni munka jelentős része szerelésből áll. A pontos határidőt az ajánlatban és a szerződésben rögzítjük.",
  },
  {
    question: "Hol vállalunk munkát?",
    answer: "Országos szinten mindenhol. Bárhol is van a telke, keressen minket.",
  },
  {
    question: "Hogyan fizetek?",
    answer:
      "Ütemezetten, a szerződésben rögzített mérföldkövek szerint — mindig csak azért, ami elkészült.",
  },
  {
    question: "Van jótállás?",
    answer:
      "Igen. Az átadáshoz hibalista és fotók tartoznak, a garanciát a szerződés rögzíti. Az átadás után sem hagyjuk magára.",
  },
];

export default function FAQ() {
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
            Gyakori kérdések
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight"
          >
            Amit a <span className="text-accent">legtöbben</span> kérdeznek.
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
