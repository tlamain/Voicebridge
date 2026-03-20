import Link from "next/link";
import AppScreenshot from "../../components/AppScreenshot";
import CTABanner from "../../components/CTABanner";
import ScrollReveal from "../../components/ScrollReveal";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Smart Grammar Engine",
  description: "Automatic verb conjugation, noun pluralisation, and grammar bar assistance across Dutch, English, French, and Spanish — all offline.",
  path: "/smart-grammar",
});

const languageExamples = [
  {
    language: "English",
    flag: "🇬🇧",
    color: "bg-blue-50 ring-blue-100",
    labelColor: "text-blue-700",
    examples: [
      { input: "she + walk", output: "she walks", note: "3rd person singular -s" },
      { input: "I + be + walk", output: "I am walking", note: "Continuous aspect (-ing)" },
      { input: "he + do + not + eat", output: "he does not eat", note: "Do-support negation" },
      { input: "I + have + walk", output: "I have walked", note: "Perfect tense" },
    ],
  },
  {
    language: "Dutch",
    flag: "🇳🇱",
    color: "bg-orange-50 ring-orange-100",
    labelColor: "text-orange-700",
    examples: [
      { input: "hij + lopen", output: "hij loopt", note: "3rd person singular +t" },
      { input: "ik + hebben + lopen", output: "ik heb gelopen", note: "Perfect tense (hebben)" },
      { input: "ik + wassen + zich", output: "ik was me", note: "Reflexive pronoun adjustment" },
      { input: "ik + wil + gaan + jij + wil + gaan", output: "ik wil gaan jij wilt gaan", note: "Multi-clause sentence" },
    ],
  },
  {
    language: "French",
    flag: "🇫🇷",
    color: "bg-red-50 ring-red-100",
    labelColor: "text-red-700",
    examples: [
      { input: "je + aimer", output: "j'aime", note: "Elision before vowel" },
      { input: "demain + je + parler", output: "demain je parlerai", note: "Future tense from temporal marker" },
      { input: "je + manger + pas", output: "je ne mange pas", note: "Negation wrapping (ne…pas)" },
      { input: "manger + il + ?", output: "mange-t-il ?", note: "Interrogative inversion with euphonic -t-" },
    ],
  },
  {
    language: "Spanish",
    flag: "🇪🇸",
    color: "bg-yellow-50 ring-yellow-100",
    labelColor: "text-yellow-700",
    examples: [
      { input: "ella + hablar", output: "ella habla", note: "Present tense -ar verb" },
      { input: "yo + tener", output: "yo tengo", note: "Irregular yo-form" },
      { input: "ellos + vivir", output: "ellos viven", note: "3rd person plural -ir verb" },
      { input: "tú + poder", output: "tú puedes", note: "Stem-changing verb (o→ue)" },
    ],
  },
];

const engineCapabilities = [
  {
    title: "Verb Conjugation",
    description: "Automatically conjugates verbs based on subject, tense, and language. Handles regular and irregular verbs, modal constructions, and auxiliary-verb chains.",
    icon: "🔤",
  },
  {
    title: "Perfect Tense",
    description: "Detects auxiliary verbs (have, hebben, avoir) and converts the following verb to its past participle form. Dutch and French select the correct auxiliary automatically.",
    icon: "⏱",
  },
  {
    title: "Continuous Aspect",
    description: "English 'be + verb' constructions produce the correct -ing form. Handles spelling rules including CVC doubling, silent-e drop, and -ie → -ying.",
    icon: "🔄",
  },
  {
    title: "Modal Verbs",
    description: "Recognises modal verbs (can, will, moeten, pouvoir, poder) and forces the following main verb into its infinitive form.",
    icon: "💬",
  },
  {
    title: "Multi-Clause Support",
    description: "When a second subject pronoun appears mid-sentence, the engine starts a new grammatical clause. Each clause conjugates independently.",
    icon: "🔗",
  },
  {
    title: "Reflexive Verbs",
    description: "Dutch reflexive constructions resolve the correct pronoun form based on subject. 'ik + wassen + zich' → 'ik was me'; 'hij + wassen + zich' → 'hij wast zich'.",
    icon: "↩️",
  },
  {
    title: "Noun Pluralisation",
    description: "Long-press any noun to choose singular or plural before adding it to the message. The grammar engine then reconjugates verbs to agree with the new number.",
    icon: "📚",
  },
  {
    title: "French Noun Agreement",
    description: "Tap the 'plural' or 'feminine' control tokens to apply full noun-phrase agreement — articles, adjectives, and nouns all update together.",
    icon: "🇫🇷",
  },
];

