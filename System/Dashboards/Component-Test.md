---
tags:
  - test
  - components
  - dashboard
cssclasses:
  - dashboard
demo_toggle: false
night_mode: false
feature_enabled: false
progress_value: 37
water_intake: 2200
---

# Component Test Dashboard

This note tests the new global component library.

---

## dc-gloButton Demo

```datacorejsx
const { GloButton } = await dc.require(dc.fileLink("System/Scripts/Components/dc-gloButton.jsx"));

return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '1rem'}}>
        
        {/* Variants */}
        <div>
            <h4 style={{margin: '0 0 0.5rem 0', color: '#888'}}>Variants</h4>
            <div style={{display: 'flex', gap: '0.5rem', flexWrap: 'wrap'}}>
                <GloButton label="Primary" onClick={() => new Notice('Primary clicked!')} />
                <GloButton label="Secondary" variant="secondary" onClick={() => new Notice('Secondary!')} />
                <GloButton label="Ghost" variant="ghost" onClick={() => new Notice('Ghost!')} />
            </div>
        </div>
        
        {/* Sizes */}
        <div>
            <h4 style={{margin: '0 0 0.5rem 0', color: '#888'}}>Sizes</h4>
            <div style={{display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap'}}>
                <GloButton label="Small" size="small" onClick={() => {}} />
                <GloButton label="Medium" size="medium" onClick={() => {}} />
                <GloButton label="Large" size="large" onClick={() => {}} />
            </div>
        </div>
        
        {/* Effects */}
        <div>
            <h4 style={{margin: '0 0 0.5rem 0', color: '#888'}}>Effects (hover to see)</h4>
            <div style={{display: 'flex', gap: '0.5rem', flexWrap: 'wrap'}}>
                <GloButton label="Rainbow!" rainbow={true} onClick={() => {}} />
                <GloButton label="Glow Only" lift={false} press={false} onClick={() => {}} />
                <GloButton label="Lift Only" glow={false} press={false} onClick={() => {}} />
                <GloButton label="No Effects" glow={false} lift={false} press={false} onClick={() => {}} />
            </div>
        </div>
        
        {/* Icons */}
        <div>
            <h4 style={{margin: '0 0 0.5rem 0', color: '#888'}}>With Icons</h4>
            <div style={{display: 'flex', gap: '0.5rem', flexWrap: 'wrap'}}>
                <GloButton label="Rocket" icon="🚀" onClick={() => {}} />
                <GloButton label="Next" iconRight="→" onClick={() => {}} />
                <GloButton label="Both" icon="⭐" iconRight="✨" onClick={() => {}} />
                <GloButton label="Cat" icon="🐱" rainbow={true} onClick={() => {}} />
            </div>
        </div>
        
        {/* Sprite Buttons (click to animate!) */}
        <div>
            <h4 style={{margin: '0 0 0.5rem 0', color: '#888'}}>With Sprite (click to animate!)</h4>
            <div style={{display: 'flex', gap: '0.5rem', flexWrap: 'wrap'}}>
                <GloButton label="Nyan!" showSprite={true} onClick={() => {}} />
                <GloButton label="Right Side" showSprite={true} spritePosition="right" onClick={() => {}} />
                <GloButton label="Rainbow Sprite" showSprite={true} rainbow={true} onClick={() => {}} />
            </div>
        </div>
        
        {/* States */}
        <div>
            <h4 style={{margin: '0 0 0.5rem 0', color: '#888'}}>States</h4>
            <div style={{display: 'flex', gap: '0.5rem', flexWrap: 'wrap'}}>
                <GloButton label="Normal" onClick={() => {}} />
                <GloButton label="Active" active={true} onClick={() => {}} />
                <GloButton label="Disabled" disabled={true} onClick={() => {}} />
                <GloButton label="Loading" loading={true} onClick={() => {}} />
            </div>
        </div>
        
        {/* Mixed */}
        <div>
            <h4 style={{margin: '0 0 0.5rem 0', color: '#888'}}>Combinations</h4>
            <div style={{display: 'flex', gap: '0.5rem', flexWrap: 'wrap'}}>
                <GloButton 
                    label="Rainbow Ghost" 
                    variant="ghost" 
                    rainbow={true} 
                    icon="🌈" 
                    onClick={() => new Notice('Rainbow Ghost!')} 
                />
                <GloButton 
                    label="Large Secondary" 
                    variant="secondary" 
                    size="large" 
                    icon="💫" 
                    onClick={() => {}} 
                />
                <GloButton 
                    label="Small Active" 
                    size="small" 
                    active={true} 
                    onClick={() => {}} 
                />
            </div>
        </div>
        
    </div>
);
```

