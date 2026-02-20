import { adminAreas } from "@/content/product-details";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Admin for Clinicians",
  description: "Review VoiceBridge AAC admin surfaces for settings, content, language, and user profile workflows.",
  path: "/admin-for-clinicians",
});

export default function AdminForCliniciansPage() {
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

      <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
        <h2 className="font-[var(--font-jakarta)] text-2xl font-semibold text-slate-900">Operational Notes</h2>
        <ul className="mt-3 space-y-1 text-sm text-slate-700">
          <li>- PIN protection can gate entry and edit workflows.</li>
          <li>- Language context influences content lists and pack operations.</li>
          <li>- User profiles are isolated for cleaner care-team handoffs.</li>
          <li>- Backup and restore actions are explicit and user initiated.</li>
        </ul>
      </section>
    </div>
  );
}
