// Turns the raw service films (hizmet-videolari/, 1080×1920 from the video tool) into what the
// service pages play: a 3:4 crop matching the page frame, the hero film's colour grade so every
// film reads as one family, no sound, a small H.264 file, plus its first and last frames.
// Usage: node scripts/service-videos.mjs [slug …]   (no argument: all)
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, statSync } from "node:fs";
import ffmpeg from "ffmpeg-static";

const SRC = "hizmet-videolari";
const OUT = "public/services/video";

// Service slug → the chosen take in hizmet-videolari/
const takes = {
  "alcipan-bolme-duvar": "alcipan-bolme-duvar-3",
  "asma-tavan": "asma-tavan",
  "ev-tadilati": "ev-tadilati-2",
  "ic-dekorasyon": "ic-dekorasyon",
  "ticari-tadilat": "ticari-tadilat",
  dekorasyon: "dekorasyon",
  "banyo-mutfak": "banyo-mutfak",
  "gergi-tavan": "gergi-tavan",
  "tv-unitesi": "tv-unitesi",
  "cita-dekor": "cita-dekor",
  lambiri: "lambiri",
  pvc: "pvc",
  "tamir-tadilat": "tamir-tadilat",
  "klipin-tavan": "klipin-tavan",
  "60x60-tavan": "60x60-tavan",
};

// Same S-curve as the hero frames (scripts/extract-frames.mjs), a touch less colour boost
const GRADE = "curves=master='0/0 0.18/0.12 0.4/0.43 0.65/0.74 1/1',eq=saturation=1.12";
// 1080×1920 → centre 1080×1440 (3:4) → 720×960
const FRAME = `crop=1080:1440:0:240,scale=720:960:flags=lanczos,${GRADE}`;

const run = (args) => execFileSync(ffmpeg, ["-nostdin", "-v", "error", "-y", ...args], { stdio: "inherit" });

mkdirSync(OUT, { recursive: true });
const only = process.argv.slice(2);

for (const [slug, take] of Object.entries(takes)) {
  if (only.length && !only.includes(slug)) continue;
  const input = `${SRC}/${take}.mp4`;
  if (!existsSync(input)) {
    console.warn(`skip ${slug}: ${input} missing`);
    continue;
  }
  run(["-i", input, "-vf", FRAME, "-an", "-c:v", "libx264", "-preset", "slow", "-crf", "25",
       "-profile:v", "high", "-pix_fmt", "yuv420p", "-movflags", "+faststart", `${OUT}/${slug}.mp4`]);
  run(["-i", input, "-vf", FRAME, "-frames:v", "1", "-c:v", "libwebp", "-quality", "78", `${OUT}/${slug}-start.webp`]);
  run(["-sseof", "-0.2", "-i", input, "-vf", FRAME, "-frames:v", "1", "-c:v", "libwebp", "-quality", "80", `${OUT}/${slug}-end.webp`]);
  const kb = (f) => Math.round(statSync(f).size / 1024);
  console.log(`${slug}: ${kb(`${OUT}/${slug}.mp4`)} KB video, ${kb(`${OUT}/${slug}-end.webp`)} KB end frame`);
}
