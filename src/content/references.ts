/**
 * Referenciák — projektenként, fázisokra bontva.
 *
 * Új projekt felvétele:
 *  1. a képeket a public/images/referenciak/<slug>/ mappába kell tenni
 *     (fázisonként 1–2 kép, ember nélkül, kb. 1600 px szélesre méretezve),
 *  2. ide fel kell venni egy új elemet a REFERENCES tömbbe.
 * A fázisok a megadott sorrendben, egymás után jelennek meg.
 */

export type Localized = { hu: string; en: string };

export type ReferenceImage = {
  src: string;
  alt: Localized;
  /** Álló kép (a rácsban magasabb helyet kap) */
  portrait?: boolean;
};

export type ReferencePhase = {
  title: Localized;
  description: Localized;
  images: ReferenceImage[];
};

export type Reference = {
  slug: string;
  title: Localized;
  /** Épülettípus / rövid jellemzés a kártyán */
  type: Localized;
  /** Település — csak ha megadták */
  location?: string;
  /** Év — csak ha megadták */
  year?: string;
  summary: Localized;
  cover: ReferenceImage;
  highlights: Localized[];
  phases: ReferencePhase[];
};

const garageDir = "/images/referenciak/garazs-csaladi-haz-mellett";

export const REFERENCES: Reference[] = [
  {
    slug: "garazs-csaladi-haz-mellett",
    title: {
      hu: "Garázs és tároló családi ház mellé",
      en: "Garage and storage next to a family house",
    },
    type: { hu: "Garázs, tároló", en: "Garage, storage" },
    summary: {
      hu: "Fa vázszerkezetű garázs és tároló a meglévő családi ház mellé, a ház tetőzetéhez és fedett teraszához illesztve. Kívül hőszigetelt, vakolt homlokzat, belül ásványgyapot hőszigetelés, párazáró réteg és gipszkarton burkolat, szekcionált, motoros garázskapuval.",
      en: "Timber-frame garage and storage room built next to an existing family house, matched to the house's roof and covered terrace. Insulated, rendered façade outside; mineral wool insulation, vapour barrier and plasterboard inside, with a motorised sectional garage door.",
    },
    cover: {
      src: `${garageDir}/03-homlokzat-kesz-1.jpg`,
      alt: {
        hu: "Elkészült, fehérre vakolt nyeregtetős garázs a családi ház mellett",
        en: "Finished white rendered garage with a gable roof next to the family house",
      },
    },
    highlights: [
      { hu: "Fa vázszerkezet", en: "Timber frame" },
      { hu: "Homlokzati hőszigetelés és vakolat", en: "External insulation and render" },
      { hu: "Ásványgyapot, párazáró, gipszkarton", en: "Mineral wool, vapour barrier, plasterboard" },
      { hu: "Motoros szekcionált kapu", en: "Motorised sectional door" },
    ],
    phases: [
      {
        title: { hu: "Homlokzati hőszigetelés", en: "External insulation" },
        description: {
          hu: "A vázszerkezetre kívülről hőszigetelő lapok kerülnek, dübelekkel rögzítve. A lábazatra vízálló lábazati hőszigetelés készül.",
          en: "Insulation boards are fixed to the outside of the frame with anchors. The plinth gets water-resistant plinth insulation.",
        },
        images: [
          {
            src: `${garageDir}/01-hoszigeteles-1.jpg`,
            alt: { hu: "Hőszigetelő lapokkal borított garázshomlokzat", en: "Garage façade covered with insulation boards" },
          },
          {
            src: `${garageDir}/01-hoszigeteles-2.jpg`,
            alt: { hu: "Hőszigetelés a fedett terasz felőli oldalon", en: "Insulation on the side facing the covered terrace" },
          },
        ],
      },
      {
        title: { hu: "Hálózás és ragasztás", en: "Mesh and base coat" },
        description: {
          hu: "Üvegszövet háló kerül ágyazóragasztóba, a nyílászárók körül és az éleken külön megerősítéssel. Ez adja a vakolat alá az egyenletes, repedésmentes felületet.",
          en: "Glass-fibre mesh is embedded in base coat adhesive, with extra reinforcement around openings and on the edges — giving an even, crack-free surface for the render.",
        },
        images: [
          {
            src: `${garageDir}/02-halozas-1.jpg`,
            alt: { hu: "Hálózott, ragasztóval bevont oldalfal ajtóval", en: "Meshed side wall with base coat and a door" },
          },
          {
            src: `${garageDir}/02-halozas-2.jpg`,
            alt: { hu: "Élvédő és hálózás a bejárati ajtó körül", en: "Corner beads and mesh around the entrance door" },
            portrait: true,
          },
        ],
      },
      {
        title: { hu: "Kész homlokzat", en: "Finished façade" },
        description: {
          hu: "Vékonyvakolattal készül el a homlokzat, a ház színéhez igazítva. A tető a ház tetőzetéhez illeszkedik, a fedett terasz felőli oldal is egységes felületet kap.",
          en: "The façade is finished with thin-coat render matched to the house. The roof ties into the house's roof, and the terrace side gets the same finish.",
        },
        images: [
          {
            src: `${garageDir}/03-homlokzat-kesz-1.jpg`,
            alt: { hu: "Elkészült, vakolt garázs a ház mellett", en: "Finished rendered garage next to the house" },
          },
          {
            src: `${garageDir}/03-homlokzat-kesz-2.jpg`,
            alt: { hu: "Vakolt fal a fedett terasz alatt", en: "Rendered wall under the covered terrace" },
          },
        ],
      },
      {
        title: { hu: "Belső hőszigetelés", en: "Internal insulation" },
        description: {
          hu: "A vázszerkezet közeibe ásványgyapot hőszigetelés kerül. A szekcionált garázskapu és a kapumozgató már a helyén van, a villanyszerelés kiállásai elkészültek.",
          en: "Mineral wool insulation goes between the frame members. The sectional garage door and its opener are already installed, and the electrical outlets are prepared.",
        },
        images: [
          {
            src: `${garageDir}/04-belso-szigeteles-1.jpg`,
            alt: { hu: "Ásványgyapot a fa vázszerkezetben, tetőszerkezettel", en: "Mineral wool in the timber frame, with the roof structure" },
          },
          {
            src: `${garageDir}/04-belso-szigeteles-2.jpg`,
            alt: { hu: "Hőszigetelt falak és beépített szekcionált kapu", en: "Insulated walls and the installed sectional door" },
          },
        ],
      },
      {
        title: { hu: "Párazáró réteg", en: "Vapour barrier" },
        description: {
          hu: "Párazáró fólia védi a hőszigetelést a belső pára ellen, a falakon és a mennyezeten is, gondosan átlapolva és ragasztva.",
          en: "A vapour barrier protects the insulation from indoor moisture on the walls and ceiling, carefully overlapped and taped.",
        },
        images: [
          {
            src: `${garageDir}/05-parazaro-1.jpg`,
            alt: { hu: "Párazáró fóliával borított garázsbelső", en: "Garage interior covered with vapour barrier foil" },
            portrait: true,
          },
        ],
      },
      {
        title: { hu: "Belső burkolat", en: "Interior lining" },
        description: {
          hu: "Gipszkarton burkolat kerül a falakra, előkészítve a glettelésre és a festésre.",
          en: "Plasterboard lining goes onto the walls, ready for filling and painting.",
        },
        images: [
          {
            src: `${garageDir}/06-gipszkarton-1.jpg`,
            alt: { hu: "Gipszkarton burkolat a garázs falán", en: "Plasterboard lining on the garage wall" },
            portrait: true,
          },
        ],
      },
    ],
  },
];

export function getReference(slug: string) {
  return REFERENCES.find((reference) => reference.slug === slug);
}
