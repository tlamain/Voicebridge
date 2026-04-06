export const productPillarIds = [
  "communication-modes",
  "language-intelligence",
  "voice-output",
  "progressive-learning",
  "clinical-admin",
  "privacy-portability",
] as const;

export const featureSectionIds = [
  "communication-engine",
  "grid-systems",
  "grammar-language",
  "progressive-vocabulary",
  "voice-output",
  "clinical-admin",
  "data-portability",
] as const;

export const gridModeIds = ["standard", "schematic", "corefringe"] as const;

export const deepDiveLinks = [
  { id: "product", href: "/product" },
  { id: "grid-modes", href: "/grid-modes" },
  { id: "smart-grammar", href: "/smart-grammar" },
  { id: "progressive-vocabulary", href: "/progressive-vocabulary" },
  { id: "activity-boards", href: "/activity-boards" },
  { id: "core-fringe", href: "/core-fringe" },
  { id: "symbol-management", href: "/symbol-management" },
  { id: "admin", href: "/admin" },
  { id: "backup-and-migration", href: "/backup-and-migration" },
  { id: "setup-wizard", href: "/setup-wizard" },
] as const;
