#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('📦 Creating distribution package...\n');

const buildDir = 'build/.claude';
const distDir = 'build/dist';
const now = new Date();
const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
const dateFolder = path.join(distDir, dateStr);
const zipPath = path.join(dateFolder, 'ctw.zip');

// Check if build directory exists
if (!fs.existsSync(buildDir)) {
    console.error('❌ Build directory not found. Run "npm run build" first.');
    process.exit(1);
}

// Create dist directory structure
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
    console.log('📁 Created dist directory');
}

if (!fs.existsSync(dateFolder)) {
    fs.mkdirSync(dateFolder, { recursive: true });
    console.log(`📁 Created date folder: ${dateStr}`);
}

try {
    // Create zip file of build/.claude folder
    console.log('🗜️  Creating zip archive...');
    
    // Change to build directory and zip the .claude folder
    process.chdir('build');
    execSync(`zip -r "../${zipPath}" .claude/`, { stdio: 'inherit' });
    process.chdir('..');
    
    console.log(`✅ Distribution created: ${zipPath}`);
    
    // Show file size
    const stats = fs.statSync(zipPath);
    const fileSizeInBytes = stats.size;
    const fileSizeInMB = (fileSizeInBytes / (1024 * 1024)).toFixed(2);
    
    console.log(`📊 Archive size: ${fileSizeInMB} MB`);
    console.log(`📍 Location: ${zipPath}`);
    
} catch (error) {
    console.error('❌ Error creating distribution:', error.message);
    process.exit(1);
}

console.log('\n🎉 Distribution package ready for deployment!');