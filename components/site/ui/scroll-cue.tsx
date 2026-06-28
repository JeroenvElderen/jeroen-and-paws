"use client";

import { ArrowDown } from "lucide-react";
import { useEffect, useState } from "react";

export function ScrollCue() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const hasMoreToScroll = scrollableHeight > 80;
      const isNearBottom = window.scrollY >= scrollableHeight - 120;

      setIsVisible(hasMoreToScroll && !isNearBottom);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);

    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, []);

  return (
    <div
      className={`pointer-events-none fixed bottom-28 left-1/2 md:bottom-6 z-30 -translate-x-1/2 transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`}
      aria-hidden="true"
    >
      <div className="scroll-cue-bounce grid size-12 place-items-center rounded-full border border-[#c4b5fd]/35 bg-[#080b10]/75 text-[#c4b5fd] shadow-lg shadow-black/25 backdrop-blur">
        <ArrowDown className="size-6" strokeWidth={2.75} />
      </div>
    </div>
  );
}