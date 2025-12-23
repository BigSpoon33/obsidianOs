---
cssclasses:
  - zen-dashboard
  - dashboard
banner: "![[Pasted image 20251210175116.png]]"
banner_y: 0.72
---

<div class="zen-header">
  <div class="zen-enso"></div>
  <div class="zen-header-content">
    <h1 class="zen-title">🌸 Zen Garden 🌸</h1>
    <p class="zen-subtitle">"Cultivate mindful growth"</p>
  </div>
</div>

<div style="text-align: center; margin-top: -30px; margin-bottom: 20px;">

```dataviewjs
dv.paragraph(`<p class="zen-date" style="color: var(--zen-text-secondary); font-size: 0.95em;">${dv.date('today').toFormat("MMMM dd, yyyy")}</p>`);
```

</div>

---

## 🙏 Daily Intention

<div class="zen-intention">
  <p class="zen-intention-quote">"What am I grateful for today?"</p>
  <textarea class="zen-intention-input" placeholder="Write your intention for the day..."></textarea>
</div>

---

<div class="dashboard-grid dashboard-grid-3col">

<!-- MINDFULNESS -->
<div class="zen-card">
  <div class="zen-card-header">
    <h2 class="zen-card-title"><span class="zen-card-icon">🧘</span>Mindfulness</h2>
  </div>
  <div class="zen-timer">
    <div class="zen-timer-display">
      <div class="zen-timer-time">20:00</div>
    </div>
    <div class="zen-timer-controls">
      <button class="zen-timer-btn">▶️ Start</button>
      <button class="zen-timer-btn">⏸️ Pause</button>
    </div>
    <div style="margin-top: 16px; text-align: center;">
      <div style="color: var(--zen-text-secondary); font-size: 0.9em; margin-bottom: 8px;">Sessions this week</div>
      <div style="display: flex; gap: 8px; justify-content: center;">
        <div style="width: 12px; height: 40px; background: var(--zen-sage); border-radius: 4px;"></div>
        <div style="width: 12px; height: 50px; background: var(--zen-sage); border-radius: 4px;"></div>
        <div style="width: 12px; height: 30px; background: var(--zen-sage); border-radius: 4px;"></div>
        <div style="width: 12px; height: 45px; background: var(--zen-sage); border-radius: 4px;"></div>
        <div style="width: 12px; height: 60px; background: var(--zen-bamboo); border-radius: 4px;"></div>
        <div style="width: 12px; height: 20px; background: var(--zen-bg-tertiary); border-radius: 4px;"></div>
        <div style="width: 12px; height: 20px; background: var(--zen-bg-tertiary); border-radius: 4px;"></div>
      </div>
    </div>
  </div>
</div>

<!-- JOURNALING -->
<div class="zen-card">
  <div class="zen-card-header">
    <h2 class="zen-card-title"><span class="zen-card-icon">📔</span>Journaling</h2>
  </div>
  <div>
    <div style="margin-bottom: 20px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
        <span style="color: var(--zen-text-secondary); font-size: 0.95em;">Daily Entry</span>
        <a href="obsidian://advanced-uri?vault=kepano-obsidian&daily=true" style="padding: 8px 16px; background: var(--zen-sage); color: white; border-radius: 20px; text-decoration: none; font-size: 0.9em;">✍️ Write</a>
      </div>
    </div>
  </div>
</div>

</div>

<div class="dashboard-grid dashboard-grid-3col" style="margin-top: -20px;">

<div style="grid-column: 2; background: var(--zen-bg-secondary); border-left: 4px solid var(--zen-sage); border-radius: 8px; padding: 16px; margin: 0 20px;">

```dataviewjs
const today = dv.date('today');
const todayNote = dv.pages().where(p => p.file.day && p.file.day.hasSame(today, 'day')).first();

if (todayNote) {
  const wordCount = todayNote.file.size || 0;
  dv.paragraph(`<div style="color: var(--zen-text-primary); font-size: 0.95em;">📝 ${Math.floor(wordCount / 6)} words written</div>`);
} else {
  dv.paragraph(`<div style="color: var(--zen-text-muted); font-size: 0.95em; font-style: italic;">No entry yet for today</div>`);
}
```

