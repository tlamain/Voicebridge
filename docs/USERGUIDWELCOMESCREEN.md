# Welcome Screen (Setup Wizard) Guide

## Overview

The Welcome Screen (`SetupWizard`) is an onboarding flow shown on first app launch (when `welcome_completed` setting is false). It guides users through initial configuration using a horizontally-swipeable `PagerView` with animated step indicators and Back/Next navigation buttons.

The number of steps is **dynamic**: the wizard adapts its step list based on the **Input Mode** selected at step 2. Symbol Grid mode shows all steps (12 total); Text Only mode shows a reduced set (7 total), skipping steps that are irrelevant to text-based communication.

**Key files:**
- `src/screens/SetupWizard/SetupWizard.tsx` — Main container; defines `STEP_CONFIGS` and computes the active filtered step list
- `src/screens/SetupWizard/useSetupWizardState.ts` — Centralized state management
- `src/screens/SetupWizard/steps/` — Individual step components
- `src/screens/SetupWizard/components/` — Shared UI components (StepIndicator, WizardNavButtons, OptionCard)

---

## Visual Layout

### Navigation Chrome

```
+-------------------------------------------------------------+
|                                                             |
|                      [ Step Content ]                       |
|                                                             |
+-------------------------------------------------------------+
|                    ● ● ● ○ ○ ○ ○                           |  <- StepIndicator (dynamic dots)
+-------------------------------------------------------------+
|   [Back]                                       [Next]       |  <- WizardNavButtons
+-------------------------------------------------------------+
```

- **StepIndicator**: Animated dots matching the active step count. Active dot is full scale/opacity, inactive are reduced. All dots are tappable to jump to any step.
- **WizardNavButtons**: Back (hidden on step 0), Next (or "Get Started" on final step). Next is disabled when validation fails.

---

## Step Filtering by Input Mode

The active step list is computed in `SetupWizard.tsx` by filtering `STEP_CONFIGS` against `state.selectedInputMode`:

| Step            | Symbol Grid | Text Only |
|-----------------|:-----------:|:---------:|
| Language        | ✓           | ✓         |
| Profile         | ✓           | ✓         |
| **Input Mode**  | ✓           | ✓         |
| Grid Mode       | ✓           | —         |
| Voice           | ✓           | ✓         |
| Fitzgerald Key  | ✓           | —         |
| Progressive Vocab | ✓         | —         |
| Appearance      | ✓           | ✓         |
| Grid Layout     | ✓           | —         |
| Smart Grammar   | ✓           | —         |
| PIN Setup       | ✓           | ✓         |
| Summary         | ✓           | ✓         |
| **Total**       | **12**      | **7**     |

Filtering happens reactively: when the user selects an input mode at step 2, steps after that point appear or disappear immediately. Since the InputMode step is always step index 2 and all filtered steps come after it, the user's current page position remains valid.

---

## Steps

### Step 0: Language Selection

**File:** `steps/WelcomeLanguageStep.tsx`
**Icon:** 🌍

```
+-------------------------------------------------------------+
|                        [App Logo]                           |
|                    Welcome to Loquor!                        |
|             Select your preferred language                   |
|                                                             |
|  +-------------------------------------------------------+  |
|  |  🇬🇧  English              English            ✓      |  |  <- selected
|  |  🇳🇱  Nederlands           Dutch                     |  |
|  |  🇫🇷  Français             French                    |  |
|  |  🇪🇸  Español              Spanish                   |  |
|  +-------------------------------------------------------+  |
+-------------------------------------------------------------+
```

- **Available languages:** English, Dutch, French, Spanish
- **Default:** English (`en`)
- **Behavior:** Selecting a language immediately applies `i18n.changeLanguage()` so all subsequent steps render in the chosen language.
- **Validation:** None (always valid).

---

### Step 1: User Profile

**File:** `steps/ProfileInfoStep.tsx`
**Icon:** 👤

