---
tags:
  - test
  - components
cssclasses:
  - dashboard
demo_toggle: false
night_mode: false
feature_enabled: false
progress_value: 35
water_intake: 2900
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

## Render the Component Directly

You can also render the built-in demo:

```datacorejsx
const script = await dc.require(dc.fileLink("System/Scripts/Components/dc-gloButton.jsx"));
return script.renderedView;
```
