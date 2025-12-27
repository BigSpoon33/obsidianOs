---
cssclasses:
  - dashboard
  - nyanTile
  - img-grid
banner: "System/Attachments/Kimetsu No Yaiba Art GIF by Luigi Salas - Motion Designer.gif"
banner_x: 0.5
banner_y: 0.61
edit_mode: true
breakfast: "[[Make-Ahead Rhubarb Yogurt Parfaits]]"
lunch: "[[Mango Chicken Meal Prep Bowls]]"
dinner: "[[Roast Beef Horseradish Roll-Ups]]"
snacks: []
consumed-calories: 0
consumed-protein: 0
consumed-carbs: 0
consumed-fat: 0
---

<div style="text-align: center; padding: 30px 0 20px 0;">
  <h1 style="font-size: 3em; margin: 0; letter-spacing: 3px;">🏡 HOME 🏡</h1>
  <p style="color: var(--text-muted); font-size: 1.2em; margin-top: 10px;">Your Personal Knowledge Management Hub</p>
</div>
add a few quick links here like create daily note if not made
```datacorejsx
const { GloButton } = await dc.require(
    dc.fileLink("System/Scripts/Components/dc-gloButton.jsx")
);

<GloButton 
    label="Click Me" 
    icon="🎉" 
    rainbow={true}
    onClick={() => new Notice('Clicked!')} 
/>
```
---
```datacorejsx
const scriptPath = "System/Scripts/Widgets/dc-greeting.jsx";  // ⬅️ replace it with your jsx file path!
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

![[System/Attachments/gojiraglasses.jpg]]
```datacorejsx
const scriptPath = "System/Scripts/Widgets/dc-randomQuote.jsx";  // ⬅️ replace it with your jsx file path!
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


```datacorejsx
return function View() {
    // 1. STATE: Track what the user types
    const [searchTerm, setSearchTerm] = dc.useState("");
    
    // 2. DATA: Get all files
    const pages = dc.useQuery("@page");

    // Safety check
    if (!pages) return <span className="zen-loading">Indexing Vault...</span>;

    // 3. LOGIC: Filter the list based on the search term
    const results = pages
        .filter(p => p.$name.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => b.$mtime - a.$mtime) // Sort by most recent
        .slice(0, 5); // Limit to top 5 to keep it clean

    // 4. RENDER
    return (
        <div style={{
            padding: '15px', 
            border: '1px solid var(--background-modifier-border)', 
            borderRadius: '8px',
            backgroundColor: 'var(--background-secondary)'
        }}>
            <div style={{marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px'}}>
                <span style={{fontSize: '1.2em'}}>🔍</span>
                {/* THE INPUT FIELD */}
                <input 
                    type="text" 
                    placeholder="Type to filter notes..." 
                    value={searchTerm}
                    onInput={(e) => setSearchTerm(e.target.value)}
                    style={{
                        width: '100%', 
                        padding: '8px', 
                        borderRadius: '4px', 
                        border: '1px solid var(--background-modifier-border)'
                    }}
                />
            </div>

            <div style={{display: 'flex', flexDirection: 'column', gap: '5px'}}>
                {results.length === 0 ? (
                    <div style={{opacity: 0.5, fontStyle: 'italic', padding: '10px'}}>No matches found.</div>
                ) : (
                    results.map(page => (
                        <a href={page.$path} style={{
                            textDecoration: 'none', 
                            color: 'var(--text-normal)',
                            padding: '8px', 
                            borderRadius: '4px',
                            background: 'var(--background-primary)',
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}>
                            <span>{page.$name}</span>
                            <span style={{opacity: 0.5, fontSize: '0.8em'}}>{moment(page.$mtime).format("MMM D")}</span>
                        </a>
                    ))
                )}
            </div>
        </div>
    );
}
```


## 🎯 Quick Access Dashboards

![[dashboards.base]]

![[Categories.base]]

---

## 📊 Activity Tracker

```datacorejsx
const scriptPath = "System/Scripts/Widgets/dc-activityTracker.jsx";
const target = dc.fileLink(scriptPath);
const result = await dc.require(target);
const view = result?.renderedView ?? result?.View ?? result;  
const Func = result?.Func ?? null;

return function View() {
    const currentFile = dc.useCurrentFile();
    if (Func) {
        return Func({ currentFile, scriptPath });
    }
    return view ?? <p>Failed to render Activity Tracker</p>;
}
```

