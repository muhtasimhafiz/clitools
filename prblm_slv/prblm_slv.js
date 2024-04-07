#!/usr/bin/env node
console.log('Problem Solver Script Running...');

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function setupProject() {
    // Step 1: Initialize npm and set test script to Mocha
    console.log('Initializing npm and setting up Mocha...');
    execSync('npm init -y', { stdio: 'inherit' });
    // Step 2: Install Mocha
    console.log('Installing Mocha...');
    execSync('bun install mocha', { stdio: 'inherit' });
    // execSync('npm set-script test "mocha"', { stdio: 'inherit' });
    // Step 3: set test to mocha
    execSync('npm pkg set scripts.test="mocha"', { stdio: 'inherit' });




    // Step 3: Create test directory and test.js
    console.log('Creating test directory and test.js...');
    const testBoilerPlate = path.join(__dirname, './boilerplates/test.js');
    const testBoilerPlateContents = fs.readFileSync(testBoilerPlate, 'utf8');

    const methodBoilerPlate = path.join(__dirname, './boilerplates/method.js');
    const methodBoilerPlateContent = fs.readFileSync(methodBoilerPlate, 'utf-8');

    const testDirPath = path.join(process.cwd(), 'test');
    const testFilePath = path.join(testDirPath, 'test.js');
    if (!fs.existsSync(testDirPath)) {
        fs.mkdirSync(testDirPath);
    }
    console.log('Adding boilerplate code to test.js...');
    fs.writeFileSync(testFilePath, testBoilerPlateContents);
    console.log('Adding boilerplate code to index.js...');
    const indexPath = path.join(process.cwd(), 'index.js');
    fs.writeFileSync(indexPath, methodBoilerPlateContent);

    console.log('Project setup is complete!');
}

// Run the setup
setupProject();
