import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Privacy Policy",
  description:
    "Read how VoiceBridge AAC handles local-first data, optional voice services, backups, and user-controlled privacy settings.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <div className="space-y-6 py-12">
      <h1 className="font-[var(--font-jakarta)] text-4xl font-semibold tracking-tight text-slate-900">
        Privacy Policy - {siteConfig.name}
      </h1>
      <p className="text-slate-600">Effective date: January 5, 2026</p>

      <p>
        {siteConfig.name} is designed to provide a reliable communication voice through text, symbols, and optional
        speech synthesis. Privacy is central to the product design.
      </p>

      <h2 className="text-2xl font-semibold text-slate-900">1. Data We Collect</h2>
      <p>
        {siteConfig.name} does not automatically collect personal data. Vocabulary, phrases, symbols, and settings are
        stored locally on the device.
      </p>
      <p>The app may store the following locally if the user chooses to use them:</p>
      <ul className="list-disc space-y-1 pl-6">
        <li>Custom words, phrases, and abbreviations</li>
        <li>Uploaded photos or symbols assigned to buttons</li>
        <li>Usage frequency for phrase suggestions</li>
        <li>Admin PIN (stored in hashed and encrypted form locally)</li>
      </ul>

      <h2 className="text-2xl font-semibold text-slate-900">2. Data Not Collected</h2>
      <p>We do not collect, track, or store:</p>
      <ul className="list-disc space-y-1 pl-6">
        <li>Conversation history</li>
        <li>Voice recordings</li>
        <li>Location data</li>
        <li>Device identifiers</li>
        <li>Analytics or behavioral tracking profiles</li>
      </ul>

      <h2 className="text-2xl font-semibold text-slate-900">3. Optional Voice Services (User-Initiated)</h2>
      <p>
        If a user configures a third-party voice provider, text chosen for speech may be sent only at the moment the
        user presses Speak. API keys remain on the device and are not transmitted by us.
      </p>

      <h2 className="text-2xl font-semibold text-slate-900">4. Local Backups (User-Initiated)</h2>
      <p>Backups are initiated by the user. The app does not upload backups without explicit user action.</p>

      <h2 className="text-2xl font-semibold text-slate-900">5. Data Security</h2>
      <ul className="list-disc space-y-1 pl-6">
        <li>Stable button positions support motor planning safety</li>
        <li>Vocabulary can be hidden without automatic deletion</li>
        <li>Admin PIN can protect editing workflows</li>
        <li>Configured API keys are stored with secure platform storage</li>
      </ul>

      <h2 className="text-2xl font-semibold text-slate-900">6. Children&apos;s Privacy</h2>
      <p>
        The app can be used by children, but the app itself does not collect age, identity, or behavioral profile data.
      </p>

      <h2 className="text-2xl font-semibold text-slate-900">7. Policy Updates</h2>
      <p>If this policy changes, the updated effective date will be published in-app and on this site.</p>

      <h2 className="text-2xl font-semibold text-slate-900">8. Contact</h2>
      <p>For privacy questions:</p>
      <p>
        <a href={`mailto:${siteConfig.supportEmail}`} className="font-semibold text-blue-700 no-underline hover:text-blue-800">
          {siteConfig.supportEmail}
        </a>
      </p>
    </div>
  );
}
