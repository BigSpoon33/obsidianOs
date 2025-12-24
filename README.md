# 🏡 ObsidianOS - Personal Knowledge Management System

> **A feature-rich Obsidian vault built on the Kepano base system with custom health tracking, academic management, meal planning, and interactive datacore widgets.**

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [Main Components](#-main-components)
- [Widget System](#-widget-system)
- [File Structure](#-file-structure)
- [Daily Workflow](#-daily-workflow)
- [Customization](#-customization)
- [Technical Details](#-technical-details)
- [Troubleshooting](#-troubleshooting)

---

## 🎯 Overview

This vault combines the elegant **Kepano base system** (categories, templates, `.base` views) with powerful custom enhancements:

- **📊 Interactive Datacore Widgets** - Real-time health tracking, meal planning, and analytics
- **🍽️ Meal Planner** - Recipe management with macro nutrient tracking and auto-generated shopping lists
- **📚 Academic System** - Class tracking, coursework management, and TaskNotes integration
- **💧 Health Tracking** - Water intake, sleep quality, mood, exercise, and comprehensive daily analytics
- **🎨 Beautiful UI** - Custom CSS themes, animated GIFs, gradient cards, and aesthetic enhancements

**Current Homepage**: `Home-v3.md` - Your central navigation hub with live widgets and vault statistics.

---

## ✨ Key Features

### 🏥 Health & Wellness Tracking
- **Water Tracker** - Interactive slider with bottle-size quick-add buttons
- **Sleep Analytics** - Bedtime, wake time, quality ratings, and sleep score calculations
- **Mood & Emotion Log** - Daily mood tracking with emoji-based emotion selection
- **Exercise Planner** - Weekly workout schedule with plan links and workout tracking
- **Health Score** - Auto-calculated daily score based on sleep, mood, energy, diet, and stress

### 🍳 Meal Planning System
- **Recipe Category** - Organized recipe collection with macro nutritional data
- **Weekly Meal Planner** - Plan breakfast, lunch, and dinner for the entire week
- **Macro Tracker** - Automatic calculation of calories, protein, carbs, and fats
- **Shopping List Generator** - Auto-generates ingredient lists from your weekly meal plan
- **Daily Menu View** - Today's meal suggestions pulled from your weekly plan

### 📚 Academic Management
- **Class Templates** - Structured notes for courses with metadata (instructor, semester, credits)
- **Coursework Tracking** - Assignment templates with due dates and TaskNotes integration
- **Academic Dashboard** - Overview of classes, assignments, and deadlines

### 🎨 Interactive Widgets (Datacore JSX)
All widgets are located in `System/Scripts/` as `.jsx` + `.css` pairs:

- `dc-water-tracker.jsx` - Hydration tracking with draggable slider
- `dc-sleep-tracker.jsx` - Sleep quality and duration input
- `dc-mood-tracker.jsx` - Emotion selection and mood rating
- `dc-meal-planner.jsx` - Weekly meal planning interface
- `dc-shopping-list.jsx` - Auto-generated shopping list from recipes
- `dc-activities.jsx` - Activity analytics dashboard with heat maps
- `dc-memories.jsx` - Visual memory/journal timeline
- `dc-greeting.jsx` - Dynamic time-based greeting
- `dc-randomQuote.jsx` - Daily inspirational quotes
- `dc-workout-today.jsx` - Today's workout from weekly schedule
- `dc-journal-nav.jsx` - Journal entry navigation
- And more! (35+ widget files)

---

## 🏗️ Architecture

### Core System (Kepano Base)

```
┌─────────────────────────────────────────────────┐
│                  CATEGORIES                      │
│  (Albums, Books, Recipes, Exercise, etc.)       │
└─────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────┐
│                  TEMPLATES                       │
│  (Book Template, Recipe Template, etc.)         │
└─────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────┐
│                 .BASE VIEWS                      │
│  (Recipes.base, Daily.base, etc.)               │
│  Define filters, properties, and view types     │
└─────────────────────────────────────────────────┘
```

### Enhancement Layer

```
┌─────────────────────────────────────────────────┐
│              HOMEPAGE (Home-v3.md)              │
│   Navigation Hub + Live Widgets + Stats         │
└──────────────┬──────────────────────────────────┘
               │
       ┌───────┴────────┬──────────────┐
       ▼                ▼              ▼
┌──────────────┐ ┌─────────────┐ ┌──────────────┐
│ DAILY NOTES  │ │ DASHBOARDS  │ │  CATEGORIES  │
│              │ │             │ │              │
│ • Health     │ │ • Analytics │ │ • Recipes    │
│ • Meals      │ │ • Activities│ │ • Exercise   │
│ • Journal    │ │ • Academic  │ │ • Books      │
│ • Tasks      │ │             │ │ • Projects   │
└──────┬───────┘ └─────────────┘ └──────────────┘
       │
       ▼
┌──────────────────────────────────────────┐
│     FRONTMATTER (YAML Metadata)          │
│  sleep-quality, water-ml, mood, etc.     │
└──────────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────┐
│   DATACORE WIDGETS (System/Scripts/)     │
│  Read/Write frontmatter + Visualize      │
└──────────────────────────────────────────┘
```

---

## 🚀 Getting Started

### Required Plugins

This vault uses the following **Obsidian Community Plugins** (already configured):

**Core Query/Display:**
- `datacore` - Powers all interactive JSX widgets
- `dataview` - Legacy queries (being migrated to datacore)
- `obsidian-meta-bind-plugin` - Input fields in notes

**Templates & Notes:**
- `templater-obsidian` - Template engine with dynamic variables
- `periodic-notes` - Daily/weekly/monthly note automation

**Task Management:**
- `tasknotes` - Advanced task tracking with calendar sync

**UI Enhancements:**
- `obsidian-banners` - Banner images in notes
- `homepage` - Set custom homepage on startup
- `obsidian-style-settings` - CSS customization
- `obsidian-minimal-settings` - Minimal theme settings

**Other:**
- `obsidian-excalidraw-plugin` - Drawing and diagrams
- `obsidian-tracker` - Progress tracking charts
- `obsidian-git` - Version control

### First-Time Setup

1. **Open the vault** in Obsidian
2. **Enable Community Plugins** in Settings → Community Plugins
3. **Set Homepage**: Settings → Homepage → Set to `Home-v3.md`
4. **Configure Settings**: Open `Settings.md` and set your goals:
   - Water goal (ml/day)
   - Sleep goal (hours/night)
   - Exercise goal (minutes/day)
   - Workout schedule
5. **Create Today's Note**: Use the Daily Note Template (`Cmd/Ctrl + P` → "Daily note")
6. **Explore**: Navigate from `Home-v3.md` to discover all features

---

## 📦 Main Components

### 1. **Home-v3.md** - Navigation Hub

Your central dashboard featuring:
- Dynamic time-based greeting
- Live search bar
- Quick access to dashboards and categories
- Today's health stats at a glance
- Vault statistics (total notes, classes, assignments)
- Recent file updates
- Task agenda

### 2. **Daily Note Template** (`Templates/Daily Note Template.md`)

The **single input point** for all daily tracking. Each daily note contains:

**Frontmatter Fields** (auto-tracked):
```yaml
sleep-quality: 1-5 rating
sleep-hours: decimal hours
mood: 1-5 rating
energy: 1-5 rating
water-ml: milliliters
exercise: activity type
exercise-minutes: duration
breakfast/lunch/dinner: recipe links
consumed-calories/protein/carbs/fat: macro totals
meditation: boolean + minutes
stress-level: 1-5 rating
study-hours: decimal hours
health-score: auto-calculated
```

**Sections:**
- 🌅 Morning Check-In (sleep tracker)
- 📊 Today's Overview (tasks)
- 🍽️ Nutrition Tracking (meal planner + water tracker)
- 💪 Movement & Exercise (workout tracker)
- 📚 Academic/Productivity
- 📝 Daily Journal (journal nav + entries)
- 📊 Daily Summary (health score calculation)
- 🧠 Emotion Log (mood tracker)
- 🌙 Nighttime Routine (evening reflection)
- 🎯 Tomorrow's Plan

### 3. **Settings.md** - Configuration Hub

Global settings for all trackers:
- `water-goal-ml` - Daily hydration target
- `water-bottle-size` - Quick-add button increment
- `sleep-goal-hours` - Sleep target
- `sleep-ideal-bedtime` - Bedtime reminder
- `exercise-goal-minutes` - Daily exercise target
- `schedule-monday/tuesday/etc` - Weekly workout plan links

### 4. **Meal Planner.md** - Weekly Meal Planning

Features:
- **Macro Goals**: Set daily calorie, protein, carb, and fat targets
- **Weekly Grid**: Assign recipes to each day (breakfast/lunch/dinner)
- **Auto-calculated Totals**: Daily and weekly macro summaries
- **Shopping List**: Auto-generated from all recipes in the week

Uses `dc-meal-planner.jsx` widget for interactive planning.

### 5. **Categories/** - Content Organization

Categories define content types with custom views:
- `Recipes.md` - All recipes with nutritional data
- `Exercise.md` - Workout plans and exercise library
- `Books.md`, `Movies.md`, `Games.md` - Media tracking
- `Journal.md` - Journal entries
- `Projects.md`, `Posts.md`, `Clippings.md` - Content collections

Each category uses a `.base` file (in `Templates/Bases/`) to define:
- Filters (which notes to show)
- Properties (which metadata to display)
- View type (table, cards, etc.)

### 6. **activities test.md** - Analytics Dashboard

Advanced analytics powered by `dc-activities.jsx` and `dc-memories.jsx`:
- Heat map calendar of activity
- Mood/energy/sleep trend charts
- Weekly/monthly analytics
- Memory timeline visualization

---

## 🎨 Widget System

### How Datacore Widgets Work

Widgets are **React-like JSX components** that:
1. Read/write note frontmatter
2. Provide interactive UI elements
3. Auto-update when data changes
4. Can be embedded in any note

### Widget Structure

Each widget consists of two files:
- `dc-widget-name.jsx` - JavaScript/React component
- `dc-widget-name.css` - Styling (optional)

### Using Widgets in Notes

Standard widget invocation pattern:

````markdown
```datacorejsx
const script = await dc.require(dc.fileLink("System/Scripts/dc-widget-name.jsx"));
return function View() { return script.Func(); }
```
````

### Available Widgets

**Health Tracking:**
- `dc-water-tracker.jsx` - Draggable water intake slider
- `dc-sleep-tracker.jsx` - Sleep time and quality input
- `dc-mood-tracker.jsx` - Emotion selection grid
- `dc-routine-tracker.jsx` - Evening routine checklist

**Nutrition:**
- `dc-meal-planner.jsx` - Weekly meal grid editor
- `dc-shopping-list.jsx` - Auto-generated grocery list
- `dc-today-menu.jsx` - Today's meals from plan
- `dc-recipe-editor.jsx` - Recipe metadata editor

**Exercise:**
- `dc-workout-today.jsx` - Today's scheduled workout
- `dc-weekly-workout.jsx` - Week schedule editor

**Analytics:**
- `dc-activities.jsx` - Activity dashboard with charts
- `dc-memories.jsx` - Visual memory timeline

**UI/UX:**
- `dc-greeting.jsx` - Dynamic time-based greeting
- `dc-randomQuote.jsx` - Daily quote from quotes category
- `dc-randomGif.jsx` - Random aesthetic GIF display
- `dc-nyanCatProgress-draggable.jsx` - Nyan cat progress bar
- `dc-frogButton.jsx` - Fun ribbit button (plays audio)
- `dc-journal-nav.jsx` - Journal entry navigation

**Admin:**
- `dc-admin-buttons.jsx` - Vault management shortcuts

### Creating Custom Widgets

See `Datacore Examples.md` for templates and examples. Basic pattern:

```jsx
// 1. Data - Query or read frontmatter
return function View() {
    const currentFile = dc.useCurrentFile();
    const value = currentFile?.value("field-name") || 0;
    
    // 2. State - Interactive variables
    const [localValue, setLocalValue] = dc.useState(value);
    
    // 3. Logic - Update frontmatter
    const updateValue = async (newValue) => {
        setLocalValue(newValue);
        await dc.updateMetadata(currentFile, { "field-name": newValue });
    };
    
    // 4. Render - JSX UI
    return (
        <div>
            <input value={localValue} onChange={e => updateValue(e.target.value)} />
        </div>
    );
}
```

---

## 📁 File Structure

```
kepano-obsidian/
├── 🏠 Home-v3.md                    # Main homepage (START HERE)
├── ⚙️ Settings.md                   # Global configuration
├── 🍽️ Meal Planner.md              # Weekly meal planning
├── 📊 activities test.md            # Analytics dashboard
├── 📝 Datacore Examples.md          # Widget examples & testing
│
├── Categories/                      # Content types
│   ├── Recipes.md                  # Recipe collection
│   ├── Exercise.md                 # Workout library
│   ├── Books.md, Movies.md, etc.
│   └── Categories.md               # Category index
│
├── Templates/                       # Note templates
│   ├── Daily Note Template.md      # Daily note structure
│   ├── Recipe Template.md
│   ├── Book Template.md
│   ├── Class Template.md           # Academic
│   ├── Coursework Template.md      # Assignments
│   └── Bases/                      # .base view definitions
│       ├── Daily.base
│       ├── Recipes.base
│       ├── Categories.base
│       └── [37 more .base files]
│
├── System/                          # Custom scripts & styles
│   └── Scripts/
│       ├── dc-water-tracker.jsx    # Hydration widget
│       ├── dc-water-tracker.css
│       ├── dc-meal-planner.jsx     # Meal planner widget
│       ├── dc-meal-planner.css
│       └── [35+ more widgets]
│
├── References/                      # Reference notes
├── Clippings/                       # Web clippings
├── Attachments/                     # Images, GIFs, media
├── Academic System/                 # School notes
├── Dashboards/                      # Analytics views
├── Examples/                        # Dashboard examples
├── Excalidraw/                      # Drawings
│
├── 2025-12-23.md                   # Daily notes (auto-created)
├── [Other daily notes...]
│
└── .obsidian/                       # Obsidian config
    ├── types.json                  # Frontmatter schema
    ├── snippets/                   # CSS snippets
    └── [plugin configs]
```

---

## 🔄 Daily Workflow

### Morning Routine

1. **Open Today's Note** (auto-created by Periodic Notes plugin)
2. **🌅 Morning Check-In**: Log sleep data using sleep tracker widget
3. **📊 Review Today's Tasks**: Check TaskNotes agenda
4. **🍽️ Check Meal Plan**: See today's suggested meals from weekly plan
5. **💪 Check Workout**: See today's scheduled exercise from Settings

### Throughout the Day

- **💧 Track Water**: Click water tracker to add intake
- **✅ Complete Tasks**: Check off items in task list
- **🍽️ Log Meals**: Update breakfast/lunch/dinner frontmatter
- **📝 Journal**: Add entries using journal nav widget

### Evening Routine

1. **🧠 Log Emotions**: Use mood tracker to record feelings
2. **💪 Log Exercise**: Update exercise type and minutes
3. **📊 Review Health Score**: Auto-calculated from day's data
4. **🌙 Evening Reflection**: Answer gratitude/improvement prompts
5. **🎯 Plan Tomorrow**: Add tasks to tomorrow's list

### Weekly Planning

1. **📅 Sunday Planning**: Open `Meal Planner.md`
2. **🍳 Assign Recipes**: Drag recipes to each day
3. **🛍️ Generate Shopping List**: Review auto-generated grocery list
4. **💪 Set Workout Schedule**: Update weekly plan in `Settings.md`

---

## 🎨 Customization

### Adding New Tracking Fields

1. **Add to types.json** (optional, for type safety):
```json
{
  "types": {
    "new-field": "number"
  }
}
```

2. **Add to Daily Note Template frontmatter**:
```yaml
new-field: 
```

3. **Add input widget** (optional):
```markdown
**New Field**: `INPUT[number:new-field]`
```

4. **Query in dashboards**:
```javascript
const value = currentFile?.value("new-field");
```

### Creating New Categories

1. **Create category note**: `Categories/New Category.md`
2. **Add frontmatter**:
```yaml
tags: [categories]
image: [[cover-image.png]]  # optional
```

3. **Create .base view**: `Templates/Bases/New Category.base`
4. **Add items**: Use category template to create items

### Modifying Widgets

1. **Locate widget**: `System/Scripts/dc-widget-name.jsx`
2. **Edit JSX/CSS**: Modify component logic or styling
3. **Test**: Use `Datacore Examples.md` to test changes
4. **Reload**: `Cmd/Ctrl + R` to refresh Obsidian

### Custom CSS Themes

CSS files in `System/Scripts/`:
- `goblincore-style.css` - Aesthetic theme
- `journal-theme.css` - Journal-specific styling
- Custom snippet files in `.obsidian/snippets/`

Apply via frontmatter:
```yaml
cssclasses:
  - dashboard
  - journal-theme
  - goblincore
```

---

## 🔧 Technical Details

### Datacore vs Dataview

**Dataview** (Legacy):
- Query language: `dataviewjs` codeblocks
- Read-only queries
- Being phased out in favor of datacore

**Datacore** (Current):
- React-like JSX components
- Read AND write capability
- Interactive UI elements
- Better performance
- Full JavaScript/TypeScript support

**Migration Status**: Actively migrating `dataview`/`dataviewjs` blocks to `datacorejsx`.

### Frontmatter Schema (`types.json`)

Defines metadata field types for the vault:
- `text` - Single-line text
- `multitext` - Tags/arrays
- `number` - Numeric values
- `date` - Date fields
- `aliases` - Note aliases
- `tags` - Note tags

Used by Dataview/Datacore for type inference and by Properties panel for input types.

### .base View Files

Database plugin format (being migrated to datacore). Defines:
- **Filters**: Which notes to include (`file.tags.contains("daily")`)
- **Properties**: Which fields to display
- **Views**: Table, cards, etc.
- **Sort**: Default sorting

Embedded using: `![[filename.base]]`

### Plugin Dependencies

**Critical** (vault won't function without):
- Datacore
- Templater
- Meta Bind

**Important** (features degraded without):
- Periodic Notes
- TaskNotes
- Banners
- Homepage

**Optional** (nice-to-have):
- Tracker, Excalidraw, Style Settings, etc.

---

## 🐛 Troubleshooting

### Widgets Not Rendering

**Problem**: Datacore blocks show "Loading..." or blank
**Solutions**:
1. Check Datacore plugin is enabled
2. Verify JavaScript execution: Settings → Datacore → Enable JS
3. Reload Obsidian (`Cmd/Ctrl + R`)
4. Check browser console for errors (`Cmd/Ctrl + Shift + I`)

### Frontmatter Not Updating

**Problem**: Widget values don't save to frontmatter
**Solutions**:
1. Check file is not read-only
2. Verify frontmatter field names match exactly (kebab-case)
3. Check for infinite loops (widget updates trigger re-render)
4. Use `dc.useState` for local state, write on blur/button

### .base Views Not Working

**Problem**: `![[filename.base]]` embeds show error
**Solutions**:
1. Verify Database plugin is installed
2. Check `.base` file exists in correct location
3. Validate YAML syntax in `.base` file
4. Consider migrating to datacore queries

### Settings Not Loading

**Problem**: Widgets can't find Settings.md values
**Solutions**:
1. Verify `Settings.md` exists in vault root
2. Check frontmatter fields match widget expectations
3. Confirm tags include `settings` or `#settings`

### Daily Note Template Issues

**Problem**: Template variables not expanding
**Solutions**:
1. Check Templater plugin is enabled
2. Verify template syntax: `<% tp.date.now() %>`
3. Ensure template is in Templates folder
4. Check Templater settings for template folder location

### Performance Issues

**Problem**: Vault feels slow, widgets lag
**Solutions**:
1. Limit datacore queries (use `.limit()`)
2. Reduce simultaneous widget renders
3. Optimize images (compress large GIFs)
4. Disable unused plugins
5. Clear cache: Settings → Appearance → Reload without saving

---

## 📚 Learning Resources

- **Datacore Examples.md** - Widget templates and patterns
- **System/Scripts/** - Real-world widget implementations
- [Datacore Documentation](https://blacksmithgu.github.io/datacore/)
- [Templater Documentation](https://silentvoid13.github.io/Templater/)
- [Meta Bind Documentation](https://mprojectscode.github.io/obsidian-meta-bind-plugin-docs/)

---

## 🎯 What's Next?

**Current Development** (in progress):
- [ ] Migrate all `dataviewjs` to `datacorejsx`
- [ ] Enhance CSS theming (seasonal themes, aesthetic improvements)
- [ ] Add more GIF animations and visual elements
- [ ] Fine-tune meal planner CSS
- [ ] Improve recipes .base view
- [ ] Add weight tracker widget
- [ ] Calendar heat map for habit tracking
- [ ] Weekly/monthly summary reports

**Future Ideas**:
- Correlation analysis (sleep vs mood, etc.)
- Voice input integration
- Mobile-optimized templates
- Spaced repetition integration
- Advanced charting with Tracker plugin

---

## 💡 Philosophy

This vault follows a **single-source-of-truth** approach:
- **Daily notes** are the only manual input point
- **Everything flows from frontmatter** (structured metadata)
- **Widgets visualize and modify** but don't create new data stores
- **Categories organize** content by type
- **Templates ensure consistency**
- **Analytics aggregate** from source data

The result: a maintainable, scalable personal knowledge system that grows with you.

---

**Last Updated**: December 23, 2025  
**Vault Version**: 2.0 (Datacore Migration)  
**Base System**: Kepano Obsidian Vault  
**Built with**: ❤️ and lots of ☕

*Have fun exploring! 🚀*
