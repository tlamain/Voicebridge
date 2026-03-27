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
    description: "Context-aware verb conjugation, noun pluralisation, determiner helper, and form selection across Dutch, English, French, and Spanish.",
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
    description: "Unlock vocabulary in 6 levels with readiness checks, ghost slots, motor memory protection, and per-language progression tracking.",
    value: "Structured growth from starter to expert",
  },
  {
    id: "clinical-admin",
    title: "Clinical Admin",
    description: "PIN-protected controls for content editing, user setup, language operations, layout management, and vocabulary pack installs.",
    value: "Caregiver and SLP controls built in",
  },
  {
    id: "privacy-portability",
    title: "Privacy and Portability",
    description: "Local-first storage with user-initiated selective backup and restore. No cloud, no tracking, no conversation history stored.",
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
      "Prediction and abbreviation expansion behaviour",
      "Long-press verb/noun form picker before adding to message",
      "Favourites and category workflows",
      "Share output controls in admin settings",
    ],
  },
  {
    id: "grid-systems",
    title: "Grid Systems",
    summary: "Choose a communication model that matches cognitive load, context, and care goals.",
    highlights: [
      "Standard category grid with motor zone preservation",
      "Activity board navigation for routines",
      "Core-Fringe layouts with pinned core words and multi-page navigation",
      "In-grid editing with drag, add, and remove interactions",
    ],
  },
  {
    id: "grammar-language",
    title: "Smart Grammar Engine",
    summary: "Context-aware conjugation for Dutch, English, French, and Spanish — all offline, all automatic.",
    highlights: [
      "Verb conjugation: present, past, perfect, continuous, future tenses",
      "Modal verbs, reflexive constructions, multi-clause sentences",
      "French: elision, interrogative inversion, noun phrase gender agreement",
      "Noun pluralisation via long-press with grammar reconjugation",
      "Grammar bar with colour-coded determiner chips",
      "Three assist levels: Simple, Standard, Expert",
    ],
  },
  {
    id: "progressive-vocabulary",
    title: "Progressive Vocabulary",
    summary: "A 6-level learning system that protects motor memory while growing vocabulary through demonstrated usage.",
    highlights: [
      "6 levels with per-level evaluation pools (only new words count)",
      "Motor memory protection: word positions never change",
      "Ghost slots preview locked words without enabling interaction",
      "Floating Readiness Button with live percentage progress",
      "Expert Vocabulary toggle for Level 6 words",
      "Per-language independent progression state",
    ],
  },
  {
    id: "voice-output",
    title: "Voice and Output",
    summary: "Maintain communication continuity across network conditions and provider failures.",
    highlights: [
      "Device voice provider with configurable pitch and rate",
      "Optional ElevenLabs integration with local audio cache",
      "Automatic fallback to device speech on any failure",
      "Preview and provider switching in admin settings",
    ],
  },
  {
    id: "clinical-admin",
    title: "Clinical Admin and Content",
    summary: "Structured operations for care teams managing symbols, layouts, users, and settings.",
    highlights: [
      "Settings, Content, Language, and Users administration",
      "PIN protection and admin lock behaviours",
      "Symbol, phrase, abbreviation, board, and layout management",
      "Vocabulary pack install, grammar data sync, and reset flows",
    ],
  },
  {
    id: "data-portability",
    title: "Data and Portability",
    summary: "Keep communication data local and portable when teams migrate or duplicate setups.",
    highlights: [
      "Selective backup and restore with category toggles",
      "Embedded image portability in .vbaac backup payloads",
      "Multi-user profile isolation with separate databases",
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
    details: "Works with favourites and progression while preserving core motor-planning patterns.",
    includes: [
      "Category and subcategory navigation",
      "Favourites behaviour",
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
    details: "Includes page trees, slot management, progressive vocabulary locking, and per-grid-size layout handling.",
    includes: [
      "Pinned core slots across all pages",
      "Nested page navigation with auto Home/Back buttons",
      "Layout and page editor workflows",
      "Grid-size specific layout copies",
    ],
  },
];

export const smartGrammarHighlights: FeatureHighlight[] = [
  {
    title: "Automatic Verb Conjugation",
    description: "Context-aware conjugation for Dutch, English, French, and Spanish. Handles present, past, perfect, continuous, future, modal, and reflexive forms entirely on-device.",
  },
  {
    title: "Sentence-Level Transformations",
    description: "English do-support, French elision and interrogative inversion, Dutch V2 word order — applied automatically as the sentence is built.",
  },
  {
    title: "Noun Pluralisation",
    description: "Long-press any noun to select singular or plural form. The grammar engine reconjugates verbs to agree with the updated subject number.",
  },
  {
    title: "Determiner Helper (Grammar Bar)",
    description: "Colour-coded chips for articles, demonstratives, possessives, and prepositions. Gender-aware dimming highlights the compatible option for the current noun.",
  },
  {
    title: "Multi-Clause Support",
    description: "When a second subject appears mid-sentence, the engine starts a new grammatical clause. Each clause conjugates independently with its own subject.",
  },
  {
    title: "Three Assist Levels",
    description: "Simple (beginner), Standard (everyday), and Expert (therapist) control how much grammar assistance is shown and how much is left to the user.",
  },
];

export const adminHighlights: FeatureHighlight[] = [
  {
    title: "Setup Wizard",
    description: "A 12-step guided onboarding flow configures language, input mode, grid mode, voice, grammar, appearance, and PIN.",
  },
  {
    title: "Content Management",
    description: "Manage symbols, phrases, abbreviations, irregular noun and verb forms, activity boards, and core-fringe layouts.",
  },
  {
    title: "Multi-User Profiles",
    description: "Isolated user profiles support standard add, add-with-wizard, duplicate, delete, and switch operations. Each user has a separate database.",
  },
  {
    title: "Backups and Packs",
    description: "Install vocabulary packs and export or import selective `.vbaac` backups with full image portability.",
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
    label: "Smart Grammar Engine",
    description: "Conjugation rules, language examples, assist levels, and form selection.",
  },
  {
    href: "/progressive-vocabulary",
    label: "Progressive Vocabulary",
    description: "Level system, motor memory protection, ghost slots, and readiness checks.",
  },
  {
    href: "/activity-boards",
    label: "Activity Boards",
    description: "Create themed boards for routines with custom icons, grid sizes, and in-grid editing.",
  },
  {
    href: "/core-fringe",
    label: "Core-Fringe Layouts",
    description: "Multi-page layouts with pinned core vocabulary and dynamic fringe pages.",
  },
  {
    href: "/symbol-management",
    label: "Symbol Library",
    description: "Search, filter, favourite, and edit symbols with progressive vocabulary metadata.",
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
    description: "Walk through the 12-step onboarding and new-user setup flow.",
  },
];

export const trustSignals = [
  "Local-first data handling — no cloud, no tracking",
  "Offline grammar and speech with automatic fallback",
  "PIN-gated admin and edit operations",
] as const;
