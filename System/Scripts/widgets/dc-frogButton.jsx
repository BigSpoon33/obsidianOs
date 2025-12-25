function Func() {
    // STATE
    const [isJumping, setIsJumping] = dc.useState(false);
    
    // CONFIGURATION: Change this to match where you put your file!
    // Example: "Assets/ribbit.mp3" or "Sounds/frog.mp3"
    const soundFileName = "Assets/ribbit.mp3"; 

    const handleRibbit = () => {
        if (isJumping) return; // Don't allow double-clicks while jumping

        // 1. TRIGGER ANIMATION
        setIsJumping(true);
        
        // Remove the jump class after 400ms (same as CSS animation duration)
        // so we can jump again later.
        setTimeout(() => setIsJumping(false), 400);

        // 2. PLAY SOUND
        // We need the "App Resource Path" because Obsidian isn't a normal web browser
        const adapter = app.vault.adapter;
        let soundPath = "";

        // Defensive coding: Check if the file exists
        if (adapter.exists(soundFileName)) {
            soundPath = adapter.getResourcePath(soundFileName);
            const audio = new Audio(soundPath);
            audio.volume = 0.5; // 50% volume so we don't scare you
            audio.play().catch(e => console.error("Audio failed:", e));
        } else {
            new Notice(`Ribbit 404: Could not find ${soundFileName}`);
        }
    };

    return (
        <div className={`frog-btn-container ${isJumping ? "jump-active" : ""}`} onClick={handleRibbit}>
            {/* PRO TIP: Swap this emoji for a <div> with a base64 GIF background 
               if you want a pixel art frog! 
            */}
            <div className="frog-visual">🐸</div>
            
            {/* Water Ripple Effect */}
            <div className="frog-water"></div>
            
            <div style={{fontSize: '0.8em', color: '#8fbc8f', marginTop: '5px'}}>
                {isJumping ? "HOP!" : "Poke me"}
            </div>
        </div>
    );
}

const renderedView = <Func />;
return { renderedView, Func };