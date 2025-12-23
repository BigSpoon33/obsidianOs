---
created: 2025-12-09
plugin: meta-bind
version: 1.0.0
tags:
  - plugin-docs
  - meta-bind
---

# 🎛️ Meta Bind Plugin - Comprehensive Guide

## Overview

**Plugin:** Meta Bind  
**Author:** @mProjectsCode  
**Current Version:** 1.0.0+ (as of 2025-12-09)  
**Repository:** [mProjectsCode/obsidian-meta-bind-plugin](https://github.com/mProjectsCode/obsidian-meta-bind-plugin)  
**Documentation:** [moritzjung.dev/obsidian-meta-bind-plugin-docs](https://www.moritzjung.dev/obsidian-meta-bind-plugin-docs/)

### What It Does

Meta Bind creates **interactive elements** in your notes:
- 📝 **Input fields** - Edit frontmatter inline
- 🔘 **Buttons** - Trigger actions (create notes, run commands)
- 📊 **Views** - Display computed values
- 🎚️ **Controls** - Sliders, toggles, selects, date pickers

### Why We Use It

In the Academic System:
- ✅ Quick status updates without opening frontmatter
- ✅ One-click coursework creation from class pages
- ✅ Inline date pickers for due dates
- ✅ Grade entry without YAML editing
- ✅ Interactive dashboards

---

## Installation

### Step 1: Install Plugin

1. Open Settings → Community plugins
2. Click "Browse"
3. Search "Meta Bind"
4. Click "Install"
5. Click "Enable"

### Step 2: Configure Settings

Recommended settings:

```
Settings → Meta Bind

✅ Enable Button Actions
   (Required for creation buttons)

✅ Enable Inline Inputs
   (Core feature)

Sync Interval: 1000ms
   (How often to save changes)
```

### Step 3: Install Templater (Optional)

For creation buttons (New Assignment, etc.):
1. Install Templater plugin
2. Configure template folder
3. Enable system commands

---

## Core Concepts

### 1. Input Fields

Edit frontmatter properties inline without opening the properties panel.

**Syntax:**
```markdown
`INPUT[type:propertyName]`
```

**Basic Example:**
```markdown
---
status: not-started
---

Status: `INPUT[inlineSelect:status]`
```

When you click, a dropdown appears. Change updates frontmatter automatically.

---

### 2. Input Types

#### Text Input
```markdown
`INPUT[text:title]`
```
Free-form text entry.

#### Number Input
```markdown
`INPUT[number:credits]`
```
Numeric values only.

#### Date Input
```markdown
`INPUT[date:due]`
```
Date picker (YYYY-MM-DD format).

#### Toggle
```markdown
`INPUT[toggle:completed]`
```
Boolean on/off switch.

#### Select Dropdown
```markdown
`INPUT[select:status]`
```
Choose from existing values in vault.

#### Inline Select with Options
```markdown
`INPUT[inlineSelect(option(not-started), option(in-progress), option(completed), option(submitted), option(graded)):status]`
```
Define options explicitly.

#### Slider
```markdown
`INPUT[slider(0, 100, 1):grade]`
```
Format: `slider(min, max, step)`

#### Text Area
```markdown
`INPUT[textArea:description]`
```
Multi-line text input.

---

### 3. Buttons

Trigger actions with a click.

**Basic Syntax:**
```markdown
`BUTTON[label]`
```

**With Action:**
````markdown
```meta-bind-button
label: "Create Assignment"
icon: "plus"
style: primary
action:
  type: command
  command: "templater-obsidian:create-note-from-template"
```
````

---

### 4. Button Actions

#### Command Action
Run any Obsidian command:
```yaml
action:
  type: command
  command: "command-id-here"
```

#### Templater Create Note
Create note from template:
```yaml
action:
  type: templaterCreateNote
  templateFile: "Templates/Coursework Template.md"
  folder: "Root"
  fileName: "New Assignment"
  openNote: true
```

#### Update Property
Change a frontmatter value:
```yaml
action:
  type: updateMetadata
  bindTarget: status
  evaluate: true
  value: "'completed'"
```

#### JavaScript Action
Run custom JavaScript:
```yaml
action:
  type: js
  file: "scripts/my-action.js"
```

---

## Academic System Use Cases

### Use Case 1: Quick Status Updates

**Location:** All coursework notes

**Frontmatter:**
```yaml
---
status: not-started
---
```

**In Note Body:**
```markdown
> [!info] Quick Controls
> **Status:** `INPUT[inlineSelect(option(not-started), option(in-progress), option(completed), option(submitted), option(graded)):status]`
```

**Result:** Click to change status instantly.

**Why This Works:**
- No need to scroll to top
- Visual feedback immediate
- Can be placed anywhere in note
- Multiple inputs for different properties

---

### Use Case 2: Deadline Management

**Location:** Coursework notes

```markdown
> [!info] Quick Controls
> **Due Date:** `INPUT[date:due]`
> **Assigned:** `INPUT[date:assigned]`
> **Status:** `INPUT[inlineSelect(option(not-started), option(in-progress), option(completed), option(submitted), option(graded)):status]`
> **Priority:** `INPUT[inlineSelect(option(low), option(normal), option(high)):priority]`
```

**Result:** Complete control panel in a callout.

---

### Use Case 3: Grade Entry

**Location:** Coursework notes after grading

**Text Input (Flexible):**
```markdown
**Grade:** `INPUT[text:grade]`
```
Accepts: "A+", "95%", "85/100"

**Slider (Percentage):**
```markdown
**Grade:** `INPUT[slider(0, 100, 5):grade]` %
```
Drag slider from 0-100 in increments of 5.

**Select (Letter Grades):**
```markdown
**Grade:** `INPUT[inlineSelect(option(A+), option(A), option(A-), option(B+), option(B), option(B-), option(C+), option(C), option(C-), option(D), option(F)):grade]`
```

---

### Use Case 4: Create Assignment Button

**Location:** Class template dashboard

````markdown
```meta-bind-button
label: "New Assignment"
icon: "pencil"
style: primary
action:
  type: templaterCreateNote
  templateFile: "Academic System/Templates/Coursework Template.md"
  folder: "Root"
  fileName: "{{course-code}} Assignment"
  openNote: true
```
````

**What Happens:**
1. Click button
2. Templater creates new note from template
3. Note named automatically (e.g., "CS-101 Assignment")
4. New note opens
5. Fill in details

**Customization:**
- Change `fileName` to include timestamp
- Change `folder` to organize differently
- Set `openNote: false` to create without opening

---

### Use Case 5: Multiple Creation Buttons

**Location:** Class template dashboard

````markdown
```meta-bind-button
label: "New Assignment"
icon: "pencil"
style: primary
action:
  type: templaterCreateNote
  templateFile: "Academic System/Templates/Coursework Template.md"
  folder: "Root"
  fileName: "{{course-code}} Assignment"
  openNote: true
```

```meta-bind-button
label: "New Exam"
icon: "file-check"
style: primary
action:
  type: templaterCreateNote
  templateFile: "Academic System/Templates/Coursework Template.md"
  folder: "Root"
  fileName: "{{course-code}} Exam"
  openNote: true
```

```meta-bind-button
label: "Class Notes"
icon: "book-open"
style: default
action:
  type: templaterCreateNote
  templateFile: "Academic System/Templates/Coursework Template.md"
  folder: "Root"
  fileName: "{{date}} {{course-code}} Lecture"
  openNote: true
```
````

**Result:** Three-button action bar for common tasks.

---

### Use Case 6: Complete Status Workflow

**Location:** Coursework notes

````markdown
## Quick Actions

```meta-bind-button
label: "Mark In Progress"
icon: "play"
style: default
action:
  type: updateMetadata
  bindTarget: status
  evaluate: false
  value: "in-progress"
```

```meta-bind-button
label: "Mark Completed"
icon: "check"
style: primary
action:
  type: updateMetadata
  bindTarget: status
  evaluate: false
  value: "completed"
```

```meta-bind-button
label: "Mark Submitted"
icon: "send"
style: primary
action:
  type: updateMetadata
  bindTarget: status
  evaluate: false
  value: "submitted"
```
````

**Result:** One-click status progression.

---

### Use Case 7: Inline Course Info

**Location:** Class template

```markdown
**Course Code:** `INPUT[text:course-code]`
**Course Name:** `INPUT[text:course-name]`
**Instructor:** `INPUT[text:instructor]`
**Semester:** `INPUT[text:semester]`
**Credits:** `INPUT[number:credits]`
```

**Use Case:** Fill in class info inline, especially for quick edits.

---

## Button Styling

### Style Options

```yaml
style: default   # Gray, neutral
style: primary   # Accent color (usually blue)
style: destructive # Red, for delete/remove actions
style: plain     # Minimal styling
```

### Icon Options

Use any Lucide icon name:
- `plus` - Add/create
- `pencil` - Edit
- `trash` - Delete
- `check` - Complete
- `send` - Submit
- `file-check` - Exam/test
- `book-open` - Notes/reading
- `calendar` - Schedule

Full list: [lucide.dev](https://lucide.dev/)

---

## Advanced Patterns

### Pattern 1: Templater + Meta Bind Integration

**Class Template with Context-Aware Buttons:**

````markdown
<%*
const courseCode = tp.frontmatter["course-code"];
const courseName = tp.frontmatter["course-name"];
_%>

```meta-bind-button
label: "New Assignment"
icon: "pencil"
style: primary
action:
  type: templaterCreateNote
  templateFile: "Academic System/Templates/Coursework Template.md"
  folder: "Root"
  fileName: "<% courseCode %> Assignment {{date}}"
  openNote: true
```
````

**Result:** Button uses current class's course code automatically.

---

### Pattern 2: Conditional Inputs

Show different inputs based on coursework type:

````markdown
---
type: assignment
---

# Assignment Controls

`INPUT[text:title]`
`INPUT[date:due]`
`INPUT[text:grade]`

<!-- For exams, add: -->
<!-- Topics: `INPUT[textArea:topics]` -->
<!-- Study time: `INPUT[number:study-hours]` hours -->
````

---

### Pattern 3: Grouped Controls

**Create control panels:**

````markdown
> [!abstract]- Assignment Details
> **Title:** `INPUT[text:title]`
> **Class:** `INPUT[text:class]`
> **Type:** `INPUT[inlineSelect(option(assignment), option(exam), option(project), option(notes), option(lab), option(quiz)):type]`

> [!info]- Timeline
> **Assigned:** `INPUT[date:assigned]`
> **Due:** `INPUT[date:due]`

> [!check]- Progress
> **Status:** `INPUT[inlineSelect(option(not-started), option(in-progress), option(completed), option(submitted), option(graded)):status]`
> **Grade:** `INPUT[text:grade]`
````

**Result:** Collapsible sections organizing inputs by category.

---

## Meta Bind + Dataview

Combine for powerful dashboards:

````markdown
## Coursework Status

```dataviewjs
const coursework = dv.pages()
  .where(p => p.categories && p.categories.includes(dv.fileLink("Coursework")))
  .where(p => p.class && String(p.class).includes(dv.current()["course-code"]));

coursework.forEach(c => {
  dv.paragraph(`
    ${c.file.link}
    Status: \`INPUT[inlineSelect(option(not-started), option(in-progress), option(completed)):status]\`
  `);
});
```
````

**Result:** List of coursework with inline status toggles.

---

## Troubleshooting

### Issue: Buttons Don't Work

**Check:**
1. ✅ Meta Bind plugin enabled
2. ✅ For Templater buttons: Templater plugin installed
3. ✅ For Templater buttons: System commands enabled (Templater settings)
4. ✅ Template file path correct
5. ✅ Folder exists

**Debug:**
- Check console (Ctrl+Shift+I) for errors
- Verify template file name exact (case-sensitive)
- Test with simple command action first

---

### Issue: Input Changes Don't Save

**Check:**
1. ✅ Property exists in frontmatter
2. ✅ Property name spelled correctly (case-sensitive)
3. ✅ Sync interval not too long (Settings → Meta Bind)

**Solution:**
Add property to frontmatter first:
```yaml
---
status: 
---
```

Then use input:
```markdown
`INPUT[text:status]`
```

---

### Issue: Date Picker Shows Wrong Format

**Check:**
1. ✅ Property type is "date" in `.obsidian/types.json`
2. ✅ Obsidian date format matches

**Solution:**
```json
{
  "types": {
    "due": "date",
    "assigned": "date"
  }
}
```

Restart Obsidian.

---

### Issue: InlineSelect Options Not Showing

**Check syntax:**
```markdown
<!-- ❌ Wrong -->
`INPUT[inlineSelect:status(not-started, in-progress)]`

