import ScrollReveal from "@/components/ScrollReveal";
import TallyEmbed from "@/components/TallyEmbed";
import { createPageMetadata } from "@/lib/metadata";
import { getNamespace, type Locale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = getNamespace(locale as Locale, "contact");

  return createPageMetadata({
    title: t.meta.title,
    description: t.meta.description,
    path: "/contact",
    locale: locale as Locale,
  });
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = getNamespace(locale as Locale, "contact");

  return (
    <div className="py-16 space-y-16">
      <ScrollReveal>
        <div className="text-center space-y-4">
          <h1 className="font-(--font-jakarta) text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight">
            {t.hero.title}
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            {t.hero.description}
          </p>
        </div>
      </ScrollReveal>

      <div className="max-w-2xl mx-auto">
        <ScrollReveal>
          <div className="rounded-3xl border border-slate-200 bg-white p-10 space-y-6">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </div>
            <h2 className="font-(--font-jakarta) text-2xl font-bold text-slate-900">{t.card.title}</h2>
            <p className="text-slate-600 leading-relaxed">
              {t.card.description}
            </p>
            <TallyEmbed formId="aQDZ2X" title={t.card.title} />
            <div className="pt-4 border-t border-slate-100 space-y-1">
              <p className="text-sm text-slate-500">{t.card.responseTime}</p>
              <p className="text-sm text-slate-500">{t.card.location}</p>
            </div>
          </div>
        </ScrollReveal>
      </div>

      <ScrollReveal>
        <div className="text-center rounded-3xl bg-linear-to-br from-indigo-50 to-blue-50 border border-indigo-100 p-10 space-y-6">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
            </svg>
          </div>
          <h3 className="font-(--font-jakarta) text-xl font-bold text-slate-900">{t.download.title}</h3>
          <p className="text-slate-600 max-w-lg mx-auto">
            {t.download.description}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#"
              className="inline-flex items-center gap-3 rounded-xl bg-black px-5 py-3 text-white hover:bg-slate-800 transition-colors no-underline"
            >
              <svg className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <div className="text-left">
                <div className="text-xs opacity-80">{t.download.appStorePrefix}</div>
                <div className="text-sm font-semibold">{t.download.appStoreLabel}</div>
              </div>
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-3 rounded-xl bg-black px-5 py-3 text-white hover:bg-slate-800 transition-colors no-underline"
            >
              <svg className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.18 23.76c.3.17.64.24.99.2L15.55 12 12 8.45zm17.05-10.63L17.42 11.5 13.57 12l3.85 3.5 2.81-1.63a1.55 1.55 0 000-2.74zM3.05.27a1.55 1.55 0 00-.87 1.4v20.67c0 .6.32 1.12.87 1.4L14.2 12zm10.52 11.12L3.18.27l11.37 6.56z" />
              </svg>
              <div className="text-left">
                <div className="text-xs opacity-80">{t.download.googlePlayPrefix}</div>
                <div className="text-sm font-semibold">{t.download.googlePlayLabel}</div>
              </div>
            </a>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