---

## dc-gloToggle Demo

```datacorejsx
const { GloToggle } = await dc.require(dc.fileLink("System/Scripts/Components/dc-gloToggle.jsx"));

return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '1rem'}}>
        
        {/* Basic Toggle */}
        <div>
            <h4 style={{margin: '0 0 0.5rem 0', color: '#888'}}>Basic Toggle (uses theme labels)</h4>
            <div style={{display: 'flex', gap: '1rem', flexWrap: 'wrap'}}>
                <GloToggle targetKey="night_mode" />
            </div>
        </div>
        
        {/* Custom Labels */}
        <div>
            <h4 style={{margin: '0 0 0.5rem 0', color: '#888'}}>Custom Labels</h4>
            <div style={{display: 'flex', gap: '1rem', flexWrap: 'wrap'}}>
                <GloToggle 
                    targetKey="feature_enabled"
                    onLabel="Feature ON"
                    offLabel="Feature OFF"
                    onSub="All systems go!"
                    offSub="Click to enable"
                />
            </div>
        </div>
        
        {/* Without Sprite */}
        <div>
            <h4 style={{margin: '0 0 0.5rem 0', color: '#888'}}>Without Sprite</h4>
            <div style={{display: 'flex', gap: '1rem', flexWrap: 'wrap'}}>
                <GloToggle 
                    targetKey="demo_toggle"
                    showSprite={false}
                    onLabel="Enabled"
                    offLabel="Disabled"
                    width="150px"
                />
            </div>
        </div>
        
        {/* Effects Variations */}
        <div>
            <h4 style={{margin: '0 0 0.5rem 0', color: '#888'}}>Effect Variations</h4>
            <div style={{display: 'flex', gap: '1rem', flexWrap: 'wrap'}}>
                <GloToggle 
                    targetKey="demo_toggle"
                    rainbow={false}
                    onLabel="No Rainbow"
                    offLabel="No Rainbow"
                />
                <GloToggle 
                    targetKey="demo_toggle"
                    glow={false}
                    onLabel="No Glow"
                    offLabel="No Glow"
                />
            </div>
        </div>
        
    </div>
);
```

---

## dc-gloBar Demo

