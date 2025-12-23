---
cssclasses: dashboard
banner:
banner_y: 0.5
tags:
  - dashboard
  - academic
---
---

# 🎓 Academic Command Center

```dataviewjs
// ============================================
//  SEMESTER OVERVIEW WIDGET
// ============================================

// Count active classes
const activeClasses = dv.pages()
  .where(p => p.categories && String(p.categories).includes("Classes"))
  .where(p => p.status && p.status.includes("active"))
  .length;

// Count upcoming deadlines (next 7 days)
const today = new Date();
const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

const upcoming = dv.pages()
  .where(p => p.categories && String(p.categories).includes("Coursework"))
  .where(p => p.due && new Date(p.due) >= today && new Date(p.due) <= nextWeek)
  .where(p => !["graded", "completed", "submitted"].some(s => p.status && p.status.includes(s)))
  .length;

// Count overdue items
const overdue = dv.pages()
  .where(p => p.categories && String(p.categories).includes("Coursework"))
  .where(p => p.due && new Date(p.due) < today)
  .where(p => !["graded", "completed", "submitted"].some(s => p.status && p.status.includes(s)))
  .length;

// Create neon widget container
const container = dv.el("div", "", { cls: "neon-widget-container" });
container.style.cssText = `
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 20px;
  background: rgba(0,0,0,0.2);
  border-radius: 10px;
  border: 1px solid var(--text-accent);
  box-shadow: 0 0 15px rgba(128,128,128,0.2);
  margin-bottom: 30px;
`;

// Define stats
const stats = [
  { 
    value: activeClasses, 
    label: "Active Classes",
    color: "var(--color-blue, #2196f3)"
  },
  { 
    value: upcoming, 
    label: "Due This Week",
    color: upcoming > 5 ? "var(--color-orange, #ff9800)" : "var(--color-green, #4caf50)"
  },
  { 
    value: overdue, 
    label: "Overdue",
    color: overdue > 0 ? "var(--color-red, #f44336)" : "var(--color-green, #4caf50)"
  }
];

// Create stat boxes
stats.forEach(stat => {
  const box = container.createDiv();
  box.innerHTML = `
    <div style="text-align: center;">
      <h1 style="color: ${stat.color}; text-shadow: 0 0 10px ${stat.color}; margin: 0; font-size: 3em;">${stat.value}</h1>
      <p style="margin: 5px 0 0 0; color: var(--text-muted); font-size: 0.9em; text-transform: uppercase; letter-spacing: 1px;">${stat.label}</p>
    </div>
  `;
});
```

```dataviewjs
// --- NEON CLOCK WIDGET ---
const container = dv.el("div", "", { cls: "neon-widget-container" });
container.style.display = "flex";
container.style.justifyContent = "space-between";
container.style.alignItems = "center";
container.style.padding = "20px";
container.style.background = "rgba(0,0,0,0.2)";
container.style.borderRadius = "10px";
container.style.border = "1px solid var(--text-accent)";
container.style.boxShadow = "0 0 15px rgba(var(--text-accent-rgb), 0.2)";
container.style.marginBottom = "20px";

// Greeting
const hour = new Date().getHours();
let greeting = "Good Evening";
if (hour < 12) greeting = "Good Morning";
else if (hour < 18) greeting = "Good Afternoon";

const msg = container.createEl("h2");
msg.innerText = `${greeting}, ${dv.current().file.name}`;
msg.style.margin = "0";
msg.style.color = "var(--text-normal)";

// Time
const time = container.createEl("h1");
time.innerText = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
time.style.margin = "0";
time.style.color = "var(--text-accent)";
time.style.textShadow = "0 0 10px var(--text-accent)";
time.style.fontSize = "2.5em";
```

---

## 🔥 This Week's Deadlines

```dataviewjs
const today = new Date();
const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

const thisWeek = dv.pages()
  .where(p => p.categories && String(p.categories).includes("Coursework"))
  .where(p => p.due)
  .where(p => {
    const due = new Date(p.due);
    return due >= today && due <= nextWeek;
  })
  .where(p => !["graded", "completed"].some(s => p.status && p.status.includes(s)))
  .sort(p => p.due);

if (thisWeek.length === 0) {
  dv.paragraph("📅 Nothing due this week! Time to get ahead or take a break. 🎉");
} else {
  // Group by day
  const byDay = {};
  
  for (const item of thisWeek) {
    const dueDate = new Date(item.due);
    const dayKey = dueDate.toDateString();
    
    if (!byDay[dayKey]) {
      byDay[dayKey] = [];
    }
    byDay[dayKey].push(item);
  }
  
  // Display grouped by day
  for (const [day, items] of Object.entries(byDay)) {
    const dayDate = new Date(day);
    const isToday = dayDate.toDateString() === today.toDateString();
    const isTomorrow = dayDate.toDateString() === new Date(today.getTime() + 86400000).toDateString();
    
    let dayLabel = day;
    if (isToday) dayLabel = "🔴 TODAY - " + day;
    else if (isTomorrow) dayLabel = "🟡 TOMORROW - " + day;
    else dayLabel = "📅 " + day;
    
    dv.header(4, dayLabel);
    
    items.forEach(item => {
      const classLink = item.class || "No class";
      const typeEmoji = {
        "assignment": "📄",
        "exam": "📝",
        "quiz": "❓",
        "project": "🚀",
        "lab": "🔬",
        "reading": "📖",
        "essay": "✍️"
      }[item.type] || "📌";
      
      dv.paragraph(`${typeEmoji} ${item.file.link} - ${classLink} - Status: *${item.status || "not set"}*`);
    });
  }
}
```

---

## 📚 Active Classes

