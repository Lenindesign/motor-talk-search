// Script to fix duplicate isNew keys in BuyersGuide.tsx
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, 'src/pages/BuyersGuide.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Remove duplicate isNew keys
content = content.replace(/isNew: true,\s+motorTrendScore.*?motorTrendCategoryRank: true,\s+isNew: true/gs, 
  match => match.replace(/,\s+isNew: true$/, ''));

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed duplicate isNew keys in BuyersGuide.tsx');
