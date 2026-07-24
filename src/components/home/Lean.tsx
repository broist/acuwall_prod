"use client";

import { motion } from "framer-motion";
import {
  Check,
  ClipboardList,
  Workflow,
  Gauge,
  ArrowDown,
  Route,
  ListChecks,
} from "lucide-react";

const pillars = [
  {
    icon: ClipboardList,
    title: "Részletes tervezés",
    description: "Minden fázis és szakág előre átgondolva, ütemezve.",
  },
  {
    icon: Workflow,
    title: "Összehangolt munkafolyamatok",
    description: "Tervezett sorrend, egymásra várás nélkül.",
  },
  {
    icon: Gauge,
    title: "Folyamatos ellenőrzés",
    description: "Végigkísért minőség és haladás.",
  },
];

const reductions = ["Várakozás", "Hibák", "Anyagveszteség"];

const benefits = [
  "Átlátható munkafolyamatok",
  "Részletes és követhető ütemezés",
  "Szakágak összehangolása",
  "Kevesebb állásidő és anyagveszteség",
  "Problémák korai felismerése",
  "Folyamatos minőségellenőrzés",
  "Kiszámíthatóbb határidők és költségek",
];

export default function Lean() {
  return (
    <section
      id="lean"
      className="section-spacing relative overflow-hidden"
      data-testid="lean-section"
    >
      {/* Megkülönböztető háttér: lágy mélyebb sáv + rács-textúra + accent ragyogás */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-deep/50 to-transparent" />
      <div className="absolute inset-0 grid-pattern opacity-[0.12]" />
      <div className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 h-72 w-[42rem] max-w-full rounded-full bg-accent/[0.07] blur-3xl" />

      <div className="container-custom relative">
        {/* Fejléc */}
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="eyebrow eyebrow-centered mb-6"
          >
            LEAN módszertan
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight mb-6"
          >
            Szervezett kivitelezés{" "}
            <span className="text-accent">LEAN szemléletben.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-light-gray text-base md:text-lg leading-relaxed"
          >
            Az AcuWall projektjein a nagyberuházásoknál alkalmazott szervezési és
            folyamatirányítási szemléletet visszük át a könnyűszerkezetes
            építésbe. Részletes tervezéssel, összehangolt munkafolyamatokkal és
            folyamatos ellenőrzéssel csökkentjük a várakozást, a hibákat és a
            felesleges anyagfelhasználást. Így a kivitelezés átláthatóbbá,
            kiszámíthatóbbá és hatékonyabbá válik —{" "}
            <span className="text-white font-medium">
              az ötlettől a kulcsátadásig
            </span>
            .
          </motion.p>
        </div>

        {/* Törzs: Hogyan (bal) + Miért (jobb) */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {/* HOGYAN kártya */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card p-8 md:p-10 flex flex-col"
            data-testid="lean-how-card"
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="icon-tile !h-12 !w-12 !rounded-xl">
                <Route size={22} />
              </span>
              <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                Hogyan valósítjuk meg?
              </h3>
            </div>

            <div className="space-y-5">
              {pillars.map((pillar) => (
                <div key={pillar.title} className="flex items-start gap-4">
                  <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 border border-accent/20 text-accent flex-shrink-0">
                    <pillar.icon size={18} />
                  </span>
                  <div>
                    <h4 className="text-white font-semibold leading-snug">
                      {pillar.title}
                    </h4>
                    <p className="text-light-gray text-sm leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Amit csökkentünk */}
            <div className="mt-auto pt-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-light-gray mb-3">
                Amit csökkentünk
              </p>
              <div className="flex flex-wrap gap-2.5">
                {reductions.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-primary-deep/60 px-3.5 py-1.5 text-sm text-white/85"
                  >
                    <ArrowDown
                      size={14}
                      className="text-accent"
                      strokeWidth={2.5}
                    />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* MIÉRT kártya */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="card p-8 md:p-10 relative overflow-hidden"
            data-testid="lean-why-card"
          >
            <div className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full bg-accent/10 blur-3xl" />
            <div className="relative">
              <div className="flex items-center gap-4 mb-8">
                <span className="icon-tile !h-12 !w-12 !rounded-xl">
                  <ListChecks size={22} />
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                  Miért a LEAN módszer?
                </h3>
              </div>

              <ul className="space-y-3.5">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-accent/15 text-accent flex-shrink-0">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    <span className="text-white/85 text-[15px] leading-snug">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