</div>

<div class="zen-card" style="grid-column: 2; margin-top: 20px;">
  <div style="padding: 20px;">
    <div style="color: var(--zen-text-secondary); font-size: 0.9em; margin-bottom: 12px;">Mood Tracking</div>
    <div style="display: flex; justify-content: space-around; padding: 16px; background: var(--zen-bg-secondary); border-radius: 12px;">
      <div style="text-align: center; cursor: pointer;">
        <div style="font-size: 2em; margin-bottom: 4px;">😊</div>
        <div style="font-size: 0.8em; color: var(--zen-text-muted);">Great</div>
      </div>
      <div style="text-align: center; cursor: pointer;">
        <div style="font-size: 2em; margin-bottom: 4px;">🙂</div>
        <div style="font-size: 0.8em; color: var(--zen-text-muted);">Good</div>
      </div>
      <div style="text-align: center; cursor: pointer;">
        <div style="font-size: 2em; margin-bottom: 4px;">😐</div>
        <div style="font-size: 0.8em; color: var(--zen-text-muted);">Okay</div>
      </div>
      <div style="text-align: center; cursor: pointer;">
        <div style="font-size: 2em; margin-bottom: 4px;">😔</div>
        <div style="font-size: 0.8em; color: var(--zen-text-muted);">Sad</div>
      </div>
    </div>
  </div>
</div>

<!-- LEARNING -->
<div class="zen-card">
  <div class="zen-card-header">
    <h2 class="zen-card-title"><span class="zen-card-icon">📚</span>Learning</h2>
  </div>
  <div>
    <div style="margin-bottom: 24px;">
      <div style="color: var(--zen-text-secondary); font-size: 0.9em; margin-bottom: 12px;">Currently Reading</div>
      <div class="zen-reading-card">
        <div class="zen-reading-cover">📖</div>
        <div class="zen-reading-info">
          <div class="zen-reading-title">[[Qi Gong The Secret of Youth]]</div>
          <div class="zen-reading-author">Ancient Wisdom</div>
          <div class="zen-reading-progress">
            <div class="zen-reading-progress-fill" style="width: 45%;"></div>
          </div>
          <div class="zen-reading-percent">45% complete</div>
        </div>
      </div>
    </div>
    <div>
      <div style="color: var(--zen-text-secondary); font-size: 0.9em; margin-bottom: 12px;">Study Streak</div>
      <div style="display: flex; align-items: center; gap: 16px; padding: 16px; background: linear-gradient(135deg, rgba(156, 175, 136, 0.1), rgba(123, 160, 91, 0.1)); border-radius: 12px;">
        <div style="font-size: 3em;">🔥</div>
        <div>
          <div style="font-size: 2em; font-weight: 700; color: var(--zen-sage); line-height: 1;">15</div>
          <div style="font-size: 0.9em; color: var(--zen-text-secondary);">days streak</div>
        </div>
      </div>
    </div>
  </div>
</div>

</div>

---

## 🎴 Spaced Repetition Review

