---
created: 2025-12-09
tags:
  - css
  - styling
  - documentation
---

# 🎨 CSS Guide - Academic System Styling

Complete guide to customizing the visual appearance of your academic system.

---

## 📍 CSS Files Location

### Active CSS (Used by Obsidian)
**Location:** `.obsidian/snippets/`

These files are already copied and ready to enable:
- ✅ `academic-core.css` - Required
- ✅ `academic-neon.css` - Optional

### Reference CSS (View in Obsidian)
**Location:** `Academic System/CSS Snippets/`

Keep these as reference - the code below shows what they contain.

---

## 🔧 How to Enable CSS

### Step 1: Open Settings
`Settings → Appearance → CSS snippets`

### Step 2: Refresh Snippets List
Click the refresh icon 🔄

### Step 3: Enable Snippets
- ✅ Toggle ON `academic-core.css` (REQUIRED)
- ⭐ Toggle ON `academic-neon.css` (optional visual effects)

### Step 4: Reload
Press `Ctrl/Cmd + R` to reload Obsidian

---

## 📦 CSS Snippet 1: academic-core.css

**Purpose:** Essential styling for dashboards, tables, and embeds

**Size:** 5.1 KB, 231 lines

### What It Does

#### ✅ Dashboard Grid Layout
- Two-column responsive grid on desktop
- Single column on mobile
- Proper alignment for widgets

#### ✅ Clean Embeds
- Removes borders from `![[note|embed-clean]]` syntax
- Hides file titles
- Flush appearance

#### ✅ Base Table Improvements
- Better spacing
- Zebra striping
- Hover effects
- Readable headers

#### ✅ Meta-bind Buttons
- Proper spacing in groups
- Flex layout alignment

#### ✅ Dataview Tables
- Consistent styling with bases
- Better padding
- Clear headers

### Full Code

```css
/*
==================================================
ACADEMIC CORE CSS
==================================================

Essential styling for the Academic System.
This is the minimum required CSS for proper
dashboard and embed functionality.

Version: 1.0
Created: 2025-12-09
==================================================
*/

/* ============================================
   DASHBOARD GRID LAYOUT
   ============================================ */

/* Reset max-width for dashboard pages */
.dashboard .markdown-preview-section,
.dashboard .markdown-source-view {
  max-width: 100%;
  margin: 0 auto;
}

/* Two-column grid on larger screens */
@media (min-width: 800px) {
  .dashboard .el-div {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    align-items: start;
  }
  
  /* Full-width elements */
  .dashboard .el-h1,
  .dashboard .el-h2:first-of-type,
  .dashboard .el-hr,
  .dashboard .neon-widget-container,
  .dashboard > .el-div > .el-pre,
  .dashboard .block-language-dataviewjs,
  .dashboard .block-language-dataview {
    grid-column: span 2;
  }
}

/* ============================================
   CLEAN EMBEDS
   ============================================ */

/* Remove borders and padding from clean embeds */
.internal-embed[alt*="embed-clean"],
.markdown-embed[alt*="embed-clean"] {
  --embed-padding: 0;
  --nested-padding: 0;
  --embed-border-top: none;
  --embed-border-end: none;
  --embed-border-bottom: none;
  --embed-border-start: none;
  border: none;
  padding: 0;
}

/* Hide title in clean embeds */
.internal-embed[alt*="embed-clean"] .markdown-embed-title,
.markdown-embed[alt*="embed-clean"] .markdown-embed-title {
  display: none;
}

/* Remove scrollbar gutter for flush appearance */
.internal-embed[alt*="embed-clean"] .markdown-embed-content .markdown-preview-view {
  scrollbar-gutter: auto;
}

/* ============================================
   BASE TABLE IMPROVEMENTS
   ============================================ */

/* Better spacing for base tables */
.base-table-container {
  margin: 1em 0;
}

.base-table {
  width: 100%;
  border-collapse: collapse;
}

/* Readable table headers */
.base-table th {
  text-align: left;
  padding: 8px 12px;
  font-weight: 600;
  border-bottom: 2px solid var(--background-modifier-border);
}

/* Table cell spacing */
.base-table td {
  padding: 6px 12px;
  border-bottom: 1px solid var(--background-modifier-border-hover);
}

/* Zebra striping for readability */
.base-table tr:nth-child(even) {
  background: var(--background-secondary);
}

/* Hover effect */
.base-table tr:hover {
  background: var(--background-modifier-hover);
}

/* ============================================
   META-BIND BUTTON IMPROVEMENTS
   ============================================ */

/* Better spacing for button groups */
.meta-bind-button {
  margin: 4px 8px 4px 0;
}

/* Button container alignment */
.el-p:has(.meta-bind-button) {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}

/* ============================================
   CALLOUT IMPROVEMENTS
   ============================================ */

/* Quick Controls callout styling */
.callout[data-callout="info"] {
  background: var(--background-secondary);
}

/* Better input field visibility in callouts */
.callout .meta-bind-input {
  margin: 4px 0;
  display: inline-block;
}

/* ============================================
   HORIZONTAL RULES
   ============================================ */

/* Simple gradient dividers */
.markdown-preview-view hr,
.cm-line hr {
  border: none;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--background-modifier-border),
    transparent
  );
  margin: 2em 0;
  opacity: 0.7;
}

/* ============================================
   RESPONSIVE ADJUSTMENTS
   ============================================ */

/* Mobile: Single column */
@media (max-width: 799px) {
  .dashboard .el-div {
    display: block;
  }
  
  .dashboard .el-div > * {
    margin-bottom: 20px;
  }
}

/* ============================================
   DATAVIEW OUTPUT IMPROVEMENTS
   ============================================ */

/* Better spacing for dataview tables */
.block-language-dataview table,
.block-language-dataviewjs table {
  width: 100%;
  margin: 1em 0;
}

/* Dataview table headers */
.block-language-dataview th,
.block-language-dataviewjs th {
  text-align: left;
  padding: 8px;
  font-weight: 600;
  border-bottom: 2px solid var(--background-modifier-border);
}

/* Dataview table cells */
.block-language-dataview td,
.block-language-dataviewjs td {
  padding: 6px 8px;
  border-bottom: 1px solid var(--background-modifier-border-hover);
}

/* ============================================
   WIDGET CONTAINERS
   ============================================ */

/* Base widget styling */
.neon-widget-container {
  margin: 1em 0;
  padding: 1em;
  border-radius: 8px;
  background: var(--background-secondary);
}

/* ============================================
   PRINT & EXPORT
   ============================================ */

@media print {
  .dashboard .el-div {
    display: block;
  }
  
  .meta-bind-button {
    display: none;
  }
}
```

