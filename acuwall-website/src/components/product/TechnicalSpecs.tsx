"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Ruler, Box, Volume2, Shield, MapPin } from "lucide-react";

const specs = [
  { icon: Ruler, label: "Panel hossz", value: "4 méter" },
  { icon: Ruler, label: "Panel magasság", value: "0,5 méter" },
  { icon: Box, label: "Panel vastagság", value: "12 cm" },
  { icon: Box, label: "Panel tömeg", value: "kb. 450 kg" },
];

const certifications = [
  {
    icon: Volume2,
    title: "Hangelnyelési besorolás",
    value: "A4 osztály",
    standard: "MSZ EN 1793-1:2013",
  },
  {
    icon: Shield,
    title: "Hanggátlási besorolás",
    value: "B3 osztály",
    standard: "MSZ EN 1793-2:2013",
    note: "diffúz hangtéri feltételek között",
  },
  {
    icon: MapPin,
    title: "Helyszíni hanggátlás",
    value: "D3 osztály",
    standard: "MSZ EN 1793-6:2013",
  },
];

export default function TechnicalSpecs() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="section-spacing bg-primary relative"
      data-testid="technical-specs-section"
    >
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" data-testid="specs-title">
            Műszaki adatok
          </h2>
          <p className="text-light-gray text-lg max-w-2xl mx-auto">
            Szabványos panel méretek és minőségi tanúsítványok
          </p>
        </motion.div>

        {/* Specs Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {specs.map((spec, index) => (
            <motion.div
              key={spec.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-xl p-6 text-center hover:border-accent/30 transition-colors"
              data-testid={`spec-${index}`}
            >
              <spec.icon className="mx-auto text-accent mb-4" size={32} />
              <p className="text-light-gray text-sm mb-2">{spec.label}</p>
              <p className="text-2xl font-bold text-white">{spec.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold mb-8 text-center">Minőségi tanúsítványok</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-8 hover:border-accent/30 transition-all duration-300"
                data-testid={`certification-${index}`}
              >
                <cert.icon className="text-accent mb-4" size={28} />
                <h4 className="text-white font-semibold mb-2">{cert.title}</h4>
                <p className="text-3xl font-bold text-accent mb-2">{cert.value}</p>
                <p className="text-light-gray text-sm">{cert.standard}</p>
                {cert.note && (
                  <p className="text-medium-gray text-xs mt-2">{cert.note}</p>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
