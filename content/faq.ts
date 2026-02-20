export type FaqItem = {
  question: string;
  answer: string;
};

export const faqItems: FaqItem[] = [
  {
    question: "Does VoiceBridge AAC work offline?",
    answer: "Yes. Core communication and device text-to-speech work offline. Cloud voice options are optional.",
  },
  {
    question: "Is communication data uploaded by default?",
    answer: "No. The app follows a local-first model and keeps vocabulary and settings on-device by default.",
  },
  {
    question: "Can caregivers customize symbols and boards?",
    answer: "Yes. Admin mode allows content edits and can be protected with a PIN to prevent accidental changes.",
  },
  {
    question: "Can we support multiple users on one device?",
    answer: "Yes. The platform supports separate user profiles with isolated settings and vocabulary.",
  },
  {
    question: "How are backups handled?",
    answer: "Backup and restore are user-initiated and selective, including support for board and layout data.",
  },
];
