import Image from "next/image";
import Link from "next/link";
import { CopyrightYear } from "@/components/layout/CopyrightYear";
import { InstagramIcon, MailIcon } from "@/components/ui/Icons";
import { asset } from "@/lib/asset";
import { mapsHref, navLinks, policyLinks, site } from "@/lib/site";

const linkClass = "transition-colors duration-300 hover:text-gold-light";
const iconClass =
  "inline-flex h-11 w-11 items-center justify-center bg-graphite-soft text-gold transition-[background-color,color,transform] duration-300 hover:bg-[rgba(197,160,89,0.1)] hover:text-gold-light active:scale-95";

export function Footer() {
  return (
    <footer className="bg-graphite px-4 pb-24 pt-14 md:px-8 md:pt-16">
      <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <Link href="/" aria-label="QZEN DİZAYN anasayfa" className="shrink-0">
          <Image src={asset("/brand/qzen-logo.webp")} alt="QZEN DİZAYN" width={900} height={900} sizes="96px" className="-ml-2.5 w-24" />
        </Link>

        <nav aria-label="Alt menü">
          <ul className="flex flex-wrap gap-x-7 gap-y-3 text-body text-ivory">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-4 md:text-right">
          <address className="space-y-1 text-body not-italic text-ash">
            <a href={mapsHref} target="_blank" rel="noopener noreferrer" className={`block ${linkClass}`}>
              {site.address}
            </a>
            <a href={site.phone.href} className={`block text-ivory ${linkClass}`}>
              {site.phone.display}
            </a>
          </address>

          <div className="flex gap-2 md:justify-end">
            <a href={site.instagram.href} target="_blank" rel="noopener noreferrer" aria-label={`Instagram: ${site.instagram.handle}`} className={iconClass}>
              <InstagramIcon className="h-5 w-5" />
            </a>
            <a href={`mailto:${site.email}`} aria-label={`E-posta: ${site.email}`} className={iconClass}>
              <MailIcon className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-12 flex flex-col gap-3 text-small text-ash md:mt-14 md:flex-row md:items-center md:justify-between">
        <ul className="flex flex-wrap gap-x-5 gap-y-1">
          {policyLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={linkClass}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <p>
          © <CopyrightYear /> QZEN DİZAYN · Bu sayfa{" "}
          <a href={site.builtBy.href} target="_blank" rel="noopener noreferrer" className={`text-ivory ${linkClass}`}>
            {site.builtBy.label}
          </a>{" "}
          tarafından oluşturulmuştur.
        </p>
      </div>
    </footer>
  );
}
