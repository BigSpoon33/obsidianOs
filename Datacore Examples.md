---
created: 2025-12-20
tags:
  - note
  - journal
  - datacore
progress: 25
night_mode: false
type:
  - Dinner
water-ml: .nan
status: In Progress
particles: 95
system_power: false
safety_lock: false
---

# Ideas
- [ ]  Datacore architecture
	- [ ] standardize widget elements for example draggable bars, buttons, etc
	- [ ] create a more modular code architecture where style or theme is centralized and the .jsx and .css files pull from files so all widgets have a standardized format for example instead of coding slightly different draggable bars or buttons we can have one .jsx and one .css for a draggable bar so we are always using the same code. I don't know if you can actually call a .jsx file from another .jsx file but we can at least use the main one for reference so all the other code snippets use the same code. same idea with .css files keep the same patterns and architecture so we can always find or know where things are supposed to be. using variables that reference a themes, style, or aesthetic .css file that is the single source of truth
- [ ] daily quote
	- [x] quotes category
	- [ ] add aesthetic and theming
- [ ] welcome note with daytime logic
	- [x] welcome note works
	- [ ] I like the transparent view and include seconds similar to https://www.reddit.com/r/ObsidianMD/comments/1prfitg/my_homepage_and_vault_structure/
	- [ ] add aesthetic and theming
	- [ ] consider a more frequent timing update
- [ ] telemetry
	- [x] water tracking
	- [x] sleep tracking
	- [x] mood tracking
		- [ ] I think the evening emotion log is reverting to empty instead of loading the current frontmatter when the datacore codeblock is reloaded
	- [x] diet tracking
	- [ ] exercise tracking
	- [ ] weight tracker
	- [ ] https://gist.github.com/furbas16e8/61794d1cfbfd9477840c05fefa6b3551
- [ ] meal planner
	- [x] recipes category
		- [ ] I need to get the recipe Breakfast, Lunch, and Dinner, frontmatter to be in "[[]]" when you click the buttons in the widget. 
		- [ ] meal planner load doesn't update the frontmatter and the save button still dont work
		- [ ] web clipper recipe url to recipe note
		- [ ] recipes widget is doing that thing where it updates the frontmatter then reverts. I think we solved it by saving the ui values to the fast local memory and letting the obsidian file save happen in the background.
	- [x] build planner similar to the exercise example
	- [x] meal prep planner weekly
		- [ ] meal planner css broke
		- [ ] meal planner .base file needs to be fine tuned
	- [x] shopping list
- [ ] exercise planner
	- [x] exercise category
	- [x] move exercise notes into category
	- [x] get the settings to have a week planner with either a dropdown or autocomplete of workout-plans to select one for each day. or maybe more than one?
	- [ ] exercise tracking, completed workout as is? adjust reps, sets, weight in the daily note movement and exercise heading
	- [ ] maybe use recurring tasknotes to schedule workout (generic) and if it's completed then the full daliy workout gets logged
- [ ] recent notes
	- [x] could just use the plugin in the sidebar (using sidebar and a searchbar with recent files on the homepage)
- [ ] search bar
	- [x] could just be the hometab or above the navigation hub
- [ ] frogs on a log ribbit songs
	- [ ] advanced gif animation, keyframes, and sounds. like a digital auto-piano
- [ ] navigation hub
	- [x] categories
	- [ ] periodic notes
		- [x] daily
		- [ ] weekly
		- [ ] monthly
	- [x] dashboards
- [ ] calendar heat map
	- [x] https://gist.github.com/furbas16e8/61794d1cfbfd9477840c05fefa6b3551
	- [ ] got it working but need to adapt it to track my stuff
- [ ] periodic notes
	- [ ] daily
		- [x] journal entry system
		- [ ] evening journal? same thing as am but for nighttime
		- [ ] journal system is functional but needs fine tuning
		- [ ] aesthetic and theme
	- [ ] weekly
	- [ ] monthly
- [ ] task and project agenda
	- [ ] TaskNotes
		- [ ] design a recurring task system that is broader with subtasks. for example instead of tracking every workout track the whole workout plan. instead of every nighttime task just the nighttime routine. figure out how to get calendars synced both ways for phone notifications
		- [ ] notifications! can TaskNotes provide phone notifications? without calendar sync?
	- [x] sync to a calendar would be dope
		- [ ] calendar syncs from google to obsidian but not from obsidian to google - need to work on it
	- [x] pomodoro
	- [ ] agenda view - could just be an embedded base view listing all tasks
