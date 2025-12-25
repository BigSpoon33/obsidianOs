// ============================================================================
// PARTICLE SIMULATION VIEW
// Visualizes "particles" (count) and "progress" (speed/chaos)
// ============================================================================

function ParticleSim() {
    // 1. Read Data
    const current = dc.useCurrentFile();
    const count = current.value("particles") || 0;
    const speed = current.value("progress") || 10; // Use progress as speed

    const canvasRef = dc.useRef(null);
    
    // 2. The Animation Loop
    dc.useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        
        // Resize handling
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        
        // Create Particles
        const particlesArray = [];
        for (let i = 0; i < count; i++) {
            particlesArray.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                // Speed is derived from the "progress" frontmatter (0-100)
                vx: (Math.random() - 0.5) * (speed / 10), 
                vy: (Math.random() - 0.5) * (speed / 10),
                size: Math.random() * 3 + 1
            });
        }

        let animationId;
        
        const animate = () => {
            // Clear screen with trail effect
            ctx.fillStyle = 'rgba(17, 17, 17, 0.2)'; // Low opacity = trails
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#40e0d0'; // Cyan particles

            particlesArray.forEach(p => {
                // Move
                p.x += p.vx;
                p.y += p.vy;

                // Bounce off walls
                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

                // Draw
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            });
            
            animationId = requestAnimationFrame(animate);
        };
        
        animate();

        return () => cancelAnimationFrame(animationId);
    }, [count, speed]); // Re-run if count or speed changes

    return (
        <div style={{ position: 'relative', height: '200px', marginBottom: '1.5rem', borderRadius: '12px', overflow: 'hidden', border: '1px solid #333' }}>
            <canvas ref={canvasRef} style={{ width: '100%', height: '100%', background: '#111' }} />
            
            {/* Overlay Text */}
            <div style={{ position: 'absolute', bottom: '10px', right: '10px', color: '#fff', opacity: 0.5, fontSize: '0.8em', fontFamily: 'monospace' }}>
                SIMULATION RUNNING... <br/>
                ENTITIES: {count} | VELOCITY: {speed}%
            </div>
        </div>
    );
}

return { ParticleSim };