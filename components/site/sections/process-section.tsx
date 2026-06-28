import { processSteps } from "@/components/site/data";

export function ProcessSection() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {processSteps.map((step, index) => (
        <article
          key={step.title}
          className="motion-card motion-card-dark rounded-3xl border border-white/10 bg-[#111821] p-5 text-center sm:p-8 shadow-sm"
        >
          <div className="motion-icon mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#8b5cf6] text-2xl font-extrabold text-[#fff7e8]">
            {index + 1}
          </div>
          <h3 className="mt-6 text-2xl font-extrabold text-[#fff7e8]">
            {step.title}
          </h3>
          <p className="mt-3 leading-7 text-[#b9aa99]">{step.description}</p>
        </article>
      ))}
    </div>
  );
}
