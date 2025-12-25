// ═══════════════════════════════════════════════════════════════════════════════
// THEME CONSOLE v2.0
// Visual theme switcher with color override support
// 
// Features:
//   • Sprite pack selector (nyanCat, bongoCat, etc.)
//   • Color scheme override (from style-settings JSON files)
//   • One-click apply with Obsidian sync
//   • Live preview of themes and color schemes
//
// Usage in notes:
//   ```datacore
//   await dc.require(dc.fileLink("System/Scripts/Widgets/dc-themeConsole.jsx"))
//   ```
// ═══════════════════════════════════════════════════════════════════════════════

const { 
    useTheme, 
    useAvailableThemes, 
    useAvailableColorSchemes,
    switchTheme, 
    clearThemeCache 
} = await dc.require(dc.fileLink("System/Scripts/Core/dc-themeProvider.jsx"));

function ThemeConsole() {
    const { theme, isLoading: themeLoading, themeName, colorOverrideName } = useTheme();
    const { themes, isLoading: themesLoading } = useAvailableThemes();
    const { schemes, isLoading: schemesLoading } = useAvailableColorSchemes();
    
    const [selectedTheme, setSelectedTheme] = dc.useState(themeName);
    const [selectedColorScheme, setSelectedColorScheme] = dc.useState(colorOverrideName || "");
    const [useColorOverride, setUseColorOverride] = dc.useState(!!colorOverrideName);
    const [applying, setApplying] = dc.useState(false);
    const [hoveredTheme, setHoveredTheme] = dc.useState(null);
    const [hoveredScheme, setHoveredScheme] = dc.useState(null);

    // Sync state when theme loads
    dc.useEffect(() => {
        if (!themeLoading) {
            setSelectedTheme(themeName);
            setSelectedColorScheme(colorOverrideName || "");
            setUseColorOverride(!!colorOverrideName);
        }
    }, [themeLoading, themeName, colorOverrideName]);

    // Apply theme with optional color override
    const handleApply = async () => {
        setApplying(true);
        try {
            const colorOverride = useColorOverride ? selectedColorScheme : "";
            await switchTheme(selectedTheme, colorOverride, true);
            // switchTheme handles reload
        } catch (e) {
            console.error("Failed to apply theme:", e);
            new Notice("Failed to apply theme");
            setApplying(false);
        }
    };

    // Check if there are unsaved changes
    const hasChanges = selectedTheme !== themeName || 
        (useColorOverride ? selectedColorScheme : "") !== (colorOverrideName || "");

    if (themeLoading || themesLoading || schemesLoading) {
        return (
            <div style={styles.container}>
                <div style={styles.loading}>
                    <span style={styles.loadingText}>Loading theme console...</span>
                </div>
            </div>
        );
    }

    if (applying) {
        return (
            <div style={styles.container}>
                <div style={styles.loading}>
                    <span style={styles.loadingText}>Applying theme & syncing to Obsidian...</span>
                </div>
            </div>
        );
    }

    const primaryColor = theme["color-primary"] || "#7c3aed";
    const accentColor = theme["color-accent"] || "#f59e0b";
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
                <h3 style={{ ...styles.title, color: primaryColor }}>
                    Theme Console
                </h3>
                <div style={styles.currentBadge}>
                    {themeName}{colorOverrideName ? ` + ${colorOverrideName}` : ""}
                </div>
            </div>

            {/* === SPRITE PACK SECTION === */}
            <div style={styles.section}>
                <h4 style={{ ...styles.sectionTitle, color: primaryColor }}>
                    Sprite Pack
                </h4>
                <p style={styles.sectionDesc}>
                    Choose the animated character for progress bars and toggles
                </p>
                
                <div style={styles.themeGrid}>
                    {themes.map(t => {
                        const isSelected = t.id === selectedTheme;
                        const isHovered = hoveredTheme === t.id;
                        
                        return (
                            <div
                                key={t.id}
                                onClick={() => setSelectedTheme(t.id)}
                                onMouseEnter={() => setHoveredTheme(t.id)}
                                onMouseLeave={() => setHoveredTheme(null)}
                                style={{
                                    ...styles.themeCard,
                                    background: isSelected 
                                        ? `linear-gradient(135deg, ${primaryColor}33, ${surfaceColor})`
                                        : surfaceColor,
                                    border: isSelected 
                                        ? `2px solid ${primaryColor}`
                                        : `1px solid ${primaryColor}33`,
                                    transform: isHovered && !isSelected ? 'translateY(-2px)' : 'none',
                                    boxShadow: isHovered 
                                        ? `0 8px 20px ${primaryColor}22`
                                        : '0 2px 8px rgba(0,0,0,0.2)',
                                }}
                            >
                                <ThemePreviewMini themePath={t.path} />
                                <div style={styles.themeInfo}>
                                    <span style={{
                                        ...styles.themeName,
                                        color: isSelected ? primaryColor : '#ffffff'
                                    }}>
                                        {t.name}
                                    </span>
                                    <span style={styles.themeDesc}>
                                        {t.description || "Sprite pack"}
                                    </span>
                                </div>
                                {isSelected && (
                                    <div style={{
                                        ...styles.selectedBadge,
                                        background: primaryColor
                                    }}>
                                        Selected
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* === COLOR SCHEME SECTION === */}
            <div style={styles.section}>
                <div style={styles.sectionHeader}>
                    <h4 style={{ ...styles.sectionTitle, color: primaryColor, margin: 0 }}>
                        Color Scheme Override
                    </h4>
                    <label style={styles.toggleLabel}>
                        <input 
                            type="checkbox"
                            checked={useColorOverride}
                            onChange={(e) => {
                                setUseColorOverride(e.target.checked);
                                if (!e.target.checked) {
                                    setSelectedColorScheme("");
                                } else if (schemes.length > 0 && !selectedColorScheme) {
                                    setSelectedColorScheme(schemes[0].name);
                                }
                            }}
                            style={styles.checkbox}
                        />
                        <span style={{ color: useColorOverride ? accentColor : 'rgba(255,255,255,0.5)' }}>
                            {useColorOverride ? "Enabled" : "Disabled"}
                        </span>
                    </label>
                </div>
                <p style={styles.sectionDesc}>
                    Override the sprite pack's colors with a different color scheme
                </p>

                {useColorOverride && (
                    <div style={styles.schemeGrid}>
                        {schemes.map(s => {
                            const isSelected = s.name === selectedColorScheme;
                            const isHovered = hoveredScheme === s.name;
                            
                            return (
                                <div
                                    key={s.name}
                                    onClick={() => setSelectedColorScheme(s.name)}
                                    onMouseEnter={() => setHoveredScheme(s.name)}
                                    onMouseLeave={() => setHoveredScheme(null)}
                                    style={{
                                        ...styles.schemeCard,
                                        background: isSelected 
                                            ? `linear-gradient(135deg, ${accentColor}33, ${surfaceColor})`
                                            : surfaceColor,
                                        border: isSelected 
                                            ? `2px solid ${accentColor}`
                                            : `1px solid ${accentColor}33`,
                                        transform: isHovered && !isSelected ? 'translateY(-1px)' : 'none',
                                    }}
                                >
                                    <ColorSchemePreview schemePath={s.path} />
                                    <span style={{
                                        ...styles.schemeName,
                                        color: isSelected ? accentColor : '#ffffff'
                                    }}>
                                        {s.name}
                                    </span>
                                    {isSelected && (
                                        <div style={{
                                            ...styles.selectedDot,
                                            background: accentColor
                                        }} />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}

                {!useColorOverride && (
                    <div style={styles.disabledNotice}>
                        Using sprite pack's built-in colors
                    </div>
                )}
            </div>

            {/* === APPLY BUTTON === */}
            <div style={styles.applySection}>
                <button
                    onClick={handleApply}
                    disabled={!hasChanges}
                    style={{
                        ...styles.applyButton,
                        background: hasChanges 
                            ? `linear-gradient(135deg, ${primaryColor}, ${accentColor})`
                            : surfaceColor,
                        opacity: hasChanges ? 1 : 0.5,
                        cursor: hasChanges ? 'pointer' : 'not-allowed',
                        boxShadow: hasChanges 
                            ? `0 4px 20px ${primaryColor}44`
                            : 'none'
                    }}
                >
                    {hasChanges ? "🎨 Apply Theme & Sync to Obsidian" : "No Changes"}
                </button>
                
                {hasChanges && (
                    <div style={styles.pendingChanges}>
                        Pending: <strong>{selectedTheme}</strong>
                        {useColorOverride && selectedColorScheme && (
                            <> + <strong>{selectedColorScheme}</strong></>
                        )}
                    </div>
                )}
            </div>

            {/* === FOOTER === */}
            <div style={styles.footer}>
                <button
                    onClick={() => {
                        clearThemeCache();
                        new Notice("Theme cache cleared! Reload to refresh.");
                    }}
                    style={{
                        ...styles.footerButton,
                        background: surfaceColor,
                        border: `1px solid ${primaryColor}44`
                    }}
                >
                    Clear Cache
                </button>
                <span style={styles.footerText}>
                    {themes.length} sprite packs • {schemes.length} color schemes
                </span>
            </div>
        </div>
    );
}

// Mini preview for sprite pack themes
function ThemePreviewMini({ themePath }) {
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

    const hasSprite = previewTheme["bar-sprite"] || previewTheme["toggle-sprite"];
    const gradient = previewTheme["bar-fill-gradient"] || "linear-gradient(90deg, #7c3aed, #a78bfa)";

    return (
        <div style={styles.previewBox}>
            {/* Mini progress bar */}
            <div style={{
                width: '100%',
                height: '8px',
                borderRadius: '4px',
                background: gradient,
            }} />
            {hasSprite && (
                <div style={styles.spriteIndicator}>GIF</div>
            )}
        </div>
    );
}

// Preview for color schemes
function ColorSchemePreview({ schemePath }) {
    const [colors, setColors] = dc.useState(null);

    dc.useEffect(() => {
        const loadColors = async () => {
            try {
                const file = app.vault.getAbstractFileByPath(schemePath);
                if (file) {
                    const content = await app.vault.read(file);
                    const json = JSON.parse(content);
                    setColors({
                        primary: json["minimal-style@@ui3@@dark"] || "#7c3aed",
                        bg: json["minimal-style@@ui1@@dark"] || "#1e1e2e",
                        accent: json["minimal-style@@ax3@@dark"] || "#f59e0b",
                        h1: json["minimal-style@@h1-color@@dark"] || "#ffffff"
                    });
                }
            } catch (e) {
                console.warn("Failed to load color scheme:", e);
            }
        };
        loadColors();
    }, [schemePath]);

    if (!colors) {
        return <div style={styles.colorSwatches}><div style={styles.colorSwatch} /></div>;
    }

    return (
        <div style={styles.colorSwatches}>
            <div style={{ ...styles.colorSwatch, background: colors.primary }} title="Primary" />
            <div style={{ ...styles.colorSwatch, background: colors.accent }} title="Accent" />
            <div style={{ ...styles.colorSwatch, background: colors.h1 }} title="Heading" />
            <div style={{ ...styles.colorSwatch, background: colors.bg }} title="Background" />
        </div>
    );
}

// Styles
const styles = {
    container: {
        padding: '24px',
        borderRadius: '16px',
        fontFamily: 'Inter, system-ui, sans-serif',
    },
    loading: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '60px',
    },
    loadingText: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: '14px',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px',
    },
    title: {
        margin: 0,
        fontSize: '20px',
        fontWeight: '700',
    },
    currentBadge: {
        fontSize: '11px',
        color: 'rgba(255,255,255,0.6)',
        padding: '6px 12px',
        background: 'rgba(255,255,255,0.08)',
        borderRadius: '20px',
        fontWeight: '500',
    },
    section: {
        marginBottom: '28px',
    },
    sectionHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '8px',
    },
    sectionTitle: {
        fontSize: '14px',
        fontWeight: '600',
        marginBottom: '6px',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
    },
    sectionDesc: {
        fontSize: '12px',
        color: 'rgba(255,255,255,0.5)',
        marginBottom: '16px',
        marginTop: 0,
    },
    toggleLabel: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        cursor: 'pointer',
        fontSize: '12px',
        fontWeight: '500',
    },
    checkbox: {
        width: '16px',
        height: '16px',
        cursor: 'pointer',
    },
    themeGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
        gap: '12px',
    },
    themeCard: {
        padding: '14px',
        borderRadius: '12px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        position: 'relative',
    },
    previewBox: {
        background: 'rgba(0,0,0,0.3)',
        borderRadius: '6px',
        padding: '10px',
        marginBottom: '10px',
        position: 'relative',
    },
    previewPlaceholder: {
        height: '28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'rgba(255,255,255,0.3)',
        fontSize: '12px',
    },
    spriteIndicator: {
        position: 'absolute',
        top: '4px',
        right: '4px',
        fontSize: '9px',
        padding: '2px 6px',
        background: 'rgba(255,255,255,0.2)',
        borderRadius: '4px',
        color: 'rgba(255,255,255,0.8)',
        fontWeight: '600',
    },
    themeInfo: {
        display: 'flex',
        flexDirection: 'column',
        gap: '2px',
    },
    themeName: {
        fontSize: '13px',
        fontWeight: '600',
    },
    themeDesc: {
        fontSize: '10px',
        color: 'rgba(255,255,255,0.4)',
        lineHeight: '1.3',
    },
    selectedBadge: {
        position: 'absolute',
        top: '8px',
        right: '8px',
        fontSize: '9px',
        fontWeight: '700',
        padding: '3px 8px',
        borderRadius: '10px',
        color: '#fff',
        textTransform: 'uppercase',
        letterSpacing: '0.3px',
    },
    schemeGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
        gap: '10px',
    },
    schemeCard: {
        padding: '12px',
        borderRadius: '10px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        position: 'relative',
        textAlign: 'center',
    },
    colorSwatches: {
        display: 'flex',
        justifyContent: 'center',
        gap: '4px',
        marginBottom: '8px',
    },
    colorSwatch: {
        width: '16px',
        height: '16px',
        borderRadius: '4px',
        border: '1px solid rgba(255,255,255,0.2)',
    },
    schemeName: {
        fontSize: '11px',
        fontWeight: '600',
    },
    selectedDot: {
        position: 'absolute',
        top: '6px',
        right: '6px',
        width: '8px',
        height: '8px',
        borderRadius: '50%',
    },
    disabledNotice: {
        padding: '16px',
        background: 'rgba(255,255,255,0.03)',
        borderRadius: '8px',
        color: 'rgba(255,255,255,0.4)',
        fontSize: '12px',
        textAlign: 'center',
        fontStyle: 'italic',
    },
    applySection: {
        marginTop: '24px',
        marginBottom: '20px',
        textAlign: 'center',
    },
    applyButton: {
        padding: '14px 32px',
        fontSize: '14px',
        fontWeight: '700',
        color: '#fff',
        border: 'none',
        borderRadius: '12px',
        transition: 'all 0.3s ease',
    },
    pendingChanges: {
        marginTop: '12px',
        fontSize: '11px',
        color: 'rgba(255,255,255,0.5)',
    },
    footer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: '16px',
        borderTop: '1px solid rgba(255,255,255,0.08)',
    },
    footerButton: {
        padding: '8px 14px',
        borderRadius: '8px',
        fontSize: '11px',
        color: 'rgba(255,255,255,0.7)',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        fontWeight: '500',
    },
    footerText: {
        fontSize: '11px',
        color: 'rgba(255,255,255,0.35)',
    },
};

const renderedView = <ThemeConsole />;
return { renderedView, ThemeConsole };
