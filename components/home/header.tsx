import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/20 bg-[#3b1f71]/85 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 sm:px-10 lg:px-12">
        <Link href="/" className="text-base font-semibold tracking-[0.08em] text-[#fff0ff]">
          PetPals
        </Link>
        <nav className="flex items-center gap-5 text-sm text-[#f1d8ff]">
          <Link href="/#about" className="transition hover:text-[#c8a7ff]">
            About
          </Link>
          <Link href="/services" className="transition hover:text-[#c8a7ff]">
            Services
          </Link>
          <Link href="/shop" className="transition hover:text-[#c8a7ff]">
            Shop
          </Link>
          <Link href="/#contact" className="transition hover:text-[#c8a7ff]">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