const assistLevels = [
  {
    level: "Simple",
    audience: "Beginner communicators",
    color: "border-emerald-200 bg-emerald-50",
    badgeColor: "bg-emerald-100 text-emerald-700",
    behavior: "Only articles and demonstratives are shown in the grammar bar. Incompatible tokens are dimmed. Contextual hints appear below the bar to guide word order. Keeps choices narrow and reduces cognitive load.",
  },
  {
    level: "Standard",
    audience: "Everyday communication",
    color: "border-blue-200 bg-blue-50",
    badgeColor: "bg-blue-100 text-blue-700",
    behavior: "All four grammar groups (articles, demonstratives, possessives, prepositions) are visible. Incompatible tokens are dimmed based on noun gender. No additional hints. Best for most daily use.",
  },
  {
    level: "Expert",
    audience: "Therapists & advanced users",
    color: "border-violet-200 bg-violet-50",
    badgeColor: "bg-violet-100 text-violet-700",
    behavior: "All four groups shown with no dimming. Every token is equally visible. Full clinical control with no restrictions. Ideal when the therapist, not the app, decides what grammar cues to present.",
  },
];

const grammarBarGroups = [
  {
    name: "Articles",
    color: "bg-blue-500",
    examples: "de, het, een / the, a / le, la, les / el, la",
    description: "Inserted automatically before the last noun for natural word order.",
  },
  {
    name: "Demonstratives",
    color: "bg-emerald-500",
    examples: "dit, dat / this, that / ce, cette / este, esta",
    description: "Gender-aware dimming highlights the compatible option for the current noun.",
  },
  {
    name: "Possessives",
    color: "bg-orange-500",
    examples: "mijn, jouw / my, your / mon, ma / mi, tu",
    description: "Supports ownership framing across all four supported languages.",
  },
  {
    name: "Prepositions",
    color: "bg-violet-500",
    examples: "met, voor / with, for / avec, pour / con, para",
    description: "Adds location, direction, and relation context to any sentence.",
  },
];

