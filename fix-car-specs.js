// Script to add missing car specs to BuyersGuide.tsx
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, 'src/pages/BuyersGuide.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Find all car objects in the file
const carObjects = content.match(/\{[\s\S]*?id: ['"]new-\d+['"][\s\S]*?\}/g) || [];

// Process each car object to add missing specs
for (const carObject of carObjects) {
  let updatedCarObject = carObject;
  
  // Check if the car object has horsepowerTorque but not horsepower
  if (updatedCarObject.includes('horsepowerTorque:') && !updatedCarObject.includes('horsepower:')) {
    // Extract the horsepowerTorque value
    const horsepowerMatch = updatedCarObject.match(/horsepowerTorque: ['"]([^'"]+)['"]/);
    if (horsepowerMatch) {
      const horsepowerValue = horsepowerMatch[1];
      // Add horsepower field
      updatedCarObject = updatedCarObject.replace(
        /horsepowerTorque: ['"]([^'"]+)['"]/,
        `horsepowerTorque: '${horsepowerValue}',\n    horsepower: '${horsepowerValue}'`
      );
    }
  }
  
  // Add msrp if it doesn't exist but price does
  if (!updatedCarObject.includes('msrp:') && updatedCarObject.includes('price:')) {
    const priceMatch = updatedCarObject.match(/price: ['"]([^'"]+)['"]/);
    if (priceMatch) {
      const priceValue = priceMatch[1];
      // Add msrp field
      updatedCarObject = updatedCarObject.replace(
        /price: ['"]([^'"]+)['"]/,
        `price: '${priceValue}',\n    msrp: '${priceValue}'`
      );
    }
  }
  
  // Add mpg if it doesn't exist and it's not electric
  if (!updatedCarObject.includes('mpg:') && 
      (!updatedCarObject.includes('fuelType: \'Electric\'') && 
       !updatedCarObject.includes('fuelType: "Electric"'))) {
    // Add mpg field before the closing bracket
    updatedCarObject = updatedCarObject.replace(
      /(\s+)\}/,
      `,\n    mpg: '22 city / 32 hwy'$1}`
    );
  }
  
  // Add engine if it doesn't exist
  if (!updatedCarObject.includes('engine:')) {
    // Check if it's a sports car
    const isSportsCar = updatedCarObject.includes('Sports Car') || 
                        updatedCarObject.includes('Performance') ||
                        updatedCarObject.includes('Luxury');
    
    const engineValue = isSportsCar ? 
      '6-cylinder Turbo' : 
      '4-cylinder Turbo';
    
    // Add engine field before the closing bracket
    updatedCarObject = updatedCarObject.replace(
      /(\s+)\}/,
      `,\n    engine: '${engineValue}'$1}`
    );
  }
  
  // Add transmission if it doesn't exist
  if (!updatedCarObject.includes('transmission:')) {
    // Check if it's a sports car
    const isSportsCar = updatedCarObject.includes('Sports Car') || 
                        updatedCarObject.includes('Performance');
    
    const transmissionValue = isSportsCar ? 
      '6-speed Manual' : 
      '8-speed Automatic';
    
    // Add transmission field before the closing bracket
    updatedCarObject = updatedCarObject.replace(
      /(\s+)\}/,
      `,\n    transmission: '${transmissionValue}'$1}`
    );
  }
  
  // Replace the original car object with the updated one
  content = content.replace(carObject, updatedCarObject);
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed car specs in BuyersGuide.tsx');
