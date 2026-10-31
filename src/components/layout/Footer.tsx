import Image from "next/image";
import Link from "next/link";
import { CopyrightYear } from "@/components/layout/CopyrightYear";
import { asset } from "@/lib/asset";
import { mapsHref, navLinks, services, site } from "@/lib/site";

const linkClass = "transition-colors duration-300 hover:text-gold-light";

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-small text-ash">{title}</h2>
      <div className="mt-4 text-body">{children}</div>
    </div>
  );
}

/** The close of every page: the four columns, then the phone number as the headline. */
export function Footer() {
  return (
    <footer data-reveal-group className="flex min-h-[90svh] flex-col justify-between gap-24 bg-graphite px-4 pb-6 pt-10 md:px-8">
      <div className="grid gap-x-4 gap-y-12 sm:grid-cols-2 lg:grid-cols-12">
        <div data-reveal className="lg:col-span-3">
          <Image src={asset("/brand/qzen-logo.webp")} alt="QZEN DİZAYN" width={900} height={900} sizes="112px" className="-ml-3 w-28" />
          <p className="mt-4 max-w-[28ch] text-body text-ash">Yakutiye&apos;de iç mimari ve tadilat atölyesi.</p>
        </div>

        <nav data-reveal aria-label="Alt menü" className="lg:col-span-2">
          <Column title="Menü">
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Column>
        </nav>

        <div data-reveal className="lg:col-span-3">
          <Column title="İletişim">
            <address className="space-y-2 not-italic">
              <a href={mapsHref} target="_blank" rel="noopener noreferrer" className={`block ${linkClass}`}>
                {site.address}
              </a>
              <a href={`mailto:${site.email}`} className={`block ${linkClass}`}>
                {site.email}
              </a>
              <a href={site.phone.href} className={`block ${linkClass}`}>
                {site.phone.display}
              </a>
            </address>
          </Column>
        </div>

        <div data-reveal className="lg:col-span-4">
          <Column title="Hizmetlerimiz">
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.title}>
                  <Link href="/hizmetler" className={linkClass}>
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </Column>
        </div>
      </div>

      <div>
        <a
          data-reveal
          href={site.phone.href}
          className="display block whitespace-nowrap text-[min(18.6vw,19rem)] leading-[0.82] text-gold transition-colors duration-500 hover:text-gold-light"
        >
          {site.phone.display}
        </a>

        <div className="mt-8 grid gap-4 text-small text-ash md:grid-cols-2 md:items-end">
          <p className="flex flex-wrap gap-x-5 gap-y-1">
            <Link href="/gizlilik-politikasi" className={linkClass}>
              Gizlilik Politikası
            </Link>
            <Link href="/gizlilik-politikasi#gorseller" className={linkClass}>
              Görsel kaynakları
            </Link>
            <span>
              © <CopyrightYear /> QZEN DİZAYN. Tüm hakları saklıdır.
            </span>
          </p>

          <p className="md:text-right">
            Bizi takip edin:{" "}
            <a href={site.instagram.href} target="_blank" rel="noopener noreferrer" className={`text-ivory ${linkClass}`}>
              Instagram {site.instagram.handle}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
