// ============================================================================
// PARTICLE CONTROLLER DASHBOARD
// ============================================================================

// 1. Load Theme Provider (Standard Datacore boilerplate)
const themeProvider = await dc.require(dc.fileLink("System/Scripts/core/dc-theme-provider.jsx"));
const { useTheme } = themeProvider;

function ParticleDashboard() {
    
    // ============ STATE & VARS ============
    const [particleCount, setParticleCount] = dc.useState(0);
    const [isUpdating, setIsUpdating] = dc.useState(false);
    
    // Target File: "Datacore Examples.md"
    // We try to find it specifically, otherwise fallback to current file
    const getTargetFile = () => {
        const file = app.vault.getAbstractFileByPath("Datacore Examples.md");
        return file instanceof TFile ? file : app.workspace.getActiveFile();
    };

    // Load initial Particle Count
    dc.useEffect(() => {
        const file = getTargetFile();
        if(file) {
            // Read cache to get current particle count
            const cache = app.metadataCache.getFileCache(file);
            const count = cache?.frontmatter?.particles || 0;
            setParticleCount(count);
        }
    }, []);

    // Function to change particle count
    const updateParticles = async (amount) => {
        setIsUpdating(true);
        const file = getTargetFile();
        if (file) {
            await app.fileManager.processFrontMatter(file, (fm) => {
                const current = fm.particles || 0;
                // Prevent going below 0, increment by amount
                fm.particles = Math.max(0, current + amount);
                setParticleCount(fm.particles);
            });
        }
        setIsUpdating(false);
    };

    // ============================================================
    // COMPONENT: PROGRESS BAR (Your provided code, wrapped here)
    // ============================================================
    const ProgressBar = () => {
        const current = dc.useCurrentFile();
        let initialProgress = current.value("progress"); // Controls Speed/Chaos
        
        // --- (Simplified version of your logic for brevity in the dash) ---
        const [progress, setProgress] = dc.useState(initialProgress || 0);
        const [isDragging, setIsDragging] = dc.useState(false);
        const barRef = dc.useRef(null);

        const updateSpeed = async (newVal) => {
             const activeFile = app.workspace.getActiveFile();
             await app.fileManager.processFrontMatter(activeFile, (fm) => {
                fm.progress = newVal;
             });
        };

        const handleMove = (e) => {
            if (!barRef.current) return;
            const rect = barRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const pct = Math.min(Math.max((x / rect.width) * 100, 0), 100);
            setProgress(Math.round(pct));
            if(!isDragging) updateSpeed(Math.round(pct)); // Update on click
        };

        return (
            <div className="dash-progress-wrapper">
                <div className="dash-label">Chaos / Speed Control</div>
                <div 
                    ref={barRef}
                    className="draggable-progress-container"
                    onMouseDown={(e) => { setIsDragging(true); handleMove(e); }}
                    onMouseMove={(e) => { if(isDragging) handleMove(e); }}
                    onMouseUp={() => { setIsDragging(false); updateSpeed(progress); }}
                    onMouseLeave={() => { if(isDragging) { setIsDragging(false); updateSpeed(progress); }}}
                >
                    <div className="draggable-progress-fill" style={{ width: `${progress}%` }} />
                    <div 
                        className="draggable-nyan-cat"
                        style={{ left: `${Math.min(progress, 95)}%` }} // Keep cat inside
                    />
                </div>
                <div style={{textAlign:'center', fontSize:'0.8em', color:'var(--text-muted)'}}>
                    {progress}% Intensity
                </div>
            </div>
        );
    };

    // ============================================================
    // RENDER: THE MAIN DASHBOARD LAYOUT
    // ============================================================
    return (
        <div className="particle-dashboard-container">
            
            {/* 1. TOP: PARTICLE DISPLAY WINDOW */}
            <div className="particle-window-frame">
                {/* PLACEHOLDER: This is where your actual particle script goes.
                   Since I don't have the particle script code, I am putting a 
                   div here. In reality, you would paste that script block here 
                   or embed it.
                */}
                <div style={{
                    width: '100%', height: '100%', 
                    display:'flex', alignItems:'center', justifyContent:'center',
                    background: 'rgba(0,0,0,0.3)', color: '#fff'
                }}>
                    [ PARTICLE DISPLAY ]<br/>
                    Current Particles: {particleCount}
                </div>
            </div>

            {/* 2. MIDDLE: CONTROLS (Horizontal) */}
            <div className="particle-controls-row">
                
                {/* Decrease Button */}
                <button 
                    className="particle-btn btn-decrease"
                    onClick={() => updateParticles(-10)}
                    disabled={isUpdating}
                >
                    <span className="btn-icon">−</span> Less Particles
                </button>

                {/* Display Value in Middle */}
                <div className="particle-value-readout">
                    <span style={{fontSize:'0.7em', color:'var(--text-muted)'}}>COUNT</span>
                    <span style={{fontSize:'1.5em', fontWeight:'bold', color:'var(--text-accent)'}}>
                        {particleCount}
                    </span>
                </div>

                {/* Increase Button */}
                <button 
                    className="particle-btn btn-increase"
                    onClick={() => updateParticles(10)}
                    disabled={isUpdating}
                >
                    <span className="btn-icon">+</span> More Particles
                </button>
            </div>

            {/* 3. BOTTOM: PROGRESS BAR (Speed/Chaos) */}
            <ProgressBar />

        </div>
    );
}

return { ParticleDashboard };