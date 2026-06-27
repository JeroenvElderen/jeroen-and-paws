import { Star } from "lucide-react";

import { testimonials } from "@/components/site/data";
import { PlaceholderImage } from "@/components/site/ui/placeholder-image";

export function Testimonials() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {testimonials.map((testimonial) => (
        <article
          key={testimonial.name}
          className="motion-card motion-card-dark rounded-3xl bg-[#111821] p-7 shadow-sm ring-1 ring-white/10"
        >
          <div className="flex gap-1 text-[#8b5cf6]">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                aria-hidden="true"
                className="h-4 w-4 fill-current"
              />
            ))}
          </div>
          <p className="mt-5 leading-7 text-[#d8cab8]">“{testimonial.text}”</p>
          <div className="mt-6 flex items-center gap-3">
            <div className="motion-media relative h-12 w-12 overflow-hidden rounded-full">
              <PlaceholderImage alt={testimonial.name} sizes="48px" />
            </div>
            <div>
              <p className="font-extrabold text-[#fff7e8]">
                {testimonial.name}
              </p>
              <p className="text-sm text-[#988b7b]">{testimonial.pet}</p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
