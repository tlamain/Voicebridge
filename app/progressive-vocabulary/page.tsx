import Link from "next/link";
import AppScreenshot from "../../components/AppScreenshot";
import CTABanner from "../../components/CTABanner";
import ScrollReveal from "../../components/ScrollReveal";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Progressive Vocabulary",
  description: "A 6-level vocabulary learning system that grows with the user. Motor memory is protected, word positions never change, and progression is driven by real usage.",
  path: "/progressive-vocabulary",
});

const levels = [
  { level: 1, threshold: "80%", minUses: 3, description: "Essential power words", color: "bg-emerald-500", lightColor: "bg-emerald-50", textColor: "text-emerald-700", borderColor: "border-emerald-200" },
  { level: 2, threshold: "75%", minUses: 3, description: "Core communication starter", color: "bg-blue-500", lightColor: "bg-blue-50", textColor: "text-blue-700", borderColor: "border-blue-200" },
  { level: 3, threshold: "70%", minUses: 2, description: "Expanded core + basics", color: "bg-indigo-500", lightColor: "bg-indigo-50", textColor: "text-indigo-700", borderColor: "border-indigo-200" },
  { level: 4, threshold: "65%", minUses: 2, description: "Full core + people vocabulary", color: "bg-violet-500", lightColor: "bg-violet-50", textColor: "text-violet-700", borderColor: "border-violet-200" },
  { level: 5, threshold: "—", minUses: null, description: "Complete system — mastery ceiling", color: "bg-slate-400", lightColor: "bg-slate-50", textColor: "text-slate-600", borderColor: "border-slate-200" },
  { level: 6, threshold: "—", minUses: null, description: "Expert vocabulary — manual caregiver unlock", color: "bg-amber-500", lightColor: "bg-amber-50", textColor: "text-amber-700", borderColor: "border-amber-200" },
];

const keyPrinciples = [
  {
    icon: "🧠",
    title: "Motor Memory Protection",
    description: "Words never change position once introduced. A symbol at row 2, column 3 at Level 1 stays there through Level 6. Muscle memory built early carries forward forever.",
  },
  {
    icon: "🎯",
    title: "Per-Level Evaluation",
    description: "Only words introduced at the current level count toward advancement. Mastered words from previous levels don't inflate progress or create shortcuts.",
  },
  {
    icon: "📊",
    title: "Usage-Driven Advancement",
    description: "Words become 'mastered' only after being tapped the required number of times. The system measures genuine use, not just exposure.",
  },
  {
    icon: "👁",
    title: "Ghost Slots",
    description: "Locked words render as non-interactive ghost cells — visible but not tappable. Students see what's coming without being overwhelmed by it.",
  },
];

const fabStates = [
  {
    label: "In Progress",
    color: "bg-blue-500",
    icon: "📊",
    badge: "42%",
    description: "Progress below 75% — the FAB shows the current completion percentage in blue.",
  },
  {
    label: "Almost There",
    color: "bg-orange-500",
    icon: "💪",
    badge: "87%",
    description: "Progress 75%+ but not yet ready — FAB turns orange to signal the user is close.",
  },
  {
    label: "Ready!",
    color: "bg-emerald-500",
    icon: "🎉",
    badge: "100%",
    description: "All required words mastered — FAB turns green with a pulsing animation. Tap to advance.",
  },
];

const adminControls = [
  { label: "Enable Progression", description: "Toggle the entire system on or off. When off, all symbols are visible." },
  { label: "Show Ghost Slots", description: "Display locked word positions as ghosted previews with lock icons." },
  { label: "Mastery Threshold", description: "Adjust the percentage of words that must be mastered (50–100%, in 5% steps)." },
  { label: "Min Uses Per Word", description: "Adjust how many times each word must be tapped to count as mastered (1–10)." },
  { label: "Expert Vocabulary", description: "Unlocks Level 6 words. Only appears at Level 5+. Manual caregiver decision." },
  { label: "Reset Progression", description: "Resets all words back to Level 1. Requires confirmation." },
];

const gridSizeData = [
  { cols: "6 col", total: 244, level6: 6 },
  { cols: "7 col", total: 391, level6: 27 },
  { cols: "8 col", total: 506, level6: 52 },
  { cols: "9 col", total: 671, level6: 77 },
  { cols: "10 col", total: 720, level6: 79 },
  { cols: "11 col", total: 749, level6: 80 },
  { cols: "12 col", total: 840, level6: 86 },
];

