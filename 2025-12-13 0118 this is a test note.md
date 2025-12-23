---
created: 2025-12-13
tags:
  - note
  - journal
---

![[tasks-default.base]]

> [!EXAMPLE]+ 🏋️ Fitness Tracker
> 
> **Did you workout?** `INPUT[toggle:exercise-completed]`
> 
> **Activity:** `INPUT[inlineSelect(option(None), option(Strength), option(Cardio), option(Qi Gong), option(Yoga)):exercise-type]`
> 
> **Duration:** `INPUT[number(class(meta-bind-small-width)):exercise-duration]` min
> 
> **Notes:** `INPUT[text(placeholder(Log sets, reps, or how you felt...)):exercise-notes]`
> 
> ---
> **Weekly Progress**
> ```dataview
> TABLE WITHOUT ID
> 	file.link as "Day",
> 	exercise-type as "Activity",
> 	exercise-duration + " min" as "Time",
> 	exercise-notes as "Log"
> FROM "Daily Notes"
> WHERE exercise-completed = true
> AND file.day >= date(today) - dur(7 days)
> SORT file.day DESC
> ```

### Step 3: (Optional) The "Streak" Button
If you want that dopamine hit of clicking a button to "Complete" your workout, add this button code inside the box. It toggles the checkbox and sets a default duration.

`BUTTON[action(updateMetadata(exercise-completed, true), updateMetadata(exercise-duration, 30)), class(button), "✅ Mark Workout Complete"]`
