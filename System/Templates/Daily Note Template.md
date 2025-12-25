---
creation date: <% tp.file.creation_date() %>
modification date: <%+ tp.file.last_modified_date("dddd Do MMMM YYYY HH:mm:ss") %>
tags:
  - daily
  - journal
banner: Attachments/Art Animation GIF by makio135.gif
cssclasses:
  - dashboard
  - journal-theme
banner_icon: 🌸
banner_x: 0.5
banner_y: 0.38
week: <% tp.date.now("YYYY-WW") %>
sleep-quality:
sleep-hours:
weight:
mood:
energy:
water-ml:
exercise:
exercise-minutes:
breakfast: "[[Test Breakfast]]"
lunch: "[[Test Lunch]]"
dinner: "[[Test Dinner]]"
snacks: []
consumed-calories: 1800
consumed-protein: 170
consumed-carbs: 60
consumed-fat: 30
diet-quality:
meditation: false
meditation-minutes:
gratitude:
stress-level:
study-hours:
work-hours:
learning: false
deep-work: false
cleaned: false
planned: false
creative: false
highlight:
challenge:
health-score: 😔 1.0/5
sleep-bedtime: 23:15
sleep-wakeup: 06:45
night-score: 0
night-checked: 0
night-total: 5
mood-evening: 4
emotions:
---

>[!important]   <% tp.file.title %>

<< [[<% tp.date.now("YYYY-MM-DD", -1, tp.file.title, "YYYY-MM-DD") %>]] | [[<% tp.date.now("YYYY-MM-DD", 1, tp.file.title, "YYYY-MM-DD") %>]]>>

![[Daily.base]]

---

## 🌅 Morning Check-In

```datacorejsx
const script = await dc.require(dc.fileLink("System/Scripts/widgets/dc-sleep-tracker.jsx"));
return function View() { return script.Func(); }
```

---

## 📊 Today's Overview

![[tasks-default.base#Today]]

---

## 🍽️ Nutrition Tracking
```dataviewjs
// Get today's meal suggestions from weekly plan (if exists)
const today = dv.date('today');
const dayName = today.toFormat('EEEE').toLowerCase();

const mealPlan = dv.page("Meal-Plans/Weekly-Meal-Plan");

if (mealPlan && mealPlan.meals) {
  const breakfast = mealPlan.meals[`${dayName}-breakfast`];
  const lunch = mealPlan.meals[`${dayName}-lunch`];
  const dinner = mealPlan.meals[`${dayName}-dinner`];
  
  if (breakfast || lunch || dinner) {
    dv.paragraph(`**📋 Meal Plan Suggestions:**`);
    if (breakfast) dv.paragraph(`- 🌅 Breakfast: ${breakfast}`);
    if (lunch) dv.paragraph(`- 🌞 Lunch: ${lunch}`);
    if (dinner) dv.paragraph(`- 🌙 Dinner: ${dinner}`);
    dv.paragraph("");
  }
}
```


```datacorejsx
// Make sure styles are loaded (if not managed globally)
const css = await app.vault.adapter.read("System/Scripts/styles/dc-today-menu.css");
if (!document.getElementById("dc-today-styles")) {
    const style = document.createElement("style");
    style.id = "dc-today-styles";
    style.textContent = css;
    document.head.appendChild(style);
}

const script = await dc.require(dc.fileLink("System/Scripts/widgets/dc-today-menu.jsx"));
return function View() { return script.Func(); }
```

```datacorejsx
const script = await dc.require(dc.fileLink("System/Scripts/widgets/dc-water-tracker.jsx"));
return function View() { return script.Func(); }
```

---

## 💪 Movement & Exercise


```datacorejsx
const script = await dc.require(dc.fileLink("System/Scripts/widgets/dc-workout-today.jsx"));
return function View() {
    return script.Func();
}
```

some kind of exercise tracking to update the frontmatter

---

---

## 📚 Academic/Productivity


---

## 📝 Daily Journal

### 📔 Daily Entries 

```datacorejsx
const script = await dc.require(dc.fileLink("System/Scripts/widgets/dc-journal-nav.jsx"));
return function View() { return script.Func(); }
```
A good old Journal Entry

---

## 📊 Daily Summary

```dataviewjs
// 1. Get current values
const p = dv.current();
const sleepQuality = p["sleep-quality"] || 0;
const mood = p.mood || 0;
const energy = p.energy || 0;
const dietQuality = p["diet-quality"] || 0;
const stressLevel = p["stress-level"] || 0;

// 2. Calculate health score
const healthScore = ((sleepQuality + mood + energy + dietQuality + (5 - stressLevel)) / 5).toFixed(1);
const healthEmoji = healthScore >= 4 ? "😎" : healthScore >= 3 ? "🙂" : healthScore >= 2 ? "😐" : "😔";
const finalOutput = `${healthEmoji} ${healthScore}/5`;

// 3. Update Frontmatter (This makes it work for your BaseView)
const file = app.vault.getAbstractFileByPath(p.file.path);
await app.fileManager.processFrontMatter(file, (fm) => {
  // Only update if the value has actually changed to prevent infinite loops
  if (fm["health-score"] !== finalOutput) {
    fm["health-score"] = finalOutput;
  }
});

// 4. Render the visual summary
dv.paragraph(`
### ${healthEmoji} Health Score: **${healthScore}/5**

**Breakdown:**
- 😴 Sleep Quality: ${sleepQuality}/5
- 😊 Mood: ${mood}/5  
- ⚡ Energy: ${energy}/5
- 🥗 Diet: ${dietQuality}/5
- 😰 Stress: ${stressLevel}/5

**Totals:**
- 💧 Water: ${p["water-ml"] || 0} ml
- 🏃 Exercise: ${p["exercise-minutes"] || 0} minutes
- 🧘 Meditation: ${p["meditation-minutes"] || 0} minutes
- 📚 Study: ${p["study-hours"] || 0} hours
`);
```

---

### 🧠 Emotion Log

```datacorejsx
const script = await dc.require(dc.fileLink("System/Scripts/widgets/dc-mood-tracker.jsx"));
return function View() { return script.Func(); }
```

---

## 🌙 Nighttime Routine

**Sleep Prep:**
- [ ] Brush teeth
- [ ] Set alarm for `VIEW[{Settings#sleep-goal-hours}]` hours of sleep
- [ ] Prepare tomorrow's clothes/items
- [ ] Phone on charger (away from bed)
- [ ] Review tomorrow's plan below

**Evening Reflection:**

*What am I grateful for today?*


*What could I improve tomorrow?*

```datacorejsx
const script = await dc.require(dc.fileLink("System/Scripts/widgets/dc-routine-tracker.jsx"));
return function View() { return script.Func(); }
```

---

## 🎯 Tomorrow's Plan

![[tasks-default.base#Tomorrow]]

**Additional Tasks:**
- [ ] 
- [ ] 
- [ ] 

---

*Have a great day! 🌟*
