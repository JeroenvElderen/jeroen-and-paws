import { MessageCircleHeart, Phone } from "lucide-react";
import Link from "next/link";

import { businessInfo } from "@/components/site/data";

export function MobileBookingBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#8b5cf6]/20 bg-[#080b10]/95 px-4 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-3 shadow-[0_-16px_40px_rgba(0,0,0,0.32)] backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-md items-center gap-2">
        <Link
          href="/contact"
          className="motion-button flex min-h-12 flex-1 items-center justify-center rounded-full bg-[#8b5cf6] px-4 text-center text-sm font-black text-[#080b10] shadow-lg shadow-black/25"
        >
          Book Meet &amp; Greet
        </Link>
        <Link
          href={`https://wa.me/${businessInfo.whatsappNumber}`}
          className="grid min-h-12 min-w-12 place-items-center rounded-full border border-[#8b5cf6]/30 bg-[#111821] text-[#c4b5fd]"
          aria-label="Message Jeroen & Paws on WhatsApp"
        >
          <MessageCircleHeart aria-hidden="true" className="size-5" />
        </Link>
        <Link
          href={`tel:${businessInfo.phoneHref}`}
          className="grid min-h-12 min-w-12 place-items-center rounded-full border border-[#8b5cf6]/30 bg-[#111821] text-[#c4b5fd]"
          aria-label="Call Jeroen & Paws"
        >
          <Phone aria-hidden="true" className="size-5" />
        </Link>
      </div>
      <p className="mt-1 text-center text-[0.68rem] font-semibold text-[#988b7b]">
        {businessInfo.responseTime}
      </p>
    </div>
  );
}
