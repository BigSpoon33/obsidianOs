---
created: 2025-12-09
tags:
  - academic
  - getting-started
cssclasses: dashboard
---

# 🚀 Getting Started with the Academic System

Welcome to your comprehensive academic tracking system! This guide will walk you through setup and first use.

---

## ⚡ Quick Start (5 Minutes)

### Step 1: Install Required Plugins

Go to **Settings → Community Plugins → Browse**

**Install and Enable:**
1. ✅ **Dataview** - For dashboard widgets
2. ✅ **Meta Bind** - For inline controls and buttons
3. ✅ **Templater** (Optional) - For smart note creation

**Enable Core Plugins:**
Settings → Core plugins → Enable:
- ✅ Bases
- ✅ Daily notes
- ✅ Templates

---

### Step 2: Enable CSS Snippets

Go to **Settings → Appearance → CSS snippets**

1. Click folder icon to open snippets folder
2. Copy these files from `Academic System/CSS Snippets/`:
   - `academic-core.css` ← **Required**
   - `academic-neon.css` ← Optional (visual effects)
3. Return to Obsidian and refresh snippets
4. Enable both snippets

---

### Step 3: Configure Property Types

The `types.json` file has already been updated with academic properties! ✅

**To verify:**
1. Go to `.obsidian/types.json`
2. Confirm these properties exist:
   - `course-code: "text"`
   - `due: "date"`
   - `class: "multitext"`
   - (and others)

**Restart Obsidian** to apply changes.

---

### Step 4: Create Your First Class

1. **Copy the class template:**
   - Navigate to `Academic System/Templates/Class Template.md`
   - Copy the entire file
   - Paste into vault root
   - Rename: `CS-101 Introduction to Python.md` (use your actual class)

2. **Fill in the frontmatter:**
   ```yaml
   course-code: CS-101
   course-name: Introduction to Python
   instructor: [[Dr. Smith]]
   semester: Spring 2025
   status: active
   ```

3. **Customize the content:**
   - Add syllabus info
   - List important dates
   - Link to resources

---

### Step 5: Create Your First Assignment

**Option A: Use the button in your class note**
1. Open your class note (e.g., `CS-101 Introduction to Python.md`)
2. Click "New Assignment" button
3. Fill in the details

**Option B: Copy template manually**
1. Copy `Academic System/Templates/Coursework Template.md`
2. Rename: `CS-101 Homework 1.md`
3. Fill in frontmatter:
   ```yaml
   class: [[CS-101 Introduction to Python]]
   type: assignment
   due: 2025-12-15
   status: not-started
   ```

---

### Step 6: View Your Work

**See all classes:**
- Open `Academic System/Categories/Classes.md`
- Or create your own copy in `Categories/`

**See all coursework:**
- Open `Academic System/Categories/Coursework.md`
- Check "Due Soon" view

**Master dashboard:**
- Copy `Academic System/Examples/Academic Dashboard.md` to vault root
- Customize as needed

---

## 📚 Understanding the System

### File Organization

```
Your Vault/
├── CS-101 Introduction to Python.md       ← Class notes (root)
├── CS-101 Homework 1.md                   ← Coursework (root)
├── CS-101 Exam 1.md                       ← Coursework (root)
├── 2025-12-09 CS-101 Lecture Functions.md ← Daily notes (root)
├── Academic Dashboard.md                  ← Dashboard (root)
└── Academic System/                       ← Reference folder
    ├── Templates/                         ← Copy from here
    ├── Bases/                             ← Linked in notes
    ├── Categories/                        ← Copy to Categories/
    ├── Documentation/                     ← Help docs
    ├── CSS Snippets/                      ← Copy to .obsidian/snippets/
    └── Examples/                          ← Reference examples
```

**Kepano Philosophy:**
- Most notes live in **root** (not nested folders)
- Organization through **properties** and **links**
- Find via **search** and **bases**, not folders

---

