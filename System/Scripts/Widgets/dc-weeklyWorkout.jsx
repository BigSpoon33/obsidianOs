function WeeklyScheduler() {
    // 1. SETUP & REACTIVITY
    const file = app.workspace.getActiveFile();
    // We use useFile to trigger re-renders, but we don't rely ONLY on it for data
    const currentFile = dc.useFile(file); 
    
    // 2. ROBUST DATA FETCHING
    // Strategy: Try Datacore first. If undefined, grab directly from Obsidian's cache.
    // This ensures we never get stuck on a "Loading" screen.
    const cache = app.metadataCache.getFileCache(file);
    const frontmatter = currentFile?.frontmatter || cache?.frontmatter || {};

    // STATE: Local overrides for instant UI updates
    const [localChanges, setLocalChanges] = dc.useState({});

    // 3. PARSER (Get Value Logic)
    const getServerValue = (day) => {
        // Try exact key OR lowercase key
        const raw = frontmatter[`schedule-${day}`] || frontmatter[`schedule-${day.toLowerCase()}`];
        if (!raw) return "";

        let str = "";
        // Case A: Link Object
        if (typeof raw === 'object' && raw.path) str = raw.path; 
        // Case B: String
        else if (typeof raw === 'string') str = raw; 
        
        // Cleanup
        if (str.endsWith(".md")) str = str.slice(0, -3);
        return str.replace(/[\[\]"]/g, "").trim();
    };

    // 4. FIND PLANS
    const allFiles = app.vault.getMarkdownFiles();
    const plans = allFiles.filter(f => {
        const fCache = app.metadataCache.getFileCache(f);
        const fFm = fCache?.frontmatter;
        if (!fFm) return false;

        const hasTag = fFm.tags && (
            Array.isArray(fFm.tags) ? fFm.tags.includes('workout-plan') : fFm.tags === 'workout-plan'
        );
        const hasCategory = fFm.categories && JSON.stringify(fFm.categories).includes("Workout Plan");

        return hasTag || hasCategory;
    }).map(f => f.basename).sort();

    // 5. UPDATE HANDLER
    const updateSchedule = async (day, planName) => {
        setLocalChanges(prev => ({ ...prev, [day]: planName }));
        await app.fileManager.processFrontMatter(file, (fm) => {
            const key = `schedule-${day}`;
            if (planName === "") delete fm[key]; 
            else fm[key] = `[[${planName}]]`; 
        });
    };

    // 6. STYLES
    const styles = {
        container: { display: 'flex', flexDirection: 'column', gap: '8px', padding: '15px', background: 'var(--background-secondary)', borderRadius: '8px', border: '1px solid var(--background-modifier-border)' },
        row: { display: 'grid', gridTemplateColumns: '100px 1fr', alignItems: 'center', gap: '10px' },
        label: { fontWeight: 'bold', textTransform: 'capitalize', color: 'var(--text-muted)', textAlign: 'right' },
        select: { width: '100%', padding: '6px', background: 'var(--background-primary)', color: 'var(--text-normal)', border: '1px solid var(--background-modifier-border)', borderRadius: '4px', cursor: 'pointer' },
        loading: { fontSize: '0.8em', opacity: 0.7, padding: '5px', fontStyle: 'italic' }
    };

    // 7. RENDER
    const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

    // If we truly have NO data yet, show a non-blocking message, but render the shell.
    const isDataReady = Object.keys(frontmatter).length > 0;

    return (
        <div style={styles.container}>
            <div style={{marginBottom: '10px', fontSize: '0.9em', opacity: 0.7, display: 'flex', justifyContent: 'space-between'}}>
                <strong>Weekly Schedule</strong>
                {!isDataReady && <span style={styles.loading}>Syncing...</span>}
            </div>
            
            {days.map(day => {
                const fileValue = getServerValue(day);
                const displayValue = localChanges[day] !== undefined ? localChanges[day] : fileValue;
                
                return (
                    <div key={day} style={styles.row}>
                        <div style={styles.label}>{day}</div>
                        <select 
                            style={styles.select}
                            value={displayValue} 
                            onChange={(e) => updateSchedule(day, e.target.value)}
                        >
                            <option value="">-- Rest Day --</option>
                            {plans.map(p => <option key={p} value={p}>{p}</option>)}
                            
                            {/* Fail-safe: Show saved value even if list is loading */}
                            {displayValue && !plans.includes(displayValue) && (
                                <option value={displayValue}>{displayValue}</option>
                            )}
                        </select>
                    </div>
                );
            })}
        </div>
    );
}

return { Func: WeeklyScheduler };