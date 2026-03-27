# USERGUIDCOREFRINGELAYOUTSSUBTAB

## 1. Purpose

This guide explains the **Core-Fringe Layouts** area in **Admin -> Content** from a user perspective.

Use this section to:
- browse all core-fringe layouts for the current language
- search layouts by name
- create a new layout
- edit a layout's name, icon/image, and grid size
- activate a layout
- manage the page tree inside a layout
- open the layout in grid edit mode
- edit slots, category links, and sub-pages
- delete layouts

---

## 2. Where To Find It

Open:
1. **Admin**
2. **Content**
3. **Core-Fringe** / **Core-Fringe Layouts**

Depending on device layout:
- On phone, open `Content` first, then tap `Core-Fringe`.
- On tablet landscape, `Core-Fringe` appears in the left content navigation.

---

## 3. What The Core-Fringe Layouts Screen Shows

The main screen contains:
- a **search bar**
- a **scrolling list of layouts**
- a **+ Add Layout** button at the bottom

If there are no layouts yet, the screen shows an empty state with a hint to add one.

If your search does not match anything, the empty state changes to a "no matches" message.

---

## 4. Search

The search field filters layouts live by **layout name**.

You can clear the search with the `x` button on the right side of the search field.

---

## 5. Layout List

Each layout row shows:
- the layout icon or image
- the layout name
- the grid size in `columns x rows`
- the number of pages in the layout
- the number of slots in the layout
- a `From Pack` marker if the layout came from an installed vocabulary pack
- an `Active` badge if this is the currently active layout
- an edit button (pencil)

Important behaviors:
- layouts are shown for the **current app language** only
- the **active** layout is sorted to the top

---

## 6. Add A New Layout

Tap **+ Add Layout** to open the layout editor in create mode.

In create mode, you can set:
- **Name**: required
- **Icon / Image**
- **Grid Size**: 6 to 12 columns

Rows are calculated automatically from the selected number of columns.

When you create a layout:
- the layout is added to the list
- a root page named **Home** is created automatically inside it
- the new layout is **not** automatically made active

You can then open it again to activate it or edit its grid.

---

## 7. Edit An Existing Layout

Tap the pencil button on a layout row to open the layout editor in edit mode.

In edit mode, you can change:
- **Name**
- **Icon / Image**
- **Grid Size**

The editor also shows:
- page count
- slot count
- active status
- `From Pack` information when relevant

Footer actions:
- **Delete**
- **Cancel**
- **Save**

Extra actions in edit mode:
- **Manage Pages**
- **Edit Grid**
- **Activate** (only when the layout is not already active)

---

## 8. Icon And Image Options

The layout editor includes an icon/image picker.

You can use:
- an emoji
- an image from the device
- an image from installed vocabulary packs

The layout preview updates live while you edit.

If a layout has an image, that image is shown in the list instead of the emoji.

---

## 9. Grid Size

The layout editor has a stepper for **Grid Size**.

You can choose:
- minimum: **6 columns**
- maximum: **12 columns**

Rows are calculated automatically. The preview updates as you change the size.

This means you are choosing the width of the layout, while the app determines the matching height.

---

## 10. Activate A Layout

If a layout is not active yet, its editor shows an **Activate** button.

Tap it to make that layout the active core-fringe layout for the current language.

After activation:
- the layout gets the `Active` badge in the list
- it will be the layout used in core-fringe mode for that language

Only one layout can be active per language at a time.

---

## 11. Manage Pages

Core-fringe layouts contain a **page tree**.

Each layout always starts with a root page:
- **Home**

You can then create child pages under it and create deeper page structures.

How page management appears depends on device layout:
- On tablet and phone landscape, the page tree is shown **inline** inside the layout editor.
- On phone portrait, tap **Manage Pages** to open a separate page manager modal.

Page management lets you:
- view the page hierarchy
- add sub-pages
- edit a page
- delete a page

The root page is shown in the tree but does not expose delete actions.

---

## 12. Add A Sub-Page

You can add a sub-page from:
- the inline page tree on wide layouts
- the Page Manager modal on phone portrait

When creating a page, you can set:
- **Title**
- **Parent Page**
- **Icon / Image**

Important automatic behavior:
- when you create a sub-page under a parent page, the app tries to place a link tile to that new page on the parent page automatically
- if the parent page has no free slot, the page is still created, but you see a warning that no link could be added automatically
- newly created sub-pages also get automatic **Home** and **Back** navigation buttons on their own grid

This reduces the amount of manual setup needed after page creation.

---

## 13. Edit A Page

You can edit an existing page from:
- the inline page tree
- the Page Manager modal

The page editor lets you change:
- **Title**
- **Parent Page**
- **Icon / Image**

It also includes **Edit Grid** for that specific page when the page already exists.

A useful behavior here:
- if you change a page's title, icon, or image, link tiles that point to that page are updated to match

