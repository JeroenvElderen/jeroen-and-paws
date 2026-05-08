export function ContactForm() {
  return (
    <div className="rounded-3xl bg-[#111821] p-8 shadow-sm ring-1 ring-white/10">
      <h2 className="text-3xl font-extrabold text-[#fff7e8]">
        Book a Free Meet &amp; Greet
      </h2>
      <form className="mt-7 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Your Name" id="name" placeholder="Jane Doe" />
          <Field label="Pet's Name" id="pet-name" placeholder="Kaiser" />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label="Email"
            id="email"
            type="email"
            placeholder="jane@example.com"
          />
          <Field
            label="Phone"
            id="phone"
            type="tel"
            placeholder="+353 87 247 3099"
          />
        </div>
        <div>
          <label
            htmlFor="service"
            className="text-sm font-extrabold text-[#d8cab8]"
          >
            Service Interested In
          </label>
          <select
            id="service"
            name="service"
            defaultValue=""
            className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0b1017] px-4 py-3 text-[#d8cab8] outline-none transition focus:border-[#8b5cf6] focus:ring-4 focus:ring-[#8b5cf6]/20"
          >
            <option value="" disabled>
              Select a service
            </option>
            <option value="daily-strolls">Daily strolls (from €18)</option>
            <option value="home-check-ins">Home check-ins (from €18)</option>
            <option value="overnight">Overnight stays (from €70/night)</option>
            <option value="daytime-care">Daytime care (from €25)</option>
            <option value="training">Training help (from €35)</option>
            <option value="other">Not sure yet</option>
          </select>
        </div>
        <Textarea
          label="Tell Us About Your Pet"
          id="pet-info"
          placeholder="Pet name, breed, age, any special needs or behavioral notes..."
        />
        <Textarea
          label="Anything Else?"
          id="message"
          placeholder="Questions, scheduling preferences, routines..."
        />
        <button
          type="submit"
          className="w-full rounded-full bg-[#8b5cf6] px-7 py-3 font-extrabold text-[#080b10] transition hover:bg-[#a78bfa]"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}

function Field({
  label,
  id,
  placeholder,
  type = "text",
}: {
  label: string;
  id: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-extrabold text-[#d8cab8]">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0b1017] px-4 py-3 text-[#d8cab8] outline-none transition placeholder:text-[#7f7366] focus:border-[#8b5cf6] focus:ring-4 focus:ring-[#8b5cf6]/20"
      />
    </div>
  );
}

function Textarea({
  label,
  id,
  placeholder,
}: {
  label: string;
  id: string;
  placeholder: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-extrabold text-[#d8cab8]">
        {label}
      </label>
      <textarea
        id={id}
        name={id}
        placeholder={placeholder}
        className="mt-2 min-h-28 w-full rounded-2xl border border-white/10 bg-[#0b1017] px-4 py-3 text-[#d8cab8] outline-none transition placeholder:text-[#7f7366] focus:border-[#8b5cf6] focus:ring-4 focus:ring-[#8b5cf6]/20"
      />
    </div>
  );
}
