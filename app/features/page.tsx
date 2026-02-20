import { gridModes, productPillars, smartGrammarHighlights } from "@/content/features";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Feature Overview",
  description:
    "Explore VoiceBridge AAC capabilities across communication modes, grammar guidance, voice output, progression, and clinical admin workflows.",
  path: "/features",
});

export default function FeaturesPage() {
  return (
    <div className="space-y-10 py-12">
      <header className="space-y-3">
        <h1 className="font-[var(--font-jakarta)] text-4xl font-semibold tracking-tight text-slate-900">Feature Overview</h1>
        <p className="max-w-3xl text-lg text-slate-600">
          VoiceBridge AAC combines communication workflows, language support, and clinical controls in one platform.
        </p>
      </header>

      <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {productPillars.map((pillar) => (
          <article key={pillar.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-blue-700">{pillar.value}</p>
            <h2 className="mt-2 font-[var(--font-jakarta)] text-xl font-semibold text-slate-900">{pillar.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{pillar.description}</p>
          </article>
        ))}
      </section>

      <section className="space-y-4">
        <h2 className="font-[var(--font-jakarta)] text-2xl font-semibold text-slate-900">Grid Modes</h2>
        <div className="grid gap-5 md:grid-cols-3">
          {gridModes.map((mode) => (
            <article key={mode.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">{mode.bestFor}</p>
              <h3 className="mt-2 text-lg font-semibold text-slate-900">{mode.name}</h3>
              <p className="mt-2 text-sm text-slate-600">{mode.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-[var(--font-jakarta)] text-2xl font-semibold text-slate-900">Smart Grammar Highlights</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {smartGrammarHighlights.map((item) => (
            <article key={item.title} className="rounded-xl border border-slate-200 bg-white p-5">
              <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{item.description}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