<!-- ✅ Correct -->
`INPUT[inlineSelect(option(not-started), option(in-progress)):status]`
```

---

## Templates for Copy-Paste

### Status Control Panel

```markdown
> [!info] Quick Controls
> **Status:** `INPUT[inlineSelect(option(not-started), option(in-progress), option(completed), option(submitted), option(graded)):status]`
> **Due:** `INPUT[date:due]`
> **Grade:** `INPUT[text:grade]`
```

### Creation Button (Assignment)

````markdown
```meta-bind-button
label: "New Assignment"
icon: "pencil"
style: primary
action:
  type: templaterCreateNote
  templateFile: "Academic System/Templates/Coursework Template.md"
  folder: "Root"
  fileName: "Assignment {{date}}"
  openNote: true
```
````

### Status Progression Buttons

````markdown
```meta-bind-button
label: "Start Work"
icon: "play"
action:
  type: updateMetadata
  bindTarget: status
  evaluate: false
  value: "in-progress"
```

```meta-bind-button
label: "Submit"
icon: "send"
style: primary
action:
  type: updateMetadata
  bindTarget: status
  evaluate: false
  value: "submitted"
```
````

### Grade Slider

```markdown
**Grade:** `INPUT[slider(0, 100, 5):grade]`%
```

---

## Best Practices

### 1. Use Callouts for Organization

Group related inputs:
```markdown
> [!info] Assignment Info
> `INPUT[text:title]`
> `INPUT[date:due]`
```

### 2. Combine Input Types

```markdown
**Status:** `INPUT[inlineSelect(option(todo), option(done)):status]`
**Priority:** `INPUT[inlineSelect(option(low), option(medium), option(high)):priority]`
**Due:** `INPUT[date:due]`
```

### 3. Use Icons for Visual Clarity

```markdown
📅 **Due:** `INPUT[date:due]`
📝 **Status:** `INPUT[inlineSelect:status]`
🎯 **Grade:** `INPUT[text:grade]`
```

### 4. Standardize Button Styles

- `primary` - Main actions (create, submit)
- `default` - Secondary actions (edit, view)
- `destructive` - Delete, remove, archive

### 5. Keep Properties in Frontmatter

Always initialize properties:
```yaml
---
status: not-started
due: 
grade: 
---
```

Even if empty, this prevents errors.

---

## Input Type Reference

| Type | Syntax | Use Case |
|------|--------|----------|
| Text | `INPUT[text:prop]` | Names, titles, codes |
| Number | `INPUT[number:prop]` | Credits, hours, scores |
| Date | `INPUT[date:prop]` | Due dates, deadlines |
| Toggle | `INPUT[toggle:prop]` | Boolean flags |
| Select | `INPUT[select:prop]` | From vault values |
| InlineSelect | `INPUT[inlineSelect(option(a), option(b)):prop]` | Defined options |
| Slider | `INPUT[slider(min, max, step):prop]` | Numeric range |
| TextArea | `INPUT[textArea:prop]` | Multi-line notes |

---

## Button Action Reference

| Action | Use Case | Required Plugins |
|--------|----------|------------------|
| `command` | Run Obsidian command | None |
| `templaterCreateNote` | Create from template | Templater |
| `updateMetadata` | Change property | None |
| `js` | Custom JavaScript | None |
| `open` | Open note/URL | None |
| `regexp` | Regex replace | None |

---

## Examples Repository

Meta Bind has extensive examples:
- [Example Vault](https://github.com/mProjectsCode/obsidian-meta-bind-plugin-examples)
- [Official Docs](https://www.moritzjung.dev/obsidian-meta-bind-plugin-docs/)

---

## Version Notes

**1.0.0+ (Current)**
- Stable API
- Full input type support
- Button actions mature
- Templater integration

---

## Related Documentation

- [[Plugin - Templater]] - For creation buttons
- [[Plugin - Dataview]] - Combine with inputs
- [[Workflows]] - Using Meta Bind in workflows
- [[CSS Guide]] - Styling buttons and inputs
