import Link from "next/link";

import { Header } from "@/components/home/header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const trustHighlights = [
  { label: "Google rating", value: "5.0" },
  { label: "Personal updates", value: "Daily" },
  { label: "Care style", value: "Boutique" },
];

const services = [
  {
    title: "Luxury Daycare",
    description:
      "Small-group days with guided walks, enrichment, and calm rest in a structured routine.",
  },
  {
    title: "Boutique Boarding",
    description:
      "Overnight stays in a home-like setting with personalized schedules and evening wind-downs.",
  },
  {
    title: "Private Walks & Training",
    description:
      "Focused one-to-one sessions to build confidence, behavior consistency, and joyful movement.",
  },
];

const steps = [
  "Book a complimentary meet & greet.",
  "Share your dog profile and preferences.",
  "Receive your custom care plan and schedule.",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f5efe3] text-stone-900">
      <Header />

      <section className="relative overflow-hidden px-6 pb-20 pt-16 sm:px-10 lg:px-12">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(130deg,rgba(15,23,42,0.98),rgba(41,27,10,0.88))]" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(800px_320px_at_10%_0%,rgba(216,175,95,0.35),transparent),radial-gradient(900px_350px_at_100%_20%,rgba(131,167,138,0.24),transparent)]" />

        <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-200/90">
              Jeroen &amp; Paws · Premium Dog Care
            </p>
            <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
              One luxury design.
              <span className="block text-amber-200">Tailored care for every dog.</span>
            </h1>
            <p className="max-w-2xl text-lg text-stone-200">
              A refined care experience that combines professional structure, personalized routines,
              and daily peace of mind for owners.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="border border-amber-100/30 bg-gradient-to-r from-slate-900 to-slate-700 px-5 text-white hover:brightness-110"
              >
                <Link href="/services">Book meet &amp; greet</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/40 bg-white/5 px-5 text-stone-100 hover:bg-white/15 hover:text-white"
              >
                <Link href="/services">Explore services</Link>
              </Button>
            </div>
          </div>

          <Card className="bg-[#fff8eb]">
            <CardHeader>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
                Boutique standards
              </p>
              <CardTitle className="mt-2 text-2xl">Trusted by modern pet parents</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {trustHighlights.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-amber-100 bg-white/90 p-4 shadow-sm"
                >
                  <p className="text-sm font-semibold uppercase tracking-wide text-amber-700">{item.value}</p>
                  <p className="mt-1 text-stone-700">{item.label}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-10 lg:px-12">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">Signature services</p>
          <h2 className="mt-3 text-3xl font-semibold">Premium care, intentionally delivered</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {services.map((service) => (
            <Card key={service.title} className="bg-[#fffaf0]">
              <CardHeader>
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-20 sm:px-10 lg:px-12">
        <Card className="border-amber-200/70 bg-gradient-to-b from-[#fbf5e9] to-[#f3e9d8]">
          <CardHeader>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">How it works</p>
            <CardTitle className="mt-2 text-3xl">Simple booking, luxury execution</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="grid gap-4 md:grid-cols-3">
              {steps.map((step, index) => (
                <li key={step} className="rounded-2xl border border-amber-100 bg-white/90 p-5">
                  <p className="text-sm font-semibold text-amber-700">Step {index + 1}</p>
                  <p className="mt-2 text-stone-700">{step}</p>
                </li>
              ))}
            </ol>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="border border-amber-100/40 bg-gradient-to-r from-slate-900 to-slate-700 px-5 text-white hover:brightness-110"
              >
                <Link href="/services">Reserve now</Link>
              </Button>
              <Button asChild size="lg" variant="ghost" className="px-5 text-stone-700 hover:bg-amber-100/60">
                <Link href="/model-improvements">View care standards</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
