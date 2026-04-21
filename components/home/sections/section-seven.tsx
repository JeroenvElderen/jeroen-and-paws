import Link from "next/link";

import { sectionSeven } from "@/lib/data/homepage-data";

export function SectionSevenContact() {
  return (
    <footer id="contact" className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="premium-section playful-panel relative isolate">
        <div className="playful-waves pointer-events-none absolute inset-x-0 bottom-0 h-24" />
        <div className="playful-ribbons pointer-events-none absolute left-0 top-0 h-24 w-44" />

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <section>
            <h3 className="text-2xl font-extrabold text-[#fff2ff]">Quick Links</h3>
            <ul className="mt-4 space-y-2 text-lg text-[#e4cfff]">
              {sectionSeven.quickLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="transition hover:text-[#c4b5fd]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-2xl font-extrabold text-[#fff2ff]">Social Media</h3>
            <ul className="mt-4 space-y-2 text-lg text-[#e4cfff]">
              {sectionSeven.socialLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="transition hover:text-[#c4b5fd]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-2xl font-extrabold text-[#fff2ff]">Contact Information</h3>
            <ul className="mt-4 space-y-2 text-lg text-[#e4cfff]">
              {sectionSeven.contactLines.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-2xl font-extrabold text-[#fff2ff]">{sectionSeven.newsletterTitle}</h3>
            <p className="mt-4 text-lg leading-relaxed text-[#e4cfff]">{sectionSeven.newsletterBody}</p>
            <button
              type="button"
              className="mt-5 rounded-full bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] px-6 py-3 font-bold text-white"
            >
              Subscribe
            </button>
          </section>
        </div>
      </div>
    </footer>
  );
}
