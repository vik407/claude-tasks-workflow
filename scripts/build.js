#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Import Claude 4 compliance validation
const { validateClaude4Compliance } = require('./validate-claude4-compliance');

console.log('🔨 Building Claude Tasks Workflow distribution...\n');

const sourceDir = 'src/claude';
const buildDir = 'build/.claude';

/**
 * Clean build directory
 */
function cleanBuild() {
  console.log('🧹 Cleaning build directory...');
  if (fs.existsSync(buildDir)) {
    fs.rmSync(buildDir, { recursive: true, force: true });
    console.log(`   Removed: ${buildDir}/`);
  }
  console.log('   ✅ Build directory cleaned\n');
}

/**
 * Copy files recursively with validation
 * @param {string} src - Source directory
 * @param {string} dest - Destination directory
 * @param {Object} options - Copy options
 */
function copyRecursive(src, dest, options = {}) {
  if (!fs.existsSync(src)) {
    throw new Error(`Source directory does not exist: ${src}`);
  }

  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });
  let fileCount = 0;
  let dirCount = 0;
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      console.log(`📁 Building directory: ${entry.name}/`);
      dirCount++;
      const subCounts = copyRecursive(srcPath, destPath, options);
      fileCount += subCounts.files;
      dirCount += subCounts.dirs;
    } else {
      // Validate file before copying
      if (entry.name.endsWith('.md')) {
        validateMarkdownFile(srcPath);
      }
      
      console.log(`📄 Building file: ${entry.name}`);
      fs.copyFileSync(srcPath, destPath);
      fileCount++;
      
      // Optimize file if needed
      if (options.optimize && entry.name.endsWith('.md')) {
        optimizeMarkdownFile(destPath);
      }
    }
  }
  
  return { files: fileCount, dirs: dirCount };
}

/**
 * Validate markdown file structure and Claude 4 compliance
 * @param {string} filePath - Path to markdown file
 */
function validateMarkdownFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const filename = path.basename(filePath);
  
  // Special validation for sub-agents
  if (filePath.includes('/agents/')) {
    const hasYamlFrontmatter = content.startsWith('---\n');
    const hasName = content.includes('name:');
    const hasDescription = content.includes('description:');
    const hasTools = content.includes('tools:');
    
    if (!hasYamlFrontmatter || !hasName || !hasDescription || !hasTools) {
      throw new Error(`Invalid sub-agent format in ${filename}: missing required YAML frontmatter fields`);
    }
    
    // Claude 4 compliance validation for sub-agents
    try {
      const complianceResult = validateClaude4Compliance(filePath, true);
      if (!complianceResult.compliant) {
        console.log(`   ⚠️  Claude 4 compliance issues in ${filename}: ${complianceResult.totalScore}%`);
        if (complianceResult.criticalIssues.length > 0) {
          console.log(`       Critical issues: ${complianceResult.criticalIssues.join(', ')}`);
        }
      } else {
        console.log(`   ✅ Claude 4 compliant: ${filename} (${complianceResult.totalScore}%)`);
      }
    } catch (error) {
      console.log(`   ⚠️  Claude 4 validation error in ${filename}: ${error.message}`);
    }
  }
  
  // Check for common markdown issues
  if (content.includes('\\n\\n\\n')) {
    console.log(`   ⚠️  Multiple consecutive newlines in ${filename}`);
  }
  
  if (content.length < 10) {
    throw new Error(`File too short: ${filename} (${content.length} characters)`);
  }
}

/**
 * Optimize markdown file (remove excess whitespace, etc.)
 * @param {string} filePath - Path to markdown file
 */
function optimizeMarkdownFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Remove excessive newlines (more than 2 consecutive)
  content = content.replace(/\n{3,}/g, '\\n\\n');
  
  // Ensure file ends with single newline
  content = content.replace(/\\n*$/, '\\n');
  
  fs.writeFileSync(filePath, content, 'utf8');
}

/**
 * Validate build structure
 */
function validateBuild() {
  console.log('🔍 Validating build structure...');
  
  const requiredPaths = [
    { path: path.join(buildDir, 'agents'), name: 'agents directory', type: 'dir' },
    { path: path.join(buildDir, 'commands'), name: 'commands directory', type: 'dir' },
    { path: path.join(buildDir, 'context'), name: 'context directory', type: 'dir' },
    { path: path.join(buildDir, 'agents', 'task-analyzer.md'), name: 'task-analyzer.md', type: 'file' },
    { path: path.join(buildDir, 'agents', 'task-planner.md'), name: 'task-planner.md', type: 'file' },
    { path: path.join(buildDir, 'agents', 'implementation-guide.md'), name: 'implementation-guide.md', type: 'file' },
    { path: path.join(buildDir, 'agents', 'meeting-facilitator.md'), name: 'meeting-facilitator.md', type: 'file' }
  ];
  
  let allValid = true;
  requiredPaths.forEach(req => {
    if (fs.existsSync(req.path)) {
      const stat = fs.statSync(req.path);
      const isCorrectType = req.type === 'dir' ? stat.isDirectory() : stat.isFile();
      
      if (isCorrectType) {
        console.log(`   ✅ ${req.name}`);
      } else {
        console.log(`   ❌ Wrong type: ${req.name} (expected ${req.type})`);
        allValid = false;
      }
    } else {
      console.log(`   ❌ Missing: ${req.name}`);
      allValid = false;
    }
  });
  
  return allValid;
}

