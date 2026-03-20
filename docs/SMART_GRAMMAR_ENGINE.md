# Smart Grammar Engine

## Overview

The Smart Grammar Engine is a context-aware verb conjugation system for Loquor that automatically inflects verbs based on sentence context. When a user builds a sentence by tapping pictograms, the engine tracks grammatical context (subject, tense, language) and conjugates verbs accordingly.

It currently supports **Dutch**, **English**, **Spanish**, and **French**.

**Dutch Example:**
- User taps: `ik` + `lopen` → Displays: `ik loop` (1st person singular)
- User taps: `hij` + `lopen` → Displays: `hij loopt` (3rd person singular)
- User taps: `ik` + `hebben` + `lopen` → Displays: `ik heb gelopen` (perfect tense)
- User taps: `hij` + `wassen` + `zich` → Displays: `hij wast zich` (reflexive)
- User taps: `ik` + `wassen` + `zich` → Displays: `ik was me` (reflexive adjustment)
- User taps: `ik` + `willen` + `gaan` + `jij` + `willen` + `gaan` → Displays: `ik wil gaan jij wilt gaan` (multi-clause)

**English Example:**
- User taps: `I` + `walk` → Displays: `I walk` (1st person singular)
- User taps: `she` + `walk` → Displays: `she walks` (3rd person singular)
- User taps: `I` + `have` + `walk` → Displays: `I have walked` (perfect tense)
- User taps: `I` + `be` + `walk` → Displays: `I am walking` (continuous aspect)
- User taps: `I` + `eat` + `not` → Displays: `I do not eat` (do-support negation)
- User taps: `Do` + `you` + `like` → Displays: `Do you like` (do-support question)

**French Example:**
- User taps: `je` + `parler` → Displays: `je parle` (1st person singular)
- User taps: `nous` + `finir` → Displays: `nous finissons` (2nd group -ir verb)
- User taps: `elle` + `aller` → Displays: `elle va` (irregular verb)
- User taps: `je` + `aimer` → Displays: `j'aime` (elision before vowel)
- User taps: `je` + `manger` + `pas` → Displays: `je ne mange pas` (negation wrapping)
- User taps: `je` + `avoir` + `manger` → Displays: `j'ai mangé` (perfect with avoir)
- User taps: `demain` + `je` + `parler` → Displays: `demain je parlerai` (future tense)
- User taps: `manger` + `il` + `?` → Displays: `mange-t-il ?` (interrogative inversion with euphonic -t-)
- User taps: `le` + `petit` + `chat` + `plural` → Displays: `les petits chats` (noun phrase agreement)

## Design Principles

1. **Isolation**: All grammar code lives in `src/grammar/` - completely separate from core app logic.
2. **Fail-Safe**: Returns original input on any error - grammar failures never break the app.
3. **Feature Flag**: Controlled by `smartGrammarEnabled` setting - can be toggled off instantly.
4. **Offline-First**: All processing happens locally with no network dependencies.
5. **Additive Schema**: New grammar tables plus additive columns on `symbols` (word_type, infinitive).
6. **Language Encapsulation**: All language-specific logic (verb detection, conjugation rules, word classification, transformations) must be contained within language adapters.
7. **Single Source of Truth**: Each piece of grammar logic exists in exactly one place.

### Key Architectural Rules

**🔴 CRITICAL - Transformation Flow:**
- **Individual conjugation** happens in `useGrammar.processSymbol()` via language adapters
- **Sentence transformations** happen in `buildDisplayTokens()` by calling `conjugator.transformSentence()`
- This separation is essential: conjugation first, then sentence-level corrections
- Example: "walks" is conjugated individually, then reset to "walk" by do-support transformation

**🔴 CRITICAL - Code Location:**
- ✅ Grammar logic → Language adapters (`EnglishConjugator.ts`, `FrenchConjugator.ts`, etc.)
- ✅ Transformation orchestration → `buildDisplayTokens()` in `displayTokens.ts`
- ✅ Context tracking → `SentenceStateMachine.ts`
- ❌ **NEVER** → `GrammarTestRunner.ts` (testing only!)

**🔴 CRITICAL - Test vs. Runtime:**
- Test runner must call the **same functions** as runtime
- If tests pass but runtime fails, the code paths have diverged
- Fix by moving logic to shared location, not by duplicating in test runner

## Architecture

```
src/grammar/
├── index.ts                    # Public API exports
├── types.ts                    # TypeScript interfaces (IConjugator, SentenceContext, etc.)
├── GrammarEngine.ts            # Main singleton engine
├── SentenceStateMachine.ts     # Context tracking FSM
├── WordClassifier.ts           # Language-agnostic word classification utility
├── displayTokens.ts            # Display token orchestration & sentence transformations
├── tokenUtils.ts               # Token manipulation utilities
├── GrammarTestRunner.ts        # ⚠️ TEST SUITE ONLY - NO GRAMMAR LOGIC HERE
├── cache/
│   ├── index.ts
│   └── ExceptionCache.ts       # In-memory verb exception cache (supports forceJson option)
├── hooks/
│   ├── index.ts
│   ├── useGrammar.ts           # Main React integration hook
│   └── useSentenceStateMachine.ts
├── languages/
│   ├── index.ts                # Language registry
│   ├── BaseLanguageAdapter.ts  # Abstract base class
│   ├── dutch/                  # Dutch implementation
│   │   ├── DutchStemmer.ts     # Dutch-specific stemming
│   │   ├── DutchConjugator.ts  # Dutch conjugation + rules + loadDutchNounExceptionsFromDB()
│   │   └── constants.ts        # Dutch language data (imports from data/)
│   ├── english/                # English implementation
│   │   ├── EnglishConjugator.ts # English conjugation + rules + loadEnglishNounExceptionsFromDB()
│   │   └── constants.ts        # English language data (imports from data/)
│   ├── spanish/                # Spanish implementation
│   │   ├── SpanishStemmer.ts   # Spanish-specific stemming
│   │   ├── SpanishConjugator.ts # Spanish conjugation + rules + loadSpanishNounExceptionsFromDB()
│   │   └── constants.ts        # Spanish language data (imports from data/)
│   └── french/                 # French implementation
│       ├── FrenchStemmer.ts    # French-specific stemming (3 verb groups)
│       ├── FrenchConjugator.ts # French conjugation + rules + loadFrenchNounExceptionsFromDB()
│       └── constants.ts        # French language data (imports from data/)
├── ui/
│   ├── index.ts
│   ├── InflectionPicker.tsx    # Manual form selection modal
│   └── GrammarBadge.tsx        # Visual indicator component
└── data/
    ├── types/
    │   └── wordlist.types.ts   # JSON schema definitions
    ├── loaders/
    │   └── wordlistLoader.ts   # Type-safe JSON loaders
    ├── wordlists/              # Raw JSON data
    │   ├── dutch/
    │   ├── english/
    │   ├── spanish/
    │   └── french/
    ├── grammarTestCases.en.json  # English test cases
    ├── grammarTestCases.nl.json  # Dutch test cases
    ├── grammarTestCases.es.json  # Spanish test cases
    ├── grammarTestCases.fr.json  # French test cases
    ├── seedDutchVerbs.ts       # Database seeding logic
    ├── seedEnglishVerbs.ts     # Database seeding logic
    ├── seedSpanishVerbs.ts     # Database seeding logic
    └── seedFrenchVerbs.ts      # Database seeding logic
```

