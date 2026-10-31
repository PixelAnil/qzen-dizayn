import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Gizlilik Politikası",
};

// Template text — have it reviewed for KVKK compliance before going live.
export default function PrivacyPage() {
  return (
    <>
      <PageHeader eyebrow="Yasal" title="Gizlilik Politikası" />
      <article className="mx-auto max-w-3xl space-y-8 px-6 pb-32 leading-loose md:px-10">
        <p>
          {site.name} olarak kişisel verilerinizin güvenliğine önem veriyoruz. Bu sayfa, web sitemizi
          ziyaret ettiğinizde ve bizimle iletişime geçtiğinizde hangi bilgilerin işlendiğini açıklar.
        </p>
        <h2 className="text-3xl">Toplanan bilgiler</h2>
        <p>
          Telefon, e-posta veya Instagram üzerinden bizimle paylaştığınız ad, iletişim bilgileri ve proje
          detayları yalnızca talebinize yanıt vermek amacıyla kullanılır.
        </p>
        <h2 className="text-3xl">Üçüncü taraflar</h2>
        <p>
          Kişisel verileriniz, yasal zorunluluklar dışında üçüncü taraflarla paylaşılmaz. Sitemizdeki
          Google Maps ve Instagram bağlantıları ilgili hizmetlerin kendi gizlilik politikalarına tabidir.
        </p>
        <h2 className="text-3xl">İletişim</h2>
        <p>
          Verilerinizle ilgili her türlü talep için{" "}
          <a href={`mailto:${site.email}`} className="text-gold hover:text-gold-light">
            {site.email}
          </a>{" "}
          adresinden bize ulaşabilirsiniz.
        </p>
      </article>
    </>
  );
}
