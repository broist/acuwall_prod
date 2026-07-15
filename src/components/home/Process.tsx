"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Beszélgetünk",
    label: "Kötetlen konzultáció",
    description:
      "Elmondja, mire van szüksége: mit, mekkorát, hová. Nem köteleződik semmire.",
  },
  {
    number: "02",
    title: "Tervek és tartalom",
    label: "Előkészítés",
    description:
      "Ha kell, elkészítjük a terveket, a statikát és a 3D modellt, és tisztázzuk a hatósági utat. Ha már megvannak, a tervei alapján dolgozunk.",
  },
  {
    number: "03",
    title: "Ajánlat és szerződés",
    label: "Írásba foglalva",
    description:
      "Írásban kapja a tartalmat, az ütemezett fizetést, a felelősségi határokat és a garanciát.",
  },
  {
    number: "04",
    title: "Megépítjük",
    label: "Kivitelezés",
    description:
      "Beszerzés, alapozás, váz, homlokzat, szakmunkák — Ön közben végig követi a haladást.",
  },
  {
    number: "05",
    title: "Átadjuk a kulcsot",
    label: "Átadás és garancia",
    description:
      "Közös bejárás, hibalista, dokumentáció és garancia. Innentől az Öné — mi azután is itt vagyunk.",
  },
];

export default function Process() {
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
            Folyamat
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight mb-6"
          >
            Az ötlettől a kulcsátadásig,{" "}
            <span className="text-accent">lépésről lépésre.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-light-gray text-base md:text-lg leading-relaxed"
          >
            Egyszerű, követhető út. Minden lépésnek van gazdája, határideje és
            írásos nyoma, hogy Ön mindig tudja, hol tartunk.
          </motion.p>
        </div>

        <div className="relative">
          {/* Összekötő vonal (desktop) */}
          <div className="hidden lg:block absolute top-7 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-x-6 gap-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.1 }}
                className="text-center relative"
                data-testid={`process-step-${step.number}`}
              >
                <div className="relative inline-flex mb-6">
                  <span className="accent-gradient inline-flex h-14 w-14 items-center justify-center rounded-full text-white font-bold shadow-lg shadow-accent/30">
                    {step.number}
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
