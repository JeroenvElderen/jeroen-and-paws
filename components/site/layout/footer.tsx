import { Camera, Clock, Home, Mail, MapPin, PawPrint, Phone, Star } from "lucide-react";
import Link from "next/link";

const footerSections = [
  { title: "Services", links: ["Dog Walking", "Drop-In Visits", "Overnight Stays", "Puppy Packages", "Cat Care"].map((label) => ({ label, href: "/services" })) },
  { title: "Company", links: [{ label: "Our Story", href: "/about" }, { label: "Meet the Team", href: "/about" }, { label: "Contact Us", href: "/contact" }, { label: "FAQ", href: "/contact" }] },
];

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="mx-auto w-full max-w-6xl px-6 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.25fr_0.75fr_0.75fr_1.15fr]">
          <div>
            <div className="inline-flex items-center gap-3 text-xl font-extrabold text-white">
              <PawPrint aria-hidden="true" className="h-6 w-6 fill-purple-400 text-purple-400" />
              Jeroen & Paws
            </div>
            <p className="mt-4 max-w-sm leading-7 text-slate-400">Professional dog walking and pet sitting in your area. Insured, bonded, and committed to giving your pet the care they deserve.</p>
            <div className="mt-6 flex gap-3">
              {[Star, Camera, Home].map((Icon, index) => (
                <Link key={index} href="#" className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-purple-600" aria-label="Social profile">
                  <Icon aria-hidden="true" className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-bold text-white">{section.title}</h3>
              <ul className="mt-4 space-y-3 text-sm">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="hover:text-purple-300">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="font-bold text-white">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li><Link href="tel:+13035551234" className="inline-flex gap-2 hover:text-purple-300"><Phone className="h-4 w-4" /> (303) 555-1234</Link></li>
              <li><Link href="mailto:hello@jeroenandpaws.com" className="inline-flex gap-2 hover:text-purple-300"><Mail className="h-4 w-4" /> hello@jeroenandpaws.com</Link></li>
              <li className="flex gap-2"><MapPin className="h-4 w-4 shrink-0" /> By appointment in your area</li>
              <li className="flex gap-2"><Clock className="h-4 w-4 shrink-0" /> Mon-Sun 7am-7pm</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Jeroen & Paws. All rights reserved.</p>
          <div className="flex gap-4"><Link href="#">Privacy Policy</Link><Link href="#">Terms of Service</Link></div>
        </div>
      </div>
    </footer>
  );
}
