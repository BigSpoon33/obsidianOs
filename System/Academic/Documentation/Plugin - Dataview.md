---
created: 2025-12-09
plugin: dataview
version: 0.5.66
tags:
  - plugin-docs
  - dataview
---

# 📊 Dataview Plugin - Comprehensive Guide

## Overview

**Plugin:** Dataview  
**Author:** @blacksmithgu  
**Current Version:** 0.5.66 (as of 2025-12-09)  
**Repository:** [blacksmithgu/obsidian-dataview](https://github.com/blacksmithgu/obsidian-dataview)  
**Documentation:** [dataview.js.org](https://blacksmithgu.github.io/obsidian-dataview/)

### What It Does

Dataview treats your Obsidian vault as a **database**. Query notes using:
- **DQL** (Dataview Query Language) - SQL-like syntax
- **Inline queries** - Single-line queries
- **DataviewJS** - Full JavaScript API

### Why We Use It

In the Academic System:
- ✅ Dashboard widgets (deadline counters, grade calculators)
- ✅ Dynamic coursework lists (due soon, overdue)
- ✅ Progress tracking (completed vs total)
- ✅ GPA calculations
- ✅ Filtered views (though we primarily use Bases)

---

## Installation

### Step 1: Install Plugin

1. Open Settings → Community plugins
2. Click "Browse"
3. Search "Dataview"
4. Click "Install"
5. Click "Enable"

### Step 2: Configure Settings

Recommended settings for Academic System:

```
Settings → Dataview

✅ Enable JavaScript Queries
   (Required for dashboard widgets)

✅ Enable Inline Queries
   (Optional, for quick lookups)

✅ Enable Inline JavaScript Queries
   (Optional, advanced use)

Date Format: yyyy-MM-dd
   (Matches Kepano vault standard)
```

---

## Core Concepts

### 1. Pages

A "page" in Dataview = a note in your vault

**Select pages:**
```dataview
FROM "References"
WHERE categories contains [[Movies]]
```

### 2. Properties (Frontmatter)

Access YAML properties:

```yaml
---
due: 2025-12-15
status: in-progress
class: [[CS-101]]
---
```

Query:
```dataview
TABLE due, status, class
FROM "Root"
WHERE categories contains [[Coursework]]
SORT due ASC
```

### 3. Implicit Fields

Dataview auto-generates fields:

| Field | Description | Example |
|-------|-------------|---------|
| `file.name` | Note name | "CS-101 Homework 1" |
| `file.path` | Full path | "Root/CS-101 Homework 1.md" |
| `file.link` | Link to note | [[CS-101 Homework 1]] |
| `file.size` | File size in bytes | 1024 |
| `file.ctime` | Creation time | 2025-12-09T10:00:00 |
| `file.mtime` | Modified time | 2025-12-09T14:30:00 |
| `file.tags` | All tags | ["#academic", "#cs"] |

### 4. Query Types

**TABLE** - Rows and columns
```dataview
TABLE due, status, grade
FROM "Root"
WHERE categories contains [[Coursework]]
```

**LIST** - Simple list
```dataview
LIST
FROM "Root"
WHERE categories contains [[Classes]]
AND status = "active"
```

**TASK** - Task items
```dataview
TASK
FROM "Root"
WHERE due < date(today)
```

**CALENDAR** - Calendar view
```dataview
CALENDAR due
FROM "Root"
WHERE categories contains [[Coursework]]
```

---

## Academic System Use Cases

### Use Case 1: Due Soon Widget

**Location:** Class dashboard pages

```dataviewjs
const courseCode = dv.current()["course-code"];
const coursework = dv.pages()
  .where(p => p.class && String(p.class).includes(courseCode))
  .where(p => p.due && p.status != "graded")
  .sort(p => p.due);

if (coursework.length === 0) {
  dv.paragraph("🎉 No upcoming deadlines!");
} else {
  const tableData = coursework.map(c => {
    const daysUntil = Math.ceil((new Date(c.due) - new Date()) / (1000 * 60 * 60 * 24));
    let urgency = "🟢";
    if (daysUntil < 0) urgency = "🔴 OVERDUE";
    else if (daysUntil <= 2) urgency = "🔴";
    else if (daysUntil <= 7) urgency = "🟡";
    
    return [
      urgency,
      c.file.link,
      c.type,
      c.due,
      `**${daysUntil} days**`
    ];
  });
  
  dv.table(["", "Assignment", "Type", "Due", "Time Left"], tableData);
}
```

**What it does:**
1. Gets current class's course code
2. Finds all coursework linked to this class
3. Filters out graded work
4. Calculates days until due
5. Shows urgency indicator (🟢🟡🔴)
6. Displays formatted table

**Customization options:**
- Change urgency thresholds (currently 2 days, 7 days)
- Add/remove columns
- Filter by type (exams only, assignments only)
- Sort by priority or status

---

### Use Case 2: Grade Tracker

**Location:** Class dashboard pages

```dataviewjs
const courseCode = dv.current()["course-code"];
const graded = dv.pages()
  .where(p => p.class && String(p.class).includes(courseCode))
  .where(p => p.grade)
  .sort(p => p.assigned || p.due);

if (graded.length === 0) {
  dv.paragraph("No graded work yet.");
} else {
  const tableData = graded.map(g => {
    // Optional: parse grades for highlighting
    let gradeDisplay = g.grade;
    if (g.grade && g.grade.includes("A")) {
      gradeDisplay = `**${g.grade}** ✨`;
    }
    
    return [
      g.file.link,
      g.type,
      gradeDisplay
    ];
  });
  
  dv.table(["Assignment", "Type", "Grade"], tableData);
}
```

**Enhancements:**
- Add grade highlighting
- Calculate average/GPA
- Show grade distribution graph
- Compare to class average

---

### Use Case 3: Progress Counter

**Location:** Master Academic Dashboard

```dataviewjs
// Count active classes
const activeClasses = dv.pages()
  .where(p => p.categories && p.categories.includes(dv.fileLink("Classes")))
  .where(p => p.status && p.status.includes("active"))
  .length;

// Count upcoming deadlines
const upcoming = dv.pages()
  .where(p => p.categories && p.categories.includes(dv.fileLink("Coursework")))
  .where(p => p.due && new Date(p.due) >= new Date())
  .where(p => p.status && !["graded", "completed"].includes(p.status))
  .length;

// Count overdue items
const overdue = dv.pages()
  .where(p => p.due && new Date(p.due) < new Date())
  .where(p => p.status && !["graded", "completed", "submitted"].includes(p.status))
  .length;

// Create widget container
const container = dv.el("div", "");
container.style.cssText = `
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 20px;
  background: rgba(0,0,0,0.2);
  border-radius: 10px;
  border: 1px solid var(--text-accent);
  box-shadow: 0 0 15px rgba(var(--text-accent-rgb), 0.2);
  margin-bottom: 20px;
`;

// Create stat boxes
const stats = [
  { value: activeClasses, label: "Active Classes", color: "var(--color-blue)" },
  { value: upcoming, label: "Upcoming", color: "var(--color-green)" },
  { value: overdue, label: "Overdue", color: overdue > 0 ? "var(--color-red)" : "var(--color-green)" }
];

stats.forEach(stat => {
  const box = container.createDiv();
  box.innerHTML = `
    <div style="text-align: center;">
      <h1 style="color: ${stat.color}; text-shadow: 0 0 10px ${stat.color}; margin: 0; font-size: 3em;">${stat.value}</h1>
      <p style="margin: 5px 0 0 0; color: var(--text-muted); font-size: 0.9em;">${stat.label}</p>
    </div>
  `;
});
```

**Result:** Neon-styled stat boxes showing key metrics.

---

### Use Case 4: GPA Calculator

**Location:** Academic Dashboard or individual class pages

```dataviewjs
const courseCode = dv.current()["course-code"]; // For specific class
// OR: const coursework = dv.pages() for all classes

const gradeToPoints = {
  "A+": 4.0, "A": 4.0, "A-": 3.7,
  "B+": 3.3, "B": 3.0, "B-": 2.7,
  "C+": 2.3, "C": 2.0, "C-": 1.7,
  "D+": 1.3, "D": 1.0, "D-": 0.7,
  "F": 0.0
};

const coursework = dv.pages()
  .where(p => p.class && String(p.class).includes(courseCode))
  .where(p => p.grade);

let totalPoints = 0;
let count = 0;

for (const work of coursework) {
  const grade = work.grade.toString().trim();
  const points = gradeToPoints[grade];
  
  if (points !== undefined) {
    totalPoints += points;
    count++;
  }
}

const gpa = count > 0 ? (totalPoints / count).toFixed(2) : "N/A";

// Display
dv.header(3, "Grade Point Average");
dv.paragraph(`**Current GPA:** ${gpa} (based on ${count} graded items)`);

// Optional: Show grade breakdown
if (count > 0) {
  const breakdown = {};
  for (const work of coursework) {
    const grade = work.grade.toString().trim();
    if (gradeToPoints[grade] !== undefined) {
      breakdown[grade] = (breakdown[grade] || 0) + 1;
    }
  }
  
  dv.paragraph("**Grade Distribution:**");
  Object.entries(breakdown)
    .sort(([a], [b]) => (gradeToPoints[b] || 0) - (gradeToPoints[a] || 0))
    .forEach(([grade, count]) => {
      dv.paragraph(`- ${grade}: ${count} assignment${count > 1 ? 's' : ''}`);
    });
}
```

**Enhancements:**
- Weight assignments differently (exams worth more)
- Calculate semester GPA across all classes
- Show GPA trend over time
- Compare to previous semesters

---

### Use Case 5: Weekly Agenda

**Location:** Daily notes or Master Dashboard

```dataviewjs
const today = new Date();
const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

const thisWeek = dv.pages()
  .where(p => p.due)
  .where(p => {
    const due = new Date(p.due);
    return due >= today && due <= weekFromNow;
  })
  .where(p => p.status && !["graded", "completed"].includes(p.status))
  .sort(p => p.due);

if (thisWeek.length === 0) {
  dv.paragraph("📅 Nothing due this week!");
} else {
  // Group by day
  const byDay = {};
  
  for (const item of thisWeek) {
    const dayKey = item.due.toString();
    if (!byDay[dayKey]) {
      byDay[dayKey] = [];
    }
    byDay[dayKey].push(item);
  }
  
  // Display grouped
  for (const [day, items] of Object.entries(byDay)) {
    dv.header(4, day);
    items.forEach(item => {
      dv.paragraph(`- ${item.file.link} (${item.class}) - ${item.type}`);
    });
  }
}
```

---

## DQL vs DataviewJS

### When to Use DQL (Dataview Query Language)

**Pros:**
- Simpler syntax
- Faster execution
- Better for basic queries
- Easier to maintain

**Use for:**
- Simple tables
- List views
- Basic filtering

**Example:**
```dataview
TABLE due, status, class
FROM "Root"
WHERE categories contains [[Coursework]]
AND due >= date(today)
SORT due ASC
LIMIT 10
```

### When to Use DataviewJS

**Pros:**
- Full JavaScript power
- Complex calculations
- Custom formatting
- Conditional logic
- API access

**Use for:**
- Dashboard widgets
- GPA calculations
- Deadline countdowns
- Progress bars
- Complex aggregations

**Example:**
```dataviewjs
const items = dv.pages()
  .where(p => p.due >= new Date())
  .map(p => ({
    ...p,
    daysUntil: Math.ceil((new Date(p.due) - new Date()) / 86400000)
  }))
  .sort(p => p.daysUntil);

dv.table(["Name", "Days Until"], 
  items.map(i => [i.file.link, i.daysUntil]));
```

---

## Common Patterns

### Pattern 1: Filter Current Note Context

Get the current note's properties:

```dataviewjs
const current = dv.current();
const courseCode = current["course-code"];
const semester = current.semester;
```

Use in queries:
```dataviewjs
const related = dv.pages()
  .where(p => p.class && String(p.class).includes(courseCode));
```

---

### Pattern 2: Date Comparisons

```dataviewjs
const today = new Date();
const tomorrow = new Date(today.getTime() + 86400000);
const nextWeek = new Date(today.getTime() + 7 * 86400000);

// Due today
const dueToday = dv.pages()
  .where(p => p.due && new Date(p.due).toDateString() === today.toDateString());

// Overdue
const overdue = dv.pages()
  .where(p => p.due && new Date(p.due) < today);

// Due this week
const thisWeek = dv.pages()
  .where(p => p.due && new Date(p.due) >= today && new Date(p.due) <= nextWeek);
```

---

### Pattern 3: Link Matching

Check if property contains a link:

```dataviewjs
// Exact match
.where(p => p.class && p.class.path === "Root/CS-101.md")

// Contains (more flexible)
.where(p => p.class && String(p.class).includes("CS-101"))

// Multiple links
.where(p => {
  if (!p.topics) return false;
  const topics = Array.isArray(p.topics) ? p.topics : [p.topics];
  return topics.some(t => String(t).includes("Programming"));
})
```

---

### Pattern 4: Null/Empty Checks

```dataviewjs
// Property exists and has value
.where(p => p.grade)

// Property is empty
.where(p => !p.grade || p.grade === "")

// Property is specific value
.where(p => p.status === "graded")

// Property contains value (for lists)
.where(p => p.status && p.status.includes("active"))
```

---

### Pattern 5: Custom Sorting

```dataviewjs
const items = dv.pages()
  .where(p => p.due)
  .sort(p => {
    // Custom sort logic
    if (!p.due) return Infinity; // Put no-due-date last
    return new Date(p.due).getTime();
  }, 'asc');
```

---

## Performance Tips

### 1. Limit Scope

❌ **Bad:** Query entire vault
```dataviewjs
const all = dv.pages(); // Slow!
```

✅ **Good:** Query specific folders/tags
```dataviewjs
const coursework = dv.pages('"Root"')
  .where(p => p.categories === "[[Coursework]]");
```

### 2. Cache Expensive Operations

❌ **Bad:** Repeat calculations
```dataviewjs
for (const p of pages) {
  const days = Math.ceil((new Date(p.due) - new Date()) / 86400000);
  // Use days multiple times
}
```

✅ **Good:** Calculate once
```dataviewjs
const today = new Date(); // Cache today
const items = pages.map(p => ({
  ...p,
  daysUntil: Math.ceil((new Date(p.due) - today) / 86400000)
}));
```

### 3. Use Early Filtering

❌ **Bad:** Filter after processing
```dataviewjs
const all = dv.pages().map(complexTransform);
const filtered = all.filter(p => p.type === "exam");
```

✅ **Good:** Filter first
```dataviewjs
const exams = dv.pages().where(p => p.type === "exam");
const processed = exams.map(complexTransform);
```

---

## Troubleshooting

### Issue: Query Returns No Results

**Check:**
1. ✅ Dataview plugin enabled
2. ✅ JavaScript queries enabled (Settings → Dataview)
3. ✅ Property names spelled correctly (case-sensitive)
4. ✅ Path/folder exists
5. ✅ Categories property uses links: `[[Coursework]]` not `"Coursework"`

**Debug:**
```dataviewjs
// See all pages
dv.table(["Name", "Categories"], 
  dv.pages().map(p => [p.file.name, p.categories]));
```

---

### Issue: Dates Not Sorting Correctly

**Problem:** Dates are text, not date objects

**Solution:** Add to `.obsidian/types.json`:
```json
{
  "types": {
    "due": "date",
    "assigned": "date",
    "start": "date"
  }
}
```

Restart Obsidian after changes.

---

### Issue: "undefined" in Output

**Problem:** Property doesn't exist or is null

**Solution:** Add null checks:
```dataviewjs
const grade = p.grade || "Not graded";
const due = p.due ? p.due : "No due date";
```

---

### Issue: Links Not Clickable

**Problem:** Using `.toString()` or string concatenation

**Solution:** Use proper link objects:
```dataviewjs
// ❌ Bad
dv.paragraph(p.file.name);

// ✅ Good
dv.paragraph(p.file.link);
```

---

## Examples Repository

For more examples, see:
- [Dataview Example Vault](https://github.com/s-blu/obsidian_dataview_example_vault)
- [Official Documentation](https://blacksmithgu.github.io/obsidian-dataview/)

---

## Quick Reference

### Common DQL Queries

```dataview
# List all coursework due this week
LIST
FROM "Root"
WHERE categories contains [[Coursework]]
AND due >= date(today)
AND due <= date(today) + dur(7 days)
SORT due ASC
```

```dataview
# Table of active classes
TABLE instructor, semester, credits
FROM "Root"
WHERE categories contains [[Classes]]
AND status = "active"
SORT semester DESC
```

```dataview
# Calendar of due dates
CALENDAR due
FROM "Root"
WHERE categories contains [[Coursework]]
```

### DataviewJS Snippets

**Create a table:**
```dataviewjs
dv.table(["Column 1", "Column 2"], 
  [[value1, value2], [value3, value4]]);
```

**Create a list:**
```dataviewjs
dv.list(items.map(i => i.file.link));
```

**Create custom HTML:**
```dataviewjs
const div = dv.el("div", "Content");
div.style.color = "red";
```

---

## Version Notes

**0.5.66 (Current)**
- Stable release
- Full JavaScript API
- Inline queries supported
- Base compatibility

**Future Versions:**
- Check [GitHub releases](https://github.com/blacksmithgu/obsidian-dataview/releases)
- Update documentation as needed

---

## Related Documentation

- [[Plugin - Meta Bind]] - Inline editing
- [[Plugin - Bases]] - Alternative to Dataview queries
- [[CSS Guide]] - Styling Dataview output
- [[Workflows]] - Using Dataview in workflows
