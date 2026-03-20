# Progressive Vocabulary System

The progressive vocabulary system gradually introduces words to students across 6 levels, protecting motor memory by keeping words in fixed positions as the grid expands. Students prove mastery at each level before unlocking new words.

## Table of Contents

- [Overview](#overview)
- [How Levels Work](#how-levels-work)
- [Advancement Algorithm](#advancement-algorithm)
- [Core-Fringe Mode](#core-fringe-mode)
- [Standard Grid Mode](#standard-grid-mode)
- [User Interface](#user-interface)
- [Word Stats Tracking](#word-stats-tracking)
- [Persistence](#persistence)
- [Admin Settings](#admin-settings)
- [Language Switching](#language-switching)
- [Word Finder Integration](#word-finder-integration)
- [Debug Mode](#debug-mode)
- [Architecture](#architecture)

---

## Overview

The system works on a simple principle: **use words to unlock more words**.

Students start at Level 1 with a small set of essential words. As they demonstrate consistent use of those words (by tapping them), the system tracks their progress. Once they've mastered enough words at their current level, they can advance to the next level, which reveals additional words on the grid.

Key design principles:

- **Motor memory protection**: Words never change position once introduced. A word at position (row 2, column 3) stays there forever, so muscle memory built at Level 1 carries through to Level 5.
- **Per-level evaluation**: Only the words introduced at the current level count toward advancement. Mastered words from previous levels don't inflate progress.
- **Grid-scoped in Core-Fringe mode**: Progression is based on the words actually placed on the active grid layout, not the entire vocabulary pack.

---

## How Levels Work

### Level Configuration

| Level | Threshold | Min Uses/Word | Description |
|-------|-----------|---------------|-------------|
| 1     | 80%       | 3 taps        | Essential power words |
| 2     | 75%       | 3 taps        | Core communication starter |
| 3     | 70%       | 2 taps        | Expanded core + basics |
| 4     | 65%       | 2 taps        | Full core + people vocabulary |
| 5     | --        | --            | Complete system (mastery ceiling) |
| 6     | --        | --            | Expert add-on (manual toggle) |

**Threshold** = percentage of the level's words that must be mastered.
**Min Uses/Word** = number of taps needed for a word to count as "mastered".

### Progression Example

**Level 1 to Level 2** (8-column Core-Fringe grid with 19 Level 1 words):

```
Requirements: 80% threshold, 3 uses per word
Words needed:  19 x 0.80 = 16 words mastered (each tapped 3+ times)

Progress while using words:
  "yes"   tapped 4x   -- mastered
  "no"    tapped 3x   -- mastered
  "I"     tapped 5x   -- mastered
  ...
  "help"  tapped 1x   -- needs 2 more
  "stop"  tapped 0x   -- needs 3 more

  15/16 mastered --> FAB shows 93% (orange)
  16/16 mastered --> FAB shows 100% (green) --> tap to advance
```

**Level 2 to Level 3** (13 new Level 2 words introduced):

```
Requirements: 75% threshold, 3 uses per word
Evaluation pool: ONLY the 13 new words (Level 1 words don't count)
Words needed:  13 x 0.75 = 10 words mastered

  10/10 mastered --> advance
```

The pattern repeats: each level introduces new words and evaluates only those new words. Thresholds decrease at higher levels (80% -> 75% -> 70% -> 65%) because the word pools grow larger.

### Level 5: Mastery Ceiling

Level 5 is the end of automatic progression. The system returns:

```
isReady: false
recommendation: "You have mastered the complete vocabulary system!"
progress: 1.0
```

All words up to Level 5 are visible. The FAB shows 100% with a mastery message.

### Level 6: Expert Vocabulary

Level 6 is NOT earned through usage. It is a manual toggle ("Expert Vocabulary") that a caregiver enables in admin settings. When enabled for a user at Level 5+:

- The effective level becomes 6
- Additional words tagged with `introduction_level: 6` become visible
- The number of Level 6 words varies by grid size (6 to 86 words)

Level 6 concepts are placed on all grid sizes (6-12 columns).

---

## Advancement Algorithm

The readiness calculation lives in `calculateReadiness()` (`src/types/progressiveVocabulary.ts`).

### Step-by-step

```
1. If currentLevel === 5:
     return { isReady: false, progress: 1.0 }   -- mastery, no advancement

2. Determine evaluation pool:
     - Filter unlockedWords to only those with introductionLevel === currentLevel
     - If no level metadata exists, fall back to all unlocked words

3. Count mastered words:
     masteredCount = evaluationPool.filter(word =>
       wordStats[word.label].usageCount >= config.minUsesPerWord
     ).length

4. Calculate percentage:
     percentageMastered = masteredCount / evaluationPool.length

5. Check threshold:
     meetsThreshold = percentageMastered >= config.advancementThreshold

6. Determine readiness:
     isReady = meetsThreshold

7. Calculate progress for display:
     progress = min(percentageMastered / advancementThreshold, 1.0)

8. Identify blockers:
     wordsNeedingPractice = evaluationPool words below minUsesPerWord
```

### Key behaviors

- **meetsMinUses** (all words at threshold) is tracked but does NOT block advancement. It's shown as guidance ("Keep using 3 words to build full mastery").
- **Progress** is clamped to 0-1 and displayed as a percentage on the FAB.
- **Per-level scoping** prevents carry-over: if you mastered 20 words at Level 1, those don't count toward Level 2's threshold. Only the new words introduced at Level 2 are evaluated.
- **Null introductionLevel** defaults to Level 1. Symbols without an explicit level are always visible and included in Level 1's evaluation pool.

### Advancement flow

```
User taps words --> recordWordUsage() increments usageCount
                --> updateMetrics() recalculates readiness
                --> FAB updates color/percentage

When isReady === true:
  FAB turns green with pulse animation
  User taps FAB --> ReadinessCheckModal opens
  User taps "Unlock Level X" --> advanceLevel() dispatched

  Redux reducer:
    1. Completes current level in levelHistory (sets completedAt)
    2. Increments currentLevel
    3. Resets readiness to { isReady: false, progress: 0 }
    4. Adds new level entry to levelHistory

  React re-render:
    1. visibleSymbols useMemo recalculates with new level
    2. New words appear on grid
    3. useEffect dispatches updateMetrics with new symbol pool
    4. Progress resets to 0% for the new level's words
```

---

## Core-Fringe Mode

In Core-Fringe mode, progression is scoped to the symbols placed on the **active grid layout**.

### How it works

1. `useCoreFringeMode` loads all slots across ALL pages of the active layout
2. Slots are deduplicated by symbolId
3. Category link slots are excluded (navigation buttons, not speakable words)
4. Symbols hidden by root-page pinned slots are excluded (unreachable words)
5. The resulting `allLayoutSymbols` array is the progression pool

### Grid-size independence

Each grid size (6-12 columns) has its own layout with different numbers of placed symbols:

| Grid Size | Total Concepts | Level 6 Concepts |
|-----------|---------------|-----------------|
| 6 col     | 244           | 6               |
| 7 col     | 391           | 27              |
| 8 col     | 506           | 52              |
| 9 col     | 671           | 77              |
| 10 col    | 720           | 79              |
| 11 col    | 749           | 80              |
| 12 col    | 840           | 86              |

Switching grid sizes switches the progression pool. An 8-column grid evaluates its 506 symbols independently from a 9-column grid's 671 symbols.

### Visibility filtering

```
For each symbol on the layout:
  introLevel = symbol.introductionLevel ?? 1   (default to Level 1)
  effectiveLevel = (expertVocabEnabled && currentLevel >= 5) ? 6 : currentLevel

  if introLevel <= effectiveLevel:
    symbol is VISIBLE (rendered normally)
  else:
    symbol is LOCKED (rendered as ghost slot or hidden)
```

### Ghost slots

Locked symbols render as ghost cells: visible but non-interactive empty slots. This shows students that more words exist without overwhelming them. Tapping a ghost slot opens the readiness modal.

Ghost slots can be toggled off in admin settings.

### Pinned slot handling

Root-page pinned slots always render on top of sub-page slots at the same grid position. The progression system excludes symbols that are only placed at positions occupied by pinned slots, since those symbols are never actually visible to the user.

---

## Standard Grid Mode

In Standard Grid mode (4-column layout), progression uses position-based thresholds:

```
A symbol is visible if:
  symbol.position <= LEVEL_CONFIG[effectiveLevel].totalWords - 1

Level 1: positions 0-26   (27 words, 7 rows)
Level 2: positions 0-62   (63 words, 16 rows)
Level 3: positions 0-114  (115 words, 29 rows)
Level 4: positions 0-201  (202 words, 51 rows)
Level 5: positions 0-299  (300 words, 75 rows)
Level 6: positions 0-499  (500 words, 125 rows)
```

The grid expands vertically as levels increase while maintaining 4 fixed columns.

---

## User Interface

### Floating Readiness Button (FAB)

The FAB is a 64x64px circular button anchored to the bottom-right of the main screen.

**Visual states:**

| State         | Color  | Icon | Badge    | Animation |
|---------------|--------|------|----------|-----------|
| Progress <75% | Blue   | `📊` | `XX%`    | None      |
| Progress >=75%| Orange | `💪` | `XX%`    | None      |
| Ready         | Green  | `🎉` | `100%`   | Pulse rings|

Tapping the FAB opens the Readiness Check Modal.

### Readiness Check Modal

Shows detailed progression information:

- **Progress circle** with percentage (0-100%)
- **Status title**: "Keep Going!" / "Making Progress" / "Almost There!" / "You're Ready!"
- **Status emoji**: `🌱` / `📈` / `💪` / `🎉` (scales with progress)
- **Level indicator**: "Level X" (or "Level X -> Level Y")
- **Stats row**: Words Used | Mastered | Total Uses
- **Recommendation text**: Human-readable guidance
- **Blockers**: Up to 12 "words needing practice" shown as chips (when not ready)
- **Actions**:
  - Not ready: "Continue Practicing" button
  - Ready: "Not Yet" (secondary) + "Unlock Level X" (primary)

### Level Up Modal

After advancing, a celebration modal appears showing:

- Congratulations message
- New level number
- Preview of newly unlocked words
- "Continue" button to dismiss

---

## Word Stats Tracking

Every word tap is tracked in Redux state (`progressiveVocabularySlice`).

### Per-word fields

| Field            | Type              | Description |
|------------------|-------------------|-------------|
| `label`          | string            | Word identifier |
| `position`       | number            | Grid position (never changes) |
| `usageCount`     | number            | Total taps (incremented on every use) |
| `lastUsed`       | ISO date or null  | Timestamp of most recent tap |
| `firstUsed`      | ISO date or null  | Timestamp of first tap |
| `introduced_at`  | ISO date          | When the word was first unlocked |

### Recording flow

```
1. Student taps a symbol on the grid
2. recordWordUsage({ label, position }) dispatched to Redux
3. Reducer:
   - Creates WordUsageStats entry if first use
   - Increments usageCount
   - Updates lastUsed timestamp
4. updateMetrics dispatched (via setTimeout(0) for next tick)
5. Metrics recalculated: wordsUsed, wordsMastered, percentages
6. Readiness reassessed with current evaluation pool
7. FAB updates to reflect new progress
8. State auto-saved after 2s debounce
```

### Mastery definition

A word is "mastered" when:
```
usageCount >= LEVEL_CONFIG[currentLevel].minUsesPerWord
```
- Levels 1-2: 3 taps to master
- Levels 3-4: 2 taps to master
- Levels 5-6: 0 (no minimum, all words count as mastered)

---

## Persistence

State is persisted to WatermelonDB via `vocabularyPersistenceService`.

### Storage format

- **Key**: `progressiveVocab_{language}_state`
- **Chunking**: Payloads >200KB are split into chunks to avoid Android SQLite CursorWindow limits
- **Auto-save**: Debounced at 2000ms; compares JSON signatures to skip redundant writes
- **Auto-load**: On mount, loads saved state and recalculates readiness with current symbol pool

### What's saved

```typescript
{
  currentLevel: 1-6,
  levelStartedAt: ISO date,
  wordStats: { [label]: WordUsageStats },
  metrics: LevelProgressMetrics,
  readiness: ReadinessAssessment,
  autoAdvanceEnabled: boolean,
  manualOverride: boolean,
  levelHistory: Array<{ level, startedAt, completedAt, totalUses }>,
  lastUpdated: ISO date
}
```

### Import safety

When loading saved state (`importProgressionState`), readiness is always reset:
```typescript
state.readiness.isReady = false;
state.readiness.progress = 0;
```
This prevents stale readiness from immediately triggering advancement. Readiness is recalculated on the next `updateMetrics` dispatch using the current symbol pool.

### Export/Import

The admin screen provides export (backup) and import (restore) functionality for progression data. Exports include a timestamp and all state fields.

---

## Admin Settings

Available in the admin screen under "Progressive Vocabulary":

| Setting | Description |
|---------|-------------|
| **Enable Progression** | Toggle the entire system on/off. When off, all symbols are visible. |
| **Show Ghost Slots** | Display locked word positions as empty ghost cells. |
| **Auto-Advance Levels** | Feature flag for automatic advancement (manual only in current build). |
| **Expert Vocabulary** | Unlock Level 6 words (only visible when at Level 5+). |
| **Check Readiness** | Opens the readiness modal to see detailed progress. |
| **Reset Progression** | Resets all words back to Level 1 (requires confirmation). |

The admin screen also displays:

- **Current Level & Grid Size**: Level number, total words in pool, words unlocked
- **Progress by Category**: Per-category breakdown showing unlocked/total counts with progress bars

In Core-Fringe mode, category names and totals are derived dynamically from the actual grid layout symbols and their `categoryId` fields, matched against DB category records. This means:

- Only categories with symbols on the grid are shown
- Totals reflect the actual number of symbols per category on the layout
- Unlocked counts reflect how many of those symbols are visible at the current level

In Standard Grid mode, category totals are hardcoded based on the vocabulary pack distribution.

---

## Language Switching

Progression state is stored **per language**. Each language has its own independent progression data.

### Storage key

```
progressiveVocab_{language}_state
```

For example: `progressiveVocab_en_state`, `progressiveVocab_nl_state`.

### Behavior on language change

When the user switches to a different language:

1. The current language's progression state is auto-saved (via the 2s debounce)
2. `useProgressiveVocabulary` detects the language change (`loadedLanguageRef.current !== language`)
3. It loads saved state for the new language from persistence
4. **If saved state exists**: Redux store is populated with that language's progression (level, word stats, metrics)
5. **If no saved state exists**: Redux store resets to Level 1 with empty word stats (`resetProgression()` dispatched)

Switching back to a previous language restores that language's full progression history.

### Core-Fringe mode

In Core-Fringe mode, the symbol pool is also reloaded when the language changes, since each language may have a different active layout with different symbols.

---

## Word Finder Integration

The Word Finder (`src/services/wordFinderService.ts`) helps users locate symbols on the grid by computing navigation paths from the root page to a target symbol.

### Pinned slot occlusion

Root-page pinned slots always render on top of sub-page slots at the same grid position. The Word Finder accounts for this:

1. On search, it loads all pinned slots on the root page
2. Builds a set of `"row-col"` position keys for pinned root slots
3. When evaluating symbol placements, it skips any non-root-page slot whose position is occupied by a pinned root slot
4. This ensures the Word Finder never guides users to an unreachable symbol

**Example**: If "dance" is at row=0, col=6 on the `activities` page, but "good" is pinned at row=0, col=6 on the root page, the Word Finder skips the shallow path (activities → dance) and instead guides to the deeper but reachable path (activities → sports → dance).

### Consistency with progression

The same pinned slot occlusion logic is applied in the progressive vocabulary symbol pool (`CoreFringeModeContainer.onGridSymbolsReady` and `useProgressiveVocabularySettings.loadCoreFringeLayoutSymbols`). Symbols that are fully occluded by pinned root slots are excluded from:

- The practice pool (they don't count toward progression)
- The category progress counts in admin settings
- Word Finder navigation paths

A symbol is only excluded if **all** its placements are occluded. If it appears on multiple pages and at least one placement is reachable, it remains in the pool and the Word Finder will guide to the reachable placement.

---

## Debug Mode

The `PROGRESSIVE_DEBUG` flag (`src/types/progressiveVocabulary.ts`) enables rapid testing of the progression system.

### What it changes

| Aspect | Normal | Debug |
|--------|--------|-------|
| `minUsesPerWord` (Levels 1-4) | 2-3 taps | 1 tap |
| Console logging | Off | Verbose `[ProgVocab]` logs |

Thresholds (80%, 75%, etc.) remain unchanged. Only the per-word tap requirement is reduced.

### Debug configuration

```typescript
export const PROGRESSIVE_DEBUG = true;  // Set to false for production

export const DEBUG_LEVEL_CONFIG = {
  1: { ...LEVEL_CONFIG[1], minUsesPerWord: 1 },
  2: { ...LEVEL_CONFIG[2], minUsesPerWord: 1 },
  3: { ...LEVEL_CONFIG[3], minUsesPerWord: 1 },
  4: { ...LEVEL_CONFIG[4], minUsesPerWord: 1 },
  5: { ...LEVEL_CONFIG[5] },  // unchanged
  6: { ...LEVEL_CONFIG[6] },  // unchanged
};
```

### Log prefix

All debug logs use the `[ProgVocab]` prefix for easy filtering. Logged events include:

- Symbol pool loading (counts by level, occluded symbols)
- Visibility filtering (visible/locked split)
- Word usage recording
- Metrics recalculation
- Readiness assessment (evaluation pool size, mastered count, threshold check)
- Level advancement

### Stale closure pattern

`useMainScreenState` uses a ref-based pattern (`recordUsageRef`) to avoid stale closures in memoized grid cells. `CoreFringeCell` uses `React.memo` and doesn't re-render when `onPress` changes, so the press handler reads from the ref instead of the closure:

```typescript
const recordUsageRef = useRef<((label: string, position: number) => void) | null>(null);
recordUsageRef.current = recordUsage;  // Updated on every render

// In handleSymbolPress (stable callback):
if (progressionEnabled && recordUsageRef.current) {
  recordUsageRef.current(symbol.label, (symbol as any).position ?? 0);
}
```

---

## Architecture

### Key files

| File | Role |
|------|------|
| `src/types/progressiveVocabulary.ts` | Types, LEVEL_CONFIG, calculateReadiness algorithm |
| `src/store/progressiveVocabularySlice.ts` | Redux slice: actions, reducers, selectors |
| `src/hooks/useProgressiveVocabulary.ts` | Main hook: filtering, metrics, persistence, actions |
| `src/hooks/useCoreFringeProgressive.ts` | Core-Fringe wrapper: locks slots, builds progression pool |
| `src/services/vocabularyPersistenceService.ts` | Save/load/export/import state (per-language chunked storage) |
| `src/services/wordFinderService.ts` | Path-finding for Word Finder (pinned slot occlusion aware) |
| `src/components/corefringe/CoreFringeModeContainer.tsx` | Loads reachable layout symbols via `onGridSymbolsReady` |
| `src/components/FloatingReadinessButton.tsx` | FAB component |
| `src/components/ReadinessCheckModal.tsx` | Detailed progress modal |
| `src/hooks/useProgressiveVocabularySettings.ts` | Admin screen hook: category progress, actions |
| `src/screens/SettingsScreen/sections/ProgressiveVocabularySettings.tsx` | Admin UI component |

### Data flow

```
Vocabulary Pack (introduction_level per concept)
       |
       v
WatermelonDB Symbol model (introductionLevel field)
       |
       v
useCoreFringeMode -----> allLayoutSymbols (all symbols on active layout)
       |
       v
useCoreFringeProgressive -----> gridProgressiveSymbols (full pool)
       |
       v
useProgressiveVocabulary -----> visibleSymbols / lockedSymbols
       |                        (filtered by effectiveLevel)
       v
progressiveVocabularySlice (Redux)
  - recordWordUsage    (track taps)
  - updateMetrics      (recalculate readiness)
  - advanceLevel       (level up)
  - importProgressionState (load saved data)
       |
       v
vocabularyPersistenceService -----> WatermelonDB settings table
```

### Level history

Each level advancement is recorded:

```typescript
levelHistory: [
  { level: 1, startedAt: "2025-01-15T...", completedAt: "2025-02-01T...", totalUses: 467 },
  { level: 2, startedAt: "2025-02-01T...", completedAt: "2025-02-20T...", totalUses: 892 },
  { level: 3, startedAt: "2025-02-20T...", completedAt: null, totalUses: 0 },  // current
]
```

This enables tracking time spent per level and total usage patterns across the progression journey.
