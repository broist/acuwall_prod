import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, ChevronDown, Phone } from "lucide-react";
import { SEO_PAGES, SITE_URL, DEFAULT_AREA, getSeoPage } from "@/content/seoPages";

/**
 * Kereső-aloldalak (szolgáltatás- és városoldalak). Szerveren, előre
 * legenerálva készülnek, így a Google a teljes szöveget azonnal látja.
 * Csak a felsorolt slugok léteznek, minden más 404.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return SEO_PAGES.map((page) => ({ slug: page.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const page = getSeoPage(params.slug);
  if (!page) return {};

  const title = `${page.metaTitle} | AcuWall`;
  return {
    title,
    description: page.metaDescription,
    alternates: { canonical: `/${page.slug}` },
    openGraph: {
      title,
      description: page.metaDescription,
      url: `/${page.slug}`,
      locale: "hu_HU",
      type: "website",
      images: [{ url: page.image.startsWith("/") ? page.image : "/images/epulettipusok/irodahaz.jpg" }],
    },
  };
}

export default function SeoLandingPage({ params }: { params: { slug: string } }) {
  const page = getSeoPage(params.slug);
  if (!page) notFound();

  const pageUrl = `${SITE_URL}/${page.slug}`;
  const related = SEO_PAGES.filter((item) => item.slug !== page.slug);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: page.navLabel,
      description: page.metaDescription,
      url: pageUrl,
      serviceType: "Generálkivitelezés",
      provider: { "@id": `${SITE_URL}/#ceg` },
      areaServed: (page.areaServed ?? DEFAULT_AREA).map((name) => ({
        "@type": "AdministrativeArea",
        name,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Főoldal", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: page.navLabel, item: pageUrl },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        // A tartalom a saját, statikus szövegeinkből épül — nincs benne felhasználói bemenet.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Nyitókép */}
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0">
          <Image
            src={page.image}
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-primary/85" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/80 to-primary" />
        </div>
        <div className="absolute inset-0 grid-pattern opacity-20" />

        <div className="relative container-custom">
          <nav aria-label="Morzsamenü" className="mb-8 text-sm text-light-gray">
            <Link href="/" className="hover:text-white transition-colors">
              Főoldal
            </Link>
            <span className="mx-2 text-medium-gray">/</span>
            <span className="text-white/80">{page.navLabel}</span>
          </nav>

          <span className="eyebrow mb-6">{page.eyebrow}</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.08] tracking-tight mb-8 max-w-4xl">
            {page.titleBefore} <span className="text-accent">{page.titleAccent}</span>
          </h1>
          <div className="space-y-5 text-light-gray text-base md:text-lg leading-relaxed max-w-3xl mb-10">
            {page.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/#ajanlatkeres"
              className="btn-primary inline-flex items-center justify-center gap-2 group"
            >
              Ingyenes felmérést kérek
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="tel:+36308305556"
              className="btn-secondary inline-flex items-center justify-center gap-2.5"
            >
              <Phone size={18} />
              +36 30 830 5556
            </a>
          </div>
        </div>
      </section>

      {/* Tartalom + előnyök */}
      <section className="section-spacing">
        <div className="container-custom grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight tracking-tight mb-8">
              {page.includedTitle}
            </h2>
            <ul className="space-y-4">
              {page.included.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                    <Check size={14} strokeWidth={3} />
                  </span>
                  <span className="text-white/90 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight tracking-tight mb-8">
              {page.pointsTitle}
            </h2>
            <div className="space-y-4">
              {page.points.map((point) => (
                <div key={point.title} className="card p-6">
                  <h3 className="text-white text-lg font-bold mb-2">{point.title}</h3>
                  <p className="text-light-gray leading-relaxed">{point.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Folyamat röviden */}
      <section className="pb-20 md:pb-28">
        <div className="container-custom">
          <div className="card p-8 md:p-10">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-8">
              Így dolgozunk — <span className="text-accent">lépésről lépésre</span>
            </h2>
            <ol className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                ["Beszélgetünk", "Elmondja, mit, mekkorát, hová. Nem kötelez semmire."],
                ["Tervek és tartalom", "Tervek, statika, 3D modell — vagy a meglévő tervéből indulunk."],
                ["Ajánlat és szerződés", "Tételes tartalom, ütemezett fizetés, határidő írásban."],
                ["Megépítjük", "Ön közben végig követi a haladást."],
                ["Átadjuk a kulcsot", "Közös bejárás, jegyzőkönyv, garancia."],
              ].map(([title, text], index) => (
                <li key={title}>
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-accent text-white font-bold mb-4">
                    {index + 1}
                  </span>
                  <h3 className="text-white font-bold mb-1">{title}</h3>
                  <p className="text-light-gray text-sm leading-relaxed">{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* GYIK */}
      <section className="pb-20 md:pb-28">
        <div className="container-custom max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8 text-center">
            Gyakori <span className="text-accent">kérdések</span>
          </h2>
          <div className="space-y-3">
            {page.faq.map((item) => (
              <details key={item.question} className="group card px-6 py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-white [&::-webkit-details-marker]:hidden">
                  {item.question}
                  <ChevronDown
                    size={20}
                    className="flex-shrink-0 text-accent transition-transform group-open:rotate-180"
                  />
                </summary>
                <p className="mt-4 text-light-gray leading-relaxed">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Kapcsolódó oldalak */}
      <section className="pb-20 md:pb-28">
        <div className="container-custom">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">Ezek is érdekelhetik</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/${item.slug}`}
                className="card card-hover flex items-center justify-between gap-4 p-5 group"
              >
                <span className="text-white font-semibold">{item.navLabel}</span>
                <ArrowRight
                  size={18}
                  className="flex-shrink-0 text-accent group-hover:translate-x-1 transition-transform"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Záró felhívás */}
      <section className="pb-24 md:pb-32">
        <div className="container-custom">
          <div className="relative overflow-hidden rounded-3xl border border-accent/30 bg-accent/10 p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Kezdjük egy <span className="text-accent">ingyenes felméréssel.</span>
            </h2>
            <p className="text-light-gray text-base md:text-lg max-w-2xl mx-auto mb-8">
              Mondja el pár szóban, mit tervez — jellemzően 24 órán belül személyesen jelentkezünk.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/#ajanlatkeres"
                className="btn-primary inline-flex items-center justify-center gap-2 group"
              >
                Ajánlatot kérek
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="tel:+36308305556"
                className="btn-secondary inline-flex items-center justify-center gap-2.5"
              >
                <Phone size={18} />
                +36 30 830 5556
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
