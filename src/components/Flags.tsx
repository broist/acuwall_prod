import type { Locale } from "@/i18n/config";

type FlagProps = {
  className?: string;
};

/**
 * Kis nemzeti zászlók beágyazott SVG-ként (nincs külső képkérés).
 * Egységes 3:2 arány, hogy a kapcsolóban egyforma méretűek legyenek.
 */

function HuFlag({ className }: FlagProps) {
  return (
    <svg viewBox="0 0 60 40" className={className} aria-hidden="true" focusable="false">
      <rect width="60" height="40" fill="#fff" />
      <rect width="60" height="13.33" fill="#CE2939" />
      <rect y="26.67" width="60" height="13.33" fill="#477050" />
    </svg>
  );
}

function EnFlag({ className }: FlagProps) {
  return (
    <svg viewBox="0 0 60 40" className={className} aria-hidden="true" focusable="false">
      <clipPath id="acuwall-uk-clip">
        <path d="M30,20 h30 v20 z v20 h-30 z h-30 v-20 z v-20 h30 z" />
      </clipPath>
      <rect width="60" height="40" fill="#012169" />
      <path d="M0,0 L60,40 M60,0 L0,40" stroke="#fff" strokeWidth="8" />
      <path
        d="M0,0 L60,40 M60,0 L0,40"
        clipPath="url(#acuwall-uk-clip)"
        stroke="#C8102E"
        strokeWidth="5"
      />
      <path d="M30,0 v40 M0,20 h60" stroke="#fff" strokeWidth="13" />
      <path d="M30,0 v40 M0,20 h60" stroke="#C8102E" strokeWidth="8" />
    </svg>
  );
}

function DeFlag({ className }: FlagProps) {
  return (
    <svg viewBox="0 0 60 40" className={className} aria-hidden="true" focusable="false">
      <rect width="60" height="40" fill="#FFCE00" />
      <rect width="60" height="26.67" fill="#DD0000" />
      <rect width="60" height="13.33" fill="#000" />
    </svg>
  );
}

function PlFlag({ className }: FlagProps) {
  return (
    <svg viewBox="0 0 60 40" className={className} aria-hidden="true" focusable="false">
      <rect width="60" height="40" fill="#DC143C" />
      <rect width="60" height="20" fill="#fff" />
    </svg>
  );
}

function HrFlag({ className }: FlagProps) {
  // Egyszerűsített címer: a jellegzetes piros-fehér sakktábla pajzs.
  const squares: JSX.Element[] = [];
  const cell = 3.2;
  const startX = 30 - (cell * 5) / 2;
  const startY = 20 - (cell * 5) / 2;
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 5; col++) {
      if ((row + col) % 2 === 0) {
        squares.push(
          <rect
            key={`${row}-${col}`}
            x={startX + col * cell}
            y={startY + row * cell}
            width={cell}
            height={cell}
            fill="#D6001C"
          />
        );
      }
    }
  }

  return (
    <svg viewBox="0 0 60 40" className={className} aria-hidden="true" focusable="false">
      <rect width="60" height="40" fill="#171796" />
      <rect width="60" height="26.67" fill="#fff" />
      <rect width="60" height="13.33" fill="#D6001C" />
      <rect x={startX} y={startY} width={cell * 5} height={cell * 5} fill="#fff" />
      {squares}
      <rect
        x={startX}
        y={startY}
        width={cell * 5}
        height={cell * 5}
        fill="none"
        stroke="#0B0B5A"
        strokeWidth="0.8"
      />
    </svg>
  );
}

export const FLAGS: Record<Locale, (props: FlagProps) => JSX.Element> = {
  hu: HuFlag,
  en: EnFlag,
  de: DeFlag,
  pl: PlFlag,
  hr: HrFlag,
};
