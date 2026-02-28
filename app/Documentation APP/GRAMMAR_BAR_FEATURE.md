# Grammar Bar Feature

## Overview

The Grammar Bar (internally called "Grammar Strip") is a horizontal strip of tappable grammar word chips displayed in tablet landscape mode. It gives AAC users quick access to articles, demonstratives, possessives, and prepositions — function words that are essential for building grammatically correct sentences but are typically absent from pictogram grids.

**Supported languages:** Dutch, English, French, Spanish

**Key capabilities:**
- Color-coded grammar word chips grouped by type
- Gender-aware determiner helper: dims incompatible articles based on the last noun's gender
- Smart insertion: determiners are automatically placed before the noun ("appel" + "de" → "de appel")
- Three assist levels (Simple / Standard / Expert) with configurable visibility and hints
- Per-language noun gender stored on `symbol_translations` for correct cross-language behavior

---

## Layout

The grammar bar is positioned between the top bar and the category tabs in tablet landscape mode:

```
┌──────────────────────────────────────────────────────────────┐
│ Logo/Settings │ MessageBuilder             │ Clear │ Speak  │
├──────────────────────────────────────────────────────────────┤
│ [de] [het] [een] │ [dit] [dat] [deze] [die] │ [mijn] ...   │  ← Grammar Bar
├──────────────────────────────────────────────────────────────┤
│ Categories horizontal scroll                                  │
├──────────────────────────────────────────────────────────────┤
│ Symbol Grid                                                   │
└──────────────────────────────────────────────────────────────┘
```

### Visibility

- **Show:** Tablet + Landscape + Grammar Strip enabled in settings
- **Hide:** Phone, Portrait, or Grammar Strip disabled

---

## Grammar Token Types

Each language defines its own set of grammar tokens. Tokens are grouped into four types, each with a distinct color:

| Type | Color | Examples (Dutch) | Examples (French) |
|------|-------|-------------------|-------------------|
| **Article** | Blue | de, het, een | le, la, les, un, une, des |
| **Demonstrative** | Green | dit, dat, deze, die | ce, cette, ces |
| **Possessive** | Orange | mijn, jouw, zijn, haar | mon, ma, mes, ton, ta, tes... |
| **Preposition** | Purple | met, voor, naar, in, op | avec, pour, dans, sur... |

### Token Properties

Each `GrammarToken` has:

| Property | Type | Description |
|----------|------|-------------|
| `id` | string | Unique identifier (e.g., `gr-nl-de`) |
| `label` | string | Display text on chip |
| `spokenText` | string | Text used for TTS |
| `grammarType` | `'article' \| 'demonstrative' \| 'possessive' \| 'preposition'` | Determines color and grouping |
| `genderAffinity` | `'masculine' \| 'feminine' \| 'neuter' \| 'common' \| 'any'` | Which noun gender this token matches |
| `numberAffinity` | `'singular' \| 'plural' \| 'both'` | Singular/plural compatibility |
| `definiteness` | `'definite' \| 'indefinite'` | Definite vs. indefinite article |

### Token Data Files

| File | Language |
|------|----------|
| `src/data/grammarTokens.ts` | Dutch (NL) |
| `src/data/grammarTokens.en.ts` | English (EN) |
| `src/data/grammarTokens.fr.ts` | French (FR) |
| `src/data/grammarTokens.es.ts` | Spanish (ES) |

---

## Determiner Helper

The determiner helper is the gender-aware intelligence layer on top of the grammar bar. When a noun is in the message builder, the helper dims incompatible determiners and highlights compatible ones.

### How It Works

1. User taps a noun (e.g., "appel") on the symbol grid
2. `useGrammarAssistant` hook looks up the noun's gender from `symbol_translations` for the current language
3. The gender is passed to `GrammarStrip` as `lastNounGender`
4. Articles/demonstratives that don't match the gender are visually dimmed
5. Compatible tokens are highlighted with a subtle glow

**Example (Dutch):** "appel" has gender `common` → "de" (common) is highlighted, "het" (neuter) is dimmed, "een" (any) stays normal.

**Example (French):** "pomme" has gender `feminine` → "la" is highlighted, "le" is dimmed, "une" is highlighted, "un" is dimmed.

