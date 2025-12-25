// System/Scripts/dc-randomGif.jsx

function RandomGif() {
    // ==================== STATE MANAGEMENT ====================
    const [selectedType, setSelectedType] = dc.useState("all");
    const [baseSpeed, setBaseSpeed] = dc.useState(3000);
    const [currentImage, setCurrentImage] = dc.useState(null);
    const [isPaused, setIsPaused] = dc.useState(false);
    const [currentIndex, setCurrentIndex] = dc.useState(0);
    const [fadeIn, setFadeIn] = dc.useState(true);
    const [excludeFolders, setExcludeFolders] = dc.useState([".obsidian"]);
    const [showExcludeMenu, setShowExcludeMenu] = dc.useState(false);

    // ==================== CSS LOADING ====================
    dc.useEffect(() => {
        const loadStyles = async () => {
            const cssPath = "System/Scripts/Styles/dc-randomGif.css";
            const id = "dc-randomGif-css";
            if (document.getElementById(id)) return;
            if (await app.vault.adapter.exists(cssPath)) {
                const css = await app.vault.adapter.read(cssPath);
                const style = document.createElement("style");
                style.id = id;
                style.textContent = css;
                document.head.appendChild(style);
            }
        };
        loadStyles();
    }, []);

    // ==================== FILE QUERY SYSTEM ====================
    // Get all files from vault (not just pages - we need image files!)
    const [allFiles, setAllFiles] = dc.useState([]);
    
    // Load files on mount and when vault changes
    dc.useEffect(() => {
        const loadFiles = () => {
            const files = app.vault.getFiles();
            setAllFiles(files);
        };
        
        loadFiles();
        
        // Listen for vault changes
        const vaultRef = app.vault.on('create', loadFiles);
        const vaultRef2 = app.vault.on('delete', loadFiles);
        const vaultRef3 = app.vault.on('rename', loadFiles);
        
        return () => {
            app.vault.offref(vaultRef);
            app.vault.offref(vaultRef2);
            app.vault.offref(vaultRef3);
        };
    }, []);

    // Filter for valid images with folder exclusion
    const validImages = dc.useMemo(() => {
        if (!allFiles || allFiles.length === 0) return [];
        
        return allFiles.filter(file => {
            const path = file.path;
            const ext = file.extension.toLowerCase();
            
            // 1. Check extension
            const isValidExt = (() => {
                if (selectedType === "gif") return ext === "gif";
                if (selectedType === "static") return ["png", "jpg", "jpeg", "webp"].includes(ext);
                return ["gif", "png", "jpg", "jpeg", "webp"].includes(ext);
            })();
            
            if (!isValidExt) return false;
            
            // 2. Check folder exclusions
            const isExcluded = excludeFolders.some(folder => 
                path.startsWith(folder)
            );
            
            return !isExcluded;
        });
    }, [allFiles, selectedType, excludeFolders]);

    // Get unique folder list from images
    const availableFolders = dc.useMemo(() => {
        if (!allFiles || allFiles.length === 0) return [];
        
        const folders = new Set();
        allFiles.forEach(file => {
            const ext = file.extension.toLowerCase();
            if (["gif", "png", "jpg", "jpeg", "webp"].includes(ext)) {
                const folder = file.path.split('/').slice(0, -1).join('/');
                if (folder) folders.add(folder);
            }
        });
        
        return Array.from(folders).sort();
    }, [allFiles]);

    // ==================== NAVIGATION FUNCTIONS ====================
    // Navigate to specific image
    const goToImage = (index) => {
        if (validImages.length === 0) return;
        
        setFadeIn(false);
        setTimeout(() => {
            const safeIndex = ((index % validImages.length) + validImages.length) % validImages.length;
            setCurrentImage(validImages[safeIndex]);
            setCurrentIndex(safeIndex);
            setFadeIn(true);
        }, 300);
    };

    // Next/Previous handlers
    const handleNext = () => goToImage(currentIndex + 1);
    const handlePrev = () => goToImage(currentIndex - 1);
    const handleTogglePause = () => setIsPaused(!isPaused);

    // ==================== FOLDER EXCLUSION ====================
    const toggleFolderExclusion = (folderName) => {
        setExcludeFolders(prev => {
            if (prev.includes(folderName)) {
                return prev.filter(f => f !== folderName);
            } else {
                return [...prev, folderName];
            }
        });
    };

    // ==================== AUTO-CYCLING LOGIC ====================
    dc.useEffect(() => {
        if (validImages.length === 0 || isPaused) {
            return;
        }

        let timeoutId;

        const cycle = () => {
            // Fade out
            setFadeIn(false);
            
            // Wait for fade, then change image
            setTimeout(() => {
                const randomIdx = Math.floor(Math.random() * validImages.length);
                setCurrentImage(validImages[randomIdx]);
                setCurrentIndex(randomIdx);
                
                // Fade in
                setFadeIn(true);
                
                // Schedule next cycle (0.75x-1.25x of base speed for variety)
                const randomDelay = baseSpeed * (Math.random() * 0.5 + 0.75);
                timeoutId = setTimeout(cycle, randomDelay);
            }, 300); // Match CSS fade duration
        };

        // Start first cycle
        timeoutId = setTimeout(cycle, 100);

        return () => clearTimeout(timeoutId);
    }, [validImages, baseSpeed, isPaused]);

    // ==================== INITIAL IMAGE LOAD ====================
    dc.useEffect(() => {
        if (validImages.length > 0 && !currentImage) {
            const randomIdx = Math.floor(Math.random() * validImages.length);
            setCurrentImage(validImages[randomIdx]);
            setCurrentIndex(randomIdx);
        }
    }, [validImages]);

    // ==================== RENDER ====================
    // Debug info
    const debugInfo = {
        totalFiles: allFiles.length,
        validImages: validImages.length,
        availableFolders: availableFolders.length,
        excludedFolders: excludeFolders,
        selectedType: selectedType
    };

    if (allFiles.length === 0) {
        return (
            <div className="gif-widget-container">
                <div style={{opacity: 0.5, padding: '20px', textAlign: 'center'}}>
                    ⏳ Loading images...
                </div>
            </div>
        );
    }

    return (
        <div className="gif-widget-container">
            {/* HEADER */}
            <div className="gif-header">
                <span className="gif-title">🎞️ Random Images</span>
                <span className="gif-counter">
                    {validImages.length > 0 ? `${currentIndex + 1} / ${validImages.length}` : '0 / 0'}
                </span>
            </div>

            {/* DISPLAY AREA */}
            <div className="gif-display-area">
                {currentImage ? (
                    <img 
                        src={app.vault.adapter.getResourcePath(currentImage.path)}
                        alt={currentImage.basename}
                        className={fadeIn ? "fade-in" : "fade-out"}
                        key={currentImage.path}
                    />
                ) : (
                    <span className="gif-no-images">
                        {validImages.length === 0 
                            ? `No ${selectedType === "all" ? "images" : selectedType + "s"} found!` 
                            : "Loading..."}
                    </span>
                )}
                
                {/* Filename Overlay */}
                {currentImage && (
                    <div className="gif-filename-overlay">
                        {currentImage.basename}
                    </div>
                )}
            </div>

            {/* NAVIGATION BUTTONS */}
            <div className="gif-navigation">
                <button onClick={handlePrev} disabled={validImages.length === 0}>
                    ◄ Prev
                </button>
                <button onClick={handleTogglePause} className="btn-play-pause">
                    {isPaused ? "▶ Play" : "⏸ Pause"}
                </button>
                <button onClick={handleNext} disabled={validImages.length === 0}>
                    Next ►
                </button>
            </div>

            {/* CONTROLS */}
            <div className="gif-controls">
                <div className="gif-control-group">
                    <label>Show:</label>
                    <select 
                        value={selectedType} 
                        onChange={(e) => setSelectedType(e.target.value)}
                    >
                        <option value="gif">GIFs Only</option>
                        <option value="static">Static (PNG/JPG)</option>
                        <option value="all">All Images</option>
                    </select>
                </div>

                <div className="gif-control-group">
                    <label>Speed:</label>
                    <input 
                        type="range" 
                        min="500" max="10000" step="500" 
                        value={baseSpeed}
                        onChange={(e) => setBaseSpeed(Number(e.target.value))}
                        title={`Current base speed: ${(baseSpeed/1000).toFixed(1)}s`}
                    />
                    <span className="speed-display">{(baseSpeed/1000).toFixed(1)}s</span>
                </div>

                <button 
                    onClick={() => setShowExcludeMenu(!showExcludeMenu)}
                    className="btn-settings"
                >
                    ⚙️ Folders
                </button>
            </div>

            {/* FOLDER EXCLUSION MENU */}
            {showExcludeMenu && (
                <div className="gif-exclude-menu">
                    <div className="exclude-header">
                        Choose folders to show:
                    </div>
                    {availableFolders.length === 0 ? (
                        <div style={{opacity: 0.6, fontSize: '0.85em', padding: '8px 0'}}>
                            No folders with images found
                        </div>
                    ) : (
                        availableFolders.map(folder => (
                            <label key={folder} className="exclude-option">
                                <input 
                                    type="checkbox"
                                    checked={!excludeFolders.includes(folder)}
                                    onChange={() => toggleFolderExclusion(folder)}
                                />
                                <span>{folder || "(root)"}</span>
                            </label>
                        ))
                    )}
                </div>
            )}

            {/* DEBUG INFO (TEMPORARY) */}
            <div style={{
                marginTop: '10px',
                padding: '8px',
                background: 'rgba(255,100,100,0.1)',
                borderRadius: '4px',
                fontSize: '0.75em',
                fontFamily: 'monospace'
            }}>
                <div>Debug: Files={debugInfo.totalFiles} | Images={debugInfo.validImages} | Folders={debugInfo.availableFolders}</div>
                <div>Type={debugInfo.selectedType} | Excluded={JSON.stringify(debugInfo.excludedFolders)}</div>
            </div>
        </div>
    );
}

// EXPORT
return { Func: RandomGif };
