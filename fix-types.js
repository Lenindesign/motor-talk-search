// Script to fix MotorTrend field types in BuyersGuide.tsx
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, 'src/pages/BuyersGuide.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Fix motorTrendScore type (number to string)
content = content.replace(/motorTrendScore: (\d+\.\d+),/g, 'motorTrendScore: \'$1\',');

// Fix motorTrendRank type (number to string with # prefix)
content = content.replace(/motorTrendRank: (\d+),/g, 'motorTrendRank: \'#$1\',');

// Fix motorTrendCategoryRank type (number to boolean)
content = content.replace(/motorTrendCategoryRank: (\d+)/g, 'motorTrendCategoryRank: true');

// Add isNew: true to all car entries that don't have it
content = content.replace(/motorTrendCategoryRank: true(?!\s*,\s*isNew)/g, 'motorTrendCategoryRank: true,\n    isNew: true');

// Add msrp field if it doesn't exist
content = content.replace(/isNew: true(?!\s*,\s*msrp)/g, (match, offset) => {
  // Check if there's a price field nearby
  const priceMatch = content.substring(Math.max(0, offset - 200), offset).match(/price: ['"]([^'"]+)['"]/);
  if (priceMatch) {
    return `isNew: true,\n    msrp: '${priceMatch[1]}'`;
  }
  return match;
});

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed MotorTrend field types in BuyersGuide.tsx');
