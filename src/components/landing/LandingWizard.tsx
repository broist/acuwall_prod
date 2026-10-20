"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Clock,
  Loader2,
  Lock,
  Mail,
  MapPin,
  PhoneCall,
  Ruler,
  ShieldCheck,
  User,
} from "lucide-react";
import BuildProgress from "./BuildProgress";
import {
  CONTACT,
  areaPresets,
  needsPlanningOptions,
  optionLabelMap,
  plotStatusOptions,
  projectTypeOptions,
  timelineOptions,
  type ChoiceOption,
} from "./config";
import { trackEvent, trackLead } from "./tracking";

/* ------------------------------------------------------------------ */
/* Lépések                                                             */
/* ------------------------------------------------------------------ */

type ChoiceId = "projectType" | "plotStatus" | "needsPlanning" | "timeline";

type Step =
  | {
      kind: "choice";
      id: ChoiceId;
      question: string;
      help: string;
      options: ChoiceOption[];
      columns: 1 | 2;
    }
  | { kind: "area"; id: "floorArea"; question: string; help: string }
  | { kind: "place"; id: "location"; question: string; help: string }
  | { kind: "contact"; id: "contact"; question: string; help: string };

const STEPS: Step[] = [
  {
    kind: "choice",
    id: "projectType",
    question: "Mit szeretne építeni?",
    help: "Válasszon egyet — a részleteket később pontosítjuk.",
    options: projectTypeOptions,
    columns: 2,
  },
  {
    kind: "area",
    id: "floorArea",
    question: "Mekkora épületre gondol?",
    help: "Elég egy nagyságrend, nem kell pontos szám.",
  },
  {
    kind: "choice",
    id: "plotStatus",
    question: "Hogy áll a telek?",
    help: "Ez határozza meg, mivel kezdünk.",
    options: plotStatusOptions,
    columns: 1,
  },
  {
    kind: "choice",
    id: "needsPlanning",
    question: "Van már terve?",
    help: "Ha nincs, mi készítjük el a terveket és a statikát.",
    options: needsPlanningOptions,
    columns: 1,
  },
  {
    kind: "choice",
    id: "timeline",
    question: "Mikor kezdene?",
    help: "Nem kötelező érvényű — csak hogy tudjunk tervezni.",
    options: timelineOptions,
    columns: 2,
  },
  {
    kind: "place",
    id: "location",
    question: "Hol épülne?",
    help: "Hajdú-Biharban és Szabolcs-Szatmár-Beregben dolgozunk, elég a település neve.",
  },
  {
    kind: "contact",
    id: "contact",
    question: "Hol érjük el?",
    help: "24 órán belül személyesen jelentkezünk. Nem kötelezi semmire.",
  },
];

/**
 * A lépést a böngésző-előzménybe írjuk, de a Next.js saját mezőit (__NA, fa)
 * megtartjuk: nélkülük a Next.js router vissza gombra az egész oldalt
 * újratölti, és a látogató kiesik a kérdéssorból.
 */
function writeHistory(mode: "push" | "replace", acuStep: number, acuDepth: number) {
  const state = { ...(window.history.state ?? {}), acuStep, acuDepth };
  if (mode === "push") window.history.pushState(state, "");
  else window.history.replaceState(state, "");
}

const CHOICE_STEP_INDEX: Record<string, number> = Object.fromEntries(
  STEPS.map((step, index) => [step.id, index])
);

/* ------------------------------------------------------------------ */
/* Állapot                                                             */
/* ------------------------------------------------------------------ */

type FieldKey =
  | "projectType"
  | "floorArea"
  | "plotStatus"
  | "needsPlanning"
  | "timeline"
  | "location"
  | "message"
  | "name"
  | "email"
  | "phone";

type FormState = Record<FieldKey, string>;

const EMPTY_FORM: FormState = {
  projectType: "",
  floorArea: "",
  plotStatus: "",
  needsPlanning: "",
  timeline: "",
  location: "",
  message: "",
  name: "",
  email: "",
  phone: "",
};

