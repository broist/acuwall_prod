"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const types = [
  {
    title: "Garázsok és tárolók",
    subtitle: "A leggyorsabb belépő — pár hét alatt",
    image:
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=1200&q=80",
    alt: "Modern garázsépület behajtóval",
  },
  {
    title: "Műhelyek és csarnokok",
    subtitle: "Gyártás vagy tárolás — megfelelő méretre szabva",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
    alt: "Ipari csarnok belső tere polcrendszerrel",
  },
  {
    title: "Irodaházak",
    subtitle: "Energiatakarékos iroda — hamarabbi beköltözés",
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80",
    alt: "Modern irodaépület belső tere",
  },
  {
    title: "Nyaralók",
    subtitle: "Vízparti pihenőhely — letisztult formában",
    image:
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=80",
    alt: "Vízparti nyaraló hegyekkel körülvéve",
  },
  {
    title: "Lakóházak",
    subtitle: "Otthon kulcsrakészen — 300 m²-ig egyszerűbb út",
    image:
      "https://images.unsplash.com/photo-1605146769289-440113cc3d00?auto=format&fit=crop&w=1200&q=80",
    alt: "Kulcsrakész családi házak gondozott előkerttel",
  },
  {
    title: "Saját fejlesztések",
    subtitle: "Befektetés — telek, ház, kert",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    alt: "Modern ház medencével — befektetési fejlesztés",
  },
];

export default function BuildingTypes() {
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
            Épülettípusok
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight mb-6"
          >
            Bármit tervez, <span className="text-accent">megépítjük.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-light-gray text-base md:text-lg"
          >
            A technológia ugyanaz, a méret és a papírmunka változik. Néhány
            tipikus eset:
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mb-16">
          {types.map((type, index) => (
            <motion.a
              key={type.title}
              href="#ajanlatkeres"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: (index % 3) * 0.1 }}
              className="group relative rounded-2xl overflow-hidden aspect-[4/3] border border-white/[0.07] block"
              data-testid={`building-type-${index}`}
            >
              <Image
                src={type.image}
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
            Fiatal cég vagyunk — <span className="text-accent">és ezt nem szépítjük.</span>
          </h3>
          <p className="text-light-gray text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Most építjük az első projektjeinket — hamarosan itt lesznek. Addig
            az számít, amit feketén-fehéren vállalunk: írott szerződés,
            ütemezett fizetés és garancia. Ön nem ígéreteket vásárol, hanem
            leírt, betartott feltételeket.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
