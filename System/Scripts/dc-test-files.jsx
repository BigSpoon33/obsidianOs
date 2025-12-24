// Test widget to debug file detection

function TestFiles() {
    const [allFiles, setAllFiles] = dc.useState([]);
    
    dc.useEffect(() => {
        const files = app.vault.getFiles();
        setAllFiles(files);
        console.log('Total files:', files.length);
        console.log('First file:', files[0]);
        console.log('Sample image files:', files.filter(f => ['gif','png','jpg'].includes(f.extension.toLowerCase())).slice(0, 5));
    }, []);
    
    const imageFiles = allFiles.filter(f => ['gif','png','jpg','jpeg','webp'].includes(f.extension.toLowerCase()));
    
    return (
        <div style={{padding: '20px', background: 'var(--background-secondary)', borderRadius: '8px'}}>
            <h3>File Detection Test</h3>
            <div>Total Files: {allFiles.length}</div>
            <div>Image Files: {imageFiles.length}</div>
            <div style={{marginTop: '10px'}}>
                <h4>First 5 Images:</h4>
                <ul>
                    {imageFiles.slice(0, 5).map((f, i) => (
                        <li key={i}>{f.path} ({f.extension})</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

return { Func: TestFiles };
