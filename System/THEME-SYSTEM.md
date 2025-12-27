# Theme System

Complete documentation for the Datacore-powered theme system.

---

## Overview

The theme system provides:

1. **Theme Files** - Markdown files with frontmatter properties
2. **Color Overrides** - JSON files that override theme colors
3. **Theme Provider** - React hooks for theme access in widgets
4. **Obsidian Sync** - Automatic sync to Obsidian's config files
5. **Live Preview** - Preview themes before applying

---

## Theme Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                    Theme File (.md)                           │
│  System/Themes/nyanCat.md                                    │
│  ├── Metadata (id, name, description, author, version)       │
│  ├── Colors (primary, secondary, accent, success, etc.)      │
│  ├── Sprites (bar-sprite, toggle-sprite, button-sprite)      │
│  ├── Component styles (button-*, toggle-*, card-*, etc.)     │
│  ├── Effects (glow, transitions, borders)                    │
│  └── Obsidian sync (style-settings, minimal-settings)        │
└──────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────┐
│                    Color Override (optional)                  │
│  System/Themes/style-settings-savageCroc.json                │
│  └── Overrides color-* properties from theme                 │
└──────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────┐
│                    Merged Theme Object                        │
│  DEFAULT_THEME + Theme File + Color Override                 │
│  + Derived colors (glow, text contrast)                      │
└──────────────────────────────────────────────────────────────┘
```

---

## Theme File Structure

Themes are defined as Markdown files in `System/Themes/`. The frontmatter contains all theme properties.

For the complete property reference with descriptions, see: **[Templates/_themeTemplate.md](./Templates/_themeTemplate.md)**

### Key Property Categories

| Category | Example Properties |
|----------|-------------------|
| **Metadata** | `theme-id`, `theme-name`, `theme-description`, `theme-author` |
| **Colors** | `color-primary`, `color-accent`, `color-background`, `color-surface` |
| **Progress Bar** | `bar-sprite`, `bar-fill-gradient`, `bar-track-bg`, `bar-height` |
| **Toggle** | `toggle-sprite`, `toggle-idle-bg`, `toggle-active-bg`, `label-active` |
| **Button** | `button-idle-bg`, `button-hover-bg`, `button-active-bg` |
| **Input** | `input-bg`, `input-border`, `input-border-focus` |
| **Card** | `card-bg-color`, `card-border`, `card-shadow` |
| **Glow** | `glow-enabled`, `glow-intensity`, `glow-color-hover` |
| **Obsidian** | `style-settings`, `minimal-settings`, `obsidian-accent-color` |

---

## Theme Provider API

Import the theme provider in any Datacore widget:

```javascript
const { 
    useTheme, 
    useAvailableThemes,
    switchTheme 
} = await dc.require(dc.fileLink("System/Scripts/Core/dc-themeProvider.jsx"));
```

### Hooks

#### `useTheme()`

Returns the current merged theme object.

```javascript
function MyWidget() {
    const { theme, isLoading, themeName, colorOverrideName } = useTheme();
    
    if (isLoading) return <div>Loading...</div>;
    
    return (
        <div style={{ 
            background: theme["color-background"],
            color: theme["color-text"],
        }}>
            <h1 style={{ color: theme["color-primary"] }}>
                Hello from {themeName}!
            </h1>
        </div>
    );
}
```

**Returns:**
| Property | Type | Description |
|----------|------|-------------|
| `theme` | `object` | Merged theme object with all properties |
| `isLoading` | `boolean` | True while theme is loading |
| `themeName` | `string` | Current theme ID |
| `colorOverrideName` | `string` | Current color override name (or empty) |

---

#### `useThemeWithOverride()`

Like `useTheme()`, but respects theme overrides set by `ThemeOverrideProvider`. Use this in components that need to support live preview.

```javascript
function PreviewableComponent() {
    const { theme, isLoading, isOverride } = useThemeWithOverride();
    
    // If isOverride is true, we're in preview mode
    return <div style={{ color: theme["color-primary"] }}>...</div>;
}
```

---

#### `useAvailableThemes()`

Returns list of all theme files.

```javascript
function ThemeSelector() {
    const { themes, isLoading } = useAvailableThemes();
    
    if (isLoading) return <div>Scanning themes...</div>;
    
    return (
        <ul>
            {themes.map(t => (
                <li key={t.id}>
                    <strong>{t.name}</strong> - {t.description}
                    {t.hasSprite && " (has sprites)"}
                </li>
            ))}
        </ul>
    );
}
```

**Theme metadata:**
```javascript
{
    id: "nyanCat",           // theme-id from frontmatter
    name: "Nyan Cat",        // theme-name
    description: "...",      // theme-description
    path: "System/Themes/nyanCat.md",
    hasSprite: true          // Has bar-sprite or toggle-sprite
}
```

---

#### `useAvailableColorSchemes()`

Returns list of color scheme JSON files.

```javascript
const { schemes, isLoading } = useAvailableColorSchemes();

