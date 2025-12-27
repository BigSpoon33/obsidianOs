// ═══════════════════════════════════════════════════════════════════════════════
// THEME DASHBOARD v1.0
// Unified Theme Console + Live Preview with actual Glo* components
// 
// Features:
//   • Theme selector (sprite packs from System/Themes/*.md)
//   • Color scheme override (from style-settings-*.json files)
//   • Live preview with all Glo* components
//   • One-click apply with Obsidian sync
//
// Usage in notes:
//   ```datacore
//   await dc.require(dc.fileLink("System/Scripts/Widgets/dc-themeDashboard.jsx"))
//   ```
// ═══════════════════════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────────────────────
// IMPORTS
// ─────────────────────────────────────────────────────────────────────────────

const { 
    useTheme, 
    useAvailableThemes, 
    useAvailableColorSchemes,
    switchTheme, 
    clearThemeCache,
    loadThemeFromPath,
    loadThemeById,
    loadColorOverride,
    mapStyleSettingsToWidgetProps,
    deriveGlowColors,
    ThemeOverrideProvider,
    DEFAULT_THEME,
    hexToRgba
} = await dc.require(dc.fileLink("System/Scripts/Core/dc-themeProvider.jsx"));

// Import Glo* components
const { GloButton, useComponentCSS } = await dc.require(
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
const { GloCard } = await dc.require(
    dc.fileLink("System/Scripts/Components/dc-gloCard.jsx")
);
const { GloInput } = await dc.require(
    dc.fileLink("System/Scripts/Components/dc-gloInput.jsx")
);
const { GloSelect } = await dc.require(
    dc.fileLink("System/Scripts/Components/dc-gloSelect.jsx")
);
const { GloTabs } = await dc.require(
    dc.fileLink("System/Scripts/Components/dc-gloTabs.jsx")
);

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT: ThemeDashboard
// ═══════════════════════════════════════════════════════════════════════════════

function ThemeDashboard({
    // Optional callback when user wants to edit a theme
    // Called with themeId when clicking "Edit" button on a theme card
    onEditTheme = null,
}) {
    // Global state
    const { theme: activeTheme, isLoading: themeLoading, themeName: activeThemeName, colorOverrideName } = useTheme();
    const { themes, isLoading: themesLoading } = useAvailableThemes();
    const { schemes, isLoading: schemesLoading } = useAvailableColorSchemes();
    
    // Local state
    const [selectedThemeId, setSelectedThemeId] = dc.useState(activeThemeName);
    const [selectedColorScheme, setSelectedColorScheme] = dc.useState(colorOverrideName || "");
    const [useColorOverride, setUseColorOverride] = dc.useState(!!colorOverrideName);
    const [applying, setApplying] = dc.useState(false);
    const [hoveredTheme, setHoveredTheme] = dc.useState(null);
    
    // Preview theme data (loaded when selection changes)
    const [previewTheme, setPreviewTheme] = dc.useState(null);
    const [previewLoading, setPreviewLoading] = dc.useState(false);
    
    // Load CSS
    useComponentCSS();

    // Sync state when active theme loads
    dc.useEffect(() => {
        if (!themeLoading) {
            setSelectedThemeId(activeThemeName);
            setSelectedColorScheme(colorOverrideName || "");
            setUseColorOverride(!!colorOverrideName);
        }
    }, [themeLoading, activeThemeName, colorOverrideName]);

    // Load preview theme when selection or color override changes
    dc.useEffect(() => {
        const loadPreview = async () => {
            if (!selectedThemeId) return;
            
            setPreviewLoading(true);
            try {
                // Load base theme
                let themeData = await loadThemeById(selectedThemeId);
                
                // Apply color override if enabled
                if (useColorOverride && selectedColorScheme) {
                    const colorOverrideData = await loadColorOverride(selectedColorScheme);
                    if (colorOverrideData) {
                        // Map style settings keys to widget properties
                        const mappedColors = mapStyleSettingsToWidgetProps(colorOverrideData);
                        // Merge color override into theme
                        themeData = { ...themeData, ...mappedColors };
                        // Re-derive glow colors with new colors
                        themeData = deriveGlowColors(themeData);
                    }
                }
                
                setPreviewTheme(themeData);
            } catch (e) {
                console.error("Failed to load preview theme:", e);
                setPreviewTheme(activeTheme);
            }
            setPreviewLoading(false);
        };
        
        loadPreview();
    }, [selectedThemeId, useColorOverride, selectedColorScheme]);

    // Handle theme selection
    const handleThemeSelect = (themeId) => {
        setSelectedThemeId(themeId);
    };

    // Apply theme with optional color override
    const handleApply = async () => {
        setApplying(true);
        try {
            const colorOverride = useColorOverride ? selectedColorScheme : "";
            await switchTheme(selectedThemeId, colorOverride, true);
            // switchTheme handles reload
        } catch (e) {
            console.error("Failed to apply theme:", e);
            new Notice("Failed to apply theme");
            setApplying(false);
        }
    };

    // Check if there are unsaved changes
    const hasChanges = selectedThemeId !== activeThemeName || 
        (useColorOverride ? selectedColorScheme : "") !== (colorOverrideName || "");

    // Loading state
    if (themeLoading || themesLoading || schemesLoading) {
        return (
            <div style={styles.container}>
                <div style={styles.loading}>
                    <span style={styles.loadingText}>Loading theme dashboard...</span>
                </div>
            </div>
        );
    }

    // Applying state
    if (applying) {
        return (
            <div style={styles.container}>
                <div style={styles.loading}>
                    <span style={styles.loadingText}>Applying theme & syncing to Obsidian...</span>
                </div>
            </div>
        );
    }

    // Use preview theme for styling, fall back to active theme
    const displayTheme = previewTheme || activeTheme;
    const primaryColor = displayTheme["color-primary"] || "#7c3aed";
    const accentColor = displayTheme["color-accent"] || "#f59e0b";
    const surfaceColor = displayTheme["color-surface"] || "#2a2a3e";
    const bgColor = displayTheme["color-background"] || "#1e1e2e";
    const textColor = displayTheme["color-text"] || "#ffffff";
    const textMuted = displayTheme["color-text-muted"] || "#a0a0b0";

    return (
        <div style={{
            ...styles.container,
            background: bgColor,
            color: textColor,
            border: `1px solid ${primaryColor}33`
        }}>
            {/* Header */}
            <div style={styles.header}>
                <h2 style={{ ...styles.title, color: primaryColor }}>
                    Theme Dashboard
                </h2>
                <div style={styles.currentBadge}>
                    Active: {activeThemeName}{colorOverrideName ? ` + ${colorOverrideName}` : ""}
                </div>
            </div>

            {/* Main Content - Two Columns */}
            <div style={styles.mainContent}>
                
                {/* === LEFT COLUMN: THEME CONSOLE === */}
                <div style={styles.consoleColumn}>
                    
                    {/* Sprite Pack Selection */}
                    <div style={styles.section}>
                        <h3 style={{ ...styles.sectionTitle, color: primaryColor }}>
                            Sprite Pack
                        </h3>
                        <p style={{ ...styles.sectionDesc, color: textMuted }}>
                            Choose the animated character for progress bars and toggles
                        </p>
                        
                        <div style={styles.themeGrid}>
                            {themes.map(t => {
                                const isSelected = t.id === selectedThemeId;
                                const isHovered = hoveredTheme === t.id;
                                
                                return (
                                    <div
                                        key={t.id}
                                        onClick={() => handleThemeSelect(t.id)}
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
                                                color: isSelected ? primaryColor : textColor
                                            }}>
                                                {t.name}
                                            </span>
                                            <span style={{ ...styles.themeDesc, color: textMuted }}>
                                                {t.description || "Sprite pack"}
                                            </span>
                                        </div>
                                        
                                        {/* Edit button - only show if onEditTheme callback provided */}
                                        {onEditTheme && (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Don't trigger card selection
                                                    onEditTheme(t.id);
                                                }}
                                                style={{
                                                    ...styles.editButton,
                                                    background: `${primaryColor}22`,
                                                    color: primaryColor,
                                                    border: `1px solid ${primaryColor}44`,
                                                }}
                                                title={`Edit ${t.name}`}
                                            >
                                                Edit
                                            </button>
                                        )}
                                        
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

                    {/* Color Scheme Override */}
                    <div style={styles.section}>
                        <div style={styles.sectionHeader}>
                            <h3 style={{ ...styles.sectionTitle, color: primaryColor, margin: 0 }}>
                                Color Override
                            </h3>
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
                                <span style={{ color: useColorOverride ? accentColor : textMuted }}>
                                    {useColorOverride ? "Enabled" : "Disabled"}
                                </span>
                            </label>
                        </div>

                        {useColorOverride && (
                            <div style={styles.schemeGrid}>
                                {schemes.map(s => {
                                    const isSelected = s.name === selectedColorScheme;
                                    
                                    return (
                                        <div
                                            key={s.name}
                                            onClick={() => setSelectedColorScheme(s.name)}
                                            style={{
                                                ...styles.schemeCard,
                                                background: isSelected 
                                                    ? `linear-gradient(135deg, ${accentColor}33, ${surfaceColor})`
                                                    : surfaceColor,
                                                border: isSelected 
                                                    ? `2px solid ${accentColor}`
                                                    : `1px solid ${accentColor}33`,
                                            }}
                                        >
                                            <ColorSchemePreview schemePath={s.path} />
                                            <span style={{
                                                ...styles.schemeName,
                                                color: isSelected ? accentColor : textColor
                                            }}>
                                                {s.name}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {!useColorOverride && (
                            <div style={{ ...styles.disabledNotice, color: textMuted }}>
                                Using sprite pack's built-in colors
                            </div>
                        )}
                    </div>

                    {/* Apply Button */}
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
                            {hasChanges ? "Apply Theme & Sync" : "No Changes"}
                        </button>
                        
                        {hasChanges && (
                            <div style={{ ...styles.pendingChanges, color: textMuted }}>
                                Preview: <strong style={{ color: primaryColor }}>{selectedThemeId}</strong>
                                {useColorOverride && selectedColorScheme && (
                                    <> + <strong style={{ color: accentColor }}>{selectedColorScheme}</strong></>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* === RIGHT COLUMN: LIVE PREVIEW === */}
                <div style={{
                    ...styles.previewColumn,
                    background: `linear-gradient(180deg, ${surfaceColor}, ${bgColor})`,
                    border: `1px solid ${primaryColor}22`
                }}>
                    <div style={styles.previewHeader}>
                        <h3 style={{ ...styles.sectionTitle, color: primaryColor, margin: 0 }}>
                            Live Preview
                        </h3>
                        <span style={{ ...styles.previewThemeName, color: textMuted }}>
                            {previewTheme?.["theme-name"] || selectedThemeId}
                        </span>
                    </div>

                    {previewLoading ? (
                        <div style={styles.previewLoading}>Loading preview...</div>
                    ) : (
                        <ThemePreviewContent theme={previewTheme || activeTheme} />
                    )}
                </div>
            </div>

            {/* Footer */}
            <div style={{
                ...styles.footer,
                borderTop: `1px solid ${primaryColor}22`
            }}>
                <button
                    onClick={() => {
                        clearThemeCache();
                        new Notice("Theme cache cleared! Reload to refresh.");
                    }}
                    style={{
                        ...styles.footerButton,
                        background: surfaceColor,
                        border: `1px solid ${primaryColor}44`,
                        color: textMuted
                    }}
                >
                    Clear Cache
                </button>
                <span style={{ ...styles.footerText, color: textMuted }}>
                    {themes.length} sprite packs available
                </span>
            </div>
        </div>
    );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SUB-COMPONENT: Mini Preview for Theme Cards
// ═══════════════════════════════════════════════════════════════════════════════

function ThemePreviewMini({ themePath }) {
    const [previewData, setPreviewData] = dc.useState(null);

    dc.useEffect(() => {
        const load = async () => {
            try {
                const file = app.vault.getAbstractFileByPath(themePath);
                if (file) {
                    const cache = app.metadataCache.getFileCache(file);
                    setPreviewData(cache?.frontmatter || {});
                }
            } catch (e) {
                console.warn("Failed to load theme preview:", e);
            }
        };
        load();
    }, [themePath]);

    if (!previewData) {
        return <div style={styles.miniPreviewPlaceholder}>...</div>;
    }

    const hasSprite = previewData["bar-sprite"] || previewData["toggle-sprite"];
    const gradient = previewData["bar-fill-gradient"] || "linear-gradient(90deg, #7c3aed, #a78bfa)";

    return (
        <div style={styles.miniPreviewBox}>
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

// ═══════════════════════════════════════════════════════════════════════════════
// SUB-COMPONENT: Color Scheme Preview Swatches
// ═══════════════════════════════════════════════════════════════════════════════

function ColorSchemePreview({ schemePath }) {
    const [colors, setColors] = dc.useState(null);

    dc.useEffect(() => {
        const load = async () => {
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
        load();
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

// ═══════════════════════════════════════════════════════════════════════════════
// SUB-COMPONENT: Theme Preview Content (All Glo* Components)
// ═══════════════════════════════════════════════════════════════════════════════

function ThemePreviewContent({ theme }) {
    // Local state for interactive previews
    const [barValue, setBarValue] = dc.useState(65);
    const [inputValue, setInputValue] = dc.useState("");
    const [selectValue, setSelectValue] = dc.useState("option1");
    
    // Extract colors from theme
    const primary = theme["color-primary"] || "#7c3aed";
    const accent = theme["color-accent"] || "#f59e0b";
    const surface = theme["color-surface"] || "#2a2a3e";
    const textMuted = theme["color-text-muted"] || "#a0a0b0";
    const success = theme["color-success"] || "#10b981";
    const warning = theme["color-warning"] || "#f59e0b";
    const error = theme["color-error"] || "#ef4444";
    
    // Extract sprite/visual properties from theme for overrides
    const barSprite = theme["bar-sprite"] || null;
    const barSpriteWidth = theme["bar-sprite-width"] || 34;
    const barSpriteHeight = theme["bar-sprite-height"] || 21;
    const barTrackBg = theme["bar-track-bg"] || null;
    const barFillGradient = theme["bar-fill-gradient"] || `linear-gradient(90deg, ${primary}, ${accent})`;
    const barHeight = theme["bar-height"] || "14px";
    const barBorderRadius = theme["bar-border-radius"] || "6px";
    const barClickAnimation = theme["bar-sprite-click-animation"] || "squish";
    
    const toggleSprite = theme["toggle-sprite"] || theme["bar-sprite"] || null;
    const toggleSpriteWidth = theme["toggle-sprite-width"] || theme["bar-sprite-width"] || 34;
    const toggleSpriteHeight = theme["toggle-sprite-height"] || theme["bar-sprite-height"] || 21;
    const toggleIdleBg = theme["toggle-idle-bg"] || null;
    const toggleActiveBg = theme["toggle-active-bg"] || null;
    const toggleClickAnimation = theme["toggle-sprite-click-animation"] || "squish";
    
    const buttonSprite = theme["button-sprite"] || theme["bar-sprite"] || null;
    const buttonSpriteWidth = theme["button-sprite-width"] || theme["bar-sprite-width"] || 34;
    const buttonSpriteHeight = theme["button-sprite-height"] || theme["bar-sprite-height"] || 21;
    const buttonIdleBg = theme["button-idle-bg"] || null;
    const buttonHoverBg = theme["button-hover-bg"] || null;
    const buttonActiveBg = theme["button-active-bg"] || null;
    const buttonClickAnimation = theme["button-sprite-click-animation"] || "bounce";

    return (
        <div style={styles.previewContent}>
            
            {/* ─── COLOR PALETTE ─── */}
            <PreviewSection title="Color Palette" color={primary}>
                <div style={styles.colorPalette}>
                    {[
                        { name: "Primary", color: primary },
                        { name: "Accent", color: accent },
                        { name: "Success", color: success },
                        { name: "Warning", color: warning },
                        { name: "Error", color: error },
                        { name: "Surface", color: surface },
                    ].map(({ name, color }) => (
                        <div key={name} style={styles.paletteItem}>
                            <div style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '6px',
                                background: color,
                                border: '1px solid rgba(255,255,255,0.1)'
                            }} />
                            <span style={{ fontSize: '10px', color: textMuted }}>{name}</span>
                        </div>
                    ))}
                </div>
            </PreviewSection>

            {/* ─── PROGRESS BAR ─── */}
            <PreviewSection title="Progress Bar (GloBar)" color={primary}>
                <GloBar
                    value={barValue}
                    max={100}
                    draggable={true}
                    onChange={setBarValue}
                    showValue={true}
                    label="Draggable Progress"
                    sprite={barSprite}
                    spriteWidth={barSpriteWidth}
                    spriteHeight={barSpriteHeight}
                    trackBg={barTrackBg}
                    fillGradient={barFillGradient}
                    height={barHeight}
                    borderRadius={barBorderRadius}
                    clickAnimation={barClickAnimation}
                />
            </PreviewSection>

            {/* ─── TOGGLES ─── */}
            <PreviewSection title="Toggle (GloToggle)" color={primary}>
                <div style={styles.toggleRow}>
                    <div style={styles.toggleDemo}>
                        <span style={{ fontSize: '12px', color: textMuted, marginBottom: '8px' }}>ON State</span>
                        <GloToggle
                            targetKey="__preview_toggle_on"
                            targetFile="System/Settings.md"
                            onLabel={theme["label-active"] || "Active"}
                            offLabel={theme["label-inactive"] || "Inactive"}
                            sprite={toggleSprite}
                            spriteWidth={toggleSpriteWidth}
                            spriteHeight={toggleSpriteHeight}
                            idleBg={toggleIdleBg}
                            activeBg={toggleActiveBg}
                            spriteAnimation={toggleClickAnimation}
                        />
                    </div>
                    <div style={styles.toggleDemo}>
                        <span style={{ fontSize: '12px', color: textMuted, marginBottom: '8px' }}>OFF State</span>
                        <GloToggle
                            targetKey="__preview_toggle_off"
                            targetFile="System/Settings.md"
                            onLabel={theme["label-active"] || "Active"}
                            offLabel={theme["label-inactive"] || "Inactive"}
                            sprite={toggleSprite}
                            spriteWidth={toggleSpriteWidth}
                            spriteHeight={toggleSpriteHeight}
                            idleBg={toggleIdleBg}
                            activeBg={toggleActiveBg}
                            spriteAnimation={toggleClickAnimation}
                        />
                    </div>
                </div>
            </PreviewSection>

            {/* ─── BUTTONS ─── */}
            <PreviewSection title="Buttons (GloButton)" color={primary}>
                <div style={styles.buttonGrid}>
                    <GloButton 
                        label="Primary" 
                        variant="primary" 
                        size="small"
                        bg={buttonIdleBg}
                        hoverBg={buttonHoverBg}
                        activeBg={buttonActiveBg}
                    />
                    <GloButton label="Secondary" variant="secondary" size="small" />
                    <GloButton label="Ghost" variant="ghost" size="small" />
                    <GloButton label="Success" variant="success" size="small" />
                    <GloButton label="Warning" variant="warning" size="small" />
                    <GloButton label="Error" variant="error" size="small" />
                </div>
                <div style={{ marginTop: '12px' }}>
                    <GloButton 
                        label="With Sprite" 
                        variant="primary"
                        showSprite={true}
                        sprite={buttonSprite}
                        spriteWidth={buttonSpriteWidth}
                        spriteHeight={buttonSpriteHeight}
                        spriteAnimation={buttonClickAnimation}
                        bg={buttonIdleBg}
                        hoverBg={buttonHoverBg}
                        activeBg={buttonActiveBg}
                    />
                </div>
            </PreviewSection>

            {/* ─── BADGES ─── */}
            <PreviewSection title="Badges (GloBadge)" color={primary}>
                <div style={styles.badgeRow}>
                    <GloBadge status="info">Info</GloBadge>
                    <GloBadge status="success">Success</GloBadge>
                    <GloBadge status="warning">Warning</GloBadge>
                    <GloBadge status="error">Error</GloBadge>
                    <GloBadge status="neutral">Neutral</GloBadge>
                    <GloBadge color={primary}>Primary</GloBadge>
                </div>
                <div style={{ ...styles.badgeRow, marginTop: '8px' }}>
                    <GloBadge variant="outlined" color={accent}>Outlined</GloBadge>
                    <GloBadge removable={true} onRemove={() => {}} color={primary}>Removable</GloBadge>
                    <GloBadge pulse={true} status="error">Pulse</GloBadge>
                </div>
            </PreviewSection>

            {/* ─── CARDS ─── */}
            <PreviewSection title="Cards (GloCard)" color={primary}>
                <div style={styles.cardGrid}>
                    <GloCard 
                        title="Default Card" 
                        variant="default"
                        size="small"
                        bg={theme["card-bg-color"] || surface}
                        accentColor={primary}
                    >
                        <p style={{ margin: 0, fontSize: '12px', color: textMuted }}>
                            Standard card with default styling.
                        </p>
                    </GloCard>
                    <GloCard 
                        title="Elevated Card" 
                        variant="elevated"
                        size="small"
                        bg={theme["card-bg-color"] || surface}
                        accentColor={primary}
                    >
                        <p style={{ margin: 0, fontSize: '12px', color: textMuted }}>
                            Card with elevated shadow.
                        </p>
                    </GloCard>
                    <GloCard 
                        title="Outlined Card" 
                        variant="outlined"
                        size="small"
                        bg={theme["card-bg-color"] || surface}
                        borderColor={primary}
                        accentColor={primary}
                    >
                        <p style={{ margin: 0, fontSize: '12px', color: textMuted }}>
                            Card with visible border.
                        </p>
                    </GloCard>
                </div>
            </PreviewSection>

            {/* ─── INPUTS ─── */}
            <PreviewSection title="Inputs (GloInput)" color={primary}>
                <div style={styles.inputGrid}>
                    <GloInput
                        type="text"
                        placeholder="Text input..."
                        label="Text"
                        value={inputValue}
                        onChange={setInputValue}
                        bgOverride={theme["input-bg"]}
                        borderOverride={theme["input-border"]}
                        borderFocusOverride={theme["input-border-focus"]}
                        accentColorOverride={primary}
                    />
                    <GloInput
                        type="number"
                        placeholder="0"
                        label="Number"
                        min={0}
                        max={100}
                        bgOverride={theme["input-bg"]}
                        borderOverride={theme["input-border"]}
                        borderFocusOverride={theme["input-border-focus"]}
                        accentColorOverride={primary}
                    />
                </div>
                <div style={{ marginTop: '12px' }}>
                    <GloInput
                        type="textarea"
                        placeholder="Multi-line text..."
                        label="Textarea"
                        rows={2}
                        bgOverride={theme["input-bg"]}
                        borderOverride={theme["input-border"]}
                        borderFocusOverride={theme["input-border-focus"]}
                        accentColorOverride={primary}
                    />
                </div>
            </PreviewSection>

            {/* ─── SELECT ─── */}
            <PreviewSection title="Select (GloSelect)" color={primary}>
                <GloSelect
                    options={[
                        { value: "option1", label: "Option One" },
                        { value: "option2", label: "Option Two" },
                        { value: "option3", label: "Option Three" },
                    ]}
                    value={selectValue}
                    onChange={setSelectValue}
                    label="Dropdown"
                    placeholder="Select an option..."
                    bgOverride={theme["input-bg"]}
                    borderOverride={theme["input-border"]}
                    accentColorOverride={primary}
                />
            </PreviewSection>

            {/* ─── TABS ─── */}
            <PreviewSection title="Tabs (GloTabs)" color={primary}>
                <div style={styles.tabsGrid}>
                    <div>
                        <span style={{ fontSize: '11px', color: textMuted, marginBottom: '8px', display: 'block' }}>Underline</span>
                        <GloTabs
                            tabs={[
                                { id: "t1", label: "Tab 1" },
                                { id: "t2", label: "Tab 2" },
                                { id: "t3", label: "Tab 3" },
                            ]}
                            variant="underline"
                            renderContent={false}
                            size="small"
                            accentColorOverride={primary}
                            surfaceColorOverride={surface}
                        />
                    </div>
                    <div>
                        <span style={{ fontSize: '11px', color: textMuted, marginBottom: '8px', display: 'block' }}>Pills</span>
                        <GloTabs
                            tabs={[
                                { id: "t1", label: "Tab 1" },
                                { id: "t2", label: "Tab 2" },
                                { id: "t3", label: "Tab 3" },
                            ]}
                            variant="pills"
                            renderContent={false}
                            size="small"
                            accentColorOverride={primary}
                            surfaceColorOverride={surface}
                        />
                    </div>
                    <div>
                        <span style={{ fontSize: '11px', color: textMuted, marginBottom: '8px', display: 'block' }}>Boxed</span>
                        <GloTabs
                            tabs={[
                                { id: "t1", label: "Tab 1" },
                                { id: "t2", label: "Tab 2" },
                                { id: "t3", label: "Tab 3" },
                            ]}
                            variant="boxed"
                            renderContent={false}
                            accentColorOverride={primary}
                            surfaceColorOverride={surface}
                            size="small"
                        />
                    </div>
                </div>
            </PreviewSection>

        </div>
    );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SUB-COMPONENT: Preview Section Wrapper
// ═══════════════════════════════════════════════════════════════════════════════

function PreviewSection({ title, color, children }) {
    return (
        <div style={styles.previewSection}>
            <h4 style={{ 
                ...styles.previewSectionTitle, 
                color: color,
                borderBottom: `1px solid ${color}33`
            }}>
                {title}
            </h4>
            {children}
        </div>
    );
}

// ═══════════════════════════════════════════════════════════════════════════════
// STYLES
// ═══════════════════════════════════════════════════════════════════════════════

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
        fontSize: '24px',
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
    
    // Main content layout
    mainContent: {
        display: 'grid',
        gridTemplateColumns: '350px 1fr',
        gap: '24px',
        marginBottom: '24px',
    },
    
    // Console column (left)
    consoleColumn: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    section: {
        marginBottom: '0',
    },
    sectionHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '12px',
    },
    sectionTitle: {
        fontSize: '14px',
        fontWeight: '600',
        marginBottom: '8px',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
    },
    sectionDesc: {
        fontSize: '12px',
        marginBottom: '12px',
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
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
    themeCard: {
        padding: '12px',
        borderRadius: '10px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        position: 'relative',
    },
    miniPreviewBox: {
        background: 'rgba(0,0,0,0.3)',
        borderRadius: '6px',
        padding: '8px',
        marginBottom: '8px',
        position: 'relative',
    },
    miniPreviewPlaceholder: {
        height: '24px',
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
    editButton: {
        position: 'absolute',
        bottom: '8px',
        right: '8px',
        fontSize: '10px',
        fontWeight: '600',
        padding: '4px 10px',
        borderRadius: '6px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        zIndex: 5,
    },
    schemeGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '8px',
    },
    schemeCard: {
        padding: '10px',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        textAlign: 'center',
    },
    colorSwatches: {
        display: 'flex',
        justifyContent: 'center',
        gap: '4px',
        marginBottom: '6px',
    },
    colorSwatch: {
        width: '14px',
        height: '14px',
        borderRadius: '3px',
        border: '1px solid rgba(255,255,255,0.2)',
    },
    schemeName: {
        fontSize: '11px',
        fontWeight: '600',
    },
    disabledNotice: {
        padding: '12px',
        background: 'rgba(255,255,255,0.03)',
        borderRadius: '8px',
        fontSize: '12px',
        textAlign: 'center',
        fontStyle: 'italic',
    },
    applySection: {
        marginTop: '8px',
        textAlign: 'center',
    },
    applyButton: {
        width: '100%',
        padding: '14px 24px',
        fontSize: '14px',
        fontWeight: '700',
        color: '#fff',
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
    },
    pendingChanges: {
        marginTop: '10px',
        fontSize: '11px',
    },
    
    // Preview column (right)
    previewColumn: {
        borderRadius: '12px',
        padding: '20px',
        maxHeight: '800px',
        overflowY: 'auto',
    },
    previewHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        paddingBottom: '12px',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
    },
    previewThemeName: {
        fontSize: '12px',
    },
    previewLoading: {
        padding: '40px',
        textAlign: 'center',
        color: 'rgba(255,255,255,0.5)',
    },
    previewContent: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    previewSection: {
        marginBottom: '0',
    },
    previewSectionTitle: {
        fontSize: '12px',
        fontWeight: '600',
        margin: '0 0 12px 0',
        paddingBottom: '8px',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
    },
    
    // Component preview grids
    colorPalette: {
        display: 'flex',
        gap: '12px',
        flexWrap: 'wrap',
    },
    paletteItem: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px',
    },
    toggleRow: {
        display: 'flex',
        gap: '20px',
        flexWrap: 'wrap',
    },
    toggleDemo: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    buttonGrid: {
        display: 'flex',
        gap: '8px',
        flexWrap: 'wrap',
    },
    badgeRow: {
        display: 'flex',
        gap: '8px',
        flexWrap: 'wrap',
    },
    cardGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '12px',
    },
    inputGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '12px',
    },
    tabsGrid: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
    },
    
    // Footer
    footer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: '16px',
    },
    footerButton: {
        padding: '8px 14px',
        borderRadius: '8px',
        fontSize: '11px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        fontWeight: '500',
    },
    footerText: {
        fontSize: '11px',
    },
};

// ═══════════════════════════════════════════════════════════════════════════════
// EXPORT
// ═══════════════════════════════════════════════════════════════════════════════

const renderedView = <ThemeDashboard />;
return { renderedView, ThemeDashboard };
