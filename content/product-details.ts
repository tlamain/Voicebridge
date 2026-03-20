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
    name: "Articles",
    examples: "de, het, een / the, a / le, la, les, un, une / el, la, los, las, un, una",
    value: "Inserted before the last noun for natural word order. Gender-aware dimming highlights the compatible article.",
  },
  {
    name: "Demonstratives",
    examples: "dit, dat, deze, die / this, that, these, those / ce, cette, ces / este, esta, estos, estas",
    value: "Highlights the gender-compatible form when a noun is present. Inserted before the noun automatically.",
  },
  {
    name: "Possessives",
    examples: "mijn, jouw, zijn, haar / my, your, his, her / mon, ma, ton, ta / mi, tu, su",
    value: "Supports ownership and relationship framing across all four supported languages.",
  },
  {
    name: "Prepositions",
    examples: "met, voor, naar, in / with, for, to, in / avec, pour, dans / con, para, en",
    value: "Adds location, direction, and relation context to any sentence.",
  },
] as const;

export const smartGrammarAssistLevels: SmartGrammarAssistLevel[] = [
  {
    level: "Simple",
    audience: "Beginner communicators",
    behavior: "Shows only articles and demonstratives. Incompatible tokens are dimmed. Contextual hints appear below the bar (e.g. 'Start with a subject or determiner'). Keeps choices narrow to reduce cognitive load.",
  },
  {
    level: "Standard",
    audience: "Everyday communication",
    behavior: "Shows all four groups (articles, demonstratives, possessives, prepositions). Incompatible tokens are dimmed based on noun gender. No additional hints. Best for most daily use.",
  },
  {
    level: "Expert",
    audience: "Therapists and advanced users",
    behavior: "Shows all four groups with no dimming. Every token is equally visible. Full clinical control — the therapist decides what grammar cues to present, not the app.",
  },
];

export const adminAreas: AdminArea[] = [
  {
    area: "Settings",
    purpose: "Configure behaviour and safety controls for communication sessions.",
    capabilities: [
      "Security and PIN controls",
      "Voice provider, pitch, rate, and ElevenLabs configuration",
      "Input mode selection (Symbol Grid or Text-only)",
      "Appearance themes, grid size, and font preferences",
      "Grammar, Fitzgerald Key, share button, and Word Finder controls",
      "Backup and restore operations",
    ],
  },
  {
    area: "Content",
    purpose: "Manage the communication assets users interact with daily.",
    capabilities: [
      "Symbols, phrases, and abbreviations with full CRUD",
      "Irregular noun rules (singular/plural, uncountable)",
      "Irregular verb exception forms per language",
      "Activity board management and editing",
      "Core-fringe layout, page tree, and slot management",
    ],
  },
  {
    area: "Language",
    purpose: "Handle progression and vocabulary packaging by language context.",
    capabilities: [
      "Progressive vocabulary controls and readiness checks",
      "Mastery threshold and min-uses-per-word settings",
      "Expert Vocabulary toggle for Level 6 words",
      "Vocabulary pack install, reinstall, and grammar data sync",
      "Language-specific content views and maintenance actions",
    ],
  },
  {
    area: "Users",
    purpose: "Create and maintain isolated communication profiles for multiple people.",
    capabilities: [
      "Standard add and guided add with 12-step setup wizard",
      "Duplicate active user and switch profile flows",
      "Profile metadata editing (name, photo, age, diagnosis, notes)",
      "Delete restrictions for active and last-user safety",
    ],
  },
];

export const backupCategories: BackupCategory[] = [
  { name: "Settings", description: "Key-value app settings except admin PIN material." },
  { name: "Categories", description: "Symbol category definitions and metadata." },
  { name: "Symbols", description: "Symbol records, translations, and embedded image references." },
  { name: "Favourites", description: "Favourite symbol references for rapid access." },
  { name: "Phrases", description: "Saved phrase entries and related metadata." },
  { name: "Abbreviations", description: "Shortcode expansion rules by language." },
  { name: "Activity Boards", description: "Board definitions and button placements." },
  { name: "Core-Fringe Layouts", description: "Layouts, pages, and slot records." },
  { name: "Vocabulary Packs", description: "Installed pack metadata and linkage records." },
];

export const migrationRecipes = [
  {
    title: "Device replacement",
    steps: [
      "Export selective backup from the source device.",
      "Install Loquor AAC on the new device and import the backup.",
      "Validate grid mode, user profile, and voice settings.",
    ],
  },
  {
    title: "Therapist handoff",
    steps: [
      "Duplicate the active user profile for transfer safety.",
      "Export categories, symbols, and layout assets.",
      "Import into the receiving device and validate admin lock settings.",
    ],
  },
  {
    title: "Pilot rollout",
    steps: [
      "Create a baseline profile with the setup wizard.",
      "Duplicate the profile for each learner and adjust only necessary settings.",
      "Track progression states and export periodic backups.",
    ],
  },
] as const;

export const setupWizardSteps: SetupStep[] = [
  { step: "0", title: "Language Selection", purpose: "Set language context before all other decisions. Applies immediately so all subsequent steps render in the chosen language." },
  { step: "1", title: "User Profile", purpose: "Capture name, avatar, age, diagnosis, and notes for profile identity and care context." },
  { step: "2", title: "Input Mode", purpose: "Choose Symbol Grid or Text-only. Selecting Text-only removes symbol-specific steps from the wizard." },
  { step: "3", title: "Grid Mode", purpose: "Choose Standard, Activity Boards, or Core-Fringe communication structure." },
  { step: "4", title: "Voice Provider", purpose: "Select device speech (offline) or optional ElevenLabs cloud voice provider." },
  { step: "5", title: "Fitzgerald Key", purpose: "Enable or disable colour-coded grammar category cues on pictograms." },
  { step: "6", title: "Progressive Vocabulary", purpose: "Enable staged vocabulary growth model with readiness checks and ghost slots." },
  { step: "7", title: "Appearance", purpose: "Configure theme (Light, Dark, High Contrast, Child-Friendly) and symbol font size." },
  { step: "8", title: "Grid Layout", purpose: "Set column count (6–12) and landscape display mode preferences." },
  { step: "9", title: "Smart Grammar", purpose: "Configure automatic verb conjugation and long-press inflection picker." },
  { step: "10", title: "PIN Setup", purpose: "Protect admin operations with optional 4–6 digit PIN security." },
  { step: "11", title: "Summary", purpose: "Review all selections before finalising setup and launching the app." },
];

export const setupWizardOutcomes = [
  "Consistent onboarding for caregivers and clinicians",
  "Repeatable setup across new and duplicate user profiles",
  "Faster initial readiness with fewer manual configuration passes",
  "Input mode selection adapts the wizard to symbol or text workflows",
] as const;

export const progressiveVocabularyLevels = [
  { level: 1, threshold: 80, minUses: 3, description: "Essential power words" },
  { level: 2, threshold: 75, minUses: 3, description: "Core communication starter" },
  { level: 3, threshold: 70, minUses: 2, description: "Expanded core + basics" },
  { level: 4, threshold: 65, minUses: 2, description: "Full core + people vocabulary" },
  { level: 5, threshold: null, minUses: null, description: "Complete system — mastery ceiling" },
  { level: 6, threshold: null, minUses: null, description: "Expert vocabulary — manual unlock by caregiver" },
] as const;
