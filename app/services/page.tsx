import { Header } from "@/components/home/header";
import { serviceCategories } from "@/lib/data/site-data";

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-stone-50 text-stone-900">
      <Header />
      <section className="mx-auto w-full max-w-6xl px-6 py-14 sm:px-10 lg:px-12">
        <h1 className="text-4xl font-semibold">All service categories</h1>
        <p className="mt-3 max-w-3xl text-stone-600">
          A structured view of your current Supabase services, grouped by the
          categories you can reuse directly on booking and pricing pages.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {serviceCategories.map((category) => (
            <article
              key={category.category}
              className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm"
            >
              <h2 className="text-xl font-semibold text-stone-900">{category.category}</h2>
              <ul className="mt-4 space-y-4">
                {category.items.map((service) => (
                  <li
                    key={service.title}
                    className="rounded-xl border border-stone-100 bg-stone-50 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="font-medium text-stone-900">{service.title}</p>
                      <span className="text-sm font-medium text-amber-700">
                        {service.price}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-stone-600">{service.duration}</p>
                    <p className="mt-2 text-sm leading-6 text-stone-600">
                      {service.description}
                    </p>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}