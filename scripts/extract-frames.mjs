// Regenerates the hero image sequences from the source film.
// Usage: npm run frames [-- path/to/video.mp4]
//
// Two tiers per orientation: a light set that paints immediately, and an HD set
// the page swaps in from the background once the light set is loaded.
import { execFileSync } from "node:child_process";
import { mkdirSync, readdirSync, rmSync } from "node:fs";
import ffmpeg from "ffmpeg-static";

const input = process.argv[2] ?? "Qzendizayn.mp4";
const FPS = 15;
// Centred square crop of the 1080×1920 portrait source: all a landscape screen ever shows
const CROP = "crop=1080:1080:0:420";

const sets = {
  desktop: { filter: `fps=${FPS},${CROP}`, quality: "72" },
  mobile: { filter: `fps=${FPS},scale=720:1280:flags=lanczos`, quality: "70" },
  // Lanczos upscale + light sharpening beats the browser's own upscaling on large screens
  "desktop-hd": { filter: `fps=${FPS},${CROP},scale=1600:1600:flags=lanczos,unsharp=5:5:0.7:5:5:0`, quality: "82" },
  "mobile-hd": { filter: `fps=${FPS},unsharp=5:5:0.5:5:5:0`, quality: "80" },
};

for (const [name, { filter, quality }] of Object.entries(sets)) {
  const dir = `public/sequence/${name}`;
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });

  execFileSync(
    ffmpeg,
    ["-v", "error", "-i", input, "-vf", filter, "-an",
     "-c:v", "libwebp", "-quality", quality, "-compression_level", "6",
     `${dir}/%03d.webp`],
    { stdio: "inherit" },
  );

  console.log(`${name}: ${readdirSync(dir).length} frames → ${dir}`);
}

console.log("Update SEQUENCE.frameCount in src/lib/sequence.ts if the count changed.");
