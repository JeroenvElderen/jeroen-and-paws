import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { servicePreviews } from "@/components/site/data";
import { PlaceholderImage } from "@/components/site/ui/placeholder-image";

export function ServicesPreview() {
  return (
    <div className="grid gap-7 md:grid-cols-3">
      {servicePreviews.map((service) => (
        <article key={service.title} className="overflow-hidden rounded-3xl bg-slate-900 shadow-sm ring-1 ring-white/10 transition hover:-translate-y-1 hover:shadow-xl">
          <div className="relative h-56">
            <PlaceholderImage alt={service.alt} sizes="(min-width: 768px) 33vw, 100vw" />
          </div>
          <div className="p-7">
            <h3 className="text-2xl font-extrabold text-white">{service.title}</h3>
            <p className="mt-3 leading-7 text-slate-300">{service.description}</p>
            <p className="mt-5 text-lg font-extrabold text-violet-300">{service.price}</p>
            <Link href="/services" className="mt-5 inline-flex items-center gap-2 font-extrabold text-violet-300 hover:text-violet-200">
              Learn more <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
