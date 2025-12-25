function ShoppingList() {
    // 1. SETUP
    const currentFile = dc.useCurrentFile();
    // Robust cache fetch
    const file = app.workspace.getActiveFile();
    const cache = app.metadataCache.getFileCache(file);
    const fm = currentFile?.frontmatter || cache?.frontmatter || {};
    
    // STATE
    const [finalList, setFinalList] = dc.useState([]); 
    const [status, setStatus] = dc.useState("Ready"); 
    const [checkedItems, setCheckedItems] = dc.useState({});

    // 2. PARSING ENGINE 🧠
    const normalizeName = (rawName) => {
        let n = rawName.toLowerCase().trim();
        
        // 1. Remove trailing 's' for simple plurals (eggs -> egg)
        // We avoid words ending in 'ss' (like "bass" or "glass")
        if (n.endsWith("s") && !n.endsWith("ss")) {
            n = n.slice(0, -1);
        }
        
        // 2. Specific Fixes (Add more here if needed)
        if (n.includes("onion")) return "onion";
        // REMOVED: Garlic fix. We want to keep "clove" vs "head" distinction in the Unit!
        
        return n;
    };

    const parseIngredient = (line) => {
        // Remove bullets
        let clean = line.replace(/^[-*]\s+(\[.|\])?\s*/, '').trim();
        
        // Regex: [Number/Fraction] [Unit-Optional] [Name]
        const regex = /^(\d+(?:\.\d+)?|\d+\/\d+)\s*([a-zA-Z]+)?\s+(.*)$/;
        const match = clean.match(regex);

        if (match) {
            let qty = eval(match[1]); // "1/2" -> 0.5
            let unit = match[2] ? match[2].toLowerCase() : "count";
            let name = match[3];

            // EDGE CASE: "2 eggs" 
            // Regex sees: Qty=2, Unit="eggs", Name=""
            if (!name) {
                name = unit; 
                unit = "count";
            }

            return {
                qty: qty,
                unit: unit,
                name: normalizeName(name) 
            };
        }
        
        // Fallback (No Number)
        return { qty: 0, unit: "nm", name: normalizeName(clean) };
    };

    // 3. GENERATOR
    const generateList = async () => {
        setStatus("Scanning...");
        const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
        const types = ["break", "lunch", "dinner"];
        
        const recipeNames = new Set();
        
        // A. Gather Recipe Names from Frontmatter
        days.forEach(day => {
            types.forEach(type => {
                const key = `${day}-${type}`;
                // Try case-insensitive lookup
                let val = fm[key];
                if (!val) {
                    // Fallback to searching lowercase keys if strict match fails
                    const lowerKey = key.toLowerCase();
                    const foundKey = Object.keys(fm).find(k => k.toLowerCase() === lowerKey);
                    if (foundKey) val = fm[foundKey];
                }

                if (val) {
                    const name = val.replace(/[\[\]"]/g, "").trim();
                    if (name) recipeNames.add(name);
                }
            });
        });

        if (recipeNames.size === 0) {
            setStatus("No meals found in plan.");
            return;
        }

        setStatus(`Found ${recipeNames.size} meals. Reading...`);

        // B. Fetch & Parse Ingredients
        const inventory = {}; 

        await Promise.all(Array.from(recipeNames).map(async (name) => {
            const rFile = app.metadataCache.getFirstLinkpathDest(name, "");
            if (!rFile) {
                console.warn("Could not find recipe file:", name);
                return;
            }

            const text = await app.vault.read(rFile);
            
            // Find Ingredients Section (Matches ## Ingredients, ## 🛒 Ingredients, etc.)
            const match = text.match(/^#{1,6}\s+.*Ingredients/im);
            if (!match) return;

            const content = text.slice(match.index + match[0].length);
            const endMatch = content.match(/^(#{1,6}\s|---)/m);
            const section = endMatch ? content.slice(0, endMatch.index) : content;

            // Process Lines
            const lines = section.split('\n');
            lines.forEach(rawLine => {
                if (!rawLine.trim().startsWith("-")) return; 

                const item = parseIngredient(rawLine);
                
                // Aggregation Logic
                if (!inventory[item.name]) {
                    inventory[item.name] = { total: 0, units: {} };
                }
                
                // Add to inventory
                if (item.qty > 0) {
                    const u = item.unit || "count"; 
                    if (!inventory[item.name].units[u]) inventory[item.name].units[u] = 0;
                    inventory[item.name].units[u] += item.qty;
                    inventory[item.name].total += item.qty;
                } else {
                    // Items without qty
                    if (!inventory[item.name].units["nm"]) inventory[item.name].units["nm"] = 0;
                    inventory[item.name].units["nm"] = 1; 
                }
            });
        }));

        // C. Format Output List (Alphabetical Sort)
        const sortedNames = Object.keys(inventory).sort();
        
        const finalDisplay = sortedNames.map(name => {
            const data = inventory[name];
            let displayStr = name; 

            // Construct quantity string
            const unitParts = [];
            for (const [unit, qty] of Object.entries(data.units)) {
                if (unit === "count") unitParts.push(`${qty}`);
                else if (unit !== "nm") unitParts.push(`${qty} ${unit}`);
            }
            
            if (unitParts.length > 0) {
                // E.g. "3 + 2 large" + " eggs"
                displayStr = `${unitParts.join(" + ")} ${name}`; 
            }
            
            // Capitalize first letter
            return displayStr.charAt(0).toUpperCase() + displayStr.slice(1);
        });

        setFinalList(finalDisplay);
        setStatus(`Generated (${finalDisplay.length} items)`);
    };

    // 4. UI HANDLERS
    const toggleCheck = (item) => {
        setCheckedItems(prev => ({...prev, [item]: !prev[item]}));
    };

    return (
        <div className="shopping-container">
            <div className="shopping-header">
                <h3>🛒 Shopping List</h3>
                <button className="btn-generate" onClick={generateList}>
                    {status === "Ready" ? "📝 Generate List" : status}
                </button>
            </div>

            <div className="shopping-list">
                {finalList.map((item, i) => (
                    <div 
                        key={i} 
                        className={`shop-item ${checkedItems[item] ? 'checked' : ''}`}
                        onClick={() => toggleCheck(item)}
                    >
                        <span className="checkbox">{checkedItems[item] ? "✔" : ""}</span>
                        <span>{item}</span>
                    </div>
                ))}
            </div>
            
            {finalList.length === 0 && status.includes("Generated") && (
                <div style={{opacity:0.5, fontStyle:'italic', textAlign:'center', padding:'20px'}}>
                    No ingredients found. Check your recipe formatting!
                    <br/><span style={{fontSize:'0.8em'}}>Format: "- 2 cups Rice"</span>
                </div>
            )}
        </div>
    );
}

return { Func: ShoppingList };