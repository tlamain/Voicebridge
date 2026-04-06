import { setupWizardOutcomeIds, setupWizardSteps } from "@/content/product-details";
import { createPageMetadata } from "@/lib/metadata";
import { getNamespace, type Locale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = getNamespace(locale as Locale, "setup-wizard");
  return createPageMetadata({
    title: t.meta.title,
    description: t.meta.description,
    path: "/setup-wizard",
    locale: locale as Locale,
  });
}

export default async function SetupWizardPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = getNamespace(locale as Locale, "setup-wizard");

  return (
    <div className="space-y-10 py-12">
      <header className="space-y-3">
        <h1 className="font-[var(--font-jakarta)] text-4xl font-semibold tracking-tight text-slate-900">{t.hero.title}</h1>
        <p className="max-w-3xl text-lg text-slate-600">
          {t.hero.description}
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="font-[var(--font-jakarta)] text-2xl font-semibold text-slate-900">{t.flowTitle}</h2>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">{t.tableLabels.step}</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">{t.tableLabels.title}</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">{t.tableLabels.purpose}</th>
              </tr>
            </thead>
            <tbody>
              {setupWizardSteps.map((config) => {
                const step = t.steps.find((item) => item.id === config.id);
                if (!step) return null;

                return (
                  <tr key={step.step} className="border-b border-slate-100 last:border-b-0">
                    <td className="px-4 py-3 text-sm font-semibold text-slate-900">{step.step}</td>
                    <td className="px-4 py-3 text-sm text-slate-900">{step.title}</td>
                    <td className="px-4 py-3 text-sm text-slate-600">{step.purpose}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
        <h2 className="font-[var(--font-jakarta)] text-2xl font-semibold text-slate-900">{t.outcomes.title}</h2>
        <ul className="mt-3 space-y-1 text-sm text-slate-700">
          {setupWizardOutcomeIds.map((outcomeId) => {
            const index = setupWizardOutcomeIds.indexOf(outcomeId);
            const outcome = t.outcomes.items[index];
            return outcome ? <li key={outcomeId}>- {outcome}</li> : null;
          })}
        </ul>
      </section>
    </div>
  );
}
