# Dataview Test

## Test 1: Simple Dataview Query

```dataview
LIST
FROM ""
LIMIT 5
```

## Test 2: DataviewJS Query

```dataviewjs
dv.paragraph("✅ DataviewJS is working!");
```

## Test 3: Inline Query

Today is `$= dv.date('today').toFormat("MMMM dd, yyyy")`

## Test 4: DataviewJS in HTML

<div style="padding: 20px; background: #f0f0f0; border-radius: 8px;">

```dataviewjs
dv.paragraph("<div style='color: blue; font-weight: bold;'>This should be blue and bold</div>");
```

</div>
