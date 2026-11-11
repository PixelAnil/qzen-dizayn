import type { MetadataRoute } from "next";
import { asset } from "@/lib/asset";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

// Crawlers only read robots.txt at a domain's root, so this takes effect once the site has its own domain
export default function robots(): MetadataRoute.Robots {
  return {
    // The admin panel stays out of search results (its page also carries noindex)
    rules: { userAgent: "*", allow: "/", disallow: asset("/admin/") },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