---

## 📦 CSS Snippet 2: academic-neon.css

**Purpose:** Optional visual enhancements with glowing effects

**Size:** 7.3 KB

**Requires:** academic-core.css (must be enabled first)

### What It Adds

#### ✨ Neon Effects
- Glowing horizontal rules
- Neon progress bars
- Status badges with glow
- Button enhancements

#### 🎯 Urgency Indicators
- Pulsing animations for urgent items
- Color-coded deadlines
- Visual hierarchy

#### 🎨 Enhanced Elements
- Callout glows
- Grade highlighting
- Table row urgency colors

### Preview

**Before (core only):**
- Clean, professional
- Minimal styling
- High contrast

**After (core + neon):**
- Glowing accents
- Visual pop
- Dynamic feel

### When to Use

**Use academic-neon.css if you:**
- Like visual flair
- Want urgency indicators
- Enjoy the YPNG aesthetic
- Use dark mode primarily

**Skip if you:**
- Prefer minimalism
- Want subtle design
- Use light mode only
- Have performance concerns

---

## 🎨 Customization Examples

### Change Dashboard Grid Columns

**Default:** 2 columns on desktop

**To 3 columns:**
```css
@media (min-width: 1200px) {
  .dashboard .el-div {
    grid-template-columns: 1fr 1fr 1fr;
  }
  
  .dashboard .el-h1,
  .dashboard .neon-widget-container {
    grid-column: span 3;
  }
}
```

### Change Accent Color

**Find:** All instances of `var(--text-accent)`

**Replace with:** Your custom color
```css
/* Example: Change to custom purple */
.neon-widget-container {
  border: 1px solid #9c27b0;
  box-shadow: 0 0 15px rgba(156, 39, 176, 0.2);
}
```

### Disable Animations

**If motion bothers you:**
```css
/* Add to either CSS file */
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
```

Already included in academic-neon.css! ✅

### Custom Status Colors

**Edit status badge colors:**
```css
.status-not-started {
  background: rgba(255, 0, 0, 0.2);
  color: #ff6b6b;
}

.status-in-progress {
  background: rgba(255, 193, 7, 0.2);
  color: #ffc107;
}

/* Add your own */
.status-archived {
  background: rgba(128, 128, 128, 0.2);
  color: #808080;
}
```

---

## 🔍 Troubleshooting

### CSS Not Applying

**Check:**
1. ✅ Files in `.obsidian/snippets/` folder
2. ✅ Enabled in Settings → Appearance → CSS snippets
3. ✅ Reloaded Obsidian (Ctrl/Cmd + R)
4. ✅ Note has `cssclasses: dashboard` in frontmatter

### Dashboard Not Grid Layout

**Check:**
1. ✅ academic-core.css is enabled
2. ✅ Note has `cssclasses: dashboard`
3. ✅ Window width > 800px
4. ✅ Reloaded after enabling CSS

### Embeds Still Have Borders

**Check:**
1. ✅ Using correct syntax: `![[note|embed-clean]]`
2. ✅ Not: `![[note|clean]]` (missing "embed-")
3. ✅ academic-core.css enabled

### Buttons Look Plain

**This is normal!** Core CSS has minimal button styling.

**Want glowing buttons?** Enable academic-neon.css

---

## 📚 Related Documentation

- [[GETTING STARTED]] - Setup instructions
- [[SYSTEM OVERVIEW]] - Architecture details
- Examples folder - See CSS in action

---

*CSS files are located in:*
- *Active: `.obsidian/snippets/`*
- *Reference: `Academic System/CSS Snippets/`*
