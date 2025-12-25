function HelixArt() {
    // --- CONFIGURATION ---
    const ORB_COUNT = 3;
    const SPEED = 4; // Seconds for one full travel
    // ---------------------

    // Load CSS
    dc.useEffect(() => {
        const styleId = "dc-art-helix-css";
        if (!document.getElementById(styleId)) {
            app.vault.adapter.read("System/Scripts/styles/dc-artHelix.css").then(css => {
                const style = document.createElement("style");
                style.id = styleId;
                style.textContent = css;
                document.head.appendChild(style);
            });
        }
    }, []);

    // Create an array of 3 items: [0, 1, 2]
    const orbs = Array.from({ length: ORB_COUNT }, (_, i) => i);

    return (
        <div className="art-helix-stage">
            {/* The Traveler: Moves Left <-> Right */}
            <div className="art-helix-traveler" style={{ animationDuration: `${SPEED}s` }}>
                
                {/* The Core: An invisible center point that spins */}
                <div className="art-helix-core">
                    
                    {/* The Orbs */}
                    {orbs.map(i => (
                        <div 
                            key={i} 
                            className="art-helix-orb"
                            style={{ 
                                // ALGORITHMIC MAGIC:
                                // Rotate each orb so they are spaced evenly (0, 120, 240 degrees)
                                transform: `rotate(${i * (360 / ORB_COUNT)}deg) translateX(30px)`,
                                // Color shift based on index
                                backgroundColor: `hsl(${i * 60 + 180}, 100%, 70%)`,
                                boxShadow: `0 0 15px 2px hsl(${i * 60 + 180}, 100%, 50%)`
                            }}
                        />
                    ))}
                    
                </div>
            </div>
            
            {/* The "Line" they travel on */}
            <div className="art-helix-track"></div>
        </div>
    );
}

return { renderedView: <HelixArt /> };