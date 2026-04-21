import Image from "next/image";
import Link from "next/link";

import { sectionThree } from "@/lib/data/homepage-data";

function FramedImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative mx-auto max-w-[38rem] rounded-[3.5rem] border border-white/25 bg-gradient-to-b from-[#2d1f48] to-[#1b1230] p-3 shadow-[0_28px_70px_rgba(0,0,0,0.45)]">
      <div className="relative h-[28rem] overflow-hidden rounded-[3rem] sm:h-[34rem]">
        <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
      </div>
    </div>
  );
}

export function SectionThreeImages() {
  const [firstVisual, secondVisual] = sectionThree.visuals;

  return (
    <section id="about" className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="flow-section playful-panel relative isolate space-y-20">
        <div className="playful-waves pointer-events-none absolute inset-x-0 bottom-0 h-24" />
        <div className="playful-ribbons pointer-events-none absolute right-0 top-0 h-20 w-44" />
        <article className="grid items-center gap-10 rounded-[2rem] border border-white/10 bg-white/[0.02] p-4 lg:grid-cols-2 lg:gap-16 lg:p-6">
          <div>
            <FramedImage src={firstVisual.image.src} alt={firstVisual.image.alt} />
          </div>

          <div>
            <h2 className="premium-title">{firstVisual.title}</h2>
            {firstVisual.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-6 text-lg leading-relaxed text-[#e3cbff]">
                {paragraph}
              </p>
            ))}
            <Link
              href={firstVisual.cta.href}
              className="mt-8 inline-flex rounded-full border border-white/30 bg-gradient-to-r from-[#ff74b3] to-[#8f63ff] px-8 py-3 text-lg font-extrabold text-white transition-colors hover:from-[#ff63aa] hover:to-[#7f52f6]"
            >
              {firstVisual.cta.label}
            </Link>
          </div>
        </article>

        <article className="grid items-center gap-10 rounded-[2rem] border border-white/10 bg-white/[0.02] p-4 lg:grid-cols-2 lg:gap-16 lg:p-6">
          <div className="order-2 lg:order-1 rounded-3xl border border-white/20 bg-[#24183d]/70 p-8">
            <h2 className="premium-title">{secondVisual.title}</h2>
            <p className="mt-6 text-lg leading-relaxed text-[#e3cbff]">{secondVisual.intro}</p>

            <ul className="mt-6 space-y-3 text-lg leading-relaxed text-[#e3cbff]">
              {secondVisual.highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-3">
                  <span className="mt-2 inline-block h-2.5 w-2.5 rounded-full bg-[#ff74b3]" aria-hidden="true" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>

            <p className="mt-8 text-lg italic text-[#d8beff]">
              <span className="text-[#ff74b3]">*</span> {secondVisual.footerPrefix}{" "}
              <span className="font-semibold text-[#ff9ec9]">{secondVisual.footerAccent}</span> {secondVisual.footerSuffix}
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
