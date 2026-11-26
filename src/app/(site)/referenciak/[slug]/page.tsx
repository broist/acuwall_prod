import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReferenceDetail from "@/components/references/ReferenceDetail";
import { REFERENCES, getReference } from "@/content/references";

/** Csak a felvett referenciák léteznek, minden más 404. */
export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return REFERENCES.map((reference) => ({ slug: reference.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const reference = getReference(slug);
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

export default async function Page({ params }: Props) {
  const { slug } = await params;
  if (!getReference(slug)) notFound();
  return <ReferenceDetail slug={slug} />;
}
