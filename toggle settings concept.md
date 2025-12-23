---
created: 2025-12-20
tags:
  - note
  - journal
edit-mode: false
---

```meta-bind-button
label: "⚙️ Toggle Settings"
style: default
actions:
  - type: updateMetadata
    bindTarget: edit-mode
    evaluate: true
    value: "!x"
```



`VIEW[{edit-mode} ? "### 🔧 Water Settings\nTarget: INPUT[number:water-goal-ml]ml\nBottle Size: INPUT[number:water-bottle-size]ml" : ""]`

