"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { asset } from "@/lib/asset";
import { navLinks, site } from "@/lib/site";

const linkClass = "text-small text-ivory transition-colors duration-300 hover:text-gold-light";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever the route changes
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled || open ? "bg-obsidian" : "bg-transparent"
      }`}
    >
      <nav className="flex h-16 items-center justify-between px-4 md:h-20 md:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="QZEN DİZAYN anasayfa">
          <Image src={asset("/brand/qzen-mark.webp")} alt="" width={200} height={162} preload className="h-8 w-auto md:h-9" />
          <span className="text-small font-medium text-ivory">QZEN Dizayn</span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.slice(1).map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={linkClass}>
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <a href={site.phone.href} className="text-small font-medium text-gold transition-colors hover:text-gold-light">
              {site.phone.display}
            </a>
          </li>
        </ul>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="text-small font-medium text-gold md:hidden"
        >
          {open ? "Kapat" : "Menü"}
        </button>
      </nav>

      <div id="mobile-menu" hidden={!open} className="bg-obsidian px-4 pb-10 pt-4 md:hidden">
        <ul className="flex flex-col gap-2">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} onClick={() => setOpen(false)} className="display block py-1 text-head text-ivory hover:text-gold">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <a href={site.phone.href} className="mt-8 flex min-h-14 items-center justify-center bg-gold text-body font-medium text-obsidian">
          Ara: {site.phone.display}
        </a>
      </div>
    </header>
  );
}
