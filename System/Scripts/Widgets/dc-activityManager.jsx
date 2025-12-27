// ═══════════════════════════════════════════════════════════════════════════════
// ACTIVITY MANAGER v1.0
// CRUD widget for managing tracked activities in Settings.md
// 
// Features:
//   - Display all configured activities
//   - Edit activity properties inline
//   - Delete activities
//   - Add new activities
//   - Theme integration with Glo* components
//
// Usage in Settings.md:
//   ```datacorejsx
//   await dc.require(dc.fileLink("System/Scripts/Widgets/dc-activityManager.jsx"))
//   ```
// ═══════════════════════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────────────────────
// IMPORTS
// ─────────────────────────────────────────────────────────────────────────────

const { useTheme } = await dc.require(
    dc.fileLink("System/Scripts/Core/dc-themeProvider.jsx")
);

const { GloButton, useComponentCSS, hexToRgba } = await dc.require(
    dc.fileLink("System/Scripts/Components/dc-gloButton.jsx")
);

const { GloInput } = await dc.require(
    dc.fileLink("System/Scripts/Components/dc-gloInput.jsx")
);

const { GloSelect } = await dc.require(
    dc.fileLink("System/Scripts/Components/dc-gloSelect.jsx")
);

const { GloCard } = await dc.require(
    dc.fileLink("System/Scripts/Components/dc-gloCard.jsx")
);

const { GloBadge } = await dc.require(
    dc.fileLink("System/Scripts/Components/dc-gloBadge.jsx")
);

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────

const SETTINGS_PATH = "System/Settings.md";

const ACTIVITY_TYPES = [
    { value: "value", label: "Value (numeric with goal)" },
    { value: "rating", label: "Rating (1-5 scale)" },
    { value: "boolean", label: "Boolean (yes/no toggle)" },
    { value: "count", label: "Count (auto-counted)" },
];

const DEFAULT_COLORS = [
    "#0984E3", "#00B894", "#FDCB6E", "#FF7675", "#E17055",
    "#6C5CE7", "#A29BFE", "#FD79A8", "#00CEC9", "#81ECEC"
];

const DEFAULT_ACTIVITY = {
    id: "",
    label: "",
    field: "",
    type: "value",
    goal: 100,
    unit: "",
    color: "#0984E3",
    icon: "📊",
    increment: null,
    max: null,
    managed: false,
};

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT: ActivityManager
// ═══════════════════════════════════════════════════════════════════════════════

