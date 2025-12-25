---
categories:
  - "[[Classes]]"
course-code: CS-101
course-name: Introduction to Python Programming
instructor: Dr. Hsiao
semester: Spring 2025
year: 2025
credits: 3
status: active
grade:
topics:
  - "[[Programming]]"
  - "[[Python]]"
  - "[[Computer Science]]"
url: https://course-website.edu/cs101
cssclasses: dashboard
banner:
banner_y: 0.5
---
---

# 📚 CS-101 - Introduction to Python Programming

> [!abstract]- Course Information
> **Instructor:** `INPUT[text:instructor]`
> **Semester:** `INPUT[text:semester]`
> **Credits:** `INPUT[number:credits]`
> **Status:** `INPUT[inlineSelect(option(active), option(completed), option(dropped)):status]`
> **Final Grade:** `INPUT[text:grade]`
> **Course URL:** `INPUT[text:url]`

---

## 🚀 Quick Actions

```meta-bind-button
label: "New Assignment"
icon: "pencil"
style: primary
action:
  type: templaterCreateNote
  templateFile: "Academic System/Templates/Coursework Template (Smart).md"
  folder: ""
  fileName: "CS-101 Assignment"
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
  fileName: "CS-101 Exam"
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
  fileName: "CS-101 Project"
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
  fileName: "2025-12-09 CS-101 Lecture"
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

This course covers fundamental programming concepts using Python 3.x. Topics include:
- Variables and data types
- Control flow (if/else, loops)
- Functions and modules
- Data structures (lists, dictionaries, sets)
- File I/O
- Object-oriented programming basics
- Final project: Build a complete Python application

### Important Dates

- **Midterm:** March 15, 2025
- **Final Exam:** May 10, 2025
- **Final Project Due:** May 5, 2025

### Resources

- Course website: https://course-website.edu/cs101
- Office hours: Tuesdays 2-4 PM, Thursdays 10-12 PM
- Textbook: "Python Crash Course" by Eric Matthes
- Online Python Tutor: https://pythontutor.com

### Topics Covered

- [[Variables and Data Types]]
- [[Control Flow]]
- [[Functions]]
- [[Data Structures]]
- [[File Operations]]
- [[Object-Oriented Programming]]

---

## 🎯 Learning Objectives

By the end of this course, I should be able to:

- [ ] Write clean, readable Python code
- [ ] Understand fundamental programming concepts
- [ ] Debug common programming errors
- [ ] Build small Python applications
- [ ] Read and understand others' Python code
- [ ] Use Python's standard library
- [ ] Apply object-oriented programming principles

---

## 💭 Notes & Reflections

### Week 1 (Jan 15-19)
First week was a great introduction. Python syntax is much cleaner than Java (which I took last semester). Really like how the instructor explains concepts with real-world examples.

### Week 2 (Jan 22-26)
Control flow is straightforward. Homework 1 was easier than expected. Need to practice more with nested loops.

### Week 3 (Jan 29-Feb 2)
Functions are powerful! Starting to see how to break down problems into smaller pieces. The recursion examples were mind-bending but starting to make sense.
