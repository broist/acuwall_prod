"use client";

import { motion } from "framer-motion";
import { Check, Ruler, Calculator, Box, KeyRound } from "lucide-react";

const services = [
  {
    icon: Ruler,
    title: "Tervek",
    description:
      "Építészeti és kiviteli tervek a projektjéhez. Ha még nincs kész terve, mi készítjük el – nyugodtan, a teljes kép birtokában dönthet.",
    items: [
      "Építészeti tervek",
      "Kiviteli dokumentáció",
      "Engedélyezési út tisztázása",
      "Egyeztetés a helyi hatóságokkal",
      "Ha van terve, abból indulunk",
    ],
  },
  {
    icon: Calculator,
    title: "Statikai számítás",
    description:
      "Az acélszerkezet biztonságos, dokumentált méretezése – teljesítménynyilatkozattal és teherértékekkel.",
    items: [
      "Acélváz méretezése",
      "Teherbírási és stabilitási vizsgálat",
      "Közvetlen kapcsolat a tervezővel",
      "Dokumentált statikai megfelelőség",
    ],
  },
  {
    icon: Box,
    title: "3D modell",
    description:
      "Körbejárhatja az épületét, mielőtt felépülne. Lehet finomhangolni a részleteket, mielőtt az első csavart is megrendelnénk.",
    items: [
      "Fotorealisztikus látványterv",
      "Virtuális bejárás lehetősége",
      "Anyag- és színválasztás előre",
      "Változatok összehasonlítása",
      "Döntés a teljes kép ismeretében",
    ],
  },
  {
    icon: KeyRound,
    title: "Kivitelezés",
    description:
      "Az alapozástól a kulcsátadásig, egy felelőssel. Egy kulcsrakész épületet kap, nem egy félkész szerkezetet.",
    items: [
      "Anyagbeszerzés teljesítménynyilatkozatokkal",
      "Alapozás és terep-előkészítés",
      "Acélváz és panel szerelés",
      "Elektromos és gépészeti szerelés",
      "Belsőépítészeti kivitelezések",
      "Dokumentált átadás hibalistával",
    ],
  },
];

export default function FullService() {
  return (
    <section id="szolgaltatasok" className="section-spacing relative" data-testid="full-service-section">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="eyebrow eyebrow-centered mb-6"
          >
            Teljes szolgáltatás
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight mb-6"
          >
            Elég egy ötlet — <span className="text-accent">a többit ránk bízhatja.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-light-gray text-base md:text-lg leading-relaxed"
          >
            Többen csak egy elképzeléssel keresnek meg minket, és ez teljesen
            rendben van. Ha kell, mi készítjük el a terveket, a statikai
            számítást és a 3D modellt is, mielőtt bármit építenénk — így már az
            elején látja, mit fog kapni. Ha pedig már rendelkezik ezen
            anyagokkal, akkor tervei alapján ugyanúgy megépítjük.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (index % 2) * 0.12 }}
              className="card card-hover p-8 md:p-10"
              data-testid={`service-card-${index}`}
            >
              <div className="flex items-center gap-5 mb-5">
                <span className="icon-tile !h-14 !w-14 !rounded-2xl">
                  <service.icon size={26} />
                </span>
                <h3 className="text-2xl md:text-[1.7rem] font-bold text-white tracking-tight">
                  {service.title}
                </h3>
              </div>

              <p className="text-light-gray leading-relaxed mb-7">{service.description}</p>

              <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3.5">
                {service.items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-accent/15 text-accent flex-shrink-0">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    <span className="text-white/85 text-[15px] leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
