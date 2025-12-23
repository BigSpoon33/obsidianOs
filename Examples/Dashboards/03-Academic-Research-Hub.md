---
cssclasses:
  - academic-dashboard
  - dashboard
banner: "![[Pasted image 20251210175116.png]]"
banner_y: 0.5
---

<div class="academic-header">
  <div class="academic-header-content">
    <div class="academic-header-left">
      <h1>🎓 Academic Dashboard</h1>
      <div class="academic-header-meta">
        <div class="academic-meta-item">
          📅 Semester: <strong>Fall 2025</strong>
        </div>
        <div class="academic-meta-item">
          📊 GPA: <strong>3.85</strong>
        </div>
        <div class="academic-meta-item">
          📚 Credits: <strong>15</strong>
        </div>
        <div class="academic-meta-item">
          ⏰ Days to Finals: <strong>23</strong>
        </div>
      </div>
    </div>
    <div class="academic-header-stats">
      <div class="academic-stat-box">
        <div class="academic-stat-value">12</div>
        <div class="academic-stat-label">Assignments</div>
      </div>
      <div class="academic-stat-box">
        <div class="academic-stat-value">5</div>
        <div class="academic-stat-label">Exams</div>
      </div>
      <div class="academic-stat-box">
        <div class="academic-stat-value">87%</div>
        <div class="academic-stat-label">On Track</div>
      </div>
    </div>
  </div>
</div>

---

## ⚠️ Urgent Deadlines

<div class="academic-urgent-banner">
  <div class="academic-urgent-title">
    <span class="academic-urgent-icon">🔴</span>
    IMMEDIATE ATTENTION REQUIRED
  </div>
  <div>
```dataviewjs
// Mock urgent deadlines - replace with your actual task queries
const deadlines = [
  { title: "Acupuncture Final Project", due: "Due in 2 days", status: "urgent", course: "Acu 301" },
  { title: "Herbology Research Paper", due: "Due in 5 days", status: "warning", course: "Herb 201" },
  { title: "Qi Gong Practice Exam", due: "Due in 1 week", status: "safe", course: "QG 101" }
];

for (let deadline of deadlines) {
  const statusClass = deadline.status;
  dv.paragraph(`
<div class="academic-deadline-item ${statusClass}">
  <div>
    <div class="academic-deadline-title">${deadline.title}</div>
    <div style="font-size: 0.85em; color: var(--academic-text-muted); margin-top: 4px;">📚 ${deadline.course}</div>
  </div>
  <div class="academic-deadline-badge ${statusClass}">${deadline.due}</div>
</div>
  `);
}
```
  </div>
</div>

---

<div class="dashboard-grid dashboard-grid-2col">

<!-- COURSE PROGRESS -->
<div class="academic-card">
  <div class="academic-card-header">
    <h2 class="academic-card-title"><span class="academic-card-icon">📘</span>Course Progress</h2>
  </div>
  <div class="academic-course-list">
    <div class="academic-course-item">
      <div class="academic-course-header">
        <div class="academic-course-name">
          <span class="academic-course-code">ACU 301</span>
          Acupuncture Techniques
        </div>
        <div class="academic-course-grade">A-</div>
      </div>
      <div class="academic-course-progress">
        <div class="academic-progress-bar-container">
          <div class="academic-progress-bar-fill" style="width: 85%;"></div>
        </div>
        <div class="academic-progress-label">
          <span>17/20 modules complete</span>
          <span style="color: var(--academic-navy); font-weight: 700;">85%</span>
        </div>
      </div>
    </div>
    
    <div class="academic-course-item">
      <div class="academic-course-header">
        <div class="academic-course-name">
          <span class="academic-course-code">HERB 201</span>
          Chinese Herbology
        </div>
        <div class="academic-course-grade">B+</div>
      </div>
      <div class="academic-course-progress">
        <div class="academic-progress-bar-container">
          <div class="academic-progress-bar-fill" style="width: 65%;"></div>
        </div>
        <div class="academic-progress-label">
          <span>13/20 modules complete</span>
          <span style="color: var(--academic-navy); font-weight: 700;">65%</span>
        </div>
      </div>
    </div>
    
    <div class="academic-course-item">
      <div class="academic-course-header">
        <div class="academic-course-name">
          <span class="academic-course-code">DIAG 101</span>
          TCM Diagnosis
        </div>
        <div class="academic-course-grade">A</div>
      </div>
      <div class="academic-course-progress">
        <div class="academic-progress-bar-container">
          <div class="academic-progress-bar-fill" style="width: 92%;"></div>
        </div>
        <div class="academic-progress-label">
          <span>18/19 modules complete</span>
          <span style="color: var(--academic-navy); font-weight: 700;">92%</span>
        </div>
      </div>
    </div>
    
    <div class="academic-course-item">
      <div class="academic-course-header">
        <div class="academic-course-name">
          <span class="academic-course-code">QG 101</span>
          Qi Gong Practice
        </div>
        <div class="academic-course-grade">A</div>
      </div>
      <div class="academic-course-progress">
        <div class="academic-progress-bar-container">
          <div class="academic-progress-bar-fill" style="width: 78%;"></div>
        </div>
        <div class="academic-progress-label">
          <span>14/18 modules complete</span>
          <span style="color: var(--academic-navy); font-weight: 700;">78%</span>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- ASSIGNMENTS -->
