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
schedule-tuesday: "[[Pull Day]]"
schedule-wednesday: "[[Push Day]]"
schedule-friday: "[[Pull Day]]"
schedule-saturday: "[[Cardio & Abs]]"
schedule-sunday: "[[Push Day]]"
schedule-monday: "[[Pull Day]]"
widget-theme: bongo-cat
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
const script = await dc.require(dc.fileLink("System/Scripts/widgets/dc-weekly-workout.jsx"));
return function View() { return script.Func(); }
```




---

## 🎨 Widget Theme

**Active Theme:** `INPUT[inlineSelect(option(nyan-cat, Nyan Cat), option(bongo-cat, Bongo Cat)):widget-theme]`

*Switch between visual themes for progress bars and other widgets.*

**Current Theme:** `VIEW[{widget-theme}]`

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
