import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReferenceDetail from "@/components/references/ReferenceDetail";
import { REFERENCES, getReference } from "@/content/references";

/** Csak a felvett referenciák léteznek, minden más 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return REFERENCES.map((reference) => ({ slug: reference.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const reference = getReference(params.slug);
  if (!reference) return {};

  const title = `${reference.title.hu} — referencia | AcuWall`;
  const description = `${reference.title.hu}: az AcuWall munkája fázisonként, fotókon.`;
  return {
    title,
    description,
    alternates: { canonical: `/referenciak/${reference.slug}` },
    openGraph: {
      title,
      description,
      url: `/referenciak/${reference.slug}`,
      locale: "hu_HU",
      type: "article",
      images: [{ url: reference.cover.src, alt: reference.cover.alt.hu }],
    },
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  if (!getReference(params.slug)) notFound();
  return <ReferenceDetail slug={params.slug} />;
}
