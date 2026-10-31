import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button, buttonClass } from "@/components/ui/Button";
import { asset } from "@/lib/asset";
import { readServiceContent, type Block } from "@/lib/content";
import { projects } from "@/lib/projects";
import { services, site } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

const findService = (slug: string) => services.find((s) => s.slug === slug);

export async function generateMetadata({ params }: PageProps<"/hizmetler/[slug]">): Promise<Metadata> {
  const service = findService((await params).slug);
  return service ? { title: service.title, description: `${service.title} – ${service.tagline}. QZEN DİZAYN, İstanbul.` } : {};
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
          {block.items.map((item) => (
            <li key={item.label ?? item.text} className="flex gap-4">
              <span aria-hidden className="mt-[0.6em] h-1.5 w-1.5 shrink-0 bg-gold" />
              <span>
                {item.label && <strong className="font-medium text-ivory">{item.label}: </strong>}
                {item.text}
              </span>
            </li>
          ))}
        </ul>
      );
    default:
      return <p>{block.text}</p>;
  }
}

export default async function ServiceDetailPage({ params }: PageProps<"/hizmetler/[slug]">) {
  const { slug } = await params;
  const service = findService(slug);
  if (!service) notFound();

  const [intro, ...blocks] = readServiceContent(slug);
  const others = services.filter((s) => s.slug !== slug);

  return (
    <article>
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
          {intro?.type === "p" && (
            <p data-reveal className="mt-8 max-w-[52ch] text-lead text-ivory">
              {intro.text}
            </p>
          )}
          <div data-reveal className="mt-10">
            <Button href={site.phone.href}>Ücretsiz keşif için arayın</Button>
          </div>
        </div>

        <figure data-reveal className="md:col-span-4 md:col-start-9">
          <Image
            src={asset(service.image.src)}
            alt={service.image.alt}
            width={service.image.width}
            height={service.image.height}
            sizes="(min-width: 768px) 33vw, 100vw"
            preload
            className="aspect-3/4 w-full object-cover"
          />
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
            <p className="mt-3 text-body text-ash">Yerinde ölçü ve size özel teklif için bizi arayın.</p>
            <a
              href={site.phone.href}
              className={buttonClass("primary", "mt-6 w-full")}
            >
              {site.phone.display}
            </a>

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
                alt={`${project.title}, ${project.category}`}
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
