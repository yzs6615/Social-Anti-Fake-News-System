// Simple build script to copy static files to dist directory
const fs = require('fs');
const path = require('path');

// Files to copy (excluding vercel.json which should stay in root)
const filesToCopy = ['index.html', 'script.js', 'styles.css'];

// Create dist directory
if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist');
} else {
    // Clean dist directory
    const files = fs.readdirSync('dist');
    files.forEach(file => {
        const filePath = path.join('dist', file);
        if (fs.statSync(filePath).isFile()) {
            fs.unlinkSync(filePath);
        }
    });
}

// Copy files
filesToCopy.forEach(file => {
    if (fs.existsSync(file)) {
        fs.copyFileSync(file, path.join('dist', file));
        console.log(`✓ Copied ${file} to dist/`);
    } else {
        console.warn(`⚠ Warning: ${file} not found`);
    }
});

console.log('Build completed successfully!');

