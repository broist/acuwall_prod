"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Package, Truck, Construction, Wrench, HardHat } from "lucide-react";

const services = [
  {
    icon: Package,
    title: "Zajvédő fal elemek értékesítése",
    description: "Előregyártott panelek értékesítése igény szerint",
  },
  {
    icon: Truck,
    title: "Országos szállítás",
    description: "Szállítás Magyarország egész területére",
  },
  {
    icon: Construction,
    title: "Daruzás",
    description: "Professzionális daruzási szolgáltatás",
  },
  {
    icon: Wrench,
    title: "Telepítés",
    description: "Szakszerű telepítés tapasztalt csapattal",
  },
  {
    icon: HardHat,
    title: "Teljes kivitelezés",
    description: "Kulcsrakész megoldás a projektre",
  },
];

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="section-spacing bg-dark-blue relative overflow-hidden"
      data-testid="services-section"
    >
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-y-1/2" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" data-testid="services-title">
            Szolgáltatások
          </h2>
          <p className="text-light-gray text-lg max-w-2xl mx-auto">
            Teljes körű szolgáltatások az értékesítéstől a kivitelezésig
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              className="group"
              data-testid={`service-${index}`}
            >
              <div className="h-full bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/8 hover:border-accent/30 transition-all duration-500">
                <div className="w-14 h-14 mx-auto rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <service.icon className="text-accent" size={28} />
                </div>
                <h3 className="text-white font-semibold mb-2 text-sm">{service.title}</h3>
                <p className="text-light-gray text-xs leading-relaxed">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
