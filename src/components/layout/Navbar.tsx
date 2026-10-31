"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { asset } from "@/lib/asset";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { navLinks } from "@/lib/site";

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

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-luxe ${
        solid ? "border-b border-gold/15 bg-graphite/85 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-10">
        <Link href="/" className="flex items-center gap-3" aria-label="QZEN DİZAYN anasayfa">
          <Image src={asset("/brand/qzen-mark.webp")} alt="" width={200} height={162} preload className="h-9 w-auto" />
          <span className="flex flex-col leading-none">
            <span className="font-display text-xl tracking-[0.3em] text-ivory">QZEN</span>
            <span className="mt-1 text-[0.55rem] tracking-[0.5em] text-gold">DİZAYN</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-10 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="relative text-[0.75rem] font-medium uppercase tracking-[0.25em] text-ash transition-colors duration-300 after:absolute after:-bottom-2 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-gold after:transition-transform after:duration-500 hover:text-gold-light hover:after:scale-x-100"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <Button href="#iletisim">İletişime Geç</Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
          className="relative flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
        >
          <span className={`h-px w-6 bg-gold transition-transform duration-300 ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
          <span className={`h-px w-6 bg-gold transition-transform duration-300 ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
        </button>
      </nav>

      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t border-gold/15 bg-graphite px-6 pb-10 pt-6 lg:hidden"
      >
        <ul className="flex flex-col gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-3 font-display text-3xl text-ivory transition-colors hover:text-gold"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <Button href="#iletisim" onClick={() => setOpen(false)} className="mt-8 w-full">
          İletişime Geç
        </Button>
      </div>
    </header>
  );
}
