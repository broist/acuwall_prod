"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import Logo from "./Logo";

const navItems = [
  { name: "Főoldal", id: "fooldal" },
  { name: "Szolgáltatások", id: "szolgaltatasok" },
  { name: "Folyamat", id: "folyamat" },
  { name: "Épülettípusok", id: "epulettipusok" },
  { name: "GYIK", id: "gyik" },
  { name: "Kapcsolat", id: "kapcsolat" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("fooldal");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const probe = window.innerHeight * 0.35;
      let current = "fooldal";
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= probe) {
          current = item.id;
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
          ? "bg-primary/95 backdrop-blur-xl shadow-lg shadow-black/20 border-white/[0.06]"
          : "bg-primary/60 backdrop-blur-md border-transparent"
      }`}
      data-testid="header"
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          <Logo />

          <nav className="hidden lg:flex items-center gap-7" data-testid="desktop-nav">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`relative text-sm font-medium transition-colors duration-300 py-2 ${
                  activeSection === item.id ? "text-white" : "text-white/70 hover:text-white"
                }`}
                data-testid={`nav-${item.id}`}
              >
                {item.name}
                <span
                  className={`absolute -bottom-0.5 left-0 h-0.5 bg-accent rounded-full transition-all duration-300 ${
                    activeSection === item.id ? "w-full" : "w-0"
                  }`}
                />
              </a>
            ))}
          </nav>

          <div className="hidden lg:block">
            <a
              href="#ajanlatkeres"
              className="btn-primary !py-3 !px-6 text-sm inline-flex items-center gap-2 group"
              data-testid="header-cta-button"
            >
              Ajánlatkérés
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <button
            className="lg:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="mobile-menu-button"
            aria-label="Menü"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-primary/98 backdrop-blur-xl border-t border-white/10 overflow-hidden"
            data-testid="mobile-menu"
          >
            <nav className="container-custom py-6 space-y-1">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.06 }}
                >
                  <a
                    href={`#${item.id}`}
                    className="block text-white/80 hover:text-white py-2.5 text-lg font-medium transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                    data-testid={`mobile-nav-${item.id}`}
                  >
                    {item.name}
                  </a>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="pt-4"
              >
                <a
                  href="#ajanlatkeres"
                  className="btn-primary flex items-center justify-center gap-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                  data-testid="mobile-cta-button"
                >
                  Ajánlatkérés
                  <ArrowRight size={16} />
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