## Data Management

The engine uses structured JSON files for static language data (particles, common nouns, verb detection lists) instead of hardcoding large arrays in TypeScript files. This separates code from data and allows for easier updates.

### Schema Definitions (`src/grammar/data/types/wordlist.types.ts`)

Strict TypeScript interfaces ensure that JSON data matches the expected structure.

- **`SimpleWordlistJSON`**: Flat lists (e.g., nouns, negation markers).
- **`ParticleWordlistJSON`**: Key-value pairs mapping words to grammatical types (adverb, preposition, etc.).
- **`VerbDetectionJSON`**: Specialized lists for `isLikelyVerb` heuristics (non-verbs, short forms).
- **`IrregularVerbsJSON`**: Structure for defining irregular verb exceptions (used in seeding).

### Data Loading (`src/grammar/data/loaders/`)

Loaders parse the JSON files at runtime (or bundle time) and convert them into efficient data structures for O(1) lookups.

- `loadWordSet()`: Converts simple lists to `Set<string>`.
- `loadParticleMap()`: Converts particle objects to `Map<string, ParticleType>`.
- `loadVerbDetection()`: Returns structured sets for verb detection logic.

### Wordlist Organization (`src/grammar/data/wordlists/`)

Data is organized by language. Each language directory typically contains:
- `nouns.json`: Common nouns for subject detection.
- `negation.json`: Negation markers.
- `particles.json`: Non-inflecting words to exclude from conjugation.
- `verb-detection.json`: Heuristics for automatic verb detection.
- `irregular-verbs.json`: Exception data for database seeding.

## Core Components

### 1. SmartGrammarEngine (`GrammarEngine.ts`)

The main singleton that coordinates all grammar operations.

**Key Methods:**
- `initialize(language)`: Load language adapter and warm up exception cache.
- `conjugate(infinitive)`: Get conjugated form based on current context.
- `getAllForms(infinitive)`: Get all possible forms for the picker UI.
- `isEnabled`: Check if engine is ready.

### 1.5. Display Token Builder (`displayTokens.ts`)

**Purpose:** Orchestrates sentence-level transformations and display ordering.

**Key Interface:**
```typescript
export interface TokenInput {
  index: number;           // Position in original sequence
  label: string;           // Original label
  displayLabel: string;    // Conjugated form
  isVerb: boolean;
  slot?: VerbSlot;         // Current conjugation slot
  infinitive?: string;     // Verb infinitive (needed for transformations)
}

export function buildDisplayTokens(
  tokens: TokenInput[],
  conjugator: IConjugator,
  language: SupportedLanguage,
  context: SentenceContext  // NEW: Needed for transformSentence
): DisplayToken[]
```

**Responsibilities:**
1. **Sentence Transformations** (Step 1):
   - Converts `TokenInput[]` → `SentenceToken[]`
   - Calls `conjugator.transformSentence()` for English/Spanish/French
   - Handles token insertions/deletions
   - Updates verb forms based on transformation results

2. **Display Reordering** (Step 2):
   - For Dutch: V2 word order inversion, reflexive placement
   - Other language-specific display adjustments

3. **Output**:
   - Returns `DisplayToken[]` with final labels and display order

### 2. SentenceStateMachine (`SentenceStateMachine.ts`)

Tracks grammatical context as the user builds a sentence. It handles language switching, updates context based on input, and recalculates verb slots.

**Context State:**
```typescript
interface SentenceState {
  subject?: { person: 1 | 2 | 3; number: 'SG' | 'PL'; symbolId: string };
  tense: 'PRESENT' | 'PAST' | 'PERFECT' | 'FUTURE';
  language: 'nl' | 'en' | 'de' | 'es' | 'fr';
  verbs: Map<string, VerbData>;
  isInverted: boolean; // For question inversion (e.g. Dutch)
  reflexive?: {        // For reflexive verb constructions
    symbolId: string;
    resolvedForm?: string;
  };
}
```

### 2.1 Automatic Verb Slot Recalculation

The state machine automatically recalculates verb slots when context changes.

**Logic & Precedence:**

1. **Modal + Perfect** (e.g., "moet hebben geslapen"):
   - Modal → finite
   - Auxiliary → INF
   - Main Verb → PARTICIPLE
2. **Perfect + Modal** (e.g., "heeft kunnen slapen"):
   - Auxiliary → finite
   - Modal → INF
   - Main Verb → INF
3. **Perfect Tense**:
   - Trigger: Auxiliary (`hebben`/`zijn`/`have`)
   - Auxiliary → finite
   - Main Verb → PARTICIPLE
