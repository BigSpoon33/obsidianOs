// ============================================================================
// UNIVERSAL DRAGGABLE BAR
// Accepts props: targetKey (string), label (string), theme (object)
// ============================================================================
const themeProvider = await dc.require(dc.fileLink("System/Scripts/Core/dc-themeProvider.jsx"));
const { useTheme } = themeProvider;

function Func({ targetKey = "progress", label = "Control" }) {
    
    // 1. DYNAMIC DATA FETCHING
    const current = dc.useCurrentFile();
    // We look for the variable passed in 'targetKey' (e.g., "particles" or "progress")
    const initialProgress = current.value(targetKey); 
    
    // Theme Hook
    const { theme } = useTheme();

    // State
    const [progress, setProgress] = dc.useState(initialProgress || 0);
    const [isDragging, setIsDragging] = dc.useState(false);
    const barRef = dc.useRef(null);

    // 2. DYNAMIC UPDATE FUNCTION
    const updateFrontmatter = async (newVal) => {
         const activeFile = app.workspace.getActiveFile();
         await app.fileManager.processFrontMatter(activeFile, (fm) => {
            // Dynamic Key Access: fm["particles"] or fm["progress"]
            fm[targetKey] = newVal; 
         });
    };

    // Listen for external changes (if the note updates via another source)
    dc.useEffect(() => {
        if (initialProgress !== undefined) setProgress(initialProgress);
    }, [initialProgress]);

    const handleMove = (e) => {
        if (!barRef.current) return;
        const rect = barRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        // Clamp between 0 and 100
        const pct = Math.min(Math.max((x / rect.width) * 100, 0), 100);
        setProgress(Math.round(pct));
        
        // Update live if dragging, or on click
        if(!isDragging) updateFrontmatter(Math.round(pct)); 
    };

    return (
        <div style={{ marginBottom: '1rem', background: 'var(--background-primary-alt)', padding: '10px', borderRadius: '8px' }}>
            <div style={{ 
                display:'flex', justifyContent:'space-between', marginBottom:'5px', 
                fontSize:'0.8em', color:'var(--text-muted)', fontWeight: 'bold', textTransform: 'uppercase'
            }}>
                <span>{label}</span>
                <span>{progress}%</span>
            </div>

            <div 
                ref={barRef}
                className="draggable-progress-container"
                onMouseDown={(e) => { setIsDragging(true); handleMove(e); }}
                onMouseMove={(e) => { if(isDragging) handleMove(e); }}
                onMouseUp={() => { setIsDragging(false); updateFrontmatter(progress); }}
                onMouseLeave={() => { if(isDragging) { setIsDragging(false); updateFrontmatter(progress); }}}
            >
                {/* The Bar Fill */}
                <div className="draggable-progress-fill" style={{ 
                    width: `${progress}%`,
                    // Use theme if available, or fallback rainbow
                    background: theme?.['bar-fill-gradient'] || 'linear-gradient(90deg, #ff0080, #40e0d0)' 
                }} />
                
                {/* The Sprite (Nyan Cat / Moth / Etc) */}
                <div 
                    className="draggable-nyan-cat"
                    style={{ 
                        left: `${Math.min(progress, 98)}%`,
                        backgroundImage: theme?.['bar-sprite'] ? `url(${theme['bar-sprite']})` : '' 
                    }} 
                />
            </div>
        </div>
    );
}

return { Func };