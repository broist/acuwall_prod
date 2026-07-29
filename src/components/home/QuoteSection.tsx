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
import { useLanguage } from "@/i18n/LanguageProvider";

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

/**
 * Az option értékek (kódok) nyelvfüggetlenek — a szerver ezek alapján állítja
 * elő a magyar nyelvű belső értesítőt, így a nyelvváltás nem érinti a feldolgozást.
 */
const projectTypeCodes = [
  "garazs",
  "muhely",
  "iroda",
  "nyaralo",
  "lakoepulet",
  "sajat-fejlesztes",
  "egyeb",
] as const;

const plotStatusCodes = [
  "sajat-telek",
  "vasarlas-alatt",
  "rendezendo",
  "nincs-telek",
] as const;

const needsPlanningCodes = ["igen", "van-terv", "reszben", "nem-tisztazott"] as const;

const timelineCodes = ["azonnal", "1-3-honap", "3-6-honap", "kesobb"] as const;

export default function QuoteSection() {
  const { t, locale } = useLanguage();
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
        body: JSON.stringify({ ...formData, locale }),
      });

      const data = await response.json();

      if (data.success) {
        setIsSubmitted(true);
      } else {
        setError(t.quote.errorText);
      }
    } catch (err) {
      setError(t.quote.errorText);
      console.error("Error submitting form:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactItems = [
    {
      icon: Mail,
      label: t.quote.contactLabels.email,
      value: "acuwall@acuwall.hu",
      href: "mailto:acuwall@acuwall.hu",
    },
    {
      icon: Phone,
      label: t.quote.contactLabels.phone,
      value: "+36 30 830 5556",
      href: "tel:+36308305556",
    },
    {
      icon: MapPin,
      label: t.quote.contactLabels.area,
      value: t.quote.areaValue,
    },
    {
      icon: Timer,
      label: t.quote.contactLabels.responseTime,
      value: t.quote.responseTimeValue,
    },
  ];

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
            {t.quote.eyebrow}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight mb-6"
          >
            {t.quote.titleBefore} <span className="text-accent">{t.quote.titleAccent}</span>{" "}
            {t.quote.titleAfter}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-light-gray text-base md:text-lg leading-relaxed"
          >
            {t.quote.description}
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
                <h3 className="text-2xl font-bold mb-4">{t.quote.successTitle}</h3>
                <p className="text-light-gray mb-8 max-w-md mx-auto leading-relaxed">
                  {t.quote.successText}
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
                  {t.quote.successButton}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" data-testid="quote-form">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name">
                      {t.quote.fields.name.label} <span className="text-accent">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder={t.quote.fields.name.placeholder}
                      className="w-full"
                      data-testid="quote-input-name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email">
                      {t.quote.fields.email.label} <span className="text-accent">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder={t.quote.fields.email.placeholder}
                      className="w-full"
                      data-testid="quote-input-email"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone">
                      {t.quote.fields.phone.label} <span className="text-accent">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder={t.quote.fields.phone.placeholder}
                      className="w-full"
                      data-testid="quote-input-phone"
                    />
                  </div>
                  <div>
                    <label htmlFor="location">
                      {t.quote.fields.location.label} <span className="text-accent">*</span>
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                      placeholder={t.quote.fields.location.placeholder}
                      className="w-full"
                      data-testid="quote-input-location"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="projectType">{t.quote.fields.projectType.label}</label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className="w-full"
                      data-testid="quote-select-project-type"
                    >
                      <option value="">{t.quote.selectPlaceholder}</option>
                      {projectTypeCodes.map((code) => (
                        <option key={code} value={code}>
                          {t.quote.projectTypeOptions[code]}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="floorArea">{t.quote.fields.floorArea.label}</label>
                    <input
                      type="number"
                      id="floorArea"
                      name="floorArea"
                      value={formData.floorArea}
                      onChange={handleChange}
                      min="1"
                      placeholder={t.quote.fields.floorArea.placeholder}
                      className="w-full"
                      data-testid="quote-input-floor-area"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="plotStatus">{t.quote.fields.plotStatus.label}</label>
                    <select
                      id="plotStatus"
                      name="plotStatus"
                      value={formData.plotStatus}
                      onChange={handleChange}
                      className="w-full"
                      data-testid="quote-select-plot-status"
                    >
                      <option value="">{t.quote.selectPlaceholder}</option>
                      {plotStatusCodes.map((code) => (
                        <option key={code} value={code}>
                          {t.quote.plotStatusOptions[code]}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="needsPlanning">{t.quote.fields.needsPlanning.label}</label>
                    <select
                      id="needsPlanning"
                      name="needsPlanning"
                      value={formData.needsPlanning}
                      onChange={handleChange}
                      className="w-full"
                      data-testid="quote-select-planning"
                    >
                      <option value="">{t.quote.selectPlaceholder}</option>
                      {needsPlanningCodes.map((code) => (
                        <option key={code} value={code}>
                          {t.quote.needsPlanningOptions[code]}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="timeline">{t.quote.fields.timeline.label}</label>
                  <select
                    id="timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    className="w-full"
                    data-testid="quote-select-timeline"
                  >
                    <option value="">{t.quote.selectPlaceholder}</option>
                    {timelineCodes.map((code) => (
                      <option key={code} value={code}>
                        {t.quote.timelineOptions[code]}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message">{t.quote.fields.message.label}</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full resize-none"
                    placeholder={t.quote.fields.message.placeholder}
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
                    {t.quote.consentBefore}{" "}
                    <Link href="/adatkezeles" className="text-accent hover:underline">
                      {t.quote.consentLink}
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
                      {t.quote.submitting}
                    </>
                  ) : (
                    <>
                      {t.quote.submit}
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
              {t.quote.sidebarTitle}
            </h3>
            <p className="text-light-gray leading-relaxed mb-8">{t.quote.sidebarText}</p>

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
                    {t.quote.contactLabels.hours}
                  </span>
                  <span className="block text-white font-medium">{t.quote.hoursWeekdays}</span>
                  <span className="block text-light-gray text-sm mt-0.5">
                    {t.quote.hoursWeekend}
                  </span>
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
                title={t.quote.mapTitle}
              />
              <a
                href="https://www.google.com/maps?q=Magyarorsz%C3%A1g"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-3 left-3 inline-flex items-center gap-2 bg-primary/90 backdrop-blur px-4 py-2 rounded-lg text-sm font-medium text-white hover:bg-primary transition-colors"
              >
                {t.quote.mapOpen}
                <ExternalLink size={14} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
