module.exports = async (params) => {
    const { app, quickAddApi, type } = params; 
    // 'type' will be 'warmup', 'exercise', or 'cooldown' passed from the button
    
    const file = app.workspace.getActiveFile();
    if (!file) return;

    await app.fileManager.processFrontMatter(file, (fm) => {
        // 1. DATABASE UPDATE (YAML)
        if (!fm[type]) fm[type] = [];
        
        // Define the "Blank" data based on type
        let newEntry;
        if (type === "exercises") {
            newEntry = { link: "[[New Exercise]]", sets: 3, reps: "10", weight: "0 lbs" };
        } else {
            // Warmup/Cooldown use the simpler structure
            newEntry = { link: "[[New Movement]]", info: "Duration/Reps" };
        }
        
        fm[type].push(newEntry);
        
        // 2. UI GENERATION (Text Body)
        // We calculate the index of the item we just added
        const index = fm[type].length - 1; 
        
        // Define the Text Template
        let textBlock = "";
        
        if (type === "exercises") {
            // The Main Workout Template
            textBlock = `\n### ${index + 1}. [[New Exercise]]\n` +
            `**Sets:** \`INPUT[number:exercises[${index}].sets]\` | ` + 
            `**Reps:** \`INPUT[text:exercises[${index}].reps]\` | ` + 
            `**Weight:** \`INPUT[text:exercises[${index}].weight]\`\n` +
            `**Rest:** 60 seconds\n`;
        } else {
            // The Warmup/Cooldown Template (List Item)
            // Note: We use the variable name 'warmup' or 'cooldown' dynamically
            textBlock = `\n- [[New Movement]]: \`INPUT[text:${type}[${index}].info]\``;
        }

        // 3. INJECT INTO NOTE
        // We need to find the right place to insert the text.
        // We can't do this easily inside processFrontMatter, so we'll do a specialized read/write after.
        // BUT, for simplicity, let's use a "Anchor" trick or just append to sections.
        
        // Let's defer the text edit to a vault.process call to ensure FM is done.
        setTimeout(async () => {
            const content = await app.vault.read(file);
            let newContent = content;
            
            if (type === "exercises") {
                // Find the "## Cool Down" header and insert BEFORE it
                if (content.includes("## Cool Down")) {
                    newContent = content.replace("## Cool Down", `${textBlock}\n## Cool Down`);
                } else {
                    // Fallback: Append to end if no Cool Down exists
                    newContent += textBlock;
                }
            } else if (type === "warmup") {
                 // Insert before Main Workout
                 if (content.includes("## Main Workout")) {
                    newContent = content.replace("## Main Workout", `${textBlock}\n\n## Main Workout`);
                }
            } else if (type === "cooldown") {
                 // Insert at the very end of the Cool Down section (before Progress Tracking)
                 if (content.includes("## Progress Tracking")) {
                    newContent = content.replace("## Progress Tracking", `${textBlock}\n\n## Progress Tracking`);
                }
            }
            
            if (newContent !== content) {
                await app.vault.modify(file, newContent);
            }
        }, 100); // Small delay to let Frontmatter write finish
    });
}