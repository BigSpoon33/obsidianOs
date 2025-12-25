// ═══════════════════════════════════════════════════════════════════════════════
// DC-GLO-BUTTON - Global Themed Button Component
// A fully customizable, theme-aware button with glow, lift, press, and rainbow effects
// ═══════════════════════════════════════════════════════════════════════════════

const { useTheme } = await dc.require(dc.fileLink("System/Scripts/Core/dc-themeProvider.jsx"));

// ─────────────────────────────────────────────────────────────────────────────
// HELPER: Resolve background with fallback chain
// Priority: base64 → gradient → solid color → theme gradient → theme solid
// ─────────────────────────────────────────────────────────────────────────────
function resolveBackground(value, themeGradient, themeSolid) {
    if (!value) return themeGradient || themeSolid;
    // Base64 image
    if (value.startsWith("data:image")) return `url(${value})`;
    // CSS gradient
    if (value.startsWith("linear-gradient") || value.startsWith("radial-gradient")) return value;
    // URL to image
    if (value.startsWith("url(")) return value;
    // Solid color (hex, rgb, hsl)
    if (value.startsWith("#") || value.startsWith("rgb") || value.startsWith("hsl")) return value;
    // Fallback to theme
    return themeGradient || themeSolid;
}

// ─────────────────────────────────────────────────────────────────────────────
// HELPER: Load shared CSS once
// ─────────────────────────────────────────────────────────────────────────────
function useComponentCSS() {
    dc.useEffect(() => {
        const styleId = "dc-components-css";
        if (!document.getElementById(styleId)) {
            app.vault.adapter.read("System/Scripts/Styles/dc-components.css").then(css => {
                const style = document.createElement("style");
                style.id = styleId;
                style.textContent = css;
                document.head.appendChild(style);
            }).catch(err => {
                console.error("Failed to load dc-components.css:", err);
            });
        }
    }, []);
}

// ─────────────────────────────────────────────────────────────────────────────
// HELPER: Read flashy-mode from Settings.md
// ─────────────────────────────────────────────────────────────────────────────
function useFlashyMode() {
    const [flashy, setFlashy] = dc.useState(true); // Default to true
    
    dc.useEffect(() => {
        const settingsFile = app.vault.getAbstractFileByPath("System/Settings.md");
        if (settingsFile) {
            const cache = app.metadataCache.getFileCache(settingsFile);
            const flashyValue = cache?.frontmatter?.["flashy-mode"];
            // Only set to false if explicitly false, otherwise keep true
            setFlashy(flashyValue !== false);
        }
    }, []);
    
    return flashy;
}

