import { CalendarDays, Clock3, MapPin, PhoneCall } from "lucide-react";

import { sectionSeven } from "@/lib/data/homepage-data";

export function SectionSevenContact() {
  return (
    <section id="contact" className="px-4 py-8 sm:px-8 lg:px-10">
      <div className="mx-auto grid w-full max-w-7xl gap-6 rounded-[2.5rem] border border-white/20 bg-[#09182f]/75 p-6 backdrop-blur-xl lg:grid-cols-2 lg:p-10">
        <div>
          <h2 className="text-4xl font-black text-white sm:text-5xl">{sectionSeven.title}</h2>
          <p className="mt-4 text-cyan-100/90">{sectionSeven.subtitle}</p>

          <div className="mt-8 space-y-3">
            {sectionSeven.info.map((item) => {
              const Icon = item.icon === "map" ? MapPin : item.icon === "hours" ? Clock3 : PhoneCall;
              return (
                <article key={item.title} className="flex items-start gap-3 rounded-2xl border border-white/20 bg-white/5 p-4">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: item.iconColor }}>
                    <Icon className="h-5 w-5 text-white" />
                  </span>
                  <div>
                    <h3 className="font-black text-white">{item.title}</h3>
                    {item.lines.map((line) => (
                      <p key={line} className="text-cyan-100/90">
                        {line}
                      </p>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <form className="space-y-4 rounded-3xl border border-fuchsia-300/30 bg-fuchsia-300/5 p-5" aria-label="Contact request form">
          {sectionSeven.formFields.map((field) => (
            <label key={field.name} htmlFor={field.name} className="block">
              <span className="mb-2 block text-sm font-bold uppercase tracking-[0.14em] text-fuchsia-100">{field.placeholder}</span>
              <div className="relative">
                <input
                  id={field.name}
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  className="h-12 w-full rounded-xl border border-white/20 bg-[#071122] px-4 text-white placeholder:text-white/50"
                />
                {field.name === "date" ? <CalendarDays className="pointer-events-none absolute right-3 top-3 h-5 w-5 text-cyan-200" /> : null}
              </div>
            </label>
          ))}

          <label htmlFor="notes" className="block">
            <span className="mb-2 block text-sm font-bold uppercase tracking-[0.14em] text-fuchsia-100">Pet notes</span>
            <textarea id="notes" name="notes" rows={4} className="w-full rounded-xl border border-white/20 bg-[#071122] p-4 text-white" />
          </label>

          <button type="submit" className="h-12 w-full rounded-xl bg-cyan-300 font-black text-[#041323]">
            {sectionSeven.submitLabel}
          </button>
        </form>
      </div>
    </section>
  );
}
