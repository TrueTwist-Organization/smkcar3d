const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir);

function replaceInFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace href="file.html" or href="file.html#hash" with href="/file" or href="/file#hash"
    // Also works with single quotes
    content = content.replace(/href=["']([a-zA-Z0-9_-]+)\.html(#?[a-zA-Z0-9_-]*)["']/g, (match, p1, p2) => {
        if (p1 === 'index') return `href="/${p2}"`;
        return `href="/${p1}${p2}"`;
    });

    // Replace JS assignments like location.href = 'file.html'
    content = content.replace(/location\.href\s*=\s*['"]([a-zA-Z0-9_-]+)\.html['"]/g, (match, p1) => {
        if (p1 === 'index') return `location.href = '/'`;
        return `location.href = '/${p1}'`;
    });

    // Replace template literals in JS like `brand.html?id=${id}` to `/brand?id=${id}`
    content = content.replace(/`([a-zA-Z0-9_-]+)\.html\?id=/g, (match, p1) => {
        return `\`/${p1}?id=`;
    });

    fs.writeFileSync(filePath, content, 'utf8');
}

files.forEach(file => {
    const ext = path.extname(file);
    if ((ext === '.html' || ext === '.js' || ext === '.cjs') && file !== 'fix_routes.cjs' && file !== 'generate_pages.cjs') {
        replaceInFile(path.join(dir, file));
    }
});

console.log('Successfully completed URL route cleanup across all files.');
