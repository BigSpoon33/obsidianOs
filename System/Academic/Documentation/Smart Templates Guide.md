---
created: 2025-12-09
tags:
  - documentation
  - templates
  - templater
---

# 🧠 Smart Templates Guide

## Problem: Auto-Linking Coursework to Classes

When you click "New Assignment" in a class note, you want the created assignment to automatically link back to that class. Meta-bind buttons alone **cannot** populate frontmatter properties - they can only set the filename.

## Solution: Smart Coursework Template

The **Coursework Template (Smart).md** uses Templater to automatically detect and link to the parent class.

---

## How It Works

### Detection Strategy (3 Fallbacks)

**1. Filename Pattern** (Primary)
```
CS-101 Assignment → Extracts "CS-101" → Finds class with course-code: CS-101
```

**2. Recently Opened Files** (Secondary)
- Checks last opened files
- Finds the most recent file with `categories: [[Classes]]`
- Uses that as the parent class

**3. User Selection** (Fallback)
- If detection fails, shows a picker
- Lists all class notes
- User selects manually

---

## What Gets Auto-Filled

### ✅ Automatic Properties

| Property | How It's Filled | Example |
|----------|-----------------|---------|
| `class` | Detected from context | `[[CS-101 Introduction to Python]]` |
| `type` | Inferred from filename | `exam` (from "CS-101 Exam.md") |
| `title` | Cleaned filename | "Assignment 1" (from "CS-101 Assignment 1") |
| `status` | Always defaults to | `not-started` |

### Type Detection Keywords

The template scans the filename for these keywords:

- **exam/test** → `type: exam`
- **project** → `type: project`
- **lab** → `type: lab`
- **quiz** → `type: quiz`
- **homework/hw** → `type: assignment`
- **lecture/notes** → `type: notes`
- **Default** → `type: assignment`

---

## Setup Requirements

### Required Plugin: Templater

**Install:**
1. Settings → Community Plugins → Browse
2. Search "Templater"
3. Install and Enable

**Configure:**
1. Settings → Templater
2. Template folder location: `Academic System/Templates`
3. ✅ Enable "Trigger Templater on new file creation"
4. ✅ Enable "Enable System Commands"

---

## Usage Examples

### Example 1: Create Assignment from Class Page

**From:** `CS-101 Introduction to Python.md`

**Click:** "New Assignment" button

**Creates:** `CS-101 Assignment.md` with:
```yaml
class:
  - "[[CS-101 Introduction to Python]]"
type:
  - assignment
title: Assignment
status:
  - not-started
```

✅ **Automatically linked to parent class!**

---

### Example 2: Specific Exam

**From:** `MATH-202 Calculus II.md`

**Click:** "New Exam" button

**Manually rename to:** `MATH-202 Midterm Exam.md`

**Result:**
```yaml
class:
  - "[[MATH-202 Calculus II]]"
type:
  - exam  # Detected from "Exam" in filename
title: Midterm Exam
```

---

### Example 3: Create Manually (Not from Class Page)

**Action:** Create new note `CS-101 Lab 3.md`

**Use:** Templater: Create new note from template

**Select:** Coursework Template (Smart)

**Result:**
- Detects "CS-101" from filename
- Finds class with `course-code: CS-101`
- Auto-fills `class` property
- Detects `type: lab` from "Lab" in filename

---

## Comparison: Basic vs Smart Template

### Basic Template (Coursework Template.md)

**Pros:**
- ✅ Simpler (no Templater required)
- ✅ Works immediately
- ✅ No dependencies

**Cons:**
- ❌ Manual property filling
- ❌ No auto-detection
- ❌ More typing required

**Use when:** You don't want to install Templater, or prefer manual control

---

### Smart Template (Coursework Template (Smart).md)

**Pros:**
- ✅ Auto-detects parent class
- ✅ Auto-fills properties
- ✅ Infers type from filename
- ✅ Saves time and errors

**Cons:**
- ❌ Requires Templater plugin
- ❌ Slightly more complex
- ❌ Needs proper naming conventions

**Use when:** You want maximum automation and use the button workflow

---

## Best Practices

### 1. Naming Convention

**Always include course code in filename:**
```
✅ CS-101 Homework 1.md
✅ MATH-202 Midterm Exam.md
✅ ENG-101 Essay 2.md

❌ Homework 1.md  (no course code - detection fails)
❌ My Assignment.md  (too generic)
```

### 2. Create from Class Page

**Recommended workflow:**
1. Open class note
2. Click appropriate button (Assignment/Exam/Project)
3. File is created with course code prefix
4. Smart template detects and auto-fills
5. Just add details!

### 3. Fallback to Manual

If detection fails (rare):
1. Template shows suggester with all classes
2. Select correct class
3. Properties auto-fill from selection

---

## Troubleshooting

### Issue: Class Not Auto-Detected

**Symptoms:**
- `class: [[]]` (empty)
- Suggester doesn't appear

**Solutions:**
1. ✅ Ensure Templater plugin installed and enabled
2. ✅ Enable "System Commands" in Templater settings
3. ✅ Verify filename has course code (e.g., `CS-101 ...`)
4. ✅ Check parent class has `course-code` property set
5. ✅ Ensure parent class has `categories: [[Classes]]`

---

### Issue: Wrong Type Detected

**Symptoms:**
- Created "CS-101 Quiz 1" but got `type: assignment`

**Solution:**
Type keywords are case-insensitive. The template checks for:
- exam, test → exam
- quiz → quiz
- project → project
- lab → lab

If filename has no keyword, defaults to `assignment`.

**Fix:** Either:
- Use keyword in filename (`CS-101 Quiz 1`)
- Manually change type via Quick Controls after creation

---

### Issue: Suggester Shows Wrong Classes

**Symptoms:**
- Only some classes appear in selector

**Solution:**
The suggester finds notes with `categories: [[Classes]]`

Check that all class notes have:
```yaml
categories:
  - "[[Classes]]"
```

---

## Alternative: Quick Manual Method

Don't want to use Smart Template? Here's a fast manual workflow:

1. Create note with descriptive name
2. Use basic **Coursework Template.md**
3. Use Quick Controls to set properties:
   - Click on Class input
   - Type class name
   - Select from suggestions

**Total time:** ~10 seconds

Both workflows work! Choose based on preference.

---

## Advanced: Customize Detection Logic

Edit `Coursework Template (Smart).md` to change:

**Course code pattern:**
```javascript
// Current: Matches CS-101, MATH-202, etc.
const courseCodeMatch = fileName.match(/^([A-Z]+-\d+)/);

// Custom: Match different pattern
const courseCodeMatch = fileName.match(/YOUR_PATTERN_HERE/);
```

**Type keywords:**
```javascript
// Add more type detection
if (fileName.toLowerCase().includes("discussion")) {
  assignmentType = "discussion";
}
```

**Title cleanup:**
```javascript
// Remove course code prefix
title = fileName.substring(detectedCourseCode.length).trim();

// Or customize:
title = fileName.replace(/pattern/g, '');
```

---

## Summary

**For maximum automation:**
1. ✅ Install Templater
2. ✅ Use Smart Template
3. ✅ Follow naming conventions
4. ✅ Create from class page buttons

**For simplicity:**
1. ✅ Use Basic Template
2. ✅ Manually set properties (fast with Quick Controls)
3. ✅ No plugins required

**Both are valid workflows!** Choose what fits your style.

---

## Related Documentation

- [[Plugin - Templater]] - Full Templater guide (coming soon)
- [[Plugin - Meta Bind]] - Button configuration
- [[Workflows]] - Complete workflow examples (coming soon)
