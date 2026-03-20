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
- Phone portrait: top tabs (`Settings`, `Content`, `Language`, `Users`).
- Phone landscape: compact sidebar + content panel. The sidebar (left, ~200px) contains a back button, language flag, navigation items (`Settings`, `Content`, `Language`, `Users`, `About`), and a progression status chip. The content panel (right, flex) shows the selected tab's content. No top tab bar or header — all navigation is in the sidebar, maximizing vertical content space. In `Language`, a compact internal switcher lets you show either `Progression` or `Language Packs`, so the phone landscape layout does not stack both long sections at once.
- Tablet portrait: top tabs.
- Tablet landscape: sidebar (300px) + context bar + content panel.

Common controls:
- `Back` button: return to previous screen (in header on portrait, in sidebar on landscape).
- Language flag button: quick language switch (in header on portrait, in sidebar on landscape).

Main areas:
- `Settings`
- `Content`
- `Language`
- `Users`

Phone landscape and tablet landscape add a direct `About` tab in the sidebar.

---

## 4. Global Language Switch (Header Flag)

Tap the flag in the header to open language selection.

What it does:
- changes current app/admin language context
- reloads language-scoped content lists (symbols, phrases, abbreviations)
- for `en`, `nl`, `es`, and `fr`: if core pack is missing, app attempts auto-install of `BasePackV2`

If language change fails, an error alert appears.

---

## 5. Settings Tab

The Settings tab contains operational app settings (not content records).

### 5.1 Voice

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

### 5.2 Input Mode

Features:
- switch between `Symbol Only` and `Text` communication mode

How to use:
1. Tap `Communication Mode` to open the mode picker.
2. Choose `Symbol Only` (default) or `Text`.
   - **Symbol Only**: The main screen shows the symbol grid, message builder, and prediction bar — the standard AAC experience.
   - **Text**: The main screen shows a text-based interface with keyboard input, quick phrases, abbreviation shortcuts, and phrase categories.
3. Return to the Main Screen. The selected mode takes effect immediately.

The input mode is per-user and persists across sessions.

### 5.3 Grid Mode (Activity/Core-Fringe)

Features:
- choose one grid mode:
- `Standard Symbol Grid`
- `Activity Boards`
- `Core-Fringe Grid`

How to use:
1. Open mode selector.
2. Choose the mode matching communication workflow.
3. Return to Main Screen to use the selected mode.

### 5.4 Appearance

Features:
- theme selector (`Light`, `Dark`, `High Contrast`, `Child Friendly`)
- landscape display mode (`Composer Only` or `Message Builder Only`)
- grid size picker
- symbol font size picker
- grammar strip toggle (shows/hides the grammar bar in landscape mode)
- edit button toggle (shows/hides the edit button on the main screen)
- Word Finder toggle (shows/hides the Word Finder search button on the main screen)

How to use grid and font preview:
1. Tap `Grid Size` or `Symbol Font Size`.
2. You are routed to Main Screen preview overlay.
3. Select a value.
4. Tap `Apply` to keep or `Cancel` to revert.
5. App navigates back to Admin Settings.

### 5.5 Grammar

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

### 5.6 Fitzgerald Key

Features:
- color-coded grammar toggle
- legend viewer

How to use:
1. Enable color coding to show grammar colors on symbols.
2. Tap `View Color Legend` to understand color meanings.

### 5.7 Share

Features:
- show/hide share button in main toolbar

How to use:
1. Enable to expose share action in the communication toolbar.
2. Disable to hide it.

### 5.8 Security

Features:
- `PIN Protection` on/off
- `Change PIN` (visible when PIN is enabled)

How to use:
1. Enable PIN to protect Admin access.
2. Set a new PIN in the PIN modal.
3. To disable PIN, confirm the warning prompt.

### 5.9 Backup & Export

Features:
- create portable `.vbaac` backup of user data
- restore from a `.vbaac` backup file

How to use:
1. Tap `Create Backup` to export the current user's data.
2. Tap `Restore Backup` to import data from a `.vbaac` file.

Backups include settings, symbols, phrases, abbreviations, activity boards, core-fringe layouts, and embedded images (up to 5 MB per image).

