import { setupWizardOutcomes, setupWizardSteps } from "@/content/product-details";
import { createPageMetadata } from "@/lib/metadata";
import { localizeHref, type Locale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return createPageMetadata({
    title: "Setup Wizard",
    description: "Review the 11-step onboarding flow used for first-run and new-user setup in VoiceBridge AAC.",
    path: "/setup-wizard",
    locale: locale as Locale,
  });
}

export default async function SetupWizardPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = locale as Locale;

  return (
    <div className="space-y-10 py-12">
      <header className="space-y-3">
        <h1 className="font-[var(--font-jakarta)] text-4xl font-semibold tracking-tight text-slate-900">Setup Wizard</h1>
        <p className="max-w-3xl text-lg text-slate-600">
          The setup wizard standardizes onboarding by guiding teams through language, layout, grammar, voice, and security decisions.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="font-[var(--font-jakarta)] text-2xl font-semibold text-slate-900">11-Step Flow</h2>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Step</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Title</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Purpose</th>
              </tr>
            </thead>
            <tbody>
              {setupWizardSteps.map((step) => (
                <tr key={step.step} className="border-b border-slate-100 last:border-b-0">
                  <td className="px-4 py-3 text-sm font-semibold text-slate-900">{step.step}</td>
                  <td className="px-4 py-3 text-sm text-slate-900">{step.title}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{step.purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
        <h2 className="font-[var(--font-jakarta)] text-2xl font-semibold text-slate-900">Implementation Outcomes</h2>
        <ul className="mt-3 space-y-1 text-sm text-slate-700">
          {setupWizardOutcomes.map((outcome) => (
            <li key={outcome}>- {outcome}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
