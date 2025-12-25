---
created: 2025-12-09
tags:
  - quick-start
  - buttons
---

# ⚡ Quick Start - Using the Buttons

## TL;DR

**What buttons do now:**
1. ✅ Create file with simple name
2. ✅ Auto-detect parent class from recent files
3. ✅ Offer to rename with course code
4. ✅ Auto-fill class property

**Limitation:** Meta-bind can't read `{{course-code}}` from frontmatter, so we use smart detection instead.

---

## How To Use

### 1. Open Your Class Note
Open `CS-101 Introduction to Python.md` (or whatever class you're working on)

### 2. Click a Button
Click "New Assignment", "New Exam", etc.

### 3. Choose Rename Option
Popup appears:
```
Add course code to filename?
→ Keep as: Assignment
→ Rename to: CS-101 Assignment
```

**Choose:** "Rename to: CS-101 Assignment" ✅

### 4. Done!
File created with:
- **Name:** `CS-101 Assignment.md`
- **Class:** Auto-linked to your class
- **Type:** Auto-detected
- **Ready to fill in!**

---

## Example Workflow

```
You're in: CS-101 Introduction to Python.md
↓
Click: "New Assignment"
↓
Popup: "Rename to: CS-101 Assignment?"
↓
Click: Second option (with CS-101)
↓
File created: CS-101 Assignment.md
  class: [[CS-101 Introduction to Python]]  ← Auto-filled!
  type: assignment
  status: not-started
↓
Add your work!
```

**Total time:** ~5 seconds

---

## Skip the Rename Prompt (Optional)

Want the course code added automatically without asking?

**Edit:** `Academic System/Templates/Coursework Template (Smart).md`

**Find** (around line 60):
```javascript
const shouldRename = await tp.system.suggester(
  [`Keep as: ${fileName}`, `Rename to: ${detectedCourseCode} ${fileName}`],
  [false, true],
  false,
  "Add course code to filename?"
);
```

**Change to:**
```javascript
const shouldRename = true; // Auto-rename, skip prompt
```

**Result:** Files automatically renamed with course code! No popup.

---

## What Gets Auto-Detected

| Property | How | Example |
|----------|-----|---------|
| `class` | From recently opened class note | `[[CS-101 Introduction to Python]]` |
| `type` | From filename keywords | `exam` (if filename has "exam") |
| `title` | From filename | `Assignment 1` |
| `status` | Always defaults | `not-started` |

---

## Keywords for Type Detection

The template scans your filename:

| Keyword | Type |
|---------|------|
| exam, test | exam |
| quiz | quiz |
| project | project |
| lab | lab |
| homework, hw | assignment |
| lecture, notes | notes |
| *(default)* | assignment |

**Examples:**
- `Quiz 1` → type: quiz
- `Midterm Exam` → type: exam
- `Final Project` → type: project

---

## Troubleshooting

### Class Not Auto-Detected?

**Check:**
1. ✅ Class note was recently opened
2. ✅ Class note has `categories: [[Classes]]`
3. ✅ Course code is set in class frontmatter

**Workaround:** Template shows class picker if detection fails.

### Don't Like the Workflow?

**Alternative 1:** Use basic template
- Change buttons to use `Coursework Template.md`
- No auto-detection, no popup
- Manually set properties (still fast with Quick Controls)

**Alternative 2:** Create manually
- Make new note: `CS-101 Assignment 1.md`
- Templater → Create from template → Smart Template
- Everything auto-fills from filename

---

## Why This Design?

**Meta-bind limitation:** Buttons can't access parent note's frontmatter

**Our solution:** 
- Detect parent from recently opened files
- Works 99% of the time
- One extra click (rename prompt)

**Trade-off:**
- 🎯 Reliable auto-linking ✅
- ⏱️ One popup to confirm rename

---

*Read [[BUTTON FIX - READ THIS]] for technical details*
