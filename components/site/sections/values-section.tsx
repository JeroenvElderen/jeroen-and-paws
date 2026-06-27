import { values } from "@/components/site/data";

export function ValuesSection() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {values.map(({ title, description, icon: Icon }) => (
        <article
          key={title}
          className="motion-card motion-card-dark rounded-3xl bg-[#111821]/10 p-8 text-center ring-1 ring-white/15"
        >
          <Icon
            aria-hidden="true"
            className="motion-icon mx-auto h-8 w-8 text-[#ddd6fe]"
          />
          <h3 className="mt-5 text-2xl font-extrabold text-[#fff7e8]">
            {title}
          </h3>
          <p className="mt-4 leading-7 text-[#ead9b8]">{description}</p>
        </article>
      ))}
    </div>
  );
}