```
+-------------------------------------------------------------+
|                          👤                                  |
|                     User Profile                             |
|        Tell us about the person who will use this device.    |
|                                                             |
|  +-------------------------------------------------------+  |
|  |            [ Avatar Circle ]                          |  |
|  |         Add Photo  |  Pick Emoji                      |  |
|  |              Remove (if set)                          |  |
|  |                                                       |  |
|  |  NAME *                                               |  |
|  |  [ Enter user name                          ]        |  |
|  |  Name is required to continue                         |  |
|  |                                                       |  |
|  |  AGE                                                  |  |
|  |  [ e.g., 5 years old                        ]        |  |
|  |                                                       |  |
|  |  DIAGNOSIS                                            |  |
|  |  [ Optional                                 ]        |  |
|  |                                                       |  |
|  |  NOTES                                                |  |
|  |  [ Therapist or caregiver notes...          ]        |  |
|  +-------------------------------------------------------+  |
+-------------------------------------------------------------+
```

- **Avatar options (priority order):** Photo from camera roll → Emoji from picker → First letter of name
- **Name:** Required. Next button disabled until non-empty.
- **Age, Diagnosis, Notes:** Optional free-text fields.
- **Behavior:** Profile data saved to the user registry via `userProfileService.updateProfile()` on finish.

---

### Step 2: Input Mode *(new)*

**File:** `steps/InputModeStep.tsx`
**Icon:** 💬

```
+-------------------------------------------------------------+
|                          💬                                  |
|              How Will You Communicate?                       |
|   Choose your primary communication style. You can          |
|   change this later in Settings.                             |
|                                                             |
|  +-------------------------------------------------------+  |
|  | 🔲  Symbol Grid                              ✓        |  |
|  |     Use a symbol grid to build messages by tapping    |  |
|  |     pictograms. Great for AAC users who rely on       |  |
|  |     visual communication.                             |  |
|  +-------------------------------------------------------+  |
|  | ⌨️  Text Only                                         |  |
|  |     Type messages with a keyboard and use quick       |  |
|  |     phrases and shortcuts.                            |  |
|  +-------------------------------------------------------+  |
+-------------------------------------------------------------+
```

- **Options:** `symbol_only` (Symbol Grid), `text` (Text Only)
- **Default:** `symbol_only`
- **Effect:** Selecting Text Only immediately removes symbol-grid-specific steps from the wizard (Grid Mode, Fitzgerald Key, Progressive Vocabulary, Grid Layout, Smart Grammar).

---

### Step 3 *(Symbol Grid only)*: Grid Mode

**File:** `steps/GridModeStep.tsx`
**Icon:** 📊

```
+-------------------------------------------------------------+
|                          📊                                  |
|                   Choose Your Layout                         |
|                                                             |
|  +-------------------------------------------------------+  |
|  | 🎯  Core-Fringe Grid                          ✓       |  |
|  |     Core vocabulary stays pinned while fringe changes |  |
|  +-------------------------------------------------------+  |
|  | 📋  Standard Symbol Grid                              |  |
|  |     Classic category-based symbol navigation          |  |
|  +-------------------------------------------------------+  |
|  | 📌  Activity Boards                                   |  |
|  |     Symbols grouped by activity or event              |  |
|  +-------------------------------------------------------+  |
+-------------------------------------------------------------+
```

- **Options:** `corefringe`, `standard`, `schematic` (Activity Boards)
- **Default:** `corefringe`
- Uses `OptionCard` component with press animation.

---

### Step 4 (Symbol) / Step 3 (Text): Voice Provider

**File:** `steps/VoiceProviderStep.tsx`
**Icon:** 🔊

```
+-------------------------------------------------------------+
|                          🔊                                  |
|                   Choose a Voice                             |
|                                                             |
|  +-------------------------------------------------------+  |
|  | 📱  Device Voice                                 ✓    |  |
|  |     Use your device's built-in TTS. Works offline.    |  |
|  +-------------------------------------------------------+  |
|  | ✨  ElevenLabs                                        |  |
|  |     Premium AI-powered voices. Requires internet.     |  |
|  +-------------------------------------------------------+  |
|                                                             |
|  Hint: Configure API key in Settings after setup.           |
+-------------------------------------------------------------+
```

