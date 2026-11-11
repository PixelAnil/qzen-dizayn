import data from "@/content/ayarlar/yorumlar.json";

// Customer reviews shown on the home page, edited in the admin panel (src/content/ayarlar/yorumlar.json).
// The entries marked `sample` are layout placeholders; their cards say so.
export type Review = {
  author: string;
  service: string;
  rating: number;
  text: string;
  /** Layout sample, not a real customer: the card says so */
  sample?: boolean;
};

export const reviews: Review[] = (data.reviews as Review[])
  .filter((r) => r.author?.trim() && r.text?.trim())
  .map((r) => ({ ...r, rating: Math.min(5, Math.max(1, Math.round(Number(r.rating) || 5))) }));
