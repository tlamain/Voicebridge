import Link from "next/link";
import { gridModeIds } from "@/content/features";
import { createPageMetadata } from "@/lib/metadata";
import AppScreenshot from "@/components/AppScreenshot";
import { getNamespace, localizeHref, type Locale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = getNamespace(locale as Locale, "grid-modes");
  return createPageMetadata({
    title: t.meta.title,
    description: t.meta.description,
    path: "/grid-modes",
    locale: locale as Locale,
  });
}

export default async function GridModesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = locale as Locale;
  const t = getNamespace(l, "grid-modes");

  return (
    <div className="space-y-10 py-12">
      <header className="space-y-3">
        <h1 className="font-[var(--font-jakarta)] text-4xl font-semibold tracking-tight text-slate-900">{t.hero.title}</h1>
        <p className="max-w-3xl text-lg text-slate-600">
          {t.hero.description}
        </p>
      </header>

      <section className="grid gap-5 lg:grid-cols-3">
        {gridModeIds.map((modeId) => {
          const mode = t.modes.find((item) => item.id === modeId);
          if (!mode) return null;

          return (
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
          );
        })}
      </section>

      {/* Screenshots */}
      <section className="grid gap-6 md:grid-cols-3">
        <div className="space-y-3">
          <AppScreenshot
            src="/images/screenshots/core-fringe-grid.png"
            label={t.screenshots[0].label}
            description={t.screenshots[0].description}
            aspectRatio="landscape"
            size="full"
          />
          <p className="text-sm font-medium text-slate-700 text-center">{t.screenshots[0].title}</p>
        </div>
        <div className="space-y-3">
          <AppScreenshot
            src="/images/screenshots/activity-board-grid.png"
            label={t.screenshots[1].label}
            description={t.screenshots[1].description}
            aspectRatio="landscape"
            size="full"
          />
          <p className="text-sm font-medium text-slate-700 text-center">{t.screenshots[1].title}</p>
        </div>
        <div className="space-y-3">
          <AppScreenshot
            src="/images/screenshots/text-mode.png"
            label={t.screenshots[2].label}
            description={t.screenshots[2].description}
            aspectRatio="landscape"
            size="full"
          />
          <p className="text-sm font-medium text-slate-700 text-center">{t.screenshots[2].title}</p>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
        <h2 className="font-[var(--font-jakarta)] text-2xl font-semibold text-slate-900">{t.guidance.title}</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {t.guidance.items.map((item) => (
            <article key={item.id} className="rounded-xl bg-white p-4">
              <p className="font-semibold text-slate-900">{item.title}</p>
              <p className="mt-1 text-sm text-slate-600">{item.description}</p>
              {item.linkLabel ? (
                <Link
                  href={localizeHref(item.id === "activity-boards" ? "/activity-boards" : "/core-fringe", l)}
                  className="mt-2 inline-block text-sm font-medium text-indigo-600 no-underline hover:text-indigo-800"
                >
                  {item.linkLabel}
                </Link>
              ) : null}
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
