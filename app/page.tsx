import Link from "next/link";
import FeatureCard from "../components/FeatureCard";
import SectionHeading from "../components/SectionHeading";
import CTABanner from "../components/CTABanner";
import ScrollReveal from "../components/ScrollReveal";
import AppScreenshot from "../components/AppScreenshot";

const features = [
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
      </svg>
    ),
    title: "Symbol & Text Communication",
    description: "Tap pictogram symbols or type freely. Build messages naturally with a configurable 6–12 column grid, a message builder strip, and smart word prediction.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
      </svg>
    ),
    title: "Smart Grammar Engine",
    description: "Automatic verb conjugation, perfect tense, continuous aspect, and reflexives — all handled silently. Supports Dutch, English, French, and Spanish with language-specific rules.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
      </svg>
    ),
    title: "Premium AI Voices",
    description: "Free offline device voices or premium ElevenLabs AI voices for natural, expressive speech. Automatic fallback ensures communication never stops.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    title: "Progressive Vocabulary",
    description: "A 6-level learning system that grows with the user. Words unlock progressively based on real usage, with ghost slot previews and a floating readiness indicator.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
    title: "Three Grid Modes",
    description: "Standard Symbol Grid, Activity Boards for routines, and Core-Fringe with pinned core vocabulary. In-grid editing for full customisation.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
    title: "4 Languages, All Offline",
    description: "English, Dutch, French, and Spanish — each with its own grammar rules, vocabulary packs, and voice options. Everything works completely offline.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: "Clinical-Grade Privacy",
    description: "All data stays on-device. No tracking, no cloud uploads. PIN-protected admin access keeps settings safe from accidental changes.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
    title: "Multi-User Profiles",
    description: "Completely isolated profiles for each communicator with separate databases and settings. Easy profile switching, duplication, and a guided setup wizard.",
  },
];

const howItWorks = [
  {
    step: "1",
    title: "Choose",
    description: "Tap pictogram symbols from a customizable grid, or type freely with smart word predictions.",
    color: "bg-indigo-500",
  },
  {
    step: "2",
    title: "Build",
    description: "Smart grammar automatically conjugates verbs, selects articles, and forms grammatically correct sentences.",
    color: "bg-blue-500",
  },
  {
    step: "3",
    title: "Speak",
    description: "Press speak to hear your message in a natural voice — choose from device voices or premium AI options.",
    color: "bg-violet-500",
  },
];

const stats = [
  { value: "4", label: "Languages" },
  { value: "3", label: "Grid Modes" },
  { value: "6", label: "Vocabulary Levels" },
  { value: "100%", label: "Offline Capable" },
];

