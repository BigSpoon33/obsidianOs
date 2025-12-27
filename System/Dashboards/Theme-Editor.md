---
tags: dashboard
cssclasses:
  - dashboard
  - wide
---

# Theme Editor

> [!warning] Deprecated
> This standalone Theme Editor has been integrated into the **Theme Studio**.
> 
> **Please use [[Theme-Dashboard|Theme Studio]]** for the best experience.
> 
> The Theme Studio combines both the Dashboard and Editor with seamless navigation between modes.

---

```datacorejsx
const scriptPath = "System/Scripts/Widgets/dc-themeEditor.jsx";
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

> [!tip] How to Use
> 1. **Create New Theme**: Select "+ New Theme" from dropdown, fill in properties
> 2. **Edit Existing**: Select a theme from dropdown to load and modify it
> 3. **Live Preview**: See changes instantly in the right panel
> 4. **Save**: Click "Create Theme" or "Save Changes" to save to file

> [!info] Theme Files
> Themes are saved to `System/Themes/` as markdown files with YAML frontmatter.
> After creating a theme, you can apply it from the [[Theme-Dashboard|Theme Studio]].
