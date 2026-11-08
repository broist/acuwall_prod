"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, X } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { getReference, type ReferenceImage } from "@/content/references";

/**
 * Egy referencia-projekt oldala: cím, majd a képek szöveg nélkül, fázisonként
 * egymás után — elöl a kész állapot, utána építési sorrendben. A képekre
 * kattintva nagyban is megnézhetők.
 */
export default function ReferenceDetail({ slug }: { slug: string }) {
  const { t, locale } = useLanguage();
  const reference = getReference(slug);
  const [open, setOpen] = useState<ReferenceImage | null>(null);

  const close = useCallback(() => setOpen(null), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close]);

  if (!reference) return null;

  // Elöl a legfrissebb (kész) állapot, utána a fázisok építési sorrendben.
  const images = reference.phases.flatMap((phase) => phase.images);

  return (
    <>
      <section className="pb-24 pt-32 md:pb-32 md:pt-40">
        <div className="container-custom">
          <Link
            href="/referenciak"
            className="mb-8 inline-flex items-center gap-2 text-sm text-light-gray transition-colors hover:text-white"
          >
            <ArrowLeft size={16} />
            {t.references.back}
          </Link>

          <h1 className="mb-10 text-[34px] font-bold leading-[1.05] tracking-[-0.03em] md:mb-12 md:text-[52px]">
            {reference.title[locale]}
          </h1>

          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {images.map((image) => (
              <li key={image.src}>
                <button
                  type="button"
                  onClick={() => setOpen(image)}
                  className="group relative block aspect-[4/3] w-full overflow-hidden rounded-[20px] border border-white/[0.07]"
                >
                  <Image
                    src={image.src}
                    alt={image.alt[locale]}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </button>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Nagyított kép */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={open.alt[locale]}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-primary-deep/95 p-4 backdrop-blur-sm"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label={t.references.close}
            className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <X size={22} />
          </button>
          <div className="relative h-full max-h-[88vh] w-full max-w-6xl">
            <Image src={open.src} alt={open.alt[locale]} fill className="object-contain" sizes="100vw" />
          </div>
        </div>
      )}
    </>
  );
}
