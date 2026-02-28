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

---

## 3. Quick Start (User Workflow)

1. Select a category (or Favorites).
2. Optionally select a subcategory if the category has children.
3. Tap symbols to build a sentence.
4. Optionally type or edit text in the message input.
5. Use prediction suggestions if needed.
6. Tap `Speak` to hear the message aloud.
7. Tap `Backspace` to remove the last symbol, or long-press it to clear all.
8. Tap `Share` to send the message to other apps (if enabled).

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
- visual strip of selected pictogram cards (88x92px each)
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
- Settings cog (header): opens Admin screen or PIN prompt (both phone and tablet)

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

MainScreen supports three grid modes.

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
- tablet landscape: left column below settings cog (50px size)

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
- phone: toolbar `Admin` button, header settings cog, and toolbar cog
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

Key traits:
- single-column vertical flow with KeyboardAvoidingView (iOS)
- header at top with edit toggle (left) and settings cog (right)
- composer zone: text input (3 lines), prediction bar, message builder (vertical wrap)
- horizontal category chips below composer
- subcategory row (when applicable)
- 4-column symbol grid in standard mode
- toolbar at bottom: Speak, Backspace, Share (if enabled), Admin
- Android keyboard dismiss shortcut shown while keyboard is open

Phone-specific notes:
- no grammar strip (grammar strip is tablet landscape only)
- no Core-Fringe mode (phone does not support it)
- grid columns fixed at 4
- schematic mode available with edit toggle

### 13.2 Tablet Landscape Layout

Key traits:
- horizontal top row with three columns:
  - **left column**: settings cog (42px) + edit toggle (50px), vertically stacked
  - **middle column**: composer (text input + prediction bar) OR message builder (compact, 105px height, horizontal scroll), depending on landscape display mode setting
  - **right column**: backspace (74px), share (56px, if enabled), speak/stop (130px) buttons in a row
- grammar strip below top row (Dutch + setting enabled, 68px height)
- large grid region fills remaining space (2px padding all sides)
- grid columns configurable (6-12, shared across modes)

Landscape display mode setting controls the middle column:
- `composer`: shows text input with prediction bar
- `messageBuilder`: shows message builder in compact horizontal scroll mode

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
| `src/screens/main/MainScreen.tsx` | Device-based router (phone vs tablet via `useDeviceType`) | Correct layout on each device |
| `src/hooks/useDeviceType.ts` | Detects tablet/phone and orientation | Live layout adaptation on rotate |
| `src/screens/main/useMainScreenState.ts` | Single source of truth for all MainScreen logic/state (100+ state variables, 40+ handlers) | Consistent behavior across layouts |
| `src/navigation/types.ts` | MainScreen route params (`gridPreviewMode`, `fontSizePreviewMode`) | Settings-triggered preview overlays |

### 17.2 Layout Renderers

| File | Responsibility | User Impact |
|---|---|---|
| `src/screens/main/MainScreenPhone.tsx` | Phone UI composition (single-column, keyboard-aware) | Single-column interaction flow |
| `src/screens/main/MainScreenTablet.tsx` | Tablet portrait/landscape composition (three-section portrait, three-column landscape) | Wide-screen and portrait-optimized usage |

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
| `src/grammar/ui/InflectionPicker.tsx` | Verb inflection modal shell | Manual verb form control |
| `src/grammar/ui/VerbPickerBeginnerBody.tsx` | Beginner form selection UX (4 options) | Simplified therapy-friendly flow |
| `src/grammar/ui/VerbPickerAdvancedBody.tsx` | Advanced tense/pronoun picker with sentence context | Faster precise selection |
| `src/grammar/ui/NounInflectionPicker.tsx` | Noun singular/plural picker | Number agreement control |
| `src/grammar/index.ts` | Grammar public exports (`useGrammar`, pickers) | Stable integration boundary |

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
| Symbol font size | `symbolFontSize` | `10` | `8`-`14` |
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
