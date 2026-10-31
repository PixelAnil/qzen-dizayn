"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { asset } from "@/lib/asset";
import { navLinks, site } from "@/lib/site";

const linkClass = "text-small text-ivory transition-colors duration-300 hover:text-gold-light";

export function Navbar() {
  const pathname = usePathname();
  const barRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  // The bar's ground fades in with scroll: clear over the top of the film, fully black once the
  // film has played out (or after the first screen on pages without one).
  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    let frame = 0;
    let distance = 1;

    // Layout is read only on resize; scrolling just divides
    const measure = () => {
      const hero = document.querySelector<HTMLElement>("[data-hero]");
      distance = Math.max(1, hero ? hero.offsetHeight - window.innerHeight : window.innerHeight * 0.5);
    };
    const update = () => {
      frame = 0;
      bar.style.opacity = String(Math.min(1, window.scrollY / distance));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onResize = () => {
      measure();
      onScroll();
    };

    measure();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [pathname]);

  // Close the mobile menu whenever the route changes
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50" style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}>
      <div ref={barRef} aria-hidden className="absolute inset-0 bg-obsidian opacity-0" />
      <div aria-hidden className={`absolute inset-0 bg-obsidian transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`} />

      <nav className="relative flex h-16 items-center justify-between px-4 md:h-20 md:px-8">
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

        {/* Three bars that turn into a cross */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
          className="relative -mr-2 flex h-11 w-11 items-center justify-center md:hidden"
        >
          <span aria-hidden className="relative block h-3.5 w-6">
            <span className={`absolute left-0 top-0 h-0.5 w-6 bg-gold transition-transform duration-300 ease-luxe ${open ? "translate-y-1.5 rotate-45" : ""}`} />
            <span className={`absolute left-0 top-1.5 h-0.5 w-6 bg-gold transition-opacity duration-200 ${open ? "opacity-0" : ""}`} />
            <span className={`absolute left-0 top-3 h-0.5 w-6 bg-gold transition-transform duration-300 ease-luxe ${open ? "-translate-y-1.5 -rotate-45" : ""}`} />
          </span>
        </button>
      </nav>

      {/* Compact mobile menu */}
      <div
        id="mobile-menu"
        className={`relative grid bg-obsidian transition-[grid-template-rows,opacity] duration-300 ease-luxe md:hidden ${
          open ? "grid-rows-[1fr] opacity-100" : "pointer-events-none grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <ul className="px-4 pb-2 pt-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  tabIndex={open ? 0 : -1}
                  className="flex min-h-12 items-center text-lead text-ivory transition-colors hover:text-gold-light"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex gap-2 px-4 pb-6 pt-2">
            <a href={site.phone.href} tabIndex={open ? 0 : -1} className="flex min-h-12 flex-1 items-center justify-center bg-gold text-body font-medium text-obsidian">
              Ara
            </a>
            <a
              href={site.whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={open ? 0 : -1}
              className="flex min-h-12 flex-1 items-center justify-center bg-graphite-soft text-body font-medium text-gold"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
