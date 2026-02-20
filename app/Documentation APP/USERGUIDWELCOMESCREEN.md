# Welcome Screen (Setup Wizard) Guide

## Overview

The Welcome Screen (`SetupWizard`) is an 11-step onboarding flow shown on first app launch (when `welcome_completed` setting is false). It guides users through initial configuration using a horizontally-swipeable `PagerView` with animated step indicators and Back/Next navigation buttons.

**Key files:**
- `src/screens/SetupWizard/SetupWizard.tsx` — Main container
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
|                    ● ● ● ○ ○ ○ ○ ○ ○ ○ ○                   |  <- StepIndicator (11 dots)
+-------------------------------------------------------------+
|   [Back]                                       [Next]       |  <- WizardNavButtons
+-------------------------------------------------------------+
```

- **StepIndicator**: 11 animated dots; active dot is full scale/opacity, inactive are reduced. All dots are tappable to jump to any step.
- **WizardNavButtons**: Back (hidden on step 0), Next (or "Get Started" on final step). Next is disabled when validation fails.

---

## Steps

### Step 0: Language Selection

**File:** `steps/WelcomeLanguageStep.tsx`
**Icon:** 🌍

```
+-------------------------------------------------------------+
|                        [App Logo]                           |
|                 Welcome to VoiceBridgeAAC                   |
|            Select your preferred language                    |
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

### Step 2: Grid Mode

**File:** `steps/GridModeStep.tsx`
**Icon:** 📊

```
+-------------------------------------------------------------+
|                          📊                                  |
|                   Choose Your Layout                         |
|                                                             |
|  +-------------------------------------------------------+  |
|  | 📋  Standard Grid                               ✓    |  |
|  |     Organized rows and columns of all symbols         |  |
|  +-------------------------------------------------------+  |
|  | 📌  Activity Boards                                   |  |
|  |     Themed symbol collections for activities          |  |
|  +-------------------------------------------------------+  |
|  | 🎯  Core-Fringe Grid                                 |  |
|  |     Core frequently-used + fringe specialized words   |  |
|  +-------------------------------------------------------+  |
+-------------------------------------------------------------+
```

- **Options:** `standard`, `schematic` (Activity Boards), `corefringe` (Core-Fringe Grid)
- **Default:** `standard`
- Uses `OptionCard` component with press animation.

---

### Step 3: Voice Provider

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

---

### Step 4: Fitzgerald Key

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

### Step 5: Progressive Vocabulary

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

### Step 6: Appearance

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
|  |         "water"  (11px)                               |  |  <- live preview
|  +-------------------------------------------------------+  |
|  [ 8 ] [ 9 ] [10] [11✓] [12] [13] [14]                    |  <- size buttons
+-------------------------------------------------------------+
```

- **Theme options:** Light, Dark, High Contrast, Child Friendly
- **Font sizes:** 8–14
- **Defaults:** Light theme, size 11

---

### Step 7: Grid Layout

**File:** `steps/GridLayoutStep.tsx`
**Icon:** 📐

```
+-------------------------------------------------------------+
|                          📐                                  |
|                    Grid Layout                               |
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

### Step 8: Smart Grammar

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

### Step 9: PIN Setup

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

### Step 10: Summary

**File:** `steps/SummaryStep.tsx`
**Icon:** 🚀

```
+-------------------------------------------------------------+
|                          🚀                                  |
|                    Ready to Go!                              |
|  Here's a summary of your setup. You can change all         |
|  settings later in the Admin screen.                         |
|                                                             |
|  +-------------------------------------------------------+  |
|  | User              John                                |  |  <- only if name entered
|  |-------------------------------------------------------|  |
|  | Language           🇬🇧 English                        |  |
|  | Grid Mode          Standard                           |  |
|  | Voice              Device Voice                       |  |
|  | Fitzgerald Key     Off                                |  |
|  | Progressive        Off                                |  |
|  | PIN Protection     Off                                |  |
|  | Theme              Light                              |  |
|  | Grid Size          8 columns                          |  |
|  +-------------------------------------------------------+  |
|                                                             |
|  Tip: Open the Admin screen anytime to customize further.   |
+-------------------------------------------------------------+
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
| `selectedGridMode`             | `GridMode`             | `'standard'`           |
| `selectedVoiceProvider`        | `VoiceProvider`        | `'device'`             |
| `fitzgeraldEnabled`            | `boolean`              | `false`                |
| `progressionEnabled`           | `boolean`              | `false`                |
| `selectedTheme`                | `ThemeName`            | `'light'`              |
| `selectedGridColumns`          | `number`               | `DEFAULT_GRID_COLUMNS` |
| `selectedLandscapeMode`        | `LandscapeDisplayMode` | `'messageBuilder'`     |
| `selectedFontSize`             | `number`               | `11`                   |
| `smartGrammarEnabled`          | `boolean`              | `true`                 |
| `gridInflectionPickerEnabled`  | `boolean`              | `true`                 |
| `pinEnabled`                   | `boolean`              | `false`                |
| `pinValue`                     | `string`               | `''`                   |
| `pinConfirmed`                 | `boolean`              | `false`                |

Profile state (name, photoUri, avatarEmoji, age, diagnosis, notes) is managed directly in `SetupWizard.tsx` via `useState`.

---

## Data Flow on Completion

When the user taps "Get Started" on Step 10:

1. **Redux dispatch:** `setLanguage()` for in-memory language state
2. **WatermelonDB write:** All app settings in a single `settingsService.setSettings()` call (including `welcome_completed: 'true'`)
3. **PIN:** Persisted via `settingsService.setPin()` if enabled and confirmed
4. **User profile:** Saved via `userProfileService.updateProfile()` with name, avatar, age, diagnosis, notes
5. **Theme:** Applied via `ThemeContext.setTheme()` (auto-persists)
6. **Dismiss:** Modal closes, MainScreen reloads settings from DB
7. **Background:** Auto-imports core vocabulary pack if language is in `AUTO_IMPORT_LANGUAGE_CODES` (EN, NL, FR, ES)

---

## Shared Components

### OptionCard (`components/OptionCard.tsx`)

Reusable selection card with icon, title, description, and checkmark. Press animation scales to 0.97. Used by Grid Mode, Voice Provider, and Grid Layout steps.

### StepIndicator (`components/StepIndicator.tsx`)

Row of 11 animated dots. Active dot is full scale/opacity; inactive dots are 0.8 scale and 0.35 opacity. All dots are tappable to jump directly to any step.

### WizardNavButtons (`components/WizardNavButtons.tsx`)

Back/Next/Get Started buttons. Back hidden on step 0. Next can be disabled via `nextDisabled` prop (used on step 1 for name validation). Shows loading state during finish.

---

## Relation to NewUserWizardModal

The `NewUserWizardModal` (`src/screens/SetupWizard/NewUserWizardModal.tsx`) shares the same steps and components but is used for creating additional user profiles from the Users tab. Key differences:

| Aspect                 | SetupWizard (Welcome)          | NewUserWizardModal           |
|------------------------|--------------------------------|------------------------------|
| When shown             | First app launch               | "Add Advanced" in Users tab  |
| Step order             | Language → Profile → Settings  | Profile → Language → Settings|
| Profile step           | Step 1                         | Step 0                       |
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
