import CTABanner from "../../components/CTABanner";
import ScrollReveal from "../../components/ScrollReveal";
import AppScreenshot from "../../components/AppScreenshot";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Symbol Library",
  description:
    "Manage your full symbol vocabulary — search, filter, favourite, hide, and edit symbols with spoken text, custom images, progressive vocabulary fields, and Fitzgerald colour coding.",
  path: "/symbol-management",
});

const sections = [
  {
    badge: "Browse & Find",
    title: "Smart Search and Filters",
    description:
      "Quickly find any symbol in your vocabulary. Search ranks results intelligently, and dynamic filter chips adapt to the categories that actually exist.",
    color: "bg-blue-50 text-blue-600 ring-blue-100",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
    screenshotSrc: "/images/screenshots/symbol-list.png",
    screenshotLabel: "Symbol List with Filters",
    screenshotDescription: "Symbol list with search bar, category filter chips, and quick-action buttons",
    items: [
      "Search by label with smart ranking — exact matches first, then starts-with, then contains",
      "Filter chips: All, Favourites, plus one chip per category that currently has symbols",
      "Each symbol card shows the image or emoji, label, category, and quick-action buttons",
      "Quick actions on every row: edit (pencil), show/hide (eye), and favourite (star)",
      "The symbol list loads for the active language — switch language to see a different set",
    ],
  },
  {
    badge: "Quick Actions",
    title: "Favourites and Visibility",
    description:
      "Star important symbols for fast access, or hide ones you do not want in regular use — without deleting them.",
    color: "bg-amber-50 text-amber-600 ring-amber-100",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
    screenshotSrc: "/images/screenshots/phrase-editor.png",
    screenshotLabel: "Favourites and Visibility",
    screenshotDescription: "Phrase editor with search and category tabs",
    items: [
      "Tap the star button to mark a symbol as a favourite — use the Favourites filter to find them instantly",
      "Tap the eye button to hide a symbol from regular use while keeping it in the database",
      "Hidden symbols can be restored at any time — safer than deleting when you are unsure",
      "Favourites and visibility states can also be controlled inside the full symbol editor",
    ],
  },
  {
    badge: "Symbol Editor",
    title: "Full Control Over Every Symbol",
    description:
      "Create new symbols or edit existing ones with a rich editor. Set the label, spoken text, image, category, and advanced metadata — all in one place.",
    color: "bg-emerald-50 text-emerald-600 ring-emerald-100",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
      </svg>
    ),
    screenshotSrc: "/images/screenshots/symbol-picker.png",
    screenshotLabel: "Symbol Editor",
    screenshotDescription: "Symbol creation dialog with category grid",
    items: [
      "Label — the visible name shown on the symbol card and in the grid",
      "Spoken Text — what the app says aloud; defaults to the label if left blank",
      "Emoji — a text-based emoji representation for quick visual recognition",
      "Custom Image — attach a photo from the device library or take one with the camera",
      "Category — every symbol must belong to a category for organisation and filtering",
      "Language — create or update the symbol for the currently active language",
    ],
  },
  {
    badge: "Advanced Features",
    title: "Progressive Vocabulary and Fitzgerald Colours",
    description:
      "For clinicians using structured learning progressions, each symbol carries metadata that controls when and how it appears in the progressive vocabulary system.",
    color: "bg-violet-50 text-violet-600 ring-violet-100",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
    screenshotSrc: "/images/screenshots/progressive-vocabulary-settings.png",
    screenshotLabel: "Progressive Vocabulary Fields",
    screenshotDescription: "Progressive vocabulary settings with level and display controls",
    items: [
      "Position — defines the symbol placement in the progressive grid for motor memory consistency",
      "Motor Zone — groups symbols by physical screen region for motor-planning support",
      "Word Type — classifies the symbol (noun, verb, adjective, etc.) for grammar and learning logic",
      "Introduction Level — controls at which of the 6 progressive levels the symbol becomes available",
      "Usage Priority and Prerequisites — fine-tune when a symbol unlocks and what must be mastered first",
      "Fitzgerald category override — explicitly assign a grammar colour group instead of relying on automatic behaviour",
    ],
  },
  {
    badge: "Safe Deletion",
    title: "Delete with Awareness",
    description:
      "When you delete a symbol, the app checks whether it is still used on activity boards or marked as a favourite — so you never accidentally break a board.",
    color: "bg-rose-50 text-rose-600 ring-rose-100",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
    ),
    screenshotSrc: "/images/screenshots/symbol-list.png",
    screenshotLabel: "Delete Warning",
    screenshotDescription: "Symbol list with management controls",
    items: [
      "Before deletion, the app warns if the symbol is used on any activity boards",
      "A separate warning appears if the symbol is currently in your favourites list",
      "If you only want to remove a symbol from regular use, hiding is the safer option",
      "Deletion is permanent — use it only when you no longer need the symbol at all",
    ],
  },
];

export default function SymbolManagementPage() {
  return (
    <div className="py-16 space-y-20">
      {/* Hero */}
      <ScrollReveal>
        <div className="text-center space-y-4">
          <h1 className="font-(--font-jakarta) text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight">
            Symbol Library
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-slate-600 leading-relaxed">
            Your complete vocabulary in one place. Search, filter, favourite, hide, and edit every symbol —
            with full control over how each one looks, sounds, and behaves in the progressive learning system.
          </p>
        </div>
      </ScrollReveal>

      {/* Feature Sections */}
      {sections.map((section, i) => (
        <ScrollReveal key={section.title}>
          <section className={`rounded-3xl p-8 sm:p-10 ${i % 2 === 0 ? "bg-white border border-slate-200" : "bg-slate-50"}`}>
            <div className={`flex flex-col lg:flex-row lg:items-start gap-10 ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
              {/* Text side */}
              <div className="lg:w-[55%] space-y-5">
                <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl ring-1 ${section.color}`}>
                  {section.icon}
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">{section.badge}</p>
                <h2 className="font-(--font-jakarta) text-2xl sm:text-3xl font-bold text-slate-900">{section.title}</h2>
                <p className="text-slate-600 leading-relaxed">{section.description}</p>
                <ul className="space-y-3 pt-2">
                  {section.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-sm text-slate-700 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Screenshot side */}
              <div className="w-full lg:w-[45%] lg:pt-20">
                <AppScreenshot
                  src={section.screenshotSrc}
                  label={section.screenshotLabel}
                  description={section.screenshotDescription}
                  aspectRatio="portrait"
                  size="full"
                  align={i % 2 === 1 ? "end" : "start"}
                />
              </div>
            </div>
          </section>
        </ScrollReveal>
      ))}

      <ScrollReveal>
        <CTABanner
          title="Take Control of Your Vocabulary"
          subtitle="Download Loquor AAC and build the perfect symbol library for every communicator."
          buttonText="Try Loquor AAC"
          buttonHref="/contact"
        />
      </ScrollReveal>
    </div>
  );
}
