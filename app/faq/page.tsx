import { faqItems } from "@/content/faq";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Frequently Asked Questions",
  description:
    "Detailed answers to common VoiceBridge AAC questions about communication modes, grammar, voice, admin controls, and data handling.",
  path: "/faq",
});

const faqCategories = ["Communication", "Grammar", "Voice", "Admin", "Data"] as const;

export default function FaqPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <div className="py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="mx-auto max-w-5xl space-y-8">
        <header className="space-y-3 text-center">
          <h1 className="font-[var(--font-jakarta)] text-4xl font-semibold tracking-tight text-slate-900">
            Frequently Asked Questions
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-slate-600">
            Answers to the most common operational questions from caregivers, SLPs, and implementation teams.
          </p>
        </header>

        {faqCategories.map((category) => (
          <section key={category} className="space-y-4">
            <h2 className="font-[var(--font-jakarta)] text-2xl font-semibold text-slate-900">{category}</h2>
            <div className="space-y-3">
              {faqItems
                .filter((item) => item.category === category)
                .map((item) => (
                  <article key={item.question} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                    <h3 className="text-lg font-semibold text-slate-900">{item.question}</h3>
                    <p className="mt-2 leading-relaxed text-slate-600">{item.answer}</p>
                  </article>
                ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