### Per-Language Noun Gender

Noun gender is stored per-language on the `symbol_translations` table (added in schema v25). This is critical because the same concept can have different genders across languages:

| Concept | Dutch | French | Spanish |
|---------|-------|--------|---------|
| milk | common (de melk) | masculine (le lait) | feminine (la leche) |
| water | neuter (het water) | feminine (l'eau) | feminine (el agua) |
| banana | common (de banaan) | feminine (la banane) | masculine (el plátano) |

Gender lookup in `useGrammarAssistant`:
1. Query `symbol_translations` WHERE `symbol_id` = X AND `language` = current language
2. Read `genderClass` from the translation record
3. **Fallback:** if translation has no gender → fall back to `symbols.genderClass` (backward compat for pre-v25 data)
4. Results are cached per `${symbolId}_${language}` to avoid repeated DB queries

### Assist Levels

The determiner helper has three configurable levels, controlled by the "Determiner Helper Style" setting:

| Level | Hints | Dimming | Visible Groups | Max Tokens |
|-------|-------|---------|----------------|------------|
| **Simple** (beginner) | Yes — contextual hints fade in below strip | Yes — incompatible tokens dimmed | Articles + Demonstratives only | 8 |
| **Standard** (advanced) | No | Yes — incompatible tokens dimmed | All groups | 36 |
| **Expert** (therapist) | No | No — all tokens equally visible | All groups | 36 |

Configuration is defined in `GrammarAssistant.ts` as `ASSIST_CONFIGS`:

```typescript
beginner: { showContextHints: true,  dimIncompatibleTokens: true,  showAllTokenGroups: false, maxVisibleTokens: 8  }
advanced: { showContextHints: false, dimIncompatibleTokens: true,  showAllTokenGroups: true,  maxVisibleTokens: 36 }
therapist:{ showContextHints: false, dimIncompatibleTokens: false, showAllTokenGroups: true,  maxVisibleTokens: 36 }
```

### Contextual Hints (Simple Level)

In Simple mode, a hint line fades in below the grammar bar to guide the user:
- Empty sentence: "Start with a subject or determiner"
- Has subject, no verb: "Choose a verb"
- Has verb, no object: "Add an object with a determiner"

Hints auto-fade after 4 seconds.

---

## Smart Insertion (Insert Before Noun)

When a user taps an article or demonstrative on the grammar bar, the system automatically inserts it **before** the last noun in the message — not at the end. This produces natural word order.

### Behavior

| Sequence | Result | Why |
|----------|--------|-----|
| Tap "appel", then tap "de" | **de appel** | Determiner inserted before last noun |
| Tap "mama", tap "eten", tap "appel", then tap "de" | mama eten **de appel** | Inserted before last noun "appel" |
| Tap "de" with no nouns in message | appended at end | No noun to insert before |
| Tap "appel", tap "de", then tap "het" | de appel **het** | "appel" already has a determiner; "het" appends |

### Guard: No Double Determiners

If the last noun already has an article or demonstrative directly before it, the new determiner is appended to the end instead. This prevents producing "de het appel".

### Grammar Index Shifting

When a determiner is inserted at a position (not appended), all grammar tracking indices shift by +1. The `shiftIndicesForInsert()` function in `useGrammar` updates:
- Conjugation map (verb forms)
- Noun inflection map
- Word overrides map
- Internal tracking refs (infinitives, tokens, reflexive markers, nouns)

This ensures verb conjugations and noun inflections remain correctly mapped after the insertion.

### Implementation

The insertion logic is in `handleGrammarTokenPress` in `useMainScreenState.ts`:

```typescript
// Pseudocode
if (token is article or demonstrative) {
  lastNounIndex = find last noun in selectedPictograms
  if (lastNounIndex found AND no determiner already before it) {
    shiftIndicesForInsert(lastNounIndex)
    dispatch(insertPictogram({ index: lastNounIndex, pictogram }))
    rebuild currentMessage from new pictogram order
    return
  }
}
// Default: append to end
dispatch(addPictogram(pictogram))
```

---

## Settings

The grammar bar is controlled by two settings in the Grammar section of the admin screen:

### 1. Determiner Helper Toggle

| Setting | Key | Default |
|---------|-----|---------|
| Determiner Helper | `grammarStripEnabled` | false |

Enables/disables the grammar bar entirely. Requires Smart Grammar to be enabled.

### 2. Determiner Helper Style

| Setting | Key | Values |
|---------|-----|--------|
| Determiner Helper Style | `grammarAssistMode` | `beginner` / `advanced` / `therapist` |

Controls the assist level (see table above). Only visible when both Smart Grammar and Determiner Helper are enabled.

---

## Architecture & Data Flow

### Token Press Flow

```
User taps grammar chip
  ↓
GrammarStrip.onTokenPress(GrammarToken)
  ↓
handleGrammarTokenPress(token)                    [useMainScreenState.ts]
  ↓
grammarTokenToPictogram(token)                    [grammarUtils.ts]
  → Pictogram { wordType: 'grammar', fitzCategory: 'function', grammarType: '...' }
  ↓
Is article/demonstrative AND last noun exists?
  ├── YES → shiftIndicesForInsert(lastNounIndex)  [useGrammar.ts]
  │         dispatch(insertPictogram({ index, pictogram }))
  │         dispatch(setCurrentMessage(rebuilt))
  │
  └── NO  → dispatch(addPictogram(pictogram))
            dispatch(appendToMessage(label + ' '))
  ↓
Message Builder re-renders with pictogram in correct position
```

### Gender Lookup Flow

```
User taps a noun on symbol grid
  ↓
useGrammarAssistant detects last noun in selectedPictograms
  ↓
Checks cache: "${symbolId}_${language}"
  ├── HIT  → returns cached gender
  └── MISS → queries symbol_translations (language-specific)
             ├── has genderClass → cache + return
             └── no genderClass → fallback to symbols.genderClass (pre-v25 compat)
  ↓
lastNounGender passed to GrammarStrip
  ↓
GrammarStrip dims/highlights tokens based on genderAffinity match
```

---

## Key Files

| File | Purpose |
|------|---------|
| `src/components/GrammarStrip.tsx` | UI component — renders chips with dimming/highlighting |
| `src/data/grammarTokens.ts` | Dutch grammar tokens |
| `src/data/grammarTokens.en.ts` | English grammar tokens |
| `src/data/grammarTokens.fr.ts` | French grammar tokens |
| `src/data/grammarTokens.es.ts` | Spanish grammar tokens |
| `src/types/grammar.ts` | Type definitions (GrammarToken, GrammarGroup, GenderAffinity) |
| `src/grammar/GrammarAssistant.ts` | Assist level configs + suggestion computation |
| `src/grammar/hooks/useGrammarAssistant.ts` | React hook — gender lookup from DB, caching, suggestion |
| `src/grammar/hooks/useGrammar.ts` | Grammar engine hook — exposes `shiftIndicesForInsert` |
| `src/screens/main/useMainScreenState.ts` | `handleGrammarTokenPress` — insertion logic |
| `src/store/uiSlice.ts` | Redux: `addPictogram`, `insertPictogram` actions |
| `src/utils/grammarUtils.ts` | `grammarTokenToPictogram()` converter |
| `src/screens/SettingsScreen/sections/GrammarSettings.tsx` | Settings UI for determiner helper |
| `src/hooks/useSettingsState.ts` | Settings state management |
| `src/db/models/SymbolTranslation.ts` | Model with `genderClass` field (schema v25) |

---

## Adding a New Language

To add grammar bar support for a new language:

1. **Create token data file:** `src/data/grammarTokens.XX.ts`
   - Define all grammar tokens with appropriate `genderAffinity` values
   - Group them into `GrammarGroup[]` by type

2. **Register in grammar token registry:** `src/data/grammarTokenRegistry.ts`
   - Add the language code → groups mapping

3. **Add noun genders to vocabulary pack:**
   - In pack JSON, add `noun_gender` entries for the language under each concept's `grammar` section:
   ```json
   "grammar": {
     "noun_gender": { "xx": "masculine" }
   }
   ```

4. **Add i18n strings:** Update `src/i18n/resources/XX/settings.json` with grammar section translations

5. **Test:** Import pack, verify gender dimming works for the new language's articles
