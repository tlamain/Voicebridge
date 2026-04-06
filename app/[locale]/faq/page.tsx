import FAQItem from "@/components/FAQItem";
import CTABanner from "@/components/CTABanner";
import ScrollReveal from "@/components/ScrollReveal";
import { createPageMetadata } from "@/lib/metadata";
import { getNamespace, localizeHref, type Locale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = getNamespace(locale as Locale, "faq");

  return createPageMetadata({
    title: t.meta.title,
    description: t.meta.description,
    path: "/faq",
    locale: locale as Locale,
  });
}

export default async function FaqPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = locale as Locale;
  const t = getNamespace(l, "faq");

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <div className="py-16 space-y-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <ScrollReveal>
        <div className="text-center space-y-4">
          <h1 className="font-(--font-jakarta) text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight">
            {t.hero.title}
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            {t.hero.description}
          </p>
        </div>
      </ScrollReveal>

      <div className="max-w-3xl mx-auto space-y-4">
        {t.items.map((faq, i) => (
          <ScrollReveal key={faq.question} delay={i < 4 ? ((i + 1) * 100 as 100 | 200 | 300 | 400) : 0}>
            <FAQItem question={faq.question} answer={faq.answer} />
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal>
        <CTABanner
          title={t.cta.title}
          subtitle={t.cta.subtitle}
          buttonText={t.cta.buttonText}
          buttonHref={localizeHref("/contact", l)}
        />
      </ScrollReveal>
    </div>
  );
}
