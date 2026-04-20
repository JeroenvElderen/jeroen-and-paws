import Image from "next/image";
import Link from "next/link";

import { sectionThree } from "@/lib/data/homepage-data";

function FramedImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative mx-auto max-w-[38rem] rounded-[8rem] border-[14px] border-white shadow-[0_28px_70px_rgba(0,0,0,0.45)]">
      <div className="relative h-[28rem] overflow-hidden rounded-[7rem] sm:h-[34rem]">
        <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
      </div>
    </div>
  );
}

export function SectionThreeImages() {
  const [firstVisual, secondVisual] = sectionThree.visuals;

  return (
    <section className="px-6 py-10 sm:px-10 lg:px-12">
      <div className="premium-section space-y-20">
        <article className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <FramedImage src={firstVisual.image.src} alt={firstVisual.image.alt} />
          </div>

          <div>
            <h2 className="premium-title">{firstVisual.title}</h2>
            {firstVisual.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-6 text-lg leading-relaxed text-[#bca3e7]">
                {paragraph}
              </p>
            ))}
            <Link
              href={firstVisual.cta.href}
              className="mt-8 inline-flex rounded-full bg-[#9d64ff] px-8 py-3 text-lg font-extrabold text-white transition-colors hover:bg-[#8448e8]"
            >
              {firstVisual.cta.label}
            </Link>
          </div>
        </article>

        <article className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 lg:order-1">
            <h2 className="premium-title">{secondVisual.title}</h2>
            <p className="mt-6 text-lg leading-relaxed text-[#bca3e7]">{secondVisual.intro}</p>

            <ul className="mt-6 space-y-3 text-lg leading-relaxed text-[#bca3e7]">
              {secondVisual.highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-3">
                  <span className="mt-2 inline-block h-2.5 w-2.5 rounded-full bg-[#9d64ff]" aria-hidden="true" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>

            <p className="mt-8 text-lg italic text-[#b89fdf]">
              <span className="text-[#9d64ff]">*</span> {secondVisual.footerPrefix}{" "}
              <span className="font-semibold text-[#9d64ff]">{secondVisual.footerAccent}</span> {secondVisual.footerSuffix}
            </p>
          </div>

          <div className="order-1 lg:order-2">
            <FramedImage src={secondVisual.image.src} alt={secondVisual.image.alt} />
          </div>
        </article>
      </div>
    </section>
  );
}