const STORAGE_KEY = "acuwall_landing_form";

type Errors = Partial<Record<FieldKey | "consent", string>>;

function validateStep(index: number, form: FormState, consent: boolean): Errors {
  const step = STEPS[index];
  const errors: Errors = {};

  if (step.kind === "choice" && !form[step.id]) {
    errors[step.id] = "Válasszon egy lehetőséget.";
  }

  if (step.kind === "area" && form.floorArea) {
    const value = Number(form.floorArea);
    if (!Number.isFinite(value) || value < 1 || value > 100000) {
      errors.floorArea = "Adjon meg egy értelmes méretet (1–100000 m²).";
    }
  }

  if (step.kind === "place" && form.location.trim().length < 2) {
    errors.location = "Írja be a település nevét.";
  }

  if (step.kind === "contact") {
    if (form.name.trim().length < 2) errors.name = "Kérjük, adja meg a nevét.";
    if (!/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(form.email.trim())) {
      errors.email = "Ellenőrizze az e-mail címet.";
    }
    if (form.phone.replace(/\D/g, "").length < 9) {
      errors.phone = "Adjon meg egy telefonszámot, hogy vissza tudjuk hívni.";
    }
    if (!consent) errors.consent = "Az adatkezeléshez való hozzájárulás szükséges.";
  }

  return errors;
}

/* ------------------------------------------------------------------ */
/* Komponens                                                           */
/* ------------------------------------------------------------------ */