<div style="margin: 24px 0;">
  <div style="text-align: center; margin-bottom: 24px;">
    <span style="color: var(--zen-text-secondary); font-size: 0.95em;">Hover to reveal answers</span>
  </div>
  <div class="zen-cards-grid">
    <div class="zen-flip-card">
      <div class="zen-flip-card-inner">
        <div class="zen-flip-card-front">
          <div class="zen-flip-card-icon">☯️</div>
          <div class="zen-flip-card-title">What is Qi?</div>
        </div>
        <div class="zen-flip-card-back">
          <div class="zen-flip-card-content">
            Vital energy or life force that flows through all living things
          </div>
        </div>
      </div>
    </div>
    
    <div class="zen-flip-card">
      <div class="zen-flip-card-inner">
        <div class="zen-flip-card-front">
          <div class="zen-flip-card-icon">🌿</div>
          <div class="zen-flip-card-title">Five Elements</div>
        </div>
        <div class="zen-flip-card-back">
          <div class="zen-flip-card-content">
            Wood, Fire, Earth, Metal, Water
          </div>
        </div>
      </div>
    </div>
    
    <div class="zen-flip-card">
      <div class="zen-flip-card-inner">
        <div class="zen-flip-card-front">
          <div class="zen-flip-card-icon">📖</div>
          <div class="zen-flip-card-title">Mindfulness</div>
        </div>
        <div class="zen-flip-card-back">
          <div class="zen-flip-card-content">
            Present moment awareness without judgment
          </div>
        </div>
      </div>
    </div>
    
    <div class="zen-flip-card">
      <div class="zen-flip-card-inner">
        <div class="zen-flip-card-front">
          <div class="zen-flip-card-icon">✨</div>
          <div class="zen-flip-card-title">Meditation</div>
        </div>
        <div class="zen-flip-card-back">
          <div class="zen-flip-card-content">
            Practice of focusing mind to achieve clarity and calm
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

---

<div class="dashboard-grid dashboard-grid-2col">

<!-- GENTLE TASKS -->
<div class="zen-card">
  <div class="zen-card-header">
    <h2 class="zen-card-title"><span class="zen-card-icon">✓</span>Gentle Tasks</h2>
  </div>
  <div class="zen-task-list">

```dataviewjs
const tasks = dv.pages().file.tasks
  .where(t => !t.completed)
  .sort(t => t.due, 'asc')
  .slice(0, 6);

if (tasks.length === 0) {
  dv.paragraph(`<div style="text-align: center; padding: 40px; color: var(--zen-text-muted); font-style: italic;">🌸 No pending tasks. Enjoy your peace!</div>`);
} else {
  for (let task of tasks) {
    const dueDate = task.due ? dv.date(task.due).toFormat("MMM dd") : "";
    dv.paragraph(`
<div class="zen-task-item">
  <div class="zen-task-text">${task.text}</div>
  ${dueDate ? `<div class="zen-task-meta"><span>📅 ${dueDate}</span></div>` : ''}
</div>
    `);
  }
}
```

  </div>
</div>

<!-- REFLECTIONS -->
<div class="zen-card">
  <div class="zen-card-header">
    <h2 class="zen-card-title"><span class="zen-card-icon">💭</span>Reflections</h2>
  </div>
  <div>

```dataviewjs
const recentJournals = dv.pages('"Daily"')
  .where(p => p.file.day)
  .sort(p => p.file.day, 'desc')
  .slice(0, 4);

if (recentJournals.length === 0) {
  dv.paragraph(`<div style="text-align: center; padding: 40px; color: var(--zen-text-muted); font-style: italic;">No recent journal entries</div>`);
} else {
  for (let entry of recentJournals) {
    const date = entry.file.day.toFormat("MMM dd, yyyy");
    const preview = entry.file.name;
    const link = entry.file.link;
    
    dv.paragraph(`
<div class="zen-journal-entry">
  <div class="zen-journal-date">${date}</div>
  <div class="zen-journal-content">${link}</div>
</div>
    `);
  }
}
```

  </div>
</div>

</div>

---

## 🌱 Growth Tracker

