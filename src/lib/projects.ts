// Placeholder portfolio: images are stills cut from the hero film.
// Replace with real project photography and names when available.
export type Project = {
  slug: string;
  title: string;
  category: string;
  image: string;
  width: number;
  height: number;
  /** Bento tile footprint on large screens */
  span: "wide" | "tall" | "large" | "base";
};

export const projects: Project[] = [
  {
    slug: "obsidyen-salon",
    title: "Obsidyen Salon",
    category: "İç Dekorasyon",
    image: "/projects/salon-wide.webp",
    width: 1080,
    height: 1080,
    span: "large",
  },
  {
    slug: "lumiere-duvar",
    title: "Lumière Duvar",
    category: "Alçıpan & Aydınlatma",
    image: "/projects/lumiere-wall.webp",
    width: 1080,
    height: 1600,
    span: "tall",
  },
  {
    slug: "halo-tavan",
    title: "Halo Tavan",
    category: "Asma Tavan",
    image: "/projects/ceiling-detail.webp",
    width: 1080,
    height: 720,
    span: "wide",
  },
  {
    slug: "mermer-kutuphane",
    title: "Mermer Kütüphane",
    category: "İç Dekorasyon",
    image: "/projects/marble-library.webp",
    width: 1080,
    height: 1350,
    span: "tall",
  },
  {
    slug: "yakutiye-rezidans",
    title: "Yakutiye Rezidans",
    category: "Anahtar Teslim Tadilat",
    image: "/projects/salon-portrait.webp",
    width: 1080,
    height: 1350,
    span: "base",
  },
  {
    slug: "atesli-lounge",
    title: "Ateşli Lounge",
    category: "Ticari Tadilat",
    image: "/projects/lounge-detail.webp",
    width: 1080,
    height: 810,
    span: "wide",
  },
  {
    slug: "somine-detayi",
    title: "Şömine Detayı",
    category: "İç Dekorasyon",
    image: "/projects/fireplace-detail.webp",
    width: 900,
    height: 900,
    span: "wide",
  },
  {
    slug: "ham-yapidan-dogus",
    title: "Ham Yapıdan Doğuş",
    category: "Anahtar Teslim Tadilat",
    image: "/projects/structure-raw.webp",
    width: 1080,
    height: 1350,
    span: "base",
  },
];