// schemes = [
//   { name: "violetViper", path: "System/Themes/style-settings-violetViper.json" },
//   { name: "savageCroc", path: "System/Themes/style-settings-savageCroc.json" },
//   ...
// ]
```

---

### Actions

#### `switchTheme(themeId, colorOverride?, syncToObsidian?)`

Switch to a different theme.

```javascript
// Switch to bongoCat theme
await switchTheme("bongoCat");

// Switch theme and apply color override
await switchTheme("nyanCat", "savageCroc");

// Switch without syncing to Obsidian
await switchTheme("nyanCat", "", false);
```

**Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `themeId` | `string` | required | Theme ID to switch to |
| `colorOverride` | `string` | `""` | Color scheme name (optional) |
| `syncToObsidian` | `boolean` | `true` | Whether to sync to Obsidian config |

**Behavior:**
1. Updates `Settings.md` frontmatter
2. Clears theme cache
3. Syncs to Obsidian (if enabled)
4. Shows Notice with theme name
5. Reloads page after 500ms

---

#### `setColorOverride(colorOverride, syncToObsidian?)`

Change only the color override without changing the sprite pack.

```javascript
await setColorOverride("violetViper");
```

---

#### `applyCurrentTheme()`

Apply settings from `Settings.md` to Obsidian. Call this after manually editing Settings.md.

```javascript
await applyCurrentTheme();
```

---

#### `clearThemeCache()`

Clear all theme caches. Use if themes aren't updating.

```javascript
clearThemeCache();
```

---

### Theme Loading Utilities

#### `loadThemeFromPath(path)`

Load a theme from a file path. Returns merged theme object.

```javascript
const theme = await loadThemeFromPath("System/Themes/nyanCat.md");
console.log(theme["color-primary"]); // "#ff69b4"
```

---

#### `loadThemeById(themeId)`

Load a theme by its ID.

```javascript
const theme = await loadThemeById("nyanCat");
```

---

#### `getThemeMetadata(path)`

Get theme metadata without loading full theme. Synchronous.

```javascript
const meta = getThemeMetadata("System/Themes/nyanCat.md");
// { id, name, description, path, hasSprite, version, author }
```

---

#### `loadColorOverride(colorSchemeName)`

Load a color scheme JSON file.

```javascript
const override = await loadColorOverride("savageCroc");
// Returns the parsed JSON object
```

---

### Theme Override System

For live preview without affecting the global theme:

#### `setThemeOverride(theme)`

Push a theme override onto the stack.

```javascript
const cleanup = setThemeOverride(previewTheme);

// Later, remove the override:
cleanup();
```

---

#### `getThemeOverride()`

Get the current theme override (top of stack).

```javascript
const override = getThemeOverride();
// Returns null if no override is active
```

---

#### `clearThemeOverrides()`

Clear all theme overrides.

```javascript
clearThemeOverrides();
```

---

#### `ThemeOverrideProvider`

Component wrapper that sets a theme override for its children.

```javascript
const previewTheme = await loadThemeFromPath(themePath);

