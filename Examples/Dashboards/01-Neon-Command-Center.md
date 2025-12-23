---
cssclasses:
  - neon-dashboard
  - dashboard
banner: "![[Pasted image 20251210175116.png]]"
banner_y: 0.5
---

<div class="neon-banner">
  <div class="neon-banner-content">
    <h1 class="neon-banner-title">⚡ COMMAND CENTER ⚡</h1>
    <div class="neon-banner-stats">
      <div class="neon-stat">
        <div class="neon-stat-value">`$= dv.pages().length`</div>
        <div class="neon-stat-label">📊 Notes</div>
      </div>
      <div class="neon-stat">
        <div class="neon-stat-value">`$= dv.pages().where(p => p.file.cday.hasSame(dv.date('today'), 'day')).length`</div>
        <div class="neon-stat-label">⚡ Today</div>
      </div>
      <div class="neon-stat">
        <div class="neon-stat-value">23</div>
        <div class="neon-stat-label">🔥 Streak</div>
      </div>
      <div class="neon-stat">
        <div class="neon-stat-value">87%</div>
        <div class="neon-stat-label">🎯 Goals</div>
      </div>
    </div>
  </div>
</div>

---

<div class="dashboard-grid dashboard-grid-3col">

<!-- QUICK ACTIONS -->
<div class="neon-card">
  <div class="neon-card-header">
    <h2 class="neon-card-title"><span class="neon-card-icon">🚀</span>QUICK ACTIONS</h2>
  </div>
  <div class="neon-quick-actions">
    <a href="obsidian://advanced-uri?vault=kepano-obsidian&daily=true" class="neon-action-btn">
      <div class="neon-action-icon">📅</div>
      <div class="neon-action-label">Daily</div>
    </a>
    <a href="obsidian://new" class="neon-action-btn">
      <div class="neon-action-icon">📝</div>
      <div class="neon-action-label">New Note</div>
    </a>
    <a href="obsidian://search" class="neon-action-btn">
      <div class="neon-action-icon">🔍</div>
      <div class="neon-action-label">Search</div>
    </a>
    <a href="obsidian://open?vault=kepano-obsidian&file=Categories/Books" class="neon-action-btn">
      <div class="neon-action-icon">📚</div>
      <div class="neon-action-label">Reading</div>
    </a>
    <a href="obsidian://advanced-uri?vault=kepano-obsidian&commandid=calendar%3Aopen-calendar-view" class="neon-action-btn">
      <div class="neon-action-icon">🗓️</div>
      <div class="neon-action-label">Calendar</div>
    </a>
    <a href="obsidian://open?vault=kepano-obsidian&file=Categories/Projects" class="neon-action-btn">
      <div class="neon-action-icon">💼</div>
      <div class="neon-action-label">Projects</div>
    </a>
  </div>
</div>

+
<!-- TODAY'S TASKS -->
<div class="neon-card">
  <div class="neon-card-header">
    <h2 class="neon-card-title"><span class="neon-card-icon">✅</span>TASKS TODAY</h2>
  </div>
  <div class="neon-kanban-column">
```dataviewjs
const today = dv.date('today');
const tasks = dv.pages().file.tasks
  .where(t => !t.completed && t.due)
  .where(t => {
    const due = dv.date(t.due);
    return due && due.hasSame(today, 'day');
  })
  .sort(t => t.due, 'asc');

if (tasks.length === 0) {
  dv.paragraph("🎉 No tasks due today! You're all caught up!");
} else {
  for (let task of tasks.slice(0, 8)) {
    const isUrgent = task.priority === "high" || task.text.includes("⚠️") || task.text.includes("🔴");
    const className = isUrgent ? "neon-task-item neon-task-urgent" : "neon-task-item";
    dv.paragraph(`<div class="${className}">${task.text}</div>`);
  }
}
```
+
  </div>
</div>

