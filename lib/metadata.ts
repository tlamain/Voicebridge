import type { Metadata } from "next";
import { absoluteSiteUrl, siteConfig } from "@/lib/site";
import { locales, type Locale } from "@/lib/i18n";

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  locale: Locale;
};

export function createPageMetadata(options: PageMetadataOptions): Metadata {
  const { title, description, path, locale } = options;
  const localizedPath = `/${locale}${path}`;
  const canonicalUrl = absoluteSiteUrl(localizedPath);
  const metadataBase = new URL(siteConfig.deployment.origin);
  const socialImageUrl = absoluteSiteUrl(siteConfig.socialImagePath);

  return {
    title,
    description,
    metadataBase,
    alternates: {
      canonical: canonicalUrl,
      languages: Object.fromEntries(
        locales.map((l) => [l, absoluteSiteUrl(`/${l}${path}`)])
      ),
    },
    openGraph: {
      type: "website",
      url: canonicalUrl,
      title,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: socialImageUrl,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} preview`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImageUrl],
    },
  };
}
