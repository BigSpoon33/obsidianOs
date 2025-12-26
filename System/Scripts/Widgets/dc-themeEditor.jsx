// ═══════════════════════════════════════════════════════════════════════════════
// THEME EDITOR v1.0
// Visual theme editor with live preview and save functionality
// 
// Features:
//   • Edit all theme properties with appropriate UI controls
//   • Color pickers for colors
//   • Gradient builder for gradients
//   • File upload for sprites (base64)
//   • Dropdowns for animation types
//   • Sliders for numeric values
//   • Live preview of all changes
//   • Save to new file or update existing
// ═══════════════════════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────────────────────
// IMPORTS
// ─────────────────────────────────────────────────────────────────────────────

const { 
    useTheme, 
    useAvailableThemes,
    loadThemeById,
    loadThemeFromPath,
    deriveGlowColors,
    DEFAULT_THEME,
} = await dc.require(dc.fileLink("System/Scripts/Core/dc-themeProvider.jsx"));

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
const { ColorPicker } = await dc.require(
    dc.fileLink("System/Scripts/Components/dc-colorPicker.jsx")
);
const { GradientBuilder } = await dc.require(
    dc.fileLink("System/Scripts/Components/dc-gradientBuilder.jsx")
);

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────

const ANIMATION_OPTIONS = [
    { value: "none", label: "None" },
    { value: "squish", label: "Squish" },
    { value: "bounce", label: "Bounce" },
    { value: "spin", label: "Spin" },
    { value: "twist", label: "Twist" },
    { value: "jiggle", label: "Jiggle" },
    { value: "pulse", label: "Pulse" },
    { value: "wiggle", label: "Wiggle" },
    { value: "flip", label: "Flip" },
];

