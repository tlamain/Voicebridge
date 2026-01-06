
import Link from "next/link";

const features = [
  {
    title: "Text + symbol bridge",
    description:
      "Switch seamlessly between keyboards and symbol grids so every communicator can use the mode that works best for them.",
  },
  {
    title: "Clinical-grade privacy",
    description:
      "PIN-protected editing and on-device preferences keep sensitive information safe while respecting caregiver controls.",
  },
  {
    title: "Care team collaboration",
    description:
      "Share boards, presets, and phrases across users without breaking layouts, so SLPs and caregivers stay aligned.",
  },
  {
    title: "Consistent across devices",
    description:
      "Predictable layouts and synced vocabularies reduce relearning when moving between tablets, phones, or eye-tracking setups.",
  },
  {
    title: "Accessible by default",
    description:
      "High contrast palettes, large tap targets, and keyboard/switch-friendly navigation are built in - not bolted on.",
  },
  {
    title: "Rapid onboarding",
    description:
      "Guided setup, sensible defaults, and ready-to-use templates help teams get talking in minutes, not weeks.",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-14 py-12">
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-800 shadow-sm">
          Trusted assistive communication for clinical teams
        </div>
        <h1 className="font-[var(--font-jakarta)] text-4xl sm:text-5xl font-semibold text-slate-900 tracking-tight">
          A medical-grade AAC platform that feels intuitive and safe
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-slate-600">
          AyAySee (AAC) unifies text and symbol communication with dependable privacy controls, so users, caregivers,
          and clinicians can focus on the conversation - not the tooling.
        </p>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-700 to-blue-800 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:from-blue-800 hover:to-blue-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
          >
            Get Early Access
          </Link>
          <Link
            href="/features"
            className="inline-flex items-center justify-center rounded-full border border-blue-100 px-5 py-3 text-sm font-semibold text-blue-800 transition hover:border-blue-200 hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
          >
            See features
          </Link>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex flex-col gap-2 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-800">Designed for trust</p>
          <p className="text-slate-600">Built with clinicians, caregivers, and AAC users to reduce friction and cognitive load.</p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group h-full rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-800 ring-1 ring-blue-100">
                <span className="text-base font-semibold">*</span>
              </div>
              <h2 className="font-[var(--font-jakarta)] text-xl font-semibold text-slate-900">{feature.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
