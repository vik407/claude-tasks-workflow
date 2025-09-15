#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔄 Syncing .claude/ to src/claude/ for development...\n');

const sourceDir = '.claude';
const targetDir = 'src/claude';

// Ensure target directory exists
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

/**
 * Copy files recursively while preserving structure
 * @param {string} src - Source directory
 * @param {string} dest - Destination directory
 * @param {string[]} exclude - Directories to exclude
 */
function copyRecursive(src, dest, exclude = []) {
  if (!fs.existsSync(src)) {
    console.log(`⚠️  Source directory does not exist: ${src}`);
    return;
  }

  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    // Skip excluded directories
    if (exclude.includes(entry.name)) {
      console.log(`⏭️  Skipping excluded directory: ${entry.name}`);
      continue;
    }
    
    if (entry.isDirectory()) {
      console.log(`📁 Copying directory: ${entry.name}/`);
      copyRecursive(srcPath, destPath, exclude);
    } else {
      console.log(`📄 Copying file: ${entry.name}`);
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

try {
  // Copy .claude/ content to src/claude/, excluding tasks directory
  const excludeDirs = ['tasks'];
  
  console.log('📋 Starting sync operation...');
  console.log(`   Source: ${sourceDir}/`);
  console.log(`   Target: ${targetDir}/`);
  console.log(`   Excluding: ${excludeDirs.join(', ')}\n`);
  
  copyRecursive(sourceDir, targetDir, excludeDirs);
  
  // Remove .gitkeep files that are no longer needed
  const gitkeepFiles = [
    path.join(targetDir, 'agents', '.gitkeep'),
    path.join(targetDir, 'commands', '.gitkeep'),
    path.join(targetDir, 'context', '.gitkeep'),
    path.join(targetDir, 'knowledge', '.gitkeep')
  ];
  
  console.log('\n🧹 Cleaning up .gitkeep files...');
  gitkeepFiles.forEach(file => {
    if (fs.existsSync(file)) {
      fs.unlinkSync(file);
      console.log(`   Removed: ${file}`);
    }
  });
  
  // Verify sync was successful
  console.log('\n🔍 Verifying sync results...');
  
  const verificationChecks = [
    { path: path.join(targetDir, 'agents'), name: 'agents directory' },
    { path: path.join(targetDir, 'commands'), name: 'commands directory' },
    { path: path.join(targetDir, 'context'), name: 'context directory' },
    { path: path.join(targetDir, 'agents', 'task-analyzer.md'), name: 'task-analyzer.md' },
    { path: path.join(targetDir, 'agents', 'task-planner.md'), name: 'task-planner.md' },
    { path: path.join(targetDir, 'agents', 'implementation-guide.md'), name: 'implementation-guide.md' },
    { path: path.join(targetDir, 'agents', 'meeting-facilitator.md'), name: 'meeting-facilitator.md' }
  ];
  
  let allValid = true;
  verificationChecks.forEach(check => {
    if (fs.existsSync(check.path)) {
      console.log(`   ✅ ${check.name}`);
    } else {
      console.log(`   ❌ Missing: ${check.name}`);
      allValid = false;
    }
  });
  
  // Count files in each directory
  console.log('\n📊 Sync statistics:');
  const dirs = ['agents', 'commands', 'context'];
  dirs.forEach(dir => {
    const dirPath = path.join(targetDir, dir);
    if (fs.existsSync(dirPath)) {
      const files = fs.readdirSync(dirPath).filter(f => !f.startsWith('.'));
      console.log(`   📁 ${dir}/: ${files.length} files`);
    }
  });
  
  if (allValid) {
    console.log('\n✅ Sync completed successfully!');
    console.log('🚀 Development environment ready at src/claude/');
    process.exit(0);
  } else {
    console.log('\n❌ Sync completed with missing files. Please check the output above.');
    process.exit(1);
  }
  
} catch (error) {
  console.error('❌ Sync failed with error:', error.message);
  process.exit(1);
}