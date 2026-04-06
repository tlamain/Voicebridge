export const adminAreaIds = ["settings", "content", "language", "users"] as const;

export const backupCategoryIds = [
  "settings",
  "categories",
  "symbols",
  "favourites",
  "phrases",
  "abbreviations",
  "activity-boards",
  "core-fringe-layouts",
  "vocabulary-packs",
] as const;

export const migrationRecipeIds = [
  "device-replacement",
  "therapist-handoff",
  "pilot-rollout",
] as const;

export const setupWizardSteps = [
  { id: "language-selection", step: "0" },
  { id: "user-profile", step: "1" },
  { id: "input-mode", step: "2" },
  { id: "grid-mode", step: "3" },
  { id: "voice-provider", step: "4" },
  { id: "fitzgerald-key", step: "5" },
  { id: "progressive-vocabulary", step: "6" },
  { id: "appearance", step: "7" },
  { id: "grid-layout", step: "8" },
  { id: "smart-grammar", step: "9" },
  { id: "pin-setup", step: "10" },
  { id: "summary", step: "11" },
] as const;

export const setupWizardOutcomeIds = [
  "consistent-onboarding",
  "repeatable-setup",
  "faster-readiness",
  "adaptive-input-mode",
] as const;