### 5.10 About

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

## 6.5 Irregular Nouns## 6.4 Categories

Main features:
- view and manage vocabulary categories
- add/edit/delete categories

Main features:
- search irregular nouns by label or plural form
- noun count display
- add/edit/delete irregular nouns

Noun list row info:
- singular form (highlighted)
- plural form or `Uncountable` badge
- edit button (pencil)

Add/Edit Irregular Noun modal fields:
- `Singular` (required)
- `Language`
- `Type` selector: `Irregular Plural` or `Uncountable`
- `Plural Form` (required when type is Irregular Plural)

## 6.6 Irregular Verbs

Main features:
- search irregular verbs by infinitive or conjugated form
- verb count display
- add/edit/delete irregular verbs

Verb list row info:
- infinitive form (highlighted)
- exception count badge (e.g., `15 forms`)
- auxiliary verb indicator (if set, e.g., `(hebben)` or `(zijn)`)
- edit button (pencil)

Add/Edit Irregular Verb modal fields:
- `Infinitive` (required)
- `Language` selector
- `Auxiliary Verb` selector (language-dependent, e.g., `hebben`/`zijn` for Dutch)
- `Exception Forms` — a list of conjugation slots with text inputs for each form. Slots are language-specific:
  - **Dutch:** hele werkwoord, ik-vorm, jij-vorm, hij/zij-vorm, wij-vorm, jullie-vorm, zij-vorm (mv), verleden tijd (ik/jij/hij/wij/jullie/zij), voltooid deelwoord
  - **English:** infinitive, present tenses, past tenses, past participle
  - **Spanish:** full present/past/future/conditional/subjunctive/imperative paradigm
- at least one exception form is required to save

**Tablet layout:** On tablet, the editor uses a two-column layout — verb settings on the left, exception forms on the right.

**Data source:** Irregular verb exceptions are imported from vocabulary packs during installation. The pack's grammar data is automatically synced to the database. If exceptions appear missing after a pack update, reinstall the pack from Admin -> Language -> Vocabulary Management to re-sync the grammar data.

## 6.7 Activity Boards

Main features:
- search boards by title or description
- list of boards showing icon, title, grid size, button count, and pack source
- add/edit/delete boards

Board list row info:
- icon or image (pack images from vocabulary packs are fully resolved and displayed as thumbnails)
- title
- columns count and button count
- description (if set)
- `From Pack` badge (if installed from a vocabulary pack)
- edit button (pencil)

Board Editor modal (tap edit or add):
- `Copy from existing board` (create mode only) — select an existing board to copy. Pre-fills title (as "Copy of {original}"), description, icon/image, grid columns, and background color. On save, all buttons from the source board are duplicated onto the new board. You can modify any field before saving.
- `Preview` — shows board icon/image, title, and grid size
- `Title` (required)
- `Description` (optional)
- `Icon/Image Picker` — three tabs: emoji picker, device image (camera/library), pack image (from installed packs). The pack image tab includes a search field to filter images by label.
- `Edit Grid` button (edit mode only) — navigates to Main Screen to edit the board's buttons
- `Grid Columns` stepper (2–8 columns)
- `Background Color` swatches
- `Info` section (edit mode only) — shows board key, language, and source pack
- `Delete` button (edit mode only)
- `Cancel` / `Save` footer buttons

**Two-column layout (tablet and phone landscape):** On tablet and phone landscape, the Board Editor modal uses a wide two-column layout so all content is visible without scrolling:
- **Left column:** preview (compact horizontal), title, description, grid columns, background color
- **Right column:** icon/image picker, Edit Grid button (edit mode), info section (edit mode)
- On phone portrait, the modal uses the standard narrow single-column scrollable layout.

**Edit mode visual indicators:** When editing a board's grid on the Main Screen, all symbol cells show dashed borders to signal that the grid is editable. Empty cells show a blue dashed border with a `+` icon. Selecting a cell for moving highlights it with a solid blue border. When you exit edit mode (tap the checkmark), borders return to solid and the grid becomes non-editable.