<div class="zen-card">
  <div style="text-align: center; margin-bottom: 24px;">
    <p style="color: var(--zen-text-secondary); font-size: 1.1em; font-style: italic;">
      "Progress is not linear, but every step forward is growth"
    </p>
  </div>
  <div class="zen-growth-tracker">
    <div class="zen-growth-stage active">
      <div class="zen-growth-icon">🌱</div>
      <div class="zen-growth-label">Seed</div>
    </div>
    <div class="zen-growth-stage active">
      <div class="zen-growth-icon">🌿</div>
      <div class="zen-growth-label">Sprout</div>
    </div>
    <div class="zen-growth-stage active">
      <div class="zen-growth-icon">🪴</div>
      <div class="zen-growth-label">Growing</div>
    </div>
    <div class="zen-growth-stage active">
      <div class="zen-growth-icon">🌳</div>
      <div class="zen-growth-label">Flourish</div>
    </div>
    <div class="zen-growth-stage">
      <div class="zen-growth-icon">🌸</div>
      <div class="zen-growth-label">Blossom</div>
    </div>
  </div>
  <div style="margin-top: 32px; padding: 24px; background: var(--zen-bg-secondary); border-radius: 12px;">
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 24px; text-align: center;">
      <div>
        <div style="font-size: 2em; color: var(--zen-sage); font-weight: 700;">87%</div>
        <div style="font-size: 0.9em; color: var(--zen-text-secondary); margin-top: 4px;">Life Balance</div>
      </div>
      <div>
        <div style="font-size: 2em; color: var(--zen-bamboo); font-weight: 700;">24</div>
        <div style="font-size: 0.9em; color: var(--zen-text-secondary); margin-top: 4px;">Habits Built</div>
      </div>
      <div>
        <div style="font-size: 2em; color: var(--zen-lotus); font-weight: 700;">156</div>
        <div style="font-size: 0.9em; color: var(--zen-text-secondary); margin-top: 4px;">Days Logged</div>
      </div>
      <div>
        <div style="font-size: 2em; color: var(--zen-rose); font-weight: 700;">12</div>
        <div style="font-size: 0.9em; color: var(--zen-text-secondary); margin-top: 4px;">Books Read</div>
      </div>
    </div>
  </div>
</div>

---

## 📊 Mindfulness Analytics

```tracker
searchType: frontmatter
searchTarget: meditation-minutes
folder: Daily
datasetName: Meditation Practice
startDate: 2025-12-01
endDate: 2025-12-31
bar:
    title: "🧘 Daily Meditation (Minutes)"
    barColor: "#9caf88"
    showLegend: false
```

---

## 🎯 Weekly Mood Overview

<div class="zen-card">
  <div style="margin-bottom: 24px;">
    <div style="color: var(--zen-text-secondary); text-align: center; margin-bottom: 16px;">How are you feeling this week?</div>
  </div>
  <div class="zen-mood-grid" style="grid-template-columns: repeat(7, 1fr);">
    <div class="zen-mood-cell zen-mood-great" data-date="Mon">😊</div>
    <div class="zen-mood-cell zen-mood-good" data-date="Tue">🙂</div>
    <div class="zen-mood-cell zen-mood-great" data-date="Wed">😊</div>
    <div class="zen-mood-cell zen-mood-neutral" data-date="Thu">😐</div>
    <div class="zen-mood-cell zen-mood-good" data-date="Fri">🙂</div>
    <div class="zen-mood-cell zen-mood-great" data-date="Sat">😊</div>
    <div class="zen-mood-cell zen-mood-good" data-date="Sun">🙂</div>
  </div>
  <div style="margin-top: 32px; padding: 20px; background: linear-gradient(135deg, rgba(156, 175, 136, 0.1), rgba(123, 160, 91, 0.05)); border-radius: 12px; text-align: center;">
    <div style="font-size: 1.2em; color: var(--zen-sage); font-weight: 600; margin-bottom: 8px;">Overall: Positive ✨</div>
    <div style="font-size: 0.9em; color: var(--zen-text-secondary);">Your emotional well-being is trending upward</div>
  </div>
</div>

---

<div style="text-align: center; margin: 60px 0 20px; padding: 40px 20px; background: linear-gradient(135deg, rgba(156, 175, 136, 0.1), transparent); border-radius: 20px;">
  <div style="font-size: 1.8em; margin-bottom: 16px;">🌸</div>
  <div style="color: var(--zen-sage); font-size: 1.2em; font-weight: 300; font-style: italic; margin-bottom: 8px;">
    "Be present. Be patient. Be peaceful."
  </div>
  <div style="color: var(--zen-text-muted); font-size: 0.9em; margin-top: 16px;">

```dataviewjs
dv.paragraph(`Last updated: ${dv.date('today').toFormat("MMMM dd, yyyy")}`);
```

  </div>
</div>
