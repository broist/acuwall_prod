import Link from "next/link";

/*
 * AcuWall embléma: szendvicspanel-rétegekből összeálló ház a kulcslyukkal.
 * A három vízszintes réteg a paneles falat, a tető a kész épületet,
 * a kulcslyuk a kulcsrakész átadást jelképezi.
 */
export function LogoMark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="acuwall-flame" x1="8" y1="6" x2="40" y2="42" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF6236" />
          <stop offset="1" stopColor="#D42B06" />
        </linearGradient>
      </defs>
      {/* Tető */}
      <path
        d="M7 21.5 L24 8 L41 21.5"
        stroke="url(#acuwall-flame)"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Kémény */}
      <path
        d="M34.5 12.2 V9.4 H38.2 V15.2"
        stroke="url(#acuwall-flame)"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Panelrétegek – a fal szendvicspanelekből épül */}
      <rect x="10.5" y="24.5" width="27" height="4.6" rx="2.3" fill="url(#acuwall-flame)" />
      <rect x="10.5" y="31.1" width="27" height="4.6" rx="2.3" fill="url(#acuwall-flame)" opacity="0.62" />
      <rect x="10.5" y="37.7" width="27" height="4.6" rx="2.3" fill="url(#acuwall-flame)" opacity="0.32" />
      {/* Kulcslyuk – kulcsrakész átadás */}
      <circle cx="24" cy="26.8" r="1.9" fill="#0D1B2E" />
      <path d="M23 27.9 H25 L25.7 31.5 H22.3 Z" fill="#0D1B2E" />
    </svg>
  );
}

export default function Logo({
  taglineClassName = "text-white/60",
  onClick,
}: {
  taglineClassName?: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href="/#fooldal"
      className="flex items-center gap-3 group"
      data-testid="logo"
      onClick={onClick}
    >
      <LogoMark className="h-11 w-11 transition-transform duration-300 group-hover:scale-105" />
      <span className="leading-tight">
        <span className="block text-xl font-bold text-white tracking-tight">
          Acu<span className="text-accent">Wall</span>
        </span>
        <span className={`block text-[11px] font-medium italic ${taglineClassName}`}>
          Építsünk együtt
        </span>
      </span>
    </Link>
  );
}
