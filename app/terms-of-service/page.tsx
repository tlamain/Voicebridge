import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Terms of Service",
  description: "Terms of Service for Loquor AAC — your rights and responsibilities when using the app.",
  path: "/terms-of-service",
});

export default function TermsOfServicePage() {
  return (
    <div className="py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-(--font-jakarta) text-4xl font-bold text-slate-900 tracking-tight mb-2">
          Terms of Service &mdash; {siteConfig.name}
        </h1>
        <p className="text-slate-500 mb-10">Effective date: March 30, 2026</p>

        <div className="space-y-8">
          <p className="text-lg text-slate-600 leading-relaxed">
            Please read these Terms of Service (&ldquo;Terms&rdquo;) carefully before using {siteConfig.name} (&ldquo;the App&rdquo;). By downloading or using the App you agree to be bound by these Terms. If you do not agree, do not use the App.
          </p>

          <section className="rounded-2xl bg-white border border-slate-200 p-6 space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">1. Acceptance of Terms</h2>
            <p className="text-slate-600">
              These Terms constitute a legal agreement between you (or the caregiver or guardian acting on behalf of a user) and the developer of {siteConfig.name}. By installing or using the App you confirm that you have read, understood, and agreed to these Terms.
            </p>
          </section>

          <section className="rounded-2xl bg-white border border-slate-200 p-6 space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">2. Description of the App</h2>
            <p className="text-slate-600">
              {siteConfig.name} is an Augmentative and Alternative Communication (AAC) application designed to help individuals with speech difficulties communicate through symbols, text, and optional AI-powered voice synthesis. Features include:
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-600">
              <li>Symbol-based and text-based message building</li>
              <li>Smart grammar assistance</li>
              <li>Progressive vocabulary learning</li>
              <li>Optional third-party voice synthesis via user-supplied API keys</li>
              <li>Admin-controlled vocabulary management</li>
              <li>Activity boards and customizable layouts</li>
            </ul>
          </section>

          <section className="rounded-2xl bg-white border border-slate-200 p-6 space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">3. Intended Use</h2>
            <p className="text-slate-600">
              The App is intended to assist communication and is not a medical device, clinical therapy tool, or substitute for professional speech-language pathology services. It should be used alongside, not in place of, appropriate clinical support.
            </p>
            <p className="text-slate-600">
              The App may be used by children under the supervision of a parent, guardian, or caregiver. The adult responsible for the user&apos;s device accepts these Terms on their behalf.
            </p>
          </section>

          <section className="rounded-2xl bg-emerald-50 border border-emerald-200 p-6 space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">4. License</h2>
            <p className="text-slate-600">
              Subject to these Terms, we grant you a personal, non-exclusive, non-transferable, revocable license to install and use the App on devices you own or control, solely for your personal, non-commercial communication needs.
            </p>
            <p className="text-slate-600">You may not:</p>
            <ul className="list-disc list-inside space-y-1 text-slate-600">
              <li>Copy, modify, or create derivative works of the App</li>
              <li>Reverse-engineer, decompile, or disassemble the App</li>
              <li>Redistribute, sublicense, or sell the App or any portion of it</li>
              <li>Use the App for any unlawful purpose</li>
            </ul>
          </section>

          <section className="rounded-2xl bg-white border border-slate-200 p-6 space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">5. Third-Party Voice Services</h2>
            <p className="text-slate-600">
              The App supports optional integration with third-party text-to-speech providers (e.g., ElevenLabs). To use these features, you must supply your own API key and agree to that provider&apos;s terms and pricing. We are not responsible for the availability, accuracy, or cost of third-party services.
            </p>
            <p className="text-slate-600">
              Your API key is stored only on your device and is never transmitted to our servers.
            </p>
          </section>

          <section className="rounded-2xl bg-white border border-slate-200 p-6 space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">6. Vocabulary and Content</h2>
            <p className="text-slate-600">
              All vocabulary, phrases, symbols, and images you add to the App remain yours. We claim no ownership over your content. You are responsible for ensuring that any content you add (including photos or symbols) does not infringe third-party rights.
            </p>
          </section>

          <section className="rounded-2xl bg-white border border-slate-200 p-6 space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">7. No Warranties</h2>
            <p className="text-slate-600">
              The App is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without warranties of any kind, express or implied, including but not limited to fitness for a particular purpose, uninterrupted operation, or error-free performance.
            </p>
            <p className="text-slate-600">
              Because the App is used as a communication aid, we strongly encourage users and caregivers to maintain alternative communication strategies and not to rely solely on the App in time-sensitive or emergency situations.
            </p>
          </section>

          <section className="rounded-2xl bg-white border border-slate-200 p-6 space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">8. Limitation of Liability</h2>
            <p className="text-slate-600">
              To the fullest extent permitted by law, we shall not be liable for any indirect, incidental, special, or consequential damages arising out of your use or inability to use the App, even if we have been advised of the possibility of such damages.
            </p>
          </section>

          <section className="rounded-2xl bg-white border border-slate-200 p-6 space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">9. Changes to the App or Terms</h2>
            <p className="text-slate-600">
              We may update the App or these Terms at any time. Material changes will be communicated through the App or this website. Your continued use of the App after changes are posted constitutes acceptance of the revised Terms.
            </p>
          </section>

          <section className="rounded-2xl bg-white border border-slate-200 p-6 space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">10. Termination</h2>
            <p className="text-slate-600">
              You may stop using the App at any time. We reserve the right to discontinue the App or restrict access in cases of misuse or violation of these Terms. Uninstalling the App removes all local data from your device.
            </p>
          </section>

          <section className="rounded-2xl bg-white border border-slate-200 p-6 space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">11. Governing Law</h2>
            <p className="text-slate-600">
              These Terms are governed by and construed in accordance with the laws of the jurisdiction in which the developer is based, without regard to conflict-of-law principles.
            </p>
          </section>

          <section className="rounded-2xl bg-white border border-slate-200 p-6 space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">12. Contact</h2>
            <p className="text-slate-600">If you have questions about these Terms, please contact us at:</p>
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
