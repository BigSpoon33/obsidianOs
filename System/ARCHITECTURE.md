# System Architecture

Technical documentation for the Obsidian vault's Datacore-powered theme and widget system.

---

## Technology Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Editor** | Obsidian | Markdown-based knowledge management |
| **Base Theme** | Minimal Theme (Kepano) | Clean, customizable Obsidian theme |
| **Theme Plugins** | Style Settings, Minimal Settings | Color/typography control |
| **Reactive Data** | Datacore Plugin | React/JSX widgets in markdown |
| **State Binding** | MetaBind Plugin | Frontmatter ↔ UI binding |
| **Data Queries** | Dataview Plugin | Page queries and inline values |

---

## Directory Structure

```
System/
├── Scripts/
│   ├── Core/                    # Foundation modules
│   │   ├── dc-themeProvider.jsx    # Theme loading, caching, sync
│   │   └── dc-gradientUtils.jsx    # CSS gradient utilities
│   │
│   ├── Components/              # Reusable UI components (Glo* family)
│   │   ├── dc-gloButton.jsx        # Themed button
│   │   ├── dc-gloBar.jsx           # Draggable progress bar
│   │   ├── dc-gloToggle.jsx        # Toggle switch with sprite
│   │   ├── dc-gloCard.jsx          # Card container
│   │   ├── dc-gloInput.jsx         # Text/number input
│   │   ├── dc-gloSelect.jsx        # Dropdown select
│   │   ├── dc-gloTabs.jsx          # Tab switcher
│   │   ├── dc-gloBadge.jsx         # Badge/chip/tag
│   │   ├── dc-colorPicker.jsx      # HSV color picker
│   │   ├── dc-gradientBuilder.jsx  # Gradient editor
│   │   └── dc-backgroundPicker.jsx # Color/gradient/image picker
│   │
│   ├── Widgets/                 # Full-page/section widgets
│   │   ├── dc-themeDashboard.jsx   # Theme selection + live preview
│   │   ├── dc-themeEditor.jsx      # Theme property editor
│   │   ├── dc-themeConsole.jsx     # Legacy theme switcher
│   │   └── dc-themePreview.jsx     # Legacy preview panel
│   │
│   └── Styles/
│       └── dc-components.css       # Shared animations/keyframes
│
├── Themes/                      # Theme definitions
│   ├── _themeTemplate.md           # Template for new themes
│   ├── nyanCat.md                  # Nyan Cat theme
│   ├── bongoCat.md                 # Bongo Cat theme
│   └── style-settings-*.json       # Color scheme overrides
│
├── Dashboards/                  # Dashboard pages
│   ├── Theme-Dashboard.md          # Theme selection UI
│   ├── Theme-Editor.md             # Theme editor UI
│   └── Component-Test.md           # Component showcase
│
├── Templates/                   # Note templates
│   └── _themeTemplate.md           # Theme template
│
└── Settings.md                  # Global vault settings
```

---

## Data Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER INTERACTION                         │
│  (Theme Dashboard, Theme Editor, Settings.md, daily notes)      │
└────────────────────────────────┬────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                      SETTINGS.MD (Frontmatter)                   │
│  widget-theme: "nyanCat"                                        │
│  color-override: "savageCroc"                                   │
│  flashy-mode: true                                              │
│  sync-to-obsidian: true                                         │
└────────────────────────────────┬────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                      dc-themeProvider.jsx                        │
│  • Reads Settings.md                                            │
│  • Loads theme file from System/Themes/                         │
│  • Applies color override (JSON) if set                         │
│  • Derives glow colors, text colors                             │
│  • Caches merged theme                                          │
│  • Injects CSS variables                                        │
└────────────────────────────────┬────────────────────────────────┘
                                 │
          ┌──────────────────────┼──────────────────────┐
          ▼                      ▼                      ▼
