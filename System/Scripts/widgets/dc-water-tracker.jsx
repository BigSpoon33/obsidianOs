function WaterTracker() {
    // 1. SETUP & DATA
    const currentFile = dc.useCurrentFile();
    
    // Fetch all pages, then filter in JS (Robust)
    const pages = dc.useQuery("@page");
    if (!pages) return <div style={{opacity: 0.5, padding:'10px'}}>⏳ Loading Hydration...</div>;

    const settingsNote = pages.find(p => 
        (p.tags && (p.tags.has("#settings") || p.tags.has("settings"))) || 
        (p.$path && p.$path.endsWith("System/Settings.md"))
    );

    if (!settingsNote) return (
        <div style={{padding:'10px', border:'1px solid red', borderRadius:'8px', color:'red'}}>
            ⚠️ Error: Could not find 'System/Settings.md'.
        </div>
    );

    const goal = settingsNote.value("water-goal-ml") || 3000;
    const bottleSize = settingsNote.value("water-bottle-size") || 500;
    const currentMl = currentFile?.value("water-ml") || 0;

    // STATE
    const [localMl, setLocalMl] = dc.useState(currentMl);
    const [isDragging, setIsDragging] = dc.useState(false);
    const barRef = dc.useRef(null);

    // --- 🚨 THE FIX IS HERE 🚨 ---
    // We removed 'isDragging' from the dependency array [at the end].
    // Now this ONLY runs when 'currentMl' (the file) actually changes.
    dc.useEffect(() => {
        if (!isDragging) setLocalMl(currentMl);
    }, [currentMl]); 
    // ----------------------------

    // 2. AUTO-LOAD CSS
    dc.useEffect(() => {
        const loadStyles = async () => {
            const cssPath = "System/Scripts/styles/dc-water-tracker.css";
            const id = "dc-water-styles";
            if (document.getElementById(id)) return;
            if (await app.vault.adapter.exists(cssPath)) {
                const css = await app.vault.adapter.read(cssPath);
                const style = document.createElement("style");
                style.id = id;
                style.textContent = css;
                document.head.appendChild(style);
            }
        };
        loadStyles();
    }, []);

    // 3. SAVE FUNCTION
    const updateWater = async (newMl) => {
        const safeMl = Math.max(0, Math.round(newMl));
        setLocalMl(safeMl); // Optimistic Update

        const file = app.workspace.getActiveFile();
        if (file) {
            await app.fileManager.processFrontMatter(file, (fm) => {
                fm["water-ml"] = safeMl;
            });
        }
    };

    // 4. MOUSE LOGIC
    const calculateMlFromDrag = (e) => {
        if (!barRef.current) return localMl;
        const rect = barRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const ratio = Math.min(Math.max(x / rect.width, 0), 1);
        return Math.round(ratio * goal);
    };

    const handleDown = (e) => {
        e.preventDefault();
        setIsDragging(true);
        const val = calculateMlFromDrag(e);
        setLocalMl(val);
    };

    const handleMove = dc.useCallback((e) => {
        if (isDragging) {
            e.preventDefault();
            setLocalMl(calculateMlFromDrag(e));
        }
    }, [isDragging, goal]);

    const handleUp = dc.useCallback((e) => {
        if (isDragging) {
            // Calculate final value
            const finalVal = calculateMlFromDrag(e);
            
            // 1. Update the UI and File immediately
            updateWater(finalVal);
            
            // 2. Then stop dragging
            setIsDragging(false);
        }
    }, [isDragging, goal]);

    dc.useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMove);
            window.addEventListener('mouseup', handleUp);
        }
        return () => {
            window.removeEventListener('mousemove', handleMove);
            window.removeEventListener('mouseup', handleUp);
        };
    }, [isDragging, handleMove, handleUp]);

    // 5. BUTTON HANDLERS
    const addAmount = (amount) => updateWater(localMl + amount);

    // 6. RENDER
    const visualPercent = Math.min((localMl / goal) * 100, 100);
    const cursorLeft = Math.min(Math.max(visualPercent - 2, 0), 98);

    return (
        <div className="water-widget-container">
            {/* TEXT HEADER */}
            <div className="water-header">
                <div className="water-title">
                    <span className="water-icon">💧</span> Hydration
                </div>
                <div className="water-stats">
                    <span className="water-current">{localMl}</span>
                    <span className="water-divider">/</span>
                    <span className="water-goal">{goal} ml</span>
                </div>
            </div>

            {/* THE TRACK */}
            <div className="water-track" ref={barRef} onMouseDown={handleDown}>
                <div className="water-fill" style={{width: `${visualPercent}%`}}></div>
                <div className="water-cursor" style={{left: `${cursorLeft}%`}}></div>
            </div>

            {/* CONTROLS */}
            <div className="water-controls">
                <button onClick={() => addAmount(250)}>+250ml</button>
                <button onClick={() => addAmount(500)}>+500ml</button>
                <button className="btn-bottle" onClick={() => addAmount(bottleSize)}>
                    +{bottleSize}ml <span style={{opacity:0.6, fontSize:'0.9em'}}>(Bottle)</span>
                </button>
            </div>
        </div>
    );
}

return { Func: WaterTracker };