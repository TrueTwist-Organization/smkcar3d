const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
    console.log('No dist directory found. Skipping post-build.');
    process.exit(0);
}

const files = fs.readdirSync(distDir);

files.forEach(file => {
    if (file.endsWith('.html') && file !== 'index.html' && file !== '404.html') {
        const name = file.replace(/\.html$/, '');
        const targetDir = path.join(distDir, name);
        
        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir);
        }
        
        const sourcePath = path.join(distDir, file);
        const targetPath = path.join(targetDir, 'index.html');
        
        const content = fs.readFileSync(sourcePath, 'utf8');
        
        // Write the new index.html inside the directory
        fs.writeFileSync(targetPath, content, 'utf8');
        // Delete the original .html file
        fs.unlinkSync(sourcePath);
    }
});

console.log('Post-build: Universal Clean URLs constructed (directories with index.html created).');