const PROPERTY_SECTIONS = [
    {
        id: "metadata",
        title: "Theme Metadata",
        icon: "📝",
        properties: [
            { key: "theme-id", label: "Theme ID", type: "text", placeholder: "my-theme", required: true },
            { key: "theme-name", label: "Display Name", type: "text", placeholder: "My Awesome Theme" },
            { key: "theme-description", label: "Description", type: "textarea", placeholder: "A brief description..." },
            { key: "theme-author", label: "Author", type: "text", placeholder: "Your name" },
            { key: "theme-version", label: "Version", type: "text", placeholder: "1.0" },
        ]
    },
    {
        id: "colors",
        title: "Color Palette",
        icon: "🎨",
        properties: [
            { key: "color-primary", label: "Primary", type: "color" },
            { key: "color-secondary", label: "Secondary", type: "color" },
            { key: "color-accent", label: "Accent", type: "color" },
            { key: "color-success", label: "Success", type: "color" },
            { key: "color-warning", label: "Warning", type: "color" },
            { key: "color-error", label: "Error", type: "color" },
            { key: "color-background", label: "Background", type: "color" },
            { key: "color-surface", label: "Surface", type: "color" },
            { key: "color-text", label: "Text", type: "color" },
            { key: "color-text-muted", label: "Text Muted", type: "color" },
        ]
    },
    {
        id: "progressbar",
        title: "Progress Bar",
        icon: "📊",
        properties: [
            { key: "bar-sprite", label: "Sprite (Base64/URL)", type: "image" },
            { key: "bar-sprite-width", label: "Sprite Width", type: "number", min: 10, max: 200, unit: "px" },
            { key: "bar-sprite-height", label: "Sprite Height", type: "number", min: 10, max: 200, unit: "px" },
            { key: "bar-sprite-click-animation", label: "Click Animation", type: "select", options: ANIMATION_OPTIONS },
            { key: "bar-fill-gradient", label: "Fill Gradient", type: "gradient" },
            { key: "bar-track-bg", label: "Track Background", type: "gradient" },
            { key: "bar-height", label: "Bar Height", type: "text", placeholder: "14px" },
            { key: "bar-border-radius", label: "Border Radius", type: "text", placeholder: "6px" },
        ]
    },
    {
        id: "toggle",
        title: "Toggle",
        icon: "🔘",
        properties: [
            { key: "toggle-sprite", label: "Sprite (Base64/URL)", type: "image" },
            { key: "toggle-sprite-width", label: "Sprite Width", type: "number", min: 10, max: 200, unit: "px" },
            { key: "toggle-sprite-height", label: "Sprite Height", type: "number", min: 10, max: 200, unit: "px" },
            { key: "toggle-sprite-click-animation", label: "Click Animation", type: "select", options: ANIMATION_OPTIONS },
            { key: "toggle-idle-bg", label: "Idle Background", type: "gradient" },
            { key: "toggle-active-bg", label: "Active Background", type: "gradient" },
            { key: "label-active", label: "Active Label", type: "text", placeholder: "ON" },
            { key: "label-inactive", label: "Inactive Label", type: "text", placeholder: "OFF" },
        ]
    },
    {
        id: "buttons",
        title: "Buttons",
        icon: "🔲",
        properties: [
            { key: "button-idle-bg", label: "Idle Background", type: "gradient" },
            { key: "button-hover-bg", label: "Hover Background", type: "gradient" },
            { key: "button-active-bg", label: "Active Background", type: "gradient" },
            { key: "button-text-color", label: "Text Color", type: "color" },
            { key: "button-sprite", label: "Sprite (Base64/URL)", type: "image" },
            { key: "button-sprite-click-animation", label: "Click Animation", type: "select", options: ANIMATION_OPTIONS },
        ]
    },
    {
        id: "inputs",
        title: "Inputs & Select",
        icon: "📝",
        properties: [
            { key: "input-bg", label: "Input Background", type: "text", placeholder: "rgba(255,255,255,0.05)" },
            { key: "input-border", label: "Input Border", type: "text", placeholder: "1px solid rgba(255,105,180,0.3)" },
            { key: "input-border-focus", label: "Focus Border", type: "text", placeholder: "1px solid #ff69b4" },
            { key: "input-border-radius", label: "Border Radius", type: "text", placeholder: "6px" },
        ]
    },
    {
        id: "cards",
        title: "Cards",
        icon: "🃏",
        properties: [
            { key: "card-bg-color", label: "Background Color", type: "color" },
            { key: "card-border", label: "Border", type: "text", placeholder: "1px solid rgba(124,58,237,0.3)" },
            { key: "card-border-radius", label: "Border Radius", type: "text", placeholder: "12px" },
            { key: "card-shadow", label: "Shadow", type: "text", placeholder: "0 4px 15px rgba(0,0,0,0.2)" },
        ]
    },
    {
        id: "effects",
        title: "Effects & Transitions",
        icon: "✨",
        properties: [
            { key: "glow-enabled", label: "Glow Enabled", type: "boolean" },
            { key: "glow-intensity", label: "Glow Intensity", type: "text", placeholder: "15px" },
            { key: "transition-duration", label: "Transition Duration", type: "text", placeholder: "0.3s" },
            { key: "border-radius-small", label: "Border Radius (Small)", type: "text", placeholder: "6px" },
            { key: "border-radius-medium", label: "Border Radius (Medium)", type: "text", placeholder: "12px" },
            { key: "border-radius-large", label: "Border Radius (Large)", type: "text", placeholder: "16px" },
        ]
    },
];

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT: ThemeEditor
// ═══════════════════════════════════════════════════════════════════════════════

