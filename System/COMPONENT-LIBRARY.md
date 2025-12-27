# Component Library

API reference for the Glo* component family and utility components.

---

## Overview

All components:
- Read theme values from `dc-themeProvider.jsx`
- Support `flashy` prop to override global `flashy-mode`
- Export both component and `renderedView` for testing
- Load shared animations from `dc-components.css`

### Import Pattern

```javascript
const { GloButton } = await dc.require(
    dc.fileLink("System/Scripts/Components/dc-gloButton.jsx")
);

// Or import the demo view
const { renderedView } = await dc.require(
    dc.fileLink("System/Scripts/Components/dc-gloButton.jsx")
);
return renderedView;
```

---

## GloButton

Themed button with glow, lift, press, and rainbow effects.

**File:** `System/Scripts/Components/dc-gloButton.jsx`

### Basic Usage

```javascript
const { GloButton } = await dc.require(
    dc.fileLink("System/Scripts/Components/dc-gloButton.jsx")
);

function MyWidget() {
    return (
        <GloButton 
            label="Click Me"
            onClick={() => new Notice("Clicked!")}
        />
    );
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | required | Button text |
| `onClick` | `function` | `() => {}` | Click handler |
| `variant` | `string` | `"primary"` | `"primary"` \| `"secondary"` \| `"ghost"` |
| `size` | `string` | `"medium"` | `"small"` \| `"medium"` \| `"large"` |
| `bg` | `string` | `null` | Custom idle background (color/gradient/base64) |
| `hoverBg` | `string` | `null` | Custom hover background |
| `activeBg` | `string` | `null` | Custom active background |
| `glow` | `boolean` | `true` | Enable glow on hover |
| `lift` | `boolean` | `true` | Enable lift on hover |
| `press` | `boolean` | `true` | Enable press effect on click |
| `rainbow` | `boolean` | `false` | Enable rainbow text on hover |
| `icon` | `string` | `null` | Left icon (emoji) |
| `iconRight` | `string` | `null` | Right icon |
| `showSprite` | `boolean` | `false` | Show theme sprite |
| `sprite` | `string` | `null` | Override sprite (base64) |
| `spriteWidth` | `number` | `null` | Override sprite width |
| `spriteHeight` | `number` | `null` | Override sprite height |
| `spriteAnimation` | `string` | `null` | Override click animation |
| `spritePosition` | `string` | `"left"` | `"left"` \| `"right"` |
| `disabled` | `boolean` | `false` | Disable button |
| `loading` | `boolean` | `false` | Show loading spinner |
| `active` | `boolean` | `false` | Force active state |
| `style` | `object` | `{}` | Additional inline styles |
| `className` | `string` | `""` | Additional CSS classes |
| `flashy` | `boolean` | `null` | Override flashy mode |

### Examples

```javascript
// Variants
<GloButton label="Primary" variant="primary" onClick={() => {}} />
<GloButton label="Secondary" variant="secondary" onClick={() => {}} />
<GloButton label="Ghost" variant="ghost" onClick={() => {}} />

// Sizes
<GloButton label="Small" size="small" onClick={() => {}} />
<GloButton label="Large" size="large" onClick={() => {}} />

// With icons
<GloButton label="Save" icon="💾" onClick={() => {}} />
<GloButton label="Next" iconRight="→" onClick={() => {}} />

// Effects
<GloButton label="Rainbow!" rainbow={true} onClick={() => {}} />
<GloButton label="No Effects" glow={false} lift={false} onClick={() => {}} />

// With sprite
<GloButton 
    label="Animated" 
    showSprite={true}
    onClick={() => {}} 
/>

// States
<GloButton label="Active" active={true} onClick={() => {}} />
<GloButton label="Disabled" disabled={true} onClick={() => {}} />
<GloButton label="Loading" loading={true} onClick={() => {}} />

// Custom background
<GloButton 
    label="Custom"
    bg="linear-gradient(135deg, #ff6b6b, #feca57)"
    onClick={() => {}} 