How to use:
1. Go to Admin -> Content -> Activity Boards.
2. Tap `Add Board` to create a new board, or tap the edit button on an existing board.
3. Optionally tap `Select a board to copy` to duplicate an existing board (create mode only). This pre-fills all fields and copies all buttons on save. You can clear the selection with the `✕` button.
4. Fill in title, choose an icon or image, set grid columns and background color.
5. Tap `Save`.
6. To edit the board's buttons, tap `Edit Grid` in the editor — this navigates to the Main Screen with the board in edit mode.

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
- `Icon/Image Picker` — three tabs: emoji picker, device image (camera/library), pack image (from installed packs). The pack image tab includes a search field to filter images by label.
- `Grid Size` stepper (6–12 columns)
- `Edit Grid` button (edit mode only) — navigates to Main Screen to edit slots
- `Activate` button (edit mode only) — sets this layout as the active Core-Fringe layout
- `Manage Pages` — page tree management (create, edit, delete sub-pages)
- `Info` section (edit mode only) — shows layout key, language, and source pack
- `Delete` button (edit mode only)
- `Cancel` / `Save` footer buttons

**Two-column layout (tablet and phone landscape):** On tablet and phone landscape, the Layout Editor modal uses a wide two-column layout with both columns independently scrollable:
- **Edit mode:**
  - **Left column:** preview (compact horizontal), name, grid size, icon/image picker
  - **Right column:** inline page tree with add/edit/delete actions, Edit Grid button, Activate button, info section
- **Create mode:**
  - **Left column:** preview (compact horizontal), name, grid size
  - **Right column:** icon/image picker
- The page tree is shown inline (instead of a separate Page Manager modal), allowing direct page management without opening a second modal.
- On tablet: 95% screen width, max 900px. On phone landscape: 95% width, max 760px, with reduced padding and a shorter page tree scroll area to fit the limited vertical space. The modal uses a fixed height (95%) to ensure the footer (delete/cancel/save) always stays visible.
- On phone portrait, the modal uses the standard narrow single-column scrollable layout with a `Manage Pages` button that opens a separate Page Manager modal.

### Page Editor (sub-page editing)

When editing or creating a sub-page (via the page tree or Page Manager modal), the Page Editor provides:
- `Title` (required)
- `Parent Page` selector — choose which page this sub-page belongs to (dropdown of all available pages)
- `Icon/Image Picker` — three tabs: emoji picker, device image (camera/library), pack image (from installed packs). The pack image tab includes a search field to filter images by label.
- `Edit Grid` button (edit mode only) — navigates directly to the Main Screen with the sub-page's grid open in edit mode, allowing you to add and arrange slots for that specific page without manually navigating to it first.

**Page metadata sync:** When you update a page's title, icon, or image, the change is automatically synced to all category link tiles on the grid that point to that page. This means the folder tiles on the Main Screen always reflect the latest page metadata without manual slot editing.

### Sub-page navigation on Main Screen

When using Core-Fringe mode on the Main Screen:
- Sub-pages appear as folder tiles on the grid. Tapping a folder tile navigates into that sub-page's grid.
- When you create a new sub-page (via Manage Pages or the inline page tree), a category link tile is automatically placed in the first available slot on the parent page's grid. If the parent page has no free slots, an alert "No Free Slot" is shown — the sub-page is still created, but you must manually add the link tile.
- Auto-created navigation buttons: sub-pages automatically get a `Home` button (returns to the root page) and a `Back` button (returns to the parent page) placed in the last row of the grid (first and second column).
- Newly created sub-pages are immediately navigable — the grid reactively updates when pages are added or modified.
- **Auto-parenting from main screen**: When you create a category link on the main screen pointing from a non-root page to another page (e.g. by dropping a page tile onto a slot), the target page is automatically moved under the linking page in the admin hierarchy — provided the target page is still at its default location (no parent, or directly under the root). If the target already has a specific non-root parent, it is left unchanged. This means the page tree in Manage Pages stays consistent with the visual link structure on the main screen without manual re-parenting.
- **Page tree refresh**: The Manage Pages hierarchy automatically refreshes when you return to the admin screen after editing on the main screen, so hierarchy changes are always current.

