function MoodTracker() {
    // 1. SETUP
    const currentFile = dc.useCurrentFile();
    const fm = currentFile?.frontmatter || {};

    // STATE
    // Evening Mood (1-5 Score)
    const [eveningMood, setEveningMood] = dc.useState(fm["mood-evening"] || 0);
    // Emotions List (Array of strings)
    const [selectedEmotions, setSelectedEmotions] = dc.useState(fm["emotions"] || []);
    // Custom Input
    const [customInput, setCustomInput] = dc.useState("");

    // 2. CONFIGURATION (The "Set List")
    // Grouped by "Vibe" for visual organization
    const EMOTION_CHIPS = [
        // High Energy / Positive
        { label: "Excited", color: "#FFD700" },
        { label: "Confident", color: "#FFA500" },
        { label: "Grateful", color: "#32CD32" },
        // Low Energy / Positive
        { label: "Calm", color: "#87CEEB" },
        { label: "Content", color: "#40E0D0" },
        { label: "Relieved", color: "#98FB98" },
        // High Energy / Negative
        { label: "Stressed", color: "#FF6347" },
        { label: "Frustrated", color: "#FF4500" },
        { label: "Anxious", color: "#FF69B4" },
        // Low Energy / Negative
        { label: "Tired", color: "#708090" },
        { label: "Sad", color: "#6495ED" },
        { label: "Bored", color: "#A9A9A9" }
    ];

    // 3. AUTO-LOAD CSS
    dc.useEffect(() => {
        const loadStyles = async () => {
            const cssPath = "System/Scripts/dc-mood-tracker.css";
            const id = "dc-mood-styles";
            if (document.getElementById(id)) return;
            if (await app.vault.adapter.exists(cssPath)) {
                const css = await app.vault.adapter.read(cssPath);
                const style = document.createElement("style");
                style.id = id;
                style.textContent = css;
                document.head.appendChild(style);
            }
        };
        loadStyles();
    }, []);

    // 4. HANDLERS
    const saveChanges = async (newMood, newEmotions) => {
        const file = app.workspace.getActiveFile();
        if (file) {
            await app.fileManager.processFrontMatter(file, (f) => {
                f["mood-evening"] = newMood;
                f["emotions"] = newEmotions;
            });
        }
    };

    const toggleEmotion = (label) => {
        let newList;
        if (selectedEmotions.includes(label)) {
            // Remove
            newList = selectedEmotions.filter(e => e !== label);
        } else {
            // Add
            newList = [...selectedEmotions, label];
        }
        setSelectedEmotions(newList);
        saveChanges(eveningMood, newList);
    };

    const handleMoodChange = (e) => {
        const val = Number(e.target.value);
        setEveningMood(val);
        saveChanges(val, selectedEmotions);
    };

    const addCustomEmotion = (e) => {
        if (e.key === 'Enter' && customInput.trim() !== "") {
            const label = customInput.trim();
            // Don't add duplicates
            if (!selectedEmotions.includes(label)) {
                const newList = [...selectedEmotions, label];
                setSelectedEmotions(newList);
                saveChanges(eveningMood, newList);
            }
            setCustomInput("");
        }
    };

    // 5. RENDER
    return (
        <div className="mood-widget">
            <div className="mood-header">
                <span className="mood-title">Evening Reflection</span>
                <span className="mood-score">
                    {eveningMood > 0 ? `${eveningMood}/5` : "-"}
                </span>
            </div>

            {/* SLIDER SECTION */}
            <div className="mood-slider-container">
                <span style={{fontSize:'1.5em'}}>🌙</span>
                <input 
                    type="range" min="1" max="5" step="1"
                    value={eveningMood || 3}
                    onChange={handleMoodChange}
                    className="mood-range"
                    style={{
                        background: `linear-gradient(to right, #a18cd1 0%, #fbc2eb ${(eveningMood-1)*25}%, rgba(255,255,255,0.1) ${(eveningMood-1)*25}%, rgba(255,255,255,0.1) 100%)`
                    }}
                />
                <span style={{fontSize:'1.5em'}}>✨</span>
            </div>

            {/* EMOTION CHIPS */}
            <div className="emotion-grid">
                {EMOTION_CHIPS.map(chip => {
                    const isActive = selectedEmotions.includes(chip.label);
                    return (
                        <button 
                            key={chip.label}
                            className={`emotion-chip ${isActive ? 'active' : ''}`}
                            onClick={() => toggleEmotion(chip.label)}
                            style={{
                                '--chip-color': chip.color,
                                borderColor: isActive ? chip.color : 'transparent',
                                background: isActive ? `rgba(255,255,255,0.1)` : 'rgba(255,255,255,0.03)'
                            }}
                        >
                            <span className="dot" style={{background: chip.color}}></span>
                            {chip.label}
                        </button>
                    );
                })}
            </div>

            {/* CUSTOM INPUT & TAG DISPLAY */}
            <div className="custom-emotion-area">
                <input 
                    type="text" 
                    placeholder="+ Add custom emotion..." 
                    value={customInput}
                    onChange={(e) => setCustomInput(e.target.value)}
                    onKeyDown={addCustomEmotion}
                    className="mood-input"
                />
                {/* Show custom tags that aren't in the main list */}
                <div className="custom-tags-list">
                    {selectedEmotions
                        .filter(e => !EMOTION_CHIPS.find(c => c.label === e))
                        .map(e => (
                            <span key={e} className="custom-tag" onClick={() => toggleEmotion(e)}>
                                {e} ×
                            </span>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

return { Func: MoodTracker };