- [ ] themes
	- [ ] figure out the standard items that get swapped by aesthetic for eample icons of the drag bar, draggable bar background, track fill, welcome widget, buttons, text entries, journal, charts, backgrounds, transparent or boxes toggle, font used, vault pet/assistant?, banners, style settings themes for the minimal theme, all the widgets and trackers and stuff,
	- [ ] for the first set of dynamic gif buttons go with a blob, idle blob just is blobbing, mouseoverblob is blobbing more, click makes blob get blobbed.
	- [ ] seasonal
	- [ ] aesthetic
		- [ ] swamp
		- [ ] paper
		- [ ] vaporwave
	- [ ] get tons of transparent gifs placed into the note - a fly buzzing around, frogs hopping, running water, growing vines, flowers, etc. waving grass, campfires, flickering lantern, trees in the wind, breathing lizard, grazing cow, rolling waves, those cool spiraling ink blob kind of animations, 
	- [ ] figure out columns
- [ ] web clippings
	- [ ] auto recipe url to recipe note
- [ ] spaced repetition plugin
- [ ] random image switcher sidebar
	- [x] it works!
	- [ ] pinterest download board to vault. you can use other tools to do this and then copy them into a folder or vault root. 
	- [ ] image switcher option to look for images based on file extension .gif, .jpg, etc or by folder /Assets/
- [ ] possible to set values in .jsx from a Settings.md note in the vault. for example a setting for your favorite gif or image where you put the base 64 image string into the settings.md file?
- [ ] get themes to have settings for buttons. for example set the background, idle image, and click image. mouseover image?  we need to get the theme system on that new thing where users can input a custom base64 from their vault Settings.md note
- [ ] we need to get the theme system on that new thing where users can input a custom base64 from their vault Settings.md note
- [ ] I got to figure out columns. and bring my old columns css and noyaml css for this vault
- [ ]  need to clean up the System/Academic folder and get everything in place with the /System/Folder architecture
- [ ] academic dashboard needs a complete datacore rebuild
- [ ] draggable bar click options, squish, spin, twist, jiggle, etc. just changes the animation on the draggable bsae64 image


Query total # pages in vault
```markdown
```datacorejsx  
// All datacore views should return a React component; in practice, this is going to be  
return function View() {  
const pages = dc.useQuery("@page").length;  
  
return <p>You have {pages} pages in your vault!</p>;  
}
```

```datacorejsx  
// All datacore views should return a React component; in practice, this is going to be  
return function View() {  
const pages = dc.useQuery("@page").length;  
  
return <p>You have {pages} pages in your vault!</p>;  
}  
```

---
same as above but table view

```markdown
```datacorejsx  
// A list of columns to show in the table.  
const COLUMNS = [  
{ id: "Name", value: page => page.$link },  
{ id: "Rating", value: page => page.value("rating") }  
];  
  
return function View() {  
// Selecting `#game` pages, for example.  
const pages = dc.useQuery("@page and #game");  
  
// Uses the built in table component for showing objects in a table!  
return <dc.Table columns={COLUMNS} rows={pages} />;  
}
```

```datacorejsx  
// A list of columns to show in the table.  
const COLUMNS = [  
{ id: "Name", value: page => page.$link },  
{ id: "Rating", value: page => page.value("rating") }  
];  
  
return function View() {  
// Selecting `#game` pages, for example.  
const pages = dc.useQuery("@page and #game");  
  
// Uses the built in table component for showing objects in a table!  
return <dc.Table columns={COLUMNS} rows={pages} />;  
}  
```


## Nyan Cat Progress Bar


```datacorejsx
const scriptPath = "System/Scripts/widgets/dc-nyanCatProgress-draggable.jsx";  // ⬅️ replace it with your jsx file path!
const target = dc.fileLink(scriptPath);
const result = await dc.require(target);
const view = result?.renderedView ?? result?.View ?? result;  
const Func = result?.Func ?? null;

return function View() {
    const currentFile = dc.useCurrentFile();
    if (Func) {
        return Func({ currentFile, scriptPath });
    }
    return view ?? <p>Failed to render</p>;
}
```

```datacorejsx
const scriptPath = "System/Scripts/widgets/dc-mothToggle.jsx";  // ⬅️ replace it with your jsx file path!
const target = dc.fileLink(scriptPath);
const result = await dc.require(target);
const view = result?.renderedView ?? result?.View ?? result;  
const Func = result?.Func ?? null;

return function View() {
    const currentFile = dc.useCurrentFile();
    if (Func) {
        return Func({ currentFile, scriptPath });
    }
    return view ?? <p>Failed to render</p>;
}
```


```datacorejsx
const scriptPath = "System/Scripts/widgets/dc-swampBar.jsx";  // ⬅️ replace it with your jsx file path!
const target = dc.fileLink(scriptPath);
const result = await dc.require(target);
const view = result?.renderedView ?? result?.View ?? result;  
const Func = result?.Func ?? null;