![[Classes.base#Active|embed-clean]]

---

## 🚨 Overdue Work

```dataviewjs
const today = new Date();

const overdue = dv.pages()
  .where(p => p.categories && String(p.categories).includes("Coursework"))
  .where(p => p.due && new Date(p.due) < today)
  .where(p => !["graded", "completed", "submitted"].some(s => p.status && p.status.includes(s)))
  .sort(p => p.due);

if (overdue.length === 0) {
  dv.paragraph("✅ All caught up! No overdue work.");
} else {
  dv.paragraph(`⚠️ **${overdue.length}** overdue item${overdue.length > 1 ? 's' : ''}`);
  
  const tableData = overdue.map(item => {
    const daysOverdue = Math.ceil((today - new Date(item.due)) / (1000 * 60 * 60 * 24));
    
    return [
      "🔴",
      item.file.link,
      item.class || "—",
      item.type || "—",
      item.due,
      `${daysOverdue} days ago`
    ];
  });
  
  dv.table(["", "Assignment", "Class", "Type", "Was Due", "Overdue By"], tableData);
}
```

---

## 📊 Semester Progress

```dataviewjs
const classes = dv.pages()
  .where(p => p.categories && String(p.categories).includes("Classes"))
  .where(p => p.status && p.status.includes("active"));

if (classes.length === 0) {
  dv.paragraph("No active classes.");
} else {
  const tableData = classes.map(c => {
    const courseCode = c["course-code"] || "";
    
    // Get all coursework for this class
    const allWork = dv.pages()
      .where(p => p.class && String(p.class).includes(courseCode))
      .length;
    
    // Get completed work
    const completed = dv.pages()
      .where(p => p.class && String(p.class).includes(courseCode))
      .where(p => ["completed", "submitted", "graded"].some(s => p.status && p.status.includes(s)))
      .length;
    
    // Calculate percentage
    const percent = allWork > 0 ? Math.round((completed / allWork) * 100) : 0;
    
    // Create progress bar
    const progressBar = `<div style="width: 100%; height: 12px; border-radius: 10px; background: linear-gradient(90deg, var(--text-accent) ${percent}%, rgba(255,255,255,0.1) ${percent}%); box-shadow: 0 0 5px rgba(0,0,0,0.3);"></div>`;
    
    return [
      c.file.link,
      c.semester || "—",
      progressBar,
      `${completed} / ${allWork}`
    ];
  });
  
  dv.table(["Class", "Semester", "Progress", "Completed"], tableData);
}
```

---

## 📈 Recent Grades

```dataviewjs
const recentGraded = dv.pages()
  .where(p => p.categories && String(p.categories).includes("Coursework"))
  .where(p => p.grade)
  .sort(p => p.due || p.assigned, 'desc')
  .limit(10);

if (recentGraded.length === 0) {
  dv.paragraph("No grades yet.");
} else {
  const tableData = recentGraded.map(g => {
    // Highlight good grades
    let gradeDisplay = g.grade;
    if (String(g.grade).includes("A")) {
      gradeDisplay = `**${g.grade}** ✨`;
    }
    
    return [
      g.file.link,
      g.class || "—",
      g.type || "—",
      gradeDisplay
    ];
  });
  
  dv.table(["Assignment", "Class", "Type", "Grade"], tableData);
}
```

---

## 🎯 Quick Stats

```dataviewjs
// Total coursework
const totalWork = dv.pages()
  .where(p => p.categories && String(p.categories).includes("Coursework"))
  .length;

// Completed
const completed = dv.pages()
  .where(p => p.categories && String(p.categories).includes("Coursework"))
  .where(p => ["completed", "submitted", "graded"].some(s => p.status && p.status.includes(s)))
  .length;

// In progress
const inProgress = dv.pages()
  .where(p => p.categories && String(p.categories).includes("Coursework"))
  .where(p => p.status && p.status.includes("in-progress"))
  .length;

// Graded items
const graded = dv.pages()
  .where(p => p.categories && String(p.categories).includes("Coursework"))
  .where(p => p.grade)
  .length;

dv.paragraph(`
📊 **Total Coursework:** ${totalWork}  
✅ **Completed:** ${completed}  
⏳ **In Progress:** ${inProgress}  
📝 **Graded:** ${graded}  
`);
```

---

## 🗓️ Calendar View

```dataview
CALENDAR due
FROM ""
WHERE categories = [[Coursework]]
```


```meta-bind-button
label: "➕ New Class"
icon: "book-plus"
style: primary
action:
  type: templaterCreateNote
  templateFile: "Templates/Class Template.md"
  folder: ""
  fileName: "NewClass--<% tp.date.now('YYYY-MM-DD-HHmmss') %>"
  openNote: true
```

```meta-bind-button
label: "📘 New Lecture Notes"
icon: "file-edit"
style: primary
action:
  type: templaterCreateNote
  templateFile: "Academic System/Templates/Lecture Notes Template.md"
  folder: "Academic/Notes"
  fileName: "NewLecture--<% tp.date.now('YYYY-MM-DD-HHmmss') %>"
  openNote: true
  ```

```meta-bind-button
label: "📝 Quick Assignment"
icon: "pencil"
style: primary
action:
  type: templaterCreateNote
  templateFile: "Templates/Coursework Template.md"
  folder: ""
  fileName: "NewCoursework--<% tp.date.now('YYYY-MM-DD-HHmmss') %>"
  openNote: true
```

```meta-bind-button
label: "New Assignment"
icon: "pencil"
style: primary
action:
  type: templaterCreateNote
  templateFile: "Academic System/Templates/Coursework Template (Smart).md"
  folder: ""
  fileName: "Assignment"
  openNote: true
```