- **Options:** `device`, `elevenlabs`
- **Default:** `device`
- Shown in both modes (TTS is used in text mode too).

---

### Step 5 *(Symbol Grid only)*: Fitzgerald Key

**File:** `steps/FitzgeraldStep.tsx`
**Icon:** 🎨

```
+-------------------------------------------------------------+
|                          🎨                                  |
|                Color-Coded Grammar                           |
|                                                             |
|  +-------------------------------------------------------+  |
|  |  [I]    [want]   [big]   [water]  [please]           |  |  <- color-coded sentence
|  +-------------------------------------------------------+  |
|                                                             |
|  ● People  ● Verbs  ● Nouns  ● Adjectives  ● Social       |  <- legend chips
|                                                             |
|  +-------------------------------------------------------+  |
|  |  Enable Fitzgerald Key                    [toggle]    |  |
|  |  Words are color-coded by type...                     |  |
|  +-------------------------------------------------------+  |
+-------------------------------------------------------------+
```

- **Default:** Disabled (`false`)
- Shows a live sentence preview with category colors and a legend.

---

### Step 6 *(Symbol Grid only)*: Progressive Vocabulary

**File:** `steps/ProgressiveVocabularyStep.tsx`
**Icon:** 📈

```
+-------------------------------------------------------------+
|                          📈                                  |
|               Progressive Vocabulary                         |
|                                                             |
|  +-------------------------------------------------------+  |
|  |  Learning Levels                                      |  |
|  |  Level 1  ████████░░░░░░░░  50 words                 |  |
|  |  Level 2  ██████░░░░░░░░░░  100 words                |  |
|  |  Level 3  █████░░░░░░░░░░░  200 words                |  |
|  |  Level 4  ████░░░░░░░░░░░░  350 words                |  |
|  |  Level 5  ███░░░░░░░░░░░░░  500 words                |  |
|  +-------------------------------------------------------+  |
|                                                             |
|  +-------------------------------------------------------+  |
|  |  Enable Progressive Vocabulary            [toggle]    |  |
|  |  Words are introduced gradually as you learn.         |  |
|  +-------------------------------------------------------+  |
+-------------------------------------------------------------+
```

- **Default:** Disabled (`false`)
- Shows level preview with progress bars and word counts.

---

### Step 7 (Symbol) / Step 4 (Text): Appearance

**File:** `steps/AppearanceStep.tsx`
**Icon:** ✨

```
+-------------------------------------------------------------+
|                          ✨                                  |
|                    Appearance                                |
|                                                             |
|  Theme                                                      |
|  +------------------+  +------------------+                 |
|  | ☀️ Light    ✓   |  | 🌙 Dark         |                 |
|  +------------------+  +------------------+                 |
|  +------------------+  +------------------+                 |
|  | 👁️ High Contrast|  | 🧸 Child Friendly|                 |
|  +------------------+  +------------------+                 |
|                                                             |
|  Symbol Font Size                                           |
|  +-------------------------------------------------------+  |
|  |         "water"  (12px)                               |  |  <- live preview
|  +-------------------------------------------------------+  |
|  [ 8 ] [ 9 ] [10] [11] [12✓] [14] [15]                    |  <- size buttons
+-------------------------------------------------------------+
```

- **Theme options:** Light, Dark, High Contrast, Child Friendly
- **Font sizes:** 8–15
- **Defaults:** Light theme, size 12

---

### Step 8 *(Symbol Grid only)*: Grid Layout

**File:** `steps/GridLayoutStep.tsx`
**Icon:** 📐

```
+-------------------------------------------------------------+
|                          📐                                  |
|                    Grid & Layout                             |
|                                                             |
|  Grid Size                                                  |
|  [ 6 cols ] [ 7 cols ] [ 8 cols✓] [ 9 cols ] ...  ->      |  <- horizontal scroll
|                                                             |
|  Landscape Display                                          |
|  +-------------------------------------------------------+  |
|  | 📝  Composer Only                                     |  |
|  +-------------------------------------------------------+  |
|  | 🖼️  Message Builder Only                         ✓    |  |
|  +-------------------------------------------------------+  |
+-------------------------------------------------------------+
```

