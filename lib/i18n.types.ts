export type MetaCopy = {
  title: string;
  description: string;
};

export type CtaCopy = {
  title: string;
  subtitle: string;
  buttonText: string;
};

export type HeroCopy = {
  badge?: string;
  title: string;
  description: string;
};

export type TitledDescription = {
  title: string;
  description: string;
};

export type IdTitledDescription = TitledDescription & {
  id: string;
};

export type IdBadgeTitleDescription = {
  id: string;
  badge: string;
  title: string;
  description: string;
};

export type IdBadgeTitleDescriptionList = IdBadgeTitleDescription & {
  items: string[];
};

export type LinkCardCopy = {
  id: string;
  label: string;
  description: string;
};

export type ScreenshotCopy = {
  label: string;
  description: string;
};

export type LegalSectionCopy = {
  id: string;
  title: string;
  paragraphs?: string[];
  items?: string[];
  paragraphsAfter?: string[];
};

export type CommonNamespace = Record<string, string>;

export type HomeNamespace = {
  meta: MetaCopy;
  hero: {
    badge: string;
    title: string;
    highlightedTitle: string;
    description: string;
    primaryButton: string;
    secondaryButton: string;
    screenshot: ScreenshotCopy;
  };
  howItWorks: {
    badge: string;
    title: string;
    subtitle: string;
    steps: Array<{
      id: string;
      title: string;
      description: string;
    }>;
  };
  features: {
    badge: string;
    title: string;
    subtitle: string;
    cards: IdTitledDescription[];
  };
  grammarSpotlight: {
    badge: string;
    title: string;
    subtitle: string;
    examples: Array<{
      id: string;
      language: string;
      note: string;
    }>;
    linkLabel: string;
    screenshot: ScreenshotCopy;
  };
  progressiveSpotlight: {
    badge: string;
    title: string;
    subtitle: string;
    levels: Array<{
      id: string;
      level: string;
      label: string;
      badge: string;
    }>;
    linkLabel: string;
    screenshot: ScreenshotCopy;
  };
  stats: {
    items: Array<{
      id: string;
      label: string;
    }>;
  };
  cta: CtaCopy;
};

export type FeaturesNamespace = {
  meta: MetaCopy;
  hero: {
    title: string;
    highlightedTitle: string;
    description: string;
  };
  sections: IdBadgeTitleDescriptionList[];
  cta: CtaCopy;
};

export type WhoItsForNamespace = {
  meta: MetaCopy;
  hero: {
    title: string;
    highlightedTitle: string;
    description: string;
  };
  benefitsHeading: string;
  audiences: Array<{
    id: string;
    title: string;
    conditions: string;
    description: string;
    highlights: string[];
  }>;
  cta: CtaCopy;
};

export type FaqNamespace = {
  meta: MetaCopy;
  hero: HeroCopy;
  items: Array<{
    question: string;
    answer: string;
  }>;
  cta: CtaCopy;
};

export type DownloadCtaCopy = {
  title: string;
  description: string;
  appStorePrefix: string;
  appStoreLabel: string;
  googlePlayPrefix: string;
  googlePlayLabel: string;
};

export type ContactNamespace = {
  meta: MetaCopy;
  hero: HeroCopy;
  card: {
    title: string;
    description: string;
    responseTime: string;
    location: string;
  };
  download: DownloadCtaCopy;
};

export type TryLoquorAacNamespace = {
  meta: MetaCopy;
  hero: HeroCopy;
  download: DownloadCtaCopy;
};

export type ProductNamespace = {
  meta: MetaCopy;
  hero: HeroCopy;
  pillars: Array<{
    id: string;
    value: string;
    title: string;
    description: string;
  }>;
  capabilitiesTitle: string;
  featureSections: Array<{
    id: string;
    title: string;
    summary: string;
    highlights: string[];
  }>;
  linksTitle: string;
  deepDiveLinks: LinkCardCopy[];
};

export type GridModesNamespace = {
  meta: MetaCopy;
  hero: HeroCopy;
  modes: Array<{
    id: string;
    name: string;
    bestFor: string;
    summary: string;
    details: string;
    includes: string[];
  }>;
  screenshots: Array<{
    id: string;
    title: string;
    label: string;
    description: string;
  }>;
  guidance: {
    title: string;
    items: Array<{
      id: string;
      title: string;
      description: string;
      linkLabel?: string;
    }>;
  };
};