---

## 📈 Vault Statistics

```dataviewjs
const totalNotes = dv.pages().length;
const dailyNotes = dv.pages('"Daily" or "Periodic"').where(p => p.file.day).length;
const classPages = dv.pages().where(p => p.categories && String(p.categories).includes("Classes")).length;
const coursework = dv.pages().where(p => p.categories && String(p.categories).includes("Coursework")).length;

dv.paragraph(`
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 15px; text-align: center;">
  <div style="background: var(--background-secondary); padding: 15px; border-radius: 8px;">
    <div style="font-size: 2em; font-weight: bold; color: var(--interactive-accent);">${totalNotes}</div>
    <div style="font-size: 0.85em; color: var(--text-muted);">Total Notes</div>
  </div>
  <div style="background: var(--background-secondary); padding: 15px; border-radius: 8px;">
    <div style="font-size: 2em; font-weight: bold; color: var(--interactive-accent);">${dailyNotes}</div>
    <div style="font-size: 0.85em; color: var(--text-muted);">Daily Notes</div>
  </div>
  <div style="background: var(--background-secondary); padding: 15px; border-radius: 8px;">
    <div style="font-size: 2em; font-weight: bold; color: var(--interactive-accent);">${classPages}</div>
    <div style="font-size: 0.85em; color: var(--text-muted);">Classes</div>
  </div>
  <div style="background: var(--background-secondary); padding: 15px; border-radius: 8px;">
    <div style="font-size: 2em; font-weight: bold; color: var(--interactive-accent);">${coursework}</div>
    <div style="font-size: 0.85em; color: var(--text-muted);">Assignments</div>
  </div>
</div>
`);
```

---

## 📚 Recent Updates

```dataviewjs
const recent = dv.pages()
  .sort(f => f.file.mtime, 'desc')
  .limit(5);

dv.list(recent.file.link);
```
recently active is already a part of the search widget. should we make the search widget exclusively search and add some features to it or keep recent separate or just make one super widget?
```datacorejsx
return function View() {
    // Query all pages
    const pages = dc.useQuery("@page");

    // Handle loading
    if (!pages) return <span>Loading...</span>;

    // Sort by modified time (descending) and take top 3
    // We use a safe copy of the array to avoid mutating the original data
    const recentDocs = pages
        .sort((a, b) => b.$mtime - a.$mtime)
        .slice(0, 3);

    return (
        <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
            <h4 style={{margin: '0 0 5px 0', opacity: 0.6, fontSize: '0.8em', textTransform: 'uppercase'}}>
                🕒 Recently Active
            </h4>
            
            {recentDocs.map(page => (
                <a href={page.$path} className="internal-link" style={{
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '10px',
                    textDecoration: 'none',
                    padding: '8px',
                    background: 'var(--background-secondary)',
                    borderRadius: '6px',
                    border: '1px solid transparent'
                }}>
                    <span style={{fontSize: '1.2em'}}>📝</span>
                    <div style={{flex: 1}}>
                        <div style={{fontWeight: 'bold', color: 'var(--text-normal)'}}>
                            {page.$name}
                        </div>
                        <div style={{fontSize: '0.75em', color: 'var(--text-muted)'}}>
                            {/* Relative time (e.g., "2 hours ago") */}
                            {moment(page.$mtime).fromNow()}
                        </div>
                    </div>
                </a>
            ))}
        </div>
    );
}
```

---

## ✅ Agenda
![[tasks-default.base]]

---

## 🔖 Quick Links

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin: 20px 0;">

**📁 Categories**
- [[System/Categories/Categories|All Categories]]
- [[System/Categories/Projects|Projects]]
- [[System/Categories/Books|Books]]
- [[System/Categories/Recipes|Recipes]]

**📝 Templates**
- [[System/Templates/Daily Note Template (MetaBind)|Daily Note]]
- [[System/Templates/Class Template|New Class]]
- [[System/Templates/Coursework Template|New Assignment]]

**🔧 System**
- [[Academic System/SYSTEM OVERVIEW|Academic System]]
- [[Home|Original Home]]
- Settings

</div>

---

![[System/Attachments/dittodance.gif]]![[System/Attachments/mewspin.gif]]![[System/Attachments/pikaponder.gif]]
Frogs on a log ^