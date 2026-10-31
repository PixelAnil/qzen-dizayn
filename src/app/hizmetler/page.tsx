import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/layout/PageHeader";
import { ServicesSheet } from "@/components/services/ServicesSheet";
import { Button } from "@/components/ui/Button";
import { asset } from "@/lib/asset";
import { credits } from "@/lib/credits";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Hizmetlerimiz",
  description: "Asma tavan, alçıpan, anahtar teslim ev tadilatı, iç dekorasyon ve mağaza-ofis yenileme. Erzurum.",
};

export default function ServicesPage() {
  const { yakutiye } = credits;

  return (
    <>
      <PageHeader
        title="Tasarımdan teslime"
        intro="Tavanı, duvarı, zemini ve mobilyayı ayrı ustalara dağıtmıyoruz. Keşiften anahtar teslime kadar karşınızda tek bir muhatap olur."
        action={<Button href={site.phone.href}>Keşif için arayın</Button>}
      />

      <figure data-reveal-group className="px-4 pb-32 md:px-8 md:pb-48">
        <Image
          data-reveal
          src={asset(yakutiye.src)}
          alt={yakutiye.alt}
          width={yakutiye.width}
          height={yakutiye.height}
          sizes="100vw"
          preload
          className="aspect-4/3 w-full object-cover md:aspect-21/9"
        />
        <figcaption data-reveal className="mt-3 max-w-[60ch] text-small text-ash">
          {yakutiye.caption}. {yakutiye.credit}
        </figcaption>
      </figure>

      <ServicesSheet headingLevel="h2" />

      {/* Two stills from the studio's own film, at different sizes */}
      <div data-reveal-group className="grid gap-4 px-4 pt-32 md:grid-cols-12 md:items-end md:px-8 md:pt-48">
        <figure data-reveal className="md:col-span-7">
          <Image
            src={asset("/projects/ceiling-detail.webp")}
            alt="Kenarlarında gizli ışık bandı olan kademeli asma tavan"
            width={1080}
            height={720}
            sizes="(min-width: 768px) 58vw, 100vw"
            className="aspect-3/2 w-full object-cover"
          />
          <figcaption className="mt-3 text-small text-ash">Asma tavan ve gizli ışık bandı</figcaption>
        </figure>
        <figure data-reveal className="md:col-span-4 md:col-start-9">
          <Image
            src={asset("/projects/marble-library.webp")}
            alt="Siyah mermer duvar, ahşap çıtalar ve aydınlatmalı kitaplık nişleri"
            width={1080}
            height={1350}
            sizes="(min-width: 768px) 33vw, 100vw"
            className="aspect-4/5 w-full object-cover"
          />
          <figcaption className="mt-3 text-small text-ash">Mermer duvar ve aydınlatmalı nişler</figcaption>
        </figure>
      </div>

      <section data-reveal-group className="flex flex-wrap items-end justify-between gap-8 px-4 py-32 md:px-8 md:py-48">
        <h2 data-reveal className="display max-w-[14ch] text-head text-ivory">
          Keşif için bir telefon yeter
        </h2>
        <div data-reveal className="flex flex-wrap gap-3">
          <Button href={site.phone.href}>Ara: {site.phone.display}</Button>
          <Button href="/projeler" variant="secondary">
            Projeleri incele
          </Button>
        </div>
      </section>
    </>
  );
}
