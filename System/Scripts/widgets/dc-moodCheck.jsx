function Func() {
    // 1. Construct the filename dynamically
    // result: "2025-12-21.md" (or whatever today is)
    const todayPath = moment().format("YYYY-MM-DD") + ".md"; 
    
    // 2. Hook into that file
    // We use ?.value to safely handle the split second before the file loads
    const dailyNote = dc.useFile(todayPath);
    
    // 3. Logic
    if (!dailyNote) {
        return (
            <div style={{opacity: 0.5, fontStyle: 'italic'}}>
                Waiting for today's entry ({todayPath})...
            </div>
        );
    }

    // Read the "mood" property. If missing, default to "?"
    const mood = dailyNote.value("mood") || "?";

    // 4. Render
    return (
        <div style={{
            padding: '10px', 
            border: '1px solid var(--background-modifier-border)', 
            borderRadius: '8px',
            textAlign: 'center'
        }}>
            <span style={{color: 'var(--text-muted)'}}>Today's Mood: </span>
            <strong style={{color: 'var(--interactive-accent)', fontSize: '1.2em'}}>
                {mood}
            </strong>
        </div>
    );
}

// --- THE MISSING PIECE ---
// This line tells Datacore: "When someone calls this file, give them 'Func'."
const renderedView = <Func />;
return { renderedView, Func };