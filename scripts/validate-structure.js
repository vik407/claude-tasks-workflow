#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Validating Claude Tasks Workflow structure...\n');

const requiredFiles = [
  '.claude/agents/task-analyzer.md',
  '.claude/agents/task-planner.md', 
  '.claude/agents/implementation-guide.md',
  '.claude/agents/meeting-facilitator.md',
  '.claude/context/project-analyzer.md',
  '.claude/MIGRATION_SUMMARY.md'
];

const requiredDirectories = [
  '.claude/agents',
  '.claude/commands/project',
  '.claude/context',
  '.claude/tasks'
];

let hasErrors = false;

// Check required directories
console.log('📁 Checking directory structure...');
requiredDirectories.forEach(dir => {
  if (fs.existsSync(dir) && fs.statSync(dir).isDirectory()) {
    console.log(`  ✅ ${dir}`);
  } else {
    console.log(`  ❌ Missing directory: ${dir}`);
    hasErrors = true;
  }
});

console.log();

// Check required files
console.log('📄 Checking required files...');
requiredFiles.forEach(file => {
  if (fs.existsSync(file) && fs.statSync(file).isFile()) {
    console.log(`  ✅ ${file}`);
  } else {
    console.log(`  ❌ Missing file: ${file}`);
    hasErrors = true;
  }
});

console.log();

// Check sub-agents have proper YAML frontmatter
console.log('🤖 Validating sub-agent format...');
const subagentFiles = fs.readdirSync('.claude/agents')
  .filter(file => file.endsWith('.md'))
  .map(file => path.join('.claude/agents', file));

subagentFiles.forEach(file => {
  try {
    const content = fs.readFileSync(file, 'utf8');
    const hasYamlFrontmatter = content.startsWith('---\n');
    const hasName = content.includes('name:');
    const hasDescription = content.includes('description:');
    const hasTools = content.includes('tools:');
    
    if (hasYamlFrontmatter && hasName && hasDescription && hasTools) {
      console.log(`  ✅ ${path.basename(file)} - Valid sub-agent format`);
    } else {
      console.log(`  ⚠️  ${path.basename(file)} - Missing required frontmatter fields`);
      if (!hasYamlFrontmatter) console.log(`      Missing YAML frontmatter`);
      if (!hasName) console.log(`      Missing 'name' field`);  
      if (!hasDescription) console.log(`      Missing 'description' field`);
      if (!hasTools) console.log(`      Missing 'tools' field`);
      hasErrors = true;
    }
  } catch (error) {
    console.log(`  ❌ Error reading ${path.basename(file)}: ${error.message}`);
    hasErrors = true;
  }
});

console.log();

// Check enhanced commands
console.log('🔧 Validating enhanced commands...');
const commandDirs = ['task', 'jira', 'ci', 'workflow', 'meeting'];
commandDirs.forEach(dir => {
  const dirPath = path.join('.claude/commands/project', dir);
  if (fs.existsSync(dirPath)) {
    const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.md'));
    console.log(`  ✅ ${dir}/ - ${files.length} command(s): ${files.join(', ')}`);
  } else {
    console.log(`  ⚠️  Missing command directory: ${dir}/`);
  }
});

console.log();

if (hasErrors) {
  console.log('❌ Structure validation failed. Please fix the issues above.');
  process.exit(1);
} else {
  console.log('✅ Structure validation passed! All required files and directories are present.');
  process.exit(0);
}