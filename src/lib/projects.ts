// The studio's completed work (Projelerimiz/ and yeni-gorseller/ folders). Pictures only for now:
// titles and details are added once the client confirms what each job was.
export type Photo = { image: string; width: number; height: number };

/** One job: its cover picture, plus `more` when the job has several photographs. */
export type Project = Photo & { slug: string; more?: Photo[] };

/** Alt text until each job has its own description. */
export const projectAlt = "QZEN DİZAYN tamamlanmış proje fotoğrafı";

export const projects: Project[] = [
  { slug: "pervazli-duvar-gizli-isik", image: "/projects/proje-2.webp", width: 1600, height: 1200 },
  { slug: "yesil-salon", image: "/projects/proje-1.webp", width: 1076, height: 1434 },
  { slug: "tas-duvarli-salon", image: "/projects/proje-4.webp", width: 1158, height: 1436 },
  { slug: "kademeli-tavan", image: "/projects/proje-3.webp", width: 1600, height: 1196 },
  {
    slug: "turkuaz-cita-duvar",
    image: "/projects/galeri-01.webp",
    width: 1078,
    height: 1400,
    more: [{ image: "/projects/galeri-04.webp", width: 1080, height: 1390 }, { image: "/projects/galeri-05.webp", width: 1060, height: 1400 }],
  },
  { slug: "galeri-02", image: "/projects/galeri-02.webp", width: 862, height: 1400 },
  { slug: "galeri-03", image: "/projects/galeri-03.webp", width: 1372, height: 1148 },
  { slug: "galeri-06", image: "/projects/galeri-06.webp", width: 1400, height: 1120 },
  { slug: "galeri-07", image: "/projects/galeri-07.webp", width: 1400, height: 1120 },
  { slug: "galeri-08", image: "/projects/galeri-08.webp", width: 1400, height: 1120 },
  { slug: "galeri-09", image: "/projects/galeri-09.webp", width: 1050, height: 1400 },
  { slug: "galeri-10", image: "/projects/galeri-10.webp", width: 1050, height: 1400 },
  { slug: "galeri-11", image: "/projects/galeri-11.webp", width: 1128, height: 1396 },
  { slug: "galeri-12", image: "/projects/galeri-12.webp", width: 1050, height: 1400 },
  { slug: "galeri-13", image: "/projects/galeri-13.webp", width: 1050, height: 1400 },
  { slug: "galeri-14", image: "/projects/galeri-14.webp", width: 1050, height: 1400 },
  { slug: "galeri-15", image: "/projects/galeri-15.webp", width: 1296, height: 1214 },
  { slug: "galeri-16", image: "/projects/galeri-16.webp", width: 788, height: 1400 },
  { slug: "galeri-17", image: "/projects/galeri-17.webp", width: 788, height: 1400 },
  { slug: "galeri-18", image: "/projects/galeri-18.webp", width: 1050, height: 1400 },
  { slug: "galeri-19", image: "/projects/galeri-19.webp", width: 900, height: 1200 },
  { slug: "galeri-20", image: "/projects/galeri-20.webp", width: 1050, height: 1400 },
  { slug: "galeri-22", image: "/projects/galeri-22.webp", width: 736, height: 981 },
  { slug: "galeri-23", image: "/projects/galeri-23.webp", width: 736, height: 1104 },
  { slug: "galeri-24", image: "/projects/galeri-24.webp", width: 720, height: 900 },
  { slug: "galeri-25", image: "/projects/galeri-25.webp", width: 720, height: 894 },
  { slug: "galeri-26", image: "/projects/galeri-26.webp", width: 898, height: 1400 },
  { slug: "galeri-27", image: "/projects/galeri-27.webp", width: 1150, height: 1400 },
  { slug: "galeri-28", image: "/projects/galeri-28.webp", width: 1024, height: 1024 },
  { slug: "galeri-29", image: "/projects/galeri-29.webp", width: 736, height: 1307 },
  { slug: "galeri-30", image: "/projects/galeri-30.webp", width: 720, height: 872 },
  { slug: "galeri-31", image: "/projects/galeri-31.webp", width: 736, height: 1104 },
  { slug: "galeri-32", image: "/projects/galeri-32.webp", width: 1050, height: 1400 },
  { slug: "galeri-33", image: "/projects/galeri-33.webp", width: 736, height: 1104 },
  { slug: "galeri-34", image: "/projects/galeri-34.webp", width: 736, height: 981 },
  { slug: "galeri-36", image: "/projects/galeri-36.webp", width: 576, height: 1024 },
  { slug: "galeri-37", image: "/projects/galeri-37.webp", width: 736, height: 736 },
  { slug: "galeri-39", image: "/projects/galeri-39.webp", width: 1200, height: 1356 },
  { slug: "galeri-40", image: "/projects/galeri-40.webp", width: 1050, height: 1400 },
];