export type SmartGrammarNamespace = {
  meta: MetaCopy;
  hero: {
    badge: string;
    title: string;
    description: string;
  };
  heroScreenshot: ScreenshotCopy;
  howItWorks: {
    title: string;
    steps: Array<{
      id: string;
      title: string;
      description: string;
    }>;
  };
  examples: {
    badge: string;
    title: string;
    subtitle: string;
    languages: Array<{
      id: string;
      language: string;
      examples: Array<{
        input: string;
        output: string;
        note: string;
      }>;
    }>;
  };
  capabilities: {
    badge: string;
    title: string;
    subtitle: string;
    items: Array<{
      id: string;
      title: string;
      description: string;
    }>;
  };
  grammarBar: {
    badge: string;
    title: string;
    description: string;
    dimming: string;
    groups: Array<{
      id: string;
      name: string;
      examples: string;
      description: string;
    }>;
    primaryScreenshot: ScreenshotCopy;
    secondaryScreenshot: ScreenshotCopy;
  };
  assistLevels: {
    badge: string;
    title: string;
    subtitle: string;
    items: Array<{
      id: string;
      level: string;
      audience: string;
      behavior: string;
    }>;
  };
  offline: {
    title: string;
    description: string;
  };
  links: Array<{
    id: string;
    label: string;
  }>;
  cta: CtaCopy;
};

export type ProgressiveVocabularyNamespace = {
  meta: MetaCopy;
  hero: {
    badge: string;
    title: string;
    description: string;
  };
  heroScreenshot: ScreenshotCopy;
  principle: {
    title: string;
    description: string;
    items: Array<{
      id: string;
      title: string;
      description: string;
    }>;
  };
  levels: {
    badge: string;
    title: string;
    subtitle: string;
    items: Array<{
      id: string;
      label: string;
      description: string;
      thresholdLabel: string;
      tapsLabel: string;
    }>;
    footnote: string;
  };
  readiness: {
    badge: string;
    title: string;
    description: string;
    fabStates: Array<{
      id: string;
      label: string;
      description: string;
    }>;
    modal: {
      badge: string;
      title: string;
      description: string;
      items: Array<{
        id: string;
        label: string;
        detail: string;
      }>;
      screenshot: ScreenshotCopy;
    };
  };
  gridSizes: {
    badge: string;
    title: string;
    description: string;
    gridSizeLabel: string;
    totalConceptsLabel: string;
    level6ConceptsLabel: string;
  };
  adminControls: {
    badge: string;
    title: string;
    subtitle: string;
    items: Array<{
      id: string;
      label: string;
      description: string;
    }>;
  };
  wordFinder: {
    badge: string;
    title: string;
    description: string;
    items: string[];
    screenshot: ScreenshotCopy;
  };
  links: Array<{
    id: string;
    label: string;
  }>;
  cta: CtaCopy;
};

export type MarketingSectionsNamespace = {
  meta: MetaCopy;
  hero: HeroCopy;
  sections: IdBadgeTitleDescriptionList[];
  cta: CtaCopy;
};

export type AdminNamespace = {
  meta: MetaCopy;
  hero: HeroCopy;
  areas: Array<{
    id: string;
    area: string;
    purpose: string;
    capabilities: string[];
  }>;
  screenshots: Array<{
    id: string;
    title: string;
    label: string;
    description: string;
  }>;
  notes: {
    title: string;
    items: string[];
  };
  links: {
    title: string;
    description: string;
    items: Array<{
      id: string;
      label: string;
    }>;
  };
};

export type BackupAndMigrationNamespace = {
  meta: MetaCopy;
  hero: HeroCopy;
  categoriesTitle: string;
  categories: Array<{
    id: string;
    name: string;
    description: string;
  }>;
  recipesTitle: string;
  recipes: Array<{
    id: string;
    title: string;
    steps: string[];
  }>;
};

export type SetupWizardNamespace = {
  meta: MetaCopy;
  hero: HeroCopy;
  flowTitle: string;
  tableLabels: {
    step: string;
    title: string;
    purpose: string;
  };
  steps: Array<{
    id: string;
    step: string;
    title: string;
    purpose: string;
  }>;
  outcomes: {
    title: string;
    items: string[];
  };
};

export type LegalNamespace = {
  meta: MetaCopy;
  title: string;
  effectiveDateLabel: string;
  effectiveDate: string;
  intro: string;
  sections: LegalSectionCopy[];
  contactLead: string;
};

export type NotFoundNamespace = {
  title: string;
  description: string;
  goHome: string;
};

export interface I18nNamespaces {
  common: CommonNamespace;
  home: HomeNamespace;
  features: FeaturesNamespace;
  "who-its-for": WhoItsForNamespace;
  faq: FaqNamespace;
  contact: ContactNamespace;
  "try-loquor-aac": TryLoquorAacNamespace;
  product: ProductNamespace;
  "grid-modes": GridModesNamespace;
  "smart-grammar": SmartGrammarNamespace;
  "progressive-vocabulary": ProgressiveVocabularyNamespace;
  "activity-boards": MarketingSectionsNamespace;
  "core-fringe": MarketingSectionsNamespace;
  "symbol-management": MarketingSectionsNamespace;
  admin: AdminNamespace;
  "backup-and-migration": BackupAndMigrationNamespace;
  "setup-wizard": SetupWizardNamespace;
  "privacy-policy": LegalNamespace;
  "terms-of-service": LegalNamespace;
  "not-found": NotFoundNamespace;
}

export type NamespaceName = keyof I18nNamespaces;