<!-- HABIT TRACKER -->
<div class="neon-card">
  <div class="neon-card-header">
    <h2 class="neon-card-title"><span class="neon-card-icon">🎯</span>HABIT TRACKER</h2>
  </div>
  <div style="margin: 16px 0;">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
      <span style="color: var(--neon-text-secondary);">🧘 Meditation</span>
      <span style="color: var(--neon-cyan); font-weight: 700;">8/10 days</span>
    </div>
    <div class="neon-habit-grid" style="grid-template-columns: repeat(10, 1fr);">
      <div class="neon-habit-cell completed">✓</div>
      <div class="neon-habit-cell completed">✓</div>
      <div class="neon-habit-cell missed">✗</div>
      <div class="neon-habit-cell completed">✓</div>
      <div class="neon-habit-cell completed">✓</div>
      <div class="neon-habit-cell completed">✓</div>
      <div class="neon-habit-cell completed">✓</div>
      <div class="neon-habit-cell missed">✗</div>
      <div class="neon-habit-cell completed">✓</div>
      <div class="neon-habit-cell completed">✓</div>
    </div>
  </div>
  <div style="margin: 16px 0;">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
      <span style="color: var(--neon-text-secondary);">💪 Exercise</span>
      <span style="color: var(--neon-cyan); font-weight: 700;">7/10 days</span>
    </div>
    <div class="neon-habit-grid" style="grid-template-columns: repeat(10, 1fr);">
      <div class="neon-habit-cell completed">✓</div>
      <div class="neon-habit-cell completed">✓</div>
      <div class="neon-habit-cell completed">✓</div>
      <div class="neon-habit-cell missed">✗</div>
      <div class="neon-habit-cell completed">✓</div>
      <div class="neon-habit-cell missed">✗</div>
      <div class="neon-habit-cell completed">✓</div>
      <div class="neon-habit-cell completed">✓</div>
      <div class="neon-habit-cell completed">✓</div>
      <div class="neon-habit-cell missed">✗</div>
    </div>
  </div>
  <div style="margin: 16px 0;">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
      <span style="color: var(--neon-text-secondary);">📖 Reading</span>
      <span style="color: var(--neon-cyan); font-weight: 700;">9/10 days</span>
    </div>
    <div class="neon-habit-grid" style="grid-template-columns: repeat(10, 1fr);">
      <div class="neon-habit-cell completed">✓</div>
      <div class="neon-habit-cell completed">✓</div>
      <div class="neon-habit-cell completed">✓</div>
      <div class="neon-habit-cell completed">✓</div>
      <div class="neon-habit-cell completed">✓</div>
      <div class="neon-habit-cell completed">✓</div>
      <div class="neon-habit-cell missed">✗</div>
      <div class="neon-habit-cell completed">✓</div>
      <div class="neon-habit-cell completed">✓</div>
      <div class="neon-habit-cell completed">✓</div>
    </div>
  </div>
</div>

</div>

---

## 📊 PROGRESS DASHBOARD

<div class="dashboard-grid dashboard-grid-4col" style="margin: 30px 0;">
  <div class="neon-stat-card">
    <div class="neon-stat-card-content">
      <div class="neon-stat-number">87%</div>
      <div class="neon-stat-text">Life Goals</div>
    </div>
  </div>
  <div class="neon-stat-card">
    <div class="neon-stat-card-content">
      <div class="neon-stat-number">12</div>
      <div class="neon-stat-text">Active Projects</div>
    </div>
  </div>
  <div class="neon-stat-card">
    <div class="neon-stat-card-content">
      <div class="neon-stat-number">245</div>
      <div class="neon-stat-text">Tasks Done</div>
    </div>
  </div>
  <div class="neon-stat-card">
    <div class="neon-stat-card-content">
      <div class="neon-stat-number">18h</div>
      <div class="neon-stat-text">Study Time</div>
    </div>
  </div>
</div>

### 🎯 Goal Progress

<div class="neon-progress-container neon-progress-high">
  <div class="neon-progress-label">
    <span>🏠 Life Goals</span>
    <span style="color: var(--neon-cyan); font-weight: 700;">87%</span>
  </div>
  <div class="neon-progress-bar">
    <div class="neon-progress-fill" style="width: 87%;"></div>
  </div>
</div>

