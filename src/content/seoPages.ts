/**
 * Kereső-aloldalak tartalma (csak magyarul).
 *
 * Minden oldal egy-egy olyan keresésre készül, amire a főoldal egymagában nem
 * tud megjelenni (pl. „garázs építés Debrecen”, „generálkivitelező
 * Nyíregyháza”). A szövegekben csak olyat állítunk, ami a főoldallal és a
 * valós működéssel egyezik — konkrét árat, darabszámot, határidőt nem.
 */

export const SITE_URL = "https://acuwall.hu";

export type SeoPage = {
  slug: string;
  /** <title> — a „| AcuWall” utótagot a komponens teszi hozzá */
  metaTitle: string;
  metaDescription: string;
  /** Rövid név a belső linkekhez (lábléc, kapcsolódó oldalak) */
  navLabel: string;
  eyebrow: string;
  titleBefore: string;
  titleAccent: string;
  intro: string[];
  image: string;
  imageAlt: string;
  includedTitle: string;
  included: string[];
  pointsTitle: string;
  points: { title: string; text: string }[];
  faq: { question: string; answer: string }[];
  /** Ha a Service strukturált adatban szűkebb területet adunk meg */
  areaServed?: string[];
};

const AREA = ["Hajdú-Bihar vármegye", "Szabolcs-Szatmár-Bereg vármegye"];

const COMMON_FAQ = {
  noPlan: {
    question: "Mi van, ha még nincs tervem?",
    answer:
      "Semmi gond, a legtöbben így érkeznek. Elkészítjük a terveket, a statikai számítást és a 3D látványtervet, Ön pedig a teljes kép ismeretében dönt. Ha már van terve, abból indulunk.",
  },
  payment: {
    question: "Hogyan fizetek?",
    answer:
      "Ütemezetten, a szerződésben rögzített mérföldkövek szerint — mindig csak azért, ami már elkészült.",
  },
  price: {
    question: "Mennyibe kerül?",
    answer:
      "Minden projekt egyedi, ezért a felmérés után pontos, tételes ajánlatot adunk. Amit leírunk, azt építjük meg — utólag nem kerülnek elő új tételek.",
  },
};

