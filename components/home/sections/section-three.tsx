import Image from "next/image";
import Link from "next/link";

import { sectionThree } from "@/lib/data/homepage-data";

function FramedImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative mx-auto max-w-[38rem] rounded-[8rem] border-[14px] border-white shadow-[0_28px_70px_rgba(16,31,120,0.14)]">
      <div className="relative h-[28rem] overflow-hidden rounded-[7rem] sm:h-[34rem]">
        <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
      </div>
    </div>
  );
}

export function SectionThreeImages() {
  const [firstVisual, secondVisual] = sectionThree.visuals;

  return (
    <section className="px-6 pb-20 sm:px-10 lg:px-12">
      <div className="mx-auto w-full max-w-6xl space-y-20">
        <article className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <FramedImage src={firstVisual.image.src} alt={firstVisual.image.alt} />
          </div>

          <div>
            <h2 className="text-4xl font-extrabold leading-tight text-[#351a75] sm:text-5xl">{firstVisual.title}</h2>
            {firstVisual.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-6 text-lg leading-relaxed text-[#7b68a5]">
                {paragraph}
              </p>
            ))}
            <Link
              href={firstVisual.cta.href}
              className="mt-8 inline-flex rounded-full bg-[#7c3aed] px-8 py-3 text-lg font-extrabold text-white transition-colors hover:bg-[#6d28d9]"
            >
              {firstVisual.cta.label}
            </Link>
          </div>
        </article>

        <article className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 lg:order-1">
            <h2 className="text-4xl font-extrabold leading-tight text-[#351a75] sm:text-5xl">{secondVisual.title}</h2>
            <p className="mt-6 text-lg leading-relaxed text-[#7b68a5]">{secondVisual.intro}</p>

            <ul className="mt-6 space-y-3 text-lg leading-relaxed text-[#7b68a5]">
              {secondVisual.highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-3">
                  <span className="mt-2 inline-block h-2.5 w-2.5 rounded-full bg-[#7c3aed]" aria-hidden="true" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>

            <p className="mt-8 text-lg italic text-[#6a58a0]">
              <span className="text-[#7c3aed]">*</span> {secondVisual.footerPrefix}{" "}
              <span className="font-semibold text-[#7c3aed]">{secondVisual.footerAccent}</span> {secondVisual.footerSuffix}
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