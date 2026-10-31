"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Staggered entrance for the parts of each section: every [data-reveal] inside a
 * [data-reveal-group] rises in order once the group enters. Content is only hidden
 * after this script runs, so nothing stays invisible without JavaScript.
 */
export function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal-group]").forEach((group) => {
        const parts = group.querySelectorAll("[data-reveal]");
        if (!parts.length) return;
        gsap.from(parts, {
          autoAlpha: 0,
          y: 28,
          duration: 1.1,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: group, start: "top 82%", once: true },
        });
      });
    });

    return () => ctx.revert();
  }, [pathname]);

  return null;
}
