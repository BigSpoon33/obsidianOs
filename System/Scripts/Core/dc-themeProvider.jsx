// ═══════════════════════════════════════════════════════════════════════════════
// THEME PROVIDER v2.0
// Central theme management system with Obsidian sync
// 
// Features:
//   • Load themes from System/Themes/*.md files
//   • Color override from style-settings-*.json files  
//   • Auto-map Style Settings keys to widget properties
//   • Sync to Obsidian appearance, Style Settings, and Minimal Settings
//   • Glow colors auto-derived from accent colors
//
// Usage in widgets:
//   const { useTheme, useAvailableThemes, switchTheme } = await dc.require(
//     dc.fileLink("System/Scripts/Core/dc-themeProvider.jsx")
//   );
//   
//   function MyWidget() {
//     const { theme, isLoading } = useTheme();
//     if (isLoading) return <div>Loading...</div>;
//     return <div style={{ color: theme["color-primary"] }}>...</div>;
//   }
// ═══════════════════════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────────────────────
// UTILITY FUNCTIONS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Convert hex color to rgba
 */
function hexToRgba(hex, alpha = 1) {
    if (!hex || typeof hex !== 'string') return `rgba(124, 58, 237, ${alpha})`;
    const cleanHex = hex.replace('#', '');
    const r = parseInt(cleanHex.substr(0, 2), 16) || 0;
    const g = parseInt(cleanHex.substr(2, 2), 16) || 0;
    const b = parseInt(cleanHex.substr(4, 2), 16) || 0;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * Determine if a color is light or dark
 * Returns true if light, false if dark
 */
function isLightColor(hex) {
    if (!hex || typeof hex !== 'string') return false;
    const cleanHex = hex.replace('#', '');
    const r = parseInt(cleanHex.substr(0, 2), 16) || 0;
    const g = parseInt(cleanHex.substr(2, 2), 16) || 0;
    const b = parseInt(cleanHex.substr(4, 2), 16) || 0;
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5;
}

// ─────────────────────────────────────────────────────────────────────────────
// STYLE SETTINGS KEY MAPPING
// Maps Style Settings keys to our widget properties
// ─────────────────────────────────────────────────────────────────────────────

const STYLE_SETTINGS_MAP = {
    // UI Colors
    "minimal-style@@ui1@@dark": "color-background",
    "minimal-style@@ui2@@dark": "color-surface", 
    "minimal-style@@ui3@@dark": "color-primary",
    "minimal-style@@ax1@@dark": "color-secondary",
    "minimal-style@@ax3@@dark": "color-accent",
    
    // Heading colors (available for widgets to use)
    "minimal-style@@h1-color@@dark": "color-heading-1",
    "minimal-style@@h2-color@@dark": "color-heading-2",
    "minimal-style@@h3-color@@dark": "color-heading-3",
    "minimal-style@@h4-color@@dark": "color-heading-4",
    "minimal-style@@h5-color@@dark": "color-heading-5",
    "minimal-style@@h6-color@@dark": "color-heading-6",
    
    // Other UI elements
    "minimal-style@@icon-color@@dark": "color-icon",
    "minimal-style@@line-number-color@@dark": "color-line-number",
    "minimal-style@@gutter-background@@dark": "color-gutter",
    "minimal-style@@minimal-tab-text-color-active@@dark": "color-tab-active",
    
    // Extra-extras
    "extra-extras@@extras-hr-color@@dark": "color-divider",
};

// ─────────────────────────────────────────────────────────────────────────────
// DEFAULT THEME
// ─────────────────────────────────────────────────────────────────────────────

const DEFAULT_THEME = {
    "theme-id": "default",
    "theme-name": "Default",
    "theme-description": "Fallback theme",
    
    // === COLORS (mapped from Style Settings or defined directly) ===
    "color-primary": "#7c3aed",
    "color-secondary": "#1e1e2e",
    "color-accent": "#f59e0b",
    "color-success": "#10b981",
    "color-warning": "#f59e0b",
    "color-error": "#ef4444",
    "color-background": "#1e1e2e",
    "color-surface": "#2a2a3e",
    "color-text": "#ffffff",
    "color-text-muted": "#a0a0b0",
    "color-divider": "#7c3aed",
    "color-icon": "#7c3aed",
    
    // Heading colors
    "color-heading-1": "#7c3aed",
    "color-heading-2": "#8b5cf6",
    "color-heading-3": "#a78bfa",
    "color-heading-4": "#c4b5fd",
    "color-heading-5": "#ddd6fe",
    "color-heading-6": "#ede9fe",
    
    // === GLOW EFFECTS (auto-derived if not set) ===
    "glow-enabled": true,
    "glow-color-active": "",  // Derived from accent
    "glow-color-hover": "",   // Derived from primary
    "glow-intensity": "15px",
    "glow-spread": "2px",
    
    // === TRANSITIONS ===
    "transition-duration": "0.3s",
    "transition-easing": "ease",
    
    // === BORDERS ===
    "border-width-default": "1px",
    "border-width-active": "2px",
    "border-radius-small": "6px",
    "border-radius-medium": "12px",
    "border-radius-large": "16px",
    "border-radius-pill": "9999px",
    
    // === TYPOGRAPHY ===
    "font-interface": "",
    "font-text": "",
    "font-mono": "Fira Code, monospace",
    
    // === SPRITE PACK ===
    "bar-sprite": "",
    "bar-sprite-width": 34,
    "bar-sprite-height": 21,
    "bar-track-bg": "",
    "bar-fill-gradient": "linear-gradient(90deg, #7c3aed, #a78bfa)",
    "bar-border-radius": "6px",
    "bar-height": "14px",
    
    "toggle-sprite": "",
    "toggle-sprite-width": 50,
    "toggle-sprite-height": 40,
    "toggle-idle-bg": "",
    "toggle-hover-bg": "",
    "toggle-active-bg": "",
    
    // === LABELS ===
    "label-active": "Active",
    "label-inactive": "Inactive",
    "label-active-sub": "Enabled",
    "label-inactive-sub": "Disabled",
    
    // === BUTTONS ===
    "button-idle-bg": "#7c3aed",
    "button-hover-bg": "#8b5cf6",
    "button-active-bg": "#6d28d9",
    "button-text-color": "#ffffff",
    "button-border-radius": "8px",
    "button-padding": "10px 20px",
    
    // === CARDS ===
    "card-bg-color": "#2a2a3e",
    "card-border": "1px solid rgba(255,255,255,0.1)",
    "card-border-radius": "12px",
    "card-shadow": "0 4px 15px rgba(0,0,0,0.2)",
    "card-padding": "16px",
    
    // === INPUTS ===
    "input-bg": "rgba(255,255,255,0.05)",
    "input-border": "1px solid rgba(255,255,255,0.2)",
    "input-border-focus": "1px solid #7c3aed",
    "input-border-radius": "6px",
    "input-text-color": "#ffffff",
    
    // === CHIPS ===
    "chip-bg": "rgba(255,255,255,0.05)",
    "chip-bg-active": "rgba(255,255,255,0.15)",
    "chip-border-radius": "20px",
    
    // === CHARTS ===
    "chart-color-1": "#7c3aed",
    "chart-color-2": "#a78bfa",
    "chart-color-3": "#f59e0b",
    "chart-color-4": "#10b981",
    "chart-color-5": "#3b82f6",
    "chart-color-6": "#ec4899",
    "heatmap-empty": "rgba(255,255,255,0.1)",
    "heatmap-filled": "#7c3aed",
    
    // === ICONS ===
    "icon-style": "emoji",
    "icon-water": "💧",
    "icon-sleep": "😴",
    "icon-exercise": "💪",
    "icon-mood": "😊",
    "icon-food": "🍽️",
    "icon-journal": "📔",
    
    // === HR/DIVIDER SVG ===
    "hr-svg": "",
    "hr-color": "#7c3aed",
    
    // === OBSIDIAN SYNC ===
    "obsidian-accent-color": "#7c3aed",
    "sync-to-obsidian": true,
};

// ─────────────────────────────────────────────────────────────────────────────
// CACHE
// ─────────────────────────────────────────────────────────────────────────────

let themeCache = new Map();
let colorOverrideCache = new Map();
let availableThemesCache = null;
let availableColorSchemesCache = null;

// ─────────────────────────────────────────────────────────────────────────────
// COLOR MAPPING FUNCTIONS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Map Style Settings JSON to widget properties
 */
function mapStyleSettingsToWidgetProps(styleSettings) {
    const mapped = {};
    
    for (const [ssKey, widgetKey] of Object.entries(STYLE_SETTINGS_MAP)) {
        if (styleSettings[ssKey]) {
            mapped[widgetKey] = styleSettings[ssKey];
        }
    }
    
    return mapped;
}

/**
 * Derive glow colors from accent/primary if not explicitly set
 */
function deriveGlowColors(theme) {
    const accent = theme["color-accent"] || theme["color-primary"] || "#7c3aed";
    const primary = theme["color-primary"] || "#7c3aed";
    
    if (!theme["glow-color-active"]) {
        theme["glow-color-active"] = hexToRgba(accent, 0.4);
    }
    if (!theme["glow-color-hover"]) {
        theme["glow-color-hover"] = hexToRgba(primary, 0.25);
    }
    
    // Derive text color based on background luminance
    if (!theme["color-text"]) {
        theme["color-text"] = isLightColor(theme["color-background"]) ? "#1e1e1e" : "#ffffff";
    }
    if (!theme["color-text-muted"]) {
        theme["color-text-muted"] = hexToRgba(theme["color-text"], 0.6);
    }
    
    return theme;
}

// ─────────────────────────────────────────────────────────────────────────────
// FILE LOADING FUNCTIONS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Load a color override JSON file
 */
async function loadColorOverride(colorSchemeName) {
    if (!colorSchemeName) return null;
    
    // Check cache
    if (colorOverrideCache.has(colorSchemeName)) {
        return colorOverrideCache.get(colorSchemeName);
    }
    
    try {
        const filePath = `System/Themes/style-settings-${colorSchemeName}.json`;
        const file = app.vault.getAbstractFileByPath(filePath);
        if (file) {
            const content = await app.vault.read(file);
            const json = JSON.parse(content);
            colorOverrideCache.set(colorSchemeName, json);
            return json;
        }
    } catch (e) {
        console.warn(`Failed to load color override: ${colorSchemeName}`, e);
    }
    return null;
}

/**
 * Get list of available color schemes (JSON files)
 */
function useAvailableColorSchemes() {
    const [schemes, setSchemes] = dc.useState([]);
    const [isLoading, setIsLoading] = dc.useState(true);
    
    dc.useEffect(() => {
        const scan = async () => {
            if (availableColorSchemesCache) {
                setSchemes(availableColorSchemesCache);
                setIsLoading(false);
                return;
            }
            
            try {
                const files = app.vault.getFiles();
                const jsonFiles = files.filter(f => 
                    f.path.startsWith("System/Themes/style-settings-") && 
                    f.extension === "json"
                );
                
                const schemeList = jsonFiles.map(f => {
                    // Extract name: style-settings-violetViper.json -> violetViper
                    const name = f.basename.replace("style-settings-", "");
                    return { name, path: f.path };
                });
                
                availableColorSchemesCache = schemeList;
                setSchemes(schemeList);
            } catch (e) {
                console.error("Failed to scan color schemes:", e);
            }
            setIsLoading(false);
        };
        
        scan();
    }, []);
    
    return { schemes, isLoading };
}

/**
 * Scan for available theme files (*.md in System/Themes/)
 */
function useAvailableThemes() {
    const [themes, setThemes] = dc.useState([]);
    const [isLoading, setIsLoading] = dc.useState(true);
    
    dc.useEffect(() => {
        const scanThemes = async () => {
            if (availableThemesCache) {
                setThemes(availableThemesCache);
                setIsLoading(false);
                return;
            }
            
            try {
                const files = app.vault.getMarkdownFiles();
                const themeFiles = files.filter(f => 
                    f.path.startsWith("System/Themes/") && 
                    !f.name.startsWith("_") &&
                    f.extension === "md"
                );
                
                const themeList = [];
                for (const file of themeFiles) {
                    const cache = app.metadataCache.getFileCache(file);
                    const fm = cache?.frontmatter;
                    if (fm?.["theme-id"]) {
                        themeList.push({
                            id: fm["theme-id"],
                            name: fm["theme-name"] || fm["theme-id"],
                            description: fm["theme-description"] || "",
                            path: file.path,
                            hasSprite: !!(fm["bar-sprite"] || fm["toggle-sprite"])
                        });
                    }
                }
                
                availableThemesCache = themeList;
                setThemes(themeList);
            } catch (e) {
                console.error("Failed to scan themes:", e);
            }
            setIsLoading(false);
        };
        
        scanThemes();
    }, []);
    
    return { themes, isLoading };
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN THEME HOOK
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Main hook - loads active theme + optional color override
 */
function useTheme() {
    const [theme, setTheme] = dc.useState(DEFAULT_THEME);
    const [isLoading, setIsLoading] = dc.useState(true);
    const [themeName, setThemeName] = dc.useState("default");
    const [colorOverrideName, setColorOverrideName] = dc.useState("");
    
    dc.useEffect(() => {
        const loadTheme = async () => {
            try {
                // 1. Get settings from Settings.md
                const settingsFile = app.metadataCache.getFirstLinkpathDest("System/Settings.md", "");
                if (!settingsFile) {
                    console.warn("Settings.md not found, using default theme");
                    setIsLoading(false);
                    return;
                }
                
                const settingsCache = app.metadataCache.getFileCache(settingsFile);
                const activeThemeId = settingsCache?.frontmatter?.["widget-theme"] || "nyanCat";
                const colorOverride = settingsCache?.frontmatter?.["color-override"] || "";
                
                setThemeName(activeThemeId);
                setColorOverrideName(colorOverride);
                
                // 2. Create cache key
                const cacheKey = `${activeThemeId}:${colorOverride}`;
                if (themeCache.has(cacheKey)) {
                    setTheme(themeCache.get(cacheKey));
                    setIsLoading(false);
                    return;
                }
                
                // 3. Load base theme file
                const themeFile = app.vault.getMarkdownFiles().find(f => {
                    if (!f.path.startsWith("System/Themes/")) return false;
                    const cache = app.metadataCache.getFileCache(f);
                    return cache?.frontmatter?.["theme-id"] === activeThemeId;
                });
                
                let themeData = { ...DEFAULT_THEME };
                
                if (themeFile) {
                    const cache = app.metadataCache.getFileCache(themeFile);
                    const fm = cache?.frontmatter || {};
                    
                    // Merge frontmatter into theme
                    themeData = { ...DEFAULT_THEME, ...fm };
                    
                    // If theme has style-settings embedded, map them
                    if (fm["style-settings"] && typeof fm["style-settings"] === "object") {
                        const mapped = mapStyleSettingsToWidgetProps(fm["style-settings"]);
                        themeData = { ...themeData, ...mapped };
                    }
                }
                
                // 4. Apply color override if set
                if (colorOverride) {
                    const overrideData = await loadColorOverride(colorOverride);
                    if (overrideData) {
                        const mapped = mapStyleSettingsToWidgetProps(overrideData);
                        themeData = { ...themeData, ...mapped };
                        // Also store the raw style-settings for sync
                        themeData["_styleSettingsOverride"] = overrideData;
                    }
                }
                
                // 5. Derive glow colors and text colors
                themeData = deriveGlowColors(themeData);
                
                // 6. Cache and set
                themeCache.set(cacheKey, themeData);
                injectCSSVariables(themeData);
                setTheme(themeData);
                
            } catch (e) {
                console.error("Theme loading failed:", e);
            }
            setIsLoading(false);
        };
        
        loadTheme();
    }, []);
    
    return { theme, isLoading, themeName, colorOverrideName };
}

// ─────────────────────────────────────────────────────────────────────────────
// CSS VARIABLE INJECTION
// ─────────────────────────────────────────────────────────────────────────────

function injectCSSVariables(theme) {
    const root = document.documentElement;
    
    // Colors
    root.style.setProperty('--theme-primary', theme["color-primary"]);
    root.style.setProperty('--theme-secondary', theme["color-secondary"]);
    root.style.setProperty('--theme-accent', theme["color-accent"]);
    root.style.setProperty('--theme-success', theme["color-success"]);
    root.style.setProperty('--theme-warning', theme["color-warning"]);
    root.style.setProperty('--theme-error', theme["color-error"]);
    root.style.setProperty('--theme-background', theme["color-background"]);
    root.style.setProperty('--theme-surface', theme["color-surface"]);
    root.style.setProperty('--theme-text', theme["color-text"]);
    root.style.setProperty('--theme-text-muted', theme["color-text-muted"]);
    
    // Glow
    root.style.setProperty('--theme-glow-active', theme["glow-color-active"]);
    root.style.setProperty('--theme-glow-hover', theme["glow-color-hover"]);
    root.style.setProperty('--theme-glow-intensity', theme["glow-intensity"]);
    root.style.setProperty('--theme-glow-spread', theme["glow-spread"]);
    
    // Transitions
    root.style.setProperty('--theme-transition-duration', theme["transition-duration"]);
    root.style.setProperty('--theme-transition-easing', theme["transition-easing"]);
    
    // Border radius
    root.style.setProperty('--theme-radius-small', theme["border-radius-small"]);
    root.style.setProperty('--theme-radius-medium', theme["border-radius-medium"]);
    root.style.setProperty('--theme-radius-large', theme["border-radius-large"]);
    
    // Typography
    if (theme["font-interface"]) {
        root.style.setProperty('--theme-font-interface', theme["font-interface"]);
    }
    if (theme["font-text"]) {
        root.style.setProperty('--theme-font-text', theme["font-text"]);
    }
    root.style.setProperty('--theme-font-mono', theme["font-mono"]);
}

// ─────────────────────────────────────────────────────────────────────────────
// OBSIDIAN SYNC FUNCTIONS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Sync theme colors to Obsidian appearance.json (accent color)
 */
async function syncToAppearance(accentColor) {
    try {
        const path = ".obsidian/appearance.json";
        const content = await app.vault.adapter.read(path);
        const json = JSON.parse(content);
        
        json.accentColor = accentColor;
        
        await app.vault.adapter.write(path, JSON.stringify(json, null, 2));
        return true;
    } catch (e) {
        console.error("Failed to sync to appearance.json:", e);
        return false;
    }
}

/**
 * Sync theme colors to Style Settings plugin
 */
async function syncToStyleSettings(styleSettingsData) {
    try {
        const path = ".obsidian/plugins/obsidian-style-settings/data.json";
        const content = await app.vault.adapter.read(path);
        const existing = JSON.parse(content);
        
        // Merge our values (override existing)
        const merged = { ...existing, ...styleSettingsData };
        
        await app.vault.adapter.write(path, JSON.stringify(merged, null, 2));
        return true;
    } catch (e) {
        console.error("Failed to sync to Style Settings:", e);
        return false;
    }
}

/**
 * Sync to Minimal Settings plugin (optional overrides)
 */
async function syncToMinimalSettings(minimalSettingsData) {
    try {
        const path = ".obsidian/plugins/obsidian-minimal-settings/data.json";
        const content = await app.vault.adapter.read(path);
        const existing = JSON.parse(content);
        
        const merged = { ...existing, ...minimalSettingsData };
        
        await app.vault.adapter.write(path, JSON.stringify(merged, null, 2));
        return true;
    } catch (e) {
        console.error("Failed to sync to Minimal Settings:", e);
        return false;
    }
}

/**
 * Full sync - syncs to all Obsidian config files
 */
async function syncThemeToObsidian(theme) {
    const results = { appearance: false, styleSettings: false, minimalSettings: false };
    
    // 1. Sync accent color
    if (theme["obsidian-accent-color"]) {
        results.appearance = await syncToAppearance(theme["obsidian-accent-color"]);
    }
    
    // 2. Sync Style Settings
    // Use override data if present, otherwise use embedded style-settings
    const styleSettingsData = theme["_styleSettingsOverride"] || theme["style-settings"];
    if (styleSettingsData && typeof styleSettingsData === "object") {
        results.styleSettings = await syncToStyleSettings(styleSettingsData);
    }
    
    // 3. Sync Minimal Settings (if present)
    if (theme["minimal-settings"] && typeof theme["minimal-settings"] === "object") {
        results.minimalSettings = await syncToMinimalSettings(theme["minimal-settings"]);
    }
    
    return results;
}

// ─────────────────────────────────────────────────────────────────────────────
// THEME SWITCHING
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Clear all caches
 */
function clearThemeCache() {
    themeCache.clear();
    colorOverrideCache.clear();
    availableThemesCache = null;
    availableColorSchemesCache = null;
}

/**
 * Switch theme and optionally set color override
 * @param {string} themeId - The theme ID to switch to
 * @param {string} colorOverride - Optional color scheme name (from JSON files)
 * @param {boolean} syncToObsidian - Whether to sync to Obsidian config files
 */
async function switchTheme(themeId, colorOverride = "", syncToObsidian = true) {
    try {
        // 1. Update Settings.md
        const settingsFile = app.vault.getAbstractFileByPath("System/Settings.md");
        if (!settingsFile) {
            new Notice("Settings.md not found!");
            return false;
        }
        
        await app.fileManager.processFrontMatter(settingsFile, (fm) => {
            fm["widget-theme"] = themeId;
            fm["color-override"] = colorOverride;
        });
        
        // 2. Clear cache
        clearThemeCache();
        
        // 3. Load the new theme to get sync data
        if (syncToObsidian) {
            // Load theme file
            const themeFile = app.vault.getMarkdownFiles().find(f => {
                if (!f.path.startsWith("System/Themes/")) return false;
                const cache = app.metadataCache.getFileCache(f);
                return cache?.frontmatter?.["theme-id"] === themeId;
            });
            
            let themeData = { ...DEFAULT_THEME };
            
            if (themeFile) {
                const cache = app.metadataCache.getFileCache(themeFile);
                themeData = { ...DEFAULT_THEME, ...cache?.frontmatter };
            }
            
            // Apply color override if set
            if (colorOverride) {
                const overrideData = await loadColorOverride(colorOverride);
                if (overrideData) {
                    themeData["_styleSettingsOverride"] = overrideData;
                    // Also set obsidian accent from override
                    if (overrideData["minimal-style@@ui3@@dark"]) {
                        themeData["obsidian-accent-color"] = overrideData["minimal-style@@ui3@@dark"];
                    }
                }
            }
            
            // Sync to Obsidian
            const syncResults = await syncThemeToObsidian(themeData);
            console.log("Theme sync results:", syncResults);
        }
        
        new Notice(`Theme switched to: ${themeId}${colorOverride ? ` + ${colorOverride}` : ""}`);
        
        // 4. Reload to apply all changes
        setTimeout(() => {
            window.location.reload();
        }, 500);
        
        return true;
        
    } catch (e) {
        console.error("Failed to switch theme:", e);
        new Notice("Failed to switch theme");
        return false;
    }
}

/**
 * Set just the color override without changing sprite pack
 */
async function setColorOverride(colorOverride, syncToObsidian = true) {
    try {
        const settingsFile = app.vault.getAbstractFileByPath("System/Settings.md");
        if (!settingsFile) return false;
        
        // Get current theme
        const cache = app.metadataCache.getFileCache(settingsFile);
        const currentTheme = cache?.frontmatter?.["widget-theme"] || "nyanCat";
        
        // Use switchTheme to handle the rest
        return await switchTheme(currentTheme, colorOverride, syncToObsidian);
        
    } catch (e) {
        console.error("Failed to set color override:", e);
        return false;
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// EXPORTS
// ─────────────────────────────────────────────────────────────────────────────

return { 
    // Hooks
    useTheme, 
    useAvailableThemes,
    useAvailableColorSchemes,
    
    // Actions
    switchTheme,
    setColorOverride,
    clearThemeCache,
    
    // Sync functions
    syncThemeToObsidian,
    syncToAppearance,
    syncToStyleSettings,
    syncToMinimalSettings,
    
    // Utilities
    hexToRgba,
    isLightColor,
    mapStyleSettingsToWidgetProps,
    
    // Constants
    DEFAULT_THEME,
    STYLE_SETTINGS_MAP
};
