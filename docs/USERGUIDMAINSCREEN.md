# USERGUIDMAINSCREEN

## 1. Purpose

This document is a full functional user guide for the Main Screen of VoiceBridgeAAC.

It has two goals:
- explain all user-visible features and how to use them
- provide a deep dive of the code modules that power those features

---

## 2. What The Main Screen Is

The Main Screen is the primary communication workspace where users:
- build a message with symbols and/or typed text
- get prediction suggestions while typing
- apply grammar-aware forms (verbs and nouns)
- speak the message aloud using device TTS or ElevenLabs premium voices
- optionally share the message
- use Fitzgerald Key color-coding for learning sentence structure
- open Admin tools (PIN-protected if enabled)

The screen is adaptive and changes layout by device type (phone/tablet) and orientation (portrait/landscape).

**Input Mode**: The Main Screen operates in one of two modes, controlled by the `input_mode` setting (Admin -> Settings -> Input Mode):
- **Symbol Only** (default): Symbol grid, message builder, prediction bar — the standard AAC experience described in detail throughout this document.
- **Text**: Text-based communication with keyboard input, quick phrases, abbreviation shortcuts, and phrase categories. See [Section 10.4](#104-text-mode-text) for details.

---

## 3. Quick Start (User Workflow)

### Symbol Mode (default)

1. Select a category (or Favorites).
2. Optionally select a subcategory if the category has children.
3. Tap symbols to build a sentence.
4. Optionally type or edit text in the message input.
5. Use prediction suggestions if needed.
6. Tap `Speak` to hear the message aloud.
7. Tap `Backspace` to remove the last symbol, or long-press it to clear all.
8. Tap `Share` to send the message to other apps (if enabled).

### Text Mode

1. Type directly in the text input area.
2. Tap a quick phrase chip to insert a frequently used phrase.
3. Tap an abbreviation shortcut to expand it into full text.
4. Browse phrase categories for more phrases.
5. Tap `Speak` to hear the message aloud.
6. Tap `Backspace` to remove the last word, or long-press to clear all.

---

## 4. Main Areas And Controls

The exact placement changes by phone/tablet and portrait/landscape, but the functional areas are the same.

### 4.1 Composer Area

Features:
- multiline text input (3 lines on phone, 2 lines on tablet landscape)
- live character counter pill (shown when text is not empty, positioned bottom-right of input)
- prediction bar with word/phrase suggestions
- message builder strip (selected pictograms in order)

How to use:
1. Type directly in the text box if you want manual text.
2. Tap prediction chips to insert suggested text.
3. Tap symbols in the grid to append pictograms and words.

Character Counter:
- appears as a small pill in the bottom-right corner of the text input
- shows the current character count
- only visible when text is present

### 4.2 Message Builder

Features:
- visual strip of selected pictogram cards (88×92px each, or scaled to 80% on phone portrait: ~70×74px, or 70% on phone landscape: ~62×64px)
- supports image and emoji symbols
- supports grammar display forms (verb conjugations and noun inflections)
- supports grammar badges showing locked verb/noun form state
- Fitzgerald Key color stripes on pictogram cards (when enabled)
- grammar token cards for articles, demonstratives, possessives, and prepositions
- horizontal scroll mode (tablet landscape) or vertical wrap mode (phone)
- auto-scrolls to the last symbol when content changes

How to use:
1. Tap a pictogram in the message builder to remove it.
2. Long-press a verb or noun pictogram (when grammar is enabled) to choose another inflected form.

Grammar Token Cards:
- grammar tokens (inserted via the Grammar Strip) appear as colored cards:
  - articles: blue background
  - demonstratives: green background
  - possessives: orange background
  - prepositions: purple background
- these cards show the emoji only (no label text)

Compact Mode:
- in tablet landscape with `messageBuilder` display mode, the builder runs in compact mode
- height fixed at 105px, horizontal scrolling, reduced padding

Phone Portrait Mode:
- symbols are rendered at 80% scale (`symbolScale={0.8}` prop on MessageBuilder)
- gap between symbols is reduced to 6px (50% smaller than the default 12px)
- builder stretches near edge-to-edge (`marginHorizontal: 4px`)
- minimum height is increased by 20% compared to the default
- extra spacing below the builder: `paddingBottom` and `marginBottom` each set to 20px
- action panel below uses `flex: 1` for proper layout fill

Phone Landscape Mode:
- the message builder fills the top portion of the left panel with `flex: 1` and `minHeight: 0`
- symbols are rendered at 70% scale (`symbolScale={0.7}` prop on MessageBuilder)
- overflow is clipped to prevent bleeding outside the panel boundary
- the `noMinHeight` prop removes the default 290px minimum height so the builder adapts to available space

### 4.3 Category And Symbol Grid Area

Features:
- category tabs (Favorites always present first)
- category list is language-aware and only shows categories with symbols
- category icons: emoji, image, or book icon (for "core" categories)
- subcategory row (shown when a parent category has child categories)
- grid of selectable symbols
- different grid engines depending on mode (Standard, Progressive, Schematic, Core-Fringe)

How to use:
1. Tap a category chip to select it.
2. If subcategories appear, tap one to filter further, or tap "All" to see all children.
3. Tap any symbol tile to add it to the message.

Subcategories:
- only shown when the selected category has child categories
- not shown for the Favorites virtual category
- include an "All" button to show symbols from all subcategories

### 4.4 Toolbar Actions

Core actions:
- `Speak` / `Stop`: speaks the built message using the configured voice provider
- `Backspace`: short tap removes last symbol; long-press (500ms) clears all content instantly
- `Share`: sends the message text to other apps via native share sheet (only if enabled in Settings)
- `Admin` button (phone toolbar): opens Admin screen or PIN prompt
- Settings cog (phone portrait/landscape: floats absolutely top-right at zIndex 10, no header row; tablet: in header/top row): opens Admin screen or PIN prompt
- Word Finder search (tablet landscape, magnifying glass icon): opens Word Finder search modal (Activity Boards and Core-Fringe modes only)

Visual feedback:
- Speak button shows green background with volume icon when idle
- Speak button changes to red background with stop icon while speaking
- Admin button shows lock emoji indicating PIN status (🔒 locked, 🔓 unlocked)

### 4.5 Fitzgerald Key Color System

When the Fitzgerald Key is enabled in Settings, symbols display color-coding to teach sentence structure:
- a 4px colored stripe appears at the top of each symbol cell
- the cell border changes to the category color
- colors are applied consistently across all grid modes (Standard, Schematic, Core-Fringe)

Color categories:
- **Red**: Nouns (names, objects, people)
- **Green**: Verbs (actions, movements)
- **Yellow**: Adjectives/Descriptors (colors, qualities, states)
- **Blue**: Social words (social interactions, community words)
- **Purple**: Questions (question words, interrogatives)
- **Orange**: Miscellaneous (other word types)

Fitzgerald Legend:
- a modal showing all categories, their colors, descriptions, example words, and a sample color-coded sentence
- available in English, Dutch, and Spanish
- can be embedded in settings screens or shown as a standalone modal

### 4.6 Share Button (What It Can Do)

The share button opens your device native share sheet so you can send the built message to other apps (for example messaging, mail, notes, or similar targets available on the device).

How shared text is generated:
1. If you built a message with pictograms:
   - with grammar enabled: it shares grammar-resolved forms (for example selected verb/noun inflections)
   - armed grammar tokens (articles, demonstratives) are included as prefixes
   - with grammar disabled: it shares each pictogram spoken text
2. If no pictograms are present, it shares the typed text from the composer.

Important behavior:
- it shares text only (not symbol images/cards)
- if there is no message content, share does not open and an alert is shown
- canceling the native share sheet is treated as normal (no error shown)
- unexpected share failures show an error alert

Availability:
- the button is shown only when the `Share` setting is enabled in Admin Settings
- on iOS it shares as `message`
- on Android it shares `message` plus a dialog title

---

## 5. Prediction And Abbreviation Behavior

The prediction engine combines common starters, phrase matches, next-word predictions (bigram model), and word completions.

### 5.1 Prediction Flow

User-visible behavior:
- typing shows suggestions in the prediction bar (horizontal scrollable chips)
- the first suggestion is highlighted with a star emoji (⭐)
- tapping a suggestion inserts the text into the composer
- while loading, a small spinner appears in the prediction bar
- when empty, hint text "Start typing for suggestions..." is shown
- suggestions appear with a 200ms fade-in animation

### 5.2 Prediction Strategy

When you type:
1. **Empty input**: shows common starter phrases for your language
2. **Text ending with space**: predicts the next word using learned bigram patterns
3. **Partial word**: searches learned phrases first, then tries word completions

After a successful `Speak`, the sentence is learned for future predictions (stored in database if longer than 5 characters).

### 5.3 Common Starters By Language

- English: "I need", "I am", "Can you", "Help", "Thank you"
- Spanish: "Necesito", "Estoy", "¿Puedes?", "Ayuda", "Gracias"
- Dutch: "Ik heb", "Ik ben", "Kun je", "Help", "Dank je"
- French: "J'ai besoin", "Je suis", "Pouvez-vous?", "Aide", "Merci"

### 5.4 Abbreviation Expansion

Typed abbreviations can auto-expand when followed by a space. Abbreviations are checked against the database first, then against built-in shortcuts.

Built-in abbreviation examples:
- English: `brb` → "be right back", `ty` → "thank you", `hru` → "how are you"
- Spanish: `tqm` → "te quiero mucho", `xq` → "porque"
- Dutch: `pls` → "alsjeblieft", `thx` → "dank je", `hdj` → "hoe gaat het"
- French: `bjr` → "bonjour", `mrc` → "merci", `dsl` → "désolé"

---

## 6. Favorites Behavior

Favorites are a virtual category tab.

User-visible behavior:
- symbols tapped from any category are automatically recorded into favorites (no duplicate insert)
- favorites are ordered by when they were favorited (oldest first)
- selecting `Favorites` shows that ordered list
- progressive vocabulary features are disabled in the Favorites view (standard grid is used instead)
- the floating readiness button is hidden when viewing Favorites

---

## 7. Voice System

VoiceBridgeAAC supports two voice providers: device TTS and ElevenLabs premium voices.

### 7.1 Device TTS (Default)

Uses the device built-in speech synthesis engine (expo-speech).

Configurable settings:
- **Voice selection**: per-language preferred voice with 4-tier fallback:
  1. User's saved preferred voice (if still available)
  2. Exact language match (preferring Enhanced quality voices)
  3. Language prefix match (e.g., "en" matches "en-US")
  4. Platform default
- **Pitch**: 0.5 to 2.0 (default 1.0)
- **Rate**: 0.5 to 2.0 (default 0.9)

### 7.2 ElevenLabs Premium Voices

Uses the ElevenLabs cloud API for high-quality AI voices.

Requirements:
- ElevenLabs API key configured in Settings
- ElevenLabs voice ID selected

Features:
- audio caching: previously generated speech is cached locally and replayed instantly
- offline detection: checks device connectivity before attempting API calls
- automatic fallback: if ElevenLabs fails, automatically falls back to device TTS with a warning
- configurable model (default: `eleven_flash_v2_5`)
- speed control via voice rate setting

### 7.3 Speaking Behavior

When `Speak` is tapped:
1. The message is built from pictograms (using grammar-resolved forms if grammar enabled) or from typed text
2. The configured voice provider speaks the text
3. The button changes to `Stop` (red) while speaking
4. After speech finishes, the sentence is recorded for future predictions
5. The keyboard is dismissed

When `Stop` is tapped:
- both device TTS and ElevenLabs playback stop immediately
- the button reverts to `Speak` (green)

---

## 8. Progressive Vocabulary Mode

When progressive mode is enabled in Admin settings:
- the standard grid becomes a progressive grid (except in Favorites)
- only unlocked words are active
- locked positions appear as ghost/locked cells
- a floating readiness button appears (except in Favorites)

User actions:
1. Tap active symbols normally.
2. Tap locked ghost slots to open the readiness/progression dialog.
3. Tap the floating readiness button to review progress and advance when ready.

### 8.1 Ghost Slot Appearance

Ghost (locked) slots show:
- semi-transparent background with dashed border
- lock emoji (🔒) at 40% opacity
- "Level {number}" text indicating when the word unlocks
- faded preview of the word's emoji (20% opacity)

### 8.2 Floating Readiness Button

A floating action button (FAB) in the bottom-right corner:
- shows current progress percentage as a badge
- changes icon based on progress: 📊 (under 75%), 💪 (75%+), 🎉 (ready)
- pulses with an animation ring when the user is ready to advance
- tapping opens the readiness check modal
- provides haptic feedback on tap
- hidden when viewing Favorites

### 8.3 Progress Dialogs

Readiness modal:
- shows usage metrics and readiness progress
- provides recommendation on whether to advance
- has an "Advance" button to move to the next level

Level-up modal:
- celebration dialog showing the new level number
- lists newly unlocked words (up to 12 shown)
- provides positive feedback after vocabulary expansion

---

## 9. Smart Grammar Features

When smart grammar is enabled:
- verb forms and noun forms can be automatically managed
- spoken output uses grammar-resolved forms
- share output also uses grammar-resolved forms
- grammar tokens can prefix symbols when armed

### 9.1 Verb Form Picker

Access:
- long-press a verb in message builder
- optionally long-press a verb in grid when grid long-press picker is enabled

Assist modes:
- `beginner`: simple 4-option view
- `advanced`: tense + pronoun guided picker with sentence context
- `therapist`: full form grid

Additional features:
- pronoun images can be configured for visual pronoun representation
- sentence context is analyzed to pre-select appropriate verb forms

### 9.2 Noun Form Picker

Access:
- long-press a noun in message builder
- optionally long-press a noun in grid (if noun forms exist)

Behavior:
- choose singular/plural form
- selected form can be locked for that token
- locked form persists across speak and share actions

### 9.3 Grid Long-Press Inflection Picker

A separate feature from the message builder long-press, enabled via `gridInflectionPickerEnabled` setting.

Behavior:
1. Long-press a symbol in the grid
2. The system checks if the symbol is a verb (via wordType, fitzCategory, motorZone, or heuristic detection)
3. If verb forms exist, a verb picker opens
4. If not a verb but noun forms exist, a noun picker opens
5. After selecting a form, the symbol is added to the message with the chosen form locked
6. If no forms are available, the symbol is added normally (treated as regular press)

Requirements: both `gridInflectionPickerEnabled` and `smartGrammarEnabled` must be enabled.

### 9.4 Grammar Strip (Dutch)

When enabled and on tablet landscape with Dutch language:
- a 68px horizontal strip appears between top row and grid
- grammar chips are organized into groups separated by dividers:
  - Articles (blue): de, het, een, etc.
  - Demonstratives (green): deze, die, dit, dat, etc.
  - Possessives (orange): mijn, jouw, zijn, haar, etc.
  - Prepositions (purple): in, op, met, van, etc.

### 9.5 Armed Grammar Token (Prefix Mode)

Tapping a grammar strip chip "arms" the token:
- the chip highlights with a thick primary-color border
- when you next tap a symbol in the grid, the armed token is automatically inserted as a prefix before the symbol
- the armed state clears after use or when clearing all content
- visual feedback shows the armed token with primary color background

---

## 10. Grid Modes

MainScreen supports three symbol grid modes plus a text-only mode.

### 10.1 Standard Mode (`standard`)

What users get:
- categories + symbol grid
- optional progressive behavior if progression is enabled
- 4-column grid on phone
- configurable 6-12 column grid on tablet
- subcategory navigation when parent categories have children

Primary use:
- conventional category-based AAC navigation

Cell types:
- **Active symbol**: full color, image or emoji, label, optional Fitzgerald stripe/border
- **Empty cell (normal)**: transparent/invisible
- **Empty cell (edit mode)**: dashed border with "+" button

### 10.2 Activity Boards Mode (`schematic`)

What users get:
- activity dashboard (board tiles)
- board-based fixed-position grids
- link buttons between boards (if present in board data)
- functional navigation buttons (Back, Home) styled in indigo
- optional edit mode toggle in MainScreen

Cell types:
- **Symbol cell**: image/emoji with label, Fitzgerald coloring, edit indicator
- **Link button**: blue background, folder/custom icon, link badge, board name label
- **Functional button**: indigo background, navigation icon (arrow-left, home), action label
- **Empty cell (normal)**: light dashed border with subtle "?" placeholder
- **Empty cell (edit mode)**: dashed blue border with "+" icon

Typical workflow:
1. Choose an activity board from dashboard.
2. Tap symbols to build message.
3. Use link/home/back board buttons where available.

Row auto-expansion:
- in edit mode, grid rows automatically expand to fill available vertical space

### 10.3 Core-Fringe Mode (`corefringe`)

What users get:
- fixed-position core + fringe page navigation experience
- category-link cells navigate to sub-pages (blue background with link badge)
- back/home nav cells appear inside grid on sub-pages (last two cells of last row)
- optional edit mode toggle in MainScreen (tablet landscape usage path)
- pinned cells maintain position across page navigation
- memoized cell rendering for smooth navigation performance

Cell types:
- **Symbol cell**: image/emoji with label, Fitzgerald stripe/border, pin indicator (thumb-tack for pinned, pencil for unpinned)
- **Category link cell**: blue background, custom icon/image or folder icon, link badge, category name
- **Back button**: primary border, arrow-left icon, "Back" label
- **Home button**: primary border, home icon, "Home" label
- **Empty cell (normal)**: light dashed border
- **Empty cell (edit mode)**: dashed border with "+" icon

Special behavior:
- if no active layout exists for selected grid columns, screen shows:
  - create empty layout
  - copy from an existing layout at another grid size
- Back/Home buttons are hidden in edit mode

Portrait tablet behavior:
- shows rotate-to-landscape prompt for Core-Fringe usage
- prompt includes: rotate icon, main text, and subtext

### 10.4 Text Mode (`text`)

Text mode replaces the entire symbol grid interface with a keyboard-first communication screen. It is activated by setting `input_mode` to `text` in Admin -> Settings -> Input Mode.

What users get:
- full-width text input area with keyboard
- quick phrase strip (top 10 most-used phrases, sorted by frequency)
- abbreviation shortcut strip (tap to expand shortcode into full text)
- phrase category row (browse phrases by category)
- phrase picker sheet (opens when a category is tapped, shows all phrases in that category)
- speak / stop, backspace (removes last word), and clear buttons
- share button (if enabled)
- admin access button (PIN-protected if enabled)

Layout adaptation:
- **Phone portrait**: single-column layout with `KeyboardAvoidingView`. No dedicated header row — the settings cog floats absolutely (top-right, zIndex 10) over the content. Top-to-bottom order:
  1. **Settings cog** — floating absolute-positioned, top-right, zIndex 10 (overlays content, not a separate row)
  2. **Composer bar** — multiline text input (min 80px) with inline clear (×) button; toolbar row below with Speak/Stop (green/red), Backspace (long-press = clear all), and optional Share button
  3. **Tab bar** — three equal pill buttons: **Phrases | Quick Phrases | Shortcuts** (active tab fills with primary color)
  4. **Tab content** (fills remaining space) — shows one panel at a time based on active tab: Phrases → `PhraseCategoryRow` list; Quick Phrases → `QuickPhraseStrip` grid; Shortcuts → `ShortcutStrip` list
- **Phone landscape**: same `KeyboardAvoidingView` wrapper, all sections fixed (no scroll view). Top-to-bottom order:
  1. **Settings cog** — floating absolute-positioned, top-right, zIndex 10
  2. **Composer bar** — pinned at the top; text input (minHeight 56) with inline clear (×) button; toolbar row with Speak/Stop, Backspace, optional Share
  3. **PhraseCategoryRow** — fixed below composer (horizontal scrollable category chips)
  4. **QuickPhraseStrip** — fixed below categories (horizontal scrollable phrase chips, taller buttons)
  5. **ShortcutStrip** — fixed at the bottom (horizontal scrollable abbreviation chips)
- **Tablet**: three-column top row matching symbol mode — settings cog (left), text input + clear button (center), Backspace / Share / Speak-Stop buttons (right) — below the top row, the remaining space is divided into three persistent side-by-side panels: **Quick Phrases** (widest, `flex 5`), **Phrase Categories** (`flex 3`), **Shortcuts** (`flex 3`). Each panel fills the available height and scrolls vertically within itself. Nothing is hidden behind horizontal scrolling.

Typical workflow:
1. Type a message directly, or tap quick phrase chips / abbreviation shortcuts to build text.
2. Browse phrase categories for situational phrases.
3. Tap `Speak` to hear the message aloud.
4. Tap `Share` to send to other apps (if enabled).

Key differences from symbol mode:
- no symbol grid, categories, or message builder
- no prediction bar, grammar strip, or Fitzgerald Key coloring
- no edit mode or progressive vocabulary
- phrases are sorted by usage frequency; tapping a phrase bumps its frequency for next time
- backspace removes the last word (not last character)

Components:
- `TextComposerBar` — text input with speak/stop/backspace/clear/share action buttons (phone only)
- `QuickPhraseStrip` — `strip` variant (phone): horizontal scrollable chips; `grid` variant (tablet): full-width vertical list of phrase buttons filling the left panel
- `ShortcutStrip` — `strip` variant (phone): horizontal scrollable chips; `list` variant (tablet): vertical list with a primary-color shortcode badge and expanded text alongside
- `PhraseCategoryRow` — `row` variant (phone): horizontal scrollable cards; `list` variant (tablet): vertical list of full-width cards with icon and phrase count
- `PhrasePickerSheet` — bottom sheet modal; `numColumns={1}` on phone (single list), `numColumns={2}` on tablet (two-column grid); tapping the dim overlay closes the sheet

---

## 11. Edit Mode (User Perspective)

Edit mode is exposed in MainScreen for Schematic, Core-Fringe, and Standard grid paths.

### 11.1 Entering Edit Mode

- Tap the pencil/checkmark toggle button in the header.
- The button shows a pencil icon (gray) in normal mode and a checkmark icon (green) in edit mode.
- If admin is locked, PIN prompt appears first.
- After successful PIN entry, edit mode activates.

### 11.2 Edit Mode Toggle Button

Visual states:
- **Normal mode**: pencil icon, textSecondary color, transparent background
- **Edit mode active**: checkmark icon, green/success color, light green background
- **Disabled**: gray icon, 50% opacity

Placement:
- phone: header, left side (24px size)
- tablet portrait: header, right side (36px size)
- tablet landscape: left column below settings cog, side by side with the Word Finder search button when both are visible (50px size)

### 11.3 Standard Grid Edit Interactions

- tap an occupied cell to select it (highlighted with primary color border)
- tap another occupied cell to swap their positions
- tap an empty cell to open the symbol picker modal (create or assign a symbol)
- long-press an occupied cell to open the button editor modal (edit label, image, spoken text, Fitzgerald category)

### 11.4 Progressive Grid Edit Interactions

- tap an active symbol to select it
- tap another active symbol to swap positions
- tap an empty cell to open the symbol picker modal
- long-press to edit symbol properties
- ghost (locked) slots cannot be interacted with in edit mode

### 11.5 Core-Fringe Edit Interactions

- tap occupied cell to select it
- tap another cell to move/swap
- tap empty cell to add symbol
- long-press occupied slot for pin/unpin/delete actions
- pin indicator: thumb-tack icon (top-left for pinned), pencil icon (top-right for unpinned)
- Back/Home navigation buttons are hidden during edit mode

### 11.6 Schematic Edit Interactions

- board-level and button-level editing workflows are supported
- symbol picker allows symbol creation and linking options
- button editor allows editing label, image, category, color, and placement
- grid rows auto-expand in edit mode to fill available space

---

## 12. Admin Access And PIN Behavior

MainScreen admin entry points:
- phone: toolbar `Admin` button, floating settings cog (top-right, absolute positioned), and toolbar cog
- tablet: header/top-row settings cog

Behavior:
- if no PIN is set: opens Admin immediately
- if PIN is set: PIN modal opens
- PIN modal has lockout after repeated failures (3 failed attempts → temporary lockout)

Admin button visual (phone):
- shows lock emoji with text: 🔒 when locked, 🔓 when unlocked or no PIN set

Navigation target:
- admin press can target a specific tab (Settings, Symbols, etc.)
- edit mode unlock uses PIN verification without navigating to Admin

---

## 13. Layout Adaptation By Device

### 13.1 Phone Layout

The phone layout adapts fully between portrait and landscape orientations. The device orientation lock that applies to tablets does **not** apply to phones — phones are free to rotate.

#### 13.1.1 Phone Portrait

Key traits:
- single-column vertical flow with KeyboardAvoidingView (iOS)
- no dedicated header row — settings cog floats absolutely (top-right, zIndex 10) over the content
- composer zone: message builder (vertical wrap, symbols shown at 80% size, 6px gap between symbols, near edge-to-edge width, increased minimum height, 20px spacing below)
- action panel below message builder uses `flex: 1`
- in Symbol Only mode: text composer (pencil/text input/prediction bar) is hidden
- horizontal category chips below composer
- subcategory row (when applicable)
- 4-column symbol grid in standard mode
- toolbar at bottom: Speak (large), then Terug (Backspace) + Admin icon in a compact row

#### 13.1.2 Phone Landscape

When the phone is rotated to landscape, the layout switches to a two-column side-by-side view:

```
+---------------------------+------------------------------------------+
|  Message Builder          |                                          |
|  (flex, scaled symbols)   |          Symbol Grid                     |
+---------------------------+  (4 columns, fills right panel)          |
|  [     Spreek      ]      |                                          |
|  [Terug]  [Admin icon]    |                                          |
+---------------------------+------------------------------------------+
```

Left panel (~36% width):
- message builder strip at the top (flexible height, symbols at 70% scale, clips to panel)
- Spreek button (full-width, large)
- compact row: Terug (Backspace) on left, Admin icon on right

Right panel (~64% width):
- category bar and symbol grid fill all available height

Orientation behavior:
- `useTabletLandscapeLock` locks tablets to landscape and unlocks phones (free rotation)
- orientation detection uses `useWindowDimensions`: `isLandscape = width > height`
- the `isPhoneLandscape` guard (`width > height && Math.min(width, height) < 500`) is used for compact modal sizing to avoid affecting tablets

Phone-specific notes:
- no grammar strip (grammar strip is tablet landscape only)
- no Core-Fringe mode (phone does not support it)
- grid columns fixed at 4
- schematic mode available with edit toggle
- text composer (pencil button + text input + prediction bar) is hidden in Symbol Only mode on both portrait and landscape

### 13.2 Tablet Landscape Layout — Full Guide

VoiceBridgeAAC is designed primarily for tablet landscape use. The screen is locked to landscape orientation on tablets. This section describes every element, how to interact with it, and how the layout adapts across grid modes.

#### 13.2.1 Overall Layout Structure

The screen is divided into stacked horizontal bands from top to bottom:

```
+-----------------------------------------------------------------------+
|  [Cog]  [Edit] [Search]  |   Composer / Message Builder   | [< ] [Share] [Speak] |
+-----------------------------------------------------------------------+
|                     Grammar Strip (if active)                         |
+-----------------------------------------------------------------------+
|                   Word Finder Guidance Bar (if active)                 |
+-----------------------------------------------------------------------+
|  Category chips  |  Subcategory chips  (Standard mode only)           |
+-----------------------------------------------------------------------+
|                                                                       |
|                          Symbol Grid                                  |
|          (Standard / Activity Boards / Core-Fringe)                   |
|                                                                       |
+-----------------------------------------------------------------------+
```

#### 13.2.2 Top Row — Three Columns

The top row has a tinted background and is always visible (except during admin board/layout editing, which replaces it with an edit bar).

**Left column** (vertically stacked, centered):
- **Settings cog** (42px): opens the Admin screen. If a PIN is set and admin is locked, the PIN modal appears first.
- **Edit toggle + Search button** (side by side in a horizontal row, only when applicable):
  - **Edit toggle** (pencil/checkmark, 50px): shown in Activity Boards, Core-Fringe, or Standard mode when edit button is enabled. Tap to enter or exit edit mode. If admin is locked and PIN is set, PIN prompt appears first.
  - **Word Finder search** (magnifying glass, 28px): shown in Activity Boards and Core-Fringe modes when Word Finder is enabled and edit mode is off. Opens the Word Finder search modal.

**Middle column** (fills remaining width):
Controlled by the "Landscape Display Mode" setting in Admin > Settings > Appearance.
- **Composer mode** (`composer`): shows a multiline text input (2 lines) with a prediction bar below it. A character count pill appears in the bottom-right corner of the text input when text is present.
- **Message Builder mode** (`messageBuilder`): shows a compact horizontal scrolling strip of pictogram cards (105px height). The message builder displays selected pictograms, grammar token cards, verb/noun badges, and Fitzgerald color stripes.

**Right column** (buttons in a horizontal row):
- **Backspace** (arrow-left icon): short tap removes the last pictogram or character. Long-press (hold 500ms) clears all content instantly.
- **Share** (share icon, blue): only visible when Share is enabled in Settings. Opens the device native share sheet with the current message text.
- **Speak / Stop** (green when idle, red when speaking): taps speaks the message using the configured voice. While speaking, changes to a red Stop button. Tap Stop to interrupt speech immediately.

#### 13.2.3 Grammar Strip

Visible when:
- the current language has grammar support (Dutch, and other supported languages)
- the Grammar Strip setting is enabled
- not in admin board/layout edit mode

Appears as a 68px horizontal strip below the top row, containing color-coded grammar token chips organized in groups:
- Articles (blue): de, het, een, etc.
- Demonstratives (green): deze, die, dit, dat, etc.
- Possessives (orange): mijn, jouw, zijn, haar, etc.
- Prepositions (purple): in, op, met, van, etc.

Interaction: tap a chip to "arm" it (highlighted border). Then tap any symbol in the grid — the armed grammar token is automatically inserted before the symbol. The armed state clears after one use.

#### 13.2.4 Word Finder Guidance Bar

Appears below the grammar strip (or below the top row if no grammar strip) when Word Finder guidance is active. Shows step-by-step navigation instructions to help the user find a specific word in the grid. A cancel button dismisses the guidance.

#### 13.2.5 Category and Subcategory Chips

**Standard mode only.** A horizontally scrollable row of category chips appears below the grammar strip / top row. Favorites (heart icon) is always the first chip.

When a selected category has child categories, a subcategory row appears below with an "All" option and individual subcategory chips.

In Activity Boards and Core-Fringe modes, categories are not shown — navigation is handled by the board/layout system instead.

#### 13.2.6 Main Grid Area

Fills all remaining vertical space. The grid columns are configurable from 6 to 12 (shared across all modes). The content depends on the active grid mode:

- **Standard mode**: category-based symbol grid. Tap symbols to add them to the message. If progressive vocabulary is enabled, locked slots appear as ghost cells.
- **Activity Boards mode**: board dashboard (grid of board tiles) or an active board with fixed-position symbols, link buttons, and navigation buttons.
- **Core-Fringe mode**: fixed-position core vocabulary with fringe page navigation. Category-link cells navigate to sub-pages. Back/Home buttons appear on sub-pages.

#### 13.2.7 Board/Layout Edit Bar

When entering admin board edit or admin layout edit mode (from the Admin screen), the entire top row is replaced with an edit bar showing:
- the board or layout title
- a "Done" button to finish editing
- for Core-Fringe layout editing: "Add Page" and "Copy Page" buttons

#### 13.2.8 Preview Overlays

Two settings previews display as overlays on top of the main grid:
- **Grid Size Picker**: allows selecting 6-12 columns with live preview of how the grid will look. Apply saves and returns to Settings; Cancel restores the original size.
- **Font Size Picker**: allows selecting symbol label font size (8, 9, 10, 11, 12, or 14) with live preview. Apply saves and returns to Settings; Cancel restores the original size.

Both are triggered from Admin > Settings > Appearance.

#### 13.2.9 Typical User Workflows on Tablet

**Basic communication:**
1. Tap a category chip to browse symbols.
2. Tap symbols to build a sentence (pictograms appear in the message builder or as text in the composer).
3. Tap Speak to hear the sentence aloud.
4. Tap Backspace to undo the last symbol, or long-press to clear everything.

**Using grammar (Dutch example):**
1. Tap a grammar strip chip (e.g., "de") to arm it.
2. Tap a symbol (e.g., "hond") — "de" is inserted before "hond" automatically.
3. Long-press a verb in the message builder to pick a conjugated form.
4. Speak outputs the grammar-resolved sentence.

**Finding a word (Word Finder):**
1. Tap the search icon (magnifying glass) in the top-left.
2. Type the word you are looking for in the search modal.
3. Select a result — the app shows step-by-step guidance to navigate to that word in the grid.
4. Follow the highlighted path to reach the symbol.

**Editing boards/layouts:**
1. Tap the pencil icon to enter edit mode (PIN may be required).
2. Tap an empty cell to add a symbol, or tap an occupied cell to select it for swapping.
3. Long-press a cell for additional options (pin/unpin, delete, edit properties).
4. Tap the checkmark icon to exit edit mode.

**Adjusting grid size or font size:**
1. Go to Admin > Settings > Appearance.
2. Tap Grid Size or Font Size — the main screen opens with a picker overlay.
3. Select a value and see the live preview.
4. Tap Apply to keep the change, or Cancel to revert.

### 13.3 Tablet Portrait Layout

Key traits:
- three stacked sections: top (composer), middle (categories), bottom (grid + toolbar)
- top section: header + composer (3 lines) + prediction bar + message builder (240-280px)
- middle section: categories + subcategories (horizontal scroll)
- bottom section: grid + toolbar (speak, backspace, share)
- toolbar at bottom with three flex buttons

Special portrait cases:
- Core-Fringe mode: shows rotation prompt with rotate icon, main text, and subtext instead of grid
- Schematic mode: renders in bottom section, toolbar still visible below

---

## 14. Preview Overlays From Settings

MainScreen can be opened in preview mode by Admin settings actions.

Supported previews:
- grid column preview (`gridPreviewMode`, tablet layout path)
- symbol font size preview (`fontSizePreviewMode`)

### 14.1 Grid Size Picker Overlay

- allows selecting grid columns from 6 to 12
- unified picker used by all grid modes (standard, schematic, core-fringe)
- shows current selection with real-time preview
- `Apply` persists the new value, switches Core-Fringe layouts, and returns to Admin Settings
- `Cancel` restores original value and returns to Admin Settings

### 14.2 Font Size Picker Overlay

- allows adjusting symbol label font size (8 to 14)
- affects all grid modes
- `Apply` persists and returns to Admin Settings
- `Cancel` restores original value and returns to Admin Settings

---

## 15. Loading, Sync, And Safety Behavior

MainScreen performs startup and sync behaviors before/while user interacts.

User-visible outcomes:
- loading state while initial seeding/setup runs (centered loading text)
- language auto-fallback if current language is unavailable
- categories and symbols live-refresh when DB changes
- core vocabulary pack auto-check during initialization
- unassigned/system category is ensured
- vocabulary version tracking: when a vocabulary pack is imported, categories and core-fringe layouts auto-refresh

---

## 16. Known Practical Notes For Users

- `Share` button appears only when enabled in Admin settings.
- Grammar strip is Dutch-specific in current MainScreen usage path and only appears in tablet landscape.
- Core-Fringe is intended for landscape workflow (portrait prompts to rotate).
- Core-Fringe is not available on phones.
- Phones support both portrait and landscape — rotate freely without any lock.
- In phone landscape, the layout switches to a two-column view: message builder + buttons on the left, symbol grid on the right.
- In phone Symbol Only mode, the text composer (pencil button, text input, prediction bar) is always hidden regardless of orientation.
- Grammar picker modals (verb and noun) use compact sizing in phone landscape to fit the shorter screen height.
- Long-press `Backspace` is the fastest way to clear everything (500ms hold).
- Fitzgerald Key coloring appears across all grid modes when enabled.
- ElevenLabs voices require an internet connection; cached audio plays offline.
- If ElevenLabs fails, the app automatically falls back to device TTS.
- Each language can have its own preferred device voice.
- Armed grammar tokens (from the Grammar Strip) automatically clear after inserting one symbol.
- The prediction engine learns from your spoken sentences over time.
- Abbreviation expansion works in English, Spanish, Dutch, and French.
- Symbol font size affects labels in all grid modes.

---

## 17. Deep Dive: MainScreen Code And Modules

This section maps modules to behavior so developers and advanced admins can trace features end-to-end.

### 17.1 Routing And State Core

| File | Responsibility | User Impact |
|---|---|---|
| `src/screens/main/MainScreen.tsx` | Device-based router; reads `input_mode` setting to render symbol grids or TextModeScreen | Correct layout on each device and input mode |
| `src/hooks/useDeviceType.ts` | Detects tablet/phone and orientation | Live layout adaptation on rotate |
| `src/hooks/useTabletLandscapeLock.ts` | Locks tablets to landscape orientation; unlocks phones for free rotation | Tablets always landscape, phones rotate freely |
| `src/screens/main/useMainScreenState.ts` | Single source of truth for all symbol-mode MainScreen logic/state (100+ state variables, 40+ handlers) | Consistent behavior across layouts |
| `src/screens/main/useTextModeState.ts` | State for text mode: message, phrases (quick + categories), abbreviations, TTS, admin nav, share | Text mode behavior |
| `src/navigation/types.ts` | MainScreen route params (`gridPreviewMode`, `fontSizePreviewMode`) | Settings-triggered preview overlays |

### 17.2 Layout Renderers

| File | Responsibility | User Impact |
|---|---|---|
| `src/screens/main/MainScreenPhone.tsx` | Phone UI composition; portrait: single-column, no header row (settings cog floats top-right), message builder at 80% symbol scale with 6px gap and near-edge-to-edge width, action panel uses `flex: 1`; landscape: two-column (left: message builder at 70% scale + Spreek/Terug/Admin, right: grid); text composer hidden in Symbol Only mode | Portrait and landscape interaction flows |
| `src/screens/main/MainScreenTablet.tsx` | Tablet portrait/landscape composition (three-section portrait, three-column landscape) | Wide-screen and portrait-optimized usage |
| `src/screens/main/TextModeScreen.tsx` | Text mode router (phone vs tablet) | Keyboard-first communication |
| `src/screens/main/TextModePhone.tsx` | Text mode phone layout (KeyboardAvoidingView). Portrait: no dedicated header row — settings cog floats absolutely top-right (zIndex 10); content order: composer bar → tab bar (Phrases / Quick Phrases / Shortcuts) → tab content. Landscape: composer bar at top → PhraseCategoryRow → QuickPhraseStrip → ShortcutStrip, all fixed (no scroll view); settings cog floating top-right. | Phone text communication |
| `src/screens/main/TextModeTablet.tsx` | Text mode tablet layout (three-column top row: cog left, text input center, action buttons right; three persistent side-by-side panels below: Quick Phrases, Categories, Shortcuts) | Tablet text communication |

### 17.3 Composer And Message Modules

| File | Responsibility | User Impact |
|---|---|---|
| `src/components/PredictionBar.tsx` | Suggestion chips with loading spinner, empty hint, and fade-in animation | Faster typing and sentence completion |
| `src/components/MessageBuilder.tsx` | Pictogram strip rendering with grammar badges, Fitzgerald colors, grammar token cards, auto-scroll, compact mode | Visual sentence construction with grammar awareness |
| `src/components/GrammarStrip.tsx` | Dutch grammar token chips organized in groups (articles, demonstratives, possessives, prepositions) with armed state | Quick insertion of grammar words |

### 17.4 Grid Modules (Standard And Progressive)

| File | Responsibility | User Impact |
|---|---|---|
| `src/components/SymbolGrid.tsx` | Standard symbol grid with edit mode (select, swap, add, edit), Fitzgerald support, category-aware placement | Category-based symbol access |
| `src/components/ProgressiveSymbolGrid.tsx` | Progressive grid with active/ghost/empty cell states, level-based row display, edit mode position swapping | Guided vocabulary progression |
| `src/components/SymbolButton.tsx` | Shared symbol tile rendering with Fitzgerald stripe and image/emoji display | Consistent symbol interaction visuals |

### 17.5 Mode Containers

| File | Responsibility | User Impact |
|---|---|---|
| `src/components/schematic/SchematicModeContainer.tsx` | Activity board mode orchestration | Script-based communication boards |
| `src/components/schematic/ActivityDashboard.tsx` | Board tile dashboard | Quick board selection |
| `src/components/schematic/ActivityBoardView.tsx` | Active board renderer with row auto-calculation, press dispatching | In-board symbol interaction |
| `src/components/schematic/SchematicGrid.tsx` | Fixed-position board grid with symbol/link/functional/empty cell types | Positional AAC workflows |
| `src/components/schematic/BoardButtonCell.tsx` | Cell rendering for symbol/link/functional buttons with Fitzgerald support | Rich board button behavior |
| `src/components/schematic/SymbolPickerModal.tsx` | Symbol/link/functional picker and create-symbol flow | Add and place new content in edit workflows |
| `src/components/schematic/ButtonEditorModal.tsx` | Button and symbol property editor (label, image, spoken text, Fitzgerald category) | Edit placement behavior |
| `src/components/schematic/BoardEditorModal.tsx` | Activity board editor | Create/update/delete activity boards |
| `src/components/schematic/EditModeToggleButton.tsx` | Pencil/checkmark toggle with green highlight in edit mode | Visual edit mode state indicator |
| `src/components/corefringe/CoreFringeModeContainer.tsx` | Core-Fringe orchestration and layout lifecycle | Core plus fringe navigation model |
| `src/components/corefringe/CoreFringeGrid.tsx` | Core-Fringe fixed grid with symbol/link/nav/empty cells, BidirectionalScrollGrid, Back/Home buttons | Efficient page navigation |
| `src/components/corefringe/CoreFringeCell.tsx` | Memoized slot cell renderer with custom React.memo comparator | Better performance during navigation |
| `src/components/textmode/TextComposerBar.tsx` | Text input with speak/stop/backspace/clear/share buttons (phone only; tablet uses inline top-row layout) | Text mode message composition on phone |
| `src/components/textmode/QuickPhraseStrip.tsx` | `strip` variant: horizontal scroll chips (phone); `grid` variant: vertical full-width list filling the left panel (tablet) | Quick phrase insertion |
| `src/components/textmode/ShortcutStrip.tsx` | `strip` variant: horizontal scroll chips (phone); `list` variant: vertical list with shortcode badge + expanded text (tablet) | Abbreviation expansion |
| `src/components/textmode/PhraseCategoryRow.tsx` | `row` variant: horizontal scroll cards (phone); `list` variant: vertical full-width cards with icon and count (tablet) | Browse phrases by category |
| `src/components/textmode/PhrasePickerSheet.tsx` | Bottom sheet modal; single-column list (phone) or two-column grid (tablet); tap overlay to close | Category phrase selection |

### 17.6 Shared Rendering Primitives

| File | Responsibility | User Impact |
|---|---|---|
| `src/components/shared/SymbolCellContent.tsx` | Shared presentational component for symbol cells (image/emoji, label, Fitzgerald stripe, selection overlay, edit indicator) | Consistent cell rendering across all grid types |
| `src/components/shared/useSymbolCellData.ts` | Shared hook computing Fitzgerald color and image source for a symbol | Consistent color-coding and image resolution |
| `src/components/shared/gridStyles.ts` | Factory function for consistent grid layout styles (outer container, scroll view, rows, cell margins) | Consistent grid structure across SchematicGrid and CoreFringeGrid |
| `src/components/shared/BidirectionalScrollGrid.tsx` | Smart scroll wrapper: simple vertical or nested horizontal+vertical when content overflows | Handles grid overflow gracefully |
| `src/components/shared/createBaseSymbolCellStyles.ts` | Factory for cell styles (symbol button, Fitzgerald border/stripe, selection, label, edit indicator) | Consistent cell appearance |

### 17.7 Grammar UI Modules

| File | Responsibility | User Impact |
|---|---|---|
| `src/grammar/ui/InflectionPicker.tsx` | Verb inflection modal shell; compact layout on phone landscape (`isPhoneLandscape`: reduced padding, smaller fonts, smaller scroll area) | Manual verb form control |
| `src/grammar/ui/VerbPickerBeginnerBody.tsx` | Beginner form selection UX (4 options); reduced grid gap and button padding on phone landscape | Simplified therapy-friendly flow |
| `src/grammar/ui/VerbPickerAdvancedBody.tsx` | Advanced tense/pronoun picker with sentence context; reduced margins/gaps/cell padding on phone landscape | Faster precise selection |
| `src/grammar/ui/NounInflectionPicker.tsx` | Noun singular/plural picker; compact modal on phone landscape | Number agreement control |
| `src/grammar/index.ts` | Grammar public exports (`useGrammar`, pickers) | Stable integration boundary |

Phone landscape grammar modal sizing:
- all grammar modals detect `isPhoneLandscape = width > height && Math.min(width, height) < 500`
- this guard ensures tablet modals (which are also landscape) are unaffected
- in phone landscape: overlay padding, header margins, font sizes, button padding, and scroll heights are all reduced to fit the shorter screen height

### 17.8 Fitzgerald Key Modules

| File | Responsibility | User Impact |
|---|---|---|
| `src/fitzgerald/ui/FitzgeraldLegend.tsx` | Color-coding legend modal/embedded view with category cards, example words, and sample sentence pattern | Educational tool for sentence structure |
| `src/fitzgerald/hooks/useFitzgerald.ts` | Hook providing Fitzgerald color palette and enabled state | Consistent color access across components |
| `src/fitzgerald/utils/getFitzCategory.ts` | Determines Fitzgerald category from symbol properties (label, language, wordType, category, explicit override) | Accurate word classification |

### 17.9 Progression, Security, And Overlay Modules

| File | Responsibility | User Impact |
|---|---|---|
| `src/components/FloatingReadinessButton.tsx` | Progress FAB with emoji states (📊/💪/🎉), percentage badge, pulse animation when ready, haptic feedback | Quick readiness access |
| `src/components/ReadinessCheckModal.tsx` | Progress metrics and advancement dialog | Transparent progression decisions |
| `src/components/LevelUpModal.tsx` | Level-up celebration and preview (up to 12 new words) | Positive feedback after unlock |
| `src/components/PINModal.tsx` | PIN verify/set UI with lockout | Admin protection |
| `src/components/GridSizePickerOverlay.tsx` | Grid column preview overlay (6-12 columns, unified) | Immediate layout tuning |
| `src/components/FontSizePickerOverlay.tsx` | Symbol label font preview overlay (8-14) | Readability tuning |

### 17.10 Operational Hooks And Services Used By MainScreen

| File | Responsibility | User Impact |
|---|---|---|
| `src/hooks/useGridLayout.ts` | Shared cell size calculation with width+height constraints, minimum 60px cell size, horizontal scroll detection | Consistent grid sizing across all modes |
| `src/hooks/useSettingsState.ts` | Centralized settings hook managing 30+ settings with reactive state, backward-compatible migrations | All user preferences |
| `src/hooks/useProgressiveVocabulary.ts` | Progressive level/metrics/readiness state | Structured vocabulary growth |
| `src/hooks/useSchematicMode.ts` | Activity board loading/navigation state | Reliable board workflow |
| `src/hooks/useCoreFringeMode.ts` | Core-Fringe layout/page/slot state with WatermelonDB observers | Stable page navigation and pin behavior |
| `src/hooks/useCoreFringeOperations.ts` | Core-Fringe slot/page/layout CRUD operations | Edit and migration actions |
| `src/hooks/useBoardOperations.ts` | Board button CRUD and movement | Schematic editing behavior |
| `src/hooks/useActivityBoardOperations.ts` | Activity board CRUD and ordering | Board management behavior |
| `src/hooks/useSymbolPickerState.ts` | Shared search/filter state for symbol picker layouts | Fast symbol lookup in edit mode |
| `src/services/predictionEngine.ts` | Suggestions (bigram model), abbreviation expansion, sentence learning, word completions | More effective communication speed |
| `src/services/voiceService.ts` | Dual-provider TTS (device + ElevenLabs) with caching, 4-tier voice fallback, automatic provider fallback | Reliable speech output |
| `src/services/elevenLabsService.ts` | ElevenLabs API client (speech generation, online check) | Premium voice quality |
| `src/services/audioCacheService.ts` | Local audio cache for ElevenLabs generated speech | Instant replay of cached audio |
| `src/services/settingsService.ts` | Persisted key-value settings, PIN management, language management, vocabulary versioning | Stable user preferences |
| `src/db/helpers/symbolQueries.ts` | Language-aware symbol retrieval | Correct symbol labels per language |

---

## 18. Settings Reference

All settings that affect MainScreen behavior, with their storage keys and defaults.

### 18.1 Appearance And Layout

| Setting | Key | Default | Values |
|---|---|---|---|
| Landscape display mode | `landscapeDisplayMode` | `composer` | `composer`, `messageBuilder` |
| Grid columns | `gridColumns` | `8` | `6`-`12` |
| Symbol font size | `symbolFontSize` | `12` | `8`-`15` |
| Fitzgerald Key enabled | `fitzgeraldEnabled` | `false` | `true`, `false` |
| Grid mode | `gridMode` | `standard` | `standard`, `schematic`, `corefringe` |

### 18.2 Voice

| Setting | Key | Default | Values |
|---|---|---|---|
| Voice provider | `voice_provider` | `device` | `device`, `elevenlabs` |
| Voice pitch | `voice_pitch` | `1.0` | `0.5`-`2.0` |
| Voice rate | `voice_rate` | `0.9` | `0.5`-`2.0` |
| Per-language voice | `voice_identifier_{lang}` | (system default) | Device voice identifier |
| ElevenLabs API key | `elevenlabs_api_key` | (none) | API key string |
| ElevenLabs voice ID | `elevenlabs_voice_id` | (none) | Voice ID string |
| ElevenLabs voice name | `elevenlabs_voice_name` | (none) | Display name string |
| ElevenLabs model | `elevenlabs_model` | `eleven_flash_v2_5` | Model ID string |

### 18.3 Grammar

| Setting | Key | Default | Values |
|---|---|---|---|
| Smart grammar enabled | `smartGrammarEnabled` | `false` | `true`, `false` |
| Grammar assist mode | `grammarAssistMode` | `beginner` | `beginner`, `advanced`, `therapist` |
| Grid inflection picker | `gridInflectionPickerEnabled` | `false` | `true`, `false` |
| Grammar strip enabled | `grammarStripEnabled` | `true` | `true`, `false` |
| Pronoun images | `pronounImages` | `{}` | JSON object mapping pronoun keys to URIs |

### 18.4 Progressive Vocabulary

| Setting | Key | Default | Values |
|---|---|---|---|
| Progression enabled | `progressionEnabled` | `true` | `true`, `false` |
| Show ghost slots | `showGhostSlots` | `true` | `true`, `false` |
| Auto-advance levels | `autoAdvanceLevels` | `false` | `true`, `false` |
| Expert vocabulary | `expertVocabEnabled` | `false` | `true`, `false` |

### 18.5 Other

| Setting | Key | Default | Values |
|---|---|---|---|
| Input mode | `input_mode` | `symbol_only` | `symbol_only`, `text` |
| Share enabled | `shareEnabled` | `false` | `true`, `false` |
| Admin PIN | `admin_pin` | (none) | Hashed PIN string |
| App language | `app_language` | `en` | Language code string |

---

## 19. End-To-End Feature Trace Examples

### 19.1 Tap Symbol → Speak

1. User taps symbol in grid.
2. `useMainScreenState.handleSymbolPress` adds pictogram (with metadata: wordType, infinitive, imageUri, fitzCategory, motorZone, sourcePackId) and text.
3. If an armed grammar token exists, it is inserted as a prefix first, then the symbol.
4. Favorites and progression usage are updated when applicable.
5. If grammar enabled, grammar processing updates display forms.
6. User taps `Speak`.
7. `voiceService.speak` determines provider (device or ElevenLabs).
8. Grammar-resolved spoken text is built from conjugations and noun inflections.
9. ElevenLabs checks cache → generates if needed → plays audio. Device TTS resolves voice via 4-tier fallback → speaks.
10. After successful speech, sentence is recorded to prediction engine.

### 19.2 Long-Press Verb In Grid (With Grid Picker Enabled)

1. User long-presses a verb symbol.
2. `handleSymbolLongPress` checks if `gridInflectionPickerEnabled` and `smartGrammarEnabled` are both true.
3. Symbol is classified as verb via wordType, fitzCategory, motorZone, or heuristic detection.
4. If verb forms exist, `InflectionPicker` modal opens.
5. User selects a verb form (e.g., past tense, first person).
6. `handleGridVerbFormSelect` captures current pictogram index, adds symbol via `handleSymbolPress`, then locks selected form.
7. Message builder and speech/share use the chosen form.

### 19.3 Grammar Strip Armed Token Flow

1. User taps a grammar token chip in the Grammar Strip (e.g., "de" article).
2. The chip highlights with thick primary border (armed state).
3. User taps a symbol in the grid (e.g., "hond" - dog).
4. `handleSymbolPress` detects armed token, inserts "de" pictogram first, then "hond".
5. Message builder shows: [de] [hond].
6. Armed state clears automatically.

### 19.4 Change Grid Columns From Settings Preview

1. Admin Settings triggers MainScreen with `gridPreviewMode`.
2. MainScreen opens `GridSizePickerOverlay`.
3. User tests columns in real time (6-12 range).
4. Grid resizes live via `handleGridColumnsSelect`.
5. Core-Fringe layouts are switched to match new column count.
6. Apply persists the value and returns to Admin Settings, or Cancel restores original value.

### 19.5 ElevenLabs Voice With Fallback

1. User taps `Speak` with ElevenLabs provider configured.
2. `voiceService.speak` calls `speakElevenLabs`.
3. Audio cache is checked for the text + voice + model combination.
4. If cached: plays immediately from local file.
5. If not cached: checks online status → calls ElevenLabs API → caches result → plays.
6. If ElevenLabs fails (API error, offline): automatically falls back to device TTS with console warning.

### 19.6 Progressive Vocabulary Level-Up

1. User communicates using active (unlocked) symbols over time.
2. Usage metrics are tracked by `useProgressiveVocabulary`.
3. Floating readiness button shows progress (e.g., 75% badge with 💪 icon).
4. User taps floating button → readiness modal opens.
5. Modal shows metrics and recommendation.
6. User taps "Advance" → `handleAdvanceLevel` calculates new words.
7. Level-up modal celebrates with new level number and up to 12 newly unlocked words.
8. Grid updates to show new active symbols, previously ghost slots become active.

### 19.7 Text Mode Phrase And Abbreviation Flow

1. Admin sets `input_mode` to `text` in Settings -> Input Mode.
2. User returns to Main Screen. `MainScreen` reads `input_mode` on focus, renders `TextModeScreen` instead of symbol grids.
3. `useTextModeState` loads phrases (top 10 by frequency), phrase categories, and abbreviations for the current language.
4. User taps a quick phrase chip (e.g., "I want water").
5. `handlePhraseSelect` appends phrase text to the Redux `currentMessage` and bumps the phrase's frequency counter in the database.
6. User taps an abbreviation shortcut (e.g., "ty").
7. `handleAbbreviationPress` appends the expanded text (e.g., "thank you") to the message.
8. User taps `Speak`. `voiceService.speak` uses the same TTS pipeline as symbol mode (device or ElevenLabs with fallback).
