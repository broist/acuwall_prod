"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";

export default function CTA() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="py-24 md:py-32 bg-primary relative overflow-hidden"
      data-testid="cta-section"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-accent/10 via-transparent to-accent/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6" data-testid="cta-title">
            Készen áll a projektre?
          </h2>
          <p className="text-light-gray text-lg mb-10">
            Kérjen egyedi ajánlatot most, és indítsa el zajvédelmi projektjét!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/ajanlatkeres"
              className="btn-primary inline-flex items-center justify-center gap-2 group"
              data-testid="cta-quote-button"
            >
              Ajánlatkérés
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="tel:+36308305556"
              className="btn-secondary inline-flex items-center justify-center gap-2"
              data-testid="cta-phone-button"
            >
              <Phone size={18} />
              +36 30 830 5556
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