4. **Continuous Aspect** (English):
   - Trigger: Auxiliary (`be`)
   - Auxiliary → finite
   - Main Verb → PRESENT_PARTICIPLE (-ing)
5. **Modal Verb**:
   - Trigger: Modal (`can`, `will`, `moeten`)
   - Modal → finite
   - Main Verb → INF
6. **Default**:
   - Verbs → finite form based on subject/tense

### 2.2 Multi-Clause Support

The state machine supports multi-clause sentences where different subjects govern different verbs (e.g., "ik wil gaan jij wilt gaan").

**New Clause Detection:**
When a pronoun with a **different person or number** appears after a subject and verbs have been processed, the state machine treats it as a new clause:

1. Existing verbs are cleared from the state machine
2. The new pronoun becomes the active subject
3. Subsequent verbs conjugate with the new subject

**Restrictions:**
- Only **1st and 2nd person pronouns** trigger new clause detection. This is because they are unambiguous subjects in Dutch (object forms are different words: mij, jou, ons). 3rd person pronouns (het, ze, hij) are blocked because they are often objects (e.g., "ik begrijp het").
- Same person/number pronouns after verbs are blocked as likely object pronouns.

**Conjugation Locking:**
When a new clause is detected, all existing conjugations from the previous clause are **locked** to prevent reconjugation from corrupting them with the new subject's person/number.

**Modal/Gaan Force-INF Clause Boundaries:**
The "gaan + infinitive" and "modal + infinitive" detection (which forces the verb after a modal/gaan to stay infinitive) respects clause boundaries. If a `personal_pronoun` token exists between two verb indices, they are considered to be in different clauses, and the INF override is not applied across the boundary.

**Subject Re-derivation on Symbol Removal:**
When a symbol is removed (backspace) and that symbol was the current subject, the engine scans the remaining tokens for the first pronoun and re-establishes it as subject. This prevents stale "no subject" state when the user erases back to a sentence that still contains a subject pronoun.

**Grammar Reset on Clear:**
The grammar state machine is always reset when the message is cleared, regardless of whether smart grammar is currently enabled. This prevents stale subjects and verbs from persisting across sentences. Previously, clearing while grammar was disabled would leave stale state that could block new subject selection when grammar was re-enabled.

### 2.3 Inversion Handling

The state machine detects when a verb appears before the subject (Question Inversion or V2 word order).
- **Dutch Rule**: If `isInverted` is true and subject is `2SG` (jij), the verb drops the `-t` ending (uses `PRES_1SG` form internally).
  - "Jij loopt" -> "Loop jij?"

### 2.4 Reflexive Pronouns

The state machine tracks reflexive markers (e.g., "zich", "se").
- When a subject is selected, it resolves the reflexive marker to the correct pronoun form via the language adapter.
- Example (Dutch): Subject "ik" + Marker "zich" → Resolved: "me" ("ik was me").

## Processing Flow: From Symbol to Display

Understanding the complete flow of how symbols are processed into final display text is crucial for maintaining the grammar engine.

### 1. Symbol Selection (`MainScreen.tsx` → `useGrammar.ts`)

When a user taps a symbol:
```
User taps symbol → handleSymbolPress()
  ↓
  Add pictogram to Redux state
  ↓
  Call useGrammar.processSymbol(index, symbolId, label, wordType, infinitive)
```

### 2. Grammar Processing (`useGrammar.ts::processSymbol`)

For each symbol, the hook:
1. Identifies the word type (pronoun, temporal trigger, verb, etc.)
2. Dispatches events to the state machine (SUBJECT_SELECTED, VERB_ADDED, etc.)
3. **For verbs**: Gets calculated slot from state machine and conjugates immediately
4. Stores conjugation info in the `conjugations` Map

**Key Point:** Each verb is conjugated individually based on context at this stage.

### 3. State Machine Updates (`SentenceStateMachine.ts`)

When verbs are added or context changes:
1. Recalculates verb slots (detecting auxiliaries, modals, perfect tense)
2. Determines if verbs should be finite, infinitive, or participle
3. Notifies listeners (triggers reconjugation of unlocked verbs)

### 4. Display Token Generation (`displayTokens.ts::buildDisplayTokens`)

**This is where sentence-level transformations happen.** Called when rendering the message:

```typescript
buildDisplayTokens(tokenInputs, conjugator, language, context)
  ↓
  Step 1: Apply language-specific sentence transformations
    - For English/Spanish: Call conjugator.transformSentence()
    - Transforms patterns like do-support, passive voice
    - May insert/delete tokens (e.g., inserting "do/does")
    - Updates verb forms (e.g., "walks" → "walk" after do-support)
  ↓
  Step 2: Apply display-level reordering
    - For Dutch: V2 inversion, reflexive placement
  ↓
  Return DisplayToken[] with final labels and order
```

**Critical Architecture Rule:** `buildDisplayTokens()` is the **single orchestrator** for all sentence-level transformations. It calls the language adapter's `transformSentence()` method, which contains the language-specific transformation logic.

### 5. Message Display (`MainScreen.tsx`)

The display tokens are joined into the final message string:
```typescript
displayTokens.map(t => t.label).join(' ')
```

## Why This Architecture?

### Problem: The Bug We Fixed

**Before the fix:**
- Individual verbs were conjugated correctly ("does", "walks")
- But `transformSentence()` was never called in the runtime code path
- Result: "he does not walks" ❌ (both verbs conjugated)

**After the fix:**
- Verbs still conjugated individually ("does", "walks")
- `buildDisplayTokens()` now calls `transformSentence()` for English
- Do-support transformation resets main verb: "walks" → "walk"
- Result: "he does not walk" ✅

### Single Source of Truth

- **Language adapters** (`EnglishConjugator.ts`, `FrenchConjugator.ts`, etc.): Contains ALL grammar logic including transformations
- **`buildDisplayTokens()`**: Orchestrates when transformations are applied
- **`GrammarTestRunner.ts`**: ⚠️ **TESTING ONLY** - Simulates the runtime flow but contains NO grammar logic

