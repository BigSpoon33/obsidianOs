---
tags:
  - dashboard
  - kitchen
cssclasses:
  - dashboard
goal-calories: 2500
goal-protein: 150
goal-carbs: 200
goal-fat: 65
monday-break: "[[Coconut Granola]]"
monday-lunch: "[[Test Lunch]]"
monday-dinner: "[[Test Dinner]]"
tuesday-dinner: "[[Test Dinner]]"
wednesday-dinner: "[[Test Dinner]]"
thursday-break: "[[Test Breakfast]]"
thursday-lunch: "[[Test Lunch]]"
thursday-dinner: "[[Test Dinner]]"
friday-break: "[[Test Breakfast]]"
friday-lunch: "[[Test Lunch]]"
friday-dinner: "[[Test Dinner]]"
saturday-break: "[[Test Breakfast]]"
saturday-lunch: "[[Test Lunch]]"
saturday-dinner: "[[Test Dinner]]"
sunday-break: "[[Test Breakfast]]"
sunday-lunch: "[[Test Lunch]]"
sunday-dinner: "[[Test Dinner]]"
wednesday-lunch: "[[Test Lunch]]"
wednesday-break: "[[Test Breakfast]]"
tuesday-lunch: "[[Test Lunch]]"
tuesday-break: "[[Test Breakfast]]"
---

```datacorejsx
const script = await dc.require(dc.fileLink("System/Scripts/dc-meal-planner.jsx"));
return function View() { return script.Func(); }
```

## 🛍️ Shopping List

```datacorejsx
const script = await dc.require(dc.fileLink("System/Scripts/dc-shopping-list.jsx"));
return function View() { return script.Func(); }
```
