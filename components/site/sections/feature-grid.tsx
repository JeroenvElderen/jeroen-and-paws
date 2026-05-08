import { trustHighlights } from "@/components/site/data";

export function FeatureGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {trustHighlights.map(({ title, description, icon: Icon }) => (
        <article key={title} className="rounded-3xl border border-white/10 bg-slate-900 p-8 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-500/15 text-violet-300">
            <Icon aria-hidden="true" className="h-7 w-7" />
          </div>
          <h3 className="mt-6 text-2xl font-extrabold text-white">{title}</h3>
          <p className="mt-4 leading-7 text-slate-300">{description}</p>
        </article>
      ))}
    </div>
  );
}
