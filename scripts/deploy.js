#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * Deploy Script - Replace root .claude with latest build
 * 
 * Usage:
 *   node scripts/deploy.js                    # Deploy to current project
 *   node scripts/deploy.js /path/to/project   # Deploy to external project
 *   node scripts/deploy.js ../other-project  # Deploy to relative path
 * 
 * This script:
 * 1. Backs up current .claude directory
 * 2. Preserves .claude/tasks directory (project context)
 * 3. Replaces .claude with latest build from build/dist/
 * 4. Restores .claude/tasks directory
 * 5. Cleans up temporary files
 * 6. Restarts Claude Code (only for local deployments)
 */

function log(message) {
  console.log(`[DEPLOY] ${message}`);
}

function error(message) {
  console.error(`[DEPLOY ERROR] ${message}`);
  process.exit(1);
}

function runCommand(command, description) {
  try {
    log(description);
    execSync(command, { stdio: 'inherit' });
  } catch (err) {
    error(`Failed to ${description.toLowerCase()}: ${err.message}`);
  }
}

function findLatestBuild() {
  const distDir = path.join(__dirname, '..', 'build', 'dist');
  
  if (!fs.existsSync(distDir)) {
    error('No build/dist directory found. Run "npm run prepare:dist" first.');
  }
  
  const builds = fs.readdirSync(distDir)
    .filter(dir => fs.statSync(path.join(distDir, dir)).isDirectory())
    .sort()
    .reverse();
  
  if (builds.length === 0) {
    error('No builds found in build/dist/. Run "npm run prepare:dist" first.');
  }
  
  const latestBuild = builds[0];
  const buildPath = path.join(distDir, latestBuild);
  const archivePath = path.join(buildPath, 'ctw.zip');
  
  if (!fs.existsSync(archivePath)) {
    error(`No ctw.zip found in latest build: ${buildPath}`);
  }
  
  return { buildPath, archivePath, buildDate: latestBuild };
}