/>
```

### Exported Helpers

```javascript
const { 
    GloButton,
    resolveBackground,  // Resolve bg with fallback chain
    useComponentCSS,    // Load shared CSS
    useFlashyMode,      // Read flashy-mode from Settings.md
    hexToRgba,          // Convert hex to rgba
} = await dc.require(dc.fileLink("System/Scripts/Components/dc-gloButton.jsx"));
```

---

## GloBar

Draggable progress bar with animated sprite.

**File:** `System/Scripts/Components/dc-gloBar.jsx`

### Basic Usage

```javascript
const { GloBar } = await dc.require(
    dc.fileLink("System/Scripts/Components/dc-gloBar.jsx")
);

function WaterTracker() {
    return (
        <GloBar 
            value={2500}
            max={4000}
            label="Water Intake"
            draggable={true}
            targetKey="water-ml"
        />
    );
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | `null` | Controlled value |
| `max` | `number` | `100` | Maximum value |
| `targetKey` | `string` | `null` | Frontmatter key to read/write |
| `targetFile` | `string` | `null` | File path (null = current file) |
| `label` | `string` | `null` | Label above bar |
| `showValue` | `boolean` | `true` | Show value text |
| `valueFormat` | `function` | `null` | Custom format: `(value, max) => string` |
| `showPercentage` | `boolean` | `false` | Show as percentage |
| `showSprite` | `boolean` | `true` | Show theme sprite |
| `sprite` | `string` | `null` | Override sprite (base64) |
| `spriteWidth` | `number` | `null` | Override sprite width |
| `spriteHeight` | `number` | `null` | Override sprite height |
| `clickAnimation` | `string` | `null` | Override animation |
| `clickDuration` | `string` | `null` | Override duration |
| `draggable` | `boolean` | `false` | Enable drag to set value |
| `step` | `number` | `1` | Step size when dragging |
| `trackBg` | `string` | `null` | Override track background |
| `fillGradient` | `string` | `null` | Override fill gradient |
| `height` | `string` | `null` | Override bar height |
| `borderRadius` | `string` | `null` | Override border radius |
| `width` | `string` | `"100%"` | Bar width |
| `onChange` | `function` | `null` | Called with new value |
| `onDragStart` | `function` | `null` | Called when drag starts |
| `onDragEnd` | `function` | `null` | Called when drag ends |
| `style` | `object` | `{}` | Additional styles |
| `className` | `string` | `""` | Additional classes |
| `flashy` | `boolean` | `null` | Override flashy mode |

### Examples

```javascript
// Basic progress
<GloBar value={65} label="Progress" />

// Draggable with frontmatter binding
<GloBar 
    targetKey="exercise-minutes"
    max={60}
    label="Exercise"
    draggable={true}
/>

// Custom formatting
<GloBar 
    value={2500}
    max={4000}
    valueFormat={(v, max) => `${v}ml / ${max}ml`}
/>

// Percentage mode
<GloBar value={75} showPercentage={true} />

// No sprite
<GloBar value={50} showSprite={false} />

// Custom appearance
<GloBar 
    value={80}
    fillGradient="linear-gradient(90deg, #00ff00, #00aa00)"
    trackBg="rgba(0,255,0,0.1)"
    height="20px"
/>

// With onChange callback
<GloBar 
    value={50}
    draggable={true}
    onChange={(value) => console.log("New value:", value)}
/>
```

---

## GloToggle

Toggle switch with sprite, labels, and background transitions.

**File:** `System/Scripts/Components/dc-gloToggle.jsx`

### Basic Usage

```javascript
const { GloToggle } = await dc.require(
    dc.fileLink("System/Scripts/Components/dc-gloToggle.jsx")
);

function NightModeToggle() {
    return (
        <GloToggle 
            targetKey="night_mode"
            onLabel="Night Mode"
            offLabel="Day Mode"
        />
    );
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `targetKey` | `string` | required | Frontmatter key to toggle |
| `targetFile` | `string` | `null` | File path (null = current file) |
| `onLabel` | `string` | `null` | Label when ON (uses theme default) |
| `offLabel` | `string` | `null` | Label when OFF |
| `onSub` | `string` | `null` | Sub-label when ON |
| `offSub` | `string` | `null` | Sub-label when OFF |
| `showSprite` | `boolean` | `true` | Show theme sprite |
| `sprite` | `string` | `null` | Override sprite (base64) |
| `spriteWidth` | `number` | `null` | Override sprite width |
| `spriteHeight` | `number` | `null` | Override sprite height |
| `spriteAnimation` | `string` | `null` | Override animation |
| `idleBg` | `string` | `null` | Background when OFF |
| `hoverBg` | `string` | `null` | Background when hovering |
| `activeBg` | `string` | `null` | Background when ON |
| `glow` | `boolean` | `true` | Enable glow effects |
| `lift` | `boolean` | `true` | Enable lift on hover |
| `press` | `boolean` | `true` | Enable press on click |
| `rainbow` | `boolean` | `true` | Enable rainbow text |
| `width` | `string` | `null` | Override container width |
| `padding` | `string` | `null` | Override padding |
| `borderRadius` | `string` | `null` | Override border radius |
| `onChange` | `function` | `null` | Called with new value |
| `style` | `object` | `{}` | Additional styles |
| `className` | `string` | `""` | Additional classes |
| `flashy` | `boolean` | `null` | Override flashy mode |

### Examples

```javascript
// Basic toggle
<GloToggle targetKey="feature_enabled" />

// Custom labels
<GloToggle 
    targetKey="dark_mode"
    onLabel="Dark Mode"
    offLabel="Light Mode"
    onSub="Eyes protected"
    offSub="Standard view"
/>

// Without sprite
<GloToggle 
    targetKey="setting"
    showSprite={false}
    onLabel="Enabled"
    offLabel="Disabled"
/>

// Custom backgrounds
<GloToggle 
    targetKey="premium"
    activeBg="linear-gradient(135deg, #ffd700, #ff8c00)"
    onLabel="Premium Active"
    offLabel="Upgrade to Premium"
/>

// With callback
<GloToggle 
    targetKey="notifications"
    onChange={(isOn) => console.log("Notifications:", isOn)}
/>
```

---

## GloCard

Flexible container with header, body, footer, and various effects.

**File:** `System/Scripts/Components/dc-gloCard.jsx`

### Basic Usage

```javascript
const { GloCard } = await dc.require(
    dc.fileLink("System/Scripts/Components/dc-gloCard.jsx")
);

function InfoCard() {
    return (
        <GloCard 
            title="Today's Stats"
            subtitle="Updated just now"
            icon="📊"
        >
            <p>Your content here...</p>
        </GloCard>
    );
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Card body content |
| `title` | `string` | `null` | Header title |
| `subtitle` | `string` | `null` | Header subtitle |
| `icon` | `string` | `null` | Header icon (emoji) |
| `footer` | `ReactNode` | `null` | Footer content |
| `actions` | `ReactNode` | `null` | Header actions (right side) |
| `variant` | `string` | `"default"` | `"default"` \| `"elevated"` \| `"outlined"` \| `"ghost"` \| `"glass"` |
| `size` | `string` | `"medium"` | `"small"` \| `"medium"` \| `"large"` |
| `bg` | `string` | `null` | Background color/gradient |
| `headerBg` | `string` | `null` | Header background |
| `footerBg` | `string` | `null` | Footer background |
| `borderColor` | `string` | `null` | Border color |
| `accentColor` | `string` | `null` | Accent color |
| `width` | `string` | `"100%"` | Card width |
| `minHeight` | `string` | `null` | Minimum height |
| `maxHeight` | `string` | `null` | Maximum height (enables scroll) |
| `glow` | `boolean` | `false` | Enable glow on hover |
| `glowColor` | `string` | `null` | Override glow color |
| `hover` | `boolean` | `true` | Enable hover effects |
| `clickable` | `boolean` | `false` | Make card clickable |
| `collapsible` | `boolean` | `false` | Enable collapse/expand |
| `defaultCollapsed` | `boolean` | `false` | Start collapsed |
| `image` | `string` | `null` | Header image URL/base64 |
| `imageHeight` | `string` | `"150px"` | Image height |
| `imagePosition` | `string` | `"top"` | `"top"` \| `"bottom"` \| `"left"` \| `"right"` |
| `onClick` | `function` | `null` | Click handler |
| `onCollapse` | `function` | `null` | Collapse handler |
| `style` | `object` | `{}` | Container styles |
| `headerStyle` | `object` | `{}` | Header styles |
| `bodyStyle` | `object` | `{}` | Body styles |
| `footerStyle` | `object` | `{}` | Footer styles |
| `flashy` | `boolean` | `null` | Override flashy mode |

### Examples

```javascript
// Basic card
<GloCard title="My Card" icon="📦">
    <p>Card content goes here.</p>
</GloCard>

// With footer
<GloCard 
    title="Stats"
    footer={<span>Last updated: Today</span>}
>
    <p>Statistics content...</p>
</GloCard>

// Collapsible
<GloCard 
    title="Collapsible Section"
    collapsible={true}
    defaultCollapsed={false}
>
    <p>Click header to collapse!</p>
</GloCard>

// Glass effect with glow
<GloCard 
    title="Glass Card"
    variant="glass"
    glow={true}
>
    <p>Frosted glass effect with glow on hover.</p>
</GloCard>

// Variants
<GloCard variant="outlined" title="Outlined" />
<GloCard variant="elevated" title="Elevated" />
<GloCard variant="ghost" title="Ghost" />

// With image
<GloCard 
    title="Featured"
    image="https://example.com/image.jpg"
    imagePosition="top"
>
    <p>Image at top of card.</p>
</GloCard>

// Clickable with action
<GloCard 
    title="Clickable"
    clickable={true}
    onClick={() => console.log("Card clicked!")}
>
    <p>Click anywhere on the card.</p>
</GloCard>

// With header actions
<GloCard 
    title="With Actions"
    actions={<GloButton size="small" label="Edit" onClick={() => {}} />}
>
    <p>Card with action button in header.</p>
</GloCard>
```

---

## GloInput

Text/number input with validation, icons, and frontmatter binding.

**File:** `System/Scripts/Components/dc-gloInput.jsx`

### Basic Usage

```javascript
const { GloInput } = await dc.require(
    dc.fileLink("System/Scripts/Components/dc-gloInput.jsx")
);

function NameInput() {
    return (
        <GloInput 
            label="Your Name"
            placeholder="Enter your name..."
            targetKey="username"
        />
    );
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | `""` | Controlled value |
| `defaultValue` | `string` | `""` | Initial value |
| `targetKey` | `string` | `null` | Frontmatter key |
| `targetFile` | `string` | `null` | File path |
| `type` | `string` | `"text"` | `"text"` \| `"number"` \| `"email"` \| `"password"` \| `"search"` \| `"url"` \| `"textarea"` |
| `label` | `string` | `null` | Label above input |
| `placeholder` | `string` | `""` | Placeholder text |
| `helperText` | `string` | `null` | Helper text below |
| `iconLeft` | `string` | `null` | Left icon |
| `iconRight` | `string` | `null` | Right icon |
| `required` | `boolean` | `false` | Required field |
| `minLength` | `number` | `null` | Minimum length |
| `maxLength` | `number` | `null` | Maximum length |
| `min` | `number` | `null` | Minimum value (number) |
| `max` | `number` | `null` | Maximum value (number) |
| `pattern` | `string` | `null` | Regex pattern |
| `validate` | `function` | `null` | Custom validation |
| `showError` | `boolean` | `true` | Show error message |
| `size` | `string` | `"medium"` | `"small"` \| `"medium"` \| `"large"` |
| `variant` | `string` | `"default"` | `"default"` \| `"filled"` \| `"ghost"` |
| `width` | `string` | `"100%"` | Input width |
| `rows` | `number` | `3` | Rows for textarea |
| `autoResize` | `boolean` | `false` | Auto-resize textarea |
| `disabled` | `boolean` | `false` | Disable input |
| `readOnly` | `boolean` | `false` | Read-only |
| `autoFocus` | `boolean` | `false` | Auto focus |
| `clearable` | `boolean` | `false` | Show clear button |
| `debounce` | `number` | `0` | Debounce delay (ms) |
| `glow` | `boolean` | `true` | Glow on focus |
| `onChange` | `function` | `null` | Value change handler |
| `onFocus` | `function` | `null` | Focus handler |
| `onBlur` | `function` | `null` | Blur handler |
| `onEnter` | `function` | `null` | Enter key handler |
| `onClear` | `function` | `null` | Clear handler |
| `style` | `object` | `{}` | Container styles |
| `inputStyle` | `object` | `{}` | Input styles |
| `bgOverride` | `string` | `null` | Override background |
| `borderOverride` | `string` | `null` | Override border |
| `accentColorOverride` | `string` | `null` | Override accent |

### Examples

```javascript
// Basic input
<GloInput label="Name" placeholder="Enter name..." />

// With icons
<GloInput 
    label="Search"
    placeholder="Search notes..."
    iconLeft="🔍"
    clearable={true}
/>

// Number input
<GloInput 
    type="number"
    label="Quantity"
    min={0}
    max={100}
/>

// Required with validation
<GloInput 
    label="Email"
    type="email"
    required={true}
    pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
/>

// Custom validation
<GloInput 
    label="Username"
    validate={(val) => {
        if (val.length < 3) return "Too short";
        if (!/^[a-z0-9]+$/i.test(val)) return "Alphanumeric only";
        return null;
    }}
/>

// Textarea
<GloInput 
    type="textarea"
    label="Notes"
    rows={5}
    placeholder="Write here..."
/>

// Frontmatter binding with debounce
<GloInput 
    targetKey="user_notes"
    debounce={500}
    type="textarea"
/>

// Variants
<GloInput variant="default" placeholder="Default" />
<GloInput variant="filled" placeholder="Filled" />
<GloInput variant="ghost" placeholder="Ghost" />
```

---

## GloTabs

Tab switcher with multiple variants and animations.

**File:** `System/Scripts/Components/dc-gloTabs.jsx`

### Basic Usage

```javascript
const { GloTabs } = await dc.require(
    dc.fileLink("System/Scripts/Components/dc-gloTabs.jsx")
);

function ViewTabs() {
    return (
        <GloTabs 
            tabs={[
                { id: "today", label: "Today", icon: "📅", content: <p>Today's view</p> },
                { id: "week", label: "Week", icon: "📆", content: <p>Weekly view</p> },
                { id: "month", label: "Month", icon: "🗓️", content: <p>Monthly view</p> },
            ]}
        />
    );
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tabs` | `array` | `[]` | Array of `{ id, label, icon?, disabled?, content? }` |
| `activeTab` | `string` | `null` | Controlled active tab id |
| `defaultTab` | `string` | `null` | Initial tab (or first) |
| `targetKey` | `string` | `null` | Frontmatter key |
| `targetFile` | `string` | `null` | File path |
| `variant` | `string` | `"underline"` | `"underline"` \| `"pills"` \| `"boxed"` \| `"minimal"` |
| `size` | `string` | `"medium"` | `"small"` \| `"medium"` \| `"large"` |
| `align` | `string` | `"left"` | `"left"` \| `"center"` \| `"right"` \| `"stretch"` |
| `orientation` | `string` | `"horizontal"` | `"horizontal"` \| `"vertical"` |
| `width` | `string` | `"100%"` | Container width |
| `tabsWidth` | `string` | `null` | Tabs section width (vertical) |
| `glow` | `boolean` | `true` | Glow on active |
| `animated` | `boolean` | `true` | Animate indicator |
| `renderContent` | `boolean` | `true` | Render tab content |
| `contentPadding` | `string` | `"16px"` | Content padding |
| `onChange` | `function` | `null` | Tab change handler |
| `style` | `object` | `{}` | Container styles |
| `tabsStyle` | `object` | `{}` | Tabs bar styles |
| `contentStyle` | `object` | `{}` | Content styles |
| `accentColorOverride` | `string` | `null` | Override accent |
| `surfaceColorOverride` | `string` | `null` | Override surface |

### Examples

```javascript
// Underline (default)
<GloTabs 
    tabs={[
        { id: "a", label: "Tab A", content: <p>Content A</p> },
        { id: "b", label: "Tab B", content: <p>Content B</p> },
    ]}
/>

// Pills variant
<GloTabs 
    variant="pills"
    tabs={[
        { id: "all", label: "All" },
        { id: "active", label: "Active" },
        { id: "archived", label: "Archived" },
    ]}
    renderContent={false}
/>

// Boxed variant
<GloTabs 
    variant="boxed"
    tabs={[
        { id: "overview", label: "Overview", icon: "📊" },
        { id: "details", label: "Details", icon: "📝" },
        { id: "settings", label: "Settings", icon: "⚙️", disabled: true },
    ]}
/>

// Stretched pills
<GloTabs 
    variant="pills"
    align="stretch"
    tabs={[
        { id: "1", label: "One" },
        { id: "2", label: "Two" },
        { id: "3", label: "Three" },
    ]}
/>

// Vertical orientation
<GloTabs 
    orientation="vertical"
    tabsWidth="150px"
    tabs={[
        { id: "general", label: "General", content: <p>General settings</p> },
        { id: "appearance", label: "Appearance", content: <p>Theme settings</p> },
        { id: "advanced", label: "Advanced", content: <p>Advanced options</p> },
    ]}
/>

// With frontmatter binding
<GloTabs 
    targetKey="active_view"
    tabs={[...]}
/>
```

---

## GloBadge

Status badges, tags, and chips.

**File:** `System/Scripts/Components/dc-gloBadge.jsx`

### Basic Usage

```javascript
const { GloBadge, GloBadgeGroup } = await dc.require(
    dc.fileLink("System/Scripts/Components/dc-gloBadge.jsx")
);

function StatusBadges() {
    return (
        <GloBadgeGroup>
            <GloBadge status="success">Complete</GloBadge>
            <GloBadge status="warning">Pending</GloBadge>
            <GloBadge status="error">Overdue</GloBadge>
        </GloBadgeGroup>
    );
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Badge content |
| `label` | `string` | `null` | Alternative to children |
| `icon` | `string` | `null` | Left icon |
| `iconRight` | `string` | `null` | Right icon |
| `variant` | `string` | `"filled"` | `"filled"` \| `"outlined"` \| `"soft"` \| `"dot"` |
| `size` | `string` | `"medium"` | `"small"` \| `"medium"` \| `"large"` |
| `status` | `string` | `null` | `"success"` \| `"warning"` \| `"error"` \| `"info"` \| `"neutral"` \| `"primary"` |
| `color` | `string` | `null` | Custom color (overrides status) |
| `rounded` | `boolean` | `true` | Pill shape |
| `clickable` | `boolean` | `false` | Make clickable |
| `removable` | `boolean` | `false` | Show remove button |
| `onClick` | `function` | `null` | Click handler |
| `onRemove` | `function` | `null` | Remove handler |
| `glow` | `boolean` | `false` | Enable glow |
| `pulse` | `boolean` | `false` | Pulse animation |
| `style` | `object` | `{}` | Additional styles |

### GloBadgeGroup Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Badge elements |
| `gap` | `string` | `"8px"` | Gap between badges |
| `wrap` | `boolean` | `true` | Wrap badges |

### Examples

```javascript
// Status badges
<GloBadge status="success">Complete</GloBadge>
<GloBadge status="warning">Pending</GloBadge>
<GloBadge status="error">Overdue</GloBadge>
<GloBadge status="info">New</GloBadge>

// Variants
<GloBadge variant="filled">Filled</GloBadge>
<GloBadge variant="soft">Soft</GloBadge>
<GloBadge variant="outlined">Outlined</GloBadge>
<GloBadge variant="dot">With Dot</GloBadge>

// With icons
<GloBadge icon="🏷️" variant="soft">Tag</GloBadge>
<GloBadge icon="⭐" status="warning">Featured</GloBadge>

// Custom color
<GloBadge color="#9333ea">Custom Purple</GloBadge>

// Removable
<GloBadge 
    removable 
    onRemove={() => console.log("Removed!")}
>
    Removable Tag
</GloBadge>

// With effects
<GloBadge glow={true}>Glowing</GloBadge>
<GloBadge pulse={true} status="error">Alert</GloBadge>

// Badge group
<GloBadgeGroup>
    <GloBadge>Tag 1</GloBadge>
    <GloBadge>Tag 2</GloBadge>
    <GloBadge>Tag 3</GloBadge>
</GloBadgeGroup>
```

---

## Utility Components

### ColorPicker

HSV color picker with presets.

**File:** `System/Scripts/Components/dc-colorPicker.jsx`

```javascript
const { ColorPicker } = await dc.require(
    dc.fileLink("System/Scripts/Components/dc-colorPicker.jsx")
);

<ColorPicker 
    value="#ff69b4"
    onChange={(color) => console.log("Selected:", color)}
    showPresets={true}
/>
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | `"#ff69b4"` | Current color (hex) |
| `onChange` | `function` | - | Color change handler |
| `showPresets` | `boolean` | `true` | Show preset palettes |
| `size` | `number` | `200` | Picker size in pixels |

---

### GradientBuilder

Visual gradient editor.

**File:** `System/Scripts/Components/dc-gradientBuilder.jsx`

```javascript
const { GradientBuilder } = await dc.require(
    dc.fileLink("System/Scripts/Components/dc-gradientBuilder.jsx")
);

<GradientBuilder 
    value="linear-gradient(90deg, #ff69b4, #00bcd4)"
    onChange={(gradient) => console.log("Gradient:", gradient)}
/>
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | `""` | Current gradient CSS |
| `onChange` | `function` | - | Gradient change handler |
| `showPresets` | `boolean` | `true` | Show preset gradients |

**Features:**
- Linear, radial, conic gradient support
- Direction selector (8 directions for linear)
- Add/remove color stops
- Position sliders for each stop
- 10 preset gradients
- Shows CSS output

---

### BackgroundPicker

Combined color/gradient/image picker.

**File:** `System/Scripts/Components/dc-backgroundPicker.jsx`

```javascript
const { BackgroundPicker } = await dc.require(
    dc.fileLink("System/Scripts/Components/dc-backgroundPicker.jsx")
);

<BackgroundPicker 
    value="linear-gradient(135deg, #667eea, #764ba2)"
    onChange={(bg) => console.log("Background:", bg)}
/>
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | `""` | Current background value |
| `onChange` | `function` | - | Background change handler |
| `label` | `string` | `null` | Label above picker |

**Features:**
- Tab selector: Color / Gradient / Image
- Color mode: Full ColorPicker
- Gradient mode: Full GradientBuilder
- Image mode: Base64 upload or URL paste
- Auto-detects type from value

---

## Shared Animations

Located in `System/Scripts/Styles/dc-components.css`:

| Animation | Description |
|-----------|-------------|
| `dc-anim-squish` | Squish/stretch effect |
| `dc-anim-spin` | 360° rotation |
| `dc-anim-twist` | Left-right twist |
| `dc-anim-jiggle` | Quick shake |
| `dc-anim-bounce` | Bounce up/down |
| `dc-anim-pulse` | Scale pulse |
| `dc-anim-wiggle` | Rotation wiggle |
| `dc-anim-flip` | Y-axis flip |
| `dc-rainbow-text` | Rainbow gradient text |
| `dc-spin` | Loading spinner |
| `dc-pulse-anim` | Subtle pulse for badges |

Loop variants (for held states): `dc-anim-*-loop`

---

## Related Documentation

- [ARCHITECTURE.md](./ARCHITECTURE.md) - System overview
- [THEME-SYSTEM.md](./THEME-SYSTEM.md) - Theme system deep-dive
- [Dashboards/Component-Test.md](./Dashboards/Component-Test.md) - Live demos
