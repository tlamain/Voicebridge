# USERGUIDSYMBOLSSUBTAB

## 1. What this screen is for

`SymbolsSubTab` is the main admin screen for managing individual symbols in the app's vocabulary.

From this screen, you can:

- browse all symbols for the active language
- search for a symbol by name
- filter symbols by favorites or category
- add a new symbol
- edit an existing symbol
- hide or show a symbol
- mark or unmark a symbol as a favorite
- delete a symbol

This is the place to manage the symbol library itself. It is different from editing activity boards or core-fringe layouts, which decide where symbols are used.

## 2. Where to find it

Open:

`Admin -> Content -> Symbols`

On phones, you enter the `Content` menu first and then tap `Symbols`.

On tablet landscape, `Symbols` appears in the left-side content navigation.

## 3. What you see on the screen

The `Symbols` screen contains four main areas:

1. a search bar at the top
2. a horizontal row of filter chips
3. a scrollable list of symbol cards
4. a bottom `+ Add Symbol` button

Each symbol card shows the symbol image or emoji, its label, and its category. It also includes quick action buttons so you can edit it, hide or show it, or favorite it without opening the full editor.

## 4. Search

Use the search bar to find symbols by label.

Current behavior:

- search matches the symbol name
- exact matches appear first
- symbols whose names start with the search text appear next
- symbols that only contain the text later in the name appear after that

If no symbols match your search, the screen shows an empty-state message instead of the list.

## 5. Filter chips

Below the search bar is a horizontal row of filter chips.

These let you narrow the symbol list:

- `All`: shows every symbol in the current language
- `Favorites`: shows only symbols marked as favorites
- category chips: show only symbols in a specific category

Only categories that currently contain symbols are shown in the chip list.

This means the filter row adapts to the symbols that currently exist for the active language.

## 6. The symbol list

Each row in the symbol list represents one symbol.

From left to right, a row typically includes:

- the symbol image or emoji
- the symbol label
- the category name
- an edit button
- a show/hide toggle button
- a favorite toggle button

### 6.1 Edit

Tap the pencil button to open the symbol editor for that symbol.

### 6.2 Show or hide

Tap the eye button to control visibility.

- visible symbols can appear normally in the app
- hidden symbols remain in the database, but are marked as hidden for regular use

This is useful when you do not want to delete a symbol but also do not want it available in normal vocabulary use.

### 6.3 Favorite or unfavorite

Tap the star button to mark a symbol as a favorite or remove it from favorites.

Favorites are useful for quickly finding and reusing important symbols. The `Favorites` filter chip uses this same favorite state.

## 7. Adding a new symbol

Tap `+ Add Symbol` to open the symbol editor in create mode.

When creating a symbol, you can define the symbol's basic details and optional metadata.

The app requires at least:

- a category
- a label

If required information is missing, the symbol cannot be saved until you fill it in.

## 8. Editing a symbol

When you add or edit a symbol, the app opens `SymbolEditorModal`.

This editor lets you configure the symbol in detail.

### 8.1 Basic symbol fields

The editor supports these core fields:

- `Label`: the visible name of the symbol
- `Spoken Text`: what the app should speak for the symbol
- `Emoji`: a text-based emoji representation
- `Image`: a custom image for the symbol
- `Category`: the category the symbol belongs to
- `Language`: the language version of the symbol

If you leave `Spoken Text` blank, the app saves the label as the spoken text automatically.

### 8.2 Image options

You can attach a custom image to the symbol.

The editor supports selecting an image from the device library and taking a photo with the camera.

If you do not use an image, the symbol can still use an emoji or plain label text depending on how it is displayed elsewhere in the app.

### 8.3 Favorite and hidden switches

Inside the editor, you can also directly control:

- whether the symbol is a favorite
- whether the symbol is hidden

These switches match the quick actions shown in the symbol list.

### 8.4 Progressive vocabulary fields

The editor also includes progressive-vocabulary metadata fields.

These are used to support structured vocabulary development and guided access patterns.

Available fields include:

- `Position`
- `Motor Zone`
- `Word Type`
- `Introduction Level`
- `Usage Priority`
- `Prerequisites`

These fields are mainly useful when your setup uses progressive vocabulary logic or learning progression rules.

### 8.5 Fitzgerald category override

The editor also supports a `Fitzgerald` category override.

This lets you explicitly assign a Fitzgerald grammar/category color grouping instead of relying only on automatic behavior.

Use this when you want the symbol to appear with a specific Fitzgerald classification for communication or teaching purposes.

## 9. Saving behavior

When you save a symbol:

- a new symbol record is created, or the existing one is updated
- the current language translation is created or updated
- the favorite state is synced

If you create a brand-new custom symbol, the system generates an internal key for it automatically.

## 10. Deleting a symbol

You can delete a symbol from the editor.

Before deletion, the app checks whether the symbol is still being used.

Current delete behavior warns you if:

- the symbol is used on activity boards
- the symbol is currently in favorites

This is important because deleting a symbol can affect other parts of the app that refer to it.

Deletion is intended for symbols you no longer want to keep at all. If you only want to remove a symbol from normal use, hiding it is usually the safer option.

## 11. Language behavior

The screen works within the currently active admin language context.

That means:

- the symbol list is loaded for the active language
- category choices are loaded for the active language
- search and filters apply to that language's symbol set

If you change a symbol's language while editing it, related favorite mappings are also updated so the symbol stays consistent with the selected language.

## 12. Typical tasks

### 12.1 Add a new custom symbol

1. Open `Admin -> Content -> Symbols`.
2. Tap `+ Add Symbol`.
3. Choose a category.
4. Enter the label.
5. Optionally set spoken text, emoji, image, favorite state, hidden state, progressive fields, or Fitzgerald override.
6. Save the symbol.

### 12.2 Hide a symbol without deleting it

1. Find the symbol in the list.
2. Tap the eye button.

You can also do the same inside the editor by turning on the hidden switch.

### 12.3 Mark a symbol as a favorite

1. Find the symbol in the list.
2. Tap the star button.

You can then use the `Favorites` filter chip to view only favorite symbols.

### 12.4 Edit how a symbol is spoken

1. Tap the pencil button for the symbol.
2. Change `Spoken Text`.
3. Save.

This is useful when the spoken phrase should differ from the visible label.

### 12.5 Remove a symbol completely

1. Open the symbol in the editor.
2. Use the delete action.
3. Review any usage warnings.
4. Confirm only if you want the symbol removed entirely.

## 13. Important things to remember

- Hiding a symbol is not the same as deleting it.
- Favorites are a filterable state, not a separate symbol type.
- Search currently works on symbol labels.
- The symbol must belong to a category to be saved.
- If spoken text is left empty, it defaults to the label.
- Deleting a symbol may affect activity boards and favorites that use it.

## 14. Summary

`SymbolsSubTab` is the admin tool for maintaining the symbol library itself.

Use it when you need to create symbols, rename them, change how they are spoken, assign them to categories, attach images, manage favorites, hide old items, or remove symbols that are no longer needed.
