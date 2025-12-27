// ═══════════════════════════════════════════════════════════════════════════════
// ACTIVITY LOGGER v1.0
// Daily note widget for logging activity values
// 
// Features:
//   - Reads activity config from Settings.md
//   - Renders appropriate input for each activity type
//   - Writes to current daily note frontmatter
//   - Shows progress toward goal
//   - Quick-add buttons for activities with increment
//   - Theme integration with Glo* components
//
// Usage in Daily Note Template:
//   ```datacorejsx
//   await dc.require(dc.fileLink("System/Scripts/Widgets/dc-activityLogger.jsx"))
//   ```
// ═══════════════════════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────────────────────
// IMPORTS
// ─────────────────────────────────────────────────────────────────────────────

const { useTheme } = await dc.require(
    dc.fileLink("System/Scripts/Core/dc-themeProvider.jsx")
);

const { GloButton, useComponentCSS, hexToRgba } = await dc.require(
    dc.fileLink("System/Scripts/Components/dc-gloButton.jsx")
);

const { GloBar } = await dc.require(
    dc.fileLink("System/Scripts/Components/dc-gloBar.jsx")
);

const { GloToggle } = await dc.require(
    dc.fileLink("System/Scripts/Components/dc-gloToggle.jsx")
);

const { GloBadge } = await dc.require(
    dc.fileLink("System/Scripts/Components/dc-gloBadge.jsx")
);

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────

const SETTINGS_PATH = "System/Settings.md";

// Helper to check if icon is URL or base64
function isIconImage(icon) {
    if (!icon) return false;
    return icon.startsWith("http://") || 
           icon.startsWith("https://") || 
           icon.startsWith("data:image/");
}

