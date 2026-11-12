import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button, buttonClass } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { asset } from "@/lib/asset";
import { projects, readServiceContent, services, type Block, type Inline, type Service } from "@/lib/content";
import { projectAlt } from "@/lib/projects";
import { site, whatsappHref } from "@/lib/site";
import { seoMetadata } from "@/lib/seo";
import { JsonLd, serviceJsonLd } from "@/components/seo/JsonLd";
import { ServiceVideo } from "@/components/services/ServiceVideo";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

const findService = (slug: string) => services.find((s) => s.slug === slug);

// Search title and description come from the panel; a service added without them gets these
const seoFor = (service: Service) =>
  service.seo ?? {
    title: `${service.title} İstanbul | QZEN DİZAYN`,
    description: `${service.title}: ${service.tagline}. İstanbul'da usta işçilik ve ücretsiz keşif.`,
  };

export async function generateMetadata({ params }: PageProps<"/hizmetler/[slug]">): Promise<Metadata> {
  const service = findService((await params).slug);
  return service ? seoMetadata(seoFor(service), `/hizmetler/${service.slug}`) : {};
}

function Text({ parts }: { parts: Inline }) {
  return parts.map((part, i) => (part.bold ? <strong key={i} className="font-medium text-ivory">{part.text}</strong> : part.text));
}

function ContentBlock({ block }: { block: Block }) {
  switch (block.type) {
    case "h2":
      return <h2 className="display pt-14 text-[clamp(2rem,1.2rem+2.6vw,3.5rem)] leading-[0.92] text-ivory first:pt-0">{block.text}</h2>;
    case "h3":
      return <h3 className="pt-6 text-lead font-medium text-gold">{block.text}</h3>;
    case "ul":
      return (
        <ul className="space-y-3">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-4">
              <span aria-hidden className="mt-[0.6em] h-1.5 w-1.5 shrink-0 bg-gold" />
              <span>
                {item.label && <strong className="font-medium text-ivory">{item.label}: </strong>}
                <Text parts={item.text} />
              </span>
            </li>
          ))}
        </ul>
      );
    default:
      return (
        <p>
          <Text parts={block.text} />
        </p>
      );
  }
}

export default async function ServiceDetailPage({ params }: PageProps<"/hizmetler/[slug]">) {
  const { slug } = await params;
  const service = findService(slug);
  if (!service) notFound();

  // The opening paragraph sits in the header; a text that starts with a heading keeps it below
  const content = readServiceContent(slug);
  const intro = content[0]?.type === "p" ? content[0] : undefined;
  const blocks = intro ? content.slice(1) : content;
  const others = services.filter((s) => s.slug !== slug);
  const whatsapp = whatsappHref(`Merhaba, ${service.title} için ücretsiz keşif ve fiyat teklifi almak istiyorum.`);

  const seo = seoFor(service);

  return (
    <article>
      <JsonLd data={serviceJsonLd(service.slug, service.title, seo.description)} />
      <header data-reveal-group className="grid gap-10 px-4 pb-20 pt-32 md:grid-cols-12 md:gap-x-4 md:px-8 md:pb-28 md:pt-44">
        <div className="md:col-span-8 md:self-end">
          <h1
            data-reveal
            className={`display leading-[0.92] text-ivory ${
              service.title.length > 30 ? "text-[clamp(1.875rem,0.9rem+3.6vw,4.75rem)]" : "text-[clamp(2.75rem,1.2rem+5vw,6.5rem)]"
            }`}
          >
            {service.title}
          </h1>
          <p data-reveal className="mt-6 text-lead text-gold">{service.tagline}</p>
          {intro && (
            <p data-reveal className="mt-8 max-w-[52ch] text-lead text-ivory">
              <Text parts={intro.text} />
            </p>
          )}
          <div data-reveal className="mt-10 flex flex-wrap gap-3">
            <Button href={site.phone.href}>Ücretsiz keşif için arayın</Button>
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" className={buttonClass("secondary")}>
              <WhatsAppIcon className="h-5 w-5" />
              WhatsApp&apos;tan yazın
            </a>
          </div>
        </div>

        <figure data-reveal className="md:col-span-4 md:col-start-9">
          {service.video ? (
            <ServiceVideo src={service.video.src} start={service.video.start} end={service.video.end.src} title={service.title} />
          ) : service.image ? (
            <Image
              src={asset(service.image.src)}
              alt={service.image.alt}
              width={service.image.width}
              height={service.image.height}
              sizes="(min-width: 768px) 33vw, 100vw"
              preload
              className="aspect-3/4 w-full object-cover"
            />
          ) : (
            // No photograph yet: the brand mark holds the frame until the service's film arrives
            <div className="flex aspect-3/4 w-full items-center justify-center bg-graphite">
              <Image src={asset("/brand/qzen-mark.webp")} alt="" width={200} height={162} className="w-1/3 opacity-70" />
            </div>
          )}
        </figure>
      </header>

      <div className="grid gap-16 px-4 pb-32 md:grid-cols-12 md:gap-x-4 md:px-8 md:pb-48">
        <div className="max-w-[66ch] space-y-5 text-body text-ivory/85 md:col-span-8">
          {blocks.map((block, i) => (
            <ContentBlock key={i} block={block} />
          ))}
        </div>

        <aside className="md:col-span-3 md:col-start-10">
          <div className="bg-graphite p-6 md:sticky md:top-28">
            <h2 className="text-lead font-medium text-ivory">Ücretsiz keşif</h2>
            <p className="mt-3 text-body text-ash">Yerinde ölçü ve size özel teklif için arayın ya da yazın.</p>
            <a
              href={site.phone.href}
              className={buttonClass("primary", "mt-6 w-full")}
            >
              {site.phone.display}
            </a>
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" className={buttonClass("secondary", "mt-3 w-full")}>
              <WhatsAppIcon className="h-5 w-5" />
              WhatsApp&apos;tan yazın
            </a>
            <p className="mt-3 text-small text-ash">Mesajınız bu hizmet için hazır yazılmış olarak açılır.</p>

            <h2 className="mt-10 text-small text-ash">Diğer hizmetler</h2>
            <ul className="mt-3 space-y-2 text-body">
              {others.map((s) => (
                <li key={s.slug}>
                  <Link href={`/hizmetler/${s.slug}`} className="text-ivory transition-colors hover:text-gold-light">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/hizmetler" className="mt-6 inline-block text-small text-ash transition-colors hover:text-gold-light">
              Tüm hizmetler &rarr;
            </Link>
          </div>
        </aside>
      </div>

      {/* Finished work, so the page ends on real results */}
      <section aria-labelledby="isler-baslik" data-reveal-group className="px-4 pb-32 md:px-8 md:pb-48">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 id="isler-baslik" data-reveal className="display text-head text-ivory">
            İşlerimizden
          </h2>
          <Button data-reveal href="/projeler" variant="secondary">
            Tüm projeler
          </Button>
        </div>
        <div className="mt-10 grid gap-2 sm:grid-cols-3">
          {projects.slice(0, 3).map((project) => (
            <Link key={project.slug} href="/projeler" data-reveal className="group relative block aspect-4/5 overflow-hidden bg-graphite-soft">
              <Image
                src={asset(project.image)}
                alt={projectAlt}
                fill
                sizes="(min-width: 640px) 33vw, 100vw"
                className="object-cover transition-transform duration-[1200ms] ease-luxe group-hover:scale-[1.04]"
              />
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
