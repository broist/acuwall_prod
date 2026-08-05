"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import {
  DEFAULT_LOCALE,
  LOCALE_META,
  LOCALE_STORAGE_KEY,
  isLocale,
  type Locale,
} from "./config";
import { dictionaries, type Dictionary } from "./dictionaries";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Dictionary;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

/**
 * A szerveren és az első rendernél mindig az alapértelmezett (magyar) szótár fut,
 * így nincs hydration eltérés. A mentett nyelvet mountolás után állítjuk be.
 */
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);
  const pathname = usePathname();

  // Mentett nyelv, illetve a böngésző nyelvének betöltése az első rendert követően
  useEffect(() => {
    let next: Locale | null = null;

    try {
      const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
      if (isLocale(stored)) {
        next = stored;
      }
    } catch {
      // pl. letiltott sütik/localStorage — maradunk az alapértelmezetten
    }

    if (!next) {
      const browser = window.navigator.language.slice(0, 2).toLowerCase();
      if (isLocale(browser)) {
        next = browser;
      }
    }

    if (next && next !== DEFAULT_LOCALE) {
      setLocaleState(next);
    }
  }, []);

  // <html lang>, a böngészőfül címe és a leírás mindig a látott nyelvet kövesse
  useEffect(() => {
    const dictionary = dictionaries[locale];
    const isPrivacyPage = pathname === "/adatkezeles";

    // A hirdetési landing csak magyarul fut, és saját metaadatot állít be
    // (lásd src/app/ajanlat/layout.tsx) — azt nem írjuk felül.
    if (pathname === "/ajanlat") {
      document.documentElement.lang = "hu";
      return;
    }

    document.documentElement.lang = LOCALE_META[locale].htmlLang;
    document.title = isPrivacyPage ? dictionary.privacy.metaTitle : dictionary.meta.title;

    const description = isPrivacyPage
      ? dictionary.privacy.metaDescription
      : dictionary.meta.description;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", description);
  }, [locale, pathname]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, next);
    } catch {
      // a nyelvváltás localStorage nélkül is működik, csak nem marad meg
    }
  }, []);

  const value = useMemo<LanguageContextValue>(
    () => ({ locale, setLocale, t: dictionaries[locale] }),
    [locale, setLocale]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("A useLanguage csak LanguageProvider-en belül használható.");
  }
  return context;
}

/** Rövidítés, ha csak a szövegekre van szükség: const t = useT(); */
export function useT() {
  return useLanguage().t;
}
