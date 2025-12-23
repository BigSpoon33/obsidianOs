function Func() {
    const current = dc.useCurrentFile();
    
    // 1. READ DATA: Check a frontmatter property called "night_mode"
    const initialVal = current.value("night_mode") || false;
    const [isActive, setIsActive] = dc.useState(initialVal);
    const [isAnimating, setIsAnimating] = dc.useState(false);

    // 2. THE TOGGLE FUNCTION
    const toggleMoth = async () => {
        const newState = !isActive;
        setIsActive(newState); // Visual update instantly
        setIsAnimating(true);
        
        // Wait a tiny bit for animation to finish, then save to file
        setTimeout(() => setIsAnimating(false), 500);

        // Update Obsidian Frontmatter
        await app.fileManager.processFrontMatter(app.workspace.getActiveFile(), (fm) => {
            fm.night_mode = newState;
        });
    };

    return (
        <div 
            className={`moth-toggle-container ${isActive ? "moth-active" : "moth-inactive"}`} 
            onClick={toggleMoth}
        >
            <div className="moth-base">
                {/* This is the landing pad (Lantern or Leaf) */}
                🏮
                
                {/* This is the Moth. 
                    PRO TIP: Replace this emoji with an <img src="data:image..." /> 
                    to use a real pixel-art gif! 
                */}
                <div className="moth-icon">🦋</div>
            </div>
            
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <span style={{fontWeight: 'bold', color: '#a8c6a0'}}>
                    {isActive ? "Lantern Lit" : "Darkness"}
                </span>
                <span style={{fontSize: '0.7em', opacity: 0.7}}>
                    {isActive ? "The moths gather." : "It is quiet."}
                </span>
            </div>
        </div>
    );
}

const renderedView = <Func />;
return { renderedView, Func };
