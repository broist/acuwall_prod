"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FileSignature, ReceiptText, ShieldCheck } from "lucide-react";

const pillars = [
  {
    icon: FileSignature,
    title: "Egy szerződés",
    description: "A tervezéstől a kivitelezésig egyetlen írásos megállapodásban.",
  },
  {
    icon: ReceiptText,
    title: "Ütemezett fizetés",
    description: "Rögzített tartalom és nyomon követhető haladás — nincs meglepetés.",
  },
  {
    icon: ShieldCheck,
    title: "Végig átlátható",
    description: "Fotókkal követhető munkák, dokumentált átadás, írásos garancia.",
  },
];

export default function Introduction() {
  return (
    <section id="bemutatkozas" className="section-spacing relative" data-testid="introduction-section">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="eyebrow mb-6"
            >
              Bemutatkozás
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 leading-tight tracking-tight"
            >
              Ön egy <span className="text-accent">kész épületet</span> kap.
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-5 text-light-gray text-base md:text-lg leading-relaxed mb-10"
            >
              <p>
                Egy építkezés ott szokott elcsúszni, amikor senki nem felel az
                egészért. Nálunk pont ez nem fordulhat elő: amit elvállalunk, azt
                végig is visszük. Nem kell külön tervezőt, statikust,
                szerkezetépítőt, belsőépítészt, villanyszerelőt és gépészt
                összehangolnia — ez a mi dolgunk.
              </p>
              <p>
                Ha csak egy elképzeléssel jön, abból indulunk. Megtervezzük, és
                előre, érthetően leírjuk, mit építünk. Onnantól Ön végig látja,
                hol tart a munka:
                rögzített tartalom, ütemezett fizetés, és nyomon követhető
                haladás. Így marad nyugodt az, ami máshol idegőrlő szokott lenni.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-3 gap-4">
              {pillars.map((pillar, index) => (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.15 + index * 0.1 }}
                  className="card card-hover p-5"
                >
                  <span className="icon-tile !h-11 !w-11 mb-4">
                    <pillar.icon size={20} />
                  </span>
                  <h3 className="text-white font-semibold mb-2 leading-snug">{pillar.title}</h3>
                  <p className="text-light-gray text-sm leading-relaxed">{pillar.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] border border-white/[0.07]">
              <Image
                src="https://images.pexels.com/photos/4792498/pexels-photo-4792498.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1500&fit=crop"
                alt="Családi ház alaprajza az asztalon"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-transparent to-transparent" />
            </div>

            <div className="absolute -bottom-6 left-6 md:-left-8 accent-gradient rounded-2xl px-7 py-5 shadow-2xl shadow-accent/25">
              <p className="text-white text-xl md:text-2xl font-bold leading-none">Egy felelős</p>
              <p className="text-white/85 text-sm mt-1.5">az ötlettől a kulcsátadásig</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
