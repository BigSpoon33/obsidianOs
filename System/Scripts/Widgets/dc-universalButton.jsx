// ============================================================================
// UNIVERSAL TOGGLE BUTTON (Moth Style)
// Props: targetKey, label, onLabel, offLabel, targetFile (path)
// ============================================================================

function UniversalButton({ 
    targetKey = "state", 
    label = "Toggle", 
    onLabel = "ACTIVE", 
    offLabel = "INACTIVE",
    targetFile = null // Optional: Path to a specific file (e.g. "Folder/Note.md")
}) {
    // 1. Determine which file to modify
    const getFile = () => {
        if (targetFile) return app.vault.getAbstractFileByPath(targetFile);
        return app.workspace.getActiveFile();
    }

    const fileToCheck = getFile();
    
    // 2. Read Data
    // We use a cache read for non-active files to be faster
    const cache = fileToCheck ? app.metadataCache.getFileCache(fileToCheck) : null;
    const initialVal = cache?.frontmatter?.[targetKey] || false;
    
    const [isActive, setIsActive] = dc.useState(initialVal);
    const [isHovered, setIsHovered] = dc.useState(false);

    // 3. Toggle Function
    const toggleState = async () => {
        const newState = !isActive;
        setIsActive(newState); // Optimistic UI update
        
        const f = getFile();
        if(f) {
            await app.fileManager.processFrontMatter(f, (fm) => {
                fm[targetKey] = newState;
            });
        }
    };

    // Style Variables
    const borderColor = isActive ? '#ffd700' : '#4a5d43';
    const boxShadow = isActive || isHovered ? `0 0 15px 2px ${isActive ? 'rgba(255, 215, 0, 0.3)' : 'rgba(154, 237, 166, 0.2)'}` : 'none';

    return (
        <div 
            onClick={toggleState}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                padding: '15px', borderRadius: '12px', cursor: 'pointer',
                background: '#2b2b2b', border: `1px solid ${borderColor}`,
                boxShadow: boxShadow, transition: 'all 0.3s ease',
                minWidth: '120px', flex: 1
            }}
        >
            {/* LABEL */}
            <span style={{ 
                color: isActive ? '#ffd700' : '#a8c6a0', 
                fontWeight: 'bold', fontSize: '1.1em', marginBottom: '5px',
                textShadow: isActive ? '0 0 5px rgba(255,215,0,0.5)' : 'none'
            }}>
                {label}
            </span>

            {/* STATUS */}
            <span style={{ fontSize: '0.7em', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                {isActive ? onLabel : offLabel}
            </span>
        </div>
    );
}

return { UniversalButton };