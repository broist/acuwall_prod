"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "24%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <section
      id="fooldal"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      data-testid="hero-section"
    >
      <motion.div style={{ y, scale }} className="absolute inset-0 z-0">
        <Image
          src="https://images.pexels.com/photos/17180778/pexels-photo-17180778.jpeg?auto=compress&cs=tinysrgb&w=2200"
          alt="Acél könnyűszerkezetes ház természetes környezetben"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/85 via-primary/70 to-primary" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/60 via-primary/30 to-primary/60" />
      </motion.div>

      <div className="absolute inset-0 grid-pattern opacity-25 z-10" />

      <motion.div
        style={{ opacity }}
        className="relative z-20 container-custom pt-28 pb-24 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="eyebrow eyebrow-centered mb-7"
          >
            Acél könnyűszerkezetes generálkivitelezés
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-bold mb-8 leading-[1.08] tracking-tight"
            data-testid="hero-title"
          >
            Könnyűszerkezetes épület kulcsrakészen,{" "}
            <span className="text-accent">egy felelőssel.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="text-lg md:text-xl text-light-gray max-w-3xl mx-auto mb-10 leading-relaxed"
            data-testid="hero-subtitle"
          >
            Garázstól és műhelytől az irodaházig, nyaralótól a családi házig.
            Megtervezzük és fel is építjük — alapozás, lábazat, aljzat, acélváz,
            acél tetőszerkezet, falburkolás, nyílászárók, gépészet, elektromos
            szerelés, befejező munkák. Önnek elég csak{" "}
            <strong className="text-accent font-bold">egy partner</strong>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="#ajanlatkeres"
              className="btn-primary inline-flex items-center justify-center gap-2 group"
              data-testid="hero-cta-quote"
            >
              Ajánlatot kérek
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </motion.div>

      <motion.a
        href="#bemutatkozas"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/50 hover:text-white/80 transition-colors"
        aria-label="Görgessen lejjebb"
      >
        <span className="text-[11px] font-semibold uppercase tracking-[0.35em]">Görgessen</span>
        <ArrowDown size={16} className="animate-bounce-slow" />
      </motion.a>
    </section>
  );
}
