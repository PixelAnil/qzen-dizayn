// Client-safe pieces of the projects: the list itself is read from src/content/projeler in lib/content.
export type { Photo, Project } from "@/lib/content";

/** Alt text of a job's photographs: its name when it has one. */
export const projectAlt = (title?: string) => (title ? `${title}, QZEN DİZAYN projesi` : "QZEN DİZAYN tamamlanmış proje fotoğrafı");
