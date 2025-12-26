---
tags:
  - settings
  - configuration
cssclasses:
  - dashboard
username: Anniex
water-goal-ml: 3500
water-bottle-size: 750
sleep-goal-hours: 8
sleep-ideal-bedtime: 22:30
exercise-goal-minutes: 30
exercise-goal-days: 5
weight-goal: 75
weight-unit: kg
schedule-tuesday: "[[Push Day]]"
schedule-wednesday: "[[Push Day]]"
schedule-friday: "[[Push Day]]"
schedule-saturday: "[[Push Day]]"
schedule-sunday: "[[Push Day]]"
schedule-monday: "[[Push Day]]"
widget-theme: bongoCat
color-override: redHawk
sync-to-obsidian: true
flashy-mode: true
schedule-thursday: "[[Push Day]]"
__preview_toggle_on: true
__preview_toggle_off: false
---


# ⚙️ Settings

This note controls your health tracking goals and preferences.  
Adjust the values below to customize your daily note templates.

---

## 💧 Water Tracking

**Daily Goal:** `INPUT[number:water-goal-ml]` ml  
*Recommended: 2500-4000ml per day*

**Bottle Size:** `INPUT[number:water-bottle-size]` ml  
*This determines the "Add Bottle" button increment*

**Current Settings:**
- Goal: `VIEW[{water-goal-ml}]` ml/day
- Bottle: `VIEW[{water-bottle-size}]` ml

---

## 😴 Sleep Settings

**Goal Hours:** `INPUT[number:sleep-goal-hours]` hours  
*Recommended: 7-9 hours per night*

**Ideal Bedtime:** `INPUT[time:sleep-ideal-bedtime]`  
*Use for nighttime routine reminders*

**Current Settings:**
- Target: `VIEW[{sleep-goal-hours}]` hours/night
- Bedtime: `VIEW[{sleep-ideal-bedtime}]`

---

## 💪 Exercise Settings

**Daily Goal:** `INPUT[number:exercise-goal-minutes]` minutes  
*Recommended: 30+ minutes of activity*

**Weekly Goal:** `INPUT[number:exercise-goal-days]` days/week  
*Recommended: 5+ days of exercise*

**Current Settings:**
- Daily: `VIEW[{exercise-goal-minutes}]` minutes
- Weekly: `VIEW[{exercise-goal-days}]` days

## 📅 Weekly Schedule

Select a plan for each day. Leave empty for **Rest Days**.

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

---

## ⚖️ Weight Settings

**Goal Weight:** `INPUT[number:weight-goal]` `VIEW[{weight-unit}]`

**Unit:** kg *(change in frontmatter if needed)*

**Current Target:** `VIEW[{weight-goal}]` `VIEW[{weight-unit}]`

---

## 📊 How Settings Work

These values are automatically referenced in your daily note templates:

- **Water slider max value** = water-goal-ml × 1.5
- **Quick add buttons** use water-bottle-size as increment
- **Progress bars** calculate based on goals
- **Nighttime routine** uses sleep-goal-hours for alarm reminder

### To Update Settings:

1. Use the MetaBind input fields above (Live Preview mode)
2. Or edit the frontmatter YAML directly
3. Changes apply to all future daily notes

---

## 🔗 Related

- [[System/Templates/Daily Note Template|Daily Note Template]]
- [[System/Dashboards/Tracker-Showcase|Tracker Showcase]]
- [[Examples/Dashboards/Health-Dashboard-Fast|Health Dashboard]]

---

*Last updated: `$= dv.date('today').toFormat("MMMM dd, yyyy")`*
