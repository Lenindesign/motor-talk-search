// Script to fix used car data in BuyersGuide.tsx
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, 'src/pages/BuyersGuide.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Find all used car objects in the file
const usedCarObjects = content.match(/\{[\s\S]*?id: ['"]used-\d+['"][\s\S]*?\}/g) || [];

// Process each used car object to set isNew: false
for (const usedCarObject of usedCarObjects) {
  let updatedCarObject = usedCarObject;
  
  // Check if the car object has isNew: true
  if (updatedCarObject.includes('isNew: true')) {
    // Replace isNew: true with isNew: false
    updatedCarObject = updatedCarObject.replace(
      /isNew: true/g,
      'isNew: false'
    );
  }
  
  // Replace the original car object with the updated one
  content = content.replace(usedCarObject, updatedCarObject);
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed used car data in BuyersGuide.tsx');
