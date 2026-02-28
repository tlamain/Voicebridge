import type { Metadata } from "next";
import { absoluteSiteUrl, siteConfig } from "@/lib/site";

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
};

export function createPageMetadata(options: PageMetadataOptions): Metadata {
  const { title, description, path } = options;
  const canonicalUrl = absoluteSiteUrl(path);
  const metadataBase = new URL(siteConfig.deployment.origin);
  const socialImageUrl = absoluteSiteUrl(siteConfig.socialImagePath);

  return {
    title,
    description,
    metadataBase,
    alternates: {
      canonical: canonicalUrl,
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
