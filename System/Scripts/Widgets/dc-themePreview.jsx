// ═══════════════════════════════════════════════════════════════════════════════
// THEME PREVIEW
// Showcases all themed components using current theme values
// 
// Usage in notes:
//   ```datacore
//   await dc.require(dc.fileLink("System/Scripts/Widgets/dc-themePreview.jsx"))
//   ```
// ═══════════════════════════════════════════════════════════════════════════════

const { useTheme } = await dc.require(
    dc.fileLink("System/Scripts/Core/dc-themeProvider.jsx")
);

function ThemePreview() {
    const { theme, isLoading, themeName } = useTheme();
    const [demoProgress, setDemoProgress] = dc.useState(65);
    const [demoToggle, setDemoToggle] = dc.useState(false);

    if (isLoading) {
        return (
            <div style={styles.loading}>
                <span>Loading theme preview...</span>
            </div>
        );
    }

    // Extract theme values
    const colors = {
        primary: theme["color-primary"] || "#7c3aed",
        secondary: theme["color-secondary"] || "#1e1e2e",
        accent: theme["color-accent"] || "#f59e0b",
        success: theme["color-success"] || "#10b981",
        warning: theme["color-warning"] || "#f59e0b",
        error: theme["color-error"] || "#ef4444",
        background: theme["color-background"] || "#1e1e2e",
        surface: theme["color-surface"] || "#2a2a3e",
        text: theme["color-text"] || "#ffffff",
        textMuted: theme["color-text-muted"] || "#a0a0b0"
    };

    const chartColors = [
        theme["chart-color-1"] || colors.primary,
        theme["chart-color-2"] || colors.accent,
        theme["chart-color-3"] || colors.success,
        theme["chart-color-4"] || colors.warning,
        theme["chart-color-5"] || "#3b82f6",
        theme["chart-color-6"] || "#ec4899"
    ];

    const icons = {
        water: theme["icon-water"] || "💧",
        sleep: theme["icon-sleep"] || "😴",
        exercise: theme["icon-exercise"] || "💪",
        mood: theme["icon-mood"] || "😊",
        food: theme["icon-food"] || "🍽️",
        journal: theme["icon-journal"] || "📔"
    };

    return (
        <div style={{
            ...styles.container,
            background: colors.background,
            color: colors.text
        }}>
            {/* Header */}
            <div style={styles.header}>
                <h2 style={{ margin: 0, color: colors.primary }}>
                    Theme Preview: {theme["theme-name"] || themeName}
                </h2>
                <p style={{ margin: '8px 0 0', color: colors.textMuted, fontSize: '13px' }}>
                    {theme["theme-description"] || "Preview all themed components"}
                </p>
            </div>

            {/* Color Palette Section */}
            <Section title="Color Palette" color={colors.primary}>
                <div style={styles.colorGrid}>
                    {Object.entries(colors).map(([name, color]) => (
                        <div key={name} style={styles.colorSwatch}>
                            <div style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '8px',
                                background: color,
                                border: '2px solid rgba(255,255,255,0.1)'
                            }} />
                            <span style={{ fontSize: '10px', color: colors.textMuted, marginTop: '4px' }}>
                                {name}
                            </span>
                            <span style={{ fontSize: '9px', color: colors.textMuted, fontFamily: 'monospace' }}>
                                {color}
                            </span>
                        </div>
                    ))}
                </div>
            </Section>

            {/* Progress Bar Section */}
            <Section title="Progress Bar" color={colors.primary}>
                <div style={{ marginBottom: '16px' }}>
                    <ProgressBarDemo theme={theme} progress={demoProgress} />
                </div>
                <div style={styles.sliderRow}>
                    <span style={{ color: colors.textMuted, fontSize: '12px' }}>Progress: {demoProgress}%</span>
                    <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={demoProgress}
                        onChange={(e) => setDemoProgress(parseInt(e.target.value))}
                        style={{ flex: 1, marginLeft: '12px' }}
                    />
                </div>
            </Section>

            {/* Toggle Section */}
            <Section title="Toggle" color={colors.primary}>
                <ToggleDemo 
                    theme={theme} 
                    isActive={demoToggle} 
                    onToggle={() => setDemoToggle(!demoToggle)}
                />
            </Section>

            {/* Buttons Section */}
            <Section title="Buttons" color={colors.primary}>
                <div style={styles.buttonRow}>
                    <button style={{
                        ...styles.button,
                        background: theme["button-idle-bg"] || colors.primary,
                        color: theme["button-text-color"] || "#fff",
                        borderRadius: theme["button-border-radius"] || "8px",
                        padding: theme["button-padding"] || "8px 16px"
                    }}>
                        Primary
                    </button>
                    <button style={{
                        ...styles.button,
                        background: colors.surface,
                        color: colors.text,
                        border: `1px solid ${colors.primary}44`
                    }}>
                        Secondary
                    </button>
                    <button style={{
                        ...styles.button,
                        background: colors.success,
                        color: "#fff"
                    }}>
                        Success
                    </button>
                    <button style={{
                        ...styles.button,
                        background: colors.error,
                        color: "#fff"
                    }}>
                        Error
                    </button>
                </div>
            </Section>

            {/* Cards Section */}
            <Section title="Cards" color={colors.primary}>
                <div style={styles.cardRow}>
                    <div style={{
                        ...styles.card,
                        background: theme["card-bg-color"] || colors.surface,
                        border: theme["card-border"] || `1px solid ${colors.primary}33`,
                        borderRadius: theme["card-border-radius"] || "12px",
                        boxShadow: theme["card-shadow"] || "0 4px 15px rgba(0,0,0,0.2)"
                    }}>
                        <h4 style={{ margin: '0 0 8px', color: colors.primary }}>Card Title</h4>
                        <p style={{ margin: 0, fontSize: '13px', color: colors.textMuted }}>
                            This is a themed card component with proper styling.
                        </p>
                    </div>
                    <div style={{
                        ...styles.card,
                        background: `linear-gradient(135deg, ${colors.primary}22, ${colors.surface})`,
                        border: `1px solid ${colors.primary}66`,
                        borderRadius: theme["card-border-radius"] || "12px"
                    }}>
                        <h4 style={{ margin: '0 0 8px', color: colors.primary }}>Accent Card</h4>
                        <p style={{ margin: 0, fontSize: '13px', color: colors.textMuted }}>
                            A card with gradient accent background.
                        </p>
                    </div>
                </div>
            </Section>

            {/* Chips/Tags Section */}
            <Section title="Chips & Tags" color={colors.primary}>
                <div style={styles.chipRow}>
                    {['Active', 'Pending', 'Complete', 'Archive'].map((label, i) => (
                        <span 
                            key={label}
                            style={{
                                ...styles.chip,
                                background: i === 0 
                                    ? theme["chip-bg-active"] || `${colors.primary}33`
                                    : theme["chip-bg"] || `${colors.text}11`,
                                borderRadius: theme["chip-border-radius"] || "20px",
                                color: i === 0 ? colors.primary : colors.textMuted
                            }}
                        >
                            {label}
                        </span>
                    ))}
                </div>
            </Section>

            {/* Icons Section */}
            <Section title="Icons" color={colors.primary}>
                <div style={styles.iconRow}>
                    {Object.entries(icons).map(([name, icon]) => (
                        <div key={name} style={styles.iconItem}>
                            <span style={{ fontSize: '24px' }}>{icon}</span>
                            <span style={{ fontSize: '10px', color: colors.textMuted }}>{name}</span>
                        </div>
                    ))}
                </div>
            </Section>

            {/* Chart Colors Section */}
            <Section title="Chart Colors" color={colors.primary}>
                <div style={styles.chartDemo}>
                    {chartColors.map((color, i) => (
                        <div 
                            key={i}
                            style={{
                                flex: 1,
                                height: `${30 + (i * 15)}px`,
                                background: color,
                                borderRadius: '4px'
                            }}
                        />
                    ))}
                </div>
            </Section>

            {/* Inputs Section */}
            <Section title="Inputs" color={colors.primary}>
                <div style={styles.inputRow}>
                    <input 
                        type="text"
                        placeholder="Text input..."
                        style={{
                            ...styles.input,
                            background: theme["input-bg"] || "rgba(255,255,255,0.05)",
                            border: theme["input-border"] || `1px solid ${colors.primary}33`,
                            borderRadius: theme["input-border-radius"] || "6px",
                            color: theme["input-text-color"] || colors.text
                        }}
                    />
                    <select style={{
                        ...styles.input,
                        background: theme["input-bg"] || "rgba(255,255,255,0.05)",
                        border: theme["input-border"] || `1px solid ${colors.primary}33`,
                        borderRadius: theme["input-border-radius"] || "6px",
                        color: theme["input-text-color"] || colors.text
                    }}>
                        <option>Select option</option>
                        <option>Option 1</option>
                        <option>Option 2</option>
                    </select>
                </div>
            </Section>

            {/* Footer */}
            <div style={{
                ...styles.footer,
                borderTop: `1px solid ${colors.primary}22`
            }}>
                <span style={{ color: colors.textMuted, fontSize: '11px' }}>
                    Theme ID: <code style={{ color: colors.primary }}>{themeName}</code>
                </span>
                <span style={{ color: colors.textMuted, fontSize: '11px' }}>
                    Version: {theme["theme-version"] || "1.0"}
                </span>
            </div>
        </div>
    );
}

