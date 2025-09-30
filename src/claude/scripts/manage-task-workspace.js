#!/usr/bin/env node

/**
 * Task Workspace Manager
 * Enforces canonical folder structure and detects misplaced files
 * Usage: node .claude/scripts/manage-task-workspace.js <verify|fix|dry-run> <TASK_ID>
 * Returns: JSON with compliance status { compliant: boolean, issues: [], actions: [] }
 */

const fs = require('fs');
const path = require('path');

/**
 * Canonical task workspace structure
 */
const CANONICAL_STRUCTURE = {
  required: [
    'analysis.md',
    'plan.md',
    'project-context.md'
  ],
  optional: [
    'auto-implementation.md',
    'guided-implementation.md',
    'validation.md',
    'task-summary.md'
  ],
  directories: {
    '.debug': 'Debug artifacts (optional)',
    'artifacts': 'Additional outputs (optional)'
  }
};

/**
 * Verify workspace structure compliance
 */
function verifyWorkspace(taskId) {
  const result = {
    compliant: true,
    issues: [],
    taskId,
    timestamp: new Date().toISOString(),
    structure: {}
  };

  const taskPath = path.join('.claude', 'tasks', taskId);

  // Check if task directory exists
  if (!fs.existsSync(taskPath)) {
    result.compliant = false;
    result.issues.push({
      type: 'MISSING_WORKSPACE',
      severity: 'critical',
      message: `Task workspace does not exist: ${taskPath}`,
      recovery: 'Run /project:task:init to create workspace'
    });
    return result;
  }

  // Scan directory contents
  const entries = fs.readdirSync(taskPath, { withFileTypes: true });

  // Track found files and directories
  const foundFiles = [];
  const foundDirs = [];
  const unexpectedItems = [];

  for (const entry of entries) {
    if (entry.isDirectory()) {
      foundDirs.push(entry.name);

      // Check if it's an expected directory
      if (!Object.keys(CANONICAL_STRUCTURE.directories).includes(entry.name)) {
        unexpectedItems.push({
          name: entry.name,
          type: 'directory',
          issue: 'Unexpected directory in workspace'
        });
      }
    } else if (entry.isFile()) {
      foundFiles.push(entry.name);

      // Check if it's an expected file
      const isExpected =
        CANONICAL_STRUCTURE.required.includes(entry.name) ||
        CANONICAL_STRUCTURE.optional.includes(entry.name);

      if (!isExpected) {
        unexpectedItems.push({
          name: entry.name,
          type: 'file',
          issue: 'Unexpected file in workspace root',
          suggestion: 'Consider moving to artifacts/ directory'
        });
      }
    }
  }

  result.structure.files = foundFiles;
  result.structure.directories = foundDirs;

  // Check for missing required files
  for (const requiredFile of CANONICAL_STRUCTURE.required) {
    if (!foundFiles.includes(requiredFile)) {
      result.issues.push({
        type: 'MISSING_REQUIRED_FILE',
        severity: 'high',
        message: `Required file missing: ${requiredFile}`,
        file: requiredFile,
        recovery: `Ensure ${requiredFile} is generated during workflow execution`
      });
      result.compliant = false;
    }
  }

  // Report unexpected items
  if (unexpectedItems.length > 0) {
    result.issues.push({
      type: 'UNEXPECTED_ITEMS',
      severity: 'low',
      message: `Found ${unexpectedItems.length} unexpected item(s) in workspace`,
      items: unexpectedItems,
      suggestion: 'Review and organize files according to canonical structure'
    });
  }

  // Check for empty directories (should be cleaned up)
  for (const dir of foundDirs) {
    const dirPath = path.join(taskPath, dir);
    const dirEntries = fs.readdirSync(dirPath);

    if (dirEntries.length === 0) {
      result.issues.push({
        type: 'EMPTY_DIRECTORY',
        severity: 'low',
        message: `Empty directory found: ${dir}`,
        directory: dir,
        suggestion: 'Remove empty directories to keep workspace clean'
      });
    }
  }

  // Check for files in parent directory that should be in task workspace
  const parentPath = path.join('.claude', 'tasks');
  if (fs.existsSync(parentPath)) {
    const parentEntries = fs.readdirSync(parentPath, { withFileTypes: true });
    const misplacedFiles = parentEntries.filter(entry =>
      entry.isFile() &&
      !entry.name.startsWith('.') &&
      entry.name !== 'README.md'
    );

    if (misplacedFiles.length > 0) {
      result.issues.push({
        type: 'MISPLACED_FILES',
        severity: 'medium',
        message: `Found ${misplacedFiles.length} file(s) in tasks directory that should be in task workspace`,
        files: misplacedFiles.map(f => f.name),
        suggestion: 'Move files to appropriate task workspace'
      });
      result.compliant = false;
    }
  }

  return result;
}

