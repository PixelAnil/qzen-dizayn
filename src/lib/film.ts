import { asset } from "@/lib/asset";

// The service films are stored scrambled (see scripts/service-videos.mjs) so that video-downloader
// extensions and the network tab only find a file no player opens. Here they are fetched, the first
// bytes put back, and played from an in-memory blob: URL. Each film is fetched once per page.

// Must match scripts/service-videos.mjs
const KEY = "QZEN-DIZAYN-film";
const LENGTH = 4096;

const films = new Map<string, Promise<string>>();

/** A playable blob: URL for a scrambled film in /public. */
export function filmUrl(src: string): Promise<string> {
  let url = films.get(src);
  if (!url) {
    url = fetch(asset(src))
      .then((response) => {
        if (!response.ok) throw new Error(`film ${src}: ${response.status}`);
        return response.arrayBuffer();
      })
      .then((buffer) => {
        const bytes = new Uint8Array(buffer);
        for (let i = 0; i < Math.min(LENGTH, bytes.length); i++) bytes[i] ^= KEY.charCodeAt(i % KEY.length);
        return URL.createObjectURL(new Blob([bytes], { type: "video/mp4" }));
      });
    // A failed fetch may be retried later
    url.catch(() => films.delete(src));
    films.set(src, url);
  }
  return url;
}