**⚠️ IMPORTANT:** Never add grammar correction logic to `GrammarTestRunner.ts`. It exists solely to:
1. Load test cases from JSON files
2. Simulate the symbol input process
3. Call the same functions as runtime (`conjugate`, `buildDisplayTokens`)
4. Compare actual output to expected output

Any grammar logic must go in the language adapters or `buildDisplayTokens()`.

## Separation of Concerns: Language Adapters

### Language Adapter Interface (`IConjugator`)

Every language adapter extends `BaseLanguageAdapter` and implements `IConjugator`.

```typescript
interface IConjugator {
  // Core conjugation
  conjugate(infinitive: string, context: SentenceContext): ConjugationResult;
  getAllForms(infinitive: string): VerbFormOption[];
  getStem(infinitive: string): string;

  // Word identification & Classification
  identifyPronoun(word: string): { person: Person; number: GrammaticalNumber } | null;
  identifyTemporalTrigger(word: string): Tense | null;
  identifyNoun(word: string): { number: GrammaticalNumber } | null;
  identifyNegationMarker(word: string): boolean;
  identifyParticle(word: string): { type: ParticleType } | null;
  isLikelyVerb(word: string): boolean;

  // Auxiliary/Modal/Reflexive logic
  isAuxiliary(verb: string): boolean;
  isModal(verb: string): boolean;
  classifyAuxiliary(verb: string): 'perfect' | 'continuous' | 'none';
  isReflexiveMarker(word: string): boolean;
  getReflexivePronoun(person: Person, number: GrammaticalNumber): string | null;

  // Sentence-level transformations
  transformSentence(tokens: SentenceToken[], context: SentenceContext): SentenceToken[];
}
```

### Sentence Transformations (`transformSentence`)

Some grammatical rules operate on the whole sentence structure rather than individual words. These transformations are implemented in the language adapters and called via `buildDisplayTokens()`.

**English Implementation (`EnglishConjugator.transformSentence`):**
1. **Passive Voice**: Detects `[noun] + [be] + [verb-ing]` pattern and corrects the main verb to `PARTICIPLE`.
2. **Negation (Do-Support)**: Transforms `[subject] + [verb] + [not]` into `[subject] + [do/does] + [not] + [verb-inf]`.
   - If "do" is already present: normalizes it and resets main verb to infinitive
3. **Questions (Do-Support)**: Transforms `[Do/Does] + [subject] + [verb]` into `[do/does] + [subject] + [verb-inf]`.

**Important:** The main verb must be reset to infinitive form after do-support because it was initially conjugated (e.g., "walks") but needs to become base form (e.g., "walk") when auxiliary "do/does" carries the conjugation.

## Dutch Conjugation Rules

### Conjugation (`DutchConjugator.ts`)

**Present Tense:**
- 1SG: stem
- 2SG/3SG: stem + t (inversion exception for 2SG: stem)
- PL: infinitive

**Past Tense:**
- Weak verbs: stem + `te(n)` or `de(n)` ('t Kofschip rule).
- Strong verbs: vowel change (irregular).

**Participle:**
- `ge-` + stem + `d/t`.
- Handles separable prefixes (e.g., `opbellen` -> `opgebeld`).
- Handles inseparable prefixes (no `ge-` for `be-`, `ver-`, etc.).

**Loanword Handling (`DutchStemmer.IRREGULAR_STEMS_NO_DOUBLING`):**
- Dutch stemming doubles a single vowel before a single consonant to preserve long vowel sounds (e.g., `lop` → `loop` from `lopen`). English loanwords break this rule because they retain short vowels (e.g., `hiken` → `hik`, not `hiik`).
- All loanword stems with short vowels must be added to `IRREGULAR_STEMS_NO_DOUBLING` in `DutchStemmer.ts`.
- Current loanwords: `hik`, `lik`, `ap`, `blog`, `chat`, `debug`, `edit`, `manag`, `mut`, `scan`, `transpil`, `updat`, `vlog`.
- When adding new Dutch loanword verbs to vocabulary packs, check if the stem matches the "single vowel + single consonant" pattern and add it to the exclusion list if the vowel is short.

**Reflexives:**
- Maps "zich" to: me (1SG), je (2SG), zich (3SG), ons (1PL), je (2PL), zich (3PL).

## English Grammar Engine Specifics (`EnglishConjugator.ts`)

### Conjugation forms
- **Present:** 3SG adds `-s/-es/-ies` (incl. sibilants, `-o`, consonant+`y`); all others use base.
- **Past (regular):** `-ed` with spelling rules: drop silent `e`; consonant+`y` → `-ied`; `-c` → `-cked`; CVC doubling with force/skip exception lists; irregular simple past map for common verbs.
- **Participle:** Same as past for regulars; irregulars via exception cache.
- **Present participle (-ing):** Handles `-ie → -ying`, silent-`e` drop (except keep list like `shoe` → `shoeing`), `-c → -cking`, CVC doubling with force/skip lists, guard against double `-ing`.
- **Auxiliaries:** `be/have/do` have dedicated slot-based forms; `normalizeToInfinitive` collapses inflected be/have/do/go to base for rule lookups.

### Identification heuristics
- **Pronouns/temporal triggers/auxiliaries/modals**: from constants; auxiliaries classified as `perfect` (have) or `continuous` (be).
- **Nouns:** detects article-led phrases, compound "X and Y" subjects → plural, irregular plurals, `-s/-es/-ies/-ves` heuristics; defaults to singular when matched.
- **Particles/negation:** token maps for particles; `not`/`never` etc. as negation markers.
- **Verb likelihood:** rejects known pronouns/negations first; accepts auxiliaries/modals and be/have/do forms; accepts verbs in common list or exception cache; rejects pure particles/nouns; otherwise allows alphabetic tokens as verbs to favor coverage.

### Sentence-level transformations (ordered)
1) **Perfect continuous:** `have/has/had + been + verb` → main verb → PRESENT_PARTICIPLE; normalize have.
2) **Passive perfect:** `have/has/had + been + verb` → main verb → PARTICIPLE; normalize have/been.
3) **Passive voice:** `subject + be + verb` (non-intransitive) → verb → PARTICIPLE (uses intransitive allowlist to avoid false passive).
4) **Copular questions:** be/have as main verb with non-verb predicate (incl. wh-); conjugate aux, keep predicate.
5) **Imperative negative:** `[not verb]` → insert `do`; `[do/does/did not verb]` → normalize to `do not VERB-INF`.
6) **Do-support negation:** `[subject verb not]` (non-modal/non-be/non-have) → insert/normalize `do/does/did` after subject; main verb → INF.
7) **Auxiliary-fronted questions:** `[be/have] subject verb` → conjugate aux; main verb stays PART or PRES_PART depending on aux.
8) **Do-support questions:** `[Do/Does/Did subject verb]` (or wh-fronted) → normalize `do` and main verb → INF; tense inferred from `did`.
9) **Emphatic do:** `[subject do verb]` → keep main verb INF (no negation).
10) **Do-support inversion:** `[adverb] [did/do/does] [subject] [verb]` → main verb INF.
11) **Perfect pattern:** `have/has/had ... verb` → main verb PARTICIPLE.
12) **Passive continuous:** `be + being + verb` → verb PARTICIPLE; ensure `being`.
13) **Passive gerund:** `being + verb` → verb PARTICIPLE.
14) **Future continuous:** `will/shall + be + verb` → verb PRESENT_PARTICIPLE (unless already PARTICIPLE for passive); normalize `be`.
15) **Future perfect continuous:** `will/shall + have + been + verb` → verb PRESENT_PARTICIPLE.
16) **Passive infinitive:** `to be verb` → verb PARTICIPLE.
17) **Going-to normalization:** `be + going/go + to + verb` → normalize `going`; main verb INF.
18) **Cannot spelling:** `can + not` → `cannot` token.
19) **There-be agreement:** `there + be`(/`have been`) conjugated from following noun phrase and tense hints; normalizes `been` for perfect.

