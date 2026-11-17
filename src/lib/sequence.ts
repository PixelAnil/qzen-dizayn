import { asset } from "@/lib/asset";

// Frame sequences extracted from the hero film at 15 fps (see scripts/extract-frames.mjs).
// "desktop" comes from the landscape film, "mobile" from the portrait one. Each has a light
// tier that paints at once and an HD tier swapped in from the background.
export const SEQUENCE = {
  frameCount: 150,
  sets: {
    desktop: { light: "/sequence/desktop", hd: "/sequence/desktop-hd" },
    mobile: { light: "/sequence/mobile", hd: "/sequence/mobile-hd" },
  },
} as const;

export type SequenceSet = keyof typeof SEQUENCE.sets;
export type SequenceTier = "light" | "hd";

export const frameSrc = (set: SequenceSet, index: number, tier: SequenceTier = "light") =>
  asset(`${SEQUENCE.sets[set][tier]}/${String(index + 1).padStart(3, "0")}.webp`);

/**
 * Every screen plays the portrait TV-wall film: wide screens show it whole in the middle, over a blurred,
 * darkened copy of itself (see draw() in HeroSequence). The landscape set stays in SEQUENCE for when a
 * landscape cut of the film exists; to bring it back, return "desktop" for width / height >= 1 again.
 */
export const pickSet = (): SequenceSet => "mobile";

/** Skip the HD tier on slow or metered connections. */
export const canLoadHd = () => {
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } })
    .connection;
  if (!connection) return true;
  return !connection.saveData && !["slow-2g", "2g", "3g"].includes(connection.effectiveType ?? "");
};
