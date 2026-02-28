import FAQItem from "../../components/FAQItem";
import CTABanner from "../../components/CTABanner";
import ScrollReveal from "../../components/ScrollReveal";

const faqs = [
  {
    question: "Does Loquor AAC work offline?",
    answer: "Yes. Core communication works fully offline using your device's built-in text-to-speech. When connected to the internet, you can optionally use premium ElevenLabs AI voices for more natural speech. If the connection drops, the app automatically falls back to device voices — communication never stops.",
  },
  {
    question: "Is my data private?",
    answer: "Absolutely. Loquor AAC is designed around local-first principles. All vocabulary, phrases, symbols, settings, and communication data are stored exclusively on your device. We do not collect conversation history, voice recordings, location data, device identifiers, or any analytics. Your data stays yours.",
  },
  {
    question: "What languages are supported?",
    answer: "Loquor AAC fully supports English, Dutch, Spanish, Italian, and French. Each language includes dedicated grammar rules, verb conjugation tables, and vocabulary packs. The app's interface and grammar engine adapt automatically when you switch languages.",
  },
  {
    question: "Can I customize the vocabulary?",
    answer: "Yes — extensively. You can add, edit, and delete custom symbols, phrases, abbreviations, and categories. You can assign photos or emoji to symbols, organize them into categories and subcategories, mark favorites, and control visibility. Vocabulary Packs let you install pre-built bundles of content as well.",
  },
  {
    question: "What is Progressive Vocabulary?",
    answer: "Progressive Vocabulary is a 6-level learning system that gradually unlocks new words as the user gains proficiency. Each level builds on the previous one, and the app tracks usage statistics to determine readiness for advancement. This prevents overwhelming users with too many options while encouraging steady growth.",
  },
  {
    question: "What are Activity Boards?",
    answer: "Activity Boards are themed communication layouts designed for specific contexts — such as mealtimes, bathroom visits, social interactions, or classroom activities. Each board has a custom icon, title, background color, and its own grid of symbols. Caregivers and therapists can create, edit, and link boards together for seamless context switching.",
  },
  {
    question: "Can multiple users share one device?",
    answer: "Yes. Loquor AAC supports fully isolated multi-user profiles. Each user gets their own separate database with independent vocabulary, settings, themes, and preferences. You can switch between users easily, and even duplicate a profile to quickly set up a new user with similar settings.",
  },
  {
    question: "Does it support grammar assistance?",
    answer: "Yes, and it's one of Loquor AAC's most powerful features. The Smart Grammar engine automatically conjugates verbs based on context, and the Grammar Bar provides color-coded helpers for articles, demonstratives, possessives, and prepositions. Gender-aware dimming fades out incompatible options, and the Fitzgerald Key color-codes words by grammar category for visual learning.",
  },
  {
    question: "What voices are available?",
    answer: "Two types of voices are available. Device voices use your phone or tablet's built-in text-to-speech engine — they're free and work offline. Premium ElevenLabs AI voices offer more natural, expressive speech but require an internet connection and your own API key. You can configure pitch and speed for both, and preview voices before selecting them.",
  },
  {
    question: "How do I set up Loquor AAC?",
    answer: "Loquor AAC features an 11-step guided setup wizard that walks you through language selection, user profile creation, grid mode choice, voice settings, appearance preferences, grammar configuration, and optional PIN protection. After setup, the app automatically imports the core vocabulary pack for your selected language. Most users are communicating within minutes.",
  },
  {
    question: "Is it suitable for children?",
    answer: "Yes. Loquor AAC includes a Child-Friendly theme with large, colorful tap targets and simplified layouts. The progressive vocabulary system prevents cognitive overload by introducing words gradually. Caregivers can use PIN protection to prevent accidental changes, and the Fitzgerald Key provides visual grammar learning that's perfect for young learners.",
  },
  {
    question: "Can therapists control settings?",
    answer: "Yes. The admin panel is protected by a 4–6 digit PIN and gives therapists full control over vocabulary, grammar settings, grid modes, themes, and user profiles. Three grammar assist levels (Simple, Standard, Expert) let therapists adjust complexity as the user progresses. Grammar test runners and vocabulary statistics provide clinical-grade insight into user development.",
  },
];

export default function FaqPage() {
  return (
    <div className="py-16 space-y-16">
      {/* Hero */}
      <ScrollReveal>
        <div className="text-center space-y-4">
          <h1 className="font-(--font-jakarta) text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            Everything you need to know about Loquor AAC and our commitment to accessible communication.
          </p>
        </div>
      </ScrollReveal>

      {/* FAQ List */}
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, i) => (
          <ScrollReveal key={i} delay={i < 4 ? ((i + 1) * 100 as 100 | 200 | 300 | 400) : 0}>
            <FAQItem question={faq.question} answer={faq.answer} />
          </ScrollReveal>
        ))}
      </div>

      {/* CTA */}
      <ScrollReveal>
        <CTABanner
          title="Still Have Questions?"
          subtitle="We're here to help. Reach out and we'll get back to you promptly."
          buttonText="Contact Us"
          buttonHref="/contact"
        />
      </ScrollReveal>
    </div>
  );
}
