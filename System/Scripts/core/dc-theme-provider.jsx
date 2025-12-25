// ═══════════════════════════════════════════════════════════════════════════════
// THEME PROVIDER
// Central theme management system for all widgets
// 
// Usage in widgets:
//   const { useTheme, useAvailableThemes } = await dc.require(
//     dc.fileLink("System/Scripts/core/dc-theme-provider.jsx")
//   );
//   
//   function MyWidget() {
//     const { theme, isLoading } = useTheme();
//     if (isLoading) return <div>Loading...</div>;
//     return <div style={{ color: theme["color-primary"] }}>...</div>;
//   }
// ═══════════════════════════════════════════════════════════════════════════════

// Default theme values (fallback if theme file is missing properties)
const DEFAULT_THEME = {
    "theme-id": "default",
    "theme-name": "Default",
    "theme-description": "Fallback theme",
    
    // Colors
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
    
    // Typography
    "font-ui": "Inter, sans-serif",
    "font-body": "Georgia, serif",
    "font-mono": "Fira Code, monospace",
    
    // Progress Bar
    "bar-sprite": "",
    "bar-sprite-width": 34,
    "bar-sprite-height": 21,
    "bar-track-bg": "",
    "bar-fill-gradient": "linear-gradient(90deg, #7c3aed, #a78bfa)",
    "bar-border-radius": "6px",
    "bar-height": "14px",
    
    // Buttons
    "button-idle-bg": "#7c3aed",
    "button-hover-bg": "#8b5cf6",
    "button-active-bg": "#6d28d9",
    "button-text-color": "#ffffff",
    "button-border-radius": "8px",
    "button-padding": "8px 16px",
    
    // Toggle
    "toggle-sprite": "",
    "toggle-sprite-width": 50,
    "toggle-sprite-height": 50,
    "toggle-idle-bg": "#2a2a3e",
    "toggle-hover-bg": "#3a3a4e",
    "toggle-active-bg": "#4a4a5e",
    
    // Cards
    "card-bg-style": "solid",
    "card-bg-color": "#2a2a3e",
    "card-border": "1px solid rgba(255,255,255,0.1)",
    "card-border-radius": "12px",
    "card-shadow": "0 4px 15px rgba(0,0,0,0.2)",
    "card-padding": "16px",
    
    // Inputs
    "input-bg": "rgba(255,255,255,0.05)",
    "input-border": "1px solid rgba(255,255,255,0.2)",
    "input-border-focus": "1px solid #7c3aed",
    "input-border-radius": "6px",
    "input-text-color": "#ffffff",
    
    // Chips
    "chip-bg": "rgba(255,255,255,0.05)",
    "chip-bg-active": "rgba(255,255,255,0.15)",
    "chip-border-radius": "20px",
    
    // Charts
    "chart-color-1": "#7c3aed",
    "chart-color-2": "#a78bfa",
    "chart-color-3": "#f59e0b",
    "chart-color-4": "#10b981",
    "chart-color-5": "#3b82f6",
    "chart-color-6": "#ec4899",
    "heatmap-empty": "rgba(255,255,255,0.1)",
    "heatmap-filled": "#7c3aed",
    
    // Icons
    "icon-style": "emoji",
    "icon-water": "💧",
    "icon-sleep": "😴",
    "icon-exercise": "💪",
    "icon-mood": "😊",
    "icon-food": "🍽️",
    "icon-journal": "📔",
    
    // Mascot
    "mascot-enabled": false,
    "mascot-idle": "",
    "mascot-happy": "",
    "mascot-sad": "",
    "mascot-position": "bottom-right",
    "mascot-size": "64px"
};

// Theme cache to avoid reloading
let themeCache = new Map();
let availableThemesCache = null;

/**
 * Scans System/Themes/ folder for all theme files
 * Returns array of { id, name, description, path }
 */
