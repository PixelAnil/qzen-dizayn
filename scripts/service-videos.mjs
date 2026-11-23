// Encodes the hand-picked raw service films (hizmet-videolari/, from the video tool) into the protected
// films the service pages play; the encoding itself lives in scripts/film-encode.mjs. Films uploaded in
// the admin panel are encoded on the build server instead (scripts/panel-videos.mjs).
// Usage: node scripts/service-videos.mjs [slug …]   (no argument: all)
import { existsSync, statSync } from "node:fs";
import { encodeServiceFilm, OUT } from "./film-encode.mjs";

const SRC = "hizmet-videolari";
// Service slug → the chosen take in hizmet-videolari/
const takes = {
  "alcipan-bolme-duvar": "alcipan-bolme-duvar-3",
  "asma-tavan": "asma-tavan",
  "ev-tadilati": "ev-tadilati-2",
  "ic-dekorasyon": "ic-dekorasyon",
  "ticari-tadilat": "ticari-tadilat",
  dekorasyon: "dekorasyon",
  "banyo-mutfak": "banyo-mutfak-pvc",
  "gergi-tavan": "gergi-tavan-baski",
  "tv-unitesi": "tv-unitesi",
  "cita-dekor": "cita-dekor",
  lambiri: "lambiri",
  pvc: "pvc",
  "tamir-tadilat": "tamir-tadilat",
  "klipin-tavan": "klipin-tavan",
  "60x60-tavan": "60x60-tavan",
};

const only = process.argv.slice(2);

for (const [slug, take] of Object.entries(takes)) {
  if (only.length && !only.includes(slug)) continue;
  const input = `${SRC}/${take}.mp4`;
  if (!existsSync(input)) {
    console.warn(`skip ${slug}: ${input} missing`);
    continue;
  }
  encodeServiceFilm(input, slug);
  const kb = (f) => Math.round(statSync(f).size / 1024);
  console.log(`${slug}: ${kb(`${OUT}/${slug}.qzv`)} KB video, ${kb(`${OUT}/${slug}-end.webp`)} KB end frame`);
}
