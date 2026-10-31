import Image from "next/image";
import { asset } from "@/lib/asset";
import { credits } from "@/lib/credits";

const facts = [
  { label: "Şehir", value: "Erzurum, 1.900 m" },
  { label: "Semt", value: "Yakutiye" },
  { label: "Atölye", value: "Lale Sokak No: 14" },
  { label: "Çalıştığımız yerler", value: "Ev, mağaza, ofis" },
];

export function AboutSection() {
  const { homann } = credits;

  return (
    <section id="hakkimizda" data-reveal-group className="scroll-mt-20 bg-obsidian px-4 py-32 md:px-8 md:py-52">
      <div className="grid gap-y-8 md:grid-cols-12 md:gap-x-4">
        <h2 data-reveal className="display text-head text-ivory md:col-span-12">
          Adımız özenden gelir
        </h2>
        <p data-reveal className="max-w-[44ch] text-lead text-ivory md:col-span-7">
          QZEN, &ldquo;özen&rdquo; kelimesinden doğdu. Yakutiye&apos;deki atölyemizden Erzurum&apos;un evlerine,
          dükkânlarına ve ofislerine; tasarımdan teslime kadar tek ekip olarak çalışıyoruz.
        </p>
      </div>

      <div className="mt-18 grid gap-4 md:grid-cols-12">
        {/* Wide photograph with a paper note over its corner */}
        <figure data-reveal className="relative md:col-span-8">
          <Image
            src={asset("/projects/salon-wide.webp")}
            alt="Siyah mermer şömine duvarı, ahşap çıtalı nişler ve pirinç halka avizeli bitmiş salon"
            width={1080}
            height={1080}
            sizes="(min-width: 768px) 66vw, 100vw"
            className="aspect-4/3 w-full object-cover md:aspect-16/10"
          />
          <figcaption className="bg-paper p-5 text-body text-ink-dark md:absolute md:right-0 md:top-0 md:w-80">
            Kaba inşaattan gelen bir daireyi önce tavan ve ışıkla, sonra duvar, zemin ve mobilyayla ele alırız. Her
            aşamada aynı ekip ve aynı muhatap.
          </figcaption>
        </figure>

        {/* The city the studio works in, plus the facts */}
        <div className="flex flex-col gap-6 md:col-span-4">
          <figure data-reveal className="bg-graphite-soft">
            <Image
              src={asset(homann.src)}
              alt={homann.alt}
              width={homann.width}
              height={homann.height}
              sizes="(min-width: 768px) 33vw, 100vw"
              className="aspect-3/2 w-full object-cover"
            />
            <figcaption className="px-4 py-3 text-small text-ash">
              {homann.caption}. {homann.credit}
            </figcaption>
          </figure>

          <dl data-reveal className="grid grid-cols-2 gap-x-4 gap-y-5">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="text-small text-ash">{fact.label}</dt>
                <dd className="mt-1 text-body text-ivory">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
