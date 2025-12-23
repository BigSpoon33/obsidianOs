<%*
// ============================================
// SMART CLASS TEMPLATE
// Prompts for course info and generates buttons with actual course code
// ============================================

// Prompt for course information
const courseCode = await tp.system.prompt("Course Code (e.g., CS-101):");
const courseName = await tp.system.prompt("Course Name:");
const instructor = await tp.system.prompt("Instructor (optional):", "");
const semester = await tp.system.prompt("Semester (e.g., Spring 2025):", "");
const credits = await tp.system.prompt("Credits:", "3");

// Rename file to include course code and name
if (courseCode && courseName) {
  await tp.file.rename(`${courseCode} ${courseName}`);
}

_%>---
categories:
  - "[[Classes]]"
course-code: <% courseCode %>
course-name: <% courseName %>
instructor: <% instructor ? `[[${instructor}]]` : "[]" %>
semester: <% semester %>
year: <% new Date().getFullYear() %>
credits: <% credits %>
status:
  - active
grade: 
topics: []
url: 
cssclasses: dashboard
banner: 
banner_y: 0.5
---
---

# 📚 `VIEW[{course-code}]` - `VIEW[{course-name}]`

> [!abstract]- Course Information
> **Course Code:** `INPUT[text:course-code]`
> **Course Name:** `INPUT[text:course-name]`
> **Instructor:** `INPUT[text:instructor]`
> **Semester:** `INPUT[text:semester]`
> **Credits:** `INPUT[number:credits]`
> **Status:** `INPUT[inlineSelect(option(active), option(completed), option(dropped)):status]`
> **Final Grade:** `INPUT[text:grade]`
> **Course URL:** `INPUT[text:url]`

---

## 🚀 Quick Actions

> **Note:** These buttons will auto-link coursework to this class!

```meta-bind-button
label: "New Assignment"
icon: "pencil"
style: primary
action:
  type: templaterCreateNote
  templateFile: "Academic System/Templates/Coursework Template (Smart).md"
  folder: ""
  fileName: "<% courseCode %> Assignment"
  openNote: true
```

```meta-bind-button
label: "New Exam"
icon: "file-check"
style: primary
action:
  type: templaterCreateNote
  templateFile: "Academic System/Templates/Coursework Template (Smart).md"
  folder: ""
  fileName: "<% courseCode %> Exam"
  openNote: true
```

```meta-bind-button
label: "New Project"
icon: "rocket"
style: primary
action:
  type: templaterCreateNote
  templateFile: "Academic System/Templates/Coursework Template (Smart).md"
  folder: ""
  fileName: "<% courseCode %> Project"
  openNote: true
```

```meta-bind-button
label: "Class Notes"
icon: "book-open"
style: default
action:
  type: templaterCreateNote
  templateFile: "Academic System/Templates/Coursework Template (Smart).md"
  folder: ""
  fileName: "<% tp.date.now('YYYY-MM-DD') %> <% courseCode %> Lecture"
  openNote: true
```

---

## 📊 Course Dashboard

### Upcoming Deadlines

```dataviewjs
const courseCode = dv.current()["course-code"];

if (!courseCode) {
  dv.paragraph("⚠️ Set course-code in frontmatter to see coursework");
} else {
  const coursework = dv.pages()
    .where(p => p.class && String(p.class).includes(courseCode))
    .where(p => p.due && !["graded", "completed"].some(s => p.status && p.status.includes(s)))
    .sort(p => p.due);

  if (coursework.length === 0) {
    dv.paragraph("🎉 No upcoming deadlines!");
  } else {
    const tableData = coursework.map(c => {
      const dueDate = new Date(c.due);
      const today = new Date();
      const daysUntil = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
      
      let urgency = "🟢";
      let urgencyText = "OK";
      if (daysUntil < 0) {
        urgency = "🔴";
        urgencyText = "OVERDUE";
      } else if (daysUntil === 0) {
        urgency = "🔴";
        urgencyText = "DUE TODAY";
      } else if (daysUntil <= 2) {
        urgency = "🔴";
        urgencyText = `${daysUntil} days`;
      } else if (daysUntil <= 7) {
        urgency = "🟡";
        urgencyText = `${daysUntil} days`;
      } else {
        urgencyText = `${daysUntil} days`;
      }
      
      return [
        urgency,
        c.file.link,
        c.type || "—",
        c.due,
        urgencyText,
        c.status || "—"
      ];
    });
    
    dv.table(["", "Assignment", "Type", "Due", "Time Left", "Status"], tableData);
  }
}
```

---

### All Coursework

![[Coursework.base#By Class|embed-clean]]

---

## 📈 Grade Tracker

```dataviewjs
const courseCode = dv.current()["course-code"];

if (!courseCode) {
  dv.paragraph("⚠️ Set course-code to see grades");
} else {
  const graded = dv.pages()
    .where(p => p.class && String(p.class).includes(courseCode))
    .where(p => p.grade)
    .sort(p => p.assigned || p.due);

  if (graded.length === 0) {
    dv.paragraph("No graded work yet.");
  } else {
    const tableData = graded.map(g => {
      // Optional: Add grade highlighting
      let gradeDisplay = g.grade;
      if (String(g.grade).includes("A")) {
        gradeDisplay = `**${g.grade}** ✨`;
      } else if (String(g.grade).includes("B")) {
        gradeDisplay = `**${g.grade}**`;
      }
      
      return [
        g.file.link,
        g.type || "—",
        g.due || "—",
        gradeDisplay
      ];
    });
    
    dv.table(["Assignment", "Type", "Due Date", "Grade"], tableData);
    
    // Calculate GPA for this class (if using letter grades)
    const gradeToPoints = {
      "A+": 4.0, "A": 4.0, "A-": 3.7,
      "B+": 3.3, "B": 3.0, "B-": 2.7,
      "C+": 2.3, "C": 2.0, "C-": 1.7,
      "D+": 1.3, "D": 1.0, "D-": 0.7,
      "F": 0.0
    };
    
    let totalPoints = 0;
    let count = 0;
    
    for (const work of graded) {
      const grade = String(work.grade).trim();
      const points = gradeToPoints[grade];
      
      if (points !== undefined) {
        totalPoints += points;
        count++;
      }
    }
    
    if (count > 0) {
      const gpa = (totalPoints / count).toFixed(2);
      dv.paragraph(`\n**Class GPA:** ${gpa} (based on ${count} graded items)`);
    }
  }
}
```

---

## 📝 Course Notes & Resources

### Syllabus

<!-- Link to syllabus PDF or paste key points here -->

### Important Dates

- **Midterm:** 
- **Final:** 
- **Project Due:** 

### Resources

- Course website: 
- Office hours: 
- Textbook: 

### Topics Covered

<!-- Link to relevant notes and topics -->

---

## 🎯 Learning Objectives

<!-- What you need to learn/master in this course -->

---

## 💭 Notes & Reflections

<!-- Personal thoughts, insights, connections to other courses -->
