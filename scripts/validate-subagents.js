#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🤖 Validating Claude Code sub-agents...\n');

const subagentsDir = '.claude/agents';
let hasErrors = false;

if (!fs.existsSync(subagentsDir)) {
  console.log('❌ Sub-agents directory not found');
  process.exit(1);
}

const subagentFiles = fs.readdirSync(subagentsDir)
  .filter(file => file.endsWith('.md'))
  .map(file => path.join(subagentsDir, file));

console.log(`📋 Found ${subagentFiles.length} sub-agent(s) to validate\n`);

subagentFiles.forEach(file => {
  const filename = path.basename(file);
  console.log(`🔍 Validating ${filename}...`);
  
  try {
    const content = fs.readFileSync(file, 'utf8');
    const lines = content.split('\n');
    
    // Check YAML frontmatter structure
    const yamlStart = lines.findIndex(line => line.trim() === '---');
    const yamlEnd = lines.findIndex((line, index) => index > yamlStart && line.trim() === '---');
    
    if (yamlStart !== 0 || yamlEnd === -1) {
      console.log(`  ❌ Invalid YAML frontmatter structure`);
      hasErrors = true;
      return;
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
        console.log(`  ✅ ${field}: "${value}"`);
      } else {
        console.log(`  ❌ Missing or empty ${field}`);
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
          console.log(`  ✅ ${check}`);
        } else {
          console.log(`  ⚠️  Missing ${check}`);
        }
      });
      
      // Check for context-aware features
      const hasProjectContext = /project.{0,10}context|context.{0,10}inject|dynamic.{0,10}context/i.test(contentAfterYaml);
      const hasAdaptiveBehavior = /adaptive|adapt|technology.{0,10}specific|framework.{0,10}aware/i.test(contentAfterYaml);
      const hasQualityIntegration = /quality|testing|validation|standards/i.test(contentAfterYaml);
      
      const enhancementChecks = {
        'Project context integration': hasProjectContext,
        'Adaptive behavior patterns': hasAdaptiveBehavior,
        'Quality integration': hasQualityIntegration
      };
      
      console.log(`  📈 Enhancement features:`);
      Object.entries(enhancementChecks).forEach(([feature, present]) => {
        if (present) {
          console.log(`    ✅ ${feature}`);
        } else {
          console.log(`    ⚠️  Consider adding: ${feature}`);
        }
      });
      
      // Word count and complexity analysis
      const wordCount = contentAfterYaml.split(/\s+/).length;
      const sectionCount = (contentAfterYaml.match(/^##\s/gm) || []).length;
      
      console.log(`  📊 Content metrics:`);
      console.log(`    📝 Word count: ${wordCount}`);
      console.log(`    📑 Sections: ${sectionCount}`);
      
      if (wordCount < 500) {
        console.log(`    ⚠️  Consider adding more detail (current: ${wordCount} words)`);
      } else {
        console.log(`    ✅ Good detail level`);
      }
    }
    
  } catch (error) {
    console.log(`  ❌ Error reading file: ${error.message}`);
    hasErrors = true;
  }
  
  console.log(); // Empty line between files
});

// Validate sub-agent naming conventions
console.log('📝 Checking naming conventions...');
const expectedSubagents = [
  'task-analyzer.md',
  'task-planner.md', 
  'implementation-guide.md',
  'meeting-facilitator.md'
];

expectedSubagents.forEach(expected => {
  const exists = subagentFiles.some(file => path.basename(file) === expected);
  if (exists) {
    console.log(`  ✅ ${expected}`);
  } else {
    console.log(`  ⚠️  Recommended sub-agent missing: ${expected}`);
  }
});

console.log();

if (hasErrors) {
  console.log('❌ Sub-agent validation failed. Please fix the issues above.');
  process.exit(1);
} else {
  console.log('✅ Sub-agent validation passed! All sub-agents are properly formatted.');
  process.exit(0);
}