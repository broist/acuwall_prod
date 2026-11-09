"use client";

import { useRef, useState, type MutableRefObject } from "react";
import Link from "next/link";
import { CheckCircle2, ChevronDown, Loader2, PhoneCall } from "lucide-react";
import { trackEvent, trackLead } from "./tracking";

type Answers = {
  projectType: string;
  floorArea: string;
  plotStatus: string;
  needsPlanning: string;
  timeline: string;
  location: string;
};

/**
 * „Inkább visszahívjuk" — a kérdéssor alatt, minden lépésen.
 *
 * Aki megakad, vagy inkább beszélne valakivel, csak a telefonszámát hagyja
 * meg, és az addig megadott válaszokkal együtt a kollégákhoz kerül. Így a
 * lemorzsolódó érdeklődő sem vész el. A kérdéssor állapotát nem módosítja.
 */
export default function CallbackRequest({
  answers,
  startedAt,
  marketing,
}: {
  answers: Answers;
  startedAt: MutableRefObject<number>;
  marketing: MutableRefObject<Record<string, string>>;
}) {
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const honeypot = useRef<HTMLInputElement>(null);

  async function send(event: React.FormEvent) {
    event.preventDefault();
    if (status === "sending") return;

    if (phone.replace(/\D/g, "").length < 9) {
      setError("Adjon meg egy telefonszámot, amin visszahívhatjuk.");
      return;
    }
    if (!consent) {
      setError("Az adatkezeléshez való hozzájárulás szükséges.");
      return;
    }

    setError("");
    setStatus("sending");
    try {
      const response = await fetch("/api/send-callback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...answers,
          phone,
          name,
          company: honeypot.current?.value ?? "",
          elapsedMs: Date.now() - startedAt.current,
          marketing: marketing.current,
        }),
      });
      const data = (await response.json()) as { success?: boolean; message?: string };
      if (!response.ok || !data.success) {
        throw new Error(data.message || "send-failed");
      }

      setStatus("done");
      trackEvent("visszahivas_kero");
      trackLead({ lead_type: "visszahivas", epulet_tipus: answers.projectType });
    } catch (caught) {
      setStatus("idle");
      setError(
        caught instanceof Error && caught.message !== "send-failed"
          ? caught.message
          : "Nem sikerült elküldeni. Hívjon minket a fenti telefonszámon."
      );
    }
  }

  if (status === "done") {
    return (
      <div
        className="border-t border-white/[0.07] bg-white/[0.02] px-5 py-5 text-center sm:px-7"
        data-testid="callback-done"
      >
        <p className="inline-flex items-center gap-2 text-sm font-medium text-white">
          <CheckCircle2 size={18} className="text-accent" />
          Köszönjük! Hamarosan felhívjuk a megadott számon.
        </p>
      </div>
    );
  }

  return (
    <div className="border-t border-white/[0.07] bg-white/[0.02]">
      <button
        type="button"
        onClick={() => {
          setOpen((value) => !value);
          if (!open) trackEvent("visszahivas_megnyit");
        }}
        aria-expanded={open}
        aria-controls="visszahivas-panel"
        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left text-sm text-light-gray transition-colors hover:text-white sm:px-7"
      >
        <span className="flex items-start gap-2.5">
          <PhoneCall size={16} className="mt-0.5 flex-shrink-0 text-accent" />
          <span>
            Inkább beszélnék valakivel — <strong className="font-semibold text-white">hívjanak vissza</strong>
          </span>
        </span>
        <ChevronDown
          size={16}
          className={`flex-shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <form
          id="visszahivas-panel"
          onSubmit={send}
          noValidate
          className="space-y-3 px-5 pb-5 sm:px-7"
          data-testid="callback-form"
        >
          <p className="text-[13px] leading-relaxed text-medium-gray">
            Elég a telefonszáma — az eddigi válaszait is megkapják a kollégák, így nem kell
            újra elmondania.
          </p>

          <input
            ref={honeypot}
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="lp-honeypot"
          />

          <div className="grid gap-3 sm:grid-cols-2">
            <input
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="Telefonszám *"
              aria-label="Telefonszám"
              className="lp-input"
            />
            <input
              type="text"
              autoComplete="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Név (nem kötelező)"
              aria-label="Név"
              className="lp-input"
            />
          </div>

          <label className="!mb-0 flex cursor-pointer items-start gap-3 !text-[13px] !font-normal leading-relaxed !text-light-gray">
            <input
              type="checkbox"
              checked={consent}
              onChange={(event) => setConsent(event.target.checked)}
              className="lp-checkbox"
            />
            <span>
              Hozzájárulok, hogy az AcuWall a megadott telefonszámon felhívjon.{" "}
              <Link href="/adatkezeles" target="_blank" className="text-accent hover:underline">
                Adatkezelési tájékoztató
              </Link>
            </span>
          </label>

          {error && (
            <p role="alert" className="text-sm text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={status === "sending"}
            className="btn-primary inline-flex h-12 w-full items-center justify-center gap-2 !py-0 disabled:opacity-60"
          >
            {status === "sending" ? (
              <>
                <Loader2 size={18} className="animate-spin" /> Küldés...
              </>
            ) : (
              "Kérem a visszahívást"
            )}
          </button>
        </form>
      )}
    </div>
  );
}
