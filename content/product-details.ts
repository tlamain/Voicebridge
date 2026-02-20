export type SmartGrammarAssistLevel = {
  level: string;
  audience: string;
  behavior: string;
};

export type AdminArea = {
  area: string;
  purpose: string;
  capabilities: string[];
};

export type BackupCategory = {
  name: string;
  description: string;
};

export type SetupStep = {
  step: string;
  title: string;
  purpose: string;
};

export const smartGrammarTokenGroups = [
  {
    name: "Articles and Demonstratives",
    examples: "de, het, een, this, that, le, la, el, la",
    value: "Supports determiner selection and noun context behavior",
  },
  {
    name: "Possessives",
    examples: "my, your, his, her and language equivalents",
    value: "Supports ownership and relationship framing in sentence building",
  },
  {
    name: "Prepositions",
    examples: "in, on, with, for and language equivalents",
    value: "Supports location and relation context in communication output",
  },
] as const;

export const smartGrammarAssistLevels: SmartGrammarAssistLevel[] = [
  {
    level: "Simple",
    audience: "Beginner communicators",
    behavior: "Limits visible token groups, applies contextual hints, and keeps choices narrow.",
  },
  {
    level: "Standard",
    audience: "Everyday communication workflows",
    behavior: "Shows full grammar groups with compatibility guidance and reduced visual noise.",
  },
  {
    level: "Expert",
    audience: "Therapists and advanced users",
    behavior: "Shows full grammar controls with minimal constraints for direct clinical control.",
  },
];

export const adminAreas: AdminArea[] = [
  {
    area: "Settings",
    purpose: "Configure behavior and safety controls for communication sessions.",
    capabilities: [
      "Security and PIN controls",
      "Voice provider and tuning settings",
      "Appearance and layout preferences",
      "Grammar, share, and backup controls",
    ],
  },
  {
    area: "Content",
    purpose: "Manage the communication assets users interact with daily.",
    capabilities: [
      "Symbols, phrases, and abbreviations",
      "Irregular noun and verb rules",
      "Activity board management",
      "Core-fringe layout and page management",
    ],
  },
  {
    area: "Language",
    purpose: "Handle progression and vocabulary packaging by language context.",
    capabilities: [
      "Progressive vocabulary controls",
      "Pack install and reset flows",
      "Language-specific content views",
      "Maintenance actions for vocabulary data",
    ],
  },
  {
    area: "Users",
    purpose: "Create and maintain isolated communication profiles for multiple people.",
    capabilities: [
      "Standard add and guided add",
      "Duplicate and switch profile flows",
      "Profile metadata editing",
      "Delete restrictions for active and last-user safety",
    ],
  },
];

export const backupCategories: BackupCategory[] = [
  { name: "Settings", description: "Key-value app settings except admin PIN material." },
  { name: "Categories", description: "Symbol category definitions and metadata." },
  { name: "Symbols", description: "Symbol records, translations, and image references." },
  { name: "Favorites", description: "Favorite symbol references for rapid access." },
  { name: "Phrases", description: "Saved phrase entries and related metadata." },
  { name: "Abbreviations", description: "Shortcode expansion rules by language." },
  { name: "Activity Boards", description: "Board definitions and button placements." },
  { name: "Core-Fringe Layouts", description: "Layouts, pages, and slot records." },
  { name: "Vocabulary Packs", description: "Installed pack metadata and linkage." },
];

export const migrationRecipes = [
  {
    title: "Device replacement",
    steps: [
      "Export selective backup from the source device.",
      "Install VoiceBridge on the new device and import backup.",
      "Validate grid mode, user profile, and voice settings.",
    ],
  },
  {
    title: "Therapist handoff",
    steps: [
      "Duplicate active user profile for transfer safety.",
      "Export categories, symbols, and layout assets.",
      "Import into receiving device and validate admin lock settings.",
    ],
  },
  {
    title: "Pilot rollout",
    steps: [
      "Create baseline profile with setup wizard.",
      "Duplicate profile for each learner and adjust only necessary deltas.",
      "Track progression states and export periodic backups.",
    ],
  },
] as const;

export const setupWizardSteps: SetupStep[] = [
  { step: "0", title: "Language Selection", purpose: "Set language context before all other decisions." },
  { step: "1", title: "User Profile", purpose: "Capture person details for profile identity and care context." },
  { step: "2", title: "Grid Mode", purpose: "Choose Standard, Activity Boards, or Core-Fringe communication structure." },
  { step: "3", title: "Voice Provider", purpose: "Select device speech or optional cloud voice provider." },
  { step: "4", title: "Fitzgerald Key", purpose: "Enable or disable color-coded grammar cues." },
  { step: "5", title: "Progressive Vocabulary", purpose: "Enable staged vocabulary growth model when needed." },
  { step: "6", title: "Appearance", purpose: "Configure theme and symbol font preferences." },
  { step: "7", title: "Grid Layout", purpose: "Set column count and landscape behavior preferences." },
  { step: "8", title: "Smart Grammar", purpose: "Configure grammar and inflection helper behavior." },
  { step: "9", title: "PIN Setup", purpose: "Protect admin operations with optional PIN security." },
  { step: "10", title: "Summary", purpose: "Review all selections before finalizing setup." },
];

export const setupWizardOutcomes = [
  "Consistent onboarding for caregivers and clinicians",
  "Repeatable setup across new and duplicate user profiles",
  "Faster initial readiness with fewer manual configuration passes",
] as const;
