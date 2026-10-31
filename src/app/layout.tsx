import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import { Cursor } from "@/components/layout/Cursor";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { Reveal } from "@/components/providers/Reveal";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { asset } from "@/lib/asset";
import { site } from "@/lib/site";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: `${site.name} — İç mimari ve tadilat, İstanbul`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: site.name,
    description: site.description,
    locale: "tr_TR",
    type: "website",
    images: [{ url: asset("/brand/og.webp"), width: 1080, height: 1080, alt: site.name }],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="tr" className={`${archivo.variable} antialiased`}>
      <body className="flex min-h-svh flex-col">
        <SmoothScroll>
          <Reveal />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton />
          <Cursor />
        </SmoothScroll>
      </body>
    </html>
  );
}
