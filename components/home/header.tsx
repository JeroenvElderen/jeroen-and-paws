import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-stone-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 sm:px-10 lg:px-12">
        <Link href="/" className="text-base font-semibold tracking-wide text-stone-900">
          Jeroen &amp; Paws
        </Link>
        <nav className="flex items-center gap-5 text-sm text-stone-600">
          <Link href="/services" className="hover:text-stone-900">
            Services
          </Link>
          <Link href="/model-improvements" className="hover:text-stone-900">
            Data Model
          </Link>
        </nav>
      </div>
    </header>
  );
}