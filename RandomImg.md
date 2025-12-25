---
created: 2025-12-23
tags:
  - note
  - journal
---
```datacorejsx
// Random GIF/Image Widget (UPDATED - WORKING)
const scriptPath = "System/Scripts/Widgets/dc-randomGif.jsx";
const target = dc.fileLink(scriptPath);
const result = await dc.require(target);
const Func = result?.Func ?? null;

return function View() {
    if (Func) {
        return Func();
    }
    return <p>Failed to render Random GIF widget</p>;
}
```
