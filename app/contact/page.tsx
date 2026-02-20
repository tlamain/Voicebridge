import ContactLeadForm from "@/components/ContactLeadForm";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Contact",
  description: "Submit a structured VoiceBridge AAC inquiry for early access, clinical pilots, or caregiver deployment.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="space-y-8 py-12">
      <header className="space-y-3">
        <h1 className="font-[var(--font-jakarta)] text-4xl font-semibold tracking-tight text-slate-900">Contact</h1>
        <p className="max-w-3xl text-lg text-slate-600">
          Share your environment, goals, and rollout timeline. We will follow up with a practical implementation path.
        </p>
      </header>

      <ContactLeadForm />
    </div>
  );
}
