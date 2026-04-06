import CTABanner from "@/components/CTABanner";
import ScrollReveal from "@/components/ScrollReveal";
import AppScreenshot from "@/components/AppScreenshot";
import { createPageMetadata } from "@/lib/metadata";
import { getNamespace, localizeHref, type Locale } from "@/lib/i18n";

const sectionConfigs = [
  {
    id: "communication-tools",
    color: "bg-blue-50 text-blue-600 ring-blue-100",
    screenshotSrc: "/images/screenshots/text-mode.png",
    screenshotLabel: "Main Communication Screen",
    screenshotDescription: "Text mode with quick phrases, categories, and shortcuts",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
      </svg>
    ),
  },
  {
    id: "voice-speech",
    color: "bg-violet-50 text-violet-600 ring-violet-100",
    screenshotSrc: "/images/screenshots/voice-settings.png",
    screenshotLabel: "Voice Settings",
    screenshotDescription: "Voice provider selection and ElevenLabs configuration",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
      </svg>
    ),
  },
  {
    id: "smart-grammar-engine",
    color: "bg-amber-50 text-amber-600 ring-amber-100",
    screenshotSrc: "/images/screenshots/verb-conjugation.png",
    screenshotLabel: "Smart Grammar in Action",
    screenshotDescription: "Automatic verb conjugation with color-coded grammar",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
      </svg>
    ),
  },
  {
    id: "progressive-vocabulary",
    color: "bg-emerald-50 text-emerald-600 ring-emerald-100",
    screenshotSrc: "/images/screenshots/progressive-vocabulary-settings.png",
    screenshotLabel: "Progressive Vocabulary",
    screenshotDescription: "Progressive vocabulary settings with level controls",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
  {
    id: "grid-modes",
    color: "bg-sky-50 text-sky-600 ring-sky-100",
    screenshotSrc: "/images/screenshots/core-fringe-grid.png",
    screenshotLabel: "Core-Fringe Grid",
    screenshotDescription: "Pinned core vocabulary with multi-page fringe navigation",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
  },
  {
    id: "customisation-admin",
    color: "bg-rose-50 text-rose-600 ring-rose-100",
    screenshotSrc: "/images/screenshots/customize-appearance.png",
    screenshotLabel: "Admin Screen",
    screenshotDescription: "Appearance customization with theme, grid size, and display settings",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    id: "multi-user-accessibility",
    color: "bg-indigo-50 text-indigo-600 ring-indigo-100",
    screenshotSrc: "/images/screenshots/multi-user-profiles.png",
    screenshotLabel: "User Management",
    screenshotDescription: "Multiple user profiles with setup wizard",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
] as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = getNamespace(locale as Locale, "features");

  return createPageMetadata({
    title: t.meta.title,
    description: t.meta.description,
    path: "/features",
    locale: locale as Locale,
  });
}

export default async function FeaturesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = locale as Locale;
  const t = getNamespace(l, "features");

  return (
    <div className="py-16 space-y-20">
      <ScrollReveal>
        <div className="text-center space-y-4">
          <h1 className="font-(--font-jakarta) text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight">
            {t.hero.title}{" "}
            <span className="text-gradient">{t.hero.highlightedTitle}</span>
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-slate-600 leading-relaxed">
            {t.hero.description}
          </p>
        </div>
      </ScrollReveal>

      {sectionConfigs.map((config, i) => {
        const section = t.sections.find((item) => item.id === config.id);
        if (!section) return null;

        return (
          <ScrollReveal key={section.id}>
            <section className={`rounded-3xl p-8 sm:p-10 ${i % 2 === 0 ? "bg-white border border-slate-200" : "bg-slate-50"}`}>
              <div className="flex flex-col lg:flex-row lg:items-start gap-10">
                <div className="lg:w-[55%] space-y-5">
                  <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl ring-1 ${config.color}`}>
                    {config.icon}
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">{section.badge}</p>
                  <h2 className="font-(--font-jakarta) text-2xl sm:text-3xl font-bold text-slate-900">{section.title}</h2>
                  <p className="text-slate-600 leading-relaxed">{section.description}</p>
                  <ul className="space-y-3 pt-2">
                    {section.items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-sm text-slate-700 leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="w-full lg:w-[45%] lg:pt-20">
                  <AppScreenshot
                    src={config.screenshotSrc}
                    label={config.screenshotLabel}
                    description={config.screenshotDescription}
                    aspectRatio="portrait"
                    size="full"
                    align="start"
                  />
                </div>
              </div>
            </section>
          </ScrollReveal>
        );
      })}

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
