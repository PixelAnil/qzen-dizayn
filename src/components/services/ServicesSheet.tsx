import Image from "next/image";
import { asset } from "@/lib/asset";
import { credits } from "@/lib/credits";
import { services, site } from "@/lib/site";

/** The services set like a printed card, laid on a field of Oltu stone. */
export function ServicesSheet({ id, headingLevel = "h2" }: { id?: string; headingLevel?: "h1" | "h2" }) {
  const { oltu } = credits;
  const Heading = headingLevel;

  return (
    <section id={id} data-reveal-group className="relative scroll-mt-20 overflow-hidden px-2.5 py-24 md:px-8 md:py-40">
      <Image
        src={asset(oltu.src)}
        alt={oltu.alt}
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div aria-hidden className="absolute inset-0 bg-obsidian/55" />

      <div className="relative md:grid md:grid-cols-12">
        <div data-reveal className="scalloped bg-paper px-7 py-16 text-center text-ink-dark md:col-span-7 md:col-start-6 md:px-16 md:py-20">
          <Heading className="display text-head">Hizmetlerimiz</Heading>
          <p className="mt-4 text-body text-ink-soft">Keşif ve ölçü için randevuyla adresinize geliyoruz.</p>

          <div className="mx-auto mt-14 max-w-[30rem] space-y-14 text-left">
            {services.map((service) => (
              <div key={service.group}>
                <h3 className="text-center text-lead font-medium">{service.group}</h3>
                <ul className="mt-6 space-y-4">
                  {service.items.map((item) => (
                    <li key={item.name}>
                      <div className="flex items-baseline justify-between gap-6">
                        <span className="text-body font-medium">{item.name}</span>
                        <span className="shrink-0 text-small text-ink-soft">{item.where}</span>
                      </div>
                      <p className="text-body text-ink-soft">{item.note}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="mt-16 text-body">
            Keşif randevusu için
            <br />
            <a href={site.phone.href} className="font-medium text-ink-dark underline decoration-gold decoration-2 underline-offset-4 hover:text-ink-soft">
              {site.phone.display}
            </a>
          </p>
        </div>
      </div>

      <p className="relative mt-4 text-small text-ash md:absolute md:bottom-6 md:left-8">
        Zemin: {oltu.caption}. {oltu.credit}
      </p>
    </section>
  );
}