<div class="neon-progress-container neon-progress-medium">
  <div class="neon-progress-label">
    <span>💼 Work Projects</span>
    <span style="color: var(--neon-cyan); font-weight: 700;">64%</span>
  </div>
  <div class="neon-progress-bar">
    <div class="neon-progress-fill" style="width: 64%;"></div>
  </div>
</div>

<div class="neon-progress-container neon-progress-high">
  <div class="neon-progress-label">
    <span>🎓 Study Goals</span>
    <span style="color: var(--neon-cyan); font-weight: 700;">78%</span>
  </div>
  <div class="neon-progress-bar">
    <div class="neon-progress-fill" style="width: 78%;"></div>
  </div>
</div>

<div class="neon-progress-container neon-progress-complete">
  <div class="neon-progress-label">
    <span>💪 Health Goals</span>
    <span style="color: var(--neon-cyan); font-weight: 700;">100%</span>
  </div>
  <div class="neon-progress-bar">
    <div class="neon-progress-fill" style="width: 100%;"></div>
  </div>
</div>

---

<div class="dashboard-grid dashboard-grid-2col">

<!-- RECENT NOTES -->
<div class="neon-card">
  <div class="neon-card-header">
    <h2 class="neon-card-title"><span class="neon-card-icon">📝</span>RECENT NOTES</h2>
  </div>
  <div class="neon-zettel-grid" style="grid-template-columns: 1fr;">
```dataviewjs
const recentNotes = dv.pages()
  .where(p => !p.file.path.includes("Templates") && !p.file.path.includes(".obsidian"))
  .sort(p => p.file.mtime, 'desc')
  .slice(0, 6);

for (let note of recentNotes) {
  const title = note.file.name;
  const date = note.file.mday.toFormat("MMM dd");
  const folder = note.file.folder;
  const tags = note.file.etags.slice(0, 3);
  
  dv.paragraph(`
<div class="neon-zettel-card">
  <div class="neon-zettel-content">
    <div class="neon-zettel-title">[[${note.file.path}|${title}]]</div>
    <div style="color: var(--neon-text-muted); font-size: 0.85em; margin-top: 4px;">
      📁 ${folder} • 📅 ${date}
    </div>
    ${tags.length > 0 ? `<div class="neon-zettel-meta">${tags.map(t => `<span class="neon-zettel-tag">${t}</span>`).join('')}</div>` : ''}
  </div>
</div>
  `);
}
```
  </div>
</div>

<!-- UPCOMING EVENTS -->
<div class="neon-card">
  <div class="neon-card-header">
    <h2 class="neon-card-title"><span class="neon-card-icon">📅</span>UPCOMING EVENTS</h2>
  </div>
  <div class="neon-timeline">
```dataviewjs
// Mock upcoming events - replace with your actual event pages
const events = [
  { title: "📚 Book Club Meeting", date: "Dec 12", time: "7:00 PM", priority: "normal" },
  { title: "🏋️ Gym Session", date: "Dec 13", time: "6:30 AM", priority: "normal" },
  { title: "💼 Team Standup", date: "Dec 13", time: "10:00 AM", priority: "high" },
  { title: "🍽️ Dinner with Friends", date: "Dec 14", time: "7:30 PM", priority: "normal" },
  { title: "🎯 Project Deadline", date: "Dec 15", time: "5:00 PM", priority: "urgent" }
];

for (let event of events) {
  const urgentClass = event.priority === "urgent" ? " neon-task-urgent" : "";
  dv.paragraph(`
<div class="neon-timeline-item${urgentClass}">
  <div style="font-weight: 700; color: var(--neon-cyan); margin-bottom: 4px;">${event.title}</div>
  <div style="color: var(--neon-text-secondary); font-size: 0.9em;">
    📅 ${event.date} • ⏰ ${event.time}
  </div>
</div>
  `);
}
```
  </div>
</div>

</div>

---

## 📈 ANALYTICS & INSIGHTS

```tracker
searchType: frontmatter
searchTarget: mood
folder: Daily
datasetName: Mood Tracking
startDate: 2025-12-01
endDate: 2025-12-31
line:
    title: "📊 Mood Trend This Month"
    lineColor: "#00f6ff"
    showLegend: false
    fillGap: true
```

