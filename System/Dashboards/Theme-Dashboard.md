---
cssclasses:
  - dashboard
  - wide
---

# Theme Dashboard

```datacorejsx
const scriptPath = "System/Scripts/Widgets/dc-themeDashboard.jsx";
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

---

> [!info] Legacy Widgets
> The separate console and preview widgets are still available if needed:
> - `System/Scripts/Widgets/dc-themeConsole.jsx` - Theme selector only
> - `System/Scripts/Widgets/dc-themePreview.jsx` - Preview only
