import Link from "next/link";
import ScrollReveal from "../../components/ScrollReveal";

export default function ContactPage() {
  return (
    <div className="py-16 space-y-16">
      {/* Hero */}
      <ScrollReveal>
        <div className="text-center space-y-4">
          <h1 className="font-(--font-jakarta) text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight">
            Get in Touch
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            Interested in Loquor AAC? Whether you're a communicator, caregiver, clinician, or educator — we'd love to hear from you.
          </p>
        </div>
      </ScrollReveal>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Early Access Card */}
        <ScrollReveal delay={100}>
          <div className="rounded-3xl border border-indigo-200 bg-linear-to-br from-indigo-50 to-blue-50 p-8 space-y-4 h-full">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
              </svg>
            </div>
            <h2 className="font-(--font-jakarta) text-xl font-bold text-slate-900">Early Access</h2>
            <p className="text-slate-600 leading-relaxed">
              Loquor AAC is currently in development. Join our early access program to be among the first to try it and help shape the future of accessible communication.
            </p>
            <a
              href="mailto:hello@loquoraac.com?subject=Early Access Request"
              className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-indigo-700 hover:shadow-lg no-underline"
            >
              Request Early Access
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </div>
        </ScrollReveal>

        {/* Contact Card */}
        <ScrollReveal delay={200}>
          <div className="rounded-3xl border border-slate-200 bg-white p-8 space-y-6 h-full">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </div>
            <h2 className="font-(--font-jakarta) text-xl font-bold text-slate-900">Contact Us</h2>
            <p className="text-slate-600 leading-relaxed">
              For support, clinical partnerships, feedback, or general inquiries:
            </p>
            <div className="space-y-3">
              <a
                href="mailto:hello@loquoraac.com"
                className="flex items-center gap-3 text-indigo-600 hover:text-indigo-800 transition-colors font-medium"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                hello@loquoraac.com
              </a>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <p className="text-sm text-slate-500">
                We typically respond within 24–48 hours.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* App Store Placeholder */}
      <ScrollReveal>
        <div className="text-center rounded-3xl bg-slate-50 border border-slate-200 p-10 space-y-4">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-200 text-slate-500">
            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
            </svg>
          </div>
          <h3 className="font-(--font-jakarta) text-xl font-bold text-slate-900">Coming Soon to iOS & Android</h3>
          <p className="text-slate-600 max-w-lg mx-auto">
            Loquor AAC will be available on the App Store and Google Play. Sign up for early access to be notified when we launch.
          </p>
        </div>
      </ScrollReveal>
    </div>
  );
}
