# VoiceBridgeAAC - Architecture Overview

## What is VoiceBridgeAAC?

VoiceBridgeAAC is a React Native mobile application designed for Augmentative and Alternative Communication (AAC). It helps people with speech difficulties communicate using symbol-based language, text-to-speech, and predictive text features.

The app supports multiple languages (English, Dutch, Spanish, Italian, French) and provides an intuitive interface for building messages through symbol selection and text input. Key features include a progressive vocabulary learning system, smart grammar engine, activity boards (schematic mode), Core-Fringe grid mode, Word Finder (guided symbol search), a first-launch setup wizard, self-contained vocabulary packs, and multi-user profile management.

---

## High-Level Architecture

### Core Architecture Pattern: Component-Based with Services

```
┌─────────────────────────────────────────────────────────────┐
│                    VoiceBridgeAAC                           │
├─────────────────────────────────────────────────────────────┤
│  📱 Presentation Layer (Screens & Components)              │
│  🔄 State Management (Redux + Context)                     │
│  🪝 Custom Hooks (State & Operations)                      │
│  🔧 Service Layer (Voice, Grammar, Packs, Settings)        │
│  💾 Data Layer (WatermelonDB v25)                          │
│  🎨 Theme System (Light/Dark, High Contrast)               │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow

```
User Action → Component → Hook → Service → Database → Redux → UI Update
```

---

## Presentation Layer

### Main Screens

| Screen | Purpose | Key Features |
|--------|---------|--------------|
| **MainScreen** | Primary communication interface | Symbol grid or text mode, message builder, prediction bar, TTS |
| **TextModeScreen** | Text-based communication | Keyboard input, quick phrases, abbreviation shortcuts, phrase categories |
| **WelcomeScreen** | First-launch overlay | Shows SetupWizard on first run |
| **AdminScreen** | Content management | Symbol/phrase/abbreviation/board CRUD, pack installation, user profiles |
| **SettingsScreen** | User configuration | Input mode, theme, progressive vocabulary, grammar, security |

#### MainScreen (`src/screens/main/`)

- **Phone Layout** (`MainScreenPhone.tsx`): Portrait-locked layout for phones
- **Tablet Layout** (`MainScreenTablet.tsx`): Landscape-locked layout for tablets
- **Shared Components** (`components/`): Extracted shared logic used by both layouts:
  - `useDerivedMainScreenState` — derived booleans (isFavorites, isStandardMode, showEditToggle, isGridEditMode)
  - `MainScreenModals` — shared modal layer (PIN, progression, grammar pickers, font size)
  - `CategoryBar` — horizontal category/subcategory scroll bar (parameterized `iconSize` for phone vs tablet)
  - `BoardEditBar` — header bar for admin board edit mode (board title + Done button)
- **useMainScreenState Hook**: Message building, symbol selection, speech synthesis, settings reload
- **Orientation Locking** (`useTabletLandscapeLock`): Tablets locked to landscape, phones locked to portrait
- **Symbol Grid**: Progressive grid with configurable columns (6-12) and motor zone preservation
- **Message Builder**: Visual strip showing selected symbols
- **Prediction Bar**: Smart word suggestions
- **Grammar Strip**: Multi-language grammar word chips (articles, demonstratives, possessives, prepositions) with gender-aware dimming and smart insertion
- **WelcomeScreen overlay**: On first launch (`welcome_completed` not set), a modal overlay renders the SetupWizard while DB initialization proceeds in the background
- **Input Mode Routing**: MainScreen reads the `input_mode` setting (`symbol_only` or `text`) and conditionally renders the symbol grid (default) or TextModeScreen. The mode is re-read on focus via `useFocusEffect` to detect admin changes, with a `useRef` guard to skip the initial mount read.

#### TextModeScreen (`src/screens/main/TextModeScreen.tsx`)

Text-based communication alternative to the symbol grid, optimized for users who prefer keyboard input:

- **TextModeScreen**: Router that detects device type and renders phone or tablet layout
- **TextModePhone** (`TextModePhone.tsx`): Single-column layout with KeyboardAvoidingView
- **TextModeTablet** (`TextModeTablet.tsx`): Two-column layout with full-width composer
- **useTextModeState Hook** (`useTextModeState.ts`): Core state — Redux message, phrases from DB (top 10 quick phrases, categories), abbreviations, TTS via voiceService, admin navigation with PIN, share
- **Text Mode Components** (`src/components/textmode/`):
  - `TextComposerBar` — Large text input with speak/stop/backspace/share toolbar
  - `QuickPhraseStrip` — Horizontal scroll of frequently-used phrase chips
  - `PhraseCategoryRow` — Horizontal scroll of category cards (folder icon, name, count)
  - `PhrasePickerSheet` — Modal bottom sheet with FlatList of phrases per category
  - `ShortcutStrip` — Abbreviation shortcode chips for quick text expansion

#### SetupWizard (`src/screens/SetupWizard/`)

A 10-step onboarding wizard shown on first launch:

| Step | Component | Purpose |
|------|-----------|---------|
| 1 | **WelcomeLanguageStep** | Language selection (applies immediately to i18n) |
| 2 | **GridModeStep** | Choose grid mode (standard, schematic, corefringe) |
| 3 | **VoiceProviderStep** | Choose TTS provider (device or ElevenLabs) |
| 4 | **FitzgeraldStep** | Enable/disable Fitzgerald Key color coding |
| 5 | **ProgressiveVocabularyStep** | Enable/disable progressive vocabulary learning |
| 6 | **AppearanceStep** | Theme and font size |
| 7 | **GridLayoutStep** | Grid columns (6-12) and landscape display mode |
| 8 | **GrammarStep** | Smart grammar and inflection picker toggles |
| 9 | **PinSetupStep** | Optional PIN protection for admin settings |
| 10 | **SummaryStep** | Review all selections before finishing |

- **useSetupWizardState Hook**: Manages all wizard selections with stable setters
- **StepIndicator / WizardNavButtons**: Reusable navigation components (`WizardNavButtons` accepts optional `nextDisabled` prop)
- **OptionCard**: Shared selection card used across all steps
- On finish: persists all settings to DB, marks `welcome_completed`, and auto-imports the core vocabulary pack in the background

#### NewUserWizardModal (`src/screens/SetupWizard/NewUserWizardModal.tsx`)

An 11-step wizard shown when creating a new user via "Add New User with Setup Wizard":

- **Step 0**: **ProfileInfoStep** — collects user profile info (name, photo, age, diagnosis, notes)
- **Steps 1-10**: All 10 setup wizard steps above (reused unchanged)
- Uses `useSetupWizardState` for wizard settings + local state for profile fields
- On finish: serializes profile data and wizard settings, calls parent's `onComplete` callback
- Parent (`UsersTab`) creates the profile with `pendingWizardSettings` JSON and auto-switches to the new user
- Settings are applied during `switchUser()` in `UserProfileContext` (deferred setup pattern)
- Reverts language change on cancel via `originalLanguageRef`

#### AdminScreen (`src/screens/AdminScreen/`)

- **ContentTab**: Sub-tab container (phone: SegmentedControl, tablet: sidebar)
  - **SymbolsSubTab**: Symbol CRUD with batch operations
  - **AbbreviationsSubTab**: Text shortcut management
  - **PhrasesSubTab**: Common phrase management
  - **CategoriesSubTab**: Category CRUD with 3-tab icon picker (Emoji / Device / Pack) — Pack tab lazy-loads all symbols with images from the DB (same pattern as `BoardEditorModal`), searchable by label, resets on language change
  - **IrregularNounsSubTab**: Irregular noun form management
  - **IrregularVerbsSubTab**: Irregular verb form management
  - **ActivityBoardsSubTab**: Activity board CRUD (create, edit, delete boards via BoardEditorModal; "Edit Grid" navigates to MainScreen in admin board edit mode)
  - **CoreFringeLayoutsSubTab**: Core-Fringe layout CRUD (create, edit, delete layouts via LayoutEditorModal; "Edit Grid" navigates to MainScreen in admin layout edit mode)
- **UsersTab**: Multi-user profile management (see [User Profile System](#7-user-profile-system))
- **Tablet Layout**: `AdminScreenTabletLandscapeLayout.tsx` with sidebar navigation (`ContentTabTabletLandscape.tsx`)

#### SettingsScreen (`src/screens/SettingsScreen/`)

Refactored modular architecture (2026):

| Section | Purpose |
|---------|---------|
| **InputModeSettings** | Switch between symbol-only and text input mode |
| **AppearanceSettings** | Theme and UI preferences |
| **ProgressiveVocabularySettings** | 6-level learning system configuration |
| **GrammarSettings** | Smart grammar enable/disable |
| **SchematicModeSettings** | Activity board configuration |
| **FitzgeraldSettings** | Fitzgerald Key color coding |
| **VocabularyManagementSettings** | Pack management UI |
| **VoiceSettings** | TTS provider selection (device / ElevenLabs) |
| **ShareSettings** | Message sharing configuration |
| **BackupExportSettings** | Data backup and export (with embedded images) |
| **SecuritySettings** | PIN protection |
| **AboutSection** | App information |

### Component Organization

```
src/screens/main/components/       # Shared MainScreen components
├── useDerivedMainScreenState.ts   # Derived booleans from MainScreenState
├── MainScreenModals.tsx           # All modals shared by Phone & Tablet
├── CategoryBar.tsx                # Category/subcategory scroll bar
├── BoardEditBar.tsx               # Admin board edit mode bar (title + Done button)
└── index.ts                       # Barrel export