/**
 * Fix workspace structure issues
 */
function fixWorkspace(taskId, dryRun = false) {
  const result = {
    success: true,
    actions: [],
    taskId,
    dryRun,
    timestamp: new Date().toISOString()
  };

  const taskPath = path.join('.claude', 'tasks', taskId);

  if (!fs.existsSync(taskPath)) {
    result.success = false;
    result.actions.push({
      type: 'ERROR',
      message: `Cannot fix: task workspace does not exist: ${taskPath}`
    });
    return result;
  }

  // Create backup directory
  const backupDir = path.join(taskPath, '.backup');
  if (!dryRun && !fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
    result.actions.push({
      type: 'CREATE_BACKUP_DIR',
      message: `Created backup directory: ${backupDir}`
    });
  }

  // Get verification results to identify issues
  const verification = verifyWorkspace(taskId);

  // Handle unexpected items - move to artifacts directory
  const unexpectedIssue = verification.issues.find(i => i.type === 'UNEXPECTED_ITEMS');
  if (unexpectedIssue && unexpectedIssue.items) {
    const artifactsDir = path.join(taskPath, 'artifacts');

    if (!dryRun && !fs.existsSync(artifactsDir)) {
      fs.mkdirSync(artifactsDir, { recursive: true });
    }

    result.actions.push({
      type: 'CREATE_DIRECTORY',
      message: `${dryRun ? '[DRY-RUN] Would create' : 'Created'} artifacts directory`,
      path: artifactsDir
    });

    for (const item of unexpectedIssue.items) {
      if (item.type === 'file') {
        const sourcePath = path.join(taskPath, item.name);
        const destPath = path.join(artifactsDir, item.name);
        const backupPath = path.join(backupDir, item.name);

        if (!dryRun) {
          // Backup original
          if (fs.existsSync(sourcePath)) {
            fs.copyFileSync(sourcePath, backupPath);
          }
          // Move to artifacts
          fs.renameSync(sourcePath, destPath);
        }

        result.actions.push({
          type: 'MOVE_FILE',
          message: `${dryRun ? '[DRY-RUN] Would move' : 'Moved'} ${item.name} to artifacts/`,
          source: sourcePath,
          destination: destPath,
          backup: backupPath
        });
      }
    }
  }

  // Remove empty directories
  const emptyDirIssues = verification.issues.filter(i => i.type === 'EMPTY_DIRECTORY');
  for (const issue of emptyDirIssues) {
    const dirPath = path.join(taskPath, issue.directory);

    if (!dryRun) {
      try {
        fs.rmdirSync(dirPath);
        result.actions.push({
          type: 'REMOVE_DIRECTORY',
          message: `Removed empty directory: ${issue.directory}`,
          path: dirPath
        });
      } catch (err) {
        result.actions.push({
          type: 'ERROR',
          message: `Failed to remove directory ${issue.directory}: ${err.message}`,
          path: dirPath
        });
      }
    } else {
      result.actions.push({
        type: 'REMOVE_DIRECTORY',
        message: `[DRY-RUN] Would remove empty directory: ${issue.directory}`,
        path: dirPath
      });
    }
  }

  // Summary
  if (result.actions.length === 0) {
    result.actions.push({
      type: 'INFO',
      message: 'No fixes needed - workspace is already compliant'
    });
  }

  return result;
}

