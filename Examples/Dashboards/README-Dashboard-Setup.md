# 🎨 Obsidian Dashboard Showcase

Welcome to the ultimate Obsidian dashboard collection! This folder contains three fully-featured, beautifully designed dashboard examples that push the boundaries of what's possible with Obsidian CSS and plugins.

---

## 📋 Table of Contents

- [Overview](#overview)
- [The Three Dashboards](#the-three-dashboards)
- [Quick Start Guide](#quick-start-guide)
- [Required Plugins](#required-plugins)
- [CSS Snippet Installation](#css-snippet-installation)
- [Customization Guide](#customization-guide)
- [Troubleshooting](#troubleshooting)
- [Advanced Techniques](#advanced-techniques)
- [Credits & Inspiration](#credits--inspiration)

---

## 🌟 Overview

This collection showcases three distinct dashboard aesthetics, each optimized for different use cases:

| Dashboard | Aesthetic | Best For | Complexity |
|-----------|-----------|----------|------------|
| **Neon Command Center** | Cyberpunk, High-tech | Productivity, Task Management | ⭐⭐⭐⭐⭐ |
| **Zen Garden** | Minimal, Meditative | Journaling, Mindfulness | ⭐⭐⭐⭐ |
| **Academic Research Hub** | Professional, Organized | Students, Researchers | ⭐⭐⭐⭐⭐ |

### Key Features:

✅ **Fully Responsive** - Optimized for desktop, tablet, and mobile
✅ **Style Settings Integration** - Customize colors, animations, and more
✅ **Minimal Theme Compatible** - Works seamlessly with Minimal theme
✅ **Accessibility Focused** - Supports reduced motion preferences
✅ **DataviewJS Powered** - Dynamic, live-updating content
✅ **Rich Animations** - Smooth, professional transitions
✅ **Modular Design** - Mix and match sections between dashboards

---

## 🎯 The Three Dashboards

### 1. ⚡ Neon Command Center

**File:** `01-Neon-Command-Center.md`
**CSS:** `neon-command-center.css`

**Visual Style:**
- Cyberpunk-inspired neon aesthetics
- Glowing borders and animated gradients
- Holographic effects
- Scanline overlay
- Terminal-style fonts

**Perfect For:**
- Power users who want maximum visual impact
- Productivity enthusiasts
- Task and habit tracking
- Goal progress visualization
- Activity analytics

**Key Sections:**
- 📊 Dynamic stats banner
- 🚀 Quick action buttons
- ✅ TaskNotes kanban integration
- 🎯 Habit tracker with visual grid
- 📈 Progress bars with color-coding
- 🔥 Activity heatmap
- 📝 Recent notes (Zettelkasten view)
- 📅 Timeline view

### 2. 🌸 Zen Garden Dashboard

**File:** `02-Zen-Garden-Dashboard.md`
**CSS:** `zen-garden-dashboard.css`

**Visual Style:**
- Soft, natural color palette
- Sacred geometry patterns
- Gentle breathing animations
- Minimalist design
- Organic textures

**Perfect For:**
- Mindfulness practitioners
- Journal enthusiasts
- Readers and learners
- Anyone seeking calm productivity
- Spaced repetition study

**Key Sections:**
- 🙏 Daily intention prompt
- 🧘 Meditation timer
- 📔 Journaling with mood tracking
- 📚 Reading progress tracker
- 🎴 Flip-card spaced repetition
- ✓ Gentle task list
- 💭 Recent reflections
- 🌱 Growth visualization
- 📊 Mindfulness analytics

### 3. 🎓 Academic Research Hub

**File:** `03-Academic-Research-Hub.md`
**CSS:** `academic-research-hub.css`

**Visual Style:**
- Professional navy/burgundy/gold palette
- Sharp, clean organization
- Urgency-based color coding
- Academic serif typography
- Data-rich layouts

**Perfect For:**
- Students at any level
- Researchers and academics
- Course management
- Assignment tracking
- Study session monitoring
- Research pipeline organization

**Key Sections:**
- 🎓 Semester overview header
- ⚠️ Urgent deadline alerts (pulsing!)
- 📘 Course progress with visual bars
- 📋 Assignment table with status badges
- 🎯 Quick access to class materials
- ⏱️ Study session analytics
- 🔬 Research pipeline stages
- 📊 Performance metrics
- 📝 Recent class notes grid
- 📚 Library and resources

---

## 🚀 Quick Start Guide

### Step 1: Enable Required CSS Snippets

1. Copy all CSS files from `.obsidian/snippets/` to your vault's snippets folder
2. Open Obsidian Settings → Appearance → CSS snippets
3. Enable these snippets:
   - ✅ `dashboard-components.css` (REQUIRED for all)
   - ✅ `neon-command-center.css` (for Neon dashboard)
   - ✅ `zen-garden-dashboard.css` (for Zen dashboard)
   - ✅ `academic-research-hub.css` (for Academic dashboard)

### Step 2: Install Required Plugins

Open Settings → Community Plugins → Browse, and install:

**Essential:**
- [x] **Dataview** - For dynamic queries
- [x] **Style Settings** - For customization options
- [x] **Homepage** - To set dashboard as home

**Recommended:**
- [x] **TaskNotes** - Kanban task management
- [x] **Tracker** - Charts and analytics
- [x] **Banners** - Header images
- [x] **Meta-bind** - Interactive elements
- [x] **Advanced URI** - Deep linking
- [x] **Calendar** - Date navigation

**Optional but Awesome:**
- [ ] **Iconic** - Custom folder icons
- [ ] **Leaflet** - Maps and timelines
- [ ] **Charts** - Additional visualizations
- [ ] **Hometab** - Tab management
- [ ] **Spaced Repetition** - Study cards

### Step 3: Configure Dataview

1. Settings → Dataview
2. Enable ✅ **Enable JavaScript Queries**
3. Enable ✅ **Enable Inline JavaScript Queries**
4. Enable ✅ **Enable Inline Queries**

### Step 4: Choose Your Dashboard

1. Open one of the dashboard files:
   - `Examples/Dashboards/01-Neon-Command-Center.md`
   - `Examples/Dashboards/02-Zen-Garden-Dashboard.md`
   - `Examples/Dashboards/03-Academic-Research-Hub.md`
2. The CSS will automatically apply via `cssclasses` in frontmatter
3. Customize the content to match your vault structure

### Step 5: Set as Homepage (Optional)

1. Settings → Homepage plugin
2. Set homepage to your chosen dashboard file
3. Now it opens automatically when you launch Obsidian!

---

## 🔧 Required Plugins

### Core Plugins (Enable in Settings → Core Plugins)

| Plugin | Purpose |
|--------|---------|
| **Workspaces** | Save dashboard layouts |
| **Command Palette** | Quick navigation |
| **File explorer** | Browse vault |
| **Search** | Find content |
| **Quick switcher** | Fast file access |

### Community Plugins

#### Dataview
**Purpose:** Powers all dynamic content (recent notes, stats, tasks)
**Settings:**
```
✅ Enable JavaScript Queries
✅ Enable Inline JavaScript Queries  
✅ Enable Inline Queries
```

#### Style Settings
**Purpose:** Customize colors, fonts, animations via GUI
**Settings:**
- Look for "Dashboard Components", "Neon Command Center", etc. in Style Settings
- Adjust to your preference!

#### Homepage
**Purpose:** Auto-open dashboard on launch
**Settings:**
- Set homepage to your dashboard file
- Choose "Always open homepage"

#### TaskNotes
**Purpose:** Kanban boards for task management
**Settings:**
- Configure your task workflow
- Integrate with dashboard queries

#### Tracker
**Purpose:** Charts, graphs, and visualizations
**Settings:**
- Used for habit tracking, mood charts, study analytics

---

## 🎨 CSS Snippet Installation

### Method 1: Using This Vault

If you're viewing this from the kepano-obsidian vault:

1. CSS snippets are already in `.obsidian/snippets/`
2. Just enable them in Settings → Appearance → CSS snippets
3. Done!

### Method 2: Manual Installation

1. Locate your vault's `.obsidian/snippets/` folder
   - If it doesn't exist, create it
2. Copy these files:
   ```
   dashboard-components.css (required)
   neon-command-center.css
   zen-garden-dashboard.css
   academic-research-hub.css
   ```
3. Enable in Settings → Appearance → CSS snippets
4. Reload Obsidian if they don't appear

### Method 3: Download from GitHub

*(If this gets published)*
1. Visit the repository
2. Download the CSS files
3. Place in `.obsidian/snippets/`
4. Enable in settings

---

## ✨ Customization Guide

### Changing Colors

**Using Style Settings (Recommended):**

1. Open Style Settings plugin
2. Find the dashboard section:
   - "Dashboard Components" - shared utilities
   - "Neon Command Center" - neon dashboard
   - "Zen Garden Dashboard" - zen dashboard
   - "Academic Research Hub" - academic dashboard
3. Adjust colors to your preference
4. Changes apply instantly!

**Manual CSS Editing:**

Open the CSS file and modify variables:

```css
/* Example: Neon Command Center */
.neon-dashboard {
  --neon-cyan: #00f6ff;      /* Change primary color */
  --neon-magenta: #ff00ff;   /* Change secondary color */
  --neon-green: #00ff9f;     /* Change success color */
}
```

### Adjusting Animations

**Disable All Animations:**

Add to Settings → Style Settings → Dashboard Components:
```
Animation Speed: 0s
```

Or add to CSS:
```css
* {
  animation: none !important;
  transition: none !important;
}
```

**Reduce Motion (Accessibility):**

Your OS setting will automatically reduce animations if you have "Reduce Motion" enabled in your system preferences.

### Changing Fonts

In Style Settings or CSS:

```css
.neon-dashboard {
  font-family: 'Your Font Name', sans-serif;
}
```

For monospace fonts (code/terminal style):
```css
.neon-stat-value {
  font-family: 'Courier New', 'Monaco', monospace;
}
```

### Modifying Grid Layouts

Change column counts:

```css
/* 2 columns instead of 3 */
.dashboard-grid-3col {
  grid-template-columns: repeat(2, 1fr);
}

/* Auto-fit with different min size */
.dashboard-grid-auto {
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}
```

### Adding Your Own Sections

1. Copy a section from one dashboard
2. Paste into another
3. Adjust DataviewJS queries to match your vault:

```javascript
// Change folder paths
const recentNotes = dv.pages('"YOUR-FOLDER"')
  .sort(p => p.file.mtime, 'desc')
  .slice(0, 6);
```

### Mixing Dashboard Styles

Want neon cards in zen dashboard? Easy!

1. Add class to element:
```html
<div class="neon-card">
  Your content here
</div>
```

2. Make sure both CSS snippets are enabled
3. Styles will merge!

---

## 🐛 Troubleshooting

### Dashboard Looks Broken

**Problem:** Colors are wrong, layout is broken
**Solution:**
1. Check that `dashboard-components.css` is enabled
2. Check that the specific dashboard CSS is enabled
3. Try reloading Obsidian (Cmd/Ctrl + R)
4. Check browser console (Cmd/Ctrl + Shift + I) for errors

### DataviewJS Not Working

**Problem:** Shows code blocks instead of content
**Solution:**
1. Settings → Dataview
2. Enable JavaScript queries
3. Wait a few seconds for queries to load
4. Check syntax in code blocks

### Animations Not Showing

**Problem:** No smooth transitions or effects
**Solution:**
1. Check Style Settings → Enable Animations
2. Check system "Reduce Motion" setting
3. Increase animation speed in Style Settings

### Slow Performance

**Problem:** Dashboard is laggy
**Solution:**
1. Reduce DataviewJS query limits (fewer items)
2. Disable some animations in Style Settings
3. Use simpler queries
4. Close other resource-heavy plugins

### Mobile Issues

**Problem:** Dashboard looks weird on mobile
**Solution:**
- Dashboards are responsive but complex on small screens
- Use simplified mobile CSS classes
- Hide non-essential sections on mobile

### Colors Don't Match Minimal Theme

**Problem:** Clashing colors
**Solution:**
1. Use Style Settings to adjust colors
2. Set colors to match your Minimal theme accent
3. Or switch to a compatible Minimal color scheme

---

## 🎓 Advanced Techniques

### Creating Custom DataviewJS Queries

**Filter by multiple criteria:**
```javascript
const filteredNotes = dv.pages()
  .where(p => p.status === "active")
  .where(p => p.priority === "high")
  .where(p => !p.archived)
  .sort(p => p.due, 'asc');
```

**Group by category:**
```javascript
const grouped = dv.pages()
  .groupBy(p => p.category);

for (let group of grouped) {
  dv.header(3, group.key);
  dv.list(group.rows.file.link);
}
```

**Calculate statistics:**
```javascript
const totalWords = dv.pages()
  .where(p => p.wordcount)
  .map(p => p.wordcount)
  .reduce((a, b) => a + b, 0);

dv.paragraph(`Total words: ${totalWords}`);
```

### Advanced URI Deep Linking

Create buttons that do anything:

```markdown
<!-- Open specific note -->
[Open Daily](obsidian://open?vault=MyVault&file=Daily/2025-12-10)

<!-- Run command -->
[Quick Add](obsidian://advanced-uri?vault=MyVault&commandid=quickadd:choice)

<!-- Search -->
[Search Tasks](obsidian://search?query=tag:task)

<!-- Create new note -->
[New Note](obsidian://new?vault=MyVault&name=New%20Note&content=# Hello)
```

### CSS Animation Keyframes

Create custom animations:

```css
@keyframes my-custom-animation {
  0% {
    transform: translateX(0);
    opacity: 1;
  }
  50% {
    transform: translateX(10px);
    opacity: 0.5;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

.my-element {
  animation: my-custom-animation 2s infinite;
}
```

### Responsive Design Breakpoints

Add custom breakpoints:

```css
/* Custom tablet size */
@media (min-width: 768px) and (max-width: 1024px) {
  .dashboard-grid-3col {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Large desktop */
@media (min-width: 1920px) {
  .dashboard-grid-3col {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

### Combining Multiple CSS Classes

Mix styles for unique effects:

```html
<div class="neon-card zen-card academic-card">
  <!-- Gets styling from all three dashboards! -->
</div>
```

---

## 💡 Tips & Best Practices

### Performance Optimization

1. **Limit DataviewJS Results:**
```javascript
// Bad: Returns ALL notes
const notes = dv.pages();

// Good: Limits to 10
const notes = dv.pages().slice(0, 10);
```

2. **Cache Heavy Queries:**
```javascript
// Store in a note and reference it
// Instead of recalculating every time
```

3. **Use Inline Queries Sparingly:**
```markdown
<!-- Heavy -->
`$= dv.pages().length`
`$= dv.pages().where(...).length`

<!-- Better -->
Create one query block that calculates all stats
```

### Organization Tips

1. Create a `Dashboard` folder
2. Keep CSS snippets organized
3. Comment your custom code
4. Version control with Git
5. Backup before major changes

### Accessibility

1. Ensure sufficient color contrast
2. Provide text alternatives for icons
3. Support keyboard navigation
4. Respect system preferences (dark mode, reduced motion)
5. Use semantic HTML structure

---

## 🎨 Customization Examples

### Example 1: Change Neon to Purple/Pink

```css
.neon-dashboard {
  --neon-cyan: #b794f6;      /* Purple */
  --neon-magenta: #f5a3d7;   /* Pink */
  --neon-blue: #9f7aea;      /* Deep Purple */
}
```

### Example 2: Minimalist Zen (Even More Minimal)

```css
.zen-dashboard {
  --zen-sage: #8b9e8b;       /* Muted green */
  --zen-rose: #d4b5b7;       /* Soft rose */
  --zen-bg-card: #ffffff;    /* Pure white */
}

/* Remove all borders */
.zen-card {
  border: none;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}
```

### Example 3: Dark Academic Aesthetic

```css
.academic-dashboard {
  --academic-navy: #0f1419;
  --academic-burgundy: #8b1e1e;
  --academic-gold: #daa520;
  --academic-bg-primary: #1a1a1a;
  --academic-bg-card: #2d2d2d;
}
```

---

## 🔗 Integration with Other Plugins

### Templater Integration

Add templater commands to buttons:

```markdown
<!-- Create daily note from template -->
[New Daily](obsidian://advanced-uri?vault=MyVault&commandid=templater-obsidian:create-new-note-from-template)
```

### Kanban Plugin

Embed kanban boards:

```markdown
![[My Kanban Board]]
```

### Excalidraw Integration

Embed drawings:

```markdown
![[My Flowchart.excalidraw]]
```

### Calendar Plugin

Link to calendar views:

```markdown
[Open Calendar](obsidian://advanced-uri?vault=MyVault&commandid=calendar:open-calendar-view)
```

---

## 📚 Learning Resources

### Obsidian CSS

- [Obsidian CSS Documentation](https://docs.obsidian.md/Themes/App+themes/Build+a+theme)
- [Minimal Theme Documentation](https://minimal.guide/)
- [Style Settings Plugin](https://github.com/mgmeyers/obsidian-style-settings)

### DataviewJS

- [Dataview Documentation](https://blacksmithgu.github.io/obsidian-dataview/)
- [DataviewJS Examples](https://blacksmithgu.github.io/obsidian-dataview/api/intro/)
- [DataviewJS Snippets](https://github.com/s-blu/obsidian_dataview_example_vault)

### CSS Grid & Flexbox

- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [Modern CSS](https://moderncss.dev/)

---

## 🙏 Credits & Inspiration

These dashboards were inspired by and built upon the amazing work of:

- **Rainbell's Obsidian Homepage** - Original dashboard concept and Chinese aesthetics
- **Minimal Theme** by @kepano - Theme integration and design principles
- **Blue Topaz Theme** - Zettelkasten card views and kanban styling
- **Extra Extras Snippet** by @xp-dv - Horizontal rules and enhanced styling
- **Academic Neon CSS** - Status badges and urgency indicators
- **Sacred Geometry Patterns** - Zen dashboard geometry
- **Obsidian Community** - Countless forum posts and examples

### Special Thanks:

- The Obsidian team for creating this amazing tool
- The plugin developers who make dashboards possible
- The CSS community for tricks and techniques
- All the users who share their setups and inspire others

---

## 📝 License

These dashboard examples are provided as-is for personal use. Feel free to:

✅ Use in your personal vault
✅ Modify and customize
✅ Share with others
✅ Use as learning examples

Please credit the original creators and inspirations when sharing!

---

## 🚀 Next Steps

1. **Choose a dashboard** that matches your workflow
2. **Install required plugins**
3. **Enable CSS snippets**
4. **Customize to your needs**
5. **Share your creations!**

Happy dashboarding! 🎉

---

**Questions? Issues? Improvements?**

- Check the Troubleshooting section
- Search the Obsidian forum
- Experiment and have fun!

Remember: These dashboards are starting points. Make them your own! 🌟
