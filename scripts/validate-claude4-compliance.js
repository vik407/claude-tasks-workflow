#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🧠 Validating Sonnet 4.5 prompt engineering compliance...\n');

const sourceDir = 'src/claude';
const buildDir = 'build/.claude';
let hasErrors = false;
let warningCount = 0;

// Sonnet 4.5 optimization patterns (updated for markdown, no XML)
const claude4Rules = {
  explicitInstructions: {
    pattern: /follow\s+these\s+exact\s+(.*steps?|sequence)/i,
    weight: 0.25,
    description: "Explicit step-by-step instructions",
    importance: "critical"
  },
  markdownStructure: {
    pattern: /###\s+[A-Z]/,
    weight: 0.30,
    description: "Markdown output structure specification",
    importance: "critical"
  },
  evidenceBasedWork: {
    pattern: /(evidence|concrete|specific).*?(file|path|reference)/i,
    weight: 0.20,
    description: "Evidence-based work emphasis",
    importance: "high"
  },
  positiveFraming: {
    antiPattern: /\b(don't|avoid|never|stop|prevent)\b(?!\s+(errors?|issues?|problems?))/i,
    weight: 0.10,
    description: "Positive instruction framing",
    importance: "medium"
  },
  purposeContext: {
    pattern: /##\s+Purpose\s+and\s+Context/i,
    weight: 0.10,
    description: "Explicit purpose and context section",
    importance: "high"
  },
  qualityRequirement: {
    pattern: /quality\s+requirement.*:/i,
    weight: 0.05,
    description: "Quality requirement specification",
    importance: "medium"
  }
};

/**
 * Validate a single file for Sonnet 4.5 compliance
 * @param {string} filePath - Path to file
 * @param {boolean} isSubAgent - Whether this is a sub-agent file
 */
function validateClaude4Compliance(filePath, isSubAgent = false) {
  const content = fs.readFileSync(filePath, 'utf8');
  const filename = path.basename(filePath);
  const results = {};
  let totalScore = 0;
  let criticalIssues = [];

  console.log(`🔍 Validating ${filename} for Sonnet 4.5 compliance...`);

  // Apply validation rules
  Object.entries(claude4Rules).forEach(([ruleName, config]) => {
    let passed = false;
    
    if (config.pattern) {
      passed = config.pattern.test(content);
    } else if (config.antiPattern) {
      // For anti-patterns, we want the opposite
      passed = !config.antiPattern.test(content);
    }

    // Check if this rule is required for specific files
    if (config.requiredFor && !config.requiredFor.includes(filename)) {
      // Skip scoring for non-required files, but still report
      results[ruleName] = {
        passed,
        score: passed ? config.weight : 0,
        description: config.description,
        importance: config.importance,
        required: false
      };
    } else {
      results[ruleName] = {
        passed,
        score: passed ? config.weight : 0,
        description: config.description,
        importance: config.importance,
        required: true
      };
      
      totalScore += results[ruleName].score;
    }

    // Track critical issues
    if (config.importance === 'critical' && !passed && (!config.requiredFor || config.requiredFor.includes(filename))) {
      criticalIssues.push(ruleName);
    }
  });

  // Report results
  console.log(`  📊 Sonnet 4.5 Compliance Score: ${Math.round(totalScore * 100)}%`);

  Object.entries(results).forEach(([ruleName, result]) => {
    const status = result.passed ? '✅' : (result.importance === 'critical' ? '❌' : '⚠️');
    const requiredText = result.required ? '' : ' (optional)';
    console.log(`    ${status} ${result.description}${requiredText}`);

    if (!result.passed && result.importance !== 'critical') {
      warningCount++;
    }
  });

  // Check for sub-agent specific requirements
  if (isSubAgent) {
    validateSubAgentSpecific(content, filename);
  }

  const compliance = {
    file: filePath,
    totalScore: Math.round(totalScore * 100),
    results,
    compliant: totalScore >= 0.8 && criticalIssues.length === 0, // 80% compliance threshold with no critical issues
    criticalIssues,
    warningCount: Object.values(results).filter(r => !r.passed && r.importance !== 'critical').length
  };

  if (!compliance.compliant) {
    // Don't set hasErrors - use overall threshold check instead during migration
    console.log(`  ❌ File does not meet Sonnet 4.5 compliance standards (${compliance.totalScore}%)`);
    if (criticalIssues.length > 0) {
      console.log(`  🚨 Critical issues: ${criticalIssues.join(', ')}`);
    }
  } else {
    console.log(`  ✅ Sonnet 4.5 compliance achieved (${compliance.totalScore}%)`);
  }

  console.log(); // Empty line between files
  return compliance;
}

/**
 * Validate sub-agent specific Sonnet 4.5 requirements
 * @param {string} content - File content
 * @param {string} filename - File name
 */
function validateSubAgentSpecific(content, filename) {
  const subAgentChecks = {
    enhancedDescription: {
      pattern: /claude\s+4\s+optimized/i,
      description: "Claude 4 optimized description in frontmatter"
    },
    markdownOutputStructure: {
      pattern: /###\s+(Implementation|Analysis|Planning|Communication)/i,
      description: "Markdown output structure sections"
    },
    qualityStandards: {
      pattern: /##\s+Quality\s+Standards/i,
      description: "Quality standards section"
    }
  };

  console.log(`  📋 Sub-agent specific checks:`);
  Object.entries(subAgentChecks).forEach(([checkName, config]) => {
    const passed = config.pattern.test(content);
    const status = passed ? '✅' : '⚠️';
    console.log(`    ${status} ${config.description}`);
    if (!passed) {
      warningCount++;
    }
  });
}

/**
 * Validate directory structure for Sonnet 4.5 compliance
 * @param {string} directory - Directory to validate
 */
function validateDirectory(directory) {
  if (!fs.existsSync(directory)) {
    console.log(`❌ Directory not found: ${directory}`);
    hasErrors = true;
    return [];
  }

  const results = [];

  // Validate sub-agents
  const agentsDir = path.join(directory, 'agents');
  if (fs.existsSync(agentsDir)) {
    const agentFiles = fs.readdirSync(agentsDir)
      .filter(file => file.endsWith('.md'))
      .map(file => path.join(agentsDir, file));

    console.log(`🤖 Validating ${agentFiles.length} sub-agent(s)...\n`);

    agentFiles.forEach(file => {
      const result = validateClaude4Compliance(file, true);
      results.push(result);
    });
  }

  // Validate commands
  const commandsDir = path.join(directory, 'commands');
  if (fs.existsSync(commandsDir)) {
    const commandFiles = [];

    // Recursively find all command files
    function findCommandFiles(dir) {
      const entries = fs.readdirSync(dir, { withFileTypes: true });

      entries.forEach(entry => {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          findCommandFiles(fullPath);
        } else if (entry.name.endsWith('.md')) {
          commandFiles.push(fullPath);
        }
      });
    }

    findCommandFiles(commandsDir);

    console.log(`⚡ Validating ${commandFiles.length} command(s)...\n`);

    commandFiles.forEach(file => {
      const result = validateClaude4Compliance(file, false);
      results.push(result);
    });
  }

  return results;
}

