# USERGUIDADMINSCREEN

## 1. Purpose

This guide explains everything a user can do in the Admin Screen, from a practical user perspective.

Use this screen to:
- manage app settings
- manage content (symbols, phrases, abbreviations)
- manage language and vocabulary packs
- control progressive vocabulary behavior
- manage user profiles (create, edit, delete, duplicate, switch users)

---

## 2. How To Open Admin Screen

1. Go to the Main Screen.
2. Tap the `Admin` button in the toolbar.
3. If PIN protection is enabled, enter your PIN.
4. The Admin Screen opens.

If no PIN is configured, Admin opens directly.

---

## 3. Layout And Navigation

The Admin Screen is adaptive:
- Phone (portrait or landscape): top tabs.
- Tablet portrait: top tabs.
- Tablet landscape: sidebar + context bar + content panel.

Common controls:
- `Back` button: return to previous screen.
- Language flag button (top-right): quick language switch.

Main areas:
- `Settings`
- `Content`
- `Language`
- `Users`

Tablet landscape adds a direct `About` tab in the sidebar.

---

## 4. Global Language Switch (Header Flag)

Tap the flag in the header to open language selection.

What it does:
- changes current app/admin language context
- reloads language-scoped content lists (symbols, phrases, abbreviations)
- for `en`, `nl`, and `es`: if core pack is missing, app attempts auto-install of `core-basic-all-v1`

If language change fails, an error alert appears.

---

## 5. Settings Tab

The Settings tab contains operational app settings (not content records).

### 5.1 Security

Features:
- `PIN Protection` on/off
- `Change PIN` (visible when PIN is enabled)

How to use:
1. Enable PIN to protect Admin access.
2. Set a new PIN in the PIN modal.
3. To disable PIN, confirm the warning prompt.

### 5.2 Voice

The Voice section supports two providers: **Device** (on-device TTS via expo-speech) and **ElevenLabs** (cloud AI voices). Device is the default. ElevenLabs is opt-in and requires an API key.

#### Provider Toggle

At the top of the Voice section, a two-segment toggle lets you switch between:
- `Device` — uses the built-in device voices (no internet needed)
- `ElevenLabs` — uses ElevenLabs cloud voices (requires API key and internet)

#### Device Provider Features

- select voice for current language
- use system default voice
- preview each voice
- adjust `Pitch` (0.5 to 2.0)
- adjust `Speed/Rate` (0.5 to 2.0)
- reset voice settings

How to use:
1. Ensure provider is set to `Device`.
2. Tap `Voice` to open picker.
3. Select a voice or `System Default`.
4. Use preview play button to hear sample output.
5. Fine-tune pitch and speed with plus/minus controls.
6. Tap `Preview Voice` for current setup.
7. Tap `Reset Voice Settings` to revert defaults.

#### ElevenLabs Provider Features

- API key input with show/hide toggle
- API key validation (verifies against ElevenLabs API)
- voice picker showing all available ElevenLabs voices with category badges (premade, cloned, etc.)
- adjust `Speed/Rate` (0.5 to 2.0) — shared with device provider
- `Clear Voice Cache` — removes cached audio files
- automatic offline fallback to device TTS

Note: Pitch control is not available for ElevenLabs (not supported by the API).

How to use:
1. Switch provider to `ElevenLabs`.
2. Enter your ElevenLabs API key in the text field.
3. Tap `Save` to validate the key.
   - If valid: voice list becomes available, confirmation shown.
   - If invalid: error message shown, key is not saved.
4. Tap `Select Voice` to open the voice picker modal.
5. Browse voices and tap one to select it.
6. Adjust speed if desired.
7. Tap `Preview Voice` to hear a sample.
8. Tap `Reset Voice Settings` to revert to Device provider and clear cache.

#### Fallback Behavior

When ElevenLabs is selected but fails (no API key, no voice selected, offline, API error, quota exceeded), the app automatically falls back to device TTS. The user always hears something.

#### Audio Cache

ElevenLabs audio is cached locally to avoid repeated API calls and save credits. The same phrase spoken with the same voice and settings plays instantly from cache. Use `Clear Voice Cache` if you want to free disk space or force fresh generation.

### 5.3 Appearance

Features:
- theme selector (`Light`, `Dark`, `High Contrast`, `Child Friendly`)
- landscape display mode (`Composer Only` or `Message Builder Only`)
- grid size picker
- symbol font size picker
- grammar strip toggle (shows/hides the grammar bar in landscape mode)
- edit button toggle (shows/hides the edit button on the main screen)

