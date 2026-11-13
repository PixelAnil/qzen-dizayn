// Turns the raw service films (hizmet-videolari/, 1080×1920 from the video tool) into what the
// service pages play: a 3:4 crop matching the page frame, the hero film's colour grade so every
// film reads as one family, no sound, a small H.264 file, plus its first and last frames.
//
// Protection against downloaders: a copyright band is added below the picture. The site crops the
// film to 3:4 from the top, so the band never shows there, but a downloaded copy carries it. The file
// is then stored scrambled (.qzv, first bytes XOR-ed), which no player or downloader recognises; the
// site unscrambles it in the browser (src/lib/film.ts, same KEY and LENGTH) and plays it from memory.
// Usage: node scripts/service-videos.mjs [slug …]   (no argument: all)
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
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
  "banyo-mutfak": "banyo-mutfak-pvc",
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

// Copyright band: 720×80 under the 720×960 picture
const BAND = 80;
const MARK = "public/brand/qzen-mark.webp";
const FONT = "/System/Library/Fonts/Supplemental/Arial Bold.ttf";
const NOTICE = "© QZEN DİZAYN  ·  İzinsiz kullanılamaz";
const BANDED =
  `[0:v]${FRAME},pad=720:${960 + BAND}:0:0:color=0x0c0c0c[film];` +
  `[1:v]scale=-1:44[mark];[film][mark]overlay=24:${960 + (BAND - 44) / 2},` +
  `drawtext=fontfile='${FONT}':text='${NOTICE}':fontsize=24:fontcolor=0xE6C77A:x=88:y=${960}+(${BAND}-th)/2`;

// Must match src/lib/film.ts
const KEY = "QZEN-DIZAYN-film";
const LENGTH = 4096;
const scramble = (file, out) => {
  const bytes = readFileSync(file);
  for (let i = 0; i < Math.min(LENGTH, bytes.length); i++) bytes[i] ^= KEY.charCodeAt(i % KEY.length);
  writeFileSync(out, bytes);
};

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
  const plain = `${OUT}/${slug}.mp4`;
  run(["-i", input, "-i", MARK, "-filter_complex", BANDED, "-an", "-c:v", "libx264", "-preset", "slow", "-crf", "25",
       "-profile:v", "high", "-pix_fmt", "yuv420p", "-movflags", "+faststart", plain]);
  scramble(plain, `${OUT}/${slug}.qzv`);
  rmSync(plain);
  run(["-i", input, "-vf", FRAME, "-frames:v", "1", "-c:v", "libwebp", "-quality", "78", `${OUT}/${slug}-start.webp`]);
  run(["-sseof", "-0.2", "-i", input, "-vf", FRAME, "-frames:v", "1", "-c:v", "libwebp", "-quality", "80", `${OUT}/${slug}-end.webp`]);
  const kb = (f) => Math.round(statSync(f).size / 1024);
  console.log(`${slug}: ${kb(`${OUT}/${slug}.qzv`)} KB video, ${kb(`${OUT}/${slug}-end.webp`)} KB end frame`);
}
