// ═══════════════════════════════════════════════════════════════════════════════
// WEEKLY WORKOUT SCHEDULER
// Manages weekly workout schedule and exercise goals
// Goals are stored in Settings.md activities array
// ═══════════════════════════════════════════════════════════════════════════════

const SETTINGS_PATH = "System/Settings.md";

function WeeklyScheduler() {
    // 1. SETUP & REACTIVITY
    const file = app.workspace.getActiveFile();
    const currentFile = dc.useFile(file); 
    
    // 2. ROBUST DATA FETCHING
    const cache = app.metadataCache.getFileCache(file);
    const frontmatter = currentFile?.frontmatter || cache?.frontmatter || {};

    // STATE
    const [localChanges, setLocalChanges] = dc.useState({});
    const [showGoals, setShowGoals] = dc.useState(false);
    const [localGoals, setLocalGoals] = dc.useState(null);

    // --- LOAD GOALS FROM SETTINGS.MD ACTIVITIES ARRAY ---
    const getGoalsFromSettings = () => {
        try {
            const settingsFile = app.vault.getAbstractFileByPath(SETTINGS_PATH);
            if (!settingsFile) return null;
            const settingsCache = app.metadataCache.getFileCache(settingsFile);
            const activities = settingsCache?.frontmatter?.activities || [];
            
            return {
                daysPerWeek: activities.find(a => a.id === 'workout-days')?.goal || 4,
                minutesPerDay: activities.find(a => a.id === 'exercise-minutes')?.goal || 45
            };
        } catch (e) {
            console.error("Failed to load goals from Settings:", e);
            return null;
        }
    };

    const settingsGoals = getGoalsFromSettings();
    const goals = localGoals || settingsGoals || { daysPerWeek: 4, minutesPerDay: 45 };

    // 3. PARSER (Get Value Logic)
    const getServerValue = (day) => {
        const raw = frontmatter[`schedule-${day}`] || frontmatter[`schedule-${day.toLowerCase()}`];
        if (!raw) return "";

        let str = "";
        if (typeof raw === 'object' && raw.path) str = raw.path; 
        else if (typeof raw === 'string') str = raw; 
        
        if (str.endsWith(".md")) str = str.slice(0, -3);
        return str.replace(/[\[\]"]/g, "").trim();
    };

    // 4. FIND PLANS
    const allFiles = app.vault.getMarkdownFiles();
    const plans = allFiles.filter(f => {
        const fCache = app.metadataCache.getFileCache(f);
        const fFm = fCache?.frontmatter;
        if (!fFm) return false;

        const hasTag = fFm.tags && (
            Array.isArray(fFm.tags) ? fFm.tags.includes('workout-plan') : fFm.tags === 'workout-plan'
        );
        const hasCategory = fFm.categories && JSON.stringify(fFm.categories).includes("Workout Plan");

        return hasTag || hasCategory;
    }).map(f => f.basename).sort();

    // 5. CALCULATE SCHEDULED DAYS
    const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
    
    const getScheduledDaysCount = () => {
        return days.filter(day => {
            const val = localChanges[day] !== undefined ? localChanges[day] : getServerValue(day);
            return val && val !== "";
        }).length;
    };
    
    const scheduledDays = getScheduledDaysCount();
    const progressPercent = Math.min((scheduledDays / goals.daysPerWeek) * 100, 100);

    // 6. UPDATE HANDLERS
    const updateSchedule = async (day, planName) => {
        setLocalChanges(prev => ({ ...prev, [day]: planName }));
        await app.fileManager.processFrontMatter(file, (fm) => {
            const key = `schedule-${day}`;
            if (planName === "") delete fm[key]; 
            else fm[key] = `[[${planName}]]`; 
        });
    };

    // Update goal in Settings.md activities array
    const updateGoal = async (activityId, newGoal) => {
        const numGoal = Number(newGoal) || 0;
        
        // Update local state immediately for responsive UI
        setLocalGoals(prev => {
            const current = prev || goals;
            const updated = { ...current };
            if (activityId === 'workout-days') updated.daysPerWeek = numGoal;
            else if (activityId === 'exercise-minutes') updated.minutesPerDay = numGoal;
            return updated;
        });
        
        // Save to Settings.md activities array
        try {
            const settingsFile = app.vault.getAbstractFileByPath(SETTINGS_PATH);
            if (!settingsFile) {
                new Notice("Settings.md not found!");
                return;
            }
            
            await app.fileManager.processFrontMatter(settingsFile, (fm) => {
                const activities = fm.activities || [];
                const idx = activities.findIndex(a => a.id === activityId);
                if (idx !== -1) {
                    activities[idx].goal = numGoal;
                    fm.activities = activities;
                }
            });
        } catch (e) {
            console.error("Failed to update goal:", e);
            new Notice("Failed to save goal");
        }
    };

    // 7. STYLES
    const styles = {
        container: { 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '12px', 
            padding: '15px', 
            background: 'var(--background-secondary)', 
            borderRadius: '8px', 
            border: '1px solid var(--background-modifier-border)' 
        },
        header: { 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '5px'
        },
        headerTitle: {
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
        },
        goalsBtn: {
            padding: '4px 10px',
            fontSize: '0.8em',
            background: 'var(--background-primary)',
            border: '1px solid var(--background-modifier-border)',
            borderRadius: '4px',
            cursor: 'pointer',
            color: 'var(--text-normal)'
        },
        goalsBtnActive: {
            background: 'var(--interactive-accent)',
            color: 'white',
            border: '1px solid var(--interactive-accent)'
        },
        progressSection: {
            padding: '10px',
            background: 'var(--background-primary)',
            borderRadius: '6px',
            marginBottom: '5px'
        },
        progressBar: {
            width: '100%',
            height: '8px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '4px',
            overflow: 'hidden',
            marginTop: '8px'
        },
        progressFill: {
            height: '100%',
            background: 'var(--interactive-accent)',
            borderRadius: '4px',
            transition: 'width 0.3s ease'
        },
        goalsPanel: {
            display: 'flex',
            gap: '15px',
            padding: '12px',
            background: 'var(--background-secondary-alt)',
            borderRadius: '8px',
            border: '1px solid var(--interactive-accent)',
            marginBottom: '10px'
        },
        goalInput: {
            display: 'flex',
            flexDirection: 'column',
            gap: '4px'
        },
        goalLabel: {
            fontSize: '0.7em',
            color: 'var(--text-muted)',
            textTransform: 'uppercase'
        },
        goalField: {
            width: '70px',
            padding: '6px',
            background: 'var(--background-primary)',
            border: '1px solid var(--background-modifier-border)',
            borderRadius: '4px',
            color: 'var(--text-normal)'
        },
        row: { 
            display: 'grid', 
            gridTemplateColumns: '90px 1fr', 
            alignItems: 'center', 
            gap: '10px' 
        },
        label: { 
            fontWeight: 'bold', 
            textTransform: 'capitalize', 
            color: 'var(--text-muted)', 
            textAlign: 'right',
            fontSize: '0.9em'
        },
        select: { 
            width: '100%', 
            padding: '6px', 
            background: 'var(--background-primary)', 
            color: 'var(--text-normal)', 
            border: '1px solid var(--background-modifier-border)', 
            borderRadius: '4px', 
            cursor: 'pointer' 
        },
        loading: { 
            fontSize: '0.8em', 
            opacity: 0.7, 
            fontStyle: 'italic' 
        }
    };

    const isDataReady = Object.keys(frontmatter).length > 0;

    // 8. RENDER
    return (
        <div style={styles.container}>
            {/* Header with Goals Button */}
            <div style={styles.header}>
                <div style={styles.headerTitle}>
                    <strong>Weekly Schedule</strong>
                    {!isDataReady && <span style={styles.loading}>Syncing...</span>}
                </div>
                <button 
                    onClick={() => setShowGoals(!showGoals)}
                    style={{
                        ...styles.goalsBtn,
                        ...(showGoals ? styles.goalsBtnActive : {})
                    }}
                    title="Set workout goals"
                >
                    ⚙️ Goals
                </button>
            </div>

            {/* Goals Panel (collapsible) */}
            {showGoals && (
                <div style={styles.goalsPanel}>
                    <div style={styles.goalInput}>
                        <label style={styles.goalLabel}>Days / Week</label>
                        <input 
                            type="number"
                            min="1"
                            max="7"
                            value={goals.daysPerWeek}
                            onChange={(e) => updateGoal('workout-days', e.target.value)}
                            style={styles.goalField}
                        />
                    </div>
                    <div style={styles.goalInput}>
                        <label style={styles.goalLabel}>Minutes / Day</label>
                        <input 
                            type="number"
                            min="1"
                            max="300"
                            value={goals.minutesPerDay}
                            onChange={(e) => updateGoal('exercise-minutes', e.target.value)}
                            style={styles.goalField}
                        />
                    </div>
                    <div style={{display:'flex', alignItems:'flex-end', fontSize:'0.65em', color:'var(--text-muted)', fontStyle:'italic'}}>
                        Saved to Settings.md
                    </div>
                </div>
            )}

            {/* Progress Section */}
            <div style={styles.progressSection}>
                <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '0.85em'}}>
                    <span>
                        <strong>{scheduledDays}</strong> / {goals.daysPerWeek} days scheduled
                    </span>
                    <span style={{color: scheduledDays >= goals.daysPerWeek ? 'var(--interactive-accent)' : 'var(--text-muted)'}}>
                        {scheduledDays >= goals.daysPerWeek ? '✓ Goal met!' : `${Math.round(progressPercent)}%`}
                    </span>
                </div>
                <div style={styles.progressBar}>
                    <div style={{
                        ...styles.progressFill,
                        width: `${progressPercent}%`,
                        background: scheduledDays >= goals.daysPerWeek 
                            ? 'linear-gradient(90deg, #10b981, #34d399)' 
                            : 'var(--interactive-accent)'
                    }}></div>
                </div>
            </div>
            
            {/* Day Schedule Grid */}
            {days.map(day => {
                const fileValue = getServerValue(day);
                const displayValue = localChanges[day] !== undefined ? localChanges[day] : fileValue;
                const hasWorkout = displayValue && displayValue !== "";
                
                return (
                    <div key={day} style={{
                        ...styles.row,
                        opacity: hasWorkout ? 1 : 0.7
                    }}>
                        <div style={{
                            ...styles.label,
                            color: hasWorkout ? 'var(--interactive-accent)' : 'var(--text-muted)'
                        }}>
                            {hasWorkout ? '💪' : '😴'} {day}
                        </div>
                        <select 
                            style={styles.select}
                            value={displayValue} 
                            onChange={(e) => updateSchedule(day, e.target.value)}
                        >
                            <option value="">-- Rest Day --</option>
                            {plans.map(p => <option key={p} value={p}>{p}</option>)}
                            
                            {displayValue && !plans.includes(displayValue) && (
                                <option value={displayValue}>{displayValue}</option>
                            )}
                        </select>
                    </div>
                );
            })}
        </div>
    );
}

return { Func: WeeklyScheduler };
