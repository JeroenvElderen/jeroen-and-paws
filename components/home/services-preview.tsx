import Link from "next/link";

import { serviceCategories } from "@/lib/data/site-data";

export function ServicesPreview() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-10 sm:px-10 lg:px-12">
      <div className="mb-6 flex items-end justify-between gap-4">
        <h2 className="text-2xl font-semibold">Popular services</h2>
        <Link href="/services" className="text-sm font-medium text-amber-700 hover:text-amber-800">
          View all categories →
        </Link>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        {serviceCategories.map((category) => (
          <article
            key={category.category}
            className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-stone-900">{category.category}</h3>
            <ul className="mt-4 space-y-4">
              {category.items.map((service) => (
                <li
                  key={service.title}
                  className="rounded-xl border border-stone-100 bg-stone-50 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-medium text-stone-900">{service.title}</p>
                    <span className="text-sm font-medium text-amber-700">{service.price}</span>
                  </div>
                  <p className="mt-1 text-sm text-stone-600">{service.duration}</p>
                  <p className="mt-2 text-sm leading-6 text-stone-600">{service.description}</p>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}