function ThemePreview() {
    return (
        <ThemeOverrideProvider theme={previewTheme}>
            <GloButton label="Preview Button" />
            <GloBar value={50} />
        </ThemeOverrideProvider>
    );
}
```

---

### Sync Functions

#### `syncThemeToObsidian(theme)`

Full sync to all Obsidian config files.

```javascript
const results = await syncThemeToObsidian(theme);
// { appearance: true, styleSettings: true, minimalSettings: false }
```

---

#### `syncToAppearance(accentColor)`

Sync only the accent color to `appearance.json`.

```javascript
await syncToAppearance("#ff69b4");
```

---

#### `syncToStyleSettings(styleSettingsData)`

Sync to Style Settings plugin data.

```javascript
await syncToStyleSettings({
    "minimal-style@@ui3@@dark": "#ff69b4",
    "minimal-style@@ax3@@dark": "#ffd700"
});
```

---

### Utility Functions

#### `hexToRgba(hex, alpha)`

Convert hex color to rgba string.

```javascript
hexToRgba("#ff69b4", 0.5);
// "rgba(255, 105, 180, 0.5)"
```

---

#### `isLightColor(hex)`

Check if a color is light (for contrast calculation).

```javascript
isLightColor("#ffffff"); // true
isLightColor("#000000"); // false
```

---

#### `deriveGlowColors(theme)`

Auto-derive glow colors from accent/primary if not set.

```javascript
const enhanced = deriveGlowColors(theme);
// Sets glow-color-active, glow-color-hover, color-text, color-text-muted
```

---

### Constants

#### `DEFAULT_THEME`

The fallback theme used when no theme file is found. Contains all properties with sensible defaults.

```javascript
const { DEFAULT_THEME } = await dc.require(...);

console.log(DEFAULT_THEME["color-primary"]); // "#7c3aed"
console.log(DEFAULT_THEME["glow-intensity"]); // "15px"
```

---

#### `STYLE_SETTINGS_MAP`

Maps Style Settings keys to widget property names.

```javascript
const { STYLE_SETTINGS_MAP } = await dc.require(...);

// Example entries:
// "minimal-style@@ui3@@dark" -> "color-primary"
// "minimal-style@@ax3@@dark" -> "color-accent"
```

---

## Creating a New Theme

### Step 1: Copy the Template

Copy `System/Templates/_themeTemplate.md` to `System/Themes/myTheme.md`.

### Step 2: Set Required Properties

```yaml
---
theme-id: myTheme           # Unique ID (no spaces, camelCase/kebab-case)
theme-name: My Theme        # Display name
theme-description: A cool theme with custom colors
theme-author: Your Name
theme-version: "1.0"
---
```

### Step 3: Customize Colors

```yaml
color-primary: "#e91e63"    # Main accent color
color-secondary: "#1a1a2e"  # Secondary background
color-accent: "#00bcd4"     # Highlights, active states
color-background: "#0d0d1a" # Main background
color-surface: "#1a1a2e"    # Card/panel background
color-text: "#ffffff"       # Primary text
color-text-muted: "#888888" # Secondary text
```

### Step 4: Add Sprites (Optional)

Sprites should be base64-encoded GIFs or PNGs:

```yaml
bar-sprite: "data:image/gif;base64,R0lGODlhIg..."
bar-sprite-width: 34
bar-sprite-height: 21
bar-sprite-click-animation: "squish"  # squish, spin, twist, jiggle, bounce, pulse, wiggle, flip, none

toggle-sprite: "data:image/gif;base64,R0lGODlh..."
toggle-sprite-width: 50
toggle-sprite-height: 40
```

### Step 5: Configure Component Styles

```yaml
# Progress bar
bar-fill-gradient: "linear-gradient(90deg, #e91e63, #00bcd4)"
bar-track-bg: "rgba(255,255,255,0.1)"

# Buttons
button-idle-bg: "linear-gradient(135deg, #e91e63, #9c27b0)"
button-hover-bg: "linear-gradient(135deg, #f06292, #ab47bc)"

# Toggle
toggle-idle-bg: "rgba(255,255,255,0.05)"
toggle-active-bg: "rgba(233, 30, 99, 0.3)"

# Cards
card-bg-color: "#1a1a2e"
card-border: "1px solid rgba(233, 30, 99, 0.3)"
```

### Step 6: Add Obsidian Sync (Optional)

```yaml
obsidian-accent-color: "#e91e63"