<div class="academic-card">
  <div class="academic-card-header">
    <h2 class="academic-card-title"><span class="academic-card-icon">📋</span>Assignments</h2>
    <a href="obsidian://open?vault=kepano-obsidian&file=TaskNotes" class="academic-card-action">View All</a>
  </div>
  <div>
```dataviewjs
// Example assignment table - integrate with your TaskNotes
const assignments = [
  { title: "Final Project Presentation", course: "ACU 301", due: "Dec 15", status: "in-progress", urgency: "urgent" },
  { title: "Herb Identification Quiz", course: "HERB 201", due: "Dec 18", status: "not-started", urgency: "warning" },
  { title: "Diagnostic Case Study", course: "DIAG 101", due: "Dec 20", status: "in-progress", urgency: "safe" },
  { title: "Qi Gong Form Video", course: "QG 101", due: "Dec 22", status: "completed", urgency: "safe" },
  { title: "Research Paper Draft", course: "HERB 201", due: "Dec 14", status: "in-progress", urgency: "urgent" }
];

let tableHTML = `
<table class="academic-assignment-table">
  <thead>
    <tr>
      <th>Assignment</th>
      <th>Course</th>
      <th>Due Date</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
`;

for (let assignment of assignments) {
  tableHTML += `
    <tr class="${assignment.urgency}">
      <td class="academic-assignment-title">${assignment.title}</td>
      <td><span class="academic-assignment-course">${assignment.course}</span></td>
      <td>${assignment.due}</td>
      <td><span class="academic-status-badge ${assignment.status}">${assignment.status.replace('-', ' ').toUpperCase()}</span></td>
    </tr>
  `;
}

tableHTML += `
  </tbody>
</table>
`;

dv.paragraph(tableHTML);
```
  </div>
</div>

</div>

---

## 🎯 Quick Access

<div class="academic-quick-access">
  <a href="obsidian://open?vault=kepano-obsidian&file=Academic System/Categories/Acupuncture" class="academic-class-btn">
    <div class="academic-class-icon">💉</div>
    <div class="academic-class-name">Acupuncture</div>
  </a>
  <a href="obsidian://open?vault=kepano-obsidian&file=Academic System/Categories/Herbology" class="academic-class-btn">
    <div class="academic-class-icon">🌿</div>
    <div class="academic-class-name">Herbology</div>
  </a>
  <a href="obsidian://open?vault=kepano-obsidian&file=Academic System/Categories/Diagnosis" class="academic-class-btn">
    <div class="academic-class-icon">🔍</div>
    <div class="academic-class-name">Diagnosis</div>
  </a>
  <a href="obsidian://open?vault=kepano-obsidian&file=Academic System/Categories/Qi Gong" class="academic-class-btn">
    <div class="academic-class-icon">🧘</div>
    <div class="academic-class-name">Qi Gong</div>
  </a>
  <a href="obsidian://open?vault=kepano-obsidian&file=Academic System/Categories/Clinic" class="academic-class-btn">
    <div class="academic-class-icon">🏥</div>
    <div class="academic-class-name">Clinic</div>
  </a>
  <a href="obsidian://open?vault=kepano-obsidian&file=Academic System/Templates" class="academic-class-btn">
    <div class="academic-class-icon">📄</div>
    <div class="academic-class-name">Templates</div>
  </a>
  <a href="obsidian://open?vault=kepano-obsidian&file=Academic System/Documentation" class="academic-class-btn">
    <div class="academic-class-icon">📚</div>
    <div class="academic-class-name">Docs</div>
  </a>
  <a href="obsidian://advanced-uri?vault=kepano-obsidian&commandid=calendar%3Aopen-calendar-view" class="academic-class-btn">
    <div class="academic-class-icon">📅</div>
    <div class="academic-class-name">Calendar</div>
  </a>
</div>

---

<div class="dashboard-grid dashboard-grid-2col">