How to use grid and font preview:
1. Tap `Grid Size` or `Symbol Font Size`.
2. You are routed to Main Screen preview overlay.
3. Select a value.
4. Tap `Apply` to keep or `Cancel` to revert.
5. App navigates back to Admin Settings.

### 5.4 Grammar

The Grammar section controls smart verb conjugation, the grammar bar (determiner helper), the long-press form picker, and pronoun images.

#### Smart Grammar (master toggle)

The `Smart Grammar` toggle is the master switch for all grammar features. When off, verbs are shown in their base/infinitive form and all sub-features below are disabled.

When on, verbs are automatically conjugated based on sentence context (subject, tense, language). Supports Dutch, English, French, and Spanish.

#### Determiner Helper (Grammar Bar)

The `Determiner Helper` toggle controls the grammar bar — a horizontal strip of tappable grammar word chips shown in tablet landscape mode between the top bar and category tabs.

The grammar bar gives quick access to:
- **Articles** (blue chips): de, het, een / the, a / le, la, les, un, une / el, la, los, las, un, una
- **Demonstratives** (green chips): dit, dat, deze, die / this, that, these, those / ce, cette, ces / este, esta, estos, estas
- **Possessives** (orange chips): mijn, jouw, zijn, haar / my, your, his, her / mon, ma, ton, ta / mi, tu, su
- **Prepositions** (purple chips): met, voor, naar, in / with, for, to, in / avec, pour, dans / con, para, en

**Gender-aware dimming:** When a noun is in the message builder, the grammar bar automatically detects its gender (per-language) and dims incompatible articles/demonstratives. For example, after tapping "appel" (common gender in Dutch), "de" is highlighted while "het" is dimmed. This helps the user pick the correct article.

**Smart insertion (insert before noun):** When you tap an article or demonstrative on the grammar bar, it is automatically inserted *before* the last noun — not appended at the end. This produces natural word order:
- Tap "appel", then tap "de" → result: **de appel** (not "appel de")
- Tap "mama", tap "eten", tap "appel", then tap "de" → result: **mama eten de appel**

If the last noun already has a determiner directly before it, the new one is appended at the end instead (no double determiners).

**Determiner Helper Style:** When both Smart Grammar and Determiner Helper are enabled, a style selector appears with three levels:

| Level | What it does |
|-------|-------------|
| **Simple** | Only articles and demonstratives are shown (no possessives/prepositions). Incompatible tokens are dimmed. Contextual hints fade in below the bar (e.g., "Start with a subject or determiner"). Best for beginners. |
| **Standard** | All four groups are shown. Incompatible tokens are dimmed. No hints. Good for everyday use. |
| **Expert** | All four groups are shown. No dimming — all tokens equally visible. For therapists or advanced users who want full control. |

How to enable and configure:
1. Enable `Smart Grammar` first (master toggle).
2. Enable `Determiner Helper`.
3. Choose a style level (Simple / Standard / Expert).
4. Return to Main Screen — the grammar bar appears in tablet landscape mode.

#### Grid Long-Press Form Selection

The `Grid Long-Press Form Selection` toggle enables long-press on verbs and nouns in the symbol grid to open a form picker before adding the word to the message.

When enabled, long-pressing a verb opens a conjugation picker. Long-pressing a noun opens a declension picker (singular/plural forms).

**Verb Picker Style:** When both Smart Grammar and Grid Long-Press Form Selection are enabled, a style selector appears:

| Level | What it shows |
|-------|--------------|
| **Simple** | 4 most common verb forms |
| **Standard** | Pronoun × tense grid to pick a specific conjugation |
| **Expert** | All 14 verb forms in a scrollable list |

#### Pronoun Images

When Smart Grammar is enabled, a `Pronoun Images` section appears with 6 pronoun slots (I, You, He/She, We, You all, They). By default, each slot shows an emoji. You can replace any emoji with a custom photo (e.g., a picture of the user for "I", a picture of a caregiver for "You").

How to use:
1. Tap a pronoun slot to pick an image from your photo library.
2. The image replaces the default emoji.
3. Tap the red `✕` button on an image to remove it and restore the default emoji.

#### Grammar Test Runner

Tap `Run Grammar Tests` to validate the grammar engine against the built-in test suite for the current language. Results show passed/failed counts. Check console logs for detailed per-test output.

### 5.5 Fitzgerald Key

Features:
- color-coded grammar toggle
- legend viewer

How to use:
1. Enable color coding to show grammar colors on symbols.
2. Tap `View Color Legend` to understand color meanings.