style-settings:
  "minimal-style@@ui1@@dark": "#0d0d1a"
  "minimal-style@@ui2@@dark": "#1a1a2e"
  "minimal-style@@ui3@@dark": "#e91e63"
  "minimal-style@@ax3@@dark": "#00bcd4"

minimal-settings:
  colorfulHeadings: true
  colorfulActiveStates: true
```

---

## Color Scheme System

Color schemes are JSON exports from Style Settings that override theme colors.

### Creating a Color Scheme

1. Configure Style Settings in Obsidian
2. Export settings to JSON
3. Save as `System/Themes/style-settings-myScheme.json`
4. Reference in Settings.md: `color-override: myScheme`

### How Overrides Work

1. Theme file is loaded
2. Color scheme JSON is loaded
3. Style Settings keys are mapped to widget properties using `STYLE_SETTINGS_MAP`
4. Mapped values override theme colors
5. Glow colors are re-derived from new primary/accent

### Style Settings Key Mapping

| Style Settings Key | Widget Property |
|-------------------|-----------------|
| `minimal-style@@ui1@@dark` | `color-background` |
| `minimal-style@@ui2@@dark` | `color-surface` |
| `minimal-style@@ui3@@dark` | `color-primary` |
| `minimal-style@@ax1@@dark` | `color-secondary` |
| `minimal-style@@ax3@@dark` | `color-accent` |
| `minimal-style@@h1-color@@dark` | `color-heading-1` |
| `minimal-style@@icon-color@@dark` | `color-icon` |

---

## Theme Editor

The Theme Editor (`System/Dashboards/Theme-Editor.md`) provides a visual interface for:

1. **Editing existing themes** - Select from dropdown
2. **Creating new themes** - Select "+ New Theme"
3. **Live preview** - See changes in real-time
4. **Property sections:**
   - Metadata (id, name, description, author, version)
   - Color Palette (10 color pickers)
   - Progress Bar (sprite, backgrounds, dimensions)
   - Toggle (sprite, backgrounds, labels)
   - Buttons (backgrounds, sprite)
   - Inputs & Select (backgrounds)
   - Cards (background, border, shadow)
   - Effects & Transitions

---

## Theme Dashboard

The Theme Dashboard (`System/Dashboards/Theme-Dashboard.md`) provides:

1. **Theme selector** - Cards for each available theme
2. **Color override toggle** - Switch color schemes
3. **Live preview** - All components with selected theme
4. **Apply button** - Save settings and sync to Obsidian

---

## Best Practices

### Performance

- Theme cache prevents repeated file reads
- Use `useThemeWithOverride()` only in preview contexts
- Clear cache sparingly (causes re-loads)

### Consistency

- Always set `glow-enabled: true` for full effect
- Derive glow colors from primary/accent (leave empty)
- Use the same border-radius across components

### Sprites

- Use GIFs for animation, PNGs for static
- Keep sprites small (< 100KB base64)
- Set correct width/height to avoid stretching
- Test click animations for visual appeal

### Obsidian Sync

- Include `style-settings` for full color sync
- Set `obsidian-accent-color` to match primary
- Test sync with `applyCurrentTheme()` button

---

## Troubleshooting

### Theme not loading

1. Check `theme-id` is set and unique
2. Check file is in `System/Themes/`
3. Check file doesn't start with `_`
4. Run `clearThemeCache()` and reload

### Colors not updating

1. Check `sync-to-obsidian: true` in Settings.md
2. Click "Apply Theme" button
3. Reload Obsidian after sync

### Sprites not showing

1. Check base64 is valid (`data:image/gif;base64,...`)
2. Check sprite-width and sprite-height match image
3. Check `showSprite={true}` on component

### Glow not visible

1. Check `flashy-mode: true` in Settings.md
2. Check `glow-enabled: true` in theme
3. Check component has `glow={true}` prop

---

## Related Documentation

- [ARCHITECTURE.md](./ARCHITECTURE.md) - System overview
- [COMPONENT-LIBRARY.md](./COMPONENT-LIBRARY.md) - Component API reference
- [Templates/_themeTemplate.md](./Templates/_themeTemplate.md) - Full property reference
