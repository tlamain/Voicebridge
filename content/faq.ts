export type FaqItem = {
  category: "Communication" | "Grammar" | "Voice" | "Admin" | "Data";
  question: string;
  answer: string;
};

export const faqItems: FaqItem[] = [
  {
    category: "Communication",
    question: "Does VoiceBridge AAC work offline?",
    answer: "Yes. Core communication and device text-to-speech operate offline. Cloud voice services are optional.",
  },
  {
    category: "Communication",
    question: "Can users combine typed text and symbols in the same message?",
    answer: "Yes. The communication flow supports mixed text and symbol composition before speaking or sharing output.",
  },
  {
    category: "Communication",
    question: "Which grid modes are available?",
    answer: "VoiceBridge supports Standard Grid, Activity Boards, and Core-Fringe layouts, each optimized for different communication contexts.",
  },
  {
    category: "Communication",
    question: "What is Word Finder used for?",
    answer: "Word Finder helps users locate symbols in large vocabularies and guides them through the navigation path to build motor memory.",
  },
  {
    category: "Grammar",
    question: "What does Smart Grammar do?",
    answer: "Smart Grammar supports context-aware word forms and grammar chips so sentence output is easier to shape during communication.",
  },
  {
    category: "Grammar",
    question: "How does the determiner helper work?",
    answer: "It surfaces grammar chips by language and can dim incompatible determiner options based on noun context.",
  },
  {
    category: "Grammar",
    question: "Can teams tune grammar complexity per user?",
    answer: "Yes. Assist levels can be set for beginner, standard, or expert workflows based on user and clinical goals.",
  },
  {
    category: "Voice",
    question: "Which voice providers are supported?",
    answer: "Device text-to-speech is built in, and optional ElevenLabs integration is available for premium voice output.",
  },
  {
    category: "Voice",
    question: "What happens if cloud voice fails or the network drops?",
    answer: "The platform can automatically fall back to device speech so communication is not blocked.",
  },
  {
    category: "Voice",
    question: "Can voice output be tuned?",
    answer: "Yes. Teams can tune rate and provider settings, and preview voice behavior from admin controls.",
  },
  {
    category: "Admin",
    question: "Is admin access protected?",
    answer: "Yes. Admin operations can be PIN-protected to reduce accidental edits and unauthorized setting changes.",
  },
  {
    category: "Admin",
    question: "Can caregivers manage symbols and layouts directly?",
    answer: "Yes. Admin surfaces include symbol, phrase, abbreviation, activity board, and core-fringe layout management.",
  },
  {
    category: "Admin",
    question: "How are multiple users handled on one device?",
    answer: "The app supports isolated user profiles, including standard add, guided setup, duplicate, switch, and delete flows.",
  },
  {
    category: "Admin",
    question: "Is there a guided setup flow for new users?",
    answer: "Yes. An 11-step setup wizard covers language, layout, grammar, voice, appearance, and security preferences.",
  },
  {
    category: "Data",
    question: "Is communication data uploaded by default?",
    answer: "No. VoiceBridge follows a local-first model and stores vocabulary and settings on-device by default.",
  },
  {
    category: "Data",
    question: "How do backups and migrations work?",
    answer: "Backup and restore are user-initiated with selectable categories so teams can migrate settings and content safely.",
  },
];
