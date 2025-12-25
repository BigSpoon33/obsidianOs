function DailyNutrition() {
    // --- 1. SETUP & DATA FETCHING ---
    const file = app.workspace.getActiveFile();
    const currentFile = dc.useFile(file); 
    const fm = currentFile?.frontmatter || {};

    const plannerFile = app.metadataCache.getFirstLinkpathDest("Meal Planner.md", "");
    const plannerCache = plannerFile ? app.metadataCache.getFileCache(plannerFile) : null;
    const plannerFm = plannerCache?.frontmatter || {};

    const goals = {
        cal: Number(plannerFm["goal-calories"]) || 2000,
        pro: Number(plannerFm["goal-protein"]) || 150,
        carb: Number(plannerFm["goal-carbs"]) || 200,
        fat: Number(plannerFm["goal-fat"]) || 65
    };

    const recipeMap = new Map();
    const allFiles = app.vault.getMarkdownFiles();
    const options = []; 

    allFiles.forEach(f => {
        const fFm = app.metadataCache.getFileCache(f)?.frontmatter;
        if (!fFm) return;
        const isRecipe = (fFm.tags && fFm.tags.includes('recipe')) || 
                         (JSON.stringify(fFm.categories || "").includes("Recipes"));
        
        if (isRecipe && !f.path.includes("Template")) {
            const name = f.basename;
            recipeMap.set(name, {
                cal: Number(fFm.calories) || 0,
                pro: Number(fFm.protein) || 0,
                carb: Number(fFm.carbs) || 0,
                fat: Number(fFm.fat) || 0
            });
            options.push(name);
        }
    });
    options.sort();

    // --- 2. LOCAL STATE ---
    const getInitialMeal = (type) => {
        const clean = (val) => (val ? val.replace(/[\[\]"]/g, "").replace(".md", "").trim() : "");
        if (fm[type]) return clean(fm[type]);
        
        const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
        const todayName = days[new Date().getDay()];
        const key = `${todayName}-${type === 'breakfast' ? 'break' : type}`;
        if (plannerFm[key]) return clean(plannerFm[key]);
        return "";
    };

    const getInitialSnacks = () => {
        if (!fm.snacks) return [];
        return fm.snacks.map(s => s.replace(/[\[\]"]/g, "").replace(".md", "").trim());
    };

    const [meals, setMeals] = dc.useState(() => ({
        breakfast: getInitialMeal("breakfast"),
        lunch: getInitialMeal("lunch"),
        dinner: getInitialMeal("dinner")
    }));
    
    const [snacks, setSnacks] = dc.useState(() => getInitialSnacks());
    
    const calculateStats = () => {
        const currentStats = { cal: 0, pro: 0, carb: 0, fat: 0 };
        const add = (name) => {
            if (!name) return;
            const data = recipeMap.get(name);
            if (data) {
                currentStats.cal += data.cal;
                currentStats.pro += data.pro;
                currentStats.carb += data.carb;
                currentStats.fat += data.fat;
            }
        };
        add(meals.breakfast);
        add(meals.lunch);
        add(meals.dinner);
        snacks.forEach(s => add(s));
        return currentStats;
    };

    const stats = calculateStats();

    // --- 3. AUTO-SYNC ---
    dc.useEffect(() => {
        const saveToFrontmatter = async () => {
            await app.fileManager.processFrontMatter(file, (f) => {
                f.breakfast = meals.breakfast ? `[[${meals.breakfast}]]` : null;
                f.lunch = meals.lunch ? `[[${meals.lunch}]]` : null;
                f.dinner = meals.dinner ? `[[${meals.dinner}]]` : null;
                f.snacks = snacks.length > 0 ? snacks.map(s => `[[${s}]]`) : [];
                f["consumed-calories"] = stats.cal;
                f["consumed-protein"] = stats.pro;
                f["consumed-carbs"] = stats.carb;
                f["consumed-fat"] = stats.fat;
            });
        };
        saveToFrontmatter();
    }, [meals, snacks]); 

    // --- 4. HANDLERS ---
    const updateMeal = (type, val) => {
        setMeals(prev => ({ ...prev, [type]: val }));
    };

    const addSnack = () => setSnacks(prev => [...prev, ""]);
    const updateSnack = (index, val) => {
        setSnacks(prev => {
            const copy = [...prev];
            copy[index] = val;
            return copy;
        });
    };
    const removeSnack = (index) => setSnacks(prev => prev.filter((_, i) => i !== index));

    // --- 5. COMPONENTS ---
    const ProgressBar = ({ current, max, color, height = '4px' }) => {
        const pct = Math.min((current / max) * 100, 100);
        return (
            <div style={{width:'100%', height: height, background:'rgba(255,255,255,0.05)', borderRadius:'2px', marginTop:'3px', overflow:'hidden'}}>
                <div style={{width: `${pct}%`, height:'100%', background: color, transition:'width 0.3s ease'}}></div>
            </div>
        );
    };

    const MealRow = ({ label, type, currentVal, icon }) => {
        // UI Logic: Determine status text/color
        const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
        const todayName = days[new Date().getDay()];
        const plannedName = (plannerFm[`${todayName}-${type === 'breakfast' ? 'break' : type}`] || "").replace(/[\[\]"]/g, "");
        
        const isPlannedMatch = currentVal === plannedName;
        const hasMeal = currentVal !== "";

        let statusText = "";
        let statusColor = "var(--text-muted)";

        if (hasMeal) {
            if (isPlannedMatch) {
                statusText = "⭐ Plan Matched";
                statusColor = "#00b894"; // Green for success
            } else {
                statusText = "🔄 Swapped";
                statusColor = "#fdcb6e"; // Yellow/Orange for edit
            }
        }

        return (
            <div style={{display:'flex', flexDirection:'column', marginBottom:'12px'}}>
                <div style={{display:'flex', justifyContent:'space-between', fontSize:'0.8em', color:'var(--text-muted)', marginBottom:'4px'}}>
                    <span style={{display:'flex', alignItems:'center', gap:'6px'}}>{icon} {label}</span>
                    {hasMeal && <span style={{color: statusColor, fontWeight: 'bold'}}>{statusText}</span>}
                </div>
                <div style={{display:'flex', gap:'8px'}}>
                    <select 
                        style={{flex:1, background: 'var(--background-primary)', border: '1px solid var(--background-modifier-border)'}}
                        value={currentVal}
                        onChange={(e) => updateMeal(type, e.target.value)}
                    >
                        <option value="">— Skip / Fasting —</option>
                        {options.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                </div>
            </div>
        );
    };

    return (
        <div className="daily-nutrition" style={{padding:'15px', background:'var(--background-secondary)', borderRadius:'8px', border:'1px solid var(--background-modifier-border)'}}>
            
            {/* HEADER */}
            <div style={{marginBottom:'20px'}}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:'5px'}}>
                    <h3 style={{margin:0, fontSize:'1em'}}>🍎 Nutrition</h3>
                    <span style={{fontSize:'0.9em', fontWeight:'bold', color: stats.cal > goals.cal ? '#ff6b6b' : '#4facfe'}}>
                        {stats.cal} / {goals.cal} kcal
                    </span>
                </div>
                <ProgressBar current={stats.cal} max={goals.cal} color={stats.cal > goals.cal ? '#ff6b6b' : '#4facfe'} height="6px" />
                <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'8px', marginTop:'10px', fontSize:'0.8em'}}>
                    <div><div style={{color:'#00b894', display:'flex', justifyContent:'space-between'}}><span>Pro</span> <span>{stats.pro}</span></div><ProgressBar current={stats.pro} max={goals.pro} color="#00b894" height="3px" /></div>
                    <div><div style={{color:'#fdcb6e', display:'flex', justifyContent:'space-between'}}><span>Carb</span> <span>{stats.carb}</span></div><ProgressBar current={stats.carb} max={goals.carb} color="#fdcb6e" height="3px" /></div>
                    <div><div style={{color:'#e17055', display:'flex', justifyContent:'space-between'}}><span>Fat</span> <span>{stats.fat}</span></div><ProgressBar current={stats.fat} max={goals.fat} color="#e17055" height="3px" /></div>
                </div>
            </div>

            {/* MEALS */}
            <MealRow label="Breakfast" type="breakfast" icon="🍳" currentVal={meals.breakfast} />
            <MealRow label="Lunch" type="lunch" icon="🥗" currentVal={meals.lunch} />
            <MealRow label="Dinner" type="dinner" icon="🥘" currentVal={meals.dinner} />

            {/* SNACKS */}
            <div style={{borderTop:'1px solid var(--background-modifier-border)', paddingTop:'10px'}}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'8px'}}>
                    <div style={{fontSize:'0.8em', color:'var(--text-muted)'}}>🍿 Snacks</div>
                    <button 
                        onClick={addSnack}
                        style={{background:'var(--interactive-accent)', color:'var(--text-on-accent)', border:'none', borderRadius:'4px', width:'20px', height:'20px', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', padding: 0}}
                    >
                        +
                    </button>
                </div>
                {snacks.map((snackName, index) => (
                    <div key={index} style={{marginBottom:'6px', display:'flex', alignItems:'center', gap:'8px'}}>
                        <select 
                            style={{flex:1, fontSize:'0.9em', padding:'4px', background:'var(--background-primary)'}}
                            value={snackName}
                            onChange={(e) => updateSnack(index, e.target.value)}
                        >
                            <option value="">— Select Snack —</option>
                            {options.map(o => <option key={o} value={o}>{o}</option>)}
                        </select>
                        <button onClick={() => removeSnack(index)} style={{background:'transparent', border:'1px solid var(--background-modifier-border)', color:'var(--text-muted)', borderRadius:'4px', width:'24px', height:'24px', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center'}}>✕</button>
                    </div>
                ))}
            </div>

        </div>
    );
}

return { Func: DailyNutrition };