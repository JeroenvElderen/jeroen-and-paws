import { Camera, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

import { businessInfo } from "@/components/site/data";

const contactMethods = [
  {
    title: "Email",
    body: businessInfo.email,
    detail: "I aim to reply within 24 hours.",
    href: `mailto:${businessInfo.email}`,
    icon: Mail,
  },
  {
    title: "Phone / WhatsApp",
    body: businessInfo.phoneDisplay,
    detail: "Monday – Sunday, 8am – 10pm",
    href: `tel:${businessInfo.phoneHref}`,
    icon: Phone,
  },
  {
    title: "Location",
    body: "Ireland",
    detail: "Available by appointment for local families.",
    icon: MapPin,
  },
  {
    title: "Follow Along",
    body: "@jeroen.and.paws",
    detail: "Behind the scenes and latest sessions.",
    href: "https://www.instagram.com/jeroen.and.paws/",
    icon: Camera,
  },
];

export function ContactInfo() {
  return (
    <aside className="border-[#ded8e8] lg:border-l lg:pl-14">
      <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-[#7c3aed]">
        Let’s connect
      </p>
      <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.03em] text-[#2a2040] sm:text-5xl">
        I can’t wait to hear about{" "}
        <span className="text-[#7c3aed]">your dog.</span>
      </h2>
      <div className="mt-8 flex items-center gap-4 text-[#7c3aed]">
        <span className="h-px flex-1 bg-[#d8d0e7]" />
        <span aria-hidden="true">✤</span>
        <span className="h-px flex-1 bg-[#d8d0e7]" />
      </div>
      <div className="mt-8 space-y-8">
        {contactMethods.map(({ title, body, detail, href, icon: Icon }) => (
          <article key={title} className="flex gap-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#6d3fa0] text-white shadow-lg shadow-[#6d3fa0]/20">
              <Icon aria-hidden="true" className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-[#2a2040]">{title}</h3>
              <p className="mt-1 text-sm font-bold text-[#6d3fa0]">
                {href ? (
                  <Link href={href} className="hover:text-[#5b21b6]">
                    {body}
                  </Link>
                ) : (
                  body
                )}
              </p>
              <p className="mt-1 text-sm leading-6 text-[#6b6277]">{detail}</p>
            </div>
          </article>
        ))}
      </div>
    </aside>
  );
}
