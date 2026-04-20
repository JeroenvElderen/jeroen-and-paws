import { CalendarDays, Clock3, MapPin, PhoneCall } from "lucide-react";

import { sectionSeven } from "@/lib/data/homepage-data";

export function SectionSevenContact() {
  return (
    <section id="contact" className="px-6 py-10 sm:px-10 lg:px-12">
      <div className="premium-section grid gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-start lg:gap-12">
        <div>
          <h2 className="premium-title tracking-tight sm:text-6xl">{sectionSeven.title}</h2>
          <p className="mt-6 max-w-xl text-xl leading-relaxed text-[#bda5e9]">{sectionSeven.subtitle}</p>

          <div className="mt-10 space-y-7">
            {sectionSeven.info.map((item) => {
              const Icon = item.icon === "map" ? MapPin : item.icon === "hours" ? Clock3 : PhoneCall;

              return (
                <article key={item.title} className="flex gap-4 rounded-3xl border border-white/10 bg-[#1d152c]/65 p-5 sm:gap-5">
                  <div
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full"
                    style={{ backgroundColor: item.iconColor }}
                    aria-hidden="true"
                  >
                    <Icon className="h-7 w-7 text-white" strokeWidth={2.2} />
                  </div>

                  <div>
                    <h3 className="text-2xl font-extrabold leading-tight text-[#efe3ff]">{item.title}</h3>
                    {item.lines.map((line) => (
                      <p key={line} className="text-lg leading-tight text-[#bfa4e3] sm:text-xl">
                        {line}
                      </p>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-[#171126] px-7 py-10 sm:px-10">
          <form className="space-y-6" aria-label="Contact request form">
            {sectionSeven.formFields.map((field) => (
              <div key={field.name} className="relative">
                <label htmlFor={field.name} className="mb-2 block pl-2 text-sm font-semibold text-[#d8c1ff]">
                  {field.placeholder}
                </label>
                <input
                  id={field.name}
                  type={field.type}
                  name={field.name}
                  placeholder={`Enter ${field.placeholder.toLowerCase()}`}
                  className="h-14 w-full rounded-2xl border border-[#3f2f5c] bg-[#261c38] px-6 text-lg text-[#e6d7ff] placeholder:text-[#9b87c1] outline-none ring-0 transition focus-visible:border-[#a97dfb] focus-visible:ring-2 focus-visible:ring-[#a97dfb]/30"
                />
                {field.name === "date" ? (
                  <CalendarDays className="pointer-events-none absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#ac95d0]" />
                ) : null}
              </div>
            ))}

            <button
              type="submit"
              className="mt-6 h-14 w-full rounded-2xl bg-[#9d64ff] text-xl font-extrabold text-white transition hover:bg-[#8448e8]"
            >
              {sectionSeven.submitLabel}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
