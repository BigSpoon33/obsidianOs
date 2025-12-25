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
monday-break: "[[Make-Ahead Greek Yogurt Parfait]]"
monday-lunch: "[[Sarah's Easy Shredded Chicken Taco Filling]]"
monday-dinner: "[[Roast Beef Horseradish Roll-Ups]]"
tuesday-dinner: "[[Sarah's Easy Shredded Chicken Taco Filling]]"
wednesday-dinner: "[[Grilled Chicken with Rosemary and Bacon]]"
thursday-break: "[[Test Breakfast]]"
thursday-lunch: "[[A Good and Easy Garlic Chicken]]"
thursday-dinner: "[[Cilantro-Lime Grilled Chicken]]"
friday-break: "[[Protein Powerhouse Baked Oatmeal]]"
friday-lunch: "[[Simple Mexican Quinoa]]"
friday-dinner: "[[Baked Salmon Fillets Dijon]]"
saturday-break: "[[Test Lunch]]"
saturday-lunch: "[[Protein Powerhouse Baked Oatmeal]]"
saturday-dinner: "[[Test Dinner]]"
sunday-break: "[[Southwest Breakfast Burritos]]"
sunday-lunch: "[[Asian Chicken Salad in a Jar]]"
sunday-dinner: "[[Grilled Chicken with Rosemary and Bacon]]"
wednesday-lunch: "[[Protein Powerhouse Baked Oatmeal]]"
wednesday-break: "[[Make-Ahead Sweet Potato and Chorizo Breakfast Burritos]]"
tuesday-lunch: "[[Asian Chicken Salad in a Jar]]"
tuesday-break: "[[Protein Powerhouse Baked Oatmeal]]"
---

```datacorejsx
const script = await dc.require(dc.fileLink("System/Scripts/Widgets/dc-mealPlanner.jsx"));
return function View() { return script.Func(); }
```

## 🛍️ Shopping List

```datacorejsx
const script = await dc.require(dc.fileLink("System/Scripts/Widgets/dc-shoppingList.jsx"));
return function View() { return script.Func(); }
```