<!-- STUDY SESSIONS -->
<div class="academic-card">
  <div class="academic-card-header">
    <h2 class="academic-card-title"><span class="academic-card-icon">⏱️</span>Study Sessions</h2>
  </div>
  <div>
    <div class="academic-stats-grid" style="grid-template-columns: repeat(2, 1fr); margin-top: 0;">
      <div style="text-align: center; padding: 20px; background: var(--academic-bg-secondary); border-radius: 12px;">
        <div style="font-size: 2.5em; font-weight: 700; color: var(--academic-navy);">18h</div>
        <div style="font-size: 0.9em; color: var(--academic-text-secondary); margin-top: 8px;">This Week</div>
      </div>
      <div style="text-align: center; padding: 20px; background: var(--academic-bg-secondary); border-radius: 12px;">
        <div style="font-size: 2.5em; font-weight: 700; color: var(--academic-success);">20h</div>
        <div style="font-size: 0.9em; color: var(--academic-text-secondary); margin-top: 8px;">Weekly Goal</div>
      </div>
    </div>
    <div style="margin-top: 24px;">
```tracker
searchType: frontmatter
searchTarget: study-hours
folder: Daily
datasetName: Study Hours
startDate: 2025-12-01
endDate: 2025-12-31
bar:
    title: "📚 Weekly Study Hours"
    barColor: "#1e3a5f"
    showLegend: false
```
    </div>
  </div>
</div>

<!-- RESEARCH PIPELINE -->
<div class="academic-card">
  <div class="academic-card-header">
    <h2 class="academic-card-title"><span class="academic-card-icon">🔬</span>Research Pipeline</h2>
  </div>
  <div class="academic-pipeline">
    <div class="academic-pipeline-stage">
      <div class="academic-pipeline-icon">💡</div>
      <div class="academic-pipeline-count">12</div>
      <div class="academic-pipeline-label">Ideas</div>
    </div>
    <div class="academic-pipeline-stage">
      <div class="academic-pipeline-icon">📝</div>
      <div class="academic-pipeline-count">5</div>
      <div class="academic-pipeline-label">In Progress</div>
    </div>
    <div class="academic-pipeline-stage">
      <div class="academic-pipeline-icon">🔍</div>
      <div class="academic-pipeline-count">3</div>
      <div class="academic-pipeline-label">Under Review</div>
    </div>
    <div class="academic-pipeline-stage">
      <div class="academic-pipeline-icon">✅</div>
      <div class="academic-pipeline-count">8</div>
      <div class="academic-pipeline-label">Completed</div>
    </div>
  </div>
  <div style="margin-top: 24px; padding: 20px; background: linear-gradient(135deg, rgba(30, 58, 95, 0.05), rgba(107, 39, 55, 0.05)); border-radius: 12px;">
    <div style="font-size: 0.95em; color: var(--academic-text-secondary); margin-bottom: 12px;">🎯 Active Research Projects</div>
```dataviewjs
// Mock research projects - integrate with your vault
const projects = [
  { title: "Acupuncture Point Efficacy Study", status: "In Progress" },
  { title: "Herb Interaction Database", status: "Planning" },
  { title: "Case Study: Chronic Pain Management", status: "Data Collection" }
];

for (let project of projects) {
  dv.paragraph(`
<div style="display: flex; justify-content: space-between; padding: 12px; background: var(--academic-bg-card); border-left: 4px solid var(--academic-navy); border-radius: 8px; margin-bottom: 8px;">
  <span style="font-weight: 600;">[[${project.title}]]</span>
  <span style="color: var(--academic-text-muted); font-size: 0.9em;">${project.status}</span>
</div>
  `);
}
```
  </div>
</div>

</div>

---

## 📊 Performance Analytics

<div class="academic-stats-grid">
  <div class="academic-stat-card">
    <div class="academic-stat-icon-large">📚</div>
    <div class="academic-stat-number-large">245</div>
    <div class="academic-stat-description">Tasks Completed</div>
  </div>
  <div class="academic-stat-card">
    <div class="academic-stat-icon-large">🎯</div>
    <div class="academic-stat-number-large">92%</div>
    <div class="academic-stat-description">Assignment Rate</div>
  </div>
  <div class="academic-stat-card">
    <div class="academic-stat-icon-large">📖</div>
    <div class="academic-stat-number-large">18</div>
    <div class="academic-stat-description">Books Read</div>
  </div>
  <div class="academic-stat-card">
    <div class="academic-stat-icon-large">⏰</div>
    <div class="academic-stat-number-large">156h</div>
    <div class="academic-stat-description">Total Study Time</div>
  </div>
</div>

---

## 📝 Recent Class Notes

<div class="academic-notes-grid">
```dataviewjs
const recentNotes = dv.pages('"Academic System"')
  .where(p => !p.file.path.includes("Templates"))
  .sort(p => p.file.mtime, 'desc')
  .slice(0, 6);

for (let note of recentNotes) {
  const title = note.file.name;
  const folder = note.file.folder.split('/').pop();
  const date = note.file.mday ? note.file.mday.toFormat("MMM dd") : "";
  const tags = note.file.etags.slice(0, 3);
  
  dv.paragraph(`
