"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const RING = 36;
// How close (px) the pointer must come to a button before the ring takes its shape
const SNAP_REACH = 28;

/**
 * Mouse-only cursor: a gold dot with a trailing ring. Near a button the ring
 * leaves the pointer and settles over the button as its outline and fill.
 */
export function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.documentElement;
    root.classList.add("has-cursor");

    const pointer = { x: -100, y: -100 };
    const box = { x: -100, y: -100, w: RING, h: RING, r: RING / 2 };
    let visible = false;
    let hoverLink = false;
    let snapTarget: HTMLElement | null = null;
    let snaps: HTMLElement[] = [];

    const collect = () => {
      snaps = Array.from(document.querySelectorAll<HTMLElement>(".cursor-snap"));
    };
    const observer = new MutationObserver(collect);
    observer.observe(document.body, { childList: true, subtree: true });
    collect();

    const show = (on: boolean) => {
      visible = on;
      ring.style.opacity = dot.style.opacity = on ? "1" : "0";
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      const target = e.target as Element;
      // Embedded frames (the map) keep the system cursor
      show(target.tagName !== "IFRAME");
      hoverLink = !!target.closest("a, button, [role='button']");
    };
    const onLeave = () => show(false);
    const onDown = () => ring.classList.add("is-down");
    const onUp = () => ring.classList.remove("is-down");

    const nearest = () => {
      for (const el of snaps) {
        const r = el.getBoundingClientRect();
        if (!r.width) continue;
        const dx = Math.max(r.left - pointer.x, 0, pointer.x - r.right);
        const dy = Math.max(r.top - pointer.y, 0, pointer.y - r.bottom);
        if (dx * dx + dy * dy <= SNAP_REACH * SNAP_REACH) return el;
      }
      return null;
    };

    const tick = (_time: number, deltaMs: number) => {
      if (!visible) return;
      const next = nearest();
      if (next !== snapTarget) {
        snapTarget = next;
        ring.classList.toggle("is-snapped", !!next);
      }

      let goal: typeof box;
      if (snapTarget) {
        const r = snapTarget.getBoundingClientRect();
        goal = { x: r.left, y: r.top, w: r.width, h: r.height, r: Math.min(r.width, r.height) / 2 };
      } else {
        const size = hoverLink ? RING * 1.5 : RING;
        goal = { x: pointer.x - size / 2, y: pointer.y - size / 2, w: size, h: size, r: size / 2 };
      }

      // Frame-rate independent easing towards the goal
      const k = reduced ? 1 : 1 - Math.pow(1 - 0.22, deltaMs / 16.67);
      box.x += (goal.x - box.x) * k;
      box.y += (goal.y - box.y) * k;
      box.w += (goal.w - box.w) * k;
      box.h += (goal.h - box.h) * k;
      box.r += (goal.r - box.r) * k;

      ring.style.transform = `translate3d(${box.x}px, ${box.y}px, 0)`;
      ring.style.width = `${box.w}px`;
      ring.style.height = `${box.h}px`;
      ring.style.borderRadius = `${box.r}px`;
      dot.style.transform = `translate3d(${pointer.x - 3}px, ${pointer.y - 3}px, 0)`;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.addEventListener("mouseleave", onLeave);
    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      observer.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      root.classList.remove("has-cursor");
    };
  }, []);

  return (
    <>
      <div ref={ringRef} aria-hidden className="site-cursor-ring" />
      <div ref={dotRef} aria-hidden className="site-cursor-dot" />
    </>
  );
}
