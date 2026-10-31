import { asset } from "@/lib/asset";

// Frame sequences extracted from the hero film at 15 fps (see scripts/extract-frames.mjs).
// "desktop" is a centered 1080×1080 crop (only the middle band is visible on landscape screens),
// "mobile" is the full 720×1280 portrait frame.
export const SEQUENCE = {
  frameCount: 150,
  sets: {
    desktop: "/sequence/desktop",
    mobile: "/sequence/mobile",
  },
} as const;

export type SequenceSet = keyof typeof SEQUENCE.sets;

export const frameSrc = (set: SequenceSet, index: number) =>
  asset(`${SEQUENCE.sets[set]}/${String(index + 1).padStart(3, "0")}.webp`);

/** Landscape (or square) viewports use the cropped set, portrait ones the full frame. */
export const pickSet = (width: number, height: number): SequenceSet =>
  width / height >= 1 ? "desktop" : "mobile";