<div class="dashboard-grid dashboard-grid-2col" style="margin-top: 30px;">

<div class="neon-card neon-hologram">
  <div class="neon-card-header">
    <h3 class="neon-card-title"><span class="neon-card-icon">🎯</span>WEEKLY STATS</h3>
  </div>
  <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-top: 16px;">
    <div style="text-align: center;">
      <div style="font-size: 2em; color: var(--neon-cyan); font-weight: 700;">42</div>
      <div style="color: var(--neon-text-secondary); font-size: 0.85em;">Notes Created</div>
    </div>
    <div style="text-align: center;">
      <div style="font-size: 2em; color: var(--neon-magenta); font-weight: 700;">28</div>
      <div style="color: var(--neon-text-secondary); font-size: 0.85em;">Tasks Completed</div>
    </div>
    <div style="text-align: center;">
      <div style="font-size: 2em; color: var(--neon-green); font-weight: 700;">15h</div>
      <div style="color: var(--neon-text-secondary); font-size: 0.85em;">Study Hours</div>
    </div>
    <div style="text-align: center;">
      <div style="font-size: 2em; color: var(--neon-yellow); font-weight: 700;">5</div>
      <div style="color: var(--neon-text-secondary); font-size: 0.85em;">Days Streak</div>
    </div>
  </div>
</div>

<div class="neon-card neon-hologram">
  <div class="neon-card-header">
    <h3 class="neon-card-title"><span class="neon-card-icon">🔥</span>ACTIVITY HEATMAP</h3>
  </div>
  <div style="margin-top: 16px;">
  +
```dataviewjs
// Simple activity visualization - 7 days
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const activities = [8, 12, 15, 10, 18, 6, 14]; // Example activity counts

let html = '<div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 8px;">';
for (let i = 0; i < 7; i++) {
  const intensity = Math.min(activities[i] / 20, 1);
  const opacity = 0.2 + (intensity * 0.8);
  html += `
    <div style="text-align: center;">
      <div style="background: rgba(0, 246, 255, ${opacity}); border: 1px solid var(--neon-cyan); border-radius: 8px; padding: 20px 8px; margin-bottom: 8px; font-weight: 700; color: var(--neon-cyan);">
        ${activities[i]}
      </div>
      <div style="font-size: 0.8em; color: var(--neon-text-secondary);">${days[i]}</div>
    </div>
  `;
}
html += '</div>';
dv.paragraph(html);
```
+
  </div>
</div>

</div>

---

## 🎮 QUICK ACCESS

<div class="dashboard-grid dashboard-grid-4col">
  <a href="obsidian://open?vault=kepano-obsidian&file=Categories/Categories" class="neon-action-btn">
    <div class="neon-action-icon">📂</div>
    <div class="neon-action-label">Categories</div>
  </a>
  <a href="obsidian://open?vault=kepano-obsidian&file=Daily" class="neon-action-btn">
    <div class="neon-action-icon">📆</div>
    <div class="neon-action-label">Daily Notes</div>
  </a>
  <a href="obsidian://open?vault=kepano-obsidian&file=Categories/People" class="neon-action-btn">
    <div class="neon-action-icon">👥</div>
    <div class="neon-action-label">People</div>
  </a>
  <a href="obsidian://open?vault=kepano-obsidian&file=Categories/Projects" class="neon-action-btn">
    <div class="neon-action-icon">🚀</div>
    <div class="neon-action-label">Projects</div>
  </a>
</div>

---

<div style="text-align: center; margin: 40px 0; padding: 20px; border-top: 2px solid rgba(0, 246, 255, 0.3);">
  <div style="color: var(--neon-text-secondary); font-size: 0.9em;">
    ⚡ <span style="color: var(--neon-cyan);">NEON COMMAND CENTER</span> ⚡
  </div>
  <div style="color: var(--neon-text-muted); font-size: 0.8em; margin-top: 8px;">
    Last updated: `$= dv.date('today').toFormat("MMMM dd, yyyy")`
  </div>
</div>
