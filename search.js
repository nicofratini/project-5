import fs from 'fs';
import path from 'path';

const searchTerm = 'ChartTooltip';
const rootDir = './src';

function searchInFiles(dir) {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    if (fs.lstatSync(fullPath).isDirectory()) {
      searchInFiles(fullPath);
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      const content = fs.readFileSync(fullPath, 'utf-8');
      content.split('\n').forEach((line, index) => {
        if (line.includes(searchTerm)) {
          console.log(`${fullPath}:${index + 1}: ${line.trim()}`);
        }
      });
    }
  });
}

searchInFiles(rootDir);
