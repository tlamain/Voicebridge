import CTABanner from "@/components/CTABanner";
import ScrollReveal from "@/components/ScrollReveal";
import AppScreenshot from "@/components/AppScreenshot";
import { createPageMetadata } from "@/lib/metadata";
import { getNamespace, localizeHref, type Locale } from "@/lib/i18n";

const sectionConfigs = [
  {
    id: "browse-find",
    color: "bg-blue-50 text-blue-600 ring-blue-100",
    screenshotSrc: "/images/screenshots/symbol-list.png",
    screenshotLabel: "Symbol List with Filters",
    screenshotDescription: "Symbol list with search bar, category filter chips, and quick-action buttons",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
  },
  {
    id: "quick-actions",
    color: "bg-amber-50 text-amber-600 ring-amber-100",
    screenshotSrc: "/images/screenshots/phrase-editor.png",
    screenshotLabel: "Favourites and Visibility",
    screenshotDescription: "Phrase editor with search and category tabs",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
  },
  {
    id: "symbol-editor",
    color: "bg-emerald-50 text-emerald-600 ring-emerald-100",
    screenshotSrc: "/images/screenshots/symbol-picker.png",
    screenshotLabel: "Symbol Editor",
    screenshotDescription: "Symbol creation dialog with category grid",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
      </svg>
    ),
  },
  {
    id: "advanced-features",
    color: "bg-violet-50 text-violet-600 ring-violet-100",
    screenshotSrc: "/images/screenshots/progressive-vocabulary-settings.png",
    screenshotLabel: "Progressive Vocabulary Fields",
    screenshotDescription: "Progressive vocabulary settings with level and display controls",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
  },
  {
    id: "safe-deletion",
    color: "bg-rose-50 text-rose-600 ring-rose-100",
    screenshotSrc: "/images/screenshots/symbol-list.png",
    screenshotLabel: "Delete Warning",
    screenshotDescription: "Symbol list with management controls",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
    ),
  },
] as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = getNamespace(locale as Locale, "symbol-management");

  return createPageMetadata({
    title: t.meta.title,
    description: t.meta.description,
    path: "/symbol-management",
    locale: locale as Locale,
  });
}

export default async function SymbolManagementPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = locale as Locale;
  const t = getNamespace(l, "symbol-management");

  return (
    <div className="py-16 space-y-20">
      <ScrollReveal>
        <div className="text-center space-y-4">
          <h1 className="font-(--font-jakarta) text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight">
            {t.hero.title}
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
              <div className={`flex flex-col lg:flex-row lg:items-start gap-10 ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
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
                    align={i % 2 === 1 ? "end" : "start"}
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
