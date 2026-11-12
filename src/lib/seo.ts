import type { Metadata } from "next";
import { asset } from "@/lib/asset";

// Search titles (≤ 60 characters) and descriptions (≤ 155) for every page, written around the
// keyword clusters the client chose: turnkey renovation and interior architecture, ceilings and
// walls, wet areas and joinery, repairs. Each keyword has one home page so pages don't compete.
// Each service's own title and description are in its file (src/content/hizmetler), edited in the panel.

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

/** Absolute URL on the deployed site (domain + base path). Pages get the trailing slash the export uses. */
export const absoluteUrl = (path: string) =>
  `${SITE_URL}${asset(/\.\w+$/.test(path) || path.endsWith("/") ? path : `${path}/`)}`;

type PageSeo = { title: string; description: string };

export const pageSeo = {
  home: {
    title: "Anahtar Teslim Tadilat ve İç Mimarlık İstanbul | QZEN DİZAYN",
    description:
      "İstanbul'da anahtar teslim tadilat, iç mimari tasarım, asma ve gergi tavan, banyo-mutfak yenileme ve PVC panel kaplama. 15 yıllık tecrübe, ücretsiz keşif.",
  },
  services: {
    title: "Tadilat ve Dekorasyon Hizmetleri İstanbul | QZEN DİZAYN",
    description:
      "Komple tadilat, alçıpan tavan sistemleri, gergi tavan, lambiri, TV ünitesi, banyo tadilatı ve PVC panel kaplama. İstanbul genelinde ücretsiz keşif.",
  },
  projects: {
    title: "Tamamlanan Tadilat ve Dekorasyon Projeleri | QZEN DİZAYN",
    description:
      "QZEN DİZAYN'ın İstanbul'da tamamladığı asma tavan, duvar ve iç dekorasyon projeleri. Kaliteli işçiliğin sonuçlarını yakından görün.",
  },
} satisfies Record<string, PageSeo>;

/** Title, description, canonical URL and social preview for one page. */
export function seoMetadata({ title, description }: PageSeo, path: string): Metadata {
  const url = absoluteUrl(path);
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url },
  };
}
