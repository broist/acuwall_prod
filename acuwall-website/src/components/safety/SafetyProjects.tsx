"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Home, Briefcase, Factory, Building } from "lucide-react";

const projectTypes = [
  { icon: Home, title: "Családi házak építése" },
  { icon: Briefcase, title: "Kisebb beruházások" },
  { icon: Factory, title: "Ipari kivitelezések" },
  { icon: Building, title: "Nagy volumenű építési projektek" },
];

export default function SafetyProjects() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="section-spacing bg-dark-blue relative overflow-hidden"
      data-testid="safety-projects-section"
    >
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="safety-projects-title">
            Projektek minden méretben
          </h2>
          <p className="text-light-gray text-lg max-w-2xl mx-auto">
            Minden esetben célunk ugyanaz: biztonságos munkakörnyezet megteremtése és a balesetek megelőzése.
          </p>
        </motion.div>

        {/* Project Types */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {projectTypes.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center hover:border-accent/30 transition-all duration-300"
              data-testid={`safety-project-${index}`}
            >
              <project.icon className="mx-auto text-accent mb-4" size={40} />
              <h3 className="text-white font-semibold">{project.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
