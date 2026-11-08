"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import Logo from "./Logo";
import LanguageSwitcher from "./LanguageSwitcher";
import { useT } from "@/i18n/LanguageProvider";

const navItems = [
  "fooldal",
  "szolgaltatasok",
  "epulettipusok",
  "referenciak",
  "folyamat",
  "lean",
  "gyik",
  "kapcsolat",
] as const;

export default function Header() {
  const t = useT();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("fooldal");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const probe = window.innerHeight * 0.35;
      // Aloldalon nincs főoldali szekció: ott egyik menüpont sem aktív.
      let current = document.getElementById("fooldal") ? "fooldal" : "";
      for (const id of navItems) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= probe) {
          current = id;
        }
      }
      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
        isScrolled
          ? "bg-primary-deep/90 backdrop-blur-xl shadow-lg shadow-black/25 border-white/[0.06]"
          : "bg-transparent border-transparent"
      }`}
      data-testid="header"
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-20 gap-4">
          <Logo />

          <nav className="hidden xl:flex items-center gap-6 2xl:gap-7 rounded-full border border-white/[0.12] bg-white/[0.07] px-6 py-1 backdrop-blur-md" data-testid="desktop-nav">
            {navItems.map((id) => (
              <a
                key={id}
                href={`/#${id}`}
                className={`relative text-sm font-medium transition-colors duration-300 py-2 whitespace-nowrap ${
                  activeSection === id ? "text-white" : "text-white/70 hover:text-white"
                }`}
                data-testid={`nav-${id}`}
              >
                {t.nav[id]}
                <span
                  className={`absolute -bottom-0.5 left-0 h-0.5 bg-accent rounded-full transition-all duration-300 ${
                    activeSection === id ? "w-full" : "w-0"
                  }`}
                />
              </a>
            ))}
          </nav>

          <div className="hidden xl:flex items-center gap-4">
            <a
              href="/#ajanlatkeres"
              className="btn-primary !py-0 !pl-5 !pr-2.5 min-h-[46px] text-sm inline-flex items-center gap-2.5 group whitespace-nowrap"
              data-testid="header-cta-button"
            >
              {t.nav.quote}
              <span className="btn-arrow !h-7 !w-7" aria-hidden="true">
                <ArrowRight size={14} strokeWidth={2.4} />
              </span>
            </a>

            <span className="h-6 w-px bg-white/15" aria-hidden="true" />

            <LanguageSwitcher />
          </div>

          <div className="flex items-center gap-3 xl:hidden">
            <LanguageSwitcher />
            <button
              className="text-white p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="mobile-menu-button"
              aria-label={t.nav.menuAria}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden bg-primary-deep/[0.98] backdrop-blur-xl border-t border-white/10 overflow-hidden"
            data-testid="mobile-menu"
          >
            <nav className="container-custom py-6 space-y-1">
              {navItems.map((id, index) => (
                <motion.div
                  key={id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.06 }}
                >
                  <a
                    href={`/#${id}`}
                    className="block text-white/80 hover:text-white py-2.5 text-lg font-medium transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                    data-testid={`mobile-nav-${id}`}
                  >
                    {t.nav[id]}
                  </a>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="pt-4 space-y-4"
              >
                <a
                  href="/#ajanlatkeres"
                  className="btn-primary flex items-center justify-center gap-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                  data-testid="mobile-cta-button"
                >
                  {t.nav.quote}
                  <ArrowRight size={16} />
                </a>

                <div className="pt-2 border-t border-white/10">
                  <p className="text-light-gray text-[11px] font-semibold uppercase tracking-[0.2em] pt-4 pb-3">
                    {t.nav.languageAria}
                  </p>
                  <LanguageSwitcher variant="full" onSelect={() => setIsMobileMenuOpen(false)} />
                </div>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
