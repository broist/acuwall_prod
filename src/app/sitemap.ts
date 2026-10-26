import type { MetadataRoute } from "next";
import { SEO_PAGES, SITE_URL } from "@/content/seoPages";

/** /sitemap.xml — ezt kell beküldeni a Google Search Console-ba. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, changeFrequency: "monthly", priority: 1 },
    ...SEO_PAGES.map((page) => ({
      url: `${SITE_URL}/${page.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${SITE_URL}/adatkezeles`, changeFrequency: "yearly", priority: 0.2 },
  ];
}
