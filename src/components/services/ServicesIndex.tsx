import Image from "next/image";
import Link from "next/link";
import { asset } from "@/lib/asset";
import { services } from "@/lib/site";

/**
 * The services stacked one under another. On a mouse, hovering a row shows its picture in a
 * frame beside the list; on touch, each row carries its picture inline.
 */
export function ServicesIndex() {
  return (
    <ul data-reveal-group className="relative">
      {services.map((service) => (
        <li key={service.slug} data-reveal>
          <Link
            href={`/hizmetler/${service.slug}`}
            className="group flex items-center gap-5 py-6 transition-opacity duration-300 md:py-8 [@media(hover:hover)]:[ul:hover_&:not(:hover)]:opacity-40"
          >
            {/* Touch: picture inline */}
            <Image
              src={asset(service.image.src)}
              alt=""
              width={service.image.width}
              height={service.image.height}
              sizes="96px"
              className="aspect-3/4 w-14 shrink-0 object-cover [@media(hover:hover)]:hidden"
            />

            <span className="min-w-0 md:max-w-[62%]">
              <span className="display block text-[clamp(1.375rem,0.8rem+3.2vw,4.25rem)] leading-[0.92] text-ivory transition-colors duration-300 group-hover:text-gold-light">
                {service.title}
              </span>
              <span className="mt-2 block text-body text-ash">{service.tagline}</span>
            </span>

            <span aria-hidden className="ml-auto hidden text-lead text-gold transition-transform duration-300 group-hover:translate-x-2 md:block">
              &rarr;
            </span>

            {/* Mouse: picture in the frame beside the list */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 right-14 hidden w-[28%] opacity-0 transition-opacity duration-500 ease-luxe group-hover:opacity-100 [@media(hover:hover)]:md:block"
            >
              <Image
                src={asset(service.image.src)}
                alt=""
                fill
                sizes="28vw"
                className="object-cover"
              />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