src/components/
├── SymbolGrid.tsx              # Progressive symbol grid display
├── ProgressiveSymbolGrid.tsx   # Enhanced grid with level indicators
├── SymbolButton.tsx            # Individual symbol display
├── SymbolEditorModal.tsx       # Symbol editing modal
├── MessageBuilder.tsx          # Message composition
├── PredictionBar.tsx           # Word suggestions
├── GrammarStrip.tsx            # Dutch grammar word selection
├── PINModal.tsx                # Security PIN modal
├── LevelUpModal.tsx            # Level advancement celebration
├── ReadinessCheckModal.tsx     # Progression assessment
├── AbbreviationEditorModal.tsx # Abbreviation editing
├── PhraseEditorModal.tsx       # Phrase management
│
├── schematic/                  # Activity Boards (Schematic Mode)
│   ├── SchematicModeContainer.tsx  # Main orchestrator (accepts initialBoardId for admin edit)
│   ├── ActivityDashboard.tsx       # Board selection grid
│   ├── ActivityBoardView.tsx       # Board display
│   ├── SchematicGrid.tsx           # Grid layout renderer
│   ├── BoardButtonCell.tsx         # Grid cell button (React.memo with custom comparator)
│   ├── BoardEditorModal.tsx        # Board creation/editing (title, description, grid columns, background color, icon preview)
│   ├── BoardImagePickerModal.tsx   # Separate icon/image picker modal for boards (emoji/device/pack tabs, phone landscape-adaptive)
│   ├── ButtonEditorModal.tsx       # Button editing (emoji picker, image picker, pack image picker modal)
│   └── SymbolPickerModal.tsx       # Symbol selection
│
├── wordFinder/                 # Word Finder (Guided Symbol Search)
│   ├── WordFinderSearchModal.tsx   # Search modal with results list
│   ├── WordFinderGuidanceBar.tsx   # Step-by-step guidance bar above grid
│   └── index.ts                   # Barrel exports
│
├── corefringe/                 # Core-Fringe Grid Mode
│   ├── CoreFringeModeContainer.tsx # Main orchestrator
│   ├── CoreFringeGrid.tsx          # Fixed-position grid with nav buttons
│   ├── CoreFringeCell.tsx          # Memoized cell (React.memo)
│   ├── CoreFringeHeader.tsx        # Grid header
│   ├── IconPickerModal.tsx          # Shared icon/image picker modal for Core-Fringe (emoji/device/pack tabs, phone landscape-adaptive)
│   ├── SlotEditorModal.tsx         # Slot editing (emoji picker, image picker, pack image picker modal, Fitzgerald, category); link editing (emoji picker, image picker, pack image picker modal)
│   ├── LinkEditorModal.tsx         # Category link creation (emoji search/picker, image picker)
│   ├── PageManagerModal.tsx        # Page tree management
│   └── PageEditorModal.tsx         # Page create/edit (icon/image picker)
│
└── settings/                   # Reusable settings components
    ├── SettingItemSwitch.tsx
    ├── SettingItemButton.tsx
    ├── CollapsibleSection.tsx
    ├── ProgressCard.tsx
    ├── PackCard.tsx
    └── GridLayoutPreview.tsx
