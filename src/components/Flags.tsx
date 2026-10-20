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

export const FLAGS: Record<Locale, (props: FlagProps) => JSX.Element> = {
  hu: HuFlag,
  en: EnFlag,
};
