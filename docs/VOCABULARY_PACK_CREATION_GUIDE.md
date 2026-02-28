# Vocabulary Pack Creation Guide

This guide explains how to create vocabulary packs for VoiceBridgeAAC using an external program or manually. Vocabulary packs are self-contained bundles that include vocabulary concepts, translations, and optional grammar data.

---

## Table of Contents

1. [Overview](#overview)
2. [Pack Types](#pack-types)
3. [Key and ID Specifications](#key-and-id-specifications)
4. [JSON Schema Reference](#json-schema-reference)
5. [Subcategories (Parent-Child Categories)](#subcategories-parent-child-categories)
6. [Category Translations](#category-translations)
7. [Adding Images to Packs](#adding-images-to-packs)
8. [Creating a New Language Pack](#creating-a-new-language-pack)
9. [Creating a Language Add-On Pack](#creating-a-language-add-on-pack)
10. [Creating Activity Board Packs](#creating-activity-board-packs)
11. [Creating Core-Fringe Layout Packs](#creating-core-fringe-layout-packs)
12. [Phrases Format](#phrases-format)
13. [Abbreviations Format](#abbreviations-format)
14. [Grammar Data Format](#grammar-data-format)
15. [Validation Checklist](#validation-checklist)
16. [Best Practices](#best-practices)
17. [Examples](#examples)
18. [External Tool Integration](#external-tool-integration)
19. [Managing the Pack Registry](#managing-the-pack-registry)

---

## Overview

### What is a Vocabulary Pack?

A vocabulary pack is a JSON file (`.pack.json`) containing:
- **Metadata**: Pack identification, version, supported languages
- **Categories**: Organizational groups for symbols
- **Concepts**: Individual vocabulary items with translations
- **Phrases** (optional): Pre-built common phrases for quick communication
- **Abbreviations** (optional): Text expansion shortcuts
- **Grammar** (optional): Irregular verbs, noun pluralization rules, noun gender data

### Pack Architecture

```
VocabularyPack
├── metadata
│   ├── packId (unique identifier)
│   ├── name, version, tier
│   ├── languages[] (supported language codes)
│   ├── totalConcepts, totalPhrases, totalAbbreviations, totalActivityBoards
│   └── dependencies[] (required pack IDs)
├── categories[]
│   ├── { id, name, icon, image_uri, order, parent_id? }
│   └── translations? { lang: { name } }
├── concepts[]
│   ├── concept_key (unique across all packs)
│   ├── emoji, image_uri (optional pack: or base64), position, word_type
│   └── translations { lang: { label, spoken_text, infinitive } }
├── phrases[] (optional)
│   ├── phrase_key (unique identifier)
│   ├── category (needs, medical, social, etc.)
│   └── translations { lang: { text, spoken_text? } }
├── abbreviations[] (optional)
│   ├── shortcode (the abbreviation, e.g., "brb")
│   ├── category (optional)
│   └── translations { lang: { expanded_text, spoken_text? } }
├── activityBoards[] (optional)
│   ├── board_key (unique within pack)
│   ├── grid_columns, grid_rows, order
│   ├── translations { lang: { title, description? } }
│   ├── buttons[] { concept_key, row, column }
│   └── links[] { link_to_board_key, row, column, translations }
├── coreFringeLayouts[] (optional)
│   ├── layout_key (unique within pack)
│   ├── grid_columns, grid_rows
│   ├── translations { lang: { name } }
│   └── pages[] { page_key, parent_page_key?, order, translations, slots[] }
│       └── slots[] { row, column, is_pinned, concept_key?, link_to_page_key?, link_image_uri? }
└── grammar (optional)
    ├── irregularVerbs { lang: [...] }
    ├── nounPluralization { lang: {...} }
    └── (per-concept) noun_gender { lang: gender }
```

---

## Pack Types

### 1. New Language Pack

Use this when adding support for a language **not yet in the app**.

**Example**: Adding Italian to VoiceBridgeAAC
- Creates new concepts with Italian translations
- May include translations for other languages (recommended)
- Can have its own categories or use existing ones

### 2. Language Add-On Pack

Use this when adding **additional vocabulary** to an already supported language.

**Example**: "Nederlands voor Kinderen" (Dutch for Children)
- Extends Dutch vocabulary with child-friendly words
- Single language (`"languages": ["nl"]`)
- Focused on a specific domain (family, animals, colors)

### Tier System

| Tier | Description | Typical Size |
|------|-------------|--------------|
| `basic` | Core vocabulary bundled with app | 500-1000 concepts |
| `extended` | Additional common vocabulary | 500-1000 concepts |
| `professional` | Specialized/professional terms | 300-500 concepts |
| `specialized` | Domain-specific (medical, education, children) | 100-500 concepts |

---

## Key and ID Specifications

This section provides detailed specifications for all identifiers used in vocabulary packs. These specifications are designed to enable **automatic generation** of keys by external tools while ensuring uniqueness and consistency.

### Overview of Identifiers

| Identifier | Scope | Purpose | Example |
|------------|-------|---------|---------|
| `packId` | Global | Uniquely identifies a vocabulary pack | `dutch-children-v1` |
| `concept_key` | Global | Uniquely identifies a semantic concept | `apple_fringe_0001f34e` |
| `phrase_key` | Global | Uniquely identifies a phrase | `needs_help_001` |
| `shortcode` | Per-language | Abbreviation trigger text | `brb` |
| `board_key` | Per-pack | Identifies an activity board within a pack | `board_breakfast_main` |
| `category.id` | Per-pack | Identifies a category within a pack | `food-drinks` |

### Character Requirements

All identifiers must follow these character rules:

| Rule | Allowed Characters | Notes |
|------|-------------------|-------|
| Lowercase only | `a-z` | No uppercase letters |
| Numbers | `0-9` | Allowed anywhere except first character for some IDs |
| Separators | `_` (underscore), `-` (hyphen) | Used to separate components |
| No spaces | | Use `_` or `-` instead |
| No special chars | | No `@`, `#`, `$`, `%`, etc. |
| ASCII only | | No accented characters (é, ñ, ü, etc.) |

### Pack ID (`packId`)

The pack ID uniquely identifies a vocabulary pack across all installations.

#### Format

```
{scope}-{domain}-{variant?}-v{major}
```

#### Components

| Component | Required | Description | Examples |
|-----------|----------|-------------|----------|
| `scope` | Yes | Language code OR "core" for multi-language | `nl`, `en`, `es`, `core` |
| `domain` | Yes | Content category or tier | `basic`, `children`, `medical`, `travel` |
| `variant` | No | Sub-variant if needed | `all`, `extended` |
| `v{major}` | Yes | Version number | `v1`, `v2` |

#### Examples

```
core-basic-all-v1        # Core multi-language basic vocabulary
dutch-children-v1        # Dutch children's vocabulary
english-medical-v1       # English medical terms
spanish-travel-v2        # Spanish travel vocabulary, version 2
```

#### Auto-Generation Algorithm

```python
def generate_pack_id(languages: list, domain: str, variant: str = None, version: int = 1) -> str:
    # Determine scope
    if len(languages) > 1:
        scope = "core"
    else:
        scope = languages[0].lower()

    # Build ID
    parts = [scope, domain.lower()]
    if variant:
        parts.append(variant.lower())
    parts.append(f"v{version}")

    return "-".join(parts)

# Examples:
# generate_pack_id(["nl"], "children") -> "dutch-children-v1"
# generate_pack_id(["en", "nl", "es"], "basic", "all") -> "core-basic-all-v1"
```

---

### Concept Key (`concept_key`)

The concept key is the **most critical identifier** as it must be globally unique across ALL vocabulary packs. Duplicate concept keys cause symbols to be merged or overwritten.

#### Format

```
{word}_{category}_{emoji_codepoint}
```

#### Components

| Component | Required | Description | Derivation |
|-----------|----------|-------------|------------|
| `word` | Yes | Primary English label, normalized | Lowercase, no spaces, no accents |
| `category` | Yes | Word type or semantic category | See category list below |
| `emoji_codepoint` | Yes | Unicode codepoint(s) of the emoji | Hex format, 8 chars padded |

#### Category Values

| Category | Description | Examples |
|----------|-------------|----------|
| `core` | Essential communication words | yes, no, help, want, I |
| `verb` | Action words | go, eat, sleep, play |
| `noun` | Objects, places, people | apple, house, mom |
| `adjective` | Descriptive words | big, happy, red |
| `pronoun` | Personal pronouns | I, you, he, she |
| `fringe` | Extended/specialized vocabulary | stethoscope, dinosaur |
| `social` | Greetings and social phrases | hello, goodbye, please |
| `question` | Question words | what, where, when, why |
| `preposition` | Location/relation words | in, on, under, with |

#### Emoji Codepoint Encoding

The emoji codepoint provides uniqueness and visual identification:

```python
def get_emoji_codepoint(emoji: str) -> str:
    """Convert emoji to hex codepoint string."""
    codepoints = []
    for char in emoji:
        cp = ord(char)
        # Skip variation selectors (FE0F, FE0E) and ZWJ (200D)
        if cp not in [0xFE0F, 0xFE0E, 0x200D]:
            codepoints.append(f"{cp:08x}")
    return "".join(codepoints)

# Examples:
# 🍎 (apple) -> "0001f34e"
# 👨‍👩‍👧 (family) -> "0001f4680001f4690001f467" (joined codepoints)
# ❤️ (heart) -> "00002764" (ignoring FE0F variation selector)
```

#### Complete Auto-Generation Algorithm

```python
import unicodedata
import re

def normalize_word(word: str) -> str:
    """Normalize a word for use in concept_key."""
    # Convert to lowercase
    word = word.lower()

    # Remove accents (é -> e, ñ -> n, ü -> u)
    word = unicodedata.normalize('NFD', word)
    word = ''.join(c for c in word if unicodedata.category(c) != 'Mn')

    # Replace spaces and special chars with underscore
    word = re.sub(r'[^a-z0-9]', '_', word)

    # Remove consecutive underscores
    word = re.sub(r'_+', '_', word)

    # Remove leading/trailing underscores
    word = word.strip('_')

    return word

def generate_concept_key(
    english_label: str,
    word_type: str,
    emoji: str
) -> str:
    """Generate a globally unique concept_key."""

    # Normalize the English label
    word = normalize_word(english_label)

    # Map word_type to category
    category_map = {
        "verb": "verb",
        "noun": "fringe",  # Most nouns are fringe vocabulary
        "adjective": "adjective",
        "pronoun": "pronoun",
        "core": "core",
        "social": "social",
    }
    category = category_map.get(word_type, "fringe")

    # Get emoji codepoint
    codepoint = get_emoji_codepoint(emoji)

    return f"{word}_{category}_{codepoint}"

# Examples:
# generate_concept_key("Apple", "noun", "🍎")
#   -> "apple_fringe_0001f34e"
#
# generate_concept_key("Want", "verb", "🤲")
#   -> "want_verb_0001f932"
#
# generate_concept_key("I", "pronoun", "👤")
#   -> "i_pronoun_0001f464"
#
# generate_concept_key("Café", "noun", "☕")
#   -> "cafe_fringe_00002615"
```

#### Handling Duplicates

When the generated key already exists:

```python
def generate_unique_concept_key(
    english_label: str,
    word_type: str,
    emoji: str,
    existing_keys: set
) -> str:
    """Generate unique key, adding suffix if needed."""
    base_key = generate_concept_key(english_label, word_type, emoji)

    if base_key not in existing_keys:
        return base_key

    # Add numeric suffix
    counter = 2
    while f"{base_key}_{counter}" in existing_keys:
        counter += 1

    return f"{base_key}_{counter}"

# Example:
# If "apple_fringe_0001f34e" exists:
#   -> "apple_fringe_0001f34e_2"
```

#### Core Word Exceptions

For essential core vocabulary, use `core` category regardless of word type:

```python
CORE_WORDS = {
    "i", "you", "he", "she", "we", "they", "it",
    "yes", "no", "help", "want", "need", "like",
    "more", "stop", "go", "please", "thank you",
    "what", "where", "when", "why", "how", "who"
}

def get_category(english_label: str, word_type: str) -> str:
    if normalize_word(english_label) in CORE_WORDS:
        return "core"
    return word_type_to_category(word_type)
```

---

### Phrase Key (`phrase_key`)

Phrase keys identify complete phrases/sentences.

#### Format

```
{category}_{descriptor}_{sequence}
```

#### Components

| Component | Required | Description |
|-----------|----------|-------------|
| `category` | Yes | Phrase category (needs, medical, social, etc.) |
| `descriptor` | Yes | Brief description of phrase content |
| `sequence` | Yes | 3-digit sequence number |

#### Categories

| Category | Description |
|----------|-------------|
| `needs` | Basic needs (hungry, thirsty, tired) |
| `medical` | Health-related (pain, medication) |
| `social` | Greetings, politeness |
| `requests` | Asking for things/actions |
| `emotions` | Expressing feelings |
| `responses` | Quick yes/no/maybe responses |

#### Auto-Generation Algorithm

```python
def generate_phrase_key(
    category: str,
    english_text: str,
    existing_keys: set
) -> str:
    """Generate a phrase_key from category and text."""

    # Extract key words from phrase (first 2-3 meaningful words)
    words = normalize_word(english_text).split('_')
    stop_words = {'i', 'am', 'the', 'a', 'an', 'is', 'are', 'to', 'my'}
    meaningful = [w for w in words if w not in stop_words][:3]
    descriptor = '_'.join(meaningful) if meaningful else words[0]

    # Find next available sequence number
    prefix = f"{category}_{descriptor}_"
    existing_sequences = [
        int(k.split('_')[-1])
        for k in existing_keys
        if k.startswith(prefix) and k.split('_')[-1].isdigit()
    ]
    next_seq = max(existing_sequences, default=0) + 1

    return f"{category}_{descriptor}_{next_seq:03d}"

# Examples:
# generate_phrase_key("needs", "I need help", set())
#   -> "needs_need_help_001"
#
# generate_phrase_key("medical", "I am in pain", set())
#   -> "medical_pain_001"
#
# generate_phrase_key("social", "Good morning", set())
#   -> "social_good_morning_001"
```

---

### Board Key (`board_key`)

Board keys identify activity boards within a pack.

#### Format

```
board_{activity}_{sub_activity?}
```

#### Components

| Component | Required | Description |
|-----------|----------|-------------|
| `board_` | Yes | Prefix (always "board_") |
| `activity` | Yes | Main activity name |
| `sub_activity` | No | Sub-section if needed |

#### Auto-Generation Algorithm

```python
def generate_board_key(
    activity_name: str,
    sub_activity: str = None
) -> str:
    """Generate a board_key from activity name."""

    base = normalize_word(activity_name)

    if sub_activity:
        sub = normalize_word(sub_activity)
        return f"board_{base}_{sub}"

    return f"board_{base}"

# Examples:
# generate_board_key("Breakfast") -> "board_breakfast"
# generate_board_key("Breakfast", "Drinks") -> "board_breakfast_drinks"
# generate_board_key("Morning Routine") -> "board_morning_routine"
```

---

### Category ID (`category.id`)

Category IDs identify symbol categories within a pack.

#### Format

```
{category_name}
```

Simple lowercase, hyphen-separated name.

#### Examples

```
core-words
people
actions
food-drinks
feelings
animals
```

#### Auto-Generation Algorithm

```python
def generate_category_id(category_name: str) -> str:
    """Generate category ID from display name."""
    return normalize_word(category_name).replace('_', '-')

# Examples:
# generate_category_id("Food & Drinks") -> "food-drinks"
# generate_category_id("Core Words") -> "core-words"
```

---

### Abbreviation Shortcode

Shortcodes are the trigger text for abbreviation expansion.

#### Requirements

| Rule | Description |
|------|-------------|
| Lowercase | All letters lowercase |
| Length | 2-10 characters recommended |
| Memorable | Should be intuitive (e.g., "brb" for "be right back") |
| No spaces | Single token only |

#### Common Patterns

```
First letters:     brb (be right back), lol (laughing out loud)
Consonants:        msg (message), pls (please)
Phonetic:          u (you), r (are), 2 (to/too)
Domain-specific:   rx (prescription), dx (diagnosis)
```

---

### Validation Rules Summary

| Identifier | Max Length | Regex Pattern | Uniqueness Scope |
|------------|------------|---------------|------------------|
| `packId` | 64 | `^[a-z][a-z0-9-]*-v[0-9]+$` | Global |
| `concept_key` | 128 | `^[a-z][a-z0-9_]*$` | Global |
| `phrase_key` | 64 | `^[a-z][a-z0-9_]*$` | Global |
| `board_key` | 64 | `^board_[a-z][a-z0-9_]*$` | Per-pack |
| `category.id` | 32 | `^[a-z][a-z0-9-]*$` | Per-pack |
| `shortcode` | 16 | `^[a-z0-9]+$` | Per-language |

### Complete Example: Auto-Generated Keys

```json
{
  "metadata": {
    "packId": "dutch-breakfast-v1"  // Auto: scope-domain-version
  },
  "categories": [
    {
      "id": "breakfast-foods",       // Auto: normalized name
      "name": "Breakfast Foods"
    }
  ],
  "concepts": [
    {
      "concept_key": "bread_fringe_0001f35e",  // Auto: word_category_emoji
      "translations": {
        "en": { "label": "bread" },
        "nl": { "label": "brood" }
      },
      "emoji": "🍞"
    }
  ],
  "phrases": [
    {
      "phrase_key": "needs_hungry_001",  // Auto: category_descriptor_seq
      "translations": {
        "en": { "text": "I am hungry" },
        "nl": { "text": "Ik heb honger" }
      }
    }
  ],
  "activityBoards": [
    {
      "board_key": "board_breakfast_main",  // Auto: board_activity_sub
      "translations": {
        "en": { "title": "Breakfast" }
      }
    }
  ]
}
```

---

## JSON Schema Reference

### Complete Pack Structure

```json
{
  "metadata": {
    "packId": "string (required, unique)",
    "name": "string (required, human-readable)",
    "version": "string (required, semver format)",
    "tier": "basic | extended | professional | specialized",
    "languages": ["string array of language codes"],
    "totalConcepts": "number",
    "totalPhrases": "number (optional)",
    "totalAbbreviations": "number (optional)",
    "totalActivityBoards": "number (optional)",
    "dependencies": ["string array of pack IDs"],
    "description": "string",
    "category": "string (e.g., 'core', 'medical', 'children')",
    "author": "string (optional)",
    "releaseDate": "ISO date string (optional)"
  },
  "categories": [
    {
      "id": "string (required)",
      "name": "string (required — fallback display name when no translation exists)",
      "description": "string (optional)",
      "icon": "emoji string",
      "image_uri": "string (pack:packId/key or base64, optional — shown when no icon emoji)",
      "order": "number (display order)",
      "color": "hex color string (optional)",
      "positionRange": [start, end],
      "parent_id": "string (optional — references another category's id to make this a subcategory)",
      "translations": {
        "en": { "name": "string (translated category name)" },
        "nl": { "name": "string" }
      }
    }
  ],
  "concepts": [
    {
      "concept_key": "string (required, globally unique)",
      "translations": {
        "en": { "label": "string", "spoken_text": "string", "infinitive": "string" },
        "nl": { "label": "string", "spoken_text": "string", "infinitive": "string" }
      },
      "emoji": "emoji string",
      "image_uri": "string (pack:key, pack:packId/key, or base64, optional)",
      "position": "number (grid position)",
      "word_type": "verb | noun | adjective | pronoun | core | social",
      "category_id": "string (must match category.id)",
      "motor_zone": "string (for motor planning)",
      "introduction_level": "number (1-6, for progressive learning)",
      "usage_priority": "essential | high | medium | low",
      "prerequisites": ["concept_key strings"],
      "grammar": {
        "verb_class": "regular | irregular | modal | auxiliary",
        "noun_class": "regular | irregular | uncountable",
        "noun_gender": {
          "nl": "masculine | feminine | neuter | common",
          "fr": "masculine | feminine",
          "es": "masculine | feminine"
        },
        "irregular_forms": {
          "en": { "past": "went", "participle": "gone", "plural": "geese" }
        }
      }
    }
  ],
  "phrases": [
    {
      "phrase_key": "string (required, unique)",
      "category": "needs | medical | social | requests | emotions | responses",
      "priority": "essential | high | medium | low (optional)",
      "translations": {
        "en": { "text": "string (required)", "spoken_text": "string (optional)" },
        "nl": { "text": "string", "spoken_text": "string (optional)" }
      }
    }
  ],
  "abbreviations": [
    {
      "shortcode": "string (required, the abbreviation)",
      "category": "internet | texting | medical | professional (optional)",
      "translations": {
        "en": { "expanded_text": "string (required)", "spoken_text": "string (optional)" },
        "nl": { "expanded_text": "string", "spoken_text": "string (optional)" }
      }
    }
  ],
  "activityBoards": [
    {
      "board_key": "string (required, unique within pack)",
      "grid_columns": "number (required, >= 1)",
      "grid_rows": "number (required, >= 1)",
      "order": "number (required, display order)",
      "icon": "emoji string (optional)",
      "background_color": "hex color string (optional)",
      "translations": {
        "en": { "title": "string (required)", "description": "string (optional)" },
        "nl": { "title": "string", "description": "string (optional)" }
      },
      "buttons": [
        {
          "concept_key": "string (required, references a concept)",
          "row": "number (required, 0-indexed)",
          "column": "number (required, 0-indexed)",
          "is_visible": "boolean (optional, default true)",
          "background_override": "hex color string (optional)"
        }
      ],
      "links": [
        {
          "link_to_board_key": "string (required, must exist in same pack)",
          "row": "number (required, 0-indexed)",
          "column": "number (required, 0-indexed)",
          "translations": {
            "en": { "label": "string (required, button text)" },
            "nl": { "label": "string" }
          },
          "background_color": "hex color string (optional)"
        }
      ]
    }
  ],
  "grammar": {
    "irregularVerbs": {
      "en": [
        {
          "infinitive": "go",
          "exceptions": {
            "PRES_3SG": "goes",
            "PAST_ALL": "went",
            "PARTICIPLE": "gone"
          }
        }
      ]
    },
    "nounPluralization": {
      "en": {
        "irregularPlurals": { "child": "children", "mouse": "mice" },
        "uncountableNouns": ["water", "information", "advice"]
      }
    }
  }
}
```

### Language Codes

Use ISO 639-1 two-letter codes:

| Code | Language |
|------|----------|
| `en` | English |
| `nl` | Dutch (Nederlands) |
| `es` | Spanish (Español) |
| `it` | Italian (Italiano) |
| `fr` | French (Français) |
| `de` | German (Deutsch) |
| `pt` | Portuguese |

---

## Subcategories (Parent-Child Categories)

Categories support **one level of nesting**: a category can optionally have a `parent_id` that references another category's `id`, making it a subcategory (child) of that parent. This keeps symbol organization clearer — for example, "Drinks" and "Snacks" can be children of "Food".

### How It Works

- A category **without** `parent_id` (or with `parent_id` omitted/null) is a **top-level (parent)** category.
- A category **with** `parent_id` set to another category's `id` is a **subcategory (child)**.
- **Only one level** of nesting is allowed — a child category cannot itself be a parent. If category B has `parent_id: "A"`, then no other category may set `parent_id: "B"`.

### The `parent_id` Field

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `parent_id` | string | No | Must reference the `id` of another category **in the same pack** that does not itself have a `parent_id`. When omitted, the category is top-level. |

### Category Schema with Subcategories

```json
{
  "categories": [
    {
      "id": "food",
      "name": "Food",
      "icon": "🍽️",
      "order": 0,
      "translations": {
        "en": { "name": "Food" },
        "nl": { "name": "Eten" }
      }
    },
    {
      "id": "drinks",
      "name": "Drinks",
      "icon": "🥤",
      "order": 1,
      "parent_id": "food",
      "translations": {
        "en": { "name": "Drinks" },
        "nl": { "name": "Dranken" }
      }
    },
    {
      "id": "snacks",
      "name": "Snacks",
      "icon": "🍿",
      "order": 2,
      "parent_id": "food",
      "translations": {
        "en": { "name": "Snacks" },
        "nl": { "name": "Snacks" }
      }
    },
    {
      "id": "animals",
      "name": "Animals",
      "icon": "🐾",
      "order": 3,
      "translations": {
        "en": { "name": "Animals" },
        "nl": { "name": "Dieren" }
      }
    }
  ]
}
```

In this example:
- **Food** is a top-level parent with two children: Drinks and Snacks.
- **Animals** is a standalone top-level category (no children, no parent).
- All categories include `translations` so they display in the user's selected language.

### Relation with Concepts

Concepts reference categories via `category_id`. A concept can belong to **any** category — parent or child:

```json
{
  "concepts": [
    {
      "concept_key": "juice_fringe_0001f9c3",
      "category_id": "drinks",
      "emoji": "🧃",
      "translations": { "en": { "label": "juice" }, "nl": { "label": "sap" } }
    },
    {
      "concept_key": "pizza_fringe_0001f355",
      "category_id": "food",
      "emoji": "🍕",
      "translations": { "en": { "label": "pizza" }, "nl": { "label": "pizza" } }
    }
  ]
}
```

**Main screen behavior:**
- When the user selects the **parent** category ("Food"), the app shows symbols from the parent **plus all its children** (Food + Drinks + Snacks).
- A second row of tabs appears below the parent row showing "All", "Drinks", "Snacks". Selecting a specific child shows only that child's symbols.
- Standalone categories (like "Animals") behave exactly as before — no second row.

### Relation with Activity Boards

Activity board buttons reference concepts via `concept_key`, not `category_id`. Subcategories have **no direct effect** on activity boards. You can freely use concepts from any category (parent or child) in your board buttons:

```json
{
  "activityBoards": [
    {
      "board_key": "board_meal",
      "buttons": [
        { "concept_key": "juice_fringe_0001f9c3", "row": 0, "column": 0 },
        { "concept_key": "pizza_fringe_0001f355", "row": 0, "column": 1 }
      ]
    }
  ]
}
```

### Relation with Core-Fringe Layouts

Core-Fringe layout slots also reference concepts via `concept_key`, not `category_id`. Subcategories have **no direct effect** on core-fringe layouts. Concepts from any category can be placed in any slot.

### Import Behavior (Two-Pass)

When a pack with subcategories is imported, the system processes categories in two passes:

1. **Pass 1 — Parent/standalone categories**: All categories without `parent_id` are created or matched first.
2. **Pass 2 — Child categories**: Categories with `parent_id` are processed next. The parent's database ID is resolved from the map built in Pass 1 and stored as `parent_category_id` on the child record.

If a child's `parent_id` references a category that was not found in Pass 1 (e.g., typo or missing parent), the child is treated as **top-level** with a console warning.

### Backward Compatibility

- Existing packs without any `parent_id` fields continue to work unchanged — all categories are top-level.
- No data migration is required for existing categories in the database.
- Packs can mix top-level and subcategory categories freely.

### Validation Rules

The pack validator enforces two rules for subcategories:

| Rule | Severity | Category | Description |
|------|----------|----------|-------------|
| Parent exists | Error | `invalid_parent_category` | `parent_id` must reference an existing `id` in the same pack's `categories` array |
| No nested subcategories | Error | `nested_subcategory` | A category whose `parent_id` points to another child category is rejected (max depth = 1) |

```json
// ✅ VALID: One level of nesting
{
  "categories": [
    { "id": "food", "name": "Food", "order": 0 },
    { "id": "drinks", "name": "Drinks", "order": 1, "parent_id": "food" }
  ]
}

// ❌ INVALID: Nested subcategory (depth > 1)
{
  "categories": [
    { "id": "food", "name": "Food", "order": 0 },
    { "id": "drinks", "name": "Drinks", "order": 1, "parent_id": "food" },
    { "id": "juices", "name": "Juices", "order": 2, "parent_id": "drinks" }
  ]
}
// Error: Category "juices" has parent "drinks" which is itself a subcategory

// ❌ INVALID: Unknown parent reference
{
  "categories": [
    { "id": "drinks", "name": "Drinks", "order": 0, "parent_id": "food" }
  ]
}
// Error: Category "drinks" references unknown parent_id: food
```

### Complete Example: Pack with Subcategories

```json
{
  "metadata": {
    "packId": "food-extended-v1",
    "name": "Food Extended",
    "version": "1.0.0",
    "tier": "extended",
    "languages": ["en", "nl"],
    "totalConcepts": 6,
    "dependencies": [],
    "description": "Extended food vocabulary with subcategories"
  },
  "categories": [
    { "id": "food", "name": "Food", "icon": "🍽️", "order": 0, "translations": { "en": { "name": "Food" }, "nl": { "name": "Eten" } } },
    { "id": "drinks", "name": "Drinks", "icon": "🥤", "order": 1, "parent_id": "food", "translations": { "en": { "name": "Drinks" }, "nl": { "name": "Dranken" } } },
    { "id": "snacks", "name": "Snacks", "icon": "🍿", "order": 2, "parent_id": "food", "translations": { "en": { "name": "Snacks" }, "nl": { "name": "Snacks" } } },
    { "id": "animals", "name": "Animals", "icon": "🐾", "order": 3, "translations": { "en": { "name": "Animals" }, "nl": { "name": "Dieren" } } }
  ],
  "concepts": [
    {
      "concept_key": "pizza_fringe_0001f355",
      "category_id": "food",
      "emoji": "🍕",
      "word_type": "noun",
      "position": 0,
      "translations": {
        "en": { "label": "pizza" },
        "nl": { "label": "pizza" }
      }
    },
    {
      "concept_key": "juice_fringe_0001f9c3",
      "category_id": "drinks",
      "emoji": "🧃",
      "word_type": "noun",
      "position": 0,
      "translations": {
        "en": { "label": "juice" },
        "nl": { "label": "sap" }
      }
    },
    {
      "concept_key": "water_fringe_0001f4a7",
      "category_id": "drinks",
      "emoji": "💧",
      "word_type": "noun",
      "position": 1,
      "translations": {
        "en": { "label": "water" },
        "nl": { "label": "water" }
      }
    },
    {
      "concept_key": "chips_fringe_0001f35f",
      "category_id": "snacks",
      "emoji": "🍟",
      "word_type": "noun",
      "position": 0,
      "translations": {
        "en": { "label": "chips" },
        "nl": { "label": "chips" }
      }
    },
    {
      "concept_key": "cookie_fringe_0001f36a",
      "category_id": "snacks",
      "emoji": "🍪",
      "word_type": "noun",
      "position": 1,
      "translations": {
        "en": { "label": "cookie" },
        "nl": { "label": "koekje" }
      }
    },
    {
      "concept_key": "dog_fringe_0001f415",
      "category_id": "animals",
      "emoji": "🐕",
      "word_type": "noun",
      "position": 0,
      "translations": {
        "en": { "label": "dog" },
        "nl": { "label": "hond" }
      }
    }
  ]
}
```

**What the user sees on the main screen:**

1. **Parent tabs**: `Favorites | Food | Animals`
2. User taps **Food** → subcategory row appears: `All | Drinks | Snacks`
3. **"All" selected** → shows pizza + juice + water + chips + cookie (parent + all children)
4. User taps **Drinks** → shows juice + water only
5. User taps **Animals** → no subcategory row, shows dog directly

### Design Tips for Subcategories

- **Keep it shallow**: Only one level of nesting. If you need more granularity, consider using separate activity boards instead.
- **Balance parent vs child symbols**: Put general items directly under the parent, and specialized items in children. The "All" view combines everything.
- **Use meaningful names**: Child category names should be self-explanatory without seeing the parent (e.g., "Drinks" is clear on its own).
- **Order children logically**: Use `order` to control the display sequence of children within the subcategory row.
- **Don't overdo it**: Not every category needs subcategories. A category with fewer than 10 symbols probably doesn't need splitting.

---

## Category Translations

Categories support multi-language display names via the optional `translations` field. When the user switches the app language, category names are displayed in the selected language, falling back to the `name` field when no translation exists.

### Format

```json
{
  "id": "food",
  "name": "Food",
  "icon": "🍽️",
  "order": 0,
  "translations": {
    "en": { "name": "Food" },
    "nl": { "name": "Eten" },
    "fr": { "name": "Nourriture" },
    "es": { "name": "Comida" }
  }
}
```

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `translations` | `Record<string, { name: string }>` | No | Translated category names keyed by language code |
| `translations[lang].name` | `string` | Yes (per entry) | The translated display name for that language |

### How It Works

1. **Pack import**: When a pack is installed, the `translations` entries are stored in the `category_translations` database table (one row per category per language).
2. **Display**: The app looks up the translated name for the current language. If found, it's used; otherwise, the category's `name` field is shown as-is.
3. **Re-import**: When a pack is re-installed, existing translations for affected categories are replaced with the new pack data.
4. **Backward compatible**: Categories without a `translations` field continue to work — they always display the `name` value.

### Best Practices

- **Include all declared languages**: Provide translations for every language listed in `metadata.languages` to avoid fallback to English.
- **Keep names short**: Category names appear in tab buttons and filter chips. Long translated names may get truncated.
- **Include the English name too**: Even though `name` already stores the English value, including `"en": { "name": "..." }` makes the pack data self-documenting and consistent.
- **Match concept translations**: If your concepts have translations for `en`, `nl`, `fr`, `es`, your categories should too.

### Validation

The pack validator warns about missing category translations:

| Rule | Severity | Category | Description |
|------|----------|----------|-------------|
| Missing translations object | Warning | `missing_category_translation` | A category in a multi-language pack has no `translations` field |
| Missing language entry | Warning | `missing_category_translation` | A category is missing a translation for a language declared in `metadata.languages` |

### Complete Example

```json
{
  "metadata": {
    "packId": "translated-categories-demo",
    "name": "Translated Categories Demo",
    "version": "1.0.0",
    "tier": "basic",
    "languages": ["en", "nl", "fr"],
    "totalConcepts": 2,
    "dependencies": [],
    "description": "Demo pack showing category translations"
  },
  "categories": [
    {
      "id": "food",
      "name": "Food",
      "icon": "🍽️",
      "order": 0,
      "translations": {
        "en": { "name": "Food" },
        "nl": { "name": "Eten" },
        "fr": { "name": "Nourriture" }
      }
    },
    {
      "id": "drinks",
      "name": "Drinks",
      "icon": "🥤",
      "order": 1,
      "parent_id": "food",
      "translations": {
        "en": { "name": "Drinks" },
        "nl": { "name": "Dranken" },
        "fr": { "name": "Boissons" }
      }
    }
  ],
  "concepts": [
    {
      "concept_key": "apple_noun_001",
      "category_id": "food",
      "emoji": "🍎",
      "word_type": "noun",
      "position": 0,
      "translations": {
        "en": { "label": "apple" },
        "nl": { "label": "appel" },
        "fr": { "label": "pomme" }
      }
    },
    {
      "concept_key": "water_noun_001",
      "category_id": "drinks",
      "emoji": "💧",
      "word_type": "noun",
      "position": 0,
      "translations": {
        "en": { "label": "water" },
        "nl": { "label": "water" },
        "fr": { "label": "eau" }
      }
    }
  ]
}
```

**What the user sees:**
- **Language = English**: Category tabs show "Food" and "Drinks"
- **Language = Dutch**: Category tabs show "Eten" and "Dranken"
- **Language = French**: Category tabs show "Nourriture" and "Boissons"

---

## Adding Images to Packs

Vocabulary packs can include custom images for **concepts**, **categories**, **core-fringe pages/slots**, and **activity boards**. Images are stored as **separate files** and referenced in the pack JSON via `pack:` URIs.

### Image Requirements

- **Format**: WebP (preferred — smallest file size), PNG, or JPG
- **Size**: 256x256 pixels recommended
- **Aspect ratio**: 1:1 (square)
- **File size**: < 15KB per image (WebP at 256x256 easily achieves this)

### Step 1: Prepare Your Images

1. Create or obtain square images (256x256 recommended)
2. Convert to WebP for best compression
3. Place them in the pack's image directory:

```
src/data/vocabularies/packs/
  core/images/{packId}/        ← e.g., base-pack-v1/
    eat.webp
    drink.webp
    family.webp
  demo/images/{packId}/
    cereal.webp
```

The **image key** is the filename without extension: `eat.webp` → key `eat`.

### Step 2: Generate the Asset Registry

Run the generation script to create `packAssets.ts` with static `require()` calls:

```bash
npm run generate:pack-assets
```

This scans all `images/{packId}/` directories and generates `src/data/vocabularies/packs/packAssets.ts`. You must re-run this whenever you add, remove, or rename images.

### Step 3: Reference in Pack JSON

Use the `pack:` URI prefix to reference images by key:

**Concept with image** (uses short form — symbols have `sourcePackId` at runtime):
```json
{
  "concept_key": "eat_verb_001",
  "image_uri": "pack:eat",
  "emoji": "🍽️",
  "translations": { ... }
}
```

**Category with image** (uses fully-qualified form — categories don't have `sourcePackId`):
```json
{
  "id": "food",
  "name": "Food",
  "image_uri": "pack:base-pack-v1/food-cat",
  "order": 2
}
```

### URI Formats

Two `pack:` URI forms are supported:

| Form | Example | When to Use |
|------|---------|-------------|
| `pack:imageKey` | `pack:eat` | Concepts (symbols have `sourcePackId` at runtime) |
| `pack:packId/imageKey` | `pack:base-pack-v1/eat` | Categories, core-fringe pages, core-fringe slots, activity boards |

Other supported formats (for special cases):
- `data:image/...;base64,...` — Inline base64 (small packs with few images only)
- `file://...` — Local file path (user-added images at runtime)

### Image Display Priority

When a **symbol** has both `image_uri` and `emoji`:
1. **Image** is displayed if available
2. **Emoji** is used as fallback if image fails to load

When a **category** has `image_uri`:
1. **Emoji** (`icon`) is displayed if set
2. **Image** (`image_uri`) is displayed if no emoji is set
3. Default folder icon (📁) is used if neither is set

### Migrating Existing Base64 Packs

To extract inline base64 images from an existing pack into separate files:

```bash
npm run extract:pack-images          # extract and rewrite pack JSON
npm run extract:pack-images --dry-run # preview without writing
npm run generate:pack-assets          # regenerate the registry
```

### Why Separate Files Instead of Base64?

| Aspect | Base64 Inline | Separate Files |
|--------|--------------|----------------|
| JSON file size | ~133% overhead per image | Minimal (just `pack:key` strings) |
| Metro build | Struggles with large JSON | Handles image assets natively |
| Memory on import | Entire JSON parsed at once | Only metadata parsed |
| DB storage | Large text blobs in every row | Short string per row |
| Scalability | Breaks at ~1000+ images | Handles 7000+ images |

**Recommendation**: Always use separate image files for packs with more than a handful of images.

---

## Creating a New Language Pack

Use this section when adding a **completely new language** to VoiceBridgeAAC.

### Step 1: Plan Your Pack

Before creating the JSON file, decide:

1. **Language code**: e.g., `it` for Italian
2. **Scope**: Core vocabulary only, or with translations?
3. **Tier**: Usually `basic` for a new language
4. **Dependencies**: None for standalone, or `core-basic-all-v1` if extending

### Step 2: Create Pack Metadata

```json
{
  "metadata": {
    "packId": "italian-basic-v1",
    "name": "Italian Basic Vocabulary",
    "version": "1.0.0",
    "tier": "basic",
    "languages": ["it"],
    "totalConcepts": 500,
    "dependencies": [],
    "description": "Core Italian vocabulary for AAC communication",
    "category": "core",
    "author": "Your Name",
    "releaseDate": "2026-02-01"
  }
}
```

#### Pack ID Naming Convention

```
{language}-{tier}-{variant?}-v{version}
```

Examples:
- `italian-basic-v1` - Italian basic vocabulary
- `french-extended-v1` - French extended vocabulary
- `german-medical-v1` - German medical terminology

### Step 3: Define Categories

Categories organize concepts into logical groups. You can:
- **Use standard categories** (recommended for core vocabularies)
- **Create custom categories** (for specialized packs)

#### Standard Categories

```json
{
  "categories": [
    {
      "id": "core-words",
      "name": "Parole Base",
      "description": "Le parole più usate nella comunicazione",
      "icon": "⭐",
      "order": 0,
      "color": "#4a90e2",
      "positionRange": [0, 59]
    },
    {
      "id": "people",
      "name": "Persone",
      "description": "Persone, pronomi e relazioni",
      "icon": "👥",
      "order": 1,
      "color": "#e74c3c",
      "positionRange": [60, 119]
    },
    {
      "id": "actions",
      "name": "Azioni",
      "description": "Verbi e azioni comuni",
      "icon": "⚡",
      "order": 2,
      "color": "#2ecc71",
      "positionRange": [120, 179]
    },
    {
      "id": "descriptors",
      "name": "Descrittori",
      "description": "Aggettivi, sentimenti e parole descrittive",
      "icon": "🎨",
      "order": 3,
      "color": "#9b59b6",
      "positionRange": [180, 239]
    },
    {
      "id": "things",
      "name": "Cose",
      "description": "Oggetti, luoghi, tempo e concetti",
      "icon": "🌍",
      "order": 4,
      "color": "#f39c12",
      "positionRange": [240, 299]
    }
  ]
}
```

> **Tip:** If no suitable emoji is available for a category, you can use `image_uri` instead of `icon` to provide an image. Use the fully-qualified form `pack:packId/imageKey` since categories don't have `sourcePackId` at runtime. The image is displayed in category tabs and pickers when no emoji icon is set. See [Adding Images to Packs](#adding-images-to-packs).

> **Tip:** You can organize categories into subcategories using `parent_id`. See [Subcategories (Parent-Child Categories)](#subcategories-parent-child-categories) for details.

### Step 4: Create Concepts

Each concept represents a single vocabulary item. **Important**: Each semantic meaning should be ONE concept with translations for all supported languages.

#### Option A: Multi-Language Pack (Recommended)

Include translations for **all** declared languages. Concepts missing a translation for a language will not appear when the user selects that language:

```json
{
  "concepts": [
    {
      "concept_key": "voglio_verb_it001",
      "translations": {
        "it": {
          "label": "volere",
          "spoken_text": "volere",
          "infinitive": "volere"
        },
        "en": {
          "label": "want",
          "spoken_text": "want",
          "infinitive": "want"
        }
      },
      "emoji": "🤲",
      "position": 2,
      "word_type": "verb",
      "category_id": "core-words",
      "motor_zone": "action-zone",
      "introduction_level": 1,
      "usage_priority": "essential"
    }
  ]
}
```

#### Option B: Single-Language Pack

For a pure Italian pack:

```json
{
  "concepts": [
    {
      "concept_key": "volere_verb_it001",
      "translations": {
        "it": {
          "label": "volere",
          "spoken_text": "volere",
          "infinitive": "volere"
        }
      },
      "emoji": "🤲",
      "position": 2,
      "word_type": "verb",
      "category_id": "core-words",
      "motor_zone": "action-zone",
      "introduction_level": 1,
      "usage_priority": "essential"
    }
  ]
}
```

### Step 5: Add Grammar Data (Required for Verbs)

For proper verb conjugation, you **must** include grammar data. See the [Grammar Data Format](#grammar-data-format) section for complete key reference.

**IMPORTANT**: All exception keys must be **UPPERCASE** (e.g., `PRES_1SG`, `PAST_ALL`, `PARTICIPLE`).

```json
{
  "grammar": {
    "irregularVerbs": {
      "it": [
        {
          "infinitive": "andare",
          "exceptions": {
            "PRES_1SG": "vado",
            "PRES_2SG": "vai",
            "PRES_3SG": "va",
            "PRES_PL": "andiamo",
            "PAST_ALL": "andò",
            "PARTICIPLE": "andato"
          }
        },
        {
          "infinitive": "essere",
          "exceptions": {
            "PRES_1SG": "sono",
            "PRES_2SG": "sei",
            "PRES_3SG": "è",
            "PRES_PL": "siamo",
            "PAST_1SG": "fui",
            "PAST_3SG": "fu",
            "PARTICIPLE": "stato"
          }
        },
        {
          "infinitive": "avere",
          "exceptions": {
            "PRES_1SG": "ho",
            "PRES_2SG": "hai",
            "PRES_3SG": "ha",
            "PRES_PL": "abbiamo",
            "PAST_ALL": "ebbe",
            "PARTICIPLE": "avuto"
          }
        }
      ]
    },
    "nounPluralization": {
      "it": {
        "irregularPlurals": {
          "uomo": "uomini",
          "braccio": "braccia",
          "uovo": "uova"
        },
        "uncountableNouns": ["acqua", "latte", "pane", "riso"]
      }
    }
  }
}
```

### Step 6: Save and Register

1. Save the file as: `src/data/vocabularies/packs/core/italian-basic.pack.json`

2. Register in `useVocabularyPacks.ts`:

```typescript
const AVAILABLE_PACK_REGISTRY = [
  // ... existing packs
  {
    packId: 'italian-basic-v1',
    name: 'Italian Basic Vocabulary',
    description: 'Core Italian vocabulary for AAC communication',
    version: '1.0.0',
    tier: 'basic',
    languages: ['it'],
    conceptCount: 500,
    dependencies: [],
  },
];
```

3. Add import handler in `VocabularyManagementSettings.tsx`:

```typescript
case 'italian-basic-v1': {
  const packData = await import('../../../data/vocabularies/packs/core/italian-basic.pack.json');
  pack = packData.default as unknown as VocabularyPack;
  break;
}
```

---

## Creating a Language Add-On Pack

Use this section when creating **additional vocabulary** for an already supported language.

### Example: Dutch Children's Vocabulary

### Step 1: Define the Scope

Identify the target audience and vocabulary domain:

- **Target**: Children (ages 3-8)
- **Domain**: Family, animals, colors, food, feelings
- **Language**: Dutch only (`nl`)
- **Size**: ~150 concepts

### Step 2: Create Pack Metadata

```json
{
  "metadata": {
    "packId": "dutch-children-v1",
    "name": "Nederlands voor Kinderen",
    "version": "1.0.0",
    "tier": "specialized",
    "languages": ["nl"],
    "totalConcepts": 150,
    "dependencies": [],
    "description": "Kindvriendelijke woordenschat met familie, dieren, kleuren en gevoelens",
    "category": "children",
    "author": "VoiceBridge Team",
    "releaseDate": "2026-02-01"
  }
}
```

#### Add-On Pack ID Convention

```
{language}-{domain/audience}-v{version}
```

Examples:
- `dutch-children-v1` - Dutch children's vocabulary
- `english-medical-v1` - English medical terms
- `spanish-education-v1` - Spanish educational vocabulary

### Step 3: Create Domain-Specific Categories

Add-on packs typically have custom categories:

```json
{
  "categories": [
    {
      "id": "familie",
      "name": "Familie",
      "description": "Familieleden en mensen",
      "icon": "👨‍👩‍👧‍👦",
      "order": 0,
      "color": "#e74c3c"
    },
    {
      "id": "dieren",
      "name": "Dieren",
      "description": "Huisdieren en boerderijdieren",
      "icon": "🐾",
      "order": 1,
      "color": "#27ae60"
    },
    {
      "id": "kleuren",
      "name": "Kleuren",
      "description": "Basiskleuren",
      "icon": "🌈",
      "order": 2,
      "color": "#9b59b6"
    },
    {
      "id": "eten-drinken",
      "name": "Eten & Drinken",
      "description": "Voedsel en dranken",
      "icon": "🍎",
      "order": 3,
      "color": "#e67e22"
    },
    {
      "id": "gevoelens",
      "name": "Gevoelens",
      "description": "Emoties en gevoelens",
      "icon": "😊",
      "order": 4,
      "color": "#e91e63"
    }
  ]
}
```

### Step 4: Create Child-Friendly Concepts

Use simple language and relevant emojis:

```json
{
  "concepts": [
    {
      "concept_key": "kind_mama_001",
      "translations": {
        "nl": {
          "label": "mama",
          "spoken_text": "mama"
        }
      },
      "emoji": "👩",
      "position": 0,
      "word_type": "noun",
      "category_id": "familie",
      "introduction_level": 1,
      "usage_priority": "essential"
    },
    {
      "concept_key": "kind_papa_001",
      "translations": {
        "nl": {
          "label": "papa",
          "spoken_text": "papa"
        }
      },
      "emoji": "👨",
      "position": 1,
      "word_type": "noun",
      "category_id": "familie",
      "introduction_level": 1,
      "usage_priority": "essential"
    },
    {
      "concept_key": "kind_hond_001",
      "translations": {
        "nl": {
          "label": "hond",
          "spoken_text": "hond"
        }
      },
      "emoji": "🐕",
      "position": 10,
      "word_type": "noun",
      "category_id": "dieren",
      "introduction_level": 1,
      "usage_priority": "high"
    },
    {
      "concept_key": "kind_spelen_001",
      "translations": {
        "nl": {
          "label": "spelen",
          "spoken_text": "spelen",
          "infinitive": "spelen"
        }
      },
      "emoji": "🎮",
      "position": 50,
      "word_type": "verb",
      "category_id": "kind-acties",
      "motor_zone": "action-zone",
      "introduction_level": 1,
      "usage_priority": "essential"
    },
    {
      "concept_key": "kind_blij_001",
      "translations": {
        "nl": {
          "label": "blij",
          "spoken_text": "blij"
        }
      },
      "emoji": "😊",
      "position": 80,
      "word_type": "adjective",
      "category_id": "gevoelens",
      "introduction_level": 1,
      "usage_priority": "essential"
    }
  ]
}
```

### Step 5: Add Grammar Data (If Needed)

For add-on packs with verbs or irregular nouns. See the [Grammar Data Format](#grammar-data-format) section for complete key reference.

**IMPORTANT**: All exception keys must be **UPPERCASE** (e.g., `PRES_1SG`, `PAST_ALL`, `PARTICIPLE`).

```json
{
  "grammar": {
    "irregularVerbs": {
      "nl": [
        {
          "infinitive": "zijn",
          "exceptions": {
            "PRES_1SG": "ben",
            "PRES_2SG": "bent",
            "PRES_3SG": "is",
            "PRES_PL": "zijn",
            "PAST_1SG": "was",
            "PAST_PL": "waren",
            "PARTICIPLE": "geweest"
          }
        },
        {
          "infinitive": "hebben",
          "exceptions": {
            "PRES_1SG": "heb",
            "PRES_2SG": "hebt",
            "PRES_3SG": "heeft",
            "PRES_PL": "hebben",
            "PAST_ALL": "had",
            "PARTICIPLE": "gehad"
          }
        }
      ]
    },
    "nounPluralization": {
      "nl": {
        "irregularPlurals": {
          "kind": "kinderen",
          "ei": "eieren"
        },
        "uncountableNouns": ["water", "melk", "brood"]
      }
    }
  }
}
```

---

## Creating Activity Board Packs

Activity boards provide schematic layouts where symbols are arranged by activity or event rather than by category. They follow the "script" model from AAC therapy, organizing vocabulary around specific situations like breakfast, bathtime, or baking.

### What are Activity Boards?

Unlike the main symbol grid (organized by categories like "People", "Actions", "Food"), activity boards:

- **Focus on one activity**: All vocabulary needed for a specific event
- **Follow script patterns**: WHO (left) → ACTION (center) → WHAT (right)
- **Include navigation**: Link buttons connect related boards
- **Support learning**: Scaffolds communication for specific situations

### Activity Board Schema

```typescript
interface PackActivityBoardData {
  board_key: string;        // REQUIRED - Unique within pack (e.g., "board_breakfast")
  grid_columns: number;     // REQUIRED - Number of columns (e.g., 5)
  grid_rows: number;        // REQUIRED - Number of rows (e.g., 4)
  order: number;            // REQUIRED - Display order on dashboard
  translations: Record<string, BoardTranslation>; // REQUIRED

  icon?: string;            // Emoji for dashboard tile
  background_color?: string;
  buttons: BoardButtonPlacement[];  // REQUIRED - Symbol buttons
  links?: BoardLinkPlacement[];     // OPTIONAL - Navigation to other boards
}

interface BoardTranslation {
  title: string;            // REQUIRED - Board title
  description?: string;
}

interface BoardButtonPlacement {
  concept_key: string;      // REQUIRED - References a concept
  row: number;              // REQUIRED - 0-indexed row position
  column: number;           // REQUIRED - 0-indexed column position
  is_visible?: boolean;     // Default: true
  background_override?: string;
}

interface BoardLinkTranslation {
  label: string;             // REQUIRED - Button label in this language
}

interface BoardLinkPlacement {
  link_to_board_key: string; // REQUIRED - Target board_key OR functional button ID
  row: number;               // REQUIRED - 0-indexed row position
  column: number;            // REQUIRED - 0-indexed column position
  translations: Record<string, BoardLinkTranslation>; // REQUIRED - Labels by language
  background_color?: string;
}

// Special functional button IDs (use instead of board_key for navigation)
const FUNCTIONAL_BUTTONS = {
  "__back__": "Go back to previous board (uses navigation stack)",
  "__home__": "Go to dashboard/home screen"
};
```

### Functional Navigation Buttons

Instead of linking to a specific board, you can use special functional button IDs to create navigation buttons that use the navigation stack:

| ID | Description | Use Case |
|----|-------------|----------|
| `__back__` | Returns to the previous board in the navigation history | True "Back" button that follows user's path |
| `__home__` | Returns to the dashboard/home screen | Quick escape to main menu |

**Why use `__back__` instead of a specific board?**

When multiple boards can link to the same destination (N-to-1 relationship), a hardcoded "Back" link doesn't know which board the user came from:

```
Board A ──┐
          ├──► Board X ──► "← Back" should go to A, B, or C?
Board B ──┤
          │
Board C ──┘
```

Using `__back__` solves this by tracking the navigation history:
- User navigates: A → X → Y
- Pressing `__back__` on Y returns to X
- Pressing `__back__` on X returns to A

```json
// ✅ CORRECT: Uses navigation stack
{
  "link_to_board_key": "__back__",
  "row": 3,
  "column": 0,
  "translations": {
    "en": { "label": "← Back" },
    "nl": { "label": "← Terug" }
  }
}

// ❌ WRONG: Hardcoded to specific board (breaks N-to-1 navigation)
{
  "link_to_board_key": "board_main",
  "row": 3,
  "column": 0,
  "translations": {
    "en": { "label": "← Back" }
  }
}
```

### Step-by-Step: Creating an Activity Board Pack

#### Step 1: Plan Your Board Set

Before writing JSON, plan your boards:

1. **Choose the activity**: e.g., "Morning Routine"
2. **List sub-activities**: Wake up, Breakfast, Getting dressed, Brushing teeth
3. **Identify vocabulary**: Who (Mom, Dad, Me), Actions (wake, eat, brush), Objects (bed, cereal, toothbrush)
4. **Design navigation**: How boards link together

**Example Plan:**

```
Morning Routine Pack
├── board_wakeup     → [Getting Dressed]
├── board_breakfast  → [Getting Dressed]
├── board_dressing   → [Brushing Teeth]
└── board_brushing   → [Done/Home]
```

#### Step 2: Create Pack Metadata

```json
{
  "metadata": {
    "packId": "morning-routine-v1",
    "name": "Morning Routine",
    "version": "1.0.0",
    "tier": "specialized",
    "languages": ["en", "nl"],
    "totalConcepts": 25,
    "totalActivityBoards": 4,
    "totalPhrases": 6,
    "totalAbbreviations": 3,
    "dependencies": [],
    "description": "Activity boards for morning routine activities"
  }
}
```

**Note**: If your boards reference concepts from other packs, add them to `dependencies`:

```json
{
  "dependencies": ["core-basic-all-v1"]
}
```

#### Step 3: Define Categories and Concepts

Activity board packs should include the concepts they reference:

```json
{
  "categories": [
    { "id": "people", "name": "People", "icon": "👥", "order": 1 },
    { "id": "actions", "name": "Actions", "icon": "🏃", "order": 2 },
    { "id": "objects", "name": "Objects", "icon": "📦", "order": 3 }
  ],
  "concepts": [
    {
      "concept_key": "person_mom",
      "category_id": "people",
      "emoji": "👩",
      "word_type": "noun",
      "translations": {
        "en": { "label": "Mom" },
        "nl": { "label": "Mama" }
      }
    },
    {
      "concept_key": "action_wake",
      "category_id": "actions",
      "emoji": "🌅",
      "word_type": "verb",
      "translations": {
        "en": { "label": "Wake up", "infinitive": "wake" },
        "nl": { "label": "Wakker worden", "infinitive": "wakker worden" }
      }
    },
    {
      "concept_key": "object_bed",
      "category_id": "objects",
      "emoji": "🛏️",
      "word_type": "noun",
      "translations": {
        "en": { "label": "Bed" },
        "nl": { "label": "Bed" }
      }
    }
  ]
}
```

#### Step 4: Design the Grid Layout

Grid positions are 0-indexed. For a 5-column × 4-row grid:

```
       Col 0    Col 1    Col 2    Col 3    Col 4
Row 0  [0,0]    [0,1]    [0,2]    [0,3]    [0,4]
Row 1  [1,0]    [1,1]    [1,2]    [1,3]    [1,4]
Row 2  [2,0]    [2,1]    [2,2]    [2,3]    [2,4]
Row 3  [3,0]    [3,1]    [3,2]    [3,3]    [3,4]
```

**Script Layout Pattern** (recommended for AAC):

```
       LEFT         CENTER        RIGHT
       (WHO)        (ACTION)      (WHAT)
       ──────────────────────────────────────
Row 0  Mom          Wake up       Bed
Row 1  Dad          Get up        Pajamas
Row 2  Me           Stretch       Morning
       ──────────────────────────────────────
Row 3  [← Back]                   [Next →]
```

- **Left columns**: Agents/People (Who?)
- **Center columns**: Actions/Verbs (What doing?)
- **Right columns**: Objects/Nouns (What?)
- **Bottom row**: Navigation links

#### Step 5: Create Activity Boards

```json
{
  "activityBoards": [
    {
      "board_key": "board_wakeup",
      "grid_columns": 5,
      "grid_rows": 4,
      "icon": "🌅",
      "background_color": "#FFF9C4",
      "order": 1,
      "translations": {
        "en": {
          "title": "Waking Up",
          "description": "Morning wake-up vocabulary"
        },
        "nl": {
          "title": "Wakker Worden",
          "description": "Ochtend vocabulaire"
        }
      },
      "buttons": [
        { "concept_key": "person_mom", "row": 0, "column": 0 },
        { "concept_key": "person_dad", "row": 0, "column": 1 },
        { "concept_key": "person_me", "row": 0, "column": 2 },

        { "concept_key": "action_wake", "row": 1, "column": 0 },
        { "concept_key": "action_stretch", "row": 1, "column": 1 },
        { "concept_key": "action_getup", "row": 1, "column": 2 },

        { "concept_key": "object_bed", "row": 2, "column": 0 },
        { "concept_key": "object_pillow", "row": 2, "column": 1 },
        { "concept_key": "object_blanket", "row": 2, "column": 2 }
      ],
      "links": [
        {
          "link_to_board_key": "board_breakfast",
          "row": 3,
          "column": 4,
          "translations": {
            "en": { "label": "Breakfast →" },
            "nl": { "label": "Ontbijt →" }
          },
          "background_color": "#4CAF50"
        }
      ]
    },
    {
      "board_key": "board_breakfast",
      "grid_columns": 5,
      "grid_rows": 4,
      "icon": "🍳",
      "background_color": "#FFECB3",
      "order": 2,
      "translations": {
        "en": { "title": "Breakfast" },
        "nl": { "title": "Ontbijt" }
      },
      "buttons": [
        { "concept_key": "person_mom", "row": 0, "column": 0 },
        { "concept_key": "person_me", "row": 0, "column": 1 },
        { "concept_key": "action_eat", "row": 1, "column": 0 },
        { "concept_key": "action_drink", "row": 1, "column": 1 },
        { "concept_key": "food_cereal", "row": 2, "column": 0 },
        { "concept_key": "food_milk", "row": 2, "column": 1 }
      ],
      "links": [
        {
          "link_to_board_key": "board_wakeup",
          "row": 3,
          "column": 0,
          "translations": {
            "en": { "label": "← Wake up" },
            "nl": { "label": "← Wakker worden" }
          }
        },
        {
          "link_to_board_key": "board_dressing",
          "row": 3,
          "column": 4,
          "translations": {
            "en": { "label": "Dress →" },
            "nl": { "label": "Aankleden →" }
          }
        }
      ]
    }
  ]
}
```

#### Step 6: Add Related Phrases and Abbreviations

Include phrases and abbreviations related to your activity:

```json
{
  "phrases": [
    {
      "phrase_key": "phrase_im_awake",
      "category": "responses",
      "priority": "high",
      "translations": {
        "en": { "text": "I'm awake" },
        "nl": { "text": "Ik ben wakker" }
      }
    },
    {
      "phrase_key": "phrase_want_breakfast",
      "category": "needs",
      "priority": "essential",
      "translations": {
        "en": { "text": "I want breakfast" },
        "nl": { "text": "Ik wil ontbijten" }
      }
    }
  ],
  "abbreviations": [
    {
      "shortcode": "hgry",
      "category": "needs",
      "translations": {
        "en": { "expanded_text": "I am hungry" },
        "nl": { "expanded_text": "Ik heb honger" }
      }
    }
  ]
}
```

### Activity Board Concept References

Board buttons reference concepts using `concept_key`. Concepts can come from:

1. **Same pack**: Concepts defined in the same `.pack.json` file
2. **Dependent packs**: Concepts from packs listed in `dependencies`
3. **Any installed pack**: At import time, the system resolves `concept_key` to actual symbols

**Resolution Order:**
1. First, all symbols from ALL installed packs are queried
2. Each `concept_key` is matched to a symbol's `concept_key` field
3. The symbol's database ID is stored in the board button

```
Pack JSON                    Database
─────────────────────────────────────────────
buttons: [                   board_buttons: [
  { concept_key: "person_mom" }   →   { symbol_id: "abc123" }
]                            ]
```

**Warning**: If a `concept_key` doesn't exist in any installed pack, the button will be skipped with an error logged.

### Activity Board Validation Rules

The pack validator checks:

| Rule | Level | Description |
|------|-------|-------------|
| `board_key` unique | Error | Each board must have unique key |
| Grid dimensions | Error | `grid_columns` and `grid_rows` >= 1 |
| Button positions | Error | Must be within grid bounds |
| No duplicate positions | Error | Only one element per row,column |
| Link target exists | Error | `link_to_board_key` must exist in same pack OR be a functional ID (`__back__`, `__home__`) |
| Link translations | Warning | Links should have `translations` for all pack languages |
| Concept exists | Warning | `concept_key` should exist (resolved at import) |
| Translations complete | Warning | All pack languages should have translations |

### Activity Board Best Practices

#### 1. Follow Script Layout

Organize boards following the WHO → ACTION → WHAT pattern:

```
✅ Good:
   Mom    Wake up    Bed
   Dad    Eat        Cereal
   Me     Drink      Milk

❌ Bad (random layout):
   Milk   Mom        Wake up
   Eat    Bed        Dad
```

#### 2. Consistent Grid Sizes

Use consistent grid sizes across related boards for familiarity:

```
✅ Good: All boards are 5×4
❌ Bad: Board 1 is 5×4, Board 2 is 6×3, Board 3 is 4×5
```

#### 3. Clear Navigation

Always provide navigation links:

- **Back link** (bottom-left): Return to previous board - **use `__back__` for true back navigation**
- **Forward link** (bottom-right): Go to next board (link to specific board)
- **Home link** (optional): Return to dashboard - **use `__home__`**

```json
"links": [
  {
    "link_to_board_key": "__back__",
    "row": 3,
    "column": 0,
    "translations": {
      "en": { "label": "← Back" },
      "nl": { "label": "← Terug" }
    },
    "background_color": "#BBDEFB"
  },
  {
    "link_to_board_key": "board_next",
    "row": 3,
    "column": 4,
    "translations": {
      "en": { "label": "Next →" },
      "nl": { "label": "Volgende →" }
    }
  },
  {
    "link_to_board_key": "__home__",
    "row": 3,
    "column": 2,
    "translations": {
      "en": { "label": "🏠 Home" },
      "nl": { "label": "🏠 Thuis" }
    }
  }
]
```

**Important**: Use `__back__` instead of hardcoding a specific board for back buttons. This ensures proper navigation when multiple boards link to the same destination (N-to-1 relationships).

#### 4. Semantic Board Keys

Use descriptive, consistent `board_key` names:

```
✅ Good:
   board_breakfast_main
   board_breakfast_drinks
   board_breakfast_foods

❌ Bad:
   board1
   breakfast
   b_drinks
```

#### 5. Include Core Vocabulary

Always include "Me", "want", "help" on every board:

```json
"buttons": [
  { "concept_key": "person_me", "row": 0, "column": 0 },
  { "concept_key": "action_want", "row": 0, "column": 1 },
  { "concept_key": "action_help", "row": 0, "column": 2 }
]
```

#### 6. Color Code by Activity

Use `background_color` to visually distinguish activity types:

| Activity | Suggested Color |
|----------|----------------|
| Morning/Wake up | Light yellow `#FFF9C4` |
| Food/Eating | Light orange `#FFECB3` |
| Play/Fun | Light green `#C8E6C9` |
| Bath/Hygiene | Light blue `#BBDEFB` |
| Sleep/Bedtime | Light purple `#E1BEE7` |

### Complete Activity Board Pack Example

See: `src/data/vocabularies/packs/demo/breakfast-children.pack.json`

This pack includes:
- 57 concepts
- 5 activity boards (Breakfast, Drinks, Getting Ready, Playtime, Navigation)
- 12 phrases
- 6 abbreviations
- Multi-language support (English and Dutch)

---

## Creating Core-Fringe Layout Packs

Core-Fringe layouts define a grid where **core** (pinned) vocabulary stays visible during navigation while **fringe** (dynamic) vocabulary changes per category page.

### Per-Grid-Size Layouts

A single pack can include **multiple core-fringe layouts optimized for different grid sizes**. Each grid size (6–12 columns) can have its own independent symbol arrangement. When the user switches grid sizes in Settings, the app activates the layout matching that size.

This is important because a layout designed for 8 columns may not work well at 6 columns — you'd want fewer core words and a tighter symbol selection for smaller grids.

### Available Grid Sizes

The app supports 7 grid sizes (6–12 columns). The row count is automatically determined by the column count via the `CORE_FRINGE_ROWS` mapping (defined in `useSettingsState.ts`):

| Grid Size | Columns | Rows | Total Cells | Best For |
|-----------|---------|------|-------------|----------|
| Small | 6 | 4 | 24 | Young children, limited motor skills |
| Medium-Small | 7 | 4 | 28 | Transitioning users |
| Medium | 8 | 4 | 32 | General-purpose |
| Medium-Large | 9 | 5 | 45 | Intermediate users |
| Large | 10 | 5 | 50 | Advanced users |
| Extra-Large | 11 | 5 | 55 | Power users, large screens |
| Maximum | 12 | 6 | 72 | Default — tablets, maximum vocabulary density (app default) |

> **Important:** When creating a layout, always set `grid_rows` to the value from this table for the corresponding `grid_columns`. Using a mismatched row count will result in unexpected behavior.

### Layout Structure

```json
{
  "coreFringeLayouts": [
    {
      "layout_key": "my_layout_8x4",
      "icon": "📊",
      "image_uri": "",
      "grid_columns": 8,
      "grid_rows": 4,
      "translations": {
        "en": { "name": "My Layout (8 columns)" },
        "nl": { "name": "Mijn Layout (8 kolommen)" }
      },
      "pages": [ ... ]
    },
    {
      "layout_key": "my_layout_6x4",
      "icon": "📊",
      "grid_columns": 6,
      "grid_rows": 4,
      "translations": {
        "en": { "name": "My Layout (6 columns)" },
        "nl": { "name": "Mijn Layout (6 kolommen)" }
      },
      "pages": [ ... ]
    }
  ]
}
```

### Layout Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `layout_key` | string | Yes | Unique identifier within the pack |
| `icon` | string | No | Emoji icon for the layout (displayed on layout cards) |
| `image_uri` | string | No | Image URI for the layout (`pack:packId/key`, base64, or `file://`). Takes priority over `icon` when present. |
| `grid_columns` | number | Yes | Column count (6–12) |
| `grid_rows` | number | Yes | Row count (use `CORE_FRINGE_ROWS` mapping: 6→4, 7→4, 8→4, 9→5, 10→5, 11→5, 12→6) |
| `translations` | object | Yes | `{ lang: { name } }` — display name per language |
| `pages` | array | Yes | Array of page definitions (root + sub-pages) |

### Page Structure

Each layout must have exactly one **root page** (no `parent_page_key`) and zero or more **child pages**.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `page_key` | string | Yes | Unique within the layout |
| `parent_page_key` | string | No | Omit for root page; set to parent's `page_key` for child pages |
| `order` | number | Yes | Display order among siblings |
| `translations` | object | Yes | `{ lang: { title } }` — page title per language |
| `icon` | string | No | Emoji icon for the page |
| `image_uri` | string | No | Image URI for the page (`pack:packId/key`, base64, or `file://`). Takes priority over `icon` when present. |
| `slots` | array | Yes | Array of slot placements |

### Slot Placement

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `row` | number | Yes | Grid row (0-indexed, must be < `grid_rows`) |
| `column` | number | Yes | Grid column (0-indexed, must be < `grid_columns`) |
| `is_pinned` | boolean | Yes | `true` = core (always visible), `false` = fringe (page-specific) |
| `concept_key` | string | No | Reference to a concept in this or a dependency pack |
| `is_category_link` | boolean | No | `true` for navigation link cells |
| `link_to_page_key` | string | No | Target page key (must exist in same layout) |
| `link_translations` | object | No | `{ lang: { label } }` — link display text |
| `link_icon` | string | No | Emoji icon for the link |
| `link_image_uri` | string | No | Image URI for the link (`pack:packId/key`, base64, or `file://`). Takes priority over `link_icon` when present. |
| `background_override` | string | No | Custom CSS color |

### Link Cell Display Priority

When rendering a category link cell on the grid, the app uses this priority:

1. **`link_image_uri`** — If present, displays the image (supports `pack:packId/key`, base64, or `file://` URIs)
2. **`link_icon`** — If present (and no image), displays the emoji
3. **Fallback** — If neither is set, displays a folder-open icon

**Example — Link slot with an image:**

```json
{
  "row": 1,
  "column": 0,
  "is_pinned": false,
  "is_category_link": true,
  "link_to_page_key": "cf_food",
  "link_image_uri": "pack:my-pack-v1/food-link",
  "link_translations": {
    "en": { "label": "Food" },
    "nl": { "label": "Eten" }
  }
}
```

> **Tip:** Use `pack:packId/imageKey` URIs for link images. Place the image files in the pack's image directory and run `npm run generate:pack-assets`. For small packs with very few images, inline base64 is also acceptable.

### Import Activation Rules

When a pack with multiple core-fringe layouts is installed:

1. The app reads the user's current `coreFringeColumns` setting (default: 8)
2. Only the layout whose `grid_columns` matches the current setting is **activated** (`is_active = true`)
3. All other layouts are created but remain **inactive** (`is_active = false`)
4. When the user later switches to a different grid size in settings, the matching layout is automatically activated

### Validation Rules

The pack validator checks:

- Unique `layout_key` per pack (error)
- No duplicate `grid_columns` within the same pack (warning)
- `grid_columns` must be 6–12 (error)
- `grid_rows` must be > 0 (error)
- Exactly one root page per layout (error)
- Valid `parent_page_key` references (error)
- Valid `link_to_page_key` references (error)
- Slot positions within grid bounds (warning)
- No duplicate slot positions per page (warning)
- `concept_key` references — warns if not in pack (may be in dependency)
- Translations for all declared languages (warning)

### Design Tips

- **Core row**: Place 6–8 high-frequency words (I, want, more, stop, yes, no) in row 0 as pinned slots
- **Smaller grids (6–7 cols)**: Prioritize the most essential core words — drop less-used ones like "help" and "finished"
- **Medium grids (8–10 cols)**: Good balance of core and fringe vocabulary; the default 8-column layout is a solid starting point
- **Larger grids (11–12 cols)**: Take advantage of the extra rows (5–6) to add more category links and fringe vocabulary; consider adding a second row of pinned core words
- **Category links**: Place in row 1 for easy access; use descriptive emoji icons
- **Sub-pages**: Keep fringe slots starting at row 1 (row 0 is reserved for pinned core in typical layouts)
- **Consistent page keys**: Use descriptive keys like `cf_food`, `cf_drinks` for clarity
- **Different page keys per grid size**: When including multiple layouts, use distinct page keys (e.g., `cf_home` for 8x4, `cf_home_6` for 6x4) to avoid conflicts

---

## Phrases Format

Phrases are pre-built sentences or expressions that users can quickly select for common communication needs. Unlike concepts that are individual words, phrases are complete expressions.

### Phrase Categories

| Category | Description | Examples |
|----------|-------------|----------|
| `needs` | Basic needs and requests | "I need help", "I'm hungry" |
| `medical` | Health-related phrases | "I'm in pain", "Call the doctor" |
| `social` | Greetings and social phrases | "Thank you", "Good morning" |
| `requests` | Asking for things/actions | "Can you help me?", "Please wait" |
| `emotions` | Expressing feelings | "I'm happy", "I'm scared" |
| `responses` | Quick response phrases | "Yes, please", "No, thank you" |

### Phrase Structure

```json
{
  "phrases": [
    {
      "phrase_key": "needs_help_001",
      "category": "needs",
      "priority": "essential",
      "translations": {
        "en": {
          "text": "I need help",
          "spoken_text": "I need help"
        },
        "nl": {
          "text": "Ik heb hulp nodig",
          "spoken_text": "Ik heb hulp nodig"
        },
        "es": {
          "text": "Necesito ayuda",
          "spoken_text": "Necesito ayuda"
        }
      }
    }
  ]
}
```

### Phrase Fields

| Field | Required | Description |
|-------|----------|-------------|
| `phrase_key` | Yes | Unique identifier for the phrase |
| `category` | Yes | One of: needs, medical, social, requests, emotions, responses |
| `priority` | No | Priority level: essential, high, medium, low |
| `translations` | Yes | Object with language codes as keys |
| `translations.{lang}.text` | Yes | The phrase text to display |
| `translations.{lang}.spoken_text` | No | Alternative text for speech synthesis |

### Phrase Key Naming Convention

```
{category}_{descriptor}_{number}
```

Examples:
- `needs_help_001` - "I need help"
- `medical_pain_001` - "I'm in pain"
- `social_greeting_morning_001` - "Good morning"
- `emotions_happy_001` - "I'm happy"

### Multi-Language Phrase Example

```json
{
  "phrase_key": "medical_pain_001",
  "category": "medical",
  "priority": "essential",
  "translations": {
    "en": { "text": "I'm in pain" },
    "nl": { "text": "Ik heb pijn" },
    "es": { "text": "Tengo dolor" }
  }
}
```

---

## Abbreviations Format

Abbreviations provide text expansion shortcuts. When a user types or selects a shortcode, it expands to the full text.

### Abbreviation Categories

| Category | Description | Examples |
|----------|-------------|----------|
| `internet` | Internet and chat abbreviations | "brb", "lol", "btw" |
| `texting` | Common texting shortcuts | "ur", "bc", "msg" |
| `medical` | Medical abbreviations | "rx", "dx" |
| `professional` | Work/professional terms | "asap", "fyi", "etc" |

### Abbreviation Structure

```json
{
  "abbreviations": [
    {
      "shortcode": "brb",
      "category": "internet",
      "translations": {
        "en": {
          "expanded_text": "be right back",
          "spoken_text": "be right back"
        },
        "nl": {
          "expanded_text": "ben zo terug",
          "spoken_text": "ben zo terug"
        },
        "es": {
          "expanded_text": "vuelvo enseguida",
          "spoken_text": "vuelvo enseguida"
        }
      }
    }
  ]
}
```

### Abbreviation Fields

| Field | Required | Description |
|-------|----------|-------------|
| `shortcode` | Yes | The abbreviation text (e.g., "brb", "lol") |
| `category` | No | Category for organization |
| `translations` | Yes | Object with language codes as keys |
| `translations.{lang}.expanded_text` | Yes | The full text the abbreviation expands to |
| `translations.{lang}.spoken_text` | No | Alternative text for speech synthesis |

### Multi-Language Abbreviation Example

```json
{
  "shortcode": "lol",
  "category": "internet",
  "translations": {
    "en": { "expanded_text": "laughing out loud" },
    "nl": { "expanded_text": "hardop lachen" },
    "es": { "expanded_text": "riendo a carcajadas" }
  }
}
```

### Abbreviation Import Behavior

**Conflict Resolution**: When importing abbreviations:
- If an abbreviation with the same shortcode AND language already exists, the **newer import wins**
- The old entry is deleted and replaced with the new one
- This ensures packs can update abbreviations without duplicates

---

## Grammar Data Format

The grammar section is **critical** for proper verb conjugation. Packs that contain irregular verbs **must** include grammar data, or the pack will fail validation.

### Grammar Validation Rules

The validator checks verbs against a **known irregular verbs list**. If your pack contains any of these verbs with `word_type: "verb"`, you **must** provide grammar entries for them:

**English known irregular verbs:**
```
be, have, do, say, go, get, make, know, think, take, see, come, find, give, tell, feel,
leave, put, mean, keep, let, begin, show, hear, run, bring, write, sit, stand, lose,
pay, meet, set, learn, lead, understand, speak, read, spend, grow, win, teach, buy,
send, build, fall, cut, drive, break, eat, hold, catch, draw, choose, sleep, fly, wear,
swim, sell, throw, cost, hit, shut, drink, sing, ring, rise, fight, hide, forget,
can, will, may, shall, must, might, could, would, should
```

**Validation behavior:**
- Verbs in this list with `word_type: "verb"` → **ERROR** if no grammar entry exists
- Verbs NOT in this list → No grammar entry required (treated as regular)
- Words with `word_type: "core"` → Bypass verb grammar validation entirely

**Workaround**: If you don't want to provide grammar data for a verb, change its `word_type` to `"core"` instead of `"verb"`.

### Irregular Verbs Structure

```json
{
  "grammar": {
    "irregularVerbs": {
      "en": [
        {
          "infinitive": "go",
          "exceptions": {
            "PRES_3SG": "goes",
            "PAST_ALL": "went",
            "PARTICIPLE": "gone"
          }
        }
      ]
    }
  }
}
```

### Exception Key Reference (UPPERCASE Required)

**IMPORTANT**: All exception keys must be **UPPERCASE**. Lowercase keys (like `present_3sg`) will NOT work.

#### Present Tense Keys

| Key | Description | Example (be) | When to Use |
|-----|-------------|--------------|-------------|
| `PRES_1SG` | Present, 1st person singular | I **am** | Only for highly irregular verbs |
| `PRES_2SG` | Present, 2nd person singular | you **are** | Only for highly irregular verbs |
| `PRES_3SG` | Present, 3rd person singular | he/she **is** | When 3rd person differs (go→goes) |
| `PRES_PL` | Present, plural (all persons) | we/they **are** | Only for highly irregular verbs |

#### Past Tense Keys

| Key | Description | Example (be) | When to Use |
|-----|-------------|--------------|-------------|
| `PAST_ALL` | All past tense forms (shortcut) | **went** | Most verbs - use this! |
| `PAST_1SG` | Past, 1st person singular | I **was** | Only when past varies by person |
| `PAST_2SG` | Past, 2nd person singular | you **were** | Only when past varies by person |
| `PAST_3SG` | Past, 3rd person singular | he/she **was** | Only when past varies by person |
| `PAST_1PL` | Past, 1st person plural | we **were** | Only when past varies by person |
| `PAST_2PL` | Past, 2nd person plural | you **were** | Only when past varies by person |
| `PAST_3PL` | Past, 3rd person plural | they **were** | Only when past varies by person |

#### Participle Key

| Key | Description | Example | When to Use |
|-----|-------------|---------|-------------|
| `PARTICIPLE` | Past participle | has **gone**, was **eaten** | Always include for irregular verbs |

### Key Usage Guidelines

**Most verbs** only need 2-3 keys:
```json
{
  "infinitive": "eat",
  "exceptions": {
    "PAST_ALL": "ate",
    "PARTICIPLE": "eaten"
  }
}
```

**Verbs with 3rd person present change** (go→goes, do→does):
```json
{
  "infinitive": "go",
  "exceptions": {
    "PRES_3SG": "goes",
    "PAST_ALL": "went",
    "PARTICIPLE": "gone"
  }
}
```

**Highly irregular verbs** (be, have) - need individual person keys:
```json
{
  "infinitive": "be",
  "exceptions": {
    "PRES_1SG": "am",
    "PRES_2SG": "are",
    "PRES_3SG": "is",
    "PRES_PL": "are",
    "PAST_1SG": "was",
    "PAST_2SG": "were",
    "PAST_3SG": "was",
    "PAST_1PL": "were",
    "PAST_2PL": "were",
    "PAST_3PL": "were",
    "PARTICIPLE": "been"
  }
}
```

### Fallback Behavior

When `PAST_ALL` is provided, it's used as a fallback for any specific `PAST_*` key that isn't explicitly defined. This means:
- If you set `PAST_ALL: "went"`, all past tense forms will use "went"
- If you also set `PAST_1SG: "was"`, 1st person singular uses "was", everything else uses "went"

### Complete Grammar Section Example

```json
{
  "grammar": {
    "irregularVerbs": {
      "en": [
        {
          "infinitive": "be",
          "exceptions": {
            "PRES_1SG": "am",
            "PRES_2SG": "are",
            "PRES_3SG": "is",
            "PRES_PL": "are",
            "PAST_1SG": "was",
            "PAST_2SG": "were",
            "PAST_3SG": "was",
            "PAST_1PL": "were",
            "PAST_2PL": "were",
            "PAST_3PL": "were",
            "PARTICIPLE": "been"
          }
        },
        {
          "infinitive": "have",
          "exceptions": {
            "PRES_3SG": "has",
            "PAST_ALL": "had",
            "PARTICIPLE": "had"
          }
        },
        {
          "infinitive": "do",
          "exceptions": {
            "PRES_3SG": "does",
            "PAST_ALL": "did",
            "PARTICIPLE": "done"
          }
        },
        {
          "infinitive": "go",
          "exceptions": {
            "PRES_3SG": "goes",
            "PAST_ALL": "went",
            "PARTICIPLE": "gone"
          }
        },
        {
          "infinitive": "eat",
          "exceptions": {
            "PAST_ALL": "ate",
            "PARTICIPLE": "eaten"
          }
        },
        {
          "infinitive": "drink",
          "exceptions": {
            "PAST_ALL": "drank",
            "PARTICIPLE": "drunk"
          }
        },
        {
          "infinitive": "think",
          "exceptions": {
            "PAST_ALL": "thought",
            "PARTICIPLE": "thought"
          }
        },
        {
          "infinitive": "write",
          "exceptions": {
            "PAST_ALL": "wrote",
            "PARTICIPLE": "written"
          }
        }
      ]
    }
  }
}
```

### Common Mistakes

#### Wrong: Lowercase keys
```json
// ❌ WRONG - lowercase keys won't work
{
  "infinitive": "go",
  "exceptions": {
    "present_3sg": "goes",
    "past_simple": "went",
    "past_participle": "gone"
  }
}
```

#### Wrong: Incorrect verb conjugations
```json
// ❌ WRONG - "go" past tense is "went", not "was/were"
{
  "infinitive": "go",
  "exceptions": {
    "PAST_1SG": "was",
    "PAST_2SG": "were"
  }
}
```

#### Correct: Proper format
```json
// ✅ CORRECT
{
  "infinitive": "go",
  "exceptions": {
    "PRES_3SG": "goes",
    "PAST_ALL": "went",
    "PARTICIPLE": "gone"
  }
}
```

### Noun Pluralization

```json
{
  "nounPluralization": {
    "en": {
      "irregularPlurals": {
        "child": "children",
        "foot": "feet",
        "tooth": "teeth",
        "mouse": "mice",
        "goose": "geese",
        "man": "men",
        "woman": "women",
        "person": "people"
      },
      "uncountableNouns": [
        "water",
        "information",
        "advice",
        "furniture",
        "luggage",
        "equipment",
        "news",
        "homework"
      ]
    }
  }
}
```

### Noun Gender (Grammar Assist)

The `noun_gender` field on a concept's `grammar` object tells the Grammar Assist system which grammatical gender a noun has **per language**. This powers the **determiner helper** in the GrammarStrip — incompatible determiners are dimmed and compatible ones are highlighted when a noun is selected.

#### Supported Gender Values

| Language | Values | Example |
|----------|--------|---------|
| Dutch (`nl`) | `common`, `neuter` | "appel" → common (de-woord), "ei" → neuter (het-woord) |
| French (`fr`) | `masculine`, `feminine` | "pain" → masculine (le), "pomme" → feminine (la) |
| Spanish (`es`) | `masculine`, `feminine` | "huevo" → masculine (el), "manzana" → feminine (la) |
| English (`en`) | `masculine`, `feminine`, `neuter` | Rarely needed — English determiners are gender-neutral |

#### How It Works

When a pack is imported, each language's `noun_gender` value is stored on the corresponding `symbol_translations` record's `gender_class` column. This means **each language retains its own correct gender** — for example, Dutch "appel" stores `common` (de-woord) while French "pomme" stores `feminine` (la) on their respective translation rows. The GrammarStrip then uses the gender for the **currently active language** to:

1. **Dim incompatible tokens** — e.g., if "ei" (neuter) is selected, "de" is dimmed and "het" stays bright
2. **Highlight compatible tokens** — matching articles/demonstratives get a highlight border
3. **Show context hints** (beginner mode) — e.g., "Choose a verb" or "Add an object with a determiner"

#### Per-Concept Format

Add `noun_gender` inside the concept's `grammar` object:

```json
{
  "concept_key": "egg_fringe_0001f373",
  "translations": {
    "nl": { "label": "ei", "spoken_text": "ei" },
    "en": { "label": "egg", "spoken_text": "egg" }
  },
  "emoji": "🥚",
  "word_type": "noun",
  "grammar": {
    "noun_class": "irregular",
    "noun_gender": {
      "nl": "neuter",
      "en": "neuter"
    },
    "irregular_forms": {
      "nl": { "plural": "eieren" }
    }
  }
}
```

#### Dutch Gender Reference

| Gender | Determiner | Demonstratives | Examples |
|--------|-----------|----------------|----------|
| `common` (de-woord) | de / een | deze, die | appel, banaan, melk, mama, papa |
| `neuter` (het-woord) | het / een | dit, dat | ei, brood, water, sap |

#### Multi-Language Example

```json
{
  "concept_key": "apple_fringe_0001f34e",
  "translations": {
    "nl": { "label": "appel", "spoken_text": "appel" },
    "fr": { "label": "pomme", "spoken_text": "pomme" },
    "es": { "label": "manzana", "spoken_text": "manzana" }
  },
  "emoji": "🍎",
  "word_type": "noun",
  "grammar": {
    "noun_gender": {
      "nl": "common",
      "fr": "feminine",
      "es": "feminine"
    }
  }
}
```

#### Backward Compatibility

- Concepts **without** `noun_gender` work normally — no dimming occurs when they are selected
- Packs without any gender data import without errors
- Gender data is optional and additive; it only enhances the Grammar Assist experience
- For symbols imported before v25 (where gender was stored on the `symbols` table), the system automatically falls back to `symbols.gender_class` if no per-language value exists on the translation record

---

## Validation Checklist

Before submitting a pack, verify:

### Metadata Validation

- [ ] `packId` is unique (not used by any other pack)
- [ ] `packId` follows naming convention: `{lang}-{tier/domain}-v{version}`
- [ ] `version` is valid semver (e.g., `1.0.0`)
- [ ] `tier` is one of: `basic`, `extended`, `professional`, `specialized`
- [ ] `languages` array contains valid ISO 639-1 codes
- [ ] `totalConcepts` matches actual concept count
- [ ] `dependencies` lists only existing pack IDs
- [ ] `name` is a user-friendly display name (not a filename or internal ID)
- [ ] `description` is a meaningful sentence describing the pack's content

**Why this matters:** The `name` and `description` are shown directly in the pack management UI. A pack named `"BasePackV2"` with description `"BasePackV2"` gives users no useful information. The `tier` determines the badge displayed on the pack card — a core vocabulary pack should use `"basic"`, not `"specialized"`.

```json
// BAD — unhelpful metadata
{
  "packId": "BasePackV2",
  "name": "BasePackV2",
  "description": "BasePackV2",
  "tier": "specialized"
}

// GOOD — descriptive metadata
{
  "packId": "BasePackV2",
  "name": "Base Vocabulary Pack V2",
  "description": "Core vocabulary pack with 6,500+ concepts in EN, NL, FR and ES",
  "tier": "basic"
}
```

### Category Validation

- [ ] Each category has unique `id`
- [ ] Each category has `name` and `order`
- [ ] `positionRange` (if used) doesn't overlap with other categories
- [ ] `parent_id` (if used) references an existing category `id` in the same pack
- [ ] No category has a `parent_id` pointing to another child category (max one level deep)
- [ ] Categories that are parents (have children) do not themselves have a `parent_id`
- [ ] Each category has `translations` for all languages declared in `metadata.languages` (multi-language packs)
- [ ] Each translation entry has a `name` field

### Concept Validation

- [ ] Each concept has unique `concept_key`
- [ ] Each concept has `translations` object with at least one language
- [ ] **Each concept has translations for ALL languages declared in `metadata.languages`** (concepts without a translation for the active language will be hidden!)
- [ ] **No duplicate concepts for the same semantic meaning** (e.g., don't have separate "wish" and "wensen" concepts - use ONE concept with both translations)
- [ ] Each translation has at least `label`
- [ ] `category_id` matches an existing category
- [ ] Verbs have `infinitive` in **each language's** translation (not just one language — missing infinitives cause cross-language fallback bugs, e.g., Dutch conjugator receiving English "be" instead of Dutch "zijn")
- [ ] Verbs whose label is a conjugated form (e.g., "am", "is", "was", "soy") **must** have an explicit `infinitive` (label fallback only works when the label equals the infinitive)
- [ ] Verbs have `word_type: "verb"`
- [ ] `position` values don't conflict within the same category
- [ ] Concepts that exist in other packs use the **same `concept_key`** to avoid duplicates

### Grammar Validation

- [ ] All irregular verbs in vocabulary have grammar entries (see [Grammar Data Format](#grammar-data-format))
- [ ] All known irregular verbs (eat, drink, go, be, have, do, etc.) with `word_type: "verb"` have grammar entries
- [ ] All exception keys are **UPPERCASE** (e.g., `PRES_3SG`, `PAST_ALL`, `PARTICIPLE`)
- [ ] All irregular nouns have pluralization entries
- [ ] Conjugation values are correct (e.g., "go" past tense is "went", not "was")
- [ ] Nouns have `noun_gender` values for languages with grammatical gender (nl, fr, es) — see [Noun Gender](#noun-gender-grammar-assist)
- [ ] Dutch nouns use `common` (de-woorden) or `neuter` (het-woorden), NOT `masculine`/`feminine`
- [ ] French/Spanish nouns use `masculine` or `feminine`
- [ ] **No word appears in both `irregularPlurals` AND `uncountableNouns` for the same language**

**Why "no duplicates across grammar lists" matters:** During import, the app processes `irregularPlurals` first, then `uncountableNouns`. If a word like `"bridge"` appears in both lists, the first pass creates or finds the database record, and the second pass tries to update the same record that already has pending changes. This causes a WatermelonDB `"Cannot update a record with pending changes"` error and the grammar entry fails to import.

```json
// BAD — "glass" appears in both lists for English
"nounPluralization": {
  "en": {
    "irregularPlurals": {
      "glass": "glasses"
    },
    "uncountableNouns": ["water", "glass", "rice"]
  }
}

// GOOD — each word appears in exactly one list
"nounPluralization": {
  "en": {
    "irregularPlurals": {
      "glass": "glasses"
    },
    "uncountableNouns": ["water", "rice"]
  }
}
```

This also applies across languages — check `nl`, `fr`, and `es` grammar sections independently. Common offenders are words that can be both countable and uncountable in different contexts (e.g., "chocolate", "stone", "turkey", "fruit").

### Phrase Validation

- [ ] Each phrase has unique `phrase_key`
- [ ] Each phrase has valid `category` (needs, medical, social, requests, emotions, responses)
- [ ] Each phrase has `translations` object with at least one language
- [ ] Each translation has `text` field
- [ ] `totalPhrases` in metadata matches actual phrase count

### Abbreviation Validation

- [ ] Each abbreviation has non-empty `shortcode`
- [ ] Shortcodes are unique within the pack
- [ ] Each abbreviation has `translations` object with at least one language
- [ ] Each translation has `expanded_text` field
- [ ] `totalAbbreviations` in metadata matches actual abbreviation count

### Activity Board Validation

- [ ] Each board has unique `board_key`
- [ ] Each board has `grid_columns` and `grid_rows` >= 1
- [ ] Each board has `order` for display sequence
- [ ] Each board has `translations` with titles for all pack languages
- [ ] Each board has `buttons` array (can be empty)
- [ ] Button `row` values are 0 to (grid_rows - 1)
- [ ] Button `column` values are 0 to (grid_columns - 1)
- [ ] No duplicate positions (same row,column) within a board
- [ ] All `concept_key` references exist (in this pack or dependencies)
- [ ] All `link_to_board_key` references exist within the same pack OR are functional IDs (`__back__`, `__home__`)
- [ ] All links have `translations` with labels for all pack languages
- [ ] `totalActivityBoards` in metadata matches actual board count
- [ ] Back buttons use `__back__` (not hardcoded board references) for proper N-to-1 navigation

### Core-Fringe Layout Validation

- [ ] Each layout has a unique `layout_key`
- [ ] `grid_columns` is between 6 and 12
- [ ] `grid_rows` matches the `CORE_FRINGE_ROWS` mapping for the given `grid_columns` (6→4, 7→4, 8→4, 9→5, 10→5, 11→5, 12→6)
- [ ] Slot `row` values are 0 to (grid_rows - 1)
- [ ] Slot `column` values are 0 to (grid_columns - 1)
- [ ] No duplicate positions (same row,column) within a page
- [ ] Exactly one root page (no `parent_page_key`) per layout
- [ ] All `parent_page_key` references point to an existing `page_key` in the same layout
- [ ] All `concept_key` references in slots exist in this pack or a dependency pack
- [ ] All `link_to_page_key` references point to an existing `page_key` in the same layout OR are functional IDs (`__back__`, `__home__`)
- [ ] **Layout `translations` include ALL languages from `metadata.languages`**
- [ ] **Every page `translations` includes ALL languages from `metadata.languages`**
- [ ] **Every slot `link_translations` includes ALL languages from `metadata.languages`**

#### Translation coverage is critical (common mistake)

The installation code iterates over each language and checks `layoutData.translations[lang]`. **If a language has no translation entry, the entire layout is silently skipped for that language.** This means users of that language will see an empty core-fringe grid with no error message.

The same applies at the page level (page titles) and slot level (link labels). Missing translations don't cause errors — they just produce empty or English-only labels for non-English users.

```json
// BAD — layout only installs for English users; nl/fr/es users get an empty grid
{
  "layout_key": "my_layout_12x6",
  "grid_columns": 12,
  "grid_rows": 6,
  "translations": {
    "en": { "name": "My Layout" }
  },
  "pages": [
    {
      "page_key": "home",
      "translations": {
        "en": { "title": "Home" }
      },
      "slots": [
        {
          "row": 0, "column": 0,
          "is_category_link": true,
          "link_to_page_key": "fringe_food",
          "link_translations": {
            "en": { "label": "food" }
          }
        }
      ]
    }
  ]
}

// GOOD — layout installs for all 4 languages
{
  "layout_key": "my_layout_12x6",
  "grid_columns": 12,
  "grid_rows": 6,
  "translations": {
    "en": { "name": "My Layout" },
    "nl": { "name": "Mijn Layout" },
    "fr": { "name": "Ma Disposition" },
    "es": { "name": "Mi Diseño" }
  },
  "pages": [
    {
      "page_key": "home",
      "translations": {
        "en": { "title": "Home" },
        "nl": { "title": "Home" },
        "fr": { "title": "Accueil" },
        "es": { "title": "Inicio" }
      },
      "slots": [
        {
          "row": 0, "column": 0,
          "is_category_link": true,
          "link_to_page_key": "fringe_food",
          "link_translations": {
            "en": { "label": "food" },
            "nl": { "label": "eten" },
            "fr": { "label": "nourriture" },
            "es": { "label": "comida" }
          }
        }
      ]
    }
  ]
}
```

#### Functional navigation keys (`__home__` and `__back__`)

Use `__home__` and `__back__` as `link_to_page_key` values to create navigation buttons within the grid. These are **the only two functional keys supported** — any other `__double_underscore__` value will cause an installation error.

- `__home__` — navigates the user back to the root page of the layout
- `__back__` — navigates one level up in the page hierarchy

These must be used with `is_category_link: true` so they render as tappable navigation cells.

```json
// Home button slot
{
  "row": 0, "column": 0,
  "is_pinned": false,
  "is_category_link": true,
  "link_to_page_key": "__home__",
  "link_icon": "⌂",
  "link_translations": {
    "en": { "label": "home" },
    "nl": { "label": "home" },
    "fr": { "label": "accueil" },
    "es": { "label": "inicio" }
  }
}

// Back button slot
{
  "row": 0, "column": 1,
  "is_pinned": false,
  "is_category_link": true,
  "link_to_page_key": "__back__",
  "link_icon": "←",
  "link_translations": {
    "en": { "label": "back" },
    "nl": { "label": "terug" },
    "fr": { "label": "retour" },
    "es": { "label": "atrás" }
  }
}
```

#### Grid size and activation

A layout with `grid_columns: 12` will **only activate** when the user's grid size setting is 12 columns. If the user has 8 columns (the previous default), the layout will be imported into the database but remain inactive — the grid will appear empty.

If your pack is the core/default pack, make sure the layout's `grid_columns` matches the app's `DEFAULT_GRID_COLUMNS` (currently 12), or provide multiple layouts for different grid sizes:

```json
{
  "coreFringeLayouts": [
    {
      "layout_key": "my_layout_12x6",
      "grid_columns": 12,
      "grid_rows": 6,
      "translations": { ... },
      "pages": [ ... ]
    },
    {
      "layout_key": "my_layout_8x4",
      "grid_columns": 8,
      "grid_rows": 4,
      "translations": { ... },
      "pages": [ ... ]
    }
  ]
}
```

#### Concept key references must be exact

Every `concept_key` in a slot must **exactly match** a concept in the pack's `concepts` array (or a dependency pack). The match is case-sensitive and includes all characters. A typo or stale reference will cause a `"Symbol not found for concept_key"` error during installation, and that slot will be skipped.

```json
// BAD — concept_key has a period and version mismatch, doesn't match any concept
{ "concept_key": "cake_noun_BasePackV0.3001" }

// GOOD — matches the exact concept_key from the concepts array
{ "concept_key": "cake_noun_BasePackV2001" }
```

Common mistakes:
- Copy-pasting keys from an older pack version (e.g., `V0.3` vs `V2`)
- Periods or special characters in the key that don't match the concept definition
- Referring to concepts that exist only in another pack without declaring it as a dependency

---

## Best Practices

### 1. One Concept Per Meaning (CRITICAL)

**⚠️ CRITICAL**: Each semantic concept should be represented as **ONE concept with multiple translations**, not separate concepts for each language. Violating this rule causes **duplicate symbols** to appear in the grid.

#### The Correct Pattern

```json
// ✅ CORRECT: One concept with all language translations
{
  "concept_key": "wish_core_0001f320",
  "translations": {
    "en": { "label": "wish" },
    "nl": { "label": "wensen" },
    "es": { "label": "desear" }
  },
  "emoji": "🌠"
}
```

#### The WRONG Pattern (Causes Duplicates!)

```json
// ❌ WRONG: Separate concepts for each language
// This creates duplicates in the symbol grid!

// English concept
{
  "concept_key": "wish_core_0001f320",
  "translations": {
    "en": { "label": "wish" },
    "es": { "label": "desear" }
  },
  "emoji": "🌠"
}

// Separate Dutch concept (WRONG!)
{
  "concept_key": "wensen_verb_0001f320",
  "translations": {
    "nl": { "label": "wensen" }
  },
  "emoji": "🌠"
}
```

**What happens with separate concepts:**
- When user is in Dutch mode, they see BOTH "wensen" AND "wish" (fallback from incomplete concept)
- This is confusing and clutters the symbol grid
- The correct fix is to merge into ONE concept with all translations

### 2. Concept Key Harmonization (CRITICAL)

**⚠️ IMPORTANT**: If your pack contains concepts that also exist in other packs (like `basic-all.pack.json`), you **MUST** use the **same `concept_key`** as the existing pack. Otherwise, users will see duplicate symbols when searching.

#### Why This Matters

When a user installs multiple packs that contain the same concept (e.g., "apple"):
- If both packs use `concept_key: "apple_fringe_0001f34e"` → **One symbol** appears ✅
- If Pack A uses `apple_fringe_0001f34e` and Pack B uses `food_apple` → **Two duplicate symbols** appear ❌

#### How to Check for Existing Concepts

Before creating a new concept, check if it already exists in `basic-all.pack.json`:

```bash
# Search for a concept by Dutch label
grep -B20 '"appel"' src/data/vocabularies/packs/core/basic-all.pack.json | grep "concept_key"

# Result: "concept_key": "apple_fringe_0001f34e"
# Use THIS key in your pack, not a new one!
```

#### Correct Approach

```json
// ✅ CORRECT: Reuse existing concept_key from basic-all
{
  "concept_key": "apple_fringe_0001f34e",  // Same as basic-all
  "translations": {
    "nl": { "label": "appel", "spoken_text": "appel" }
  },
  "emoji": "🍎",
  "category_id": "food"
}

// ❌ WRONG: Creating a new concept_key for an existing concept
{
  "concept_key": "kind_appel_001",  // Different from basic-all!
  "translations": {
    "nl": { "label": "appel" }
  },
  "emoji": "🍎"
}
```

#### Activity Board Button References

When activity boards reference concepts, they use `concept_key`. If you change a concept's key in your pack, you **MUST** also update all activity board button references:

```json
// concepts section
{ "concept_key": "apple_fringe_0001f34e", ... }

// activityBoards section - MUST match!
{ "buttons": [
    { "concept_key": "apple_fringe_0001f34e", "row": 0, "column": 0 }
  ]
}
```

### 2. Concept Key Naming (For New Concepts)

For concepts that DON'T exist in other packs, use a consistent, descriptive naming pattern:

```
{word}_{wordType}_{packPrefix}{number}
```

**Good examples:**
- `custom_mama_kind001` - "mama" from children's pack (if not in basic-all)
- `volere_verb_it001` - Italian verb "volere"
- `happy_adj_core042` - Core adjective "happy"

**Avoid:**
- `word123` - Not descriptive
- `mama` - No type or pack context
- `nl_mama_kind` - Language prefix unnecessary in concept_key

### 2. Translation Completeness (CRITICAL)

**⚠️ IMPORTANT**: Concepts without a translation for the active language will **NOT appear** in the symbol grid. The app filters out untranslated concepts rather than showing fallback labels from other languages.

For multi-language packs, ensure all concepts have translations for **all** declared languages:

```json
// metadata.languages = ["en", "nl", "es"]

// ✅ Good - all three languages, appears in all language modes
"translations": {
  "en": { "label": "want" },
  "nl": { "label": "willen" },
  "es": { "label": "querer" }
}

// ❌ Bad - missing Spanish, won't appear when user is in Spanish mode!
"translations": {
  "en": { "label": "want" },
  "nl": { "label": "willen" }
}
```

**What happens with incomplete translations:**
- If a user selects Dutch and a concept only has English → **Symbol is hidden**
- If a user selects Spanish and a concept only has Dutch → **Symbol is hidden**
- This prevents confusing users with labels in the wrong language

**For single-language packs** (like `dutch-children-v1`): This is fine - the pack only declares `"languages": ["nl"]`, so Dutch-only translations are expected.

### 3. Verb Infinitives (CRITICAL)

**Every language's translation for a verb MUST include its own `infinitive` field.** The grammar engine uses the infinitive from the current language's translation to conjugate the verb. If a language's translation is missing the `infinitive` field, the system falls back to the base concept's infinitive — which may be from a **different language**, causing incorrect conjugation.

**This is especially important for verbs where the label is a conjugated form** (e.g., "am", "is", "was") rather than the infinitive (e.g., "be", "zijn", "ser").

```json
// ✅ CORRECT: Each language has its own infinitive
{
  "concept_key": "am_verb_0001f9d8",
  "word_type": "verb",
  "translations": {
    "en": {
      "label": "am",
      "infinitive": "be"
    },
    "nl": {
      "label": "zijn",
      "infinitive": "zijn"
    },
    "es": {
      "label": "soy",
      "infinitive": "ser"
    }
  }
}

// ❌ WRONG: Dutch and Spanish translations missing infinitive
// The grammar engine will fall back to English "be" and try to
// conjugate "be" as a Dutch verb → produces "be" instead of "ben"!
{
  "concept_key": "am_verb_0001f9d8",
  "word_type": "verb",
  "translations": {
    "en": {
      "label": "am",
      "infinitive": "be"
    },
    "nl": {
      "label": "zijn"
    },
    "es": {
      "label": "soy"
    }
  }
}
```

**When the label IS the infinitive** (e.g., "willen", "gaan", "eten"), the system uses the label as a fallback, so an explicit `infinitive` field is optional but still recommended for clarity:

```json
// ✅ Good - label equals infinitive, so fallback works
{
  "concept_key": "go_verb_001",
  "word_type": "verb",
  "translations": {
    "en": { "label": "go" },
    "nl": { "label": "gaan" }
  }
}

// ✅ Better - explicit infinitive, no ambiguity
{
  "concept_key": "go_verb_001",
  "word_type": "verb",
  "translations": {
    "en": { "label": "go", "infinitive": "go" },
    "nl": { "label": "gaan", "infinitive": "gaan" }
  }
}
```

**When the label is NOT the infinitive**, the `infinitive` field is **required**:

```json
// Conjugated-form labels MUST have explicit infinitive
"nl": { "label": "was", "infinitive": "zijn" }    // past tense of "zijn"
"nl": { "label": "is", "infinitive": "zijn" }     // 3SG of "zijn"
"nl": { "label": "kan", "infinitive": "kunnen" }  // 1SG of "kunnen"
"es": { "label": "soy", "infinitive": "ser" }     // 1SG of "ser"
```

### 4. Position Ranges

Use position ranges to organize concepts within categories:

| Category | Suggested Position Range |
|----------|-------------------------|
| Core Words | 0-59 |
| People | 60-119 |
| Actions | 120-179 |
| Descriptors | 180-239 |
| Things | 240-299 |

### 5. Introduction Levels

Use introduction levels for progressive learning:

| Level | Description | Example Words |
|-------|-------------|---------------|
| 1 | Essential, first words | I, want, yes, no, help |
| 2 | Early core vocabulary | go, stop, more, eat, drink |
| 3 | Expanded core | like, play, happy, sad |
| 4 | Common vocabulary | run, sleep, think, know |
| 5 | Extended vocabulary | build, carry, remember |
| 6 | Advanced vocabulary | analyze, investigate |

### 6. Usage Priority

Mark concepts by communication importance:

| Priority | Description |
|----------|-------------|
| `essential` | Must-have for basic communication |
| `high` | Very commonly used |
| `medium` | Regularly useful |
| `low` | Specialized or less common |

### 7. Phrases Best Practices

When adding phrases to your pack:

1. **Start with essential needs**: Focus on phrases users need most frequently
2. **Keep phrases concise**: Shorter phrases are easier to scan and select
3. **Include spoken_text when needed**: If the text should be spoken differently than displayed
4. **Align translations**: Ensure each phrase_key has translations for all pack languages
5. **Use consistent categories**: Stick to the standard categories (needs, medical, social, etc.)

```json
// ✅ Good - aligned translations, appropriate category
{
  "phrase_key": "needs_water_001",
  "category": "needs",
  "priority": "essential",
  "translations": {
    "en": { "text": "I need water" },
    "nl": { "text": "Ik heb water nodig" },
    "es": { "text": "Necesito agua" }
  }
}

// ❌ Bad - missing translation for declared language
{
  "phrase_key": "needs_water_001",
  "category": "needs",
  "translations": {
    "en": { "text": "I need water" }
    // Missing nl and es!
  }
}
```

### 8. Abbreviations Best Practices

When adding abbreviations:

1. **Focus on common abbreviations**: Include widely recognized shortcuts
2. **Consider language appropriateness**: Some abbreviations are language-specific
3. **Expand meaningfully**: The expanded text should be natural speech
4. **Use spoken_text for clarity**: If the expanded text has unusual pronunciation

```json
// ✅ Good - clear expansion, multi-language
{
  "shortcode": "ty",
  "category": "texting",
  "translations": {
    "en": { "expanded_text": "thank you" },
    "nl": { "expanded_text": "dank je" },
    "es": { "expanded_text": "gracias" }
  }
}

// ✅ Good - with spoken_text for pronunciation
{
  "shortcode": "asap",
  "category": "professional",
  "translations": {
    "en": {
      "expanded_text": "as soon as possible",
      "spoken_text": "as soon as possible"
    }
  }
}
```

---

## Examples

### Complete Pack with Phrases and Abbreviations

See: `src/data/vocabularies/packs/core/basic-all.pack.json`

This pack includes:
- 109 concepts across multiple languages
- 52 common phrases (needs, medical, social, etc.)
- 35 abbreviations (internet, texting, professional)
- Grammar data for irregular verbs

### Complete Activity Board Pack

See: `src/data/vocabularies/packs/demo/breakfast-children.pack.json`

This pack includes:
- 57 concepts (people, actions, food, objects)
- 5 activity boards (Breakfast, Drinks, Getting Ready, Playtime, Navigation Hub)
- 12 phrases related to morning activities
- 6 abbreviations
- Multi-language support (English, Dutch)
- Inter-board navigation links

### Complete Add-On Pack Example

See: `src/data/vocabularies/packs/core/dutch-children.pack.json`

### Minimal Valid Pack

```json
{
  "metadata": {
    "packId": "test-minimal-v1",
    "name": "Minimal Test Pack",
    "version": "1.0.0",
    "tier": "specialized",
    "languages": ["en"],
    "totalConcepts": 2,
    "dependencies": [],
    "description": "Minimal pack for testing"
  },
  "categories": [
    {
      "id": "test",
      "name": "Test Category",
      "icon": "🧪",
      "order": 0
    }
  ],
  "concepts": [
    {
      "concept_key": "test_hello_001",
      "translations": {
        "en": { "label": "hello", "spoken_text": "hello" }
      },
      "emoji": "👋",
      "position": 0,
      "word_type": "social",
      "category_id": "test"
    },
    {
      "concept_key": "test_goodbye_001",
      "translations": {
        "en": { "label": "goodbye", "spoken_text": "goodbye" }
      },
      "emoji": "👋",
      "position": 1,
      "word_type": "social",
      "category_id": "test"
    }
  ]
}
```

### Minimal Pack with Phrases and Abbreviations

```json
{
  "metadata": {
    "packId": "test-full-v1",
    "name": "Full Feature Test Pack",
    "version": "1.0.0",
    "tier": "specialized",
    "languages": ["en", "nl"],
    "totalConcepts": 1,
    "totalPhrases": 2,
    "totalAbbreviations": 1,
    "dependencies": [],
    "description": "Test pack with phrases and abbreviations"
  },
  "categories": [
    {
      "id": "test",
      "name": "Test Category",
      "icon": "🧪",
      "order": 0
    }
  ],
  "concepts": [
    {
      "concept_key": "test_word_001",
      "translations": {
        "en": { "label": "test", "spoken_text": "test" },
        "nl": { "label": "test", "spoken_text": "test" }
      },
      "emoji": "🧪",
      "position": 0,
      "word_type": "noun",
      "category_id": "test"
    }
  ],
  "phrases": [
    {
      "phrase_key": "test_help_001",
      "category": "needs",
      "priority": "essential",
      "translations": {
        "en": { "text": "I need help" },
        "nl": { "text": "Ik heb hulp nodig" }
      }
    },
    {
      "phrase_key": "test_thanks_001",
      "category": "social",
      "priority": "high",
      "translations": {
        "en": { "text": "Thank you" },
        "nl": { "text": "Dank je" }
      }
    }
  ],
  "abbreviations": [
    {
      "shortcode": "ty",
      "category": "texting",
      "translations": {
        "en": { "expanded_text": "thank you" },
        "nl": { "expanded_text": "dank je" }
      }
    }
  ]
}
```

---

## External Tool Integration

If building an external tool to generate packs:

### Output Requirements

1. **File format**: UTF-8 encoded JSON
2. **File extension**: `.pack.json`
3. **Location**: `src/data/vocabularies/packs/{category}/`

### Recommended Tool Features

1. **Validation**: Check against schema before export
2. **Duplicate detection**: Warn on duplicate concept_keys
3. **Translation completeness**: Verify all languages have translations
4. **Grammar consistency**: Ensure verbs have grammar entries and nouns have `noun_gender` for gendered languages
5. **Position assignment**: Auto-assign positions within categories

### API for Pack Import

When the app imports your pack:

```typescript
// The pack is loaded and installed via:
const result = await vocabularyPackService.installPack(packData, {
  mode: 'additive',      // Add to existing, don't replace
  skipGrammar: false,    // Import grammar data
  languages: ['nl', 'en'] // Optional: only import specific languages
});

// Result contains:
{
  success: boolean,
  packId: string,
  conceptsCreated: number,
  conceptsUpdated: number,
  translationsCreated: number,
  grammarEntriesCreated: number,
  phrasesCreated: number,
  abbreviationsCreated: number,
  activityBoardsCreated: number,
  boardButtonsCreated: number,
  errors: string[],
  duration: number
}
```

### Conflict Resolution

**Phrases**: If a phrase with the same text AND language already exists, the old phrase is deleted and replaced with the new one from the pack.

**Abbreviations**: If an abbreviation with the same shortcode AND language already exists, the old abbreviation is deleted and replaced with the new one from the pack.

**Activity Boards**: Activity boards use a REPLACE strategy. When importing a pack:
1. All existing boards with the same `source_pack_id` are deleted (including their buttons)
2. All boards from the pack are created fresh
3. Board buttons are created with resolved `symbol_id` references

This "newer import wins" strategy ensures:
- No duplicate entries accumulate
- Packs can update existing phrases/abbreviations/boards
- Users always have the latest version from the most recent import

---

## Managing the Pack Registry

All bundled packs are registered in a single file: [`src/constants/packRegistry.ts`](../src/constants/packRegistry.ts). This is the **only file you need to edit** when adding, changing, or removing packs.

The registry contains:
- **`CORE_PACK_ID`** — the pack ID that gets auto-installed on first launch
- **`AUTO_IMPORT_LANGUAGE_CODES`** — language codes that trigger auto-import of the core pack
- **`PACK_REGISTRY`** — array of all available packs with metadata and loader functions

### Adding a New Pack

1. **Create the pack file** in `src/data/vocabularies/packs/{category}/` (e.g., `src/data/vocabularies/packs/core/my-pack.pack.json`)

2. **Add a registry entry** in `src/constants/packRegistry.ts`:

```typescript
// In the PACK_REGISTRY array, add:
{
  packId: 'my-pack-v1',              // Must match metadata.packId in the JSON
  name: 'My New Pack',
  description: 'Description shown in the UI',
  version: '1.0.0',
  tier: 'specialized',               // 'basic' | 'extended' | 'professional' | 'specialized'
  languages: ['en', 'nl'],
  conceptCount: 120,
  phraseCount: 10,                    // Optional
  abbreviationCount: 5,              // Optional
  activityBoardCount: 3,             // Optional
  coreFringeLayoutCount: 1,          // Optional
  dependencies: [],                   // Pack IDs that must be installed first
  loadPack: async () => {
    const data = await import('../data/vocabularies/packs/core/my-pack.pack.json');
    return data.default as unknown as VocabularyPack;
  },
},
```

3. **That's it.** The pack will automatically appear in the Vocabulary Management settings screen for users to install.

> **Important:** The `loadPack` function must use a static string path in the `import()` call. Metro (React Native's bundler) cannot resolve dynamic paths at build time.

### Changing an Existing Pack

**To update pack contents** (add/remove concepts, translations, etc.):
- Edit the `.pack.json` file directly. No registry changes needed.
- Users who already installed the pack will need to uninstall and reinstall it, or you can bump the version in both the JSON `metadata.version` and the registry entry's `version`.

**To rename or move a pack file:**
- Update the `import()` path inside that pack's `loadPack` function in the registry. No other files need to change.

**To change the core pack** (the one installed on first launch):
- Update `CORE_PACK_ID` in the registry to point to a different `packId`.

**To change which languages trigger auto-import:**
- Update the `AUTO_IMPORT_LANGUAGE_CODES` set in the registry.

### Removing a Pack

1. **Remove the entry** from `PACK_REGISTRY` in `src/constants/packRegistry.ts`
2. **Delete the `.pack.json` file** from `src/data/vocabularies/packs/`
3. Users who already installed the pack will keep their data. The pack will no longer appear as available for new installs.

### How It Works

The registry is consumed throughout the app:

| Consumer | What it uses |
|---|---|
| **Seed** (`src/db/seed.ts`) | `CORE_PACK_ID` + `loadPack()` to install the core pack on first launch |
| **Setup Wizard** | `AUTO_IMPORT_LANGUAGE_CODES` + `CORE_PACK_ID` + `loadPack()` to auto-install after setup |
| **Language Change** (AdminScreen, Settings) | `AUTO_IMPORT_LANGUAGE_CODES` + `CORE_PACK_ID` + `loadPack()` to ensure core pack exists |
| **Pack Install UI** (VocabularyManagementSettings) | `loadPack(packId)` to load any pack the user selects |
| **Pack List UI** (useVocabularyPacks hook) | `PACK_REGISTRY` metadata to show available packs |
| **Language detection** (vocabularyImporter) | Derives available languages from registry entries |

---

## Related Documentation

- [Pack Phrases & Abbreviations](./PLAN_PACK_PHRASES_ABBREVIATIONS.md) - Phrases and abbreviations implementation
- [Activity Boards Implementation](./PLAN_PACK_ACTIVITY_BOARDS.md) - Activity boards technical details
- [Concept-Based Vocabulary Format](./CONCEPT_BASED_VOCABULARY.md) - Legacy format documentation
- [Smart Grammar Engine](./SMART_GRAMMAR_ENGINE.md) - How grammar conjugation works
- [English Grammar Engine](./ENGLISH_GRAMMAR_ENGINE_IMPLEMENTATION.md) - English-specific grammar

---

## Questions?

For implementation details, see:
- [`packRegistry.ts`](../src/constants/packRegistry.ts) - Pack registry (add/remove/change packs here)
- [`vocabularyPackService.ts`](../src/services/vocabularyPackService.ts) - Pack installation service
- [`grammarSyncService.ts`](../src/services/grammarSyncService.ts) - Grammar synchronization
- [`vocabularyPack.ts`](../src/types/vocabularyPack.ts) - TypeScript type definitions