// Render icon as emoji or image
function IconPreview({ icon, size = 24 }) {
    if (!icon) return <span style={{ fontSize: size }}>📊</span>;
    
    if (isIconImage(icon)) {
        return (
            <img 
                src={icon} 
                alt="icon" 
                style={{ 
                    width: size, 
                    height: size, 
                    objectFit: "contain",
                    borderRadius: 4,
                }} 
            />
        );
    }
    
    return <span style={{ fontSize: size }}>{icon}</span>;
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT: ActivityLogger
// ═══════════════════════════════════════════════════════════════════════════════

function ActivityLogger() {
    const { theme, isLoading: themeLoading, settings } = useTheme();
    const currentFile = dc.useCurrentFile();
    const showBackgrounds = settings?.widgetBackgrounds !== false;
    
    // State
    const [activities, setActivities] = dc.useState([]);
    const [values, setValues] = dc.useState({});
    const [loading, setLoading] = dc.useState(true);
    
    // Refs to track saving state (prevents UI reversion bug)
    const savingRef = dc.useRef(false);
    const pendingValuesRef = dc.useRef({});
    
    // Load CSS
    useComponentCSS();
    
    // ─────────────────────────────────────────────────────────────────────────
    // LOAD ACTIVITIES FROM SETTINGS
    // ─────────────────────────────────────────────────────────────────────────
    
    dc.useEffect(() => {
        const loadActivities = () => {
            try {
                const file = app.vault.getAbstractFileByPath(SETTINGS_PATH);
                if (file) {
                    const cache = app.metadataCache.getFileCache(file);
                    const fm = cache?.frontmatter || {};
                    const acts = fm.activities || [];
                    setActivities(acts);
                }
            } catch (e) {
                console.error("Failed to load activities:", e);
            }
            setLoading(false);
        };
        
        loadActivities();
    }, []);
    
    // ─────────────────────────────────────────────────────────────────────────
    // LOAD VALUES FROM CURRENT NOTE
    // ─────────────────────────────────────────────────────────────────────────
    
    dc.useEffect(() => {
        if (!currentFile || activities.length === 0) return;
        
        // Skip loading entirely if we're in the middle of saving
        if (savingRef.current) return;
        
        const loadValues = () => {
            // Always read from metadata cache for reliability
            // Datacore's currentFile.frontmatter can be stale or a proxy object
            let fm = {};
            try {
                const filePath = currentFile.path || currentFile.$path;
                if (filePath) {
                    const file = app.vault.getAbstractFileByPath(filePath);
                    if (file) {
                        const cache = app.metadataCache.getFileCache(file);
                        fm = cache?.frontmatter || {};
                    }
                }
            } catch (e) {
                console.warn("Failed to read frontmatter from metadata cache:", e);
                // Fallback to Datacore's frontmatter
                fm = currentFile.frontmatter || {};
            }
            
            const newValues = {};
            
            activities.forEach(activity => {
                const pendingValue = pendingValuesRef.current[activity.id];
                const fieldValue = fm[activity.field];
                
                // If we have a pending value, check if frontmatter has caught up
                if (pendingValue !== undefined) {
                    if (fieldValue === pendingValue) {
                        // Frontmatter matches our pending value - safe to clear
                        delete pendingValuesRef.current[activity.id];
                        newValues[activity.id] = fieldValue;
                    } else {
                        // Frontmatter hasn't caught up yet - keep using pending value
                        newValues[activity.id] = pendingValue;
                    }
                } else {
                    // No pending value - use frontmatter or default
                    if (fieldValue !== undefined && fieldValue !== null) {
                        newValues[activity.id] = fieldValue;
                    } else {
                        // Default values based on type
                        if (activity.type === "boolean") {
                            newValues[activity.id] = false;
                        } else {
                            newValues[activity.id] = 0;
                        }
                    }
                }
            });
            
            setValues(newValues);
        };
        
        loadValues();
    }, [currentFile, activities]);
    
    // ─────────────────────────────────────────────────────────────────────────
    // UPDATE VALUE (SAVE TO FRONTMATTER)
    // ─────────────────────────────────────────────────────────────────────────
    
    const updateValue = async (activity, newValue) => {
        // Don't update managed activities
        if (activity.managed) return;
        
        // Mark as saving to prevent UI reversion
        savingRef.current = true;
        pendingValuesRef.current[activity.id] = newValue;
        
        // Update local state immediately
        setValues(prev => ({ ...prev, [activity.id]: newValue }));
        
        // Save to frontmatter
        try {
            const file = app.workspace.getActiveFile();
            if (file) {
                await app.fileManager.processFrontMatter(file, (fm) => {
                    fm[activity.field] = newValue;
                });
            }
        } catch (e) {
            console.error("Failed to save activity value:", e);
        } finally {
            // Brief delay before allowing new loads, but don't clear pending value
            // The pending value will be cleared when frontmatter catches up (in useEffect)
            setTimeout(() => {
                savingRef.current = false;
            }, 100);
        }
    };
    
    // Quick add (increment value)
    const handleQuickAdd = async (activity) => {
        if (!activity.increment || activity.managed) return;
        const currentValue = values[activity.id] || 0;
        const newValue = currentValue + activity.increment;
        await updateValue(activity, newValue);
    };
    
    // Quick subtract (decrement value)
    const handleQuickSubtract = async (activity) => {
        if (!activity.increment || activity.managed) return;
        const currentValue = values[activity.id] || 0;
        const newValue = Math.max(0, currentValue - activity.increment);
        await updateValue(activity, newValue);
    };
    
    // ─────────────────────────────────────────────────────────────────────────
    // THEME COLORS
    // ─────────────────────────────────────────────────────────────────────────
    
    const primary = theme?.["color-primary"] || "#7c3aed";
    const accent = theme?.["color-accent"] || "#f59e0b";
    const surface = theme?.["color-surface"] || "#2a2a3e";
    const background = theme?.["color-background"] || "#1e1e2e";
    const text = theme?.["color-text"] || "#ffffff";
    const textMuted = theme?.["color-text-muted"] || "#a0a0b0";
    const success = theme?.["color-success"] || "#10b981";
    
    // ─────────────────────────────────────────────────────────────────────────
    // LOADING STATE
    // ─────────────────────────────────────────────────────────────────────────
    
    if (themeLoading || loading) {
        return (
            <div style={styles.loadingContainer}>
                <span style={{ color: textMuted }}>Loading activities...</span>
            </div>
        );
    }
    
    if (activities.length === 0) {
        return (
            <div style={{
                ...styles.emptyState,
                background: surface,
                color: textMuted,
            }}>
                <span>No activities configured.</span>
                <a 
                    href="System/Settings.md" 
                    className="internal-link"
                    style={{ color: primary }}
                >
                    Configure activities in Settings
                </a>
            </div>
        );
    }
    
    // ─────────────────────────────────────────────────────────────────────────
    // RENDER
    // ─────────────────────────────────────────────────────────────────────────
    
    return (
        <div style={{
            ...styles.container,
            background: showBackgrounds ? surface : "transparent",
            border: showBackgrounds ? `1px solid ${primary}33` : "none",
            color: text,
        }}>
            {/* Header */}
            <div style={styles.header}>
                <h3 style={{ ...styles.title, color: primary }}>
                    📊 Today's Activities
                </h3>
            </div>
            
            {/* Activity List */}
            <div style={styles.activityList}>
                {activities.map((activity) => (
                    <ActivityRow
                        key={activity.id}
                        activity={activity}
                        value={values[activity.id]}
                        onChange={(val) => updateValue(activity, val)}
                        onQuickAdd={() => handleQuickAdd(activity)}
                        onQuickSubtract={() => handleQuickSubtract(activity)}
                        theme={theme}
                        primary={primary}
                        textMuted={textMuted}
                        success={success}
                        surface={surface}
                        showBackgrounds={showBackgrounds}
                    />
                ))}
            </div>
        </div>
    );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SUB-COMPONENT: Activity Row
// ═══════════════════════════════════════════════════════════════════════════════

function ActivityRow({
    activity,
    value,
    onChange,
    onQuickAdd,
    onQuickSubtract,
    theme,
    primary,
    textMuted,
    success,
    surface,
    showBackgrounds = true,
}) {
    const activityColor = activity.color || primary;
    const currentValue = value || 0;
    
    // Calculate progress percentage
    let progress = 0;
    let goalReached = false;
    
    if (activity.type === "value" && activity.goal) {
        progress = Math.min((currentValue / activity.goal) * 100, 100);
        goalReached = currentValue >= activity.goal;
    } else if (activity.type === "rating" && activity.max) {
        progress = (currentValue / activity.max) * 100;
        goalReached = currentValue >= activity.max;
    } else if (activity.type === "boolean") {
        progress = currentValue ? 100 : 0;
        goalReached = currentValue;
    }
    
    // Format value display
    const formatValue = () => {
        if (activity.type === "boolean") {
            return currentValue ? "Yes" : "No";
        }
        if (activity.type === "rating") {
            return `${currentValue} / ${activity.max || 5}`;
        }
        if (activity.goal) {
            return `${currentValue} / ${activity.goal} ${activity.unit || ""}`;
        }
        return `${currentValue} ${activity.unit || ""}`;
    };
    
    // ─────────────────────────────────────────────────────────────────────────
    // RENDER BY TYPE
    // ─────────────────────────────────────────────────────────────────────────
    
    const renderInput = () => {
        // Theme sprite settings
        const barSprite = theme["bar-sprite"] || null;
        const barSpriteWidth = theme["bar-sprite-width"] || 34;
        const barSpriteHeight = theme["bar-sprite-height"] || 21;
        const barTrackBg = theme["bar-track-bg"] || `${activityColor}22`;
        const barHeight = theme["bar-height"] || "14px";
        const barBorderRadius = theme["bar-border-radius"] || "6px";
        
        // Toggle sprite settings
        const toggleSprite = theme["toggle-sprite"] || theme["bar-sprite"] || null;
        const toggleSpriteWidth = theme["toggle-sprite-width"] || theme["bar-sprite-width"] || 50;
        const toggleSpriteHeight = theme["toggle-sprite-height"] || theme["bar-sprite-height"] || 40;
        const toggleIdleBg = theme["toggle-idle-bg"] || null;
        const toggleHoverBg = theme["toggle-hover-bg"] || null;
        const toggleActiveBg = theme["toggle-active-bg"] || null;
        
        // Managed activities are read-only
        if (activity.managed) {
            return (
                <div style={styles.managedValue}>
                    <GloBar
                        value={currentValue}
                        max={activity.goal || 100}
                        draggable={false}
                        showSprite={false}
                        fillGradient={`linear-gradient(90deg, ${activityColor}, ${activityColor}aa)`}
                        trackBg={barTrackBg}
                        height="12px"
                        borderRadius={barBorderRadius}
                    />
                    <GloBadge variant="outlined" size="small" color={textMuted}>
                        managed
                    </GloBadge>
                </div>
            );
        }
        
        switch (activity.type) {
            case "value":
                return (
                    <div style={styles.valueInput}>
                        <GloBar
                            value={currentValue}
                            max={(activity.goal || 100) * 1.5}
                            draggable={true}
                            onChange={onChange}
                            step={1}
                            showSprite={true}
                            sprite={barSprite}
                            spriteWidth={barSpriteWidth}
                            spriteHeight={barSpriteHeight}
                            fillGradient={`linear-gradient(90deg, ${activityColor}, ${activityColor}aa)`}
                            trackBg={barTrackBg}
                            height={barHeight}
                            borderRadius={barBorderRadius}
                        />
                        {activity.increment && (
                            <div style={styles.quickButtons}>
                                <GloButton
                                    label={`-${activity.increment}`}
                                    size="small"
                                    variant="ghost"
                                    onClick={onQuickSubtract}
                                    style={{ 
                                        fontSize: 11, 
                                        padding: "4px 8px",
                                        color: activityColor,
                                        border: `1px solid ${activityColor}44`,
                                    }}
                                />
                                <GloButton
                                    label={`+${activity.increment}`}
                                    size="small"
                                    variant="ghost"
                                    onClick={onQuickAdd}
                                    style={{ 
                                        fontSize: 11, 
                                        padding: "4px 8px",
                                        color: activityColor,
                                        border: `1px solid ${activityColor}44`,
                                    }}
                                />
                            </div>
                        )}
                    </div>
                );
                
            case "rating":
                return (
                    <div style={styles.ratingInput}>
                        <GloBar
                            value={currentValue}
                            max={activity.max || 5}
                            draggable={true}
                            onChange={(val) => onChange(Math.round(val))}
                            step={1}
                            showSprite={true}
                            sprite={barSprite}
                            spriteWidth={barSpriteWidth}
                            spriteHeight={barSpriteHeight}
                            fillGradient={`linear-gradient(90deg, ${activityColor}, ${activityColor}aa)`}
                            trackBg={barTrackBg}
                            height={barHeight}
                            borderRadius={barBorderRadius}
                        />
                        <div style={styles.ratingStars}>
                            {Array.from({ length: activity.max || 5 }, (_, i) => (
                                <span
                                    key={i}
                                    onClick={() => onChange(i + 1)}
                                    style={{
                                        cursor: "pointer",
                                        fontSize: 18,
                                        opacity: i < currentValue ? 1 : 0.3,
                                        transition: "all 0.2s ease",
                                    }}
                                >
                                    ⭐
                                </span>
                            ))}
                        </div>
                    </div>
                );
                
            case "boolean":
                return (
                    <div style={styles.booleanInput}>
                        <GloToggle
                            targetKey={activity.field}
                            onLabel="Done"
                            offLabel="Not yet"
                            showSprite={true}
                            sprite={toggleSprite}
                            spriteWidth={toggleSpriteWidth}
                            spriteHeight={toggleSpriteHeight}
                            idleBg={toggleIdleBg}
                            hoverBg={toggleHoverBg}
                            activeBg={toggleActiveBg || `${activityColor}44`}
                            glow={true}
                            width="auto"
                            padding="10px 16px"
                        />
                    </div>
                );
                
            case "count":
                return (
                    <div style={styles.countDisplay}>
                        <GloBadge 
                            variant="soft" 
                            color={activityColor}
                            size="large"
                        >
                            {currentValue}
                        </GloBadge>
                        <span style={{ fontSize: 11, color: textMuted }}>
                            (auto-counted)
                        </span>
                    </div>
                );
                
            default:
                return null;
        }
    };
    
    // Determine row background
    const rowBackground = showBackgrounds
        ? (goalReached ? `linear-gradient(90deg, ${success}11, transparent)` : "rgba(255,255,255,0.02)")
        : (goalReached ? `linear-gradient(90deg, ${success}11, transparent)` : "transparent");
    
    return (
        <div style={{
            ...styles.activityRow,
            borderLeft: `4px solid ${activityColor}`,
            background: rowBackground,
        }}>
            {/* Left: Icon and Label */}
            <div style={styles.rowHeader}>
                <div style={styles.rowLabel}>
                    <IconPreview icon={activity.icon} size={22} />
                    <div>
                        <div style={{ fontSize: 14, fontWeight: 600 }}>
                            {activity.label}
                        </div>
                        <div style={{ fontSize: 12, color: textMuted }}>
                            {formatValue()}
                        </div>
                    </div>
                </div>
                
                {/* Progress/Status Badge */}
                <div style={styles.rowStatus}>
                    {goalReached ? (
                        <GloBadge variant="filled" color={success} size="small">
                            ✓ Complete
                        </GloBadge>
                    ) : activity.goal && (
                        <span style={{ 
                            fontSize: 12, 
                            color: activityColor,
                            fontWeight: 600,
                        }}>
                            {Math.round(progress)}%
                        </span>
                    )}
                </div>
            </div>
            
            {/* Input Area */}
            <div style={styles.rowInput}>
                {renderInput()}
            </div>
        </div>
    );
}

// ═══════════════════════════════════════════════════════════════════════════════
// STYLES
// ═══════════════════════════════════════════════════════════════════════════════

const styles = {
    container: {
        padding: 20,
        borderRadius: 12,
        fontFamily: "Inter, system-ui, sans-serif",
    },
    loadingContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 40,
    },
    emptyState: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        padding: 30,
        borderRadius: 12,
        textAlign: "center",
    },
    header: {
        marginBottom: 20,
    },
    title: {
        margin: 0,
        fontSize: 18,
        fontWeight: 600,
    },
    activityList: {
        display: "flex",
        flexDirection: "column",
        gap: 16,
    },
    activityRow: {
        padding: 16,
        borderRadius: 10,
        background: "rgba(255,255,255,0.02)",
    },
    rowHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 12,
    },
    rowLabel: {
        display: "flex",
        alignItems: "center",
        gap: 12,
    },
    rowStatus: {
        display: "flex",
        alignItems: "center",
    },
    rowInput: {
        // Container for input
    },
    valueInput: {
        display: "flex",
        alignItems: "center",
        gap: 12,
    },
    quickButtons: {
        display: "flex",
        gap: 4,
    },
    ratingInput: {
        display: "flex",
        flexDirection: "column",
        gap: 8,
    },
    ratingStars: {
        display: "flex",
        gap: 4,
    },
    booleanInput: {
        display: "flex",
        alignItems: "center",
    },
    countDisplay: {
        display: "flex",
        alignItems: "center",
        gap: 12,
    },
    managedValue: {
        display: "flex",
        alignItems: "center",
        gap: 12,
    },
};

// ═══════════════════════════════════════════════════════════════════════════════
// EXPORT
// ═══════════════════════════════════════════════════════════════════════════════

return { Func: ActivityLogger };
