import { mapsEmbed, mapsHref, site } from "@/lib/site";

const rows = [
  { label: "Telefon", value: site.phone.display, href: site.phone.href },
  { label: "WhatsApp", value: site.whatsapp.display, href: site.whatsapp.href },
  { label: "E-posta", value: site.email, href: `mailto:${site.email}` },
  { label: "Instagram", value: site.instagram.handle, href: site.instagram.href },
];

/** Where the studio is and how to reach it: the map, the address and the contact lines. */
export function ContactSection() {
  return (
    <section id="iletisim" aria-labelledby="iletisim-baslik" data-reveal-group className="scroll-mt-20 bg-obsidian px-4 pb-24 md:px-8 md:pb-36">
      <h2 id="iletisim-baslik" data-reveal className="display text-head text-ivory">
        Bize ulaşın
      </h2>

      <div className="mt-12 grid gap-4 md:mt-16 md:grid-cols-12">
        <div data-reveal className="relative aspect-4/3 overflow-hidden bg-graphite md:col-span-7 md:aspect-auto md:min-h-[30rem]">
          <iframe
            src={mapsEmbed}
            title={`QZEN DİZAYN konumu: ${site.address}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full border-0 [filter:grayscale(1)_invert(0.92)_contrast(0.9)]"
          />
        </div>

        <div data-reveal className="flex flex-col bg-graphite p-6 md:col-span-5 md:p-10">
          <h3 className="text-small text-ash">Adres</h3>
          <address className="mt-2 text-lead not-italic text-ivory">
            {site.addressLines[0]}
            <br />
            {site.addressLines[1]}
          </address>

          <dl className="mt-10 space-y-4">
            {rows.map((row) => (
              <div key={row.label} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <dt className="text-small text-ash">{row.label}</dt>
                <dd className="text-body">
                  <a
                    href={row.href}
                    {...(row.href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
                    className="text-ivory transition-colors hover:text-gold-light"
                  >
                    {row.value}
                  </a>
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-auto grid gap-2 pt-10 sm:grid-cols-3">
            <a
              href={site.phone.href}
              className="inline-flex min-h-13 flex-1 items-center justify-center bg-gold px-3 text-body font-medium text-obsidian transition-[background-color,transform] duration-300 hover:bg-gold-light active:scale-[0.98]"
            >
              Hemen arayın
            </a>
            <a
              href={site.whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-13 flex-1 items-center justify-center bg-graphite-soft px-3 text-body font-medium text-gold transition-colors duration-300 hover:bg-[rgba(197,160,89,0.1)] hover:text-gold-light"
            >
              WhatsApp
            </a>
            <a
              href={mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-13 flex-1 items-center justify-center bg-graphite-soft px-3 text-body font-medium text-gold transition-colors duration-300 hover:bg-[rgba(197,160,89,0.1)] hover:text-gold-light"
            >
              Yol tarifi al
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
