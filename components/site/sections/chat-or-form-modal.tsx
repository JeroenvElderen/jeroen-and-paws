"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

export type BookingService = {
  title: string;
  description: string;
  price: string;
  unit: string;
  features: string[];
  chatUrl: string;
  formUrl: string;
};

type ChatOrFormModalProps = {
  service: BookingService;
  onClose: () => void;
};

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

export function ChatOrFormModal({ service, onClose }: ChatOrFormModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedElement = useRef<Element | null>(null);

  useEffect(() => {
    previouslyFocusedElement.current = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusableElements = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(focusableSelector),
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (!firstElement || !lastElement) return;

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;

      if (previouslyFocusedElement.current instanceof HTMLElement) {
        previouslyFocusedElement.current.focus();
      }
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#080b10]/85 px-5 py-8 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-choice-heading"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        className="relative w-full max-w-xl rounded-3xl bg-[#111821] p-8 shadow-2xl ring-1 ring-[#8b5cf6]/40"
      >
        <button
          ref={closeButtonRef}
          className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-2xl font-bold text-[#d8cab8] transition hover:border-[#8b5cf6] hover:text-[#fff7e8]"
          aria-label="Close booking options"
          onClick={onClose}
          type="button"
        >
          ×
        </button>
        <div className="pr-8">
          <p className="text-sm font-extrabold uppercase tracking-[0.25em] text-[#a78bfa]">
            Book this service
          </p>
          <h3
            id="booking-choice-heading"
            className="mt-3 text-3xl font-extrabold text-[#fff7e8]"
          >
            {service.title}
          </h3>
          <p className="mt-3 leading-7 text-[#b9aa99]">
            Choose WhatsApp for a quick chat or use the request form with this
            card’s details already filled in.
          </p>
        </div>

        <div className="mt-6 rounded-2xl bg-[#0b1017] p-5 ring-1 ring-white/10">
          <p className="text-2xl font-extrabold text-[#8b5cf6]">
            {service.price}
            {service.unit ? (
              <span className="text-sm font-bold text-[#988b7b]">
                {" "}
                {service.unit}
              </span>
            ) : null}
          </p>
          <p className="mt-2 leading-7 text-[#d8cab8]">{service.description}</p>
        </div>

        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          <Link
            className="inline-flex items-center justify-center rounded-full bg-[#8b5cf6] px-7 py-3 text-center font-extrabold text-[#080b10] transition hover:-translate-y-0.5 hover:bg-[#a78bfa]"
            href={service.chatUrl}
            onClick={onClose}
            target="_blank"
            rel="noreferrer"
          >
            Chat on WhatsApp
          </Link>
          <Link
            className="inline-flex items-center justify-center rounded-full border-2 border-[#8b5cf6] px-7 py-3 text-center font-extrabold text-[#c4b5fd] transition hover:-translate-y-0.5 hover:bg-[#1f1738]"
            href={service.formUrl}
            onClick={onClose}
          >
            Use request form
          </Link>
        </div>
        <p className="mt-5 text-sm leading-6 text-[#988b7b]">
          Need a different channel? Let us know in your message — we’ll
          accommodate where possible.
        </p>
      </div>
    </div>
  );
}
