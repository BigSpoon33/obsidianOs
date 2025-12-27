---
tags:
  - settings
  - configuration
cssclasses:
  - dashboard
username: Anniex
activities:
  - id: water
    label: Water
    field: water-ml
    type: value
    goal: 3500
    unit: ml
    color: "#0984E3"
    icon: 💧
    increment: 800
    managed: false
    goalManagedBy:
  - id: sleep
    label: Sleep
    field: sleep-hours
    type: value
    goal: 8
    unit: hrs
    color: "#00B894"
    icon: 😴
    managed: false
    goalManagedBy:
  - id: energy
    label: Energy
    field: energy
    type: rating
    max: 5
    color: "#FDCB6E"
    icon: ⚡
    managed: false
    goalManagedBy:
  - id: mood
    label: Mood
    field: mood
    type: rating
    max: 5
    color: "#A29BFE"
    icon: 😊
    managed: false
    goalManagedBy:
  - id: sleep-quality
    label: Sleep Quality
    field: sleep-quality
    type: rating
    max: 5
    color: "#74B9FF"
    icon: 💤
    managed: false
    goalManagedBy:
  - id: calories
    label: Calories
    field: consumed-calories
    type: value
    goal: 300
    unit: kcal
    color: "#4FACFE"
    icon: 🔥
    managed: true
    goalManagedBy: mealPlanner
  - id: protein
    label: Protein
    field: consumed-protein
    type: value
    goal: 150
    unit: g
    color: "#00B894"
    icon: 🥩
    managed: true
    goalManagedBy: mealPlanner
  - id: carbs
    label: Carbs
    field: consumed-carbs
    type: value
    goal: 200
    unit: g
    color: "#FDCB6E"
    icon: 🍞
    managed: true
    goalManagedBy: mealPlanner
  - id: fat
    label: Fat
    field: consumed-fat
    type: value
    goal: 65
    unit: g
    color: "#E17055"
    icon: 🥑
    managed: true
    goalManagedBy: mealPlanner
  - id: exercise-minutes
    label: Exercise
    field: exercise-minutes
    type: value
    goal: 45
    unit: min
    color: "#E17055"
    icon: 🏃
    managed: false
    goalManagedBy: weeklyWorkout
  - id: workout-days
    label: Workout Days
    field: workout-completed
    type: count
    goal: 4
    unit: days/week
    color: "#6C5CE7"
    icon: 💪
    managed: true
    goalManagedBy: weeklyWorkout
  - id: cofee
    label: Coffee
    field: cofee
    type: value
    goal: 2
    unit: "1"
    color: "#4b2902"
    icon: ☕
    increment: 1
    managed: false
weight-goal: 75
weight-unit: kg
schedule-tuesday: "[[Push Day]]"
schedule-wednesday: "[[Push Day]]"
schedule-friday: "[[Push Day]]"
schedule-saturday: "[[Push Day]]"
schedule-sunday: "[[Push Day]]"
schedule-monday: "[[Push Day]]"
widget-theme: nyanCat
color-override: whiteCrane
sync-to-obsidian: true
flashy-mode: true
widget-backgrounds: false
schedule-thursday: "[[Push Day]]"
__preview_toggle_on: false
__preview_toggle_off: false
__editor_preview_toggle: false
---


# ⚙️ Settings

This note controls your tracking activities, goals, and preferences.

---

## 📊 Activity Manager

Manage your tracked activities below. Add, edit, or remove activities that appear in your daily notes and dashboard.

```datacorejsx
const scriptPath = "System/Scripts/Widgets/dc-activityManager.jsx";
const target = dc.fileLink(scriptPath);
const result = await dc.require(target);
const view = result?.renderedView ?? result?.View ?? result;  
const Func = result?.Func ?? null;

return function View() {
    const currentFile = dc.useCurrentFile();
    if (Func) {
        return Func({ currentFile, scriptPath });
    }
    return view ?? <p>Failed to render Activity Manager</p>;
}
```

---

## 📅 Weekly Schedule

Select a workout plan for each day. Leave empty for **Rest Days**.

```datacorejsx
const script = await dc.require(dc.fileLink("System/Scripts/Widgets/dc-weeklyWorkout.jsx"));
return function View() { return script.Func(); }
```

---

## 🎨 Widget Theme

**Sprite Pack:** `INPUT[inlineSelect(option(nyanCat, Nyan Cat), option(bongoCat, Bongo Cat)):widget-theme]`

**Color Override:** `INPUT[text:color-override]`
*Leave empty to use theme's colors, or enter a color scheme name (e.g., violetViper, makoBlue, killaBee)*

**Sync to Obsidian:** `INPUT[toggle:sync-to-obsidian]`
*When enabled, switching themes also updates Obsidian's accent color and Style Settings*

**Flashy Mode:** `INPUT[toggle:flashy-mode]`
*Enable rainbow text, glow effects, hover lift, and other animations*

**Current Settings:**
- Sprite Pack: `VIEW[{widget-theme}]`
- Color Override: `VIEW[{color-override}]` *(empty = use theme default)*
- Obsidian Sync: `VIEW[{sync-to-obsidian}]`
- Flashy Mode: `VIEW[{flashy-mode}]`

### Available Color Schemes
Copy one of these names to the Color Override field:
- `violetViper` - Purple/magenta gradient
- `makoBlue` - Ocean blue
- `killaBee` - Yellow/gold
- `redHawk` - Deep red
- `crouchingTiger` - Orange/brown
- `hiddenDragon` - Green
- `savageCroc` - Green
- `whiteCrane` - White/silver

### Apply Theme Button
After changing settings above, click this button to apply:

```datacorejsx
const { applyCurrentTheme } = await dc.require(dc.fileLink("System/Scripts/Core/dc-themeProvider.jsx"));

function ApplyButton() {
    const [applying, setApplying] = dc.useState(false);
    
    const handleClick = async () => {
        setApplying(true);
        await applyCurrentTheme();
        setApplying(false);
    };
    
    return (
        <button 
            onClick={handleClick}
            disabled={applying}
            style={{
                padding: '12px 24px',
                fontSize: '14px',
                fontWeight: 'bold',
                background: applying ? '#666' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                cursor: applying ? 'wait' : 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
            }}
        >
            {applying ? "Applying..." : "🎨 Apply Theme & Sync to Obsidian"}
        </button>
    );
}

return <ApplyButton />;
```

> [!tip] Theme Studio
> For a full theme editing experience, visit the [[System/Dashboards/Theme-Dashboard|Theme Studio]].

---

## ⚖️ Weight Settings

**Goal Weight:** `INPUT[number:weight-goal]` `VIEW[{weight-unit}]`

**Unit:** kg *(change in frontmatter if needed)*

**Current Target:** `VIEW[{weight-goal}]` `VIEW[{weight-unit}]`

---

## 🔗 Related

- [[System/Templates/Daily Note Template|Daily Note Template]]
- [[System/Dashboards/Theme-Dashboard|Theme Studio]]
- [[System/Home/Home-v3|Homepage]]

---

*Last updated: `$= dv.date('today').toFormat("MMMM dd, yyyy")`*
