"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Shield } from "lucide-react";

export default function SafetyCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="section-spacing bg-dark-blue relative overflow-hidden"
      data-testid="safety-cta-section"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-accent/5" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Related Service Box */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12">
            <div className="flex items-start gap-6 mb-8">
              <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
                <Shield className="text-accent" size={28} />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4">Kapcsolódó szolgáltatás</h3>
                <p className="text-light-gray leading-relaxed">
                  Az AcuWall egyedülálló módon ötvözi a zajvédelmi mérnöki megoldásokat és a 
                  munkavédelmi szakértelmet, így partnereink számára nemcsak a környezeti zaj 
                  csökkentésében, hanem a biztonságos munkavégzés megteremtésében is teljes 
                  körű támogatást nyújtunk.
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/ajanlatkeres"
                className="btn-primary inline-flex items-center justify-center gap-2 group"
                data-testid="safety-cta-quote"
              >
                Ajánlatkérés
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/kapcsolat"
                className="btn-secondary inline-flex items-center justify-center"
                data-testid="safety-cta-contact"
              >
                Kapcsolatfelvétel
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