### Support functions
- **Slot determination:** `determineDoSlot` maps person/number/tense to verb slots reused by `be/have/do` and do-support.
- **do-form selection:** `getDoForm` chooses `do/does/did`; `determineDoSlot` sets slot/person/number on inserted auxiliaries.
- **Labeling for picker:** `formatLabel` uses slot labels + pronoun map for UI.

### Ordering + orchestration
- All transformations run inside `EnglishConjugator.transformSentence()` and are invoked from `buildDisplayTokens()` before any display reordering. This ensures do-support/passive/continuous/perfect corrections apply to runtime output just like tests.

## French Grammar Engine Specifics (`FrenchConjugator.ts`)

### Verb Groups

French has three conjugation groups:

| Group | Pattern | Example | Key Feature |
|-------|---------|---------|-------------|
| 1st (-er) | ~80% of verbs | parler, manger | Regular stem + endings |
| 2nd (-ir with -iss-) | Regular -ir | finir, choisir | -iss- infix in plural present |
| 3rd (irregular) | -ir, -re, -oir | partir, vendre, voir | Irregular stems/patterns |

### Conjugation forms

- **Present:** Group-specific endings. 1st: -e/-es/-e/-ons/-ez/-ent. 2nd: -is/-is/-it/-issons/-issez/-issent. 3rd: irregular per verb.
- **Imparfait:** Nous-stem of present + -ais/-ais/-ait/-ions/-iez/-aient.
- **Passé simple:** Literary past. 1st: -ai/-as/-a/-âmes/-âtes/-èrent. 2nd/3rd: -is/-is/-it/-îmes/-îtes/-irent or -us/-us/-ut/-ûmes/-ûtes/-urent.
- **Futur simple:** Infinitive (or irregular stem) + -ai/-as/-a/-ons/-ez/-ont. Triggered by temporal markers (demain, bientôt, après-demain). Irregular stems: être→ser-, avoir→aur-, aller→ir-, faire→fer-, etc.
- **Conditionnel:** Future stem + imparfait endings (-ais/-ais/-ait/-ions/-iez/-aient).
- **Subjonctif présent:** Ils-stem of present + -e/-es/-e/-ions/-iez/-ent.
- **Participe passé:** -er→-é, -ir→-i, -re→-u + irregular forms.
- **Participe présent (gérondif):** Nous-stem + -ant.

### Spelling changes in regular verbs

- **-ger verbs:** Insert 'e' before a/o (nous mang**e**ons)
- **-cer verbs:** c → ç before a/o (nous commen**ç**ons)
- **-yer verbs:** y → i before silent e (je netto**i**e)
- **-e_er verbs:** e → è in stressed syllables (je l**è**ve)
- **-eler/-eter verbs:** Double consonant or accent (j'app**ell**e, j'ach**è**te)

### Auxiliary selection (avoir vs être)

- **avoir** for most verbs: "j'ai mangé"
- **être** for ~17 movement/state verbs (aller, venir, arriver, partir, monter, descendre, entrer, sortir, naître, mourir, rester, retourner, tomber, devenir, revenir, passer, rentrer) + all reflexive verbs
- Participle agrees with subject when using être: "elle est all**ée**", "ils sont part**is**"

### Sentence-level transformations (`FrenchConjugator.transformSentence`)

Transformations are applied in this order:

1. **Noun phrase agreement:** Detects `plural` and `feminine` control tokens, removes them, and applies agreement transformations to all non-verb tokens. Articles transform (le→les, un→des), nouns/adjectives pluralize (+s, -al→-aux, -eau→-eaux) and feminize (+e, irregular forms like beau→belle). Feminization runs before pluralization when both are present.
2. **Être auxiliary for perfect tense:** Inserts conjugated être for être-verbs in perfect context.
3. **Negation wrapping:** Detects negation marker (pas, jamais, rien, plus) and wraps the verb with `ne...marker` → "je ne mange pas". Correctly handles clitic pronouns: `ne` is inserted before clitic pronouns (me, te, se, le, la, les, lui, leur, nous, vous) that precede the verb → "je ne m'arrête pas" (not "je me n'arrête pas").
4. **Interrogative inversion:** When `?` is present, merges verb+pronoun with hyphen. Inserts euphonic `-t-` when verb ends in a vowel and pronoun starts with a vowel → "mange-t-il ?" (not "mange-il ?").
5. **Elision:** Before vowels or mute h: je→j', me→m', te→t', se→s', le→l', la→l', ne→n', de→d', que→qu'. Merges elided form with following word → "j'aime", "je n'aime pas". Respects h-aspiré words (no elision before haïr, heurter, huer, etc.).

