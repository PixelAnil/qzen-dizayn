import { absoluteUrl } from "@/lib/seo";
import { services, site } from "@/lib/site";

/** Structured data for search engines; `<` is escaped so the JSON can't close the script tag. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

const BUSINESS_ID = `${absoluteUrl("/")}#isletme`;

/** The studio as a local business: address, contact, area and the services it offers. */
export const businessJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "@id": BUSINESS_ID,
  name: site.name,
  description: site.description,
  url: absoluteUrl("/"),
  logo: absoluteUrl("/brand/qzen-logo.webp"),
  image: absoluteUrl("/brand/og.webp"),
  telephone: site.phone.href.replace("tel:", ""),
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.addressLines[0],
    addressLocality: "Sultanbeyli",
    addressRegion: "İstanbul",
    postalCode: "34935",
    addressCountry: "TR",
  },
  areaServed: { "@type": "City", name: "İstanbul" },
  sameAs: [site.instagram.href],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Hizmetlerimiz",
    itemListElement: services.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.title, url: absoluteUrl(`/hizmetler/${s.slug}`) },
    })),
  },
});

/** One service page: the service itself and the breadcrumb trail to it. */
export const serviceJsonLd = (slug: string, title: string, description: string) => [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: title,
    description,
    url: absoluteUrl(`/hizmetler/${slug}`),
    areaServed: { "@type": "City", name: "İstanbul" },
    provider: { "@id": BUSINESS_ID },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Anasayfa", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Hizmetlerimiz", item: absoluteUrl("/hizmetler") },
      { "@type": "ListItem", position: 3, name: title, item: absoluteUrl(`/hizmetler/${slug}`) },
    ],
  },
];
