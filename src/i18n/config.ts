export const LOCALES = ["hu", "en", "de", "pl", "hr"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "hu";

/** localStorage kulcs a választott nyelv megjegyzéséhez */
export const LOCALE_STORAGE_KEY = "acuwall-locale";

type LocaleMeta = {
  /** <html lang> értéke */
  htmlLang: string;
  /** A nyelv saját neve (a kapcsolóban ezt látja a látogató) */
  nativeName: string;
  /** Képernyőolvasóknak / tooltipnek */
  label: string;
};

export const LOCALE_META: Record<Locale, LocaleMeta> = {
  hu: { htmlLang: "hu", nativeName: "Magyar", label: "Magyar" },
  en: { htmlLang: "en", nativeName: "English", label: "English" },
  de: { htmlLang: "de", nativeName: "Deutsch", label: "Deutsch" },
  pl: { htmlLang: "pl", nativeName: "Polski", label: "Polski" },
  hr: { htmlLang: "hr", nativeName: "Hrvatski", label: "Hrvatski" },
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (LOCALES as readonly string[]).includes(value);
}