```datacorejsx
const { GloBar } = await dc.require(dc.fileLink("System/Scripts/Components/dc-gloBar.jsx"));

return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '2rem', padding: '1rem', maxWidth: '450px'}}>
        
        {/* Basic Progress */}
        <div>
            <h4 style={{margin: '0 0 0.5rem 0', color: '#888'}}>Basic Progress Bar</h4>
            <GloBar 
                value={65}
                label="Project Progress"
            />
        </div>
        
        {/* Frontmatter-bound draggable */}
        <div>
            <h4 style={{margin: '0 0 0.5rem 0', color: '#888'}}>Draggable (Bound to Frontmatter)</h4>
            <GloBar 
                targetKey="progress_value"
                label="Drag to set value"
                draggable={true}
            />
            <div style={{fontSize: '11px', color: '#666', marginTop: '4px'}}>
                Click the sprite for animation! Drag to change value.
            </div>
        </div>
        
        {/* Custom max value */}
        <div>
            <h4 style={{margin: '0 0 0.5rem 0', color: '#888'}}>Custom Max (Water Tracker)</h4>
            <GloBar 
                targetKey="water_intake"
                max={3500}
                label="Water Intake (ml)"
                draggable={true}
                step={100}
                valueFormat={(v, m) => `${v}ml / ${m}ml`}
            />
        </div>
        
        {/* Different animations - all draggable */}
        <div>
            <h4 style={{margin: '0 0 0.5rem 0', color: '#888'}}>Animation Variations (click sprite to animate!)</h4>
            <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                <GloBar value={50} label="Squish" clickAnimation="squish" draggable={true} />
                <GloBar value={50} label="Spin" clickAnimation="spin" draggable={true} />
                <GloBar value={50} label="Jiggle" clickAnimation="jiggle" draggable={true} />
                <GloBar value={50} label="Bounce" clickAnimation="bounce" draggable={true} />
                <GloBar value={50} label="Twist" clickAnimation="twist" draggable={true} />
                <GloBar value={50} label="Pulse" clickAnimation="pulse" draggable={true} />
                <GloBar value={50} label="Wiggle" clickAnimation="wiggle" draggable={true} />
                <GloBar value={50} label="Flip" clickAnimation="flip" draggable={true} />
            </div>
        </div>
        
        {/* Without sprite */}
        <div>
            <h4 style={{margin: '0 0 0.5rem 0', color: '#888'}}>Without Sprite</h4>
            <GloBar 
                value={80}
                label="Simple Progress"
                showSprite={false}
                showPercentage={true}
            />
        </div>
        
    </div>
);
```

---

## Quick Reference

### GloButton Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | string | required | Button text |
| `onClick` | function | `() => {}` | Click handler |
| `variant` | string | `"primary"` | `"primary"`, `"secondary"`, `"ghost"` |
| `size` | string | `"medium"` | `"small"`, `"medium"`, `"large"` |
| `bg` | string | theme | Custom background (base64/gradient/color) |
| `hoverBg` | string | theme | Custom hover background |
| `activeBg` | string | theme | Custom active background |
| `glow` | boolean | `true` | Enable glow on hover |
| `lift` | boolean | `true` | Enable lift on hover |
| `press` | boolean | `true` | Enable press on click |
| `rainbow` | boolean | `false` | Rainbow text on hover |
| `icon` | string | `null` | Left icon/emoji |
| `iconRight` | string | `null` | Right icon/emoji |
| `disabled` | boolean | `false` | Disable button |
| `loading` | boolean | `false` | Show loading spinner |
| `active` | boolean | `false` | Force active state |
| `flashy` | boolean | auto | Override flashy mode |

### GloButton Usage

```javascript
const { GloButton } = await dc.require(
    dc.fileLink("System/Scripts/Components/dc-gloButton.jsx")
);

<GloButton 
    label="Click Me" 
    icon="🎉" 
    rainbow={true}
    onClick={() => new Notice('Clicked!')} 
/>
```

### GloToggle Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `targetKey` | string | required | Frontmatter key to toggle |
| `targetFile` | string | `null` | File path (null = current file) |
| `onLabel` | string | theme | Label when ON |
| `offLabel` | string | theme | Label when OFF |
| `onSub` | string | theme | Sub-label when ON |
| `offSub` | string | theme | Sub-label when OFF |
| `showSprite` | boolean | `true` | Show theme sprite |
| `sprite` | string | theme | Custom sprite base64 |
| `idleBg` | string | theme | Background when OFF |
| `hoverBg` | string | theme | Background on hover |
| `activeBg` | string | theme | Background when ON |
| `glow` | boolean | `true` | Enable glow effects |
| `lift` | boolean | `true` | Enable lift on hover |
| `press` | boolean | `true` | Enable press effect |
| `rainbow` | boolean | `true` | Rainbow text on hover/active |
| `width` | string | `"220px"` | Container width |
| `onChange` | function | `null` | Callback with new value |

### GloToggle Usage

```javascript
const { GloToggle } = await dc.require(
    dc.fileLink("System/Scripts/Components/dc-gloToggle.jsx")
);

<GloToggle 
    targetKey="night_mode"
    onLabel="Night Mode ON"
    offLabel="Night Mode OFF"
    onChange={(value) => console.log('Toggled to:', value)}
/>
```

