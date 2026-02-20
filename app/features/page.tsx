import Link from "next/link";
import { deepDiveLinks, featureSections, gridModes, productPillars, smartGrammarHighlights } from "@/content/features";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Feature Overview",
  description:
    "Explore VoiceBridge AAC capabilities across communication engine, grid systems, grammar, voice, admin controls, and portability.",
  path: "/features",
});

export default function FeaturesPage() {
  return (
    <div className="space-y-12 py-12">
      <header className="space-y-3">
        <h1 className="font-[var(--font-jakarta)] text-4xl font-semibold tracking-tight text-slate-900">Feature Overview</h1>
        <p className="max-w-3xl text-lg text-slate-600">
          VoiceBridge AAC combines communication workflows, language support, and clinician controls in a single system.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {productPillars.map((pillar) => (
          <article key={pillar.id} className="surface-card">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-blue-700">{pillar.value}</p>
            <h2 className="mt-2 text-xl font-semibold text-slate-900">{pillar.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{pillar.description}</p>
          </article>
        ))}
      </section>

      <section className="space-y-4">
        <h2 className="section-title text-2xl">Capability Map</h2>
        <div className="grid gap-5 lg:grid-cols-2">
          {featureSections.map((section) => (
            <article key={section.id} className="surface-card p-6">
              <h3 className="text-xl font-semibold text-slate-900">{section.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{section.summary}</p>
              <ul className="mt-3 space-y-1 text-sm text-slate-700">
                {section.highlights.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="section-title text-2xl">Grid Mode Snapshot</h2>
        <div className="grid gap-5 lg:grid-cols-3">
          {gridModes.map((mode) => (
            <article key={mode.id} className="surface-card-muted">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">{mode.bestFor}</p>
              <h3 className="mt-2 text-lg font-semibold text-slate-900">{mode.name}</h3>
              <p className="mt-2 text-sm text-slate-600">{mode.summary}</p>
              <ul className="mt-3 space-y-1 text-sm text-slate-700">
                {mode.includes.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="section-title text-2xl">Smart Grammar Highlights</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {smartGrammarHighlights.map((item) => (
            <article key={item.title} className="surface-card rounded-xl">
              <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="section-title text-2xl">Deep-Dive Pages</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {deepDiveLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="surface-card rounded-xl no-underline transition hover:border-blue-300 hover:shadow-sm"
            >
              <p className="font-semibold text-slate-900">{link.label}</p>
              <p className="mt-1 text-sm text-slate-600">{link.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
