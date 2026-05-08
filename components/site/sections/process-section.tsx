import { processSteps } from "@/components/site/data";

export function ProcessSection() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {processSteps.map((step, index) => (
        <article key={step.title} className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-purple-700 text-2xl font-extrabold text-white">{index + 1}</div>
          <h3 className="mt-6 text-2xl font-extrabold text-slate-950">{step.title}</h3>
          <p className="mt-3 leading-7 text-slate-600">{step.description}</p>
        </article>
      ))}
    </div>
  );
}