### GloBar Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | number | `null` | Controlled value |
| `max` | number | `100` | Maximum value |
| `targetKey` | string | `null` | Frontmatter key to bind |
| `targetFile` | string | `null` | File path (null = current) |
| `label` | string | `null` | Label text above bar |
| `showValue` | boolean | `true` | Show value text |
| `valueFormat` | function | `null` | Custom format: `(value, max) => string` |
| `showPercentage` | boolean | `false` | Show as percentage |
| `showSprite` | boolean | `true` | Show theme sprite |
| `sprite` | string | theme | Custom sprite base64 |
| `clickAnimation` | string | theme | squish, spin, twist, jiggle, bounce, pulse, wiggle, flip, none |
| `draggable` | boolean | `false` | Enable drag to set value |
| `step` | number | `1` | Step size when dragging |
| `trackBg` | string | theme | Track background |
| `fillGradient` | string | theme | Fill gradient |
| `height` | string | theme | Bar height |
| `onChange` | function | `null` | Callback with new value |

### GloBar Usage

```javascript
const { GloBar } = await dc.require(
    dc.fileLink("System/Scripts/Components/dc-gloBar.jsx")
);

// Simple progress
<GloBar value={75} label="Progress" />

// Frontmatter-bound draggable
<GloBar 
    targetKey="water_intake"
    max={3500}
    label="Water (ml)"
    draggable={true}
    step={100}
/>

// Custom animation
<GloBar 
    value={50}
    clickAnimation="spin"
/>
```

---

## dc-gloSelect Demo

```datacorejsx
const { GloSelect } = await dc.require(dc.fileLink("System/Scripts/Components/dc-gloSelect.jsx"));

return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '1rem', maxWidth: '350px'}}>
        
        {/* Basic select with icons */}
        <div>
            <h4 style={{margin: '0 0 0.5rem 0', color: '#888'}}>Basic Select</h4>
            <GloSelect 
                label="Meal Category"
                options={[
                    { value: "breakfast", label: "Breakfast", icon: "🍳" },
                    { value: "lunch", label: "Lunch", icon: "🥗" },
                    { value: "dinner", label: "Dinner", icon: "🍝" },
                    { value: "snack", label: "Snack", icon: "🍿" },
                ]}
                placeholder="Choose a meal..."
                onChange={(v) => new Notice('Selected: ' + v)}
            />
        </div>
        
        {/* Searchable */}
        <div>
            <h4 style={{margin: '0 0 0.5rem 0', color: '#888'}}>Searchable</h4>
            <GloSelect 
                label="Search Fruits"
                options={["Apple", "Banana", "Cherry", "Date", "Elderberry", "Fig", "Grape", "Honeydew"]}
                searchable={true}
                placeholder="Type to search..."
            />
        </div>
        
        {/* Multiple selection */}
        <div>
            <h4 style={{margin: '0 0 0.5rem 0', color: '#888'}}>Multiple Selection</h4>
            <GloSelect 
                label="Workout Types"
                options={[
                    { value: "strength", label: "Strength", icon: "💪" },
                    { value: "cardio", label: "Cardio", icon: "🏃" },
                    { value: "flexibility", label: "Flexibility", icon: "🧘" },
                    { value: "balance", label: "Balance", icon: "⚖️" },
                ]}
                multiple={true}
                placeholder="Select types..."
            />
        </div>
        
        {/* Sizes */}
        <div>
            <h4 style={{margin: '0 0 0.5rem 0', color: '#888'}}>Sizes</h4>
            <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                <GloSelect options={["Small option"]} size="small" placeholder="Small" />
                <GloSelect options={["Medium option"]} size="medium" placeholder="Medium" />
                <GloSelect options={["Large option"]} size="large" placeholder="Large" />
            </div>
        </div>
        
    </div>
);
```

---

## dc-gloCard Demo

