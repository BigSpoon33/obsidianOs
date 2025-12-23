---
created: 2025-12-10
tags:
  - solution
  - buttons
  - fix
---

# ✅ SOLUTION: Button Course Code Problem

## The Problem

Meta-bind buttons with `{{course-code}}` create files with **literal** text like:
```
{{course-code}} Assignment.md
```

Instead of:
```
CS-101 Assignment.md
```

**Why?** Meta-bind **cannot access** the parent note's frontmatter properties. The `{{course-code}}` syntax doesn't work in meta-bind buttons.

---

## The Solution

Use **Templater to create the Class Template itself**, so the course code is "baked into" the buttons when the class file is created!

### New Workflow

**1. Use Smart Class Template**

Instead of copying the regular Class Template, use:
```
Templates/Class Template (Smart).md
```

**2. Templater Prompts for Info**

When you create a new class:
- Templater asks: "Course Code?" → You type: `ACU-102`
- Templater asks: "Course Name?" → You type: `Acupuncture Points`
- Templater asks: "Instructor?" (optional)
- Templater asks: "Semester?" → `Spring 2025`
- Templater asks: "Credits?" → `3`

**3. File Auto-Renames**

Templater automatically renames the file to:
```
ACU-102 Acupuncture Points.md
```

**4. Buttons Have Real Course Code**

The buttons are now generated with the ACTUAL course code:
````markdown
```meta-bind-button
label: "New Assignment"
fileName: "ACU-102 Assignment"  ← Real code, not {{placeholder}}!
```
````

**5. Buttons Work Perfectly!**

When you click "New Assignment":
- Creates: `ACU-102 Assignment.md` ✅
- Smart Coursework Template detects `ACU-102` from filename
- Auto-links to `[[ACU-102 Acupuncture Points]]` ✅
- Everything works! 🎉

---

## Step-by-Step Usage

### Creating a New Class

**1. Create Note from Template**

```
Cmd/Ctrl + P → Templater: Create new note from template
Select: Class Template (Smart)
```

**2. Answer Prompts**

```
Course Code: ACU-102
Course Name: Acupuncture Points
Instructor: Dr. Chen
Semester: Spring 2025
Credits: 3
```

**3. File Created!**

- ✅ Filename: `ACU-102 Acupuncture Points.md`
- ✅ Frontmatter filled with your answers
- ✅ Buttons have real course code
- ✅ VIEW syntax shows course info dynamically

**4. Click Buttons**

- "New Assignment" → Creates `ACU-102 Assignment.md`
- "New Exam" → Creates `ACU-102 Exam.md`
- "New Project" → Creates `ACU-102 Project.md`

**All auto-link to your class!** ✅

---

## How It Works

### The Template Code

**Top of Class Template (Smart):**
```javascript
<%*
const courseCode = await tp.system.prompt("Course Code:");
const courseName = await tp.system.prompt("Course Name:");
// ... more prompts ...

if (courseCode && courseName) {
  await tp.file.rename(`${courseCode} ${courseName}`);
}
_%>
```

**Button Generation:**
````markdown
```meta-bind-button
label: "New Assignment"
fileName: "<% courseCode %> Assignment"  ← Templater fills this in!
```
````

**Result:** When Templater processes the template, `<% courseCode %>` becomes the actual value you entered (e.g., `ACU-102`).

---

## Comparison

### ❌ Old Way (Doesn't Work)

```markdown
fileName: "{{course-code}} Assignment"
```

**Problem:** Meta-bind doesn't know what `{{course-code}}` means

**Result:** Literal `{{course-code}} Assignment.md`

---

### ✅ New Way (Works!)

**Template uses Templater:**
```markdown
fileName: "<% courseCode %> Assignment"
```

**Templater processes it:**
```markdown
fileName: "ACU-102 Assignment"
```

**Result:** Button has the actual course code baked in!

---

## Files Updated

### New File Created

**`Templates/Class Template (Smart).md`**
- Prompts for course info
- Auto-renames file
- Generates buttons with real course code
- ✅ Located in both:
  - `Templates/` (for regular use)
  - `Academic System/Templates/` (for reference)

### Existing Files (No Changes Needed)

**`Coursework Template (Smart).md`**
- Already detects course code from filename
- Works perfectly with new class template
- No changes required ✅

---

## Quick Reference

### Create Class

```
1. Cmd/Ctrl + P
2. "Templater: Create new note from template"
3. Select "Class Template (Smart)"
4. Answer prompts
5. Done!
```

### Create Assignment

```
1. Open class note
2. Click "New Assignment"
3. File created with course code
4. Auto-linked to class
5. Start working!
```

---

## Troubleshooting

### Templater Doesn't Prompt

**Check:**
1. ✅ Templater plugin installed and enabled
2. ✅ "System Commands" enabled in Templater settings
3. ✅ Using "Create new note from template" command
4. ✅ Selecting the (Smart) template

### Buttons Still Show {{course-code}}

**You're using the old Class Template!**

**Solution:** Use `Class Template (Smart).md` instead

### Don't See Smart Template

**Check locations:**
- `Templates/Class Template (Smart).md`
- `Academic System/Templates/Class Template (Smart).md`

**Copy if missing:**
```
Copy from Academic System/Templates/ to Templates/
```

---

## Alternative: Manual Method

Don't want prompts every time?

**Option 1: Copy and Edit**
1. Copy `Class Template (Smart).md` to vault root
2. Manually rename file: `ACU-102 Acupuncture Points.md`
3. Manually fill in frontmatter
4. Buttons will have `{{course-code}}` in source
5. But they'll work because Templater processes them

**Option 2: Use Basic Template**
1. Use regular `Class Template.md`
2. Manually fill everything
3. Accept that buttons won't have course code
4. Smart Coursework Template will still detect from recent files

**Both work, but Smart Template is fastest!** ⚡

---

## Summary

**Problem:** `{{course-code}}` doesn't work in meta-bind buttons

**Solution:** Use Templater to create class files, baking the course code into buttons

**Result:**
- ✅ Buttons have real course code
- ✅ Files created with proper names
- ✅ Auto-linking works perfectly
- ✅ One-time setup per class
- ✅ All coursework auto-links

**File to use:** `Templates/Class Template (Smart).md`

---

*Updated: 2025-12-10*  
*Status: Working Solution* ✅