function useAvailableThemes() {
    const [themes, setThemes] = dc.useState([]);
    const [isLoading, setIsLoading] = dc.useState(true);
    
    dc.useEffect(() => {
        const scanThemes = async () => {
            try {
                // Check cache first
                if (availableThemesCache) {
                    setThemes(availableThemesCache);
                    setIsLoading(false);
                    return;
                }
                
                const files = app.vault.getMarkdownFiles();
                const themeFiles = files.filter(f => 
                    f.path.startsWith("System/Themes/") && 
                    !f.name.startsWith("_")  // Exclude templates
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
                            path: file.path
                        });
                    }
                }
                
                // Cache the results
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

/**
 * Main hook - loads active theme from Settings.md
 * Returns theme object with all properties
 */
function useTheme() {
    const [theme, setTheme] = dc.useState(DEFAULT_THEME);
    const [isLoading, setIsLoading] = dc.useState(true);
    const [themeName, setThemeName] = dc.useState("default");
    
    dc.useEffect(() => {
        const loadTheme = async () => {
            try {
                // 1. Get active theme ID from Settings.md
                const settingsFile = app.metadataCache.getFirstLinkpathDest("System/Settings.md", "");
                if (!settingsFile) {
                    console.warn("Settings.md not found, using default theme");
                    setIsLoading(false);
                    return;
                }
                
                const settingsCache = app.metadataCache.getFileCache(settingsFile);
                const activeThemeId = settingsCache?.frontmatter?.["widget-theme"] || "nyan-cat";
                setThemeName(activeThemeId);
                
                // 2. Check cache first
                if (themeCache.has(activeThemeId)) {
                    setTheme(themeCache.get(activeThemeId));
                    setIsLoading(false);
                    return;
                }
                
                // 3. Find theme file
                const themeFile = app.vault.getMarkdownFiles().find(f => {
                    if (!f.path.startsWith("System/Themes/")) return false;
                    const cache = app.metadataCache.getFileCache(f);
                    return cache?.frontmatter?.["theme-id"] === activeThemeId;
                });
                
                if (themeFile) {
                    const cache = app.metadataCache.getFileCache(themeFile);
                    // Merge with defaults so missing properties have fallbacks
                    const themeData = { ...DEFAULT_THEME, ...cache?.frontmatter };
                    
                    // 4. Cache it
                    themeCache.set(activeThemeId, themeData);
                    
                    // 5. Inject CSS variables
                    injectCSSVariables(themeData);
                    
                    setTheme(themeData);
                } else {
                    console.warn(`Theme "${activeThemeId}" not found, using default`);
                }
            } catch (e) {
                console.error("Theme loading failed:", e);
            }
            setIsLoading(false);
        };
        
        loadTheme();
    }, []);
    
    return { theme, isLoading, themeName };
}

/**
 * Injects theme colors as CSS variables on document root
 * This allows CSS to reference theme values
 */
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
    
    // Typography
    root.style.setProperty('--theme-font-ui', theme["font-ui"]);
    root.style.setProperty('--theme-font-body', theme["font-body"]);
    root.style.setProperty('--theme-font-mono', theme["font-mono"]);
    
    // Card styles
    root.style.setProperty('--theme-card-radius', theme["card-border-radius"]);
    root.style.setProperty('--theme-card-shadow', theme["card-shadow"]);
    
    // Button styles
    root.style.setProperty('--theme-button-radius', theme["button-border-radius"]);
}

/**
 * Force reload themes (clears cache)
 * Call this after theme files are modified
 */
function clearThemeCache() {
    themeCache.clear();
    availableThemesCache = null;
}

/**
 * Switch to a different theme
 * Updates Settings.md and clears cache
 */
async function switchTheme(themeId) {
    try {
        const file = app.vault.getAbstractFileByPath("System/Settings.md");
        if (file) {
            await app.fileManager.processFrontMatter(file, (fm) => {
                fm["widget-theme"] = themeId;
            });
            clearThemeCache();
            new Notice(`Switched to theme: ${themeId}`);
            return true;
        }
    } catch (e) {
        console.error("Failed to switch theme:", e);
        new Notice("Failed to switch theme");
    }
    return false;
}

// Export everything
return { 
    useTheme, 
    useAvailableThemes, 
    switchTheme, 
    clearThemeCache,
    DEFAULT_THEME 
};