function ActivityManager() {
    const { theme, isLoading: themeLoading } = useTheme();
    
    // State
    const [activities, setActivities] = dc.useState([]);
    const [editingId, setEditingId] = dc.useState(null);
    const [editingData, setEditingData] = dc.useState(null);
    const [isAdding, setIsAdding] = dc.useState(false);
    const [newActivity, setNewActivity] = dc.useState({ ...DEFAULT_ACTIVITY });
    const [loading, setLoading] = dc.useState(true);
    const [saving, setSaving] = dc.useState(false);
    
    // Load CSS
    useComponentCSS();
    
    // ─────────────────────────────────────────────────────────────────────────
    // LOAD ACTIVITIES FROM SETTINGS
    // ─────────────────────────────────────────────────────────────────────────
    
    dc.useEffect(() => {
        const loadActivities = () => {
            try {
                const file = app.vault.getAbstractFileByPath(SETTINGS_PATH);
                if (file) {
                    const cache = app.metadataCache.getFileCache(file);
                    const fm = cache?.frontmatter || {};
                    const acts = fm.activities || [];
                    setActivities(acts);
                }
            } catch (e) {
                console.error("Failed to load activities:", e);
            }
            setLoading(false);
        };
        
        loadActivities();
    }, []);
    
    // ─────────────────────────────────────────────────────────────────────────
    // SAVE ACTIVITIES TO SETTINGS
    // ─────────────────────────────────────────────────────────────────────────
    
    const saveActivities = async (newActivities) => {
        setSaving(true);
        try {
            const file = app.vault.getAbstractFileByPath(SETTINGS_PATH);
            if (file) {
                await app.fileManager.processFrontMatter(file, (fm) => {
                    fm.activities = newActivities;
                });
                setActivities(newActivities);
                new Notice("Activities saved!");
            }
        } catch (e) {
            console.error("Failed to save activities:", e);
            new Notice("Failed to save activities");
        }
        setSaving(false);
    };
    
    // ─────────────────────────────────────────────────────────────────────────
    // CRUD HANDLERS
    // ─────────────────────────────────────────────────────────────────────────
    
    const handleEdit = (activity) => {
        setEditingId(activity.id);
        setEditingData({ ...activity });
        setIsAdding(false);
    };
    
    const handleCancelEdit = () => {
        setEditingId(null);
        setEditingData(null);
    };
    
    const handleSaveEdit = async () => {
        if (!editingData || !editingData.id || !editingData.label || !editingData.field) {
            new Notice("ID, Label, and Field are required");
            return;
        }
        
        const updated = activities.map(a => 
            a.id === editingId ? { ...editingData } : a
        );
        await saveActivities(updated);
        setEditingId(null);
        setEditingData(null);
    };
    
    const handleDelete = async (activityId) => {
        const activity = activities.find(a => a.id === activityId);
        if (!activity) return;
        
        // Confirmation
        const confirmed = confirm(`Delete activity "${activity.label}"?`);
        if (!confirmed) return;
        
        const updated = activities.filter(a => a.id !== activityId);
        await saveActivities(updated);
    };
    
    const handleStartAdd = () => {
        // Generate random color and unique ID
        const randomColor = DEFAULT_COLORS[Math.floor(Math.random() * DEFAULT_COLORS.length)];
        const uniqueId = `activity_${Date.now()}`;
        
        setNewActivity({
            ...DEFAULT_ACTIVITY,
            id: uniqueId,
            color: randomColor,
        });
        setIsAdding(true);
        setEditingId(null);
        setEditingData(null);
    };
    
    const handleCancelAdd = () => {
        setIsAdding(false);
        setNewActivity({ ...DEFAULT_ACTIVITY });
    };
    
    const handleSaveNew = async () => {
        if (!newActivity.id || !newActivity.label || !newActivity.field) {
            new Notice("ID, Label, and Field are required");
            return;
        }
        
        // Check for duplicate ID
        if (activities.some(a => a.id === newActivity.id)) {
            new Notice("An activity with this ID already exists");
            return;
        }
        
        // Check for duplicate field
        if (activities.some(a => a.field === newActivity.field)) {
            new Notice("An activity with this field already exists");
            return;
        }
        
        // Clean up the activity object based on type
        const cleanActivity = { ...newActivity };
        if (cleanActivity.type === "rating") {
            cleanActivity.max = cleanActivity.max || 5;
            delete cleanActivity.goal;
            delete cleanActivity.increment;
        } else if (cleanActivity.type === "boolean") {
            delete cleanActivity.goal;
            delete cleanActivity.max;
            delete cleanActivity.increment;
            delete cleanActivity.unit;
        } else if (cleanActivity.type === "count") {
            delete cleanActivity.goal;
            delete cleanActivity.max;
            delete cleanActivity.increment;
            delete cleanActivity.unit;
        }
        
        // Remove null/undefined/empty values
        Object.keys(cleanActivity).forEach(key => {
            if (cleanActivity[key] === null || cleanActivity[key] === undefined || cleanActivity[key] === "") {
                delete cleanActivity[key];
            }
        });
        
        const updated = [...activities, cleanActivity];
        await saveActivities(updated);
        setIsAdding(false);
        setNewActivity({ ...DEFAULT_ACTIVITY });
    };
    
    // ─────────────────────────────────────────────────────────────────────────
    // THEME COLORS
    // ─────────────────────────────────────────────────────────────────────────
    
    const primary = theme?.["color-primary"] || "#7c3aed";
    const accent = theme?.["color-accent"] || "#f59e0b";
    const surface = theme?.["color-surface"] || "#2a2a3e";
    const background = theme?.["color-background"] || "#1e1e2e";
    const text = theme?.["color-text"] || "#ffffff";
    const textMuted = theme?.["color-text-muted"] || "#a0a0b0";
    
    // ─────────────────────────────────────────────────────────────────────────
    // LOADING STATE
    // ─────────────────────────────────────────────────────────────────────────
    
    if (themeLoading || loading) {
        return (
            <div style={styles.loadingContainer}>
                <span style={{ color: textMuted }}>Loading activities...</span>
            </div>
        );
    }
    
    // ─────────────────────────────────────────────────────────────────────────
    // RENDER
    // ─────────────────────────────────────────────────────────────────────────
    
    return (
        <div style={{
            ...styles.container,
            background: surface,
            border: `1px solid ${primary}33`,
            color: text,
        }}>
            {/* Header */}
            <div style={styles.header}>
                <div style={styles.headerLeft}>
                    <h3 style={{ ...styles.title, color: primary }}>
                        📊 Activity Manager
                    </h3>
                    <GloBadge variant="soft" color={accent}>
                        {activities.length} activities
                    </GloBadge>
                </div>
                <GloButton
                    label="+ Add Activity"
                    size="small"
                    onClick={handleStartAdd}
                    disabled={isAdding}
                />
            </div>
            
            {/* Activity List */}
            <div style={styles.activityList}>
                {activities.map((activity) => (
                    <ActivityCard
                        key={activity.id}
                        activity={activity}
                        isEditing={editingId === activity.id}
                        editingData={editingData}
                        onEdit={() => handleEdit(activity)}
                        onCancelEdit={handleCancelEdit}
                        onSaveEdit={handleSaveEdit}
                        onDelete={() => handleDelete(activity.id)}
                        onUpdateEditData={setEditingData}
                        theme={theme}
                        primary={primary}
                        textMuted={textMuted}
                        surface={surface}
                    />
                ))}
                
                {activities.length === 0 && !isAdding && (
                    <div style={{
                        ...styles.emptyState,
                        color: textMuted,
                        background: `${primary}11`,
                    }}>
                        No activities configured yet. Click "+ Add Activity" to get started!
                    </div>
                )}
            </div>
            
            {/* Add New Activity Form */}
            {isAdding && (
                <div style={{
                    ...styles.addForm,
                    background: `linear-gradient(135deg, ${accent}22, ${surface})`,
                    border: `2px solid ${accent}`,
                }}>
                    <div style={styles.addFormHeader}>
                        <span style={{ fontSize: 16, fontWeight: 600, color: accent }}>
                            ➕ New Activity
                        </span>
                    </div>
                    
                    <ActivityForm
                        data={newActivity}
                        onChange={setNewActivity}
                        theme={theme}
                        textMuted={textMuted}
                    />
                    
                    <div style={styles.addFormActions}>
                        <GloButton
                            label="Cancel"
                            variant="ghost"
                            size="small"
                            onClick={handleCancelAdd}
                        />
                        <GloButton
                            label="Create Activity"
                            size="small"
                            onClick={handleSaveNew}
                            disabled={saving}
                        />
                    </div>
                </div>
            )}
            
            {/* Saving indicator */}
            {saving && (
                <div style={{
                    ...styles.savingOverlay,
                    background: `${background}cc`,
                }}>
                    <span style={{ color: primary }}>Saving...</span>
                </div>
            )}
        </div>
    );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SUB-COMPONENT: Activity Card
// ═══════════════════════════════════════════════════════════════════════════════

function ActivityCard({
    activity,
    isEditing,
    editingData,
    onEdit,
    onCancelEdit,
    onSaveEdit,
    onDelete,
    onUpdateEditData,
    theme,
    primary,
    textMuted,
    surface,
}) {
    const activityColor = activity.color || primary;
    
    if (isEditing) {
        return (
            <div style={{
                ...styles.activityCard,
                background: `linear-gradient(135deg, ${activityColor}22, ${surface})`,
                border: `2px solid ${activityColor}`,
            }}>
                <div style={styles.cardHeader}>
                    <span style={{ fontSize: 20 }}>{editingData.icon || "📊"}</span>
                    <span style={{ fontSize: 14, fontWeight: 600, color: activityColor }}>
                        Editing: {activity.label}
                    </span>
                </div>
                
                <ActivityForm
                    data={editingData}
                    onChange={onUpdateEditData}
                    theme={theme}
                    textMuted={textMuted}
                />
                
                <div style={styles.cardActions}>
                    <GloButton
                        label="Cancel"
                        variant="ghost"
                        size="small"
                        onClick={onCancelEdit}
                    />
                    <GloButton
                        label="Save Changes"
                        size="small"
                        onClick={onSaveEdit}
                    />
                </div>
            </div>
        );
    }
    
    return (
        <div style={{
            ...styles.activityCard,
            background: surface,
            borderLeft: `4px solid ${activityColor}`,
        }}>
            <div style={styles.cardHeader}>
                <div style={styles.cardTitle}>
                    <span style={{ fontSize: 24 }}>{activity.icon || "📊"}</span>
                    <div>
                        <div style={{ fontSize: 14, fontWeight: 600 }}>{activity.label}</div>
                        <div style={{ fontSize: 11, color: textMuted }}>
                            Field: <code style={styles.code}>{activity.field}</code>
                        </div>
                    </div>
                </div>
                <div style={styles.cardBadges}>
                    <GloBadge variant="soft" size="small" color={activityColor}>
                        {activity.type}
                    </GloBadge>
                    {activity.managed && (
                        <GloBadge variant="outlined" size="small" color={textMuted}>
                            managed
                        </GloBadge>
                    )}
                </div>
            </div>
            
            <div style={styles.cardDetails}>
                {activity.goal && (
                    <span style={{ fontSize: 12, color: textMuted }}>
                        Goal: <strong style={{ color: activityColor }}>{activity.goal}</strong> {activity.unit}
                    </span>
                )}
                {activity.max && (
                    <span style={{ fontSize: 12, color: textMuted }}>
                        Max: <strong style={{ color: activityColor }}>{activity.max}</strong>
                    </span>
                )}
                {activity.increment && (
                    <span style={{ fontSize: 12, color: textMuted }}>
                        Increment: <strong>{activity.increment}</strong>
                    </span>
                )}
            </div>
            
            <div style={styles.cardActions}>
                <GloButton
                    label="Edit"
                    variant="ghost"
                    size="small"
                    onClick={onEdit}
                />
                <GloButton
                    label="Delete"
                    variant="ghost"
                    size="small"
                    onClick={onDelete}
                    style={{ color: "#ef4444" }}
                />
            </div>
        </div>
    );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SUB-COMPONENT: Activity Form
// ═══════════════════════════════════════════════════════════════════════════════

function ActivityForm({ data, onChange, theme, textMuted }) {
    const updateField = (key, value) => {
        onChange({ ...data, [key]: value });
    };
    
    const showGoalField = data.type === "value";
    const showMaxField = data.type === "rating";
    const showUnitField = data.type === "value";
    const showIncrementField = data.type === "value";
    
    return (
        <div style={styles.form}>
            <div style={styles.formRow}>
                <div style={styles.formField}>
                    <label style={{ ...styles.label, color: textMuted }}>Label *</label>
                    <GloInput
                        value={data.label || ""}
                        onChange={(val) => updateField("label", val)}
                        placeholder="Water"
                        size="small"
                    />
                </div>
                <div style={styles.formField}>
                    <label style={{ ...styles.label, color: textMuted }}>Icon</label>
                    <GloInput
                        value={data.icon || ""}
                        onChange={(val) => updateField("icon", val)}
                        placeholder="💧"
                        size="small"
                        style={{ width: 60 }}
                    />
                </div>
            </div>
            
            <div style={styles.formRow}>
                <div style={styles.formField}>
                    <label style={{ ...styles.label, color: textMuted }}>ID *</label>
                    <GloInput
                        value={data.id || ""}
                        onChange={(val) => updateField("id", val.toLowerCase().replace(/\s+/g, "_"))}
                        placeholder="water"
                        size="small"
                    />
                </div>
                <div style={styles.formField}>
                    <label style={{ ...styles.label, color: textMuted }}>Field (frontmatter key) *</label>
                    <GloInput
                        value={data.field || ""}
                        onChange={(val) => updateField("field", val.toLowerCase().replace(/\s+/g, "-"))}
                        placeholder="water-ml"
                        size="small"
                    />
                </div>
            </div>
            
            <div style={styles.formRow}>
                <div style={styles.formField}>
                    <label style={{ ...styles.label, color: textMuted }}>Type</label>
                    <GloSelect
                        options={ACTIVITY_TYPES}
                        value={data.type || "value"}
                        onChange={(val) => updateField("type", val)}
                        size="small"
                    />
                </div>
                <div style={styles.formField}>
                    <label style={{ ...styles.label, color: textMuted }}>Color</label>
                    <div style={styles.colorPicker}>
                        {DEFAULT_COLORS.map(color => (
                            <div
                                key={color}
                                onClick={() => updateField("color", color)}
                                style={{
                                    ...styles.colorSwatch,
                                    background: color,
                                    border: data.color === color ? "2px solid white" : "2px solid transparent",
                                    boxShadow: data.color === color ? `0 0 8px ${color}` : "none",
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
            
            {showGoalField && (
                <div style={styles.formRow}>
                    <div style={styles.formField}>
                        <label style={{ ...styles.label, color: textMuted }}>Goal</label>
                        <GloInput
                            type="number"
                            value={data.goal || ""}
                            onChange={(val) => updateField("goal", Number(val) || null)}
                            placeholder="3500"
                            size="small"
                        />
                    </div>
                    {showUnitField && (
                        <div style={styles.formField}>
                            <label style={{ ...styles.label, color: textMuted }}>Unit</label>
                            <GloInput
                                value={data.unit || ""}
                                onChange={(val) => updateField("unit", val)}
                                placeholder="ml"
                                size="small"
                            />
                        </div>
                    )}
                    {showIncrementField && (
                        <div style={styles.formField}>
                            <label style={{ ...styles.label, color: textMuted }}>Increment</label>
                            <GloInput
                                type="number"
                                value={data.increment || ""}
                                onChange={(val) => updateField("increment", Number(val) || null)}
                                placeholder="750"
                                size="small"
                            />
                        </div>
                    )}
                </div>
            )}
            
            {showMaxField && (
                <div style={styles.formRow}>
                    <div style={styles.formField}>
                        <label style={{ ...styles.label, color: textMuted }}>Max Value</label>
                        <GloInput
                            type="number"
                            value={data.max || 5}
                            onChange={(val) => updateField("max", Number(val) || 5)}
                            placeholder="5"
                            size="small"
                        />
                    </div>
                </div>
            )}
            
            <div style={styles.formRow}>
                <div style={styles.formField}>
                    <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                        <input
                            type="checkbox"
                            checked={data.managed || false}
                            onChange={(e) => updateField("managed", e.target.checked)}
                            style={{ width: 16, height: 16 }}
                        />
                        <span style={{ fontSize: 12, color: textMuted }}>
                            Managed by another widget (read-only in logger)
                        </span>
                    </label>
                </div>
            </div>
        </div>
    );
}

// ═══════════════════════════════════════════════════════════════════════════════
// STYLES
// ═══════════════════════════════════════════════════════════════════════════════

const styles = {
    container: {
        padding: 20,
        borderRadius: 12,
        position: "relative",
        fontFamily: "Inter, system-ui, sans-serif",
    },
    loadingContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 40,
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    headerLeft: {
        display: "flex",
        alignItems: "center",
        gap: 12,
    },
    title: {
        margin: 0,
        fontSize: 18,
        fontWeight: 600,
    },
    activityList: {
        display: "flex",
        flexDirection: "column",
        gap: 12,
    },
    activityCard: {
        padding: 16,
        borderRadius: 10,
        border: "1px solid rgba(255,255,255,0.1)",
    },
    cardHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 12,
    },
    cardTitle: {
        display: "flex",
        alignItems: "center",
        gap: 12,
    },
    cardBadges: {
        display: "flex",
        gap: 6,
    },
    cardDetails: {
        display: "flex",
        gap: 16,
        marginBottom: 12,
        flexWrap: "wrap",
    },
    cardActions: {
        display: "flex",
        gap: 8,
        justifyContent: "flex-end",
    },
    code: {
        background: "rgba(255,255,255,0.1)",
        padding: "2px 6px",
        borderRadius: 4,
        fontSize: 11,
        fontFamily: "monospace",
    },
    emptyState: {
        padding: 30,
        textAlign: "center",
        borderRadius: 8,
        fontSize: 14,
    },
    addForm: {
        marginTop: 20,
        padding: 16,
        borderRadius: 10,
    },
    addFormHeader: {
        marginBottom: 16,
    },
    addFormActions: {
        display: "flex",
        gap: 8,
        justifyContent: "flex-end",
        marginTop: 16,
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: 12,
    },
    formRow: {
        display: "flex",
        gap: 12,
        flexWrap: "wrap",
    },
    formField: {
        display: "flex",
        flexDirection: "column",
        gap: 4,
        flex: 1,
        minWidth: 120,
    },
    label: {
        fontSize: 11,
        fontWeight: 500,
        textTransform: "uppercase",
        letterSpacing: "0.5px",
    },
    colorPicker: {
        display: "flex",
        gap: 6,
        flexWrap: "wrap",
    },
    colorSwatch: {
        width: 24,
        height: 24,
        borderRadius: 6,
        cursor: "pointer",
        transition: "all 0.2s ease",
    },
    savingOverlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 12,
        zIndex: 10,
    },
};

// ═══════════════════════════════════════════════════════════════════════════════
// EXPORT
// ═══════════════════════════════════════════════════════════════════════════════

return { Func: ActivityManager };