### The Two Core Templates

#### 1. Class Template
**Use for:** The course itself  
**Creates:** A dashboard/homepage for each class  
**Contains:**
- Course information
- Creation buttons
- Upcoming deadline widget
- Grade tracker
- Course notes

**Example:** `CS-101 Introduction to Python.md`

#### 2. Coursework Template
**Use for:** Everything else (assignments, exams, projects, notes)  
**Universal:** One template for all types  
**Differentiate with:** `type` property  
**Contains:**
- Quick controls (status, due date, grade)
- Description and requirements
- Work area
- Resources and reflection

**Examples:**
- `CS-101 Homework 1 Variables.md` (type: assignment)
- `CS-101 Midterm Exam.md` (type: exam)
- `CS-101 Final Project.md` (type: project)

---

### Key Properties Explained

**Classes:**
| Property | Required? | Example | Purpose |
|----------|-----------|---------|---------|
| `course-code` | ✅ Yes | `CS-101` | Unique identifier |
| `course-name` | ✅ Yes | `Intro to Python` | Full name |
| `semester` | ⭐ Recommended | `Spring 2025` | Organization |
| `status` | ✅ Yes | `active` | Filter active classes |
| `instructor` | ⭐ Recommended | `[[Dr. Smith]]` | Track who teaches |

**Coursework:**
| Property | Required? | Example | Purpose |
|----------|-----------|---------|---------|
| `class` | ✅ Yes | `[[CS-101 Introduction to Python]]` | Link to class |
| `type` | ✅ Yes | `assignment` | Filter by type |
| `due` | ⭐ Recommended | `2025-12-15` | Deadline tracking |
| `status` | ✅ Yes | `in-progress` | Track progress |
| `grade` | After graded | `A` or `95%` | Record performance |

---

## 🎨 Customization Options

### CSS Levels

**Level 1: Minimal** (academic-core.css only)
- Clean dashboard layouts
- Readable tables
- Clean embeds
- No special effects

**Level 2: Enhanced** (+ academic-neon.css)
- Glowing dividers
- Neon progress bars
- Status badges
- Button effects
- Urgency indicators

**Choose based on preference!**

---

### Dashboard Customization

**Stat Widgets:**
Edit the dataviewjs code to:
- Change colors
- Add/remove stats
- Adjust thresholds (when things are "urgent")

**Views:**
Embed different base views:
```markdown
![[Coursework.base#Exams|embed-clean]]
![[Classes.base#By Semester|embed-clean]]
```

**Sections:**
Add/remove sections:
- GPA calculator
- Study time tracker
- Semester goals
- Course resources

---

### Template Customization

**Add sections:**
```markdown
## 📖 Study Guide

## 🤝 Study Group Notes

## 💻 Code Snippets
```

**Add properties:**
```yaml
study-hours: 
difficulty: 
```

**Add buttons:**
````markdown
```meta-bind-button
label: "Mark as Priority"
icon: "star"
style: primary
action:
  type: updateMetadata
  bindTarget: priority
  value: "high"
```
````

---

## 🔧 Troubleshooting

### Buttons Don't Work

**Issue:** Meta-bind buttons do nothing when clicked

**Solutions:**
1. ✅ Install Meta Bind plugin
2. ✅ For Templater buttons: Install Templater plugin
3. ✅ Enable "System Commands" in Templater settings
4. ✅ Verify template file path is correct

---

### Bases Show "No Results"

**Issue:** Empty tables in category pages

**Solutions:**
1. ✅ Check `categories` property matches exactly
   - Must be: `categories: [[Classes]]` or `categories: [[Coursework]]`
   - Not: `categories: Classes` (no link)
2. ✅ Verify note is not in a restricted folder
3. ✅ Check property types in types.json
4. ✅ Restart Obsidian after types.json changes

---

### Dataview Queries Don't Run

**Issue:** Gray boxes or error messages

