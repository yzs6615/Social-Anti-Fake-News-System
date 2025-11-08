// Simple build script to copy static files to dist directory
const fs = require('fs');
const path = require('path');

console.log('Starting build process...');
console.log('Current directory:', process.cwd());
console.log('Node version:', process.version);

try {
    // Files to copy (excluding vercel.json which should stay in root)
    const filesToCopy = ['index.html', 'script.js', 'styles.css'];

    // Check if source files exist
    console.log('\nChecking source files...');
    filesToCopy.forEach(file => {
        const exists = fs.existsSync(file);
        console.log(`${exists ? '✓' : '✗'} ${file}: ${exists ? 'found' : 'NOT FOUND'}`);
        if (!exists) {
            throw new Error(`Required file ${file} not found!`);
        }
    });

    // Create dist directory
    console.log('\nCreating dist directory...');
    if (!fs.existsSync('dist')) {
        fs.mkdirSync('dist', { recursive: true });
        console.log('✓ Created dist directory');
    } else {
        console.log('✓ dist directory already exists');
        // Clean dist directory
        const files = fs.readdirSync('dist');
        files.forEach(file => {
            const filePath = path.join('dist', file);
            try {
                const stat = fs.statSync(filePath);
                if (stat.isFile()) {
                    fs.unlinkSync(filePath);
                }
            } catch (err) {
                console.warn(`Warning: Could not delete ${filePath}:`, err.message);
            }
        });
        console.log('✓ Cleaned dist directory');
    }

    // Copy files
    console.log('\nCopying files...');
    filesToCopy.forEach(file => {
        const srcPath = path.resolve(file);
        const destPath = path.join('dist', file);
        fs.copyFileSync(srcPath, destPath);
        console.log(`✓ Copied ${file} to dist/`);
    });

    // Verify files were copied
    console.log('\nVerifying copied files...');
    const distFiles = fs.readdirSync('dist');
    console.log('Files in dist:', distFiles);
    
    filesToCopy.forEach(file => {
        const destPath = path.join('dist', file);
        if (fs.existsSync(destPath)) {
            const stats = fs.statSync(destPath);
            console.log(`✓ ${file}: ${stats.size} bytes`);
        } else {
            throw new Error(`File ${file} was not copied to dist!`);
        }
    });

    console.log('\n✓ Build completed successfully!');
    process.exit(0);
} catch (error) {
    console.error('\n✗ Build failed:', error.message);
    console.error('Error stack:', error.stack);
    process.exit(1);
}

