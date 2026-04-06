import Link from "next/link";
import { gridModes } from "@/content/features";
import { createPageMetadata } from "@/lib/metadata";
import AppScreenshot from "@/components/AppScreenshot";
import { localizeHref, type Locale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return createPageMetadata({
    title: "Grid Modes",
    description: "Compare Standard Grid, Activity Boards, and Core-Fringe communication models in VoiceBridge AAC.",
    path: "/grid-modes",
    locale: locale as Locale,
  });
}

export default async function GridModesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = locale as Locale;

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

      {/* Screenshots */}
      <section className="grid gap-6 md:grid-cols-3">
        <div className="space-y-3">
          <AppScreenshot
            src="/images/screenshots/core-fringe-grid.png"
            label="Core-Fringe Grid"
            description="Core-fringe layout with pinned vocabulary"
            aspectRatio="landscape"
            size="full"
          />
          <p className="text-sm font-medium text-slate-700 text-center">Core-Fringe Grid</p>
        </div>
        <div className="space-y-3">
          <AppScreenshot
            src="/images/screenshots/activity-board-grid.png"
            label="Activity Board"
            description="Activity board with themed category buttons"
            aspectRatio="landscape"
            size="full"
          />
          <p className="text-sm font-medium text-slate-700 text-center">Activity Board</p>
        </div>
        <div className="space-y-3">
          <AppScreenshot
            src="/images/screenshots/text-mode.png"
            label="Text Mode"
            description="Text communication with phrases and shortcuts"
            aspectRatio="landscape"
            size="full"
          />
          <p className="text-sm font-medium text-slate-700 text-center">Text Mode</p>
        </div>
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
            <Link href={localizeHref("/activity-boards", l)} className="mt-2 inline-block text-sm font-medium text-indigo-600 no-underline hover:text-indigo-800">Learn more &rarr;</Link>
          </article>
          <article className="rounded-xl bg-white p-4">
            <p className="font-semibold text-slate-900">Use Core-Fringe for depth</p>
            <p className="mt-1 text-sm text-slate-600">Best when core words must stay fixed while fringe vocabulary expands.</p>
            <Link href={localizeHref("/core-fringe", l)} className="mt-2 inline-block text-sm font-medium text-indigo-600 no-underline hover:text-indigo-800">Learn more &rarr;</Link>
          </article>
        </div>
      </section>
    </div>
  );
}
