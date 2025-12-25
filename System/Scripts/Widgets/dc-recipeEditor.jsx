function RecipeEditor() {
    // 1. SETUP
    const currentFile = dc.useCurrentFile();
    const file = app.workspace.getActiveFile();
    
    // Safety check: ensure we have frontmatter to work with
    const fm = currentFile?.frontmatter || {};

    // 2. HELPERS
    const update = async (key, value) => {
        await app.fileManager.processFrontMatter(file, (f) => {
            // Handle number conversion for nutrition
            if (["calories", "protein", "carbs", "fat", "servings", "rating"].includes(key)) {
                f[key] = Number(value);
            } else {
                f[key] = value;
            }
        });
    };

    const toggleType = async (type) => {
        await app.fileManager.processFrontMatter(file, (f) => {
            const current = f.type || [];
            // Ensure array
            const arr = Array.isArray(current) ? current : [current];
            
            if (arr.includes(type)) {
                f.type = arr.filter(t => t !== type); // Remove
            } else {
                f.type = [...arr, type]; // Add
            }
        });
    };

    // 3. COMPONENTS
    const InputStat = ({ label, field, val, color }) => (
        <div style={{display:'flex', flexDirection:'column', gap:'4px', flex:1}}>
            <label style={{fontSize:'0.7em', color: color, fontWeight:'bold', textTransform:'uppercase'}}>{label}</label>
            <input 
                type="number" 
                value={val || 0} 
                onChange={(e) => update(field, e.target.value)}
                style={{
                    width:'100%', 
                    background:'rgba(0,0,0,0.2)', 
                    border:'1px solid var(--background-modifier-border)', 
                    padding:'6px', 
                    borderRadius:'6px',
                    textAlign:'center',
                    fontWeight:'bold',
                    color: 'var(--text-normal)'
                }}
            />
        </div>
    );

    const TypeChip = ({ label }) => {
        const current = fm.type || [];
        const isActive = Array.isArray(current) ? current.includes(label) : current === label;
        
        return (
            <button 
                onClick={() => toggleType(label)}
                style={{
                    background: isActive ? 'var(--interactive-accent)' : 'var(--background-secondary)',
                    color: isActive ? 'var(--text-on-accent)' : 'var(--text-muted)',
                    border: '1px solid var(--background-modifier-border)',
                    borderRadius: '20px',
                    padding: '4px 12px',
                    fontSize: '0.8em',
                    cursor: 'pointer'
                }}
            >
                {label}
            </button>
        );
    };

    // 4. RENDER
    return (
        <div style={{
            padding: '15px', 
            background: 'var(--background-secondary)', 
            border: '1px solid var(--background-modifier-border)', 
            borderRadius: '10px',
            fontFamily: 'var(--font-ui)',
            marginBottom: '20px'
        }}>
            {/* TOP ROW: Type & Meta */}
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'15px', borderBottom:'1px solid var(--background-modifier-border)', paddingBottom:'10px'}}>
                <div style={{display:'flex', gap:'8px'}}>
                    <TypeChip label="Breakfast" />
                    <TypeChip label="Lunch" />
                    <TypeChip label="Dinner" />
                    <TypeChip label="Snack" />
                </div>
                <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
                    <span style={{fontSize:'0.8em', color:'var(--text-muted)'}}>Servings:</span>
                    <input 
                        type="number" 
                        value={fm.servings || 1} 
                        onChange={(e) => update("servings", e.target.value)}
                        style={{width:'50px', padding:'2px', textAlign:'center', borderRadius:'4px', border:'1px solid var(--background-modifier-border)', background:'var(--background-primary)'}}
                    />
                </div>
            </div>

            {/* NUTRITION GRID */}
            <div style={{display:'flex', gap:'10px'}}>
                <InputStat label="Calories" field="calories" val={fm.calories} color="var(--text-normal)" />
                <InputStat label="Protein (g)" field="protein" val={fm.protein} color="#00b894" />
                <InputStat label="Carbs (g)" field="carbs" val={fm.carbs} color="#fdcb6e" />
                <InputStat label="Fat (g)" field="fat" val={fm.fat} color="#e17055" />
            </div>

             {/* RATING (Simple Stars) */}
             <div style={{display:'flex', justifyContent:'center', marginTop:'12px', gap:'5px'}}>
                {[1,2,3,4,5].map(n => (
                    <span 
                        key={n}
                        onClick={() => update("rating", n)}
                        style={{
                            cursor:'pointer', 
                            fontSize:'1.2em', 
                            color: n <= (fm.rating || 0) ? '#ffd700' : 'var(--text-faint)'
                        }}
                    >
                        ★
                    </span>
                ))}
             </div>
        </div>
    );
}

return { Func: RecipeEditor };