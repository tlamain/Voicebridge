import Link from "next/link";
import { adminAreas } from "@/content/product-details";
import { createPageMetadata } from "@/lib/metadata";
import AppScreenshot from "@/components/AppScreenshot";
import { localizeHref, type Locale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return createPageMetadata({
    title: "Admin page",
    description: "Review VoiceBridge AAC admin surfaces for settings, content, language, and user profile workflows.",
    path: "/admin",
    locale: locale as Locale,
  });
}

export default async function AdminForCliniciansPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = locale as Locale;

  return (
    <div className="space-y-10 py-12">
      <header className="space-y-3">
        <h1 className="font-[var(--font-jakarta)] text-4xl font-semibold tracking-tight text-slate-900">Admin for Clinicians</h1>
        <p className="max-w-3xl text-lg text-slate-600">
          Admin mode in VoiceBridge is designed for structured operations across settings, content, language, and multi-user management.
        </p>
      </header>

      <section className="space-y-4">
        {adminAreas.map((area) => (
          <article key={area.area} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900">{area.area}</h2>
            <p className="mt-2 text-sm text-slate-600">{area.purpose}</p>
            <ul className="mt-3 space-y-1 text-sm text-slate-700">
              {area.capabilities.map((capability) => (
                <li key={capability}>- {capability}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      {/* Screenshots */}
      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-3">
          <AppScreenshot
            src="/images/screenshots/admin-pin-protection.png"
            label="PIN Protection"
            description="PIN-protected admin access for security"
            aspectRatio="landscape"
            size="full"
          />
          <p className="text-sm font-medium text-slate-700 text-center">PIN Protection</p>
        </div>
        <div className="space-y-3">
          <AppScreenshot
            src="/images/screenshots/multi-user-profiles.png"
            label="Multi-User Profiles"
            description="Multiple isolated user profiles"
            aspectRatio="landscape"
            size="full"
          />
          <p className="text-sm font-medium text-slate-700 text-center">User Profiles</p>
        </div>
        <div className="space-y-3">
          <AppScreenshot
            src="/images/screenshots/customize-appearance.png"
            label="Customize Appearance"
            description="Theme, grid size, and display settings"
            aspectRatio="portrait"
            size="full"
          />
          <p className="text-sm font-medium text-slate-700 text-center">Appearance Settings</p>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
        <h2 className="font-[var(--font-jakarta)] text-2xl font-semibold text-slate-900">Operational Notes</h2>
        <ul className="mt-3 space-y-1 text-sm text-slate-700">
          <li>- PIN protection can gate entry and edit workflows.</li>
          <li>- Language context influences content lists and pack operations.</li>
          <li>- User profiles are isolated for cleaner care-team handoffs.</li>
          <li>- Backup and restore actions are explicit and user initiated.</li>
        </ul>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="font-[var(--font-jakarta)] text-2xl font-semibold text-slate-900">Explore Content Management</h2>
        <p className="mt-2 text-sm text-slate-600">Dive deeper into the tools clinicians use to manage communication content.</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href={localizeHref("/symbol-management", l)} className="rounded-lg bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700 no-underline ring-1 ring-indigo-100 transition hover:bg-indigo-100">Symbol Library &rarr;</Link>
          <Link href={localizeHref("/activity-boards", l)} className="rounded-lg bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700 no-underline ring-1 ring-indigo-100 transition hover:bg-indigo-100">Activity Boards &rarr;</Link>
          <Link href={localizeHref("/core-fringe", l)} className="rounded-lg bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700 no-underline ring-1 ring-indigo-100 transition hover:bg-indigo-100">Core-Fringe Layouts &rarr;</Link>
        </div>
      </section>
    </div>
  );
}
