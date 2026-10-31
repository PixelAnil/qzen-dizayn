import type { PolicySection } from "@/components/layout/PolicyPage";
import { site } from "@/lib/site";

// Template texts — have them reviewed for KVKK compliance before going live.
export const POLICY_UPDATED = "31 Ekim 2026";

export const privacyPolicy: PolicySection[] = [
  {
    heading: "Kapsam",
    paragraphs: [
      `Bu Gizlilik Politikası, ${site.name} web sitesini ziyaret ettiğinizde ve bizimle telefon, e-posta veya sosyal medya üzerinden iletişime geçtiğinizde kişisel verilerinizin nasıl işlendiğini açıklar.`,
    ],
  },
  {
    heading: "Topladığımız bilgiler",
    paragraphs: [
      "Bizimle iletişime geçtiğinizde paylaştığınız ad, soyad, telefon numarası, e-posta adresi, adres ve proje bilgileri ile keşif sırasında alınan ölçü ve fotoğraflar.",
      "Sitemiz bir iletişim formu veya üyelik sistemi içermez; siteye girdiğiniz anda sizden kişisel bilgi istenmez.",
    ],
  },
  {
    heading: "Bilgilerin kullanımı",
    paragraphs: [
      "Paylaştığınız bilgiler yalnızca talebinize yanıt vermek, keşif randevusu planlamak, teklif hazırlamak ve sözleşme kapsamındaki işi yürütmek amacıyla kullanılır.",
    ],
  },
  {
    heading: "Üçüncü taraflar",
    paragraphs: [
      "Kişisel verileriniz yasal zorunluluklar dışında üçüncü kişilerle paylaşılmaz. Sitemizdeki Google Haritalar ve Instagram bağlantıları ilgili hizmetlerin kendi gizlilik politikalarına tabidir.",
    ],
  },
  {
    heading: "İletişim",
    paragraphs: [`Gizlilikle ilgili sorularınız için ${site.email} adresine yazabilir veya ${site.phone.display} numarasından bize ulaşabilirsiniz.`],
  },
];

export const kvkkNotice: PolicySection[] = [
  {
    heading: "Veri sorumlusu",
    paragraphs: [
      `6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca kişisel verileriniz, veri sorumlusu sıfatıyla ${site.name} (${site.address}) tarafından aşağıda açıklanan kapsamda işlenmektedir.`,
    ],
  },
  {
    heading: "İşlenen kişisel veriler",
    paragraphs: ["Kimlik (ad, soyad), iletişim (telefon, e-posta, adres) ve müşteri işlem bilgileri (talep, teklif, proje ve sözleşme bilgileri)."],
  },
  {
    heading: "İşleme amaçları",
    paragraphs: [
      "Taleplerinizin karşılanması, keşif ve teklif süreçlerinin yürütülmesi, sözleşmenin kurulması ve ifası, faturalandırma ile yasal yükümlülüklerin yerine getirilmesi.",
    ],
  },
  {
    heading: "Hukuki sebep ve toplama yöntemi",
    paragraphs: [
      "Kişisel verileriniz telefon, e-posta, sosyal medya ve yüz yüze görüşmeler aracılığıyla; KVKK'nın 5. maddesinde yer alan sözleşmenin kurulması veya ifası, hukuki yükümlülüğün yerine getirilmesi ve meşru menfaat hukuki sebeplerine dayanılarak toplanır.",
    ],
  },
  {
    heading: "Aktarım",
    paragraphs: ["Kişisel verileriniz yalnızca yasal zorunluluk hâlinde yetkili kamu kurum ve kuruluşlarına aktarılabilir."],
  },
  {
    heading: "Haklarınız",
    paragraphs: [
      "KVKK'nın 11. maddesi uyarınca kişisel verilerinizin işlenip işlenmediğini öğrenme, bilgi talep etme, düzeltilmesini veya silinmesini isteme ve işlemeye itiraz etme haklarına sahipsiniz.",
      `Başvurularınızı ${site.email} adresine veya ${site.address} adresine yazılı olarak iletebilirsiniz.`,
    ],
  },
];

export const cookiePolicy: PolicySection[] = [
  {
    heading: "Çerez nedir?",
    paragraphs: ["Çerezler, ziyaret ettiğiniz sitelerin tarayıcınıza kaydettiği küçük metin dosyalarıdır."],
  },
  {
    heading: "Sitemizde kullanılan çerezler",
    paragraphs: [
      "Sitemiz reklam, analiz veya takip amaçlı çerez kullanmaz. Sayfanın çalışması için gerekli olan teknik veriler dışında tarayıcınıza bilgi kaydedilmez.",
      "İletişim bölümündeki Google Haritalar penceresi Google tarafından sunulur ve Google kendi çerezlerini kullanabilir. Ayrıntılar için Google'ın gizlilik politikasını inceleyebilirsiniz.",
    ],
  },
  {
    heading: "Çerezleri yönetme",
    paragraphs: ["Tarayıcınızın ayarlarından çerezleri dilediğiniz zaman silebilir veya engelleyebilirsiniz."],
  },
];
