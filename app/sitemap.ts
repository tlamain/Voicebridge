import type { MetadataRoute } from "next";
import { absoluteSiteUrl, publicRoutes } from "@/lib/site";
import { locales } from "@/lib/i18n";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return locales.flatMap((locale) =>
    publicRoutes.map((route) => ({
      url: absoluteSiteUrl(`/${locale}${route === "/" ? "/" : route}`),
      lastModified: now,
      changeFrequency: (route === "/" ? "weekly" : "monthly") as "weekly" | "monthly",
      priority: route === "/" && locale === "en" ? 1 : route === "/" ? 0.9 : 0.7,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, absoluteSiteUrl(`/${l}${route === "/" ? "/" : route}`)])
        ),
      },
    }))
  );
}
