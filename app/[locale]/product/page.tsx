import Link from "next/link";
import {
  deepDiveLinks,
  featureSectionIds,
  productPillarIds,
} from "@/content/features";
import { createPageMetadata } from "@/lib/metadata";
import { getNamespace, localizeHref, type Locale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = getNamespace(locale as Locale, "product");
  return createPageMetadata({
    title: t.meta.title,
    description: t.meta.description,
    path: "/product",
    locale: locale as Locale,
  });
}

export default async function ProductPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = locale as Locale;
  const t = getNamespace(l, "product");

  return (
    <div className="space-y-12 py-12">
      <header className="space-y-3">
        <h1 className="font-[var(--font-jakarta)] text-4xl font-semibold tracking-tight text-slate-900">{t.hero.title}</h1>
        <p className="max-w-3xl text-lg text-slate-600">
          {t.hero.description}
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {productPillarIds.map((pillarId) => {
          const pillar = t.pillars.find((item) => item.id === pillarId);
          if (!pillar) return null;

          return (
            <article key={pillar.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-blue-700">{pillar.value}</p>
              <h2 className="mt-2 text-xl font-semibold text-slate-900">{pillar.title}</h2>
              <p className="mt-2 text-sm text-slate-600">{pillar.description}</p>
            </article>
          );
        })}
      </section>

      <section className="space-y-4">
        <h2 className="font-[var(--font-jakarta)] text-2xl font-semibold text-slate-900">{t.capabilitiesTitle}</h2>
        <div className="grid gap-5 lg:grid-cols-2">
          {featureSectionIds.map((sectionId) => {
            const section = t.featureSections.find((item) => item.id === sectionId);
            if (!section) return null;

            return (
              <article key={section.id} className="rounded-2xl border border-slate-200 bg-white p-6">
                <h3 className="text-xl font-semibold text-slate-900">{section.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{section.summary}</p>
                <ul className="mt-3 space-y-1 text-sm text-slate-700">
                  {section.highlights.map((item) => (
                    <li key={item}>- {item}</li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-[var(--font-jakarta)] text-2xl font-semibold text-slate-900">{t.linksTitle}</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {deepDiveLinks.map((link) => {
            const item = t.deepDiveLinks.find((entry) => entry.id === link.id);
            if (!item) return null;

            return (
              <Link
                key={link.href}
                href={localizeHref(link.href, l)}
                className="rounded-xl border border-slate-200 bg-slate-50 p-5 no-underline transition hover:border-blue-300 hover:bg-white"
              >
                <p className="font-semibold text-slate-900">{item.label}</p>
                <p className="mt-1 text-sm text-slate-600">{item.description}</p>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
