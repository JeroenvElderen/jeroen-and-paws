import Link from "next/link";

import { Header } from "@/components/home/header";
import { Button } from "@/components/ui/button";

import styles from "./page.module.css";

const trustHighlights = [
  { label: "Happy dogs cared for", value: "100+" },
  { label: "Flexible service options", value: "27" },
  { label: "Local, personal support", value: "1:1" },
];

const valuePoints = [
  {
    title: "Personal care plans",
    description:
      "Every companion gets a routine based on energy level, social comfort, and home preferences.",
  },
  {
    title: "Reliable updates",
    description:
      "You get simple, clear updates after visits so you always know how your dog is doing.",
  },
  {
    title: "Calm-first approach",
    description:
      "Walks, training, and stays are paced to reduce stress and build confidence over time.",
  },
];

const steps = [
  "Choose the service that fits your routine.",
  "Share your dog profile and preferences.",
  "Confirm booking and receive care updates.",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-stone-50 text-stone-900">
      <Header />

      <section className={`${styles.hero} px-6 py-20 sm:px-10 lg:px-12`}>
        <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-amber-700">
              Trusted local dog care
            </p>
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
              A dependable, caring home for your dog&apos;s daily routine.
            </h1>
            <p className="max-w-2xl text-lg text-stone-600">
              From regular strolls to overnight support and training, Jeroen &amp;
              Paws delivers calm, structured care designed around your dog.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className={styles.primaryCta}>
                <Link href="/services">Browse services</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/model-improvements">View care approach</Link>
              </Button>
            </div>
          </div>

          <aside className={`${styles.heroCard} rounded-3xl p-6 sm:p-8`}>
            <h2 className="text-lg font-semibold text-stone-900">At a glance</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {trustHighlights.map((item) => (
                <article key={item.label} className="rounded-2xl bg-white/85 p-4">
                  <p className="text-2xl font-semibold text-stone-900">{item.value}</p>
                  <p className="text-sm text-stone-600">{item.label}</p>
                </article>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-14 sm:px-10 lg:px-12">
        <div className="mb-8">
          <h2 className="text-3xl font-semibold">Why clients choose Jeroen &amp; Paws</h2>
          <p className="mt-3 max-w-3xl text-stone-600">
            Built for owners who want professional structure with genuinely personal care.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {valuePoints.map((point) => (
            <article
              key={point.title}
              className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold">{point.title}</h3>
              <p className="mt-3 leading-7 text-stone-600">{point.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-16 sm:px-10 lg:px-12">
        <div className={`${styles.processSection} rounded-3xl p-6 sm:p-8`}>
          <h2 className="text-3xl font-semibold">How it works</h2>
          <ol className="mt-6 grid gap-4 md:grid-cols-3">
            {steps.map((step, index) => (
              <li key={step} className="rounded-2xl border border-stone-200 bg-white p-5">
                <p className="text-sm font-semibold text-amber-700">Step {index + 1}</p>
                <p className="mt-2 text-stone-700">{step}</p>
              </li>
            ))}
          </ol>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className={styles.primaryCta}>
              <Link href="/services">Book a service</Link>
            </Button>
            <Button asChild size="lg" variant="ghost">
              <Link href="/model-improvements">Read more</Link>
            </Button>
          </div>
        </div>
        </section>
    </main>
  );
}
