"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Shield, Zap, Award } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Masszív stabiltás",
    description: "Vasbeton szerkezet a maximális statikai biztonságért",
  },
  {
    icon: Zap,
    title: "Kiváló zajelnyelés",
    description: "Fa-kompozit (fabeton) hangelnyelő réteg",
  },
  {
    icon: Award,
    title: "Hosszú élettartam",
    description: "Időjárásálló, tartós kialakítás",
  },
];

export default function Introduction() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="section-spacing bg-primary relative overflow-hidden"
      data-testid="introduction-section"
    >
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent/5 to-transparent" />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight" data-testid="intro-title">
              Bemuatkozás
            </h2>
            <p className="text-light-gray text-lg leading-relaxed mb-8" data-testid="intro-description">
              Az AcuWall zajvédő falrendszer egy modern, előregyártott szerkezet, amely 
              vasbeton és fa-kompozit (fabeton) anyag kombinációjával készül.
            </p>
            <p className="text-light-gray leading-relaxed mb-10">
              Ez a szerkezeti kialakítás biztosítja a masszív statikai stabilitást, 
              a kiváló zajelnyelési tulajdonságokat és a hosszú élettartamot. 
              A rendszer ipari és lakossági környezetben egyaránt alkalmazható.
            </p>

            {/* Feature Cards */}
            <div className="grid sm:grid-cols-3 gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/8 transition-all duration-300 group"
                  data-testid={`intro-feature-${index}`}
                >
                  <feature.icon className="text-accent mb-3 group-hover:scale-110 transition-transform" size={24} />
                  <h4 className="text-white font-semibold text-sm mb-1">{feature.title}</h4>
                  <p className="text-light-gray text-xs">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/images/day-wall.png"
                alt="AcuWall zajvédő falrendszer telepítve"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
            </div>

            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="absolute -bottom-6 -left-6 bg-accent text-white px-6 py-4 rounded-xl shadow-xl shadow-accent/30"
            >
              <p className="text-2xl font-bold">25+ év</p>
              <p className="text-sm opacity-90">élettartam</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
