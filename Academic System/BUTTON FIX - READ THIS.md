---
created: 2025-12-09
tags:
  - fix
  - buttons
  - important
---

# 🔧 Button Fix - How It Works Now

## The Problem

Meta-bind buttons **cannot** access the parent note's frontmatter properties like `{{course-code}}`. This is a limitation of meta-bind - it doesn't have context about which note the button is in.

**What happens when you use `{{course-code}}`:**
- Meta-bind treats it as literal text
- Creates file: `{{course-code}} Assignment.md` ❌
- Templater then sees this as the filename
- Frontmatter gets malformed: `title: {{course-code}} Assignment` ❌

---

## The Solution

The Smart Coursework Template now uses a **different detection strategy**:

### How It Works

1. **You click "New Assignment"** in your class note
2. **Meta-bind creates** `Assignment.md` (simple name)
3. **Templater activates** on the new file
4. **Smart Template detects** the parent class by checking:
   - Most recently opened file with `categories: [[Classes]]`
   - That's your class note! ✅
5. **Offers to rename** the file to include course code
6. **Auto-fills** the `class` property with the detected class

---

## Workflow Example

### Step-by-Step

**1. You're working in:** `CS-101 Introduction to Python.md`

**2. You click:** "New Assignment" button

**3. File created:** `Assignment.md`

**4. Smart Template popup appears:**
```
Add course code to filename?
→ Keep as: Assignment
→ Rename to: CS-101 Assignment  ← Choose this
```

**5. Result:**
- **Filename:** `CS-101 Assignment.md` ✅
- **Frontmatter:**
  ```yaml
  class:
    - "[[CS-101 Introduction to Python]]"  ← Auto-filled!
  type:
    - assignment  ← Auto-detected!
  title: Assignment
  status:
    - not-started
  ```

---

## Why This Approach?

### ✅ Pros
- **Works reliably** - Detects from recent files
- **Flexible** - You choose whether to add course code
- **Auto-links** - Class property filled automatically
- **Smart type detection** - Knows exam from assignment

### ❌ What We Can't Do
- Can't have buttons that automatically create `CS-101 Assignment.md`
- Meta-bind limitation - no access to parent frontmatter
- Need one extra step (the rename prompt)

### 💡 Why Not Use Filename Detection?

We tried detecting course code from filename (`CS-101 Assignment`), but:
- Requires course code in button's fileName setting
- Meta-bind can't access `{{course-code}}` variable
- Would need Templater to trigger before meta-bind (impossible)

---

## Alternative: Manual Workflow

If you don't like the popup, here's a faster manual approach:

**Option 1: Use Basic Template**
1. Click button (creates `Assignment.md`)
2. Manually rename to `CS-101 Assignment.md`
3. Use Quick Controls to set class property (5 seconds)

**Option 2: Create Manually**
1. Create new note: `CS-101 Assignment 1.md`
2. Use Templater: Create from template
3. Select: Coursework Template (Smart)
4. Everything auto-fills from filename ✅

---

## Recommended Workflow

**For maximum automation:**

1. Open your class note
2. Click "New Assignment" 
3. When prompted, choose "Rename to: CS-101 Assignment"
4. Template auto-fills class property
5. Just add your work!

**Total clicks:** 2 (button + rename choice)

---

## Configuration

### Make Rename Automatic (Skip Prompt)

Edit `Coursework Template (Smart).md` around line 60:

**Current (asks you):**
```javascript
const shouldRename = await tp.system.suggester(
  [`Keep as: ${fileName}`, `Rename to: ${detectedCourseCode} ${fileName}`],
  [false, true],
  false,
  "Add course code to filename?"
);
```

**Change to (always renames):**
```javascript
const shouldRename = true; // Always add course code
```

**Result:** Files automatically get renamed with course code, no prompt!

---

## Why Can't We Use Templater Buttons?

You might ask: "Why not use Templater's templater-create-note command directly?"

**Answer:** We tried! But:
- Templater commands run in the **source note** context (class page)
- They can't easily pass variables to the **new note**
- Meta-bind + Templater combo is the best we can do

---

## Summary

**Current Workflow:**
1. Click button → Simple filename created
2. Smart Template detects parent class from recent files ✅
3. Optional: Rename prompt to add course code
4. Class property auto-filled ✅

**Trade-off:**
- 🎯 Reliable auto-linking
- ⏱️ One extra step (rename prompt)

**Alternative:**
- Skip buttons entirely
- Create notes manually with full filename
- Still get auto-detection benefits

Both workflows work! Choose what feels fastest for you.

---

## Troubleshooting

### Issue: Class Not Detected

**Symptom:** `class: [[]]` is empty

**Solution:**
1. Make sure you opened the class note recently
2. Check class note has `categories: [[Classes]]`
3. Check course-code property is set

**Workaround:**
- Template will show class picker
- Select manually

### Issue: Don't Want Rename Prompt

**Solutions:**
1. Edit template to auto-rename (see Configuration above)
2. Or use basic template and rename manually
3. Or create notes manually with full names

---

## Related Documentation

- [[Smart Templates Guide]] - Full technical details
- [[Plugin - Meta Bind]] - Button limitations explained
- [[Plugin - Templater]] - How detection works

---

*Updated: 2025-12-09*