export default function LandingWizard() {
  const reduceMotion = useReducedMotion();

  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [leadId, setLeadId] = useState("");
  const [restored, setRestored] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startedAt = useRef(Date.now());
  const marketing = useRef<Record<string, string>>({});
  const startTracked = useRef(false);
  const stepTracked = useRef<Set<number>>(new Set());
  // Hány saját history-bejegyzést tettünk a landing fölé. A "Vissza" csak
  // ezeken belül lép a böngészővel, különben elhagyná az oldalt.
  const historyDepth = useRef(0);

  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;

  /* --- Betöltés: korábbi kitöltés + kampányadatok --- */
  useEffect(() => {
    let initialStep = 0;
    try {
      const saved = window.sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as {
          form?: Partial<FormState>;
          step?: number;
        };
        if (parsed.form) setForm((prev) => ({ ...prev, ...parsed.form }));
        if (typeof parsed.step === "number") {
          initialStep = Math.min(Math.max(parsed.step, 0), STEPS.length - 1);
          setStep(initialStep);
        }
      }
    } catch {
      /* sérült tárolt adat: friss űrlappal indulunk */
    }

    const params = new URLSearchParams(window.location.search);
    const collected: Record<string, string> = {};
    for (const key of [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_term",
      "utm_content",
      "gclid",
      "fbclid",
      "msclkid",
    ]) {
      const value = params.get(key);
      if (value) collected[key] = value.slice(0, 200);
    }
    if (document.referrer) collected.referrer = document.referrer.slice(0, 300);
    marketing.current = collected;

    writeHistory("replace", initialStep, 0);
    setRestored(true);
  }, []);

  /* --- Mentés, hogy egy véletlen frissítés ne törölje a haladást --- */
  useEffect(() => {
    if (!restored || status === "done") return;
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ form, step }));
    } catch {
      /* privát mód: mentés nélkül is működik */
    }
  }, [form, step, restored, status]);

  /* --- Android/böngésző vissza gomb egy lépést lép vissza --- */
  useEffect(() => {
    const onPopState = (event: PopStateEvent) => {
      if (status === "done") return;
      const state = event.state as { acuStep?: number; acuDepth?: number } | null;
      historyDepth.current = state?.acuDepth ?? 0;
      const target = state?.acuStep;
      if (typeof target === "number") setStep(Math.min(Math.max(target, 0), STEPS.length - 1));
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [status]);

  useEffect(
    () => () => {
      if (advanceTimer.current) clearTimeout(advanceTimer.current);
    },
    []
  );

  /* --- Lépésváltás: görgetés és fókusz --- */
  useEffect(() => {
    if (!restored) return;
    const card = cardRef.current;
    if (!card) return;

    const top = card.getBoundingClientRect().top;
    if (top < 0 || top > window.innerHeight * 0.55) {
      window.scrollTo({
        top: window.scrollY + top - 16,
        behavior: reduceMotion ? "auto" : "smooth",
      });
    }

    // Asztali gépen a beviteli mezőre ugrunk; mobilon nem nyitjuk fel
    // magától a billentyűzetet, mert az elfedi a kérdést.
    const wide = window.matchMedia("(min-width: 1024px)").matches;
    const field = card.querySelector<HTMLInputElement>("[data-autofocus]");
    if (wide && field) field.focus({ preventScroll: true });
    else headingRef.current?.focus({ preventScroll: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, restored]);

  const markStarted = useCallback(() => {
    if (startTracked.current) return;
    startTracked.current = true;
    trackEvent("urlap_inditas");
  }, []);

  const goTo = useCallback((next: number) => {
    setStep(next);
    historyDepth.current += 1;
    writeHistory("push", next, historyDepth.current);
  }, []);

  const goBack = useCallback(() => {
    if (historyDepth.current > 0) {
      window.history.back();
      return;
    }
    // Frissítés után nincs alattunk saját bejegyzés: helyben lépünk vissza.
    const prev = Math.max(step - 1, 0);
    setStep(prev);
    writeHistory("replace", prev, 0);
  }, [step]);

  const submit = useCallback(async (snapshot: FormState) => {
    setStatus("sending");
    try {
      const response = await fetch("/api/send-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...snapshot,
          company: honeypotRef.current?.value ?? "",
          elapsedMs: Date.now() - startedAt.current,
          marketing: marketing.current,
        }),
      });

      const data = (await response.json()) as {
        success?: boolean;
        leadId?: string;
      };

      if (!response.ok || !data.success) throw new Error("send-failed");

      setLeadId(data.leadId ?? "");
      setStatus("done");
      try {
        window.sessionStorage.removeItem(STORAGE_KEY);
      } catch {
        /* nem gond */
      }
      trackLead({ lead_id: data.leadId, epulet_tipus: snapshot.projectType });
    } catch {
      setStatus("error");
    }
  }, []);

  const advance = useCallback(
    (snapshot: FormState, consentValue = consent) => {
      const found = validateStep(step, snapshot, consentValue);
      if (Object.keys(found).length > 0) {
        setErrors(found);
        return;
      }

      setErrors({});
      markStarted();

      // Lépésenként külön eseménynév: a GA4 esemény-riportban külön beállítás
      // nélkül látszik, hol morzsolódik a kitöltés.
      if (!stepTracked.current.has(step)) {
        stepTracked.current.add(step);
        trackEvent(`lepes_${step + 1}`, { kerdes: current.id });
      }

      if (isLast) void submit(snapshot);
      else goTo(step + 1);
    },
    [consent, current.id, goTo, isLast, markStarted, step, submit]
  );

  const setValue = useCallback((key: FieldKey, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }, []);

  const chooseOption = useCallback(
    (key: ChoiceId, value: string) => {
      const next = { ...form, [key]: value };
      setForm(next);
      setErrors({});
      markStarted();

      if (advanceTimer.current) clearTimeout(advanceTimer.current);
      advanceTimer.current = setTimeout(() => advance(next), reduceMotion ? 0 : 260);
    },
    [advance, form, markStarted, reduceMotion]
  );

  /* --- Számbillentyűkkel is választható --- */
  useEffect(() => {
    if (current.kind !== "choice" || status !== "idle") return;

    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;

      const index = Number(event.key) - 1;
      const option = current.options[index];
      if (!option) return;

      event.preventDefault();
      chooseOption(current.id, option.value);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [chooseOption, current, status]);

  const answeredChips = useMemo(
    () =>
      (
        [
          ["projectType", "Épület"],
          ["floorArea", "Méret"],
          ["plotStatus", "Telek"],
          ["needsPlanning", "Tervek"],
          ["timeline", "Indulás"],
          ["location", "Helyszín"],
        ] as [FieldKey, string][]
      )
        .filter(([key]) => form[key])
        .map(([key, label]) => ({
          key,
          label,
          value: key === "floorArea" ? `${form[key]} m²` : (optionLabelMap[form[key]] ?? form[key]),
          stepIndex: CHOICE_STEP_INDEX[key === "message" ? "location" : key] ?? 0,
        })),
    [form]
  );

  /* ---------------------------------------------------------------- */
  /* Sikeres beküldés                                                  */
  /* ---------------------------------------------------------------- */

  if (status === "done") {
    return (
      <div
        ref={cardRef}
        id="urlap"
        className="card overflow-hidden p-7 text-center sm:p-10"
        data-testid="landing-success"
      >
        <motion.span
          initial={reduceMotion ? false : { scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 220, damping: 18 }}
          className="mx-auto mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-accent/15 text-accent ring-1 ring-accent/40"
        >
          <CheckCircle2 size={40} />
        </motion.span>

        <h2 className="mb-3 text-2xl font-bold tracking-tight sm:text-3xl">
          Köszönjük, megkaptuk!
        </h2>
        <p className="mx-auto mb-8 max-w-md leading-relaxed text-light-gray">
          Az adatokat továbbítottuk a kollégáknak. Jellemzően{" "}
          <strong className="text-white">24 órán belül</strong> személyesen jelentkezünk a megadott
          elérhetőségeken.
        </p>

        <div className="mx-auto mb-8 max-w-md space-y-3 text-left">
          {[
            "Átnézzük, amit megadott, és felkészülünk a beszélgetésre.",
            "Felhívjuk, és tisztázzuk a műszaki tartalmat, a telket és az ütemezést.",
            "Írásos, tételes ajánlatot kap — meglepetések nélkül.",
          ].map((text, index) => (
            <div key={text} className="flex items-start gap-3 rounded-xl bg-white/[0.03] p-3.5">
              <span className="mt-0.5 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-accent/15 text-xs font-bold text-accent">
                {index + 1}
              </span>
              <span className="text-sm leading-relaxed text-light-gray">{text}</span>
            </div>
          ))}
        </div>

        <a
          href={CONTACT.phoneHref}
          className="btn-primary inline-flex items-center justify-center gap-2"
        >
          <PhoneCall size={18} />
          Sürgős? Hívjon most: {CONTACT.phoneDisplay}
        </a>

        {leadId && (
          <p className="mt-6 text-xs text-medium-gray">
            Azonosító: <span className="font-mono text-light-gray">{leadId}</span>
          </p>
        )}
      </div>
    );
  }

  /* ---------------------------------------------------------------- */
  /* Kérdéssor                                                         */
  /* ---------------------------------------------------------------- */

  // Csak belépő animáció, kilépő nélkül: a lépésváltás így akkor sem tud
  // beragadni, ha a böngésző épp nem rajzol (háttérbe tett fül).
  const enter = reduceMotion
    ? { initial: false as const, animate: {} }
    : { initial: { opacity: 0, x: 24 }, animate: { opacity: 1, x: 0 } };

  return (
    <div ref={cardRef} id="urlap" className="card overflow-hidden" data-testid="landing-wizard">
      {/* Haladás */}
      <div className="flex items-center gap-4 border-b border-white/[0.07] bg-white/[0.02] px-5 py-4 sm:px-7">
        <BuildProgress stage={step} className="h-12 w-16 flex-shrink-0" />
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-3">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-light-gray">
              {step + 1}. kérdés / {STEPS.length}
            </span>
            <span className="whitespace-nowrap text-xs text-medium-gray">
              {isLast ? "Utolsó lépés" : `még ${STEPS.length - step - 1} kérdés`}
            </span>
          </div>
          <div
            className="mt-2 flex gap-1.5"
            role="progressbar"
            aria-valuenow={step + 1}
            aria-valuemin={1}
            aria-valuemax={STEPS.length}
            aria-label="Ajánlatkérés haladása"
          >
            {STEPS.map((item, index) => (
              <span
                key={item.id}
                className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${
                  index <= step ? "bg-accent" : "bg-white/10"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <form
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          advance(form);
        }}
        className="p-5 sm:p-7"
      >
        {/* Robotcsapda — valódi látogató sosem tölti ki */}
        <input
          ref={honeypotRef}
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="lp-honeypot"
        />

        <motion.div
          key={step}
          initial={enter.initial}
          animate={enter.animate}
          transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2
            ref={headingRef}
            tabIndex={-1}
            className="text-xl font-bold leading-snug tracking-tight outline-none sm:text-2xl"
          >
            {current.question}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-light-gray">{current.help}</p>

          <div className="mt-6">
            {current.kind === "choice" && (
              <div
                className={`grid gap-2.5 ${current.columns === 2 ? "sm:grid-cols-2" : "grid-cols-1"}`}
              >
                {current.options.map((option, index) => {
                  const selected = form[current.id] === option.value;
                  const Icon = option.icon;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => chooseOption(current.id, option.value)}
                      aria-pressed={selected}
                      data-testid={`landing-option-${option.value}`}
                      className={`group relative flex min-h-[68px] items-center gap-3.5 rounded-2xl border p-3.5 text-left transition-all duration-200 active:scale-[0.99] ${
                        selected
                          ? "border-accent bg-accent/10 ring-1 ring-accent"
                          : "border-white/10 bg-white/[0.03] hover:border-accent/40 hover:bg-white/[0.06]"
                      }`}
                    >
                      <span
                        className={`inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border transition-colors duration-200 ${
                          selected
                            ? "border-accent/40 bg-accent text-white"
                            : "border-accent/25 bg-accent/10 text-accent group-hover:bg-accent/15"
                        }`}
                      >
                        <Icon size={20} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-semibold leading-tight text-white">
                          {option.label}
                        </span>
                        {option.hint && (
                          <span className="mt-0.5 block text-[13px] leading-snug text-light-gray">
                            {option.hint}
                          </span>
                        )}
                      </span>
                      <span
                        className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border transition-all duration-200 ${
                          selected
                            ? "border-accent bg-accent text-white opacity-100"
                            : "border-white/15 text-transparent opacity-60"
                        }`}
                      >
                        <Check size={14} strokeWidth={3} />
                      </span>
                      <kbd className="pointer-events-none absolute right-3 top-3 hidden rounded border border-white/10 px-1.5 text-[10px] font-medium text-medium-gray lg:block">
                        {index + 1}
                      </kbd>
                    </button>
                  );
                })}
              </div>
            )}

            {current.kind === "area" && (
              <div>
                <div className="mb-4 grid grid-cols-3 gap-2 sm:grid-cols-6">
                  {areaPresets.map((preset) => {
                    const selected = form.floorArea === String(preset);
                    return (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setValue("floorArea", String(preset))}
                        aria-pressed={selected}
                        className={`rounded-xl border px-2 py-3 text-sm font-semibold transition-all duration-200 active:scale-[0.98] ${
                          selected
                            ? "border-accent bg-accent/15 text-white ring-1 ring-accent"
                            : "border-white/10 bg-white/[0.03] text-light-gray hover:border-accent/40 hover:text-white"
                        }`}
                      >
                        {preset} m²
                      </button>
                    );
                  })}
                </div>

                <label htmlFor="floorArea" className="!text-light-gray">
                  Vagy adja meg pontosan
                </label>
                <div className="relative">
                  <Ruler
                    size={18}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-medium-gray"
                    aria-hidden="true"
                  />
                  <input
                    id="floorArea"
                    name="floorArea"
                    type="text"
                    inputMode="numeric"
                    enterKeyHint="next"
                    data-autofocus
                    value={form.floorArea}
                    onChange={(event) =>
                      setValue("floorArea", event.target.value.replace(/[^\d]/g, ""))
                    }
                    placeholder="Pl. 120"
                    aria-invalid={Boolean(errors.floorArea)}
                    aria-describedby={errors.floorArea ? "floorArea-error" : undefined}
                    className="lp-input !pl-11 !pr-14"
                  />
                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-medium-gray">
                    m²
                  </span>
                </div>
                <FieldError id="floorArea-error" message={errors.floorArea} />

                <button
                  type="button"
                  onClick={() => {
                    const next = { ...form, floorArea: "" };
                    setForm(next);
                    advance(next);
                  }}
                  className="mt-4 text-sm text-light-gray underline-offset-4 transition-colors hover:text-white hover:underline"
                >
                  Ezt még nem tudom — tovább
                </button>
              </div>
            )}

            {current.kind === "place" && (
              <div className="space-y-5">
                <div>
                  <label htmlFor="location">
                    Település <span className="text-accent">*</span>
                  </label>
                  <div className="relative">
                    <MapPin
                      size={18}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-medium-gray"
                      aria-hidden="true"
                    />
                    <input
                      id="location"
                      name="location"
                      type="text"
                      autoComplete="address-level2"
                      enterKeyHint="next"
                      data-autofocus
                      value={form.location}
                      onChange={(event) => setValue("location", event.target.value)}
                      placeholder="Pl. Debrecen, Nyíregyháza"
                      aria-invalid={Boolean(errors.location)}
                      aria-describedby={errors.location ? "location-error" : undefined}
                      className="lp-input !pl-11"
                    />
                  </div>
                  <FieldError id="location-error" message={errors.location} />
                </div>

                <div>
                  <label htmlFor="message" className="!text-light-gray">
                    Pár szó a projektről <span className="text-medium-gray">(nem kötelező)</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={(event) => setValue("message", event.target.value)}
                    placeholder="Írjon le mindent, amit fontosnak érez — a többit majd kérdezzük."
                    className="lp-input resize-none"
                  />
                </div>
              </div>
            )}

            {current.kind === "contact" && (
              <div className="space-y-4">
                {answeredChips.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 rounded-xl bg-white/[0.03] p-3">
                    {answeredChips.map((chip) => (
                      <button
                        key={chip.key}
                        type="button"
                        onClick={() => goTo(chip.stepIndex)}
                        className="rounded-lg border border-white/10 bg-primary-deep/60 px-2.5 py-1.5 text-xs text-light-gray transition-colors hover:border-accent/40 hover:text-white"
                        title="Módosítás"
                      >
                        <span className="text-medium-gray">{chip.label}:</span> {chip.value}
                      </button>
                    ))}
                  </div>
                )}

                <div>
                  <label htmlFor="name">
                    Név <span className="text-accent">*</span>
                  </label>
                  <div className="relative">
                    <User
                      size={18}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-medium-gray"
                      aria-hidden="true"
                    />
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      enterKeyHint="next"
                      data-autofocus
                      value={form.name}
                      onChange={(event) => setValue("name", event.target.value)}
                      placeholder="Pl. Kovács Péter"
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      className="lp-input !pl-11"
                    />
                  </div>
                  <FieldError id="name-error" message={errors.name} />
                </div>

                <div>
                  <label htmlFor="phone">
                    Telefonszám <span className="text-accent">*</span>
                  </label>
                  <div className="relative">
                    <PhoneCall
                      size={18}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-medium-gray"
                      aria-hidden="true"
                    />
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      enterKeyHint="next"
                      value={form.phone}
                      onChange={(event) => setValue("phone", event.target.value)}
                      placeholder="+36 30 123 4567"
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={errors.phone ? "phone-error" : undefined}
                      className="lp-input !pl-11"
                    />
                  </div>
                  <FieldError id="phone-error" message={errors.phone} />
                </div>

                <div>
                  <label htmlFor="email">
                    E-mail <span className="text-accent">*</span>
                  </label>
                  <div className="relative">
                    <Mail
                      size={18}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-medium-gray"
                      aria-hidden="true"
                    />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      enterKeyHint="send"
                      value={form.email}
                      onChange={(event) => setValue("email", event.target.value)}
                      placeholder="pelda@email.hu"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      className="lp-input !pl-11"
                    />
                  </div>
                  <FieldError id="email-error" message={errors.email} />
                </div>

                <label className="!mb-0 flex cursor-pointer items-start gap-3 !text-sm !font-normal leading-relaxed !text-light-gray">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(event) => {
                      setConsent(event.target.checked);
                      setErrors((prev) => ({ ...prev, consent: undefined }));
                    }}
                    className="lp-checkbox"
                    aria-invalid={Boolean(errors.consent)}
                    aria-describedby={errors.consent ? "consent-error" : undefined}
                  />
                  <span>
                    Hozzájárulok, hogy az AcuWall a megadott adatokat az ajánlatkérésem
                    feldolgozásához kezelje.{" "}
                    <Link
                      href="/adatkezeles"
                      target="_blank"
                      className="text-accent hover:underline"
                    >
                      Adatkezelési tájékoztató
                    </Link>{" "}
                    <span className="text-accent">*</span>
                  </span>
                </label>
                <FieldError id="consent-error" message={errors.consent} />
              </div>
            )}
          </div>
        </motion.div>

        {status === "error" && (
          <div
            role="alert"
            className="mt-5 flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300"
          >
            <AlertCircle size={18} className="mt-0.5 flex-shrink-0" />
            <span>
              Nem sikerült elküldeni. Kérjük, próbálja újra, vagy hívjon minket:{" "}
              <a href={CONTACT.phoneHref} className="font-semibold underline">
                {CONTACT.phoneDisplay}
              </a>
            </span>
          </div>
        )}

        {/* Navigáció */}
        <div className="mt-7 flex items-center gap-3">
          {step > 0 && (
            <button
              type="button"
              onClick={goBack}
              className="inline-flex h-12 items-center gap-2 rounded-xl border border-white/12 px-4 text-sm font-medium text-white/80 transition-colors hover:bg-white/5"
              data-testid="landing-back"
            >
              <ArrowLeft size={16} />
              Vissza
            </button>
          )}

          {(current.kind !== "choice" || form[current.id]) && (
            <button
              type="submit"
              disabled={status === "sending"}
              className="btn-primary group inline-flex h-12 flex-1 items-center justify-center gap-2 whitespace-nowrap !px-4 !py-0 sm:!px-8 disabled:cursor-not-allowed disabled:opacity-60"
              data-testid="landing-next"
            >
              {status === "sending" ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Küldés...
                </>
              ) : (
                <>
                  {isLast ? "Ajánlatot kérek" : "Tovább"}
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </>
              )}
            </button>
          )}
        </div>

        {/* Bizalmi microcopy */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[12px] text-medium-gray">
          <span className="inline-flex items-center gap-1.5">
            <Lock size={13} className="text-accent/70" /> Adatait nem adjuk tovább
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock size={13} className="text-accent/70" /> Válasz 24 órán belül
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck size={13} className="text-accent/70" /> Ingyenes, nem kötelező
          </span>
        </div>
      </form>
    </div>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-2 flex items-center gap-1.5 text-sm text-red-400">
      <AlertCircle size={14} className="flex-shrink-0" />
      {message}
    </p>
  );
}
