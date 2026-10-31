// The studio's own completed work (Projelerimiz/ folder). Titles are descriptive placeholders;
// replace them with the real project names when available.
export type Project = {
  slug: string;
  title: string;
  category: string;
  image: string;
  width: number;
  height: number;
};

export const projects: Project[] = [
  {
    slug: "pervazli-duvar-gizli-isik",
    title: "Pervazlı Duvar ve Gizli Işık",
    category: "Asma tavan, duvar pervazı",
    image: "/projects/proje-2.webp",
    width: 1600,
    height: 1200,
  },
  {
    slug: "yesil-salon",
    title: "Yeşil Pervazlı Salon",
    category: "İç dekorasyon",
    image: "/projects/proje-1.webp",
    width: 1076,
    height: 1434,
  },
  {
    slug: "tas-duvarli-salon",
    title: "Taş Duvarlı Salon",
    category: "Asma tavan, duvar kaplama",
    image: "/projects/proje-4.webp",
    width: 1158,
    height: 1436,
  },
  {
    slug: "kademeli-tavan",
    title: "Kademeli Asma Tavan",
    category: "Asma tavan",
    image: "/projects/proje-3.webp",
    width: 1600,
    height: 1196,
  },
];