return function View() {
    const currentFile = dc.useCurrentFile();
    if (Func) {
        return Func({ currentFile, scriptPath });
    }
    return view ?? <p>Failed to render</p>;
}
```

```datacorejsx
const scriptPath = "System/Scripts/widgets/dc-holoDropdown.jsx";  // ⬅️ replace it with your jsx file path!
const target = dc.fileLink(scriptPath);
const result = await dc.require(target);
const view = result?.renderedView ?? result?.View ?? result;  
const Func = result?.Func ?? null;

return function View() {
    const currentFile = dc.useCurrentFile();
    if (Func) {
        return Func({ currentFile, scriptPath });
    }
    return view ?? <p>Failed to render</p>;
}
```


```datacorejsx
const scriptPath = "System/Scripts/widgets/dc-artHelix.jsx";  // ⬅️ replace it with your jsx file path!
const target = dc.fileLink(scriptPath);
const result = await dc.require(target);
const view = result?.renderedView ?? result?.View ?? result;  
const Func = result?.Func ?? null;

return function View() {
    const currentFile = dc.useCurrentFile();
    if (Func) {
        return Func({ currentFile, scriptPath });
    }
    return view ?? <p>Failed to render</p>;
}
```

```datacorejsx
// 1. IMPORT YOUR COMPONENT LIBRARY
const barMod = await dc.require(dc.fileLink("System/Scripts/widgets/dc-universalBar.jsx"));
const displayMod = await dc.require(dc.fileLink("System/Scripts/widgets/dc-particleDisplay.jsx"));

// 2. EXTRACT COMPONENTS
const { Func: UniversalBar } = barMod;
const { ParticleDisplay } = displayMod;

// 3. DEFINE DASHBOARD
function MasterConsole() {
    return (
        <div className="master-console-container" style={{
            maxWidth: '500px', margin: '0 auto', 
            padding: '20px', border: '1px solid var(--background-modifier-border)',
            borderRadius: '12px', background: 'var(--background-secondary)'
        }}>
            <h2 style={{textAlign: 'center', borderBottom: '1px solid var(--background-modifier-border)', paddingBottom: '10px'}}>
                ENGINEERING CONSOLE
            </h2>

            {/* A. The Particle Window & Buttons */}
            <ParticleDisplay />

            <hr style={{margin: '20px 0', opacity: 0.2}}/>

            {/* B. Instance 1: Controls "progress" (Chaos) */}
            <UniversalBar 
                targetKey="progress" 
                label="System Chaos (Speed)" 
            />

            {/* C. Instance 2: Controls "particles" (Quantity) 
                Notice: This slider controls the same thing as the buttons above!
                They will stay in sync automatically because they watch the same data.
            */}
            <UniversalBar 
                targetKey="particles" 
                label="Particle Density (Fine Tune)" 
            />

        </div>
    );
}

return <MasterConsole />;
```

```datacorejsx
// 1. IMPORTS
const barMod = await dc.require(dc.fileLink("System/Scripts/widgets/dc-universalBar.jsx"));
const buttonMod = await dc.require(dc.fileLink("System/Scripts/widgets/dc-universalButton.jsx"));
const simMod = await dc.require(dc.fileLink("System/Scripts/widgets/dc-artParticle.jsx"));

// 2. EXTRACT
const { Func: UniversalBar } = barMod;
const { UniversalButton } = buttonMod;
const { ParticleSim } = simMod;

