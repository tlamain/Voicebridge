import Link from "next/link";
import AppScreenshot from "@/components/AppScreenshot";
import CTABanner from "@/components/CTABanner";
import ScrollReveal from "@/components/ScrollReveal";
import { createPageMetadata } from "@/lib/metadata";
import { getNamespace, localizeHref, type Locale } from "@/lib/i18n";

const languageStyles = {
  english: { flag: "🇬🇧", color: "bg-blue-50 ring-blue-100", labelColor: "text-blue-700" },
  dutch: { flag: "🇳🇱", color: "bg-orange-50 ring-orange-100", labelColor: "text-orange-700" },
  french: { flag: "🇫🇷", color: "bg-red-50 ring-red-100", labelColor: "text-red-700" },
  spanish: { flag: "🇪🇸", color: "bg-yellow-50 ring-yellow-100", labelColor: "text-yellow-700" },
} as const;

const capabilityIcons = {
  "verb-conjugation": "🔤",
  "perfect-tense": "⏱",
  "continuous-aspect": "🔄",
  "modal-verbs": "💬",
  "multi-clause": "🔗",
  "reflexive-verbs": "↩",
  "noun-pluralisation": "📚",
  "french-agreement": "🇫🇷",
} as const;

const grammarGroupColors = {
  articles: "bg-blue-500",
  demonstratives: "bg-emerald-500",
  possessives: "bg-orange-500",
  prepositions: "bg-violet-500",
} as const;

const assistLevelColors = {
  simple: { color: "border-emerald-200 bg-emerald-50", badgeColor: "bg-emerald-100 text-emerald-700" },
  standard: { color: "border-blue-200 bg-blue-50", badgeColor: "bg-blue-100 text-blue-700" },
  expert: { color: "border-violet-200 bg-violet-50", badgeColor: "bg-violet-100 text-violet-700" },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = getNamespace(locale as Locale, "smart-grammar");

  return createPageMetadata({
    title: t.meta.title,
    description: t.meta.description,
    path: "/smart-grammar",
    locale: locale as Locale,
  });
}

