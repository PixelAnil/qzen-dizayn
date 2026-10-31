import Image from "next/image";
import Link from "next/link";
import { CopyrightYear } from "@/components/layout/CopyrightYear";
import { mapsHref, navLinks, services, site } from "@/lib/site";

function ColumnTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-7 font-sans text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-gold">
      {children}
    </h3>
  );
}

const linkClass = "text-ash transition-colors duration-300 hover:text-gold-light";

export function Footer() {
  return (
    <footer className="relative bg-graphite">
      <div aria-hidden className="gold-hairline h-px w-full" />

      <div className="mx-auto grid max-w-7xl gap-14 px-6 py-20 sm:grid-cols-2 md:px-10 lg:grid-cols-4 lg:gap-10">
        {/* Brand */}
        <div>
          <Link href="/" aria-label="QZEN DİZAYN anasayfa" className="inline-block">
            <Image src="/brand/qzen-logo.webp" alt="QZEN DİZAYN" width={900} height={900} sizes="144px" className="w-36" />
          </Link>
          <p className="mt-6 max-w-xs text-sm leading-relaxed">
            Mimari tasarım, iç dekorasyon ve anahtar teslim tadilatta özenin imzası.
          </p>
        </div>

        {/* 1 — Menu */}
        <nav aria-label="Alt menü">
          <ColumnTitle>Menü</ColumnTitle>
          <ul className="space-y-4 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* 2 — Contact */}
        <div id="iletisim" className="scroll-mt-24">
          <ColumnTitle>İletişim</ColumnTitle>
          <address className="space-y-5 text-sm not-italic">
            <a href={mapsHref} target="_blank" rel="noopener noreferrer" className={`block leading-relaxed ${linkClass}`}>
              <span className="mb-1 block text-[0.65rem] uppercase tracking-[0.3em] text-slate-ash/70">Adres</span>
              {site.address}
            </a>
            <a href={`mailto:${site.email}`} className={`block ${linkClass}`}>
              <span className="mb-1 block text-[0.65rem] uppercase tracking-[0.3em] text-slate-ash/70">E-posta</span>
              {site.email}
            </a>
            <a href={site.phone.href} className={`block ${linkClass}`}>
              <span className="mb-1 block text-[0.65rem] uppercase tracking-[0.3em] text-slate-ash/70">Telefon</span>
              {site.phone.display}
            </a>
          </address>
        </div>

        {/* 3 — Services */}
        <div>
          <ColumnTitle>Hizmetlerimiz</ColumnTitle>
          <ul className="space-y-4 text-sm leading-relaxed">
            {services.map((service) => (
              <li key={service.title}>
                <Link href="/hizmetler" className={linkClass}>
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-7xl flex-col-reverse gap-8 px-6 py-8 text-xs md:flex-row md:items-center md:justify-between md:px-10">
          <div className="flex flex-col gap-2 text-slate-ash sm:flex-row sm:items-center sm:gap-6">
            <Link href="/gizlilik-politikasi" className={linkClass}>
              Gizlilik Politikası
            </Link>
            <p>
              © <CopyrightYear /> QZEN DİZAYN. Tüm hakları saklıdır.
            </p>
          </div>

          <div className="flex flex-col gap-2 md:items-end">
            <span className="text-[0.65rem] uppercase tracking-[0.4em] text-gold">Bizi Takip Edin</span>
            <a
              href={site.instagram.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 text-sm ${linkClass}`}
            >
              <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
              </svg>
              Instagram: {site.instagram.handle}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
