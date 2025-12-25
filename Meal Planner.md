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
monday-break: "[[Make-Ahead Sweet Potato and Chorizo Breakfast Burritos]]"
monday-lunch: "[[Sarah's Easy Shredded Chicken Taco Filling]]"
monday-dinner: "[[Cilantro-Lime Grilled Chicken]]"
tuesday-dinner: "[[Grilled Chicken with Rosemary and Bacon]]"
wednesday-dinner: "[[Baked Salmon Fillets Dijon]]"
thursday-break: "[[Test Breakfast]]"
thursday-lunch: "[[Cilantro-Lime Grilled Chicken]]"
thursday-dinner: "[[Baked Salmon Fillets Dijon]]"
friday-break: "[[Make-Ahead Sweet Potato and Chorizo Breakfast Burritos]]"
friday-lunch: "[[Quick and Easy Grilled Potatoes]]"
friday-dinner: "[[Kielbasa with Peppers and Potatoes]]"
saturday-break: "[[Protein Powerhouse Baked Oatmeal]]"
saturday-lunch: "[[Kielbasa with Peppers and Potatoes]]"
saturday-dinner: "[[Cilantro-Lime Grilled Chicken]]"
sunday-break: "[[Protein Powerhouse Baked Oatmeal]]"
sunday-lunch: "[[Protein Powerhouse Baked Oatmeal]]"
sunday-dinner: "[[Cilantro-Lime Grilled Chicken]]"
wednesday-lunch: "[[A Good and Easy Garlic Chicken]]"
wednesday-break: "[[Test Breakfast]]"
tuesday-lunch: "[[Cilantro-Lime Grilled Chicken]]"
tuesday-break: "[[Freezer Breakfast Sandwiches]]"
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
