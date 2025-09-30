#!/usr/bin/env node

/**
 * Plan Generation Validator
 * Validates plan.md existence, non-empty content, and basic structure
 * Usage: node .claude/scripts/validate-workflow-plan.js <TASK_ID>
 * Returns: JSON with validation results { valid: boolean, errors: [], warnings: [] }
 * Generates debug artifact on failure: .claude/tasks/{TASK_ID}/.debug/plan-failure.json
 */

const fs = require('fs');
const path = require('path');

/**
 * Main validation function
 */
function validatePlan(taskId) {
  const result = {
    valid: true,
    errors: [],
    warnings: [],
    taskId,
    timestamp: new Date().toISOString()
  };

  const planPath = path.join('.claude', 'tasks', taskId, 'plan.md');

  // Check 1: File exists
  if (!fs.existsSync(planPath)) {
    result.valid = false;
    result.errors.push({
      code: 'FILE_NOT_FOUND',
      message: `plan.md does not exist at expected path: ${planPath}`,
      severity: 'critical',
      recovery: 'Re-run /project:task:plan command to regenerate plan'
    });
    return result;
  }

  // Check 2: File is not empty
  const stats = fs.statSync(planPath);
  if (stats.size === 0) {
    result.valid = false;
    result.errors.push({
      code: 'EMPTY_FILE',
      message: `plan.md exists but is empty (0 bytes)`,
      severity: 'critical',
      recovery: 'Re-run /project:task:plan command to generate content'
    });
    return result;
  }

  // Check 3: File has minimum content size (at least 100 chars for basic structure)
  if (stats.size < 100) {
    result.valid = false;
    result.errors.push({
      code: 'FILE_TOO_SHORT',
      message: `plan.md is too short (${stats.size} bytes). Expected at least 100 bytes.`,
      severity: 'high',
      recovery: 'Verify plan generation completed successfully. May need to re-run /project:task:plan'
    });
  }

  // Check 4: Basic structure validation
  const content = fs.readFileSync(planPath, 'utf8');

  // Check for key sections
  const requiredSections = [
    { name: 'Solution Architecture', pattern: /##\s+Solution Architecture/i, required: true },
    { name: 'Implementation Roadmap', pattern: /##\s+Implementation Roadmap/i, required: true }
  ];

  const recommendedSections = [
    { name: 'Testing Strategy', pattern: /##\s+Testing Strategy/i },
    { name: 'Risk Mitigation', pattern: /##\s+Risk Mitigation/i },
    { name: 'Success Criteria', pattern: /##\s+Success Criteria/i }
  ];

  // Validate required sections
  for (const section of requiredSections) {
    if (!section.pattern.test(content)) {
      if (section.required) {
        result.errors.push({
          code: 'MISSING_REQUIRED_SECTION',
          message: `Required section "${section.name}" not found in plan.md`,
          severity: 'high',
          recovery: `Verify plan.md contains "## ${section.name}" section`
        });
        result.valid = false;
      }
    }
  }

  // Check for recommended sections (warnings only)
  for (const section of recommendedSections) {
    if (!section.pattern.test(content)) {
      result.warnings.push({
        code: 'MISSING_RECOMMENDED_SECTION',
        message: `Recommended section "${section.name}" not found in plan.md`,
        severity: 'low',
        suggestion: `Consider adding "## ${section.name}" section for completeness`
      });
    }
  }

  // Check 5: Verify it's not just markdown template/placeholder
  const placeholderPatterns = [
    /\[TODO\]/gi,
    /\[PLACEHOLDER\]/gi,
    /\[INSERT.*HERE\]/gi
  ];

  for (const pattern of placeholderPatterns) {
    if (pattern.test(content)) {
      result.warnings.push({
        code: 'PLACEHOLDER_CONTENT',
        message: 'plan.md contains placeholder text that should be replaced',
        severity: 'medium',
        suggestion: 'Review plan.md and replace all placeholder content with actual implementation details'
      });
    }
  }

  return result;
}

/**
 * Generate debug artifact on validation failure
 */
function generateDebugArtifact(taskId, validationResult) {
  const debugDir = path.join('.claude', 'tasks', taskId, '.debug');

  // Create debug directory if it doesn't exist
  if (!fs.existsSync(debugDir)) {
    fs.mkdirSync(debugDir, { recursive: true });
  }

  const debugData = {
    validationResult,
    environment: {
      nodeVersion: process.version,
      platform: process.platform,
      cwd: process.cwd(),
      timestamp: new Date().toISOString()
    },
    command: {
      script: 'validate-workflow-plan.js',
      args: process.argv.slice(2),
      invocation: `node .claude/scripts/validate-workflow-plan.js ${taskId}`
    }
  };

  // Try to capture partial plan.md content if it exists
  const planPath = path.join('.claude', 'tasks', taskId, 'plan.md');
  if (fs.existsSync(planPath)) {
    try {
      const content = fs.readFileSync(planPath, 'utf8');
      debugData.partialContent = {
        size: content.length,
        preview: content.substring(0, 500),
        lineCount: content.split('\n').length
      };
    } catch (err) {
      debugData.contentError = err.message;
    }
  }

  const debugPath = path.join(debugDir, 'plan-failure.json');
  fs.writeFileSync(debugPath, JSON.stringify(debugData, null, 2));

  return debugPath;
}

/**
 * Main execution
 */
function main() {
  const taskId = process.argv[2];

  if (!taskId) {
    console.error('❌ Error: Task ID required');
    console.error('Usage: node .claude/scripts/validate-workflow-plan.js <TASK_ID>');
    console.error('Example: node .claude/scripts/validate-workflow-plan.js CWF-004');
    process.exit(1);
  }

  console.log(`🔍 Validating plan.md for task: ${taskId}`);

  const result = validatePlan(taskId);

  // Output results
  if (result.valid) {
    console.log('✅ Plan validation passed');
    if (result.warnings.length > 0) {
      console.log(`⚠️  ${result.warnings.length} warning(s):`);
      result.warnings.forEach(warning => {
        console.log(`   - ${warning.message}`);
      });
    }
    console.log(JSON.stringify(result, null, 2));
    process.exit(0);
  } else {
    console.error('❌ Plan validation failed');
    console.error(`   ${result.errors.length} error(s) found:`);
    result.errors.forEach(error => {
      console.error(`   - [${error.code}] ${error.message}`);
      console.error(`     Recovery: ${error.recovery}`);
    });

    if (result.warnings.length > 0) {
      console.log(`⚠️  ${result.warnings.length} warning(s):`);
      result.warnings.forEach(warning => {
        console.log(`   - ${warning.message}`);
      });
    }

    // Generate debug artifact
    const debugPath = generateDebugArtifact(taskId, result);
    console.error(`\n📋 Debug artifact generated: ${debugPath}`);
    console.error('   Review this file for detailed validation information');

    console.error(JSON.stringify(result, null, 2));
    process.exit(1);
  }
}

// Run if executed directly
if (require.main === module) {
  main();
}

module.exports = { validatePlan, generateDebugArtifact };