```datacorejsx
const { GloCard } = await dc.require(dc.fileLink("System/Scripts/Components/dc-gloCard.jsx"));
const { GloButton } = await dc.require(dc.fileLink("System/Scripts/Components/dc-gloButton.jsx"));

return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '1rem', maxWidth: '400px'}}>
        
        {/* Basic card */}
        <div>
            <h4 style={{margin: '0 0 0.5rem 0', color: '#888'}}>Basic Card</h4>
            <GloCard 
                title="Project Update"
                subtitle="Last updated today"
                icon="📋"
            >
                <p style={{margin: 0}}>This is the card body. Cards are great for grouping related content together.</p>
            </GloCard>
        </div>
        
        {/* With footer and actions */}
        <div>
            <h4 style={{margin: '0 0 0.5rem 0', color: '#888'}}>With Footer & Actions</h4>
            <GloCard 
                title="Task Card"
                icon="✅"
                actions={<GloButton label="Edit" size="small" variant="ghost" onClick={() => {}} />}
                footer={<span>Due: Tomorrow</span>}
            >
                <p style={{margin: 0}}>Complete the component library.</p>
            </GloCard>
        </div>
        
        {/* Collapsible */}
        <div>
            <h4 style={{margin: '0 0 0.5rem 0', color: '#888'}}>Collapsible</h4>
            <GloCard 
                title="Click to Collapse"
                icon="📁"
                collapsible={true}
            >
                <p style={{margin: 0}}>This content can be collapsed by clicking the header!</p>
            </GloCard>
        </div>
        
        {/* Variants */}
        <div>
            <h4 style={{margin: '0 0 0.5rem 0', color: '#888'}}>Variants</h4>
            <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                <GloCard variant="default" title="Default" size="small">
                    <span>Standard card</span>
                </GloCard>
                <GloCard variant="glass" title="Glass" size="small" glow={true}>
                    <span>Glass morphism effect</span>
                </GloCard>
                <GloCard variant="elevated" title="Elevated" size="small">
                    <span>Elevated shadow</span>
                </GloCard>
                <GloCard variant="outlined" title="Outlined" size="small">
                    <span>Border only</span>
                </GloCard>
            </div>
        </div>
        
    </div>
);
```

---

## dc-gloTabs Demo

```datacorejsx
const { GloTabs } = await dc.require(dc.fileLink("System/Scripts/Components/dc-gloTabs.jsx"));

return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '2rem', padding: '1rem', maxWidth: '500px'}}>
        
        {/* Underline (default) */}
        <div>
            <h4 style={{margin: '0 0 0.5rem 0', color: '#888'}}>Underline Tabs</h4>
            <GloTabs 
                tabs={[
                    { id: "today", label: "Today", icon: "📅", content: <p>Today's tasks and events appear here.</p> },
                    { id: "week", label: "This Week", icon: "📆", content: <p>Weekly overview with all scheduled items.</p> },
                    { id: "month", label: "Month", icon: "🗓️", content: <p>Monthly summary and statistics.</p> },
                ]}
            />
        </div>
        
        {/* Pills */}
        <div>
            <h4 style={{margin: '0 0 0.5rem 0', color: '#888'}}>Pills Tabs</h4>
            <GloTabs 
                variant="pills"
                tabs={[
                    { id: "all", label: "All", content: <p>All items displayed here.</p> },
                    { id: "active", label: "Active", content: <p>Active items only.</p> },
                    { id: "completed", label: "Completed", content: <p>Completed items.</p> },
                ]}
            />
        </div>
        
        {/* Boxed */}
        <div>
            <h4 style={{margin: '0 0 0.5rem 0', color: '#888'}}>Boxed Tabs</h4>
            <GloTabs 
                variant="boxed"
                tabs={[
                    { id: "overview", label: "Overview", icon: "📊" },
                    { id: "details", label: "Details", icon: "📝" },
                    { id: "settings", label: "Settings", icon: "⚙️", disabled: true },
                ]}
                renderContent={false}
            />
        </div>
        
        {/* Stretch alignment */}
        <div>
            <h4 style={{margin: '0 0 0.5rem 0', color: '#888'}}>Stretched Pills</h4>
            <GloTabs 
                variant="pills"
                align="stretch"
                size="small"
                tabs={[
                    { id: "1", label: "Tab One" },
                    { id: "2", label: "Tab Two" },
                    { id: "3", label: "Tab Three" },
                ]}
                renderContent={false}
            />
        </div>
        
    </div>
);
```

