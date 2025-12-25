function ParticleDisplay() {
    const current = dc.useCurrentFile();
    const particleCount = current.value("particles") || 0;
    
    const changeParticles = async (amount) => {
        await app.fileManager.processFrontMatter(app.workspace.getActiveFile(), (fm) => {
            fm.particles = Math.max(0, (fm.particles || 0) + amount);
        });
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '1.5rem' }}>
            {/* THE WINDOW */}
            <div style={{
                height: '150px', background: '#111', borderRadius: '8px',
                border: '2px solid var(--interactive-accent)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', flexDirection: 'column', boxShadow: 'inset 0 0 20px #000'
            }}>
                <span style={{fontSize: '3em', fontWeight: 'bold'}}>{particleCount}</span>
                <span style={{opacity: 0.5}}>ACTIVE PARTICLES</span>
            </div>

            {/* THE BUTTONS */}
            <div style={{ display: 'flex', gap: '10px' }}>
                <button style={{flex: 1, padding: '10px', fontWeight: 'bold', cursor: 'pointer'}} 
                        onClick={() => changeParticles(-10)}>
                    Remove 10
                </button>
                <button style={{flex: 1, padding: '10px', fontWeight: 'bold', cursor: 'pointer', background: 'var(--interactive-accent)', color: 'var(--text-on-accent)'}} 
                        onClick={() => changeParticles(10)}>
                    Add 10
                </button>
            </div>
        </div>
    );
}

return { ParticleDisplay };