### Identification heuristics

- **Pronouns:** je, tu, il, elle, on, nous, vous, ils, elles — mapped to person/number
- **Temporal triggers:** hier→PAST, aujourd'hui→PERFECT, maintenant→PRESENT, demain→FUTURE, bientôt→FUTURE, après-demain→FUTURE
- **Auxiliaries:** avoir (perfect), être (perfect/passive)
- **Modals:** pouvoir, devoir, vouloir, savoir, falloir
- **Negation markers:** ne, pas, jamais, rien, plus, personne, aucun, guère
- **Noun detection:** French noun list + heuristic plural detection (-s/-x/-aux)
- **Verb likelihood:** Rejects known pronouns/particles; accepts verbs in common list or exception cache; accepts -er/-ir/-re endings

### Noun pluralization

- Default: +s (chat → chats)
- -eau/-au/-eu → +x (chapeau → chapeaux)
- -al → -aux (animal → animaux; exceptions: bal, festival, etc.)
- -s/-x/-z → unchanged (bras → bras)
- Irregulars: oeil→yeux, travail→travaux, etc.

### Noun phrase agreement (control tokens)

The French conjugator supports `plural` and `feminine` control tokens that trigger agreement across an entire noun phrase (articles, adjectives, nouns). These tokens are consumed by `transformSentence` and do not appear in the output.

**Article agreement:**
- Plural: le→les, la→les, un→des, une→des
- Feminine: le→la, un→une

**Adjective/noun feminization (`feminizeWord`):**
- Default: +e (étudiant→étudiante, français→française)
- Irregular forms: beau→belle, nouveau→nouvelle, vieux→vieille, blanc→blanche, gros→grosse, etc.
- Pattern rules: -eux→-euse, -er→-ère, -el→-elle, -en→-enne, -on→-onne, -et→-ette, -f→-ve
- Already ends in -e (not -é): unchanged

**Adjective/noun pluralization (`pluralizeNounOrAdjective`):**
- Checks irregular plurals map first (cheval→chevaux)
- -eau→+x (bureau→bureaux, nouveau→nouveaux)
- -au→+x, -eu→+x
- -al→-aux (original→originaux)
- -s/-x/-z: unchanged
- Default: +s

**Combined feminine+plural:** Feminization runs first, then pluralization. Example: le étudiant français + plural + feminine → les étudiantes françaises.

### h-aspiré handling

French words starting with h-aspiré block elision and liaison. The `FrenchStemmer.startsWithVowelSound()` method checks against a list of h-aspiré word prefixes. Words starting with h-muet (the majority) are treated as vowel-initial for elision purposes.

- h-muet: "l'homme", "l'heure" (elision occurs)
- h-aspiré: "le haricot", "la hache" (no elision)

## Common Pitfalls & Debugging

### Issue: Verbs Don't Update When Noun Form Changes

**Symptoms:**
- Enter a singular noun (e.g., "bal") and a verb (e.g., "gooien")
- Change the noun to plural via the picker (e.g., "bal" → "ballen")
- Verb remains in singular form ("gooit" instead of "gooien")
- Expected: "ballen gooien", Got: "ballen gooit"

**Cause:**
When `selectNounForm()` was called to change a noun from singular to plural, only the `nounInflections` state was updated but the state machine's subject number wasn't updated. The verb conjugation still used the original subject number.

**Solution:**
Added `SUBJECT_NUMBER_CHANGED` event to the state machine. When a noun's form changes, `useGrammar.selectNounForm()` now dispatches this event to update the subject's grammatical number and reconjugate verbs.

**Implementation:**

1. **New Event Type** (`src/grammar/types.ts`):
```typescript
export type SentenceEvent =
  | { type: 'SUBJECT_NUMBER_CHANGED'; number: GrammaticalNumber; symbolId: string }
  // ... other events
```

2. **State Machine Handler** (`src/grammar/SentenceStateMachine.ts`):
```typescript
case 'SUBJECT_NUMBER_CHANGED':
  if (this._state.subject && this._state.subject.symbolId === event.symbolId) {
    this._state.subject = { ...this._state.subject, number: event.number };
    this.recalculateVerbSlots();
  }
  break;
```

3. **Hook Integration** (`src/grammar/hooks/useGrammar.ts`):
```typescript
const selectNounForm = useCallback((index: number, slot: NounSlot, form: string) => {
  // ... update nounInflections

  // If this noun is the subject, update the state machine
  const nounData = nounsRef.current.get(index);
  if (nounData && currentSubject?.symbolId === nounData.symbolId) {
    stateMachine.dispatch({
      type: 'SUBJECT_NUMBER_CHANGED',
      symbolId: nounData.symbolId,
      number: slot === 'PL' ? 'PL' : 'SG',
    });
    reconjugateUnlockedVerbs();
  }
}, [language, reconjugateUnlockedVerbs]);
```

**Result:**
Changing a subject noun's number now properly triggers verb reconjugation with the updated grammatical number.

### Issue: Subject Pronoun Blocked After Previous Sentence

**Symptoms:**
- User types "ik geven" and gets "ik geven" instead of "ik geef"
- Toggling smart grammar off and on fixes the issue
- Log shows `[SUBJECT_SELECTED] BLOCKED: object pronoun guard`

**Cause:**
The state machine's object-pronoun guard blocks new pronouns when a subject and verbs already exist. If stale state persists from a previous sentence (e.g., grammar was disabled during clear, or clear didn't trigger properly), the guard incorrectly blocks the new sentence's subject.

