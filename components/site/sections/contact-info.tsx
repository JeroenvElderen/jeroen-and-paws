import Link from "next/link";

import { contactCards } from "@/components/site/data";

export function ContactInfo() {
  return (
    <div className="space-y-5">
      {contactCards.map(({ title, body, detail, href, icon: Icon }) => (
        <article
          key={title}
          className="flex gap-4 rounded-3xl bg-[#111821] p-6 shadow-sm ring-1 ring-white/10"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#24163f] text-[#8b5cf6]">
            <Icon aria-hidden="true" className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-[#fff7e8]">{title}</h3>
            <p className="mt-1 font-bold text-[#d8cab8]">
              {href ? (
                <Link href={href} className="hover:text-[#8b5cf6]">
                  {body}
                </Link>
              ) : (
                body.split("\n").map((line) => (
                  <span key={line}>
                    {line}
                    <br />
                  </span>
                ))
              )}
            </p>
            <p className="mt-2 text-sm leading-6 text-[#988b7b]">{detail}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