- **Grid sizes:** 6–12 columns (horizontal scroll)
- **Landscape modes:** `composer`, `messageBuilder`
- **Defaults:** `DEFAULT_GRID_COLUMNS`, `messageBuilder`

---

### Step 9 *(Symbol Grid only)*: Smart Grammar

**File:** `steps/GrammarStep.tsx`
**Icon:** 🧠

```
+-------------------------------------------------------------+
|                          🧠                                  |
|                    Smart Grammar                             |
|                                                             |
|  +-------------------------------------------------------+  |
|  |  Smart Grammar                            [toggle]    |  |
|  |  Automatically conjugate verbs based on context       |  |
|  +-------------------------------------------------------+  |
|                                                             |
|  +-------------------------------------------------------+  |
|  |  Grid Long-Press Form Selection           [toggle]    |  |
|  |  Long-press verbs/nouns to choose a specific form     |  |
|  +-------------------------------------------------------+  |
|                                                             |
|  Hint: Fine-tune grammar settings later in Admin screen.    |
+-------------------------------------------------------------+
```

- **Defaults:** Both enabled (`true`)

---

### Step 10 (Symbol) / Step 5 (Text): PIN Setup

**File:** `steps/PinSetupStep.tsx`
**Icon:** 🔐

```
+-------------------------------------------------------------+
|                          🔐                                  |
|                   PIN Protection                             |
|                                                             |
|  +-------------------------------------------------------+  |
|  |  Enable PIN Protection                    [toggle]    |  |
|  |  A PIN will be required for admin settings            |  |
|  +-------------------------------------------------------+  |
|                                                             |
|  +-------------------------------------------------------+  |  <- only when enabled
|  |  Enter a 4-6 digit PIN                               |  |
|  |  ● ● ● ○ ○ ○                                        |  |  <- PIN circles
|  |                                                       |  |
|  |  [1] [2] [3]                                         |  |
|  |  [4] [5] [6]                                         |  |  <- number pad
|  |  [7] [8] [9]                                         |  |
|  |  [ ] [0] [⌫]                                         |  |
|  |                                                       |  |
|  |  [Confirm]                                            |  |
|  +-------------------------------------------------------+  |
+-------------------------------------------------------------+
```

- **Default:** Disabled
- **Validation:** PIN must be 4–6 digits. Confirmation must match.
- **Phases:** Entry → Confirm → Done (with retry option).

---

### Step 11 (Symbol) / Step 6 (Text): Summary

**File:** `steps/SummaryStep.tsx`
**Icon:** 🚀

The summary card adapts to the selected input mode — symbol-grid-only rows are hidden in text mode.

**Symbol Grid summary:**
```
+-------------------------------------------------------+
| User              John                                |  <- only if name entered
|-------------------------------------------------------|
| Language           🇬🇧 English                        |
| Input Mode         Symbol Grid                        |
| Grid Mode          Core-Fringe Grid                   |
| Voice              Device Voice                       |
| Fitzgerald Key     Off                                |
| Progressive        Off                                |
| PIN Protection     Off                                |
| Theme              Light                              |
| Grid Size          8 columns                          |
+-------------------------------------------------------+
```

**Text Only summary:**
```
+-------------------------------------------------------+
| User              John                                |  <- only if name entered
|-------------------------------------------------------|
| Language           🇬🇧 English                        |
| Input Mode         Text Only                          |
| Voice              Device Voice                       |
| PIN Protection     Off                                |
| Theme              Light                              |
+-------------------------------------------------------+
```

- Read-only review of all configured settings.
- "Get Started" button finalizes setup and dismisses the wizard.

---

## State Management

### useSetupWizardState

Centralized hook managing all app settings for the wizard:

