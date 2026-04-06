import CTABanner from "@/components/CTABanner";
import ScrollReveal from "@/components/ScrollReveal";
import { createPageMetadata } from "@/lib/metadata";
import { localizeHref, type Locale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return createPageMetadata({
    title: "Who It's For",
    description: "Loquor AAC serves communicators of all ages, speech-language pathologists, caregivers, and educators.",
    path: "/who-its-for",
    locale: locale as Locale,
  });
}

const audiences = [
  {
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
    title: "Adults with Acquired Conditions",
    conditions: "ALS, stroke, aphasia, TBI, dysarthria, apraxia",
    description: "For adults who have lost or are losing the ability to speak, Loquor AAC offers efficient text input with predictive suggestions, quick access to common phrases, and high-quality voice output that helps preserve communication identity.",
    highlights: ["Fast text typing with word predictions", "Customizable phrase libraries for daily routines", "Premium AI voices for natural-sounding speech", "Offline capability for reliable communication anywhere"],
    color: "from-blue-500 to-indigo-600",
    bgColor: "bg-blue-50",
  },
  {
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
      </svg>
    ),
    title: "Children & Pre-Literate Communicators",
    conditions: "Autism, cerebral palsy, developmental delays, intellectual disabilities",
    description: "Symbol-based communication with stable, motor-planning friendly layouts that support learning. The progressive vocabulary system grows with the child, and the child-friendly theme makes the experience engaging.",
    highlights: ["Pictogram symbols with stable grid positions for muscle memory", "Progressive 6-level vocabulary that grows with the child", "Child-friendly theme with large, colorful tap targets", "Fitzgerald Key color-coding for visual grammar learning"],
    color: "from-emerald-500 to-teal-600",
    bgColor: "bg-emerald-50",
  },
  {
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
    title: "Speech-Language Pathologists",
    conditions: "Clinical practice, therapy sessions, assessment",
    description: "Advanced grammar controls, three assist levels (Simple, Standard, Expert), and comprehensive admin tools give SLPs the precision they need. Vocabulary statistics and pack management streamline clinical workflows.",
    highlights: ["Three assist levels for different therapy stages", "Grammar Bar with gender-aware article selection", "Vocabulary statistics panel for tracking progress", "Vocabulary Packs for structured language intervention"],
    color: "from-violet-500 to-purple-600",
    bgColor: "bg-violet-50",
  },
  {
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
    title: "Caregivers & Family Members",
    conditions: "Parents, guardians, home care, daily support",
    description: "The 11-step guided setup wizard makes getting started simple — no technical expertise required. PIN protection keeps settings safe, while profile management lets caregivers manage multiple communicators on a single device.",
    highlights: ["11-step guided setup wizard — no tech skills needed", "PIN-protected admin to prevent accidental edits", "Multi-user profiles for managing multiple communicators", "Backup & restore to protect customizations"],
    color: "from-rose-500 to-pink-600",
    bgColor: "bg-rose-50",
  },
  {
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
      </svg>
    ),
    title: "Educational Settings",
    conditions: "Schools, special education, classroom use",
    description: "The progressive vocabulary system and Fitzgerald Key visual learning aids make Loquor AAC ideal for educational environments. Activity Boards can be customized for classroom contexts.",
    highlights: ["Progressive vocabulary for structured learning paths", "Fitzgerald Key color-coding teaches grammar visually", "Activity Boards for classroom-specific contexts", "High contrast and accessible design for all learners"],
    color: "from-amber-500 to-orange-600",
    bgColor: "bg-amber-50",
  },
];

export default async function WhoItsForPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = locale as Locale;

  return (
    <div className="py-16 space-y-20">
      <ScrollReveal>
        <div className="text-center space-y-4">
          <h1 className="font-(--font-jakarta) text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight">
            Built for People Who{" "}
            <span className="text-gradient">Need It Most</span>
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-slate-600 leading-relaxed">
            Loquor AAC serves communicators of all ages and abilities, along with the clinicians,
            caregivers, and educators who support them.
          </p>
        </div>
      </ScrollReveal>

      <div className="space-y-8">
        {audiences.map((audience) => (
          <ScrollReveal key={audience.title}>
            <div className="rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-lg transition-shadow duration-300">
              <div className={`h-2 bg-linear-to-r ${audience.color}`} />
              <div className="p-8 sm:p-10">
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="lg:w-2/5 space-y-4">
                    <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl ${audience.bgColor} text-slate-700`}>
                      {audience.icon}
                    </div>
                    <h2 className="font-(--font-jakarta) text-2xl font-bold text-slate-900">{audience.title}</h2>
                    <p className="text-sm font-medium text-indigo-600">{audience.conditions}</p>
                    <p className="text-slate-600 leading-relaxed">{audience.description}</p>
                  </div>
                  <div className="lg:w-3/5">
                    <div className={`rounded-2xl ${audience.bgColor} p-6`}>
                      <p className="text-sm font-semibold text-slate-700 mb-4 uppercase tracking-wider">Key Benefits</p>
                      <ul className="space-y-3">
                        {audience.highlights.map((highlight, j) => (
                          <li key={j} className="flex items-start gap-3">
                            <svg className="mt-0.5 h-5 w-5 shrink-0 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-slate-700">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal>
        <CTABanner
          title="Find Out How Loquor AAC Can Help"
          subtitle="Whether you're a communicator, caregiver, or clinician — we'd love to hear from you."
          buttonText="Get in Touch"
          buttonHref={localizeHref("/contact", l)}
        />
      </ScrollReveal>
    </div>
  );
}
