"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-blue border-t border-white/5" data-testid="footer">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/images/logo-design-3.svg"
                alt="AcuWall Logo"
                width={200}
                height={60}
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-light-gray text-sm leading-relaxed max-w-md mb-6">
              Az AcuWall zajvédő falrendszere hatékony és tartós megoldást kínál ipari 
              telephelyek, logisztikai központok, utak és lakóövezetek zajterhelésének 
              csökkentésére.
            </p>
            <p className="text-white font-medium italic">&quot;Csendet építünk&quot;</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-6">Navigáció</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-light-gray hover:text-white transition-colors text-sm" data-testid="footer-link-home">
                  Főoldal
                </Link>
              </li>
              <li>
                <Link href="/termek" className="text-light-gray hover:text-white transition-colors text-sm" data-testid="footer-link-product">
                  Termék és szolgáltatások
                </Link>
              </li>
              <li>
                <Link href="/ajanlatkeres" className="text-light-gray hover:text-white transition-colors text-sm" data-testid="footer-link-quote">
                  Ajánlatkérés
                </Link>
              </li>
              <li>
                <Link href="/kapcsolat" className="text-light-gray hover:text-white transition-colors text-sm" data-testid="footer-link-contact">
                  Kapcsolat
                </Link>
              </li>
              <li>
                <Link href="/munkavedelem" className="text-light-gray hover:text-white transition-colors text-sm" data-testid="footer-link-safety">
                  Munkavédelem
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-6">Kapcsolat</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-accent flex-shrink-0" />
                <a
                  href="mailto:acuwall@acuwall.hu"
                  className="text-light-gray hover:text-white transition-colors text-sm"
                  data-testid="footer-email"
                >
                  acuwall@acuwall.hu
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-accent flex-shrink-0" />
                <a
                  href="tel:+36308305556"
                  className="text-light-gray hover:text-white transition-colors text-sm"
                  data-testid="footer-phone"
                >
                  +36 30 830 5556
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-accent flex-shrink-0 mt-0.5" />
                <span className="text-light-gray text-sm">
                  Országos kivitelezés<br />Magyarország
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-light-gray text-sm">
            © {currentYear} AcuWall. Minden jog fenntartva.
          </p>
          <p className="text-medium-gray text-xs">
            Professzionális zajvédelmi megoldások
          </p>
        </div>
      </div>
    </footer>
  );
}
