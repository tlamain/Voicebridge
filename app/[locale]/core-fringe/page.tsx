import CTABanner from "@/components/CTABanner";
import ScrollReveal from "@/components/ScrollReveal";
import AppScreenshot from "@/components/AppScreenshot";
import { createPageMetadata } from "@/lib/metadata";
import { getNamespace, localizeHref, type Locale } from "@/lib/i18n";

const sectionConfigs = [
  {
    id: "layout-management",
    color: "bg-violet-50 text-violet-600 ring-violet-100",
    screenshotSrc: "/images/screenshots/core-fringe-list.png",
    screenshotLabel: "Core-Fringe Layout List",
    screenshotDescription: "Layout list with active badge, grid size, page and slot counts",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
  },
  {
    id: "page-hierarchy",
    color: "bg-emerald-50 text-emerald-600 ring-emerald-100",
    screenshotSrc: "/images/screenshots/edit-board-layout.png",
    screenshotLabel: "Page Tree Manager",
    screenshotDescription: "Grid editor with page navigation and editing controls",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
      </svg>
    ),
  },
  {
    id: "core-vocabulary",
    color: "bg-blue-50 text-blue-600 ring-blue-100",
    screenshotSrc: "/images/screenshots/core-fringe-grid.png",
    screenshotLabel: "Pinned vs Dynamic Slots",
    screenshotDescription: "Core-fringe grid with pinned core words and dynamic fringe vocabulary",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
  },
  {
    id: "grid-editing",
    color: "bg-rose-50 text-rose-600 ring-rose-100",
    screenshotSrc: "/images/screenshots/edit-board-layout.png",
    screenshotLabel: "Core-Fringe Grid Edit Mode",
    screenshotDescription: "Grid edit bar with page selector, Add Page, Copy Page, and Done actions",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
      </svg>
    ),
  },
] as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = getNamespace(locale as Locale, "core-fringe");

  return createPageMetadata({
    title: t.meta.title,
    description: t.meta.description,
    path: "/core-fringe",
    locale: locale as Locale,
  });
}

export default async function CoreFringePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = locale as Locale;
  const t = getNamespace(l, "core-fringe");

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
