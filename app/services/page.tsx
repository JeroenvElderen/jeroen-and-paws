import { serviceCategories } from "@/lib/data/site-data";

export default function ServicesPage() {
  return (
    <main id="main-content" className="min-h-screen bg-muted/70 text-foreground">
      <section className="mx-auto w-full max-w-6xl px-6 py-14 sm:px-10 lg:px-12">
        <h1 className="text-4xl font-semibold">All service categories</h1>
        <p className="mt-3 max-w-3xl text-muted-foreground">
          A structured view of your current Supabase services, grouped by the
          categories you can reuse directly on booking and pricing pages.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {serviceCategories.map((category) => (
            <article
              key={category.category}
              className="rounded-2xl border border-border bg-card p-5 shadow-[0_12px_34px_-24px_rgba(16,31,120,0.35)]"
            >
              <h2 className="text-xl font-semibold text-foreground">{category.category}</h2>
              <ul className="mt-4 space-y-4">
                {category.items.map((service) => (
                  <li
                    key={service.title}
                    className="rounded-xl border border-border/60 bg-secondary/65 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="font-medium text-foreground">{service.title}</p>
                      <span className="text-sm font-medium text-accent">
                        {service.price}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{service.duration}</p>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
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
