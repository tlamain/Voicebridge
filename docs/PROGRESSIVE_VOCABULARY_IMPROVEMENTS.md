# Progressive Vocabulary System - Improvement Plan

This plan focuses on the core-fringe progressive vocabulary path.
It fixes locking gaps, stale progress, and duplicated reachability logic without changing the underlying progression model.

## Principles

- Keep the **raw reachable runtime pool** separate from the **currently visible/unlocked pool**.
- Compute **effectiveLevel** once and reuse it everywhere.
- Apply reachability and visibility rules consistently across progression, admin stats, and Word Finder.
- Preserve edit mode even when runtime filtering becomes stricter.
- If runtime visibility and edit visibility need different behavior, split the data flow instead of hiding the mismatch at the render layer.

## Recommended order

1. Pre-work - Audit call sites and define contracts
2. Phase 1 - Shared Reachability Service
3. Phase 2 - Hidden Slot Runtime Consistency
4. Phase 3 - Expert Vocabulary Unlocks Level 6 in Core-Fringe
5. Phase 4 - Reactive Reachability and Progress Recalculation
6. Phase 5 - Word Finder Respects Locked Words
7. Phase 6 - Locked Ghost Slots Show Actionable Feedback

---

## Pre-work - Audit call sites and define contracts

### Goal

Define shared payloads and ownership boundaries before replacing inline logic.

### Steps

1. Audit every reachability consumer, not only the three already identified.
2. Define a shared reachability payload that progression, admin stats, and Word Finder can all use directly.
3. Decide where `effectiveLevel` is owned.
   - Preferred: `useProgressiveVocabulary(...)` computes and returns it.
4. Decide how `showGhostSlots` should behave in core-fringe before Phase 6.

### Validation

- Every consumer of reachability is listed.
- The shared payload includes the symbol fields progression already needs.
- There is one documented source of truth for `effectiveLevel`.

---

## Phase 1 - Shared Reachability Service

### Problem

Reachability is currently duplicated:

| Location | Purpose |
|----------|---------|
| `src/components/corefringe/CoreFringeModeContainer.tsx` | Builds progression pool |
| `src/hooks/useProgressiveVocabularySettings.ts` | Builds admin category totals |
| `src/services/wordFinderService.ts` | Recomputes pinned-root occlusion |

These paths are close, but not identical. That creates drift risk.

### Goal

Create one service and one shared invalidation path for layout-wide runtime reachability.

### New file

`src/services/reachableSymbolsService.ts`

### Suggested API

```typescript
export interface ReachableSymbolInfo {
  symbolId: string;
  conceptKey: string | null;
  categoryId: string | null;
  label: string;
  emoji: string | null;
  imageUri: string | null;
  spokenText: string | null;
  position: number | null;
  motorZone: string | null;
  wordType: string | null;
  introductionLevel: number | null;
  usagePriority: string | null;
  reachableSlots: Array<{
    pageId: string;
    rowIndex: number;
    columnIndex: number;
    isRootPage: boolean;
  }>;
}

export interface ReachabilityResult {
  reachableSymbols: ReachableSymbolInfo[];
  reachableSymbolIds: Set<string>;
  pinnedRootPositions: Set<string>;
  occludedSymbolIds: Set<string>;
  invisibleSlotKeys: Set<string>;
  reachableSlotKeys: Set<string>;
  signature: string;
}

export async function computeReachableSymbols(
  layoutId: string,
  language: string
): Promise<ReachabilityResult>;

export function observeReachableSymbols(
  layoutId: string,
  language: string,
  onChange: (result: ReachabilityResult) => void
): () => void;
```

### Steps

1. Extract the all-pages reachability logic from the container and admin hook.
2. Keep the service runtime-focused:
   - load all pages
   - load all slots
   - build `pinnedRootPositions` from visible pinned root slots
   - skip category links
   - skip invisible slots
   - mark sub-page slots under pinned root positions as occluded
   - deduplicate reachable symbols by `symbolId`
3. Return the full progressive symbol payload currently emitted by `onGridSymbolsReady(...)`.
   - Do not require a second symbol fetch in consumers.
4. Pair the one-shot computation with a shared reactive wrapper or invalidation mechanism.
5. Migrate `CoreFringeModeContainer`, `useProgressiveVocabularySettings`, and `wordFinderService` to the shared logic.

