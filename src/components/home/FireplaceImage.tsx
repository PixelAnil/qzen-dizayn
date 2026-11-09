"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { asset } from "@/lib/asset";

const SRC = "/brand/salon.webp";
const IMAGE = { width: 1080, height: 1350 };
// The flames inside the firebox, in source pixels: the stone bed below and the sofa to the right stay still
const FIRE = { x: 452, y: 812, w: 174, h: 86 };
const pct = (v: number, of: number) => `${(v / of) * 100}%`;
const FPS = 30;

/**
 * The salon photograph with its fire alive: the photo loads as a normal image, and once it is on
 * screen a small canvas over the firebox redraws the flames with a rising, licking sway.
 * Nothing runs while the picture is off screen, and reduced motion keeps it still.
 */
export function FireplaceImage({ alt, sizes, className = "" }: { alt: string; sizes: string; className?: string }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const box = boxRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!box || !canvas || !ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Soft-edged mask so the redrawn flames melt into the photo underneath
    const mask = document.createElement("canvas");
    mask.width = FIRE.w;
    mask.height = FIRE.h;
    const m = mask.getContext("2d")!;
    const fadeX = m.createLinearGradient(0, 0, FIRE.w, 0);
    fadeX.addColorStop(0, "transparent");
    fadeX.addColorStop(0.12, "#000");
    fadeX.addColorStop(0.88, "#000");
    fadeX.addColorStop(1, "transparent");
    m.fillStyle = fadeX;
    m.fillRect(0, 0, FIRE.w, FIRE.h);
    m.globalCompositeOperation = "destination-in";
    const fadeY = m.createLinearGradient(0, 0, 0, FIRE.h);
    fadeY.addColorStop(0, "transparent");
    fadeY.addColorStop(0.2, "#000");
    fadeY.addColorStop(1, "#000");
    m.fillStyle = fadeY;
    m.fillRect(0, 0, FIRE.w, FIRE.h);

    canvas.width = FIRE.w;
    canvas.height = FIRE.h;

    const img = new window.Image();
    img.src = asset(SRC);
    let ready = false;
    img.decode().then(() => (ready = true), () => {});

    let raf = 0;
    let visible = false;
    let last = 0;

    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      if (!ready || now - last < 1000 / FPS) return;
      last = now;
      const t = now / 1000;

      ctx.globalCompositeOperation = "source-over";
      ctx.clearRect(0, 0, FIRE.w, FIRE.h);
      // Row by row: the base holds still, the tips sway and stretch upward
      const lift = 0.5 + 0.5 * Math.sin(t * 7.3) * Math.sin(t * 3.1);
      for (let y = 0; y < FIRE.h; y++) {
        const up = 1 - y / FIRE.h;
        const reach = up * up;
        const dx = reach * (3.2 * Math.sin(t * 6.1 + y * 0.23) + 1.6 * Math.sin(t * 10.7 + y * 0.51));
        const sy = Math.min(FIRE.h - 1, y + reach * 5 * lift);
        ctx.drawImage(img, FIRE.x, FIRE.y + sy, FIRE.w, 1, dx, y, FIRE.w, 1);
      }
      ctx.globalCompositeOperation = "destination-in";
      ctx.drawImage(mask, 0, 0);
    };

    const start = () => {
      if (!raf && visible && !document.hidden) raf = requestAnimationFrame(draw);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    observer.observe(box);
    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div ref={boxRef} className={`relative overflow-hidden ${className}`}>
      <Image src={asset(SRC)} alt={alt} width={IMAGE.width} height={IMAGE.height} sizes={sizes} className="h-full w-full object-cover" />
      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none absolute"
        style={{ left: pct(FIRE.x, IMAGE.width), top: pct(FIRE.y, IMAGE.height), width: pct(FIRE.w, IMAGE.width), height: pct(FIRE.h, IMAGE.height) }}
      />
    </div>
  );
}
