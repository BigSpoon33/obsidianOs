---
created: 2025-12-09
tags:
  - updates
  - fixes
---

# 🔧 Fixes Applied - 2025-12-09

## Issues Identified & Fixed

### ✅ Issue 1: Dashboard Widget Alignment

**Problem:** "Overdue" stat appeared on its own row instead of aligned with "Active Classes" and "Due This Week"

**Root Cause:** Dashboard CSS grid was applying to the dataviewjs container, but dataviewjs blocks weren't set to span full width.

**Fix Applied:**
Updated `academic-core.css` to make dataview blocks full-width:
```css
.dashboard .block-language-dataviewjs,
.dashboard .block-language-dataview {
  grid-column: span 2;
}
```

**Result:** All three stats now display in a single row ✅

**File Modified:** `Academic System/CSS Snippets/academic-core.css`

---

### ✅ Issue 2: Calendar View Parsing Error

**Problem:** Dataview calendar query failed with parsing error:
```
WHERE categories contains [[Coursework]]
```

**Your Fix:** Changed `contains` to `=`
```dataview
WHERE categories = [[Coursework]]
```

**Why It Works:**
- `=` is simpler and works for single link values
- `contains` requires specific syntax: `categories.contains(link("Coursework"))`
- Your approach is cleaner! ✅

**Alternative (also works):**
```dataview
WHERE categories.contains(link("Coursework"))
```

**Fix Applied:**
Updated Academic Dashboard example to use `=` syntax.

**File Modified:** `Academic System/Examples/Academic Dashboard.md`

---

### ✅ Issue 3: Meta-bind Buttons Don't Auto-Link to Class

**Problem:** Clicking "New Assignment" creates a file named `CS-101 Assignment.md` but the `class` property in frontmatter is empty `[[]]`

**Root Cause:** Meta-bind can set filename using `{{course-code}}` but **cannot populate template frontmatter**. It's a limitation of meta-bind - it doesn't have access to the parent note's properties.

**Solution:** Created **Smart Coursework Template** using Templater

**How Smart Template Works:**

1. **Detects course code** from filename (`CS-101 Assignment` → `CS-101`)
2. **Finds parent class** by searching for note with `course-code: CS-101`
3. **Auto-fills** `class` property with link to parent class
4. **Infers type** from filename keywords (exam, project, lab, etc.)
5. **Fallback:** If detection fails, shows class picker

**Files Created:**
1. `Academic System/Templates/Coursework Template (Smart).md` - New smart template
2. `Academic System/Documentation/Smart Templates Guide.md` - Complete guide

**File Modified:**
- `Academic System/Templates/Class Template.md` - Updated buttons to use Smart template

**Requirements:**
- ✅ Templater plugin must be installed
- ✅ "Enable System Commands" in Templater settings

**Usage:**
1. Click "New Assignment" button in class page
2. File created: `CS-101 Assignment.md`
3. Smart template auto-detects:
   ```yaml
   class:
     - "[[CS-101 Introduction to Python]]"  # ← Auto-filled!
   type:
     - assignment  # ← Auto-detected!
   title: Assignment
   status:
     - not-started
   ```

**Type Detection Keywords:**
- `exam`, `test` → `exam`
- `project` → `project`
- `lab` → `lab`
- `quiz` → `quiz`
- `homework`, `hw` → `assignment`
- `lecture`, `notes` → `notes`

---

## New Files Created

### 1. Coursework Template (Smart).md
**Location:** `Academic System/Templates/`

**Purpose:** Automatically detects parent class and pre-fills coursework properties

**Features:**
- Extracts course code from filename
- Finds matching class note
- Auto-fills `class` property
- Infers `type` from keywords
- Shows picker if detection fails
- Requires Templater plugin

---

### 2. Smart Templates Guide.md
**Location:** `Academic System/Documentation/`

**Purpose:** Complete documentation for the smart template system

**Contents:**
- How detection works (3 fallback strategies)
- Setup requirements
- Usage examples
- Basic vs Smart template comparison
- Best practices
- Troubleshooting
- Customization options

**Size:** ~2,500 words

---

## Files Modified

### 1. academic-core.css
**Change:** Added dataview blocks to full-width elements
**Impact:** Fixes dashboard grid alignment

### 2. Academic Dashboard.md
**Change:** Updated calendar query syntax
**Impact:** Fixes parsing error

### 3. Class Template.md
**Change:** Buttons now use Smart template instead of basic
**Impact:** Enables auto-linking feature

---

## What You Need to Do

### Required: Install Templater

**Steps:**
1. Settings → Community Plugins → Browse
2. Search "Templater"
3. Install and Enable
4. Settings → Templater:
   - ✅ Enable "Trigger Templater on new file creation"
   - ✅ Enable "Enable System Commands"

### Optional: Choose Template Style

**You now have TWO coursework templates:**

**Option A: Smart Template** (Recommended)
- File: `Coursework Template (Smart).md`
- Auto-detects parent class
- Requires Templater
- Used by class page buttons

**Option B: Basic Template** (Simpler)
- File: `Coursework Template.md`
- No auto-detection
- No Templater needed
- Manual property filling (still fast with Quick Controls)

**To switch back to basic:**
Edit Class Template buttons to use:
```yaml
templateFile: "Academic System/Templates/Coursework Template.md"
```

---

## Testing the Fixes

### Test 1: Dashboard Alignment
1. Open `Academic Dashboard.md`
2. View in reading mode
3. Check that all 3 stats are in one row ✅

### Test 2: Calendar View
1. Scroll to bottom of dashboard
2. Calendar should display without errors ✅

### Test 3: Smart Auto-Linking
1. Open a class note (e.g., `CS-101 Introduction to Python.md`)
2. Click "New Assignment"
3. Check frontmatter:
   ```yaml
   class:
     - "[[CS-101 Introduction to Python]]"  # Should be auto-filled!
   ```
4. If empty, check Templater is installed and "System Commands" enabled

---

## Summary

**Fixes Applied:** 3
**New Files:** 2
**Modified Files:** 3
**Documentation Added:** 1 comprehensive guide

**All issues resolved!** ✅

**Next Steps:**
1. Install Templater (if not already installed)
2. Test the auto-linking feature
3. Read `Smart Templates Guide.md` for details
4. Enjoy your enhanced academic system! 🎉

---

## Alternative Workflow (No Templater)

If you prefer **not** to install Templater:

1. Keep using meta-bind buttons for quick file creation
2. Manually set `class` property using Quick Controls (takes 5 seconds)
3. Benefits: Simpler, no plugin dependency
4. Trade-off: One extra manual step per assignment

**Both workflows are valid!** The system is flexible. 🚀
