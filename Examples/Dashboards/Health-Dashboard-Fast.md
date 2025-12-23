---
cssclasses:
  - dashboard
  - zen-dashboard
banner: "Attachments/Pasted image 20251210175116.png"
banner_y: 0.72
tags:
  - dashboard
  - health
---

<div style="text-align: center; padding: 20px;">
  <h1 style="font-size: 2.5em; margin: 0;">🌸 Health & Wellness Dashboard 🌸</h1>
  <p style="color: var(--text-muted); font-size: 1.1em;">"Track your journey to better health"</p>
</div>

```dataviewjs
dv.paragraph(`<p style="text-align: center; color: var(--text-muted); font-size: 0.95em;">${dv.date('today').toFormat("MMMM dd, yyyy")}</p>`);
```

---

## 📊 Health Overview (Last 7 Days)

```dataviewjs
// Get last 7 days of data
const days = dv.pages('"Daily" or "Periodic"')
  .where(p => p.file.day)
  .sort(p => p.file.day, 'desc')
  .limit(7);

if (days.length === 0) {
  dv.paragraph("No daily notes found. Start tracking your health!");
} else {
  // Calculate averages
  const validSleep = days.where(p => p["sleep-quality"]).array();
  const avgSleep = validSleep.length > 0 
    ? (validSleep.reduce((sum, p) => sum + p["sleep-quality"], 0) / validSleep.length).toFixed(1)
    : "—";
  
  const validMood = days.where(p => p.mood).array();
  const avgMood = validMood.length > 0
    ? (validMood.reduce((sum, p) => sum + p.mood, 0) / validMood.length).toFixed(1)
    : "—";
  
  const validWater = days.where(p => p["water-ml"]).array();
  const avgWater = validWater.length > 0
    ? Math.round(validWater.reduce((sum, p) => sum + p["water-ml"], 0) / validWater.length)
    : "—";
  
  const totalExercise = days.where(p => p["exercise-minutes"]).array()
    .reduce((sum, p) => sum + p["exercise-minutes"], 0);
  
  const meditationDays = days.where(p => p.meditation === true).length;

  // Create overview cards
  const container = dv.el("div", "");
  container.style.cssText = `
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin: 20px 0;
  `;

  const stats = [
    { icon: "😴", label: "Avg Sleep", value: avgSleep, unit: "/5", color: "#9caf88" },
    { icon: "😊", label: "Avg Mood", value: avgMood, unit: "/5", color: "#7ba05b" },
    { icon: "💧", label: "Avg Water", value: avgWater, unit: "ml", color: "#6eb5c0" },
    { icon: "🏃", label: "Total Exercise", value: totalExercise, unit: "min", color: "#e8b4b8" },
    { icon: "🧘", label: "Meditation", value: meditationDays, unit: "/7 days", color: "#d4a5a5" }
  ];

  stats.forEach(stat => {
    const card = container.createDiv();
    card.style.cssText = `
      background: var(--background-secondary);
      border: 2px solid ${stat.color};
      border-radius: 12px;
      padding: 20px;
      text-align: center;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    `;
    
    card.innerHTML = `
      <div style="font-size: 2.5em; margin-bottom: 8px;">${stat.icon}</div>
      <div style="font-size: 1.8em; font-weight: bold; color: ${stat.color}; margin-bottom: 4px;">
        ${stat.value}<span style="font-size: 0.6em;">${stat.unit}</span>
      </div>
      <div style="color: var(--text-muted); font-size: 0.9em; text-transform: uppercase; letter-spacing: 1px;">
        ${stat.label}
      </div>
    `;
  });
}
```

---

## 📅 Recent Daily Entries

```dataviewjs
const recentDays = dv.pages("#daily")
  .where(p => p.file.day)
  .sort(p => p.file.day, 'desc')
  .limit(8);

if (recentDays.length === 0) {
  dv.paragraph("No entries yet. Create your first daily note!");
} else {
  const tableData = recentDays.map(p => {
    // Calculate daily health score
    const sleep = p["sleep-quality"] || 0;
    const mood = p.mood || 0;
    const energy = p.energy || 0;
    const diet = p["diet-quality"] || 0;
    const stress = p["stress-level"] || 0;
    
    const healthScore = ((sleep + mood + energy + diet + (5 - stress)) / 5).toFixed(1);
    const scoreEmoji = healthScore >= 4 ? "😎" : healthScore >= 3 ? "🙂" : healthScore >= 2 ? "😐" : "😔";
    
    return [
      p.file.link,
      `${sleep || "—"}/5`,
      `${mood || "—"}/5`,
      `${p["water-ml"] || "—"} ml`,
      p.exercise || "—",
      `${p["exercise-minutes"] || "—"} min`,
      `${scoreEmoji} ${healthScore}/5`
    ];
  });
  
  dv.table(
    ["Date", "Sleep", "Mood", "Water", "Exercise", "Duration", "Health Score"],
    tableData
  );
}
```

