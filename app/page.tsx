import Link from "next/link";
import { adminHighlights, gridModes, productPillars, smartGrammarHighlights, trustSignals } from "@/content/features";
import { audienceOutcomes, communicationWorkflow } from "@/content/workflows";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Communication Platform for AAC Teams",
  description:
    "VoiceBridge AAC combines flexible grid modes, smart grammar support, voice fallback, and clinician-grade admin workflows.",
  path: "/",
});

export default function HomePage() {
  return (
    <div className="space-y-20 py-10 sm:py-14">
      <section className="section-shell render-optimized relative overflow-hidden p-8 sm:p-12">
        <div className="absolute -left-24 -top-24 h-56 w-56 rounded-full bg-blue-100 blur-3xl" aria-hidden />
        <div className="absolute -right-20 bottom-0 h-52 w-52 rounded-full bg-cyan-100 blur-3xl" aria-hidden />
        <div className="relative space-y-7">
          <p className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-blue-800">
            Clinical-ready AAC communication
          </p>
          <h1 className="max-w-4xl font-[var(--font-jakarta)] text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            VoiceBridge AAC brings communication, grammar guidance, and caregiver control into one workflow.
          </h1>
          <p className="max-w-3xl text-lg text-slate-600">
            Built for AAC users, caregivers, and clinicians who need reliable symbol and text communication with practical
            admin control and privacy-first data handling.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href={siteConfig.links.contact}
              className="inline-flex items-center justify-center rounded-full bg-blue-700 px-5 py-3 text-sm font-semibold text-white no-underline transition hover:bg-blue-800"
            >
              Request Early Access
            </Link>
            <Link
              href={siteConfig.links.features}
              className="inline-flex items-center justify-center rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-800 no-underline transition hover:border-slate-400 hover:bg-slate-50"
            >
              Explore Full Feature Map
            </Link>
          </div>
          <ul className="grid gap-2 pt-2 sm:grid-cols-3">
            {trustSignals.map((signal) => (
              <li key={signal} className="rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-700">
                {signal}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="product-pillars" className="render-optimized space-y-5">
        <header className="space-y-2">
          <p className="section-kicker">Product Pillars</p>
          <h2 className="section-title">What the platform delivers</h2>
        </header>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {productPillars.map((pillar) => (
            <article key={pillar.id} className="surface-card p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-blue-700">{pillar.value}</p>
              <h3 className="mt-2 font-[var(--font-jakarta)] text-xl font-semibold text-slate-900">{pillar.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{pillar.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="grid-modes" className="render-optimized space-y-5">
        <header className="space-y-2">
          <p className="section-kicker">Grid Modes</p>
          <h2 className="section-title">
            Choose the structure that matches each communicator
          </h2>
        </header>
        <div className="grid gap-5 lg:grid-cols-3">
          {gridModes.map((mode) => (
            <article key={mode.id} className="surface-card-muted bg-gradient-to-b from-white to-slate-50 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">{mode.bestFor}</p>
              <h3 className="mt-2 font-[var(--font-jakarta)] text-2xl font-semibold text-slate-900">{mode.name}</h3>
              <p className="mt-3 text-sm text-slate-600">{mode.summary}</p>
              <p className="mt-3 text-sm text-slate-700">{mode.details}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="smart-grammar" className="section-shell render-optimized grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="space-y-3">
          <p className="section-kicker">Smart Grammar</p>
          <h2 className="section-title">
            Guidance that supports sentence quality without slowing communication
          </h2>
          <p className="text-slate-600">
            Grammar support is designed for practical use during communication, not only for training scenarios. Teams can
            control assist level based on skill and context.
          </p>
        </div>
        <ul className="space-y-3">
          {smartGrammarHighlights.map((item) => (
            <li key={item.title} className="surface-card-muted rounded-xl p-4">
              <p className="font-semibold text-slate-900">{item.title}</p>
              <p className="mt-1 text-sm text-slate-600">{item.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="admin-tools" className="render-optimized grid gap-6 lg:grid-cols-[1fr_1.1fr]">
        <div className="surface-card space-y-4 p-6">
          <p className="section-kicker">Communication Workflow</p>
          <h2 className="font-[var(--font-jakarta)] text-2xl font-semibold text-slate-900">From message creation to adaptation</h2>
          <ol className="space-y-3">
            {communicationWorkflow.map((item) => (
              <li key={item.step} className="flex gap-3">
                <span className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-800">
                  {item.step}
                </span>
                <div>
                  <p className="font-semibold text-slate-900">{item.title}</p>
                  <p className="text-sm text-slate-600">{item.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="surface-card space-y-4 p-6">
          <p className="section-kicker">Admin and Outcomes</p>
          <h2 className="font-[var(--font-jakarta)] text-2xl font-semibold text-slate-900">Operational control for care teams</h2>
          <ul className="space-y-3">
            {adminHighlights.map((item) => (
              <li key={item.title} className="surface-card-muted rounded-xl p-4">
                <p className="font-semibold text-slate-900">{item.title}</p>
                <p className="mt-1 text-sm text-slate-600">{item.description}</p>
              </li>
            ))}
          </ul>
          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-900">Who benefits most</p>
            <ul className="mt-2 space-y-1 text-sm text-slate-600">
              {audienceOutcomes.map((item) => (
                <li key={item.audience}>
                  <span className="font-medium text-slate-800">{item.audience}:</span> {item.outcome}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="render-optimized rounded-3xl border border-blue-200 bg-gradient-to-r from-blue-700 to-blue-800 p-8 text-white shadow-lg shadow-blue-200">
        <h2 className="font-[var(--font-jakarta)] text-3xl font-semibold">Ready to evaluate VoiceBridge AAC with your team?</h2>
        <p className="mt-2 max-w-2xl text-blue-100">
          Share your care setting, communication goals, and devices. We will map the best setup path and feature profile.
        </p>
        <div className="mt-5">
          <Link
            href={siteConfig.links.contact}
            className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-blue-800 no-underline transition hover:bg-blue-50"
          >
            Contact the VoiceBridge Team
          </Link>
        </div>
      </section>
    </div>
  );
}