<div class="academic-note-card">
  <div class="academic-note-title">[[${note.file.path}|${title}]]</div>
  <div class="academic-note-meta">
    <span>📁 ${folder}</span>
    ${date ? `<span>📅 ${date}</span>` : ''}
  </div>
  ${tags.length > 0 ? `<div class="academic-note-tags">${tags.map(t => `<span class="academic-note-tag">${t}</span>`).join('')}</div>` : ''}
</div>
  `);
}
```
</div>

---

## 📚 Library & Resources

<div class="dashboard-grid dashboard-grid-3col">
  <div class="academic-card">
    <div class="academic-card-header">
      <h3 class="academic-card-title" style="font-size: 1.2em;"><span class="academic-card-icon">📖</span>Reading Queue</h3>
    </div>
    <div>
```dataviewjs
const books = [
  { title: "The Web That Has No Weaver", status: "45%" },
  { title: "Between Heaven and Earth", status: "Reading" },
  { title: "Qi Gong: The Secret of Youth", status: "Completed" }
];

for (let book of books) {
  dv.paragraph(`
<div style="padding: 12px; background: var(--academic-bg-secondary); border-radius: 8px; margin-bottom: 8px;">
  <div style="font-weight: 600; margin-bottom: 4px;">📚 ${book.title}</div>
  <div style="font-size: 0.85em; color: var(--academic-text-muted);">${book.status}</div>
</div>
  `);
}
```
    </div>
  </div>
  
  <div class="academic-card">
    <div class="academic-card-header">
      <h3 class="academic-card-title" style="font-size: 1.2em;"><span class="academic-card-icon">🔗</span>Quick Links</h3>
    </div>
    <div style="display: flex; flex-direction: column; gap: 8px;">
      <a href="https://www.ncbi.nlm.nih.gov/" style="padding: 12px; background: var(--academic-bg-secondary); border-radius: 8px; text-decoration: none; color: var(--academic-text-primary); font-weight: 500; border-left: 4px solid var(--academic-navy);">🔬 PubMed</a>
      <a href="https://scholar.google.com/" style="padding: 12px; background: var(--academic-bg-secondary); border-radius: 8px; text-decoration: none; color: var(--academic-text-primary); font-weight: 500; border-left: 4px solid var(--academic-navy);">📚 Google Scholar</a>
      <a href="obsidian://open?vault=kepano-obsidian&file=Academic System/Documentation" style="padding: 12px; background: var(--academic-bg-secondary); border-radius: 8px; text-decoration: none; color: var(--academic-text-primary); font-weight: 500; border-left: 4px solid var(--academic-navy);">📖 Study Guides</a>
      <a href="obsidian://open?vault=kepano-obsidian&file=Academic System/Examples" style="padding: 12px; background: var(--academic-bg-secondary); border-radius: 8px; text-decoration: none; color: var(--academic-text-primary); font-weight: 500; border-left: 4px solid var(--academic-navy);">💡 Examples</a>
    </div>
  </div>
  
  <div class="academic-card">
    <div class="academic-card-header">
      <h3 class="academic-card-title" style="font-size: 1.2em;"><span class="academic-card-icon">🗂️</span>Recent Files</h3>
    </div>
    <div>
```dataviewjs
const recentFiles = dv.pages()
  .where(p => p.file.path.includes("Academic System"))
  .sort(p => p.file.mtime, 'desc')
  .slice(0, 5);

for (let file of recentFiles) {
  const name = file.file.name.length > 30 ? file.file.name.substring(0, 30) + '...' : file.file.name;
  dv.paragraph(`
<div style="padding: 8px; border-bottom: 1px solid var(--academic-border);">
  <div style="font-size: 0.9em;">[[${file.file.path}|${name}]]</div>
  <div style="font-size: 0.75em; color: var(--academic-text-muted); margin-top: 4px;">${file.file.mday ? file.file.mday.toFormat("MMM dd, HH:mm") : ''}</div>
</div>
  `);
}
```
    </div>
  </div>
</div>

---

<div style="text-align: center; margin: 40px 0; padding: 30px; background: linear-gradient(135deg, rgba(30, 58, 95, 0.05), rgba(107, 39, 55, 0.05)); border-radius: 16px; border: 2px solid var(--academic-border);">
  <div style="font-size: 1.5em; margin-bottom: 12px;">🎓</div>
  <div style="color: var(--academic-navy); font-size: 1.1em; font-weight: 600; margin-bottom: 8px;">
    Academic Excellence in Progress
  </div>
  <div style="color: var(--academic-text-muted); font-size: 0.9em;">
    Last updated: `$= dv.date('today').toFormat("MMMM dd, yyyy • HH:mm")`
  </div>
</div>
