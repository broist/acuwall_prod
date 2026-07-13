"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  Clock,
  ExternalLink,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Timer,
} from "lucide-react";

const initialFormData = {
  name: "",
  email: "",
  phone: "",
  location: "",
  projectType: "",
  floorArea: "",
  plotStatus: "",
  needsPlanning: "",
  timeline: "",
  message: "",
};

const contactItems = [
  {
    icon: Mail,
    label: "E-mail",
    value: "acuwall@acuwall.hu",
    href: "mailto:acuwall@acuwall.hu",
  },
  {
    icon: Phone,
    label: "Telefon",
    value: "+36 30 830 5556",
    href: "tel:+36308305556",
  },
  {
    icon: MapPin,
    label: "Hol dolgozunk",
    value: "Országos kivitelezés, Magyarország bármely pontján",
  },
  {
    icon: Timer,
    label: "Válaszidő",
    value: "Általában 24 órán belül, személyesen válaszolunk",
  },
];

export default function QuoteSection() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [consent, setConsent] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/send-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setIsSubmitted(true);
      } else {
        setError("Hiba történt a küldés során. Kérjük, próbálja újra, vagy hívjon minket telefonon.");
      }
    } catch (err) {
      setError("Hiba történt a küldés során. Kérjük, próbálja újra, vagy hívjon minket telefonon.");
      console.error("Error submitting form:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="ajanlatkeres" className="section-spacing relative" data-testid="quote-section">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="eyebrow eyebrow-centered mb-6"
          >
            Ajánlatkérés
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight mb-6"
          >
            Meséljen a <span className="text-accent">tervéről</span> — pár perc az egész.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-light-gray text-base md:text-lg leading-relaxed"
          >
            Töltse ki az alábbi mezőket, hogy lássuk, miben segíthetünk. Ez nem
            kötelezi Önt semmire, csak az első beszélgetésünk alapja. Jellemzően
            24 órán belül már válaszolunk is.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6 items-start">
          {/* Űrlap */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3 card p-7 md:p-10"
          >
            {isSubmitted ? (
              <div className="text-center py-14" data-testid="quote-success-message">
                <CheckCircle className="mx-auto text-accent mb-6" size={64} />
                <h3 className="text-2xl font-bold mb-4">Köszönjük, megkaptuk!</h3>
                <p className="text-light-gray mb-8 max-w-md mx-auto leading-relaxed">
                  A projektadatokat megkaptuk, jellemzően 24 órán belül
                  személyesen jelentkezünk a megadott elérhetőségeken.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setConsent(false);
                    setFormData(initialFormData);
                  }}
                  className="btn-secondary"
                  data-testid="quote-new-request-button"
                >
                  Új ajánlatkérés
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" data-testid="quote-form">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name">
                      Név <span className="text-accent">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Pl. Kovács Péter"
                      className="w-full"
                      data-testid="quote-input-name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email">
                      E-mail <span className="text-accent">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="pelda@email.hu"
                      className="w-full"
                      data-testid="quote-input-email"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone">
                      Telefonszám <span className="text-accent">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="+36 30 ..."
                      className="w-full"
                      data-testid="quote-input-phone"
                    />
                  </div>
                  <div>
                    <label htmlFor="location">
                      Projekt helyszíne (település) <span className="text-accent">*</span>
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                      placeholder="Pl. Gödöllő, Pest megye"
                      className="w-full"
                      data-testid="quote-input-location"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="projectType">Épület típusa</label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className="w-full"
                      data-testid="quote-select-project-type"
                    >
                      <option value="">Válasszon...</option>
                      <option value="garazs">Garázs / tároló</option>
                      <option value="muhely">Műhely / csarnok</option>
                      <option value="iroda">Irodaház</option>
                      <option value="nyaralo">Nyaraló</option>
                      <option value="lakoepulet">Lakóház</option>
                      <option value="sajat-fejlesztes">Saját fejlesztés</option>
                      <option value="egyeb">Egyéb</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="floorArea">Becsült alapterület (m²)</label>
                    <input
                      type="number"
                      id="floorArea"
                      name="floorArea"
                      value={formData.floorArea}
                      onChange={handleChange}
                      min="1"
                      placeholder="Pl. 120"
                      className="w-full"
                      data-testid="quote-input-floor-area"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="plotStatus">Telek állapota</label>
                    <select
                      id="plotStatus"
                      name="plotStatus"
                      value={formData.plotStatus}
                      onChange={handleChange}
                      className="w-full"
                      data-testid="quote-select-plot-status"
                    >
                      <option value="">Válasszon...</option>
                      <option value="sajat-telek">Saját telek rendelkezésre áll</option>
                      <option value="vasarlas-alatt">Telekvásárlás folyamatban</option>
                      <option value="rendezendo">Tereprendezés / bontás várható</option>
                      <option value="nincs-telek">Még nincs telek</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="needsPlanning">Szükséges tervezés / statika?</label>
                    <select
                      id="needsPlanning"
                      name="needsPlanning"
                      value={formData.needsPlanning}
                      onChange={handleChange}
                      className="w-full"
                      data-testid="quote-select-planning"
                    >
                      <option value="">Válasszon...</option>
                      <option value="igen">Igen, kérek tervezést</option>
                      <option value="van-terv">Van kész tervem</option>
                      <option value="reszben">Részben van tervem</option>
                      <option value="nem-tisztazott">Még nem tudom</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="timeline">Tervezett indulás</label>
                  <select
                    id="timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    className="w-full"
                    data-testid="quote-select-timeline"
                  >
                    <option value="">Válasszon...</option>
                    <option value="azonnal">Azonnal / 1 hónapon belül</option>
                    <option value="1-3-honap">1-3 hónapon belül</option>
                    <option value="3-6-honap">3-6 hónapon belül</option>
                    <option value="kesobb">Később</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message">Pár szó a projektről (opcionális)</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full resize-none"
                    placeholder="Írjon le mindent, amit fontosnak érez — a többit majd kérdezzük."
                    data-testid="quote-input-message"
                  />
                </div>

                <label className="flex items-start gap-3 cursor-pointer !mb-0 !text-light-gray text-sm font-normal leading-relaxed">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    required
                    className="!w-5 !h-5 !p-0 mt-0.5 accent-accent flex-shrink-0"
                    data-testid="quote-checkbox-consent"
                  />
                  <span>
                    Hozzájárulok, hogy az AcuWall a megadott adatokat az
                    ajánlatkérésem feldolgozásához kezelje. Az adataival gondosan
                    bánunk.{" "}
                    <Link href="/adatkezeles" className="text-accent hover:underline">
                      (Adatkezelési tájékoztató)
                    </Link>{" "}
                    <span className="text-accent">*</span>
                  </span>
                </label>

                {error && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-400 text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary inline-flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                  data-testid="quote-submit-button"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Küldés...
                    </>
                  ) : (
                    <>
                      Elküldöm a projektadatokat
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* Kapcsolat oldalsáv */}
          <motion.div
            id="kapcsolat"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-2 card p-7 md:p-9"
            data-testid="contact-sidebar"
          >
            <h3 className="text-xl md:text-2xl font-bold mb-4 tracking-tight">
              Beszéljünk — kötelezettség nélkül
            </h3>
            <p className="text-light-gray leading-relaxed mb-8">
              Akár csak egy kérdése van, akár már konkrét elképzelése, szívesen
              segítünk. Írjon vagy hívjon.
            </p>

            <div className="space-y-6 mb-8">
              {contactItems.map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <span className="icon-tile !h-11 !w-11">
                    <item.icon size={19} />
                  </span>
                  <span>
                    <span className="block text-light-gray text-[11px] font-semibold uppercase tracking-[0.2em] mb-1">
                      {item.label}
                    </span>
                    {item.href ? (
                      <a href={item.href} className="text-white font-medium hover:text-accent transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-white font-medium leading-snug block">{item.value}</span>
                    )}
                  </span>
                </div>
              ))}

              <div className="flex items-start gap-4">
                <span className="icon-tile !h-11 !w-11">
                  <Clock size={19} />
                </span>
                <span>
                  <span className="block text-light-gray text-[11px] font-semibold uppercase tracking-[0.2em] mb-1">
                    Nyitvatartás
                  </span>
                  <span className="block text-white font-medium">Hétfő – Péntek: 08:00 – 17:00</span>
                  <span className="block text-light-gray text-sm mt-0.5">Szombat – Vasárnap: zárva</span>
                </span>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden border border-white/[0.07]">
              <iframe
                src="https://www.google.com/maps?q=Magyarorsz%C3%A1g&z=7&output=embed"
                className="w-full h-64 grayscale-[0.25] contrast-[1.05]"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="AcuWall — országos kivitelezés Magyarországon"
              />
              <a
                href="https://www.google.com/maps?q=Magyarorsz%C3%A1g"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-3 left-3 inline-flex items-center gap-2 bg-primary/90 backdrop-blur px-4 py-2 rounded-lg text-sm font-medium text-white hover:bg-primary transition-colors"
              >
                Megnyitás a Térképen
                <ExternalLink size={14} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
