# Roadmap

Current state and planned features for the theme system.

---

## Current State

### Phase 1: Theme Dashboard Foundation (Complete)

- [x] Theme Provider (`dc-themeProvider.jsx`)
  - [x] Load themes from `System/Themes/*.md`
  - [x] Color override from `style-settings-*.json`
  - [x] Theme caching and cache invalidation
  - [x] CSS variable injection
  - [x] `useTheme()` hook for widgets
  - [x] `useAvailableThemes()` and `useAvailableColorSchemes()`
  - [x] `switchTheme()` with Obsidian sync
  - [x] Theme override system for preview

- [x] Theme Dashboard (`dc-themeDashboard.jsx`)
  - [x] Theme card selector
  - [x] Color scheme override toggle
  - [x] Live preview of all Glo* components
  - [x] "Apply Theme & Sync" button

- [x] Theme Template (`_themeTemplate.md`)
  - [x] ~80 documented properties
  - [x] Organized sections with comments
  - [x] Ready for user customization

---

### Phase 2: Theme Editor (Complete)

- [x] Color Picker (`dc-colorPicker.jsx`)
  - [x] HSV color picker with saturation/brightness square
  - [x] Hue slider
  - [x] 6 preset palettes
  - [x] Hex input with validation

- [x] Gradient Builder (`dc-gradientBuilder.jsx`)
  - [x] Linear, radial, conic gradient support
  - [x] Direction selector
  - [x] Add/remove color stops
  - [x] Position sliders
  - [x] 10 preset gradients
  - [x] CSS output display

- [x] Background Picker (`dc-backgroundPicker.jsx`)
  - [x] Combined Color / Gradient / Image tabs
  - [x] Image upload to base64
  - [x] URL/base64 paste input
  - [x] Auto-detect type from value

- [x] Theme Editor (`dc-themeEditor.jsx`)
  - [x] Theme selector dropdown
  - [x] "+ New Theme" option
  - [x] Collapsible property sections
  - [x] Live preview panel
  - [x] Save/Create/Reset functionality
  - [x] Unsaved changes indicator

---

### Glo* Component Library (Complete)

- [x] GloButton - Themed button with effects
- [x] GloBar - Draggable progress bar with sprite
- [x] GloToggle - Toggle switch with sprite
- [x] GloCard - Flexible container
- [x] GloInput - Input with validation
- [x] GloSelect - Dropdown select
- [x] GloTabs - Tab switcher
- [x] GloBadge - Status badges/chips

---

## Phase 3: Integration & Polish (Planned)

### Dashboard + Editor Integration

- [x] Unified "Theme Studio" combining Dashboard and Editor
- [ ] Theme duplication (duplicate existing theme as starting point)
- [ ] Theme export/import (share themes as JSON)
- [ ] Theme deletion with confirmation

### Style Settings Audit

- [ ] Map all Minimal Theme Style Settings keys
- [ ] Full color palette sync (currently ~15 keys, could be 50+)
- [ ] Heading colors sync for all 6 levels
- [ ] Font sync (interface, text, mono)

### Preview Enhancements

- [ ] Preview themes in different contexts:
  - [ ] Dark/light mode simulation
  - [ ] Mobile viewport preview
  - [ ] Reading mode vs. editing mode

### Component Enhancements

- [ ] GloSlider - Horizontal/vertical slider
- [ ] GloCheckbox - Checkbox with custom styling
- [ ] GloRadio - Radio button group
- [ ] GloModal - Themed modal dialog
- [ ] GloTooltip - Themed tooltip

---

## Phase 4: Vault Integration (Planned)

### Homepage Widget

- [ ] Homepage with themed components
- [ ] Quick stats cards
- [ ] Recent notes list
- [ ] Upcoming tasks

### Periodic Notes

- [ ] Daily note template with themed trackers
- [ ] Weekly review template
- [ ] Monthly summary template
- [ ] Themed habit tracker widget

### Activity Tracker
are daily notes becoming purely for frontmatter logging? for example we can create a datacore widget that is the daily note and have it reference past days to render the views all within one note using the widget. similar to how we use the journal widget to see previous days we can just use a widget for the whole daily note console and daily notes just get logged as a note with the date in the title and all of our important frontmatter values. 

- [ ] Unified activity dashboard
- [ ] Water, sleep, exercise tracking
- [ ] Mood logging with themed interface
- [ ] Streak visualization
- [ ] Charts and graphs with theme colors

### Task Management

- [ ] Themed task views (Kanban, list, calendar)
- [ ] TaskNotes integration
- [ ] Due date visualization with theme colors

---

## Phase 5: Advanced Features (Future)

### Mascot System

- [ ] Animated mascot that reacts to user actions
- [ ] Idle, happy, sad states
- [ ] Configurable position and size
- [ ] Multiple mascot options

### Sound Effects

- [ ] Optional sound on interactions
- [ ] Click sounds, completion chimes
- [ ] Per-theme sound packs

### Theme Marketplace

- [ ] Community theme sharing
- [ ] Theme ratings and reviews
- [ ] One-click theme installation

### AI Integration

- [ ] AI-generated color schemes
- [ ] Theme suggestions based on preferences
- [ ] Accessibility recommendations

---

## Known Issues

### High Priority

1. **Page reload on theme switch** - Currently reloads entire page after 500ms delay. Could be optimized to hot-reload CSS variables without full reload.

2. **Sprite size mismatch** - If theme sprite dimensions don't match actual image, sprite appears stretched. No validation currently.

### Medium Priority

3. **Color override naming** - Color scheme must exactly match filename (`style-settings-NAME.json`). Could be more flexible.

4. **Cache invalidation** - Theme cache doesn't auto-invalidate when theme file is edited externally. Manual `clearThemeCache()` required.

5. **Style Settings sync** - Limited to ~15 commonly-used keys. Many Style Settings keys not mapped.

### Low Priority

6. **Deprecated `substr` usage** - Theme provider uses deprecated `substr()` method. Should migrate to `substring()` or `slice()`.

7. **Unused variables in components** - Some components have declared but unused variables (linting warnings).

---

## Contributing

### Adding a Component

1. Create `System/Scripts/Components/dc-gloNewComponent.jsx`
2. Import `useTheme` from themeProvider
3. Read theme properties with fallback defaults
4. Support `flashy` prop for effect toggle
5. Export component and `renderedView`
6. Add to Component-Test.md
7. Document in COMPONENT-LIBRARY.md

### Adding a Theme Property

1. Add to `DEFAULT_THEME` in themeProvider
2. Add to `_themeTemplate.md` with documentation
3. Update relevant components to read the property
4. Update THEME-SYSTEM.md if significant

### Adding a Style Settings Mapping

1. Add entry to `STYLE_SETTINGS_MAP` in themeProvider
2. Update THEME-SYSTEM.md mapping table
3. Test with existing color scheme JSONs

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 2.0 | Dec 2024 | Phase 1 & 2 complete: Theme Dashboard, Theme Editor, full Glo* library |
| 1.0 | Nov 2024 | Initial theme system with basic components |

---

## Related Documentation

- [ARCHITECTURE.md](./ARCHITECTURE.md) - System overview
- [THEME-SYSTEM.md](./THEME-SYSTEM.md) - Theme system deep-dive
- [COMPONENT-LIBRARY.md](./COMPONENT-LIBRARY.md) - Component API reference
