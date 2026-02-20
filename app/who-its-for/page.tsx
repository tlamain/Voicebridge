import { personas } from "@/content/personas";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Who It Is For",
  description:
    "See how VoiceBridge AAC supports literate adults, emergent communicators, caregivers, and speech-language professionals.",
  path: "/who-its-for",
});

export default function WhoItsForPage() {
  return (
    <div className="space-y-8 py-12">
      <header className="space-y-3">
        <h1 className="font-[var(--font-jakarta)] text-4xl font-semibold tracking-tight text-slate-900">Who It Is For</h1>
        <p className="max-w-3xl text-lg text-slate-600">
          VoiceBridge AAC is built for people who communicate differently and for the teams supporting them every day.
        </p>
      </header>

      <div className="grid gap-5 md:grid-cols-3">
        {personas.map((persona) => (
          <article key={persona.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-[var(--font-jakarta)] text-xl font-semibold text-slate-900">{persona.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{persona.description}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
