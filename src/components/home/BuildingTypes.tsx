"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useT } from "@/i18n/LanguageProvider";

/** A képek nyelvfüggetlenek — a sorrend a szótár types tömbjével egyezik. */
const typeImages = [
  "/images/epulettipusok/garazs-tarolo.jpg",
  "/images/epulettipusok/csarnok.jpg",
  "/images/epulettipusok/irodahaz.jpg",
  "https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=80",
  "https://images.pexels.com/photos/12932834/pexels-photo-12932834.jpeg?auto=compress&cs=tinysrgb&w=1200&h=900&fit=crop",
];

export default function BuildingTypes() {
  const t = useT();

  return (
    <section id="epulettipusok" className="section-spacing relative" data-testid="building-types-section">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="eyebrow eyebrow-centered mb-6"
          >
            {t.buildingTypes.eyebrow}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight mb-6"
          >
            {t.buildingTypes.titleBefore}{" "}
            <span className="text-accent">{t.buildingTypes.titleAccent}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-light-gray text-base md:text-lg"
          >
            {t.buildingTypes.description}
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mb-16">
          {t.buildingTypes.types.map((type, index) => (
            <motion.a
              key={type.title}
              href="#ajanlatkeres"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: (index % 3) * 0.1 }}
              className="group relative rounded-2xl overflow-hidden aspect-[16/10] border border-white/[0.07] block"
              data-testid={`building-type-${index}`}
            >
              <Image
                src={typeImages[index]}
                alt={type.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-deep/95 via-primary-deep/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="text-white text-lg md:text-xl font-bold mb-1">{type.title}</h3>
                <p className="text-white/70 text-sm">{type.subtitle}</p>
              </div>
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-accent/50 rounded-2xl transition-colors duration-300" />
            </motion.a>
          ))}
        </div>

        {/* Őszinteség kártya */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="card max-w-4xl mx-auto p-10 md:p-14 text-center"
          data-testid="young-company-card"
        >
          <span className="icon-tile !h-14 !w-14 !rounded-2xl mb-7">
            <Sparkles size={26} />
          </span>
          <h3 className="text-2xl md:text-3xl font-bold mb-5 tracking-tight">
            {t.buildingTypes.honestyTitleBefore}{" "}
            <span className="text-accent">{t.buildingTypes.honestyTitleAccent}</span>
          </h3>
          <p className="text-light-gray text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            {t.buildingTypes.honestyText}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
