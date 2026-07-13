"use client";

import Link from "next/link";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import Logo from "./Logo";

const menuLinks = [
  { name: "Főoldal", href: "#fooldal" },
  { name: "Szolgáltatások", href: "#szolgaltatasok" },
  { name: "Folyamat", href: "#folyamat" },
  { name: "Épülettípusok", href: "#epulettipusok" },
  { name: "GYIK", href: "#gyik" },
  { name: "Kapcsolat", href: "#kapcsolat" },
];

const serviceLinks = [
  { name: "Tervek", href: "#szolgaltatasok" },
  { name: "Statikai számítás", href: "#szolgaltatasok" },
  { name: "3D modell", href: "#szolgaltatasok" },
  { name: "Kulcsrakész kivitelezés", href: "#szolgaltatasok" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-deep border-t border-white/[0.06]" data-testid="footer">
      <div className="container-custom py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.2fr] gap-12">
          <div>
            <div className="mb-6">
              <Logo />
            </div>
            <p className="text-light-gray text-sm leading-relaxed max-w-md mb-6">
              Könnyűszerkezetes épületeket tervezünk és építünk, az ötlettől a
              kulcsátadásig. Egész Magyarországon.
            </p>

            {/* Kiemelt mottó-sáv */}
            <div className="border-l-4 border-accent bg-accent/10 rounded-r-xl px-5 py-4 mb-8 max-w-md">
              <p className="text-accent font-semibold italic leading-relaxed">
                „Az ötlettől a kulcsátadásig. Egy felelős. Egy szerződés. Egy
                kész épület.”
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="AcuWall a Facebookon"
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.05] border border-white/10 text-white/70 hover:text-white hover:border-accent/40 hover:bg-accent/10 transition-all duration-300"
              >
                <Facebook size={19} />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="AcuWall az Instagramon"
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.05] border border-white/10 text-white/70 hover:text-white hover:border-accent/40 hover:bg-accent/10 transition-all duration-300"
              >
                <Instagram size={19} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold mb-5">Menü</h3>
            <ul className="space-y-3">
              {menuLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-light-gray hover:text-white text-sm transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-5">Szolgáltatások</h3>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-light-gray hover:text-white text-sm transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-5">Kapcsolat</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-accent flex-shrink-0" />
                <a
                  href="mailto:acuwall@acuwall.hu"
                  className="text-light-gray hover:text-white transition-colors"
                >
                  acuwall@acuwall.hu
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-accent flex-shrink-0" />
                <a
                  href="tel:+36308305556"
                  className="text-light-gray hover:text-white transition-colors"
                >
                  +36 30 830 5556
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-accent flex-shrink-0 mt-0.5" />
                <span className="text-light-gray leading-relaxed">
                  Országos kivitelezés, Magyarország bármely pontján
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/[0.06]">
        <div className="container-custom py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-medium-gray">
          <p>© {currentYear} AcuWall. Minden jog fenntartva.</p>
          <Link href="/adatkezeles" className="hover:text-white transition-colors">
            Adatkezelési tájékoztató
          </Link>
        </div>
      </div>
    </footer>
  );
}
