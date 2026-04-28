import { readdirSync, statSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

function walk(dir) {
    let results = [];
    const list = readdirSync(dir);
    list.forEach(function(file) {
        file = join(dir, file);
        // Skip ignored directories
        if (file.includes('node_modules') || file.includes('.git') || file.includes('dist') || file.includes('.gemini') || file.includes('public')) return;
        
        try {
            const stat = statSync(file);
            if (stat && stat.isDirectory()) { 
                results = results.concat(walk(file));
            } else if(file.endsWith('.html') || file.endsWith('.js') || file.endsWith('.json')) {
                results.push(file);
            }
        } catch (e) {
            // Ignore
        }
    });
    return results;
}

// Equivalent of __dirname in ESM format
const currentDir = process.cwd();
const files = walk(currentDir);
let count = 0;

files.forEach(file => {
    if (file.includes('rename.mjs')) return;
    
    try {
        let content = readFileSync(file, 'utf8');
        let changed = false;

        // 1. Logo HTML specific
        if (content.includes('ZEN<span>T</span>ARO')) {
            content = content.replaceAll('ZEN<span>T</span>ARO', 'SMK <span>C</span>AR');
            changed = true;
        }
        
        // 2. Headings and full uppercase
        if (content.includes('ZENTARO')) {
            content = content.replaceAll('ZENTARO', 'SMK CAR');
            changed = true;
        }
        
        // 3. Regular case text
        if (content.includes('Zentaro')) {
            content = content.replaceAll('Zentaro', 'SMK Car');
            changed = true;
        }

        // 4. Lowercase
        if (content.includes('zentaro')) {
            content = content.replaceAll('zentaro', 'smk car');
            changed = true;
        }

        // 5. Replace page titles strictly
        if (content.includes('Zentaro Exhibition')) {
            content = content.replaceAll('Zentaro Exhibition', 'SMK Car Exhibition');
            changed = true;
        }

        if (changed) {
            writeFileSync(file, content, 'utf8');
            count++;
            console.log("Updated:", file);
        }
    } catch(e) {
        // Skip files that can't be read/written
    }
});

console.log(`Successfully renamed ZENTARO to SMK CAR in ${count} files.`);
