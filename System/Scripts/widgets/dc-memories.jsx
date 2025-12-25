/* ==================================================================
    MEMORIES (React + Datacore)
    - Adapted for Annie's "Fitness OS"
    - Loads CSS from: System/Scripts/styles/dc-memories.css
    - Source: Files tagged #daily
 ================================================================== */

// --- CONFIGURATION ---
const CONFIG = {
    TITLE: "Memories",
    // ✨ CHANGED: Use a query instead of a folder
    QUERY: "@page and #daily", 
    FIELDS: {
        DATE: ["date", "Date", "created", "created_at"],
        TIME: ["hour", "Hour", "time", "timestamp"]
    },
    LABELS: {
        MONTHS: [, "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        DAYS: [, "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        PERIODS: ["Dawn", "Morning", "Afternoon", "Evening"]
    }
};

// --- SERVICE (Time & Formatting) ---
const TimeParserService = {
    clampTime({ h = 0, m = 0 } = {}) { return { h: Math.max(0, Math.min(23, h | 0)), m: Math.max(0, Math.min(59, m | 0)) }; },
    toISO({ y, m, d }) { return `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`; },
    toJSDate({ y, m, d }) { return new Date(y, m - 1, d); },
    
    // Robust Date Extractor
    extractDate(raw) {
        if (!raw) return null;
        // Handle Datacore Date Objects
        if (raw.year != null && raw.month != null && raw.day != null) return { y: raw.year | 0, m: raw.month | 0, d: raw.day | 0 };
        // Handle JS Date Objects
        if (raw instanceof Date && !isNaN(raw)) return { y: raw.getFullYear(), m: raw.getMonth() + 1, d: raw.getDate() };
        // Handle Strings (YYYY-MM-DD)
        if (typeof raw === "string") {
            let match = raw.match(/(\d{4})[-\/.](\d{1,2})[-\/.](\d{1,2})/);
            if (match) return { y: +match[1], m: +match[2], d: +match[3] };
            // Handle YYYYMMDD
            const digits = raw.replace(/\D/g, "");
            if (digits.length >= 8) return { y: +digits.slice(0, 4), m: +digits.slice(4, 6), d: +digits.slice(6, 8) };
        }
        return null;
    },

    // Extract Time (or default to Noon)
    extractTime(raw) {
        if (!raw) return null;
        if (raw instanceof Date && !isNaN(raw)) return this.clampTime({ h: raw.getHours(), m: raw.getMinutes() });
        // Handle Strings "14:30"
        if (typeof raw === "string") {
            const match = raw.match(/(\d{1,2})[:hH\.](\d{2})/);
            if (match) return this.clampTime({ h: +match[1], m: +match[2] });
        }
        return null;
    },

    // "Afternoon of Monday" logic
    getPeriodAlias(dateObj, hour) {
        const jsDate = this.toJSDate(dateObj);
        const dayIdx = jsDate.getDay() === 0 ? 7 : jsDate.getDay();
        const weekDay = CONFIG.LABELS.DAYS[dayIdx];
        let period = "Evening"; 
        if (hour <= 4) period = "Dawn";
        else if (hour <= 11) period = "Morning";
        else if (hour <= 17) period = "Afternoon";
        
        return `${weekDay} ${period}`;
    },
    formatDateFull({ y, m, d }) { return `${CONFIG.LABELS.MONTHS[m]} ${d}, ${y}`; }
};

// --- SERVICE (Markdown Parsing) ---
const MarkdownService = {
    clean(md) { return md.replace(/^---[\s\S]*?---\s*/m, "").replace(/```[\s\S]*?```/g, " ").replace(/\r/g, "\n"); },
    mdToHtml(text) {
        // Simple Markdown to HTML converter for previews
        let s = text.replace(/`([^`]+)`/g, "<code>$1</code>");
        s = s.replace(/(\*\*|__)(.+?)\1/g, "<strong>$2</strong>");
        s = s.replace(/(\*|_)([^*_][\s\S]*?)\1/g, "<em>$2</em>");
        s = s.replace(/\[\[([^\]|#]+)(?:#([^\]|]+))?(?:\|([^\]]+))?\]\]/g, (m, target, anchor, alias) => `<span class="internal-link">${alias || target}</span>`);
        return s;
    },
    getFirstParagraph(md) {
        // Get first non-empty paragraph that isn't a header or blockquote
        const paragraphs = this.clean(md).split(/\n\s*\n+/).map(x => x.trim()).filter(Boolean);
        if (!paragraphs.length) return "";
        let p = paragraphs[0].replace(/^#{1,6}\s+/gm, "").replace(/^\s{0,3}>\s?/gm, "").replace(/!\[[^\]]*\]\([^)]*\)/g, "");
        return this.mdToHtml(p).replace(/\s+/g, " ").trim();
    }
};

// --- HOOKS ---

// 1. Hook to read file content (for the preview snippet)
function useMemoryPreview(path) {
    const [preview, setPreview] = dc.useState("...");
    // Re-run if file changes
    const revision = dc.useIndexUpdates({ debounce: 3000 });
    
    dc.useEffect(() => {
        let active = true;
        (async () => {
            try {
                const af = app.vault.getAbstractFileByPath(path);
                if (!af) { if (active) setPreview("N/A"); return; }
                const content = await app.vault.read(af);
                if (active) setPreview(MarkdownService.getFirstParagraph(content) || "(No content)");
            } catch { if (active) setPreview("Error reading file"); }
        })();
        return () => { active = false; };
    }, [path, revision]);
    return preview;
}

// 2. Hook to find matching memory files
function useMemoryData() {
    const pages = dc.useQuery(CONFIG.QUERY);
    const currentFile = dc.useCurrentFile();

    // Determine the "Anchor Date" (Today, or the date of the currently open note)
    const anchorDate = dc.useMemo(() => {
        const m = (currentFile?.$name || "").match(/^(\d{4})-(\d{2})-(\d{2})$/);
        const now = new Date();
        if (m) return { y: +m[1], m: +m[2], d: +m[3] };
        return { y: now.getFullYear(), m: now.getMonth() + 1, d: now.getDate() };
    }, [currentFile]);

    const memoryItems = dc.useMemo(() => {
        return pages.map(page => {
            let rawDate = null;
            
            // Try explicit fields first
            for (const f of CONFIG.FIELDS.DATE) { 
                const v = page.value(f); 
                if (v != null) { rawDate = v; break; } 
            }
            // Try extracting from filename (e.g. 2023-12-22)
            if (!rawDate) rawDate = page.$name; 
            
            const dateObj = TimeParserService.extractDate(rawDate);
            
            // Fallback for time
            let timeObj = { h: 12, m: 0 }; // Default to noon
            
            return { page, date: dateObj, time: timeObj };
        }).filter(i => i.date != null);
    }, [pages]);
    return { memoryItems, anchorDate };
}

// 3. Hook to calculate time differences (Tabs)
function useMemoryTabs(memoryItems, anchorDate) {
    const [activeTab, setActiveTab] = dc.useState(null);
    const tabs = dc.useMemo(() => {
        const sub = (d, t, a) => {
            const js = TimeParserService.toJSDate(d);
            if (t === "days") js.setDate(js.getDate() - a);
            if (t === "months") js.setMonth(js.getMonth() - a);
            if (t === "years") js.setFullYear(js.getFullYear() - a);
            return { y: js.getFullYear(), m: js.getMonth() + 1, d: js.getDate() };
        };
        
        const existing = new Set(memoryItems.map(i => TimeParserService.toISO(i.date)));
        
        // Define Logic: What is "A memory"?
        const fixed = [
            { label: "1 Week", date: sub(anchorDate, "days", 7) },
            { label: "1 Month", date: sub(anchorDate, "months", 1) },
            { label: "3 Months", date: sub(anchorDate, "months", 3) },
            { label: "6 Months", date: sub(anchorDate, "months", 6) }
        ].filter(c => existing.has(TimeParserService.toISO(c.date)));

        // Calculate "Years Ago" dynamically
        const years = new Set(memoryItems.filter(i => i.date.m === anchorDate.m && i.date.d === anchorDate.d && i.date.y < anchorDate.y).map(i => anchorDate.y - i.date.y));
        const yCandidates = Array.from(years).sort((a, b) => a - b).map(d => ({ label: d === 1 ? "1 Year" : `${d} Years`, date: sub(anchorDate, "years", d) }));

        return [...fixed, ...yCandidates];
    }, [memoryItems, anchorDate]);

    dc.useEffect(() => { 
        // Auto-select the first tab if none selected
        if (!activeTab && tabs.length > 0) setActiveTab(tabs[0]); 
        // Or if the current tab became invalid, pick the first one
        if (activeTab && !tabs.find(t => t.label === activeTab.label)) setActiveTab(tabs[0] || null);
    }, [tabs]);

    return { tabs, activeTab, setActiveTab };
}

// --- COMPONENTS ---
function MemoryCard({ item }) {
    const preview = useMemoryPreview(item.page.$path);
    const open = () => app.workspace.openLinkText(item.page.$path, "/", true);
    const alias = TimeParserService.getPeriodAlias(item.date, item.time.h);
    
    return (
        <div className="mem-card" role="button" tabIndex={0} onClick={open}>
            <div className="mem-head">
                <span className="mem-title-link">{alias}</span>
                <span className="mem-time" style={{opacity:0.5, fontSize:'0.8em'}}>{item.page.$name}</span>
            </div>
            <div className="mem-body markdown-rendered" dangerouslySetInnerHTML={{ __html: preview }} />
        </div>
    );
}

function MemoryGrid({ activeTab, memoryItems }) {
    if (!activeTab) return <div className="mem-empty">No memories found for this day.</div>;
    
    const target = TimeParserService.toISO(activeTab.date);
    const items = memoryItems.filter(i => TimeParserService.toISO(i.date) === target);

    return (
        <>
            <h3 className="mem-subtitle">{TimeParserService.formatDateFull(activeTab.date)}</h3>
            <div className="mem-grid">
                {items.map((it, i) => <MemoryCard key={it.page.$path + i} item={it} />)}
            </div>
        </>
    );
}

// --- MAIN COMPONENT ---
function MemoriasBoard() {
    // 1. Load CSS
    dc.useEffect(() => {
        const loadStyles = async () => {
            const cssPath = "System/Scripts/styles/dc-memories.css";
            if (await app.vault.adapter.exists(cssPath)) {
                const css = await app.vault.adapter.read(cssPath);
                const id = "dc-memories-styles";
                let style = document.getElementById(id);
                if (!style) {
                    style = document.createElement("style");
                    style.id = id;
                    document.head.appendChild(style);
                }
                style.textContent = css;
            }
        };
        loadStyles();
    }, []);

    const [isOpen, setIsOpen] = dc.useState(false);
    const { memoryItems, anchorDate } = useMemoryData();
    const { tabs, activeTab, setActiveTab } = useMemoryTabs(memoryItems, anchorDate);
    
    const toggle = () => setIsOpen(p => !p);

    return (
        <div className="memorias-root">
            <div className="title-tabs">
                <span className={`title-tab ${isOpen ? "is-active" : ""}`} onClick={toggle} style={{cursor:"pointer"}}>
                    {CONFIG.TITLE} {tabs.length > 0 && <span style={{opacity:0.6, fontSize:'0.8em'}}>({tabs.length})</span>}
                </span>
            </div>

            {isOpen && (
                <div className="mem-text">
                    {tabs.length > 0 ? (
                        <>
                            <nav className="mem-tabs">
                                {tabs.map(tab => (
                                    <button key={tab.label} className={`mem-tab ${activeTab?.label === tab.label ? "mem-tab--active" : ""}`} onClick={() => setActiveTab(tab)}>{tab.label}</button>
                                ))}
                            </nav>
                            <MemoryGrid activeTab={activeTab} memoryItems={memoryItems} />
                        </>
                    ) : (
                        <div style={{padding:'20px', textAlign:'center', opacity:0.6}}>
                            No past entries found matching this date.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

return { Func: MemoriasBoard };