function ThemeEditor({ initialThemeId = null }) {
    const { theme: activeTheme, isLoading: themeLoading, themeName: activeThemeName } = useTheme();
    const { themes, isLoading: themesLoading } = useAvailableThemes();
    
    // Editor state
    const [editedTheme, setEditedTheme] = dc.useState({ ...DEFAULT_THEME });
    const [originalTheme, setOriginalTheme] = dc.useState(null);
    const [selectedThemeId, setSelectedThemeId] = dc.useState(initialThemeId || "");
    const [expandedSections, setExpandedSections] = dc.useState(["metadata", "colors"]);
    const [saving, setSaving] = dc.useState(false);
    const [hasChanges, setHasChanges] = dc.useState(false);
    const [previewBarValue, setPreviewBarValue] = dc.useState(65);
    
    // Load CSS
    useComponentCSS();
    
    // Load theme when selection changes
    dc.useEffect(() => {
        const loadTheme = async () => {
            if (selectedThemeId) {
                const themeData = await loadThemeById(selectedThemeId);
                setEditedTheme({ ...DEFAULT_THEME, ...themeData });
                setOriginalTheme({ ...DEFAULT_THEME, ...themeData });
                setHasChanges(false);
            } else {
                // New theme - start with defaults
                setEditedTheme({ ...DEFAULT_THEME, "theme-id": "", "theme-name": "" });
                setOriginalTheme(null);
                setHasChanges(false);
            }
        };
        loadTheme();
    }, [selectedThemeId]);
    
    // Update property
    const updateProperty = (key, value) => {
        setEditedTheme(prev => {
            const updated = { ...prev, [key]: value };
            // Re-derive glow colors when colors change
            if (key.startsWith("color-")) {
                return deriveGlowColors(updated);
            }
            return updated;
        });
        setHasChanges(true);
    };
    
    // Toggle section expansion
    const toggleSection = (sectionId) => {
        setExpandedSections(prev => 
            prev.includes(sectionId) 
                ? prev.filter(id => id !== sectionId)
                : [...prev, sectionId]
        );
    };
    
    // Handle image upload (convert to base64)
    const handleImageUpload = async (key) => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        
        input.onchange = async (e) => {
            const file = e.target.files[0];
            if (!file) return;
            
            const reader = new FileReader();
            reader.onload = (event) => {
                const base64 = event.target.result;
                updateProperty(key, base64);
            };
            reader.readAsDataURL(file);
        };
        
        input.click();
    };
    
    // Save theme to file
    const saveTheme = async (saveAsNew = false) => {
        const themeId = editedTheme["theme-id"];
        if (!themeId) {
            new Notice("Please enter a Theme ID");
            return;
        }
        
        setSaving(true);
        
        try {
            // Build frontmatter
            const frontmatterLines = ["---"];
            
            // Add all properties
            for (const section of PROPERTY_SECTIONS) {
                frontmatterLines.push(`# ${section.title}`);
                for (const prop of section.properties) {
                    const value = editedTheme[prop.key];
                    if (value !== undefined && value !== null && value !== "") {
                        if (typeof value === "string" && (value.includes("\n") || value.includes(":"))) {
                            frontmatterLines.push(`${prop.key}: "${value.replace(/"/g, '\\"')}"`);
                        } else if (typeof value === "boolean") {
                            frontmatterLines.push(`${prop.key}: ${value}`);
                        } else if (typeof value === "number") {
                            frontmatterLines.push(`${prop.key}: ${value}`);
                        } else {
                            frontmatterLines.push(`${prop.key}: "${value}"`);
                        }
                    }
                }
                frontmatterLines.push("");
            }
            
            frontmatterLines.push("---");
            frontmatterLines.push("");
            frontmatterLines.push(`# ${editedTheme["theme-name"] || themeId}`);
            frontmatterLines.push("");
            frontmatterLines.push(editedTheme["theme-description"] || "Custom theme created with Theme Editor.");
            
            const content = frontmatterLines.join("\n");
            
            // Determine file path
            let filePath;
            if (saveAsNew || !originalTheme) {
                filePath = `System/Themes/${themeId}.md`;
            } else {
                // Find existing file
                const existingTheme = themes.find(t => t.id === originalTheme["theme-id"]);
                filePath = existingTheme?.path || `System/Themes/${themeId}.md`;
            }
            
            // Check if file exists
            const existingFile = app.vault.getAbstractFileByPath(filePath);
            
            if (existingFile && saveAsNew) {
                new Notice(`File already exists: ${filePath}`);
                setSaving(false);
                return;
            }
            
            if (existingFile) {
                // Update existing file
                await app.vault.modify(existingFile, content);
            } else {
                // Create new file
                await app.vault.create(filePath, content);
            }
            
            new Notice(`Theme saved to ${filePath}`);
            setOriginalTheme({ ...editedTheme });
            setHasChanges(false);
            
            // Update selection to the saved theme
            setSelectedThemeId(themeId);
            
        } catch (e) {
            console.error("Failed to save theme:", e);
            new Notice("Failed to save theme: " + e.message);
        }
        
        setSaving(false);
    };
    
    // Reset to original
    const resetChanges = () => {
        if (originalTheme) {
            setEditedTheme({ ...originalTheme });
        } else {
            setEditedTheme({ ...DEFAULT_THEME, "theme-id": "", "theme-name": "" });
        }
        setHasChanges(false);
    };
    
    // Loading state
    if (themeLoading || themesLoading) {
        return (
            <div style={styles.container}>
                <div style={styles.loading}>Loading...</div>
            </div>
        );
    }
    
    // Theme colors for editor UI
    const primary = editedTheme["color-primary"] || "#7c3aed";
    const surface = editedTheme["color-surface"] || "#2a2a3e";
    const background = editedTheme["color-background"] || "#1e1e2e";
    const text = editedTheme["color-text"] || "#ffffff";
    const textMuted = editedTheme["color-text-muted"] || "#a0a0b0";
    
    return (
        <div style={{
            ...styles.container,
            background: background,
            color: text,
        }}>
            {/* Header */}
            <div style={styles.header}>
                <div>
                    <h2 style={{ ...styles.title, color: primary }}>Theme Editor</h2>
                    <p style={{ ...styles.subtitle, color: textMuted }}>
                        Create and customize themes with live preview
                    </p>
                </div>
                <div style={styles.headerActions}>
                    {hasChanges && (
                        <span style={{ ...styles.unsavedBadge, background: "#f59e0b33", color: "#f59e0b" }}>
                            Unsaved changes
                        </span>
                    )}
                </div>
            </div>
            
            {/* Theme Selector */}
            <div style={styles.themeSelector}>
                <label style={{ fontSize: 12, color: textMuted, marginRight: 8 }}>
                    Edit Theme:
                </label>
                <select
                    value={selectedThemeId}
                    onChange={(e) => setSelectedThemeId(e.target.value)}
                    style={{
                        ...styles.select,
                        background: surface,
                        color: text,
                        borderColor: primary + "44",
                    }}
                >
                    <option value="">+ New Theme</option>
                    {themes.map(t => (
                        <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                </select>
            </div>
            
            {/* Main Content */}
            <div style={styles.mainContent}>
                {/* Left: Property Editor */}
                <div style={{
                    ...styles.editorColumn,
                    background: surface,
                    borderColor: primary + "22",
                }}>
                    <div style={styles.editorScroll}>
                        {PROPERTY_SECTIONS.map(section => (
                            <PropertySection
                                key={section.id}
                                section={section}
                                theme={editedTheme}
                                expanded={expandedSections.includes(section.id)}
                                onToggle={() => toggleSection(section.id)}
                                onUpdate={updateProperty}
                                onImageUpload={handleImageUpload}
                                primaryColor={primary}
                                textColor={text}
                                textMuted={textMuted}
                                surfaceColor={surface}
                            />
                        ))}
                    </div>
                </div>
                
                {/* Right: Live Preview */}
                <div style={{
                    ...styles.previewColumn,
                    background: `linear-gradient(180deg, ${surface}, ${background})`,
                    borderColor: primary + "22",
                }}>
                    <div style={styles.previewHeader}>
                        <h3 style={{ margin: 0, fontSize: 14, color: primary }}>Live Preview</h3>
                        <span style={{ fontSize: 11, color: textMuted }}>
                            {editedTheme["theme-name"] || editedTheme["theme-id"] || "Untitled"}
                        </span>
                    </div>
                    
                    <div style={styles.previewScroll}>
                        <ThemePreviewMini 
                            theme={editedTheme} 
                            barValue={previewBarValue}
                            onBarChange={setPreviewBarValue}
                        />
                    </div>
                </div>
            </div>
            
            {/* Footer Actions */}
            <div style={{
                ...styles.footer,
                borderTopColor: primary + "22",
            }}>
                <div style={styles.footerLeft}>
                    <button
                        onClick={resetChanges}
                        disabled={!hasChanges}
                        style={{
                            ...styles.footerButton,
                            background: surface,
                            color: hasChanges ? text : textMuted,
                            opacity: hasChanges ? 1 : 0.5,
                        }}
                    >
                        Reset Changes
                    </button>
                </div>
                <div style={styles.footerRight}>
                    {originalTheme && (
                        <button
                            onClick={() => saveTheme(true)}
                            disabled={saving || !editedTheme["theme-id"]}
                            style={{
                                ...styles.footerButton,
                                background: surface,
                                color: text,
                            }}
                        >
                            Save as New
                        </button>
                    )}
                    <button
                        onClick={() => saveTheme(false)}
                        disabled={saving || !editedTheme["theme-id"]}
                        style={{
                            ...styles.saveButton,
                            background: `linear-gradient(135deg, ${primary}, ${editedTheme["color-accent"] || "#f59e0b"})`,
                            opacity: (!saving && editedTheme["theme-id"]) ? 1 : 0.5,
                        }}
                    >
                        {saving ? "Saving..." : originalTheme ? "Save Changes" : "Create Theme"}
                    </button>
                </div>
            </div>
        </div>
    );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SUB-COMPONENT: Property Section
// ═══════════════════════════════════════════════════════════════════════════════

function PropertySection({ 
    section, 
    theme, 
    expanded, 
    onToggle, 
    onUpdate, 
    onImageUpload,
    primaryColor,
    textColor,
    textMuted,
    surfaceColor,
}) {
    return (
        <div style={styles.section}>
            {/* Section Header */}
            <div 
                onClick={onToggle}
                style={{
                    ...styles.sectionHeader,
                    borderBottomColor: expanded ? primaryColor + "33" : "transparent",
                }}
            >
                <span style={styles.sectionIcon}>{section.icon}</span>
                <span style={{ ...styles.sectionTitle, color: textColor }}>{section.title}</span>
                <span style={{ 
                    ...styles.expandIcon, 
                    color: textMuted,
                    transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                }}>
                    ▼
                </span>
            </div>
            
            {/* Section Content */}
            {expanded && (
                <div style={styles.sectionContent}>
                    {section.properties.map(prop => (
                        <PropertyField
                            key={prop.key}
                            prop={prop}
                            value={theme[prop.key]}
                            onChange={(value) => onUpdate(prop.key, value)}
                            onImageUpload={() => onImageUpload(prop.key)}
                            primaryColor={primaryColor}
                            textColor={textColor}
                            textMuted={textMuted}
                            surfaceColor={surfaceColor}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SUB-COMPONENT: Property Field
// ═══════════════════════════════════════════════════════════════════════════════

function PropertyField({ 
    prop, 
    value, 
    onChange, 
    onImageUpload,
    primaryColor,
    textColor,
    textMuted,
    surfaceColor,
}) {
    const renderInput = () => {
        switch (prop.type) {
            case "color":
                return (
                    <ColorPicker
                        value={value || "#7c3aed"}
                        onChange={onChange}
                        size="small"
                    />
                );
                
            case "gradient":
                return (
                    <GradientBuilder
                        value={value || "linear-gradient(90deg, #7c3aed, #a78bfa)"}
                        onChange={onChange}
                        previewHeight={40}
                    />
                );
                
            case "image":
                return (
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        {value && (
                            <div style={{
                                width: 60,
                                height: 60,
                                borderRadius: 8,
                                background: `url("${value}") center/contain no-repeat`,
                                border: "1px solid rgba(255,255,255,0.1)",
                            }} />
                        )}
                        <div style={{ display: "flex", gap: 8 }}>
                            <button
                                onClick={onImageUpload}
                                style={{
                                    padding: "6px 12px",
                                    fontSize: 11,
                                    background: "rgba(255,255,255,0.1)",
                                    border: "none",
                                    borderRadius: 6,
                                    color: textColor,
                                    cursor: "pointer",
                                }}
                            >
                                Upload Image
                            </button>
                            {value && (
                                <button
                                    onClick={() => onChange("")}
                                    style={{
                                        padding: "6px 12px",
                                        fontSize: 11,
                                        background: "rgba(255,0,0,0.1)",
                                        border: "none",
                                        borderRadius: 6,
                                        color: "#ff6666",
                                        cursor: "pointer",
                                    }}
                                >
                                    Remove
                                </button>
                            )}
                        </div>
                    </div>
                );
                
            case "select":
                return (
                    <select
                        value={value || ""}
                        onChange={(e) => onChange(e.target.value)}
                        style={{
                            padding: "8px 12px",
                            fontSize: 12,
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            borderRadius: 6,
                            color: textColor,
                            width: "100%",
                        }}
                    >
                        {prop.options.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                );
                
            case "number":
                return (
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <input
                            type="range"
                            min={prop.min || 0}
                            max={prop.max || 100}
                            value={value || prop.min || 0}
                            onChange={(e) => onChange(parseInt(e.target.value))}
                            style={{ flex: 1 }}
                        />
                        <span style={{ fontSize: 11, color: textMuted, width: 50 }}>
                            {value || 0}{prop.unit || ""}
                        </span>
                    </div>
                );
                
            case "boolean":
                return (
                    <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                        <input
                            type="checkbox"
                            checked={value || false}
                            onChange={(e) => onChange(e.target.checked)}
                            style={{ width: 18, height: 18 }}
                        />
                        <span style={{ fontSize: 12, color: textMuted }}>
                            {value ? "Enabled" : "Disabled"}
                        </span>
                    </label>
                );
                
            case "textarea":
                return (
                    <textarea
                        value={value || ""}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder={prop.placeholder}
                        rows={3}
                        style={{
                            padding: "8px 12px",
                            fontSize: 12,
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            borderRadius: 6,
                            color: textColor,
                            width: "100%",
                            resize: "vertical",
                            fontFamily: "inherit",
                        }}
                    />
                );
                
            default: // text
                return (
                    <input
                        type="text"
                        value={value || ""}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder={prop.placeholder}
                        style={{
                            padding: "8px 12px",
                            fontSize: 12,
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            borderRadius: 6,
                            color: textColor,
                            width: "100%",
                        }}
                    />
                );
        }
    };
    
    return (
        <div style={styles.fieldRow}>
            <label style={{ 
                ...styles.fieldLabel, 
                color: textMuted,
            }}>
                {prop.label}
                {prop.required && <span style={{ color: "#ff6666" }}> *</span>}
            </label>
            <div style={styles.fieldInput}>
                {renderInput()}
            </div>
        </div>
    );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SUB-COMPONENT: Mini Preview (all Glo* components)
// ═══════════════════════════════════════════════════════════════════════════════

function ThemePreviewMini({ theme, barValue, onBarChange }) {
    const primary = theme["color-primary"] || "#7c3aed";
    const accent = theme["color-accent"] || "#f59e0b";
    const surface = theme["color-surface"] || "#2a2a3e";
    const textMuted = theme["color-text-muted"] || "#a0a0b0";
    
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 20, padding: 4 }}>
            {/* Color Swatches */}
            <div>
                <div style={{ fontSize: 10, color: textMuted, marginBottom: 8, textTransform: "uppercase" }}>
                    Colors
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {["primary", "accent", "success", "warning", "error", "surface"].map(name => (
                        <div key={name} style={{ textAlign: "center" }}>
                            <div style={{
                                width: 28,
                                height: 28,
                                borderRadius: 6,
                                background: theme[`color-${name}`] || "#333",
                                border: "1px solid rgba(255,255,255,0.1)",
                            }} />
                            <div style={{ fontSize: 8, color: textMuted, marginTop: 2 }}>{name}</div>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Progress Bar */}
            <div>
                <div style={{ fontSize: 10, color: textMuted, marginBottom: 8, textTransform: "uppercase" }}>
                    Progress Bar
                </div>
                <GloBar
                    value={barValue}
                    max={100}
                    draggable={true}
                    onChange={onBarChange}
                    sprite={theme["bar-sprite"]}
                    spriteWidth={theme["bar-sprite-width"]}
                    spriteHeight={theme["bar-sprite-height"]}
                    fillGradient={theme["bar-fill-gradient"]}
                    trackBg={theme["bar-track-bg"]}
                    height={theme["bar-height"]}
                    borderRadius={theme["bar-border-radius"]}
                    clickAnimation={theme["bar-sprite-click-animation"]}
                />
            </div>
            
            {/* Toggle */}
            <div>
                <div style={{ fontSize: 10, color: textMuted, marginBottom: 8, textTransform: "uppercase" }}>
                    Toggle
                </div>
                <GloToggle
                    targetKey="__editor_preview_toggle"
                    targetFile="System/Settings.md"
                    sprite={theme["toggle-sprite"] || theme["bar-sprite"]}
                    spriteWidth={theme["toggle-sprite-width"] || theme["bar-sprite-width"]}
                    spriteHeight={theme["toggle-sprite-height"] || theme["bar-sprite-height"]}
                    onLabel={theme["label-active"] || "ON"}
                    offLabel={theme["label-inactive"] || "OFF"}
                    idleBg={theme["toggle-idle-bg"]}
                    activeBg={theme["toggle-active-bg"]}
                    spriteAnimation={theme["toggle-sprite-click-animation"]}
                />
            </div>
            
            {/* Buttons */}
            <div>
                <div style={{ fontSize: 10, color: textMuted, marginBottom: 8, textTransform: "uppercase" }}>
                    Buttons
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <GloButton 
                        label="Primary" 
                        size="small"
                        bg={theme["button-idle-bg"]}
                        hoverBg={theme["button-hover-bg"]}
                        activeBg={theme["button-active-bg"]}
                    />
                    <GloButton label="Ghost" variant="ghost" size="small" />
                </div>
            </div>
            
            {/* Badges */}
            <div>
                <div style={{ fontSize: 10, color: textMuted, marginBottom: 8, textTransform: "uppercase" }}>
                    Badges
                </div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    <GloBadge color={primary}>Primary</GloBadge>
                    <GloBadge status="success">Success</GloBadge>
                    <GloBadge status="warning">Warning</GloBadge>
                </div>
            </div>
            
            {/* Input */}
            <div>
                <div style={{ fontSize: 10, color: textMuted, marginBottom: 8, textTransform: "uppercase" }}>
                    Input
                </div>
                <GloInput
                    type="text"
                    placeholder="Type something..."
                    size="small"
                    bgOverride={theme["input-bg"]}
                    borderOverride={theme["input-border"]}
                    accentColorOverride={primary}
                />
            </div>
            
            {/* Tabs */}
            <div>
                <div style={{ fontSize: 10, color: textMuted, marginBottom: 8, textTransform: "uppercase" }}>
                    Tabs
                </div>
                <GloTabs
                    tabs={[
                        { id: "t1", label: "One" },
                        { id: "t2", label: "Two" },
                        { id: "t3", label: "Three" },
                    ]}
                    variant="pills"
                    size="small"
                    renderContent={false}
                    accentColorOverride={primary}
                    surfaceColorOverride={surface}
                />
            </div>
        </div>
    );
}

// ═══════════════════════════════════════════════════════════════════════════════
// STYLES
// ═══════════════════════════════════════════════════════════════════════════════

const styles = {
    container: {
        padding: 24,
        borderRadius: 16,
        fontFamily: "Inter, system-ui, sans-serif",
        minHeight: 600,
        display: "flex",
        flexDirection: "column",
    },
    loading: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 400,
        color: "rgba(255,255,255,0.5)",
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 20,
    },
    title: {
        margin: 0,
        fontSize: 24,
        fontWeight: 700,
    },
    subtitle: {
        margin: "4px 0 0 0",
        fontSize: 13,
    },
    headerActions: {
        display: "flex",
        alignItems: "center",
        gap: 12,
    },
    unsavedBadge: {
        fontSize: 11,
        padding: "4px 10px",
        borderRadius: 12,
        fontWeight: 500,
    },
    themeSelector: {
        display: "flex",
        alignItems: "center",
        marginBottom: 20,
    },
    select: {
        padding: "8px 12px",
        fontSize: 13,
        borderRadius: 8,
        border: "1px solid",
        cursor: "pointer",
        minWidth: 200,
    },
    mainContent: {
        display: "grid",
        gridTemplateColumns: "1fr 350px",
        gap: 20,
        flex: 1,
        minHeight: 0,
    },
    editorColumn: {
        borderRadius: 12,
        border: "1px solid",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
    },
    editorScroll: {
        flex: 1,
        overflowY: "auto",
        padding: 0,
    },
    previewColumn: {
        borderRadius: 12,
        border: "1px solid",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
    },
    previewHeader: {
        padding: "12px 16px",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    previewScroll: {
        flex: 1,
        overflowY: "auto",
        padding: 16,
    },
    section: {
        borderBottom: "1px solid rgba(255,255,255,0.05)",
    },
    sectionHeader: {
        display: "flex",
        alignItems: "center",
        padding: "14px 16px",
        cursor: "pointer",
        borderBottom: "1px solid",
        transition: "background 0.2s ease",
    },
    sectionIcon: {
        fontSize: 16,
        marginRight: 10,
    },
    sectionTitle: {
        flex: 1,
        fontSize: 13,
        fontWeight: 600,
    },
    expandIcon: {
        fontSize: 10,
        transition: "transform 0.2s ease",
    },
    sectionContent: {
        padding: 16,
        display: "flex",
        flexDirection: "column",
        gap: 14,
    },
    fieldRow: {
        display: "flex",
        flexDirection: "column",
        gap: 6,
    },
    fieldLabel: {
        fontSize: 11,
        fontWeight: 500,
    },
    fieldInput: {
        // Container for input
    },
    footer: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 20,
        marginTop: 20,
        borderTop: "1px solid",
    },
    footerLeft: {
        display: "flex",
        gap: 10,
    },
    footerRight: {
        display: "flex",
        gap: 10,
    },
    footerButton: {
        padding: "10px 16px",
        fontSize: 13,
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 8,
        cursor: "pointer",
        transition: "all 0.2s ease",
    },
    saveButton: {
        padding: "10px 20px",
        fontSize: 13,
        fontWeight: 600,
        color: "#fff",
        border: "none",
        borderRadius: 8,
        cursor: "pointer",
        transition: "all 0.2s ease",
    },
};

// ═══════════════════════════════════════════════════════════════════════════════
// EXPORT
// ═══════════════════════════════════════════════════════════════════════════════

const renderedView = <ThemeEditor />;
return { renderedView, ThemeEditor };
