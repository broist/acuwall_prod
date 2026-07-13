"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ProductHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[70vh] flex items-center justify-center overflow-hidden"
      data-testid="product-hero-section"
    >
      {/* Background */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <Image
          src="/images/texture.png"
          alt="AcuWall panel textúra"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/70 to-primary" />
      </motion.div>

      {/* Content */}
      <motion.div style={{ opacity }} className="relative z-10 container-custom text-center pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block text-accent text-sm font-semibold tracking-wider uppercase mb-4">
            Termék és szolgáltatások
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" data-testid="product-hero-title">
            AcuWall zajvédő falrendszer
          </h1>
          <p className="text-light-gray text-lg md:text-xl max-w-3xl mx-auto">
            Modern, előregyártott zajvédő falpanelekből álló rendszer ipari és lakossági alkalmazásra.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
