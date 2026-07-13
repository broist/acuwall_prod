"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Volume, Shield, Clock, Factory, CloudSun, Timer } from "lucide-react";

const advantages = [
  {
    icon: Volume,
    title: "25-30 dB zajcsillapítás",
    description: "Hatékony zajcsökkentés minden körülmények között",
  },
  {
    icon: Shield,
    title: "Masszív szerkezet",
    description: "Vasbeton és fa-kompozit (fabeton) anyagkombináció",
  },
  {
    icon: Clock,
    title: "Gyors telepítés",
    description: "Előregyártott elemekből gyors összeállítás",
  },
  {
    icon: Factory,
    title: "Ipari minőség",
    description: "Szigorú minőségi szabványoknak megfelelő",
  },
  {
    icon: CloudSun,
    title: "Időjárásálló",
    description: "Ellenáll a szélsőséges időjárási viszonyoknak",
  },
  {
    icon: Timer,
    title: "Hosszú élettartam",
    description: "Több évtizedes élettartam minimális karbantartással",
  },
];

export default function Advantages() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="section-spacing bg-dark-blue relative overflow-hidden"
      data-testid="advantages-section"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      
      {/* Accent Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" data-testid="advantages-title">
            Előnyök
          </h2>
          <p className="text-light-gray text-lg max-w-2xl mx-auto">
            Miért válassza az AcuWall zajvédő falrendszert?
          </p>
        </motion.div>

        {/* Advantages Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {advantages.map((advantage, index) => (
            <motion.div
              key={advantage.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
              data-testid={`advantage-card-${index}`}
            >
              <div className="h-full bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/8 hover:border-accent/30 transition-all duration-500 hover:-translate-y-1">
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                  <advantage.icon className="text-accent" size={28} />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">{advantage.title}</h3>
                <p className="text-light-gray leading-relaxed">{advantage.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
