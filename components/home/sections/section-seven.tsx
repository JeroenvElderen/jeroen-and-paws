import { CalendarDays, Clock3, MapPin, PhoneCall } from "lucide-react";

import { sectionSeven } from "@/lib/data/homepage-data";

export function SectionSevenContact() {
  return (
    <section className="px-6 pb-24 pt-4 sm:px-10 lg:px-12">
      <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-start lg:gap-12">
        <div>
          <h2 className="text-4xl font-extrabold tracking-tight text-[#351a75] sm:text-6xl">{sectionSeven.title}</h2>
          <p className="mt-6 max-w-xl text-xl leading-relaxed text-[#6f5aa1]">{sectionSeven.subtitle}</p>

          <div className="mt-10 space-y-10">
            {sectionSeven.info.map((item) => {
              const Icon =
                item.icon === "map"
                  ? MapPin
                  : item.icon === "hours"
                    ? Clock3
                    : PhoneCall;

              return (
                <article key={item.title} className="flex gap-4 sm:gap-5">
                  <div
                    className="flex h-[4.4rem] w-[4.4rem] shrink-0 items-center justify-center rounded-full"
                    style={{ backgroundColor: item.iconColor }}
                    aria-hidden="true"
                  >
                    <Icon className="h-8 w-8 text-white" strokeWidth={2.2} />
                  </div>

                  <div>
                    <h3 className="text-[2.1rem] font-extrabold leading-tight text-[#351a75]">{item.title}</h3>
                    {item.lines.map((line) => (
                      <p key={line} className="text-[1.35rem] leading-tight text-[#8a79b5] sm:text-[1.85rem]">
                        {line}
                      </p>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className="rounded-[2rem] bg-[#f4efff] px-7 py-12 sm:px-10">
          <form className="space-y-6" aria-label="Contact request form">
            {sectionSeven.formFields.map((field) => (
              <div key={field.name} className="relative">
                <input
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  className="h-14 w-full rounded-full border-none bg-[#eee4ff] px-6 text-lg text-[#6f5aa1] placeholder:text-[#a194c4] outline-none"
                  readOnly
                />
                {field.name === "date" ? (
                  <CalendarDays className="pointer-events-none absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#b0a1cc]" />
                ) : null}
              </div>
            ))}

            <button
              type="submit"
              className="mt-8 h-14 w-full rounded-full bg-[#7c3aed] text-2xl font-extrabold text-white transition hover:bg-[#6d28d9]"
            >
              {sectionSeven.submitLabel}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}