"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

export default function CrossSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const labelsOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);

  return (
    <section
      ref={containerRef}
      className="section-spacing bg-dark-blue relative overflow-hidden"
      data-testid="cross-section-section"
    >
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-10" />

      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" data-testid="cross-section-title">
            Szerkezeti felépítés
          </h2>
          <p className="text-light-gray text-lg max-w-2xl mx-auto">
            Görgessen a panel keresztmetszetének felfedéséhez
          </p>
        </motion.div>

        {/* Cross Section Visual */}
        <div className="relative max-w-4xl mx-auto">
          <motion.div
            className="relative w-full rounded-2xl overflow-hidden shadow-2xl bg-black"
            style={{ scale: imageScale, aspectRatio: '3/4' }}
          >
            <Image
              src="/images/cross-section-real.png"
              alt="AcuWall panel keresztmetszet"
              fill
              className="object-contain"
            />
          </motion.div>

          {/* Layer Labels */}
          <motion.div
            style={{ opacity: labelsOpacity }}
            className="absolute inset-0 pointer-events-none"
          >
            {/* Outer Layer - Left */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:translate-x-0">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.5 }}
                className="bg-primary/90 backdrop-blur-sm border border-accent/30 rounded-lg p-4 max-w-[200px]"
              >
                <div className="w-3 h-3 rounded-full bg-[#8B7355] mb-2" />
                <h4 className="text-white font-semibold text-sm mb-1">Fa-kompozit réteg</h4>
                <p className="text-light-gray text-xs">Hangelnyelő fabeton</p>
              </motion.div>
            </div>

            {/* Core - Right */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-0">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.7 }}
                className="bg-primary/90 backdrop-blur-sm border border-accent/30 rounded-lg p-4 max-w-[200px]"
              >
                <div className="w-3 h-3 rounded-full bg-[#9CA3AF] mb-2" />
                <h4 className="text-white font-semibold text-sm mb-1">Vasbeton mag</h4>
                <p className="text-light-gray text-xs">Szerkezeti stabilitás</p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Structure Steps */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20"
        >
          <h3 className="text-2xl font-bold mb-8 text-center">Telepítési folyamat</h3>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: 1, title: "Alapozás készítése" },
              { step: 2, title: "HEA acél tartógerendák elhelyezése" },
              { step: 3, title: "Indító vasbeton lábazati elem beépítése" },
              { step: 4, title: "Előregyártott falpanelek egymásra helyezése" },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-xl p-6 text-center"
                data-testid={`structure-step-${item.step}`}
              >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-accent text-white font-bold mb-4">
                  {item.step}
                </span>
                <p className="text-white text-sm">{item.title}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
