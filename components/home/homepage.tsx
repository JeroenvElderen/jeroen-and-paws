import { Navbar } from "@/components/home/navbar";

export function Homepage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <section className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-10">
        <p className="text-lg text-slate-500">Homepage sections coming next, component by component.</p>
      </section>
    </div>
  );
}