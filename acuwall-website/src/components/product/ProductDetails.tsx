"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

export default function ProductDetails() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="section-spacing bg-primary relative"
      data-testid="product-details-section"
    >
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden">
              <Image
                src="/images/day-wall.png"
                alt="AcuWall zajvédő fal"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent/20 rounded-2xl blur-2xl" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6" data-testid="product-details-title">
              Termék bemutatás
            </h2>
            <div className="space-y-4 text-light-gray leading-relaxed">
              <p>
                Az AcuWall rendszer előregyártott zajvédő falpanelekből áll.
              </p>
              <p>
                A panelek vasbeton szerkezettel és fa-kompozit hangelnyelő réteggel készülnek, 
                amely hatékony zajcsillapítást biztosít.
              </p>
              <p>
                A rendszer gyorsan telepíthető, tartós és esztétikus megjelenésű.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
