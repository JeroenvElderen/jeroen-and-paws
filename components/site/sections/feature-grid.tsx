import { trustHighlights } from "@/components/site/data";

export function FeatureGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {trustHighlights.map(({ title, description, icon: Icon }) => (
        <article
          key={title}
          className="rounded-3xl border border-white/10 bg-[#111821] p-8 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
        >
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#24163f] text-[#8b5cf6]">
            <Icon aria-hidden="true" className="h-7 w-7" />
          </div>
          <h3 className="mt-6 text-2xl font-extrabold text-[#fff7e8]">
            {title}
          </h3>
          <p className="mt-4 leading-7 text-[#b9aa99]">{description}</p>
        </article>
      ))}
    </div>
  );
}
