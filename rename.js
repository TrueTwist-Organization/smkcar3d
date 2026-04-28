const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        // Skip ignored directories
        if (file.includes('node_modules') || file.includes('.git') || file.includes('dist') || file.includes('.gemini') || file.includes('public')) return;
        
        try {
            const stat = fs.statSync(file);
            if (stat && stat.isDirectory()) { 
                results = results.concat(walk(file));
            } else if(file.endsWith('.html') || file.endsWith('.js')) {
                results.push(file);
            }
        } catch (e) {
            // Ignore unreadable files
        }
    });
    return results;
}

const files = walk(__dirname);
let count = 0;

files.forEach(file => {
    if (file.includes('rename.js')) return;
    
    try {
        let content = fs.readFileSync(file, 'utf8');
        let changed = false;

        // 1. Logo HTML specific: SMK <span>C</span>AR -> SMK <span>C</span>AR
        if (content.includes('SMK <span>C</span>AR')) {
            content = content.replace(/ZEN<span>T<\/span>ARO/g, 'SMK <span>C</span>AR');
            changed = true;
        }
        
        // 2. Headings and full uppercase
        if (content.includes('SMK CAR')) {
            content = content.replace(/SMK CAR/g, 'SMK CAR');
            changed = true;
        }
        
        // 3. Regular case text
        if (content.includes('SMK Car')) {
            content = content.replace(/SMK Car/g, 'SMK Car');
            changed = true;
        }

        // 4. Lowercase
        if (content.includes('smk car')) {
            content = content.replace(/smk car/g, 'smk car');
            changed = true;
        }

        if (changed) {
            fs.writeFileSync(file, content, 'utf8');
            count++;
            console.log("Updated:", file);
        }
    } catch(e) {
        // Skip files that can't be read/written
        console.error("Failed to process", file, e.message);
    }
});

console.log(`\nSuccessfully renamed SMK CAR to SMK CAR in ${count} files.`);
