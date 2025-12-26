---
# ===============================================================================
# THEME TEMPLATE
# Copy this file to System/Themes/ and customize to create your own theme
# ===============================================================================

# === THEME METADATA ===
# Required: Unique identifier (lowercase, no spaces, use camelCase or kebab-case)
theme-id: ""
# Display name shown in theme selector
theme-name: ""
# Short description of the theme
theme-description: ""
# Your name/handle
theme-author: ""
# Version number
theme-version: "1.0"

# ===============================================================================
# COLOR PALETTE
# All colors should be hex format (#RRGGBB) or rgba()
# ===============================================================================
color-primary: "#7c3aed"
color-secondary: "#1e1e2e"
color-accent: "#f59e0b"
color-success: "#10b981"
color-warning: "#f59e0b"
color-error: "#ef4444"
color-background: "#1e1e2e"
color-surface: "#2a2a3e"
color-text: "#ffffff"
color-text-muted: "#a0a0b0"

# ===============================================================================
# TYPOGRAPHY
# Leave empty to use Obsidian defaults
# ===============================================================================
font-interface: ""
font-text: ""
font-mono: ""

# ===============================================================================
# GLOW EFFECTS
# ===============================================================================
glow-enabled: true
glow-intensity: "15px"
glow-spread: "2px"

# ===============================================================================
# TRANSITIONS
# ===============================================================================
transition-duration: "0.3s"
transition-easing: "ease"
transition-fast: "0.15s"
transition-normal: "0.3s"
transition-slow: "0.5s"

# ===============================================================================
# BORDERS
# ===============================================================================
border-radius-small: "6px"
border-radius-medium: "12px"
border-radius-large: "16px"

# ===============================================================================
# GLOW COLORS
# Leave empty to auto-derive from primary/accent colors
# ===============================================================================
glow-color-idle: ""
glow-color-hover: ""
glow-color-active: ""

# ===============================================================================
# LABELS (shown on toggles)
# ===============================================================================
label-active: "ON"
label-inactive: "OFF"
label-active-sub: ""
label-inactive-sub: ""

# ===============================================================================
# HR/DIVIDER
# ===============================================================================
hr-color: ""
hr-svg: ""

# ===============================================================================
# OBSIDIAN SYNC
# This color syncs to Obsidian's accent color when theme is applied
# ===============================================================================
obsidian-accent-color: "#7c3aed"

# ===============================================================================
# COMPONENT: DRAGGABLE PROGRESS BAR (GloBar)
# ===============================================================================
# Animated sprite that follows the progress handle
# Use base64 encoded GIF/PNG or leave empty for no sprite
bar-sprite: ""
bar-sprite-width: 34
bar-sprite-height: 21
# Click animation: squish, spin, twist, jiggle, bounce, pulse, wiggle, flip, none
bar-sprite-click-animation: "squish"
bar-sprite-click-duration: "0.3s"

# Track background (the unfilled portion)
# Can be: hex color, gradient, or base64 image
bar-track-bg: "rgba(255,255,255,0.1)"
# Fill gradient (the filled portion)
# Use linear-gradient(), radial-gradient(), or solid color
bar-fill-gradient: "linear-gradient(90deg, #7c3aed, #a78bfa)"
bar-border-radius: "6px"
bar-height: "14px"

# ===============================================================================
# COMPONENT: BUTTONS (GloButton)
# ===============================================================================
# Background for different states
# Can be: hex color, gradient, or base64 image URL
button-idle-bg: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)"
button-hover-bg: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)"
button-active-bg: "linear-gradient(135deg, #6d28d9 0%, #5b21b6 100%)"
button-text-color: "#ffffff"

# Optional sprite shown alongside button label
button-sprite: ""
button-sprite-width: 34
button-sprite-height: 21
# Click animation: squish, spin, twist, jiggle, bounce, pulse, wiggle, flip, none
button-sprite-click-animation: "bounce"
button-sprite-click-duration: "0.3s"

# Button size presets
button-size-small-padding: "6px 12px"
button-size-small-font: "12px"
button-size-small-radius: "6px"

button-size-medium-padding: "10px 20px"
button-size-medium-font: "14px"
button-size-medium-radius: "8px"

button-size-large-padding: "14px 28px"
button-size-large-font: "16px"
button-size-large-radius: "10px"

