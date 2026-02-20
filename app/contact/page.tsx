import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Contact",
  description: "Contact VoiceBridge AAC for early access, support requests, or clinical and caregiver partnerships.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="space-y-6 py-12">
      <h1 className="font-[var(--font-jakarta)] text-4xl font-semibold tracking-tight text-slate-900">Contact</h1>
      <p className="max-w-2xl text-lg text-slate-600">
        For early access, support, or clinical partnerships, reach the VoiceBridge team at:
      </p>
      <p>
        <a
          href={`mailto:${siteConfig.supportEmail}`}
          className="text-lg font-semibold text-blue-700 no-underline transition hover:text-blue-800"
        >
          {siteConfig.supportEmail}
        </a>
      </p>
    </div>
  );
}
