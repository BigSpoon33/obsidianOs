---
tags: dashboard
cssclasses:
  - dashboard
  - wide
---

# Theme Studio

```datacorejsx
const scriptPath = "System/Scripts/Widgets/dc-themeStudio.jsx";
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

> [!info] Theme Studio
> The Theme Studio combines the **Dashboard** and **Editor** into one unified interface.
> - **Dashboard Mode**: Select sprite packs, apply color overrides, preview and apply themes
> - **Editor Mode**: Create new themes or edit existing ones with live preview
> 
> Use the toggle buttons at the top to switch between modes. Click "Edit" on any theme card to jump directly to editing that theme.

> [!tip] Legacy Widgets
> The individual widgets are still available if needed:
> - `System/Scripts/Widgets/dc-themeDashboard.jsx` - Dashboard only
> - `System/Scripts/Widgets/dc-themeEditor.jsx` - Editor only
> - `System/Scripts/Widgets/dc-themeConsole.jsx` - Theme selector (legacy)
> - `System/Scripts/Widgets/dc-themePreview.jsx` - Preview only (legacy)
