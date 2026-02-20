export const siteConfig = {
  name: "VoiceBridge AAC",
  shortName: "VoiceBridge",
  description:
    "VoiceBridge AAC helps people communicate with symbols and text, smart grammar support, and flexible voice output for home, school, and clinic use.",
  supportEmail: "hello@voicebridgeaac.com",
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

export const primaryNavigation = [
  { href: "/#product-pillars", label: "Product" },
  { href: "/#grid-modes", label: "Grid Modes" },
  { href: "/#smart-grammar", label: "Smart Grammar" },
  { href: "/#admin-tools", label: "Admin Tools" },
  { href: "/features", label: "All Features" },
] as const;

export const resourceNavigation = [
  { href: "/who-its-for", label: "Who It Is For" },
  { href: "/faq", label: "FAQ" },
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
