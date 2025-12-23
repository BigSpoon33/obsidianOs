function MealPlanner() {
    // --- 1. SETUP & STATE ---
    const file = app.workspace.getActiveFile();
    const currentFile = dc.useFile(file); 
    const cache = app.metadataCache.getFileCache(file);
    const fm = currentFile?.frontmatter || cache?.frontmatter || {};

    // Local State
    const [localChanges, setLocalChanges] = dc.useState({});
    const [selectedSavedPlan, setSelectedSavedPlan] = dc.useState("");
    const [showGoals, setShowGoals] = dc.useState(false); 

    // Nutrition Goals
    const goals = {
        cal: Number(fm["goal-calories"]) || 2000,
        pro: Number(fm["goal-protein"]) || 150,
        carb: Number(fm["goal-carbs"]) || 200,
        fat: Number(fm["goal-fat"]) || 65
    };

    // --- 2. DATA FETCHING ---
    const recipeMap = new Map();
    const recipeBuckets = { Breakfast: [], Lunch: [], Dinner: [] };
    const savedPlans = [];
    const allFiles = app.vault.getMarkdownFiles();

    allFiles.forEach(f => {
        const fCache = app.metadataCache.getFileCache(f);
        const fFm = fCache?.frontmatter;
        if (!fFm) return;

        const hasCat = (str) => fFm.categories && JSON.stringify(fFm.categories).includes(str);
        const hasTag = (str) => fFm.tags && (Array.isArray(fFm.tags) ? fFm.tags.some(t=>t.includes(str)) : fFm.tags.includes(str));

        if (hasCat("Meal Plans")) {
            savedPlans.push(f);
            return; 
        }

        if ((hasCat("Recipes") || hasTag("recipe")) && !f.path.includes("Template")) {
            const name = f.basename;
            recipeMap.set(name, {
                cal: Number(fFm.calories) || 0,
                pro: Number(fFm.protein) || 0,
                carb: Number(fFm.carbs) || 0,
                fat: Number(fFm.fat) || 0
            });
            const typeStr = JSON.stringify(fFm.type || "").toLowerCase();
            if (typeStr.includes("breakfast")) recipeBuckets.Breakfast.push(name);
            if (typeStr.includes("lunch")) recipeBuckets.Lunch.push(name);
            if (typeStr.includes("dinner")) recipeBuckets.Dinner.push(name);
        }
    });

    Object.values(recipeBuckets).forEach(arr => arr.sort());
    savedPlans.sort((a,b) => a.basename.localeCompare(b.basename));

    // --- 3. HELPERS & HANDLERS ---
    const getSelection = (key) => {
        const raw = localChanges[key] !== undefined ? localChanges[key] : fm[key];
        if (!raw) return "";
        let str = (typeof raw === 'object' && raw.path) ? raw.path : raw;
        return str.replace(/[\[\]"]/g, "").replace(".md", "").trim();
    };

    const updateMeal = async (key, val) => {
        setLocalChanges(prev => ({ ...prev, [key]: val }));
        await app.fileManager.processFrontMatter(file, (f) => {
            if (!val) delete f[key]; 
            else f[key] = `[[${val}]]`; 
        });
    };

    const updateGoal = async (key, val) => {
        await app.fileManager.processFrontMatter(file, (f) => {
            f[key] = Number(val);
        });
    };

    const randomizeWeek = () => {
        const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
        const updates = {};
        const localUpdates = {};

        days.forEach(day => {
            const pick = (arr) => arr.length > 0 ? arr[Math.floor(Math.random() * arr.length)] : "";
            localUpdates[`${day}-break`] = pick(recipeBuckets.Breakfast);
            localUpdates[`${day}-lunch`] = pick(recipeBuckets.Lunch);
            localUpdates[`${day}-dinner`] = pick(recipeBuckets.Dinner);
            updates[`${day}-break`] = localUpdates[`${day}-break`];
            updates[`${day}-lunch`] = localUpdates[`${day}-lunch`];
            updates[`${day}-dinner`] = localUpdates[`${day}-dinner`];
        });

        setLocalChanges(prev => ({ ...prev, ...localUpdates }));
        app.fileManager.processFrontMatter(file, (f) => {
            for (const [k, v] of Object.entries(updates)) {
                if (v) f[k] = `[[${v}]]`;
            }
        });
    };

    const savePlan = async () => {
        await new Promise(r => setTimeout(r, 50)); 
        const name = window.prompt("Name this Meal Plan (e.g. 'High Protein Week'):");
        if (!name) return;

        const fileName = `${name}.md`;
        if (await app.vault.adapter.exists(fileName)) {
            new Notice(`⚠️ Error: "${fileName}" already exists!`);
            return;
        }

        const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
        const types = ["break", "lunch", "dinner"];
        let fmContent = `---\ncategories:\n  - "[[Meal Plans]]"\n`;
        fmContent += `goal-calories: ${goals.cal}\ngoal-protein: ${goals.pro}\ngoal-carbs: ${goals.carb}\ngoal-fat: ${goals.fat}\n`;

        days.forEach(day => {
            types.forEach(type => {
                const key = `${day}-${type}`;
                const val = getSelection(key);
                if (val) fmContent += `${key}: "[[${val}]]"\n`;
            });
        });
        fmContent += "---\n";

        const codeBlock = "```datacorejsx\n" +
            'const script = await dc.require(dc.fileLink("System/Scripts/dc-meal-planner.jsx"));\n' +
            "return function View() { return script.Func(); }\n" +
            "```";

        const fullContent = `${fmContent}\n# 🗓️ ${name}\n\n${codeBlock}`;
        try {
            await app.vault.create(fileName, fullContent);
            new Notice(`✅ Plan saved: ${name}`);
        } catch (e) {
            new Notice("Error saving plan.");
        }
    };

    const loadPlan = async (planFileBaseName) => {
        setSelectedSavedPlan(planFileBaseName);
        if (!planFileBaseName) return;

        const targetFile = savedPlans.find(f => f.basename === planFileBaseName);
        if (!targetFile) return;

        const savedFm = app.metadataCache.getFileCache(targetFile)?.frontmatter;
        if (!savedFm) return;

        const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
        const types = ["break", "lunch", "dinner"];
        const updates = {};
        const localUpdates = {};

        days.forEach(day => {
            types.forEach(type => {
                const key = `${day}-${type}`;
                const val = savedFm[key];
                let clean = "";
                if (val) clean = (typeof val === 'object' ? val.path : val).replace(/[\[\]"]/g, "").replace(".md", "");
                localUpdates[key] = clean;
                if (clean) updates[key] = `[[${clean}]]`;
                else updates[key] = null;
            });
        });

        if(savedFm["goal-calories"]) updates["goal-calories"] = savedFm["goal-calories"];
        if(savedFm["goal-protein"]) updates["goal-protein"] = savedFm["goal-protein"];
        if(savedFm["goal-carbs"]) updates["goal-carbs"] = savedFm["goal-carbs"];
        if(savedFm["goal-fat"]) updates["goal-fat"] = savedFm["goal-fat"];

        setLocalChanges(prev => ({ ...prev, ...localUpdates }));
        await app.fileManager.processFrontMatter(file, (f) => {
            for (const [k, v] of Object.entries(updates)) {
                if (v !== null) f[k] = v;
                else delete f[k];
            }
        });
        new Notice(`Loaded: ${planFileBaseName}`);
        setSelectedSavedPlan(""); 
    };

    // --- 4. CALCULATION & STATS ---
    const getDailyStats = (day) => {
        const stats = { cal: 0, pro: 0, carb: 0, fat: 0 };
        ["break", "lunch", "dinner"].forEach(type => {
            const name = getSelection(`${day}-${type}`);
            const data = recipeMap.get(name);
            if (data) {
                stats.cal += data.cal;
                stats.pro += data.pro;
                stats.carb += data.carb;
                stats.fat += data.fat;
            }
        });
        return stats;
    };

    const getWeeklyStats = () => {
        const total = { cal: 0, pro: 0, carb: 0, fat: 0 };
        const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
        days.forEach(day => {
            const s = getDailyStats(day);
            total.cal += s.cal;
            total.pro += s.pro;
            total.carb += s.carb;
            total.fat += s.fat;
        });
        return total;
    };

    // --- 5. UI COMPONENTS ---
    const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
    const caps = (s) => s.charAt(0).toUpperCase() + s.slice(1);

    // Visual Bar Component
    const ProgressBar = ({ current, max, color, height = '4px' }) => {
        const pct = Math.min((current / max) * 100, 100);
        return (
            <div style={{width:'100%', height: height, background:'rgba(255,255,255,0.05)', borderRadius:'2px', marginTop:'3px', overflow:'hidden'}}>
                <div style={{width: `${pct}%`, height:'100%', background: color, transition:'width 0.3s ease'}}></div>
            </div>
        );
    };

    const GoalInput = ({ label, field, val }) => (
        <div style={{display:'flex', flexDirection:'column', gap:'4px'}}>
            <label style={{fontSize:'0.7em', color:'var(--text-muted)', textTransform:'uppercase'}}>{label}</label>
            <input 
                type="number" 
                value={val} 
                onChange={(e) => updateGoal(field, e.target.value)}
                style={{width:'80px', background:'var(--background-primary)', border:'1px solid var(--background-modifier-border)', padding:'4px', borderRadius:'4px'}}
            />
        </div>
    );

    const DayCard = ({ day }) => {
        const stats = getDailyStats(day);
        
        // Calorie Color Logic
        const diff = Math.abs(stats.cal - goals.cal);
        let calColor = "var(--text-muted)";
        if (stats.cal > 0) {
            if (diff < 200) calColor = "#4facfe"; // Blue (Good)
            else if (stats.cal > goals.cal) calColor = "#ff6b6b"; // Red (Over)
            else calColor = "#ffd700"; // Yellow (Under)
        }

        return (
            <div className="day-card">
                <div className="day-header">{caps(day)}</div>
                <div className="day-meals">
                    {["break", "lunch", "dinner"].map((type, i) => {
                         const bucket = i===0 ? recipeBuckets.Breakfast : (i===1 ? recipeBuckets.Lunch : recipeBuckets.Dinner);
                         const label = i===0 ? "Breakfast" : (i===1 ? "Lunch" : "Dinner");
                         const icon = i===0 ? "🍳" : (i===1 ? "🥗" : "🥘");
                         return (
                            <div key={type} className="meal-slot">
                                <div className="slot-label"><span className="slot-icon">{icon}</span> {label}</div>
                                <select 
                                    className="meal-dropdown"
                                    value={getSelection(`${day}-${type}`)}
                                    onChange={(e) => updateMeal(`${day}-${type}`, e.target.value)}
                                >
                                    <option value="">— Select —</option>
                                    {bucket.map(n => <option key={n} value={n}>{n}</option>)}
                                </select>
                            </div>
                         );
                    })}
                </div>
                
                {/* NUTRITION FOOTER (WITH BARS!) */}
                <div className="nutrition-footer" style={{padding:'10px', borderTop:'1px solid var(--background-modifier-border)', fontSize:'0.75em', marginTop:'auto'}}>
                    
                    {/* Calories */}
                    <div style={{marginBottom:'8px'}}>
                        <div style={{display:'flex', justifyContent:'space-between', fontWeight:'bold', color: calColor}}>
                            <span>{stats.cal} kcal</span>
                            <span style={{opacity:0.5}}>{goals.cal}</span>
                        </div>
                        <ProgressBar current={stats.cal} max={goals.cal} color={calColor} />
                    </div>

                    {/* Macros Grid */}
                    <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'8px'}}>
                        {/* Protein */}
                        <div>
                            <div style={{color:'#00b894', display:'flex', justifyContent:'space-between'}}><span>P</span> <span>{stats.pro}</span></div>
                            <ProgressBar current={stats.pro} max={goals.pro} color="#00b894" height="3px" />
                        </div>
                        {/* Carbs */}
                        <div>
                            <div style={{color:'#fdcb6e', display:'flex', justifyContent:'space-between'}}><span>C</span> <span>{stats.carb}</span></div>
                            <ProgressBar current={stats.carb} max={goals.carb} color="#fdcb6e" height="3px" />
                        </div>
                        {/* Fat */}
                        <div>
                            <div style={{color:'#e17055', display:'flex', justifyContent:'space-between'}}><span>F</span> <span>{stats.fat}</span></div>
                            <ProgressBar current={stats.fat} max={goals.fat} color="#e17055" height="3px" />
                        </div>
                    </div>

                </div>
            </div>
        );
    };

    // Weekly Summary Component
    const WeeklySummary = () => {
        const weekly = getWeeklyStats();
        // Calculate percentages
        const pct = (val, goal) => Math.round((val / (goal * 7)) * 100);
        
        const StatPill = ({ label, val, goal, color }) => (
            <div style={{
                display:'flex', flexDirection:'column', flex:1, 
                background:'var(--background-secondary)', padding:'8px', borderRadius:'6px', border:'1px solid var(--background-modifier-border)'
            }}>
                <div style={{display:'flex', justifyContent:'space-between', fontSize:'0.75em', color:'var(--text-muted)', marginBottom:'4px'}}>
                    <span style={{fontWeight:'bold'}}>{label}</span>
                    <span>{pct(val, goal)}%</span>
                </div>
                <div style={{fontSize:'1.1em', fontWeight:'bold', color: 'var(--text-normal)'}}>
                    {val} <span style={{fontSize:'0.7em', color:'var(--text-muted)', fontWeight:'normal'}}>/ {goal * 7}</span>
                </div>
                <ProgressBar current={val} max={goal * 7} color={color} height="6px" />
            </div>
        );

        return (
            <div style={{display:'flex', gap:'10px', width:'100%', marginBottom:'20px', flexWrap:'wrap'}}>
                <StatPill label="Weekly Calories" val={weekly.cal} goal={goals.cal} color="#4facfe" />
                <StatPill label="Protein" val={weekly.pro} goal={goals.pro} color="#00b894" />
                <StatPill label="Carbs" val={weekly.carb} goal={goals.carb} color="#fdcb6e" />
                <StatPill label="Fat" val={weekly.fat} goal={goals.fat} color="#e17055" />
            </div>
        );
    };

    // --- 6. MAIN RENDER ---
    return (
        <div className="planner-container">
            {/* HEADER */}
            <div className="planner-header" style={{flexDirection: 'column', alignItems: 'flex-start', gap: '15px'}}>
                <div style={{display:'flex', justifyContent:'space-between', width:'100%', alignItems:'center'}}>
                    <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
                        <h2 style={{margin:0}}>🥦 Weekly Menu</h2>
                        <span className="planner-stats" style={{opacity: 0.6}}>({recipeMap.size} recipes)</span>
                    </div>
                    
                    <div className="planner-actions" style={{display:'flex', gap:'8px'}}>
                        <button onClick={() => setShowGoals(!showGoals)} style={{background: showGoals ? 'var(--interactive-accent)' : ''}} title="Goals">
                            ⚙️ Goals
                        </button>
                        <select 
                            style={{maxWidth:'120px', fontSize:'0.8em'}}
                            value={selectedSavedPlan}
                            onChange={(e) => loadPlan(e.target.value)}
                        >
                            <option value="">📂 Load Plan...</option>
                            {savedPlans.map(f => <option key={f.basename} value={f.basename}>{f.basename}</option>)}
                        </select>
                        <button className="btn-save" onClick={savePlan} title="Save Current Plan">💾 Save</button>
                        <button className="btn-random" onClick={randomizeWeek} title="Randomize All">🎲</button>
                    </div>
                </div>

                {/* GOALS MENU */}
                {showGoals && (
                    <div style={{
                        display: 'flex', gap: '15px', padding: '10px', 
                        background: 'var(--background-secondary-alt)', 
                        width: '100%', borderRadius: '8px', border: '1px solid var(--interactive-accent)'
                    }}>
                        <GoalInput label="Daily Calories" field="goal-calories" val={goals.cal} />
                        <GoalInput label="Protein (g)" field="goal-protein" val={goals.pro} />
                        <GoalInput label="Carbs (g)" field="goal-carbs" val={goals.carb} />
                        <GoalInput label="Fat (g)" field="goal-fat" val={goals.fat} />
                    </div>
                )}
                
                {/* NEW: WEEKLY TOTALS BAR */}
                <WeeklySummary />
            </div>

            {/* GRID */}
            <div className="planner-grid">
                {days.map(day => <DayCard key={day} day={day} />)}
            </div>
        </div>
    );
}

return { Func: MealPlanner };