/**
 * Main execution
 */
function main() {
  const mode = process.argv[2];
  const taskId = process.argv[3];

  if (!mode || !taskId) {
    console.error('❌ Error: Mode and Task ID required');
    console.error('Usage: node .claude/scripts/manage-task-workspace.js <verify|fix|dry-run> <TASK_ID>');
    console.error('');
    console.error('Modes:');
    console.error('  verify   - Check workspace compliance (read-only)');
    console.error('  fix      - Fix workspace issues (makes changes)');
    console.error('  dry-run  - Show what would be fixed without making changes');
    console.error('');
    console.error('Example: node .claude/scripts/manage-task-workspace.js verify CWF-004');
    process.exit(1);
  }

  const validModes = ['verify', 'fix', 'dry-run'];
  if (!validModes.includes(mode)) {
    console.error(`❌ Error: Invalid mode "${mode}"`);
    console.error(`Valid modes: ${validModes.join(', ')}`);
    process.exit(1);
  }

  console.log(`🔍 Task Workspace Manager - Mode: ${mode.toUpperCase()}`);
  console.log(`   Task: ${taskId}\n`);

  if (mode === 'verify') {
    const result = verifyWorkspace(taskId);

    if (result.compliant) {
      console.log('✅ Workspace is compliant with canonical structure');
      console.log(`   Files: ${result.structure.files.length}`);
      console.log(`   Directories: ${result.structure.directories.length}`);

      if (result.issues.length > 0) {
        console.log(`\n⚠️  ${result.issues.length} minor issue(s):`);
        result.issues.forEach(issue => {
          console.log(`   - [${issue.type}] ${issue.message}`);
        });
      }

      console.log(JSON.stringify(result, null, 2));
      process.exit(0);
    } else {
      console.error('❌ Workspace is NOT compliant');
      console.error(`   ${result.issues.length} issue(s) found:\n`);

      result.issues.forEach(issue => {
        console.error(`   - [${issue.type}] ${issue.message}`);
        if (issue.recovery) {
          console.error(`     Recovery: ${issue.recovery}`);
        }
        if (issue.suggestion) {
          console.error(`     Suggestion: ${issue.suggestion}`);
        }
      });

      console.error('\n💡 Run with "fix" mode to automatically fix issues:');
      console.error(`   node .claude/scripts/manage-task-workspace.js fix ${taskId}`);
      console.error('\n📋 Or use "dry-run" to preview changes:');
      console.error(`   node .claude/scripts/manage-task-workspace.js dry-run ${taskId}`);

      console.error(JSON.stringify(result, null, 2));
      process.exit(1);
    }
  } else if (mode === 'fix' || mode === 'dry-run') {
    const isDryRun = mode === 'dry-run';
    const result = fixWorkspace(taskId, isDryRun);

    if (result.success) {
      if (isDryRun) {
        console.log('📋 DRY-RUN: The following actions would be performed:\n');
      } else {
        console.log('✅ Workspace fixes applied:\n');
      }

      result.actions.forEach(action => {
        const prefix = action.type === 'ERROR' ? '❌' : '✓';
        console.log(`   ${prefix} ${action.message}`);
      });

      if (!isDryRun && result.actions.length > 1) {
        console.log('\n💾 Backup created in .backup/ directory');
        console.log('   Original files preserved before any changes');
      }

      console.log(JSON.stringify(result, null, 2));
      process.exit(0);
    } else {
      console.error('❌ Fix operation failed');
      console.error(JSON.stringify(result, null, 2));
      process.exit(1);
    }
  }
}

// Run if executed directly
if (require.main === module) {
  main();
}

module.exports = { verifyWorkspace, fixWorkspace, CANONICAL_STRUCTURE };