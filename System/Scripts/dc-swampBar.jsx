function Func() {
    const current = dc.useCurrentFile();
    const initialVal = current.value("progress");

    const t = {
        updating: "Growing moss...",
        currentProgress: "Overgrowth: ",
        dragging: "Squishing...",
        clickOrDrag: "Drag to spread",
        percent: "% covered"
    };

    const [progress, setProgress] = dc.useState(initialVal || 0);
    const [isDragging, setIsDragging] = dc.useState(false);
    const [isUpdating, setIsUpdating] = dc.useState(false);
    const [styles, setStyles] = dc.useState("");
    const barRef = dc.useRef(null);

    // 1. DEDICATED SAVE FUNCTION
    const updateNoteProgress = async (newProgress) => {
        setIsUpdating(true);
        try {
            const activeFile = app.workspace.getActiveFile();
            if (activeFile) {
                await app.fileManager.processFrontMatter(activeFile, (fm) => {
                    fm.progress = newProgress;
                });
                new Notice(`Swamp logic updated: ${newProgress}%`);
            }
        } catch (error) {
            console.error("Update failed:", error);
            new Notice("Failed to grow moss!");
        }
        setIsUpdating(false);
    };

    // 2. LOAD CSS
    const cssFile = app.metadataCache.getFirstLinkpathDest("dc-swampBar.css");
    dc.useEffect(() => {
        if (cssFile) app.vault.cachedRead(cssFile).then(setStyles);
    }, []);

    // 3. SYNC
    dc.useEffect(() => {
        if (initialVal !== undefined) {
            setProgress(Math.min(Math.max(initialVal, 0), 100));
        }
    }, [initialVal]);

    // 4. MOUSE LOGIC (Using useCallback)
    const calculateProgress = (e) => {
        if (!barRef.current) return progress;
        const rect = barRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percent = Math.min(Math.max((x / rect.width) * 100, 0), 100);
        return Math.round(percent);
    };

    const handleDown = (e) => {
        e.preventDefault();
        setIsDragging(true);
        const val = calculateProgress(e);
        setProgress(val);
    };

    // OPTIMIZATION: Memoize the move handler
    const handleMove = dc.useCallback((e) => {
        if (isDragging) {
            e.preventDefault();
            setProgress(calculateProgress(e));
        }
    }, [isDragging]);

    // OPTIMIZATION: Memoize the up handler
    const handleUp = dc.useCallback((e) => {
        if (isDragging) {
            setIsDragging(false);
            const finalVal = calculateProgress(e);
            setProgress(finalVal);
            updateNoteProgress(finalVal);
        }
    }, [isDragging]);

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

    // 5. VISUAL MATH
    // Force the creature to stay within 2% and 98% of the bar width
    const creaturePos = Math.min(Math.max(progress - 2, 0), 98);

    return (
        <>
            <style>{styles}</style>
            
            {/* WRAPPER 1: The Centering Container */}
            <div style={{display: 'flex', justifyContent: 'center', margin: '10px 0'}}>
                
                {/* WRAPPER 2: The Responsive Width Limiter (80% width) */}
                <div style={{width: '80%', display: 'flex', flexDirection: 'column'}}>
                    
                    {/* THE TRACK */}
                    <div className="swamp-track" ref={barRef} onMouseDown={handleDown}>
                        
                        {/* THE FILL (Green) */}
                        <div className="swamp-fill" style={{width: `${progress}%`}}></div>
                        
                        {/* THE CREATURE (Independent Sibling) */}
                        {/* Notice we use 'left' instead of nesting it */}
                        <div 
                            className="swamp-creature" 
                            style={{left: `${creaturePos}%`}}
                        ></div>
                    </div>

                    {/* TEXT */}
                    <div style={{textAlign: 'center', marginTop: '8px'}}>
                        <span className="swamp-text-hover">
                            {isUpdating ? t.updating : `${t.currentProgress}${progress}${t.percent}`}
                        </span>
                        <div style={{fontSize: "0.7em", color: "var(--text-muted)", opacity: 0.6, marginTop: '2px'}}>
                            {!isUpdating && (isDragging ? t.dragging : t.clickOrDrag)}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

const renderedView = <Func />;
return { renderedView, Func };