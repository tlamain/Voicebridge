# Activity Board Edit Mode

## Overview

The Activity Board Edit Mode enables real-time CRUD (Create, Read, Update, Delete) operations on both the activity board dashboard and individual board grids. Users can create, edit, move, and delete boards and buttons directly without navigating to separate admin screens.

## Features

### Dashboard Features (Board Management)
- **Create new boards** via "Add Board" tile
- **Edit board properties**:
  - Board title
  - Description
  - Icon (emoji)
  - Grid size (columns × rows)
  - Background color
- **Move/reorder boards** using tap-to-select pattern
- **Delete boards** with cascade deletion of all buttons

### Board Features (Button Management)
- **Add symbols** to empty cells via symbol picker modal
- **Create new symbols** directly from the symbol picker modal
- **Add functional buttons** (Back, Home) for navigation
- **Link to other boards** for cross-board navigation
- **Edit existing buttons**:
  - Change symbol label
  - Edit spoken text (what gets vocalized)
  - Auto-matched emoji from label
  - Custom image from library or camera
  - Fitzgerald category selection
  - Hide symbol toggle
  - Background color override
  - Delete button
- **Move buttons** using tap-to-select pattern
- **Swap buttons** when moving to an occupied cell
- **PIN protection** when admin lock is enabled

## User Interface

### Edit Mode Toggle

The edit mode toggle button appears in the left sidebar (landscape) or header (portrait) next to the settings icon:

- **Pencil icon**: Tap to enter edit mode
- **Checkmark icon**: Tap to exit edit mode (saves automatically)

The toggle is only visible when:
1. Schematic mode is enabled

### Visual Indicators in Edit Mode

#### On Dashboard
- **Board tiles**: Show pencil icon indicator in edit mode
- **Selected board**: Blue highlight border
- **Add Board tile**: Dashed border with "+" icon (appears at end of grid)

#### On Individual Boards
- **Empty cells**: Show dashed border with "+" icon
- **Selected cell**: Blue highlight border
- **Existing buttons**: Normal appearance with edit capability

## User Interaction Flow

### Entering Edit Mode

1. Be on the dashboard or any activity board
2. Tap the pencil icon in the sidebar/header
3. If admin lock is enabled: Enter PIN in the modal
4. Edit mode activates - icon changes to checkmark

---

## Dashboard Edit Mode (Board Management)

### Creating a New Board

1. Enter edit mode while on the dashboard
2. Tap the "Add Board" tile (dashed border with "+")
3. Board Editor Modal opens with fields:
   - **Title** (required): Board name
   - **Description** (optional): Brief description
   - **Icon** (optional): Emoji for the board
   - **Grid Size**: Columns × Rows (2-8 each)
   - **Background Color** (optional): Select from presets
4. Tap "Create" to save the new board
5. The board appears in the dashboard grid

### Editing an Existing Board

1. Enter edit mode while on the dashboard
2. Long press on a board tile
3. Board Editor Modal opens with current values
4. Modify the desired fields:
   - Title, description, icon
   - Grid size (with warning if buttons may be orphaned)
   - Background color
5. Tap "Save" to apply changes

### Moving/Reordering Boards

1. Enter edit mode while on the dashboard
2. Tap a board to select it (blue border appears)
3. Tap another board to swap positions
4. Selection clears after swap completes

### Deleting a Board

1. Long press on the board to open editor
2. Tap "Delete" button
3. Confirm deletion in the alert dialog
   - Shows count of buttons that will be deleted
4. Board and all its buttons are removed

---

## Board Edit Mode (Button Management)

### Adding a Symbol (CREATE)

1. Tap any empty cell (shown with dashed border and "+")
2. Symbol Picker Modal opens with two options:
   - **Select existing symbol**: Browse categories or search for a symbol, tap to select
   - **Create new symbol**: Tap "Create New Symbol" button to create a custom symbol
3. Symbol appears in the cell immediately

### Creating a New Symbol (CREATE)

To create a completely new symbol when adding to an empty cell:

1. Tap any empty cell to open the Symbol Picker Modal
2. Tap "Create New Symbol" button at the top
3. Fill in the new symbol details:
   - **Label** (required): The display text
   - **Spoken Text**: Optional text to vocalize (defaults to label)
   - **Emoji**: Auto-matched from label
   - **Custom Image**: Optional image from library/camera
   - **Fitzgerald Category**: Grammar category for color coding
4. Tap "Create" to save the new symbol
5. The new symbol is created and placed in the cell

To go back to selecting an existing symbol, tap "Back to Symbol Selection".

### Adding Functional Buttons (Navigation)

Functional buttons provide navigation actions instead of speaking text:

1. Tap any empty cell to open the Symbol Picker Modal
2. In the "Navigation Buttons" section, tap one of the options:
   - **Back**: Returns to the previous screen in navigation history
   - **Home**: Returns to the activity board dashboard
3. The functional button appears in the cell with a distinctive purple color

Functional buttons are visually distinguished from regular link buttons:
- **Purple background**: Indicates a functional navigation action
- **Icon**: Shows arrow-left (Back) or home (Home) icon
- **Label**: Displays the action name

### Linking to Another Board

Create a link button that navigates to another activity board:

1. Tap any empty cell to open the Symbol Picker Modal
2. Tap "Link to Another Board" button
3. Select the target board from the list of available boards
4. The link button appears in the cell with a blue link style

Link buttons display:
- **Blue background**: Indicates a board link
- **Link icon** (🔗): Shows this is a navigation link
- **Board title**: The name of the linked board

Example use case: In a "Breakfast" activity board, add a link to a "Toppings" board so users can quickly navigate to related vocabulary.

### Editing a Button (UPDATE)

1. Long press on an existing button
2. Button Editor Modal opens with options:
   - **Label**: Edit the symbol's display text (auto-updates emoji match)
   - **Spoken Text**: Optional text to vocalize (defaults to label if empty)
   - **Emoji**: Auto-matched from label using node-emoji library
   - **Custom Image**: Pick from photo library or take a new photo with camera
   - **Fitzgerald Category**: Select grammar category (or "Auto" to derive from word type)
   - **Hide Symbol**: Toggle to hide symbol from regular views
   - **Background Color**: Select from preset colors or clear override
   - **Delete button**: Remove the button from the board
3. Tap "Save" to apply changes (disabled until changes are made)

### Moving a Button

1. Tap a button to select it (blue border appears)
2. Tap the destination cell:
   - **Empty cell**: Button moves to new position
   - **Occupied cell**: Buttons swap positions
3. Selection clears after move completes

### Deleting a Button

1. Long press on the button to open editor
2. Tap "Delete Button"
3. Confirm deletion in the alert dialog
4. Button is removed from the board

### Exiting Edit Mode

1. Tap the checkmark icon
2. Edit mode deactivates
3. All changes are saved automatically (no explicit save needed)

## Architecture

### State Management

Edit mode uses a combination of local state in `SchematicModeContainer` and props passed from `MainScreenTablet`:

```
MainScreenTablet (isEditMode state)
    └── SchematicModeContainer (edit handlers, modals)
        ├── ActivityDashboard (dashboard edit mode)
        │   └── ActivityBoardTile (board selection, edit indicators)
        │   └── BoardEditorModal (board CRUD)
        └── ActivityBoardView (board edit mode)
            └── SchematicGrid (cell interactions)
                └── BoardButtonCell (visual states)
            └── SymbolPickerModal (symbol selection/creation)
            └── ButtonEditorModal (button/symbol editing)
```

### Files Created

| File | Purpose |
|------|---------|
| `src/hooks/useBoardOperations.ts` | CRUD operations hook for board button transactions |
| `src/hooks/useSymbolOperations.ts` | Hook for creating and updating Symbol model properties |
| `src/hooks/useActivityBoardOperations.ts` | CRUD operations hook for activity board management |
| `src/components/schematic/EditModeToggleButton.tsx` | Toggle button component |
| `src/components/schematic/SymbolPickerModal.tsx` | Modal for selecting existing symbols or creating new ones |
| `src/components/schematic/ButtonEditorModal.tsx` | Modal for editing existing button and symbol properties |
| `src/components/schematic/BoardEditorModal.tsx` | Modal for creating and editing activity boards |

### Files Modified

| File | Changes |
|------|---------|
| `src/screens/main/useMainScreenState.ts` | Added edit mode state and handlers |
| `src/screens/main/MainScreenTablet.tsx` | Added edit toggle button |
| `src/components/schematic/SchematicModeContainer.tsx` | Core edit mode integration for both dashboard and boards |
| `src/hooks/useSchematicMode.ts` | Added `refreshButtons()` and `refreshBoards()` functions |
| `src/components/schematic/ActivityDashboard.tsx` | Dashboard edit mode with selection and add board tile |
| `src/components/schematic/ActivityBoardTile.tsx` | Edit mode visual states (selection, edit indicator) |
| `src/components/schematic/ActivityBoardView.tsx` | Edit mode prop forwarding |
| `src/components/schematic/SchematicGrid.tsx` | Cell selection and empty cell handling |
| `src/components/schematic/BoardButtonCell.tsx` | Edit mode visual states |
| `src/types/schematic.ts` | Extended type definitions for edit mode props |

