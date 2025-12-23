function AdminButtons() {
    const file = app.workspace.getActiveFile();
    
    // UI States
    const [editMode, setEditMode] = dc.useState(false); // Toggle Edit List
    const [addingType, setAddingType] = dc.useState(null); // 'warmup', 'exercises', etc.
    const [inputName, setInputName] = dc.useState(""); // What user is typing
    
    // Force refresh state
    const [version, setVersion] = dc.useState(0);

    // --- 1. GET DATA ---
    const cache = app.metadataCache.getFileCache(file);
    const frontmatter = cache ? cache.frontmatter : {};
    
    const warmups = frontmatter?.warmup || [];
    const exercises = frontmatter?.exercises || [];
    const cooldowns = frontmatter?.cooldown || [];

    // --- 2. THE ACTUAL ADD LOGIC ---
    const performAdd = async () => {
        if (!inputName || !addingType) return;
        
        // Auto-format: "Squats" -> "[[Squats]]"
        const newName = inputName.startsWith("[[") ? inputName : `[[${inputName}]]`;
        const type = addingType;

        // Reset UI immediately for snappy feel
        setAddingType(null);
        setInputName("");

        // A. Update YAML
        await app.fileManager.processFrontMatter(file, (fm) => {
            if (!fm[type]) fm[type] = [];
            if (type === "exercises") {
                fm[type].push({ link: newName, sets: 3, reps: "10", weight: "0 lbs" });
            } else {
                fm[type].push({ link: newName, info: "Duration" });
            }
        });

        // B. Update Text Body
        setTimeout(async () => {
            const content = await app.vault.read(file);
            const currentCache = app.metadataCache.getFileCache(file);
            const list = currentCache.frontmatter[type] || [];
            const index = list.length - 1; 

            let textBlock = "";
            let targetHeader = "";

            if (type === "exercises") {
                textBlock = `### ${index + 1}. ${newName}\n` +
                `**Sets:** \`INPUT[number:exercises[${index}].sets]\` | ` + 
                `**Reps:** \`INPUT[text:exercises[${index}].reps]\` | ` + 
                `**Weight:** \`INPUT[text:exercises[${index}].weight]\`\n` +
                `**Rest:** 60 seconds`;
                targetHeader = "## Cool Down";
            } else if (type === "warmup") {
                textBlock = `- ${newName}: \`INPUT[text:warmup[${index}].info]\``;
                targetHeader = "## Main Workout";
            } else if (type === "cooldown") {
                textBlock = `- ${newName}: \`INPUT[text:cooldown[${index}].info]\``;
                targetHeader = "## Progress Tracking";
            }

            const regex = new RegExp(`(\\n\\s*)*${targetHeader}`, "m");
            const replacement = `\n${textBlock}\n\n${targetHeader}`;
            
            if (content.match(regex)) {
                await app.vault.modify(file, content.replace(regex, replacement));
                setVersion(v => v + 1); 
            } else {
                new Notice(`Error: Header "${targetHeader}" not found.`);
            }
        }, 300);
    };

    // --- 3. DELETE LOGIC ---
    const removeEntry = async (type, index) => {
        await app.fileManager.processFrontMatter(file, (fm) => {
            if (fm[type]) fm[type].splice(index, 1);
        });

        setTimeout(async () => {
            let content = await app.vault.read(file);
            const uniqueId = `${type}\\[${index}\\]`;
            
            if (type === "exercises") {
                const inputLineRegex = new RegExp(`^.*${uniqueId}.*$`, "m");
                const match = content.match(inputLineRegex);
                if (match) {
                     const lines = content.split("\n");
                     const matchIndex = lines.findIndex(l => l.includes(`${type}[${index}]`));
                     if (matchIndex > -1) {
                         lines.splice(matchIndex - 1, 3); 
                         content = lines.join("\n");
                     }
                }
            } else {
                const lineRegex = new RegExp(`^.*${uniqueId}.*\\n?`, "gm");
                content = content.replace(lineRegex, "");
            }

            const reIndexPattern = new RegExp(`${type}\\[(\\d+)\\]`, "g");
            content = content.replace(reIndexPattern, (match, numStr) => {
                const num = parseInt(numStr);
                if (num > index) return `${type}[${num - 1}]`;
                return match;
            });

            if (type === "exercises") {
                let counter = 1;
                content = content.replace(/^### \d+\./gm, () => `### ${counter++}.`);
            }
            content = content.replace(/\n\n\n/g, "\n\n");

            await app.vault.modify(file, content);
            setVersion(v => v + 1); 
            new Notice("Item deleted.");
        }, 300);
    };

    // --- 4. RENDER HELPERS ---
    const renderList = (list, type, title) => (
        <div style={{marginTop: '10px', padding: '10px', background: 'var(--background-primary)', borderRadius: '6px'}}>
            <div style={{fontSize: '0.7em', fontWeight: 'bold', textTransform: 'uppercase', opacity: 0.5, marginBottom: '5px'}}>
                {title}
            </div>
            {list.map((item, i) => {
                const name = item.link || "Item";
                return (
                    <div key={i} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9em', padding: '4px 0', borderBottom: '1px solid var(--background-modifier-border)'}}>
                        <span>{i + 1}. {name}</span>
                        <button 
                            className="mod-warning"
                            style={{padding: '2px 8px', height: 'auto', fontSize: '0.8em', background: 'transparent', color: 'var(--text-muted)', cursor: 'pointer'}}
                            onClick={() => removeEntry(type, i)}
                            title="Delete Item"
                        >
                            🗑️
                        </button>
                    </div>
                );
            })}
            {list.length === 0 && <div style={{opacity:0.3, fontSize: '0.8em'}}>Empty</div>}
        </div>
    );

    // --- 5. MAIN RENDER ---
    return (
        <div style={{
            marginBottom: '20px', padding: '12px', 
            background: 'var(--background-secondary)', 
            borderRadius: '8px', border: '1px solid var(--background-modifier-border)'
        }}>
            {/* --- HEADER ROW --- */}
            <div style={{display: 'flex', gap: '10px', alignItems: 'center', minHeight: '30px'}}>
                
                {/* STATE A: INPUT MODE (User is typing name) */}
                {addingType ? (
                    <div style={{display: 'flex', gap: '8px', width: '100%', alignItems: 'center'}}>
                        <strong style={{fontSize: '0.9em', whiteSpace: 'nowrap'}}>
                            New {addingType === 'exercises' ? 'Exercise' : 'Item'}:
                        </strong>
                        <input 
                            type="text" 
                            autoFocus
                            placeholder="e.g. Squats"
                            value={inputName}
                            onInput={(e) => setInputName(e.target.value)}
                            onKeyDown={(e) => { if(e.key === 'Enter') performAdd(); if(e.key === 'Escape') setAddingType(null); }}
                            style={{flex: 1, padding: '4px 8px', borderRadius: '4px', border: '1px solid var(--background-modifier-border-focus)'}}
                        />
                        <button className="mod-cta" onClick={performAdd} style={{cursor: 'pointer'}}>✔️</button>
                        <button onClick={() => {setAddingType(null); setInputName("");}} style={{cursor: 'pointer'}}>❌</button>
                    </div>
                ) : (
                
                /* STATE B: BUTTON MODE (Normal) */
                    <>
                        <strong style={{fontSize: '0.9em', marginRight: 'auto', display: 'flex', alignItems: 'center', gap: '8px'}}>
                            ⚙️ Controls
                            <button onClick={() => setEditMode(!editMode)} style={{fontSize: '0.7em', padding: '2px 8px', height: 'auto', cursor: 'pointer'}}>
                                {editMode ? "Done" : "Edit / Delete"}
                            </button>
                        </strong>
                        
                        {!editMode && (
                            <>
                                <button style={{cursor: 'pointer'}} onClick={() => { setAddingType('warmup'); setInputName(""); }}>+ Warmup</button>
                                <button style={{cursor: 'pointer'}} onClick={() => { setAddingType('exercises'); setInputName(""); }}>+ Exercise</button>
                                <button style={{cursor: 'pointer'}} onClick={() => { setAddingType('cooldown'); setInputName(""); }}>+ Cooldown</button>
                            </>
                        )}
                    </>
                )}
            </div>

            {/* --- MANAGER LIST (Only visible in Edit Mode) --- */}
            {editMode && !addingType && (
                <div style={{marginTop: '10px', borderTop: '1px solid var(--background-modifier-border)', paddingTop: '10px'}}>
                    {renderList(warmups, "warmup", "Manage Warmups")}
                    {renderList(exercises, "exercises", "Manage Exercises")}
                    {renderList(cooldowns, "cooldown", "Manage Cooldowns")}
                </div>
            )}
        </div>
    );
}

return { Func: AdminButtons };