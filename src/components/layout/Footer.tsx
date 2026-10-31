import Image from "next/image";
import Link from "next/link";
import { CopyrightYear } from "@/components/layout/CopyrightYear";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { asset } from "@/lib/asset";
import { mapsHref, navLinks, policyLinks, services, site } from "@/lib/site";

const linkClass = "transition-colors duration-300 hover:text-gold-light";

function Column({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <h2 className="text-small text-ash">{title}</h2>
      <div className="mt-4 text-body">{children}</div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-graphite px-4 pt-16 md:px-8 md:pt-20">
      <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <Image src={asset("/brand/qzen-logo.webp")} alt="QZEN DİZAYN" width={900} height={900} sizes="112px" className="-ml-3 w-28" />
          <p className="mt-4 max-w-[30ch] text-body text-ash">Erzurum&apos;da iç mimari, tadilat ve dekorasyon.</p>
        </div>

        <nav aria-label="Alt menü" className="lg:col-span-2">
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

        <Column title="İletişim" className="lg:col-span-3">
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

        <Column title="Hizmetlerimiz" className="lg:col-span-3">
          <ul className="space-y-2">
            {services.map((service) => (
              <li key={service.slug}>
                <Link href={`/hizmetler/${service.slug}`} className={linkClass}>
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </Column>

        <Column title="Bizi takip edin" className="lg:col-span-1">
          <a
            href={site.instagram.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Instagram: ${site.instagram.handle}`}
            className="inline-flex h-12 w-12 items-center justify-center bg-graphite-soft text-gold transition-[background-color,color,transform] duration-300 hover:bg-[rgba(197,160,89,0.1)] hover:text-gold-light active:scale-95"
          >
            <InstagramIcon className="h-6 w-6" />
          </a>
        </Column>
      </div>

      <div className="mt-16 flex flex-col gap-6 bg-graphite py-8 text-small text-ash md:mt-20 md:flex-row md:items-center md:justify-between">
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {policyLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={linkClass}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-6">
          <p>
            © <CopyrightYear /> QZEN DİZAYN. Tüm hakları saklıdır.
          </p>
          <p>
            Bu sayfa{" "}
            <a href={site.builtBy.href} target="_blank" rel="noopener noreferrer" className={`text-ivory ${linkClass}`}>
              {site.builtBy.label}
            </a>{" "}
            tarafından oluşturulmuştur.
          </p>
        </div>
      </div>
    </footer>
  );
}
