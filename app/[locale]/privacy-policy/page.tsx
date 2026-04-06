import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";
import { localizeHref, type Locale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return createPageMetadata({
    title: "Privacy Policy",
    description: "Read how Loquor AAC handles local-first data, optional voice services, backups, and user-controlled privacy settings.",
    path: "/privacy-policy",
    locale: locale as Locale,
  });
}

export default async function PrivacyPolicyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = locale as Locale;

  return (
    <div className="py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-(--font-jakarta) text-4xl font-bold text-slate-900 tracking-tight mb-2">
          Privacy Policy &mdash; {siteConfig.name}
        </h1>
        <p className="text-slate-500 mb-10">Effective date: January 5, 2026</p>

        <div className="space-y-8">
          <p className="text-lg text-slate-600 leading-relaxed">
            {siteConfig.name} (&ldquo;the App&rdquo;) is designed to give users a reliable communication voice using text, symbols, and optional speech synthesis. Your privacy is central to our design.
          </p>

          <section className="rounded-2xl bg-white border border-slate-200 p-6 space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">1. Data We Collect</h2>
            <p className="text-slate-600">
              {siteConfig.name} does not automatically collect personal data. All vocabulary, phrases, symbols, and settings are stored locally on your device only.
            </p>
            <p className="text-slate-600">The App may store the following locally if you choose to use it:</p>
            <ul className="list-disc list-inside space-y-1 text-slate-600">
              <li>Custom words, phrases, abbreviations</li>
              <li>Uploaded photos or symbols you assign to buttons</li>
              <li>Usage frequency of phrases (for better suggestions)</li>
              <li>Admin PIN (stored in hashed/encrypted form locally)</li>
            </ul>
          </section>

          <section className="rounded-2xl bg-emerald-50 border border-emerald-200 p-6 space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">2. Data Not Collected</h2>
            <p className="text-slate-600">We do not collect, track, or store:</p>
            <ul className="list-disc list-inside space-y-1 text-slate-600">
              <li>Conversation history</li>
              <li>Voice recordings</li>
              <li>Location data</li>
              <li>Device identifiers</li>
              <li>Analytics or tracking data</li>
              <li>Behavioral or interest profiles</li>
              <li>Any data used to identify you</li>
            </ul>
          </section>

          <section className="rounded-2xl bg-white border border-slate-200 p-6 space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">3. Optional Voice Services (User-Initiated Only)</h2>
            <p className="text-slate-600">
              If you enter your own API key to use third-party voice services (e.g., ElevenLabs), text you choose to speak may be sent to that provider only at the moment you press &ldquo;Speak&rdquo;.
              {siteConfig.name} does not store or transmit your API key outside your device. Keys are kept in secure storage on the device.
            </p>
          </section>

          <section className="rounded-2xl bg-white border border-slate-200 p-6 space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">4. Local Backups (User-Initiated Only)</h2>
            <p className="text-slate-600">
              You may export or back up your vocabulary manually. This is always initiated by you. We never upload backups without your action.
            </p>
          </section>

          <section className="rounded-2xl bg-white border border-slate-200 p-6 space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">5. Data Security</h2>
            <p className="text-slate-600">Because data lives on your device:</p>
            <ul className="list-disc list-inside space-y-1 text-slate-600">
              <li>Button positions remain stable (motor-planning safe)</li>
              <li>Vocabulary can be hidden (masked), never auto-deleted</li>
              <li>Admin PIN access is required to modify vocabulary</li>
              <li>API keys, if entered, are stored using platform secure storage</li>
            </ul>
          </section>

          <section className="rounded-2xl bg-white border border-slate-200 p-6 space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">6. Children&apos;s Privacy</h2>
            <p className="text-slate-600">
              {siteConfig.name} can be used by children, but the App itself does not collect data about age, identity, or behavior. Vocabulary is managed by caregivers using a local admin PIN.
            </p>
          </section>

          <section className="rounded-2xl bg-white border border-slate-200 p-6 space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">7. Third-Party Libraries</h2>
            <p className="text-slate-600">
              The App uses open-source libraries for performance and offline storage. These libraries run on the device and do not transmit personal data.
            </p>
          </section>

          <section className="rounded-2xl bg-white border border-slate-200 p-6 space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">8. Your Rights</h2>
            <p className="text-slate-600">
              Since no personal data is stored by us, there is nothing to request, delete, or withdraw from our servers. All your data stays in your control on your device.
            </p>
          </section>

          <section className="rounded-2xl bg-white border border-slate-200 p-6 space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">9. Policy Updates</h2>
            <p className="text-slate-600">
              If this policy changes, the update will be posted inside the App and on our website. The effective date will be updated at the top.
            </p>
          </section>

          <section className="rounded-2xl bg-white border border-slate-200 p-6 space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">10. Contact</h2>
            <p className="text-slate-600">For questions about privacy, you can reach us at:</p>
            <p>
              <a href={`mailto:${siteConfig.supportEmail}`} className="text-indigo-600 hover:text-indigo-800 font-medium">
                {siteConfig.supportEmail}
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
