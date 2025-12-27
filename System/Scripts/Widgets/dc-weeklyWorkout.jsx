// ═══════════════════════════════════════════════════════════════════════════════
// WEEKLY WORKOUT SCHEDULER
// Manages weekly workout schedule and exercise goals
// Goals are stored in Settings.md activities array
// Full theme integration with Glo components
// ═══════════════════════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────────────────────
// IMPORTS
// ─────────────────────────────────────────────────────────────────────────────

const { useTheme } = await dc.require(
    dc.fileLink("System/Scripts/Core/dc-themeProvider.jsx")
);

const { GloButton, useComponentCSS } = await dc.require(
    dc.fileLink("System/Scripts/Components/dc-gloButton.jsx")
);

const { GloInput } = await dc.require(
    dc.fileLink("System/Scripts/Components/dc-gloInput.jsx")
);

const { GloSelect } = await dc.require(
    dc.fileLink("System/Scripts/Components/dc-gloSelect.jsx")
);

const { GloBar } = await dc.require(
    dc.fileLink("System/Scripts/Components/dc-gloBar.jsx")
);

const { GloBadge } = await dc.require(
    dc.fileLink("System/Scripts/Components/dc-gloBadge.jsx")
);

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────

const SETTINGS_PATH = "System/Settings.md";
const DAYS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

