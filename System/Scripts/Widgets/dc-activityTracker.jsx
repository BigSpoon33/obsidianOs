// ═══════════════════════════════════════════════════════════════════════════════
// ACTIVITY TRACKER v1.0
// Homepage visualization widget with heatmap, charts, and stats
// 
// Features:
//   - Dynamic activity loading from Settings.md
//   - GitHub-style heatmap (26 weeks)
//   - Area/Bar chart with week/month aggregation
//   - Statistics: average, max, streak, goal achievement
//   - Theme integration with Glo* components
//   - Tooltip on hover
//
// Usage in Homepage:
//   ```datacorejsx
//   await dc.require(dc.fileLink("System/Scripts/Widgets/dc-activityTracker.jsx"))
//   ```
// ═══════════════════════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────────────────────
// IMPORTS
// ─────────────────────────────────────────────────────────────────────────────

const { useTheme } = await dc.require(
    dc.fileLink("System/Scripts/Core/dc-themeProvider.jsx")
);

const { useComponentCSS, hexToRgba } = await dc.require(
    dc.fileLink("System/Scripts/Components/dc-gloButton.jsx")
);

const { GloSelect } = await dc.require(
    dc.fileLink("System/Scripts/Components/dc-gloSelect.jsx")
);

const { GloTabs } = await dc.require(
    dc.fileLink("System/Scripts/Components/dc-gloTabs.jsx")
);

const { GloBadge } = await dc.require(
    dc.fileLink("System/Scripts/Components/dc-gloBadge.jsx")
);

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────

const SETTINGS_PATH = "System/Settings.md";
const CELL_SIZE = 11;
const CELL_GAP = 3;
const CHART_HEIGHT = 60;
const CHART_WIDTH = 600;

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT: ActivityTracker
// ═══════════════════════════════════════════════════════════════════════════════

