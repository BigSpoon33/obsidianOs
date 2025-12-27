// ═══════════════════════════════════════════════════════════════════════════════
// THEME STUDIO v1.0
// Unified wrapper that combines Theme Dashboard and Theme Editor
// 
// Features:
//   • Seamless navigation between Dashboard and Editor views
//   • Pass theme ID to editor for direct editing
//   • Clean header with mode toggle
//   • Maintains all existing functionality from both widgets
//
// Usage in notes:
//   ```datacorejsx
//   await dc.require(dc.fileLink("System/Scripts/Widgets/dc-themeStudio.jsx"))
//   ```
// ═══════════════════════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────────────────────
// IMPORTS
// ─────────────────────────────────────────────────────────────────────────────

const { useTheme } = await dc.require(
    dc.fileLink("System/Scripts/Core/dc-themeProvider.jsx")
);

const { ThemeDashboard } = await dc.require(
    dc.fileLink("System/Scripts/Widgets/dc-themeDashboard.jsx")
);

const { ThemeEditor } = await dc.require(
    dc.fileLink("System/Scripts/Widgets/dc-themeEditor.jsx")
);

const { useComponentCSS } = await dc.require(
    dc.fileLink("System/Scripts/Components/dc-gloButton.jsx")
);

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT: ThemeStudio
// ═══════════════════════════════════════════════════════════════════════════════

function ThemeStudio() {
    // Mode: "dashboard" or "editor"
    const [mode, setMode] = dc.useState("dashboard");
    
    // Theme ID to pass to editor when switching (for "edit this theme" functionality)
    const [editThemeId, setEditThemeId] = dc.useState(null);
    
    // Get current theme for styling
    const { theme, isLoading } = useTheme();
    
    // Load CSS
    useComponentCSS();
    
    // ─────────────────────────────────────────────────────────────────────────
    // NAVIGATION HANDLERS
    // ─────────────────────────────────────────────────────────────────────────
    
    /**
     * Switch to editor mode
     * @param {string|null} themeId - Optional theme ID to edit directly
     */
    const openEditor = (themeId = null) => {
        setEditThemeId(themeId);
        setMode("editor");
    };
    
    /**
     * Switch back to dashboard mode
     */
    const openDashboard = () => {
        setMode("dashboard");
        // Clear the edit theme ID when going back
        setEditThemeId(null);
    };
    
    // ─────────────────────────────────────────────────────────────────────────
    // LOADING STATE
    // ─────────────────────────────────────────────────────────────────────────
    
    if (isLoading) {
        return (
            <div style={styles.loadingContainer}>
                <span style={styles.loadingText}>Loading Theme Studio...</span>
            </div>
        );
    }
    
    // ─────────────────────────────────────────────────────────────────────────
    // THEME COLORS
    // ─────────────────────────────────────────────────────────────────────────
    
    const primary = theme["color-primary"] || "#7c3aed";
    const accent = theme["color-accent"] || "#f59e0b";
    const surface = theme["color-surface"] || "#2a2a3e";
    const background = theme["color-background"] || "#1e1e2e";
    const text = theme["color-text"] || "#ffffff";
    const textMuted = theme["color-text-muted"] || "#a0a0b0";
    
    // ─────────────────────────────────────────────────────────────────────────
    // RENDER
    // ─────────────────────────────────────────────────────────────────────────
    
    return (
        <div style={styles.studioContainer}>
            {/* Navigation Header */}
            <div style={{
                ...styles.navHeader,
                background: `linear-gradient(135deg, ${surface}, ${background})`,
                borderBottom: `1px solid ${primary}33`,
            }}>
                {/* Left: Title & Breadcrumb */}
                <div style={styles.navLeft}>
                    <h1 style={{ ...styles.studioTitle, color: primary }}>
                        Theme Studio
                    </h1>
                    <span style={{ ...styles.breadcrumb, color: textMuted }}>
                        {mode === "dashboard" ? "Select & Apply" : "Edit Theme"}
                    </span>
                </div>
                
                {/* Right: Mode Toggle Buttons */}
                <div style={styles.navRight}>
                    {/* Dashboard Button */}
                    <button
                        onClick={openDashboard}
                        style={{
                            ...styles.navButton,
                            background: mode === "dashboard" 
                                ? `linear-gradient(135deg, ${primary}, ${accent})`
                                : "transparent",
                            color: mode === "dashboard" ? "#fff" : textMuted,
                            border: mode === "dashboard" 
                                ? "none" 
                                : `1px solid ${primary}44`,
                            boxShadow: mode === "dashboard"
                                ? `0 4px 12px ${primary}44`
                                : "none",
                        }}
                    >
                        <span style={styles.navButtonIcon}>🎨</span>
                        <span>Dashboard</span>
                    </button>
                    
                    {/* Editor Button */}
                    <button
                        onClick={() => openEditor(null)}
                        style={{
                            ...styles.navButton,
                            background: mode === "editor" 
                                ? `linear-gradient(135deg, ${primary}, ${accent})`
                                : "transparent",
                            color: mode === "editor" ? "#fff" : textMuted,
                            border: mode === "editor" 
                                ? "none" 
                                : `1px solid ${primary}44`,
                            boxShadow: mode === "editor"
                                ? `0 4px 12px ${primary}44`
                                : "none",
                        }}
                    >
                        <span style={styles.navButtonIcon}>✏️</span>
                        <span>Editor</span>
                    </button>
                </div>
            </div>
            
            {/* Content Area */}
            <div style={styles.contentArea}>
                {mode === "dashboard" ? (
                    <ThemeDashboard onEditTheme={openEditor} />
                ) : (
                    <ThemeEditor initialThemeId={editThemeId} />
                )}
            </div>
        </div>
    );
}

// ═══════════════════════════════════════════════════════════════════════════════
// STYLES
// ═══════════════════════════════════════════════════════════════════════════════

const styles = {
    studioContainer: {
        display: "flex",
        flexDirection: "column",
        minHeight: "600px",
        fontFamily: "Inter, system-ui, sans-serif",
    },
    
    loadingContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "400px",
    },
    
    loadingText: {
        color: "rgba(255,255,255,0.5)",
        fontSize: "14px",
    },
    
    navHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 24px",
        borderRadius: "12px 12px 0 0",
        marginBottom: "0",
    },
    
    navLeft: {
        display: "flex",
        alignItems: "center",
        gap: "16px",
    },
    
    studioTitle: {
        margin: 0,
        fontSize: "20px",
        fontWeight: "700",
    },
    
    breadcrumb: {
        fontSize: "12px",
        padding: "4px 10px",
        background: "rgba(255,255,255,0.08)",
        borderRadius: "12px",
    },
    
    navRight: {
        display: "flex",
        gap: "10px",
    },
    
    navButton: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: "10px 18px",
        fontSize: "13px",
        fontWeight: "600",
        borderRadius: "10px",
        cursor: "pointer",
        transition: "all 0.2s ease",
        outline: "none",
    },
    
    navButtonIcon: {
        fontSize: "14px",
    },
    
    contentArea: {
        flex: 1,
    },
};

// ═══════════════════════════════════════════════════════════════════════════════
// EXPORT
// ═══════════════════════════════════════════════════════════════════════════════

const renderedView = <ThemeStudio />;
return { renderedView, ThemeStudio };
