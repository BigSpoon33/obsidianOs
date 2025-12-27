---
tags:
  - dashboard
  - kitchen
cssclasses:
  - dashboard
monday-break: "[[Make-Ahead Greek Yogurt Parfait]]"
monday-lunch: "[[Chickpea Curry]]"
monday-dinner: "[[Roast Beef Horseradish Roll-Ups]]"
tuesday-dinner: "[[Cilantro-Lime Grilled Chicken]]"
wednesday-dinner: "[[Chickpea Curry]]"
thursday-break: "[[Make-Ahead Greek Yogurt Parfait]]"
thursday-lunch: "[[A Good and Easy Garlic Chicken]]"
thursday-dinner: "[[Sarah's Easy Shredded Chicken Taco Filling]]"
friday-break: "[[Make-Ahead Freezer Breakfast Burritos]]"
friday-lunch: "[[Simple Mexican Quinoa]]"
friday-dinner: "[[Baked Salmon Fillets Dijon]]"
saturday-break: "[[Make-Ahead Rhubarb Yogurt Parfaits]]"
saturday-lunch: "[[Mango Chicken Meal Prep Bowls]]"
saturday-dinner: "[[Roast Beef Horseradish Roll-Ups]]"
sunday-break: "[[Make-Ahead Sweet Potato and Chorizo Breakfast Burritos]]"
sunday-lunch: "[[Sarah's Easy Shredded Chicken Taco Filling]]"
sunday-dinner: "[[Grilled Chicken with Rosemary and Bacon]]"
wednesday-lunch: "[[Kielbasa with Peppers and Potatoes]]"
wednesday-break: "[[Protein Powerhouse Baked Oatmeal]]"
tuesday-lunch: "[[Asian Chicken Salad in a Jar]]"
tuesday-break: "[[Make-Ahead Sweet Potato and Chorizo Breakfast Burritos]]"
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
