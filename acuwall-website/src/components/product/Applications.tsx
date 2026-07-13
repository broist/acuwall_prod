"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Factory, Building2, Warehouse, Home, Package, Car } from "lucide-react";

const applications = [
  { icon: Factory, name: "Ipari telephelyek" },
  { icon: Building2, name: "Gyárak" },
  { icon: Warehouse, name: "Logisztikai központok" },
  { icon: Home, name: "Lakóövezetek" },
  { icon: Package, name: "Raktárak" },
  { icon: Car, name: "Út menti zajvédelem" },
];

export default function Applications() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="section-spacing bg-primary relative"
      data-testid="applications-section"
    >
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" data-testid="applications-title">
            Alkalmazási területek
          </h2>
          <p className="text-light-gray text-lg max-w-2xl mx-auto">
            Széles körű felhasználási lehetőségek
          </p>
        </motion.div>

        {/* Applications Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {applications.map((app, index) => (
            <motion.div
              key={app.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white/5 border border-white/10 rounded-xl p-6 text-center hover:border-accent/30 hover:bg-white/8 transition-all duration-300 cursor-default"
              data-testid={`application-${index}`}
            >
              <app.icon className="mx-auto text-accent mb-3" size={32} />
              <p className="text-white text-sm font-medium">{app.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
