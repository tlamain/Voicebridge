import CTABanner from "@/components/CTABanner";
import ScrollReveal from "@/components/ScrollReveal";
import AppScreenshot from "@/components/AppScreenshot";
import { createPageMetadata } from "@/lib/metadata";
import { getNamespace, localizeHref, type Locale } from "@/lib/i18n";

const sectionConfigs = [
  {
    id: "board-management",
    color: "bg-sky-50 text-sky-600 ring-sky-100",
    screenshotSrc: "/images/screenshots/activity-board-list.png",
    screenshotLabel: "Activity Board List",
    screenshotDescription: "Scrollable board list with search, icons, and column counts",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: "customisation",
    color: "bg-amber-50 text-amber-600 ring-amber-100",
    screenshotSrc: "/images/screenshots/activity-board-grid.png",
    screenshotLabel: "Board Editor",
    screenshotDescription: "Activity board grid with category buttons and icons",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />
      </svg>
    ),
  },
  {
    id: "grid-editing",
    color: "bg-emerald-50 text-emerald-600 ring-emerald-100",
    screenshotSrc: "/images/screenshots/edit-board-layout.png",
    screenshotLabel: "Grid Edit Mode",
    screenshotDescription: "Board grid editor with drag handles and edit controls",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
  },
] as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = getNamespace(locale as Locale, "activity-boards");

  return createPageMetadata({
    title: t.meta.title,
    description: t.meta.description,
    path: "/activity-boards",
    locale: locale as Locale,
  });
}

export default async function ActivityBoardsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = locale as Locale;
  const t = getNamespace(l, "activity-boards");

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
