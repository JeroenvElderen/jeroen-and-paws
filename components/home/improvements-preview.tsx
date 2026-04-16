import Link from "next/link";

import { dataModelImprovements } from "@/lib/data/site-data";

export function ImprovementsPreview() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 pb-16 pt-6 sm:px-10 lg:px-12">
      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-semibold">Data model improvements</h2>
          <Link
            href="/model-improvements"
            className="text-sm font-medium text-amber-700 hover:text-amber-800"
          >
            Open full notes →
          </Link>
        </div>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-stone-700">
          {dataModelImprovements.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}