// ─────────────────────────────────────────────────────────────────────────────
// HELPER: Convert hex to rgba with opacity
// ─────────────────────────────────────────────────────────────────────────────
function hexToRgba(hex, alpha = 1) {
    if (!hex || !hex.startsWith("#")) return `rgba(255, 105, 180, ${alpha})`;
    
    let r, g, b;
    if (hex.length === 4) {
        r = parseInt(hex[1] + hex[1], 16);
        g = parseInt(hex[2] + hex[2], 16);
        b = parseInt(hex[3] + hex[3], 16);
    } else {
        r = parseInt(hex.slice(1, 3), 16);
        g = parseInt(hex.slice(3, 5), 16);
        b = parseInt(hex.slice(5, 7), 16);
    }
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT: GloButton
// ═══════════════════════════════════════════════════════════════════════════════
function GloButton({
    // Required
    label,
    onClick = () => {},
    
    // Variants & Sizing
    variant = "primary",      // "primary" | "secondary" | "ghost"
    size = "medium",          // "small" | "medium" | "large"
    
    // Custom Backgrounds (uses fallback chain)
    bg = null,                // Custom idle background (base64/gradient/color)
    hoverBg = null,           // Custom hover background
    activeBg = null,          // Custom active/pressed background
    
    // Effects (respect flashy-mode)
    glow = true,              // Enable glow on hover
    lift = true,              // Enable lift on hover
    press = true,             // Enable press effect on click
    rainbow = false,          // Enable rainbow text on hover
    
    // Content
    icon = null,              // Emoji/icon before label
    iconRight = null,         // Emoji/icon after label
    
    // Sprite (optional - shows animated sprite in button)
    showSprite = false,       // Show theme sprite
    sprite = null,            // Override sprite (base64)
    spriteWidth = null,       // Override width
    spriteHeight = null,      // Override height
    spriteAnimation = null,   // Override click animation
    spritePosition = "left",  // "left" | "right"
    
    // State
    disabled = false,
    loading = false,
    active = false,           // Force active state styling
    
    // Overrides
    style = {},               // Additional inline styles
    className = "",           // Additional CSS classes
    flashy = null,            // Override flashy mode (null = use global setting)
}) {
    const { theme, isLoading } = useTheme();
    const globalFlashyMode = useFlashyMode();
    const [isHovered, setIsHovered] = dc.useState(false);
    const [isPressed, setIsPressed] = dc.useState(false);
    const [isAnimating, setIsAnimating] = dc.useState(false);
    const [animationClass, setAnimationClass] = dc.useState("");
    
    // Load shared CSS
    useComponentCSS();
    
    // Loading state
    if (isLoading) {
        return (
            <button disabled style={{ padding: "10px 20px", opacity: 0.5 }}>
                ...
            </button>
        );
    }
    
    // Determine if effects are enabled
    const effectsEnabled = flashy !== null ? flashy : globalFlashyMode;
    
    // ─────────────────────────────────────────────────────────────────────────
    // RESOLVE THEME VALUES
    // ─────────────────────────────────────────────────────────────────────────
    
    // Size values from theme
    const sizeKey = `button-size-${size}`;
    const padding = theme[`${sizeKey}-padding`] || 
        (size === "small" ? "6px 12px" : size === "large" ? "14px 28px" : "10px 20px");
    const fontSize = theme[`${sizeKey}-font`] || 
        (size === "small" ? "12px" : size === "large" ? "16px" : "14px");
    const borderRadius = theme[`${sizeKey}-radius`] || 
        (size === "small" ? "6px" : size === "large" ? "10px" : "8px");
    
    // Background colors with fallback chain
    const themeIdleBg = theme["button-idle-bg"] || "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
    const themeHoverBg = theme["button-hover-bg"] || "linear-gradient(135deg, #764ba2 0%, #667eea 100%)";
    const themeActiveBg = theme["button-active-bg"] || "linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)";
    const themeSolid = theme["color-primary"] || "#667eea";
    
    const idleBackground = resolveBackground(bg, themeIdleBg, themeSolid);
    const hoverBackground = resolveBackground(hoverBg, themeHoverBg, themeSolid);
    const activeBackground = resolveBackground(activeBg, themeActiveBg, themeSolid);
    
    // Determine current background based on state
    let currentBg = idleBackground;
    if (active || isPressed) {
        currentBg = activeBackground;
    } else if (isHovered && !disabled) {
        currentBg = hoverBackground;
    }
    
    // Is background an image?
    const isImageBg = currentBg.startsWith("url(");
    
    // Colors
    const textColor = theme["button-text-color"] || "#ffffff";
    const accentColor = theme["color-accent"] || "#ffff00";
    const primaryColor = theme["color-primary"] || "#ff69b4";
    
    // Glow colors (auto-derive from accent if not set)
    const glowColorHover = theme["glow-color-hover"] || hexToRgba(accentColor, 0.4);
    const glowColorActive = theme["glow-color-active"] || hexToRgba(accentColor, 0.3);
    
    // Transitions
    const transitionSpeed = theme["transition-normal"] || "0.3s";
    const transitionFast = theme["transition-fast"] || "0.15s";
    
    // Sprite settings
    const spriteUrl = sprite || theme["button-sprite"] || null;
    const spWidth = spriteWidth || parseInt(theme["button-sprite-width"]) || 34;
    const spHeight = spriteHeight || parseInt(theme["button-sprite-height"]) || 21;
    const animation = spriteAnimation || theme["button-sprite-click-animation"] || "bounce";
    const animDuration = theme["button-sprite-click-duration"] || "0.3s";
    
    // ─────────────────────────────────────────────────────────────────────────
    // SPRITE ANIMATION
    // ─────────────────────────────────────────────────────────────────────────
    const triggerSpriteAnimation = () => {
        if (isAnimating) return;
        if (animation === "none") return;
        
        setIsAnimating(true);
        setAnimationClass(`dc-anim-${animation}`);
        
        const durationMs = parseFloat(animDuration) * 1000;
        setTimeout(() => {
            setIsAnimating(false);
            setAnimationClass("");
        }, durationMs + 100);
    };
    
    // ─────────────────────────────────────────────────────────────────────────
    // VARIANT STYLES
    // ─────────────────────────────────────────────────────────────────────────
    let variantStyles = {};
    let variantBg = currentBg;
    
    if (variant === "ghost") {
        variantBg = "transparent";
        variantStyles = {
            border: `2px solid ${primaryColor}`,
            color: primaryColor,
        };
        if (isHovered && !disabled) {
            variantBg = hexToRgba(primaryColor, 0.15);
        }
        if (active || isPressed) {
            variantBg = hexToRgba(primaryColor, 0.25);
        }
    } else if (variant === "secondary") {
        variantBg = theme["color-surface"] || "#2a2a4e";
        variantStyles = {
            border: `1px solid ${primaryColor}`,
        };
        if (isHovered && !disabled) {
            variantBg = theme["color-surface"] || "#3a3a5e";
            variantStyles.borderColor = accentColor;
        }
    }
    
    // ─────────────────────────────────────────────────────────────────────────
    // COMPUTE EFFECTS (only if flashy mode enabled)
    // ─────────────────────────────────────────────────────────────────────────
    let transform = "";
    let boxShadow = "none";
    
    if (effectsEnabled && !disabled) {
        // Press effect
        if ((active || isPressed) && press) {
            transform = "translateY(1px) scale(0.98)";
            boxShadow = "none";
        } 
        // Hover effects
        else if (isHovered) {
            if (lift) {
                transform = "translateY(-2px)";
                boxShadow = "0 4px 12px rgba(0, 0, 0, 0.25)";
            }
            if (glow) {
                const glowShadow = `0 0 15px 3px ${glowColorHover}`;
                boxShadow = boxShadow === "none" ? glowShadow : `${glowShadow}, ${boxShadow}`;
            }
        }
    }
    
    // Active state glow (always show if active prop is true)
    if (active && effectsEnabled && glow) {
        const activeGlow = `0 0 20px 5px ${glowColorActive}`;
        boxShadow = boxShadow === "none" ? activeGlow : `${activeGlow}, ${boxShadow}`;
    }
    
    // Rainbow text logic
    const showRainbow = effectsEnabled && rainbow && (isHovered || active);
    
    // ─────────────────────────────────────────────────────────────────────────
    // RENDER
    // ─────────────────────────────────────────────────────────────────────────
    // Handle button click - trigger sprite animation + onClick
    const handleClick = () => {
        if (disabled || loading) return;
        
        // Trigger sprite animation if sprite is shown
        if (showSprite && spriteUrl && effectsEnabled) {
            triggerSpriteAnimation();
        }
        
        // Call the onClick handler
        onClick();
    };
    
    return (
        <button
            onClick={handleClick}
            onMouseEnter={() => !disabled && setIsHovered(true)}
            onMouseLeave={() => { setIsHovered(false); setIsPressed(false); }}
            onMouseDown={() => {
                if (!disabled) {
                    setIsPressed(true);
                    // Trigger animation on mousedown for immediate feedback
                    if (showSprite && spriteUrl && effectsEnabled) {
                        triggerSpriteAnimation();
                    }
                }
            }}
            onMouseUp={() => setIsPressed(false)}
            disabled={disabled || loading}
            className={`dc-glo-button ${className}`.trim()}
            style={{
                // Layout
                padding,
                fontSize,
                fontWeight: "bold",
                borderRadius,
                border: "none",
                
                // Background
                background: variant === "primary" ? variantBg : variantBg,
                backgroundSize: isImageBg ? "auto" : undefined,
                backgroundRepeat: isImageBg ? "repeat" : undefined,
                backgroundPosition: isImageBg ? "center" : undefined,
                
                // Text
                color: textColor,
                textShadow: "0 1px 3px rgba(0, 0, 0, 0.5)",
                
                // Interaction
                cursor: disabled ? "not-allowed" : loading ? "wait" : "pointer",
                userSelect: "none",
                
                // Effects
                transform,
                boxShadow,
                transition: `all ${transitionSpeed} ease, transform ${transitionFast} ease`,
                
                // States
                opacity: disabled ? 0.5 : 1,
                
                // Flex for icon support
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                
                // Variant overrides
                ...variantStyles,
                
                // User overrides (highest priority)
                ...style,
            }}
        >
            {/* Loading spinner */}
            {loading && (
                <span style={{ 
                    display: "inline-block",
                    width: "1em",
                    height: "1em",
                    border: "2px solid transparent",
                    borderTopColor: textColor,
                    borderRadius: "50%",
                    animation: "dc-spin 0.8s linear infinite",
                }}>
                </span>
            )}
            
            {/* Left sprite */}
            {showSprite && spriteUrl && spritePosition === "left" && !loading && (
                <div 
                    className={animationClass}
                    style={{
                        width: `${spWidth}px`,
                        height: `${spHeight}px`,
                        flexShrink: 0,
                        "--dc-anim-duration": animDuration,
                    }}
                >
                    <img 
                        src={spriteUrl}
                        alt=""
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                            pointerEvents: "none",
                        }}
                        draggable={false}
                    />
                </div>
            )}
            
            {/* Left icon */}
            {icon && !loading && !showSprite && (
                <span className="dc-glo-button-icon">{icon}</span>
            )}
            
            {/* Label */}
            <span className={showRainbow ? "dc-rainbow-text" : ""}>
                {label}
            </span>
            
            {/* Right icon */}
            {iconRight && !showSprite && (
                <span className="dc-glo-button-icon">{iconRight}</span>
            )}
            
            {/* Right sprite */}
            {showSprite && spriteUrl && spritePosition === "right" && !loading && (
                <div 
                    className={animationClass}
                    style={{
                        width: `${spWidth}px`,
                        height: `${spHeight}px`,
                        flexShrink: 0,
                        "--dc-anim-duration": animDuration,
                    }}
                >
                    <img 
                        src={spriteUrl}
                        alt=""
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                            pointerEvents: "none",
                        }}
                        draggable={false}
                    />
                </div>
            )}
        </button>
    );
}

