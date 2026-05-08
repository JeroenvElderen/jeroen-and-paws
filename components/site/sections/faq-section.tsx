import { faqs } from "@/components/site/data";

export function FaqSection() {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {faqs.map((faq) => (
        <article
          key={faq.question}
          className="rounded-3xl bg-[#111821] p-7 shadow-sm ring-1 ring-white/10"
        >
          <h3 className="text-xl font-extrabold text-[#fff7e8]">
            {faq.question}
          </h3>
          <p className="mt-3 leading-7 text-[#b9aa99]">{faq.answer}</p>
        </article>
      ))}
    </div>
  );
}
