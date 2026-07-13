"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Send, CheckCircle, Loader2, User, Mail, Phone, MessageSquare } from "lucide-react";

export default function SafetyQuoteForm() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Simple safety quote data
      const quoteData = {
        name: formData.name,
        company: formData.company,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        type: "safety", // Identify as safety/munkavédelem quote
      };

      const response = await fetch("/api/send-quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(quoteData),
      });

      const data = await response.json();

      if (data.success) {
        setIsSubmitted(true);
      } else {
        setError("Hiba történt az ajánlatkérés elküldése során. Kérjük, próbálja újra.");
      }
    } catch (err) {
      setError("Hiba történt az ajánlatkérés elküldése során. Kérjük, próbálja újra.");
      console.error("Error submitting form:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section
        ref={ref}
        className="section-spacing bg-dark-blue relative overflow-hidden"
        data-testid="safety-quote-success"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-accent/5" />
        
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="bg-white/5 border border-accent/30 rounded-2xl p-12">
              <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={48} className="text-accent" />
              </div>
              <h3 className="text-3xl font-bold mb-4">Köszönjük ajánlatkérését!</h3>
              <p className="text-light-gray text-lg mb-8">
                Munkatársunk hamarosan felveszi Önnel a kapcsolatot a megadott elérhetőségeken.
              </p>
              <p className="text-accent font-medium">
                24 órán belül válaszolunk!
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      className="section-spacing bg-dark-blue relative overflow-hidden"
      data-testid="safety-quote-form-section"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-accent/5" />
      <div className="absolute inset-0 grid-pattern opacity-5" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="safety-quote-title">
              Kérjen munkavédelmi ajánlatot!
            </h2>
            <p className="text-light-gray text-lg">
              Töltse ki az alábbi űrlapot, és munkatársunk hamarosan jelentkezik.
            </p>
          </div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-10 space-y-6 backdrop-blur-sm"
          >
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2 text-white">
                <span className="flex items-center gap-2">
                  <User size={16} className="text-accent" />
                  Név *
                </span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-accent transition-colors"
                placeholder="Teljes név"
                data-testid="safety-quote-name"
              />
            </div>

            {/* Company Name */}
            <div>
              <label htmlFor="company" className="block text-sm font-medium mb-2 text-white">
                <span className="flex items-center gap-2">
                  <User size={16} className="text-accent" />
                  Cégnév *
                </span>
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-accent transition-colors"
                placeholder="Cégnév"
                data-testid="safety-quote-company"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2 text-white">
                <span className="flex items-center gap-2">
                  <Mail size={16} className="text-accent" />
                  Email cím *
                </span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-accent transition-colors"
                placeholder="pelda@email.hu"
                data-testid="safety-quote-email"
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-2 text-white">
                <span className="flex items-center gap-2">
                  <Phone size={16} className="text-accent" />
                  Telefonszám *
                </span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-accent transition-colors"
                placeholder="+36 30 123 4567"
                data-testid="safety-quote-phone"
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2 text-white">
                <span className="flex items-center gap-2">
                  <MessageSquare size={16} className="text-accent" />
                  Üzenet *
                </span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-accent transition-colors resize-none"
                placeholder="Írja le, milyen munkavédelmi szolgáltatásra van szüksége..."
                data-testid="safety-quote-message"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-400">
                {error}
              </div>
            )}

            {/* Info */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <p className="text-sm text-light-gray">
                <strong className="text-accent">📞 Gyors kapcsolat:</strong>{" "}
                Ha sürgős kérdése van, hívjon minket a <span className="text-white font-medium">+36 30 830 5556</span> telefonszámon.
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              data-testid="safety-quote-submit"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Küldés...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Ajánlatkérés küldése
                </>
              )}
            </button>

            <p className="text-center text-sm text-light-gray">
              Az űrlap elküldésével elfogadja az{" "}
              <a href="/adatvedelem" className="text-accent hover:underline">
                adatvédelmi szabályzatot
              </a>
              .
            </p>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
}
