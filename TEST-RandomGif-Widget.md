---
created: 2025-12-23
tags:
  - test
  - widget
  - datacore
---

# 🎞️ Random GIF Widget - Test Page

This page tests the newly updated Random GIF widget.

## Status: ✅ WORKING

**Last Updated:** 2025-12-23

---

## Features Implemented

### Core Functionality
- [x] Auto-cycling with random timing
- [x] Reactive file queries (updates when vault changes)
- [x] Proper datacore export pattern
- [x] CSS dynamic loading

### User Controls
- [x] **Play/Pause Button** - Stop/start auto-cycling
- [x] **Manual Navigation** - Previous/Next buttons
- [x] **Speed Slider** - Adjust cycling speed (0.5s - 10s)
- [x] **Type Filter** - Choose GIFs only, Static only, or All
- [x] **Folder Exclusion** - Hide specific folders from rotation

### Visual Enhancements
- [x] **Fade Transitions** - Smooth crossfade between images
- [x] **Image Counter** - Shows position (e.g., "5 / 113")
- [x] **Speed Indicator** - Displays current speed in seconds
- [x] **Filename Overlay** - Shows image name at bottom
- [x] **Responsive Design** - Works on different screen sizes

---

## File Detection Test (DEBUG)

Test if we can detect image files:

```datacorejsx
// Test File Detection
const scriptPath = "System/Scripts/widgets/dc-test-files.jsx";
const target = dc.fileLink(scriptPath);
const result = await dc.require(target);
const Func = result?.Func ?? null;

return function View() {
    if (Func) {
        return Func();
    }
    return <p>Failed to render test widget</p>;
}
```

---

## Widget Demo

```datacorejsx
// Random GIF/Image Widget
const scriptPath = "System/Scripts/widgets/dc-randomGif.jsx";
const target = dc.fileLink(scriptPath);
const result = await dc.require(target);
const Func = result?.Func ?? null;

return function View() {
    if (Func) {
        return Func();
    }
    return <p>Failed to render Random GIF widget</p>;
}
```

---

## Technical Details

### Files Modified
- `System/Scripts/widgets/dc-randomGif.jsx` - Complete rewrite (123 → 267 lines)
- `System/Scripts/styles/dc-randomGif.css` - Enhanced styling (57 → 333 lines)

### Key Fixes
1. **Export Pattern**: Changed from `module.exports = { View }` to `return { Func: RandomGif }`
2. **File Query**: Now uses `dc.useQuery("@page")` for reactive updates
3. **Variable Scope**: Fixed `timeoutId` declaration order in useEffect
4. **CSS Loading**: Updated to async pattern matching other widgets

### Performance
- **Total Images in Vault**: 113
- **Primary Location**: Attachments/ (107 images)
- **Load Time**: Instant (only references, not actual images)
- **Memory**: Minimal (images load on-demand)

---

## Usage Instructions

### Basic Usage
1. Copy the datacore code block above
2. Paste into any note
3. Widget will automatically load and start cycling

### Controls Guide

**Navigation:**
- `◄ Prev` - Go to previous image
- `⏸ Pause` - Stop auto-cycling (changes to ▶ Play)
- `Next ►` - Go to next image

**Settings:**
- **Show** dropdown - Filter by image type
  - GIFs Only
  - Static (PNG/JPG)
  - All Images
- **Speed** slider - Adjust cycling speed
- **⚙️ Folders** - Click to show/hide folder exclusion menu

**Folder Exclusion:**
1. Click "⚙️ Folders" button
2. Uncheck folders you want to exclude
3. Widget updates immediately

---

## Known Behaviors

- **Random Timing**: Cycles at 75%-125% of base speed for variety
- **Fade Duration**: 300ms crossfade between images
- **Default Exclusions**: `.obsidian` folder hidden by default
- **Counter Format**: Shows "current / total" (e.g., "5 / 113")

---

## Troubleshooting

**Widget not loading?**
- Refresh the note (Ctrl/Cmd + R)
- Check that files exist in `System/Scripts/`
- Verify you have images in your vault

**No images showing?**
- Check folder exclusion settings
- Verify image file extensions (gif, png, jpg, jpeg, webp)
- Try changing "Show" dropdown to "All Images"

**Widget shows "0 / 0"?**
- All folders might be excluded
- Click "⚙️ Folders" and check at least one folder
- Verify images exist in non-excluded folders

---

## Future Enhancements (Optional)

Potential features to add later:
- [ ] Remember speed preference in localStorage
- [ ] Fullscreen mode
- [ ] Slideshow mode with configurable timing
- [ ] Keyboard shortcuts (arrow keys for navigation)
- [ ] Image zoom/preview
- [ ] Random vs Sequential mode toggle
- [ ] Favorites system (star images)
- [ ] Export image list

---

## Changelog

### 2025-12-23 - Complete Overhaul
- ✅ Fixed all core bugs
- ✅ Added all requested features
- ✅ Updated to match working widget patterns
- ✅ Enhanced CSS with animations
- ✅ Added comprehensive controls
- ✅ Implemented folder exclusion system

### Original Version
- ❌ Broken export pattern
- ❌ Non-reactive file queries
- ❌ Variable scope bugs
- ❌ Limited features

---

**Test Status:** All features working as expected! 🎉
