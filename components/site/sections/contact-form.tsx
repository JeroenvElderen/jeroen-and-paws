export function ContactForm() {
  return (
    <div className="rounded-3xl bg-slate-950 p-8 shadow-sm ring-1 ring-white/10">
      <h2 className="text-3xl font-extrabold text-white">How can I help?</h2>
      <p className="mt-3 leading-7 text-slate-300">Tell me about your dog and the support you’re looking for.</p>
      <form className="mt-7 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Your name" id="name" placeholder="Your name" />
          <Field label="Dog’s name" id="dog-name" placeholder="Bonnie" />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Your email" id="email" type="email" placeholder="you@example.com" />
          <Field label="Phone" id="phone" type="tel" placeholder="+353872473099" />
        </div>
        <div>
          <label htmlFor="service" className="text-sm font-extrabold text-slate-200">Service interested in</label>
          <select id="service" name="service" defaultValue="" className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-slate-200 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-500/25">
            <option value="" disabled>Select a service</option>
            <option value="daily-strolls">Daily strolls (€18+)</option>
            <option value="home-check-ins">Home check-ins (€18+)</option>
            <option value="training-help">Training help (€35+)</option>
            <option value="solo-journeys">Solo journeys (€70+)</option>
            <option value="group-adventures">Group adventures (€45+)</option>
            <option value="daytime-care">Daytime care (€25+)</option>
            <option value="overnight-stays">Overnight stays (€70/night)</option>
            <option value="custom-solutions">Custom solutions</option>
          </select>
        </div>
        <Textarea label="How can I help?" id="message" placeholder="Tell me about your dog, routine, dates, behaviour notes, or questions..." />
        <button type="submit" className="w-full rounded-full bg-violet-700 px-7 py-3 font-extrabold text-white transition hover:bg-violet-800">Send Message</button>
      </form>
    </div>
  );
}

function Field({ label, id, placeholder, type = "text" }: { label: string; id: string; placeholder: string; type?: string }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-extrabold text-slate-200">{label}</label>
      <input id={id} name={id} type={type} placeholder={placeholder} className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-violet-400 focus:ring-4 focus:ring-violet-500/25" />
    </div>
  );
}

function Textarea({ label, id, placeholder }: { label: string; id: string; placeholder: string }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-extrabold text-slate-200">{label}</label>
      <textarea id={id} name={id} placeholder={placeholder} className="mt-2 min-h-28 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-violet-400 focus:ring-4 focus:ring-violet-500/25" />
    </div>
  );
}
