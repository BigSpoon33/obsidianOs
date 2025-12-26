---
cssclasses:
  - dashboard
---

# Theme Dashboard
Theme Console
```datacorejsx
const scriptPath = "System/Scripts/Widgets/dc-themeConsole.jsx";  // ⬅️ replace it with your jsx file path!
const target = dc.fileLink(scriptPath);
const result = await dc.require(target);
const view = result?.renderedView ?? result?.View ?? result;  
const Func = result?.Func ?? null;

return function View() {
    const currentFile = dc.useCurrentFile();
    if (Func) {
        return Func({ currentFile, scriptPath });
    }
    return view ?? <p>Failed to render</p>;
}
```

Theme Preview
```datacorejsx
const scriptPath = "System/Scripts/Widgets/dc-themePreview.jsx";  // ⬅️ replace it with your jsx file path!
const target = dc.fileLink(scriptPath);
const result = await dc.require(target);
const view = result?.renderedView ?? result?.View ?? result;  
const Func = result?.Func ?? null;

return function View() {
    const currentFile = dc.useCurrentFile();
    if (Func) {
        return Func({ currentFile, scriptPath });
    }
    return view ?? <p>Failed to render</p>;
}
```
