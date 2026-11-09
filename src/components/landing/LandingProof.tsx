import Image from "next/image";
import { ArrowRight, ArrowUpRight, ChevronDown } from "lucide-react";
import { REFERENCES } from "@/content/references";
import PhoneCta from "./PhoneCta";

/**
 * Az űrlap alatti bizalomépítő rész: hogyan zajlik, valódi referenciák,
 * gyakori kérdések. Szándékosan az űrlap UTÁN jön — a hirdetésből érkező
 * látogató először a kérdéssort látja, ez azoknak szól, akik még bizonytalanok.
 */

const STEPS = [
  {
    title: "Kitölti az űrlapot",
    text: "Pár kattintás, nagyjából egy perc. Nem kell pontos adatokat tudnia, a részleteket együtt tisztázzuk.",
  },
  {
    title: "Felhívjuk",
    text: "24 órán belül személyesen jelentkezünk, és átbeszéljük a műszaki tartalmat, a telket és az ütemezést.",
  },
  {
    title: "Tételes ajánlatot kap",
    text: "Írásos, tételes ajánlatot készítünk — meglepetések nélkül. Az ajánlatkérés ingyenes, és semmire nem kötelez.",
  },
];

const FAQ = [
  {
    q: "Mennyibe kerül az ajánlatkérés?",
    a: "Semmibe. Az ajánlatkérés és az első egyeztetés ingyenes, és nem kötelezi semmire.",
  },
  {
    q: "Mikor kapok választ?",
    a: "Jellemzően 24 órán belül személyesen jelentkezünk a megadott elérhetőségeken.",
  },
  {
    q: "A tervezést és az engedélyeztetést is Önök végzik?",
    a: "Igen. Ha még nincs terve, mi készítjük el a terveket és a statikát, és a kivitelezést is egy kézből kapja. Ha már van terve, azzal dolgozunk.",
  },
  {
    q: "Mely területen vállalnak munkát?",
    a: "Hajdú-Bihar és Szabolcs-Szatmár-Bereg vármegyében. Ha más településen építene, írja meg, és megnézzük, mit tudunk tenni.",
  },
  {
    q: "Mire van szükségem az induláshoz?",
    a: "Elég egy ötlet és a település neve. A telek, a méret és a terv részleteit a hívásban pontosítjuk.",
  },
];

export default function LandingProof() {
  return (
    <div className="border-t border-white/[0.06]">
      {/* Hogyan zajlik */}
      <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:py-20" id="hogyan-zajlik">
        <p className="kicker">Hogyan zajlik</p>
        <h2 className="mt-3 max-w-2xl text-[28px] font-bold leading-[1.1] tracking-[-0.02em] sm:text-4xl">
          Három lépés az ajánlatig
        </h2>

        <ol className="mt-9 grid gap-4 md:grid-cols-3">
          {STEPS.map((step, index) => (
            <li key={step.title} className="card p-6">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-accent/15 text-sm font-bold text-accent ring-1 ring-accent/30">
                {index + 1}
              </span>
              <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-light-gray">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Referenciák */}
      <section className="mx-auto w-full max-w-6xl px-4 pb-14 sm:px-6 lg:pb-20" id="referenciak">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="kicker">Referenciák</p>
            <h2 className="mt-3 text-[28px] font-bold leading-[1.1] tracking-[-0.02em] sm:text-4xl">
              Így dolgozunk
            </h2>
          </div>
          <a
            href="https://acuwall.hu/referenciak"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-soft transition-colors hover:text-white"
          >
            Minden referencia <ArrowUpRight size={16} />
          </a>
        </div>

        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {REFERENCES.map((reference) => (
            <a
              key={reference.slug}
              href={`https://acuwall.hu/referenciak/${reference.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group card card-hover overflow-hidden"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={reference.cover.src}
                  alt={reference.cover.alt.hu}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-soft">
                  {reference.type.hu}
                </p>
                <h3 className="mt-1.5 text-base font-semibold leading-snug">
                  {reference.title.hu}
                </h3>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Gyakori kérdések */}
      <section className="mx-auto w-full max-w-3xl px-4 pb-14 sm:px-6 lg:pb-20" id="gyik">
        <p className="kicker">Gyakori kérdések</p>
        <h2 className="mt-3 text-[28px] font-bold leading-[1.1] tracking-[-0.02em] sm:text-4xl">
          Mielőtt kitöltené
        </h2>

        <div className="lp-faq mt-8 space-y-3">
          {FAQ.map((item) => (
            <details key={item.q} className="card group px-5 py-4">
              <summary className="flex items-center justify-between gap-4 text-[15px] font-semibold">
                {item.q}
                <ChevronDown
                  size={18}
                  className="lp-faq-chevron flex-shrink-0 text-accent transition-transform"
                />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-light-gray">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Zárás */}
      <section className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6 lg:pb-24">
        <div className="card flex flex-col items-start justify-between gap-6 p-7 sm:p-10 lg:flex-row lg:items-center">
          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Kezdjük el még ma
            </h2>
            <p className="mt-2 max-w-xl text-light-gray">
              Pár kattintás, és 24 órán belül felkeressük. Az ajánlatkérés ingyenes.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a href="#urlap" className="btn-primary group inline-flex items-center justify-center gap-2">
              Ajánlatot kérek
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </a>
            <PhoneCta variant="full" />
          </div>
        </div>
      </section>
    </div>
  );
}
