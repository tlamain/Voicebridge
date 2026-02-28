import { smartGrammarHighlights } from "@/content/features";
import { smartGrammarAssistLevels, smartGrammarTokenGroups } from "@/content/product-details";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Smart Grammar",
  description: "Understand grammar chip behavior, assist levels, and form selection controls in VoiceBridge AAC.",
  path: "/smart-grammar",
});

export default function SmartGrammarPage() {
  return (
    <div className="space-y-10 py-12">
      <header className="space-y-3">
        <h1 className="font-[var(--font-jakarta)] text-4xl font-semibold tracking-tight text-slate-900">Smart Grammar</h1>
        <p className="max-w-3xl text-lg text-slate-600">
          Grammar support in VoiceBridge is tuned for live communication, with configurable assistance for different user needs.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        {smartGrammarHighlights.map((item) => (
          <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">{item.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{item.description}</p>
          </article>
        ))}
      </section>

      <section className="space-y-4">
        <h2 className="font-[var(--font-jakarta)] text-2xl font-semibold text-slate-900">Token Groups</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {smartGrammarTokenGroups.map((group) => (
            <article key={group.name} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="font-semibold text-slate-900">{group.name}</p>
              <p className="mt-1 text-sm text-slate-600">{group.examples}</p>
              <p className="mt-2 text-sm text-slate-700">{group.value}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-[var(--font-jakarta)] text-2xl font-semibold text-slate-900">Assist Levels</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {smartGrammarAssistLevels.map((level) => (
            <article key={level.level} className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-sm font-semibold uppercase tracking-[0.1em] text-slate-500">{level.level}</p>
              <p className="mt-1 font-semibold text-slate-900">{level.audience}</p>
              <p className="mt-2 text-sm text-slate-600">{level.behavior}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
