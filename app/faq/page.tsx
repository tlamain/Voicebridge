import { faqItems } from "@/content/faq";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Frequently Asked Questions",
  description: "Answers to common questions about offline use, privacy, customization, profiles, and backups in VoiceBridge AAC.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <div className="py-12">
      <div className="mx-auto max-w-3xl">
        <header className="mb-10 text-center">
          <h1 className="font-[var(--font-jakarta)] text-4xl font-semibold tracking-tight text-slate-900">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            What teams ask most often before adopting VoiceBridge AAC in home, school, and clinical settings.
          </p>
        </header>

        <div className="space-y-4">
          {faqItems.map((item) => (
            <section key={item.question} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">{item.question}</h2>
              <p className="mt-2 leading-relaxed text-slate-600">{item.answer}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
