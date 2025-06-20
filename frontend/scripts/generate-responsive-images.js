// This script generates responsive image versions for the website
// Run with: node scripts/generate-responsive-images.js

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

// Image directories to process
const imageDirs = [
  'public/manga-image',
  'public/comic-image',
  'public/poster-image',
  'public/action figure-image',
  'public/anime-keychain-image',
];

// Image sizes to generate
const sizes = {
  small: 400,
  medium: 800,
};

// Process all image directories
async function processAllDirectories() {
  console.log('Starting responsive image generation...');
  
  for (const dir of imageDirs) {
    await processDirectory(path.join(rootDir, dir));
  }
  
  console.log('All images processed successfully!');
}

// Process a single directory
async function processDirectory(directory) {
  console.log(`Processing directory: ${directory}`);
  
  try {
    const files = fs.readdirSync(directory);
    
    for (const file of files) {
      const filePath = path.join(directory, file);
      const stats = fs.statSync(filePath);
      
      // Skip directories and non-image files
      if (stats.isDirectory() || !isImageFile(file)) {
        continue;
      }
      
      await processImage(filePath);
    }
  } catch (error) {
    console.error(`Error processing directory ${directory}:`, error);
  }
}

// Process a single image
async function processImage(imagePath) {
  const pathInfo = path.parse(imagePath);
  const outputDir = pathInfo.dir;
  
  console.log(`Processing image: ${imagePath}`);
  
  try {
    // Generate responsive versions
    for (const [size, width] of Object.entries(sizes)) {
      const outputPath = path.join(
        outputDir,
        `${pathInfo.name}-${size}${pathInfo.ext}`
      );
      
      // Skip if file already exists
      if (fs.existsSync(outputPath)) {
        console.log(`Skipping ${outputPath} (already exists)`);
        continue;
      }
      
      await sharp(imagePath)
        .resize(width, null, { fit: 'inside', withoutEnlargement: true })
        .toFile(outputPath);
      
      console.log(`Generated: ${outputPath}`);
    }
  } catch (error) {
    console.error(`Error processing image ${imagePath}:`, error);
  }
}

// Check if a file is an image
function isImageFile(filename) {
  const ext = path.extname(filename).toLowerCase();
  return ['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(ext);
}

// Run the script
processAllDirectories().catch(console.error);

/*
To use this script:
1. Install sharp: npm install sharp
2. Run: node scripts/generate-responsive-images.js

This will create smaller versions of all images in the specified directories.
For example, for an image named "naruto.jpg", it will create:
- naruto-small.jpg (400px wide)
- naruto-medium.jpg (800px wide)

The original image will be kept as is for full-size display.
*/ 