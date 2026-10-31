"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;

/** Freeze page scrolling while an overlay (the photo viewer) is open. */
export const lockScroll = (locked: boolean) => {
  if (locked) lenis?.stop();
  else lenis?.start();
  document.documentElement.style.overflow = locked ? "hidden" : "";
};

/**
 * Lenis drives the scroll position; GSAP's ticker (a single rAF loop) drives Lenis,
 * so ScrollTrigger and smooth scrolling always read the same frame.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    lenis = new Lenis({
      lerp: 0.09,
      wheelMultiplier: 0.9,
      anchors: { offset: -80 },
      autoRaf: false,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis?.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  // Route change: start the new page at the top (or at its hash target)
  useEffect(() => {
    const hash = window.location.hash;
    if (hash && document.querySelector(hash)) {
      lenis?.scrollTo(hash, { offset: -80, immediate: true });
    } else {
      lenis?.scrollTo(0, { immediate: true });
    }
    ScrollTrigger.refresh();
  }, [pathname]);

  return <>{children}</>;
}
