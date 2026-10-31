import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { credits } from "@/lib/credits";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Gizlilik Politikası",
};

// Template text — have it reviewed for KVKK compliance before going live.
export default function PrivacyPage() {
  return (
    <>
      <PageHeader title="Gizlilik Politikası" />
      <article className="max-w-[68ch] space-y-6 px-4 pb-40 text-body md:px-8">
        <p>
          {site.name} olarak kişisel verilerinizin güvenliğine önem veriyoruz. Bu sayfa, web sitemizi ziyaret
          ettiğinizde ve bizimle iletişime geçtiğinizde hangi bilgilerin işlendiğini açıklar.
        </p>
        <h2 className="pt-6 text-lead font-medium">Toplanan bilgiler</h2>
        <p>
          Telefon, e-posta veya Instagram üzerinden bizimle paylaştığınız ad, iletişim bilgileri ve proje
          detayları yalnızca talebinize yanıt vermek amacıyla kullanılır.
        </p>
        <h2 className="pt-6 text-lead font-medium">Üçüncü taraflar</h2>
        <p>
          Kişisel verileriniz, yasal zorunluluklar dışında üçüncü taraflarla paylaşılmaz. Sitemizdeki Google
          Maps ve Instagram bağlantıları ilgili hizmetlerin kendi gizlilik politikalarına tabidir.
        </p>
        <h2 className="pt-6 text-lead font-medium">İletişim</h2>
        <p>
          Verilerinizle ilgili her türlü talep için{" "}
          <a href={`mailto:${site.email}`} className="text-gold hover:text-gold-light">
            {site.email}
          </a>{" "}
          adresinden bize ulaşabilirsiniz.
        </p>

        <h2 id="gorseller" className="scroll-mt-24 pt-12 text-lead font-medium">
          Görsel kaynakları
        </h2>
        <p>
          Proje kareleri QZEN DİZAYN&apos;ın kendi filminden alınmıştır. Erzurum görselleri Wikimedia Commons&apos;tan,
          lisanslarına uygun olarak kullanılmıştır ve stüdyonun kendi işlerini göstermez.
        </p>
        <ul className="space-y-3">
          {Object.values(credits).map((c) => (
            <li key={c.src}>
              <a href={c.page} target="_blank" rel="noopener noreferrer" className="text-gold hover:text-gold-light">
                {c.caption}
              </a>{" "}
              <span className="text-ash">({c.credit})</span>
            </li>
          ))}
        </ul>
      </article>
    </>
  );
}
