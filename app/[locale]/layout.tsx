import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SkipLink from "@/components/SkipLink";
import { absoluteSiteUrl, siteConfig } from "@/lib/site";
import { locales, isValidLocale, getNamespace, type Locale } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getNamespace(locale as Locale, "common");

  return {
    metadataBase: new URL(siteConfig.deployment.origin),
    title: {
      default: t["site.titleDefault"] || `${siteConfig.name} — Communication for Every Voice`,
      template: `%s | ${siteConfig.name}`,
    },
    description: t["site.description"] || siteConfig.description,
    applicationName: siteConfig.name,
    alternates: {
      canonical: absoluteSiteUrl(`/${locale}/`),
      languages: Object.fromEntries(
        locales.map((l) => [l, absoluteSiteUrl(`/${l}/`)])
      ),
    },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title: siteConfig.name,
      description: t["site.description"] || siteConfig.description,
      url: absoluteSiteUrl(`/${locale}/`),
      images: [
        {
          url: absoluteSiteUrl(siteConfig.socialImagePath),
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} preview`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.name,
      description: t["site.description"] || siteConfig.description,
      images: [absoluteSiteUrl(siteConfig.socialImagePath)],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const t = getNamespace(locale, "common");

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: `document.documentElement.lang="${locale}"` }} />
      <SkipLink />
      <SiteHeader locale={locale} translations={t} />
      <main id="main" tabIndex={-1} className="grow mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {children}
      </main>
      <SiteFooter locale={locale} translations={t} />
    </>
  );
}
