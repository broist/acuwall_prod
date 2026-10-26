import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/seoPages";

/**
 * /robots.txt — a Cloudflare a saját szabályait ez elé fűzi.
 * Az /api útvonalakat nem kell bejárni; a hirdetési landing noindex.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/"] },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