export default function HomePage() {
  return (
    <div className="space-y-20 py-16">
      {/* Hero Section */}
      <section className="text-center space-y-8">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-5 py-2.5 text-sm font-medium text-indigo-700 shadow-sm ring-1 ring-indigo-100">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
            </svg>
            Augmentative &amp; Alternative Communication
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <h1 className="font-(--font-jakarta) text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-[1.1]">
            Give Every Voice the{" "}
            <span className="text-gradient">Power to Be Heard</span>
          </h1>
        </ScrollReveal>

        <ScrollReveal>
          <p className="mx-auto max-w-3xl text-lg sm:text-xl text-slate-600 leading-relaxed">
            Loquor AAC empowers people with speech difficulties through symbol-based communication,
            smart grammar assistance, and natural-sounding voices — all while keeping data private and on-device.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-linear-to-r from-indigo-600 to-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition-all duration-200 hover:from-indigo-700 hover:to-blue-700 hover:shadow-xl hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 no-underline"
            >
              Get Early Access
              <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <Link
              href="/features"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 px-7 py-3.5 text-sm font-semibold text-slate-700 transition-all duration-200 hover:border-indigo-300 hover:text-indigo-700 hover:bg-indigo-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 no-underline"
            >
              Explore Features
            </Link>
          </div>
        </ScrollReveal>

        {/* Hero App Screenshot */}
        <ScrollReveal>
          <div className="mx-auto max-w-4xl">
            <AppScreenshot
              src="/images/screenshots/main-screen.svg"
              label="Loquor AAC — Main Screen"
              description="Symbol grid, message builder, and grammar bar"
              aspectRatio="landscape"
              size="full"
            />
          </div>
        </ScrollReveal>
      </section>

      {/* How It Works */}
      <section className="space-y-10">
        <ScrollReveal>
          <SectionHeading
            badge="How It Works"
            title="Communication in Three Simple Steps"
            subtitle="From selecting symbols to speaking out loud — Loquor AAC makes it effortless."
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {howItWorks.map((item, i) => (
            <ScrollReveal key={item.title} delay={(i + 1) * 100 as 100 | 200 | 300}>
              <div className="relative text-center space-y-4 p-6">
                <div className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl ${item.color} text-white text-xl font-bold shadow-lg`}>
                  {item.step}
                </div>
                {i < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-[calc(50%+40px)] w-[calc(100%-80px)] border-t-2 border-dashed border-slate-300" />
                )}
                <h3 className="font-(--font-jakarta) text-xl font-bold text-slate-900">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Feature Cards */}
      <section className="space-y-10">
        <ScrollReveal>
          <SectionHeading
            badge="Features"
            title="Everything You Need to Communicate"
            subtitle="Built with clinicians, caregivers, and AAC users to reduce friction and cognitive load."
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <ScrollReveal key={feature.title} delay={((i % 4) + 1) * 100 as 100 | 200 | 300 | 400}>
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Smart Grammar Feature Spotlight */}
      <section className="space-y-10">
        <ScrollReveal>
          <SectionHeading
            badge="Language Intelligence"
            title="Smart Grammar That Thinks Ahead"
            subtitle="Tap a subject and a verb — Loquor handles the rest. Context-aware conjugation across four languages."
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 items-center">
          <ScrollReveal>
            <div className="space-y-6">
              {[
                {
                  lang: "English",
                  input: "she + walk",
                  output: "she walks",
                  note: "3rd person singular -s",
                },
                {
                  lang: "Dutch",
                  input: "ik + hebben + lopen",
                  output: "ik heb gelopen",
                  note: "Perfect tense with auxiliary",
                },
                {
                  lang: "French",
                  input: "je + aimer",
                  output: "j'aime",
                  note: "Automatic elision before vowel",
                },
                {
                  lang: "Spanish",
                  input: "ella + hablar",
                  output: "ella habla",
                  note: "Present tense conjugation",
                },
              ].map((example) => (
                <div
                  key={example.lang}
                  className="flex items-start gap-4 rounded-2xl bg-white border border-slate-200 p-5 shadow-sm"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 ring-1 ring-indigo-100">
                    <svg className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600 mb-1">{example.lang}</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <code className="rounded-md bg-slate-100 px-2 py-0.5 text-sm font-mono text-slate-600">{example.input}</code>
                      <svg className="h-3.5 w-3.5 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                      <code className="rounded-md bg-emerald-50 px-2 py-0.5 text-sm font-mono font-semibold text-emerald-700">{example.output}</code>
                    </div>
                    <p className="mt-1 text-xs text-slate-500">{example.note}</p>
                  </div>
                </div>
              ))}

              <div className="pt-2">
                <Link
                  href="/smart-grammar"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800 no-underline transition-colors"
                >
                  Explore the full grammar engine
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <AppScreenshot
              src="/images/screenshots/smart-grammar.svg"
              label="Smart Grammar Engine"
              description="Context-aware verb conjugation and grammar bar"
              aspectRatio="portrait"
              size="md"
            />
          </ScrollReveal>
        </div>
      </section>

      {/* Progressive Vocabulary Spotlight */}
      <section className="space-y-10">
        <ScrollReveal>
          <SectionHeading
            badge="Progressive Learning"
            title="Vocabulary That Grows With the User"
            subtitle="Words unlock based on real usage. Positions never change, so motor memory always carries forward."
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 items-center">
          <ScrollReveal>
            <AppScreenshot
              src="/images/screenshots/progressive-vocabulary.svg"
              label="Progressive Vocabulary"
              description="Level progression with ghost slots and readiness button"
              aspectRatio="portrait"
              size="md"
            />
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="space-y-5">
              {[
                {
                  level: "Level 1",
                  pct: 100,
                  label: "Essential power words — 80% mastery threshold",
                  color: "bg-emerald-500",
                  badge: "Completed",
                  badgeColor: "bg-emerald-100 text-emerald-700",
                },
                {
                  level: "Level 2",
                  pct: 75,
                  label: "Core communication starter — 75% mastery threshold",
                  color: "bg-blue-500",
                  badge: "In progress",
                  badgeColor: "bg-blue-100 text-blue-700",
                },
                {
                  level: "Level 3",
                  pct: 0,
                  label: "Expanded core + basics — 70% mastery threshold",
                  color: "bg-slate-300",
                  badge: "Locked",
                  badgeColor: "bg-slate-100 text-slate-500",
                },
                {
                  level: "Level 4–6",
                  pct: 0,
                  label: "Full vocabulary up to expert level",
                  color: "bg-slate-200",
                  badge: "Locked",
                  badgeColor: "bg-slate-100 text-slate-500",
                },
              ].map((item) => (
                <div key={item.level} className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-900">{item.level}</p>
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${item.badgeColor}`}>{item.badge}</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                    <div className={`h-full rounded-full ${item.color} transition-all`} style={{ width: `${item.pct}%` }} />
                  </div>
                  <p className="text-xs text-slate-500">{item.label}</p>
                </div>
              ))}

              <div className="pt-2">
                <Link
                  href="/progressive-vocabulary"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800 no-underline transition-colors"
                >
                  Learn how progression works
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Trust Stats */}
      <section>
        <ScrollReveal>
          <div className="rounded-3xl bg-slate-900 px-8 py-14">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-(--font-jakarta) text-4xl font-bold text-white">{stat.value}</p>
                  <p className="mt-2 text-sm font-medium text-slate-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* CTA */}
      <ScrollReveal>
        <CTABanner
          title="Ready to Try Loquor AAC?"
          subtitle="Join the early access program and help shape the future of accessible communication."
          buttonText="Get Early Access"
          buttonHref="/contact"
        />
      </ScrollReveal>
    </div>
  );
}
