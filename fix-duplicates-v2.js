// Script to fix all duplicate isNew keys in BuyersGuide.tsx
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, 'src/pages/BuyersGuide.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Find all car objects in the file
const carObjects = content.match(/\{[\s\S]*?id: ['"]new-\d+['"][\s\S]*?\}/g) || [];

// Process each car object to remove duplicate isNew keys
for (const carObject of carObjects) {
  // Count occurrences of isNew: true in this car object
  const isNewCount = (carObject.match(/isNew: true/g) || []).length;
  
  if (isNewCount > 1) {
    // Create a version with only one isNew: true
    const fixedCarObject = carObject.replace(/isNew: true,?\s+/g, (match, index, fullStr) => {
      // Keep only the first occurrence
      if (fullStr.indexOf('isNew: true') === index) {
        return match;
      }
      return '';
    });
    
    // Replace the original car object with the fixed one
    content = content.replace(carObject, fixedCarObject);
  }
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed all duplicate isNew keys in BuyersGuide.tsx');
