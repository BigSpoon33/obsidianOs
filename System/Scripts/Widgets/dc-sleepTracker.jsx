// ═══════════════════════════════════════════════════════════════════════════════
// SLEEP TRACKER / MORNING CHECK-IN WIDGET
// Tracks sleep times and morning vitals
// Reads sleep goal from Settings.md activities array
// ═══════════════════════════════════════════════════════════════════════════════

const SETTINGS_PATH = "System/Settings.md";

function SleepTracker() {
    // 1. SETUP
    const currentFile = dc.useCurrentFile();
    const fm = currentFile?.frontmatter || {};

    // Load sleep goal from Settings.md activities array
    const getSleepGoal = () => {
        try {
            const settingsFile = app.vault.getAbstractFileByPath(SETTINGS_PATH);
            if (!settingsFile) return 8;
            const settingsCache = app.metadataCache.getFileCache(settingsFile);
            const activities = settingsCache?.frontmatter?.activities || [];
            const sleepActivity = activities.find(a => a.id === 'sleep');
            return sleepActivity?.goal || 8;
        } catch (e) {
            console.error("Failed to load sleep goal:", e);
            return 8;
        }
    };

    const sleepGoal = getSleepGoal();

    // STATE
    const [bedtime, setBedtime] = dc.useState(fm["sleep-bedtime"] || "23:00");
    const [wakeup, setWakeup] = dc.useState(fm["sleep-wakeup"] || "07:00");
    
    // Vitals (1-5)
    const [quality, setQuality] = dc.useState(fm["sleep-quality"] || 3);
    const [mood, setMood] = dc.useState(fm["mood"] || 3);
    const [energy, setEnergy] = dc.useState(fm["energy"] || 3);
    
    const [totalHours, setTotalHours] = dc.useState(0);

    // 2. AUTO-LOAD CSS
    dc.useEffect(() => {
        const loadStyles = async () => {
            const cssPath = "System/Scripts/Styles/dc-sleepTracker.css";
            const id = "dc-sleep-styles";
            if (document.getElementById(id)) return;
            if (await app.vault.adapter.exists(cssPath)) {
                const css = await app.vault.adapter.read(cssPath);
                const style = document.createElement("style");
                style.id = id;
                style.textContent = css;
                document.head.appendChild(style);
            }
        };
        loadStyles();
    }, []);

    // 3. CALCULATION LOGIC
    dc.useEffect(() => {
        const parseTime = (t) => {
            const [hrs, mins] = t.split(":").map(Number);
            return hrs + (mins / 60);
        };

        let start = parseTime(bedtime);
        let end = parseTime(wakeup);

        if (end < start) end += 24;

        const duration = (end - start).toFixed(1);
        setTotalHours(duration);
    }, [bedtime, wakeup]);

    // 4. SAVE FUNCTION
    const saveAll = async () => {
        const file = app.workspace.getActiveFile();
        if (file) {
            await app.fileManager.processFrontMatter(file, (f) => {
                f["sleep-bedtime"] = bedtime;
                f["sleep-wakeup"] = wakeup;
                f["sleep-hours"] = Number(totalHours);
                f["sleep-quality"] = quality;
                f["mood"] = mood;
                f["energy"] = energy;
            });
            new Notice("Sleep Log Saved! 🌙");
        }
    };

    // --- SUB-COMPONENT: CIRCULAR SLIDER ---
    const ClockInput = ({ label, value, onChange, color }) => {
        // ✨ FIXED: Renamed 'h' to 'hours' to avoid conflict with Preact's 'h()'
        const [hours, minutes] = value.split(":").map(Number);
        const totalMins = (hours * 60) + minutes;
        
        // Visual angle calculation
        const visualDeg = ((totalMins % 720) / 720) * 360;
        const isPm = hours >= 12;

        const handleDrag = (e) => {
            e.preventDefault();
            const rect = e.target.closest('.clock-face').getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            let angle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);
            angle = angle + 90; 
            if (angle < 0) angle += 360;

            let mins = Math.round((angle / 360) * 720);
            
            // Snap mins to nearest 15
            mins = Math.round(mins / 15) * 15;
            if (mins === 720) mins = 0;

            let newH = Math.floor(mins / 60);
            let newM = mins % 60;

            // Preserve AM/PM logic
            if (isPm && newH < 12) newH += 12;
            if (!isPm && newH === 12) newH = 0;

            onChange(`${String(newH).padStart(2,'0')}:${String(newM).padStart(2,'0')}`);
        };

        const toggleAmPm = () => {
            let newH = hours;
            if (isPm) newH -= 12;
            else newH += 12;
            onChange(`${String(newH).padStart(2,'0')}:${String(minutes).padStart(2,'0')}`);
        }

        const rad = (visualDeg - 90) * (Math.PI / 180);
        const r = 40; 
        const knobX = 50 + r * Math.cos(rad);
        const knobY = 50 + r * Math.sin(rad);

        return (
            <div className="clock-container">
                <div className="clock-label">{label}</div>
                <div className="clock-face" onMouseMove={(e) => e.buttons === 1 && handleDrag(e)} onClick={handleDrag}>
                    {[0,1,2,3].map(i => <div key={i} className="clock-tick" style={{transform: `rotate(${i*90}deg)`}} />)}
                    <div className="clock-knob" style={{left: `${knobX}%`, top: `${knobY}%`, backgroundColor: color}}></div>
                    <div className="clock-center">
                        <div className="clock-time">
                            {(hours % 12) || 12}:{String(minutes).padStart(2,'0')}
                        </div>
                        <div className="clock-ampm" onClick={(e) => { e.stopPropagation(); toggleAmPm(); }}>
                            {isPm ? "PM" : "AM"}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // --- SUB-COMPONENT: RANGE SLIDER ---
    const RangeSlider = ({ label, val, setVal, icon }) => (
        <div className="vital-row">
            <span className="vital-icon">{icon}</span>
            <div className="vital-label">{label}</div>
            <input 
                type="range" min="1" max="5" step="1" 
                value={val} 
                onChange={(e) => setVal(Number(e.target.value))}
                className="vital-slider"
                style={{
                    background: `linear-gradient(to right, #4facfe 0%, #4facfe ${(val-1)*25}%, rgba(255,255,255,0.1) ${(val-1)*25}%, rgba(255,255,255,0.1) 100%)`
                }}
            />
            <span className="vital-score">{val}</span>
        </div>
    );

    return (
        <div className="sleep-widget">
            <div className="sleep-header">
                <h3>Morning Check-in</h3>
                <button className="btn-save" onClick={saveAll}>💾 Save</button>
            </div>

            <div className="clocks-wrapper">
                <ClockInput label="Bedtime" value={bedtime} onChange={setBedtime} color="#ff9a9e" />
                <div className="sleep-duration" style={{
                    background: totalHours >= sleepGoal 
                        ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(52, 211, 153, 0.1))' 
                        : 'transparent',
                    borderRadius: '8px',
                    padding: '8px'
                }}>
                    <span className="duration-val" style={{
                        color: totalHours >= sleepGoal ? '#10b981' : 'var(--text-normal)'
                    }}>
                        {totalHours}
                    </span>
                    <span className="duration-unit" style={{
                        color: totalHours >= sleepGoal ? '#10b981' : 'var(--text-muted)'
                    }}>
                        / {sleepGoal} hrs
                    </span>
                    {totalHours >= sleepGoal && (
                        <span style={{fontSize: '0.7em', color: '#10b981', display: 'block', marginTop: '4px'}}>
                            Goal met!
                        </span>
                    )}
                </div>
                <ClockInput label="Wake Up" value={wakeup} onChange={setWakeup} color="#a18cd1" />
            </div>

            <div className="sleep-divider"></div>

            <div className="vitals-wrapper">
                <RangeSlider label="Sleep Quality" val={quality} setVal={setQuality} icon="💤" />
                <RangeSlider label="Morning Mood" val={mood} setVal={setMood} icon="🌤️" />
                <RangeSlider label="Energy Level" val={energy} setVal={setEnergy} icon="⚡" />
            </div>
        </div>
    );
}

return { Func: SleepTracker };