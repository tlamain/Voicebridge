import Link from "next/link";
import AppScreenshot from "@/components/AppScreenshot";
import CTABanner from "@/components/CTABanner";
import ScrollReveal from "@/components/ScrollReveal";
import { createPageMetadata } from "@/lib/metadata";
import { getNamespace, localizeHref, type Locale } from "@/lib/i18n";

const levelConfig = {
  "level-1": { level: 1, threshold: "80%", minUses: "3", color: "bg-emerald-500", lightColor: "bg-emerald-50", textColor: "text-emerald-700", borderColor: "border-emerald-200" },
  "level-2": { level: 2, threshold: "75%", minUses: "3", color: "bg-blue-500", lightColor: "bg-blue-50", textColor: "text-blue-700", borderColor: "border-blue-200" },
  "level-3": { level: 3, threshold: "70%", minUses: "2", color: "bg-indigo-500", lightColor: "bg-indigo-50", textColor: "text-indigo-700", borderColor: "border-indigo-200" },
  "level-4": { level: 4, threshold: "65%", minUses: "2", color: "bg-violet-500", lightColor: "bg-violet-50", textColor: "text-violet-700", borderColor: "border-violet-200" },
  "level-5": { level: 5, threshold: "-", minUses: "-", color: "bg-slate-400", lightColor: "bg-slate-50", textColor: "text-slate-600", borderColor: "border-slate-200" },
  "level-6": { level: 6, threshold: "-", minUses: "-", color: "bg-amber-500", lightColor: "bg-amber-50", textColor: "text-amber-700", borderColor: "border-amber-200" },
} as const;

const principleIcons = {
  "motor-memory": "🧠",
  "per-level": "🎯",
  "usage-driven": "📊",
  "ghost-slots": "👁",
} as const;

const readinessStateStyles = {
  "in-progress": { color: "bg-blue-500", badge: "42%" },
  "almost-there": { color: "bg-orange-500", badge: "87%" },
  ready: { color: "bg-emerald-500", badge: "100%" },
} as const;

const modalIcons = {
  "progress-circle": "📊",
  "status-title": "📈",
  "stats-row": "🔢",
  recommendations: "💡",
  "unlock-button": "🔓",
} as const;

const gridSizeData = [
  { cols: "6 col", total: 244, level6: 6 },
  { cols: "7 col", total: 391, level6: 27 },
  { cols: "8 col", total: 506, level6: 52 },
  { cols: "9 col", total: 671, level6: 77 },
  { cols: "10 col", total: 720, level6: 79 },
  { cols: "11 col", total: 749, level6: 80 },
  { cols: "12 col", total: 840, level6: 86 },
] as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = getNamespace(locale as Locale, "progressive-vocabulary");

  return createPageMetadata({
    title: t.meta.title,
    description: t.meta.description,
    path: "/progressive-vocabulary",
    locale: locale as Locale,
  });
}

