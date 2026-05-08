import {
  Camera,
  Clock,
  Home,
  Mail,
  MapPin,
  PawPrint,
  Phone,
  Star,
} from "lucide-react";
import Link from "next/link";

const footerSections = [
  {
    title: "Our services",
    links: [
      "Daily strolls",
      "Solo journeys",
      "Group adventures",
      "Daytime care",
      "Home check-ins",
      "Overnight stays",
      "Training",
      "Custom solutions",
    ].map((label) => ({ label, href: "/services" })),
  },
  {
    title: "Company info",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "FAQ", href: "/contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-[#080b10] text-[#d8cab8]">
      <div className="mx-auto w-full max-w-6xl px-6 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.25fr_0.75fr_0.75fr_1.15fr]">
          <div>
            <div className="inline-flex items-center gap-3 text-xl font-extrabold text-[#fff7e8]">
              <PawPrint
                aria-hidden="true"
                className="h-6 w-6 fill-[#d1a34d] text-[#d1a34d]"
              />
              Jeroen & Paws
            </div>
            <p className="mt-4 max-w-sm leading-7 text-[#a99b8b]">
              Personalised dog walking, training, day care, boarding, and home
              check-ins where every companion is understood and cared for.
            </p>
            <div className="mt-6 flex gap-3">
              {[Star, Camera, Home].map((Icon, index) => (
                <Link
                  key={index}
                  href="#"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#111821]/10 text-[#fff7e8] transition hover:bg-[#d1a34d]"
                  aria-label="Social profile"
                >
                  <Icon aria-hidden="true" className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-bold text-[#fff7e8]">{section.title}</h3>
              <ul className="mt-4 space-y-3 text-sm">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="hover:text-[#f2ddad]">
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
                  href="tel:+353872473099"
                  className="inline-flex gap-2 hover:text-[#f2ddad]"
                >
                  <Phone className="h-4 w-4" /> +353 87 247 3099
                </Link>
              </li>
              <li>
                <Link
                  href="mailto:Jeroen@jeroenandpaws.com"
                  className="inline-flex gap-2 hover:text-[#f2ddad]"
                >
                  <Mail className="h-4 w-4" /> Jeroen@jeroenandpaws.com
                </Link>
              </li>
              <li className="flex gap-2">
                <MapPin className="h-4 w-4 shrink-0" /> By appointment for your
                companion
              </li>
              <li className="flex gap-2">
                <Clock className="h-4 w-4 shrink-0" /> Mon-Sun 8am-10pm
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-[#988b7b] sm:flex-row sm:items-center sm:justify-between">
          <p>All rights reserved © 2025 Jeroen & Paws</p>
          <div className="flex gap-4">
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