function ActivityTracker() {
    const { theme, isLoading: themeLoading } = useTheme();
    
    // State
    const [activities, setActivities] = dc.useState([]);
    const [selectedActivityId, setSelectedActivityId] = dc.useState(null);
    const [chartType, setChartType] = dc.useState("area");
    const [chartPeriod, setChartPeriod] = dc.useState("week");
    const [tooltip, setTooltip] = dc.useState(null);
    const [loading, setLoading] = dc.useState(true);
    
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
                    
                    // Select first activity by default
                    if (acts.length > 0 && !selectedActivityId) {
                        setSelectedActivityId(acts[0].id);
                    }
                }
            } catch (e) {
                console.error("Failed to load activities:", e);
            }
            setLoading(false);
        };
        
        loadActivities();
    }, []);
    
    // Get selected activity
    const selectedActivity = activities.find(a => a.id === selectedActivityId) || activities[0];
    
    // ─────────────────────────────────────────────────────────────────────────
    // LOAD HISTORICAL DATA
    // ─────────────────────────────────────────────────────────────────────────
    
    const useHistoricalData = (activity) => {
        const pages = dc.useQuery("@page");
        
        return dc.useMemo(() => {
            if (!pages || !activity) {
                return { map: new Map(), list: [], avg: 0, max: 0, total: 0, streak: 0, start: null, today: null };
            }
            
            const map = new Map();
            const today = dc.luxon.DateTime.now().startOf('day');
            const start = today.minus({ weeks: 26 }).startOf('week');
            
            // Collect data from all pages
            for (const p of pages) {
                const path = p.$path || p.path;
                const name = p.$name || p.name;
                if (!path) continue;
                
                const tfile = app.vault.getAbstractFileByPath(path);
                const cache = tfile ? app.metadataCache.getFileCache(tfile) : null;
                const fm = cache?.frontmatter || {};
                
                // Try to parse date from filename
                let date = dc.luxon.DateTime.fromISO(name);
                if (!date.isValid) {
                    // Try from frontmatter
                    if (fm["creation date"]) {
                        date = dc.luxon.DateTime.fromISO(fm["creation date"]);
                    } else if (fm.date) {
                        date = dc.luxon.DateTime.fromISO(fm.date);
                    }
                }
                
                if (!date.isValid) continue;
                date = date.startOf('day');
                if (date < start || date > today) continue;
                
                // Get value for this activity
                let val = 0;
                const raw = fm[activity.field];
                if (raw !== undefined && raw !== null && raw !== "") {
                    if (activity.type === "boolean") {
                        val = raw ? 1 : 0;
                    } else {
                        const num = Number(String(raw).replace(/[^\d.]/g, ""));
                        if (!isNaN(num)) val = num;
                    }
                }
                
                if (val > 0) {
                    const iso = date.toISODate();
                    const existing = map.get(iso);
                    if (!existing || val > existing.val) {
                        map.set(iso, { val, file: path, date });
                    }
                }
            }
            
            // Generate list of all days
            const list = [];
            let cursor = start;
            while (cursor <= today.endOf('week')) {
                list.push(cursor);
                cursor = cursor.plus({ days: 1 });
            }
            
            // Calculate statistics
            const values = Array.from(map.values()).map(x => x.val);
            const total = values.length;
            const avg = total ? (values.reduce((a, b) => a + b, 0) / total).toFixed(1) : 0;
            const max = Math.max(...values, 0);
            
            // Calculate current streak
            let streak = 0;
            let checkDate = today;
            while (map.has(checkDate.toISODate())) {
                streak++;
                checkDate = checkDate.minus({ days: 1 });
            }
            
            return { map, list, avg, max, total, streak, start, today };
        }, [pages, activity]);
    };
    
    const { map, list, avg, max, total, streak, start, today } = useHistoricalData(selectedActivity);
    
    // ─────────────────────────────────────────────────────────────────────────
    // CALCULATE CHART DATA
    // ─────────────────────────────────────────────────────────────────────────
    
    const buckets = dc.useMemo(() => {
        if (!selectedActivity || !start || !today) return [];
        
        const result = [];
        const groups = new Map();
        let iter = start;
        
        while (iter <= today) {
            const iso = iter.toISODate();
            const entry = map.get(iso);
            const val = entry ? entry.val : 0;
            
            let key = "";
            if (chartPeriod === 'week') {
                key = iter.startOf('week').toISODate();
            } else {
                key = iter.toFormat('yyyy-MM');
            }
            
            if (!groups.has(key)) {
                groups.set(key, { sum: 0, count: 0 });
            }
            const g = groups.get(key);
            g.sum += val;
            if (entry) g.count += 1;
            
            iter = iter.plus({ days: 1 });
        }
        
        for (const [, g] of groups) {
            let finalVal = 0;
            if (selectedActivity.type === 'count' || selectedActivity.type === 'boolean') {
                finalVal = g.sum;
            } else {
                finalVal = g.count > 0 ? (g.sum / g.count) : 0;
            }
            result.push({ val: finalVal });
        }
        
        return result;
    }, [map, start, today, chartPeriod, selectedActivity]);
    
    // ─────────────────────────────────────────────────────────────────────────
    // CHART PATHS
    // ─────────────────────────────────────────────────────────────────────────
    
    const chartMax = Math.max(...buckets.map(b => b.val), 1);
    const stepX = CHART_WIDTH / (buckets.length - 1 || 1);
    
    const getSmoothPath = (points) => {
        if (points.length < 2) return "";
        let d = `M ${points[0][0]},${points[0][1]}`;
        for (let i = 0; i < points.length - 1; i++) {
            const p0 = points[i === 0 ? 0 : i - 1];
            const p1 = points[i];
            const p2 = points[i + 1];
            const p3 = points[i + 2] || p2;
            const cp1x = p1[0] + (p2[0] - p0[0]) / 6;
            const cp1y = p1[1] + (p2[1] - p0[1]) / 6;
            const cp2x = p2[0] - (p3[0] - p1[0]) / 6;
            const cp2y = p2[1] - (p3[1] - p1[1]) / 6;
            d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2[0]},${p2[1]}`;
        }
        return d;
    };
    
    const pts = buckets.map((b, i) => [i * stepX, (CHART_HEIGHT - (b.val / chartMax) * CHART_HEIGHT)]);
    const curve = getSmoothPath(pts);
    const areaPath = `${curve} L ${CHART_WIDTH},${CHART_HEIGHT} L 0,${CHART_HEIGHT} Z`;
    
    // ─────────────────────────────────────────────────────────────────────────
    // HEATMAP HELPERS
    // ─────────────────────────────────────────────────────────────────────────
    
    const getOpacity = (val) => {
        if (!val) return 0.15;
        if (!selectedActivity) return 0.9;
        
        let pct = 0;
        if (selectedActivity.goal) {
            pct = val / selectedActivity.goal;
        } else if (selectedActivity.max) {
            pct = val / selectedActivity.max;
        } else {
            pct = val / (max || 1);
        }
        return Math.max(0.4, Math.min(pct, 1));
    };
    
    const weeks = Math.ceil(list.length / 7);
    const heatmapWidth = weeks * (CELL_SIZE + CELL_GAP);
    const heatmapHeight = 7 * (CELL_SIZE + CELL_GAP) + 20;
    
    // ─────────────────────────────────────────────────────────────────────────
    // THEME COLORS
    // ─────────────────────────────────────────────────────────────────────────
    
    const primary = theme?.["color-primary"] || "#7c3aed";
    const accent = theme?.["color-accent"] || "#f59e0b";
    const surface = theme?.["color-surface"] || "#2a2a3e";
    const background = theme?.["color-background"] || "#1e1e2e";
    const text = theme?.["color-text"] || "#ffffff";
    const textMuted = theme?.["color-text-muted"] || "#a0a0b0";
    
    // Activity color
    const activityColor = selectedActivity?.color || primary;
    
    // ─────────────────────────────────────────────────────────────────────────
    // LOADING STATE
    // ─────────────────────────────────────────────────────────────────────────
    
    if (themeLoading || loading) {
        return (
            <div style={{ ...styles.loadingContainer, background: surface }}>
                <span style={{ color: textMuted }}>Loading activity tracker...</span>
            </div>
        );
    }
    
    if (activities.length === 0) {
        return (
            <div style={{
                ...styles.emptyState,
                background: surface,
                color: textMuted,
            }}>
                <span style={{ fontSize: 32 }}>📊</span>
                <span>No activities configured.</span>
                <a 
                    href="System/Settings.md" 
                    className="internal-link"
                    style={{ color: primary }}
                >
                    Configure activities in Settings
                </a>
            </div>
        );
    }
    
    // Activity options for dropdown
    const activityOptions = activities.map(a => ({
        value: a.id,
        label: `${a.icon || "📊"} ${a.label}`,
    }));
    
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
            {/* Header with Activity Selector */}
            <div style={styles.header}>
                <div style={styles.headerLeft}>
                    <GloSelect
                        options={activityOptions}
                        value={selectedActivityId}
                        onChange={setSelectedActivityId}
                        size="small"
                        style={{ minWidth: 150 }}
                    />
                </div>
                <div style={styles.headerCenter}>
                    <h3 style={{ 
                        ...styles.title, 
                        color: activityColor,
                    }}>
                        {selectedActivity?.icon} {selectedActivity?.label?.toUpperCase()}
                    </h3>
                </div>
                <div style={styles.headerRight}>
                    {selectedActivity?.goal && (
                        <GloBadge variant="soft" color={activityColor}>
                            Goal: {selectedActivity.goal} {selectedActivity.unit}
                        </GloBadge>
                    )}
                </div>
            </div>
            
            {/* Heatmap */}
            <div style={styles.heatmapWrapper}>
                <svg 
                    width={heatmapWidth} 
                    height={heatmapHeight}
                    style={{ display: "block", overflow: "visible" }}
                >
                    {list.map((date, i) => {
                        const iso = date.toISODate();
                        const data = map.get(iso);
                        const col = Math.floor(i / 7);
                        const row = date.weekday - 1;
                        const x = col * (CELL_SIZE + CELL_GAP);
                        const y = row * (CELL_SIZE + CELL_GAP) + 15;
                        
                        // Month label
                        let monthLabel = null;
                        if (row === 0 && date.day <= 7) {
                            monthLabel = (
                                <text 
                                    x={x + CELL_SIZE / 2} 
                                    y={10} 
                                    style={{
                                        fill: textMuted,
                                        fontSize: 9,
                                        textAnchor: "middle",
                                        fontFamily: "monospace",
                                    }}
                                >
                                    {date.toFormat("MMM")}
                                </text>
                            );
                        }
                        
                        return (
                            <g key={iso}>
                                {monthLabel}
                                <rect
                                    x={x}
                                    y={y}
                                    width={CELL_SIZE}
                                    height={CELL_SIZE}
                                    rx={2}
                                    fill={data ? activityColor : textMuted}
                                    fillOpacity={data ? getOpacity(data.val) : 0.1}
                                    style={{ 
                                        cursor: data ? "pointer" : "default",
                                        transition: "all 0.2s ease",
                                    }}
                                    onMouseEnter={(e) => setTooltip({
                                        x: e.nativeEvent.offsetX,
                                        y: e.nativeEvent.offsetY,
                                        text: `${date.toFormat("MMM dd")}: ${data ? data.val : 0} ${selectedActivity?.unit || ""}`
                                    })}
                                    onMouseLeave={() => setTooltip(null)}
                                    onClick={() => data && app.workspace.openLinkText(data.file, "", false)}
                                />
                            </g>
                        );
                    })}
                </svg>
            </div>
            
            {/* Stats Grid */}
            <div style={styles.statsGrid}>
                <div style={styles.statCol}>
                    <span style={{ ...styles.statHeader, color: textMuted }}>x̅</span>
                    <span style={{ ...styles.statVal, color: text }}>{avg}</span>
                    <span style={{ ...styles.statLabel, color: textMuted }}>avg</span>
                </div>
                <div style={styles.statCol}>
                    <span style={{ ...styles.statHeader, color: textMuted }}>σ</span>
                    <span style={{ ...styles.statVal, color: text }}>{max}</span>
                    <span style={{ ...styles.statLabel, color: textMuted }}>max</span>
                </div>
                <div style={styles.statCol}>
                    <span style={{ ...styles.statHeader, color: textMuted }}>🔥</span>
                    <span style={{ ...styles.statVal, color: activityColor }}>{streak}</span>
                    <span style={{ ...styles.statLabel, color: textMuted }}>streak</span>
                </div>
                <div style={styles.statCol}>
                    <span style={{ ...styles.statHeader, color: textMuted }}>K</span>
                    <span style={{ ...styles.statVal, color: text }}>{total}</span>
                    <span style={{ ...styles.statLabel, color: textMuted }}>days</span>
                </div>
                {selectedActivity?.goal && (
                    <div style={styles.statCol}>
                        <span style={{ ...styles.statHeader, color: textMuted }}>🎯</span>
                        <span style={{ ...styles.statVal, color: activityColor }}>{selectedActivity.goal}</span>
                        <span style={{ ...styles.statLabel, color: textMuted }}>goal</span>
                    </div>
                )}
            </div>
            
            {/* Trend Chart */}
            <div style={{ 
                ...styles.chartContainer, 
                borderTopColor: `${primary}22`,
            }}>
                <svg 
                    viewBox={`0 -5 ${CHART_WIDTH} ${CHART_HEIGHT + 5}`}
                    preserveAspectRatio="none"
                    style={styles.chartSvg}
                >
                    <defs>
                        <linearGradient id={`chartGrad-${selectedActivityId}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor={activityColor} stopOpacity="0.5" />
                            <stop offset="100%" stopColor={activityColor} stopOpacity="0.0" />
                        </linearGradient>
                    </defs>
                    
                    {chartType === "area" ? (
                        <g>
                            <path 
                                d={areaPath} 
                                fill={`url(#chartGrad-${selectedActivityId})`}
                                style={{ opacity: 0.2 }}
                            />
                            <path 
                                d={curve} 
                                stroke={activityColor}
                                strokeWidth="1.5"
                                fill="none"
                            />
                        </g>
                    ) : (
                        <g>
                            {buckets.map((b, i) => {
                                const h = (b.val / chartMax) * CHART_HEIGHT;
                                return (
                                    <rect
                                        key={i}
                                        x={i * stepX}
                                        y={CHART_HEIGHT - h}
                                        width={Math.max(2, stepX - 2)}
                                        height={h}
                                        fill={activityColor}
                                        opacity={0.5}
                                        rx={2}
                                    />
                                );
                            })}
                        </g>
                    )}
                </svg>
                
                {/* Chart Controls */}
                <div style={styles.chartControls}>
                    <div style={styles.controlGroup}>
                        <span
                            onClick={() => setChartPeriod("week")}
                            style={{
                                ...styles.controlBtn,
                                color: chartPeriod === "week" ? text : textMuted,
                                fontWeight: chartPeriod === "week" ? "bold" : "normal",
                            }}
                        >
                            Week
                        </span>
                        <span style={{ opacity: 0.3, color: textMuted }}>/</span>
                        <span
                            onClick={() => setChartPeriod("month")}
                            style={{
                                ...styles.controlBtn,
                                color: chartPeriod === "month" ? text : textMuted,
                                fontWeight: chartPeriod === "month" ? "bold" : "normal",
                            }}
                        >
                            Month
                        </span>
                    </div>
                    <span style={{ color: textMuted, opacity: 0.5 }}>|</span>
                    <div style={styles.controlGroup}>
                        <span
                            onClick={() => setChartType("area")}
                            style={{
                                ...styles.controlBtn,
                                color: chartType === "area" ? text : textMuted,
                                fontWeight: chartType === "area" ? "bold" : "normal",
                            }}
                        >
                            Area
                        </span>
                        <span style={{ opacity: 0.3, color: textMuted }}>/</span>
                        <span
                            onClick={() => setChartType("bar")}
                            style={{
                                ...styles.controlBtn,
                                color: chartType === "bar" ? text : textMuted,
                                fontWeight: chartType === "bar" ? "bold" : "normal",
                            }}
                        >
                            Bar
                        </span>
                    </div>
                </div>
            </div>
            
            {/* Tooltip */}
            {tooltip && (
                <div style={{
                    ...styles.tooltip,
                    left: tooltip.x,
                    top: tooltip.y - 30,
                    background: background,
                    borderColor: `${primary}44`,
                    color: text,
                }}>
                    {tooltip.text}
                </div>
            )}
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
        fontFamily: "'JetBrains Mono', 'Menlo', monospace",
        position: "relative",
    },
    loadingContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 60,
        borderRadius: 12,
    },
    emptyState: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        padding: 40,
        borderRadius: 12,
        textAlign: "center",
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 25,
        paddingBottom: 12,
    },
    headerLeft: {
        flex: 1,
    },
    headerCenter: {
        flex: 2,
        textAlign: "center",
    },
    headerRight: {
        flex: 1,
        display: "flex",
        justifyContent: "flex-end",
    },
    title: {
        margin: 0,
        fontSize: 16,
        fontWeight: 500,
        letterSpacing: "0.2em",
        textTransform: "uppercase",
    },
    heatmapWrapper: {
        display: "flex",
        justifyContent: "center",
        width: "100%",
        marginBottom: 20,
        overflowX: "auto",
    },
    statsGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: 10,
        marginBottom: 20,
    },
    statCol: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
    },
    statHeader: {
        fontStyle: "italic",
        fontSize: 12,
    },
    statVal: {
        fontWeight: "bold",
        fontSize: 18,
    },
    statLabel: {
        fontSize: 10,
        textTransform: "uppercase",
    },
    chartContainer: {
        borderTop: "1px dashed",
        paddingTop: 15,
    },
    chartSvg: {
        display: "block",
        height: 60,
        width: "100%",
        marginBottom: 10,
    },
    chartControls: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
        fontSize: 11,
    },
    controlGroup: {
        display: "flex",
        gap: 8,
    },
    controlBtn: {
        cursor: "pointer",
        transition: "color 0.2s ease",
    },
    tooltip: {
        position: "absolute",
        padding: "4px 8px",
        borderRadius: 4,
        fontSize: 11,
        pointerEvents: "none",
        zIndex: 100,
        boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
        whiteSpace: "nowrap",
        border: "1px solid",
    },
};

// ═══════════════════════════════════════════════════════════════════════════════
// EXPORT
// ═══════════════════════════════════════════════════════════════════════════════

return { Func: ActivityTracker };
