"use client";

import { LOCALES, LOCALE_META, type Locale } from "@/i18n/config";
import { useLanguage } from "@/i18n/LanguageProvider";
import { FLAGS } from "./Flags";

type Props = {
  /** "compact" — fejléc zászlósor; "full" — mobil menü, nyelvnévvel */
  variant?: "compact" | "full";
  onSelect?: () => void;
};

export default function LanguageSwitcher({ variant = "compact", onSelect }: Props) {
  const { locale, setLocale, t } = useLanguage();

  const handleClick = (next: Locale) => {
    setLocale(next);
    onSelect?.();
  };

  if (variant === "full") {
    return (
      <div
        className="grid grid-cols-2 gap-2"
        role="group"
        aria-label={t.nav.languageAria}
        data-testid="language-switcher-mobile"
      >
        {LOCALES.map((code) => {
          const Flag = FLAGS[code];
          const isActive = code === locale;
          return (
            <button
              key={code}
              type="button"
              onClick={() => handleClick(code)}
              aria-current={isActive ? "true" : undefined}
              className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 text-sm font-medium transition-all duration-300 ${
                isActive
                  ? "border-accent/50 bg-accent/10 text-white"
                  : "border-white/10 bg-white/[0.03] text-white/70 hover:border-white/25 hover:text-white"
              }`}
              data-testid={`language-option-${code}`}
            >
              <Flag className="h-4 w-6 rounded-[3px] shadow-sm ring-1 ring-black/20" />
              {LOCALE_META[code].nativeName}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div
      className="flex items-center gap-1.5"
      role="group"
      aria-label={t.nav.languageAria}
      data-testid="language-switcher"
    >
      {LOCALES.map((code) => {
        const Flag = FLAGS[code];
        const isActive = code === locale;
        return (
          <button
            key={code}
            type="button"
            onClick={() => handleClick(code)}
            title={LOCALE_META[code].label}
            aria-label={LOCALE_META[code].label}
            aria-current={isActive ? "true" : undefined}
            className={`group relative rounded-[4px] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary ${
              isActive
                ? "opacity-100 ring-2 ring-accent ring-offset-2 ring-offset-primary"
                : "opacity-55 hover:opacity-100 hover:-translate-y-0.5"
            }`}
            data-testid={`language-option-${code}`}
          >
            <Flag className="h-[15px] w-[22px] rounded-[3px] shadow-sm ring-1 ring-black/25" />
          </button>
        );
      })}
    </div>
  );
}