## Technical Implementation

### Database Operations

The `useBoardOperations` hook provides CRUD operations using WatermelonDB:

```typescript
const boardOperations = useBoardOperations(boardId);

// Create a new button
await boardOperations.createButton({
  symbolId: symbol.id,
  rowIndex: row,
  columnIndex: col,
});

// Update a button
await boardOperations.updateButton(buttonId, {
  backgroundOverride: '#FF5733',
});

// Delete a button
await boardOperations.deleteButton(buttonId);

// Move a button (handles swap if destination occupied)
await boardOperations.moveButton(buttonId, newRow, newCol);
```

### Symbol Operations

The `useSymbolOperations` hook provides methods to create and update symbol properties:

```typescript
const symbolOperations = useSymbolOperations();

// Create a new symbol with translation
const newSymbolId = await symbolOperations.createSymbol({
  label: 'New Symbol',
  spokenText: 'Text to speak',
  emoji: '🍎',
  imageUri: 'file:///path/to/image.jpg',
  fitzCategory: 'nouns',
}, language);

// Update symbol properties (language required for translation-aware updates)
await symbolOperations.updateSymbol(symbolId, {
  label: 'New Label',
  spokenText: 'Text to speak',
  emoji: '🍎',
  imageUri: 'file:///path/to/image.jpg',  // or null to clear
  fitzCategory: 'nouns',  // or null for auto-derive
  isHidden: false,
}, language);
```

Symbol updates include:
- **label**: The display text shown on the button (updates SymbolTranslation if exists)
- **spokenText**: Text to vocalize, defaults to label if empty (updates SymbolTranslation if exists)
- **emoji**: The emoji character (auto-matched from label in the editor)
- **imageUri**: Custom image URI from library/camera, or null to use emoji
- **fitzCategory**: Fitzgerald grammar category for color coding
- **isHidden**: Whether the symbol is hidden from regular views

**Note**: Label and spokenText are language-aware and update the `SymbolTranslation` table when a translation exists for the current language. Other fields update the `Symbol` table directly.

### Activity Board Operations

The `useActivityBoardOperations` hook provides CRUD operations for activity boards:

```typescript
const activityBoardOperations = useActivityBoardOperations();

// Create a new board
const boardId = await activityBoardOperations.createBoard({
  title: 'Breakfast',
  description: 'Morning meal vocabulary',
  icon: '🍳',
  gridColumns: 4,
  gridRows: 4,
  backgroundColor: '#FFF9C4',
  language: 'en',
});

// Update a board
await activityBoardOperations.updateBoard(boardId, {
  title: 'New Title',
  gridColumns: 5,
  gridRows: 5,
});

// Delete a board (cascade deletes all buttons)
await activityBoardOperations.deleteBoard(boardId);

// Swap order between two boards
await activityBoardOperations.swapBoardOrder(boardId1, boardId2);

// Get button count (useful for delete confirmation)
const count = await activityBoardOperations.getButtonCount(boardId);

// Check for orphaned buttons when reducing grid size
const orphanCount = await activityBoardOperations.getOrphanedButtonCount(
  boardId, newColumns, newRows
);
```

### Functional Buttons

Functional buttons use the existing link button infrastructure with special IDs:

```typescript
// Special functional button IDs defined in types/schematic.ts
export const FUNCTIONAL_BUTTON_IDS = {
  BACK: '__back__',
  HOME: '__home__',
} as const;

// Create a functional button
await boardOperations.createButton({
  symbolId: '',  // Functional buttons don't have symbols
  rowIndex: row,
  columnIndex: col,
  isLinkButton: true,
  linkToBoardId: FUNCTIONAL_BUTTON_IDS.BACK,  // or HOME
  linkLabel: 'Back',  // or 'Home'
});

// Handle functional button press in SchematicModeContainer
const handleLinkPress = (linkedBoardId: string) => {
  if (isFunctionalButtonId(linkedBoardId)) {
    if (linkedBoardId === FUNCTIONAL_BUTTON_IDS.BACK) {
      goBack();  // From useSchematicMode hook
    } else if (linkedBoardId === FUNCTIONAL_BUTTON_IDS.HOME) {
      goToDashboard();
    }
    return;
  }
  navigateToBoard(linkedBoardId);
};
```

The `useSchematicMode` hook already maintains a navigation stack, so the Back button leverages existing `goBack()` functionality.

### Board Link Buttons

Link buttons that navigate to other boards use the same infrastructure:

```typescript
// Create a link button to another board
await boardOperations.createButton({
  symbolId: '',  // Link buttons don't have symbols
  rowIndex: row,
  columnIndex: col,
  isLinkButton: true,
  linkToBoardId: targetBoardId,  // Actual board ID
  linkLabel: 'Toppings',  // Board title as label
});
```

The existing `handleLinkPress` in SchematicModeContainer routes regular board IDs to `navigateToBoard()`, which pushes them onto the navigation stack for proper Back button support.

### Real-time Updates

After each database operation, `refreshButtons()` is called to reload the button data:

```typescript
await boardOperations.moveButton(buttonId, newRow, newCol);
refreshButtons(); // Explicit refresh ensures UI updates
```

This pattern was chosen because WatermelonDB's `observe()` subscriptions don't reliably trigger for field updates on existing records.

### PIN Protection

When `adminLocked` is true in Redux state, the PIN modal appears before entering edit mode:

```typescript
const handleEditModeToggle = useCallback(() => {
  if (isEditMode) {
    setIsEditMode(false);
  } else if (adminLocked) {
    setPinModalMode('editMode');
    setShowPinModal(true);
  } else {
    setIsEditMode(true);
  }
}, [isEditMode, adminLocked]);
```

## Component Props Reference

### SchematicModeContainerProps

```typescript
interface SchematicModeContainerProps {
  language: string;
  onSymbolPress: (symbol: Symbol) => void;
  dashboardColumns?: number;
  isEditMode?: boolean;        // Enable edit mode
  onBoardChange?: (boardId: string | null) => void;  // Board selection callback
}
```

### BoardButtonCellProps (edit mode additions)

```typescript
interface BoardButtonCellProps {
  // ... existing props
  isEditMode?: boolean;        // Whether edit mode is active
  isSelected?: boolean;        // Whether this cell is selected
  isEmpty?: boolean;           // Whether this is an empty cell placeholder
  onLongPress?: () => void;    // Long press handler for editing
}
```

### SymbolUpdates (ButtonEditorModal)

```typescript
interface SymbolUpdates {
  label?: string;              // Display text
  spokenText?: string;         // Text to vocalize
  emoji?: string;              // Emoji character
  imageUri?: string | null;    // Custom image URI
  fitzCategory?: string | null; // Fitzgerald category
  isHidden?: boolean;          // Hide from regular views
}
```

### NewSymbolData (SymbolPickerModal)

```typescript
interface NewSymbolData {
  label: string;               // Display text (required)
  spokenText?: string;         // Text to vocalize
  emoji?: string;              // Emoji character
  imageUri?: string | null;    // Custom image URI
  fitzCategory?: string | null; // Fitzgerald category
}
```

### CreateSymbolInput (useSymbolOperations)

```typescript
interface CreateSymbolInput {
  label: string;               // Display text (required)
  spokenText?: string;         // Text to vocalize
  emoji?: string;              // Emoji character
  imageUri?: string | null;    // Custom image URI
  fitzCategory?: string | null; // Fitzgerald category
  categoryId?: string;         // Optional category (defaults to 'user-created')
}
```

### UpdateSymbolInput (useSymbolOperations)

```typescript
interface UpdateSymbolInput {
  // Translation fields (go to SymbolTranslation if exists)
  label?: string;
  spokenText?: string;
  // Symbol fields (always go to Symbol model)
  emoji?: string;
  imageUri?: string | null;
  fitzCategory?: string | null;
  isHidden?: boolean;
}
```

## Edge Cases

### Translation-Aware Updates
When updating label or spokenText, the hook checks for an existing `SymbolTranslation` record for the current language. If found, the translation is updated; otherwise, the `Symbol` model is updated directly.

### New Symbol Creation
When creating a new symbol, both a `Symbol` record and a `SymbolTranslation` record are created. The symbol is assigned a unique `conceptKey` with the format `custom-{sanitized-label}-{timestamp}` and placed in the 'user-created' category.

### Link Buttons
Buttons that link to other boards (link buttons) don't have symbols. The ButtonEditorModal disables symbol editing fields for these buttons, showing only background color and position info.

### Empty Emoji Match
When the label doesn't match any known emoji, the editor shows "No match found" and saves an empty emoji value.

### Image Permissions
The app requests camera/photo library permissions when needed. If denied, an alert prompts the user to grant access.

## Accessibility

- Edit toggle button has appropriate accessibility labels ("Enter edit mode" / "Exit edit mode")
- Symbol picker and button editor modals are keyboard accessible
- Empty cells in edit mode are clearly indicated with visual borders

## Future Enhancements

Potential improvements for future versions:

- Undo/redo functionality
- Drag-and-drop movement option
- Batch operations (multi-select)
- Copy/paste buttons between boards
- Grid resize controls
- Button link configuration in editor
