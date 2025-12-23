---
cssclasses:
  - dashboard
banner: "![[Pasted image 20251210175116.png]]"
banner_x: 0.5
banner_y: 0.716
---

<div style="text-align: center; padding: 30px 0 20px 0;">
  <h1 style="font-size: 3em; margin: 0; letter-spacing: 3px;">🏡 HOME 🏡</h1>
  <p style="color: var(--text-muted); font-size: 1.2em; margin-top: 10px;">Your Personal Knowledge Management Hub</p>
</div>

```dataviewjs
dv.paragraph(`<p style="text-align: center; color: var(--text-muted); font-size: 1em; margin-bottom: 20px;">${dv.date('today').toFormat("EEEE, MMMM dd, yyyy")}</p>`);
```

---

## 🎯 Quick Access Dashboards

<a href="Academic System/Examples/Academic Dashboard" class="internal-link" style="background: rgba(255,255,255,0.2); padding: 8px 16px; border-radius: 20px; text-decoration: none; color: white; display: inline-block;"> View Dashboard → </a>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin: 30px 0;">

<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px; padding: 25px; color: white; box-shadow: 0 4px 6px rgba(0,0,0,0.2);">
  <div style="font-size: 2.5em; margin-bottom: 10px;">🎓</div>
  <h3 style="margin: 0 0 10px 0;">Academic</h3>
  <p style="opacity: 0.9; font-size: 0.9em; margin-bottom: 15px;">Classes, assignments & grades</p>
  <a href="Academic System/Examples/Academic Dashboard" class="internal-link" style="background: rgba(255,255,255,0.2); padding: 8px 16px; border-radius: 20px; text-decoration: none; color: white; display: inline-block;"> View Dashboard → </a>
</div>

<div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); border-radius: 12px; padding: 25px; color: white; box-shadow: 0 4px 6px rgba(0,0,0,0.2);">
  <div style="font-size: 2.5em; margin-bottom: 10px;">🌸</div>
  <h3 style="margin: 0 0 10px 0;">Health & Wellness</h3>
  <p style="opacity: 0.9; font-size: 0.9em; margin-bottom: 15px;">Track sleep, exercise & mood</p>
  <a href="Examples/Dashboards/Health-Dashboard-Fast" style="background: rgba(255,255,255,0.2); padding: 8px 16px; border-radius: 20px; text-decoration: none; color: white; display: inline-block;">View Dashboard →</a>
</div>

<div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); border-radius: 12px; padding: 25px; color: white; box-shadow: 0 4px 6px rgba(0,0,0,0.2);">
  <div style="font-size: 2.5em; margin-bottom: 10px;">🧘</div>
  <h3 style="margin: 0 0 10px 0;">Zen Garden</h3>
  <p style="opacity: 0.9; font-size: 0.9em; margin-bottom: 15px;">Mindfulness & reflection</p>
  <a href="Examples/Dashboards/02-Zen-Garden-Dashboard" style="background: rgba(255,255,255,0.2); padding: 8px 16px; border-radius: 20px; text-decoration: none; color: white; display: inline-block;">View Dashboard →</a>
</div>

<div style="background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); border-radius: 12px; padding: 25px; color: white; box-shadow: 0 4px 6px rgba(0,0,0,0.2);">
  <div style="font-size: 2.5em; margin-bottom: 10px;">📝</div>
  <h3 style="margin: 0 0 10px 0;">Daily Journal</h3>
  <p style="opacity: 0.9; font-size: 0.9em; margin-bottom: 15px;">Today's entries & tracking</p>
  <a href="obsidian://advanced-uri?vault=kepano-obsidian&daily=true" style="background: rgba(255,255,255,0.2); padding: 8px 16px; border-radius: 20px; text-decoration: none; color: white; display: inline-block;">Open Today →</a>
</div>

</div>

![[dashboards.base]]

![[Categories.base]]

---

## 📊 Today at a Glance

```dataviewjs
// Get today's note
const today = dv.date('today');
const todayNote = dv.pages('"Daily" or "Periodic"')
  .where(p => p.file.day && p.file.day.hasSame(today, 'day'))
  .first();

if (!todayNote) {
  dv.paragraph(`
<div style="text-align: center; padding: 40px; background: var(--background-secondary); border-radius: 12px;">
  <div style="font-size: 3em; margin-bottom: 15px;">📝</div>
  <h3>No entry for today yet!</h3>
  <p style="color: var(--text-muted);">Create your daily note to start tracking</p>
  <a href="obsidian://advanced-uri?vault=kepano-obsidian&daily=true" style="display: inline-block; margin-top: 15px; padding: 10px 20px; background: var(--interactive-accent); color: white; border-radius: 20px; text-decoration: none;">Create Today's Note</a>
