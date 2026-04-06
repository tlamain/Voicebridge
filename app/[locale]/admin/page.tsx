import Link from "next/link";
import { adminAreaIds } from "@/content/product-details";
import { createPageMetadata } from "@/lib/metadata";
import AppScreenshot from "@/components/AppScreenshot";
import { getNamespace, localizeHref, type Locale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = getNamespace(locale as Locale, "admin");
  return createPageMetadata({
    title: t.meta.title,
    description: t.meta.description,
    path: "/admin",
    locale: locale as Locale,
  });
}

export default async function AdminForCliniciansPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = locale as Locale;
  const t = getNamespace(l, "admin");

  return (
    <div className="space-y-10 py-12">
      <header className="space-y-3">
        <h1 className="font-[var(--font-jakarta)] text-4xl font-semibold tracking-tight text-slate-900">{t.hero.title}</h1>
        <p className="max-w-3xl text-lg text-slate-600">
          {t.hero.description}
        </p>
      </header>

      <section className="space-y-4">
        {adminAreaIds.map((areaId) => {
          const area = t.areas.find((item) => item.id === areaId);
          if (!area) return null;

          return (
            <article key={area.area} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900">{area.area}</h2>
              <p className="mt-2 text-sm text-slate-600">{area.purpose}</p>
              <ul className="mt-3 space-y-1 text-sm text-slate-700">
                {area.capabilities.map((capability) => (
                  <li key={capability}>- {capability}</li>
                ))}
              </ul>
            </article>
          );
        })}
      </section>

      {/* Screenshots */}
      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-3">
          <AppScreenshot
            src="/images/screenshots/admin-pin-protection.png"
            label={t.screenshots[0].label}
            description={t.screenshots[0].description}
            aspectRatio="landscape"
            size="full"
          />
          <p className="text-sm font-medium text-slate-700 text-center">{t.screenshots[0].title}</p>
        </div>
        <div className="space-y-3">
          <AppScreenshot
            src="/images/screenshots/multi-user-profiles.png"
            label={t.screenshots[1].label}
            description={t.screenshots[1].description}
            aspectRatio="landscape"
            size="full"
          />
          <p className="text-sm font-medium text-slate-700 text-center">{t.screenshots[1].title}</p>
        </div>
        <div className="space-y-3">
          <AppScreenshot
            src="/images/screenshots/customize-appearance.png"
            label={t.screenshots[2].label}
            description={t.screenshots[2].description}
            aspectRatio="portrait"
            size="full"
          />
          <p className="text-sm font-medium text-slate-700 text-center">{t.screenshots[2].title}</p>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
        <h2 className="font-[var(--font-jakarta)] text-2xl font-semibold text-slate-900">{t.notes.title}</h2>
        <ul className="mt-3 space-y-1 text-sm text-slate-700">
          {t.notes.items.map((item) => (
            <li key={item}>- {item}</li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="font-[var(--font-jakarta)] text-2xl font-semibold text-slate-900">{t.links.title}</h2>
        <p className="mt-2 text-sm text-slate-600">{t.links.description}</p>
        <div className="mt-4 flex flex-wrap gap-3">
          {t.links.items.map((item) => (
            <Link
              key={item.id}
              href={localizeHref(`/${item.id}`, l)}
              className="rounded-lg bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700 no-underline ring-1 ring-indigo-100 transition hover:bg-indigo-100"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