```

---

## State Management

### Redux Store (`src/store/`)

```typescript
{
  progressiveVocabulary: {
    currentLevel: number,           // 1-6
    wordStats: Record<string, WordStats>,
    levelMetrics: LevelProgressMetrics[],
    readinessAssessment: ReadinessAssessment,
    levelHistory: LevelHistoryEntry[],
    lastLevelChange: number
  },
  ui: {
    currentMessage: string,
    selectedPictograms: Symbol[],
    adminLocked: boolean,
    currentLanguage: string,
    editMode: boolean
  }
}
```

### Context APIs (`src/context/`)

| Context | Purpose |
|---------|---------|
| **ThemeContext** | Light/dark theme management |
| **AppAlertContext** | Global alert/notification system |
| **EditModeContext** | Admin edit mode state |
| **UserProfileContext** | Active user profile, user switching, profile list (`src/contexts/UserProfileContext.tsx`) |

### Cross-Screen Data Passing (`src/navigation/pendingAdminReturn.ts`)

Module-level variable store for passing edit IDs back to AdminScreen when returning from edit mode on MainScreen. React Navigation's nested param format (`{ screen: 'Content', params: { editLayoutId } }`) fails silently on tablets where `AdminScreenTabletLandscapeLayout` doesn't use a nested navigator. This store bypasses that issue:

- `setPendingEditLayoutReturn(id)` / `consumePendingEditLayoutReturn()` — for Core-Fringe layouts
- `setPendingEditBoardReturn(id)` / `consumePendingEditBoardReturn()` — for Activity Boards

**Tablet path**: `useMainScreenState` calls `setPending*()` before navigating; `AdminScreenTabletLandscapeLayout` consumes via `useFocusEffect` and sets the correct subtab + `initialEdit*Id` prop.

**Phone path**: Uses standard React Navigation nested params (`route.params.editLayoutId` / `route.params.editBoardId`) consumed by `ContentTab` via `useEffect`. The module-level store is **not** consumed on phones to avoid a race condition where `ContentTab` briefly mounts on tablets during nested param processing.

---

## Data Layer

### Database Architecture (WatermelonDB v25)

#### Core Tables

| Table | Purpose | Key Fields |
|-------|---------|------------|
| **symbols** | Vocabulary items | label, emoji, image_uri, language, category_id, position, motor_zone, introduction_level, source_pack_id, fitz_category, concept_key, gender_class |
| **symbol_translations** | Multi-language symbol data | symbol_id, language, label, spoken_text, infinitive, gender_class |
| **categories** | Symbol groupings | id, name, icon, image_uri, external_id, parent_category_id |
| **category_translations** | Multi-language category names | category_id, language, name |
| **favorites** | User's favorite symbols | symbol_id, language, created_at |
| **settings** | App configuration | key, value (JSON) |

#### Phrases & Abbreviations Tables

| Table | Purpose | Key Fields |
|-------|---------|------------|
| **phrases** | Common phrases | text, language, category_id, frequency, source_pack_id, phrase_key |
| **abbreviations** | Text shortcuts | shortcode, expanded_text, language, source_pack_id |

#### Grammar System Tables

| Table | Purpose | Key Fields |
|-------|---------|------------|
| **lemmas** | Word base forms | label, language, part_of_speech, sub_class, is_separable |
| **verb_exceptions** | Irregular verb forms | lemma_id, slot, form |
| **noun_exceptions** | Irregular plurals | lemma_id, form_type, form |
| **symbol_lemmas** | Symbol-grammar links | symbol_id, lemma_id |
| **grammar_audit_logs** | Grammar change history | action_type, symbol_id, from_form, to_form |

#### Vocabulary Pack Tables

| Table | Purpose | Key Fields |
|-------|---------|------------|
| **vocabulary_packs** | Pack metadata | pack_id, name, version, tier, languages (JSON), dependencies, installed_at |

#### Activity Board Tables

| Table | Purpose | Key Fields |
|-------|---------|------------|
| **activity_boards** | Themed activity contexts | title, grid_columns, grid_rows, icon, image_uri, order, language, source_pack_id, board_key |
| **board_buttons** | Grid button placements | board_id, symbol_id, row_index, column_index, link_to_board_id, is_link_button, link_label, link_icon |

#### Core-Fringe Grid Tables

| Table | Purpose | Key Fields |
|-------|---------|------------|
| **core_fringe_layouts** | Grid layout configuration | name, icon, image_uri, grid_columns, grid_rows, language, source_pack_id, layout_key, is_active |
| **core_fringe_pages** | Navigation pages within a layout | layout_id, parent_page_id, page_key, title, icon, image_uri, order |
| **core_fringe_slots** | Cell positions within a page | page_id, row_index, column_index, is_pinned, symbol_id, is_category_link, link_to_page_id, link_label, link_icon, link_image_uri, is_visible |

### Per-User Database Isolation

Each user profile gets its own WatermelonDB SQLite database file (e.g., `user_abc123`). The module-level database reference in `src/db/index.ts` uses a mutable `let` binding with `export { database }` to produce a live ES module getter. `reinitializeDatabase(dbName)` swaps the underlying instance — all modules importing `database` transparently read the current value.

A **user registry** stored as a JSON file via `expo-file-system` at `documentDirectory/user_registry.json` tracks profiles and the active user. On first launch after upgrade, a "Default User" profile is auto-created pointing to the existing `watermelon` database, preserving all data seamlessly.

**Deferred setup pattern:** Creating a new user profile only writes to the registry — no database operations occur. Database seeding and settings are deferred to the `switchUser` flow in `UserProfileContext`, which calls `reinitializeDatabase()` followed by a full React tree remount via `appKey` increment. This avoids swapping the shared database while components have active WatermelonDB observers. Three deferred modes are supported: `pendingImportUri` (duplicate via backup import), `pendingWizardSettings` (wizard settings JSON applied in batch), and `setupMode: 'standard'` (default settings only).

### First-Launch Initialization

On first launch, two things happen in parallel:

1. **WelcomeScreen** (`src/screens/WelcomeScreen.tsx`) detects `welcome_completed` is not set and shows the **SetupWizard** modal, allowing the user to configure language, grid mode, voice provider, Fitzgerald Key, progressive vocabulary, appearance, grid layout, grammar, and PIN. On finish it persists all settings, marks `welcome_completed`, and auto-imports the core vocabulary pack in the background.

2. **useMainScreenState** detects no categories in DB and calls `seedTestData()` (`src/db/seed.ts`) which:

1. **Installs core vocabulary pack** (`BasePackV2`) via `vocabularyPackService.installPack()`
   - Batch-creates ~34 categories, ~6,612 symbols, ~26,448 translations (4 languages) in one transaction
   - Batch-syncs grammar data (irregular verbs, noun plurals, symbol-lemma links)
2. **Updates pronoun word types** for Dutch and English (batched)
3. **Sets legacy migration flag** (`concept-based-full-imported-v1`) to skip obsolete normalization

On subsequent launches (categories exist), the existing-DB path runs any pending migrations
(pronoun updates, symbol normalization, pack upgrades, legacy pack cleanup) individually.

#### Legacy Pack Cleanup (`cleanupLegacyV1Pack`)

When `BasePackV2` replaced `base-pack-v1`, the old symbols were never removed because `uninstallPack` did not delete symbols. The two packs use completely different `concept_key` values, so ~3,240 V1 symbols accumulated alongside V2's ~6,612, causing 11k+ rows and slow admin queries. A one-time cleanup migration (`cleanup-base-pack-v1-done` settings key) removes all orphaned `base-pack-v1` symbols, translations, favorites, and lemma links.

### Database Schema Diagram

```
┌─────────────────┐    ┌─────────────────────┐
│   categories    │    │  vocabulary_packs   │
└────────┬────────┘    └──────────┬──────────┘
         │                        │ source_pack_id
         │ category_id            ▼
┌────────▼────────┐    ┌─────────────────────┐
│     symbols     │◄───│  symbol_translations│
│  (concept_key)  │    └─────────────────────┘
└────────┬────────┘
         │ symbol_id
         ▼
┌─────────────────┐    ┌─────────────────────┐
│  symbol_lemmas  │───►│       lemmas        │
└─────────────────┘    └──────────┬──────────┘
                                  │ lemma_id
                       ┌──────────┴──────────┐
                       ▼                      ▼
              ┌────────────────┐    ┌────────────────┐
              │ verb_exceptions│    │noun_exceptions │
              └────────────────┘    └────────────────┘

┌─────────────────┐         ┌─────────────────┐
│ activity_boards │◄────────│  board_buttons  │
│   (board_key)   │         │   (symbol_id)   │
└─────────────────┘         └─────────────────┘

┌───────────────────────┐
│  core_fringe_layouts  │
│    (layout_key)       │
└───────────┬───────────┘
            │ layout_id
            ▼
┌───────────────────────┐
│   core_fringe_pages   │──┐ parent_page_id
│     (page_key)        │◄─┘ (self-referencing)
└───────────┬───────────┘
            │ page_id
            ▼
