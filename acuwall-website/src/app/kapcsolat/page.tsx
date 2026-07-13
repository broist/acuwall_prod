"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export default function ContactPage() {
  return (
    <section className="min-h-screen bg-primary pt-32 pb-20" data-testid="contact-page">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-accent text-sm font-semibold tracking-wider uppercase mb-4">
            Kapcsolat
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4" data-testid="contact-page-title">
            Lépjen velünk kapcsolatba
          </h1>
          <p className="text-light-gray text-lg max-w-2xl mx-auto">
            Kérdése van? Örömmel segítünk!
          </p>
        </motion.div>

        {/* Contact Cards */}
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* Email Card */}
            <motion.a
              href="mailto:acuwall@acuwall.hu"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="group bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-accent/30 hover:bg-white/8 transition-all duration-300"
              data-testid="contact-email-card"
            >
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                <Mail className="text-accent" size={28} />
              </div>
              <h3 className="text-white font-semibold text-xl mb-2">Email</h3>
              <p className="text-accent text-lg font-medium">acuwall@acuwall.hu</p>
            </motion.a>

            {/* Phone Card */}
            <motion.a
              href="tel:+36308305556"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="group bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-accent/30 hover:bg-white/8 transition-all duration-300"
              data-testid="contact-phone-card"
            >
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                <Phone className="text-accent" size={28} />
              </div>
              <h3 className="text-white font-semibold text-xl mb-2">Telefon</h3>
              <p className="text-accent text-lg font-medium">+36 30 830 5556</p>
            </motion.a>
          </div>

          {/* Location Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20 rounded-2xl p-8 text-center"
            data-testid="contact-location-card"
          >
            <div className="w-14 h-14 mx-auto rounded-xl bg-accent/20 flex items-center justify-center mb-6">
              <MapPin className="text-accent" size={28} />
            </div>
            <h3 className="text-white font-semibold text-xl mb-4">Országos kivitelezés</h3>
            <p className="text-light-gray text-lg mb-2">Magyarország</p>
            <p className="text-medium-gray text-sm">
              Szolgáltatásaink az ország egész területén elérhetőek.
            </p>
          </motion.div>

          {/* Response Time */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-6 py-3">
              <Clock size={18} className="text-accent" />
              <span className="text-light-gray text-sm">
                24 órán belül válaszolunk
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