### 5.6 Grid Mode (Activity/Core-Fringe)

Features:
- choose one grid mode:
- `Standard Symbol Grid`
- `Activity Boards`
- `Core-Fringe Grid`

How to use:
1. Open mode selector.
2. Choose the mode matching communication workflow.
3. Return to Main Screen to use the selected mode.

### 5.7 Share

Features:
- show/hide share button in main toolbar

How to use:
1. Enable to expose share action in the communication toolbar.
2. Disable to hide it.

### 5.8 About

Shows:
- app name
- app version
- short product description

---

## 6. Content Tab

The Content tab manages vocabulary entities and grid content.

Sub-tabs:
- `Symbols`
- `Abbreviations`
- `Phrases`
- `Categories`
- `Irregular Nouns`
- `Irregular Verbs`
- `Activity Boards`
- `Core-Fringe Layouts`

## 6.1 Symbols

Main features:
- search symbols by label
- filter chips:
- `All`
- `Favorites`
- category chips with item counts
- add/edit/delete symbols
- toggle visibility (show/hide)
- toggle favorite state

Symbol row actions:
- Edit (pencil)
- Show/Hide (eye icon)
- Favorite (star icon)

Add/Edit Symbol modal fields:
- `Label` (required)
- auto emoji match preview from label
- `Spoken Text` (optional; defaults to label when saving)
- image from `Library` or `Camera`
- `Category` (required)
- `Language`
- `Favorite` toggle
- `Hide this symbol` toggle
- progressive metadata:
- position
- motor zone
- word type
- introduction level
- usage priority
- prerequisites
- Fitzgerald category override (or auto-derived)

Delete behavior:
- confirms deletion
- warns if symbol is used on activity boards
- warns if symbol is in favorites
- removes linked usages during cleanup

## 6.2 Abbreviations

Main features:
- search by shortcode or expanded text
- abbreviation count display
- add/edit/delete abbreviations

Add/Edit Abbreviation fields:
- `Shortcode` (required)
- `Expanded Text` (required)
- `Language`
- live preview (`shortcode -> expanded text`)

## 6.3 Phrases

Main features:
- search phrases
- filter by:
- `All`
- `Uncategorized`
- specific category chips
- add/edit/delete phrases

Add/Edit Phrase fields:
- phrase text (required)
- optional category
- language

## 6.4 Categories

Main features:
- view and manage vocabulary categories
- add/edit/delete categories

## 6.5 Irregular Nouns

Main features:
- view and manage irregular noun forms
- add/edit/delete irregular nouns

## 6.6 Irregular Verbs

Main features:
- view and manage irregular verb forms
- add/edit/delete irregular verbs

## 6.7 Activity Boards

Main features:
- search boards by title or description
- list of boards showing icon, title, grid size, button count, and pack source
- add/edit/delete boards

Board list row info:
- icon or image
- title
- columns count and button count
- description (if set)
- `From Pack` badge (if installed from a vocabulary pack)
- edit button (pencil)

Board Editor modal (tap edit or add):
- `Preview` — shows board icon/image, title, and grid size
- `Title` (required)
- `Description` (optional)
- `Icon/Image Picker` — three tabs: emoji picker, device image (camera/library), pack image (from installed packs)
- `Edit Grid` button (edit mode only) — navigates to Main Screen to edit the board's buttons
- `Grid Columns` stepper (2–8 columns)
- `Background Color` swatches
- `Info` section (edit mode only) — shows board key, language, and source pack
- `Delete` button (edit mode only)
- `Cancel` / `Save` footer buttons

**Tablet layout:** On tablet, the Board Editor modal uses a wide two-column layout (95% screen width, max 900px) so all content is visible without scrolling:
- **Left column:** preview (compact horizontal), title, description, grid columns, background color
- **Right column:** icon/image picker, Edit Grid button (edit mode), info section (edit mode)
- On phone, the modal uses the standard narrow single-column scrollable layout.

How to use:
1. Go to Admin -> Content -> Activity Boards.
2. Tap `Add Board` to create a new board, or tap the edit button on an existing board.
3. Fill in title, choose an icon or image, set grid columns and background color.
4. Tap `Save`.
5. To edit the board's buttons, tap `Edit Grid` in the editor — this navigates to the Main Screen with the board in edit mode.

## 6.8 Core-Fringe Layouts

Main features:
- search layouts by name
- list of layouts showing icon, name, grid dimensions, page count, slot count, and active state
- active layout is highlighted with a green `Active` badge and sorted first
- add/edit/delete/activate layouts

