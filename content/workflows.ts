export type WorkflowStep = {
  step: string;
  title: string;
  description: string;
};

export const communicationWorkflow: WorkflowStep[] = [
  {
    step: "01",
    title: "Compose",
    description: "Build a message with symbols, text input, and prediction support.",
  },
  {
    step: "02",
    title: "Assist",
    description: "Apply grammar-aware options, determiner support, or locked forms when needed.",
  },
  {
    step: "03",
    title: "Speak",
    description: "Output with device speech or premium voices, with fallback if cloud speech fails.",
  },
  {
    step: "04",
    title: "Adapt",
    description: "Refine vocabulary, layouts, and progression levels in admin mode for each user profile.",
  },
];

export const audienceOutcomes = [
  {
    audience: "AAC Users",
    outcome: "Reliable communication with stable layouts across contexts.",
  },
  {
    audience: "Caregivers",
    outcome: "Fast customization without exposing risky editing paths.",
  },
  {
    audience: "SLPs and Clinicians",
    outcome: "Structured setup, measurable progression, and reusable content patterns.",
  },
] as const;
