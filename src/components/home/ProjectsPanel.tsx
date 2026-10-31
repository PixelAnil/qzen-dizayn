import Image from "next/image";
import Link from "next/link";
import { asset } from "@/lib/asset";

/** One full-screen plate that opens the portfolio: a tight crop of finished work with a title row at mid-height. */
export function ProjectsPanel() {
  return (
    <section aria-label="Projelerimiz" className="bg-obsidian">
      <Link href="/projeler" className="group relative block h-[82svh] overflow-hidden md:h-svh">
        <Image
          src={asset("/projects/fireplace-detail.webp")}
          alt="Siyah mermer şömine ve önündeki koltuk takımı, yakın plan"
          fill
          sizes="100vw"
          className="scale-[1.3] object-cover transition-transform duration-[1600ms] ease-luxe group-hover:scale-[1.36]"
        />

        <div className="absolute inset-x-0 bottom-5 flex flex-col gap-2 bg-obsidian/70 px-4 py-5 md:top-1/2 md:bottom-auto md:-translate-y-1/2 md:flex-row md:items-center md:gap-0 md:px-8 md:py-7">
          <span className="hidden text-small text-ash md:block md:w-[10%]">Erzurum</span>
          <span className="display text-lead text-gold transition-colors duration-500 group-hover:text-gold-light md:flex-1 md:text-[clamp(1.5rem,1rem+1.6vw,2.25rem)]">
            Tamamlanan projelerimizi keşfedin
          </span>
          <span className="flex justify-between text-small text-ivory md:block">
            <span className="md:hidden">Erzurum</span>
            <span>
              Ev, mağaza, ofis <span aria-hidden className="inline-block transition-transform duration-500 group-hover:translate-x-1.5">&rarr;</span>
            </span>
          </span>
        </div>
      </Link>
    </section>
  );
}