export default function SmartGrammarPage() {
  return (
    <div className="space-y-16 py-12">

      {/* Page Header */}
      <ScrollReveal>
        <header className="space-y-4 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-sm font-medium text-amber-700 ring-1 ring-amber-100">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
            </svg>
            Language Intelligence
          </div>
          <h1 className="font-(--font-jakarta) text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight">
            Smart Grammar Engine
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            A context-aware grammar system that automatically conjugates verbs, selects the right auxiliary,
            handles reflexives, and applies sentence-level transformations — all in real time, completely offline.
            Supports Dutch, English, French, and Spanish.
          </p>
        </header>
      </ScrollReveal>

      {/* Hero screenshot */}
      <ScrollReveal>
        <AppScreenshot
          src="/images/screenshots/grammar-live-conjugation.svg"
          label="Smart Grammar Engine — Live Conjugation"
          description="Subject tapped → verb auto-conjugated → grammar bar ready for determiners"
          aspectRatio="landscape"
          size="full"
        />
      </ScrollReveal>

      {/* How It Works overview */}
      <ScrollReveal>
        <section className="rounded-3xl bg-slate-900 px-8 py-12 text-white">
          <h2 className="font-(--font-jakarta) text-2xl font-bold mb-8 text-center">How the Engine Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            {[
              {
                step: "1",
                title: "Tap symbols",
                description: "Each symbol tap is analysed: is it a pronoun, a noun, a temporal marker, or a verb? The engine identifies the word type automatically.",
              },
              {
                step: "2",
                title: "State machine updates",
                description: "A sentence state machine tracks subject, tense, auxiliary chain, and clause boundaries. When context changes, all verbs are reconjugated.",
              },
              {
                step: "3",
                title: "Display & speak",
                description: "Sentence-level transformations (do-support, elision, inversion, reflexives) are applied just before display. The result is a grammatically correct sentence.",
              },
            ].map((item) => (
              <div key={item.step} className="space-y-3">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white text-xl font-bold">
                  {item.step}
                </div>
                <h3 className="font-semibold text-white">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Language Examples */}
      <section className="space-y-8">
        <ScrollReveal>
          <div className="text-center space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">Live Examples</p>
            <h2 className="font-(--font-jakarta) text-3xl font-bold text-slate-900">Four Languages, One Tap</h2>
            <p className="mx-auto max-w-2xl text-slate-600">
              The engine applies language-specific rules for each supported language. Here are real examples from the app.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {languageExamples.map((lang) => (
            <ScrollReveal key={lang.language}>
              <div className={`rounded-2xl border p-6 space-y-4 ${lang.color}`}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{lang.flag}</span>
                  <h3 className={`font-bold text-lg ${lang.labelColor}`}>{lang.language}</h3>
                </div>
                <div className="space-y-3">
                  {lang.examples.map((ex, i) => (
                    <div key={i} className="rounded-xl bg-white/70 px-4 py-3 space-y-1 border border-white/50">
                      <div className="flex items-center gap-2 flex-wrap">
                        <code className="text-xs font-mono bg-slate-100 rounded px-2 py-0.5 text-slate-600">{ex.input}</code>
                        <svg className="h-3 w-3 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                        <code className="text-xs font-mono font-semibold bg-emerald-100 rounded px-2 py-0.5 text-emerald-800">{ex.output}</code>
                      </div>
                      <p className="text-xs text-slate-500">{ex.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Engine Capabilities */}
      <section className="space-y-8">
        <ScrollReveal>
          <div className="text-center space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">Capabilities</p>
            <h2 className="font-(--font-jakarta) text-3xl font-bold text-slate-900">What the Engine Handles</h2>
            <p className="mx-auto max-w-2xl text-slate-600">
              From simple present tense to complex multi-clause constructions — the engine covers the full range of grammar needs.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {engineCapabilities.map((cap) => (
            <ScrollReveal key={cap.title}>
              <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm h-full space-y-3">
                <span className="text-2xl">{cap.icon}</span>
                <h3 className="font-semibold text-slate-900">{cap.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{cap.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Grammar Bar */}
      <section className="space-y-8">
        <ScrollReveal>
          <div className="rounded-3xl bg-white border border-slate-200 p-8 sm:p-10">
            <div className="flex flex-col lg:flex-row gap-10 items-start">
              <div className="lg:w-1/2 space-y-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">Grammar Bar</p>
                <h2 className="font-(--font-jakarta) text-3xl font-bold text-slate-900">Determiner Helper</h2>
                <p className="text-slate-600 leading-relaxed">
                  The grammar bar is a horizontal strip of tappable chips that appears in tablet landscape mode.
                  Tap a chip to insert a determiner, possessive, or preposition directly before the last noun in the message —
                  producing natural word order without manual repositioning.
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  <strong className="text-slate-800">Gender-aware dimming:</strong> when a noun is in the message,
                  incompatible articles and demonstratives are automatically dimmed. Tap &ldquo;appel&rdquo; in Dutch
                  and &ldquo;de&rdquo; lights up while &ldquo;het&rdquo; fades — no grammar knowledge required.
                </p>
                <div className="space-y-3 pt-2">
                  {grammarBarGroups.map((group) => (
                    <div key={group.name} className="flex items-start gap-3">
                      <div className={`mt-1 h-3 w-3 shrink-0 rounded-sm ${group.color}`} />
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{group.name}</p>
                        <p className="text-xs text-slate-500">{group.examples}</p>
                        <p className="text-xs text-slate-600 mt-0.5">{group.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:w-1/2">
                <AppScreenshot
                  src="/images/screenshots/grammar-bar.svg"
                  label="Grammar Bar"
                  description="Colour-coded determiner chips with gender-aware dimming"
                  aspectRatio="landscape"
                  size="full"
                />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Assist Levels */}
      <section className="space-y-8">
        <ScrollReveal>
          <div className="text-center space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">Assist Levels</p>
            <h2 className="font-(--font-jakarta) text-3xl font-bold text-slate-900">The Right Amount of Help</h2>
            <p className="mx-auto max-w-2xl text-slate-600">
              One setting controls how much grammar assistance is shown. Choose the level that matches
              the communicator&apos;s needs — or change it as they grow.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {assistLevels.map((level) => (
            <ScrollReveal key={level.level}>
              <div className={`rounded-2xl border p-6 space-y-4 h-full ${level.color}`}>
                <div className="flex items-center justify-between">
                  <h3 className="font-(--font-jakarta) text-xl font-bold text-slate-900">{level.level}</h3>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${level.badgeColor}`}>{level.audience}</span>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">{level.behavior}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Offline & Privacy */}
      <ScrollReveal>
        <section className="rounded-3xl bg-slate-900 px-8 py-10 text-white">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10">
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-white text-lg">100% Offline — No Grammar API Required</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                The entire grammar engine — all four languages, all conjugation tables, all transformation rules —
                runs on-device. There are no cloud calls, no latency, and no privacy concerns.
                Verb exception data is stored locally in WatermelonDB and loaded into an in-memory cache for
                sub-millisecond lookup. Grammar processing is a fail-safe: if something goes wrong, the app
                always returns the original word rather than crashing or producing garbled output.
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Navigation links */}
      <ScrollReveal>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/progressive-vocabulary"
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-indigo-300 hover:text-indigo-700 hover:bg-indigo-50 no-underline"
          >
            Progressive Vocabulary →
          </Link>
          <Link
            href="/features"
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-indigo-300 hover:text-indigo-700 hover:bg-indigo-50 no-underline"
          >
            All Features →
          </Link>
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <CTABanner
          title="Experience Smart Grammar in Action"
          subtitle="Get early access and see how Loquor AAC handles grammar so your users don't have to."
          buttonText="Get Early Access"
          buttonHref="/contact"
        />
      </ScrollReveal>
    </div>
  );
}
