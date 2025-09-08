#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Validating Claude Tasks Workflow source files...\n');

const sourceDir = 'src/claude';
let hasErrors = false;

/**
 * Validate source directory exists
 */
function validateSourceDirectory() {
  if (!fs.existsSync(sourceDir)) {
    console.log(`❌ Source directory not found: ${sourceDir}`);
    console.log('   Run "npm run sync:to-src" to set up the development environment.');
    return false;
  }
  
  console.log(`✅ Source directory found: ${sourceDir}`);
  return true;
}

/**
 * Validate file structure and content
 * @param {string} filePath - Path to file to validate
 */
function validateFile(filePath) {
  const filename = path.basename(filePath);
  const relativePath = path.relative(process.cwd(), filePath);
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Basic file validation
    if (content.length < 10) {
      console.log(`❌ ${relativePath}: File too short (${content.length} characters)`);
      hasErrors = true;
      return false;
    }
    
    // Validate markdown files
    if (filename.endsWith('.md')) {
      return validateMarkdownFile(filePath, content);
    }
    
    console.log(`✅ ${relativePath}: Valid file`);
    return true;
    
  } catch (error) {
    console.log(`❌ ${relativePath}: Error reading file - ${error.message}`);
    hasErrors = true;
    return false;
  }
}

/**
 * Validate markdown file content
 * @param {string} filePath - Path to markdown file
 * @param {string} content - File content
 */
function validateMarkdownFile(filePath, content) {
  const filename = path.basename(filePath);
  const relativePath = path.relative(process.cwd(), filePath);
  
  // Special validation for sub-agents in agents directory
  if (filePath.includes('/agents/')) {
    return validateSubAgent(filePath, content);
  }
  
  // Check for basic markdown structure
  const hasHeading = /^#\s+/.test(content);
  if (!hasHeading) {
    console.log(`⚠️  ${relativePath}: Missing main heading`);
  }
  
  // Check for excessive whitespace
  if (content.includes('\n\n\n\n')) {
    console.log(`⚠️  ${relativePath}: Excessive consecutive newlines`);
  }
  
  // Check file ends with newline
  if (!content.endsWith('\n')) {
    console.log(`⚠️  ${relativePath}: File should end with newline`);
  }
  
  console.log(`✅ ${relativePath}: Valid markdown file`);
  return true;
}

/**
 * Validate sub-agent file format
 * @param {string} filePath - Path to sub-agent file
 * @param {string} content - File content
 */
function validateSubAgent(filePath, content) {
  const filename = path.basename(filePath);
  const relativePath = path.relative(process.cwd(), filePath);
  
  console.log(`🤖 Validating sub-agent: ${filename}`);
  
  // Check YAML frontmatter structure
  const lines = content.split('\n');
  const yamlStart = lines.findIndex(line => line.trim() === '---');
  const yamlEnd = lines.findIndex((line, index) => index > yamlStart && line.trim() === '---');
  
  if (yamlStart !== 0 || yamlEnd === -1) {
    console.log(`   ❌ Invalid YAML frontmatter structure`);
    hasErrors = true;
    return false;
  }
  
  const yamlContent = lines.slice(yamlStart + 1, yamlEnd).join('\n');
  
  // Extract and validate required fields
  const nameMatch = yamlContent.match(/^name:\s*(.+)$/m);
  const descMatch = yamlContent.match(/^description:\s*(.+)$/m);
  const toolsMatch = yamlContent.match(/^tools:\s*(.+)$/m);
  
  const validations = {
    'name field': nameMatch && nameMatch[1].trim(),
    'description field': descMatch && descMatch[1].trim(),
    'tools field': toolsMatch && toolsMatch[1].trim()
  };
  
  let allValid = true;
  Object.entries(validations).forEach(([field, value]) => {
    if (value) {
      console.log(`   ✅ ${field}: "${value.substring(0, 50)}${value.length > 50 ? '...' : ''}"`);
    } else {
      console.log(`   ❌ Missing or empty ${field}`);
      hasErrors = true;
      allValid = false;
    }
  });
  
  if (allValid) {
    // Validate content structure
    const contentAfterYaml = lines.slice(yamlEnd + 1).join('\n');
    
    const hasTitle = /^# .+/m.test(contentAfterYaml);
    const hasResponsibilities = /## Core Responsibilities|## Responsibilities/i.test(contentAfterYaml);
    const hasProtocol = /## Protocol|## Process|## Approach/i.test(contentAfterYaml);
    const hasDeliverables = /## Deliverables|## Output|## Results/i.test(contentAfterYaml);
    
    const structureChecks = {
      'Main heading': hasTitle,
      'Core responsibilities section': hasResponsibilities, 
      'Protocol/process section': hasProtocol,
      'Deliverables section': hasDeliverables
    };
    
    Object.entries(structureChecks).forEach(([check, passed]) => {
      if (passed) {
        console.log(`   ✅ ${check}`);
      } else {
        console.log(`   ⚠️  Missing ${check}`);
      }
    });
    
    // Word count analysis
    const wordCount = contentAfterYaml.split(/\s+/).length;
    console.log(`   📊 Content: ${wordCount} words`);
    
    if (wordCount < 200) {
      console.log(`   ⚠️  Consider adding more detail (current: ${wordCount} words)`);
    }
  }
  
  return allValid;
}

