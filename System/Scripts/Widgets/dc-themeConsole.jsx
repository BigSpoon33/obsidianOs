// ═══════════════════════════════════════════════════════════════════════════════
// THEME CONSOLE
// Visual theme switcher with live previews
// 
// Usage in notes:
//   ```datacore
//   await dc.require(dc.fileLink("System/Scripts/Widgets/dc-themeConsole.jsx"))
//   ```
// ═══════════════════════════════════════════════════════════════════════════════

const { useTheme, useAvailableThemes, switchTheme, clearThemeCache } = await dc.require(
    dc.fileLink("System/Scripts/Core/dc-themeProvider.jsx")
);

function ThemeConsole() {
    const { theme, isLoading: themeLoading, themeName } = useTheme();
    const { themes, isLoading: themesLoading } = useAvailableThemes();
    const [switching, setSwitching] = dc.useState(false);
    const [hoveredTheme, setHoveredTheme] = dc.useState(null);

    // Handle theme switch
    const handleSwitch = async (themeId) => {
        if (themeId === themeName) return;
        setSwitching(true);
        await switchTheme(themeId);
        // Force page reload to apply new theme
        setTimeout(() => {
            clearThemeCache();
            window.location.reload();
        }, 300);
    };

    if (themeLoading || themesLoading) {
        return (
            <div style={styles.container}>
                <div style={styles.loading}>
                    <span style={styles.loadingText}>Loading themes...</span>
                </div>
            </div>
        );
    }

    if (switching) {
        return (
            <div style={styles.container}>
                <div style={styles.loading}>
                    <span style={styles.loadingText}>Switching theme...</span>
                </div>
            </div>
        );
    }

    const primaryColor = theme["color-primary"] || "#7c3aed";
    const surfaceColor = theme["color-surface"] || "#2a2a3e";
    const bgColor = theme["color-background"] || "#1e1e2e";

    return (
        <div style={{
            ...styles.container,
            background: bgColor,
            border: `1px solid ${primaryColor}33`
        }}>
            {/* Header */}
            <div style={styles.header}>
                <h3 style={{ 
                    ...styles.title, 
                    color: primaryColor 
                }}>
                    Theme Console
                </h3>
                <span style={styles.currentBadge}>
                    Current: <strong>{themeName}</strong>
                </span>
            </div>

            {/* Theme Grid */}
            <div style={styles.grid}>
                {themes.map(t => {
                    const isActive = t.id === themeName;
                    const isHovered = hoveredTheme === t.id;
                    
                    return (
                        <div
                            key={t.id}
                            onClick={() => handleSwitch(t.id)}
                            onMouseEnter={() => setHoveredTheme(t.id)}
                            onMouseLeave={() => setHoveredTheme(null)}
                            style={{
                                ...styles.themeCard,
                                background: isActive 
                                    ? `linear-gradient(135deg, ${primaryColor}22, ${surfaceColor})`
                                    : surfaceColor,
                                border: isActive 
                                    ? `2px solid ${primaryColor}`
                                    : `1px solid ${primaryColor}33`,
                                transform: isHovered && !isActive ? 'translateY(-2px)' : 'none',
                                boxShadow: isHovered 
                                    ? `0 8px 20px ${primaryColor}22`
                                    : '0 2px 8px rgba(0,0,0,0.2)',
                                cursor: isActive ? 'default' : 'pointer'
                            }}
                        >
                            {/* Theme Preview Box */}
                            <ThemePreviewMini themeId={t.id} themePath={t.path} />
                            
                            {/* Theme Info */}
                            <div style={styles.themeInfo}>
                                <span style={{
                                    ...styles.themeName,
                                    color: isActive ? primaryColor : '#ffffff'
                                }}>
                                    {t.name}
                                </span>
                                <span style={styles.themeDesc}>
                                    {t.description || "No description"}
                                </span>
                            </div>

                            {/* Active Indicator */}
                            {isActive && (
                                <div style={{
                                    ...styles.activeIndicator,
                                    background: primaryColor
                                }}>
                                    Active
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Footer */}
            <div style={styles.footer}>
                <button
                    onClick={() => {
                        clearThemeCache();
                        new Notice("Theme cache cleared!");
                    }}
                    style={{
                        ...styles.button,
                        background: surfaceColor,
                        border: `1px solid ${primaryColor}44`
                    }}
                >
                    Refresh Themes
                </button>
                <span style={styles.footerText}>
                    {themes.length} theme{themes.length !== 1 ? 's' : ''} available
                </span>
            </div>
        </div>
    );
}

// Mini preview component that shows a sample of each theme
function ThemePreviewMini({ themeId, themePath }) {
    const [previewTheme, setPreviewTheme] = dc.useState(null);

    dc.useEffect(() => {
        const loadPreview = async () => {
            try {
                const file = app.vault.getAbstractFileByPath(themePath);
                if (file) {
                    const cache = app.metadataCache.getFileCache(file);
                    setPreviewTheme(cache?.frontmatter || {});
                }
            } catch (e) {
                console.warn("Failed to load theme preview:", e);
            }
        };
        loadPreview();
    }, [themePath]);

    if (!previewTheme) {
        return <div style={styles.previewPlaceholder}>...</div>;
    }

    const colors = [
        previewTheme["color-primary"] || "#7c3aed",
        previewTheme["color-accent"] || "#f59e0b",
        previewTheme["color-success"] || "#10b981",
        previewTheme["color-warning"] || "#f59e0b"
    ];

    const hasSprite = previewTheme["bar-sprite"] || previewTheme["toggle-sprite"];

    return (
        <div style={styles.previewBox}>
            {/* Color swatches */}
            <div style={styles.swatches}>
                {colors.map((color, i) => (
                    <div 
                        key={i}
                        style={{
                            width: '12px',
                            height: '12px',
                            borderRadius: '3px',
                            background: color
                        }}
                    />
                ))}
            </div>
            
            {/* Mini progress bar preview */}
            <div style={{
                width: '100%',
                height: '6px',
                borderRadius: '3px',
                background: previewTheme["bar-fill-gradient"] || `linear-gradient(90deg, ${colors[0]}, ${colors[1]})`,
                marginTop: '6px'
            }} />

            {/* Sprite indicator */}
            {hasSprite && (
                <div style={styles.spriteIndicator}>GIF</div>
            )}
        </div>
    );
}

// Styles
const styles = {
    container: {
        padding: '20px',
        borderRadius: '16px',
        fontFamily: 'Inter, sans-serif'
    },
    loading: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px'
    },
    loadingText: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: '14px'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
    },
    title: {
        margin: 0,
        fontSize: '18px',
        fontWeight: '600'
    },
    currentBadge: {
        fontSize: '12px',
        color: 'rgba(255,255,255,0.6)',
        padding: '4px 10px',
        background: 'rgba(255,255,255,0.05)',
        borderRadius: '20px'
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '16px',
        marginBottom: '20px'
    },
    themeCard: {
        padding: '16px',
        borderRadius: '12px',
        transition: 'all 0.2s ease',
        position: 'relative',
        overflow: 'hidden'
    },
    previewBox: {
        background: 'rgba(0,0,0,0.2)',
        borderRadius: '8px',
        padding: '10px',
        marginBottom: '12px',
        position: 'relative'
    },
    previewPlaceholder: {
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'rgba(255,255,255,0.3)'
    },
    swatches: {
        display: 'flex',
        gap: '4px'
    },
    spriteIndicator: {
        position: 'absolute',
        top: '6px',
        right: '6px',
        fontSize: '8px',
        padding: '2px 4px',
        background: 'rgba(255,255,255,0.2)',
        borderRadius: '3px',
        color: 'rgba(255,255,255,0.7)'
    },
    themeInfo: {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px'
    },
    themeName: {
        fontSize: '14px',
        fontWeight: '600'
    },
    themeDesc: {
        fontSize: '11px',
        color: 'rgba(255,255,255,0.5)',
        lineHeight: '1.4',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden'
    },
    activeIndicator: {
        position: 'absolute',
        top: '8px',
        right: '8px',
        fontSize: '9px',
        fontWeight: '600',
        padding: '3px 8px',
        borderRadius: '10px',
        color: '#fff',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
    },
    footer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: '16px',
        borderTop: '1px solid rgba(255,255,255,0.1)'
    },
    button: {
        padding: '8px 16px',
        borderRadius: '8px',
        fontSize: '12px',
        color: 'rgba(255,255,255,0.8)',
        cursor: 'pointer',
        transition: 'all 0.2s ease'
    },
    footerText: {
        fontSize: '11px',
        color: 'rgba(255,255,255,0.4)'
    }
};

const renderedView = <ThemeConsole />;
return { renderedView, ThemeConsole };
