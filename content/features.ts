export type ProductPillar = {
  id: string;
  title: string;
  description: string;
  value: string;
};

export type GridMode = {
  id: string;
  name: string;
  bestFor: string;
  summary: string;
  details: string;
};

export type FeatureHighlight = {
  title: string;
  description: string;
};

export const productPillars: ProductPillar[] = [
  {
    id: "communication-modes",
    title: "Communication Modes",
    description: "Switch between Standard Grid, Activity Boards, and Core-Fringe without relearning core actions.",
    value: "One app, three communication models",
  },
  {
    id: "language-intelligence",
    title: "Language Intelligence",
    description: "Smart grammar, determiner helper behavior, and guided form selection support clearer messages.",
    value: "Grammar support in real communication flow",
  },
  {
    id: "voice-output",
    title: "Voice Output",
    description: "Use device TTS offline by default and ElevenLabs when connected, with automatic fallback.",
    value: "Always-available speech output",
  },
  {
    id: "progressive-learning",
    title: "Progressive Learning",
    description: "Unlock vocabulary in levels with readiness checks, ghost slots, and advancement history.",
    value: "Structured progression from starter to expert vocabulary",
  },
  {
    id: "clinical-admin",
    title: "Clinical Admin",
    description: "PIN-protected admin tools for content CRUD, grid edits, user profiles, and language workflows.",
    value: "Caregiver and SLP controls built in",
  },
  {
    id: "privacy-portability",
    title: "Privacy and Portability",
    description: "Local-first storage with selective backup and restore across symbols, phrases, boards, and layouts.",
    value: "Data stays user-controlled and transferable",
  },
];

export const gridModes: GridMode[] = [
  {
    id: "standard",
    name: "Standard Grid",
    bestFor: "Daily category navigation",
    summary: "Classic category and subcategory browsing with predictable symbol locations.",
    details: "Supports favorites, progressive vocabulary overlays, and strong motor-planning consistency.",
  },
  {
    id: "schematic",
    name: "Activity Boards",
    bestFor: "Context-specific routines",
    summary: "Board-based navigation for routines such as meals, school, and therapy sessions.",
    details: "Supports board links, functional navigation buttons, and direct edit mode in-place.",
  },
  {
    id: "corefringe",
    name: "Core-Fringe",
    bestFor: "High-frequency communication with depth",
    summary: "Pinned core words remain stable while fringe pages change by context.",
    details: "Supports multi-layer page navigation, page management, and per-grid-size layouts.",
  },
];

export const smartGrammarHighlights: FeatureHighlight[] = [
  {
    title: "Determiner Helper",
    description: "Language-aware grammar chips for articles, demonstratives, possessives, and prepositions.",
  },
  {
    title: "Smart Insertion",
    description: "Articles and demonstratives can insert before the last noun for natural word order.",
  },
  {
    title: "Assist Levels",
    description: "Simple, Standard, and Expert modes support beginner learners through therapist workflows.",
  },
  {
    title: "Inflection Picker",
    description: "Optional long-press form selection for verbs and nouns before adding to the message.",
  },
];

export const adminHighlights: FeatureHighlight[] = [
  {
    title: "Setup Wizard",
    description: "An onboarding flow configures language, grid mode, voice provider, grammar, appearance, and PIN.",
  },
  {
    title: "Content Management",
    description: "Manage symbols, phrases, abbreviations, irregular forms, activity boards, and core-fringe layouts.",
  },
  {
    title: "Multi-User Profiles",
    description: "Isolated user profiles support standard create, guided create, duplicate, delete, and switch flows.",
  },
  {
    title: "Backups and Packs",
    description: "Install vocabulary packs and export or import selective `.vbaac` backups when needed.",
  },
];

export const trustSignals = [
  "Local-first data handling by default",
  "Offline communication with voice fallback",
  "PIN-gated admin and edit operations",
] as const;
