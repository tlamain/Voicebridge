export default function FaqPage() {
  return (
    <div className="py-12">
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Everything you need to know about VoiceBridge and our commitment to accessible communication.
          </p>
        </header>

        <div className="space-y-6">
          <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200">
            <h2 className="text-xl font-semibold text-indigo-900 mb-2">Does it work offline?</h2>
            <p className="text-slate-600 leading-relaxed">Yes. Core communication works offline. Voice quality can adapt depending on connectivity.</p>
          </section>

          <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200">
            <h2 className="text-xl font-semibold text-indigo-900 mb-2">Is my data private?</h2>
            <p className="text-slate-600 leading-relaxed">AyAySee is designed around local-first principles so sensitive communication isn’t uploaded by default.</p>
          </section>

          <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200">
            <h2 className="text-xl font-semibold text-indigo-900 mb-2">Can caregivers customize vocabulary?</h2>
            <p className="text-slate-600 leading-relaxed">Yes. Admin features are protected to prevent accidental edits.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
