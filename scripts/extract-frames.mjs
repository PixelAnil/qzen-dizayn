// Regenerates the hero image sequences from the source film.
// Usage: npm run frames [-- path/to/video.mp4]
import { execFileSync } from "node:child_process";
import { mkdirSync, readdirSync, rmSync } from "node:fs";
import ffmpeg from "ffmpeg-static";

const input = process.argv[2] ?? "Qzendizayn.mp4";
const FPS = 15;

const sets = {
  // Centered square crop of the 1080×1920 portrait source for landscape screens
  desktop: { filter: `fps=${FPS},crop=1080:1080:0:420`, quality: "72" },
  // Full portrait frame, downscaled for phones
  mobile: { filter: `fps=${FPS},scale=720:1280:flags=lanczos`, quality: "70" },
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
