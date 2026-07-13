"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Users, BookOpen, Wrench, Award, Zap } from "lucide-react";

const benefits = [
  { icon: Users, title: "Tapasztalt szakemberek" },
  { icon: BookOpen, title: "Naprakész jogszabályi ismeretek" },
  { icon: Wrench, title: "Komplex kivitelezési tapasztalat" },
  { icon: Award, title: "Megbízható szakmai háttér" },
  { icon: Zap, title: "Gyors és rugalmas együttműködés" },
];

export default function SafetyBenefits() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="section-spacing relative overflow-hidden"
      data-testid="safety-benefits-section"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1552879890-3a06dd3a06c2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzNTl8MHwxfHNlYXJjaHw0fHxjb25zdHJ1Y3Rpb24lMjBzYWZldHl8ZW58MHx8fHwxNzczNTYyMzA4fDA&ixlib=rb-4.1.0&q=85"
          alt="Munkavédelmi háttér"
          fill
          className="object-cover"
          quality={90}
        />
        <div className="absolute inset-0 bg-primary/95" />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="safety-benefits-title">
            Miért válassza az AcuWall munkavédelmi szolgáltatásait?
          </h2>
        </motion.div>

        {/* Benefits */}
        <div className="flex flex-wrap justify-center gap-4">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-full px-6 py-3 flex items-center gap-3 hover:border-accent/30 hover:bg-white/8 transition-all duration-300 backdrop-blur-sm"
              data-testid={`safety-benefit-${index}`}
            >
              <benefit.icon className="text-accent" size={20} />
              <span className="text-white font-medium">{benefit.title}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