# ===============================================================================
# COMPONENT: TOGGLE (GloToggle)
# ===============================================================================
# Animated sprite shown on toggle
toggle-sprite: ""
toggle-sprite-width: 34
toggle-sprite-height: 21
# Click animation: squish, spin, twist, jiggle, bounce, pulse, wiggle, flip, none
toggle-sprite-click-animation: "squish"
toggle-sprite-click-duration: "0.3s"

# Background transition effect: fade, zoom, none
toggle-bg-transition: "fade"

# Background for different states
# Can be: hex color, gradient, or base64 image
toggle-idle-bg: "rgba(255,255,255,0.05)"
toggle-hover-bg: "rgba(255,255,255,0.08)"
toggle-active-bg: "rgba(124, 58, 237, 0.2)"

# ===============================================================================
# COMPONENT: CARDS (GloCard)
# ===============================================================================
card-bg-style: "solid"
card-bg-color: "#2a2a3e"
card-border: "1px solid rgba(124,58,237,0.3)"
card-border-radius: "12px"
card-shadow: "0 4px 15px rgba(0,0,0,0.2)"
card-padding: "16px"

# ===============================================================================
# COMPONENT: INPUTS (GloInput)
# ===============================================================================
input-bg: "rgba(255,255,255,0.05)"
input-border: "1px solid rgba(124,58,237,0.3)"
input-border-focus: "1px solid #7c3aed"
input-border-radius: "6px"
input-text-color: "#ffffff"

# ===============================================================================
# COMPONENT: CHIPS/TAGS (GloBadge)
# ===============================================================================
chip-bg: "rgba(124,58,237,0.1)"
chip-bg-active: "rgba(124,58,237,0.3)"
chip-border-radius: "20px"

# ===============================================================================
# CHARTS & DATA VISUALIZATION
# Rainbow/spectrum colors for charts, graphs, heatmaps
# ===============================================================================
chart-color-1: "#7c3aed"
chart-color-2: "#f59e0b"
chart-color-3: "#10b981"
chart-color-4: "#ef4444"
chart-color-5: "#3b82f6"
chart-color-6: "#ec4899"
heatmap-empty: "rgba(255,255,255,0.1)"
heatmap-filled: "#7c3aed"

# ===============================================================================
# ICONS
# Use emoji or leave empty for defaults
# ===============================================================================
icon-style: "emoji"
icon-water: ""
icon-sleep: ""
icon-exercise: ""
icon-mood: ""
icon-food: ""
icon-journal: ""

# ===============================================================================
# MASCOT (Optional)
# Animated character that reacts to user actions
# ===============================================================================
mascot-enabled: false
mascot-idle: ""
mascot-happy: ""
mascot-sad: ""
mascot-position: "bottom-right"
mascot-size: "64px"

# ===============================================================================
# STYLE SETTINGS SYNC
# These values sync to Obsidian Style Settings plugin when theme is applied
# Maps to: minimal-style@@<key>@@dark
# ===============================================================================
style-settings:
  "minimal-style@@ui1@@dark": "#1e1e2e"
  "minimal-style@@ui2@@dark": "#2a2a3e"
  "minimal-style@@ui3@@dark": "#7c3aed"
  "minimal-style@@ax1@@dark": "#1e1e2e"
  "minimal-style@@ax3@@dark": "#f59e0b"
  "minimal-style@@h1-color@@dark": "#7c3aed"
  "minimal-style@@h2-color@@dark": "#8b5cf6"
  "minimal-style@@h3-color@@dark": "#a78bfa"
  "minimal-style@@h4-color@@dark": "#c4b5fd"
  "minimal-style@@h5-color@@dark": "#ddd6fe"
  "minimal-style@@h6-color@@dark": "#ede9fe"
  "minimal-style@@icon-color@@dark": "#7c3aed"
  "minimal-style@@line-number-color@@dark": "#7c3aed"

# ===============================================================================
# MINIMAL SETTINGS (Optional)
# Overrides for Minimal Theme Settings plugin
# ===============================================================================
minimal-settings:
  colorfulHeadings: true
  colorfulActiveStates: true
---

# Theme Name

Add a description of your theme here.

## Preview

Describe what makes your theme unique:
- Color scheme inspiration
- Sprite/animation style
- Overall aesthetic

## Credits

- Credit any assets, inspirations, or contributors here
