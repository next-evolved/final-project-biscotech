import HeroBanner from "@/components/HeroBanner";
import ContactHeader from "@/components/ContactHeader";
import { submitContact } from "@/app/(server-actions)/contact";


export default function Home() {
  return (
    <div className="space-y-10">
      <HeroBanner />

      <section className="max-w-2xl mx-auto">
        <ContactHeader />

        <form action={submitContact} className="grid gap-3">
          <input
            name="name"
            placeholder="Your name"
            className="border rounded p-3"
            required
          />
          <input
            name="email"
            placeholder="Your email"
            type="email"
            className="border rounded p-3"
            required
          />
          <textarea
            name="message"
            placeholder="Your message"
            rows={6}
            className="border rounded p-3"
            required
          />
          <button className="mt-1 h-11 rounded bg-neutral-900 text-white font-medium">
            Send
          </button>
        </form>
      </section>
    </div>
  );
}