┌───────────────────────┐
│   core_fringe_slots   │───► symbols (symbol_id)
│  (is_pinned, is_link) │───► core_fringe_pages (link_to_page_id)
└───────────────────────┘
```

---

## Service Layer

### Core Services (`src/services/`)

#### Vocabulary Pack Services

| Service | Purpose |
|---------|---------|
| **vocabularyPackService.ts** | Pack installation, versioning, dependencies |
| **vocabularyImporter.ts** | Import vocabulary data from packs |
| **packImageService.ts** | Image URI resolution (base64, bundled, local) |

#### Grammar Services

| Service | Purpose |
|---------|---------|
| **grammarSyncService.ts** | Sync grammar data from vocabulary packs |
| **vocabularyGrammarValidator.ts** | Validate vocabulary-grammar consistency |

#### Core Services

| Service | Purpose |
|---------|---------|
| **voiceService.ts** | Text-to-speech with multiple providers (device via Expo Speech, ElevenLabs API) |
| **settingsService.ts** | Key-value settings storage |
| **userProfileService.ts** | Multi-user registry CRUD (create, update, delete, switch, duplicate profiles) backed by `expo-file-system` JSON |
| **backupService.ts** | Full data backup/restore (.vbaac files) with embedded images |
| **vocabularyPersistenceService.ts** | Progressive vocabulary state persistence |
| **wordFinderService.ts** | Path-finding algorithms: search symbols, trace page/board hierarchy, compute shortest navigation path |
| **predictionEngine.ts** | Bigram-based word prediction |
| **emojiTranslationService.ts** | Multi-language emoji translation |

#### Voice Providers

| Provider | Implementation | Notes |
|----------|---------------|-------|
| **device** | Expo Speech (default) | Built-in, works offline |
| **elevenlabs** | ElevenLabs API (`eleven_flash_v2_5` model) | Requires API key, configurable voice ID and speed, 30s request timeout, falls back to device on failure |

### Service Pattern

```typescript
// Singleton pattern — services exported as module-level instances
class VocabularyPackService {
  async installPack(pack: VocabularyPack, options: InstallOptions): Promise<InstallResult> {
    // Validate pack & check dependencies
    // Batch-create categories (fresh install fast path)
    // Batch-create concepts + translations (prepareCreate + database.batch)
    // Batch-sync grammar data (lemmas, exceptions, symbol-lemma links)
    // Batch-import phrases, abbreviations
    // Batch-import activity boards, core-fringe layouts
    // Record pack installation
  }

  async uninstallPack(packId: string): Promise<void> {
    // Collects ALL records to delete (buttons, boards, slots, pages, layouts, pack record)
    // Executes in a single atomic database.batch() call
  }
}
export const vocabularyPackService = new VocabularyPackService();
```

### Error Handling Patterns

- **CRUD operation hooks** (`useCoreFringeOperations`, `useActivityBoardOperations`, `useSymbolOperations`): All operations wrapped in try-catch with tagged console.error logging and error re-throw
- **Cascade deletions** (`deleteBoard`, `deletePage`, `uninstallPack`): Use `prepareDestroyPermanently()` + `database.batch()` for atomic all-or-nothing deletion
- **Network calls** (`elevenLabsService`): All fetch calls use `AbortController` with configurable timeouts (15s for voice list, 30s for TTS generation)
- **Backup image embedding**: File size limit (5 MB) prevents OOM on large images; oversized files are skipped with a warning
- **Global error boundary** (`ErrorBoundary` component in `App.tsx`): Catches unhandled render errors and shows recovery UI instead of white screen crash
```

---

## Custom Hooks (`src/hooks/`)

### Vocabulary Management Hooks

| Hook | Purpose |
|------|---------|
| **useVocabularyPacks()** | Pack installation/management state |
| **useProgressiveVocabulary()** | Complete 6-level progression system |
| **useVocabularyManagement()** | Symbol CRUD operations |
| **useProgressiveVocabularySettings()** | Progressive vocabulary feature flags |

### Symbol Operation Hooks

| Hook | Purpose |
|------|---------|
| **useSymbolOperations()** | Create/update symbols |
| **useSymbolDeletion()** | Delete symbols with cascade cleanup |

### Activity Board Hooks

| Hook | Purpose |
|------|---------|
| **useActivityBoardOperations()** | Create/update/delete boards (with icon and image support) |
| **useSchematicMode()** | Activity board mode state and navigation |
| **useBoardOperations()** | Board button CRUD (create/update/delete/move buttons) |

### Core-Fringe Hooks

| Hook | Purpose |
|------|---------|
| **useCoreFringeMode()** | Core-Fringe grid state, layout/page/slot observers, navigation stack |
| **useCoreFringeOperations()** | CRUD operations, `copyLayoutToGridSize()`, slot editing. `createPage()` returns `{ pageId, linkCreated }` — when `parentPageId` is provided, automatically finds the first free slot on the parent and creates a category link; `linkCreated: false` means parent grid was full. `copyPage()` inherits the source page's `parentPageId` (previously hardcoded to root). |

### Word Finder Hooks

| Hook | Purpose |
|------|---------|
| **useWordFinder()** | Search state, guidance state, step advancement, cancel; integrates with `wordFinderService` |

### Utility Hooks

| Hook | Purpose |
|------|---------|
| **useSettingsState()** | Reactive settings updates (includes `inputMode` / `setInputMode`) |
| **useTextModeState()** | Text mode state: message, phrases, abbreviations, TTS, admin nav |
| **useDeviceType()** | Device type detection (phone/tablet) |
| **useDeviceFeatures()** | Combines device type with feature availability config (see Device Feature Configuration) |
| **useTabletLandscapeLock()** | Orientation locking (tablets→landscape, phones→portrait) |
| **useGridLayout()** | Shared cell sizing: returns separate `cellWidth`/`cellHeight` for rectangular cells when height-constrained (e.g., grammar bar visible) |

### Device Feature Configuration (`src/config/deviceFeatures.ts`)

A static, non-React module that declares which features are available per device form factor (phone vs tablet). This is the single source of truth for feature availability — use it instead of ad-hoc `isTablet` checks when the conditional is about **whether a feature should exist**, not about layout/styling.

| Feature Flag | Tablet | Phone | Description |
|-------------|--------|-------|-------------|
| `grammarStrip` | Yes | No | Grammar strip bar — requires landscape width |
| `wordFinder` | Yes | No | Word Finder search + guidance — requires landscape space |
| `landscapeDisplayMode` | Yes | No | Composer vs MessageBuilder toggle — landscape only |
| `gridColumnsConfigurable` | Yes | No | Configurable 6-12 columns (phone fixed at `PHONE_GRID_COLUMNS = 4`) |
| `editModeBar` | Yes | No | Tablet edit mode bar vs phone toggle button |
| `gridSizePicker` | Yes | No | Grid size picker overlay on main screen |

**Usage patterns:**

- **Pure TypeScript** (services, utils): `getDeviceFeatures(deviceType)` or `isFeatureAvailable(deviceType, 'wordFinder')`
- **React components**: `useDeviceFeatures()` hook — returns feature flags + `device` (passthrough to `useDeviceType()` for layout checks)
- **Settings UI**: `AppearanceSettings` and `GrammarSettings` accept an optional `features` prop to hide irrelevant settings on phone. When omitted (e.g., tablet admin screen reusing the same components), all settings are shown.

**When to use `isTablet` vs `features`:**

- `features.wordFinder` — "should this feature exist at all?"
- `device.isTablet` — "should this modal be 95% or 100% wide?"

---

## Type System (`src/types/`)

### Vocabulary Pack Types (`vocabularyPack.ts`)

```typescript
interface VocabularyPack {
  metadata: VocabularyPackMetadata;
  categories: CategoryData[];
  concepts: ConceptData[];
  grammar?: PackGrammarData;
  phrases?: PackPhraseData[];
  abbreviations?: PackAbbreviationData[];
  activityBoards?: PackActivityBoardData[];
  coreFringeLayouts?: PackCoreFringeLayoutData[];
}

interface VocabularyPackMetadata {
  packId: string;
  name: string;
  version: string;
  tier: 'basic' | 'extended' | 'professional' | 'specialized';
  languages: string[];
  totalConcepts: number;
  totalPhrases?: number;
  totalAbbreviations?: number;
  totalActivityBoards?: number;
  totalCoreFringeLayouts?: number;
  dependencies: string[];
}
```

