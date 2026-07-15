"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";

export default function CTA() {
  return (
    <section className="relative py-28 md:py-36 overflow-hidden" data-testid="cta-section">
      <div className="absolute inset-0">
        <Image
          src="https://images.pexels.com/photos/17180778/pexels-photo-17180778.jpeg?auto=compress&cs=tinysrgb&w=2000"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-primary/90" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/80 to-primary" />
      </div>
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div className="relative container-custom text-center">
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl lg:text-[3.4rem] font-bold leading-tight tracking-tight mb-7 max-w-5xl mx-auto"
        >
          Szerintünk itt az ideje elkezdeni átemelni a valóságba{" "}
          <span className="text-accent">az Ön terveit is!</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-light-gray text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Mondja el pár szóban, mit tervez — a tervezéstől a kivitelezésig
          megoldjuk. Nem köteleződik el semmire.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#ajanlatkeres"
            className="btn-primary inline-flex items-center justify-center gap-2 group"
            data-testid="cta-quote-button"
          >
            Ajánlatot kérek
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="tel:+36308305556"
            className="btn-secondary inline-flex items-center justify-center gap-2.5"
            data-testid="cta-phone-button"
          >
            <Phone size={18} />
            +36 30 830 5556
          </a>
        </motion.div>
      </div>
    </section>
  );
}