// 3. DASHBOARD
function MasterConsole() {
    return (
        <div className="master-console" style={{
            maxWidth: '600px', margin: '0 auto', padding: '20px', 
            background: '#1a1a1a', borderRadius: '15px', border: '1px solid #333'
        }}>
            <h2 style={{textAlign:'center', color:'#888', letterSpacing:'2px', fontSize:'0.9em', borderBottom:'1px solid #333', paddingBottom:'15px'}}>
                // SYSTEM CONTROL INTERFACE
            </h2>

            {/* A. The Visualizer */}
            <ParticleSim />

            {/* B. The Control Bars */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <UniversalBar targetKey="progress" label="Velocity (Chaos)" />
                <UniversalBar targetKey="particles" label="Entity Count" />
            </div>

            <hr style={{ borderColor: '#333', margin: '20px 0' }} />

            {/* C. The Universal Buttons */}
            <div style={{ display: 'flex', gap: '15px' }}>
                
                {/* Button 1: Toggles "system_power" on THIS file */}
                <UniversalButton 
                    targetKey="system_power" 
                    label="Main Power" 
                    onLabel="ONLINE" 
                    offLabel="OFFLINE" 
                />

                {/* Button 2: Toggles "safety_lock" on a REMOTE file (Example) 
                    Replace "Datacore Examples.md" with any real file path in your vault!
                */}
                <UniversalButton 
                    targetFile="Datacore Examples.md" 
                    targetKey="safety_lock" 
                    label="Safety Lock" 
                    onLabel="LOCKED" 
                    offLabel="UNLOCKED" 
                />
            </div>

        </div>
    );
}

return <MasterConsole />;
```


```datacorejsx
// ============================================================================
// PARTICLE CONTROLLER DASHBOARD
// ============================================================================

// 1. Load Theme Provider (Standard Datacore boilerplate)
const themeProvider = await dc.require(dc.fileLink("System/Scripts/core/dc-theme-provider.jsx"));
const { useTheme } = themeProvider;

function ParticleDashboard() {
    
    // ============ STATE & VARS ============
    const [particleCount, setParticleCount] = dc.useState(0);
    const [isUpdating, setIsUpdating] = dc.useState(false);
    
    // Target File: "Datacore Examples.md"
    // We try to find it specifically, otherwise fallback to current file
    const getTargetFile = () => {
        const file = app.vault.getAbstractFileByPath("Datacore Examples.md");
        return file instanceof TFile ? file : app.workspace.getActiveFile();
    };

    // Load initial Particle Count
    dc.useEffect(() => {
        const file = getTargetFile();
        if(file) {
            // Read cache to get current particle count
            const cache = app.metadataCache.getFileCache(file);
            const count = cache?.frontmatter?.particles || 0;
            setParticleCount(count);
        }
    }, []);

    // Function to change particle count
    const updateParticles = async (amount) => {
        setIsUpdating(true);
        const file = getTargetFile();
        if (file) {
            await app.fileManager.processFrontMatter(file, (fm) => {
                const current = fm.particles || 0;
                // Prevent going below 0, increment by amount
                fm.particles = Math.max(0, current + amount);
                setParticleCount(fm.particles);
            });
        }
        setIsUpdating(false);
    };

    // ============================================================
    // COMPONENT: PROGRESS BAR (Your provided code, wrapped here)
    // ============================================================
    const ProgressBar = () => {
        const current = dc.useCurrentFile();
        let initialProgress = current.value("progress"); // Controls Speed/Chaos
        
        // --- (Simplified version of your logic for brevity in the dash) ---
        const [progress, setProgress] = dc.useState(initialProgress || 0);
        const [isDragging, setIsDragging] = dc.useState(false);
        const barRef = dc.useRef(null);

        const updateSpeed = async (newVal) => {
             const activeFile = app.workspace.getActiveFile();
             await app.fileManager.processFrontMatter(activeFile, (fm) => {
                fm.progress = newVal;
             });
        };

        const handleMove = (e) => {
            if (!barRef.current) return;
            const rect = barRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const pct = Math.min(Math.max((x / rect.width) * 100, 0), 100);
            setProgress(Math.round(pct));
            if(!isDragging) updateSpeed(Math.round(pct)); // Update on click
        };

        return (
            <div className="dash-progress-wrapper">
                <div className="dash-label">Chaos / Speed Control</div>
                <div 
                    ref={barRef}
                    className="draggable-progress-container"
                    onMouseDown={(e) => { setIsDragging(true); handleMove(e); }}
                    onMouseMove={(e) => { if(isDragging) handleMove(e); }}
                    onMouseUp={() => { setIsDragging(false); updateSpeed(progress); }}
                    onMouseLeave={() => { if(isDragging) { setIsDragging(false); updateSpeed(progress); }}}
                >
                    <div className="draggable-progress-fill" style={{ width: `${progress}%` }} />
                    <div 
                        className="draggable-nyan-cat"
                        style={{ left: `${Math.min(progress, 95)}%` }} // Keep cat inside
                    />
                </div>
                <div style={{textAlign:'center', fontSize:'0.8em', color:'var(--text-muted)'}}>
                    {progress}% Intensity
                </div>
            </div>
        );
    };

    // ============================================================
    // RENDER: THE MAIN DASHBOARD LAYOUT
    // ============================================================
    return (
        <div className="particle-dashboard-container">
            
            {/* 1. TOP: PARTICLE DISPLAY WINDOW */}
            <div className="particle-window-frame">
                {/* PLACEHOLDER: This is where your actual particle script goes.
                   Since I don't have the particle script code, I am putting a 
                   div here. In reality, you would paste that script block here 
                   or embed it.
                */}
                <div style={{
                    width: '100%', height: '100%', 
                    display:'flex', alignItems:'center', justifyContent:'center',
                    background: 'rgba(0,0,0,0.3)', color: '#fff'
                }}>
                    [ PARTICLE DISPLAY ]<br/>
                    Current Particles: {particleCount}
                </div>
            </div>

            {/* 2. MIDDLE: CONTROLS (Horizontal) */}
            <div className="particle-controls-row">
                
                {/* Decrease Button */}
                <button 
                    className="particle-btn btn-decrease"
                    onClick={() => updateParticles(-10)}
                    disabled={isUpdating}
                >
                    <span className="btn-icon">−</span> Less Particles
                </button>

                {/* Display Value in Middle */}
                <div className="particle-value-readout">
                    <span style={{fontSize:'0.7em', color:'var(--text-muted)'}}>COUNT</span>
                    <span style={{fontSize:'1.5em', fontWeight:'bold', color:'var(--text-accent)'}}>
                        {particleCount}
                    </span>
                </div>

                {/* Increase Button */}
                <button 
                    className="particle-btn btn-increase"
                    onClick={() => updateParticles(10)}
                    disabled={isUpdating}
                >
                    <span className="btn-icon">+</span> More Particles
                </button>
            </div>

            {/* 3. BOTTOM: PROGRESS BAR (Speed/Chaos) */}
            <ProgressBar />

        </div>
    );
}

return { ParticleDashboard };
```

multiple .jsx in one codeblock?
```datacorejsx
// Load the separate files
const progressMod = await dc.require(dc.fileLink("System/Scripts/widgets/dc-nyanCatProgress-draggable.jsx"));
const buttonsMod = await dc.require(dc.fileLink("System/Scripts/widgets/dc-mothToggle.jsx"));

// 1. Extract the functions using the EXACT names they were exported with
// Progress bar exported as "Func"
const { Func: ProgressBar } = progressMod; 
// Moth button exported as "MothToggle" (based on your previous code)
const { MothToggle: ControlButtons } = buttonsMod; 

function MainDashboard() {
    return (
        <div className="dashboard-container">
            <h2>Particle Controller</h2>
            
            <div style={{display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem'}}>
                {/* Render the external components */}
                <ControlButtons />
            </div>

            <ProgressBar />
        </div>
    );
}

// 2. CHANGE THIS LINE: Return the component as JSX (<... />)
return <MainDashboard />;
```


```datacorejsx
const scriptPath = "System/Scripts/widgets/dc-moodCheck.jsx";  // ⬅️ replace it with your jsx file path!
const target = dc.fileLink(scriptPath);
const result = await dc.require(target);
const view = result?.renderedView ?? result?.View ?? result;  
const Func = result?.Func ?? null;

return function View() {
    const currentFile = dc.useCurrentFile();
    if (Func) {
        return Func({ currentFile, scriptPath });
    }
    return view ?? <p>Failed to render</p>;
}
```

```datacorejsx
const scriptPath = "System/Scripts/widgets/dc-moodCheckEmoji.jsx";  // ⬅️ replace it with your jsx file path!
const target = dc.fileLink(scriptPath);
const result = await dc.require(target);
const view = result?.renderedView ?? result?.View ?? result;  
const Func = result?.Func ?? null;

return function View() {
    const currentFile = dc.useCurrentFile();
    if (Func) {
        return Func({ currentFile, scriptPath });
    }
    return view ?? <p>Failed to render</p>;
}
```

```datacorejsx
const scriptPath = "System/Scripts/widgets/dc-frogButton.jsx";
const target = dc.fileLink(scriptPath);
const result = await dc.require(target);
const Func = result?.Func ?? null;
return function View() { return Func ? Func() : <span>Loading Frog...</span>; }
```



# Theme Test

Theme Console
```datacorejsx
const scriptPath = "System/Scripts/widgets/dc-theme-console.jsx";  // ⬅️ replace it with your jsx file path!
const target = dc.fileLink(scriptPath);
const result = await dc.require(target);
const view = result?.renderedView ?? result?.View ?? result;  
const Func = result?.Func ?? null;

return function View() {
    const currentFile = dc.useCurrentFile();
    if (Func) {
        return Func({ currentFile, scriptPath });
    }
    return view ?? <p>Failed to render</p>;
}
```

Theme Preview
```datacorejsx
const scriptPath = "System/Scripts/widgets/dc-theme-preview.jsx";  // ⬅️ replace it with your jsx file path!
const target = dc.fileLink(scriptPath);
const result = await dc.require(target);
const view = result?.renderedView ?? result?.View ?? result;  
const Func = result?.Func ?? null;

return function View() {
    const currentFile = dc.useCurrentFile();
    if (Func) {
        return Func({ currentFile, scriptPath });
    }
    return view ?? <p>Failed to render</p>;
}
```

```datacorejsx
const scriptPath = "System/Scripts/widgets/dc-mothToggle.jsx";  // ⬅️ replace it with your jsx file path!
const target = dc.fileLink(scriptPath);
const result = await dc.require(target);
const view = result?.renderedView ?? result?.View ?? result;  
const Func = result?.Func ?? null;

return function View() {
    const currentFile = dc.useCurrentFile();
    if (Func) {
        return Func({ currentFile, scriptPath });
    }
    return view ?? <p>Failed to render</p>;
}
```













```datacorejsx
const folderPath = "System/Scripts";
const folder = app.vault.getAbstractFileByPath(folderPath);

if (!folder) {
    return () => <div>❌ Folder not found: "{folderPath}"</div>;
}

const files = folder.children.map(f => f.path);

return () => (
    <div style={{ padding: "10px", border: "1px solid var(--text-accent)" }}>
        <h3>📂 Files found in "{folderPath}":</h3>
        <pre>{files.join("\n")}</pre>
    </div>
);
```

## Random GIF/Image Widget 🎞️

**Status:** ✅ WORKING (Updated 2025-12-23)

**Features:**
- 🔄 Auto-cycles through images with random timing
- ⏸️ Play/Pause control
- ◄► Manual navigation (Previous/Next)
- 🎨 Smooth fade transitions
- 📊 Image counter (shows current position)
- ⚙️ Folder exclusion (choose which folders to show/hide)
- 🎚️ Adjustable speed (0.5s - 10s)
- 🖼️ Supports GIF, PNG, JPG, JPEG, WEBP
- 📁 Filter by type (GIFs only, Static only, or All)

**Usage:**
```datacorejsx
// Random GIF/Image Widget (UPDATED - WORKING)
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

**Default Settings:**
- Shows all image types
- Cycles every 3 seconds (with 25% randomness)
- Excludes `.obsidian` folder by default
- Fades between images in 300ms

**Tips:**
- Click "⚙️ Folders" to exclude specific directories
- Use the speed slider to control cycling pace
- Pause to manually browse with Prev/Next
- Counter shows your position (e.g., "5 / 113")

---

# Dynamic daytime header

```datacorejsx
// 1. DATA
const hour = moment().hour();
const name = "Annie";
let greeting = "Good Evening";
let icon = "🌙";
let color = "#8888cc"; // Night purple

// Simple logic to change vibe based on time
if (hour >= 5 && hour < 12) {
    greeting = "Good Morning";
    icon = "🌅";
    color = "#e6a23c"; // Sunrise orange
} else if (hour >= 12 && hour < 17) {
    greeting = "Good Afternoon";
    icon = "☀️";
    color = "#e6c63c"; // Day yellow
}

// 2. RENDER
return (
    <div style={{
        padding: '20px', 
        borderRadius: '12px', 
        backgroundColor: 'var(--background-secondary)',
        borderLeft: `5px solid ${color}`,
        display: 'flex',
        alignItems: 'center',
        gap: '15px'
    }}>
        <div style={{fontSize: '3em', lineHeight: '1em'}}>{icon}</div>
        <div>
            <h2 style={{margin: 0, color: 'var(--text-normal)'}}>{greeting}, {name}.</h2>
            <p style={{margin: 0, opacity: 0.7}}>
                The current system time is <b>{moment().format("LT")}</b>.
            </p>
        </div>
    </div>
);
```

# Visual Stats

```datacorejsx
return function View() {
    // 1. HOOKS (Now safely inside the View function)
    const allFiles = dc.useQuery("@page");

    // 2. LOADING STATE
    // Queries take a split second to load; we handle the "empty" state gracefully
    if (!allFiles) return <div className="zen-loading">Scanning Vault...</div>;

    // 3. CALCULATIONS
    const totalCount = allFiles.length;
    // Let's pretend 100 notes is "Level 1" to make the bar move faster
    const level = Math.floor(totalCount / 100); 
    const progressToNextLevel = (totalCount % 100); // 0 to 100%

    // 4. RENDER
    return (
        <div className="card" style={{padding: '15px', border: '1px solid var(--background-modifier-border)', borderRadius: '8px'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '8px'}}>
                <strong>🧠 Knowledge Base</strong>
                <span style={{color: 'var(--text-accent)'}}>Level {level}</span>
            </div>
            
            {/* Progress Bar Track */}
            <div style={{
                height: '8px', 
                width: '100%', 
                background: 'rgba(255,255,255,0.1)', 
                borderRadius: '4px',
                overflow: 'hidden'
            }}>
                {/* Progress Bar Fill */}
                <div style={{
                    height: '100%',
                    width: `${progressToNextLevel}%`,
                    backgroundColor: 'var(--interactive-accent)',
                    transition: 'width 0.5s ease-in-out'
                }}></div>
            </div>
            
            <div style={{fontSize: '0.8em', marginTop: '8px', textAlign: 'right', opacity: 0.7}}>
                {totalCount} total notes • {100 - progressToNextLevel} to next level
            </div>
        </div>
    );
}
```


# Random Note

```datacorejsx
// 1. HOOKS
// Get all files
const allFiles = dc.useQuery("@page");

// 2. LOGIC
if (!allFiles || allFiles.length === 0) return null;

// Filter for specific folder (Optional - remove filter to use whole vault)
// CHANGE "Daily" to whatever folder you want to study from!
const studyNotes = allFiles.filter(f => f.path.startsWith("Daily")); 

if (studyNotes.length === 0) return <div>No notes found in that folder!</div>;

// Pick a random index
// We use a simple hash of the date so the "Random" note stays the same for the whole day
// OR use Math.random() to get a new one every refresh.
const today = moment().dayOfYear();
const randomIndex = today % studyNotes.length; 
const randomNote = studyNotes[randomIndex];

// 3. RENDER
return (
    <div style={{
        backgroundImage: 'linear-gradient(135deg, var(--interactive-accent) 0%, var(--interactive-accent-hover) 100%)',
        color: 'white',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
    }}>
        <h5 style={{margin: '0 0 10px 0', opacity: 0.8, textTransform: 'uppercase', letterSpacing: '1px'}}>
            🎲 Flashcard of the Day
        </h5>
        
        <h2 style={{margin: '0 0 15px 0', fontSize: '1.8em', borderBottom: '1px solid rgba(255,255,255,0.3)', paddingBottom: '10px'}}>
            {randomNote.name.replace(".md", "")}
        </h2>
        
        <div style={{display: 'flex', gap: '10px'}}>
            <a href={randomNote.path} className="internal-link" style={{
                background: 'rgba(255,255,255,0.2)',
                color: 'white',
                textDecoration: 'none',
                padding: '8px 16px',
                borderRadius: '20px',
                fontWeight: 'bold',
                backdropFilter: 'blur(5px)'
            }}>
                Review Note →
            </a>
        </div>
    </div>
);
```

# Interactive Pomodoro

# Daily Quotes

calling the function using .jsx script
```datacorejsx
const scriptPath = "System/Scripts/widgets/dc-randomQuote.jsx";  // ⬅️ replace it with your jsx file path!
const target = dc.fileLink(scriptPath);
const result = await dc.require(target);
const view = result?.renderedView ?? result?.View ?? result;  
const Func = result?.Func ?? null;

return function View() {
    const currentFile = dc.useCurrentFile();
    if (Func) {
        return Func({ currentFile, scriptPath });
    }
    return view ?? <p>Failed to render</p>;
}
```

# Recently Edited Notes

```datacorejsx
return function View() {
    // Query all pages
    const pages = dc.useQuery("@page");

    // Handle loading
    if (!pages) return <span>Loading...</span>;

    // Sort by modified time (descending) and take top 3
    // We use a safe copy of the array to avoid mutating the original data
    const recentDocs = pages
        .sort((a, b) => b.$mtime - a.$mtime)
        .slice(0, 3);

    return (
        <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
            <h4 style={{margin: '0 0 5px 0', opacity: 0.6, fontSize: '0.8em', textTransform: 'uppercase'}}>
                🕒 Recently Active
            </h4>
            
            {recentDocs.map(page => (
                <a href={page.$path} className="internal-link" style={{
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '10px',
                    textDecoration: 'none',
                    padding: '8px',
                    background: 'var(--background-secondary)',
                    borderRadius: '6px',
                    border: '1px solid transparent'
                }}>
                    <span style={{fontSize: '1.2em'}}>📝</span>
                    <div style={{flex: 1}}>
                        <div style={{fontWeight: 'bold', color: 'var(--text-normal)'}}>
                            {page.$name}
                        </div>
                        <div style={{fontSize: '0.75em', color: 'var(--text-muted)'}}>
                            {/* Relative time (e.g., "2 hours ago") */}
                            {moment(page.$mtime).fromNow()}
                        </div>
                    </div>
                </a>
            ))}
        </div>
    );
}
```

# Task Radar

```datacorejsx
return function View() {
    // Query all tasks in the vault
    const tasks = dc.useQuery("@task");
    
    if (!tasks) return null;

    // Filter: Not completed AND contains the text "#urgent" (Optional filter)
    // Remove the '&&' part if you want ALL open tasks
    const openTasks = tasks.filter(t => !t.$completed);
    const urgentTasks = openTasks.filter(t => t.$text.includes("#urgent"));

    return (
        <div style={{
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: '10px', 
            textAlign: 'center',
            marginTop: '20px'
        }}>
            <div style={{
                background: 'var(--background-secondary)', 
                padding: '15px', 
                borderRadius: '8px'
            }}>
                <div style={{fontSize: '2em', fontWeight: 'bold', color: 'var(--text-normal)'}}>
                    {openTasks.length}
                </div>
                <div style={{fontSize: '0.8em', textTransform: 'uppercase', opacity: 0.7}}>
                    Open Tasks
                </div>
            </div>

            <div style={{
                background: 'rgba(255, 80, 80, 0.1)', 
                border: '1px solid rgba(255, 80, 80, 0.2)',
                padding: '15px', 
                borderRadius: '8px'
            }}>
                <div style={{fontSize: '2em', fontWeight: 'bold', color: 'var(--text-error)'}}>
                    {urgentTasks.length}
                </div>
                <div style={{fontSize: '0.8em', textTransform: 'uppercase', color: 'var(--text-error)'}}>
                    Urgent
                </div>
            </div>
        </div>
    );
}
```


# Live Search Bar

```datacorejsx
return function View() {
    // 1. STATE: Track what the user types
    const [searchTerm, setSearchTerm] = dc.useState("");
    
    // 2. DATA: Get all files
    const pages = dc.useQuery("@page");

    // Safety check
    if (!pages) return <span className="zen-loading">Indexing Vault...</span>;

    // 3. LOGIC: Filter the list based on the search term
    const results = pages
        .filter(p => p.$name.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => b.$mtime - a.$mtime) // Sort by most recent
        .slice(0, 5); // Limit to top 5 to keep it clean

    // 4. RENDER
    return (
        <div style={{
            padding: '15px', 
            border: '1px solid var(--background-modifier-border)', 
            borderRadius: '8px',
            backgroundColor: 'var(--background-secondary)'
        }}>
            <div style={{marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px'}}>
                <span style={{fontSize: '1.2em'}}>🔍</span>
                {/* THE INPUT FIELD */}
                <input 
                    type="text" 
                    placeholder="Type to filter notes..." 
                    value={searchTerm}
                    onInput={(e) => setSearchTerm(e.target.value)}
                    style={{
                        width: '100%', 
                        padding: '8px', 
                        borderRadius: '4px', 
                        border: '1px solid var(--background-modifier-border)'
                    }}
                />
            </div>

            <div style={{display: 'flex', flexDirection: 'column', gap: '5px'}}>
                {results.length === 0 ? (
                    <div style={{opacity: 0.5, fontStyle: 'italic', padding: '10px'}}>No matches found.</div>
                ) : (
                    results.map(page => (
                        <a href={page.$path} style={{
                            textDecoration: 'none', 
                            color: 'var(--text-normal)',
                            padding: '8px', 
                            borderRadius: '4px',
                            background: 'var(--background-primary)',
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}>
                            <span>{page.$name}</span>
                            <span style={{opacity: 0.5, fontSize: '0.8em'}}>{moment(page.$mtime).format("MMM D")}</span>
                        </a>
                    ))
                )}
            </div>
        </div>
    );
}
```

# Habit Toggle

```datacorejsx
return function View() {
    // We create an array of habits, each with its own state
    const [habits, setHabits] = dc.useState([
        { id: 1, name: "Meditate", icon: "🧘‍♀️", done: false },
        { id: 2, name: "Hydrate", icon: "💧", done: false },
        { id: 3, name: "Read", icon: "📚", done: false }
    ]);

    // Function to toggle a specific habit
    const toggleHabit = (id) => {
        const newHabits = habits.map(h => 
            h.id === id ? { ...h, done: !h.done } : h
        );
        setHabits(newHabits);
    };

    return (
        <div>
            <h4 style={{margin: '0 0 10px 0', textTransform: 'uppercase', opacity: 0.6, fontSize: '0.8em'}}>
                Session Tracker
            </h4>
            <div style={{display: 'flex', gap: '10px'}}>
                {habits.map(habit => (
                    <button 
                        onClick={() => toggleHabit(habit.id)}
                        style={{
                            flex: 1,
                            padding: '35px 10px',
                            borderRadius: '8px',
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            backgroundColor: habit.done ? 'var(--interactive-accent)' : 'var(--background-modifier-form-field)',
                            color: habit.done ? 'white' : 'var(--text-muted)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '5px'
                        }}
                    >
                        <span style={{fontSize: '1.5em'}}>{habit.done ? "✅" : habit.icon}</span>
                        <span style={{fontSize: '0.9em', fontWeight: 'bold'}}>{habit.name}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
```




# Embed metabind button into datacore
```dataviewjs
// 1. Calculate Target (Where are we sending the data?)
const today = moment().format("YYYY-MM-DD");
// ⚠️ IMPORTANT: Verify this matches your folder name exactly!
const targetPath = `/${today}`; 

// 2. Fetch Settings (How much water?)
const settings = dv.page("Settings");
const bottleSize = settings ? settings["water-bottle-size"] : 500;

// 3. GENERATE THE BUTTON (The Remote Control)
// We use dv.paragraph to "print" the Meta Bind code block onto the page.
// The ${targetPath} injects today's date into the 'file:' field.

dv.paragraph(`
\`\`\`meta-bind-button
style: primary
label: "🍶 Add ${bottleSize}ml (Remote)"
actions:
  - type: updateMetadata
    file: "${targetPath}"
    bindTarget: water-ml
    evaluate: true
    value: x + ${bottleSize}
\`\`\`
`);

// 4. Status Check (Visual confirmation)
const todayPage = dv.page(targetPath);
if (!todayPage) {
    dv.paragraph(`<small style="color: var(--text-muted)">⚠️ Note <b>${targetPath}</b> not found yet.</small>`);
} else {
    dv.paragraph(`<small style="color: var(--text-muted)">✅ Linked to: ${targetPath}</small>`);
}
```
how to embed a metabind button into datacore^