// ═══════════════════════════════════════════════════════════════════════════════
// EXPORTS
// ═══════════════════════════════════════════════════════════════════════════════

// Demo view showing different button variants
const renderedView = (
    <div style={{ 
        display: "flex", 
        flexDirection: "column",
        gap: "1rem",
        padding: "1rem",
    }}>
        <div style={{ fontSize: "12px", color: "#888", marginBottom: "0.5rem" }}>
            dc-gloButton Component Demo
        </div>
        
        {/* Variants */}
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
            <GloButton label="Primary" onClick={() => new Notice("Primary clicked!")} />
            <GloButton label="Secondary" variant="secondary" onClick={() => new Notice("Secondary!")} />
            <GloButton label="Ghost" variant="ghost" onClick={() => new Notice("Ghost!")} />
        </div>
        
        {/* Sizes */}
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
            <GloButton label="Small" size="small" onClick={() => {}} />
            <GloButton label="Medium" size="medium" onClick={() => {}} />
            <GloButton label="Large" size="large" onClick={() => {}} />
        </div>
        
        {/* Effects */}
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
            <GloButton label="Rainbow!" rainbow={true} onClick={() => {}} />
            <GloButton label="With Icon" icon="🚀" onClick={() => {}} />
            <GloButton label="Icon Right" iconRight="→" onClick={() => {}} />
        </div>
        
        {/* States */}
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
            <GloButton label="Active" active={true} onClick={() => {}} />
            <GloButton label="Disabled" disabled={true} onClick={() => {}} />
            <GloButton label="No Effects" glow={false} lift={false} press={false} onClick={() => {}} />
        </div>
    </div>
);

return { 
    renderedView, 
    GloButton,
    // Also export helpers for reuse
    resolveBackground,
    useComponentCSS,
    useFlashyMode,
    hexToRgba,
};
