/**
 * Referenciák — projektenként, fázisokra bontva.
 *
 * Új projekt felvétele:
 *  1. a képeket a public/images/referenciak/<slug>/ mappába kell tenni
 *     (fázisonként 1–2 kép, ember nélkül, kb. 1600 px szélesre méretezve),
 *  2. ide fel kell venni egy új elemet a REFERENCES tömbbe.
 * Az oldalon szöveg nélkül, csak a képek jelennek meg, fázisonként egymás után.
 * A sorrend: ELÖL a legfrissebb (kész) állapot, utána a fázisok építési sorrendben.
 */

export type Localized = { hu: string; en: string };

export type ReferenceImage = {
  src: string;
  alt: Localized;
  /** Álló kép (a rácsban magasabb helyet kap) */
  portrait?: boolean;
};

/** Egy építési fázis képei — elöl a legfrissebb állapot, utána építési sorrendben. */
export type ReferencePhase = {
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
  cover: ReferenceImage;
  phases: ReferencePhase[];
};

const garageDir = "/images/referenciak/garazs-csaladi-haz-mellett";
const foundationDir = "/images/referenciak/alapozas-folyamatban";
const extensionDir = "/images/referenciak/hazbovites-alapozas";

export const REFERENCES: Reference[] = [
  {
    slug: "garazs-csaladi-haz-mellett",
    title: {
      hu: "Garázs és tároló családi ház mellé",
      en: "Garage and storage next to a family house",
    },
    type: { hu: "Garázs, tároló", en: "Garage, storage" },
    cover: {
      src: `${garageDir}/03-homlokzat-kesz-1.jpg`,
      alt: {
        hu: "Elkészült, fehérre vakolt nyeregtetős garázs a családi ház mellett",
        en: "Finished white rendered garage with a gable roof next to the family house",
      },
    },
    phases: [
      {
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
        images: [
          {
            src: `${garageDir}/05-parazaro-1.jpg`,
            alt: { hu: "Párazáró fóliával borított garázsbelső", en: "Garage interior covered with vapour barrier foil" },
            portrait: true,
          },
        ],
      },
      {
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
  {
    slug: "alapozas-folyamatban",
    title: {
      hu: "Új épület alapozása",
      en: "Foundation for a new building",
    },
    type: { hu: "Folyamatban", en: "In progress" },
    cover: {
      src: `${foundationDir}/01-alaplemez-1.jpg`,
      alt: {
        hu: "Frissen kibetonozott vasbeton alaplemez a kertben",
        en: "Freshly poured reinforced concrete slab in the garden",
      },
    },
    phases: [
      {
        images: [
          {
            src: `${foundationDir}/01-alaplemez-1.jpg`,
            alt: {
              hu: "Kibetonozott alaplemez zsaluzattal és kiálló betonacélokkal",
              en: "Poured slab with formwork and protruding rebar",
            },
          },
          {
            src: `${foundationDir}/01-alaplemez-2.jpg`,
            alt: { hu: "Az alaplemez közelről", en: "The slab up close" },
            portrait: true,
          },
        ],
      },
      {
        images: [
          {
            src: `${foundationDir}/02-foldmunka-1.jpg`,
            alt: {
              hu: "Földkiemelés és talajtömörítés az alaplemez helyén",
              en: "Excavation and soil compaction where the slab will go",
            },
          },
        ],
      },
      {
        images: [
          {
            src: `${foundationDir}/03-agyazat-1.jpg`,
            alt: { hu: "Elterített, tömörített ágyazat", en: "Spread and compacted sub-base" },
          },
        ],
      },
    ],
  },
  {
    slug: "hazbovites-alapozas",
    title: {
      hu: "Családi ház bővítése",
      en: "Family house extension",
    },
    type: { hu: "Folyamatban", en: "In progress" },
    cover: {
      src: `${extensionDir}/01-vasalas-1.jpg`,
      alt: {
        hu: "Betonozásra kész alaplemez-vasalás a meglévő ház mellett",
        en: "Slab reinforcement ready for pouring next to the existing house",
      },
    },
    phases: [
      {
        images: [
          {
            src: `${extensionDir}/01-vasalas-1.jpg`,
            alt: {
              hu: "Betonozásra kész alaplemez-vasalás a meglévő ház mellett",
              en: "Slab reinforcement ready for pouring next to the existing house",
            },
          },
        ],
      },
      {
        images: [
          {
            src: `${extensionDir}/02-savalap-1.jpg`,
            alt: { hu: "Kibetonozott sávalap az alapárokban", en: "Strip footing poured in the trench" },
            portrait: true,
          },
          {
            src: `${extensionDir}/02-savalap-2.jpg`,
            alt: {
              hu: "Sávalap kiálló betonacélokkal a ház mellett",
              en: "Strip footing with starter bars next to the house",
            },
            portrait: true,
          },
        ],
      },
      {
        images: [
          {
            src: `${extensionDir}/03-labazat-1.jpg`,
            alt: {
              hu: "Lábazati fal és tömörített feltöltés a bővítés helyén",
              en: "Plinth wall and compacted fill where the extension will stand",
            },
          },
        ],
      },
    ],
  },
];

export function getReference(slug: string) {
  return REFERENCES.find((reference) => reference.slug === slug);
}
