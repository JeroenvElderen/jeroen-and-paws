import { faqs } from "@/components/site/data";

export function FaqSection() {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {faqs.map((faq) => (
        <article key={faq.question} className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200">
          <h3 className="text-xl font-extrabold text-slate-950">{faq.question}</h3>
          <p className="mt-3 leading-7 text-slate-600">{faq.answer}</p>
        </article>
      ))}
    </div>
  );
}