/**
 * Generate compliance report
 * @param {Array} results - Validation results
 */
function generateComplianceReport(results) {
  console.log('📈 Sonnet 4.5 Compliance Report\n');
  console.log('================================\n');

  const totalFiles = results.length;
  const compliantFiles = results.filter(r => r.compliant).length;
  const criticalIssueFiles = results.filter(r => r.criticalIssues.length > 0).length;
  const averageScore = results.reduce((sum, r) => sum + r.totalScore, 0) / totalFiles;

  console.log(`📊 Overall Statistics:`);
  console.log(`  📁 Total files validated: ${totalFiles}`);
  console.log(`  ✅ Compliant files: ${compliantFiles} (${Math.round((compliantFiles / totalFiles) * 100)}%)`);
  console.log(`  🚨 Files with critical issues: ${criticalIssueFiles}`);
  console.log(`  ⚠️  Total warnings: ${warningCount}`);
  console.log(`  📈 Average compliance score: ${Math.round(averageScore)}%\n`);

  if (criticalIssueFiles > 0) {
    console.log(`🚨 Files with critical issues:`);
    results.filter(r => r.criticalIssues.length > 0).forEach(r => {
      console.log(`  ❌ ${path.basename(r.file)}: ${r.criticalIssues.join(', ')}`);
    });
    console.log();
  }

  const lowScoreFiles = results.filter(r => r.totalScore < 80);
  if (lowScoreFiles.length > 0) {
    console.log(`⚠️  Files below 80% compliance threshold:`);
    lowScoreFiles.forEach(r => {
      console.log(`  📉 ${path.basename(r.file)}: ${r.totalScore}%`);
    });
    console.log();
  }

  // Success criteria - adjusted for Sonnet 4.5 migration period
  const passThreshold = 0.75; // 75% of files must be compliant (relaxed during migration)
  const success = (compliantFiles / totalFiles) >= passThreshold;

  console.log(`🎯 Success Criteria:`);
  console.log(`  📋 Target: ${Math.round(passThreshold * 100)}% file compliance rate`);
  console.log(`  📊 Achieved: ${Math.round((compliantFiles / totalFiles) * 100)}%`);
  console.log(`  ℹ️  Critical issues count: ${criticalIssueFiles} files (not blocking during migration)\n`);

  return success;
}

/**
 * Main validation function
 */
function main() {
  console.log('🚀 Starting Sonnet 4.5 compliance validation...\n');

  // Validate source directory
  console.log('📂 Validating source files...\n');
  const sourceResults = validateDirectory(sourceDir);

  // Validate build directory if it exists
  let buildResults = [];
  if (fs.existsSync(buildDir)) {
    console.log('🏗️  Validating build files...\n');
    buildResults = validateDirectory(buildDir);
  } else {
    console.log('ℹ️  Build directory not found, skipping build validation\n');
  }

  // Combine results
  const allResults = [...sourceResults, ...buildResults];

  if (allResults.length === 0) {
    console.log('❌ No files found to validate');
    process.exit(1);
  }

  // Generate report
  const success = generateComplianceReport(allResults);

  if (!success) {
    console.log('❌ Sonnet 4.5 compliance validation failed. Please address the issues above.');
    process.exit(1);
  } else {
    console.log('✅ Sonnet 4.5 compliance validation passed! Overall threshold met for migration.');
    process.exit(0);
  }
}

// Run validation if called directly
if (require.main === module) {
  main();
}

module.exports = { validateClaude4Compliance, claude4Rules };