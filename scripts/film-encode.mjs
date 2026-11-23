// Shared by scripts/service-videos.mjs (films prepared by hand) and scripts/panel-videos.mjs (films
// uploaded in the admin panel, encoded on the build server). Turns one raw film of any shape into what
// the service pages play: a centred 3:4 crop matching the page frame, the hero film's colour grade so
// every film reads as one family, no sound, a small H.264 file, plus its first and last frames.
//
// Protection against downloaders: a copyright band is added below the picture. The site crops the
// film to 3:4 from the top, so the band never shows there, but a downloaded copy carries it. The file
// is then stored scrambled (.qzv, first bytes XOR-ed), which no player or downloader recognises; the
// site unscrambles it in the browser (src/lib/film.ts, same KEY and LENGTH) and plays it from memory.
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import ffmpeg from "ffmpeg-static";

export const OUT = "public/services/video";

// Same S-curve as the hero frames, a touch less colour boost
const GRADE = "curves=master='0/0 0.18/0.12 0.4/0.43 0.65/0.74 1/1',eq=saturation=1.12";
// Any shape → filled and centre-cropped to 720×960 (for a 1080×1920 film: its centre 1080×1440)
const FRAME = `scale=720:960:force_original_aspect_ratio=increase:flags=lanczos,crop=720:960,setsar=1,${GRADE}`;

// Copyright band: 720×80 under the 720×960 picture
const BAND = 80;
const MARK = "public/brand/qzen-mark.webp";
// macOS by hand, Ubuntu on the build server
const FONT = ["/System/Library/Fonts/Supplemental/Arial Bold.ttf", "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"].find(existsSync);
const NOTICE = "© QZEN DİZAYN  ·  İzinsiz kullanılamaz";
const BANDED =
  `[0:v]${FRAME},pad=720:${960 + BAND}:0:0:color=0x0c0c0c[film];` +
  `[1:v]scale=-1:44[mark];[film][mark]overlay=24:${960 + (BAND - 44) / 2}` +
  (FONT ? `,drawtext=fontfile='${FONT}':text='${NOTICE}':fontsize=24:fontcolor=0xE6C77A:x=88:y=${960}+(${BAND}-th)/2` : "");

// Must match src/lib/film.ts
const KEY = "QZEN-DIZAYN-film";
const LENGTH = 4096;
const scramble = (file, out) => {
  const bytes = readFileSync(file);
  for (let i = 0; i < Math.min(LENGTH, bytes.length); i++) bytes[i] ^= KEY.charCodeAt(i % KEY.length);
  writeFileSync(out, bytes);
};

const run = (args) => execFileSync(ffmpeg, ["-nostdin", "-v", "error", "-y", ...args], { stdio: "inherit" });

/** Writes OUT/<slug>.qzv, <slug>-start.webp and <slug>-end.webp from one raw film. */
export function encodeServiceFilm(input, slug, { preset = "slow" } = {}) {
  mkdirSync(OUT, { recursive: true });
  const plain = `${OUT}/${slug}.mp4`;
  run(["-i", input, "-i", MARK, "-filter_complex", BANDED, "-an", "-c:v", "libx264", "-preset", preset, "-crf", "25",
       "-profile:v", "high", "-pix_fmt", "yuv420p", "-movflags", "+faststart", plain]);
  scramble(plain, `${OUT}/${slug}.qzv`);
  rmSync(plain);
  run(["-i", input, "-vf", FRAME, "-frames:v", "1", "-c:v", "libwebp", "-quality", "78", `${OUT}/${slug}-start.webp`]);
  run(["-sseof", "-0.2", "-i", input, "-vf", FRAME, "-frames:v", "1", "-c:v", "libwebp", "-quality", "80", `${OUT}/${slug}-end.webp`]);
}
