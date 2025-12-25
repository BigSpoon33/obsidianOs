// ═══════════════════════════════════════════════════════════════════════════════
// DC-GLO-BAR - Global Themed Progress Bar Component
// A fully customizable, theme-aware progress bar with draggable sprite and click animations
// ═══════════════════════════════════════════════════════════════════════════════

const { useTheme } = await dc.require(dc.fileLink("System/Scripts/Core/dc-themeProvider.jsx"));
const { useComponentCSS, useFlashyMode, resolveBackground } = await dc.require(
    dc.fileLink("System/Scripts/Components/dc-gloButton.jsx")
);

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT: GloBar
// ═══════════════════════════════════════════════════════════════════════════════
function GloBar({
    // Value (controlled or frontmatter-bound)
    value = null,                 // Controlled value (0-100 or raw if max provided)
    max = 100,                    // Maximum value
    targetKey = null,             // Frontmatter key to read/write
    targetFile = null,            // File path (null = current file)
    
    // Display
    label = null,                 // Optional label text above bar
    showValue = true,             // Show value text
    valueFormat = null,           // Custom format function: (value, max) => string
    showPercentage = false,       // Show as percentage instead of value/max
    
    // Sprite
    showSprite = true,            // Show the theme sprite
    sprite = null,                // Override sprite (base64 string)
    spriteWidth = null,           // Override sprite width
    spriteHeight = null,          // Override sprite height
    
    // Sprite Click Animation
    clickAnimation = null,        // Override click animation (squish, spin, twist, jiggle, bounce, pulse, wiggle, flip, none)
    clickDuration = null,         // Override animation duration
    
    // Dragging
    draggable = false,            // Enable drag to set value
    step = 1,                     // Step size when dragging
    
    // Appearance
    trackBg = null,               // Override track background
    fillGradient = null,          // Override fill gradient
    height = null,                // Override bar height
    borderRadius = null,          // Override border radius
    width = "100%",               // Bar width
    
    // Callbacks
    onChange = null,              // Called with new value when changed
    onDragStart = null,           // Called when drag starts
    onDragEnd = null,             // Called when drag ends
    
    // Overrides
    style = {},                   // Additional inline styles
    className = "",               // Additional CSS classes
    flashy = null,                // Override flashy mode
}) {
    const { theme, isLoading } = useTheme();
    const globalFlashyMode = useFlashyMode();
    const current = dc.useCurrentFile();
    
    // State
    const [isAnimating, setIsAnimating] = dc.useState(false);
    const [animationClass, setAnimationClass] = dc.useState("");
    const [localValue, setLocalValue] = dc.useState(0);
    
    // Refs for drag handling (to avoid stale closure issues)
    const barRef = dc.useRef(null);
    const isDraggingRef = dc.useRef(false);
    const dragStartPosRef = dc.useRef({ x: 0, y: 0 }); // Track start position for click detection
    const hasDraggedRef = dc.useRef(false); // Track if actually dragged (moved)
    const [, forceUpdate] = dc.useState(0); // For re-rendering during drag
    
    // Load shared CSS
    useComponentCSS();
    
    // ─────────────────────────────────────────────────────────────────────────
    // GET CURRENT VALUE
    // ─────────────────────────────────────────────────────────────────────────
    const getValueFromFrontmatter = () => {
        if (!targetKey) return 0;
        
        if (targetFile) {
            const file = app.vault.getAbstractFileByPath(targetFile);
            if (file) {
                const cache = app.metadataCache.getFileCache(file);
                return cache?.frontmatter?.[targetKey] || 0;
            }
            return 0;
        }
        
        return current?.value(targetKey) || 0;
    };
    
    // Track if we just finished dragging (to prevent bounce-back)
    const justFinishedDraggingRef = dc.useRef(false);
    
    // Determine current value - prefer localValue during/after drag
    const getCurrentValue = () => {
        // If we're dragging or just finished, use local value
        if (isDraggingRef.current || justFinishedDraggingRef.current) {
            return localValue;
        }
        if (value !== null) return value;
        if (targetKey) return getValueFromFrontmatter();
        return localValue;
    };
    
    const currentValue = getCurrentValue();
    
    // Sync local value with props (but not right after dragging)
    dc.useEffect(() => {
        // Skip sync if we just finished dragging
        if (justFinishedDraggingRef.current) {
            justFinishedDraggingRef.current = false;
            return;
        }
        
        if (value !== null) {
            setLocalValue(value);
        } else if (targetKey) {
            setLocalValue(getValueFromFrontmatter());
        }
    }, [value, targetKey, targetFile]);
    
    // Calculate percentage
    const percentage = Math.min(100, Math.max(0, (currentValue / max) * 100));
    
    // Loading state
    if (isLoading) {
        return (
            <div style={{ 
                width,
                height: "20px",
                background: "#2b2b2b",
                borderRadius: "6px",
                opacity: 0.5,
            }}>
            </div>
        );
    }
    
    // ─────────────────────────────────────────────────────────────────────────
    // RESOLVE THEME VALUES
    // ─────────────────────────────────────────────────────────────────────────
    const effectsEnabled = flashy !== null ? flashy : globalFlashyMode;
    
    // Sprite
    const spriteUrl = sprite || theme["bar-sprite"] || null;
    const spWidth = spriteWidth || parseInt(theme["bar-sprite-width"]) || 34;
    const spHeight = spriteHeight || parseInt(theme["bar-sprite-height"]) || 21;
    
    // Click animation
    const animation = clickAnimation || theme["bar-sprite-click-animation"] || "squish";
    const animDuration = clickDuration || theme["bar-sprite-click-duration"] || "0.3s";
    
    // Track and fill
    const trackBackground = resolveBackground(trackBg, null, theme["bar-track-bg"] || "#1a1a2e");
    const fillBackground = fillGradient || theme["bar-fill-gradient"] || 
        "linear-gradient(to right, #ff69b4, #ff1493)";
    
    // Sizing
    const barHeight = height || theme["bar-height"] || "14px";
    const barRadius = borderRadius || theme["bar-border-radius"] || "6px";
    
    // Colors
    const textColor = theme["color-text"] || "#ffffff";
    const mutedColor = theme["color-text-muted"] || "#888";
    
    // ─────────────────────────────────────────────────────────────────────────
    // VALUE UPDATE HANDLER
    // ─────────────────────────────────────────────────────────────────────────
    const updateValue = async (newValue, saveToFrontmatter = true) => {
        // Clamp to valid range
        const clampedValue = Math.min(max, Math.max(0, Math.round(newValue / step) * step));
        
        // Update local state immediately for smooth dragging
        setLocalValue(clampedValue);
        
        // Update frontmatter if bound (only on drag end or if not dragging)
        if (saveToFrontmatter && targetKey) {
            const file = targetFile ? 
                app.vault.getAbstractFileByPath(targetFile) : 
                app.workspace.getActiveFile();
                
            if (file) {
                await app.fileManager.processFrontMatter(file, (fm) => {
                    fm[targetKey] = clampedValue;
                });
            }
        }
        
        // Callback
        if (onChange) {
            onChange(clampedValue);
        }
    };
    
    // ─────────────────────────────────────────────────────────────────────────
    // CALCULATE VALUE FROM MOUSE POSITION
    // ─────────────────────────────────────────────────────────────────────────
    const getValueFromPosition = (clientX) => {
        if (!barRef.current) return currentValue;
        
        const rect = barRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const percent = Math.min(100, Math.max(0, (x / rect.width) * 100));
        return (percent / 100) * max;
    };
    
    // ─────────────────────────────────────────────────────────────────────────
    // DRAG HANDLERS (using refs to avoid stale closures)
    // ─────────────────────────────────────────────────────────────────────────
    const handleMouseMove = (e) => {
        if (!isDraggingRef.current) return;
        
        // Check if mouse has moved enough to count as a drag (not a click)
        const dx = Math.abs(e.clientX - dragStartPosRef.current.x);
        const dy = Math.abs(e.clientY - dragStartPosRef.current.y);
        
        if (dx > 5 || dy > 5) {
            hasDraggedRef.current = true; // Mark as actual drag
        }
        
        // Only update value if actually dragging
        if (hasDraggedRef.current) {
            const newValue = getValueFromPosition(e.clientX);
            updateValue(newValue, false); // Don't save to frontmatter while dragging
            forceUpdate(n => n + 1); // Force re-render
        }
    };
    
    const handleMouseUp = (e) => {
        if (!isDraggingRef.current) return;
        
        const wasDragged = hasDraggedRef.current;
        
        isDraggingRef.current = false;
        hasDraggedRef.current = false;
        
        // Stop the continuous animation
        stopAnimation();
        
        // Remove global listeners first
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        
        // If didn't actually drag (just clicked), just return
        if (!wasDragged) {
            forceUpdate(n => n + 1);
            return;
        }
        
        // Was a real drag - save value
        justFinishedDraggingRef.current = true; // Prevent bounce-back
        forceUpdate(n => n + 1);
        
        // Save final value to frontmatter
        const finalValue = getValueFromPosition(e.clientX);
        updateValue(finalValue, true);
        
        // Clear the flag after a delay (after frontmatter update propagates)
        setTimeout(() => {
            justFinishedDraggingRef.current = false;
        }, 500);
        
        if (onDragEnd) onDragEnd();
    };
    
    const handleMouseDown = (e) => {
        if (!draggable) return;
        
        e.preventDefault();
        e.stopPropagation();
        
        // Store start position for drag detection
        dragStartPosRef.current = { x: e.clientX, y: e.clientY };
        hasDraggedRef.current = false;
        
        isDraggingRef.current = true;
        forceUpdate(n => n + 1);
        
        // Start continuous animation on mousedown
        startAnimation();
        
        if (onDragStart) onDragStart();
        
        // Add global listeners
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };
    
    // Cleanup on unmount
    dc.useEffect(() => {
        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, []);
    
    // ─────────────────────────────────────────────────────────────────────────
    // SPRITE ANIMATION (continuous while held)
    // ─────────────────────────────────────────────────────────────────────────
    const startAnimation = () => {
        if (animation === "none") return;
        
        setIsAnimating(true);
        setAnimationClass(`dc-anim-${animation}-loop`);
    };
    
    const stopAnimation = () => {
        setIsAnimating(false);
        setAnimationClass("");
    };
    
    // ─────────────────────────────────────────────────────────────────────────
    // FORMAT VALUE DISPLAY
    // ─────────────────────────────────────────────────────────────────────────
    const formatValue = () => {
        // Use localValue for display during drag for smoother updates
        const displayValue = isDraggingRef.current ? localValue : currentValue;
        
        if (valueFormat) {
            return valueFormat(displayValue, max);
        }
        if (showPercentage) {
            return `${Math.round((displayValue / max) * 100)}%`;
        }
        return `${Math.round(displayValue)}/${max}`;
    };
    
    // Calculate display percentage (use localValue during drag)
    const displayPercentage = isDraggingRef.current 
        ? Math.min(100, Math.max(0, (localValue / max) * 100))
        : percentage;
    
    // ─────────────────────────────────────────────────────────────────────────
    // RENDER
    // ─────────────────────────────────────────────────────────────────────────
    return (
        <div 
            className={`dc-glo-bar-container ${className}`.trim()}
            style={{
                width,
                ...style,
            }}
        >
            {/* Label and Value Row */}
            {(label || showValue) && (
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "6px",
                    fontSize: "12px",
                }}>
                    {label && (
                        <span style={{ color: textColor, fontWeight: "bold" }}>
                            {label}
                        </span>
                    )}
                    {showValue && (
                        <span style={{ color: mutedColor }}>
                            {formatValue()}
                        </span>
                    )}
                </div>
            )}
            
            {/* Bar Track */}
            <div
                ref={barRef}
                onMouseDown={handleMouseDown}
                className={`dc-glo-bar-track ${draggable ? "dc-glo-bar-draggable" : ""}`}
                style={{
                    position: "relative",
                    width: "100%",
                    height: barHeight,
                    background: trackBackground,
                    backgroundSize: trackBackground.startsWith("url(") ? "auto" : undefined,
                    backgroundRepeat: "repeat",
                    borderRadius: barRadius,
                    overflow: "visible",
                    cursor: draggable ? (isDraggingRef.current ? "grabbing" : "grab") : "default",
                }}
            >
                {/* Fill - always has transition for smooth trailing effect */}
                <div
                    className="dc-glo-bar-fill"
                    style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        height: "100%",
                        width: `${displayPercentage}%`,
                        background: fillBackground,
                        borderRadius: barRadius,
                        transition: "width 0.15s ease-out", // Smooth trailing effect
                        pointerEvents: "none",
                    }}
                />
                
                {/* Sprite - separated into positioning wrapper and animation wrapper */}
                {showSprite && spriteUrl && (
                    <div
                        onMouseDown={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            
                            if (draggable) {
                                // handleMouseDown triggers animation internally
                                handleMouseDown(e);
                            } else {
                                // Non-draggable: start animation and listen for mouseup
                                startAnimation();
                                
                                const handleNonDraggableMouseUp = () => {
                                    stopAnimation();
                                    document.removeEventListener("mouseup", handleNonDraggableMouseUp);
                                };
                                
                                document.addEventListener("mouseup", handleNonDraggableMouseUp);
                            }
                        }}
                        className="dc-glo-bar-sprite"
                        style={{
                            // POSITIONING ONLY - no animation here
                            position: "absolute",
                            left: `calc(${displayPercentage}% - ${spWidth / 2}px)`,
                            top: "50%",
                            transform: "translateY(-50%)",
                            width: `${spWidth}px`,
                            height: `${spHeight}px`,
                            zIndex: 10,
                            cursor: draggable 
                                ? (isDraggingRef.current ? "grabbing" : "grab") 
                                : "pointer",
                            transition: isDraggingRef.current ? "none" : "left 0.3s ease",
                            userSelect: "none",
                        }}
                    >
                        {/* ANIMATION WRAPPER - animation applied here to keep positioning stable */}
                        <div
                            className={animationClass}
                            style={{
                                width: "100%",
                                height: "100%",
                                "--dc-anim-duration": animDuration,
                            }}
                        >
                            <img
                                src={spriteUrl}
                                alt=""
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "contain",
                                    pointerEvents: "none",
                                    userSelect: "none",
                                }}
                                draggable={false}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

// ═══════════════════════════════════════════════════════════════════════════════
// EXPORTS
// ═══════════════════════════════════════════════════════════════════════════════

// Demo view
const renderedView = (
    <div style={{ 
        display: "flex", 
        flexDirection: "column",
        gap: "2rem",
        padding: "1rem",
        maxWidth: "400px",
    }}>
        <div style={{ fontSize: "12px", color: "#888", marginBottom: "0.5rem" }}>
            dc-gloBar Component Demo (click sprites to animate!)
        </div>
        
        {/* Basic bar */}
        <GloBar 
            value={65}
            label="Progress (click sprite!)"
        />
        
        {/* Draggable bar */}
        <GloBar 
            value={40}
            label="Draggable"
            draggable={true}
            onChange={(v) => console.log("Value:", v)}
        />
        
        {/* Percentage display */}
        <GloBar 
            value={75}
            label="Percentage Mode"
            showPercentage={true}
        />
        
        {/* No sprite */}
        <GloBar 
            value={50}
            label="Without Sprite"
            showSprite={false}
        />
    </div>
);

return { 
    renderedView, 
    GloBar,
};
