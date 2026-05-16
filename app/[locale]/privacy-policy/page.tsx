import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";
import { getNamespace, type Locale } from "@/lib/i18n";

function renderWithLinks(text: string) {
  const parts = text.split(/(https?:\/\/[^\s]+)/g);
  return parts.map((part, index) => {
    if (!/^https?:\/\//.test(part)) {
      return part;
    }
    const match = part.match(/^(.*?)([.,;)]*)$/);
    const url = match?.[1] ?? part;
    const trailing = match?.[2] ?? "";
    return (
      <span key={index}>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 hover:text-indigo-800 font-medium"
        >
          {url}
        </a>
        {trailing}
      </span>
    );
  });
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = getNamespace(locale as Locale, "privacy-policy");

  return createPageMetadata({
    title: t.meta.title,
    description: t.meta.description,
    path: "/privacy-policy",
    locale: locale as Locale,
  });
}

export default async function PrivacyPolicyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = getNamespace(locale as Locale, "privacy-policy");

  return (
    <div className="py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-(--font-jakarta) text-4xl font-bold text-slate-900 tracking-tight mb-2">
          {t.title}
        </h1>
        <p className="text-slate-500 mb-10">{t.effectiveDateLabel}: {t.effectiveDate}</p>

        <div className="space-y-8">
          <p className="text-lg text-slate-600 leading-relaxed">
            {t.intro}
          </p>

          {t.sections.map((section) => (
            <section
              key={section.id}
              className={`rounded-2xl border p-6 space-y-3 ${
                section.id === "data-not-collected"
                  ? "bg-emerald-50 border-emerald-200"
                  : "bg-white border-slate-200"
              }`}
            >
              <h2 className="text-xl font-semibold text-slate-900">{section.title}</h2>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph} className="text-slate-600">
                  {renderWithLinks(paragraph)}
                </p>
              ))}
              {section.items ? (
                <ul className="list-disc list-inside space-y-1 text-slate-600">
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
              {section.paragraphsAfter?.map((paragraph) => (
                <p key={paragraph} className="text-slate-600">
                  {renderWithLinks(paragraph)}
                </p>
              ))}
              {section.id === "contact" ? (
                <>
                  <p className="text-slate-600">{t.contactLead}</p>
                  <p>
                    <a href={`mailto:${siteConfig.supportEmail}`} className="text-indigo-600 hover:text-indigo-800 font-medium">
                      {siteConfig.supportEmail}
                    </a>
                  </p>
                </>
              ) : null}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
