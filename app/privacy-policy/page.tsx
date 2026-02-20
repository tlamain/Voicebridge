import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Privacy Policy",
  description:
    "Read how VoiceBridge AAC handles local-first data, optional voice services, backups, and user-controlled privacy settings.",
  path: "/privacy-policy",
});

const policySections = [
  {
    id: "data-collected",
    title: "1. Data We Collect",
    paragraphs: [
      "VoiceBridge AAC does not automatically collect personal data. Vocabulary, phrases, symbols, and settings are stored locally on the device.",
      "The app may store local content such as custom words, uploaded symbol images, usage frequency for prediction behavior, and hashed admin PIN material.",
    ],
  },
  {
    id: "data-not-collected",
    title: "2. Data Not Collected",
    paragraphs: ["We do not collect or centrally store conversation history, voice recordings, location data, device identifiers, or behavioral tracking profiles."],
  },
  {
    id: "voice-services",
    title: "3. Optional Voice Services",
    paragraphs: [
      "If a user enables a third-party voice provider, selected text may be sent only at speech time. This is user-initiated behavior.",
      "API keys remain on-device and are not transmitted by us.",
    ],
  },
  {
    id: "backups",
    title: "4. Local Backups",
    paragraphs: [
      "Backups are user initiated. The app does not upload backups automatically.",
      "Selective backup categories allow teams to include only the data they need for migration or handoff.",
    ],
  },
  {
    id: "security",
    title: "5. Data Security",
    paragraphs: [
      "Local-first storage and PIN protection support safer admin operations and reduced accidental configuration changes.",
      "Configured voice API keys are stored with secure platform mechanisms.",
    ],
  },
  {
    id: "children",
    title: "6. Children's Privacy",
    paragraphs: ["The app can be used by children, but the app itself does not collect age, identity, or behavioral profile data."],
  },
  {
    id: "updates",
    title: "7. Policy Updates",
    paragraphs: ["If this policy changes, the effective date and updated text will be published in-app and on this website."],
  },
] as const;

export default function PrivacyPolicyPage() {
  return (
    <div className="space-y-8 py-12">
      <header className="space-y-3">
        <h1 className="font-[var(--font-jakarta)] text-4xl font-semibold tracking-tight text-slate-900">
          Privacy Policy - {siteConfig.name}
        </h1>
        <p className="text-slate-600">Effective date: January 5, 2026</p>
      </header>

      <section className="grid gap-6 lg:grid-cols-[1fr_2fr]">
        <aside className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.1em] text-slate-500">Quick Summary</p>
            <ul className="mt-2 space-y-1 text-sm text-slate-700">
              <li>- Local-first by default</li>
              <li>- User-initiated backup and restore</li>
              <li>- Optional third-party voice at speak time only</li>
              <li>- PIN-protected admin workflows</li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.1em] text-slate-500">Jump To</p>
            <ul className="mt-2 space-y-1 text-sm text-blue-700">
              {policySections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`} className="no-underline hover:text-blue-800">
                    {section.title}
                  </a>
                </li>
              ))}
              <li>
                <a href="#contact" className="no-underline hover:text-blue-800">
                  8. Contact
                </a>
              </li>
            </ul>
          </div>
        </aside>

        <div className="space-y-6">
          {policySections.map((section) => (
            <section key={section.id} id={section.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900">{section.title}</h2>
              <div className="mt-3 space-y-3 text-slate-700">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}

          <section id="contact" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900">8. Contact</h2>
            <p className="mt-2 text-slate-700">For privacy questions, contact:</p>
            <p className="mt-1">
              <a href={`mailto:${siteConfig.supportEmail}`} className="font-semibold text-blue-700 no-underline hover:text-blue-800">
                {siteConfig.supportEmail}
              </a>
            </p>
          </section>
        </div>
      </section>
    </div>
  );
}
