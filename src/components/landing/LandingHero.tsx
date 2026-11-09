import { Check } from "lucide-react";
import PhoneCta from "./PhoneCta";

/**
 * Az ajánlatkérő oldal bevezetője. Mobilon csak a cím és egy mondat látszik,
 * hogy a kérdéssor az első képernyőn maradjon; asztali gépen a kérdéssor
 * mellett áll, és az érvek is helyet kapnak.
 */
export default function LandingHero() {
  return (
    <div className="lg:pt-4">
      <p className="kicker hidden lg:inline-flex">Generálkivitelezés kulcsrakészen</p>

      <h1 className="text-center text-[17px] font-semibold leading-snug tracking-tight sm:text-xl lg:mt-4 lg:text-left lg:text-[46px] lg:font-bold lg:leading-[1.05] lg:tracking-[-0.03em]">
        <span className="lg:hidden">
          Generálkivitelezés <span className="text-accent">kulcsrakészen</span>
        </span>
        <span className="hidden lg:inline">
          Tervezéstől a kulcsátadásig, <span className="text-accent">egy kézből</span>
        </span>
      </h1>

      <p className="mx-auto mt-2 hidden max-w-md text-center text-[13px] sm:block leading-relaxed text-light-gray sm:text-sm lg:mx-0 lg:mt-5 lg:max-w-lg lg:text-left lg:text-lg">
        Mondja el pár kattintásban, mit tervez. Megtervezzük és fel is építjük — 24 órán belül
        személyesen válaszolunk.
      </p>

      <ul className="mt-8 hidden space-y-3.5 lg:block">
        {[
          "Egy felelős vállalkozó: tervezés, engedélyezés és kivitelezés egy kézben.",
          "Tételes, írásos ajánlat — meglepetések nélkül.",
          "Hajdú-Biharban és Szabolcs-Szatmár-Beregben dolgozunk.",
        ].map((text) => (
          <li key={text} className="flex items-start gap-3 text-light-gray">
            <span className="mt-0.5 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent ring-1 ring-accent/30">
              <Check size={14} strokeWidth={3} />
            </span>
            {text}
          </li>
        ))}
      </ul>

      <div className="mt-8 hidden items-center gap-4 lg:flex">
        <PhoneCta variant="full" />
        <span className="text-sm text-medium-gray">Inkább telefonálna? Hívjon bizalommal.</span>
      </div>
    </div>
  );
}
