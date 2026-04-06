import type { I18nNamespaces, NamespaceName } from "@/lib/i18n.types";

export const locales = ["en", "nl", "es", "fr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  nl: "Nederlands",
  es: "Español",
  fr: "Français",
};

function loadNamespace(locale: Locale, namespace: string): unknown {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return require(`../messages/${locale}/${namespace}.json`);
  } catch {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return require(`../messages/en/${namespace}.json`);
  }
}

/**
 * Load a translation namespace for a given locale.
 * Resolved at build time by the bundler.
 */
export function getNamespace<N extends NamespaceName>(
  locale: Locale,
  namespace: N,
): I18nNamespaces[N] {
  return loadNamespace(locale, namespace) as I18nNamespaces[N];
}

/** Backwards-compatible alias for shared callers. */
export function getMessages(locale: Locale, namespace: NamespaceName): I18nNamespaces[typeof namespace] {
  return getNamespace(locale, namespace);
}

/** Prefix a path with the locale segment */
export function localizeHref(href: string, locale: Locale): string {
  if (href.startsWith("http") || href.startsWith("mailto:")) return href;
  return `/${locale}${href.startsWith("/") ? href : `/${href}`}`;
}

/** Check if a string is a valid locale */
export function isValidLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
