const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
    fs.readdirSync(dir).forEach( f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
    });
};

const pattern = /(<a\s+[^>]*class="([^"]*(?:footer-logo|z-logo|nav-logo)[^"]*)"[^>]*>)\s*(?:<img[^>]*>\s*)?SMK\s*<span>C<\/span>AR\s*<\/a>/gi;

walk('.', (filePath) => {
    if (filePath.includes('node_modules')) return;
    if (filePath.includes('.vite')) return;
    if (path.extname(filePath) !== '.html') return;

    let content = fs.readFileSync(filePath, 'utf8');
    let hasChanged = false;

    let newContent = content.replace(pattern, (match, openTag, classes) => {
        hasChanged = true;
        let newClasses = classes;
        if (!classes.includes(' logo')) {
            newClasses = classes + ' logo';
        }
        let cleanOpenTag = openTag.replace(`class="${classes}"`, `class="${newClasses}"`);
        return `${cleanOpenTag}<img src="public/logo.png" class="brand-logo" alt="Logo">SMK <span>C</span>AR</a>`;
    });

    if (hasChanged && newContent !== content) {
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log(`Updated: ${filePath}`);
    }
});

console.log("Logo standardization complete.");
