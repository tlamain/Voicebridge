export const siteConfig = {
  name: "Loquor AAC",
  shortName: "Loquor",
  description:
    "Loquor AAC empowers people with speech difficulties through symbol-based communication, smart grammar, premium AI voices, and progressive vocabulary learning.",
  supportEmail: "hello@loquoraac.com",
  socialImagePath: "/og-default.svg",
  deployment: {
    origin: "https://tlamain.github.io",
    basePath: "/Voicebridge",
    siteUrl: "https://tlamain.github.io/Voicebridge",
  },
  links: {
    home: "/",
    features: "/features",
    whoItsFor: "/who-its-for",
    faq: "/faq",
    contact: "/contact",
    privacy: "/privacy-policy",
  },
} as const;

export const publicRoutes = [
  "/",
  "/features",
  "/who-its-for",
  "/faq",
  "/contact",
  "/privacy-policy",
] as const;

export const primaryNavigation = [
  { href: "/features", label: "Features" },
  { href: "/who-its-for", label: "Who It's For" },
  { href: "/faq", label: "FAQ" },
] as const;

export const resourceNavigation = [
  { href: "/contact", label: "Contact" },
] as const;

export const legalNavigation = [{ href: "/privacy-policy", label: "Privacy Policy" }] as const;

export function absoluteSiteUrl(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const cleanSiteUrl = siteConfig.deployment.siteUrl.replace(/\/$/, "");

  if (normalizedPath === "/") {
    return `${cleanSiteUrl}/`;
  }

  return `${cleanSiteUrl}${normalizedPath}`;
}