// Section wrapper component
function Section({ title, color, children }) {
    return (
        <div style={styles.section}>
            <h3 style={{ 
                ...styles.sectionTitle, 
                color: color,
                borderBottom: `1px solid ${color}33`
            }}>
                {title}
            </h3>
            {children}
        </div>
    );
}

// Progress bar demo with theme
function ProgressBarDemo({ theme, progress }) {
    const sprite = theme["bar-sprite"] || "";
    const spriteWidth = theme["bar-sprite-width"] || 34;
    const spriteHeight = theme["bar-sprite-height"] || 21;
    const trackBg = theme["bar-track-bg"] || "";
    const fillGradient = theme["bar-fill-gradient"] || "linear-gradient(90deg, #7c3aed, #a78bfa)";
    const height = theme["bar-height"] || "14px";
    const radius = theme["bar-border-radius"] || "6px";

    return (
        <div style={{
            position: 'relative',
            height: '40px',
            display: 'flex',
            alignItems: 'center'
        }}>
            {/* Track */}
            <div style={{
                width: '100%',
                height: height,
                borderRadius: radius,
                background: trackBg ? `url(${trackBg})` : 'rgba(255,255,255,0.1)',
                backgroundRepeat: 'repeat-x',
                overflow: 'hidden',
                position: 'relative'
            }}>
                {/* Fill */}
                <div style={{
                    width: `${progress}%`,
                    height: '100%',
                    background: fillGradient,
                    borderRadius: radius,
                    transition: 'width 0.3s ease'
                }} />
            </div>

            {/* Sprite */}
            {sprite && (
                <img 
                    src={sprite}
                    alt="sprite"
                    style={{
                        position: 'absolute',
                        left: `calc(${progress}% - ${spriteWidth/2}px)`,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: `${spriteWidth}px`,
                        height: `${spriteHeight}px`,
                        imageRendering: 'pixelated',
                        transition: 'left 0.3s ease'
                    }}
                />
            )}
        </div>
    );
}