export default async function ProgressiveVocabularyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = locale as Locale;
  const t = getNamespace(l, "progressive-vocabulary");

  return (
    <div className="space-y-16 py-12">
      <ScrollReveal>
        <header className="space-y-4 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700 ring-1 ring-emerald-100">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
            </svg>
            {t.hero.badge}
          </div>
          <h1 className="font-(--font-jakarta) text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight">
            {t.hero.title}
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            {t.hero.description}
          </p>
        </header>
      </ScrollReveal>

      <ScrollReveal>
        <AppScreenshot
          src="/images/screenshots/progressive-vocabulary-settings.png"
          label={t.heroScreenshot.label}
          description={t.heroScreenshot.description}
          aspectRatio="landscape"
          size="full"
        />
      </ScrollReveal>

      <ScrollReveal>
        <section className="rounded-3xl bg-slate-900 px-8 py-12 text-white">
          <div className="text-center space-y-3 mb-10">
            <h2 className="font-(--font-jakarta) text-2xl font-bold">{t.principle.title}</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-sm leading-relaxed">{t.principle.description}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.principle.items.map((item) => (
              <div key={item.id} className="space-y-2 text-center">
                <span className="text-3xl">{principleIcons[item.id as keyof typeof principleIcons]}</span>
                <h3 className="font-semibold text-white">{item.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      <section className="space-y-8">
        <ScrollReveal>
          <div className="text-center space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">{t.levels.badge}</p>
            <h2 className="font-(--font-jakarta) text-3xl font-bold text-slate-900">{t.levels.title}</h2>
            <p className="mx-auto max-w-2xl text-slate-600">{t.levels.subtitle}</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.levels.items.map((item) => {
            const config = levelConfig[item.id as keyof typeof levelConfig];
            if (!config) return null;

            return (
              <ScrollReveal key={item.id}>
                <div className={`rounded-2xl border p-5 space-y-3 ${config.lightColor} ${config.borderColor}`}>
                  <div className="flex items-center gap-3">
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${config.color} text-white font-bold text-sm`}>
                      L{config.level}
                    </div>
                    <div>
                      <p className={`text-sm font-semibold ${config.textColor}`}>{item.label}</p>
                      <p className="text-xs text-slate-600">{item.description}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="rounded-lg bg-white/70 px-3 py-2 text-center border border-white/50">
                      <p className="font-semibold text-slate-900">{config.threshold}</p>
                      <p className="text-slate-500">{item.thresholdLabel}</p>
                    </div>
                    <div className="rounded-lg bg-white/70 px-3 py-2 text-center border border-white/50">
                      <p className="font-semibold text-slate-900">{config.minUses}</p>
                      <p className="text-slate-500">{item.tapsLabel}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal>
          <p className="text-center text-sm text-slate-500 max-w-2xl mx-auto">{t.levels.footnote}</p>
        </ScrollReveal>
      </section>

      <section className="grid grid-cols-1 gap-8 lg:grid-cols-2 items-start">
        <ScrollReveal>
          <div className="space-y-4">
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">{t.readiness.badge}</p>
              <h2 className="font-(--font-jakarta) text-2xl font-bold text-slate-900">{t.readiness.title}</h2>
              <p className="text-slate-600 text-sm leading-relaxed">{t.readiness.description}</p>
            </div>
            <div className="space-y-3">
              {t.readiness.fabStates.map((state) => {
                const style = readinessStateStyles[state.id as keyof typeof readinessStateStyles];
                if (!style) return null;

                return (
                  <div key={state.id} className="flex items-center gap-4 rounded-2xl bg-white border border-slate-200 p-4 shadow-sm">
                    <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${style.color} text-white shadow-md`}>
                      <span className="text-xs font-bold">{style.badge}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 text-sm">{state.label}</p>
                      <p className="text-xs text-slate-500 leading-relaxed">{state.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="space-y-4">
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">{t.readiness.modal.badge}</p>
              <h2 className="font-(--font-jakarta) text-2xl font-bold text-slate-900">{t.readiness.modal.title}</h2>
              <p className="text-slate-600 text-sm leading-relaxed">{t.readiness.modal.description}</p>
            </div>
            <div className="space-y-2 text-sm">
              {t.readiness.modal.items.map((item) => (
                <div key={item.id} className="flex items-start gap-3 rounded-xl bg-white border border-slate-200 p-3">
                  <span className="text-base">{modalIcons[item.id as keyof typeof modalIcons]}</span>
                  <div>
                    <p className="font-semibold text-slate-800">{item.label}</p>
                    <p className="text-xs text-slate-500">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
            <AppScreenshot
              src="/images/screenshots/progressive-vocabulary-settings.png"
              label={t.readiness.modal.screenshot.label}
              description={t.readiness.modal.screenshot.description}
              aspectRatio="portrait"
              size="sm"
            />
          </div>
        </ScrollReveal>
      </section>

      <section className="space-y-8">
        <ScrollReveal>
          <div className="rounded-3xl bg-white border border-slate-200 p-8 sm:p-10 space-y-6">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">{t.gridSizes.badge}</p>
              <h2 className="font-(--font-jakarta) text-3xl font-bold text-slate-900">{t.gridSizes.title}</h2>
              <p className="text-slate-600 leading-relaxed max-w-2xl">{t.gridSizes.description}</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-2 pr-6 font-semibold text-slate-700">{t.gridSizes.gridSizeLabel}</th>
                    <th className="text-right py-2 pr-6 font-semibold text-slate-700">{t.gridSizes.totalConceptsLabel}</th>
                    <th className="text-right py-2 font-semibold text-slate-700">{t.gridSizes.level6ConceptsLabel}</th>
                  </tr>
                </thead>
                <tbody>
                  {gridSizeData.map((row) => (
                    <tr key={row.cols} className="border-b border-slate-100">
                      <td className="py-2.5 pr-6 font-medium text-slate-900">{row.cols}</td>
                      <td className="py-2.5 pr-6 text-right text-slate-600">{row.total.toLocaleString()}</td>
                      <td className="py-2.5 text-right text-slate-600">{row.level6}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <section className="space-y-8">
        <ScrollReveal>
          <div className="text-center space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">{t.adminControls.badge}</p>
            <h2 className="font-(--font-jakarta) text-3xl font-bold text-slate-900">{t.adminControls.title}</h2>
            <p className="mx-auto max-w-2xl text-slate-600">{t.adminControls.subtitle}</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.adminControls.items.map((item) => (
            <ScrollReveal key={item.id}>
              <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm space-y-2 h-full">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50">
                  <svg className="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <p className="font-semibold text-slate-900">{item.label}</p>
                <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <ScrollReveal>
        <section className="rounded-3xl bg-slate-50 border border-slate-200 p-8 sm:p-10">
          <div className="flex flex-col lg:flex-row gap-10 items-center">
            <div className="lg:w-1/2 space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">{t.wordFinder.badge}</p>
              <h2 className="font-(--font-jakarta) text-2xl font-bold text-slate-900">{t.wordFinder.title}</h2>
              <p className="text-slate-600 leading-relaxed">{t.wordFinder.description}</p>
              <ul className="space-y-2 text-sm text-slate-700">
                {t.wordFinder.items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <svg className="h-4 w-4 mt-0.5 shrink-0 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:w-1/2">
              <AppScreenshot
                src="/images/screenshots/word-finder.png"
                label={t.wordFinder.screenshot.label}
                description={t.wordFinder.screenshot.description}
                aspectRatio="portrait"
                size="sm"
              />
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <div className="flex flex-wrap gap-4 justify-center">
          {t.links.map((link) => (
            <Link
              key={link.id}
              href={localizeHref(`/${link.id}`, l)}
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-indigo-300 hover:text-indigo-700 hover:bg-indigo-50 no-underline"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <CTABanner
          title={t.cta.title}
          subtitle={t.cta.subtitle}
          buttonText={t.cta.buttonText}
          buttonHref={localizeHref("/contact", l)}
        />
      </ScrollReveal>
    </div>
  );
}
