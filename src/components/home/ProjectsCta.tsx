import Link from "next/link";

export function ProjectsCta() {
  return (
    <section aria-label="Projelerimiz" className="bg-obsidian">
      <Link
        href="/projeler"
        className="group relative block overflow-hidden border-y border-gold/35 transition-colors duration-700 ease-luxe hover:border-gold"
      >
        {/* Light sweep on hover */}
        <span
          aria-hidden
          className="absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-linear-to-r from-transparent via-gold/10 to-transparent transition-transform duration-1200 ease-luxe group-hover:translate-x-[400%]"
        />
        <span
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(197,160,89,0.12),transparent_70%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        />

        <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-5 px-6 py-20 text-center md:py-28">
          <span className="text-[0.7rem] font-semibold uppercase tracking-[0.45em] text-ash transition-colors duration-500 group-hover:text-gold">
            Portfolyo
          </span>
          <span className="font-display text-3xl text-gold transition-all duration-700 ease-luxe group-hover:text-gold-light group-hover:[text-shadow:0_0_28px_rgba(230,197,122,0.55)] sm:text-5xl lg:text-6xl">
            Tamamlanan Projelerimizi Keşfedin{" "}
            <span className="inline-block transition-transform duration-700 ease-luxe group-hover:translate-x-3">➔</span>
          </span>
        </div>
      </Link>
    </section>
  );
}
