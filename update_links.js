const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
    fs.readdirSync(dir).forEach( f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
    });
};

walk('.', (filePath) => {
    if (filePath.includes('node_modules')) return;
    if (filePath.includes('.vite')) return;
    if (path.extname(filePath) !== '.html') return;

    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace lamborghini.html with revuelto.html in footer/collection links
    const newContent = content.replace(/href="lamborghini\.html"/g, 'href="/revuelto"');

    if (newContent !== content) {
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log(`Updated link in: ${filePath}`);
    }
});

console.log("Footer link update complete.");
