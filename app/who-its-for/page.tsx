import { personaWorkflows } from "@/content/personas";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Who It Is For",
  description:
    "Role-based workflows for AAC users, caregivers, and SLP teams using VoiceBridge across home, school, and clinical environments.",
  path: "/who-its-for",
});

export default function WhoItsForPage() {
  return (
    <div className="space-y-10 py-12">
      <header className="space-y-3">
        <h1 className="font-[var(--font-jakarta)] text-4xl font-semibold tracking-tight text-slate-900">Who It Is For</h1>
        <p className="max-w-3xl text-lg text-slate-600">
          VoiceBridge AAC is structured around real workflows for communicators, caregivers, and therapy teams.
        </p>
      </header>

      <div className="space-y-6">
        {personaWorkflows.map((persona) => (
          <article key={persona.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-[var(--font-jakarta)] text-2xl font-semibold text-slate-900">{persona.title}</h2>
            <p className="mt-2 text-slate-600">{persona.overview}</p>

            <div className="mt-5 grid gap-5 lg:grid-cols-3">
              <section>
                <h3 className="text-sm font-semibold uppercase tracking-[0.1em] text-slate-500">Primary Needs</h3>
                <ul className="mt-2 space-y-1 text-sm text-slate-700">
                  {persona.primaryNeeds.map((need) => (
                    <li key={need}>- {need}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h3 className="text-sm font-semibold uppercase tracking-[0.1em] text-slate-500">Typical Workflow</h3>
                <ol className="mt-2 space-y-1 text-sm text-slate-700">
                  {persona.workflow.map((step, index) => (
                    <li key={step}>
                      {index + 1}. {step}
                    </li>
                  ))}
                </ol>
              </section>

              <section>
                <h3 className="text-sm font-semibold uppercase tracking-[0.1em] text-slate-500">Expected Outcomes</h3>
                <ul className="mt-2 space-y-1 text-sm text-slate-700">
                  {persona.outcomes.map((outcome) => (
                    <li key={outcome}>- {outcome}</li>
                  ))}
                </ul>
              </section>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
