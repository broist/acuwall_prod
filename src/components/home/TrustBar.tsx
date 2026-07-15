"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const items = [
  {
    title: "Tervezéstől kulcsátadásig",
    subtitle: "egyetlen kivitelezővel",
  },
  {
    title: "Gépészet, elektromos és belsőépítészeti szerelések",
    subtitle: "egy szerződésben",
  },
  {
    title: "Végig nyomon követheti",
    subtitle: "projektjét",
  },
];

export default function TrustBar() {
  return (
    <div className="relative z-20 bg-primary-deep/80 border-y border-white/[0.06]" data-testid="trust-bar">
      <div className="container-custom">
        <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/[0.08]">
          {items.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className="flex items-center gap-4 py-6 md:py-7 md:px-8 first:md:pl-0 last:md:pr-0"
            >
              <span className="icon-tile !h-10 !w-10 !rounded-lg">
                <CheckCircle2 size={19} />
              </span>
              <span>
                <span className="block text-white font-semibold text-[15px] leading-snug">
                  {item.title}
                </span>
                <span className="block text-light-gray text-sm mt-0.5">{item.subtitle}</span>
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
