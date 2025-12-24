// System/Scripts/dc-randomGif.jsx

// Helper to inject CSS styles dynamically
const injectStyles = () => {
    const styleId = "dc-randomGif-css";
    if (!document.getElementById(styleId)) {
        // We load the CSS file content manually since Datacore doesn't auto-import CSS
        const cssFile = app.vault.getAbstractFileByPath("System/Scripts/dc-randomGif.css");
        if (cssFile) {
            app.vault.read(cssFile).then(content => {
                const style = document.createElement("style");
                style.id = styleId;
                style.textContent = content;
                document.head.appendChild(style);
            });
        }
    }
};

const View = () => {
    // 1. Inject CSS on load
    dc.useEffect(() => {
        injectStyles();
    }, []);

    // 2. State Management
    const [selectedType, setSelectedType] = dc.useState("gif"); // 'gif', 'static', 'all'
    const [baseSpeed, setBaseSpeed] = dc.useState(3000); // ms
    const [currentImage, setCurrentImage] = dc.useState(null);

    // 3. Get and Filter Files
    const allFiles = app.vault.getFiles();
    
    const validImages = dc.useMemo(() => {
        return allFiles.filter(f => {
            const ext = f.extension.toLowerCase();
            if (selectedType === "gif") return ext === "gif";
            if (selectedType === "static") return ["png", "jpg", "jpeg", "webp"].includes(ext);
            return ["gif", "png", "jpg", "jpeg", "webp"].includes(ext); // 'all'
        });
    }, [selectedType, allFiles]);

    // 4. Cycle Logic (The "Brain")
    dc.useEffect(() => {
        if (validImages.length === 0) {
            setCurrentImage(null);
            return;
        }

        const cycle = () => {
            // Pick random image
            const randomIdx = Math.floor(Math.random() * validImages.length);
            setCurrentImage(validImages[randomIdx]);

            // Calculate random interval (0.5x to 1.5x of base speed)
            const randomDelay = baseSpeed * (Math.random() + 0.5);
            timeoutId = setTimeout(cycle, randomDelay);
        };

        // Start cycle
        let timeoutId = setTimeout(cycle, 100);

        // Cleanup on unmount or settings change
        return () => clearTimeout(timeoutId);
    }, [validImages, baseSpeed]);

    // 5. Render
    return (
        <div className="gif-widget-container">
            {/* Display Area */}
            <div className="gif-display-area">
                {currentImage ? (
                    <img 
                        src={app.vault.getResourcePath(currentImage)} 
                        alt={currentImage.basename} 
                    />
                ) : (
                    <span>No {selectedType}s found!</span>
                )}
                
                {/* File Name Overlay (Optional) */}
                {currentImage && (
                    <div style={{
                        position: "absolute", bottom: 0, width: "100%", 
                        background: "rgba(0,0,0,0.5)", color: "white", 
                        fontSize: "0.7em", padding: "2px 0", textAlign: "center"
                    }}>
                        {currentImage.basename}
                    </div>
                )}
            </div>

            {/* Controls Menu */}
            <div className="gif-controls">
                <div className="gif-control-group">
                    <label>Show:</label>
                    <select 
                        value={selectedType} 
                        onChange={(e) => setSelectedType(e.target.value)}
                    >
                        <option value="gif">GIFs Only</option>
                        <option value="static">Static Only (JPG/PNG)</option>
                        <option value="all">Everything</option>
                    </select>
                </div>

                <div className="gif-control-group">
                    <label>Speed:</label>
                    <input 
                        type="range" 
                        min="500" max="8000" step="500" 
                        value={baseSpeed} 
                        onChange={(e) => setBaseSpeed(Number(e.target.value))} 
                        title={`Current base speed: ${(baseSpeed/1000).toFixed(1)}s`}
                    />
                </div>
            </div>
        </div>
    );
};

// Export properly
module.exports = { View };