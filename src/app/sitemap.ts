import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
import { policyLinks, services } from "@/lib/site";

export const dynamic = "force-static";

/** Every page, so search engines find all the service pages without crawling the menus. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl("/"), changeFrequency: "monthly", priority: 1 },
    { url: absoluteUrl("/hizmetler"), changeFrequency: "monthly", priority: 0.9 },
    ...services.map((s) => ({ url: absoluteUrl(`/hizmetler/${s.slug}`), changeFrequency: "monthly" as const, priority: 0.8 })),
    { url: absoluteUrl("/projeler"), changeFrequency: "monthly", priority: 0.7 },
    ...policyLinks.map((l) => ({ url: absoluteUrl(l.href), changeFrequency: "yearly" as const, priority: 0.2 })),
  ];
}