/**
 * Generate build metadata
 */
function generateBuildMetadata() {
  console.log('📋 Generating build metadata...');
  
  const metadata = {
    buildTime: new Date().toISOString(),
    buildVersion: '2.0.0',
    nodeVersion: process.version,
    source: 'src/claude',
    target: 'build/.claude',
    buildTool: 'scripts/build.js'
  };
  
  // Count files in build
  const countFiles = (dir) => {
    if (!fs.existsSync(dir)) return 0;
    
    let count = 0;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      if (entry.isDirectory()) {
        count += countFiles(path.join(dir, entry.name));
      } else {
        count++;
      }
    }
    
    return count;
  };
  
  metadata.statistics = {
    totalFiles: countFiles(buildDir),
    agents: countFiles(path.join(buildDir, 'agents')),
    commands: countFiles(path.join(buildDir, 'commands')),
    context: countFiles(path.join(buildDir, 'context')),
    knowledge: countFiles(path.join(buildDir, 'knowledge'))
  };
  
  const metadataPath = path.join(buildDir, 'BUILD_INFO.json');
  fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
  console.log(`   ✅ Build metadata: ${metadataPath}\\n`);
  
  return metadata;
}

/**
 * Main build process
 */
async function build() {
  const buildStart = Date.now();
  
  try {
    console.log('🏗️  Starting Claude Tasks Workflow build process\\n');
    
    // Check source directory exists
    if (!fs.existsSync(sourceDir)) {
      throw new Error(`Source directory not found: ${sourceDir}. Run 'npm run sync:to-src' first.`);
    }
    
    // Step 1: Clean build directory
    cleanBuild();
    
    // Step 2: Copy and validate source files
    console.log('📦 Copying source files to build directory...');
    const { files, dirs } = copyRecursive(sourceDir, buildDir, { optimize: true });
    console.log(`   ✅ Copied ${files} files and ${dirs} directories\\n`);

    // Step 2.5: Copy validation hooks and make executable
    const hooksDir = path.join(sourceDir, 'hooks');
    const buildHooksDir = path.join(buildDir, 'hooks');

    if (fs.existsSync(hooksDir)) {
      console.log('📦 Copying validation hooks...');
      copyRecursive(hooksDir, buildHooksDir);

      // Make hooks executable
      const hookFiles = fs.readdirSync(buildHooksDir);
      let executableCount = 0;

      hookFiles.forEach(file => {
        if (file.endsWith('.py')) {
          const hookPath = path.join(buildHooksDir, file);
          fs.chmodSync(hookPath, 0o755);
          executableCount++;
          console.log(`   ✅ Made executable: ${file}`);
        }
      });

      console.log(`   ✅ Copied ${hookFiles.length} hooks (${executableCount} executable)\\n`);
    } else {
      console.log('⚠️  No hooks directory found (expected at src/claude/hooks/)\\n');
    }

    // Step 3: Validate build structure
    const buildValid = validateBuild();
    if (!buildValid) {
      throw new Error('Build validation failed');
    }
    console.log('   ✅ Build structure validation passed\\n');
    
    // Step 4: Generate build metadata
    const metadata = generateBuildMetadata();
    
    // Step 5: Final validation - verify build directory structure
    console.log('🧪 Running final validation...');
    
    // Verify key files exist and are valid
    const keyFiles = [
      path.join(buildDir, 'agents', 'task-analyzer.md'),
      path.join(buildDir, 'agents', 'task-planner.md'),
      path.join(buildDir, 'agents', 'implementation-guide.md'),
      path.join(buildDir, 'agents', 'meeting-facilitator.md'),
      path.join(buildDir, 'commands', 'project', 'task', 'analyze.md'),
      path.join(buildDir, 'context', 'project-analyzer.md')
    ];
    
    let validationErrors = [];
    keyFiles.forEach(file => {
      if (!fs.existsSync(file)) {
        validationErrors.push(`Missing key file: ${file}`);
      } else {
        const content = fs.readFileSync(file, 'utf8');
        if (content.length < 10) {
          validationErrors.push(`File too small: ${file} (${content.length} chars)`);
        }
      }
    });
    
    if (validationErrors.length > 0) {
      throw new Error(`Final validation failed:\\n${validationErrors.join('\\n')}`);
    }
    
    console.log('   ✅ Final validation passed\\n');
    
    const buildTime = ((Date.now() - buildStart) / 1000).toFixed(2);
    
    console.log('✅ Build completed successfully!');
    console.log(`🚀 Distribution ready at: ${buildDir}/`);
    console.log(`⏱️  Build time: ${buildTime}s`);
    console.log(`📊 Statistics: ${metadata.statistics.totalFiles} files processed`);
    console.log(`🔧 Build info: ${buildDir}/BUILD_INFO.json`);
    
    process.exit(0);
    
  } catch (error) {
    const buildTime = ((Date.now() - buildStart) / 1000).toFixed(2);
    console.error(`\\n❌ Build failed after ${buildTime}s:`);
    console.error(`   Error: ${error.message}`);
    process.exit(1);
  }
}

// Run build if called directly
if (require.main === module) {
  build().catch(console.error);
}

module.exports = { build, cleanBuild, validateBuild };