### Validation

- Progression, admin stats, and Word Finder agree on reachable symbols for the same layout.
- A symbol with one occluded placement and one reachable placement remains reachable.
- The shared payload still contains the fields `useProgressiveVocabulary(...)` expects.

---

## Phase 2 - Hidden Slot Runtime Consistency

### Problem

`is_visible = false` is not consistently respected.

The biggest gap is not just rendering. A hidden pinned root slot can still stay in the merged slot map and occlude a visible sub-page symbol underneath.

### Goal

Hidden slots should not exist in runtime behavior, but they must remain editable in edit mode.

### Steps

1. Exclude hidden slots from `reachableSymbolsService`.
2. Keep `slotData.isVisible` in the shared slot model.
3. Split runtime visibility from edit visibility at the slot-map merge layer, not only in `CoreFringeCell`.
   - Either add a runtime-specific merge mode to `buildMergedSlotMap(...)`
   - or split `useCoreFringeMode` into runtime/edit variants
4. In runtime mode, remove hidden slots before pinned-vs-dynamic merge.
5. In edit mode, keep hidden slots visible with hidden-state styling.
6. Skip progressive-lock handling for hidden slots.

### Validation

- Hidden slots do not render in runtime mode.
- Hidden slots do not count in progression or admin stats.
- Hidden slots do not appear in Word Finder.
- Hidden slots remain editable in edit mode.
- A hidden pinned root slot no longer blocks the visible sub-page symbol underneath.

---

## Phase 3 - Expert Vocabulary Unlocks Level 6 in Core-Fringe

### Problem

`useProgressiveVocabulary.ts` already computes:

```typescript
const effectiveLevel = (expertVocabEnabled && currentLevel >= 5) ? 6 : currentLevel;
```

But the core-fringe locking layer still receives the raw level.

### Goal

Use the same `effectiveLevel` for progression filtering and core-fringe slot locking.

### Steps

1. Expose `effectiveLevel` from `useProgressiveVocabulary(...)`.
2. Return `effectiveLevel` from `useMainScreenState.ts`.
3. In `MainScreenPhone.tsx` and `MainScreenTablet.tsx`, pass `effectiveLevel` to `CoreFringeModeContainer.tsx`.
4. In `CoreFringeModeContainer.tsx`, pass `effectiveLevel` to `useCoreFringeProgressive(...)`.
5. Rename the hook parameter from `currentLevel` to `effectiveLevel`.
6. Keep `onGridSymbolsReady(...)` unchanged.
   - reachable pool = what exists on the layout and can be reached
   - visible pool = what is unlocked at the current effective level

### Validation

- Enabling Expert Vocabulary at Level 5 immediately unlocks Level 6 symbols in core-fringe.
- Disabling it re-locks them.
- Admin category progress reflects the same effective-level behavior.

---

## Phase 4 - Reactive Reachability and Progress Recalculation

### Problem

When layouts change, the FAB and admin category progress can stay stale until a tap, reload, or screen reopen.

### Root cause

There is no single shared layout-wide invalidation path.

- Main screen gets one reachable pool source.
- Admin gets another.
- `useProgressiveVocabulary.ts` recalculates on some imperative paths, but not on every layout-driven visible-pool change.

### Goal

Make the data flow reactive and explicit:

1. layout-wide reachability changes
2. reachable pool re-emits to main screen and admin
3. visible pool is re-derived from reachable pool + effective level
4. metrics/readiness are recalculated from visible symbols

### Steps

1. Ship Phase 1 and Phase 4 together, or expose `observeReachableSymbols(...)` from the start.
2. Re-emit `onGridSymbolsReady(...)` whenever layout-wide reachability changes.
3. Make `useProgressiveVocabularySettings.ts` subscribe to the same reachability source.
4. Cover all pages in the layout, not only the current/root page.
5. Add a `useEffect` in `useProgressiveVocabulary.ts` keyed by a stable visible-symbol signature plus `effectiveLevel` / scoping inputs.
6. Dispatch `updateMetrics(...)` with serialized **visibleSymbols**, not the raw reachable pool.
7. Keep existing imperative metric updates until the reactive path is proven complete.

