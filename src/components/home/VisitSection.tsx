import Image from "next/image";
import { asset } from "@/lib/asset";
import { credits } from "@/lib/credits";
import { mapsHref, site } from "@/lib/site";

const rows = [
  { label: "Telefon", value: site.phone.display, href: site.phone.href },
  { label: "E-posta", value: site.email, href: `mailto:${site.email}` },
  { label: "Instagram", value: site.instagram.handle, href: site.instagram.href },
];

/** A visit card on a photograph of the city: the street address, how to reach us, directions. */
export function VisitSection() {
  const { cifteMinareli } = credits;

  return (
    <section id="iletisim" aria-label="İletişim" data-reveal-group className="relative scroll-mt-16 bg-obsidian">
      <div className="relative h-[70svh] md:h-svh">
        <Image
          src={asset(cifteMinareli.src)}
          alt={cifteMinareli.alt}
          fill
          sizes="100vw"
          className="object-cover object-[50%_70%]"
        />
        <p className="absolute bottom-4 left-4 bg-obsidian/70 px-3 py-1.5 text-small text-ivory md:left-8">
          {cifteMinareli.caption}, Erzurum. {cifteMinareli.credit}
        </p>
      </div>

      <div
        data-reveal
        className="relative z-10 mx-4 -mt-20 bg-paper p-8 text-ink-dark md:absolute md:right-16 md:top-16 md:mx-0 md:mt-0 md:w-[25rem]"
      >
        <h2 className="display text-[clamp(2.25rem,1.6rem+2vw,3.25rem)] leading-[0.9]">Atölyeye uğrayın</h2>
        <address className="mt-5 text-body not-italic">
          {site.addressLines[0]}
          <br />
          {site.addressLines[1]}
        </address>

        <dl className="mt-6 space-y-2">
          {rows.map((row) => (
            <div key={row.label} className="flex items-baseline justify-between gap-4">
              <dt className="text-small text-ink-soft">{row.label}</dt>
              <dd className="text-body">
                <a
                  href={row.href}
                  {...(row.href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
                  className="transition-colors hover:text-ink-soft"
                >
                  {row.value}
                </a>
              </dd>
            </div>
          ))}
        </dl>

        <a
          href={mapsHref}
          target="_blank"
          rel="noopener noreferrer"
          className="-mx-8 -mb-8 mt-8 flex min-h-14 items-center justify-center bg-obsidian text-body font-medium text-gold transition-colors hover:bg-graphite-soft hover:text-gold-light"
        >
          Yol tarifi al
        </a>
      </div>
    </section>
  );
}
