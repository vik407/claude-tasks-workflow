#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('\u{1F50D} Running consolidated validation...\n');

const sourceDir = 'src/claude';
const buildDir = 'build/.claude';
let hasErrors = false;

function validateSource() {
    console.log('\u{1F50D} Validating source files in src/claude...');

    if (!fs.existsSync(sourceDir)) {
        console.log(`\u274C Source directory not found: ${sourceDir}`);
        hasErrors = true;
        return;
    }

    const files = fs.readdirSync(sourceDir);
    files.forEach(file => {
        const filePath = path.join(sourceDir, file);
        if (fs.statSync(filePath).isDirectory()) {
            console.log(`\u23ED Skipping directory: ${file}`);
            return;
        }

        const content = fs.readFileSync(filePath, 'utf8');

        if (content.length < 10) {
            console.log(`\u274C ${file}: File too short`);
            hasErrors = true;
        } else {
            console.log(`\u2705 ${file}: Valid file`);
        }
    });
    console.log();
}

function validateBuild() {
    console.log('\u{1F50D} Validating distribution files in build/.claude...');

    if (!fs.existsSync(buildDir)) {
        console.log(`\u274C Build directory not found: ${buildDir}`);
        hasErrors = true;
        return;
    }

    const files = fs.readdirSync(buildDir);
    files.forEach(file => {
        const filePath = path.join(buildDir, file);
        if (fs.statSync(filePath).isDirectory()) {
            console.log(`\u23ED Skipping directory: ${file}`);
            return;
        }

        const content = fs.readFileSync(filePath, 'utf8');

        if (content.length < 10) {
            console.log(`\u274C ${file}: File too short`);
            hasErrors = true;
        } else {
            console.log(`\u2705 ${file}: Valid file`);
        }
    });
    console.log();
}

validateSource();
validateBuild();

if (hasErrors) {
    console.log('\u274C Validation failed. Please fix the above issues.');
    process.exit(1);
} else {
    console.log('\u2705 All validations passed successfully!');
}
