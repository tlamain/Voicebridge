import CTABanner from "@/components/CTABanner";
import ScrollReveal from "@/components/ScrollReveal";
import AppScreenshot from "@/components/AppScreenshot";
import { createPageMetadata } from "@/lib/metadata";
import { localizeHref, type Locale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return createPageMetadata({
    title: "Activity Boards",
    description:
      "Create themed communication boards for meals, routines, therapy sessions, and more. Customise icons, grid size, background colours, and edit buttons directly on the board.",
    path: "/activity-boards",
    locale: locale as Locale,
  });
}

const sections = [
  {
    badge: "Board Management",
    title: "Create, Copy, and Organise Boards",
    description:
      "Build a library of themed boards for every situation — from mealtimes to therapy sessions. Duplicate an existing board to save time, then tweak it for a new context.",
    color: "bg-sky-50 text-sky-600 ring-sky-100",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    screenshotSrc: "/images/screenshots/activity-board-list.png",
    screenshotLabel: "Activity Board List",
    screenshotDescription: "Scrollable board list with search, icons, and column counts",
    items: [
      "Browse all boards for the current language with live search by title or description",
      "Create a new board with a title, icon or photo, grid width (6–12 columns), and background colour",
      "Copy from an existing board to duplicate its layout and all buttons in one tap",
      "Each board shows its icon, title, column count, button count, and vocabulary-pack origin",
      "Boards are language-specific — switching the app language shows a different set",
    ],
  },
  {
    badge: "Customisation",
    title: "Icons, Colours, and Grid Size",
    description:
      "Make every board instantly recognisable. Choose an emoji, a photo from the device, or an image from an installed vocabulary pack — then pick a background colour and grid width.",
    color: "bg-amber-50 text-amber-600 ring-amber-100",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />
      </svg>
    ),
    screenshotSrc: "/images/screenshots/activity-board-grid.png",
    screenshotLabel: "Board Editor",
    screenshotDescription: "Activity board grid with category buttons and icons",
    items: [
      "Icon or image picker with emoji, device photo library, and vocabulary-pack image options",
      "Live preview updates as you change icon, colour, or grid size",
      "Grid columns stepper — choose 6 to 12 columns; rows are calculated automatically from screen size",
      "Background colour from preset swatches gives each board a distinct visual identity",
      "Two-column editor layout on tablets for faster editing; single-column on phones",
    ],
  },
  {
    badge: "Grid Editing",
    title: "Build Board Contents Visually",
    description:
      "Open any board in grid edit mode to add, move, and arrange buttons directly on the grid. No need to leave the admin flow — everything happens in place.",
    color: "bg-emerald-50 text-emerald-600 ring-emerald-100",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
    screenshotSrc: "/images/screenshots/edit-board-layout.png",
    screenshotLabel: "Grid Edit Mode",
    screenshotDescription: "Board grid editor with drag handles and edit controls",
    items: [
      "Tap an empty cell to open the symbol picker — choose an existing symbol, search, or create a new one",
      "Create board-to-board link buttons and navigation buttons like Home and Back",
      "Move a button by selecting it and tapping another cell; edit it with a long-press",
      "Edit button details: label, spoken text, emoji, custom image, category, Fitzgerald colour, and background colour",
      "When finished, tap Done — the app returns to the board editor so you can continue adjusting settings",
    ],
  },
];

export default async function ActivityBoardsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = locale as Locale;

  return (
    <div className="py-16 space-y-20">
      {/* Hero */}
      <ScrollReveal>
        <div className="text-center space-y-4">
          <h1 className="font-(--font-jakarta) text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight">
            Activity Boards
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-slate-600 leading-relaxed">
            Themed communication boards tailored to specific routines, environments, and activities.
            Build a board for mealtimes, another for school, and switch between them in a tap.
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
          title="Ready to Build Your First Board?"
          subtitle="Download Loquor AAC and create communication boards tailored to every moment."
          buttonText="Try Loquor AAC"
          buttonHref={localizeHref("/contact", l)}
        />
      </ScrollReveal>
    </div>
  );
}
