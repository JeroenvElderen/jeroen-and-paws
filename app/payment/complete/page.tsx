import { CheckCircle2, Clock3, ExternalLink, Mail, PawPrint } from "lucide-react";
import Link from "next/link";

import { businessInfo } from "@/components/site/data";
import { SiteShell } from "@/components/site/layout/site-shell";
import { buildPageMetadata } from "@/components/site/seo";

export const metadata = buildPageMetadata({
  title: "Payment Complete",
  description:
    "Thank you for your Jeroen & Paws payment. Your booking or invoice payment has been received and will be confirmed shortly.",
  path: "/payment/complete",
  keywords: ["Jeroen and Paws payment", "dog care payment complete", "Revolut payment complete"],
});

type PaymentCompletePageProps = {
  searchParams?: Promise<{
    status?: string | string[];
    order_id?: string | string[];
    merchant_order_ext_ref?: string | string[];
  }>;
};

function getSearchValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function PaymentCompletePage({ searchParams }: PaymentCompletePageProps) {
  const params = await searchParams;
  const status = getSearchValue(params?.status);
  const orderId = getSearchValue(params?.order_id);
  const reference = getSearchValue(params?.merchant_order_ext_ref);
  const paymentLabel = reference || orderId;

  return (
    <SiteShell activePage="portal">
      <section className="relative isolate overflow-hidden bg-[#080b10] px-5 py-16 text-[#fff7e8] sm:px-8 sm:py-24">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.34),transparent_34rem),radial-gradient(circle_at_bottom_right,rgba(234,217,184,0.16),transparent_30rem)]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-[#160f25] to-transparent" />

        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-3 rounded-full border border-[#a78bfa]/35 bg-[#171f2a]/80 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-[#ddd6fe]">
              <CheckCircle2 className="size-4" aria-hidden="true" />
              Payment complete
            </div>
            <h1 className="mt-7 max-w-3xl text-4xl font-semibold leading-tight tracking-[-0.04em] text-[#fff7e8] sm:text-6xl lg:text-7xl">
              Thank you — your payment is being wrapped up.
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-[#f3ead9] sm:text-lg">
              Revolut has returned you to Jeroen & Paws. I&apos;ll match the payment
              to your invoice or booking and update your portal as soon as the
              secure payment notification arrives.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/portal"
                className="inline-flex items-center justify-center rounded-full bg-[#a78bfa] px-6 py-3 text-sm font-black uppercase tracking-[0.16em] text-[#080b10] transition hover:bg-[#ddd6fe]"
              >
                Go to portal
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-[#a78bfa]/35 px-6 py-3 text-sm font-black uppercase tracking-[0.16em] text-[#fff7e8] transition hover:border-[#ddd6fe] hover:text-[#ddd6fe]"
              >
                Contact Jeroen
              </Link>
            </div>
          </div>

          <aside className="rounded-[2rem] border border-[#a78bfa]/25 bg-[#111821]/90 p-6 shadow-2xl shadow-black/30 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="grid size-14 shrink-0 place-items-center rounded-full bg-[#a78bfa] text-[#080b10]">
                <PawPrint className="size-7" aria-hidden="true" />
              </div>
              <div>
                <h2 className="font-serif text-2xl text-[#fff7e8]">What happens next?</h2>
                <p className="mt-2 text-sm leading-6 text-[#d8cbbb]">
                  Payment statuses are confirmed by Revolut automatically, so
                  there can be a short delay before the invoice shows as paid.
                </p>
              </div>
            </div>

            <dl className="mt-8 space-y-5 text-sm">
              <div className="rounded-2xl bg-[#080b10]/70 p-4">
                <dt className="flex items-center gap-2 font-bold text-[#ddd6fe]">
                  <Clock3 className="size-4" aria-hidden="true" />
                  Status
                </dt>
                <dd className="mt-2 text-[#fff7e8]">{status ? status.replaceAll("_", " ") : "Awaiting confirmation"}</dd>
              </div>
              {paymentLabel ? (
                <div className="rounded-2xl bg-[#080b10]/70 p-4">
                  <dt className="font-bold text-[#ddd6fe]">Payment reference</dt>
                  <dd className="mt-2 break-all text-[#fff7e8]">{paymentLabel}</dd>
                </div>
              ) : null}
              <div className="rounded-2xl bg-[#080b10]/70 p-4">
                <dt className="flex items-center gap-2 font-bold text-[#ddd6fe]">
                  <Mail className="size-4" aria-hidden="true" />
                  Need help?
                </dt>
                <dd className="mt-2 text-[#fff7e8]">
                  Email {businessInfo.email} if anything looks wrong.
                </dd>
              </div>
            </dl>

            <a
              href="https://www.revolut.com/legal/terms/"
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#a78bfa] hover:text-[#ddd6fe]"
            >
              Revolut terms
              <ExternalLink className="size-3.5" aria-hidden="true" />
            </a>
          </aside>
        </div>
      </section>
    </SiteShell>
  );
}