---

## 🌊 Water Intake Trend

```dataviewjs
const waterDays = dv.pages('"Daily" or "Periodic"')
  .where(p => p.file.day && p["water-ml"])
  .sort(p => p.file.day, 'desc')
  .limit(14);

if (waterDays.length === 0) {
  dv.paragraph("No water data yet.");
} else {
  dv.paragraph(`**Last ${waterDays.length} days with water tracking:**`);
  
  waterDays.forEach(p => {
    const water = p["water-ml"];
    const percentage = Math.round((water / 2500) * 100);
    const barWidth = Math.min(percentage, 100);
    
    let color = "#f44336"; // Red
    if (water >= 2000) color = "#4caf50"; // Green
    else if (water >= 1500) color = "#2196f3"; // Blue
    else if (water >= 1000) color = "#ff9800"; // Orange
    
    const emoji = water >= 2000 ? "💙" : water >= 1500 ? "💧" : water >= 1000 ? "⚠️" : "🔥";
    
    dv.paragraph(`
${p.file.link} - ${emoji} ${water}ml (${percentage}%)
<div style="width: 100%; height: 20px; background: var(--background-secondary); border-radius: 10px; overflow: hidden; margin: 4px 0 12px 0;">
  <div style="width: ${barWidth}%; height: 100%; background: ${color}; transition: width 0.3s;"></div>
</div>
    `);
  });
}
```

---

## 💪 Exercise Log

```dataviewjs
const exerciseDays = dv.pages('"Daily" or "Periodic"')
  .where(p => p.file.day && p.exercise)
  .sort(p => p.file.day, 'desc')
  .limit(10);

if (exerciseDays.length === 0) {
  dv.paragraph("No exercise logged yet. Get moving!");
} else {
  const exerciseData = exerciseDays.map(p => [
    p.file.link,
    p.exercise,
    `${p["exercise-minutes"] || "—"} min`,
    p.energy ? `⚡ ${p.energy}/5` : "—"
  ]);
  
  dv.table(
    ["Date", "Exercise Type", "Duration", "Energy After"],
    exerciseData
  );
}
```

---

## 🧘 Meditation & Mindfulness

```dataviewjs
const meditationDays = dv.pages('"Daily" or "Periodic"')
  .where(p => p.file.day && p.meditation === true)
  .sort(p => p.file.day, 'desc')
  .limit(30);

const totalDays = dv.pages('"Daily" or "Periodic"')
  .where(p => p.file.day)
  .limit(30)
  .length;

const meditationCount = meditationDays.length;
const streak = meditationCount;
const percentage = totalDays > 0 ? Math.round((meditationCount / totalDays) * 100) : 0;

dv.paragraph(`
### 🧘 Meditation Stats (Last 30 Days)

**Days Meditated:** ${meditationCount} / ${totalDays} (${percentage}%)  
**Current Streak:** 🔥 ${streak} days

**Recent Sessions:**
`);

if (meditationCount === 0) {
  dv.paragraph("*No meditation sessions yet. Start your practice today!*");
} else {
  meditationDays.limit(7).forEach(p => {
    const minutes = p["meditation-minutes"] || "—";
    dv.paragraph(`- ${p.file.link} - ${minutes} minutes`);
  });
}
```

---

## 😊 Mood Tracker

```dataviewjs
const moodDays = dv.pages('"Daily" or "Periodic"')
  .where(p => p.file.day && p.mood)
  .sort(p => p.file.day, 'desc')
  .limit(14);

if (moodDays.length === 0) {
  dv.paragraph("No mood data yet.");
} else {
  dv.paragraph("### 😊 Mood Trend (Last 14 Days)\n");
  
  // Create mood visualization
  const moodEmojis = {
    1: "😔",
    2: "😕",
    3: "😐",
    4: "🙂",
    5: "😊"
  };
  
  const moodGrid = moodDays.map(p => {
    const mood = p.mood || 0;
    const emoji = moodEmojis[mood] || "⚫";
    const date = p.file.day.toFormat("MMM dd");
    
    return `
<div style="display: inline-block; text-align: center; margin: 8px; padding: 12px; background: var(--background-secondary); border-radius: 8px; min-width: 80px;">
  <div style="font-size: 2em;">${emoji}</div>
  <div style="font-size: 0.8em; color: var(--text-muted); margin-top: 4px;">${date}</div>
  <div style="font-size: 0.9em; font-weight: bold;">${mood}/5</div>