### Validation

- Adding, hiding, or occluding a symbol updates the FAB without a tap.
- Admin category progress updates while the settings screen is already open.
- Toggling Expert Vocabulary recalculates progress correctly.

---

## Phase 5 - Word Finder Respects Locked Words

### Problem

At low levels, Word Finder can still guide users toward words that are currently locked.

### Design decision

Keep locked results visible, but clearly marked and non-navigable.

### Steps

1. Extend `WordFinderSearchResult` with:

```typescript
isProgressiveLocked?: boolean;
introductionLevel?: number | null;
effectiveLevel?: number;
```

2. In `searchWordFinder(...)`, accept `progressionEnabled` and `effectiveLevel`.
3. Reuse `symbol.introductionLevel` from `searchSymbolsByLabel(...)`.
4. Annotate each result after path computation.
5. Sort locked results below unlocked results.
6. Update `WordFinderSearchModal.tsx` to:
   - visually distinguish locked results
   - show "Available at Level X"
   - block selection for locked results
7. Update `useWordFinder.ts`, `MainScreenPhone.tsx`, and `MainScreenTablet.tsx` to pass progression state through.
8. Add a hard runtime guard in `CoreFringeGrid.tsx` guidance mode so a locked highlighted cell cannot activate.

### Validation

- At Level 1, a Level 4 word appears as locked in search.
- Tapping a locked result does not start navigation.
- A forced stale guidance path still cannot activate a locked cell.
- At the correct level, the same result becomes selectable.

---

## Phase 6 - Locked Ghost Slots Show Actionable Feedback

### Problem

Locked ghost cells are currently dead UI in core-fringe.

### Goal

Make locked ghost cells tappable and explain what unlock level is required and whether the user is close to advancing.

### Steps

1. Change the ghost-cell branch in `CoreFringeCell.tsx` from `View` to `TouchableOpacity`.
2. Add `onLockedCellPress` to `CoreFringeGrid.tsx` and call it before returning on a locked runtime tap.
3. Plumb that callback through `CoreFringeModeContainer.tsx`.
4. Build the feedback message in the progression owner (`useMainScreenState.ts` or a shared helper used by it), where the latest `readiness`, `currentLevel`, and `effectiveLevel` already exist.
5. Use a ref-backed or otherwise stable callback pattern.
   - `CoreFringeCell` is memoized, so do not rely on a fresh `onPress` closure alone.
6. Add `wordsNeededForAdvancement` to `ReadinessAssessment`, or compute an equivalent helper.
7. Use existing alert infrastructure for the first iteration.

### Validation

- Tapping a locked ghost cell shows the correct message.
- Near-advance states show progress-specific guidance.
- Ready-to-advance states say so.
- Edit mode remains unchanged.

---

## Cross-cutting concerns

### Data-flow rule

- `computeReachableSymbols(...)` returns the raw reachable runtime pool.
- `useProgressiveVocabulary(...)` derives visible/unlocked symbols from that pool.
- `updateMetrics(...)` must always run on the visible/unlocked pool, not the raw reachable pool.

### Settings interactions

| Setting | Notes |
|---------|-------|
| `progressionEnabled` | When `false`, progression-aware filtering, locking, and feedback must all be bypassed |
| `expertVocabEnabled` | Must affect grid locking, Word Finder, and locked-cell feedback through the same `effectiveLevel` |
| `showGhostSlots` | Persisted today, but not wired consistently. Decide before Phase 6 whether hiding ghosts also suppresses locked-cell feedback |
| `autoAdvanceLevels` | Still out of scope for core-fringe runtime until implemented end-to-end |

### Edit mode

- locked slots remain editable
- hidden slots remain recoverable/editable
- reachability filtering is for runtime features, not admin editing
- ghost-cell feedback does not apply in edit mode

### Out of scope

- standard-grid progression issues
- repo-wide `showGhostSlots` wiring outside core-fringe
- the debug flag currently set to true

---

## Testing strategy

### Unit tests

- Reachability excludes fully occluded symbols.
- Reachability excludes hidden slots.
- A hidden pinned root slot does not occlude a visible sub-page symbol in runtime mode.
- `effectiveLevel` becomes 6 when expert vocab is enabled at Level 5+.
- Changing visible symbols dispatches `updateMetrics(...)` with visible symbols only.
- Word Finder annotates and sorts locked results correctly.
- Guided activation is blocked for locked cells.
- Locked-cell feedback reads the latest readiness state.

