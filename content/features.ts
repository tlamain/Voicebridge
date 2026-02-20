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
  includes: string[];
};

export type FeatureHighlight = {
  title: string;
  description: string;
};

export type FeatureSection = {
  id: string;
  title: string;
  summary: string;
  highlights: string[];
};

export type DeepDiveLink = {
  href: string;
  label: string;
  description: string;
};

export const productPillars: ProductPillar[] = [
  {
    id: "communication-modes",
    title: "Communication Modes",
    description: "Switch between Standard Grid, Activity Boards, and Core-Fringe without changing the core message flow.",
    value: "One app, three communication models",
  },
  {
    id: "language-intelligence",
    title: "Language Intelligence",
    description: "Smart grammar, determiner helper behavior, and guided form selection support clearer sentence output.",
    value: "Grammar support in real communication",
  },
  {
    id: "voice-output",
    title: "Voice Output",
    description: "Use device text-to-speech offline and optional ElevenLabs voices online with automatic fallback.",
    value: "Always-available speech output",
  },
  {
    id: "progressive-learning",
    title: "Progressive Learning",
    description: "Unlock vocabulary in levels with readiness checks, ghost slots, and advancement tracking.",
    value: "Structured growth from starter to expert",
  },
  {
    id: "clinical-admin",
    title: "Clinical Admin",
    description: "PIN-protected controls for content editing, user setup, language operations, and layout management.",
    value: "Caregiver and SLP controls built in",
  },
  {
    id: "privacy-portability",
    title: "Privacy and Portability",
    description: "Local-first storage with user-initiated selective backup and restore for key communication data.",
    value: "Data stays user-controlled",
  },
];

export const featureSections: FeatureSection[] = [
  {
    id: "communication-engine",
    title: "Communication Engine",
    summary: "Compose with symbols and text in one flow, then speak or share with minimal friction.",
    highlights: [
      "Message builder with symbol plus text composition",
      "Prediction and abbreviation expansion behavior",
      "Favorites and category workflows",
      "Share output controls in admin settings",
    ],
  },
  {
    id: "grid-systems",
    title: "Grid Systems",
    summary: "Choose a communication model that matches cognitive load, context, and care goals.",
    highlights: [
      "Standard category grid",
      "Activity board navigation for routines",
      "Core-Fringe layouts with pinned core words",
      "Edit-mode interactions for moving and managing cells",
    ],
  },
  {
    id: "grammar-language",
    title: "Grammar and Language",
    summary: "Practical grammar assistance for communication sessions, not only training exercises.",
    highlights: [
      "Grammar strip chips with determiner helper behavior",
      "Verb and noun form selection options",
      "Assist levels for beginner, standard, and expert users",
      "Language-aware behavior for multilingual use",
    ],
  },
  {
    id: "voice-output",
    title: "Voice and Output",
    summary: "Maintain communication continuity across network conditions and provider failures.",
    highlights: [
      "Device voice provider with configurable pitch and rate",
      "Optional ElevenLabs integration with cache",
      "Automatic fallback to device speech on failures",
      "Preview and provider switching in admin settings",
    ],
  },
  {
    id: "clinical-admin",
    title: "Clinical Admin and Content",
    summary: "Structured operations for care teams managing symbols, layouts, users, and settings.",
    highlights: [
      "Settings, Content, Language, and Users administration",
      "PIN protection and admin lock behaviors",
      "Symbol, phrase, abbreviation, board, and layout management",
      "Vocabulary pack install and reset flows",
    ],
  },
  {
    id: "data-portability",
    title: "Data and Portability",
    summary: "Keep communication data local and portable when teams migrate or duplicate setups.",
    highlights: [
      "Selective backup and restore with category toggles",
      "Embedded image portability in backup payloads",
      "Multi-user profile isolation",
      "Duplicate-user and migration workflows",
    ],
  },
];

export const gridModes: GridMode[] = [
  {
    id: "standard",
    name: "Standard Grid",
    bestFor: "Daily category navigation",
    summary: "Classic category and subcategory browsing with predictable symbol locations.",
    details: "Works with favorites and progression while preserving core motor-planning patterns.",
    includes: [
      "Category and subcategory navigation",
      "Favorites behavior",
      "Progressive vocabulary overlays",
      "Symbol placement consistency",
    ],
  },
  {
    id: "schematic",
    name: "Activity Boards",
    bestFor: "Context and routine-based communication",
    summary: "Board-based navigation for routines like meals, school, and therapy sessions.",
    details: "Supports board links, functional navigation cells, and in-place edit mode workflows.",
    includes: [
      "Board dashboard and board links",
      "Functional Back and Home buttons",
      "Real-time board edit interactions",
      "Board metadata and icon management",
    ],
  },
  {
    id: "corefringe",
    name: "Core-Fringe",
    bestFor: "High-frequency communication with depth",
    summary: "Pinned core words remain stable while fringe pages change by context.",
    details: "Includes page trees, slot management, and per-grid-size layout handling.",
    includes: [
      "Pinned core slots across pages",
      "Nested page navigation",
      "Layout and page editor workflows",
      "Grid-size specific layout copies",
    ],
  },
];

export const smartGrammarHighlights: FeatureHighlight[] = [
  {
    title: "Determiner Helper",
    description: "Grammar chips for articles, demonstratives, possessives, and prepositions by language.",
  },
  {
    title: "Smart Insertion",
    description: "Articles and demonstratives can insert before the target noun for natural word order.",
  },
  {
    title: "Assist Levels",
    description: "Simple, Standard, and Expert settings support both learners and therapist workflows.",
  },
  {
    title: "Inflection Picker",
    description: "Optional long-press form selection for verbs and nouns before adding words to messages.",
  },
];

export const adminHighlights: FeatureHighlight[] = [
  {
    title: "Setup Wizard",
    description: "A guided onboarding flow configures language, grid mode, voice, grammar, appearance, and PIN.",
  },
  {
    title: "Content Management",
    description: "Manage symbols, phrases, abbreviations, irregular forms, activity boards, and core-fringe layouts.",
  },
  {
    title: "Multi-User Profiles",
    description: "Isolated user profiles support standard add, add-with-wizard, duplicate, delete, and switch operations.",
  },
  {
    title: "Backups and Packs",
    description: "Install vocabulary packs and export or import selective `.vbaac` backups with image portability.",
  },
];

export const deepDiveLinks: DeepDiveLink[] = [
  {
    href: "/product",
    label: "Product Architecture",
    description: "High-level map of core systems and platform workflows.",
  },
  {
    href: "/grid-modes",
    label: "Grid Modes",
    description: "Compare Standard, Activity Boards, and Core-Fringe usage patterns.",
  },
  {
    href: "/smart-grammar",
    label: "Smart Grammar",
    description: "Review determiner helper behavior, assist levels, and form selection.",
  },
  {
    href: "/admin-for-clinicians",
    label: "Admin for Clinicians",
    description: "Understand settings, content, language, and user management capabilities.",
  },
  {
    href: "/backup-and-migration",
    label: "Backup and Migration",
    description: "See backup categories, restore patterns, and migration recipes.",
  },
  {
    href: "/setup-wizard",
    label: "Setup Wizard",
    description: "Walk through the 11-step onboarding and new-user setup flow.",
  },
];

export const trustSignals = [
  "Local-first data handling by default",
  "Offline communication with voice fallback",
  "PIN-gated admin and edit operations",
] as const;
