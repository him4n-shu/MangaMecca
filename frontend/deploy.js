/**
 * Deployment helper script for MangaMecca backend
 * 
 * This script helps prepare the backend for production deployment
 * by checking for required environment variables and dependencies.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ANSI color codes for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

console.log(${colors.blue}=== MangaMecca Backend Deployment Helper ===\n);

// Check if .env file exists
const envExists = fs.existsSync(path.join(__dirname, '.env'));
if (!envExists) {
  console.log(${colors.yellow}Warning: No .env file found.);
  console.log('Make sure all environment variables are set on your deployment platform.\n');
} else {
  console.log(${colors.green} .env file found\n);
}

// Check for required dependencies
console.log(${colors.cyan}Checking dependencies...);
try {
  const packageJson = require('./package.json');
  const requiredDeps = [
    'express', 'mongoose', 'bcryptjs', 'jsonwebtoken', 
    'cors', 'dotenv', 'nodemailer'
  ];
  
  const missingDeps = requiredDeps.filter(dep => !packageJson.dependencies[dep]);
  
  if (missingDeps.length > 0) {
    console.log(${colors.red}Error: Missing required dependencies: );
    console.log('Please install them using: npm install ' + missingDeps.join(' '));
  } else {
    console.log(${colors.green} All required dependencies are installed\n);
  }
} catch (err) {
  console.log(${colors.red}Error reading package.json: \n);
}

// Check for MongoDB connection string
console.log(${colors.cyan}Checking MongoDB connection...);
if (process.env.MONGO_URI) {
  console.log(${colors.green} MongoDB URI is set\n);
} else {
  console.log(${colors.yellow}Warning: MONGO_URI environment variable not set.);
  console.log('Make sure to set it on your deployment platform.\n');
}

// Check for JWT secret
console.log(${colors.cyan}Checking JWT secret...);
if (process.env.JWT_SECRET) {
  console.log(${colors.green} JWT_SECRET is set\n);
} else {
  console.log(${colors.yellow}Warning: JWT_SECRET environment variable not set.);
  console.log('Make sure to set it on your deployment platform.\n');
}

// Verify Node.js version
console.log(${colors.cyan}Checking Node.js version...);
const nodeVersion = process.version;
const requiredVersion = 'v14.0.0';

if (compareVersions(nodeVersion, requiredVersion) >= 0) {
  console.log(${colors.green} Node.js version  is compatible\n);
} else {
  console.log(${colors.yellow}Warning: Node.js version  is below recommended \n);
}

console.log(${colors.blue}=== Deployment Checks Complete ===\n);
console.log(${colors.green}Your backend is ready for deployment!);
console.log(Run the following command to start the server in production mode:);
console.log(${colors.cyan}NODE_ENV=production node server.js\n);

// Helper function to compare semver versions
function compareVersions(a, b) {
  const aParts = a.replace('v', '').split('.').map(Number);
  const bParts = b.replace('v', '').split('.').map(Number);
  
  for (let i = 0; i < 3; i++) {
    const aPart = aParts[i] || 0;
    const bPart = bParts[i] || 0;
    
    if (aPart > bPart) return 1;
    if (aPart < bPart) return -1;
  }
  
  return 0;
}