export const SEO_PAGES: SeoPage[] = [
  {
    slug: "garazs-tarolo-epites",
    metaTitle: "Garázs és tároló építése kulcsrakészen — Hajdú-Bihar, Szabolcs",
    metaDescription:
      "Garázs, tároló vagy kocsibeálló építése egy kézből: tervezés, engedélyeztetés, alapozás, szerkezet, tető, kapu és villany. Hajdú-Bihar és Szabolcs-Szatmár-Bereg vármegyében.",
    navLabel: "Garázs és tároló építése",
    eyebrow: "Garázs és tároló",
    titleBefore: "Garázs és tároló építése",
    titleAccent: "kulcsrakészen.",
    intro: [
      "Egy garázs vagy tároló a legegyszerűbb épület a telken — mégis itt fordul elő a legtöbbször, hogy az alapot az egyik mester, a szerkezetet a másik, a kaput és a villanyt egy harmadik csinálja, és senki nem felel azért, hogy a végén minden passzoljon.",
      "Az AcuWall a garázst is generálkivitelezésben építi: egy szerződés, egy felelős, tételes ár. Mi tisztázzuk, kell-e hozzá engedély, és a kapu beszereléséig mindent elvégzünk.",
    ],
    image: "/images/epulettipusok/garazs-tarolo.jpg",
    imageAlt: "Antracit garázs szekcionált kapuval",
    includedTitle: "Mit tartalmaz a kivitelezés?",
    included: [
      "Felmérés a telken, igények tisztázása",
      "Tervek és statika, ha szükséges",
      "Engedélyezési út tisztázása a helyi hatósággal",
      "Tereprendezés, alapozás, aljzat",
      "Szerkezet, tetőszerkezet és tetőfedés",
      "Homlokzat, garázskapu és nyílászárók",
      "Elektromos bekötés, világítás, igény szerint kapumozgatás",
      "Átadás-átvételi jegyzőkönyv és írásos garancia",
    ],
    pointsTitle: "Amire nálunk nem kell figyelnie",
    points: [
      {
        title: "Kell-e engedély?",
        text: "Mérettől és településtől függ. Ezt mi nézzük meg a konkrét telekre, és ha kell, az engedélyezést is intézzük.",
      },
      {
        title: "Ki hangolja össze a szakmákat?",
        text: "Mi. Az alapozástól a kapuig egy ütemterv szerint dolgozunk, a szakágak nem várnak egymásra.",
      },
      {
        title: "Mi lesz, ha valami nem stimmel?",
        text: "Egy felelőse van az egésznek. Az átadáskor tételesen végigmegyünk mindenen, a garanciát a szerződés rögzíti.",
      },
    ],
    faq: [
      {
        question: "Kell engedély egy garázshoz?",
        answer:
          "Mérettől és településtől függ. Az engedélyezési utat mi tisztázzuk a helyi hatósággal — Önnek ezzel nem kell foglalkoznia.",
      },
      {
        question: "Meglévő ház mellé is építenek garázst?",
        answer:
          "Igen. A felmérésen megnézzük a telket, a meglévő épületet és a közműveket, és ehhez igazítjuk a tervet.",
      },
      COMMON_FAQ.price,
      COMMON_FAQ.payment,
    ],
  },
  {
    slug: "csarnok-muhely-epites",
    metaTitle: "Csarnok és műhely építése generálkivitelezésben — Debrecen, Nyíregyháza",
    metaDescription:
      "Ipari csarnok, műhely, raktár vagy mezőgazdasági épület kivitelezése egy kézből: tervezés, statika, engedélyezés, szerkezetépítés, gépészet és villany. Hajdú-Bihar és Szabolcs-Szatmár-Bereg.",
    navLabel: "Csarnok és műhely építése",
    eyebrow: "Csarnok és műhely",
    titleBefore: "Csarnok és műhely építése",
    titleAccent: "egy felelőssel.",
    intro: [
      "Egy vállalkozásnál minden hét számít, amíg a csarnok nem áll. Ha a tervező, a statikus, a szerkezetépítő, a villanyszerelő és a gépész külön dolgozik, a csúszás szinte biztos — és mindenki a másikra mutat.",
      "Az AcuWall a nagyberuházásoknál használt LEAN szervezéssel építi a csarnokokat és műhelyeket: részletes ütemterv, összehangolt szakágak, folyamatos ellenőrzés. A határidőt a szerződésben rögzítjük.",
    ],
    image: "/images/epulettipusok/csarnok.jpg",
    imageAlt: "Antracit panelburkolatú csarnok ipari kapuval",
    includedTitle: "Mit tartalmaz a kivitelezés?",
    included: [
      "Igényfelmérés: gyártás, tárolás, gépek, járműforgalom",
      "Építészeti és kiviteli tervek, statikai számítás",
      "Engedélyeztetés és egyeztetés a hatóságokkal",
      "Tereprendezés, alapozás, ipari padló",
      "Tartószerkezet, tetőszerkezet, homlokzat",
      "Ipari kapuk, nyílászárók",
      "Elektromos hálózat, világítás, gépészet",
      "Szociális blokk, iroda igény szerint",
    ],
    pointsTitle: "Miért generálkivitelezésben?",
    points: [
      {
        title: "Kiszámítható határidő",
        text: "Részletes ütemtervvel dolgozunk, a szakágak egymás után, várakozás nélkül érkeznek. A határidő a szerződésben van.",
      },
      {
        title: "Tételes, rögzített ár",
        text: "Pontos tartalomlistát kap. Amit leírunk, azt építjük meg — utólag nem kerülnek elő tételek.",
      },
      {
        title: "Egy kapcsolattartó",
        text: "Nem kell tíz céggel egyeztetnie. Egy felelőse van a projektnek a tervezéstől az átadásig.",
      },
    ],
    faq: [
      {
        question: "Mekkora csarnokot vállalnak?",
        answer:
          "A kis műhelytől a nagyobb ipari csarnokig. A méretet és a szerkezetet a felhasználáshoz tervezzük — írja meg, mire kell, és a felmérésen tisztázzuk.",
      },
      {
        question: "Bővítést, meglévő csarnok átalakítását is vállalják?",
        answer:
          "Igen. A felmérésen megnézzük a meglévő épületet és a statikai adottságokat, és ehhez igazítjuk a tervet.",
      },
      COMMON_FAQ.noPlan,
      COMMON_FAQ.payment,
    ],
  },
  {
    slug: "csaladi-haz-generalkivitelezes",
    metaTitle: "Családi ház és nyaraló generálkivitelezése kulcsrakészen",
    metaDescription:
      "Családi ház vagy nyaraló építése kulcsrakészen, egy szerződésben: tervezés, engedélyezés, alapozás, szerkezet, tető, gépészet, villany és belsőépítészet. Hajdú-Bihar és Szabolcs-Szatmár-Bereg.",
    navLabel: "Családi ház generálkivitelezése",
    eyebrow: "Családi ház és nyaraló",
    titleBefore: "Családi ház építése",
    titleAccent: "kulcsrakészen, egy kézből.",
    intro: [
      "Egy családi ház építése sokaknak élete legnagyobb döntése — és gyakran a legidegőrlőbb is, mert a tervezőt, a kőművest, a villanyszerelőt, a gépészt és a burkolót mind külön kell megtalálni és összehangolni.",
      "Nálunk egy szerződést köt, és egy felelőse van a háznak az első rajztól a kulcsátadásig. Előre, érthetően leírjuk, mit építünk, ütemezetten fizet, és végig látja, hol tart a munka.",
    ],
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Panelburkolatú modern családi ház",
    includedTitle: "Mit tartalmaz a kulcsrakész kivitelezés?",
    included: [
      "Építészeti tervek, statika és 3D látványterv",
      "Engedélyezés vagy egyszerű bejelentés intézése",
      "Alapozás, lábazat, aljzat",
      "Falazat vagy szerkezet, födém, tetőszerkezet",
      "Homlokzat, hőszigetelés, nyílászárók",
      "Víz, csatorna, fűtés, szellőzés",
      "Elektromos hálózat",
      "Belsőépítészet és befejező munkák",
    ],
    pointsTitle: "Amit Ön kap",
    points: [
      {
        title: "Döntés a teljes kép ismeretében",
        text: "A 3D modellen körbejárhatja a házat, mielőtt egy téglát is letennénk. Anyagot és színt előre választ.",
      },
      {
        title: "Kevesebb papírmunka",
        text: "Utánajárunk a hatósági kötelezettségeknek, és elintézzük Ön helyett.",
      },
      {
        title: "Átlátható haladás",
        text: "Fotókkal követheti a munkát, az átadásnál tételesen átnézzük, mi készült el.",
      },
    ],
    faq: [
      {
        question: "Kell építési engedély egy családi házhoz?",
        answer:
          "Kisebb lakóépületnél sokszor egyszerű bejelentés is elég, de ez a telektől és a tervtől függ. A konkrét esetre mi ellenőrizzük, és intézzük a teendőket.",
      },
      {
        question: "Nyaralót is építenek?",
        answer:
          "Igen. A nyaraló ugyanúgy készül, mint egy családi ház: tervezéstől a kulcsátadásig, egy felelőssel.",
      },
      COMMON_FAQ.noPlan,
      COMMON_FAQ.price,
    ],
  },
  {
    slug: "irodahaz-epites",
    metaTitle: "Irodaház és üzlethelyiség építése generálkivitelezésben",
    metaDescription:
      "Irodaház, iroda- vagy szolgáltatóépület kivitelezése egy kézből: tervezés, engedélyezés, szerkezetépítés, homlokzat, gépészet, villany és belsőépítészet. Hajdú-Bihar és Szabolcs-Szatmár-Bereg.",
    navLabel: "Irodaház építése",
    eyebrow: "Irodaház",
    titleBefore: "Irodaház építése",
    titleAccent: "határidőre, egy felelőssel.",
    intro: [
      "Egy új iroda vagy szolgáltatóépület akkor jó befektetés, ha időben elkészül, és az ára sem szalad el. Ehhez az kell, hogy valaki az egészért feleljen — a tervezéstől a belsőépítészetig.",
      "Az AcuWall a teljes kivitelezést vállalja: megtervezzük, engedélyeztetjük és felépítjük, a szakágakat egy ütemterv szerint hangoljuk össze. Önnek egy kapcsolattartója és egy szerződése van.",
    ],
    image: "/images/epulettipusok/irodahaz.jpg",
    imageAlt: "Irodaház panel- és faburkolattal",
    includedTitle: "Mit tartalmaz a kivitelezés?",
    included: [
      "Igényfelmérés: létszám, helyiségek, ügyfélforgalom",
      "Építészeti és kiviteli tervek, statika",
      "Engedélyeztetés",
      "Alapozás, szerkezetépítés, tetőszerkezet",
      "Homlokzat, nyílászárók",
      "Fűtés, hűtés, szellőzés",
      "Elektromos és gyengeáramú hálózat",
      "Belsőépítészet, burkolatok, befejező munkák",
    ],
    pointsTitle: "Miért velünk?",
    points: [
      {
        title: "Nagyberuházási szervezés",
        text: "A nagy projekteken bevált LEAN szemlélettel dolgozunk: kevesebb várakozás, kevesebb hiba.",
      },
      {
        title: "Rögzített tartalom és határidő",
        text: "Tételes ajánlat, ütemezett fizetés, a határidő a szerződésben.",
      },
      {
        title: "Dokumentált átadás",
        text: "Átadás-átvételi jegyzőkönyv, dokumentáció és írásos garancia.",
      },
    ],
    faq: [
      COMMON_FAQ.noPlan,
      COMMON_FAQ.price,
      COMMON_FAQ.payment,
    ],
  },
  {
    slug: "generalkivitelezo-debrecen",
    metaTitle: "Generálkivitelező Debrecen és Hajdú-Bihar",
    metaDescription:
      "Generálkivitelező Debrecenben és Hajdú-Bihar vármegyében: garázs, csarnok, családi ház, iroda kulcsrakészen, egy szerződésben. Ingyenes felmérés, válasz 24 órán belül.",
    navLabel: "Generálkivitelező Debrecen",
    eyebrow: "Debrecen és Hajdú-Bihar",
    titleBefore: "Generálkivitelező Debrecenben",
    titleAccent: "és Hajdú-Bihar vármegyében.",
    intro: [
      "Debrecenben és környékén építünk garázst, csarnokot, családi házat és irodát — tervezéstől a kulcsátadásig, egy szerződésben. Nem kell külön tervezőt, statikust, kőművest, villanyszerelőt és gépészt keresnie és összehangolnia.",
      "Hajdú-Bihar vármegye településein dolgozunk, Debrecen mellett például Hajdúszoboszlón, Hajdúböszörményben, Hajdúnánáson, Balmazújvárosban, Berettyóújfaluban és a környező falvakban is. Ingyenes felméréssel kezdünk a telken.",
    ],
    image: "/images/epulettipusok/irodahaz.jpg",
    imageAlt: "Irodaház panel- és faburkolattal",
    includedTitle: "Mit építünk Debrecenben és környékén?",
    included: [
      "Garázs, tároló, kocsibeálló",
      "Műhely, csarnok, raktár",
      "Családi ház, nyaraló",
      "Irodaház, szolgáltatóépület",
      "Bővítés, átalakítás",
      "Tervezés, statika, 3D látványterv",
      "Engedélyezés intézése",
      "Gépészet, villany, belsőépítészet",
    ],
    pointsTitle: "Miért helyi generálkivitelező?",
    points: [
      {
        title: "Gyors felmérés",
        text: "A közelben dolgozunk, így hamar ki tudunk menni a telekre, és az építkezésen is rendszeresen jelen vagyunk.",
      },
      {
        title: "Egy szerződés, egy felelős",
        text: "A tervezéstől a kulcsátadásig egy partnerrel tárgyal — nem kell több céget összehangolnia.",
      },
      {
        title: "Tételes ár",
        text: "Pontos tartalomlistát kap, utólag nem kerülnek elő tételek.",
      },
    ],
    faq: [
      {
        question: "Debrecen mely részein és környékén vállalnak munkát?",
        answer:
          "Debrecen egész területén és Hajdú-Bihar vármegye településein. Ha nem biztos benne, hogy a telke beleesik, hívjon minket, és megmondjuk.",
      },
      COMMON_FAQ.noPlan,
      COMMON_FAQ.price,
      COMMON_FAQ.payment,
    ],
    areaServed: ["Debrecen", "Hajdú-Bihar vármegye"],
  },
  {
    slug: "generalkivitelezo-nyiregyhaza",
    metaTitle: "Generálkivitelező Nyíregyháza és Szabolcs-Szatmár-Bereg",
    metaDescription:
      "Generálkivitelező Nyíregyházán és Szabolcs-Szatmár-Bereg vármegyében: garázs, csarnok, családi ház, iroda kulcsrakészen, egy szerződésben. Ingyenes felmérés, válasz 24 órán belül.",
    navLabel: "Generálkivitelező Nyíregyháza",
    eyebrow: "Nyíregyháza és Szabolcs",
    titleBefore: "Generálkivitelező Nyíregyházán",
    titleAccent: "és Szabolcs-Szatmár-Bereg vármegyében.",
    intro: [
      "Nyíregyházán és környékén is kulcsrakészen építünk: garázst, műhelyt, csarnokot, családi házat, irodát. Egy szerződést köt, és egy felelőse van az egésznek az első rajztól a kulcsátadásig.",
      "Szabolcs-Szatmár-Bereg vármegye településein dolgozunk, Nyíregyháza mellett például Kisvárdán, Mátészalkán, Nyírbátorban, Tiszavasváriban, Újfehértón és a környező falvakban is. Ingyenes felméréssel kezdünk a telken.",
    ],
    image:
      "https://images.pexels.com/photos/12932834/pexels-photo-12932834.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1000&fit=crop",
    imageAlt: "Modern ház természetközeli telken",
    includedTitle: "Mit építünk Nyíregyházán és környékén?",
    included: [
      "Garázs, tároló, kocsibeálló",
      "Műhely, csarnok, mezőgazdasági épület",
      "Családi ház, nyaraló",
      "Irodaház, szolgáltatóépület",
      "Bővítés, átalakítás",
      "Tervezés, statika, 3D látványterv",
      "Engedélyezés intézése",
      "Gépészet, villany, belsőépítészet",
    ],
    pointsTitle: "Miért helyi generálkivitelező?",
    points: [
      {
        title: "Gyors felmérés",
        text: "A közelben dolgozunk, így hamar ki tudunk menni a telekre, és az építkezésen is rendszeresen jelen vagyunk.",
      },
      {
        title: "Egy szerződés, egy felelős",
        text: "A tervezéstől a kulcsátadásig egy partnerrel tárgyal — nem kell több céget összehangolnia.",
      },
      {
        title: "Ütemezett fizetés",
        text: "A szerződésben rögzített mérföldkövek szerint fizet, mindig csak azért, ami elkészült.",
      },
    ],
    faq: [
      {
        question: "Nyíregyháza környékén mely településeken dolgoznak?",
        answer:
          "Szabolcs-Szatmár-Bereg vármegye településein. Ha nem biztos benne, hogy a telke beleesik, hívjon minket, és megmondjuk.",
      },
      COMMON_FAQ.noPlan,
      COMMON_FAQ.price,
      COMMON_FAQ.payment,
    ],
    areaServed: ["Nyíregyháza", "Szabolcs-Szatmár-Bereg vármegye"],
  },
];

export const DEFAULT_AREA = AREA;

export function getSeoPage(slug: string) {
  return SEO_PAGES.find((page) => page.slug === slug);
}
