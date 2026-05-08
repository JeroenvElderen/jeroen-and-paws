import Link from "next/link";

import { contactCards } from "@/components/site/data";

export function ContactInfo() {
  return (
    <div className="space-y-5">
      {contactCards.map(({ title, body, detail, href, icon: Icon }) => (
        <article key={title} className="flex gap-4 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
            <Icon aria-hidden="true" className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-slate-950">{title}</h3>
            <p className="mt-1 font-bold text-slate-700">
              {href ? <Link href={href} className="hover:text-emerald-700">{body}</Link> : body.split("\n").map((line) => <span key={line}>{line}<br /></span>)}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-500">{detail}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