**Solutions:**
1. ✅ Install Dataview plugin
2. ✅ Enable JavaScript queries (Settings → Dataview)
3. ✅ Check for syntax errors in query
4. ✅ Verify property names are correct (case-sensitive)

---

### CSS Not Applying

**Issue:** Dashboards look plain, no effects

**Solutions:**
1. ✅ Copy CSS files to `.obsidian/snippets/` folder
2. ✅ Enable snippets (Settings → Appearance → CSS snippets)
3. ✅ Reload Obsidian (Ctrl/Cmd + R)
4. ✅ Check `cssclasses: dashboard` in frontmatter

---

## 📖 Next Steps

### 1. Read the Documentation

Comprehensive guides available in `Academic System/Documentation/`:

- **Plugin - Dataview.md** - Dashboard widgets and queries
- **Plugin - Meta Bind.md** - Buttons and inline inputs
- **Plugin - Templater.md** - Smart templates (coming soon)
- **Workflows.md** - Common academic workflows (coming soon)
- **CSS Guide.md** - Styling options (coming soon)

### 2. Explore the Examples

Check `Academic System/Examples/`:
- Example class note with all features
- Example assignment with grades
- Example academic dashboard

### 3. Customize Your Setup

Make it yours:
- [ ] Create templates for your specific needs
- [ ] Design your ideal dashboard
- [ ] Set up bases with your preferred views
- [ ] Choose CSS styling level
- [ ] Create example notes for practice

### 4. Build Your Workflow

Common patterns:
- **Daily:** Check "Due Soon" view, update statuses
- **Weekly:** Review progress, plan upcoming work
- **After class:** Create lecture notes with timestamp
- **When assigned:** Create coursework note immediately
- **After grading:** Update grades, write reflection

---

## 🎯 Success Checklist

Before your first real semester, verify:

- [x] Plugins installed and enabled
- [x] CSS snippets enabled
- [x] types.json updated
- [ ] Created first test class
- [ ] Created first test assignment
- [ ] Buttons work correctly
- [ ] Bases show results
- [ ] Dataview widgets display
- [ ] Category pages accessible
- [ ] Dashboard customized to taste
- [ ] Read relevant documentation
- [ ] Practiced workflow

---

## 💡 Tips for Success

### 1. Start Simple
Don't try to use every feature at once. Begin with:
- Basic class notes
- Simple coursework tracking
- One category page

Add complexity as needed.

### 2. Consistent Naming
Use a consistent format:
- Classes: `CODE Name` (e.g., `CS-101 Intro to Python`)
- Assignments: `CODE Type Title` (e.g., `CS-101 Homework 1`)
- Lectures: `YYYY-MM-DD CODE Topic`

### 3. Update Regularly
- Change status as you work
- Add grades when received
- Review weekly

### 4. Link Heavily
Follow Kepano's philosophy:
- Link to class pages
- Link to related topics
- Link between assignments
- Link lecture notes to coursework

### 5. Reflect and Iterate
- Write reflections after assignments
- Note what worked/didn't work
- Adjust templates as needed
- Customize to your learning style

---

## 🆘 Getting Help

### Documentation
All documentation is in `Academic System/Documentation/`

### Examples
Reference notes in `Academic System/Examples/`

### Community
- Obsidian Forum: https://forum.obsidian.md
- Dataview Q&A: https://github.com/blacksmithgu/obsidian-dataview/discussions
- Meta Bind Q&A: https://github.com/mProjectsCode/obsidian-meta-bind-plugin/discussions

---

## 🎓 Ready to Begin!

You now have everything you need to track your academic work in Obsidian!

**Your first action:**
1. Create a class note for your current/upcoming course
2. Add one assignment
3. Check the category pages
4. Celebrate! 🎉

**Remember:**
- This system grows with you
- Start minimal, add as needed
- Customize to fit your workflow
- Most importantly: **Keep it simple and sustainable**

---

*Good luck with your studies! 📚✨*