export default function ProgressiveVocabularyPage() {
  return (
    <div className="space-y-16 py-12">

      {/* Page Header */}
      <ScrollReveal>
        <header className="space-y-4 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700 ring-1 ring-emerald-100">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
            </svg>
            Learning & Growth
          </div>
          <h1 className="font-(--font-jakarta) text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight">
            Progressive Vocabulary
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            A structured 6-level vocabulary system that grows with the communicator.
            Words unlock through genuine use, positions never move, and each level builds
            naturally on the one before.
          </p>
        </header>
      </ScrollReveal>

      {/* Hero screenshot */}
      <ScrollReveal>
        <AppScreenshot
          label="Progressive Vocabulary — Level Progress"
          description="Ghost slots, floating readiness button, and level progression"
          aspectRatio="landscape"
          size="full"
        />
      </ScrollReveal>

      {/* Core Principle */}
      <ScrollReveal>
        <section className="rounded-3xl bg-slate-900 px-8 py-12 text-white">
          <div className="text-center space-y-3 mb-10">
            <h2 className="font-(--font-jakarta) text-2xl font-bold">The Core Principle</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-sm leading-relaxed">
              Use words to unlock more words. Students start at Level 1 with a small set of essential words.
              As they demonstrate consistent use, the system tracks progress and unlocks the next level — revealing
              additional words on the grid without moving any existing ones.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyPrinciples.map((p) => (
              <div key={p.title} className="space-y-2 text-center">
                <span className="text-3xl">{p.icon}</span>
                <h3 className="font-semibold text-white">{p.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{p.description}</p>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* The 6 Levels */}
      <section className="space-y-8">
        <ScrollReveal>
          <div className="text-center space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">Level System</p>
            <h2 className="font-(--font-jakarta) text-3xl font-bold text-slate-900">Six Levels of Growth</h2>
            <p className="mx-auto max-w-2xl text-slate-600">
              Each level has its own threshold and mastery requirement. Thresholds decrease at higher levels
              because the word pools grow larger.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {levels.map((lvl) => (
            <ScrollReveal key={lvl.level}>
              <div className={`rounded-2xl border p-5 space-y-3 ${lvl.lightColor} ${lvl.borderColor}`}>
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${lvl.color} text-white font-bold text-sm`}>
                    L{lvl.level}
                  </div>
                  <div>
                    <p className={`text-sm font-semibold ${lvl.textColor}`}>Level {lvl.level}</p>
                    <p className="text-xs text-slate-600">{lvl.description}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="rounded-lg bg-white/70 px-3 py-2 text-center border border-white/50">
                    <p className="font-semibold text-slate-900">{lvl.threshold}</p>
                    <p className="text-slate-500">mastery threshold</p>
                  </div>
                  <div className="rounded-lg bg-white/70 px-3 py-2 text-center border border-white/50">
                    <p className="font-semibold text-slate-900">{lvl.minUses ?? "—"}</p>
                    <p className="text-slate-500">{lvl.minUses ? "taps to master" : lvl.level === 5 ? "mastery ceiling" : "manual unlock"}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <p className="text-center text-sm text-slate-500 max-w-2xl mx-auto">
            <strong className="text-slate-700">Level 5</strong> is the automatic advancement ceiling — all words are visible and the user is considered to have mastered the complete vocabulary.{" "}
            <strong className="text-slate-700">Level 6</strong> is not earned through usage; it is unlocked manually by a caregiver in admin settings.
          </p>
        </ScrollReveal>
      </section>

      {/* Two-column: screenshots + FAB states */}
      <section className="grid grid-cols-1 gap-8 lg:grid-cols-2 items-start">
        <ScrollReveal>
          <div className="space-y-4">
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">Readiness Feedback</p>
              <h2 className="font-(--font-jakarta) text-2xl font-bold text-slate-900">The Floating Readiness Button</h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                A floating action button (FAB) on the main screen gives the communicator live progress
                feedback. Its colour and badge update automatically as words are used.
                Tapping it opens the Readiness Check Modal with full stats.
              </p>
            </div>
            <div className="space-y-3">
              {fabStates.map((state) => (
                <div key={state.label} className="flex items-center gap-4 rounded-2xl bg-white border border-slate-200 p-4 shadow-sm">
                  <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${state.color} text-white shadow-md`}>
                    <span className="text-xs font-bold">{state.badge}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">{state.label}</p>
                    <p className="text-xs text-slate-500 leading-relaxed">{state.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="space-y-4">
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">Level-Up Flow</p>
              <h2 className="font-(--font-jakarta) text-2xl font-bold text-slate-900">Readiness Check Modal</h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                When the user taps the FAB, the Readiness Check Modal shows a detailed
                breakdown of progress toward the next level.
              </p>
            </div>
            <div className="space-y-2 text-sm">
              {[
                { icon: "📊", label: "Progress circle", detail: "Shows percentage toward the next level" },
                { icon: "📈", label: "Status title", detail: "Keep Going / Making Progress / Almost There / You're Ready!" },
                { icon: "🔢", label: "Stats row", detail: "Words used · Words mastered · Total taps" },
                { icon: "💡", label: "Practice recommendations", detail: "Up to 12 words that still need more taps" },
                { icon: "🔓", label: "Unlock button", detail: "Appears only when the threshold is met" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3 rounded-xl bg-white border border-slate-200 p-3">
                  <span className="text-base">{item.icon}</span>
                  <div>
                    <p className="font-semibold text-slate-800">{item.label}</p>
                    <p className="text-xs text-slate-500">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
            <AppScreenshot
              label="Readiness Check Modal"
              description="Progress circle, stats, and practice recommendations"
              aspectRatio="portrait"
              size="sm"
            />
          </div>
        </ScrollReveal>
      </section>

      {/* Core-Fringe Grid Sizes */}
      <section className="space-y-8">
        <ScrollReveal>
          <div className="rounded-3xl bg-white border border-slate-200 p-8 sm:p-10 space-y-6">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">Core-Fringe Mode</p>
              <h2 className="font-(--font-jakarta) text-3xl font-bold text-slate-900">Grid-Size Independent Progression</h2>
              <p className="text-slate-600 leading-relaxed max-w-2xl">
                In Core-Fringe mode, progression is scoped to the symbols placed on the active grid layout.
                Each grid size has its own pool — switching grid sizes switches the progression pool independently.
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-2 pr-6 font-semibold text-slate-700">Grid Size</th>
                    <th className="text-right py-2 pr-6 font-semibold text-slate-700">Total Concepts</th>
                    <th className="text-right py-2 font-semibold text-slate-700">Level 6 Concepts</th>
                  </tr>
                </thead>
                <tbody>
                  {gridSizeData.map((row) => (
                    <tr key={row.cols} className="border-b border-slate-100">
                      <td className="py-2.5 pr-6 font-medium text-slate-900">{row.cols}</td>
                      <td className="py-2.5 pr-6 text-right text-slate-600">{row.total.toLocaleString()}</td>
                      <td className="py-2.5 text-right text-slate-600">{row.level6}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Admin Controls */}
      <section className="space-y-8">
        <ScrollReveal>
          <div className="text-center space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">Admin Controls</p>
            <h2 className="font-(--font-jakarta) text-3xl font-bold text-slate-900">Caregiver Configuration</h2>
            <p className="mx-auto max-w-2xl text-slate-600">
              All progression settings are in the Admin screen under Language → Progressive Vocabulary.
              Each setting is per-user, so different communicators can have different mastery requirements.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {adminControls.map((ctrl) => (
            <ScrollReveal key={ctrl.label}>
              <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm space-y-2 h-full">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50">
                  <svg className="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <p className="font-semibold text-slate-900">{ctrl.label}</p>
                <p className="text-sm text-slate-600 leading-relaxed">{ctrl.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Word Finder integration */}
      <ScrollReveal>
        <section className="rounded-3xl bg-slate-50 border border-slate-200 p-8 sm:p-10">
          <div className="flex flex-col lg:flex-row gap-10 items-center">
            <div className="lg:w-1/2 space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">Word Finder Integration</p>
              <h2 className="font-(--font-jakarta) text-2xl font-bold text-slate-900">Locked Words Are Clearly Marked</h2>
              <p className="text-slate-600 leading-relaxed">
                Word Finder searches the entire vocabulary but shows locked words as unavailable — each
                labelled with <em>&ldquo;Available at Level X&rdquo;</em>. Tapping a locked result does nothing.
                Once the user advances to the required level, the same result becomes fully selectable.
              </p>
              <ul className="space-y-2 text-sm text-slate-700">
                {[
                  "Search results are sorted with unlocked words first",
                  "Locked results show the required level, not just a padlock",
                  "Step-by-step guidance cannot activate a locked cell",
                  "Updates instantly when a new level is unlocked",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <svg className="h-4 w-4 mt-0.5 shrink-0 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:w-1/2">
              <AppScreenshot
                label="Word Finder with Locked Results"
                description="Locked words shown with 'Available at Level X' label"
                aspectRatio="portrait"
                size="sm"
              />
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Navigation links */}
      <ScrollReveal>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/smart-grammar"
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-indigo-300 hover:text-indigo-700 hover:bg-indigo-50 no-underline"
          >
            Smart Grammar Engine →
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
          title="Help Shape Loquor AAC"
          subtitle="Join the early access programme and give every communicator the vocabulary they deserve."
          buttonText="Get Early Access"
          buttonHref="/contact"
        />
      </ScrollReveal>
    </div>
  );
}
