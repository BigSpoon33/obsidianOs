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

// Read the raw number
    const moodVal = dailyNote.value("mood");
    
    // Create a map (0-10 scale example)
    let moodEmoji = "😐"; // Default
    if (moodVal >= 8) moodEmoji = "🤩";
    else if (moodVal >= 6) moodEmoji = "🙂";
    else if (moodVal >= 4) moodEmoji = "😐";
    else if (moodVal >= 2) moodEmoji = "😕";
    else if (moodVal < 2) moodEmoji = "😭";

    return (
        <div style={{ /* styles... */ }}>
            <span>Today's Mood: {moodEmoji} ({moodVal}/10)</span>
        </div>
    );

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