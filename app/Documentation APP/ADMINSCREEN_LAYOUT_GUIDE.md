# AdminScreen Layout and Code Guide

## Overview

`AdminScreen` is the admin entry point for configuration and vocabulary management.

Current top-level tabs:
- `Settings`: non-vocabulary app settings
- `Content`: symbols, abbreviations, phrases, categories, grammar exceptions, activity boards, and core-fringe layouts
- `Language`: progressive vocabulary controls and vocabulary reset/import status
- `Users`: user profile management

**Responsive Layout**: AdminScreen renders differently based on device type:
- **Phone (all orientations)**: Standard Material Top Tab Navigator
- **Tablet (locked to landscape)**: Two-panel sidebar layout (see [Tablet Landscape Layout](#tablet-landscape-layout))

This file reflects the current implementation in `src/screens/AdminScreen.tsx` and related sub-tabs.

---

## Visual Layout

### 1) Header

Purpose: navigation + language context.

```
+-------------------------------------------------------------+
|  <- Back                 Admin Mode                  [Flag] |
+-------------------------------------------------------------+
```

Behavior:
- Back returns to previous stack screen.
- Flag opens the language picker modal.
- Header text and labels are translated via the `admin` i18n namespace.

### 2) Top Tab Bar

Material top tabs (scrollable):
- `Settings`
- `Content`
- `Language`
- `Users`

Styling is pill-like (rounded indicator, active/inactive tint, theme-aware colors).

### 3) Content Area

Each top tab renders its own screen content.

---

## Tab Architecture

### Settings Tab (`SettingsScreen`)

`Settings` is a vertical `ScrollView` of cards in this exact order:
1. Security
2. Voice
3. Appearance
4. Grammar
5. Fitzgerald
6. Schematic/Grid Mode
7. Share
8. Backup & Export
9. About

High-level wireframe:

```
+-------------------------------------------------------------+
| [Security Card]                                             |
|  - PIN switch                                               |
|  - Change PIN button (only when enabled)                   |
+-------------------------------------------------------------+
| [Voice Card]                                                |
|  - Voice provider (device / ElevenLabs)                    |
|  - Device voice picker button                              |
|  - ElevenLabs API key + voice picker                       |
|  - Pitch / Rate sliders                                     |
|  - Test voice button                                        |
+-------------------------------------------------------------+
| [Appearance Card]                                           |
|  - Theme picker button                                     |
|  - Landscape display mode button                           |
|  - Grid size button (navigates to MainScreen preview)      |
|  - Font size button (navigates to MainScreen preview)      |
|  - Grammar strip switch                                    |
|  - Edit button switch                                      |
|  - Word Finder switch                                      |
+-------------------------------------------------------------+
| [Grammar Card]                                              |
|  - Smart grammar switch                                    |
|  - Determiner helper switch (disabled when grammar off)    |
|  - Determiner helper style (segmented: Simple/Standard/    |
|    Expert) — only when grammar + determiner helper on      |
|  - Grid inflection picker switch                           |
|  - Verb picker style (segmented: Simple/Standard/Expert)   |
|    — only when grammar + inflection picker on              |
|  - Pronoun image pickers (only when grammar on)            |
|  - Run tests button + optional results panel               |
+-------------------------------------------------------------+
| [Fitzgerald Card]                                           |
|  - Fitzgerald switch                                       |
|  - View legend button                                      |
+-------------------------------------------------------------+
| [Schematic Card]                                            |
|  - Grid mode picker (Standard / Activity Boards / Core-Fringe) |
+-------------------------------------------------------------+
| [Share Card]                                                |
|  - Share enabled switch                                    |
+-------------------------------------------------------------+
| [Backup & Export Card]                                      |
|  - Backup category toggles                                 |
|  - Export backup button                                     |
|  - Import backup button                                     |
+-------------------------------------------------------------+
| [About Card]                                                |
+-------------------------------------------------------------+
```

Layout notes:
- Uses `SafeAreaView` with `edges={['left', 'right', 'bottom']}`.
- Each section is full-width card style with horizontal margin, not tabbed subsections.
- Appearance uses two inline modals (theme picker and landscape mode picker).
- Grid size and font size navigate to MainScreen with preview overlay parameters.
- Security uses `PINModal` for setting/changing PIN.
- Voice section includes both device TTS and ElevenLabs integration.

Note: vocabulary-specific controls were moved out of `Settings` and into the `Language` tab.

### Content Tab (`ContentTab`)

Contains an internal segmented control with eight sub-tabs:
- `SymbolsSubTab`
- `AbbreviationsSubTab`
- `PhrasesSubTab`
- `CategoriesSubTab`
- `IrregularNounsSubTab`
- `IrregularVerbsSubTab`
- `ActivityBoardsSubTab`
- `CoreFringeLayoutsSubTab`

```
+-------------------------------------------------------------+
| [Symbols] [Abbreviations] [Phrases] [Categories] ...       |
+-------------------------------------------------------------+
|                                                             |
|   active sub-tab content (fills remaining height)           |
|                                                             |
+-------------------------------------------------------------+
```

Sub-tab layout behavior:
- The segmented control stays at the top of the tab (scrollable horizontally).
- Sub-tab body swaps below it without leaving the top-level `Content` tab.
- Supports deep-link parameters: `editLayoutId` auto-switches to Core-Fringe sub-tab, `editBoardId` auto-switches to Activity Boards sub-tab.

`SymbolsSubTab` layout:
1. Search row (icon + text input + clear button)
2. Horizontal category filter chips (`All`, `Favorites`, and populated categories)
3. `FlatList` of symbol cards
4. Bottom primary action button (`+ Add Symbol`)
5. `SymbolEditorModal` mounted at root

Symbol row structure:
- left: symbol icon circle (emoji/image fallback)
- center: label + category text
- right actions: edit, hide/show, favorite

`AbbreviationsSubTab` layout:
1. Search row
2. Count row (`N abbreviations`)
3. `FlatList` of cards (`shortcode -> expanded text`, edit button)
4. Bottom primary action button (`+ Add Abbreviation`)
5. `AbbreviationEditorModal`

`PhrasesSubTab` layout:
1. Search row
2. Horizontal category chips (`All`, `Uncategorized`, category chips)
3. `FlatList` of phrase cards (text + optional category badge + edit)
4. Bottom primary action button (`+ Add Phrase`)
5. `PhraseEditorModal`

`CategoriesSubTab` layout:
1. Search row
2. `FlatList` of category cards (icon + name + parent)
3. Bottom primary action button (`+ Add Category`)
4. Inline editor modal (emoji picker + image picker + parent selector)

`IrregularNounsSubTab` layout:
1. Search row
2. `FlatList` of irregular noun exception cards
3. Bottom primary action button (`+ Add Exception`)
4. `IrregularNounEditorModal`

`IrregularVerbsSubTab` layout:
1. Search row
2. `FlatList` of irregular verb exception cards
3. Bottom primary action button (`+ Add Exception`)
4. `IrregularVerbEditorModal`

`ActivityBoardsSubTab` layout:
1. Search row
2. `FlatList` of activity board cards
3. Bottom primary action button (`+ Add Board`)
4. `BoardEditorModal` (board metadata)
5. `ButtonEditorModal` (board button content, opens `SymbolPickerModal`)

`CoreFringeLayoutsSubTab` layout:
1. Search row
2. `FlatList` of core-fringe layout cards
3. Bottom primary action button (`+ Add Layout`)
4. `LayoutEditorModal` (layout metadata)
5. `PageManagerModal` (page tree management, contains `PageEditorModal` + `PageCopyPickerModal`)
6. `SlotEditorModal` (slot content assignment)
7. `LinkEditorModal` (symbol link configuration)

### Users Tab (`UsersTab`)

User profile management with list + editor modals:
1. `FlatList` of user profile cards
2. Add user button (standard) → `UserProfileEditorModal`
3. Add user button (wizard) → `NewUserWizardModal`
4. Edit/duplicate/delete/switch user actions
5. `EmojiAvatarPickerModal` (inside profile editor)

### Language Tab (`LanguageTab` inside `AdminScreen.tsx`)

`Language` is a vertical `ScrollView` with two stacked cards:
1. `ProgressiveVocabularySettings`
2. `VocabularyManagementSettings`

High-level wireframe:

```
+-------------------------------------------------------------+
| [Progressive Vocabulary Card]                               |
|  - Enable progressive switch                                |
|  - Current level collapsible                                |
|  - Category progress collapsible                            |
|  - Display settings (ghost slots / auto-advance / expert)  |
|  - Actions (check readiness / reset progression)            |
+-------------------------------------------------------------+
| [Vocabulary Management Card]                                |
|  - Language chip rail (flag + code + name)                 |
|  - Vocabulary packs list (PackCard rows)                   |
|  - Statistics panel (symbols/phrases/categories/languages) |
|  - Destructive actions (clear all / reset defaults)         |
+-------------------------------------------------------------+
```

Layout notes:
- Progressive section conditionally expands based on `progressionEnabled`.
- Vocabulary management language chips are horizontally scrollable.
- Pack rows are rendered via `PackCard` using installed/available state.
- Reset-to-defaults action requires PIN verification modal.

This tab composes data from:
- `useSettingsState()`
- `useVocabularyManagement()`
- `useProgressiveVocabularySettings()`

---

## Header Language Picker Flow

`AdminScreen` keeps local modal state:
- `showLanguagePicker`

Language list source:
- `getAvailableVocabularyLanguages()` filtered through `getAllLanguages()` metadata

On language selection (`handleLanguageChange`):
1. Update Redux (`setLanguage`) and persist with `settingsService.setLanguage`.
2. Close modal.
3. If language is in `{en, nl, es}`, ensure core pack `core-basic-all-v1` is installed.
4. Show success/error alert.

Guard effect:
- If current Redux language is not in available vocabulary languages, fallback to first available language and persist it.

---

## Content Sub-Tabs

### SymbolsSubTab

Primary capabilities:
- Load symbols for active language (`getSymbolsForLanguage(currentLanguage)`).
- Load categories.
- Load favorites from `favorites` table.
- Filter by:
  - `all`
  - `favorites`
  - specific category id
  - search query (label text)
- CRUD through `SymbolEditorModal`.
- Toggle visibility (`isHidden`) in-place.
- Toggle favorite state.

Notable implementation details:
- Supports normalized symbol model using `symbol_translations` updates when editing.
- New custom symbols get generated `conceptKey` values (`custom-<label>-<timestamp>`).
- If symbol language changes during edit, old favorite mappings are removed.
- Visibility toggle updates local list state directly to avoid a full reload flicker.

### AbbreviationsSubTab

Primary capabilities:
- Language-scoped list from `abbreviations` table.
- Search over `shortcode` and `expandedText`.
- Add/edit/delete with `AbbreviationEditorModal`.

Refresh behavior:
- Uses `useFocusEffect` to reload on tab focus and language changes.

### PhrasesSubTab

Primary capabilities:
- Language-scoped list from `phrases` table.
- Category badge support (`categoryName`, `categoryIcon`).
- Filters:
  - `all`
  - `uncategorized`
  - category id
  - search by phrase text
- Add/edit/delete with `PhraseEditorModal`.

Refresh behavior:
- Uses `useFocusEffect` to reload on tab focus and language changes.

### CategoriesSubTab

Primary capabilities:
- List all categories with search filtering.
- Add/edit/delete categories with inline editor modal.
- Emoji icon picker (via `node-emoji` library).
- Image picker for custom category icons (via `expo-image-picker`).
- Parent category selector for hierarchical categories.

### IrregularNounsSubTab

Primary capabilities:
- Language-scoped list from `lemmas` + `noun_exceptions` tables.
- Search over noun forms.
- Add/edit/delete with `IrregularNounEditorModal`.
- Grammar cache refresh after save/delete operations.

### IrregularVerbsSubTab

Primary capabilities:
- Language-scoped list from `lemmas` + `verb_exceptions` tables.
- Search over verb forms.
- Add/edit/delete with `IrregularVerbEditorModal`.
- Grammar cache refresh after save/delete operations.

### ActivityBoardsSubTab

Primary capabilities:
- List activity boards with search filtering.
- Add/edit/delete boards with `BoardEditorModal`.
- Edit board buttons with `ButtonEditorModal` (which can open `SymbolPickerModal` for symbol assignment).
- Supports deep-link via `initialEditBoardId` route parameter.

### CoreFringeLayoutsSubTab

Primary capabilities:
- List core-fringe layouts with search filtering.
- Add/edit/delete layouts with `LayoutEditorModal`.
- Per-grid-size layout activation.
- Manage page tree with `PageManagerModal` (creates/edits/reorders pages via `PageEditorModal`, copies pages via `PageCopyPickerModal`).
- Edit slot content with `SlotEditorModal`.
- Configure symbol links with `LinkEditorModal`.
- Supports deep-link via `initialEditLayoutId` route parameter.

---

## Data and State Summary

Global state:
- `currentLanguage` from Redux (`state.ui.currentLanguage`)

Key local state in `AdminScreen`:
- `showLanguagePicker`
- derived `availableLanguages`

Key local state in content sub-tabs:
- list data (`symbols`, `phrases`, `abbreviations`)
- loading flags
- editor modal visibility + currently edited entity
- search/filter state

Data stores touched:
- `symbols`
- `symbol_translations`
- `favorites`
- `phrases`
- `abbreviations`
- `categories`
- `lemmas`
- `noun_exceptions`
- `verb_exceptions`
- `symbol_lemmas`
- `activity_boards`
- `board_buttons`
- `core_fringe_layouts`
- `core_fringe_pages`
- `core_fringe_slots`
- `settings`
- `user_profiles`

---

## Key Files

### Core Admin Files
- `src/screens/AdminScreen.tsx` - Main entry point with layout gate + LanguageTab + language picker modal
- `src/screens/AdminScreen/ContentTab.tsx` - Content tab with 8 sub-tabs
- `src/screens/AdminScreen/SymbolsSubTab.tsx`
- `src/screens/AdminScreen/AbbreviationsSubTab.tsx`
- `src/screens/AdminScreen/PhrasesSubTab.tsx`
- `src/screens/AdminScreen/CategoriesSubTab.tsx`
- `src/screens/AdminScreen/IrregularNounsSubTab.tsx`
- `src/screens/AdminScreen/IrregularVerbsSubTab.tsx`
- `src/screens/AdminScreen/ActivityBoardsSubTab.tsx`
- `src/screens/AdminScreen/CoreFringeLayoutsSubTab.tsx`
- `src/screens/AdminScreen/UsersTab.tsx`
- `src/screens/AdminScreen/UserProfileEditorModal.tsx`
- `src/screens/SettingsScreen/SettingsScreen.tsx`
- `src/navigation/types.ts`

### Tablet Landscape Files
- `src/screens/AdminScreen/AdminScreenTabletLandscapeLayout.tsx` - Root container
- `src/screens/AdminScreen/AdminSidebar.tsx` - Left navigation panel
- `src/screens/AdminScreen/AdminContextBar.tsx` - Top context bar
- `src/screens/AdminScreen/SettingsScreenTabletLandscape.tsx` - Settings split view
- `src/screens/AdminScreen/ContentTabTabletLandscape.tsx` - Content split view
- `src/screens/AdminScreen/LanguageTabTabletLandscape.tsx` - Language split view
- `src/screens/AdminScreen/AdminLayoutTokens.ts` - Layout constants
- `src/screens/AdminScreen/index.ts` - Barrel exports

---

## Interaction File Map

Every file triggered when a menu item or action is selected, organized by tab.

### Header

| Action | Files |
|--------|-------|
| Back button | `src/screens/AdminScreen.tsx` (navigation.goBack) |
| Language flag → Language picker modal | `src/screens/AdminScreen.tsx` (inline Modal) |
| Select language | `src/services/settingsService.ts`, `src/store/uiSlice.ts`, `src/services/vocabularyPackService.ts`, `src/constants/packRegistry.ts` |

### Settings Tab

| Action | Section File | Modal / Overlay Opened |
|--------|-------------|----------------------|
| Toggle PIN | `src/screens/SettingsScreen/sections/SecuritySettings.tsx` | `src/components/PINModal.tsx` |
| Change PIN | `src/screens/SettingsScreen/sections/SecuritySettings.tsx` | `src/components/PINModal.tsx` |
| Select device voice | `src/screens/SettingsScreen/sections/VoiceSettings.tsx` | Inline modal (voice list) |
| Test voice | `src/screens/SettingsScreen/sections/VoiceSettings.tsx` | `expo-speech` / `src/services/voiceService.ts` |
| Configure ElevenLabs | `src/screens/SettingsScreen/sections/VoiceSettings.tsx` | Inline modal (API key + voice picker) |
| Adjust pitch/rate | `src/screens/SettingsScreen/sections/VoiceSettings.tsx` | — (sliders) |
| Select theme | `src/screens/SettingsScreen/sections/AppearanceSettings.tsx` | Inline modal (theme list) |
| Landscape display mode | `src/screens/SettingsScreen/sections/AppearanceSettings.tsx` | Inline modal (mode picker) |
| Grid size | `src/screens/SettingsScreen/sections/AppearanceSettings.tsx` | Navigates to `MainScreen` → `src/components/GridSizePickerOverlay.tsx` |
| Font size | `src/screens/SettingsScreen/sections/AppearanceSettings.tsx` | Navigates to `MainScreen` → `src/components/FontSizePickerOverlay.tsx` |
| Grammar strip toggle | `src/screens/SettingsScreen/sections/AppearanceSettings.tsx` | — (switch) |
| Edit button toggle | `src/screens/SettingsScreen/sections/AppearanceSettings.tsx` | — (switch) |
| Word Finder toggle | `src/screens/SettingsScreen/sections/AppearanceSettings.tsx` | — (switch) |
| Smart grammar toggle | `src/screens/SettingsScreen/sections/GrammarSettings.tsx` | — (switch) |
| Determiner helper toggle | `src/screens/SettingsScreen/sections/GrammarSettings.tsx` | — (switch, disabled when grammar off) |
| Determiner helper style | `src/screens/SettingsScreen/sections/GrammarSettings.tsx` | — (segmented control, visible when grammar + determiner on) |
| Grid inflection picker toggle | `src/screens/SettingsScreen/sections/GrammarSettings.tsx` | — (switch) |
| Verb picker style | `src/screens/SettingsScreen/sections/GrammarSettings.tsx` | — (segmented control, visible when grammar + picker on) |
| Pick pronoun image | `src/screens/SettingsScreen/sections/GrammarSettings.tsx` | `expo-image-picker` |
| Run grammar tests | `src/screens/SettingsScreen/sections/GrammarSettings.tsx` | — (inline results) |
| Fitzgerald toggle | `src/screens/SettingsScreen/sections/FitzgeraldSettings.tsx` | — (switch) |
| View Fitzgerald legend | `src/screens/SettingsScreen/sections/FitzgeraldSettings.tsx` | `src/fitzgerald/ui/FitzgeraldLegend.tsx` |
| Select grid mode | `src/screens/SettingsScreen/sections/SchematicModeSettings.tsx` | Inline modal (mode picker) |
| Share toggle | `src/screens/SettingsScreen/sections/ShareSettings.tsx` | — (switch) |
| Export backup | `src/screens/SettingsScreen/sections/BackupExportSettings.tsx` | — (direct action) |
| Import backup | `src/screens/SettingsScreen/sections/BackupExportSettings.tsx` | `expo-document-picker` |

### Content Tab

| Action | Sub-Tab File | Modal / Component Opened |
|--------|-------------|--------------------------|
| Add/Edit symbol | `src/screens/AdminScreen/SymbolsSubTab.tsx` | `src/components/SymbolEditorModal.tsx` |
| Delete symbol | `src/screens/AdminScreen/SymbolsSubTab.tsx` | Confirmation alert |
| Toggle symbol favorite | `src/screens/AdminScreen/SymbolsSubTab.tsx` | — (direct DB) |
| Toggle symbol visibility | `src/screens/AdminScreen/SymbolsSubTab.tsx` | — (direct DB) |
| Add/Edit abbreviation | `src/screens/AdminScreen/AbbreviationsSubTab.tsx` | `src/components/AbbreviationEditorModal.tsx` |
| Delete abbreviation | `src/screens/AdminScreen/AbbreviationsSubTab.tsx` | Confirmation alert |
| Add/Edit phrase | `src/screens/AdminScreen/PhrasesSubTab.tsx` | `src/components/PhraseEditorModal.tsx` |
| Delete phrase | `src/screens/AdminScreen/PhrasesSubTab.tsx` | Confirmation alert |
| Add/Edit category | `src/screens/AdminScreen/CategoriesSubTab.tsx` | Inline editor modal (emoji via `node-emoji`, image via `expo-image-picker`) |
| Delete category | `src/screens/AdminScreen/CategoriesSubTab.tsx` | Confirmation alert |
| Add/Edit irregular noun | `src/screens/AdminScreen/IrregularNounsSubTab.tsx` | `src/components/IrregularNounEditorModal.tsx` |
| Delete irregular noun | `src/screens/AdminScreen/IrregularNounsSubTab.tsx` | Confirmation alert |
| Add/Edit irregular verb | `src/screens/AdminScreen/IrregularVerbsSubTab.tsx` | `src/components/IrregularVerbEditorModal.tsx` |
| Delete irregular verb | `src/screens/AdminScreen/IrregularVerbsSubTab.tsx` | Confirmation alert |
| Add/Edit activity board | `src/screens/AdminScreen/ActivityBoardsSubTab.tsx` | `src/components/schematic/BoardEditorModal.tsx` |
| Edit board buttons | `src/screens/AdminScreen/ActivityBoardsSubTab.tsx` | `src/components/schematic/ButtonEditorModal.tsx` → `src/components/schematic/SymbolPickerModal.tsx` |
| Delete activity board | `src/screens/AdminScreen/ActivityBoardsSubTab.tsx` | Confirmation alert |
| Add/Edit core-fringe layout | `src/screens/AdminScreen/CoreFringeLayoutsSubTab.tsx` | `src/components/corefringe/LayoutEditorModal.tsx` |
| Manage pages | `src/screens/AdminScreen/CoreFringeLayoutsSubTab.tsx` | `src/components/corefringe/PageManagerModal.tsx` → `src/components/corefringe/PageEditorModal.tsx`, `src/components/corefringe/PageCopyPickerModal.tsx` |
| Edit page slots | `src/screens/AdminScreen/CoreFringeLayoutsSubTab.tsx` | `src/components/corefringe/SlotEditorModal.tsx` |
| Configure symbol links | `src/screens/AdminScreen/CoreFringeLayoutsSubTab.tsx` | `src/components/corefringe/LinkEditorModal.tsx` |
| Activate layout (per grid size) | `src/screens/AdminScreen/CoreFringeLayoutsSubTab.tsx` | — (direct DB) |
| Delete layout | `src/screens/AdminScreen/CoreFringeLayoutsSubTab.tsx` | Confirmation alert |

### Language Tab

| Action | Section File | Modal / Component Opened |
|--------|-------------|--------------------------|
| Toggle progression | `src/screens/SettingsScreen/sections/ProgressiveVocabularySettings.tsx` | — (switch) |
| Toggle ghost slots | `src/screens/SettingsScreen/sections/ProgressiveVocabularySettings.tsx` | — (switch) |
| Toggle auto-advance | `src/screens/SettingsScreen/sections/ProgressiveVocabularySettings.tsx` | — (switch) |
| Toggle expert vocab | `src/screens/SettingsScreen/sections/ProgressiveVocabularySettings.tsx` | — (switch) |
| Check readiness | `src/screens/SettingsScreen/sections/ProgressiveVocabularySettings.tsx` | `src/components/ReadinessCheckModal.tsx` |
| Advance level | `src/screens/SettingsScreen/sections/ProgressiveVocabularySettings.tsx` | `src/components/LevelUpModal.tsx` |
| Reset progression | `src/screens/SettingsScreen/sections/ProgressiveVocabularySettings.tsx` | Confirmation alert |
| Select language | `src/screens/SettingsScreen/sections/VocabularyManagementSettings.tsx` | — (inline language buttons) |
| Install vocabulary pack | `src/screens/SettingsScreen/sections/VocabularyManagementSettings.tsx` | — (direct action via `src/services/vocabularyPackService.ts`) |
| Reset to defaults | `src/screens/SettingsScreen/sections/VocabularyManagementSettings.tsx` | Confirmation alert → `src/components/PINModal.tsx` |
| Clear all vocabulary | `src/screens/SettingsScreen/sections/VocabularyManagementSettings.tsx` | Confirmation alert |

### Users Tab

| Action | File | Modal / Component Opened |
|--------|------|--------------------------|
| Add user (standard) | `src/screens/AdminScreen/UsersTab.tsx` | `src/screens/AdminScreen/UserProfileEditorModal.tsx` → `src/components/shared/EmojiAvatarPickerModal.tsx`, `expo-image-picker` |
| Add user (wizard) | `src/screens/AdminScreen/UsersTab.tsx` | `src/screens/SetupWizard/NewUserWizardModal.tsx` |
| Edit user profile | `src/screens/AdminScreen/UsersTab.tsx` | `src/screens/AdminScreen/UserProfileEditorModal.tsx` |
| Duplicate user profile | `src/screens/AdminScreen/UsersTab.tsx` | `src/screens/AdminScreen/UserProfileEditorModal.tsx` |
| Delete user | `src/screens/AdminScreen/UsersTab.tsx` | Confirmation alert |
| Switch active user | `src/screens/AdminScreen/UsersTab.tsx` | — (direct action) |

### Key Hooks Used Across Admin

| Hook | File | Used By |
|------|------|---------|
| `useSettingsState` | `src/hooks/useSettingsState.ts` | SettingsScreen, LanguageTab |
| `useVocabularyManagement` | `src/hooks/useVocabularyManagement.ts` | LanguageTab |
| `useProgressiveVocabularySettings` | `src/hooks/useProgressiveVocabularySettings.ts` | LanguageTab |
| `useActivityBoardOperations` | `src/hooks/useActivityBoardOperations.ts` | ActivityBoardsSubTab |
| `useCoreFringeLayoutOperations` | `src/hooks/useCoreFringeLayoutOperations.ts` | CoreFringeLayoutsSubTab |
| `useSymbolDeletion` | `src/hooks/useSymbolDeletion.ts` | SymbolsSubTab |
| `useCategoryTranslations` | `src/hooks/useCategoryTranslations.ts` | SymbolsSubTab, PhrasesSubTab, CategoriesSubTab |
| `useDeviceType` | `src/hooks/useDeviceType.ts` | AdminScreen (layout gate) |
| `useUserProfile` | `src/hooks/useUserProfile.ts` | UsersTab |

### Shared UI Components Used in Admin

| Component | File |
|-----------|------|
| `PINModal` | `src/components/PINModal.tsx` |
| `GridSizePickerOverlay` | `src/components/GridSizePickerOverlay.tsx` |
| `FontSizePickerOverlay` | `src/components/FontSizePickerOverlay.tsx` |
| `GridSizePreviewModal` | `src/components/settings/GridSizePreviewModal.tsx` |
| `PackCard` | `src/components/settings/PackCard.tsx` |
| `CollapsibleSection` | `src/components/settings/CollapsibleSection.tsx` |
| `SettingItemSwitch` | `src/components/settings/SettingItemSwitch.tsx` |
| `SettingItemButton` | `src/components/settings/SettingItemButton.tsx` |
| `SettingItemActionButton` | `src/components/settings/SettingItemActionButton.tsx` |
| `StatisticsRow` | `src/components/settings/StatisticsRow.tsx` |
| `VocabularyLanguageList` | `src/components/settings/VocabularyLanguageList.tsx` |
| `StatusCard` | `src/components/settings/StatusCard.tsx` |
| `ProgressCard` | `src/components/settings/ProgressCard.tsx` |
| `CategoryProgressCard` | `src/components/settings/CategoryProgressCard.tsx` |
| `EmojiAvatarPickerModal` | `src/components/shared/EmojiAvatarPickerModal.tsx` |
| `FitzgeraldLegend` | `src/fitzgerald/ui/FitzgeraldLegend.tsx` |

---

## Tablet Landscape Layout

When `isTablet`, AdminScreen renders a specialized two-panel layout instead of the standard tab navigator. Tablets are locked to landscape orientation.

### Device Detection

Uses `useDeviceType()` hook from `src/hooks/useDeviceType.ts`:

```ts
interface DeviceTypeInfo {
  deviceType: 'phone' | 'tablet';
  orientation: 'portrait' | 'landscape';
  isTablet: boolean;
  isPhone: boolean;
  isLandscape: boolean;
  isPortrait: boolean;
  screenWidth: number;
  screenHeight: number;
  smallestDimension: number;
}
```

- Uses `expo-device` for reliable tablet detection
- Uses `useWindowDimensions` for orientation tracking
- Reacts to orientation changes in real-time

### Layout Gate

```tsx
const { isTablet } = useDeviceType();

if (isTablet) {
  return <AdminScreenTabletLandscapeLayout />;
}
return <AdminScreenStandardLayout />;
```

### Tablet Landscape Structure

```
+------------------+------------------------------------------------+
| AdminSidebar     | AdminContextBar                                |
| (fixed 300dp)    | [Flag] Settings / Content > Symbols  [Prog L2] |
|                  +------------------------------------------------+
| [Flag] EN        |                                                |
|                  |  Main Content Area                             |
| * Settings       |  (renders active tab content)                  |
| * Content        |                                                |
| * Language       |                                                |
| * Users          |                                                |
| * About          |                                                |
|                  |                                                |
| [Progression L2] |                                                |
+------------------+------------------------------------------------+
```

### New Components

| Component | File | Purpose |
|-----------|------|---------|
| `AdminScreenTabletLandscapeLayout` | `AdminScreen/AdminScreenTabletLandscapeLayout.tsx` | Root container with sidebar + main panel |
| `AdminSidebar` | `AdminScreen/AdminSidebar.tsx` | Left navigation with tab selection |
| `AdminContextBar` | `AdminScreen/AdminContextBar.tsx` | Top bar showing current context |
| `SettingsScreenTabletLandscape` | `AdminScreen/SettingsScreenTabletLandscape.tsx` | Category list + detail split |
| `ContentTabTabletLandscape` | `AdminScreen/ContentTabTabletLandscape.tsx` | Sub-tab nav + content split |
| `LanguageTabTabletLandscape` | `AdminScreen/LanguageTabTabletLandscape.tsx` | Section nav + content split |
| `AdminLayoutTokens` | `AdminScreen/AdminLayoutTokens.ts` | Layout constants |

### Settings Tab (Tablet Landscape)

Two-column layout:
- Left: Category list (Security, Voice, Appearance, Grammar, Fitzgerald, Schematic, Share, Backup & Export)
- Right: Selected category content (reuses existing section components)

```
+------------------+------------------------------------------------+
| SETTINGS         |                                                |
|                  |  [Selected Category Card]                      |
| * Security       |                                                |
|   Voice          |  - Setting controls specific to category      |
|   Appearance     |  - Scrollable content area                     |
|   Grammar        |                                                |
|   Fitzgerald     |                                                |
|   Schematic      |                                                |
|   Share          |                                                |
|   Backup & Export|                                                |
+------------------+------------------------------------------------+
```

Categories map to existing section components:
| Category | Component |
|----------|-----------|
| Security | `SecuritySettings` |
| Voice | `VoiceSettings` |
| Appearance | `AppearanceSettings` |
| Grammar | `GrammarSettings` |
| Fitzgerald | `FitzgeraldSettings` |
| Schematic | `SchematicModeSettings` |
| Share | `ShareSettings` |
| Backup & Export | `BackupExportSettings` |

### About Tab (Tablet Landscape)

Renders `AboutSection` directly in the main content area (no sub-navigation needed).

### Content Tab (Tablet Landscape)

Two-column layout:
- Left: Sub-tab navigation (Symbols, Abbreviations, Phrases, Categories, Irregular Nouns, Irregular Verbs, Activity Boards, Core-Fringe Layouts)
- Right: Selected sub-tab content (reuses existing sub-tab components)

```
+------------------+------------------------------------------------+
| CONTENT          |                                                |
|                  |  [Search bar]                                  |
| * Symbols        |  [Category filter chips]                       |
|   Abbreviations  |  [FlatList of items]                           |
|   Phrases        |                                                |
|   Categories     |  [+ Add Button]                                |
|   Irr. Nouns     |                                                |
|   Irr. Verbs     |                                                |
|   Activity Boards|                                                |
|   Core-Fringe    |                                                |
+------------------+------------------------------------------------+
```

Sub-tabs render the same components as standard layout:
- `SymbolsSubTab` - with search, filters, list, and modal
- `AbbreviationsSubTab` - with search, count, list, and modal
- `PhrasesSubTab` - with search, category chips, list, and modal
- `CategoriesSubTab` - with search, list, and inline editor modal
- `IrregularNounsSubTab` - with search, list, and editor modal
- `IrregularVerbsSubTab` - with search, list, and editor modal
- `ActivityBoardsSubTab` - with search, list, and board/button editor modals
- `CoreFringeLayoutsSubTab` - with search, list, and layout/page/slot editor modals

### Language Tab (Tablet Landscape)

Two-column layout:
- Left: Section list (Progression, Packs)
- Right: Selected section content (reuses existing components)

```
+------------------+------------------------------------------------+
| LANGUAGE         |                                                |
|                  |  [Selected Section Card]                       |
| * Progression    |                                                |
|   Packs          |  - ProgressiveVocabularySettings or            |
|                  |  - VocabularyManagementSettings                |
|                  |                                                |
+------------------+------------------------------------------------+
```

### Layout Tokens

`AdminLayoutTokens.ts` defines constants for consistent spacing:

```ts
{
  sidebarWidth: 300,        // Main sidebar width in dp
  sidebarMinWidth: 260,     // Minimum sidebar width
  sidebarMaxWidth: 340,     // Maximum sidebar width
  panelGap: 16,             // Gap between panels
  minTouchTarget: 44,       // Accessibility minimum
  contextBarHeight: 48,     // Context bar height
  settingsCategoryListRatio: 0.35,  // Settings left column ratio
  contentFiltersWidth: 280, // Content filters column width
  languageSectionListRatio: 0.3,    // Language left column ratio
}
```

### i18n Keys Added

New translation keys in `admin` namespace (all languages: en, nl, es, it):

```json
{
  "sidebar": {
    "progressionOn": "Progression",
    "progressionOff": "Progression Off"
  },
  "contextBar": {
    "progression": "Progression",
    "progressionOff": "Progression Off"
  },
  "content": {
    "symbols": "Symbols",
    "abbreviations": "Abbreviations",
    "phrases": "Phrases"
  },
  "settings.categories": {
    "security": "Security",
    "appearance": "Appearance",
    "grammar": "Grammar",
    "fitzgerald": "Fitzgerald Key",
    "schematic": "Activity Mode",
    "progression": "Progression",
    "dataManagement": "Data Management",
    "about": "About"
  },
  "language.sections": {
    "progression": "Progression",
    "packs": "Language Packs"
  }
}
```

### Key Design Principles

1. **Zero risk to other modes**: The tablet layout only activates for `isTablet`.
2. **No business logic changes**: Only UI composition changes; all hooks remain unchanged.
3. **Component reuse**: Existing section/sub-tab components are imported and rendered as-is.
4. **Navigation preserved**: Routes and params unchanged; only rendering differs.
5. **Theme-aware**: All components use `useTheme()` and support dark mode.

### Testing Checklist

**Regression (unchanged behavior)**:
- [ ] Phone portrait: standard tab layout
- [ ] Phone landscape: standard tab layout

**Tablet**:
- [ ] Two-panel layout appears
- [ ] Sidebar shows Settings/Content/Language/Users tabs
- [ ] Sidebar shows current language flag
- [ ] Sidebar shows progression status chip
- [ ] Context bar shows current tab path
- [ ] Settings: category switching works (all 8 categories)
- [ ] Content: sub-tab switching works (all 8 sub-tabs)
- [ ] Content: add/edit/delete symbols works
- [ ] Content: add/edit/delete abbreviations works
- [ ] Content: add/edit/delete phrases works
- [ ] Content: add/edit/delete categories works
- [ ] Content: add/edit/delete irregular nouns works
- [ ] Content: add/edit/delete irregular verbs works
- [ ] Content: activity board management works
- [ ] Content: core-fringe layout management works
- [ ] Language: section switching works
- [ ] Language: progression controls work
- [ ] Language: vocabulary management works
- [ ] Users: add/edit/delete/switch users works
- [ ] Header language picker opens from flag button
- [ ] Back button returns to previous screen

---

## Editor Modal Tablet Layout Pattern

Content editor modals use a responsive layout pattern that renders a two-column layout on tablet and a single-column scrollable layout on phone. This pattern was established by `BoardEditorModal` and adopted by all other editor modals.

### Pattern Overview

```
Tablet (two-column):                    Phone (single-column):
+-------------------------------------------+   +---------------------------+
| [Title]                            [X]    |   | [Title]              [X]  |
+-------------------------------------------+   +---------------------------+
| Left Column        | Right Column         |   | ScrollView                |
| (flex: 2)          | (flex: 3)            |   |  - All fields             |
|                    |                      |   |  - stacked vertically     |
| - Primary fields   | - Secondary fields   |   |                           |
| - Core settings    | - Extended settings   |   |                           |
+-------------------------------------------+   +---------------------------+
| [Delete]           [Cancel]  [Save]       |   | [Delete] [Cancel] [Save]  |
+-------------------------------------------+   +---------------------------+
```

### Structure

Each optimized modal follows this structure:

1. **Header bar**: `flexDirection: 'row'` with title text + FontAwesome `times` close button, separated from content by `borderBottomWidth: 1`
2. **Content area**:
   - **Tablet**: Single `<ScrollView>` wrapping a `<View style={twoColumnRow}>` with `<View style={leftColumn}>` and `<View style={rightColumn}>`
   - **Phone**: Single `<ScrollView>` with all fields stacked vertically
3. **Footer bar**: Delete button (FontAwesome `trash` icon) aligned left, Cancel and Save buttons aligned right, separated from content by `borderTopWidth: 1`

### Key Style Tokens

```ts
container: {
  width: isTablet ? '95%' : '100%',
  maxWidth: isTablet ? 900 : 500,
  maxHeight: '90%',
}

twoColumnRow: {
  flexDirection: 'row',
  gap: theme.spacing.xl,
  paddingHorizontal: theme.spacing.lg,
  paddingVertical: theme.spacing.md,
  // NOTE: Do NOT use flex: 1 here — parent has maxHeight not height
}

leftColumn: { flex: 2 }
rightColumn: { flex: 3 }

sectionTitle: {
  fontSize: 14,
  fontWeight: '600',
  textTransform: 'uppercase',
  letterSpacing: 0.5,
}
```

### Device Detection

Each modal uses the `useDeviceType()` hook:

```tsx
const { isTablet } = useDeviceType();
```

The `createStyles` function accepts `isTablet` as a parameter to generate responsive styles:

```tsx
const styles = createStyles(theme, isTablet);
```

### Optimized Modals

| Modal | File | Left Column | Right Column |
|-------|------|-------------|--------------|
| `BoardEditorModal` | `src/components/schematic/BoardEditorModal.tsx` | Board name, grid size, description | Button grid preview |
| `IrregularVerbEditorModal` | `src/components/IrregularVerbEditorModal.tsx` | Infinitive, language, auxiliary verb | Exception form slots (conjugations) |
| `CategoriesSubTab` (inline) | `src/screens/AdminScreen/CategoriesSubTab.tsx` | Category name, parent selector, preview | Emoji picker, image picker |
| `SymbolEditorModal` | `src/components/SymbolEditorModal.tsx` | Label, emoji, spoken text, image, category, language, toggles | Progressive vocabulary settings (admin-only) |

### Implementation Notes

- **No `flex: 1` on `twoColumnRow`**: The parent container uses `maxHeight: '90%'` without an explicit `height`, so `flex: 1` resolves to 0 height. The `<ScrollView>` wrapper handles sizing.
- **Single ScrollView**: Both columns are wrapped in one `<ScrollView>`, not individual scroll views per column. This avoids independent scroll conflicts.
- **FontAwesome icons**: Selector rows use `chevron-right` icons; image picker buttons use `photo`/`camera` icons; delete uses `trash` icon; close uses `times` icon.
- **Style prefix convention**: In `CategoriesSubTab`, modal styles are prefixed with `m` (e.g., `mSection`, `mSectionTitle`, `mSaveButton`) to avoid conflicts with existing list-view styles in the same component.
- **Progressive fields**: `SymbolEditorModal` only shows the right column (progressive vocabulary settings) when in admin mode. It returns `null` for non-admin users, collapsing to a single-column layout.

---

## Notes for Future Updates

If the admin IA changes, update this doc in this order:
1. Top-level tabs in `AdminTabParamList`.
2. `AdminScreen` header and language picker behavior.
3. `ContentTab` segmented sub-tabs.
4. Any moved settings sections between `Settings` and `Language` tabs.
5. Tablet landscape components if layout changes are needed.
