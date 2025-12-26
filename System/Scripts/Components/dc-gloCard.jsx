// ═══════════════════════════════════════════════════════════════════════════════
// DC-GLO-CARD - Global Themed Card/Container Component
// A flexible, theme-aware container with header, body, footer, and various effects
// ═══════════════════════════════════════════════════════════════════════════════

const { useTheme } = await dc.require(dc.fileLink("System/Scripts/Core/dc-themeProvider.jsx"));
const { useComponentCSS, useFlashyMode, resolveBackground, hexToRgba } = await dc.require(
    dc.fileLink("System/Scripts/Components/dc-gloButton.jsx")
);

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT: GloCard
// ═══════════════════════════════════════════════════════════════════════════════
function GloCard({
    // Content
    children,                     // Card body content
    title = null,                 // Header title
    subtitle = null,              // Header subtitle
    icon = null,                  // Header icon (emoji or component)
    footer = null,                // Footer content
    
    // Header actions (rendered on right side of header)
    actions = null,               // React element(s) for header actions
    
    // Appearance
    variant = "default",          // "default" | "elevated" | "outlined" | "ghost" | "glass"
    size = "medium",              // "small" | "medium" | "large" (affects padding)
    
    // Colors (overrides theme)
    bg = null,                    // Background color/gradient
    headerBg = null,              // Header background
    footerBg = null,              // Footer background
    borderColor = null,           // Border color
    accentColor = null,           // Accent color (for borders, highlights)
    
    // Layout
    width = "100%",               // Card width
    minHeight = null,             // Minimum height
    maxHeight = null,             // Maximum height (enables scroll)
    
    // Effects
    glow = false,                 // Enable glow effect
    glowColor = null,             // Override glow color
    hover = true,                 // Enable hover effects
    clickable = false,            // Make entire card clickable
    collapsible = false,          // Enable collapse/expand
    defaultCollapsed = false,     // Start collapsed
    
    // Image
    image = null,                 // Header image URL or base64
    imageHeight = "150px",        // Image height
    imagePosition = "top",        // "top" | "bottom" | "left" | "right"
    
    // Callbacks
    onClick = null,               // Click handler (if clickable)
    onCollapse = null,            // Called when collapsed/expanded
    
    // Overrides
    style = {},                   // Additional inline styles
    className = "",               // Additional CSS classes
    headerStyle = {},             // Additional header styles
    bodyStyle = {},               // Additional body styles
    footerStyle = {},             // Additional footer styles
    flashy = null,                // Override flashy mode
}) {
    const { theme, isLoading } = useTheme();
    const globalFlashyMode = useFlashyMode();
    
    // State
    const [isCollapsed, setIsCollapsed] = dc.useState(defaultCollapsed);
    const [isHovered, setIsHovered] = dc.useState(false);
    
    // Load shared CSS
    useComponentCSS();
    
    // Loading state
    if (isLoading) {
        return (
            <div style={{ 
                width,
                height: "150px",
                background: "#2b2b2b",
                borderRadius: "12px",
                opacity: 0.5,
            }} />
        );
    }
    
    // ─────────────────────────────────────────────────────────────────────────
    // RESOLVE THEME VALUES
    // ─────────────────────────────────────────────────────────────────────────
    const effectsEnabled = flashy !== null ? flashy : globalFlashyMode;
    
    // Colors from theme
    const themeCardBg = theme["card-bg-color"] || theme["color-surface"] || "#2a2a4e";
    const themeBorder = theme["card-border"] || "1px solid rgba(255,105,180,0.3)";
    const themeRadius = theme["card-border-radius"] || "12px";
    const themeShadow = theme["card-shadow"] || "0 4px 15px rgba(255,105,180,0.1)";
    const themePadding = theme["card-padding"] || "16px";
    const primaryColor = theme["color-primary"] || "#ff69b4";
    const textColor = theme["color-text"] || "#ffffff";
    const mutedColor = theme["color-text-muted"] || "#888";
    const surfaceColor = theme["color-surface"] || "#2a2a4e";
    
    // Size config
    const sizeConfig = {
        small: { padding: "12px", headerPad: "12px", fontSize: "13px", titleSize: "14px" },
        medium: { padding: themePadding, headerPad: "16px", fontSize: "14px", titleSize: "16px" },
        large: { padding: "24px", headerPad: "20px", fontSize: "15px", titleSize: "18px" },
    };
    const sizing = sizeConfig[size] || sizeConfig.medium;
    
    // Glow color
    const resolvedGlowColor = glowColor || (hexToRgba ? hexToRgba(primaryColor, 0.4) : "rgba(255, 105, 180, 0.4)");
    
    // ─────────────────────────────────────────────────────────────────────────
    // VARIANT STYLES
    // ─────────────────────────────────────────────────────────────────────────
    const getVariantStyles = () => {
        const baseBg = bg ? resolveBackground(bg, null, themeCardBg) : themeCardBg;
        
        switch (variant) {
            case "elevated":
                return {
                    background: baseBg,
                    border: "none",
                    boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
                };
            case "outlined":
                return {
                    background: "transparent",
                    border: borderColor ? `1px solid ${borderColor}` : themeBorder,
                    boxShadow: "none",
                };
            case "ghost":
                return {
                    background: "transparent",
                    border: "none",
                    boxShadow: "none",
                };
            case "glass":
                return {
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    boxShadow: themeShadow,
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                };
            default:
                return {
                    background: baseBg,
                    border: borderColor ? `1px solid ${borderColor}` : themeBorder,
                    boxShadow: themeShadow,
                };
        }
    };
    
    const variantStyles = getVariantStyles();
    
    // ─────────────────────────────────────────────────────────────────────────
    // COLLAPSE HANDLER
    // ─────────────────────────────────────────────────────────────────────────
    const toggleCollapse = () => {
        const newState = !isCollapsed;
        setIsCollapsed(newState);
        if (onCollapse) onCollapse(newState);
    };
    
    // ─────────────────────────────────────────────────────────────────────────
    // RENDER HELPERS
    // ─────────────────────────────────────────────────────────────────────────
    const hasHeader = title || subtitle || icon || actions || collapsible;
    
    const renderHeader = () => {
        if (!hasHeader) return null;
        
        return (
            <div 
                className="dc-glo-card-header"
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                    padding: sizing.headerPad,
                    background: headerBg || "transparent",
                    borderBottom: (children || footer) && !isCollapsed 
                        ? "1px solid rgba(255,255,255,0.1)" 
                        : "none",
                    cursor: collapsible ? "pointer" : "default",
                    ...headerStyle,
                }}
                onClick={collapsible ? toggleCollapse : undefined}
            >
                {/* Left side: icon + title/subtitle */}
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    flex: 1,
                    minWidth: 0,
                }}>
                    {icon && (
                        <span style={{ 
                            fontSize: sizing.titleSize,
                            flexShrink: 0,
                        }}>
                            {icon}
                        </span>
                    )}
                    
                    <div style={{ 
                        flex: 1,
                        minWidth: 0,
                    }}>
                        {title && (
                            <div style={{
                                fontSize: sizing.titleSize,
                                fontWeight: "bold",
                                color: textColor,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                            }}>
                                {title}
                            </div>
                        )}
                        {subtitle && (
                            <div style={{
                                fontSize: "12px",
                                color: mutedColor,
                                marginTop: "2px",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                            }}>
                                {subtitle}
                            </div>
                        )}
                    </div>
                </div>
                
                {/* Right side: actions + collapse chevron */}
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    flexShrink: 0,
                }}>
                    {actions}
                    
                    {collapsible && (
                        <svg 
                            width="16" 
                            height="16" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke={mutedColor}
                            strokeWidth="2"
                            style={{
                                transform: isCollapsed ? "rotate(-90deg)" : "rotate(0deg)",
                                transition: "transform 0.2s ease",
                            }}
                        >
                            <polyline points="6 9 12 15 18 9" />
                        </svg>
                    )}
                </div>
            </div>
        );
    };
    
    const renderImage = () => {
        if (!image) return null;
        
        return (
            <div 
                className="dc-glo-card-image"
                style={{
                    width: imagePosition === "left" || imagePosition === "right" ? "40%" : "100%",
                    height: imagePosition === "left" || imagePosition === "right" ? "100%" : imageHeight,
                    backgroundImage: `url(${image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    flexShrink: 0,
                }}
            />
        );
    };
    
    const renderBody = () => {
        if (isCollapsed || !children) return null;
        
        return (
            <div 
                className="dc-glo-card-body"
                style={{
                    padding: sizing.padding,
                    fontSize: sizing.fontSize,
                    color: textColor,
                    flex: 1,
                    overflow: maxHeight ? "auto" : "visible",
                    ...bodyStyle,
                }}
            >
                {children}
            </div>
        );
    };
    
    const renderFooter = () => {
        if (isCollapsed || !footer) return null;
        
        return (
            <div 
                className="dc-glo-card-footer"
                style={{
                    padding: sizing.headerPad,
                    background: footerBg || "transparent",
                    borderTop: "1px solid rgba(255,255,255,0.1)",
                    fontSize: "13px",
                    color: mutedColor,
                    ...footerStyle,
                }}
            >
                {footer}
            </div>
        );
    };
    
    // ─────────────────────────────────────────────────────────────────────────
    // MAIN LAYOUT
    // ─────────────────────────────────────────────────────────────────────────
    const isHorizontal = imagePosition === "left" || imagePosition === "right";
    
    return (
        <div
            className={`dc-glo-card dc-glo-card-${variant} ${className}`.trim()}
            onClick={clickable && onClick ? onClick : undefined}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                width,
                minHeight,
                maxHeight,
                borderRadius: themeRadius,
                overflow: "hidden",
                display: isHorizontal ? "flex" : "block",
                flexDirection: imagePosition === "right" ? "row-reverse" : "row",
                cursor: clickable ? "pointer" : "default",
                transition: "all 0.2s ease",
                ...variantStyles,
                boxShadow: effectsEnabled && glow && isHovered
                    ? `0 0 20px 5px ${resolvedGlowColor}`
                    : variantStyles.boxShadow,
                transform: hover && isHovered && effectsEnabled
                    ? "translateY(-2px)"
                    : "none",
                ...style,
            }}
        >
            {/* Image at top/left */}
            {(imagePosition === "top" || imagePosition === "left") && renderImage()}
            
            {/* Content wrapper */}
            <div style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                minWidth: 0,
                maxHeight: maxHeight ? "inherit" : undefined,
            }}>
                {renderHeader()}
                {renderBody()}
                {renderFooter()}
            </div>
            
            {/* Image at bottom/right */}
            {(imagePosition === "bottom" || imagePosition === "right") && renderImage()}
        </div>
    );
}

// ═══════════════════════════════════════════════════════════════════════════════
// EXPORTS
// ═══════════════════════════════════════════════════════════════════════════════

// Demo view
const renderedView = (
    <div style={{ 
        display: "flex", 
        flexDirection: "column",
        gap: "1.5rem",
        padding: "1rem",
        maxWidth: "400px",
    }}>
        <div style={{ fontSize: "12px", color: "#888", marginBottom: "0.5rem" }}>
            dc-gloCard Component Demo
        </div>
        
        {/* Basic card */}
        <GloCard 
            title="Basic Card"
            subtitle="With subtitle"
            icon="📦"
        >
            <p style={{ margin: 0 }}>This is the card body content. It can contain any React elements.</p>
        </GloCard>
        
        {/* Card with footer */}
        <GloCard 
            title="With Footer"
            icon="📋"
            footer={<span>Last updated: Today</span>}
        >
            <p style={{ margin: 0 }}>Cards can have footers for metadata or actions.</p>
        </GloCard>
        
        {/* Collapsible card */}
        <GloCard 
            title="Collapsible Card"
            icon="📁"
            collapsible={true}
            defaultCollapsed={false}
        >
            <p style={{ margin: 0 }}>Click the header to collapse/expand this card!</p>
        </GloCard>
        
        {/* Glass variant */}
        <GloCard 
            title="Glass Effect"
            icon="✨"
            variant="glass"
            glow={true}
        >
            <p style={{ margin: 0 }}>This card has a glass morphism effect with glow on hover.</p>
        </GloCard>
        
        {/* Different variants */}
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <GloCard variant="outlined" title="Outlined" size="small" width="auto" style={{ flex: 1 }}>
                <span>Outlined variant</span>
            </GloCard>
            <GloCard variant="elevated" title="Elevated" size="small" width="auto" style={{ flex: 1 }}>
                <span>Elevated variant</span>
            </GloCard>
        </div>
    </div>
);

return { 
    renderedView, 
    GloCard,
};
