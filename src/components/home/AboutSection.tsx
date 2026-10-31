"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { asset } from "@/lib/asset";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";

gsap.registerPlugin(ScrollTrigger);

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-reveal]", {
        autoAlpha: 0,
        y: 40,
        duration: 1.4,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
      });
      gsap.from("[data-watermark]", {
        autoAlpha: 0,
        scale: 0.94,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hakkimizda"
      className="relative overflow-hidden bg-obsidian px-6 py-28 md:px-10 md:py-40"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-14 md:grid md:grid-cols-2 md:items-center md:gap-20">
        {/* Mobile: compact logo above the copy */}
        <div data-reveal className="md:hidden">
          <Image
            src={asset("/brand/qzen-logo.webp")}
            alt="QZEN DİZAYN"
            width={900}
            height={900}
            sizes="160px"
            className="-ml-4 w-40"
          />
        </div>

        <div className="relative z-10">
          <div data-reveal>
            <SectionEyebrow>Biz Kimiz</SectionEyebrow>
          </div>
          <h2 data-reveal className="mt-8 text-4xl leading-[1.1] sm:text-5xl lg:text-6xl">
            Mekânı bir yapı değil,
            <br />
            <span className="text-gold-gradient">bir his</span> olarak tasarlıyoruz.
          </h2>
          <div className="mt-10 max-w-xl space-y-7 text-[1.05rem] leading-[2.1] text-ash">
            <p data-reveal>
              QZEN DİZAYN, Erzurum&apos;dan doğan ve mimariyi bir zanaat olarak gören bir tasarım
              stüdyosudur. Kaba yapının ham dokusunda, henüz kimsenin görmediği bir yaşamı görürüz.
            </p>
            <p data-reveal>
              Asma tavandaki gizli bir ışık bandından mermerin damarına, bölme duvarın oranından
              mobilyanın dokusuna kadar her ayrıntıyı tek bir bütünün parçası olarak ele alırız.
              Sonuç; gösterişten değil, özenden doğan zamansız mekânlardır.
            </p>
            <p data-reveal className="text-gold">
              Tasarımdan uygulamaya, anahtar teslim — tek imza, tek sorumluluk.
            </p>
          </div>
        </div>

        {/* Desktop: oversized translucent watermark */}
        <div data-watermark aria-hidden className="relative hidden md:flex md:justify-center">
          <Image
            src={asset("/brand/qzen-logo.webp")}
            alt=""
            width={900}
            height={900}
            sizes="(min-width: 768px) 46vw, 0px"
            className="w-[min(46vw,720px)] max-w-none opacity-20"
          />
        </div>
      </div>
    </section>
  );
}