Layout list row info:
- icon, image, or grid icon placeholder
- name
- grid dimensions (columns x rows), page count, slot count
- `From Pack` badge (if installed from a vocabulary pack)
- `Active` badge (if this is the currently active layout)
- edit button (pencil)

Layout Editor modal (tap edit or add):
- `Preview` — shows layout icon/image, name, and grid size
- `Name` (required)
- `Icon/Image Picker` — three tabs: emoji picker, device image (camera/library), pack image (from installed packs)
- `Grid Size` stepper (6–12 columns)
- `Edit Grid` button (edit mode only) — navigates to Main Screen to edit slots
- `Activate` button (edit mode only) — sets this layout as the active Core-Fringe layout
- `Manage Pages` — page tree management (create, edit, delete sub-pages)
- `Info` section (edit mode only) — shows layout key, language, and source pack
- `Delete` button (edit mode only)
- `Cancel` / `Save` footer buttons

**Tablet layout:** On tablet, the Layout Editor modal uses a wide two-column layout (95% screen width, max 900px) so all content is visible without scrolling:
- **Edit mode:**
  - **Left column:** preview (compact horizontal), name, grid size, icon/image picker
  - **Right column:** inline page tree with add/edit/delete actions, Edit Grid button, Activate button, info section
- **Create mode:**
  - **Left column:** preview (compact horizontal), name, grid size
  - **Right column:** icon/image picker
- The page tree is shown inline on tablet (instead of a separate Page Manager modal), allowing direct page management without opening a second modal.
- On phone, the modal uses the standard narrow single-column scrollable layout with a `Manage Pages` button that opens a separate Page Manager modal.

How to use:
1. Go to Admin -> Content -> Core-Fringe Layouts.
2. Tap `Add Layout` to create a new layout, or tap the edit button on an existing layout.
3. Fill in name, choose an icon or image, set grid size.
4. Tap `Save`.
5. To edit the layout's grid slots, tap `Edit Grid` — this navigates to the Main Screen with the layout in edit mode.
6. To set a layout as active, tap `Activate` in the editor.
7. To manage pages, use the inline page tree (tablet) or tap `Manage Pages` (phone) to add, edit, or delete sub-pages.

---

## 7. Language Tab

The Language tab has two functional sections:
- Progressive Vocabulary
- Vocabulary Management / Packs

## 7.1 Progressive Vocabulary

Features:
- enable/disable progressive unlocking
- current level card
- category progress card
- display options:
- ghost slots
- auto-advance
- expert vocabulary (available from higher levels)
- actions:
- check readiness
- reset progression

Readiness check modal provides:
- completion percentage
- usage statistics
- recommendation text
- words needing practice
- advance button when ready

## 7.2 Vocabulary Management And Packs

Features:
- language chip rail for active language context
- pack catalog with install state
- install/reinstall/upgrade actions
- stats panel (symbols, phrases, categories, languages)
- destructive maintenance actions

Built-in pack entries currently include:
- `core-basic-all-v1`
- `dutch-children-v1`
- `breakfast-children-v1`

Install result shows created counts (as available):
- concepts
- translations
- grammar entries
- phrases
- abbreviations
- activity boards
- core-fringe layouts

Destructive actions:
- `Clear All Vocabulary`
- removes symbols, translations, phrases, abbreviations, activity boards, core-fringe data, and pack records
- `Reset to Defaults`
- requires PIN verification
- clears custom data and reinstalls default core vocabulary

---

## 8. Users Tab

The Users tab manages user profiles. Each user has their own isolated database with separate settings, vocabulary, and content.

### 8.1 User List

The user list shows all profiles with:
- avatar (photo or initial)
- name
- age and diagnosis (if set)
- notes (if set)
- active badge on the current user

Tap a user row to switch to that user (with confirmation).

### 8.2 Edit Mode

Tap `Edit` in the action bar to enter edit mode:
- Tap a user row to open the profile editor (name, photo, age, diagnosis, notes)
- Tap the red `-` button to delete a user (cannot delete the active or last user)
- Tap `Duplicate` to clone the active user's data into a new profile

### 8.3 Add User (Standard)

Creates a new user with default settings. No setup wizard is shown.

How to use:
1. Tap `Add User (Standard)`.
2. Enter user name (required), optionally add photo, age, diagnosis, notes.
3. Tap `Save`.
4. The profile is created. Switch to it from the user list.
5. On first switch, default settings are applied and vocabulary is seeded automatically.