// Toggle demo with theme
function ToggleDemo({ theme, isActive, onToggle }) {
    const sprite = theme["toggle-sprite"] || theme["bar-sprite"] || "";
    const idleBg = theme["toggle-idle-bg"] || "";
    const activeBg = theme["toggle-active-bg"] || "";
    const primary = theme["color-primary"] || "#7c3aed";
    const accent = theme["color-accent"] || "#f59e0b";

    return (
        <div 
            onClick={onToggle}
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 20px',
                borderRadius: '12px',
                cursor: 'pointer',
                background: (isActive && activeBg) 
                    ? `url(${activeBg})` 
                    : (idleBg ? `url(${idleBg})` : `rgba(255,255,255,0.05)`),
                backgroundRepeat: 'repeat',
                border: isActive ? `2px solid ${accent}` : `2px solid ${primary}44`,
                transition: 'all 0.3s ease'
            }}
        >
            {sprite && (
                <img 
                    src={sprite} 
                    alt="toggle"
                    style={{
                        width: '34px',
                        height: '21px',
                        imageRendering: 'pixelated'
                    }}
                />
            )}
            <span style={{ 
                fontWeight: 'bold',
                color: isActive ? accent : primary
            }}>
                {isActive ? "ON" : "OFF"}
            </span>
        </div>
    );
}

// Styles
const styles = {
    container: {
        padding: '24px',
        borderRadius: '16px',
        fontFamily: 'Inter, sans-serif'
    },
    loading: {
        padding: '40px',
        textAlign: 'center',
        color: 'rgba(255,255,255,0.5)'
    },
    header: {
        marginBottom: '24px',
        paddingBottom: '16px',
        borderBottom: '1px solid rgba(255,255,255,0.1)'
    },
    section: {
        marginBottom: '24px'
    },
    sectionTitle: {
        fontSize: '14px',
        fontWeight: '600',
        margin: '0 0 12px',
        paddingBottom: '8px'
    },
    colorGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(70px, 1fr))',
        gap: '12px'
    },
    colorSwatch: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2px'
    },
    sliderRow: {
        display: 'flex',
        alignItems: 'center'
    },
    buttonRow: {
        display: 'flex',
        gap: '12px',
        flexWrap: 'wrap'
    },
    button: {
        padding: '8px 16px',
        borderRadius: '8px',
        border: 'none',
        fontSize: '13px',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'all 0.2s ease'
    },
    cardRow: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '16px'
    },
    card: {
        padding: '16px'
    },
    chipRow: {
        display: 'flex',
        gap: '8px',
        flexWrap: 'wrap'
    },
    chip: {
        padding: '6px 14px',
        fontSize: '12px',
        fontWeight: '500'
    },
    iconRow: {
        display: 'flex',
        gap: '20px',
        flexWrap: 'wrap'
    },
    iconItem: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px'
    },
    chartDemo: {
        display: 'flex',
        gap: '8px',
        alignItems: 'flex-end',
        height: '100px'
    },
    inputRow: {
        display: 'flex',
        gap: '12px',
        flexWrap: 'wrap'
    },
    input: {
        padding: '10px 14px',
        fontSize: '13px',
        outline: 'none',
        minWidth: '150px'
    },
    footer: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingTop: '16px',
        marginTop: '24px'
    }
};

const renderedView = <ThemePreview />;
return { renderedView, ThemePreview };
