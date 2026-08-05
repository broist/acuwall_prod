import Image from "next/image";
import {
  Banknote,
  ChevronDown,
  ClipboardCheck,
  FileSignature,
  Gauge,
  Handshake,
  KeyRound,
  PhoneCall,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { CONTACT } from "./config";

const AFTER_SUBMIT = [
  {
    icon: PhoneCall,
    title: "Felhívjuk 24 órán belül",
    text: "Nem robot és nem call center: az a kolléga keresi, aki a projektet is viszi.",
  },
  {
    icon: ClipboardCheck,
    title: "Tisztázzuk a részleteket",
    text: "Műszaki tartalom, telek, hatósági út, ütemezés — végigvesszük, mi kell pontosan.",
  },
  {
    icon: FileSignature,
    title: "Tételes, írásos ajánlat",
    text: "Amit leírunk, azt visszük végig. Utólag nem kerülnek elő tételek.",
  },
];

const WHY_US = [
  {
    icon: Handshake,
    title: "Egy felelős az ötlettől a kulcsátadásig",
    text: "Tervezés, alapozás, acélváz, homlokzat, gépészet, villany, belsőépítészet — egy szerződésben.",
  },
  {
    icon: Banknote,
    title: "Érthető ár, meglepetések nélkül",
    text: "Pontos tartalomlistát kap, ütemezett fizetéssel — mindig csak azért, ami elkészült.",
  },
  {
    icon: Gauge,
    title: "Gyorsabb, mint a hagyományos építés",
    text: "A szerkezet és a homlokzat előregyártott, a helyszíni munka nagyrészt szerelés.",
  },
  {
    icon: ShieldCheck,
    title: "A papírmunkát levesszük a válláról",
    text: "Utánajárunk a hatósági kötelezettségeknek, és elintézzük Ön helyett.",
  },
  {
    icon: Sparkles,
    title: "Végig látja, hol tartunk",
    text: "Fotókkal követhető munkák, dokumentált átadás, írásos garancia.",
  },
  {
    icon: KeyRound,
    title: "Kulcsrakész, nem félkész",
    text: "Használatra kész épületet adunk át, nem csak egy szerkezetet.",
  },
];

const BUILDING_TYPES = [
  {
    src: "/images/epulettipusok/garazs-tarolo.jpg",
    title: "Garázsok és tárolók",
    subtitle: "A leggyorsabb belépő",
  },
  {
    src: "/images/epulettipusok/csarnok.jpg",
    title: "Műhelyek és csarnokok",
    subtitle: "Gyártás vagy tárolás",
  },
  {
    src: "/images/epulettipusok/irodahaz.jpg",
    title: "Irodaházak",
    subtitle: "Hamarabbi beköltözés",
  },
];

const FAQ = [
  {
    question: "Mi van, ha nincs tervem?",
    answer:
      "Semmi gond — a legtöbben így érkeznek. Elkészítjük a terveket, a statikai számítást és a 3D modellt, Ön pedig a teljes kép ismeretében dönt.",
  },
  {
    question: "Mennyibe kerül?",
    answer:
      "Minden projekt egyedi, ezért pontos, tételes ajánlatot adunk. Amit leírunk, azt visszük végig — utólag nem kerülnek elő tételek.",
  },
  {
    question: "Mennyi idő alatt készül el?",
    answer:
      "A szerkezet és a homlokzat előregyártott, a helyszíni munka jelentős része szerelésből áll. A pontos határidőt az ajánlatban és a szerződésben rögzítjük.",
  },
  {
    question: "Kell engedély egy garázshoz?",
    answer:
      "Mérettől és településtől függ. Az engedélyezési utat mi tisztázzuk a helyi hatóságokkal — Önnek ezzel nem kell foglalkoznia.",
  },
  {
    question: "Hol vállalnak munkát?",
    answer: "Országosan, Magyarország bármely pontján. Bárhol is van a telke, keressen minket.",
  },
  {
    question: "Az ajánlatkérés kötelez valamire?",
    answer:
      "Nem. Az űrlap kitöltése ingyenes és semmilyen kötelezettséggel nem jár — csak az első beszélgetésünk alapja.",
  },
];

function SectionHeading({
  eyebrow,
  title,
  accent,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
}) {
  return (
    <div className="mx-auto mb-10 max-w-2xl text-center">
      <span className="eyebrow eyebrow-centered mb-4">{eyebrow}</span>
      <h2 className="text-2xl font-bold leading-tight tracking-tight sm:text-3xl lg:text-4xl">
        {title} {accent && <span className="text-accent">{accent}</span>}
      </h2>
    </div>
  );
}

export default function LandingSections() {
  return (
    <>
      {/* Mi történik a beküldés után — a legfontosabb kérdés egy űrlapnál */}
      <section className="border-t border-white/[0.06] py-16 md:py-20">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Mi történik ezután?"
            title="Az elküldés után"
            accent="ez következik."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {AFTER_SUBMIT.map((item, index) => (
              <div key={item.title} className="card card-hover relative p-6">
                <span className="absolute right-5 top-5 text-3xl font-bold text-white/[0.06]">
                  {index + 1}
                </span>
                <span className="icon-tile mb-4">
                  <item.icon size={20} />
                </span>
                <h3 className="mb-2 font-bold leading-snug">{item.title}</h3>
                <p className="text-sm leading-relaxed text-light-gray">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Miért az AcuWall */}
      <section className="border-t border-white/[0.06] py-16 md:py-20">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Miért az AcuWall?"
            title="Miért bízhatja ránk"
            accent="a tervét?"
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_US.map((item) => (
              <div key={item.title} className="card card-hover p-6">
                <span className="icon-tile mb-4">
                  <item.icon size={20} />
                </span>
                <h3 className="mb-2 font-bold leading-snug">{item.title}</h3>
                <p className="text-sm leading-relaxed text-light-gray">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Épülettípusok */}
      <section className="border-t border-white/[0.06] py-16 md:py-20">
        <div className="container-custom">
          <SectionHeading eyebrow="Épülettípusok" title="Bármit tervez," accent="megépítjük." />
          <div className="grid gap-4 sm:grid-cols-3">
            {BUILDING_TYPES.map((type) => (
              <div
                key={type.title}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.07]"
              >
                <Image
                  src={type.src}
                  alt={type.title}
                  width={640}
                  height={420}
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-deep via-primary-deep/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="font-bold leading-tight">{type.title}</h3>
                  <p className="mt-1 text-sm text-light-gray">{type.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-5 text-center text-sm text-light-gray">
            …és nyaralók, lakóházak, saját fejlesztések — a technológia ugyanaz, a méret és a
            papírmunka változik.
          </p>
        </div>
      </section>

      {/* GYIK */}
      <section className="border-t border-white/[0.06] py-16 md:py-20">
        <div className="container-custom">
          <SectionHeading eyebrow="Gyakori kérdések" title="Amit a legtöbben" accent="kérdeznek." />
          <div className="lp-faq mx-auto max-w-3xl space-y-3">
            {FAQ.map((item) => (
              <details key={item.question} className="card overflow-hidden">
                <summary className="flex items-center justify-between gap-4 p-5 font-semibold transition-colors hover:text-accent">
                  {item.question}
                  <ChevronDown
                    size={18}
                    className="lp-faq-chevron flex-shrink-0 text-accent transition-transform duration-300"
                    aria-hidden="true"
                  />
                </summary>
                <p className="px-5 pb-5 text-sm leading-relaxed text-light-gray">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Záró CTA */}
      <section className="border-t border-white/[0.06] py-16 md:py-20">
        <div className="container-custom">
          <div className="card mx-auto max-w-3xl p-8 text-center md:p-12">
            <h2 className="mb-4 text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
              Kezdjük el — <span className="text-accent">pár perc az egész.</span>
            </h2>
            <p className="mx-auto mb-8 max-w-xl leading-relaxed text-light-gray">
              Mondja el pár kattintásban, mit tervez. Nem kötelezi semmire, és jellemzően 24 órán
              belül személyesen válaszolunk.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href="#urlap" className="btn-primary w-full sm:w-auto">
                Ajánlatot kérek
              </a>
              <a
                href={CONTACT.phoneHref}
                className="btn-secondary inline-flex w-full items-center justify-center gap-2 sm:w-auto"
              >
                <PhoneCall size={18} />
                {CONTACT.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Rövid lábléc — a landingen nincs oldalmenü */}
      <footer className="border-t border-white/[0.06] bg-primary-deep">
        <div className="container-custom flex flex-col items-center justify-between gap-4 py-8 text-sm text-medium-gray sm:flex-row">
          <p>© {new Date().getFullYear()} AcuWall — Építsünk együtt.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <a href={CONTACT.emailHref} className="transition-colors hover:text-white">
              {CONTACT.email}
            </a>
            <a href={CONTACT.phoneHref} className="transition-colors hover:text-white">
              {CONTACT.phoneDisplay}
            </a>
            <a href="/adatkezeles" className="transition-colors hover:text-white">
              Adatkezelési tájékoztató
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