---

## dc-gloBadge Demo

```datacorejsx
const { GloBadge, GloBadgeGroup } = await dc.require(dc.fileLink("System/Scripts/Components/dc-gloBadge.jsx"));

return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '1rem', maxWidth: '450px'}}>
        
        {/* Status badges */}
        <div>
            <h4 style={{margin: '0 0 0.5rem 0', color: '#888'}}>Status Badges</h4>
            <GloBadgeGroup>
                <GloBadge status="success">Complete</GloBadge>
                <GloBadge status="warning">Pending</GloBadge>
                <GloBadge status="error">Overdue</GloBadge>
                <GloBadge status="info">New</GloBadge>
                <GloBadge status="neutral">Draft</GloBadge>
            </GloBadgeGroup>
        </div>
        
        {/* Variants */}
        <div>
            <h4 style={{margin: '0 0 0.5rem 0', color: '#888'}}>Variants</h4>
            <GloBadgeGroup>
                <GloBadge variant="filled">Filled</GloBadge>
                <GloBadge variant="soft">Soft</GloBadge>
                <GloBadge variant="outlined">Outlined</GloBadge>
                <GloBadge variant="dot">With Dot</GloBadge>
            </GloBadgeGroup>
        </div>
        
        {/* With icons */}
        <div>
            <h4 style={{margin: '0 0 0.5rem 0', color: '#888'}}>With Icons</h4>
            <GloBadgeGroup>
                <GloBadge icon="🏷️" variant="soft">Tag</GloBadge>
                <GloBadge icon="⭐" status="warning" variant="soft">Featured</GloBadge>
                <GloBadge icon="🔥" color="#ff4500" variant="soft">Hot</GloBadge>
            </GloBadgeGroup>
        </div>
        
        {/* Removable */}
        <div>
            <h4 style={{margin: '0 0 0.5rem 0', color: '#888'}}>Removable Tags</h4>
            <GloBadgeGroup>
                <GloBadge removable onRemove={() => new Notice('Remove 1')}>Breakfast</GloBadge>
                <GloBadge removable onRemove={() => new Notice('Remove 2')} status="info">Lunch</GloBadge>
                <GloBadge removable onRemove={() => new Notice('Remove 3')} color="#9333ea">Dinner</GloBadge>
            </GloBadgeGroup>
        </div>
        
        {/* Effects */}
        <div>
            <h4 style={{margin: '0 0 0.5rem 0', color: '#888'}}>Effects</h4>
            <GloBadgeGroup>
                <GloBadge glow={true}>Glow</GloBadge>
                <GloBadge pulse={true} status="error">Pulse</GloBadge>
                <GloBadge glow={true} status="success" variant="soft">Success Glow</GloBadge>
            </GloBadgeGroup>
        </div>
        
        {/* Sizes */}
        <div>
            <h4 style={{margin: '0 0 0.5rem 0', color: '#888'}}>Sizes</h4>
            <GloBadgeGroup>
                <GloBadge size="small" variant="soft">Small</GloBadge>
                <GloBadge size="medium" variant="soft">Medium</GloBadge>
                <GloBadge size="large" variant="soft">Large</GloBadge>
            </GloBadgeGroup>
        </div>
        
    </div>
);
```

---

## dc-gloInput Demo

