import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { servicePreviews } from "@/components/site/data";
import { PlaceholderImage } from "@/components/site/ui/placeholder-image";

export function ServicesPreview() {
  return (
    <div className="grid gap-7 md:grid-cols-3">
      {servicePreviews.map((service) => (
        <article
          key={service.title}
          className="motion-card motion-card-dark overflow-hidden rounded-3xl bg-[#111821] shadow-sm ring-1 ring-white/10"
        >
          <div className="motion-media relative h-44 sm:h-56">
            <PlaceholderImage
              alt={service.alt}
              sizes="(min-width: 768px) 33vw, 100vw"
              src={service.imageSrc}
              imagePosition={service.imagePosition}
            />
          </div>
          <div className="p-5 sm:p-7">
            <h3 className="text-2xl font-extrabold text-[#fff7e8]">
              {service.title}
            </h3>
            <p className="mt-3 leading-7 text-[#b9aa99]">
              {service.description}
            </p>
            <p className="mt-5 text-lg font-extrabold text-[#8b5cf6]">
              {service.price}
            </p>
            <Link
              href={service.href}
              className="motion-link mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-[#8b5cf6]/35 px-4 font-extrabold text-[#8b5cf6] hover:text-[#ddd6fe] sm:min-h-0 sm:w-auto sm:justify-start sm:rounded-none sm:border-0 sm:px-0"
            >
              Learn more <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
