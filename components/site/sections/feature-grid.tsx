import { trustHighlights } from "@/components/site/data";

export function FeatureGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {trustHighlights.map(({ title, description, icon: Icon }) => (
        <article key={title} className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
            <Icon aria-hidden="true" className="h-7 w-7" />
          </div>
          <h3 className="mt-6 text-2xl font-extrabold text-slate-950">{title}</h3>
          <p className="mt-4 leading-7 text-slate-600">{description}</p>
        </article>
      ))}
    </div>
  );
}