### Input Mode Types (`inputMode.ts`)

```typescript
type InputMode = 'symbol_only' | 'text';
const INPUT_MODE_VALUES: readonly InputMode[];
const DEFAULT_INPUT_MODE: InputMode;            // 'symbol_only'
const INPUT_MODE_SETTING_KEY = 'input_mode';
function getEffectiveInputMode(value: string | null | undefined): InputMode;
```

### Progressive Vocabulary Types (`progressiveVocabulary.ts`)

```typescript
interface VocabularyLevel {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  totalWords: number;    // 27, 63, 115, 202, 300, 500
  gridRows: number;      // 7, 16, 29, 51, 75, 125
  advanceThreshold: number;
}

interface UserProgressionState {
  currentLevel: number;
  wordStats: Record<string, WordStats>;
  levelMetrics: LevelProgressMetrics[];
  readinessAssessment: ReadinessAssessment;
  levelHistory: LevelHistoryEntry[];
}
```

### Schematic Types (`schematic.ts`)

```typescript
interface ActivityBoardData {
  id: string;
  title: string;
  gridColumns: number;
  gridRows: number;
  icon?: string;
  imageUri?: string;
  backgroundColor?: string;
  order: number;
  language: string;
  sourcePackId?: string;
  boardKey?: string;
}

interface BoardButtonData {
  id: string;
  boardId: string;
  symbolId?: string;
  rowIndex: number;
  columnIndex: number;
  isLinkButton: boolean;
  linkToBoardId?: string;
  linkLabel?: string;
}
```

### Word Finder Types (`wordFinder.ts`)

```typescript
interface WordFinderPathStep {
  type: 'navigate_category' | 'navigate_board_link' | 'select_target';
  cellKey: string;           // "row-col" key for the cell to tap
  pageId?: string;           // Core-Fringe: which page this step is on
  boardId?: string;          // Schematic: which board this step is on
  label: string;             // Display text for breadcrumb
}

interface WordFinderPath {
  targetSymbolId: string;
  steps: WordFinderPathStep[];
  depth: number;             // Number of taps needed
  isPinnedOnRoot: boolean;   // Single step, no navigation
}

interface WordFinderSearchResult {
  symbolId: string;
  label: string;
  shortestPath: WordFinderPath | null;  // null = not placed in layout
  allPaths: WordFinderPath[];
}

interface WordFinderGuidanceState {
  isActive: boolean;
  path: WordFinderPath | null;
  currentStepIndex: number;
  highlightedCellKey: string | null;   // "row-col" of the cell to highlight
}
```

---

## Smart Grammar Engine (`src/grammar/`)

### Architecture

```
┌─────────────────────────────────────────────────┐
│              GrammarEngine (Singleton)          │
│  - Language selection                           │
│  - Conjugator dispatch                          │
│  - Fail-safe design (returns original on error) │
└──────────────────────┬──────────────────────────┘
                       │
       ┌───────────────┼───────────────┐
       ▼               ▼               ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│   Dutch      │ │   English    │ │   Spanish    │
│ Conjugator   │ │ Conjugator   │ │ Conjugator   │
└──────────────┘ └──────────────┘ └──────────────┘
       │               │               │
       ▼               ▼               ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│  Dutch Verb  │ │ English Verb │ │ Spanish Verb │
│   Seeder     │ │   Seeder     │ │   Seeder     │
└──────────────┘ └──────────────┘ └──────────────┘
```

### Supported Languages

| Language | Features |
|----------|----------|
| **Dutch (nl)** | Full conjugation, separable verbs, irregular verbs |
| **English (en)** | Full conjugation, irregular verbs |
| **Spanish (es)** | Full conjugation, irregular verbs |
| **German (de)** | Basic conjugation (extensible) |

### Verb Slots

```typescript
type VerbSlot =
  | 'INF' | 'PRES_1SG' | 'PRES_2SG' | 'PRES_3SG'
  | 'PRES_1PL' | 'PRES_2PL' | 'PRES_3PL'
  | 'PAST_1SG' | 'PAST_2SG' | 'PAST_3SG'
  | 'PAST_1PL' | 'PAST_2PL' | 'PAST_3PL'
  | 'PERF_PARTICIPLE' | 'PRES_PARTICIPLE'
  | 'IMPERATIVE_SG' | 'IMPERATIVE_PL'
  // ... 34 total slots
```

### Grammar Strip

Multi-language grammar word selection (Dutch, English, French, Spanish):
- **Articles**: de, het, een (NL); the, a, an (EN); le, la, les (FR); el, la, los (ES)
- **Demonstratives**: deze, dit, die, dat (NL); this, that, these (EN); etc.
- **Possessives**: mijn, jouw, zijn, haar (NL); my, your, his, her (EN); etc.
- **Prepositions**: met, voor, naar, in, op (NL); with, for, to, in, on (EN); etc.
- **Gender-aware dimming**: Incompatible determiners are dimmed based on last noun's gender
- **Smart insertion**: Determiners auto-insert before the last noun in the message
- **Three assist levels**: Simple (8 tokens + hints), Standard (all tokens + dimming), Expert (all tokens, no dimming)
- **Compact layout**: 48px strip height to minimize impact on grid area; when visible, `useGridLayout` returns shorter `cellHeight` so Activity Board / Core-Fringe rows shrink to fit (rectangular cells)

---

## Key Features

### 1. Vocabulary Pack System

Self-contained packs bundling:
- Concepts (symbols) with translations
- Categories
- Grammar data (irregular verbs, plurals)
- Phrases
- Abbreviations
- Activity boards
- Core-Fringe layouts

