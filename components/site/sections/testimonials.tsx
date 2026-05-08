import { Star } from "lucide-react";

import { testimonials } from "@/components/site/data";
import { PlaceholderImage } from "@/components/site/ui/placeholder-image";

export function Testimonials() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {testimonials.map((testimonial) => (
        <article key={testimonial.name} className="rounded-3xl bg-slate-900 p-7 shadow-sm ring-1 ring-white/10">
          <div className="flex gap-1 text-amber-500">
            {Array.from({ length: 5 }).map((_, index) => <Star key={index} aria-hidden="true" className="h-4 w-4 fill-current" />)}
          </div>
          <p className="mt-5 leading-7 text-slate-200">“{testimonial.text}”</p>
          <div className="mt-6 flex items-center gap-3">
            <div className="relative h-12 w-12 overflow-hidden rounded-full">
              <PlaceholderImage alt={testimonial.name} sizes="48px" />
            </div>
            <div>
              <p className="font-extrabold text-white">{testimonial.name}</p>
              <p className="text-sm text-slate-400">{testimonial.pet}</p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