function WeeklyScheduler() {
    // ─────────────────────────────────────────────────────────────────────────
    // THEME & SETUP
    // ─────────────────────────────────────────────────────────────────────────
    
    const { theme, isLoading: themeLoading, settings } = useTheme();
    const showBackgrounds = settings?.widgetBackgrounds !== false;
    
    // Load CSS
    useComponentCSS();
    
    // File setup
    const file = app.workspace.getActiveFile();
    const currentFile = dc.useFile(file);
    const cache = app.metadataCache.getFileCache(file);
    const frontmatter = currentFile?.frontmatter || cache?.frontmatter || {};
    
    // State
    const [localChanges, setLocalChanges] = dc.useState({});
    const [showGoals, setShowGoals] = dc.useState(false);
    const [localGoals, setLocalGoals] = dc.useState(null);
    
    // ─────────────────────────────────────────────────────────────────────────
    // THEME COLORS
    // ─────────────────────────────────────────────────────────────────────────
    
    const primary = theme?.["color-primary"] || "#7c3aed";
    const accent = theme?.["color-accent"] || "#f59e0b";
    const surface = theme?.["color-surface"] || "#2a2a3e";
    const background = theme?.["color-background"] || "#1e1e2e";
    const text = theme?.["color-text"] || "#ffffff";
    const textMuted = theme?.["color-text-muted"] || "#a0a0b0";
    const success = theme?.["color-success"] || "#10b981";
    
    // Button theme settings
    const buttonIdleBg = theme?.["button-idle-bg"] || null;
    const buttonHoverBg = theme?.["button-hover-bg"] || null;
    const buttonActiveBg = theme?.["button-active-bg"] || null;
    
    // ─────────────────────────────────────────────────────────────────────────
    // LOAD GOALS FROM SETTINGS
    // ─────────────────────────────────────────────────────────────────────────
    
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

    // ─────────────────────────────────────────────────────────────────────────
    // DATA PARSING
    // ─────────────────────────────────────────────────────────────────────────
    
    const getServerValue = (day) => {
        const raw = frontmatter[`schedule-${day}`] || frontmatter[`schedule-${day.toLowerCase()}`];
        if (!raw) return "";

        let str = "";
        if (typeof raw === 'object' && raw.path) str = raw.path; 
        else if (typeof raw === 'string') str = raw; 
        
        if (str.endsWith(".md")) str = str.slice(0, -3);
        return str.replace(/[\[\]"]/g, "").trim();
    };

    // ─────────────────────────────────────────────────────────────────────────
    // FIND WORKOUT PLANS
    // ─────────────────────────────────────────────────────────────────────────
    
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

    // Build options for GloSelect
    const planOptions = [
        { value: "", label: "-- Rest Day --" },
        ...plans.map(p => ({ value: p, label: p }))
    ];

    // ─────────────────────────────────────────────────────────────────────────
    // CALCULATE PROGRESS
    // ─────────────────────────────────────────────────────────────────────────
    
    const getScheduledDaysCount = () => {
        return DAYS.filter(day => {
            const val = localChanges[day] !== undefined ? localChanges[day] : getServerValue(day);
            return val && val !== "";
        }).length;
    };
    
    const scheduledDays = getScheduledDaysCount();
    const progressPercent = Math.min((scheduledDays / goals.daysPerWeek) * 100, 100);
    const goalMet = scheduledDays >= goals.daysPerWeek;

    // ─────────────────────────────────────────────────────────────────────────
    // UPDATE HANDLERS
    // ─────────────────────────────────────────────────────────────────────────
    
    const updateSchedule = async (day, planName) => {
        setLocalChanges(prev => ({ ...prev, [day]: planName }));
        await app.fileManager.processFrontMatter(file, (fm) => {
            const key = `schedule-${day}`;
            if (planName === "") delete fm[key]; 
            else fm[key] = `[[${planName}]]`; 
        });
    };

    const updateGoal = async (activityId, newGoal) => {
        const numGoal = Number(newGoal) || 0;
        
        // Update local state immediately
        setLocalGoals(prev => {
            const current = prev || goals;
            const updated = { ...current };
            if (activityId === 'workout-days') updated.daysPerWeek = numGoal;
            else if (activityId === 'exercise-minutes') updated.minutesPerDay = numGoal;
            return updated;
        });
        
        // Save to Settings.md
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

    // ─────────────────────────────────────────────────────────────────────────
    // LOADING STATE
    // ─────────────────────────────────────────────────────────────────────────
    
    if (themeLoading) {
        return (
            <div style={{ 
                padding: 20, 
                textAlign: "center", 
                color: textMuted,
                opacity: 0.7 
            }}>
                Loading...
            </div>
        );
    }

    const isDataReady = Object.keys(frontmatter).length > 0;

    // ─────────────────────────────────────────────────────────────────────────
    // RENDER
    // ─────────────────────────────────────────────────────────────────────────
    
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            padding: 16,
            background: showBackgrounds ? surface : "transparent",
            borderRadius: 12,
            border: showBackgrounds ? `1px solid ${primary}33` : "none",
            color: text,
        }}>
            {/* Header */}
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 20 }}>🗓️</span>
                    <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: primary }}>
                        Weekly Schedule
                    </h3>
                    {!isDataReady && (
                        <span style={{ fontSize: 11, color: textMuted, fontStyle: "italic" }}>
                            Syncing...
                        </span>
                    )}
                </div>
                <GloButton
                    label={showGoals ? "✕ Close" : "⚙️ Goals"}
                    size="small"
                    onClick={() => setShowGoals(!showGoals)}
                    bg={showGoals ? buttonActiveBg : buttonIdleBg}
                    hoverBg={buttonHoverBg}
                    activeBg={buttonActiveBg}
                    style={{ fontSize: 11, padding: "6px 12px" }}
                />
            </div>

            {/* Goals Panel (collapsible) */}
            {showGoals && (
                <div style={{
                    display: "flex",
                    gap: 16,
                    padding: 14,
                    background: `${accent}15`,
                    borderRadius: 8,
                    border: `1px solid ${accent}44`,
                    alignItems: "flex-end",
                }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                        <label style={{ fontSize: 10, color: textMuted, textTransform: "uppercase" }}>
                            Days / Week
                        </label>
                        <GloInput
                            type="number"
                            value={goals.daysPerWeek}
                            onChange={(val) => updateGoal('workout-days', val)}
                            min={1}
                            max={7}
                            size="small"
                            style={{ width: 70 }}
                        />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                        <label style={{ fontSize: 10, color: textMuted, textTransform: "uppercase" }}>
                            Minutes / Day
                        </label>
                        <GloInput
                            type="number"
                            value={goals.minutesPerDay}
                            onChange={(val) => updateGoal('exercise-minutes', val)}
                            min={1}
                            max={300}
                            size="small"
                            style={{ width: 70 }}
                        />
                    </div>
                    <div style={{ 
                        fontSize: 10, 
                        color: textMuted, 
                        fontStyle: "italic",
                        paddingBottom: 6,
                    }}>
                        Saved to Settings.md
                    </div>
                </div>
            )}

            {/* Progress Section */}
            <div style={{
                padding: 12,
                background: showBackgrounds ? `${primary}11` : "transparent",
                borderRadius: 8,
            }}>
                <div style={{ 
                    display: "flex", 
                    justifyContent: "space-between", 
                    alignItems: "center",
                    marginBottom: 8,
                    fontSize: 13,
                }}>
                    <span>
                        <strong style={{ color: primary }}>{scheduledDays}</strong>
                        <span style={{ color: textMuted }}> / {goals.daysPerWeek} days scheduled</span>
                    </span>
                    {goalMet ? (
                        <GloBadge variant="filled" color={success} size="small">
                            ✓ Goal met!
                        </GloBadge>
                    ) : (
                        <span style={{ fontSize: 12, color: textMuted }}>
                            {Math.round(progressPercent)}%
                        </span>
                    )}
                </div>
                <GloBar
                    value={scheduledDays}
                    max={goals.daysPerWeek}
                    draggable={false}
                    showSprite={true}
                    showValue={false}
                    height="10px"
                    fillGradient={goalMet 
                        ? `linear-gradient(90deg, ${success}, ${success}cc)` 
                        : `linear-gradient(90deg, ${primary}, ${accent})`
                    }
                />
            </div>
            
            {/* Day Schedule Grid */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {DAYS.map(day => {
                    const fileValue = getServerValue(day);
                    const displayValue = localChanges[day] !== undefined ? localChanges[day] : fileValue;
                    const hasWorkout = displayValue && displayValue !== "";
                    
                    // Build options including current value if not in plans
                    let dayOptions = [...planOptions];
                    if (displayValue && !plans.includes(displayValue)) {
                        dayOptions.push({ value: displayValue, label: displayValue });
                    }
                    
                    return (
                        <div key={day} style={{
                            display: "grid",
                            gridTemplateColumns: "100px 1fr",
                            alignItems: "center",
                            gap: 10,
                            opacity: hasWorkout ? 1 : 0.6,
                        }}>
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 6,
                                justifyContent: "flex-end",
                                fontSize: 13,
                                fontWeight: 600,
                                color: hasWorkout ? primary : textMuted,
                                textTransform: "capitalize",
                            }}>
                                <span>{hasWorkout ? "💪" : "😴"}</span>
                                <span>{day}</span>
                            </div>
                            <GloSelect
                                value={displayValue}
                                options={dayOptions}
                                onChange={(val) => updateSchedule(day, val)}
                                size="small"
                                style={{ width: "100%" }}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

// ═══════════════════════════════════════════════════════════════════════════════
// EXPORT
// ═══════════════════════════════════════════════════════════════════════════════

return { Func: WeeklyScheduler };
