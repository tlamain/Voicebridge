import CTABanner from "@/components/CTABanner";
import ScrollReveal from "@/components/ScrollReveal";
import AppScreenshot from "@/components/AppScreenshot";
import { createPageMetadata } from "@/lib/metadata";
import { localizeHref, type Locale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return createPageMetadata({
    title: "Core-Fringe Layouts",
    description:
      "Build multi-page communication layouts where high-frequency core words stay pinned while fringe vocabulary changes by context. Manage page trees, slots, and navigation automatically.",
    path: "/core-fringe",
    locale: locale as Locale,
  });
}

const sections = [
  {
    badge: "Layout Management",
    title: "Create and Activate Layouts",
    description:
      "Each language can have multiple core-fringe layouts, but only one is active at a time. Create a layout, set its grid size, and activate it when ready.",
    color: "bg-violet-50 text-violet-600 ring-violet-100",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
    screenshotSrc: "/images/screenshots/core-fringe-list.png",
    screenshotLabel: "Core-Fringe Layout List",
    screenshotDescription: "Layout list with active badge, grid size, page and slot counts",
    items: [
      "Browse all layouts for the current language with live search by name",
      "Create a layout with a name, icon or photo, and grid size (6–12 columns) — rows are calculated automatically",
      "Each new layout starts with a root Home page created for you",
      "Activate a layout to make it the one used in core-fringe mode for that language",
      "Only one layout can be active per language — the active layout is always sorted to the top",
      "Layout rows show icon, name, grid size, page count, slot count, pack origin, and active status",
    ],
  },
  {
    badge: "Page Hierarchy",
    title: "Page Trees with Automatic Navigation",
    description:
      "Organise vocabulary across a tree of pages. When you add a sub-page, the app automatically places a link tile on the parent and adds Home and Back buttons on the new page.",
    color: "bg-emerald-50 text-emerald-600 ring-emerald-100",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
      </svg>
    ),
    screenshotSrc: "/images/screenshots/edit-board-layout.png",
    screenshotLabel: "Page Tree Manager",
    screenshotDescription: "Grid editor with page navigation and editing controls",
    items: [
      "Every layout starts with a root Home page — add sub-pages beneath it to build topic areas",
      "Creating a sub-page automatically places a link tile on the parent page (with a warning if no free slot exists)",
      "New sub-pages get automatic Home and Back navigation buttons on their own grid",
      "Edit a page title, icon, or image — link tiles pointing to it update automatically to stay in sync",
      "Copy a page to duplicate its structure and slots, then adjust for a new topic",
      "On tablets, the page tree shows inline in the editor; on phones, a dedicated Page Manager modal opens",
    ],
  },
  {
    badge: "Core Vocabulary",
    title: "Pinned Core Slots vs Dynamic Fringe Slots",
    description:
      "The heart of the core-fringe model: pin high-frequency words so they stay visible on every page, while fringe slots change as the user navigates between topics.",
    color: "bg-blue-50 text-blue-600 ring-blue-100",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
    screenshotSrc: "/images/screenshots/core-fringe-grid.png",
    screenshotLabel: "Pinned vs Dynamic Slots",
    screenshotDescription: "Core-fringe grid with pinned core words and dynamic fringe vocabulary",
    items: [
      "Pinned (Core) slots stay visible during navigation — they act as shared core vocabulary across the layout",
      "Dynamic (Fringe) slots change when the user moves between pages — used for topic-specific words",
      "The slot editor includes a Pinned toggle so you can promote any word to core status",
      "Two slot types: symbol slots (vocabulary) and link slots (page navigation) — each with tailored editing options",
      "Move slots by selecting one cell and tapping another; swap by moving onto an occupied cell",
    ],
  },
  {
    badge: "Grid Editing",
    title: "Edit Layouts Directly on the Grid",
    description:
      "Open any layout or page in grid edit mode to populate cells, rearrange slots, and manage navigation — all without leaving the admin flow.",
    color: "bg-rose-50 text-rose-600 ring-rose-100",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
      </svg>
    ),
    screenshotSrc: "/images/screenshots/edit-board-layout.png",
    screenshotLabel: "Core-Fringe Grid Edit Mode",
    screenshotDescription: "Grid edit bar with page selector, Add Page, Copy Page, and Done actions",
    items: [
      "Tap an empty cell to open the symbol picker — add vocabulary, navigation buttons, or page links",
      "Long-press an existing slot to edit its label, spoken text, image, colour, pinned state, or position",
      "Page selector in the edit bar lets you jump between pages while editing",
      "Add Page and Copy Page actions are available directly from the edit bar",
      "Tap Done to return to the layout editor — it reopens automatically so you do not lose your place",
    ],
  },
];

export default async function CoreFringePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = locale as Locale;

  return (
    <div className="py-16 space-y-20">
      {/* Hero */}
      <ScrollReveal>
        <div className="text-center space-y-4">
          <h1 className="font-(--font-jakarta) text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight">
            Core-Fringe Layouts
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-slate-600 leading-relaxed">
            A multi-page communication system where high-frequency core words stay visible on every page
            while fringe vocabulary adapts to the current topic. The gold standard for structured AAC.
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
          title="Experience Core-Fringe Communication"
          subtitle="Try Loquor AAC and see how pinned core vocabulary transforms AAC."
          buttonText="Try Loquor AAC"
          buttonHref={localizeHref("/contact", l)}
        />
      </ScrollReveal>
    </div>
  );
}
