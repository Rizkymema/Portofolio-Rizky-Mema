const fs = require('fs');
const path = require('path');

const dirsToScan = ['./src/components', './src/app'];

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let original = content;

  // Clean up duplicate text classes caused by previous refactor
  content = content.replace(/text-slate-900 text-content/g, 'text-content');
  content = content.replace(/text-slate-800 text-content/g, 'text-content');
  content = content.replace(/text-slate-700 text-content/g, 'text-content');
  content = content.replace(/text-slate-600 text-content/g, 'text-content');

  content = content.replace(/text-slate-900 dark:text-content/g, 'text-content');
  content = content.replace(/text-slate-800 dark:text-content/g, 'text-content');
  
  content = content.replace(/text-slate-700 dark:text-content-secondary/g, 'text-content-secondary');
  content = content.replace(/text-slate-600 dark:text-content-secondary/g, 'text-content-secondary');

  content = content.replace(/text-slate-600 dark:text-content-muted/g, 'text-content-muted');
  content = content.replace(/text-slate-500 dark:text-content-muted/g, 'text-content-muted');

  // Fix typo dark:text-content0
  content = content.replace(/dark:text-content0/g, 'text-content');

  // Remove standalone hardcoded slate text colors where they are likely meant to be theme-aware, 
  // but be careful not to blindly remove everything.
  // Actually, replacing text-slate-900 with text-content if it's standalone:
  content = content.replace(/text-slate-900(?![\w-])/g, 'text-content');
  content = content.replace(/text-slate-800(?![\w-])/g, 'text-content');
  content = content.replace(/text-slate-700(?![\w-])/g, 'text-content-secondary');
  content = content.replace(/text-slate-600(?![\w-])/g, 'text-content-muted');

  // Same for backgrounds that might be hiding text
  content = content.replace(/bg-slate-900\/80/g, 'bg-surface');
  content = content.replace(/bg-slate-900(?![\w-])/g, 'bg-surface');
  content = content.replace(/bg-slate-950\/60/g, 'bg-black/60');
  content = content.replace(/bg-slate-950\/70/g, 'bg-black/70');
  
  // Clean up double text-content
  content = content.replace(/text-content text-content/g, 'text-content');

  // Clean up dark:text-white that might still be there
  content = content.replace(/dark:text-white/g, 'text-content');

  // Clean up bg-black/5 dark:bg-surface -> bg-surface
  content = content.replace(/bg-black\/5 dark:bg-surface/g, 'bg-surface');
  content = content.replace(/bg-black\/5 dark:bg-surface-hover/g, 'bg-surface-hover');
  content = content.replace(/bg-black\/10 dark:bg-surface/g, 'bg-surface');
  content = content.replace(/bg-black\/10 dark:bg-surface-hover/g, 'bg-surface-hover');
  
  // Clean up border-black/10 dark:border-border-subtle -> border-border-subtle
  content = content.replace(/border-black\/10 dark:border-border-subtle/g, 'border-border-subtle');
  
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log('Cleaned', filePath);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      processFile(fullPath);
    }
  }
}

dirsToScan.forEach(walkDir);
console.log('Cleanup complete');