┌─────────────────┐  ┌─────────────────────┐  ┌─────────────────┐
│  Glo* Components │  │  Obsidian Sync      │  │  CSS Variables  │
│  (Button, Bar,   │  │  • appearance.json  │  │  --theme-primary│
│   Toggle, etc.)  │  │  • style-settings   │  │  --theme-accent │
│                  │  │  • minimal-settings │  │  --theme-glow-* │
└─────────────────┘  └─────────────────────┘  └─────────────────┘
```

---

## Module Descriptions

### Core Modules

#### `dc-themeProvider.jsx`
The central theme management system. Provides React hooks and utilities for theme loading, caching, and Obsidian sync.

**Key exports:**
- `useTheme()` - Get current theme object
- `useThemeWithOverride()` - Theme with preview support
- `useAvailableThemes()` - List all theme files
- `useAvailableColorSchemes()` - List JSON color overrides
- `switchTheme(id, colorOverride)` - Change active theme
- `syncThemeToObsidian(theme)` - Sync to Obsidian config files
- `loadThemeFromPath(path)` - Load theme for preview
- `DEFAULT_THEME` - Fallback theme values

See [THEME-SYSTEM.md](./THEME-SYSTEM.md) for detailed API documentation.

#### `dc-gradientUtils.jsx`
Utilities for parsing and manipulating CSS gradients.

**Key exports:**
- `parseGradient(css)` - Parse gradient string to object
- `stringifyGradient(obj)` - Convert object back to CSS
- `isGradient(value)` - Check if value is a gradient

---

### Component Modules (Glo* Family)

All components follow a consistent pattern:
1. Import `useTheme` from themeProvider
2. Read theme properties with fallback defaults
3. Support `flashy` prop to override `flashy-mode` setting
4. Export both component and `renderedView` for testing

See [COMPONENT-LIBRARY.md](./COMPONENT-LIBRARY.md) for full API reference.

| Component | File | Purpose |
|-----------|------|---------|
| GloButton | `dc-gloButton.jsx` | Buttons with glow, lift, press effects |
| GloBar | `dc-gloBar.jsx` | Draggable progress bar with sprite |
| GloToggle | `dc-gloToggle.jsx` | Toggle switch with sprite and labels |
| GloCard | `dc-gloCard.jsx` | Container with header, body, footer |
| GloInput | `dc-gloInput.jsx` | Text/number input with validation |
| GloSelect | `dc-gloSelect.jsx` | Dropdown select menu |
| GloTabs | `dc-gloTabs.jsx` | Tab switcher with multiple variants |
| GloBadge | `dc-gloBadge.jsx` | Status badges, tags, chips |

---

### Utility Components

| Component | File | Purpose |
|-----------|------|---------|
| ColorPicker | `dc-colorPicker.jsx` | HSV color picker with presets |
| GradientBuilder | `dc-gradientBuilder.jsx` | Visual gradient editor |
| BackgroundPicker | `dc-backgroundPicker.jsx` | Combined color/gradient/image picker |

---

### Widget Modules

#### `dc-themeDashboard.jsx`
Unified theme console and live preview widget. Used on Theme-Dashboard.md.

**Features:**
- Theme card selector (left column)
- Color scheme override toggle
- Live preview of ALL Glo* components (right column)
- Preview updates when theme is selected (before applying)
- "Apply Theme & Sync" button

#### `dc-themeEditor.jsx`
Full theme property editor. Used on Theme-Editor.md.

**Features:**
- Theme dropdown (existing themes or "+ New Theme")
- Collapsible property sections
- Color pickers, gradient builders, background pickers
- Live preview panel
- Save/Create/Reset functionality

---

## Shared Helpers

These helper functions are exported from `dc-gloButton.jsx` and reused by other components:

```javascript
// Load dc-components.css once
useComponentCSS()

// Read flashy-mode from Settings.md
useFlashyMode()

// Resolve background value with fallback chain
resolveBackground(value, themeGradient, themeSolid)

// Convert hex to rgba
hexToRgba(hex, alpha)
```

---

## Configuration Files

### Settings.md (Frontmatter)
```yaml
widget-theme: nyanCat        # Active theme ID
color-override: savageCroc   # Color scheme override (optional)
sync-to-obsidian: true       # Sync to Obsidian config files
flashy-mode: true            # Enable glow, lift, rainbow effects
```

### Theme Files (Frontmatter)
Theme properties are defined in `.md` files in `System/Themes/`. See [_themeTemplate.md](./Templates/_themeTemplate.md) for the complete property reference.

### Color Scheme Files (JSON)
Located in `System/Themes/style-settings-*.json`. These are Style Settings export files that override theme colors.

---

## Obsidian Integration

When `sync-to-obsidian: true`, the theme system writes to:

| File | What's Written |
|------|----------------|
| `.obsidian/appearance.json` | `accentColor` |
| `.obsidian/plugins/obsidian-style-settings/data.json` | Style Settings values |
| `.obsidian/plugins/obsidian-minimal-settings/data.json` | Minimal Settings values |

This ensures the Obsidian UI (not just widgets) matches the theme colors.

---

## CSS Variable Injection

The theme provider injects CSS variables to `:root` for use in regular CSS:

```css
--theme-primary: #7c3aed;
--theme-secondary: #1e1e2e;
--theme-accent: #f59e0b;
--theme-success: #10b981;
--theme-warning: #f59e0b;
--theme-error: #ef4444;
--theme-background: #1e1e2e;
--theme-surface: #2a2a3e;
--theme-text: #ffffff;
--theme-text-muted: #a0a0b0;
--theme-glow-active: rgba(...);
--theme-glow-hover: rgba(...);
--theme-glow-intensity: 15px;
--theme-glow-spread: 2px;
--theme-transition-duration: 0.3s;
--theme-transition-easing: ease;
--theme-radius-small: 6px;
--theme-radius-medium: 12px;
--theme-radius-large: 16px;
--theme-font-interface: ...;
--theme-font-text: ...;
--theme-font-mono: Fira Code, monospace;
```

---

## Caching Strategy

The theme provider uses a multi-level cache:

1. **Theme Cache** (`themeCache`) - Maps `themeId:colorOverride` to merged theme objects
2. **Color Override Cache** (`colorOverrideCache`) - Maps color scheme names to JSON data
3. **Available Themes Cache** (`availableThemesCache`) - List of theme metadata
4. **Available Color Schemes Cache** (`availableColorSchemesCache`) - List of JSON files

Cache is cleared when:
- `switchTheme()` is called
- `clearThemeCache()` is called explicitly
- User triggers a reload

---

## Error Handling

- If `Settings.md` not found → Uses `DEFAULT_THEME`
- If theme file not found → Uses `DEFAULT_THEME`
- If color override file not found → Uses theme without override
- If Obsidian sync fails → Logs error, continues without sync
- All file operations wrapped in try/catch

---

## Related Documentation

- [THEME-SYSTEM.md](./THEME-SYSTEM.md) - Theme system deep-dive
- [COMPONENT-LIBRARY.md](./COMPONENT-LIBRARY.md) - Glo* component API reference
- [ROADMAP.md](./ROADMAP.md) - Current state and planned features
- [Templates/_themeTemplate.md](./Templates/_themeTemplate.md) - Theme property reference
