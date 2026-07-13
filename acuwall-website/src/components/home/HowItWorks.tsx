"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FileText, Ruler, Truck } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: FileText,
    title: "Ajánlatkérés",
    description: "Az ügyfél megadja a projekt alapadatait.",
  },
  {
    number: "02",
    icon: Ruler,
    title: "Tervezés",
    description: "Meghatározzuk a szükséges falmagasságot és mennyiséget.",
  },
  {
    number: "03",
    icon: Truck,
    title: "Kivitelezés",
    description: "A zajvédő fal szállítása és telepítése országos szinten történik.",
  },
];

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="section-spacing bg-primary relative overflow-hidden"
      data-testid="how-it-works-section"
    >
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" data-testid="how-it-works-title">
            Hogyan működik?
          </h2>
          <p className="text-light-gray text-lg max-w-2xl mx-auto">
            Egyszerű és átlátható folyamat a megrendeléstől a telepítésig
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent/30 to-transparent -translate-y-1/2" />

          <div className="grid md:grid-cols-3 gap-8 lg:gap-16">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative text-center"
                data-testid={`step-${index + 1}`}
              >
                {/* Step Number */}
                <div className="relative z-10 inline-flex flex-col items-center">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="w-24 h-24 rounded-2xl bg-gradient-to-br from-accent to-accent-hover flex items-center justify-center mb-6 shadow-xl shadow-accent/30"
                  >
                    <step.icon size={40} className="text-white" />
                  </motion.div>
                  
                  {/* Number Badge */}
                  <span className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-primary border-2 border-accent flex items-center justify-center text-accent font-bold text-sm">
                    {step.number}
                  </span>
                </div>

                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-light-gray leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
