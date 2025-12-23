function Func() {
    const current = dc.useCurrentFile();
    let initialProgress = current.value("progress");
    const task_progress = current.value("task_progress");
    
    // i18n 支持
    const getLanguage = () => {
        try {
            return app.vault.adapter.app.i18n?.language || 'en';
        } catch {
            return moment.locale() === 'zh-cn' ? 'zh' : 'en';
        }
    };
    
    const texts = {
        zh: {
            updating: "正在更新...",
            currentProgress: "当前进度：",
            dragging: "拖动中",
            clickOrDrag: "点击或拖动调整",
            progressUpdated: "进度已更新为",
            updateFailed: "更新进度失败!",
            noActiveFile: "没有活动文件",
            noProgressProperty: "progress 或 task_progress 属性不存在！",
            percent: "%"
        },
        en: {
            updating: "Updating...",
            currentProgress: "Progress: ",
            dragging: "Dragging",
            clickOrDrag: "Click or drag to adjust",
            progressUpdated: "Progress updated to",
            updateFailed: "Failed to update progress!",
            noActiveFile: "No active file",
            noProgressProperty: "progress or task_progress property not found！",
            percent: "%"
        }
    };
    
    const lang = getLanguage();
    const t = texts[lang] || texts.en;
    
    // 状态管理
    const [progress, setProgress] = dc.useState(0);
    const [isDragging, setIsDragging] = dc.useState(false);
    const [isUpdating, setIsUpdating] = dc.useState(false);
    const [styles, setStyles] = dc.useState("");
    
    const cssFile = app.metadataCache.getFirstLinkpathDest("dc-nyanCatProgress.css");
    
    // 加载CSS样式
    dc.useEffect(() => {
        if (cssFile) {
            app.vault.cachedRead(cssFile).then(setStyles);
        }
    }, []);
    
    // 初始化进度值
    dc.useEffect(() => {
        if (initialProgress !== undefined && initialProgress !== null) {
            setProgress(Math.min(Math.max(initialProgress, 0), 100));
        } else if (task_progress) {
            const split = task_progress.split("/");
            if (split.length === 2) {
                const done = parseFloat(split[0]);
                const total = parseFloat(split[1]);
                if (total > 0) {
                    setProgress(Math.round((done / total) * 100));
                } else {
                    setProgress(0);
                }
            }
        }
    }, [initialProgress, task_progress]);
    
    // 更新笔记中的progress属性
    const updateNoteProgress = async (newProgress) => {
        setIsUpdating(true);
        try {
            const activeFile = app.workspace.getActiveFile();
            if (!activeFile) {
                console.error(t.noActiveFile);
                return;
            }
            
            await app.fileManager.processFrontMatter(activeFile, (frontmatter) => {
                frontmatter.progress = newProgress;
            });
            
            new Notice(`${t.progressUpdated} ${newProgress}${t.percent}`);
        } catch (error) {
            console.error("更新进度失败:", error);
            new Notice(t.updateFailed);
        }
        setIsUpdating(false);
    };
    
    // 用于存储进度条容器的引用
    const progressContainerRef = dc.useRef(null);
    const [finalProgress, setFinalProgress] = dc.useState(progress);
    
    // 根据鼠标位置计算进度
    const calculateProgressFromMouse = (e) => {
        if (!progressContainerRef.current) return progress;
        const rect = progressContainerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percentage = Math.min(Math.max((x / rect.width) * 100, 0), 100);
        return Math.round(percentage);
    };
    
    // 处理拖动开始
    const handleMouseDown = (e) => {
        e.preventDefault();
        setIsDragging(true);
        const newProgress = calculateProgressFromMouse(e);
        setProgress(newProgress);
    };
    
    // 处理拖动中
    const handleMouseMove = dc.useCallback((e) => {
        if (!isDragging) return;
        e.preventDefault();
        const newProgress = calculateProgressFromMouse(e);
        setProgress(newProgress);
    }, [isDragging]);
    
    // 处理拖动结束
    const handleMouseUp = dc.useCallback((e) => {
        if (!isDragging) return;
        e.preventDefault();
        const finalProgress = calculateProgressFromMouse(e);
        setProgress(finalProgress);
        setFinalProgress(finalProgress);
        setIsDragging(false);
        // 拖动结束后更新笔记
        updateNoteProgress(finalProgress);
    }, [isDragging]);
    
    // 添加全局鼠标事件监听器
    dc.useEffect(() => {
        if (isDragging) {
            const handleGlobalMouseMove = (e) => handleMouseMove(e);
            const handleGlobalMouseUp = (e) => handleMouseUp(e);
            
            document.addEventListener('mousemove', handleGlobalMouseMove);
            document.addEventListener('mouseup', handleGlobalMouseUp);
            document.addEventListener('mouseleave', handleGlobalMouseUp);
            
            return () => {
                document.removeEventListener('mousemove', handleGlobalMouseMove);
                document.removeEventListener('mouseup', handleGlobalMouseUp);
                document.removeEventListener('mouseleave', handleGlobalMouseUp);
            };
        }
    }, [isDragging, handleMouseMove, handleMouseUp]);
    
    // 如果没有初始进度值且没有task_progress，显示错误信息
    if (initialProgress === undefined && initialProgress === null && !task_progress) {
        return <p>{t.noProgressProperty}</p>;
    }
    
    const progressAdditionalCss = progress < 30 ? "progress-low" : progress < 60 ? "progress-medium" : "progress-high";
    const catPosition = Math.min(Math.max(progress - 2, 0), 98); // 调整猫的位置让它不会超出边界，100%时可以到达98%位置
    
    return (
        <>
            <style>{styles}</style>
            <div className="progress-container nyan-cat" style={{marginTop: "0.5rem", marginBottom: "0.5rem"}}>
                <div className="custom-progress-container" style={{display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column"}}>
                    <div className={`progress-fill ${progressAdditionalCss}`} style={{width: "80%"}}>
                        {/* 可拖动的进度条容器 */}
                        <div 
                            ref={progressContainerRef}
                            className={`draggable-progress-container ${isUpdating ? 'progress-updating' : ''}`}
                            onMouseDown={handleMouseDown}
                            style={{
                                cursor: isDragging ? 'grabbing' : 'pointer',
                                userSelect: 'none'
                            }}
                        >
                            {/* 进度填充 */}
                            <div 
                                className="draggable-progress-fill" 
                                style={{ width: `${progress}%` }}
                            />
                            
                            {/* 可拖动的猫猫 */}
                            <div 
                                className={`draggable-nyan-cat ${isDragging ? 'dragging' : ''}`}
                                style={{ 
                                    left: `${catPosition}%`
                                }}
                            />
                        </div>
                    </div>
                    
                    <div style={{ textAlign: "center", marginTop: "0.5em" }}>
                        <span className="rainbow-hover progress-text-center" style={{
                            fontSize: "0.8em", 
                            color: "var(--text-muted)"
                        }}> 
                            {isUpdating ? t.updating : `${t.currentProgress}${progress}${t.percent}`}
                        </span>
                        
                        <div style={{
                            fontSize: "0.6em",
                            color: "var(--text-muted)",
                            opacity: 0.6,
                            marginTop: "0.2em"
                        }}>
                            {!isUpdating && (isDragging ? t.dragging : t.clickOrDrag)}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

const renderedView = <Func />;
return { renderedView, Func };

function View() {
    const currentFile = dc.useCurrentFile();
    if (Func) {
        return Func({ currentFile });
    }
    return <p>Nothing to render</p>;
}