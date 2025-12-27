// ═══════════════════════════════════════════════════════════════════════════════
// TODAY'S WORKOUT WIDGET
// Displays today's scheduled workout from Settings.md
// Includes workout-completed toggle to track daily completion
// Syncs exercise-minutes with workout duration on completion
// Full theme integration with Glo components
// ═══════════════════════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────────────────────
// IMPORTS
// ─────────────────────────────────────────────────────────────────────────────

const { useTheme } = await dc.require(
    dc.fileLink("System/Scripts/Core/dc-themeProvider.jsx")
);

const { GloToggle } = await dc.require(
    dc.fileLink("System/Scripts/Components/dc-gloToggle.jsx")
);

const { GloBadge } = await dc.require(
    dc.fileLink("System/Scripts/Components/dc-gloBadge.jsx")
);

const { GloButton, useComponentCSS } = await dc.require(
    dc.fileLink("System/Scripts/Components/dc-gloButton.jsx")
);

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

function WorkoutWidget() {
    // ─────────────────────────────────────────────────────────────────────────
    // THEME & SETUP
    // ─────────────────────────────────────────────────────────────────────────
    
    const { theme, isLoading: themeLoading, settings } = useTheme();
    const showBackgrounds = settings?.widgetBackgrounds !== false;
    
    // Load CSS
    useComponentCSS();
    
    // ─────────────────────────────────────────────────────────────────────────
    // THEME COLORS
    // ─────────────────────────────────────────────────────────────────────────
    
    const primary = theme?.["color-primary"] || "#7c3aed";
    const accent = theme?.["color-accent"] || "#f59e0b";
    const surface = theme?.["color-surface"] || "#2a2a3e";
    const text = theme?.["color-text"] || "#ffffff";
    const textMuted = theme?.["color-text-muted"] || "#a0a0b0";
    const success = theme?.["color-success"] || "#10b981";
    const warning = theme?.["color-warning"] || "#f59e0b";
    const info = theme?.["color-info"] || "#3b82f6";
    
    // ─────────────────────────────────────────────────────────────────────────
    // DATA FETCHING
    // ─────────────────────────────────────────────────────────────────────────
    
    const currentFile = dc.useCurrentFile();
    const pages = dc.useQuery("@page");
    
    if (themeLoading || !pages) {
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

    const settingsNote = pages.find(p => 
        (p.tags && (p.tags.has("#settings") || p.tags.has("settings"))) || 
        p.$path.endsWith("System/Settings.md")
    );

    if (!settingsNote) {
        return (
            <div style={{
                padding: 16,
                background: showBackgrounds ? surface : "transparent",
                borderRadius: 12,
                border: showBackgrounds ? `1px solid ${primary}33` : "none",
                color: textMuted,
                textAlign: "center",
            }}>
                System/Settings.md not found
            </div>
        );
    }

    // ─────────────────────────────────────────────────────────────────────────
    // STATE
    // ─────────────────────────────────────────────────────────────────────────
    
    const fm = currentFile?.frontmatter || {};
    const [isCompleted, setIsCompleted] = dc.useState(fm["workout-completed"] || false);
    
    // Sync completion state when frontmatter changes
    dc.useEffect(() => {
        const val = fm["workout-completed"] || false;
        setIsCompleted(val);
    }, [fm["workout-completed"]]);

    // ─────────────────────────────────────────────────────────────────────────
    // DETERMINE TODAY'S SCHEDULE
    // ─────────────────────────────────────────────────────────────────────────
    
    const dayName = moment().format('dddd').toLowerCase();
    const dayNameCapitalized = dayName.charAt(0).toUpperCase() + dayName.slice(1);
    const scheduleKey = `schedule-${dayName}`;
    const workoutLink = settingsNote.value(scheduleKey);

    // ─────────────────────────────────────────────────────────────────────────
    // REST DAY DISPLAY
    // ─────────────────────────────────────────────────────────────────────────
    
    if (!workoutLink) {
        return (
            <div style={{
                padding: 20,
                borderRadius: 12,
                background: showBackgrounds ? surface : "transparent",
                border: showBackgrounds ? `1px dashed ${textMuted}44` : "none",
                textAlign: "center",
                color: text,
            }}>
                <div style={{ fontSize: 40, marginBottom: 8 }}>🧘</div>
                <div style={{ fontSize: 16, fontWeight: 600, color: primary, marginBottom: 4 }}>
                    Rest Day
                </div>
                <div style={{ fontSize: 12, color: textMuted }}>
                    No workout scheduled for {dayNameCapitalized}
                </div>
                <GloBadge variant="soft" color={info} size="small" style={{ marginTop: 12 }}>
                    Recovery & Relaxation
                </GloBadge>
            </div>
        );
    }

    // ─────────────────────────────────────────────────────────────────────────
    // FETCH WORKOUT PLAN
    // ─────────────────────────────────────────────────────────────────────────
    
    const workoutPath = workoutLink.path ? workoutLink.path : workoutLink.toString();
    const workoutPage = pages.find(p => p.$path === workoutPath || p.$path.endsWith(workoutPath));

    if (!workoutPage) {
        return (
            <div style={{
                padding: 16,
                background: showBackgrounds ? surface : "transparent",
                borderRadius: 12,
                border: showBackgrounds ? `1px solid ${primary}33` : "none",
                color: textMuted,
            }}>
                Plan not found: {workoutPath}
            </div>
        );
    }

    // ─────────────────────────────────────────────────────────────────────────
    // EXTRACT WORKOUT DATA
    // ─────────────────────────────────────────────────────────────────────────
    
    const focus = workoutPage.value("focus") || "Fitness";
    const duration = workoutPage.value("duration") || 0;
    const exercises = workoutPage.value("exercises") || [];
    const warmup = workoutPage.value("warmup") || [];
    const cooldown = workoutPage.value("cooldown") || [];

    // ─────────────────────────────────────────────────────────────────────────
    // COMPLETION HANDLER WITH EXERCISE-MINUTES SYNC
    // ─────────────────────────────────────────────────────────────────────────
    
    const handleCompletionChange = async (completed) => {
        setIsCompleted(completed);
        
        // Update exercise-minutes based on completion
        const file = app.workspace.getActiveFile();
        if (file) {
            await app.fileManager.processFrontMatter(file, (fileFm) => {
                fileFm["exercise-minutes"] = completed ? (Number(duration) || 0) : 0;
            });
        }
        
        if (completed) {
            new Notice(`Workout complete! ${duration} min logged 💪`);
        } else {
            new Notice("Workout marked incomplete");
        }
    };

    // ─────────────────────────────────────────────────────────────────────────
    // HELPER: Render Exercise List (Warmup/Cooldown/Main)
    // ─────────────────────────────────────────────────────────────────────────
    
    const renderSimpleList = (items, color, title, icon) => (
        <div style={{
            marginBottom: 12,
            padding: 10,
            background: showBackgrounds ? `${color}11` : "transparent",
            borderRadius: 8,
            borderLeft: `3px solid ${color}`,
        }}>
            <div style={{
                fontSize: 11,
                fontWeight: 700,
                color: color,
                marginBottom: 6,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                display: "flex",
                alignItems: "center",
                gap: 6,
            }}>
                <span>{icon}</span>
                <span>{title}</span>
            </div>
            {items.map((item, i) => {
                const isObject = item && typeof item === 'object' && !item.path;
                const rawLink = isObject ? item.link : item;
                const name = rawLink?.fileName ? rawLink.fileName() : rawLink?.toString() || "Unknown";
                const path = rawLink?.path || null;
                const itemInfo = isObject ? item.info : null;

                return (
                    <div key={i} style={{
                        fontSize: 12,
                        opacity: 0.9,
                        marginBottom: 3,
                        paddingLeft: 4,
                        display: "flex",
                        gap: 6,
                        alignItems: "center",
                    }}>
                        <span style={{ opacity: 0.4, fontSize: 10 }}>•</span>
                        {path ? (
                            <a href={path} className="internal-link" style={{
                                textDecoration: "none",
                                color: text,
                            }}>
                                {name}
                            </a>
                        ) : (
                            <span>{name}</span>
                        )}
                        {itemInfo && (
                            <span style={{ color: textMuted, fontSize: 11 }}>— {itemInfo}</span>
                        )}
                    </div>
                );
            })}
        </div>
    );

    // ─────────────────────────────────────────────────────────────────────────
    // RENDER
    // ─────────────────────────────────────────────────────────────────────────
    
    return (
        <div style={{
            padding: 16,
            borderRadius: 12,
            background: showBackgrounds ? surface : "transparent",
            borderLeft: `4px solid ${isCompleted ? success : primary}`,
            border: showBackgrounds ? `1px solid ${isCompleted ? success : primary}33` : "none",
            borderLeftWidth: 4,
            color: text,
            transition: "all 0.3s ease",
        }}>
            {/* Header */}
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: 14,
                gap: 12,
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1 }}>
                    <span style={{ fontSize: 28 }}>{isCompleted ? "✅" : "🏋️"}</span>
                    <div>
                        <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600 }}>
                            {workoutPage.$name}
                        </h3>
                        <div style={{ 
                            fontSize: 11, 
                            color: textMuted, 
                            textTransform: "uppercase", 
                            letterSpacing: "0.5px",
                            marginTop: 2,
                        }}>
                            {dayNameCapitalized} • {duration} min
                        </div>
                    </div>
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <GloToggle
                        targetKey="workout-completed"
                        onLabel="Done!"
                        offLabel="Mark Done"
                        onSub="Workout complete"
                        offSub="Tap to complete"
                        width="150px"
                        padding="8px 12px"
                        onChange={handleCompletionChange}
                    />
                    <a 
                        href={workoutPage.$path} 
                        className="internal-link" 
                        style={{ 
                            textDecoration: "none", 
                            fontSize: 20,
                            opacity: 0.7,
                            transition: "opacity 0.2s ease",
                        }}
                        title="Open workout plan"
                    >
                        ↗️
                    </a>
                </div>
            </div>

            {/* Focus */}
            <div style={{
                fontSize: 13,
                marginBottom: 12,
                padding: "8px 10px",
                background: showBackgrounds ? `${primary}11` : "transparent",
                borderRadius: 6,
                display: "flex",
                alignItems: "center",
                gap: 8,
            }}>
                <span>🎯</span>
                <span style={{ color: textMuted }}>Focus:</span>
                <strong style={{ color: primary }}>{focus}</strong>
            </div>

            {/* Warm Up - Uses warning/orange color */}
            {warmup.length > 0 && renderSimpleList(warmup, warning, "Warm Up", "🔥")}

            {/* Main Exercises - Uses primary color */}
            {exercises.length > 0 && (
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                    marginBottom: 12,
                }}>
                    <div style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: primary,
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        marginBottom: 4,
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                    }}>
                        <span>💪</span>
                        <span>Exercises</span>
                        <GloBadge variant="soft" color={primary} size="small">
                            {exercises.length}
                        </GloBadge>
                    </div>
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
                                display: "flex",
                                flexDirection: "column",
                                gap: 3,
                                padding: "8px 10px",
                                background: showBackgrounds ? `${text}05` : "transparent",
                                borderRadius: 6,
                                borderLeft: `2px solid ${primary}44`,
                            }}>
                                <div style={{ 
                                    display: "flex", 
                                    alignItems: "center", 
                                    gap: 8 
                                }}>
                                    <span style={{ 
                                        opacity: 0.4, 
                                        fontSize: 11, 
                                        width: 16,
                                        textAlign: "right",
                                    }}>
                                        {i + 1}.
                                    </span>
                                    {path ? (
                                        <a href={path} className="internal-link" style={{
                                            fontWeight: 600,
                                            color: text,
                                            textDecoration: "none",
                                            fontSize: 13,
                                        }}>
                                            {name}
                                        </a>
                                    ) : (
                                        <span style={{ fontWeight: 600, fontSize: 13 }}>{name}</span>
                                    )}
                                </div>
                                {(sets || reps || weight) && (
                                    <div style={{
                                        display: "flex",
                                        gap: 12,
                                        fontSize: 11,
                                        color: textMuted,
                                        marginLeft: 24,
                                    }}>
                                        {sets && (
                                            <span title="Sets">
                                                🔢 <strong style={{ color: accent }}>{sets}</strong> sets
                                            </span>
                                        )}
                                        {reps && (
                                            <span title="Reps">
                                                🔁 <strong style={{ color: accent }}>{reps}</strong> reps
                                            </span>
                                        )}
                                        {weight && (
                                            <span title="Weight">
                                                ⚖️ {weight}
                                            </span>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Cool Down - Uses info/blue color */}
            {cooldown.length > 0 && renderSimpleList(cooldown, info, "Cool Down", "❄️")}

            {/* Completion Status Footer */}
            {isCompleted && (
                <div style={{
                    marginTop: 12,
                    padding: "8px 12px",
                    background: `${success}15`,
                    borderRadius: 6,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    fontSize: 12,
                    color: success,
                    fontWeight: 600,
                }}>
                    <span>✓</span>
                    <span>Completed! {duration} minutes logged.</span>
                </div>
            )}
        </div>
    );
}

// ═══════════════════════════════════════════════════════════════════════════════
// EXPORT
// ═══════════════════════════════════════════════════════════════════════════════

return { Func: WorkoutWidget };
