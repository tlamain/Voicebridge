import Link from "next/link";
import { gridModes } from "@/content/features";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Grid Modes",
  description: "Compare Standard Grid, Activity Boards, and Core-Fringe communication models in VoiceBridge AAC.",
  path: "/grid-modes",
});

export default function GridModesPage() {
  return (
    <div className="space-y-10 py-12">
      <header className="space-y-3">
        <h1 className="font-[var(--font-jakarta)] text-4xl font-semibold tracking-tight text-slate-900">Grid Modes</h1>
        <p className="max-w-3xl text-lg text-slate-600">
          VoiceBridge AAC supports three grid models so teams can match communication structure to user context.
        </p>
      </header>

      <section className="grid gap-5 lg:grid-cols-3">
        {gridModes.map((mode) => (
          <article key={mode.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">{mode.bestFor}</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">{mode.name}</h2>
            <p className="mt-2 text-sm text-slate-600">{mode.summary}</p>
            <p className="mt-2 text-sm text-slate-700">{mode.details}</p>
            <ul className="mt-4 space-y-1 text-sm text-slate-700">
              {mode.includes.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
        <h2 className="font-[var(--font-jakarta)] text-2xl font-semibold text-slate-900">Selection Guidance</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <article className="rounded-xl bg-white p-4">
            <p className="font-semibold text-slate-900">Start with Standard Grid</p>
            <p className="mt-1 text-sm text-slate-600">Best baseline for broad vocabulary and familiar category browsing.</p>
          </article>
          <article className="rounded-xl bg-white p-4">
            <p className="font-semibold text-slate-900">Use Activity Boards for routines</p>
            <p className="mt-1 text-sm text-slate-600">Best when communication is task or environment specific.</p>
            <Link href="/activity-boards" className="mt-2 inline-block text-sm font-medium text-indigo-600 no-underline hover:text-indigo-800">Learn more &rarr;</Link>
          </article>
          <article className="rounded-xl bg-white p-4">
            <p className="font-semibold text-slate-900">Use Core-Fringe for depth</p>
            <p className="mt-1 text-sm text-slate-600">Best when core words must stay fixed while fringe vocabulary expands.</p>
            <Link href="/core-fringe" className="mt-2 inline-block text-sm font-medium text-indigo-600 no-underline hover:text-indigo-800">Learn more &rarr;</Link>
          </article>
        </div>
      </section>
    </div>
  );
}
