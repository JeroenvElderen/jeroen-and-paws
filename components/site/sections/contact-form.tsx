export function ContactForm() {
  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
      <h2 className="text-3xl font-extrabold text-slate-950">Book a Free Meet &amp; Greet</h2>
      <form className="mt-7 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Your Name" id="name" placeholder="Jane Doe" />
          <Field label="Pet's Name" id="pet-name" placeholder="Milo" />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Email" id="email" type="email" placeholder="jane@example.com" />
          <Field label="Phone" id="phone" type="tel" placeholder="(303) 555-1234" />
        </div>
        <div>
          <label htmlFor="service" className="text-sm font-extrabold text-slate-700">Service Interested In</label>
          <select id="service" name="service" defaultValue="" className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-700 outline-none transition focus:border-emerald-700 focus:ring-4 focus:ring-emerald-100">
            <option value="" disabled>Select a service</option>
            <option value="dog-walk">Dog Walking ($22+)</option>
            <option value="drop-in">Drop-In Visit ($25)</option>
            <option value="overnight">Overnight Stay ($65/night)</option>
            <option value="puppy">Puppy Package ($30)</option>
            <option value="cat-care">Cat Care Visit ($20)</option>
            <option value="other">Not sure yet</option>
          </select>
        </div>
        <Textarea label="Tell Us About Your Pet" id="pet-info" placeholder="Pet name, breed, age, any special needs or behavioral notes..." />
        <Textarea label="Anything Else?" id="message" placeholder="Questions, scheduling preferences, neighborhood..." />
        <button type="submit" className="w-full rounded-full bg-emerald-700 px-7 py-3 font-extrabold text-white transition hover:bg-emerald-800">Send Message</button>
      </form>
    </div>
  );
}

function Field({ label, id, placeholder, type = "text" }: { label: string; id: string; placeholder: string; type?: string }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-extrabold text-slate-700">{label}</label>
      <input id={id} name={id} type={type} placeholder={placeholder} className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-700 focus:ring-4 focus:ring-emerald-100" />
    </div>
  );
}

function Textarea({ label, id, placeholder }: { label: string; id: string; placeholder: string }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-extrabold text-slate-700">{label}</label>
      <textarea id={id} name={id} placeholder={placeholder} className="mt-2 min-h-28 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-700 focus:ring-4 focus:ring-emerald-100" />
    </div>
  );
}