**Edit mode visual indicators:** When editing a layout's grid on the Main Screen, all symbol cells show dashed borders to signal that the grid is editable. Empty cells show a blue dashed border with a `+` icon. Selecting a cell for moving highlights it with a solid blue border. When you exit edit mode (tap the checkmark), borders return to solid and the grid becomes non-editable.

How to use:
1. Go to Admin -> Content -> Core-Fringe Layouts.
2. Tap `Add Layout` to create a new layout, or tap the edit button on an existing layout.
3. Fill in name, choose an icon or image, set grid size.
4. Tap `Save`.
5. To edit the layout's grid slots, tap `Edit Grid` — this navigates to the Main Screen with the layout in edit mode.
6. To set a layout as active, tap `Activate` in the editor.
7. To manage pages, use the inline page tree (tablet) or tap `Manage Pages` (phone) to add, edit, or delete sub-pages.
8. To edit a specific sub-page's grid directly, open the page editor for that page and tap `Edit Grid` — this navigates to the Main Screen with that sub-page's grid open in edit mode.

---

## 7. Language Tab

The Language tab has two functional sections:
- Progressive Vocabulary
- Vocabulary Management / Packs

## 7.1 Progressive Vocabulary

Progressive vocabulary is **per-user** — each user profile has its own progression level, word usage stats, and history stored in their isolated database.

Features:
- enable/disable progressive unlocking
- current level card
- category progress card
- display settings:
  - ghost slots (show/hide locked word previews with lock icons)
  - auto-advance (automatically advance when ready vs. manual only)
  - hide locked word popup (suppress the alert when tapping a locked word)
  - expert vocabulary (available at level 5+; unlocks 200 additional words for 500 total)
  - mastery threshold stepper (50%–100% in 5% steps; percentage of words that must be mastered to advance; reset to default available)
  - min uses per word stepper (1–10; number of times each word must be used to count as mastered; reset to default available)
- actions:
  - check readiness
  - reset progression

How to use:
1. Enable `Progressive Vocabulary` to activate gradual word unlocking.
2. The **Current Level & Grid Size** card shows your level, unlocked word count, and grid dimensions.
3. The **Progress by Category** card shows per-category unlocked/total counts.
4. Adjust **Display Settings** to customize the learning experience:
   - Enable **Show Ghost Slots** to see locked words as ghosted previews with lock icons.
   - Enable **Auto-Advance Levels** to automatically unlock the next level when ready.
   - Enable **Hide Locked Word Popup** to suppress the alert shown when tapping a locked word.
   - **Mastery Threshold** controls how many words (%) must be mastered before advancing. Use +/− to adjust in 5% steps, or tap `Reset` to restore the default.
   - **Min Uses Per Word** controls how many times a word must be used to count as mastered. Use +/− to adjust, or tap `Reset` to restore the default.
   - At level 5+, **Expert Vocabulary** appears — enable it to unlock 200 additional expert words (500 total).
5. Tap **Check Readiness** to open the readiness check modal.
6. Tap **Reset Progression** to reset all words back to Level 1 (with confirmation).

### Readiness Check Modal

