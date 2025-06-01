// Script to fix missing commas in BuyersGuide.tsx
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, 'src/pages/BuyersGuide.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Fix missing commas after properties that end a line
const propertiesToFix = [
  'transmission: ',
  'engine: ',
  'mpg: ',
  'mpge: ',
  'range: ',
  'horsepower: '
];

// For each property that might be missing a comma
for (const prop of propertiesToFix) {
  // Find instances where the property is followed by a string and then a newline without a comma
  const regex = new RegExp(`${prop}'[^']*'\\s*\\n\\s*\\}`, 'g');
  content = content.replace(regex, (match) => {
    return match.replace('\n', ',\n');
  });
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed missing commas in BuyersGuide.tsx');
