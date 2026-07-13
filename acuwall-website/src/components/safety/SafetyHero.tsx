"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function SafetyHero() {
  return (
    <section
      className="relative min-h-[60vh] flex items-center justify-center overflow-hidden"
      data-testid="safety-hero-section"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzNTl8MHwxfHNlYXJjaHwzfHxjb25zdHJ1Y3Rpb24lMjBzYWZldHl8ZW58MHx8fHwxNzczNTYyMzA4fDA&ixlib=rb-4.1.0&q=85"
          alt="Munkavédelmi háttér"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/80 to-primary" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-transparent to-primary/80" />
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-20 z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl z-10" />

      {/* Content */}
      <div className="relative z-10 container-custom text-center pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block text-accent text-sm font-semibold tracking-wider uppercase mb-4">
            Munkavédelem
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" data-testid="safety-hero-title">
            Biztonság minden szinten
          </h1>
          <p className="text-light-gray text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Az AcuWall számára a biztonság nem csupán a zajvédelemről szól. Nemcsak falaink 
            biztosítják az emberek nyugalmát és keltik bennük a biztonságérzetet, hanem 
            vállalatunk munkavédelemmel foglalkozó üzletága is, amely a legkisebb projektektől 
            a legnagyobb beruházásokig támogatja a biztonságos munkavégzést.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
