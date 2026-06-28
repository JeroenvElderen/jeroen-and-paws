import { Clock, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { businessInfo } from "@/components/site/data";

const footerSections = [
  {
    title: "Our services",
    links: [
      {
        label: "Walks & solo adventures",
        href: "/services#walks-and-solo-adventures",
      },
      { label: "Home check-ins", href: "/services#home-visits" },
      {
        label: "Day care & overnight stays",
        href: "/services#day-care-and-overnight-stays",
      },
      { label: "Group adventures", href: "/services#group-adventures" },
      { label: "Training", href: "/services#training" },
      { label: "Custom solutions", href: "/services#custom-care" },
    ],
  },
  {
    title: "Company info",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "FAQ", href: "/contact#faq" },
      { label: "Policies", href: "/policies" },
      { label: "Privacy", href: "/privacy" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-[#080b10] text-[#d8cab8]">
      <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.25fr_0.75fr_0.75fr_1.15fr]">
          <div>
            <Image
              src="/logo3.svg"
              alt="Jeroen & Paws"
              width={152}
              height={90}
              className="h-16 w-auto"
            />
            <p className="mt-4 max-w-sm leading-7 text-[#a99b8b]">
              Personalised dog walking, training, day care, boarding, and home
              check-ins where every companion is understood and cared for.
            </p>
            <p className="mt-5 text-sm font-semibold text-[#c4b5fd]">
              {businessInfo.responseTime}
            </p>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-bold text-[#fff7e8]">{section.title}</h3>
              <ul className="mt-4 space-y-3 text-sm">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="hover:text-[#ddd6fe]">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="font-bold text-[#fff7e8]">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link
                  href={`tel:${businessInfo.phoneHref}`}
                  className="inline-flex gap-2 hover:text-[#ddd6fe]"
                >
                  <Phone className="h-4 w-4" /> {businessInfo.phoneDisplay}
                </Link>
              </li>
              <li>
                <Link
                  href={`mailto:${businessInfo.email}`}
                  className="inline-flex gap-2 hover:text-[#ddd6fe]"
                >
                  <Mail className="h-4 w-4" /> {businessInfo.email}
                </Link>
              </li>
              <li className="flex gap-2">
                <MapPin className="h-4 w-4 shrink-0" /> By appointment for local
                companions
              </li>
              <li className="flex gap-2">
                <Clock className="h-4 w-4 shrink-0" /> {businessInfo.hours}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-[#988b7b] sm:flex-row sm:items-center sm:justify-between">
          <p>All rights reserved © 2026 Jeroen & Paws</p>
          <div className="flex gap-4">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/policies">Policies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
