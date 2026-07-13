"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      data-testid="hero-section"
    >
      {/* Background Image with Parallax */}
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/images/night-wall.png"
          alt="AcuWall zajvédő fal"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-primary" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/70 via-transparent to-primary/70" />
      </motion.div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 grid-pattern opacity-30 z-10" />

      {/* Floating 3D Elements */}
      <motion.div
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-[10%] w-32 h-32 bg-accent/10 rounded-full blur-3xl z-10"
      />
      <motion.div
        animate={{ y: [10, -10, 10] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 left-[15%] w-48 h-48 bg-accent/5 rounded-full blur-3xl z-10"
      />

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-20 container-custom text-center pt-20"
      >
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          data-testid="hero-title"
        >
          <span className="block">Csend. Tartósság.</span>
          <span className="block text-accent">Professzionális zajvédelem.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-light-gray max-w-3xl mx-auto mb-10 leading-relaxed"
          data-testid="hero-subtitle"
        >
          Az AcuWall zajvédő falrendszere hatékony és tartós megoldást kínál ipari 
          telephelyek, logisztikai központok, utak és lakóövezetek zajterhelésének 
          csökkentésére.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            href="/ajanlatkeres"
            className="btn-primary inline-flex items-center justify-center gap-2 group"
            data-testid="hero-cta-quote"
          >
            Ajánlatkérés
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <Link
            href="/termek"
            className="btn-secondary inline-flex items-center justify-center gap-2 relative overflow-hidden group"
            data-testid="hero-cta-product"
          >
            <span className="relative z-10">Termék megismerése</span>
            <span className="absolute inset-0 bg-white/5 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out"></span>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
