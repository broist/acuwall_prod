"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const galleryItems = [
  {
    src: "/images/texture.png",
    alt: "AcuWall panel felületi textúra",
    title: "Panel felület",
    description: "Hangelnyelő bordázott kialakítás",
  },
  {
    src: "/images/cross-section.png",
    alt: "AcuWall keresztmetszet",
    title: "Keresztmetszet",
    description: "Vasbeton mag és fabeton réteg",
  },
  {
    src: "/images/day-wall.png",
    alt: "AcuWall telepített zajvédő fal nappal",
    title: "Telepített rendszer",
    description: "Lakóövezeti alkalmazás",
  },
  {
    src: "/images/night-wall.png",
    alt: "AcuWall zajvédő fal éjszaka",
    title: "Út menti védelem",
    description: "Hatékony zajcsökkentés éjjel-nappal",
  },
];

export default function Gallery() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="section-spacing bg-dark-blue relative overflow-hidden"
      data-testid="gallery-section"
    >
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" data-testid="gallery-title">
            Termékeink
          </h2>
          <p className="text-light-gray text-lg max-w-2xl mx-auto">
            Fedezze fel az AcuWall zajvédő falrendszer részleteit
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer"
              data-testid={`gallery-item-${index}`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              
              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
                <p className="text-light-gray text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.description}
                </p>
              </div>

              {/* Hover Border Effect */}
              <div className="absolute inset-0 border-2 border-accent/0 group-hover:border-accent/50 rounded-2xl transition-colors duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
