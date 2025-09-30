#!/usr/bin/env node

/**
 * XML Structure Validator
 * Lightweight XML structure validator for agent outputs
 * Usage: node .claude/scripts/validate-xml-output.js <file-path>
 * Validates: <analysis>, <plan>, <implementation> sections
 * Returns: JSON with validation results { valid: boolean, missingTags: [], malformedSections: [] }
 */

const fs = require('fs');
const path = require('path');

/**
 * Expected XML structures by file type
 */
const EXPECTED_STRUCTURES = {
  'analysis.md': {
    tags: [
      { name: 'complexity_classification', required: true },
      { name: 'analysis', required: false }
    ],
    alternativeHeaders: ['## Problem Analysis', '## Root Cause Analysis']
  },
  'plan.md': {
    tags: [
      { name: 'implementation_plan', required: false }
    ],
    alternativeHeaders: ['## Solution Architecture', '## Implementation Roadmap']
  },
  'auto-implementation.md': {
    tags: [
      { name: 'auto_implementation', required: false }
    ],
    alternativeHeaders: ['## Implementation Summary', '## Changes Made']
  },
  'guided-implementation.md': {
    tags: [
      { name: 'guided_implementation', required: false }
    ],
    alternativeHeaders: ['## Implementation Strategy', '## Implementation Phases']
  },
  'validation.md': {
    tags: [],
    alternativeHeaders: ['## Test Execution', '## Quality Assurance']
  }
};

/**
 * Validate XML structure in file
 */
function validateXmlStructure(filePath) {
  const result = {
    valid: true,
    filePath,
    fileName: path.basename(filePath),
    missingTags: [],
    malformedSections: [],
    warnings: [],
    timestamp: new Date().toISOString()
  };

  // Check file exists
  if (!fs.existsSync(filePath)) {
    result.valid = false;
    result.missingTags.push({
      severity: 'critical',
      message: `File does not exist: ${filePath}`
    });
    return result;
  }

  // Read file content
  const content = fs.readFileSync(filePath, 'utf8');

  // Determine expected structure based on filename
  const fileName = path.basename(filePath);
  const expectedStructure = EXPECTED_STRUCTURES[fileName];

  if (!expectedStructure) {
    result.warnings.push({
      severity: 'low',
      message: `No XML validation rules defined for file type: ${fileName}`,
      suggestion: 'File will be validated for general markdown structure only'
    });
  }

  // Check file is not empty
  if (content.trim().length === 0) {
    result.valid = false;
    result.missingTags.push({
      severity: 'critical',
      message: 'File is empty',
      recovery: 'Regenerate file with appropriate workflow command'
    });
    return result;
  }

  // Validate expected XML tags if defined
  if (expectedStructure && expectedStructure.tags) {
    for (const tag of expectedStructure.tags) {
      const openTagRegex = new RegExp(`<${tag.name}[\\s>]`, 'i');
      const closeTagRegex = new RegExp(`</${tag.name}>`, 'i');

      const hasOpenTag = openTagRegex.test(content);
      const hasCloseTag = closeTagRegex.test(content);

      if (!hasOpenTag && tag.required) {
        result.missingTags.push({
          severity: 'high',
          tag: tag.name,
          message: `Required XML tag missing: <${tag.name}>`,
          recovery: 'Ensure agent output includes proper XML wrapper structure'
        });
        result.valid = false;
      } else if (!hasOpenTag && !tag.required) {
        // Optional tag missing - check for alternative markdown headers
        const hasAlternative = expectedStructure.alternativeHeaders &&
          expectedStructure.alternativeHeaders.some(header => content.includes(header));

        if (!hasAlternative) {
          result.warnings.push({
            severity: 'medium',
            tag: tag.name,
            message: `Recommended XML tag missing: <${tag.name}>`,
            suggestion: 'Consider using XML wrapper for structured output, or use markdown headers'
          });
        }
      } else if (hasOpenTag && !hasCloseTag) {
        result.malformedSections.push({
          severity: 'high',
          tag: tag.name,
          message: `Malformed XML: <${tag.name}> opened but not closed`,
          recovery: 'Add closing tag or fix XML structure'
        });
        result.valid = false;
      } else if (!hasOpenTag && hasCloseTag) {
        result.malformedSections.push({
          severity: 'high',
          tag: tag.name,
          message: `Malformed XML: </${tag.name}> found without opening tag`,
          recovery: 'Add opening tag or fix XML structure'
        });
        result.valid = false;
      }
    }
  }

  // Check for alternative markdown structure
  if (expectedStructure && expectedStructure.alternativeHeaders) {
    const hasMarkdownStructure = expectedStructure.alternativeHeaders.some(header =>
      content.includes(header)
    );

    if (!hasMarkdownStructure && result.missingTags.length === 0) {
      result.warnings.push({
        severity: 'low',
        message: 'Neither XML tags nor standard markdown headers found',
        suggestion: `Consider using one of: ${expectedStructure.alternativeHeaders.join(', ')}`,
        expectedHeaders: expectedStructure.alternativeHeaders
      });
    }
  }

  // Check for common XML issues
  const commonIssues = [
    {
      pattern: /<(\w+)>.*?<\/(?!\1>)/,
      message: 'Possible mismatched XML tags detected',
      severity: 'medium'
    },
    {
      pattern: /<(\w+)[^>]*>[^<]*<\1/,
      message: 'Possible nested tags without closing detected',
      severity: 'low'
    }
  ];

  for (const issue of commonIssues) {
    if (issue.pattern.test(content)) {
      result.warnings.push({
        severity: issue.severity,
        message: issue.message,
        suggestion: 'Review XML structure for proper tag matching'
      });
    }
  }

  // Validate minimum content quality
  const lineCount = content.split('\n').length;
  const wordCount = content.split(/\s+/).length;

  if (lineCount < 5) {
    result.warnings.push({
      severity: 'medium',
      message: `File has very few lines (${lineCount})`,
      suggestion: 'Ensure file contains meaningful content'
    });
  }

  if (wordCount < 50) {
    result.warnings.push({
      severity: 'medium',
      message: `File has very few words (${wordCount})`,
      suggestion: 'Ensure file contains sufficient detail'
    });
  }

  // Check for placeholder content
  const placeholderPatterns = [
    /\[TODO\]/gi,
    /\[PLACEHOLDER\]/gi,
    /\[INSERT.*?HERE\]/gi,
    /Lorem ipsum/gi
  ];

  for (const pattern of placeholderPatterns) {
    if (pattern.test(content)) {
      result.warnings.push({
        severity: 'high',
        message: 'File contains placeholder text',
        suggestion: 'Replace all placeholder content with actual implementation details'
      });
    }
  }

  return result;
}

