export type PersonaWorkflow = {
  id: string;
  title: string;
  overview: string;
  primaryNeeds: string[];
  workflow: string[];
  outcomes: string[];
};

export const personaWorkflows: PersonaWorkflow[] = [
  {
    id: "adults",
    title: "Literate Adults (ALS, stroke, aphasia)",
    overview: "Prioritize speed, identity-preserving voice output, and consistent communication controls.",
    primaryNeeds: [
      "Fast compose and speak behavior",
      "Flexible text and symbol blending",
      "Reliable speech output in mixed connectivity",
    ],
    workflow: [
      "Compose using typed text with symbol support for key words",
      "Apply optional grammar-aware form selection when needed",
      "Speak with configured provider and fallback safety",
      "Share output to care and communication apps",
    ],
    outcomes: [
      "Higher communication speed for daily exchanges",
      "Reduced breakdowns when cloud voice is unavailable",
      "More stable routines across devices and sessions",
    ],
  },
  {
    id: "emergent",
    title: "Emergent Communicators (autism, cerebral palsy)",
    overview: "Focus on predictable symbol placement, progressive growth, and guided navigation.",
    primaryNeeds: [
      "Motor-planning-friendly layouts",
      "Gradual vocabulary expansion",
      "Clear routine and activity board paths",
    ],
    workflow: [
      "Select the best-fit grid mode for current context",
      "Use progression levels and readiness checks for safe expansion",
      "Leverage board links and core-fringe navigation pathways",
      "Adjust visual and grammar support settings based on learner stage",
    ],
    outcomes: [
      "Lower cognitive load during communication",
      "Faster familiarization with symbol paths",
      "Cleaner transition from starter to broader vocabulary",
    ],
  },
  {
    id: "teams",
    title: "Caregivers and SLP Teams",
    overview: "Need structured admin operations, controlled edits, and repeatable setup workflows.",
    primaryNeeds: [
      "Protected editing with PIN workflows",
      "Reusable setup patterns for new users",
      "Backup, restore, and migration options",
    ],
    workflow: [
      "Configure baseline settings through wizard or admin tabs",
      "Manage symbols, phrases, abbreviations, and grid assets",
      "Duplicate or create user profiles with isolated data",
      "Export selective backups for migration or handoff",
    ],
    outcomes: [
      "Less setup overhead per user",
      "Fewer accidental configuration changes",
      "More predictable handoff across caregivers and clinics",
    ],
  },
];
