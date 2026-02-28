# Grammar Bar (Determiner Helper)

## What Is the Grammar Bar?

The Grammar Bar is a horizontal strip of color-coded word chips that appears at the top of the symbol grid on tablets. It gives quick one-tap access to small but essential grammar words — articles, demonstratives, possessives, and prepositions — that are hard to represent as pictograms but critical for building proper sentences.

**Where it appears:** tablet landscape mode only, between the top row (composer / message builder) and the symbol grid.

**Supported languages:** Dutch, English, French, Spanish. Each language has its own set of grammar words tailored to that language's grammar.

---

## How to Enable It

1. Open Admin (tap the cog icon, enter PIN if required).
2. Go to the **Settings** tab.
3. In the **Grammar** section, enable **Smart Grammar**.
4. Enable **Determiner Helper** (this is the Grammar Bar toggle).
5. Optionally choose a **Determiner Helper Style** (Simple, Standard, or Expert).

The Grammar Bar appears automatically when you return to the main screen.

---

## What the Chips Look Like

The grammar words are organized into four color-coded groups, separated by visual dividers:

| Group | Color | Examples (Dutch) | Examples (English) | Examples (French) |
|-------|-------|-------------------|--------------------|--------------------|
| **Articles** | Blue | de, het, een | the, a, an | le, la, les, un, une, des |
| **Demonstratives** | Green | dit, dat, deze, die | this, that, these, those | ce, cette, ces |
| **Possessives** | Orange | mijn, jouw, zijn, haar | my, your, his, her | mon, ma, mes, ton, ta... |
| **Prepositions** | Purple | met, voor, naar, in, op | with, for, to, in, on | avec, pour, dans, sur... |

Each chip shows the word text and is tappable.

---

## How to Use It

### Basic Use: Tap a Chip to Insert a Grammar Word

Tap any grammar chip to add that word to your message. The word appears in the message builder as a colored grammar card.

### Smart Insertion for Articles and Demonstratives

When you tap an article or demonstrative (blue or green chip), the Grammar Bar is smart about **where** it places the word:

- **If you already have a noun in your message**, the article is inserted directly **before** the last noun — producing natural word order.
- **If there is no noun yet**, the word is appended to the end of the message.
- **If the last noun already has an article/demonstrative before it**, the new word is appended to the end instead of creating a double determiner.

**Example (Dutch):**

| What you do | What happens |
|-------------|--------------|
| Tap "appel", then tap "de" | Message becomes: **de appel** |
| Tap "mama", tap "eten", tap "appel", then tap "de" | Message becomes: mama eten **de appel** |
| Tap "de" with no symbols in the message | Message becomes: **de** (appended at end) |
| Tap "appel", tap "de", then tap "het" | Message becomes: de appel **het** (no double determiner) |

### Possessives and Prepositions

Possessives (orange) and prepositions (purple) are always appended to the end of the message. They do not auto-insert before nouns.

---

## Gender-Aware Dimming

The Grammar Bar can dim grammar words that do not match the gender of the last noun you tapped. This helps you pick the correct article.

**How it works:**

1. You tap a noun symbol (e.g., "appel" in Dutch).
2. The Grammar Bar looks up the noun's grammatical gender.
3. Articles and demonstratives that do not match are visually dimmed (faded).
4. Compatible words are shown at full brightness.

**Example (Dutch):**
- "appel" is a common-gender noun → "de" (common) is fully visible, "het" (neuter) is dimmed, "een" (any gender) stays normal.

**Example (French):**
- "pomme" is feminine → "la" is highlighted, "le" is dimmed, "une" is highlighted, "un" is dimmed.

The gender information is stored per language, so the same concept (e.g., "milk") gets the correct gender for each language:

| Concept | Dutch | French | Spanish |
|---------|-------|--------|---------|
| milk | common (de melk) | masculine (le lait) | feminine (la leche) |
| water | neuter (het water) | feminine (l'eau) | feminine (el agua) |

---

## Assist Levels

The Grammar Bar has three styles, each designed for a different user level. Change the style in Admin > Settings > Grammar > Determiner Helper Style.

### Simple (Beginner)

- Shows only articles and demonstratives (up to 8 chips).
- Dims incompatible words based on noun gender.
- Shows contextual hint text below the bar to guide sentence building:
  - "Start with a subject or determiner" (empty message)
  - "Choose a verb" (has subject, no verb)
  - "Add an object with a determiner" (has verb, no object)
- Hints fade out after 4 seconds.

Best for: new users, children, or therapy sessions where guided support is helpful.

### Standard (Advanced)

- Shows all four grammar groups (articles, demonstratives, possessives, prepositions).
- Dims incompatible words based on noun gender.
- No contextual hints.

Best for: users who are comfortable with the grammar bar and want access to all word types.

### Expert (Therapist)

- Shows all four grammar groups.
- No dimming — all words are equally visible regardless of noun gender.
- No contextual hints.

Best for: advanced users or therapists who want full control without any automated filtering.

---

## Grammar Words in the Message Builder

When a grammar word is inserted into the message, it appears as a colored card in the message builder:

- **Articles**: blue background
- **Demonstratives**: green background
- **Possessives**: orange background
- **Prepositions**: purple background

These cards show the word text (no pictogram image). Tap a grammar card in the message builder to remove it, just like any other pictogram.

---

## Grammar Words in Speech and Sharing

Grammar words are included when you tap Speak or Share:

- The spoken output includes the grammar word in its correct position (e.g., "de appel" is spoken as "de appel").
- Shared text also includes grammar words in the correct position.

---

## Visibility Conditions

The Grammar Bar is shown when **all** of these are true:
- You are on a tablet in landscape mode
- Smart Grammar is enabled in Settings
- Determiner Helper is enabled in Settings
- You are not in admin board edit or admin layout edit mode

The Grammar Bar is hidden when:
- You are on a phone (any orientation)
- Smart Grammar is disabled
- Determiner Helper is disabled
- You are editing a board or layout from the Admin screen

---

## Quick Reference

| Action | Result |
|--------|--------|
| Tap a blue/green chip (article/demonstrative) | Inserted before the last noun, or appended if no noun |
| Tap an orange/purple chip (possessive/preposition) | Appended to end of message |
| Tap a noun symbol | Grammar bar dims incompatible articles (unless Expert mode) |
| Tap a grammar card in message builder | Removes that grammar word from the message |
| Long-press Backspace | Clears entire message including grammar words |

---

## Troubleshooting

**Grammar Bar not showing?**
- Check that you are on a tablet (not a phone).
- Check that Smart Grammar is enabled (Admin > Settings > Grammar).
- Check that Determiner Helper is enabled (same section).
- Make sure you are not in board/layout edit mode.

**Wrong article is highlighted?**
- The noun may not have gender data for the current language. Gender data comes from the vocabulary pack. If a noun has no gender assigned, no dimming occurs.

**Grammar words not appearing in speech?**
- Grammar words are included in speech output automatically. If they are missing, check that the message builder shows them as colored cards before speaking.
