---
cssclasses:
  - dashboard
tags:
  - dashboard
  - tracker
  - showcase
---

# 📊 Tracker Plugin Showcase

Comprehensive examples of the Obsidian Tracker plugin using daily note frontmatter data.

**Note:** All examples query data from your daily notes in the `Daily` or `Periodic` folders.

---

## Table of Contents

1. [Line Charts](#Line Charts)
2. [Bar Charts](#bar-charts)
3. [Month View (Heatmaps)](##MonthView)
4. [Summary Statistics](#summary-statistics)
5. [Bullet Charts](#bullet-charts)
6. [Multiple Datasets](#multiple-datasets)
7. [Advanced Examples](#advanced-examples)

---

## Line Charts

### Sleep Quality Trend (Last 30 Days)

```tracker
searchType: frontmatter
searchTarget: sleep-quality
folder: /
startDate: -30d
line:
    title: Sleep Quality Over Time
    yAxisLabel: Quality (1-5)
    yMin: 0
    yMax: 5
    lineColor: "#9c27b0"
    showLegend: false
    showPoint: true
    fillGap: true
```

### Mood Trend (Last 30 Days)

```tracker
searchType: frontmatter
searchTarget: mood
folder: /
startDate: -30d
line:
    title: Daily Mood Tracking
    yAxisLabel: Mood (1-5)
    yMin: 0
    yMax: 5
    lineColor: "#ffeb3b"
    showLegend: false
    showPoint: true
```

### Water Intake Line Chart

```tracker
searchType: frontmatter
searchTarget: water-ml
folder: /
startDate: -30d
line:
    title: Water Intake Trend
    yAxisLabel: ml
    yMin: 0
    yMax: 3000
    lineColor: "#2196f3"
    showLegend: false
    fillGap: true
```

### Energy Levels

```tracker
searchType: frontmatter
searchTarget: energy
folder: /
startDate: -30d
line:
    title: Energy Levels
    yAxisLabel: Energy (1-5)
    yMin: 0
    yMax: 5
    lineColor: "#ff5722"
    showPoint: true
    showLegend: false
```

---

## Bar Charts

### Exercise Minutes (Last 14 Days)

```tracker
searchType: frontmatter
searchTarget: exercise-minutes
folder: /
startDate: -14d
bar:
    title: Exercise Minutes (Last 2 Weeks)
    yAxisLabel: Minutes
    barColor: "#4caf50"
```

### Study Hours (Last 7 Days)

```tracker
searchType: frontmatter
searchTarget: study-hours
folder: /
startDate: -7d
bar:
    title: Study Hours This Week
    yAxisLabel: Hours
    barColor: "#3f51b5"
```

### Diet Quality (Last 14 Days)

```tracker
searchType: frontmatter
searchTarget: diet-quality
folder: /
startDate: -14d
bar:
    title: Diet Quality
    yAxisLabel: Rating (1-5)
    barColor: "#8bc34a"
```

---

## Month View

### Mood Heatmap (Current Month)

```tracker
searchType: frontmatter
searchTarget: mood
folder: /
month:
    mode: heatmap
    startWeekOn: Monday
    threshold: 2.5,3.5,4.5
    color: bad,neutral,good,excellent
    dimNotInMonth: false
    initMonth: 2025-12
```

### Meditation Habit Tracker

```tracker
searchType: frontmatter
searchTarget: meditation
folder: /
month:
    mode: annotation
    startWeekOn: Monday
    annotation: ✅
    color: green
    dimNotInMonth: false
    initMonth: 2025-12
```

### Exercise Frequency

```tracker
searchType: frontmatter
searchTarget: exercise-minutes
folder: /
month:
    mode: circle
    startWeekOn: Monday
    threshold: 15,30,45
    color: red,orange,yellow,green
    dimNotInMonth: false
    initMonth: 2025-12
```

### Sleep Hours Heatmap

```tracker
searchType: frontmatter
searchTarget: sleep-hours
folder: /
month:
    mode: heatmap
    startWeekOn: Monday
    threshold: 6,7,8
    color: bad,neutral,good,excellent
    dimNotInMonth: false
    initMonth: 2025-12
```

---

## Summary Statistics

### Weekly Health Summary

```tracker
searchType: frontmatter
searchTarget: water-ml, sleep-hours, exercise-minutes, mood
folder: /
startDate: -7d
summary:
    template: "Avg water: {{average(0)}}ml, Avg sleep: {{average(1)}}hr, Total exercise: {{sum(2)}}min, Avg mood: {{average(3)}}/5"
    style: "color: var(--text-accent); font-size: 1.2em; font-weight: bold; padding: 15px; background: var(--background-secondary); border-radius: 8px;"
```

### Monthly Totals

```tracker
searchType: frontmatter
searchTarget: exercise-minutes, study-hours, meditation-minutes
folder: /
startDate: -30d
summary:
    template: "📊 30-Day Totals: Exercise: {{sum(0)}}min ({{average(0)}}min/day) | Study: {{sum(1)}}hr | Meditation: {{sum(2)}}min"
    style: "padding: 10px; border-left: 4px solid var(--interactive-accent);"
```

### Streak Counter

```tracker
searchType: frontmatter
searchTarget: meditation
folder: /
startDate: -90d
summary:
    template: "🔥 Meditation Streak: {{maxStreak()}} days | Current: {{currentStreak()}} days"
    style: "font-size: 1.3em; color: #ff9800; font-weight: bold;"
```

---

## Bullet Charts

### Water Intake vs Goal

```tracker
searchType: frontmatter
searchTarget: water-ml
folder: /
startDate: -14d
bullet:
    title: Water Intake vs Goal (2500ml)
    dataset: 2500
    range: 0,1250,1875,2500,3000
    rangeColor: red,orange,yellow,green,blue
```

### Exercise Minutes vs Goal

```tracker
searchType: frontmatter
searchTarget: exercise-minutes
folder: /
startDate: -7d
bullet:
    title: Exercise vs Goal (30min)
    dataset: 30
    range: 0,15,22,30,45
    rangeColor: red,orange,yellow,green,blue
```

### Sleep Hours vs Goal

```tracker
searchType: frontmatter
searchTarget: sleep-hours
folder: /
startDate: -7d
bullet:
    title: Sleep vs Goal (8hr)
    dataset: 8
    range: 0,6,7,8,9
    rangeColor: red,orange,yellow,green,blue
```

---

## Multiple Datasets

### Health Metrics Comparison

```tracker
searchType: frontmatter
searchTarget: sleep-quality, mood, energy, diet-quality
folder: /
startDate: -30d
line:
    title: Health Metrics Over Time
    yAxisLabel: Rating (1-5)
    yMin: 0
    yMax: 5
    lineColor: purple,yellow,orange,green
    showLegend: true
    legendPosition: bottom
    legendOrientation: horizontal
```

### Activity Tracking

```tracker
searchType: frontmatter
searchTarget: exercise-minutes, study-hours, meditation-minutes
folder: /
startDate: -14d
line:
    title: Daily Activities (Last 2 Weeks)
    yAxisLabel: Minutes/Hours
    lineColor: green,blue,purple
    showLegend: true
    legendPosition: top
```

### Wellness Indicators

```tracker
searchType: frontmatter
searchTarget: mood, stress-level, energy
folder: /
startDate: -30d
line:
    title: Wellness Indicators
    yAxisLabel: Level (1-5)
    yMin: 0
    yMax: 5
    lineColor: "#ffeb3b,#f44336,#ff5722"
    showLegend: true
    legendPosition: bottom
```

---

## Advanced Examples

### Pie Chart - Time Distribution

```tracker
searchType: frontmatter
searchTarget: study-hours, work-hours
folder: /
startDate: -7d
pie:
    title: Time Distribution This Week
    data: "{{sum(0)}},{{sum(1)}}"
    dataName: Study,Work
    dataColor: blue,green
```

### Custom Date Range

```tracker
searchType: frontmatter
searchTarget: water-ml
folder: /
startDate: 2025-12-01
endDate: 2025-12-31
line:
    title: December Water Intake
    yAxisLabel: ml
    lineColor: "#03a9f4"
    showLegend: false
```

### Rolling Average (7-day)

```tracker
searchType: frontmatter
searchTarget: sleep-quality
folder: /
startDate: -30d
line:
    title: Sleep Quality (7-day Rolling Average)
    yAxisLabel: Quality
    yMin: 0
    yMax: 5
    lineColor: "#9c27b0"
    showLegend: false
    fillGap: true
    smoothLine: true
```

### X-Axis Labels Customization

```tracker
searchType: frontmatter
searchTarget: mood
folder: /
startDate: -14d
line:
    title: Mood Trend (Custom Labels)
    yAxisLabel: Mood
    xAxisLabel: Date
    xAxisColor: gray
    yAxisColor: gray
    lineColor: "#ffeb3b"
    showLegend: false
```

### Fitness Tracking Combo

```tracker
searchType: frontmatter
searchTarget: exercise-minutes
folder: /
startDate: -30d
bar:
    title: Exercise Minutes (30 Days)
    yAxisLabel: Minutes
    barColor: "#4caf50"
```

```tracker
searchType: frontmatter
searchTarget: weight
folder: /
startDate: -30d
line:
    title: Weight Trend (30 Days)
    yAxisLabel: kg
    lineColor: "#e91e63"
    showLegend: false
    showPoint: true
```

### Habits Correlation Matrix

```tracker
searchType: frontmatter
searchTarget: meditation, exercise-minutes, sleep-quality
folder: /
startDate: -60d
line:
    title: Habits & Sleep Quality Correlation
    yAxisLabel: Value
    lineColor: purple,green,blue
    showLegend: true
    legendPosition: bottom
```

---

## Data Requirements

For these trackers to work properly, your daily notes need frontmatter like this:

```yaml
---
# Health
sleep-quality: 4
sleep-hours: 7.5
mood: 4
energy: 3
stress-level: 2
weight: 75
water-ml: 2000

# Activity
exercise-minutes: 30
meditation: true
meditation-minutes: 15
study-hours: 3
work-hours: 0

# Diet
diet-quality: 4
---
```

---

## Tips for Using Tracker Plugin

1. **Date Ranges:**
   - Use `-7d` for last 7 days
   - Use `-30d` for last month
   - Use specific dates: `2025-12-01`

2. **Colors:**
   - Named: `red, blue, green, yellow, purple, orange, pink, cyan`
   - Hex: `#ff5722, #2196f3`
   - RGB: `rgb(255, 0, 0)`

3. **Folders:**
   - Separate multiple folders with commas: `Daily, Periodic`
   - Leave empty to search entire vault

4. **Fill Gaps:**
   - `fillGap: true` connects missing data points
   - `fillGap: false` shows gaps in data

5. **Performance:**
   - Limit date ranges for faster loading
   - Use specific folders to reduce search scope

---

## Related

- [[Settings|Settings]] - Configure your goals
- [[Templates/Daily Note Template|Daily Note Template]]
- [[Examples/Dashboards/Health-Dashboard-Fast|Health Dashboard]]
- [[Home-v2|Home]]

---

**Tracker Plugin Documentation:** https://github.com/pyrochlore/obsidian-tracker

*Last updated: December 13, 2025*
