"use client";

import { useEffect } from "react";

export function SectionStack() {
  useEffect(() => {
    const main = document.getElementById("main-content");
    if (!main) return;

    let animationFrame = 0;
    let resizeObserver: ResizeObserver | undefined;
    let mutationObserver: MutationObserver | undefined;

    const getSections = () =>
      Array.from(main.children).filter(
        (child): child is HTMLElement =>
          child instanceof HTMLElement && child.tagName === "SECTION",
      );

    const updateSectionOffsets = () => {
      cancelAnimationFrame(animationFrame);

      animationFrame = requestAnimationFrame(() => {
        const header = document.querySelector<HTMLElement>("header");
        const headerHeight = header?.getBoundingClientRect().height || 0;
        const viewportHeight = window.innerHeight;

        getSections().forEach((section, index) => {
          const sectionHeight = section.getBoundingClientRect().height;
          const stackTop = Math.min(
            headerHeight,
            viewportHeight - sectionHeight,
          );

          section.style.setProperty(
            "--section-stack-top",
            `${Math.round(stackTop)}px`,
          );
          section.style.setProperty("--section-stack-z", String(index + 1));
        });

        main.dataset.sectionStack = "ready";
      });
    };

    updateSectionOffsets();

    if ("ResizeObserver" in window) {
      resizeObserver = new ResizeObserver(updateSectionOffsets);
      getSections().forEach((section) => resizeObserver?.observe(section));

      const header = document.querySelector<HTMLElement>("header");
      if (header) resizeObserver.observe(header);
    }

    if ("MutationObserver" in window) {
      mutationObserver = new MutationObserver(() => {
        getSections().forEach((section) => resizeObserver?.observe(section));
        updateSectionOffsets();
      });
      mutationObserver.observe(main, { childList: true });
    }

    window.addEventListener("resize", updateSectionOffsets);
    window.addEventListener("orientationchange", updateSectionOffsets);

    return () => {
      cancelAnimationFrame(animationFrame);
      resizeObserver?.disconnect();
      mutationObserver?.disconnect();
      window.removeEventListener("resize", updateSectionOffsets);
      window.removeEventListener("orientationchange", updateSectionOffsets);
      delete main.dataset.sectionStack;
    };
  }, []);

  return null;
}