**Pack Registry** (`src/constants/packRegistry.ts`): Single source of truth for all pack metadata, IDs, and loading. Exports `CORE_PACK_ID`, `AUTO_IMPORT_LANGUAGE_CODES`, `PACK_REGISTRY`, `getPackEntry()`, `loadPack()`, and `getAvailablePackLanguages()`. All screens and services import pack identifiers from here instead of hardcoding them. See [VOCABULARY_PACK_CREATION_GUIDE.md](./VOCABULARY_PACK_CREATION_GUIDE.md#managing-the-pack-registry) for how to add/change/remove packs.

**Pack Installation Flow:**
```
Validate Pack → Check Dependencies → Import Concepts → Sync Grammar
    → Import Phrases → Import Abbreviations → Import Activity Boards
    → Import Core-Fringe Layouts → Record Installation
```

**Batch Write Strategy:**
All pack import methods use WatermelonDB's `prepareCreate()` + `database.batch()` pattern
to write thousands of records in a single SQLite transaction. On fresh install, per-record
existence queries are skipped since the database is known to be empty. This reduces first-launch
initialization from ~60s to ~3-5s for the core pack (~6,612 concepts × 4 languages = ~33,060 records).

**Pack Uninstallation:** `uninstallPack()` removes all pack data including symbols, translations, favorites, symbol_lemmas, activity boards, board buttons, core-fringe layouts/pages/slots, and the pack registry record — all in a single atomic `database.batch()` transaction.

```typescript
// Pattern used throughout pack installation
const allPrepared = [];
for (const concept of pack.concepts) {
  const symbol = collection.prepareCreate((s) => { /* ... */ });
  allPrepared.push(symbol);
  // preparedSymbol.id is available immediately (client-side UUID)
  for (const lang of languages) {
    allPrepared.push(translations.prepareCreate((t) => {
      t.symbolId = symbol.id;
      /* ... */
    }));
  }
}
await database.batch(...allPrepared);
```

### 2. Progressive Vocabulary System

6-level progressive learning with configurable grid:

| Level | Words | Rows | Description |
|-------|-------|------|-------------|
| 1 | 27 | 7 | Essential power words |
| 2 | 63 | 16 | Core communication |
| 3 | 115 | 29 | Expanded core |
| 4 | 202 | 51 | Full communication |
| 5 | 300 | 75 | Complete system |
| 6 | 500 | 125 | Expert add-on |

**Features:**
- Motor zone preservation (hot/warm/cool/reach)
- Usage-based advancement with configurable thresholds
- Auto-advance toggle
- Level history tracking
- Persistent state with auto-save (2s debounce)

### 3. Activity Boards (Schematic Mode)

Alternative to category-based grid:

- **Themed Grids**: Event/activity-based symbol organization
- **Script Pattern**: WHO (left) → ACTION (center) → WHAT (right)
- **Board Links**: Navigate between related boards
- **Board Icons**: Emoji or custom image (library/camera/pack-embedded images) via `BoardImagePickerModal` — a separate modal with 3 tabs (Emoji/Device/Pack), opened from a button in `BoardEditorModal`. Adapts layout for phone landscape orientation (wider container, reduced chrome).
- **Button Icons**: `ButtonEditorModal` uses a separate pack image picker modal (opened via "Browse Pack Images" button) to avoid VirtualizedList nesting inside ScrollView. The picker modal renders a FlatList grid of pack images with search filtering.
- **Pack Integration**: Boards included in vocabulary packs (with optional `image_uri`)
- **Dashboard**: Visual board selection with edit mode
- **Admin CRUD**: Create/edit/delete boards from Admin → Content → Boards sub-tab
- **Admin Grid Editing**: "Edit Grid" button in `BoardEditorModal` navigates to MainScreen with `editBoardId` route param. MainScreen enters admin board edit mode: hides composer zone 2 (message builder, prediction bar, Grammar Strip), shows `BoardEditBar` with board title and Done button. `SchematicModeContainer` auto-selects the board via `initialBoardId` prop. Done ("Klaar") exits edit mode and returns to AdminScreen → Content → activityBoards subtab with the `BoardEditorModal` automatically re-opened for the edited board (via `pendingAdminReturn` module-level store on tablets, route params on phones).

### 4. Core-Fringe Grid Mode

Third grid mode where core vocabulary stays pinned while fringe symbols change:

- **Pinned Slots**: Core words (I, want, more, stop) always visible on every page
- **Dynamic Slots**: Category-specific words change during navigation
- **Multi-Layer Navigation**: Tree of pages with Back/Home buttons in the grid
- **Configurable Grid Size**: 6-12 columns, each with independent layout records
- **Per-Grid-Size Layouts**: `setCoreFringeColumns()` switches active layout; `copyLayoutToGridSize()` clones layouts across sizes
- **Layout Icons**: Emoji or custom image (library/camera/pack-embedded images) via `IconPickerModal` — shared 3-tab picker (Emoji/Device/Pack), phone landscape-adaptive
- **Page Icons**: Sub-pages also support emoji or custom image via `IconPickerModal` (same shared picker)
- **Pack Integration**: Layouts importable via vocabulary packs (multiple grid-size entries per pack, with optional icon/image_uri on both layouts and pages)
- **Edit Mode**: Add/move/delete symbols, toggle pin state, manage pages, edit category links. `SlotEditorModal` supports full symbol editing (emoji search/picker, image picker, pack image picker modal, Fitzgerald category, category assignment, hide toggle) and full link editing (emoji search/picker, image picker, pack image picker modal, target page selection) alongside slot-level pin state and background color. The pack image picker opens as a separate modal (via `packPickerTarget` state for symbol vs link context) to avoid VirtualizedList nesting inside ScrollView. `LinkEditorModal` provides the same emoji search/picker for link creation
- **Admin Layout Editing**: "Edit Grid" button in `LayoutEditorModal` navigates to MainScreen with `editLayoutId`. Done ("Klaar") returns to AdminScreen → Content → coreFringeLayouts subtab with the `LayoutEditorModal` re-opened (via `pendingAdminReturn` module-level store on tablets, route params on phones). `LayoutEditorModal` uses `useIsFocused` to refresh the page tree whenever the admin screen regains focus, preventing stale hierarchy after returning from main-screen grid edits.
- **Page Hierarchy vs Navigation Links**: `parentPageId` on `CoreFringePage` controls the admin tree structure (organizational hierarchy). `linkToPageId` on `CoreFringeSlot` (with `isCategoryLink=true`) controls grid navigation. These are independent fields. A slot can link to a page that is not its organizational child, and vice versa.
- **Auto-Parenting (`maybeSetPageParent`)**: In `CoreFringeModeContainer`, whenever a category link is created from a non-root page to a target page, the target's `parentPageId` is automatically updated if the target is still at its default placement (no parent, or parent = root). If the target already has a specific non-root parent, it is left unchanged. This keeps the admin tree hierarchy consistent with the visual link structure on the main screen.
- **DB Models**: `CoreFringeLayout` → `CoreFringePage` → `CoreFringeSlot` hierarchy

See [Core-Fringe Grid documentation](features/core-fringe-grid.md) for full details.

### 5. Word Finder (Guided Symbol Search)

As vocabularies grow to hundreds or thousands of words, finding a specific symbol can be difficult. Word Finder lets users search for a word and then visually guides them through the exact sequence of buttons to press, building motor memory so the user learns the path without needing the search tool in the future.

**How it works:**
1. User taps the search button (magnifying glass icon, visible in Core-Fringe and Schematic modes when not in edit mode)
2. A search modal opens with a text input and debounced results (300ms)
3. Results show matching symbols with depth info ("2 taps away", "Always visible" for pinned)
4. User taps a result → modal closes, guidance bar appears above the grid
5. All non-relevant cells are dimmed (opacity 0.2), the next button to press is highlighted (primary border + scale 1.05)
6. User taps the highlighted cell → navigation occurs, next step highlights
7. On reaching the target symbol, guidance ends and the symbol is added to the message

**Architecture:**

| Component | Purpose |
|-----------|---------|
| **Types** (`src/types/wordFinder.ts`) | `WordFinderPathStep`, `WordFinderPath`, `WordFinderSearchResult`, `WordFinderGuidanceState` |
| **Service** (`src/services/wordFinderService.ts`) | `searchWordFinder()` — searches symbols via `searchSymbolsByLabel()`, then traces page/board hierarchy to compute navigation paths from root to target |
| **Hook** (`src/hooks/useWordFinder.ts`) | `useWordFinder()` — manages search modal visibility, search results, guidance state (active path, current step, highlighted cell key) |
| **Search Modal** (`src/components/wordFinder/WordFinderSearchModal.tsx`) | Modal with search input, results FlatList showing emoji/label/depth, disabled state for unplaced symbols |
| **Guidance Bar** (`src/components/wordFinder/WordFinderGuidanceBar.tsx`) | Thin bar (44px) with cancel button, step dots, instruction text, step counter; fade-in animation |

**Path-finding algorithms:**
- **Core-Fringe**: Queries `CoreFringeSlot` records across all pages, traces `parentPageId` chain to root, finds category link slots between consecutive pages
- **Schematic**: Queries `BoardButton` records, traces `linkToBoardId` chain backward from target board to entry board

**Cell integration:**
- `CoreFringeCell` and `BoardButtonCell` accept `isWordFinderDimmed` / `isWordFinderHighlighted` props
- `CoreFringeGrid` and `SchematicGrid` accept `wordFinderHighlightKey` prop and intercept cell presses during guidance (only the highlighted cell responds)
- Containers (`CoreFringeModeContainer`, `SchematicModeContainer`) thread props and expose layout data via `onLayoutReady` / `onBoardsReady` callbacks

**Edge cases:**
- Pinned (core) symbols highlight directly on root page (no navigation steps)
- Symbols not placed in current layout show as disabled in results
- Guidance auto-cancels on edit mode toggle or language/grid mode change

### 6. Phrases & Abbreviations

| Feature | Categories | Examples |
|---------|------------|----------|
| **Phrases** | needs, medical, social, requests, emotions, responses | "I need help", "Thank you" |
| **Abbreviations** | greeting, social, needs, common, emergency | "ty" → "thank you" |

### 7. Backup & Restore

Selective backup/restore via `.vbaac` files (JSON format) with 9 toggleable categories:

| Category | Contents |
|----------|----------|
| **Settings** | All key-value settings (except admin PIN) |
| **Categories** | Symbol categories |
| **Symbols** | Symbols with translations and embedded images |
| **Favorites** | Favorited symbol references |
| **Phrases** | Saved phrases |
| **Abbreviations** | Shortcode expansions |
| **Activity Boards** | Boards with buttons and embedded board images |
| **Core-Fringe Layouts** | Layouts, pages, slots with embedded link images |
| **Vocabulary Packs** | Pack metadata records |

**Image Bundling:** On export, local `file://` images are read and converted to `data:image/...;base64,...` data URIs inline in the JSON, making backups fully portable across devices. On import, data URIs are written back to local files in `documentDirectory/backup-images/`. Non-local URIs (`pack:`, `https://`, existing `data:` URIs) pass through unchanged.

### 8. User Profile System

Multi-user profile management for therapists/parents maintaining separate configurations for different learners. Each profile has its own isolated WatermelonDB database, ensuring complete data separation.

**Profile Data** (stored in `user_registry.json`, not in WatermelonDB):

```typescript
interface UserProfile {
  id: string;              // Generated ID
  name: string;            // Display name (required)
  photoUri?: string;       // Local file path to avatar
  age?: string;            // Age or date of birth
  diagnosis?: string;      // Optional diagnosis info
  notes?: string;          // Therapist/caregiver notes
  databaseName: string;    // WatermelonDB dbName (e.g., 'user_abc123')
  setupMode?: 'standard';  // Deferred setup flag
  pendingImportUri?: string; // Deferred backup import (duplicate flow)
  pendingWizardSettings?: string; // Serialized wizard settings JSON (wizard flow)
  createdAt: string;
  updatedAt: string;
}
```

**User Operations:**

| Operation | Flow |
|-----------|------|
| **Add Standard** | Creates profile with `setupMode: 'standard'`. On switch: sets `welcome_completed` + `gridMode`, then `useMainScreenState` seeds vocabulary automatically |
| **Add with Wizard** | Opens `NewUserWizardModal` (11 steps: profile info + all setup wizard steps). On finish: creates profile with `pendingWizardSettings` JSON, auto-switches to new user. On switch: applies all settings, theme, PIN, and auto-imports core vocabulary pack |
| **Duplicate** | Exports backup from active user's DB at creation time, stores URI as `pendingImportUri`. On switch: imports backup into new DB |
| **Delete** | Guards: cannot delete active or last user. Removes registry entry + SQLite files |
| **Switch** | Updates registry → `reinitializeDatabase()` → processes deferred flags (`pendingImportUri`, `pendingWizardSettings`, or `setupMode`) → `appKey++` triggers full remount |

**UI Components:**
- **UsersTab** (`src/screens/AdminScreen/UsersTab.tsx`): Profile list with avatars, edit mode (delete/duplicate), switch confirmation, Add Standard / Add with Wizard buttons
- **UserProfileEditorModal** (`src/screens/AdminScreen/UserProfileEditorModal.tsx`): Name, photo (via `expo-image-picker`), age, diagnosis, notes (used for Standard add, Edit, Duplicate)
- **NewUserWizardModal** (`src/screens/SetupWizard/NewUserWizardModal.tsx`): 11-step wizard combining profile info + full setup wizard (used for Add with Wizard)

**App Integration:**
- `UserProfileProvider` wraps the entire app tree in `App.tsx`, above all other providers
- `KeyedApp` component reads `appKey` from context — changing it unmounts/remounts the full provider stack (`<Provider>`, `<ThemeProvider>`, etc.)
- On startup: `userProfileService.initialize()` → `reinitializeDatabase(profile.databaseName)` → render

---

## Theme System (`src/theme/`)

```
src/theme/
├── colors.ts           # Color palette
├── typography.ts       # Font styles and sizes
├── spacing.ts          # Margin/padding values
├── shadows.ts          # Shadow definitions
├── borderRadius.ts     # Corner rounding
└── themes/
    ├── light.ts
    ├── dark.ts
    ├── highContrast.ts
    └── childFriendly.ts
```

### Typography Tokens

All text styling must use `theme.typography` tokens — **never hardcode font sizes or weights**. This ensures consistency across all screen layouts (phone portrait, phone landscape, tablet).

| Token | Size | Usage |
|-------|------|-------|
| `fontSize.xs` | 10 | Badges, chips, compact labels |
| `fontSize.sm` | 12 | Descriptions, secondary text, button text |
| `fontSize.md` | 14 | Subsection titles, body text, language codes |
| `fontSize.lg` | 16 | Pack names, stat values, flags |
| `fontSize.xl` | 18 | Section titles |
| `fontSize.2xl` | 20 | Large headings |
| `fontSize.3xl` | 24 | Statistics numbers |

| Token | Weight | Usage |
|-------|--------|-------|
| `fontWeight.normal` | 400 | Body text |
| `fontWeight.medium` | 500 | Installed badges, reinstall buttons |
| `fontWeight.semibold` | 600 | Titles, labels, primary buttons |
| `fontWeight.bold` | 700 | Section titles, language codes |

**Compact variants** should step one size down from the normal variant (e.g., `lg` → `md`, `sm` → `xs`).

---

## Internationalization

- **i18n System**: React-i18next
- **UI Translations**: English (en), Dutch (nl), Spanish (es), Italian (it), French (fr) — each with admin, common, main, modals, settings namespaces
- **Vocabulary Languages**: 20 language codes defined in `src/constants/languages.ts` (en, es, fr, de, it, pt, zh, ja, ko, nl, ar, ru, hi, tr, pl, sv, no, da, fi, el); vocabulary packs can ship translations in any of these
- **Grammar Seeding**: Language-specific verb data on initialization
- **Emoji Translation**: Foreign words → English emoji names for matching

---

## Performance Optimizations

| Optimization | Implementation |
|--------------|----------------|
| **Batched DB Writes** | `prepareCreate()` + `database.batch()` for all pack imports and grammar sync — single transaction for thousands of records |
| **Fresh Install Fast Path** | Skip per-record existence queries when database is empty; skip legacy normalization migration |
| **Grammar Caching** | ExceptionCache for verb exceptions |
| **Auto-save Debouncing** | 2-second delay for progression state |
| **Lazy Loading** | Grammar language modules on demand |
| **Database Indexing** | language, category_id, source_pack_id, concept_key |
| **Redux Selectors** | Memoized selectors for state derivation |
| **Shared Cell Rendering** | `useSymbolCellData` hook, `SymbolCellContent` component, `createBaseSymbolCellStyles` factory (supports rectangular cells via `cellHeight` option) reused across grid modes |
| **Ref-based Stable References** | `pinnedSlotsRef` in Core-Fringe mode prevents unnecessary React.memo re-renders; comparison includes symbol content fields (label, emoji, imageUri, fitzCategory, isHidden) and link fields to detect edits |
| **Memoized Grid Cells** | Both `CoreFringeCell` and `BoardButtonCell` wrapped in `React.memo` with custom comparators for fine-grained skip of re-renders |
| **Atomic Batch Deletions** | `uninstallPack()`, `deleteBoard()`, `deletePage()` use `prepareDestroyPermanently()` + single `database.batch()` instead of sequential awaits |
| **Shared MainScreen Components** | `MainScreenModals` (React.memo), `CategoryBar`, and `useDerivedMainScreenState` extracted from Phone/Tablet parallel trees to eliminate ~600 lines of duplication |
| **Batched Category Lookups** | Admin subtabs pre-load all categories into a `Map` for O(1) lookup instead of N individual `database.find()` queries per symbol/phrase |
| **Count-Only Queries** | `useVocabularyManagement` uses `fetchCount()` for per-language symbol counts instead of hydrating 11k+ WatermelonDB model objects |
| **Deduplicated Mount Loads** | SymbolsSubTab uses a single `useEffect` for initial load and language changes, preventing redundant `getSymbolsForLanguage` calls |
| **Legacy Data Cleanup** | One-time removal of orphaned `base-pack-v1` symbols (~3,240 concepts + translations) that accumulated when replaced by `BasePackV2` — reduced admin Content tab load time from 25s to ~1.7s |

---

## File Organization

```
src/
├── components/         # Reusable UI components
│   ├── ErrorBoundary.tsx # Global error boundary (recovery UI)
│   ├── schematic/      # Activity board components
│   ├── corefringe/     # Core-Fringe grid components
│   ├── textmode/       # Text mode components (TextComposerBar, QuickPhraseStrip, etc.)
│   ├── shared/         # Shared cell rendering primitives
│   └── settings/       # Reusable settings components
├── screens/            # Main app screens
│   ├── main/           # Communication interface (MainScreen, Phone/Tablet layouts)
│   │   └── components/ # Shared MainScreen components (modals, category bar, derived state)
│   ├── SetupWizard/    # First-launch wizard + new-user wizard (steps, components, types)
│   ├── AdminScreen/    # Content management
│   └── SettingsScreen/ # User configuration (modular sections)
├── config/             # Static configuration (device features)
├── contexts/           # App-level context providers (UserProfileContext)
├── services/           # Business logic services
├── grammar/            # Smart grammar engine
│   ├── languages/      # Language-specific conjugators
│   └── data/           # Verb seed data
├── store/              # Redux state management
├── hooks/              # Custom React hooks
│   ├── useWordFinder.ts # Word Finder search + guidance state hook
│   └── shared/         # Shared hook utilities (fetchSymbolWithTranslation, useNavigationStack)
├── types/              # TypeScript definitions
├── theme/              # Design system
├── i18n/               # Internationalization (en, nl, es, it, fr)
├── db/                 # Database setup and models
│   ├── schema/         # WatermelonDB schema (v25)
│   └── models/         # Model classes
├── context/            # React context providers
├── navigation/         # App navigation (types, pendingAdminReturn)
├── utils/              # Helper functions
├── constants/          # App constants (languages, pack registry)
├── data/               # Static data files
│   └── vocabularies/   # Vocabulary pack JSON files
│       └── packs/      # Pack files by category (core/, demo/)
└── assets/             # Images and static files
```

---

## External Dependencies

### Core Dependencies

| Dependency | Purpose |
|------------|---------|
| **React Native** | Mobile app framework |
| **Expo** | Development platform |
| **Redux Toolkit** | State management |
| **WatermelonDB** | Local database |
| **React Navigation** | Screen navigation |
| **React-i18next** | Internationalization |
| **Expo Speech** | Text-to-speech (device provider) |
| **react-native-pager-view** | Setup wizard step navigation |

### Development Dependencies

| Dependency | Purpose |
|------------|---------|
| **TypeScript** | Type safety |
| **babel-preset-expo** | Babel presets for Expo |

---

## Related Documentation

| Document | Description |
|----------|-------------|
| [VOCABULARY_PACK_FORMAT.md](./VOCABULARY_PACK_FORMAT.md) | Complete pack format reference |
| [VOCABULARY_PACK_CREATION_GUIDE.md](./VOCABULARY_PACK_CREATION_GUIDE.md) | Pack creation guide |
| [PLAN_PACK_PHRASES_ABBREVIATIONS.md](./PLAN_PACK_PHRASES_ABBREVIATIONS.md) | Phrases and abbreviations |
| [PLAN_PACK_ACTIVITY_BOARDS.md](./PLAN_PACK_ACTIVITY_BOARDS.md) | Activity boards implementation |
| [features/core-fringe-grid.md](./features/core-fringe-grid.md) | Core-Fringe grid mode |
| [SMART_GRAMMAR_ENGINE.md](./SMART_GRAMMAR_ENGINE.md) | Grammar conjugation system |
| [SETTINGSSCREEN_LAYOUT_GUIDE.md](./SETTINGSSCREEN_LAYOUT_GUIDE.md) | Settings screen architecture |
| [PROGRESSIVE_VOCABULARY_SPEC.md](./PROGRESSIVE_VOCABULARY_SPEC.md) | Progressive learning system |

---

## Architecture Summary

VoiceBridgeAAC follows a modern React Native architecture with:

1. **Component-Based UI**: Small, focused components with hooks for state
2. **Service Layer**: Business logic encapsulated in singleton services
3. **Type Safety**: Full TypeScript coverage with comprehensive type definitions
4. **Data Persistence**: WatermelonDB with 25 migrations for schema evolution
5. **Pack System**: Self-contained vocabulary packs with concepts, grammar, phrases, abbreviations, activity boards, and core-fringe layouts
6. **Progressive Learning**: 6-level vocabulary system with motor zone preservation
7. **Smart Grammar**: Context-aware verb conjugation for multiple languages
8. **Schematic Mode**: Activity-based symbol boards as alternative to category grids
9. **Core-Fringe Mode**: Pinned core vocabulary with navigable fringe categories and per-grid-size layouts
10. **Word Finder**: Guided symbol search with step-by-step navigation highlighting and motor memory building
11. **Setup Wizard**: 10-step first-launch onboarding + 11-step new-user wizard with embedded profile creation
12. **Multi-Provider TTS**: Device speech and ElevenLabs cloud TTS with automatic fallback and network timeouts
13. **Portable Backups**: Selective .vbaac backup/restore with embedded base64 images (5 MB limit) for cross-device portability
14. **Multi-User Profiles**: Per-user database isolation with deferred setup, duplicate via backup/restore, and soft restart on switch
15. **Error Resilience**: Global error boundary, tagged error logging in all CRUD hooks, atomic batch deletions, network timeouts
16. **Input Mode**: Symbol-only (default) or text-based communication, switchable from settings with adaptive phone/tablet layouts
17. **Cross-Platform**: Expo SDK 54 with New Architecture enabled; iOS and Android from a single codebase with minimal platform-specific code (8 `Platform.OS` checks)
