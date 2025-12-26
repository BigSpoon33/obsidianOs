---
categories:
  - "[[Workout Plan]]"
focus: Push (Chest, Shoulders, Triceps)
duration: 45
difficulty: Intermediate
warmup:
  - link: "[[Arm Circles]]"
    info: 20 reps
  - link: "[[Band Pull-aparts]]"
    info: 20 reps
  - link: "[[Light Cardio]]"
    info: 2-3 mins
  - link: "[[Dynamic Stretching]]"
    info: Full body
cooldown:
  - link: "[[Chest Stretch]]"
    info: 30s hold
  - link: "[[Shoulder Stretch]]"
    info: 30s each side
  - link: "[[Tricep Stretch]]"
    info: 30s each side
  - link: "[[Light Walking]]"
    info: Heart rate reset
exercises:
  - link: "[[Bench Press]]"
    sets: 6
    reps: 8-10
    weight: 135 lbs
  - link: "[[Overhead Press]]"
    sets: 3
    reps: 10-12
    weight: 95 lbs
  - link: "[[Incline Dumbbell Press]]"
    sets: 3
    reps: 10-12
    weight: 45 lbs
  - link: "[[Lateral Raises]]"
    sets: 3
    reps: 12-15
    weight: 20 lbs
  - link: "[[Tricep Dips]]"
    sets: 3
    reps: Failure
    weight: BW
  - link: "[[Cable Tricep Pushdowns]]"
    sets: 3
    reps: 15+
    weight: 40 lbs
tags:
  - sworkout-plan
---

```datacorejsx
const script = await dc.require(dc.fileLink("System/Scripts/Widgets/dc-adminButtons.jsx"));
return function View() { return script.Func(); }
```

# 💪 Push Day

**Focus:** Chest, Shoulders, Triceps  
**Duration:** ~45 minutes  
**Difficulty:** Intermediate

---

## Warm-Up (5 min)

- [[Arm Circles]]: `INPUT[text:warmup[0].info]`
- [[Band Pull-aparts]]: `INPUT[text:warmup[1].info]`
- [[Light Cardio]]: `INPUT[text:warmup[2].info]`
- [[Dynamic Stretching]]: `INPUT[text:warmup[3].info]`

## Main Workout

## Main Workout

### 1. [[Bench Press]]
**Sets:** `INPUT[number:exercises[0].sets]` | **Reps:** `INPUT[text:exercises[0].reps]` | **Weight:** `INPUT[text:exercises[0].weight]`
**Rest:** 90 seconds
**Notes:** Compound movement. [View Technique]([[Bench Press#Instructions]])

### 2. [[Overhead Press]]
**Sets:** `INPUT[number:exercises[1].sets]` | **Reps:** `INPUT[text:exercises[1].reps]` | **Weight:** `INPUT[text:exercises[1].weight]`
**Rest:** 90 seconds

### 3. [[Incline Dumbbell Press]]
**Sets:** `INPUT[number:exercises[2].sets]` | **Reps:** `INPUT[text:exercises[2].reps]` | **Weight:** `INPUT[text:exercises[2].weight]`
**Rest:** 60 seconds
**Notes:** Targets upper chest

### 4. [[Lateral Raises]]
**Sets:** `INPUT[number:exercises[3].sets]` | **Reps:** `INPUT[text:exercises[3].reps]` | **Weight:** `INPUT[text:exercises[3].weight]`
**Rest:** 45 seconds

### 5. [[Tricep Dips]]
**Sets:** `INPUT[number:exercises[4].sets]` | **Reps:** `INPUT[text:exercises[4].reps]` | **Weight:** `INPUT[text:exercises[4].weight]`
**Rest:** 60 seconds

### 6. [[Cable Tricep Pushdowns]]
**Sets:** `INPUT[number:exercises[5].sets]` | **Reps:** `INPUT[text:exercises[5].reps]` | **Weight:** `INPUT[text:exercises[5].weight]`
**Rest:** 45 seconds

## Cool Down (5 min)

- [[Chest Stretch]]: `INPUT[text:cooldown[0].info]`
- [[Shoulder Stretch]]: `INPUT[text:cooldown[1].info]`
- [[Tricep Stretch]]: `INPUT[text:cooldown[2].info]`
- [[Light Walking]]: `INPUT[text:cooldown[3].info]`

## Progress Tracking

Track your performance in daily notes:
- Weight used
- Reps completed
- Energy level
- Notes on form

## Related

- [[System/Categories/Exercise|Exercise Library]]
- [[Weekly-Schedule|Weekly Schedule]]