**Solution:**
Three fixes were applied:
1. **Always reset on clear:** `handleClearAll` and `handleClear` now call `resetGrammar()` unconditionally, removing the `if (grammarEnabled)` guard.
2. **Reset on re-enable:** When `smartGrammarEnabled` toggles from false to true, the state machine and all refs are reset.
3. **Subject re-derivation:** When a symbol that was the subject is removed, the engine scans remaining tokens and re-establishes the first pronoun as subject.

### Issue: Verbs Not Transforming Correctly

**Symptoms:**
- Verbs conjugate correctly individually but produce wrong output in sentences
- Example: "he does not walks" instead of "he does not walk"

**Cause:**
- Sentence transformations not being applied
- `transformSentence()` not called in the code path

**Solution:**
- Ensure `buildDisplayTokens()` is called with correct parameters
- Verify language adapter's `transformSentence()` is implemented
- Check that `context` is passed to `buildDisplayTokens()`

### Issue: Transformations Work in Tests But Not Runtime

**Symptoms:**
- Grammar tests pass
- Same input produces wrong output in the app

**Cause:**
- GrammarTestRunner calls transformations that runtime doesn't
- Different code paths for testing vs. runtime

**Solution:**
- Grammar logic must be in language adapters, NOT in test runner
- Runtime must call the same functions as tests
- Use `buildDisplayTokens()` as the single orchestrator

### Issue: Tests Fail With Stale Verb Exception Data

**Symptoms:**
- Grammar tests fail even after correcting JSON data files
- Error messages show old/wrong verb forms (e.g., "ried" instead of "raadde")
- Rebuilding the app doesn't fix the issue
- JSON files contain correct data but tests use wrong values

**Cause:**
The `ExceptionCache` loads verb exception data from WatermelonDB first, and only falls back to JSON files when the database query fails. If the database contains stale or corrupted verb data, it takes precedence over corrected JSON files.

**Solution:**
Use the `forceJson` option when warming up the ExceptionCache to bypass database caching:

```typescript
// Force loading from JSON files (bypasses database)
const cache = getExceptionCache();
await cache.warmup(language, { forceJson: true });
```

**Applied Fix:**
The `GrammarTestRunner.ts` now uses `forceJson: true` to ensure tests always use the authoritative JSON data:

```typescript
// In runGrammarTestSuite()
await cache.warmup(language, { forceJson: true });
```

**ExceptionCache API:**
```typescript
interface WarmupOptions {
  forceJson?: boolean;  // Skip database, load directly from JSON files
}

async warmup(language: SupportedLanguage, options?: WarmupOptions): Promise<void>
```

**When to Use `forceJson`:**
- ✅ Test suites - ensures consistent, authoritative data
- ✅ After correcting JSON data when database is stale
- ✅ Development/debugging to verify JSON changes
- ❌ Normal app runtime (database may have user customizations)

**Related Files:**
- `src/grammar/cache/ExceptionCache.ts` - Cache implementation with `forceJson` option
- `src/grammar/GrammarTestRunner.ts` - Uses `forceJson: true` for tests
- `src/grammar/data/wordlists/*/irregular-verbs.json` - Source of truth for verb exceptions

### Issue: Tokens Have Wrong Indices After Transformation

**Symptoms:**
- Display order is wrong after do-support or other transformations
- Tokens appear in unexpected positions

**Cause:**
- Token insertion/deletion not handled properly
- Index mapping not updated after transformations

**Solution:**
- Check `buildDisplayTokens()` token count handling
- Verify that inserted tokens get new unique indices
- Ensure `displayLabel` is updated from transformed tokens

### Debugging Tips

1. **Enable Grammar Logging:**
   - Check console for `[useGrammar]`, `[EnglishConjugator]` logs
   - Look for conjugation and transformation messages

2. **Trace the Flow:**
   ```
   processSymbol → conjugate → store in conjugations Map
   ↓
   getDisplayTokens → buildDisplayTokens
   ↓
   transformSentence (for English/Spanish/French)
   ↓
   Display reordering (for Dutch)
   ↓
   Final message
   ```

3. **Check State Machine:**
   - Verify subject is being detected: `stateMachine.context.subject`
   - Verify tense is correct: `stateMachine.context.tense`
   - Verify verb slots: `stateMachine.state.verbs`

4. **Run Test Suite:**
   - Add a test case that reproduces the issue
   - If test passes but app fails, code paths differ
   - If test fails, fix the language adapter or transformation logic

## Extending to New Languages

To add a new language (e.g., German):

1. **Create Directory**: `src/grammar/languages/german/`
2. **Define Constants**: Create `constants.ts` with pronouns, triggers, auxiliaries, common nouns, etc.
3. **Implement Adapter**: Extend `BaseLanguageAdapter` in `GermanConjugator.ts`.
   - Implement `conjugate`, `getAllForms`, `getStem`.
   - Implement identification methods (`isLikelyVerb`, `identifyNoun`, etc.).
   - Implement `transformSentence()` for sentence-level rules (if needed).
4. **Register**: Add to `LanguageRegistry` in `src/grammar/languages/index.ts`.
5. **Update buildDisplayTokens**: Add language code to transformation check if needed.
6. **Seed Data**: Add irregular verbs to database seed.
7. **Test**: Create `grammarTestCases.de.json` with comprehensive test cases.

## Testing: GrammarTestRunner

### Purpose

`GrammarTestRunner.ts` is a **test harness** for validating grammar engine behavior. It is **NOT** part of the runtime code path and should **NEVER** contain grammar correction logic.

### What It Does

1. **Loads test cases** from JSON files (`grammarTestCases.en.json`, `grammarTestCases.nl.json`, `grammarTestCases.es.json`, `grammarTestCases.fr.json`)
2. **Simulates user input** by processing symbols through the state machine
3. **Calls the same runtime functions** (`conjugate`, `buildDisplayTokens`)
4. **Compares output** against expected results
5. **Reports pass/fail** statistics

### Test Case Structure