| State                          | Type                   | Default                |
|--------------------------------|------------------------|------------------------|
| `selectedLanguage`             | `string`               | `'en'`                 |
| `selectedInputMode`            | `InputMode`            | `'symbol_only'`        |
| `selectedGridMode`             | `GridMode`             | `'corefringe'`         |
| `selectedVoiceProvider`        | `VoiceProvider`        | `'device'`             |
| `fitzgeraldEnabled`            | `boolean`              | `false`                |
| `progressionEnabled`           | `boolean`              | `false`                |
| `selectedTheme`                | `ThemeName`            | `'light'`              |
| `selectedGridColumns`          | `number`               | `DEFAULT_GRID_COLUMNS` |
| `selectedLandscapeMode`        | `LandscapeDisplayMode` | `'messageBuilder'`     |
| `selectedFontSize`             | `number`               | `12`                   |
| `smartGrammarEnabled`          | `boolean`              | `true`                 |
| `gridInflectionPickerEnabled`  | `boolean`              | `true`                 |
| `pinEnabled`                   | `boolean`              | `false`                |
| `pinValue`                     | `string`               | `''`                   |
| `pinConfirmed`                 | `boolean`              | `false`                |

Profile state (name, photoUri, avatarEmoji, age, diagnosis, notes) is managed directly in `SetupWizard.tsx` via `useState`.

---

## Data Flow on Completion

When the user taps "Get Started" on the final step:

1. **Redux dispatch:** `setLanguage()` for in-memory language state
2. **WatermelonDB write:** All app settings in a single `settingsService.setSettings()` call (including `input_mode` and `welcome_completed: 'true'`). When text mode is selected, symbol-grid-only settings (`gridMode`, `fitzgeraldEnabled`, `progressionEnabled`, `smartGrammarEnabled`, `gridInflectionPickerEnabled`) are written with safe defaults so the app behaves correctly if the user switches modes later.
3. **PIN:** Persisted via `settingsService.setPin()` if enabled and confirmed
4. **User profile:** Saved via `userProfileService.updateProfile()` with name, avatar, age, diagnosis, notes
5. **Theme:** Applied via `ThemeContext.setTheme()` (auto-persists)
6. **Dismiss:** Modal closes; `MainScreen` re-reads both general settings and `input_mode` from DB to immediately route to the correct screen
7. **Background:** Auto-imports core vocabulary pack if language is in `AUTO_IMPORT_LANGUAGE_CODES` (EN, NL, FR, ES)

---

## Shared Components

### OptionCard (`components/OptionCard.tsx`)

Reusable selection card with icon, title, description, and checkmark. Press animation scales to 0.97. Used by Input Mode, Grid Mode, Voice Provider, and Grid Layout steps.

### StepIndicator (`components/StepIndicator.tsx`)

Row of animated dots matching the active step count. Active dot is full scale/opacity; inactive dots are 0.8 scale and 0.35 opacity. All dots are tappable to jump directly to any step.

### WizardNavButtons (`components/WizardNavButtons.tsx`)

Back/Next/Get Started buttons. Back hidden on step 0. Next can be disabled via `nextDisabled` prop (used on the Profile step for name validation). Shows loading state during finish.

---

## Relation to NewUserWizardModal

The `NewUserWizardModal` (`src/screens/SetupWizard/NewUserWizardModal.tsx`) shares the same steps and components but is used for creating additional user profiles from the Users tab. Key differences:

| Aspect                 | SetupWizard (Welcome)          | NewUserWizardModal           |
|------------------------|--------------------------------|------------------------------|
| When shown             | First app launch               | "Add Advanced" in Users tab  |
| Step order             | Language → Profile → Settings  | Profile → Language → Settings|
| Profile step           | Step 1                         | Step 0                       |
| Input mode filtering   | Yes (dynamic step list)        | No                           |
| On finish              | Persists directly to DB        | Returns data to parent       |
| Cancel behavior        | Cannot cancel (no back on 0)   | Cancel reverts language      |

---

## Styling

All components follow the project's theme-based pattern:
- `useMemo(() => createStyles(theme), [theme])` for memoized StyleSheets
- Colors, spacing, typography, border radius, and shadows from `FullTheme`
- Dark mode awareness via `theme.dark` boolean
- Max width constraints (440px) for responsive centered content
- `React.memo` on all step components to prevent unnecessary re-renders
