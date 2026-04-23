import { PawPrint } from "lucide-react";

const navItems = ["Home", "About", "Services", "Contact"];

export function Navbar() {
  return (
    <header className="border-b border-black/5 bg-[#efefef]">
      <div className="mx-auto flex h-[74px] w-full max-w-6xl items-center justify-between px-6 sm:px-10">
        <a href="#" className="inline-flex items-center gap-2.5 text-[#188a45]" aria-label="Happy Trails home">
          <PawPrint className="h-4 w-4 fill-current" />
          <span className="text-[22px] font-bold leading-[0.95] tracking-tight">Happy Trails</span>
        </a>

        <nav aria-label="Main navigation">
          <ul className="flex items-center gap-5">
            {navItems.map((item, index) => (
              <li key={item}>
                <a
                  href="#"
                  className={
                    index === 0
                      ? "inline-flex rounded-full bg-[#bfe5c7] px-8 py-2.5 text-[20px] font-semibold text-[#1d7f47]"
                      : "inline-flex rounded-full px-2 py-2 text-[20px] font-semibold text-[#475569] transition hover:text-[#1f7e47]"
                  }
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href="#"
          className="inline-flex rounded-full bg-[#188a45] px-8 py-3 text-[20px] font-bold text-white shadow-sm transition hover:bg-[#14763b]"
        >
          Book a Walk
        </a>
      </div>
    </header>
  );
}