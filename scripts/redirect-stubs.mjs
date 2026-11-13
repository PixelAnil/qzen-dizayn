// The old address (pixelanil.github.io/qzen-dizayn) keeps working: for every page of the built site
// this writes a tiny page into redirect/ that sends the visitor (and search engines, via canonical)
// to the same page on the new domain. The deploy workflow publishes redirect/ to GitHub Pages.
// Usage: node scripts/redirect-stubs.mjs   (after npm run build)
import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://qzendizayn.com";
const OUT = "out";
const DEST = "redirect";

const pages = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) return pages(file);
    return entry.name.endsWith(".html") ? [path.relative(OUT, file)] : [];
  });

rmSync(DEST, { recursive: true, force: true });
for (const page of pages(OUT)) {
  const route = page === "404.html" ? "/" : `/${page.replace(/index\.html$/, "").replace(/\.html$/, "/")}`;
  const target = `${SITE}${route}`;
  const html = `<!doctype html><html lang="tr"><head><meta charset="utf-8"><title>QZEN DİZAYN</title>
<link rel="canonical" href="${target}"><meta name="robots" content="noindex">
<meta http-equiv="refresh" content="0; url=${target}">
<script>location.replace(${JSON.stringify(target)} + location.search + location.hash)</script>
</head><body><a href="${target}">${target}</a></body></html>\n`;
  mkdirSync(path.dirname(path.join(DEST, page)), { recursive: true });
  writeFileSync(path.join(DEST, page), html);
}
console.log(`redirect stubs → ${SITE}`);
