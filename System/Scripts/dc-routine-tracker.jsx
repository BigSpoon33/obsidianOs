function RoutineTracker() {
    const ctx = dc.useCurrentFile();
    const [stats, setStats] = dc.useState({ checked: 0, total: 0, score: 0 });
    // We add a subtle indicator so you know it's working
    const [isSyncing, setIsSyncing] = dc.useState(false);

    // --- THE SCANNER LOGIC ---
    const scanRoutine = async (file) => {
        // If no file passed, use active
        const targetFile = file || app.workspace.getActiveFile();
        if (!targetFile) return;

        try {
            const text = await app.vault.read(targetFile);
            
            // Regex to find "Nighttime Routine" (Case insensitive, handles icons)
            const headerRegex = /^#{1,6}\s+.*Nighttime Routine/im;
            const match = text.match(headerRegex);
            
            if (!match) return; 

            // Extract section
            const startIdx = match.index + match[0].length;
            const contentAfter = text.slice(startIdx);
            const endMatch = contentAfter.match(/^(#{1,6}\s|---)/m);
            const sectionContent = endMatch ? contentAfter.slice(0, endMatch.index) : contentAfter;

            // Count Checkboxes
            const totalMatches = sectionContent.match(/- \[ \]/g) || [];
            const checkedMatches = sectionContent.match(/- \[[xX]\]/g) || [];
            
            const total = totalMatches.length + checkedMatches.length;
            const checked = checkedMatches.length;
            const score = total === 0 ? 0 : Math.round((checked / total) * 100);

            setStats({ checked, total, score });
            setIsSyncing(false); // Done syncing

            // Save to Frontmatter (Only if changed)
            // We read the cache to compare, avoiding infinite loops
            const cache = app.metadataCache.getFileCache(targetFile);
            const currentSavedScore = cache?.frontmatter ? cache.frontmatter["night-score"] : undefined;

            if (currentSavedScore !== score) {
                 await app.fileManager.processFrontMatter(targetFile, (fm) => {
                    fm["night-score"] = score;
                    fm["night-checked"] = checked;
                    fm["night-total"] = total;
                });
            }

        } catch (e) {
            console.error("Routine Error", e);
            setIsSyncing(false);
        }
    };

    // --- REAL-TIME LISTENER (DEBOUNCED) ---
    dc.useEffect(() => {
        // 1. Initial Scan
        scanRoutine();

        // 2. Setup the Listener
        // We create a "timer" variable to handle the delay
        let debounceTimer = null;

        const onModify = (file) => {
            // Only care if the modified file is the one we are looking at
            const currentPath = app.workspace.getActiveFile()?.path;
            if (file.path === currentPath) {
                // Show "Syncing..." immediately so UI feels responsive
                setIsSyncing(true);
                
                // Reset the timer (if user keeps typing, we keep waiting)
                clearTimeout(debounceTimer);
                
                // Wait 1000ms (1 second) after the last change to actually scan
                debounceTimer = setTimeout(() => {
                    scanRoutine(file);
                }, 1000);
            }
        };

        // Register the event with Obsidian
        const eventRef = app.vault.on("modify", onModify);

        // Cleanup: Remove listener when we close the note to free memory
        return () => {
            app.vault.offref(eventRef);
            clearTimeout(debounceTimer);
        };
    }, []);

    // --- RENDER ---
    const getColor = (s) => {
        if (s === 100) return "#4facfe"; 
        if (s >= 50) return "#ffd700";
        return "#ff6b6b"; 
    };

    return (
        <div style={{
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            padding: '10px 16px',
            background: 'rgba(255,255,255,0.03)',
            borderRadius: '8px',
            border: '1px solid rgba(255,255,255,0.05)',
            marginBottom: '16px',
            fontFamily: 'var(--font-ui)'
        }}>
            <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
                <span style={{fontSize:'0.95em', fontWeight:'600', color:'var(--text-normal)'}}>
                    Routine Completion
                </span>
                {/* Status Indicator instead of Button */}
                <span style={{
                    fontSize: '0.75em', 
                    color: 'var(--text-muted)', 
                    opacity: isSyncing ? 1 : 0, 
                    transition: 'opacity 0.2s',
                    fontStyle: 'italic'
                }}>
                    Updating...
                </span>
            </div>
            
            <div style={{display:'flex', alignItems:'center', gap:'12px'}}>
                <span style={{fontSize:'0.9em', fontWeight:'bold', color: getColor(stats.score)}}>
                    {stats.checked}/{stats.total}
                </span>
                <div style={{
                    width: '80px', 
                    height: '8px', 
                    background: 'rgba(255,255,255,0.1)', 
                    borderRadius: '4px',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        width: `${stats.score}%`, 
                        height: '100%', 
                        background: getColor(stats.score),
                        transition: 'width 0.3s ease'
                    }} />
                </div>
            </div>
        </div>
    );
}

return { Func: RoutineTracker };