function main() {
  // Parse command line arguments
  const args = process.argv.slice(2);
  let targetDir = null;
  let isExternalDeployment = false;

  if (args.length > 0) {
    targetDir = args[0];
    
    // Convert relative path to absolute
    if (!path.isAbsolute(targetDir)) {
      targetDir = path.resolve(process.cwd(), targetDir);
    }
    
    // Verify target directory exists
    if (!fs.existsSync(targetDir)) {
      error(`Target directory does not exist: ${targetDir}`);
    }
    
    isExternalDeployment = true;
    log(`Deploying to external project: ${targetDir}`);
  } else {
    targetDir = path.join(__dirname, '..');
    log('Deploying to current project');
  }

  const claudeDir = path.join(targetDir, '.claude');
  const backupDir = path.join(targetDir, '.claude.backup');
  const tasksPreserveDir = path.join(targetDir, '.claude.tasks.preserve');
  
  log('Starting deployment process...');
  
  // Find latest build
  const { buildPath, archivePath, buildDate } = findLatestBuild();
  log(`Using build: ${buildDate}`);
  
  // Extract latest build
  const tempExtractDir = path.join(buildPath, 'extracted');
  if (fs.existsSync(tempExtractDir)) {
    runCommand(`rm -rf "${tempExtractDir}"`, 'Cleaning previous extraction');
  }
  
  runCommand(`cd "${buildPath}" && unzip -o -q ctw.zip`, 'Extracting latest build');
  
  if (!fs.existsSync(path.join(buildPath, '.claude'))) {
    error('Extracted build does not contain .claude directory');
  }
  
  // Ensure target .claude exists for first-time deployments
  if (!fs.existsSync(claudeDir)) {
    log('No existing .claude directory found at target. Creating it for first-time deployment...');
    fs.mkdirSync(claudeDir, { recursive: true });
  }

  // Backup current .claude
  if (fs.existsSync(backupDir)) {
    runCommand(`rm -rf "${backupDir}"`, 'Removing old backup');
  }
  
  if (fs.existsSync(claudeDir)) {
    runCommand(`cp -r "${claudeDir}" "${backupDir}"`, 'Backing up current .claude');
  }
  
  // Preserve tasks directory
  const tasksDir = path.join(claudeDir, 'tasks');
  if (fs.existsSync(tasksDir)) {
    if (fs.existsSync(tasksPreserveDir)) {
      runCommand(`rm -rf "${tasksPreserveDir}"`, 'Removing old tasks preserve');
    }
    runCommand(`cp -r "${tasksDir}" "${tasksPreserveDir}"`, 'Preserving tasks directory');
    log('Tasks directory preserved (contains project context)');
  } else {
    log('No tasks directory found - skipping preservation');
  }
  
  // Remove old workflow files (preserve tasks)
  if (fs.existsSync(claudeDir)) {
    const filesToRemove = [
      'agents', 'commands', 'context', 'knowledge', 
      'BUILD_INFO.json', 'MIGRATION_SUMMARY.md'
    ];
    
    for (const item of filesToRemove) {
      const itemPath = path.join(claudeDir, item);
      if (fs.existsSync(itemPath)) {
        runCommand(`rm -rf "${itemPath}"`, `Removing old ${item}`);
      }
    }
  }
  
  // Copy new build content (ensure destination exists)
  if (!fs.existsSync(claudeDir)) {
    fs.mkdirSync(claudeDir, { recursive: true });
  }
  runCommand(`cp -r "${buildPath}/.claude"/* "${claudeDir}"/`, 'Deploying new build content');
  
  // Restore tasks directory
  if (fs.existsSync(tasksPreserveDir)) {
    const newTasksDir = path.join(claudeDir, 'tasks');
    if (fs.existsSync(newTasksDir)) {
      runCommand(`rm -rf "${newTasksDir}"`, 'Removing new tasks directory');
    }
    runCommand(`cp -r "${tasksPreserveDir}" "${newTasksDir}"`, 'Restoring preserved tasks');
    log('Tasks directory restored with project context');
  }
  
  // Clean up temporary files
  runCommand(`rm -rf "${tasksPreserveDir}"`, 'Cleaning up temporary files');
  runCommand(`rm -rf "${buildPath}/.claude"`, 'Cleaning up extracted files');
  
  // Verify deployment
  log('Verifying deployment...');
  const expectedDirs = ['agents', 'commands', 'context', 'knowledge'];
  for (const dir of expectedDirs) {
    const dirPath = path.join(claudeDir, dir);
    if (!fs.existsSync(dirPath)) {
      error(`Deployment verification failed: ${dir} directory not found`);
    }
  }
  
  if (fs.existsSync(path.join(claudeDir, 'tasks'))) {
    log('✓ Tasks directory preserved');
  }
  
  log('✓ Deployment completed successfully!');
  log(`✓ Build deployed: ${buildDate}`);
  log(`✓ Backup available: .claude.backup`);
  log('');
  
  // Restart Claude Code only for local deployments
  if (!isExternalDeployment) {
    log('🔄 Restarting Claude Code to load new workflow...');
    try {
      execSync('claude restart', { stdio: 'inherit' });
      log('✅ Claude Code restarted successfully!');
    } catch (err) {
      log('⚠️  Could not restart Claude Code automatically. Please restart manually.');
      log('   Run: claude restart');
    }
  } else {
    log('⚠️  External deployment completed. Claude Code restart not required.');
  }
  
  log('');
  log('Next steps:');
  if (isExternalDeployment) {
    log(`- Review changes in target project: cd "${targetDir}" && git diff`);
    log(`- Run validation in target project: cd "${targetDir}" && npm run validate (if available)`);
    log(`- Commit changes in target project: cd "${targetDir}" && git add . && git commit -m "Deploy latest workflow build"`);
  } else {
    log('- Review changes: git diff');
    log('- Run validation: npm run validate');
    log('- Commit changes: git add . && git commit -m "Deploy latest workflow build"');
  }
}

if (require.main === module) {
  main();
}

module.exports = { main };