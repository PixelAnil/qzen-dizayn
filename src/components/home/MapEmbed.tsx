"use client";

import { useState } from "react";

/**
 * The Google map loads only when asked: the embed pulls in over a megabyte of script and made the page
 * stutter as it scrolled into view. Until then a quiet panel holds its place with the address.
 */
export function MapEmbed({ src, title, address }: { src: string; title: string; address: string }) {
  const [open, setOpen] = useState(false);

  if (open) {
    return (
      <iframe
        src={src}
        title={title}
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0 h-full w-full border-0 [filter:grayscale(1)_invert(0.92)_contrast(0.9)]"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      className="group absolute inset-0 flex flex-col items-center justify-center gap-5 bg-graphite p-6 text-center transition-colors duration-500 hover:bg-graphite-soft focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-gold"
    >
      {/* A faint street grid so the panel reads as a map before it is one */}
      <span
        aria-hidden
        className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(var(--color-ivory)_1px,transparent_1px),linear-gradient(90deg,var(--color-ivory)_1px,transparent_1px)] [background-size:56px_56px]"
      />
      <svg aria-hidden viewBox="0 0 24 24" fill="none" className="relative h-10 w-10 text-gold transition-transform duration-500 group-hover:-translate-y-1">
        <path d="M12 21s-7-6.2-7-11.5a7 7 0 1 1 14 0C19 14.8 12 21 12 21z" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="9.5" r="2.5" fill="currentColor" />
      </svg>
      <span className="relative max-w-[32ch] text-body text-ivory/80">{address}</span>
      <span className="relative rounded-full px-5 py-2.5 text-small text-ivory ring-1 ring-ivory/25 transition-colors duration-500 group-hover:text-gold-light group-hover:ring-gold">
        Haritayı göster
      </span>
    </button>
  );
}