export default async function SmartGrammarPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = locale as Locale;
  const t = getNamespace(l, "smart-grammar");

  return (
    <div className="space-y-16 py-12">
      <ScrollReveal>
        <header className="space-y-4 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-sm font-medium text-amber-700 ring-1 ring-amber-100">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
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
          src="/images/screenshots/verb-conjugation.png"
          label={t.heroScreenshot.label}
          description={t.heroScreenshot.description}
          aspectRatio="landscape"
          size="full"
        />
      </ScrollReveal>

      <ScrollReveal>
        <section className="rounded-3xl bg-slate-900 px-8 py-12 text-white">
          <h2 className="font-(--font-jakarta) text-2xl font-bold mb-8 text-center">{t.howItWorks.title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            {t.howItWorks.steps.map((item, index) => (
              <div key={item.id} className="space-y-3">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white text-xl font-bold">
                  {index + 1}
                </div>
                <h3 className="font-semibold text-white">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      <section className="space-y-8">
        <ScrollReveal>
          <div className="text-center space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">{t.examples.badge}</p>
            <h2 className="font-(--font-jakarta) text-3xl font-bold text-slate-900">{t.examples.title}</h2>
            <p className="mx-auto max-w-2xl text-slate-600">{t.examples.subtitle}</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {t.examples.languages.map((language) => {
            const style = languageStyles[language.id as keyof typeof languageStyles];
            if (!style) return null;

            return (
              <ScrollReveal key={language.id}>
                <div className={`rounded-2xl border p-6 space-y-4 ${style.color}`}>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{style.flag}</span>
                    <h3 className={`font-bold text-lg ${style.labelColor}`}>{language.language}</h3>
                  </div>
                  <div className="space-y-3">
                    {language.examples.map((example, index) => (
                      <div key={`${language.id}-${index}`} className="rounded-xl bg-white/70 px-4 py-3 space-y-1 border border-white/50">
                        <div className="flex items-center gap-2 flex-wrap">
                          <code className="text-xs font-mono bg-slate-100 rounded px-2 py-0.5 text-slate-600">{example.input}</code>
                          <svg className="h-3 w-3 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                          </svg>
                          <code className="text-xs font-mono font-semibold bg-emerald-100 rounded px-2 py-0.5 text-emerald-800">{example.output}</code>
                        </div>
                        <p className="text-xs text-slate-500">{example.note}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      <section className="space-y-8">
        <ScrollReveal>
          <div className="text-center space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">{t.capabilities.badge}</p>
            <h2 className="font-(--font-jakarta) text-3xl font-bold text-slate-900">{t.capabilities.title}</h2>
            <p className="mx-auto max-w-2xl text-slate-600">{t.capabilities.subtitle}</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.capabilities.items.map((item) => (
            <ScrollReveal key={item.id}>
              <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm h-full space-y-3">
                <span className="text-2xl">{capabilityIcons[item.id as keyof typeof capabilityIcons]}</span>
                <h3 className="font-semibold text-slate-900">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <ScrollReveal>
          <div className="rounded-3xl bg-white border border-slate-200 p-8 sm:p-10">
            <div className="flex flex-col lg:flex-row gap-10 items-start">
              <div className="lg:w-1/2 space-y-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">{t.grammarBar.badge}</p>
                <h2 className="font-(--font-jakarta) text-3xl font-bold text-slate-900">{t.grammarBar.title}</h2>
                <p className="text-slate-600 leading-relaxed">{t.grammarBar.description}</p>
                <p className="text-sm text-slate-600 leading-relaxed">{t.grammarBar.dimming}</p>
                <div className="space-y-3 pt-2">
                  {t.grammarBar.groups.map((group) => (
                    <div key={group.id} className="flex items-start gap-3">
                      <div className={`mt-1 h-3 w-3 shrink-0 rounded-sm ${grammarGroupColors[group.id as keyof typeof grammarGroupColors]}`} />
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{group.name}</p>
                        <p className="text-xs text-slate-500">{group.examples}</p>
                        <p className="text-xs text-slate-600 mt-0.5">{group.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:w-1/2">
                <AppScreenshot
                  src="/images/screenshots/color-coded-grammar.png"
                  label={t.grammarBar.primaryScreenshot.label}
                  description={t.grammarBar.primaryScreenshot.description}
                  aspectRatio="landscape"
                  size="full"
                />
                <div className="mt-6">
                  <AppScreenshot
                    src="/images/screenshots/noun-plural-form.png"
                    label={t.grammarBar.secondaryScreenshot.label}
                    description={t.grammarBar.secondaryScreenshot.description}
                    aspectRatio="landscape"
                    size="full"
                  />
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <section className="space-y-8">
        <ScrollReveal>
          <div className="text-center space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">{t.assistLevels.badge}</p>
            <h2 className="font-(--font-jakarta) text-3xl font-bold text-slate-900">{t.assistLevels.title}</h2>
            <p className="mx-auto max-w-2xl text-slate-600">{t.assistLevels.subtitle}</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {t.assistLevels.items.map((level) => {
            const style = assistLevelColors[level.id as keyof typeof assistLevelColors];
            if (!style) return null;

            return (
              <ScrollReveal key={level.id}>
                <div className={`rounded-2xl border p-6 space-y-4 h-full ${style.color}`}>
                  <div className="flex items-center justify-between">
                    <h3 className="font-(--font-jakarta) text-xl font-bold text-slate-900">{level.level}</h3>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${style.badgeColor}`}>{level.audience}</span>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">{level.behavior}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      <ScrollReveal>
        <section className="rounded-3xl bg-slate-900 px-8 py-10 text-white">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10">
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-white text-lg">{t.offline.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{t.offline.description}</p>
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