```datacorejsx
const { GloInput } = await dc.require(dc.fileLink("System/Scripts/Components/dc-gloInput.jsx"));

return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '1rem', maxWidth: '350px'}}>
        
        {/* Basic inputs */}
        <div>
            <h4 style={{margin: '0 0 0.5rem 0', color: '#888'}}>Basic Inputs</h4>
            <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                <GloInput 
                    label="Name"
                    placeholder="Enter your name..."
                    helperText="Your display name"
                />
                <GloInput 
                    label="Search"
                    placeholder="Search notes..."
                    iconLeft="🔍"
                    clearable={true}
                />
            </div>
        </div>
        
        {/* Validation */}
        <div>
            <h4 style={{margin: '0 0 0.5rem 0', color: '#888'}}>With Validation</h4>
            <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                <GloInput 
                    label="Email"
                    type="email"
                    placeholder="you@example.com"
                    required={true}
                    iconLeft="✉️"
                />
                <GloInput 
                    label="Quantity"
                    type="number"
                    placeholder="0"
                    min={0}
                    max={100}
                    helperText="Enter a number between 0-100"
                />
            </div>
        </div>
        
        {/* Textarea */}
        <div>
            <h4 style={{margin: '0 0 0.5rem 0', color: '#888'}}>Textarea</h4>
            <GloInput 
                label="Notes"
                type="textarea"
                placeholder="Write your notes here..."
                rows={4}
            />
        </div>
        
        {/* Variants */}
        <div>
            <h4 style={{margin: '0 0 0.5rem 0', color: '#888'}}>Variants</h4>
            <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                <GloInput variant="default" placeholder="Default variant" />
                <GloInput variant="filled" placeholder="Filled variant" />
                <GloInput variant="ghost" placeholder="Ghost variant" />
            </div>
        </div>
        
        {/* Sizes */}
        <div>
            <h4 style={{margin: '0 0 0.5rem 0', color: '#888'}}>Sizes</h4>
            <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                <GloInput size="small" placeholder="Small input" />
                <GloInput size="medium" placeholder="Medium input" />
                <GloInput size="large" placeholder="Large input" />
            </div>
        </div>
        
    </div>
);
```

---

## Quick Reference - New Components

### GloSelect

```javascript
const { GloSelect } = await dc.require(
    dc.fileLink("System/Scripts/Components/dc-gloSelect.jsx")
);

<GloSelect 
    label="Category"
    options={[
        { value: "a", label: "Option A", icon: "🅰️" },
        { value: "b", label: "Option B", icon: "🅱️" },
    ]}
    searchable={true}
    multiple={false}
    onChange={(value) => console.log(value)}
/>
```

### GloCard

```javascript
const { GloCard } = await dc.require(
    dc.fileLink("System/Scripts/Components/dc-gloCard.jsx")
);

<GloCard 
    title="My Card"
    subtitle="Description"
    icon="📦"
    variant="glass"
    collapsible={true}
    footer={<span>Footer text</span>}
>
    Card content here
</GloCard>
```

### GloTabs

```javascript
const { GloTabs } = await dc.require(
    dc.fileLink("System/Scripts/Components/dc-gloTabs.jsx")
);

<GloTabs 
    variant="pills"
    tabs={[
        { id: "tab1", label: "Tab 1", icon: "📋", content: <p>Content 1</p> },
        { id: "tab2", label: "Tab 2", icon: "📊", content: <p>Content 2</p> },
    ]}
/>
```

### GloBadge

```javascript
const { GloBadge, GloBadgeGroup } = await dc.require(
    dc.fileLink("System/Scripts/Components/dc-gloBadge.jsx")
);

<GloBadgeGroup>
    <GloBadge status="success" icon="✓">Done</GloBadge>
    <GloBadge status="warning" variant="soft">Pending</GloBadge>
    <GloBadge removable onRemove={() => {}}>Tag</GloBadge>
</GloBadgeGroup>
```

### GloInput

```javascript
const { GloInput } = await dc.require(
    dc.fileLink("System/Scripts/Components/dc-gloInput.jsx")
);

<GloInput 
    label="Email"
    type="email"
    placeholder="Enter email..."
    required={true}
    iconLeft="✉️"
    clearable={true}
    onChange={(value) => console.log(value)}
/>
```

---

## Gradient Utilities Demo

