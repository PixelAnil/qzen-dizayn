import Image from "next/image";
import Link from "next/link";
import { asset } from "@/lib/asset";
import { services } from "@/lib/content";

/**
 * The services stacked one under another. On a mouse, hovering a row shows its picture in a
 * frame beside the list; on touch, each row carries its picture inline. `limit` shows only the first few.
 */
export function ServicesIndex({ limit }: { limit?: number }) {
  return (
    <ul data-reveal-group className="relative">
      {services.slice(0, limit).map((service) => {
        // The service's photograph, else the finished frame of its film, else the brand mark
        const pic = service.image ?? service.video?.end;
        return (
        <li key={service.slug} data-reveal>
          <Link
            href={`/hizmetler/${service.slug}`}
            className="group flex items-center gap-5 py-6 transition-opacity duration-300 md:py-8 [@media(hover:hover)]:[ul:hover_&:not(:hover)]:opacity-40"
          >
            {/* Touch: picture inline (the brand mark until the service has one) */}
            {pic ? (
              <Image
                src={asset(pic.src)}
                alt=""
                width={pic.width}
                height={pic.height}
                sizes="96px"
                className="aspect-3/4 w-14 shrink-0 object-cover [@media(hover:hover)]:hidden"
              />
            ) : (
              <span className="flex aspect-3/4 w-14 shrink-0 items-center justify-center bg-graphite [@media(hover:hover)]:hidden">
                <Image src={asset("/brand/qzen-mark.webp")} alt="" width={200} height={162} className="w-1/2 opacity-70" />
              </span>
            )}

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
            {pic && (
              <span
                aria-hidden
                className="pointer-events-none absolute inset-y-0 right-14 hidden w-[28%] opacity-0 transition-opacity duration-500 ease-luxe group-hover:opacity-100 [@media(hover:hover)]:md:block"
              >
                <Image src={asset(pic.src)} alt="" fill sizes="28vw" className="object-cover" />
              </span>
            )}
          </Link>
        </li>
        );
      })}
    </ul>
  );
}
