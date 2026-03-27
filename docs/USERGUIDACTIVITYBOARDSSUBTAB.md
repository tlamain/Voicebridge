# USERGUIDACTIVITYBOARDSSUBTAB

## 1. Purpose

This guide explains the **Activity Boards** area in **Admin -> Content** from a user perspective.

Use this section to:
- browse all activity boards for the current language
- search boards by title or description
- create a new board
- copy an existing board into a new board
- edit board details such as title, icon, image, grid width, and background color
- delete boards
- open a board in grid edit mode to manage the buttons placed on it

---

## 2. Where To Find It

Open:
1. **Admin**
2. **Content**
3. **Boards** / **Activity Boards**

What you see depends on device layout:
- On phone, `Content` opens a menu first. Tap `Boards`.
- On tablet landscape, `Boards` appears in the left content navigation column.

---

## 3. What The Activity Boards Screen Shows

The main Activity Boards screen contains:
- a **search bar** at the top
- a **scrolling list of boards**
- a **+ Add Board** button at the bottom

If there are no boards yet, the screen shows an empty state with a hint to add one.

If your search does not match anything, the empty state changes to a "no matches" message.

---

## 4. Search

The search bar filters the list live while you type.

Search matches:
- board title
- board description
- board icon text

You can clear the search with the `x` button at the right side of the search field.

---

## 5. Board List

Each board row shows:
- the board icon or image
- the board title
- the number of columns in the board
- the number of buttons currently placed on the board
- the description, if one exists
- a `From Pack` marker when the board came from an installed vocabulary pack
- an edit button (pencil)

Boards are shown for the **currently selected app language** only.

---

## 6. Add A New Board

Tap **+ Add Board** to open the board editor in create mode.

In create mode, you can set:
- **Title**: required
- **Description**: optional
- **Icon / Image**
- **Grid Columns**: 6 to 12 columns
- **Background Color**

You can then tap:
- **Create** to save the new board
- **Cancel** to close without saving

If the board is created successfully, it appears in the list.

---

## 7. Copy From An Existing Board

When creating a new board, you can optionally use **Copy from existing board**.

This lets you:
- pick an existing board as a starting point
- prefill the new board with the source board's title, description, icon/image, grid columns, and background color
- duplicate all buttons from the source board when you save

After choosing a source board:
- the title is automatically changed to `Copy of {original board name}`
- you can still edit any field before tapping **Create**
- you can clear the copied source selection with the `x` button

This is useful when you want a variation of an existing board without rebuilding it from scratch.

---

## 8. Edit An Existing Board

Tap the pencil button on a board row to open the board editor in edit mode.

In edit mode, you can change:
- **Title**
- **Description**
- **Icon / Image**
- **Grid Columns**
- **Background Color**

The editor also shows an **Info** section with:
- how many buttons are on the board
- whether the board was imported from a vocabulary pack
- the board's position/order in the board list

At the bottom, you can use:
- **Delete**
- **Cancel**
- **Save**

If you save successfully, the board list refreshes.

---

## 9. Icon And Image Options

The board editor includes an icon/image picker.

You can use:
- an emoji
- an image from the device
- an image from installed vocabulary packs

The editor always shows a live preview, so you can see how the board will look before saving.

If a board has an image, that image is shown in the list instead of the emoji.

---

## 10. Grid Columns And Background Color

### Grid Columns

The board editor has a stepper control for **Grid Columns**.

You can:
- decrease the number of columns down to **6**
- increase the number of columns up to **12**

Rows are not entered manually here. They are calculated automatically based on screen size.

### Background Color

You can also choose a board background color from preset swatches.

This color is used for the board preview and the board itself.

---

## 11. Delete A Board

While editing an existing board, tap **Delete** to remove it.

Before deletion, the app asks for confirmation.

The warning message changes depending on the board:
- if the board has no buttons, the message confirms board deletion
- if the board has buttons, the message says those buttons will also be deleted

Deleting a board permanently removes:
- the board
- all buttons placed on that board

---

## 12. Edit Grid

When editing an existing board, the editor shows an **Edit Grid** button.

Tap it to open the board on the **Main Screen** in admin edit mode.

This is where you edit the actual contents of the board:
- add buttons to empty cells
- edit existing buttons
- move buttons to another position
- remove buttons
- create board-to-board link buttons
- create functional navigation buttons such as `Home` and `Back`

If the app is currently in **Text** input mode, `Edit Grid` is blocked and you are asked to switch back to symbol mode first.

---

## 13. What Happens In Grid Edit Mode

After tapping **Edit Grid**:
- the app navigates to the Main Screen
- the selected board opens automatically
- the top bar changes to a board edit bar with the board title and a **Done** button

In this mode:
- empty cells can be filled
- existing cells can be selected and moved
- long-pressing or opening a cell lets you edit that button's details

When finished, tap **Done**.

The app returns to:
1. **Admin**
2. **Content**
3. **Activity Boards**

The board editor for the same board reopens automatically so you can continue with board-level settings if needed.

---

## 14. Adding A Button In Grid Edit Mode

When you add a button to an empty cell, the symbol picker lets you:
- choose an existing symbol
- search symbols
- filter by category
- create a brand-new symbol
- create a link button to another activity board
- create functional navigation buttons

This means you do not need to leave the board editor flow just to place content on the board.

---

## 15. Editing A Button In Grid Edit Mode

When you edit an existing button, the button editor lets you change the symbol/button presentation for that cell.

Depending on the button, you can adjust:
- label
- spoken text
- auto-matched emoji
- custom image from library, camera, or pack images
- category
- Fitzgerald category
- hidden state
- background color override for that button
- the button's row and column reference

You can also:
- **Save** the changes
- **Delete** the button from the board
- **Cancel** without saving

Deleting a button removes it from the board only. It does not delete the whole board.

---

## 16. Layout Differences By Device

The board editor adapts to screen size.

### Phone Portrait

The editor is shown as a single-column scrollable modal.

### Tablet And Phone Landscape

The editor uses a wider two-column layout:
- left side: preview, title, description, grid columns, background color
- right side: icon/image picker, `Edit Grid`, and info

This makes editing faster on wider screens.

---

## 17. Practical Task Examples

### Create a brand-new board
1. Go to **Admin -> Content -> Activity Boards**.
2. Tap **+ Add Board**.
3. Enter a title.
4. Choose an icon or image.
5. Set columns and background color if needed.
6. Tap **Create**.

### Duplicate a board as a starting point
1. Tap **+ Add Board**.
2. Use **Copy from existing board**.
3. Pick the source board.
4. Adjust the copied title or other fields.
5. Tap **Create**.

### Change a board's details
1. Tap the board's pencil button.
2. Edit title, description, icon/image, columns, or background color.
3. Tap **Save**.

### Edit the board contents
1. Open the board in edit mode.
2. Tap **Edit Grid**.
3. Add, move, edit, or delete buttons.
4. Tap **Done** to return to Admin.

### Remove a board
1. Open the board in edit mode.
2. Tap **Delete**.
3. Confirm the warning.

---

## 18. Important Notes

- Activity boards are language-specific. Switching the app language changes which boards appear in the list.
- `Edit Grid` requires symbol-based input mode. It will not open while text mode is active.
- Copying a board duplicates its button layout, which is much faster than rebuilding the board manually.
- Deleting a board also deletes every button on it.
- Returning from grid edit mode reopens the same board editor automatically, so you do not lose your place in the admin flow.
