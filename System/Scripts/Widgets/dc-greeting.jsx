// System/Scripts/dc-greeting.jsx

function Greeting() {
    // 1. GET SETTINGS (The Static Data)
    const pages = dc.useQuery("@page");
    
    // Safety check for index
    if (!pages) return <></>;

    // Find the note tagged #configuration or named System/Settings.md
    const settingsNote = pages.find(p => 
        (p.tags && p.tags.has("#configuration")) || 
        p.$path.endsWith("System/Settings.md")
    );

    const name = settingsNote ? settingsNote.value("username") : "Traveler";

    // 2. THE HEARTBEAT (The Dynamic Data)
    // We create a state called 'now' that holds the current moment
    const [now, setNow] = dc.useState(moment());

    dc.useEffect(() => {
        // Create a timer that runs every 1000ms (1 second) or 60000ms (1 minute)
        // I prefer 1 minute to save CPU, unless you want to see seconds ticking.
        const timer = setInterval(() => {
            setNow(moment());
        }, 1000 * 60); // Update every 60 seconds

        // CRITICAL: Clean up the timer when you close the note
        // so it doesn't keep running in the background.
        return () => clearInterval(timer);
    }, []);

    // 3. CALCULATE VIBE (Based on the dynamic 'now')
    const hour = now.hour();
    let greeting = "Good Evening";
    let icon = "🌙";
    let color = "#8888cc"; // Night purple

    if (hour >= 5 && hour < 12) {
        greeting = "Good Morning";
        icon = "🌅";
        color = "#e6a23c"; // Sunrise orange
    } else if (hour >= 12 && hour < 17) {
        greeting = "Good Afternoon";
        icon = "☀️";
        color = "#e6c63c"; // Day yellow
    }

    // 4. RENDER
    return (
        <div style={{
            padding: '20px', 
            borderRadius: '12px', 
            backgroundColor: 'var(--background-secondary)',
            borderLeft: `5px solid ${color}`,
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            // Smooth transition if color changes
            transition: 'border-color 0.5s ease' 
        }}>
            <div style={{
                fontSize: '3em', 
                lineHeight: '1em', 
                filter: 'drop-shadow(0 0 5px rgba(0,0,0,0.2))'
            }}>
                {icon}
            </div>
            <div>
                <h2 style={{margin: 0, color: 'var(--text-normal)'}}>
                    {greeting}, {name}.
                </h2>
                <p style={{margin: 0, opacity: 0.7, fontSize: '0.9em'}}>
                    Current System Time: <b>{now.format("LT")}</b>
                </p>
            </div>
        </div>
    );
}

return { Func: Greeting };