The readiness check modal shows your progress toward the next level:
- status emoji and title (Keep Going / Making Progress / Almost There / You're Ready) based on completion percentage
- progress circle with completion percentage
- current level → next level indicator
- stats: words used, words mastered, total uses
- recommendation message
- words needing practice (up to 12 shown as chips, with "+N more" if there are more)

When ready:
- `Not Yet` button to close without advancing
- `Unlock Level N` button to advance to the next level

When not ready:
- `Continue Practicing` button to close and keep working

## 7.2 Vocabulary Management And Packs

Features:
- language chip rail for active language context
- pack catalog with install state
- install/reinstall/upgrade actions
- stats panel (symbols, phrases, categories, languages)
- destructive maintenance actions

Built-in pack entries currently include:
- `BasePackV2` — Base Vocabulary Pack V2 (6,500+ concepts in EN, NL, FR, ES)
- `dutch-children-v1` — Nederlands voor Kinderen (150 concepts)
- `breakfast-children-v1` — Children's Daily Activities (57 concepts, phrases, abbreviations, activity boards)

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

## 9. Landscape Specific UX

### Tablet Landscape
- Left sidebar (300px) selects main section (`Settings`, `Content`, `Language`, `Users`, `About`)
- Context bar shows active language and current location
- Settings/content/language each use internal left navigation and right detail panel

### Phone Landscape
- Compact left sidebar (~200px) with back button, language flag, navigation items, and progression status
- Content panel fills the remaining width
- No top tab bar or header row — all chrome is in the sidebar, maximizing vertical space for content
- In `Language`, a compact top switcher toggles between `Progression` and `Language Packs`, and only one section is shown at a time
- Editor modals (Layout Editor, Board Editor) use a two-column layout with scrollable columns, matching the tablet experience in a more compact form

Both landscape layouts are functionally equivalent to phone/tablet portrait, but optimized for faster navigation on wide screens.

---

## 10. Practical Notes And Limits

- Pack uninstall is not exposed as a direct button in current Admin UI. When a pack is uninstalled programmatically (e.g., via `Clear All Vocabulary` or `Reset to Defaults`), all associated symbols, translations, favorites, lemmas, activity boards, core-fringe layouts, and pack records are removed.
- Some actions are language-scoped (content lists, device voice selection), while others are app-wide (theme, PIN, share toggle, voice provider, ElevenLabs settings).
- ElevenLabs requires an active internet connection for first-time phrase generation; cached phrases play offline. If offline and uncached, device TTS is used automatically.
- Input Mode is per-user. Switching to a different user restores that user's input mode setting.
- Progressive vocabulary is per-user. Each user has their own level, word usage stats, and progression history stored in their isolated database. User A can be at level 5 while User B is at level 3.
- Word Finder is available in Core-Fringe and Activity Board modes only (not in Standard grid mode). It searches all symbols in the current layout and shows navigation paths to reach them.

---

## 11. Quick Task Recipes

### Add a new custom symbol
1. Admin -> Content -> Symbols.
2. Tap `+ Add Symbol`.
3. Fill label/category/language (and optional media/settings).
4. Tap `Save`.

### Switch to text mode
1. Admin -> Settings -> Input Mode.
2. Tap `Communication Mode`.
3. Select `Text`.
4. Return to Main Screen — the text-based interface is now active.

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

### Add a sub-page and have it appear automatically in the grid
1. Admin -> Content -> Core-Fringe Layouts.
2. Open the layout editor (edit button).
3. In the page tree (tablet inline or via `Manage Pages` on phone), tap `Add Sub-Page`.
4. Enter a title and optional icon/image. The parent page is pre-set to the current page.
5. Tap `Save`.
6. A link tile is automatically placed in the first free slot on the parent page's grid.
   If no slot is free, an alert notifies you and you must add the link manually.

### Use Word Finder to locate a symbol
1. On the Main Screen (in Core-Fringe or Activity Board mode), tap the search icon in the toolbar.
2. Type a word in the search field.
3. Results show each matching symbol with its navigation path (e.g., "2 taps away", "Always visible", "On this page").
4. Symbols locked by progressive vocabulary show "Available at Level N" and cannot be selected.
5. Tap a result to start step-by-step guidance — the grid highlights each cell to tap in sequence until you reach the target symbol.
6. To cancel guidance, tap the cancel button on the guidance bar.

### Enable/disable the Word Finder button
1. Admin -> Settings -> Appearance.
2. Toggle `Word Finder` on or off.
3. When enabled, a search button appears in the main screen toolbar (Core-Fringe and Activity Board modes only).

### Adjust progressive vocabulary mastery requirements
1. Admin -> Language -> Progressive Vocabulary.
2. Under **Display Settings**, adjust **Mastery Threshold** (50%–100%) and **Min Uses Per Word** (1–10) using the +/− steppers.
3. Tap `Reset` next to either stepper to restore the default value.
4. These settings control how strict the readiness check is before allowing level advancement.

### Understand why a page appears at the wrong level in the hierarchy
The page tree is based on `parentPageId`, which is set when a page is created or when a category link is drawn on the main screen. If a page appears at root level but you expected it to be nested:
- Check that a link tile on the parent page actually points to it (edit mode → long-press the tile → Link Editor).
- If needed, open the Page Editor for the page (pencil icon in the tree) and set the correct parent page manually using the `Parent Page` dropdown.
