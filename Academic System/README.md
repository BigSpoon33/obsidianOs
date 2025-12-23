---
created: 2025-12-09
tags:
  - academic
  - system
  - documentation
---

# 🎓 Academic System for Obsidian

A comprehensive academic tracking system built on the Kepano vault philosophy: simple, fast, and link-heavy, enhanced with modern dashboard features and visual polish.

## 📋 Table of Contents

1. [Quick Start](#quick-start)
2. [System Overview](#system-overview)
3. [Folder Structure](#folder-structure)
4. [Installation](#installation)
5. [Core Concepts](#core-concepts)
6. [Workflows](#workflows)
7. [Plugin Requirements](#plugin-requirements)
8. [Customization](#customization)
9. [Troubleshooting](#troubleshooting)

---

## Quick Start

### Creating Your First Class

1. Copy `Academic System/Templates/Class Template.md` to your vault root
2. Rename it: `CS-101 Introduction to Python.md`
3. Fill in the frontmatter properties
4. Use the meta-bind buttons to create coursework

### Creating Coursework

**From a Class Page:**
- Click "New Assignment", "New Exam", or "Class Notes" button
- Template auto-fills the class field

**Manually:**
- Copy `Academic System/Templates/Coursework Template.md`
- Fill in properties, especially `class` and `type`

### Viewing Your Work

- **All Classes:** Open `Academic System/Categories/Classes.md`
- **All Coursework:** Open `Academic System/Categories/Coursework.md`
- **Master Dashboard:** Open `Academic Dashboard.md` (root)

---

## System Overview

### Philosophy

This system balances two approaches:

**Kepano Principles:**
- Minimal frontmatter (only what's useful)
- Notes live in root folder (not nested)
- Heavy internal linking
- Fast, frictionless note creation
- Simple text files, portable forever

**Enhanced Features:**
- Dashboard pages with widgets
- Visual tracking (progress, deadlines)
- Interactive controls (meta-bind)
- Filtered views (bases)
- Aesthetic polish (CSS)

### What This System Does

✅ **Track Classes**
- Course information, instructors, schedules
- Semester organization
- Grade tracking per class

✅ **Manage Coursework**
- Assignments, exams, projects, labs
- Due date tracking with urgency indicators
- Status workflow: not-started → in-progress → completed → submitted → graded
- Grade recording and GPA calculation

✅ **Surface Relevant Work**
- "Due Soon" views (next 7 days)
- Overdue tracking
- Class-specific coursework views
- Dashboard widgets

✅ **Maintain Context**
- Link coursework to classes
- Link class notes to topics
- Daily note integration
- Semester archiving

---

## Folder Structure

```
Academic System/
├── README.md                    # This file
├── Templates/
│   ├── Class Template.md        # Course dashboard template
│   └── Coursework Template.md   # Universal coursework template
├── Bases/
│   ├── Classes.base             # Filtered views for classes
│   └── Coursework.base          # Filtered views for coursework
├── Categories/
│   ├── Classes.md               # Class overview page
│   └── Coursework.md            # Coursework overview page
├── Documentation/
│   ├── Plugin - Dataview.md     # Comprehensive Dataview guide
│   ├── Plugin - Meta Bind.md    # Meta-bind documentation
│   ├── Plugin - Templater.md    # Templater guide
│   ├── Plugin - Banners.md      # Banner plugin guide
│   ├── Plugin - Bases.md        # Bases core plugin guide
│   ├── CSS Guide.md             # CSS customization guide
│   └── Workflows.md             # Detailed workflow documentation
├── CSS Snippets/
│   ├── academic-core.css        # Essential academic styling
│   ├── academic-neon.css        # Neon effects (optional)
│   ├── academic-dashboard.css   # Dashboard layouts
│   └── examples/                # CSS examples and variations
└── Examples/
    ├── Example - CS-101.md      # Example class note
    ├── Example - Assignment.md  # Example assignment
    └── Example - Exam.md        # Example exam note
```

---

## Installation

### Step 1: Plugin Requirements

Install these plugins via Settings → Community plugins:

**Essential:**
- ✅ Dataview (for queries and widgets)
- ✅ Meta Bind (for inline inputs and buttons)
- ✅ Templater (for smart templates)

**Recommended:**
- ⭐ Obsidian Banners (visual headers)
- ⭐ Style Settings (CSS customization GUI)
- ⭐ Homepage (set Academic Dashboard as start page)

**Built-in (Enable in Core Plugins):**
- ✅ Bases
- ✅ Daily notes
- ✅ Templates

See `Documentation/` folder for detailed plugin guides.

### Step 2: Configure types.json

Add academic property types to `.obsidian/types.json`:

```json
{
  "types": {
    "course-code": "text",
    "course-name": "text",
    "instructor": "multitext",
    "semester": "text",
    "credits": "number",
    "class": "multitext",
    "assigned": "date",
    "due": "date",
    "title": "text"
  }
}
```

This enables proper sorting, filtering, and date pickers.

### Step 3: Enable CSS Snippets

1. Go to Settings → Appearance → CSS snippets
2. Enable snippets from `Academic System/CSS Snippets/`:
   - ✅ `academic-core.css` (required)
   - ⭐ `academic-dashboard.css` (for dashboards)
   - ⭐ `academic-neon.css` (for visual effects)

### Step 4: Copy Category Pages

1. Copy `Academic System/Categories/Classes.md` to `Categories/Classes.md`
2. Copy `Academic System/Categories/Coursework.md` to `Categories/Coursework.md`

These integrate with your existing category system.

### Step 5: Create Master Dashboard (Optional)

Create `Academic Dashboard.md` in vault root using the template in `Examples/`.

---

## Core Concepts

### 1. Classes vs Coursework

**Classes** (`categories: [[Classes]]`)
- The course itself (CS-101)
- Acts as a dashboard/hub
- Contains: course info, instructor, schedule
- Has buttons to create coursework

**Coursework** (`categories: [[Coursework]]`)
- Individual work items
- Types: assignment, exam, project, notes, lab, quiz, reading
- Links to parent class via `class` property
- Tracks: due dates, status, grades

### 2. Note Naming Conventions

**Classes:**
```
CS-101 Introduction to Python.md
MATH-202 Calculus II.md
ENG-101 Composition.md
```

Format: `[CODE] [Full Name].md`

**Coursework:**
```
CS-101 Homework 1 Variables.md
CS-101 Midterm Exam.md
CS-101 Final Project Game.md
2025-12-09 1400 CS-101 Functions Lecture.md
```

Format: `[CODE] [Type] [Title].md`
OR: `[Timestamp] [CODE] [Title].md` (for lecture notes)

### 3. Status Workflow

**Classes:**
- `active` - Currently enrolled
- `completed` - Finished with grade
- `dropped` - Withdrawn

**Coursework:**
- `not-started` - Haven't begun
- `in-progress` - Actively working
- `completed` - Done but not submitted
- `submitted` - Turned in, awaiting grade
- `graded` - Grade received

### 4. Property Reference

#### Class Properties

| Property | Type | Required | Example |
|----------|------|----------|---------|
| categories | multitext | ✅ | `[[Classes]]` |
| course-code | text | ✅ | `CS-101` |
| course-name | text | ✅ | `Introduction to Python` |
| instructor | multitext | ⭐ | `[[Dr. Smith]]` |
| semester | text | ✅ | `Spring 2025` |
| year | number | ⭐ | `2025` |
| credits | number | ⭐ | `3` |
| status | multitext | ✅ | `active` |
| grade | text | - | `A` |
| topics | multitext | - | `[[Programming]], [[Python]]` |
| url | text | - | Course website |

#### Coursework Properties

| Property | Type | Required | Example |
|----------|------|----------|---------|
| categories | multitext | ✅ | `[[Coursework]]` |
| class | multitext | ✅ | `[[CS-101 Introduction to Python]]` |
| type | multitext | ✅ | `assignment` |
| title | text | ⭐ | `Homework 1 - Variables` |
| assigned | date | ⭐ | `2025-12-01` |
| due | date | ✅ | `2025-12-15` |
| status | multitext | ✅ | `in-progress` |
| grade | text | - | `95%` or `A` |
| topics | multitext | - | `[[Variables]], [[Data Types]]` |

✅ = Required, ⭐ = Recommended, - = Optional

---

## Workflows

See `Documentation/Workflows.md` for detailed workflows including:

- Creating a new semester
- Weekly coursework review
- End-of-semester archiving
- Daily note integration
- Grade tracking and GPA calculation

---

## Plugin Requirements

### Minimum Viable Setup

**You can use this system with just core Obsidian features:**
- Bases (core plugin)
- Properties/frontmatter
- Internal links

**But you'll miss:**
- Interactive buttons
- Dashboard widgets
- Deadline calculations
- Inline editing

### Recommended Setup

| Plugin | Purpose | Can Skip? |
|--------|---------|-----------|
| Dataview | Dashboard widgets, calculations | Use bases only |
| Meta Bind | Inline editing, buttons | Manual editing |
| Templater | Smart creation, context-aware | Use basic templates |
| Banners | Visual headers | Just CSS |
| Style Settings | GUI for CSS | Edit CSS directly |

See individual plugin docs in `Documentation/` for:
- Installation instructions
- Configuration examples
- Common snippets
- Troubleshooting

---

## Customization

### CSS Customization

Three levels of styling provided:

1. **Minimal** (`academic-core.css` only)
   - Clean base styling
   - Dashboard grids
   - Readable tables

2. **Enhanced** (+ `academic-dashboard.css`)
   - Multi-column layouts
   - Widget containers
   - Visual hierarchy

3. **Full** (+ `academic-neon.css`)
   - Glowing effects
   - Status colors
   - Animated elements

See `Documentation/CSS Guide.md` for:
- Customization options
- Color schemes
- Subject-specific theming
- Custom divider styles

### Template Customization

Templates are starting points - modify them!

**Common customizations:**
- Add/remove properties
- Change button labels
- Adjust section headers
- Add custom widgets
- Include study schedules

### Base View Customization

Edit `.base` files to:
- Change sort orders
- Add/remove columns
- Create new filtered views
- Adjust column widths

---

## Troubleshooting

### Common Issues

**Buttons don't work**
- Install Meta Bind plugin
- Check Templater is installed if using creation buttons

**Bases show "No results"**
- Check `categories` property is correct
- Ensure note is in correct location
- Verify property types in types.json

**Dates don't sort correctly**
- Add property to types.json as type "date"
- Restart Obsidian after types.json changes

**CSS not applying**
- Enable snippet in Settings → Appearance → CSS snippets
- Check for syntax errors in CSS file
- Force reload with Ctrl/Cmd + R

**Dataview queries fail**
- Enable Dataview plugin
- Check JavaScript is enabled in Dataview settings
- Verify query syntax

For detailed troubleshooting, see individual plugin documentation.

---

## Version History

### Version 1.0 (2025-12-09)

**Initial Release**
- Class template with dashboard
- Coursework universal template
- Bases for filtered views
- Category overview pages
- CSS styling system
- Comprehensive plugin documentation
- Example notes

---

## Credits

**Built on:**
- [Kepano's Obsidian Vault](https://github.com/kepano/kepano-obsidian) - Philosophy and structure
- [Minimal Theme](https://minimal.guide/) - Design inspiration
- YPNG Vault - Dashboard patterns and visual effects

**Plugins Used:**
- Dataview by @blacksmithgu
- Meta Bind by @mProjectsCode
- Templater by @SilentVoid13
- Obsidian Banners by @noatpad
- Style Settings by @mgmeyers

---

## Support

For issues or questions:
1. Check plugin documentation in `Documentation/`
2. Review example notes in `Examples/`
3. Consult workflows in `Documentation/Workflows.md`
4. Check CSS customization options in `Documentation/CSS Guide.md`

---

## License

This academic system template is provided as-is for personal use. Modify freely to fit your needs.

The underlying vault structure and philosophy are based on Kepano's open-source vault template (MIT License).
