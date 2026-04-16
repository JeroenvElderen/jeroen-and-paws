import { homepageHighlights } from "@/lib/data/site-data";

export function HighlightsGrid() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 pb-6 sm:px-10 lg:px-12">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {homepageHighlights.map((item) => (
          <article
            key={item.label}
            className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm"
          >
            <p className="text-2xl font-semibold text-stone-900">{item.value}</p>
            <p className="mt-1 text-sm text-stone-600">{item.label}</p>
          </article>
        ))}
      </div>
    </section>
  );
}