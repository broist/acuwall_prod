"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { MessageSquare, FileText, AlertTriangle, GraduationCap, Eye, Users } from "lucide-react";

const services = [
  {
    icon: MessageSquare,
    title: "Munkavédelmi tanácsadás",
  },
  {
    icon: FileText,
    title: "Munkavédelmi dokumentációk elkészítése",
  },
  {
    icon: AlertTriangle,
    title: "Kockázatértékelés",
  },
  {
    icon: GraduationCap,
    title: "Munkavédelmi oktatás",
  },
  {
    icon: Eye,
    title: "Munkaterületek biztonsági felügyelete",
  },
  {
    icon: Users,
    title: "Kivitelezési projektek munkavédelmi koordinációja",
  },
];

export default function SafetyServices() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="section-spacing relative overflow-hidden"
      data-testid="safety-services-section"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1626885930974-4b69aa21bbf9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzNTl8MHwxfHNlYXJjaHwyfHxjb25zdHJ1Y3Rpb24lMjBzYWZldHl8ZW58MHx8fHwxNzczNTYyMzA4fDA&ixlib=rb-4.1.0&q=85"
          alt="Munkavédelmi háttér"
          fill
          className="object-cover"
          quality={90}
        />
        <div className="absolute inset-0 bg-primary/95" />
      </div>

      <div className="container-custom relative z-10">
        {/* Intro Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <p className="text-light-gray text-lg leading-relaxed mb-8">
            Tapasztalt és magasan képzett szakembereink segítik a beruházókat, kivitelezőket 
            és vállalkozásokat abban, hogy a munkavégzés minden körülmények között megfeleljen 
            a munkavédelmi előírásoknak.
          </p>
          <h2 className="text-3xl md:text-4xl font-bold" data-testid="safety-services-title">
            Teljes körű munkavédelmi szolgáltatások
          </h2>
        </motion.div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              className="group bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/8 hover:border-accent/30 transition-all duration-500 backdrop-blur-sm"
              data-testid={`safety-service-${index}`}
            >
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                <service.icon className="text-accent" size={28} />
              </div>
              <h3 className="text-white font-semibold text-lg">{service.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