### Integration tests

- Progression, admin stats, and Word Finder agree on reachable symbols for the same layout.
- Expert vocab toggle unlocks and re-locks Level 6 in the grid.
- Add/remove/hide/occlude a symbol and verify FAB progress updates without a tap.
- Keep admin settings open, edit the layout, and verify category progress updates without reopening.
- Search locked word -> result shown as locked -> no navigation -> unlock level -> result becomes active.
- Tap locked ghost cell -> feedback appears -> no symbol activation occurs.

### Manual QA

1. Start at Level 1 and verify grid, admin stats, and Word Finder stay consistent.
2. Enable Expert Vocabulary at Level 5 and verify Level 6 unlocks immediately.
3. Hide a pinned root slot and verify the visible sub-page symbol underneath becomes reachable at runtime.
4. Tap locked ghost cells at different readiness states and verify the feedback copy changes.
5. Force guidance to a locked word and verify the grid still blocks activation.

---

## Summary

| Phase | Improvement | Effort | Impact |
|-------|-------------|--------|--------|
| 1 | Shared reachability service | Medium | High |
| 2 | Hidden slot runtime consistency | Small-Medium | Medium |
| 3 | Expert vocab unlocks Level 6 in core-fringe | Small | High |
| 4 | Reactive reachability and progress recalculation | Medium | High |
| 5 | Word Finder respects locks and blocks bypasses | Medium | High |
| 6 | Locked ghost cells show actionable feedback | Small-Medium | High |

Phase 1 is the foundation, but it should ship with Phase 4 or expose shared reactivity from day one.

---

## Risk assessment

### Risk 1 - Hidden pinned slots can still occlude runtime content

If Phase 2 only hides hidden slots at the cell render layer, hidden pinned root slots will still occupy the merged slot map and block visible dynamic slots underneath.

**Mitigation:** Exclude hidden slots before runtime pinned/dynamic merge, or separate runtime and edit maps.

### Risk 2 - Reactivity drift between main screen and admin

Centralizing reachability into a one-shot async service is not enough if main screen and admin still observe different invalidation sources.

**Mitigation:** Ship Phases 1 and 4 together, or expose `observeReachableSymbols(...)` from the start.

### Risk 3 - Shared service returns too little data

If the service only returns IDs and labels, consumers will need secondary symbol fetches or custom remapping, recreating drift.

**Mitigation:** Return the full progressive symbol payload.

### Risk 4 - `effectiveLevel` ownership can drift

Grid locking, Word Finder, and locked-cell feedback live under screen-level callers. If each path recomputes `effectiveLevel`, behavior can diverge again.

**Mitigation:** Expose `effectiveLevel` once from the progression owner and reuse it.

### Risk 5 - Locked-cell feedback can use stale state

`CoreFringeCell` is memoized. If Phase 6 depends on new `onPress` closures alone, ghost cells can keep outdated messaging.

**Mitigation:** Use a ref-backed or otherwise stable locked-cell callback.

### Risk 6 - Word Finder race condition on level changes

If the user advances a level while Word Finder results are visible, stale lock annotations can confuse users.

**Mitigation:** Refresh or dismiss Word Finder results when progression state changes.

### Risk 7 - `showGhostSlots` and `autoAdvanceLevels` remain follow-on decisions

If `showGhostSlots` later hides ghosts in core-fringe, Phase 6 behavior may need to disappear with them. If `autoAdvanceLevels` is later wired into Phase 4 naively, reactive recalculation can create advancement loops.

**Mitigation:** Decide `showGhostSlots` behavior before Phase 6, and document a loop guard before any auto-advance work is added.

---

## Additional notes

### Error handling

Define what happens if shared reachability computation fails.

- Return an empty result with a logged warning, or
- fall back to the previous reachable snapshot,
- but do not silently leave runtime and admin consumers out of sync.

### Migration note

Existing layouts with hidden slots that were previously counted in progression will see percentage changes. That is a bug fix, but users and caregivers may still perceive it as a regression. A changelog note is worth adding.
