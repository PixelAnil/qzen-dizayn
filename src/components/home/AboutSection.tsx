import Image from "next/image";
import { asset } from "@/lib/asset";

// Copy supplied by the client.
const paragraphs = [
  "Kurulduğumuz günden bu yana, her projeyi özgün bir hikaye olarak ele alıyoruz. On yıllık tecrübemizi; en son trendler, kusursuz malzeme kalitesi ve tavizsiz bir işçilik anlayışıyla harmanlıyoruz. Asma tavan ve alçıpan çözümlerinden anahtar teslim ev tadilatlarına, sofistike iç dekorasyon tasarımlarından prestijli ticari ofis ve mağaza yenilemelerine kadar her adımda mükemmelliği hedefliyoruz.",
  "Bizim için tasarım; sadece estetik görünmek değil, içinde yaşayan ya da çalışan insanın ruhuna hitap eden kusursuz bir atmosfer yaratmaktır. Derin antrasit tonlarını, sıcak bronz detayları ve zamansız lüksü mekanlarla buluştururken, her projede ilk günkü heyecanımızı profesyonel disiplinimizle birleştiriyoruz.",
];

export function AboutSection() {
  return (
    <section id="hakkimizda" data-reveal-group className="scroll-mt-20 bg-obsidian px-4 py-32 md:px-8 md:py-52">
      <h2 data-reveal className="display text-[8vw] leading-[0.9] text-ivory md:text-[min(6.4vw,6rem)]">
        QZEN DİZAYN — <span className="text-gold">Mekanın Ötesinde,</span>
        <br className="hidden md:block" /> Yaşamın Sanatı
      </h2>

      <div className="mt-16 grid gap-12 md:mt-24 md:grid-cols-12 md:gap-x-4">
        <div className="md:col-span-6 lg:col-span-6">
          <p data-reveal className="text-lead text-ivory">
            10 yılı aşkın süredir mimarinin, estetiğin ve işlevselliğin sınırlarını yeniden tanımlıyoruz. QZEN DİZAYN
            olarak Erzurum&apos;dan yola çıkarak; sıradan duvarları, yaşam alanlarını ve ticari mülkleri sadece birer
            mekan olmaktan çıkarıp, haute couture birer sanat eserine dönüştürüyoruz.
          </p>
          <div className="mt-10 max-w-[62ch] space-y-6 text-body text-ivory/85">
            {paragraphs.map((text) => (
              <p data-reveal key={text.slice(0, 24)}>
                {text}
              </p>
            ))}
          </div>
          <p data-reveal className="mt-10 max-w-[40ch] text-lead text-gold">
            QZEN DİZAYN; hayallerinizdeki mekanları gerçeğe dönüştüren güvenilir çözüm ortağınızdır.
          </p>
        </div>

        <figure data-reveal className="md:col-span-5 md:col-start-8 md:self-start md:sticky md:top-28">
          <Image
            src={asset("/brand/salon.webp")}
            alt="Siyah mermer şömine duvarı, ahşap çıtalı nişler ve pirinç halka avizeli salon"
            width={1080}
            height={1350}
            sizes="(min-width: 768px) 40vw, 100vw"
            className="aspect-4/5 w-full object-cover"
          />
        </figure>
      </div>
    </section>
  );
}
