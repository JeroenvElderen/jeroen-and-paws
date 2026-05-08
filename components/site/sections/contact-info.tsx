import Link from "next/link";

import { contactCards } from "@/components/site/data";

export function ContactInfo() {
  return (
    <div className="space-y-5">
      {contactCards.map(({ title, body, detail, href, icon: Icon }) => (
        <article key={title} className="flex gap-4 rounded-3xl bg-slate-900 p-6 shadow-sm ring-1 ring-white/10">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-500/15 text-violet-300">
            <Icon aria-hidden="true" className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-white">{title}</h3>
            <p className="mt-1 font-bold text-slate-200">
              {href ? <Link href={href} className="hover:text-violet-300">{body}</Link> : body.split("\n").map((line) => <span key={line}>{line}<br /></span>)}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-400">{detail}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
