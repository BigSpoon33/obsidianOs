// ═══════════════════════════════════════════════════════════════════════════════
// TODAY'S WORKOUT WIDGET
// Displays today's scheduled workout from Settings.md
// Includes workout-completed toggle to track daily completion
// ═══════════════════════════════════════════════════════════════════════════════

const { GloToggle } = await dc.require(
    dc.fileLink("System/Scripts/Components/dc-gloToggle.jsx")
);

function WorkoutWidget() {
    // 1. GET SETTINGS & CURRENT FILE
    const currentFile = dc.useCurrentFile();
    const pages = dc.useQuery("@page");
    if (!pages) return <div style={{opacity: 0.5}}>⏳ Loading...</div>;

    const settingsNote = pages.find(p => 
        (p.tags && (p.tags.has("#settings") || p.tags.has("settings"))) || 
        p.$path.endsWith("System/Settings.md")
    );

    if (!settingsNote) return <div style={{opacity: 0.5}}>⚠️ System/Settings.md not found</div>;

    // STATE: Track workout completion (read from frontmatter for styling)
    const fm = currentFile?.frontmatter || {};
    const [isCompleted, setIsCompleted] = dc.useState(fm["workout-completed"] || false);
    
    // Sync completion state when frontmatter changes
    dc.useEffect(() => {
        const val = fm["workout-completed"] || false;
        setIsCompleted(val);
    }, [fm["workout-completed"]]);

    // 2. DETERMINE TODAY'S SCHEDULE
    const dayName = moment().format('dddd').toLowerCase();
    const scheduleKey = `schedule-${dayName}`;
    const workoutLink = settingsNote.value(scheduleKey);

    // 3. HANDLE REST DAYS
    if (!workoutLink) {
        return (
            <div style={{
                padding: '20px',
                borderRadius: '12px',
                background: 'var(--background-secondary)',
                textAlign: 'center',
                color: 'var(--text-muted)',
                border: '1px dashed var(--background-modifier-border)'
            }}>
                <div style={{fontSize: '2em', marginBottom: '5px'}}>🧘</div>
                <b>Rest Day</b>
                <div style={{fontSize: '0.8em'}}>No workout scheduled for {dayName}.</div>
            </div>
        );
    }

    // 4. FETCH PLAN
    const workoutPath = workoutLink.path ? workoutLink.path : workoutLink.toString();
    const workoutPage = pages.find(p => p.$path === workoutPath || p.$path.endsWith(workoutPath));

    if (!workoutPage) return <div>⚠️ Plan not found: {workoutPath}</div>;

    // 5. EXTRACT DATA
    const focus = workoutPage.value("focus") || "Fitness";
    const duration = workoutPage.value("duration") || "??";
    const exercises = workoutPage.value("exercises") || [];
    const warmup = workoutPage.value("warmup") || [];
    const cooldown = workoutPage.value("cooldown") || [];

    // --- HELPER: Renders a simple list (Warmup/Cooldown) ---
    const renderSimpleList = (items, color, title) => (
        <div style={{marginBottom: '15px', padding: '10px', background: `rgba(${color}, 0.08)`, borderRadius: '8px'}}>
            <div style={{
                fontSize: '0.8em', 
                fontWeight: 'bold', 
                color: `rgb(${color})`, 
                marginBottom: '6px', 
                textTransform: 'uppercase', 
                letterSpacing: '0.5px'
            }}>
                {title}
            </div>
            {items.map((item, i) => {
                // Smart Parse
                const isObject = item && typeof item === 'object' && !item.path;
                const rawLink = isObject ? item.link : item;
                const name = rawLink?.fileName ? rawLink.fileName() : rawLink?.toString() || "Unknown";
                const path = rawLink?.path || null;
                const info = isObject ? item.info : null;

                return (
                    <div key={i} style={{fontSize: '0.85em', opacity: 0.85, marginBottom: '4px', paddingLeft: '4px', display: 'flex', gap: '6px'}}>
                        <span style={{opacity: 0.5}}>•</span>
                        {path ? (
                            <a href={path} className="internal-link" style={{textDecoration: 'none', color: 'var(--text-normal)'}}>
                                {name}
                            </a>
                        ) : (
                            <span>{name}</span>
                        )}
                        {info && <span style={{opacity: 0.6}}>— {info}</span>}
                    </div>
                );
            })}
        </div>
    );

    // 6. RENDER
    return (
        <div style={{
            padding: '20px',
            borderRadius: '12px',
            background: isCompleted 
                ? 'linear-gradient(135deg, var(--background-secondary), rgba(16, 185, 129, 0.1))' 
                : 'var(--background-secondary)',
            borderLeft: isCompleted 
                ? '4px solid #10b981' 
                : '4px solid var(--text-accent)',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            transition: 'all 0.3s ease'
        }}>
            {/* HEADER */}
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                    <span style={{fontSize: '1.8em'}}>{isCompleted ? '✅' : '🏋️'}</span>
                    <div>
                        <h3 style={{margin: 0, fontSize: '1.1em'}}>{workoutPage.$name}</h3>
                        <span style={{fontSize: '0.8em', opacity: 0.7, textTransform: 'uppercase', letterSpacing: '1px'}}>
                            {dayName} • {duration} min
                        </span>
                    </div>
                </div>
                <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
                    {/* Workout Completion Toggle - Themed */}
                    <GloToggle
                        targetKey="workout-completed"
                        onLabel="Done!"
                        offLabel="Mark Done"
                        onSub="Workout complete"
                        offSub="Tap to complete"
                        width="160px"
                        padding="10px 14px"
                        onChange={(val) => {
                            setIsCompleted(val);
                            new Notice(val ? "Workout marked complete! 💪" : "Workout marked incomplete");
                        }}
                    />
                    <a href={workoutPage.$path} className="internal-link" style={{textDecoration: 'none', fontSize: '1.5em'}}>↗️</a>
                </div>
            </div>

            {/* FOCUS */}
            <div style={{
                fontSize: '0.9em', 
                marginBottom: '15px', 
                padding: '8px', 
                background: 'var(--background-primary)', 
                borderRadius: '6px', 
                opacity: 0.9
            }}>
                🎯 <b>Focus:</b> {focus}
            </div>

            {/* WARM UP (Orange RGB: 255, 165, 0) */}
            {warmup.length > 0 && renderSimpleList(warmup, "255, 165, 0", "🔥 Warm Up")}

            {/* MAIN EXERCISES */}
            {exercises.length > 0 && (
                <div style={{display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '15px'}}>
                    {exercises.map((ex, i) => {
                        const isObject = ex && typeof ex === 'object' && !ex.path;
                        const rawLink = isObject ? ex.link : ex;
                        const name = rawLink?.fileName ? rawLink.fileName() : rawLink?.toString() || "Unknown";
                        const path = rawLink?.path || null;
                        const sets = isObject ? ex.sets : null;
                        const reps = isObject ? ex.reps : null;
                        const weight = isObject ? ex.weight : null;

                        return (
                            <div key={i} style={{
                                display: 'flex', 
                                flexDirection: 'column',
                                gap: '4px',
                                padding: '8px 10px',
                                background: 'rgba(255,255,255,0.03)',
                                borderRadius: '6px',
                                borderLeft: '2px solid var(--background-modifier-border)'
                            }}>
                                <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                                    <span style={{opacity: 0.5, fontSize: '0.8em', width: '15px'}}>{i + 1}.</span>
                                    {path ? (
                                        <a href={path} className="internal-link" style={{fontWeight: 'bold', color: 'var(--text-normal)', textDecoration: 'none'}}>
                                            {name}
                                        </a>
                                    ) : (
                                        <span style={{fontWeight: 'bold'}}>{name}</span>
                                    )}
                                </div>
                                {(sets || reps || weight) && (
                                    <div style={{display: 'flex', gap: '12px', fontSize: '0.8em', color: 'var(--text-muted)', marginLeft: '23px'}}>
                                        {sets && <span title="Sets">🔢 <b>{sets}</b> sets</span>}
                                        {reps && <span title="Reps">🔁 <b>{reps}</b> reps</span>}
                                        {weight && <span title="Weight">⚖️ {weight}</span>}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}

            {/* COOL DOWN (Blue RGB: 100, 149, 237) */}
            {cooldown.length > 0 && renderSimpleList(cooldown, "100, 149, 237", "❄️ Cool Down")}
        </div>
    );
}

return { Func: WorkoutWidget };