</div>
    `;
  }).join("");
  
  dv.paragraph(moodGrid);
}
```

---

## 🎯 Quick Actions

```meta-bind-button
label: "📝 New Daily Note"
icon: "calendar-plus"
style: primary
action:
  type: templaterCreateNote
  templateFile: "Templates/Daily Note Template (MetaBind).md"
  folder: "Daily"
  fileName: "<% tp.date.now('YYYY-MM-DD') %>"
  openNote: true
```

```meta-bind-button 
label: "📊 View All Data" 
icon: "database" 
style: default 
action: 
  type: command 
  command: dataview:force-refresh-views
```

---

## 💡 Health Tips

>[!tip] Stay Healthy!
>- 💧 Aim for 2000-2500ml of water daily
>- 😴 Get 7-9 hours of quality sleep
>- 🏃 Exercise at least 30 minutes per day
>- 🧘 Meditate for 10-20 minutes daily
>- 🥗 Eat balanced, nutritious meals
>- 😊 Track your mood to identify patterns




# Testing

```datacorejsx
// 1. HOOKS MUST BE AT THE TOP
const todayPath = `Daily/${moment().format("YYYY-MM-DD")}.md`;
const todayFile = dc.useFile(todayPath);
const currentFile = dc.useFile(dc.currentPath()); 
const settingsFile = dc.useFile("Settings.md");

// 2. DATA NORMALIZATION
// We check the current file for decentralized settings first
const editMode = currentFile?.['edit-mode'] || false;
const waterGoal = currentFile?.['water-goal-ml'] || settingsFile?.['water-goal-ml'] || 3500;
const bottleSize = currentFile?.['water-bottle-size'] || 500;

// Logic for Today's Note
if (!todayFile) {
    return (
        <div className="zen-tile" style={{textAlign: 'center', padding: '40px'}}>
            <h2>🌸 Path Not Set</h2>
            <p>Welcome back, Annie. Today's entry is missing.</p>
            {/* Show settings even if note is missing if editMode is true */}
            {editMode && <div style={{marginTop: '15px', border: '1px dashed var(--text-muted)', padding: '10px'}}>
                <small>🔧 Settings: Goal is {waterGoal}ml | Bottle is {bottleSize}ml</small>
            </div>}
        </div>
    );
}

const currentWater = todayFile['water-ml'] || 0;
const progress = Math.min((currentWater / waterGoal) * 100, 100);

// 3. RENDER
return (
    <div className="zen-tile">
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <div>
                <h2 style={{margin: 0}}>Kon'nichiwa, Annie ⛩️</h2>
                <p style={{color: 'var(--text-muted)'}}>
                    Hydration: <b>{currentWater}ml</b> / {waterGoal}ml
                </p>
            </div>
            {/* Contextual Visual for Edit Mode */}
            {editMode && <span style={{fontSize: '0.7em', color: 'var(--interactive-accent)', border: '1px solid', padding: '2px 6px', borderRadius: '4px', height: 'fit-content'}}>SETTINGS ACTIVE</span>}
        </div>

        <div className="nyan-container" style={{marginTop: '20px'}}>
            <div className="nyan-bar" style={{ width: `${progress}%` }}></div>
            <img className="nyan-cat" src="https://gc-pkm.pages.dev/nyan-cat.gif" style={{ left: `calc(${progress}% - 25px)` }} />
        </div>

        {/* CONDITIONALLY RENDER SETTINGS INTERFACE */}
        {editMode && (
            <div style={{marginTop: '20px', padding: '15px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', border: '1px solid var(--background-modifier-border)'}}>
                <h4 style={{margin: '0 0 10px 0'}}>🔧 Local Configuration</h4>
                <p style={{fontSize: '0.9em', margin: '5px 0'}}>Adjust your goals for this specific dashboard view.</p>
                {/* We use standard Markdown strings here for Meta Bind to pick up */}
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px'}}>
                    <div>Goal: `INPUT[number:water-goal-ml]`</div>
                    <div>Bottle: `INPUT[number:water-bottle-size]`</div>
                </div>
            </div>
        )}
    </div>
);
```

```meta-bind-button
label: "+ 500ml Water"
style: primary
actions:
  - type: updateMetadata
    file: "<% tp.date.now('YYYY-MM-DD') %>"
    bindTarget: water-ml
    evaluate: true
    value: x + 500
```


```meta-bind-button
label: "⚙️ Toggle Settings"
style: default
actions:
  - type: updateMetadata
    bindTarget: edit-mode
    evaluate: true
    value: "!x"
```



`VIEW[{edit-mode} ? "### 🔧 Water Settings\nTarget: INPUT[number:water-goal-ml]ml\nBottle Size: INPUT[number:water-bottle-size]ml" : ""]`