```json
{
  "id": "negation_do_support_explicit_do_3sg",
  "input": ["he", "do", "not", "walk"],
  "expected": "he does not walk",
  "notes": "Explicit 'do' provided; ensure main verb remains base form"
}
```

### How to Run Tests

**In the App:**
1. Navigate to Settings → Grammar Settings
2. Click "Run Tests" button
3. View results (pass/fail counts and details)

**Test Cases:**
- English: `src/grammar/data/grammarTestCases.en.json`
- Dutch: `src/grammar/data/grammarTestCases.nl.json`
- Spanish: `src/grammar/data/grammarTestCases.es.json`
- French: `src/grammar/data/grammarTestCases.fr.json`

### ⚠️ CRITICAL: No Grammar Logic in Test Runner

The test runner should:
- ✅ Simulate the state machine flow
- ✅ Call existing grammar functions
- ✅ Verify output matches expected

The test runner should **NOT**:
- ❌ Implement grammar corrections
- ❌ Apply transformations directly
- ❌ Duplicate logic from language adapters
- ❌ Contain any conjugation rules

**All grammar logic belongs in:**
- Language adapters (`EnglishConjugator.ts`, `DutchConjugator.ts`, `FrenchConjugator.ts`, etc.)
- `buildDisplayTokens()` for orchestration
- `SentenceStateMachine.ts` for context tracking

### Adding New Test Cases

1. Open the appropriate test file (`grammarTestCases.en.json`, `grammarTestCases.nl.json`, `grammarTestCases.es.json`, or `grammarTestCases.fr.json`)
2. Add a new test case object with:
   - Unique `id`
   - Array of `input` symbols (as they would be tapped)
   - Expected `expected` output string
   - Descriptive `notes` explaining what's being tested
3. Run the test suite to verify

## Noun Pluralization

The grammar engine also supports noun pluralization, allowing users to toggle between singular and plural forms of nouns via long-press.

**Example:**
- User taps `ball` → long-press → picker shows: "ball" (1) / "balls" (2+)
- User selects "balls" → displays "balls" with lock indicator

### Architecture

Noun pluralization follows the same language adapter pattern as verb conjugation:

```typescript
// BaseLanguageAdapter provides default methods
pluralize(noun: string): string;
singularize(noun: string): string | null;
getNounForms(baseForm: string): NounFormOption[];
isUncountable(noun: string): boolean;
getNounBaseForm(noun: string): string;
```

Each language adapter overrides these methods with language-specific rules:
- **English**: `-s`, `-es`, `-ies` rules, irregular plurals (child→children)
- **Dutch**: `-en` default, `-'s` for vowel endings, irregulars (kind→kinderen)
- **Spanish**: `-s` for vowels, `-es` for consonants, `-ces` for `-z` endings
- **French**: `-s` default, `-eau/-au/-eu`→`-x`, `-al`→`-aux`, irregulars (oeil→yeux)

### Noun Data Sources

Noun pluralization data comes from two sources, merged at runtime:

1. **Static JSON files** (`src/grammar/data/wordlists/<lang>/noun-pluralization.json`): Loaded at module initialization into `NOUN_DATA` (irregular plurals, uncountable nouns, plural-to-singular reverse map).

2. **Vocabulary pack data** (via DB): Packs can ship additional irregular plurals and uncountable nouns in their `grammar.nounPluralization` section. These are synced to the `lemmas` and `noun_exceptions` DB tables by `grammarSyncService`, then loaded into the in-memory `NOUN_DATA` maps by language-specific loader functions.

**DB-to-memory loaders** (one per language):
- `loadDutchNounExceptionsFromDB()` — in `DutchConjugator.ts`
- `loadEnglishNounExceptionsFromDB()` — in `EnglishConjugator.ts`
- `loadSpanishNounExceptionsFromDB()` — in `SpanishConjugator.ts`
- `loadFrenchNounExceptionsFromDB()` — in `FrenchConjugator.ts`

These loaders are called in two places:
- **On startup**: `GrammarEngine.initialize()` calls the loader for the current language
- **After pack install**: `grammarSyncService.syncGrammarFromPack()` calls loaders for languages that had noun data synced

Each loader queries the `lemmas` table for the language's nouns and:
- Adds lemmas with `subClass='uncountable'` to `NOUN_DATA.uncountableNouns`
- Queries `noun_exceptions` for irregular plural forms and adds them to `NOUN_DATA.irregularPlurals` / `NOUN_DATA.pluralToSingular`

### Key Components

| Component | Purpose |
|-----------|---------|
| `NounInflectionPicker` | Modal UI for selecting noun form |
| `useGrammar.processNoun()` | Processes noun and creates inflection info |
| `useGrammar.selectNounForm()` | Locks user's selected form |
| `useGrammar.nounInflections` | Map tracking noun states |

### Noun Detection

A symbol is detected as a noun if ANY of these conditions are true:
- `wordType === 'noun'`
- `fitzCategory === 'nouns'`
- `motorZone` contains `'noun'`

📖 **For detailed documentation**, see: [`docs/features/noun-pluralization.md`](features/noun-pluralization.md)

---

## Future Enhancements

- [x] English language support ✅
- [x] Perfect tense construction ✅
- [x] Modal verb handling ✅
- [x] Continuous aspect (English -ing) ✅
- [x] Automatic verb detection ✅
- [x] Reflexive verb support (Dutch) ✅
- [x] Sentence transformations (English do-support) ✅
- [x] Inversion handling (Dutch questions) ✅
- [x] Fixed do-support transformation flow ✅
- [x] Noun pluralization ✅
- [x] Spanish language support ✅
- [x] Pack-provided noun data (uncountable nouns, irregular plurals) loaded from DB ✅
- [x] French language support ✅
- [x] Future tense (French futur simple with temporal triggers) ✅
- [x] Interrogative inversion with euphonic -t- (French) ✅
- [x] Noun phrase agreement (French plural/feminine control tokens) ✅
- [ ] German language support
- [ ] Separable verb handling (Full support for Dutch "opbellen")
