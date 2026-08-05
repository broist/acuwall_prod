import {
  Building2,
  CalendarClock,
  CalendarDays,
  CalendarRange,
  Factory,
  FileCheck2,
  FileText,
  Hammer,
  Handshake,
  HelpCircle,
  Home,
  LandPlot,
  MapPinOff,
  PencilRuler,
  Shapes,
  Trees,
  TrendingUp,
  Warehouse,
  Zap,
  type LucideIcon,
} from "lucide-react";

/**
 * A hirdetési landing (/ajanlat) kérdéssora.
 *
 * FONTOS: az option-kódok (garazs, sajat-telek, …) szó szerint egyeznek a
 * weboldal ajánlatkérőjével, mert a szerver ezekből állítja elő az Octopus
 * által beolvasott magyar címkéket. Új kód felvételekor a
 * src/app/api/send-lead/route.ts optionLabels térképét is bővíteni kell.
 */

export type ChoiceOption = {
  value: string;
  label: string;
  hint?: string;
  icon: LucideIcon;
};

export const CONTACT = {
  phoneDisplay: "+36 30 830 5556",
  phoneHref: "tel:+36308305556",
  email: "acuwall@acuwall.hu",
  emailHref: "mailto:acuwall@acuwall.hu",
} as const;

export const projectTypeOptions: ChoiceOption[] = [
  { value: "garazs", label: "Garázs / tároló", hint: "A leggyorsabb belépő", icon: Warehouse },
  { value: "muhely", label: "Műhely / csarnok", hint: "Gyártás vagy tárolás", icon: Factory },
  { value: "iroda", label: "Irodaház", hint: "Energiatakarékos iroda", icon: Building2 },
  { value: "nyaralo", label: "Nyaraló", hint: "Pihenőhely, letisztultan", icon: Trees },
  { value: "lakoepulet", label: "Lakóház", hint: "Otthon kulcsrakészen", icon: Home },
  {
    value: "sajat-fejlesztes",
    label: "Saját fejlesztés",
    hint: "Befektetési célra",
    icon: TrendingUp,
  },
  { value: "egyeb", label: "Egyéb", hint: "Mesélje el nekünk", icon: Shapes },
];

export const plotStatusOptions: ChoiceOption[] = [
  {
    value: "sajat-telek",
    label: "Saját telek rendelkezésre áll",
    hint: "Indulhatunk a felméréssel",
    icon: LandPlot,
  },
  {
    value: "vasarlas-alatt",
    label: "Telekvásárlás folyamatban",
    hint: "Párhuzamosan tudunk haladni",
    icon: Handshake,
  },
  {
    value: "rendezendo",
    label: "Tereprendezés / bontás várható",
    hint: "Ezt is megoldjuk",
    icon: Hammer,
  },
  {
    value: "nincs-telek",
    label: "Még nincs telek",
    hint: "Semmi gond, beszéljünk",
    icon: MapPinOff,
  },
];

export const needsPlanningOptions: ChoiceOption[] = [
  {
    value: "igen",
    label: "Kérek tervezést",
    hint: "Tervek, statika, 3D modell tőlünk",
    icon: PencilRuler,
  },
  {
    value: "van-terv",
    label: "Van kész tervem",
    hint: "A tervei alapján építünk",
    icon: FileCheck2,
  },
  {
    value: "reszben",
    label: "Részben van tervem",
    hint: "Kiegészítjük, ami hiányzik",
    icon: FileText,
  },
  {
    value: "nem-tisztazott",
    label: "Még nem tudom",
    hint: "Az első beszélgetésen tisztázzuk",
    icon: HelpCircle,
  },
];

export const timelineOptions: ChoiceOption[] = [
  { value: "azonnal", label: "Azonnal", hint: "1 hónapon belül", icon: Zap },
  { value: "1-3-honap", label: "1–3 hónap", hint: "Rövid előkészítéssel", icon: CalendarClock },
  { value: "3-6-honap", label: "3–6 hónap", hint: "Van idő a tervezésre", icon: CalendarDays },
  { value: "kesobb", label: "Később", hint: "Most tájékozódom", icon: CalendarRange },
];

/** Gyorsválasztó chipek az alapterület lépéshez (m²). */
export const areaPresets = [40, 80, 120, 200, 400] as const;

export const optionLabelMap: Record<string, string> = Object.fromEntries(
  [...projectTypeOptions, ...plotStatusOptions, ...needsPlanningOptions, ...timelineOptions].map(
    (option) => [option.value, option.label]
  )
);