```datacorejsx
const { GloBar } = await dc.require(dc.fileLink("System/Scripts/Components/dc-gloBar.jsx"));
const { 
    getPreset, 
    createLinear, 
    createStripes, 
    createFromPalette,
    createSimple,
    GRADIENT_PRESETS 
} = await dc.require(dc.fileLink("System/Scripts/Core/dc-gradientUtils.jsx"));

return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '2rem', padding: '1rem', maxWidth: '500px'}}>
        
        {/* Preset gradients */}
        <div>
            <h4 style={{margin: '0 0 0.5rem 0', color: '#888'}}>Preset Gradients (getPreset)</h4>
            <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                {["rainbow", "sunset", "ocean", "neonPink", "cyberpunk", "fire", "forest", "synthwave"].map(name => (
                    <div key={name} style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                        <div style={{
                            width: '150px',
                            height: '20px',
                            background: getPreset(name),
                            borderRadius: '4px',
                        }} />
                        <span style={{fontSize: '12px', color: '#aaa', fontFamily: 'monospace'}}>{name}</span>
                    </div>
                ))}
            </div>
        </div>
        
        {/* Created with helpers */}
        <div>
            <h4 style={{margin: '0 0 0.5rem 0', color: '#888'}}>Created with Helper Functions</h4>
            <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                    <div style={{
                        width: '150px',
                        height: '20px',
                        background: createSimple("#ff69b4", "#6633ff"),
                        borderRadius: '4px',
                    }} />
                    <span style={{fontSize: '11px', color: '#666', fontFamily: 'monospace'}}>createSimple("#ff69b4", "#6633ff")</span>
                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                    <div style={{
                        width: '150px',
                        height: '20px',
                        background: createLinear(["#ff0000", "#00ff00", "#0000ff"], { hard: true }),
                        borderRadius: '4px',
                    }} />
                    <span style={{fontSize: '11px', color: '#666', fontFamily: 'monospace'}}>createLinear([...], {`{hard: true}`})</span>
                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                    <div style={{
                        width: '150px',
                        height: '20px',
                        background: createStripes(["#ff69b4", "#1a1a2e"], { stripeWidth: 8, direction: "diagonal" }),
                        borderRadius: '4px',
                    }} />
                    <span style={{fontSize: '11px', color: '#666', fontFamily: 'monospace'}}>createStripes([...], {`{stripeWidth: 8}`})</span>
                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                    <div style={{
                        width: '150px',
                        height: '20px',
                        background: createFromPalette("sunset"),
                        borderRadius: '4px',
                    }} />
                    <span style={{fontSize: '11px', color: '#666', fontFamily: 'monospace'}}>createFromPalette("sunset")</span>
                </div>
            </div>
        </div>
        
        {/* Progress bars with custom gradients */}
        <div>
            <h4 style={{margin: '0 0 0.5rem 0', color: '#888'}}>GloBar with Custom Gradients</h4>
            <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                <GloBar 
                    value={75}
                    label="Preset: Ocean"
                    fillGradient={getPreset("ocean")}
                    showSprite={false}
                />
                <GloBar 
                    value={60}
                    label="Custom: Pink to Purple"
                    fillGradient={createSimple("#ff69b4", "#6633ff")}
                    showSprite={false}
                />
                <GloBar 
                    value={85}
                    label="Hard Rainbow"
                    fillGradient={createFromPalette("rainbow", { hard: true, direction: "horizontal" })}
                    showSprite={false}
                />
                <GloBar 
                    value={50}
                    label="Fire Gradient"
                    fillGradient={getPreset("fire")}
                    showSprite={false}
                />
            </div>
        </div>
        
    </div>
);
```

---

## Render Component Demos Directly

You can render the built-in demos for each component:

```datacorejsx
// Choose any component to see its demo
const script = await dc.require(dc.fileLink("System/Scripts/Components/dc-gloSelect.jsx"));
return script.renderedView;
```

```datacorejsx
// See all gradient presets
const script = await dc.require(dc.fileLink("System/Scripts/Core/dc-gradientUtils.jsx"));
return script.renderedView;
```