/**
 * Recursively validate all files in directory
 * @param {string} dir - Directory to validate
 */
function validateDirectory(dir) {
  if (!fs.existsSync(dir)) {
    console.log(`⚠️  Directory does not exist: ${dir}`);
    return;
  }
  
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      console.log(`📁 Validating directory: ${entry.name}/`);
      validateDirectory(fullPath);
    } else if (!entry.name.startsWith('.')) {
      validateFile(fullPath);
    }
  }
}

/**
 * Main validation process
 */
function validateSource() {
  console.log('🏗️  Starting source validation process\n');
  
  // Step 1: Validate source directory exists
  if (!validateSourceDirectory()) {
    process.exit(1);
  }
  
  console.log();
  
  // Step 2: Validate directory structure
  const requiredDirs = ['agents', 'commands', 'context'];
  console.log('📁 Validating directory structure...');
  
  requiredDirs.forEach(dir => {
    const dirPath = path.join(sourceDir, dir);
    if (fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory()) {
      console.log(`   ✅ ${dir}/`);
    } else {
      console.log(`   ❌ Missing directory: ${dir}/`);
      hasErrors = true;
    }
  });
  
  console.log();
  
  // Step 3: Validate all files
  console.log('📄 Validating source files...');
  validateDirectory(sourceDir);
  
  console.log();
  
  // Step 4: Validate required sub-agents exist
  console.log('🤖 Checking required sub-agents...');
  const requiredSubagents = [
    'task-analyzer.md',
    'task-planner.md', 
    'implementation-guide.md',
    'meeting-facilitator.md'
  ];
  
  requiredSubagents.forEach(agent => {
    const agentPath = path.join(sourceDir, 'agents', agent);
    if (fs.existsSync(agentPath)) {
      console.log(`   ✅ ${agent}`);
    } else {
      console.log(`   ❌ Missing required sub-agent: ${agent}`);
      hasErrors = true;
    }
  });
  
  console.log();
  
  // Step 5: Statistics
  const stats = gatherStatistics(sourceDir);
  console.log('📊 Source statistics:');
  console.log(`   📄 Total files: ${stats.totalFiles}`);
  console.log(`   🤖 Sub-agents: ${stats.agents}`);
  console.log(`   🔧 Commands: ${stats.commands}`);
  console.log(`   📚 Context files: ${stats.context}`);
  console.log(`   💡 Knowledge files: ${stats.knowledge}`);
  
  console.log();
  
  if (hasErrors) {
    console.log('❌ Source validation failed. Please fix the issues above.');
    process.exit(1);
  } else {
    console.log('✅ Source validation passed! All source files are properly formatted.');
    console.log('🚀 Ready for build with "npm run build"');
    process.exit(0);
  }
}

/**
 * Gather statistics about source directory
 * @param {string} dir - Directory to analyze
 */
function gatherStatistics(dir) {
  const stats = {
    totalFiles: 0,
    agents: 0,
    commands: 0,
    context: 0,
    knowledge: 0
  };
  
  function countFiles(currentDir, category = 'total') {
    if (!fs.existsSync(currentDir)) return;
    
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      
      if (entry.isDirectory()) {
        // Determine category based on directory name
        let subCategory = category;
        if (entry.name === 'agents') subCategory = 'agents';
        else if (entry.name === 'commands') subCategory = 'commands';
        else if (entry.name === 'context') subCategory = 'context';
        else if (entry.name === 'knowledge') subCategory = 'knowledge';
        
        countFiles(fullPath, subCategory);
      } else if (!entry.name.startsWith('.')) {
        stats.totalFiles++;
        if (category !== 'total') {
          stats[category]++;
        }
      }
    }
  }
  
  countFiles(dir);
  return stats;
}

// Run validation if called directly
if (require.main === module) {
  validateSource();
}

module.exports = { validateSource, validateFile, validateSubAgent };