/**
 * Main execution
 */
function main() {
  const filePath = process.argv[2];

  if (!filePath) {
    console.error('❌ Error: File path required');
    console.error('Usage: node .claude/scripts/validate-xml-output.js <file-path>');
    console.error('');
    console.error('Examples:');
    console.error('  node .claude/scripts/validate-xml-output.js .claude/tasks/CWF-004/analysis.md');
    console.error('  node .claude/scripts/validate-xml-output.js .claude/tasks/CWF-004/plan.md');
    console.error('');
    console.error('Supported files:');
    console.error('  - analysis.md');
    console.error('  - plan.md');
    console.error('  - auto-implementation.md');
    console.error('  - guided-implementation.md');
    console.error('  - validation.md');
    process.exit(1);
  }

  console.log(`🔍 Validating XML structure: ${filePath}\n`);

  const result = validateXmlStructure(filePath);

  // Output results
  if (result.valid) {
    console.log('✅ XML structure validation passed');

    if (result.warnings.length > 0) {
      console.log(`\n⚠️  ${result.warnings.length} warning(s):`);
      result.warnings.forEach(warning => {
        console.log(`   - [${warning.severity}] ${warning.message}`);
        if (warning.suggestion) {
          console.log(`     Suggestion: ${warning.suggestion}`);
        }
      });
    }

    console.log('\n' + JSON.stringify(result, null, 2));
    process.exit(0);
  } else {
    console.error('❌ XML structure validation failed\n');

    if (result.missingTags.length > 0) {
      console.error(`Missing tags (${result.missingTags.length}):`);
      result.missingTags.forEach(issue => {
        console.error(`   - [${issue.severity}] ${issue.message}`);
        if (issue.recovery) {
          console.error(`     Recovery: ${issue.recovery}`);
        }
      });
      console.error('');
    }

    if (result.malformedSections.length > 0) {
      console.error(`Malformed sections (${result.malformedSections.length}):`);
      result.malformedSections.forEach(issue => {
        console.error(`   - [${issue.severity}] ${issue.message}`);
        if (issue.recovery) {
          console.error(`     Recovery: ${issue.recovery}`);
        }
      });
      console.error('');
    }

    if (result.warnings.length > 0) {
      console.error(`Warnings (${result.warnings.length}):`);
      result.warnings.forEach(warning => {
        console.error(`   - [${warning.severity}] ${warning.message}`);
        if (warning.suggestion) {
          console.error(`     Suggestion: ${warning.suggestion}`);
        }
      });
    }

    console.error('\n' + JSON.stringify(result, null, 2));
    process.exit(1);
  }
}

// Run if executed directly
if (require.main === module) {
  main();
}

module.exports = { validateXmlStructure, EXPECTED_STRUCTURES };