### 8.4 Add New User with Setup Wizard

Creates a new user with a full 11-step setup wizard that lets you configure all settings before the user is activated.

How to use:
1. Tap `Add New User with Setup Wizard`.
2. **Step 1 — User Profile**: Enter name (required), optionally add photo, age, diagnosis, notes. The `Next` button is disabled until a name is entered.
3. **Step 2 — Language**: Select the app language for this user.
4. **Step 3 — Grid Mode**: Choose standard, activity boards, or core-fringe grid.
5. **Step 4 — Voice**: Choose device voice or ElevenLabs.
6. **Step 5 — Fitzgerald Key**: Enable or disable color-coded grammar.
7. **Step 6 — Progressive Vocabulary**: Enable or disable progressive learning.
8. **Step 7 — Appearance**: Select theme and font size.
9. **Step 8 — Grid Layout**: Choose grid columns and landscape display mode.
10. **Step 9 — Grammar**: Configure smart grammar and inflection picker.
11. **Step 10 — PIN**: Optionally set a PIN for admin protection.
12. **Step 11 — Summary**: Review all selections.
13. Tap `Get Started` to finish.
14. The app creates the profile, applies all settings, and automatically switches to the new user.

You can navigate between steps using Back/Next buttons or by tapping the step indicator dots. Cancelling the wizard reverts any in-progress language change.

### 8.5 Duplicate User

Clones all data (settings, symbols, phrases, boards, layouts, packs) from the active user into a new profile.

How to use:
1. Enter edit mode.
2. Tap `Duplicate` on the active user's row.
3. Enter a name for the copy.
4. Tap `Save`.
5. Switch to the new profile to use it. All data is imported on first switch.

Note: You can only duplicate the currently active user.

### 8.6 Delete User

How to use:
1. Enter edit mode.
2. Tap the red `-` button on a user row.
3. Confirm deletion.

Restrictions:
- Cannot delete the active user (switch first).
- Cannot delete the last remaining user.

---

## 9. Tablet Landscape Specific UX

On tablet landscape:
- left sidebar selects main section (`Settings`, `Content`, `Language`, `Users`, `About`)
- context bar shows active language and current location
- settings/content/language each use internal left navigation and right detail panel

This layout is functionally equivalent to phone/tablet portrait, but optimized for faster navigation on wide screens.

---

## 10. Practical Notes And Limits

- Pack uninstall is not exposed as a direct button in current Admin UI.
- Some actions are language-scoped (content lists, device voice selection), while others are app-wide (theme, PIN, share toggle, voice provider, ElevenLabs settings).
- ElevenLabs requires an active internet connection for first-time phrase generation; cached phrases play offline. If offline and uncached, device TTS is used automatically.

---

## 11. Quick Task Recipes

### Add a new custom symbol
1. Admin -> Content -> Symbols.
2. Tap `+ Add Symbol`.
3. Fill label/category/language (and optional media/settings).
4. Tap `Save`.

### Enable PIN protection
1. Admin -> Settings -> Security.
2. Turn on `PIN Protection`.
3. Set PIN in modal.

### Install a vocabulary pack
1. Admin -> Language -> Vocabulary Management.
2. Find pack card.
3. Tap `Install Pack`.
4. Review success summary alert.

### Set up ElevenLabs voice
1. Admin -> Settings -> Voice.
2. Switch provider toggle to `ElevenLabs`.
3. Enter your API key and tap `Save`.
4. Once validated, tap `Select Voice` and choose a voice.
5. Adjust speed if desired.
6. Return to Main Screen — speech now uses ElevenLabs.

### Create a new user with custom settings
1. Admin -> Users.
2. Tap `Add New User with Setup Wizard`.
3. Enter the user's name and optional details.
4. Walk through all setup steps (language, grid mode, voice, appearance, etc.).
5. Tap `Get Started` on the summary step.
6. The app creates the profile and switches to the new user automatically.

### Enable the Grammar Bar (Determiner Helper)
1. Admin -> Settings -> Grammar.
2. Enable `Smart Grammar`.
3. Enable `Determiner Helper`.
4. Choose a style level (Simple for beginners, Standard for everyday use, Expert for therapists).
5. Return to the Main Screen in tablet landscape — the grammar bar appears between the top bar and category tabs.
6. Tap a noun on the grid, then tap an article on the grammar bar — the article is automatically inserted before the noun.

### Switch to Core-Fringe mode
1. Admin -> Settings -> Grid Mode.
2. Select `Core-Fringe Grid`.
3. Return to Main Screen to use it.