</div>
  `);
} else {
  // Calculate health score
  const sleep = todayNote["sleep-quality"] || 0;
  const mood = todayNote.mood || 0;
  const energy = todayNote.energy || 0;
  const water = todayNote["water-ml"] || 0;
  const exercise = todayNote["exercise-minutes"] || 0;
  
  const healthScore = sleep && mood ? ((sleep + mood + energy) / 3).toFixed(1) : "—";
  const scoreEmoji = healthScore >= 4 ? "😎" : healthScore >= 3 ? "🙂" : healthScore >= 2 ? "😐" : healthScore === "—" ? "⚫" : "😔";
  
  const container = dv.el("div", "");
  container.style.cssText = `
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 15px;
    margin: 20px 0;
  `;
  
  const stats = [
    { icon: scoreEmoji, label: "Health", value: healthScore, unit: "/5" },
    { icon: "😴", label: "Sleep", value: sleep || "—", unit: "/5" },
    { icon: "😊", label: "Mood", value: mood || "—", unit: "/5" },
    { icon: "💧", label: "Water", value: water || "—", unit: "ml" },
    { icon: "🏃", label: "Exercise", value: exercise || "—", unit: "min" }
  ];
  
  stats.forEach(stat => {
    const card = container.createDiv();
    card.style.cssText = `
      background: var(--background-secondary);
      border-radius: 10px;
      padding: 15px;
      text-align: center;
    `;
    
    card.innerHTML = `
      <div style="font-size: 2em; margin-bottom: 5px;">${stat.icon}</div>
      <div style="font-size: 1.5em; font-weight: bold; margin-bottom: 3px;">
        ${stat.value}<span style="font-size: 0.6em;">${stat.unit}</span>
      </div>
      <div style="color: var(--text-muted); font-size: 0.85em;">${stat.label}</div>
    `;
  });
}
```

---

## ✅ Quick Tasks

```dataviewjs
const today = dv.date('today');
const nextWeek = new Date(today.ts + 7 * 24 * 60 * 60 * 1000);

// Get upcoming tasks
const tasks = dv.pages().file.tasks
  .where(t => !t.completed)
  .where(t => {
    if (!t.due) return false;
    const due = dv.date(t.due);
    return due && due.ts <= nextWeek.getTime();
  })
  .sort(t => t.due, 'asc')
  .limit(5);

if (tasks.length === 0) {
  dv.paragraph("✨ No upcoming tasks! You're all caught up.");
} else {
  dv.paragraph(`**${tasks.length} task${tasks.length > 1 ? 's' : ''} due this week:**\n`);
  
  tasks.forEach(task => {
    const dueDate = dv.date(task.due);
    const isToday = dueDate.hasSame(today, 'day');
    const emoji = isToday ? "🔴" : "📅";
    const dateStr = dueDate.toFormat("MMM dd");
    
    dv.paragraph(`- ${emoji} ${task.text} - *${dateStr}*`);
  });
}
```

---

## 📈 Vault Statistics

```dataviewjs
const totalNotes = dv.pages().length;
const dailyNotes = dv.pages('"Daily" or "Periodic"').where(p => p.file.day).length;
const classPages = dv.pages().where(p => p.categories && String(p.categories).includes("Classes")).length;
const coursework = dv.pages().where(p => p.categories && String(p.categories).includes("Coursework")).length;

dv.paragraph(`
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 15px; text-align: center;">
  <div style="background: var(--background-secondary); padding: 15px; border-radius: 8px;">
    <div style="font-size: 2em; font-weight: bold; color: var(--interactive-accent);">${totalNotes}</div>
    <div style="font-size: 0.85em; color: var(--text-muted);">Total Notes</div>
  </div>
  <div style="background: var(--background-secondary); padding: 15px; border-radius: 8px;">
    <div style="font-size: 2em; font-weight: bold; color: var(--interactive-accent);">${dailyNotes}</div>
    <div style="font-size: 0.85em; color: var(--text-muted);">Daily Notes</div>
  </div>
  <div style="background: var(--background-secondary); padding: 15px; border-radius: 8px;">
    <div style="font-size: 2em; font-weight: bold; color: var(--interactive-accent);">${classPages}</div>
    <div style="font-size: 0.85em; color: var(--text-muted);">Classes</div>
  </div>
  <div style="background: var(--background-secondary); padding: 15px; border-radius: 8px;">
    <div style="font-size: 2em; font-weight: bold; color: var(--interactive-accent);">${coursework}</div>
    <div style="font-size: 0.85em; color: var(--text-muted);">Assignments</div>
  </div>
</div>
`);
```

---

## 📚 Recent Updates

```dataviewjs
const recent = dv.pages()
  .sort(f => f.file.mtime, 'desc')
  .limit(5);

dv.list(recent.file.link);
```

![[tasks-default.base]]

---

## 🔖 Quick Links

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin: 20px 0;">

**📁 Categories**
- [[Categories/Categories|All Categories]]
- [[Categories/Projects|Projects]]
- [[Categories/Books|Books]]
- [[Categories/Recipes|Recipes]]

**📝 Templates**
- [[Templates/Daily Note Template (MetaBind)|Daily Note]]
- [[Templates/Class Template|New Class]]
- [[Templates/Coursework Template|New Assignment]]

**🔧 System**
- [[Academic System/SYSTEM OVERVIEW|Academic System]]
- [[Home|Original Home]]
- Settings

</div>

---

<div style="text-align: center; padding: 30px 0; color: var(--text-muted); font-size: 0.9em;">
  <p>💡 <strong>Tip:</strong> Use Ctrl/Cmd + O to quickly open any note</p>
  <p style="margin-top: 10px;">Last updated: 
  
```dataviewjs
dv.span(dv.date('today').toFormat("MMMM dd, yyyy"));
```

  </p>
</div>
