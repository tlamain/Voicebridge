export const siteConfig = {
  name: "VoiceBridge AAC",
  shortName: "VoiceBridge",
  description:
    "VoiceBridge AAC helps people communicate with symbols and text, smart grammar support, and flexible voice output for home, school, and clinic use.",
  supportEmail: "hello@voicebridgeaac.com",
  socialImagePath: "/og-default.svg",
  deployment: {
    origin: "https://tlamain.github.io",
    basePath: "/Voicebridge",
    siteUrl: "https://tlamain.github.io/Voicebridge",
  },
  links: {
    home: "/",
    product: "/product",
    gridModes: "/grid-modes",
    smartGrammar: "/smart-grammar",
    adminForClinicians: "/admin-for-clinicians",
    backupAndMigration: "/backup-and-migration",
    setupWizard: "/setup-wizard",
    features: "/features",
    whoItsFor: "/who-its-for",
    faq: "/faq",
    contact: "/contact",
    privacy: "/privacy-policy",
  },
} as const;

export const publicRoutes = [
  "/",
  "/product",
  "/features",
  "/grid-modes",
  "/smart-grammar",
  "/admin-for-clinicians",
  "/backup-and-migration",
  "/setup-wizard",
  "/who-its-for",
  "/faq",
  "/contact",
  "/privacy-policy",
] as const;

export const primaryNavigation = [
  { href: "/product", label: "Product" },
  { href: "/grid-modes", label: "Grid Modes" },
  { href: "/smart-grammar", label: "Smart Grammar" },
  { href: "/admin-for-clinicians", label: "Admin Tools" },
  { href: "/features", label: "All Features" },
] as const;

export const resourceNavigation = [
  { href: "/backup-and-migration", label: "Backup and Migration" },
  { href: "/setup-wizard", label: "Setup Wizard" },
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