That keeps the page tree and the visible navigation tiles in sync.

---

## 14. Delete A Page

You can delete non-root pages from the page tree or page manager.

Before deletion, the app shows a confirmation alert.

If the page has sub-pages, the UI warns you before continuing.

From a user perspective, you should treat page deletion as destructive and review the page tree carefully before confirming.

---

## 15. Edit Grid

When editing a layout, tap **Edit Grid** to open the layout on the **Main Screen** in admin edit mode.

You can also open grid editing for a specific page from that page's editor.

If the app is currently in **Text** input mode, `Edit Grid` is blocked and the app asks you to switch back to symbol mode first.

After entering core-fringe grid edit mode:
- the Main Screen opens in layout-edit mode
- the top bar changes to a dedicated edit bar
- the layout editor in Admin closes temporarily

When you tap **Done**, the app returns to:
1. **Admin**
2. **Content**
3. **Core-Fringe Layouts**

The same layout editor reopens automatically so you can continue working where you left off.

---

## 16. What You See In Core-Fringe Grid Edit Mode

In grid edit mode, the top edit bar shows:
- the layout title
- **Add Page**
- **Copy Page**
- **Done**

When the layout contains multiple pages, edit mode also shows a page selector so you can jump between pages while editing.

The grid itself supports:
- adding content to empty cells
- moving slots by selecting one cell and tapping another
- swapping slots by moving onto an occupied cell
- long-press editing for existing slots

This is where the actual page content is built.

---

## 17. Add Content To An Empty Cell

When you tap an empty cell in edit mode, the symbol picker opens.

From there you can:
- choose an existing symbol
- search symbols
- filter by category
- create a brand-new symbol
- create navigation buttons like **Home** and **Back**
- create a link to another page in the layout

This is the main way to populate a page.

---

## 18. Edit An Existing Slot

Long-press an occupied slot to open the slot editor.

What you can edit depends on the slot type.

### Symbol slot

For a symbol slot, you can change:
- label
- spoken text
- emoji
- image from library, camera, or pack images
- category
- Fitzgerald category
- hidden state
- pinned state
- background color
- slot position reference

You can also delete the slot from the page.

### Link slot

For a page-link slot, you can change:
- target page
- label
- emoji icon
- image
- pinned state
- background color
- slot position reference

You can also delete the slot from the page.

---

## 19. Pinned Vs Dynamic Slots

The slot editor includes a **Pinned (Core)** control.

Pinned slots:
- stay visible during navigation
- act as core vocabulary shared across the layout

Dynamic slots:
- change when the user moves between pages
- are used for topic-specific or page-specific vocabulary

This is one of the key ideas in the core-fringe model.

---

## 20. Copy A Page

In core-fringe grid edit mode, the top edit bar includes **Copy Page**.

The copy flow works in two steps:
1. choose an existing page
2. give the copy a new name

When copied, the new page keeps:
- the original page title structure
- icon or image
- its slots and placements

This is useful when you want a similar page with only a few adjustments.

---

## 21. Layout Differences By Device

### Phone Portrait

The layout editor is a single-column modal.

Page management happens through a separate **Page Manager** modal.

### Tablet And Phone Landscape

The layout editor uses a two-column layout:
- left side: preview, name, grid size, icon/image picker
- right side: page tree, edit actions, activation, and info

This makes page management much faster on wider screens.

---

## 22. Practical Task Examples

### Create a new layout
1. Go to **Admin -> Content -> Core-Fringe Layouts**.
2. Tap **+ Add Layout**.
3. Enter a name.
4. Choose an icon or image.
5. Set the grid size.
6. Tap **Create**.

### Make a layout active
1. Open the layout editor for that layout.
2. Tap **Activate**.

### Add a sub-page
1. Open the layout editor.
2. Use the page tree or **Manage Pages**.
3. Tap **Add Sub-Page**.
4. Enter a title and optional icon/image.
5. Choose the parent page if needed.
6. Tap **Create**.

### Edit the layout grid
1. Open the layout editor.
2. Tap **Edit Grid**.
3. Add, move, edit, or delete slots.
4. Tap **Done** to return to Admin.

### Edit a specific page grid
1. Open the page editor for that page.
2. Tap **Edit Grid**.
3. Make changes on that page.
4. Tap **Done** to return to Admin.

### Remove a layout
1. Open the layout editor.
2. Tap **Delete**.
3. Confirm the warning.

---

## 23. Important Notes

- Core-fringe layouts are language-specific. Switching the app language changes which layouts appear in the list.
- Only one layout can be active at a time for a given language.
- Creating a layout automatically creates a root **Home** page.
- `Edit Grid` only works in symbol-based input mode, not text mode.
- New sub-pages try to place a link tile on the parent automatically. If no free slot exists, you need to add that link manually.
- Returning from grid edit mode reopens the same layout editor automatically, so you do not lose your place in the admin workflow.
