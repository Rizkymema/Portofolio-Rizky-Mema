const fs = require('fs');
const path = require('path');

const dirsToScan = ['./src/components', './src/app'];

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let original = content;

  // Backgrounds
  content = content.replace(/bg-white\/\.?\[?0\.05\]?/g, 'bg-surface');
  content = content.replace(/bg-white\/5/g, 'bg-surface');
  content = content.replace(/bg-white\/\.?\[?0\.07\]?/g, 'bg-surface');
  content = content.replace(/bg-white\/10/g, 'bg-surface-hover');
  content = content.replace(/bg-white\/\.?\[?0\.08\]?/g, 'bg-surface-hover');
  content = content.replace(/bg-white\/\.?\[?0\.11\]?/g, 'bg-surface-hover');
  content = content.replace(/bg-slate-900\/55/g, 'bg-surface');

  // Background hover variants
  content = content.replace(/hover:bg-white\/\.?\[?0\.05\]?/g, 'hover:bg-surface');
  content = content.replace(/hover:bg-white\/10/g, 'hover:bg-surface-hover');
  content = content.replace(/hover:bg-white\/\.?\[?0\.08\]?/g, 'hover:bg-surface-hover');
  content = content.replace(/hover:bg-white\/\.?\[?0\.11\]?/g, 'hover:bg-surface-hover');
  content = content.replace(/hover:bg-white\/\.?\[?0\.14\]?/g, 'hover:bg-surface-hover');

  // Borders
  content = content.replace(/border-white\/\.?\[?0\.15\]?/g, 'border-border-subtle');
  content = content.replace(/border-white\/10/g, 'border-border-subtle');
  content = content.replace(/border-white\/5/g, 'border-border-subtle');
  content = content.replace(/border-white\/\.?\[?0\.14\]?/g, 'border-border-subtle');
  content = content.replace(/border-white\/\.?\[?0\.12\]?/g, 'border-border-subtle');
  content = content.replace(/border-white\/\.?\[?0\.18\]?/g, 'border-border-subtle');
  
  // Border hover variants
  content = content.replace(/hover:border-white\/20/g, 'hover:border-border-strong');
  content = content.replace(/hover:border-white\/30/g, 'hover:border-border-strong');
  content = content.replace(/hover:border-white\/\.?\[?0\.26\]?/g, 'hover:border-border-strong');

  // Text
  // Careful with text-white, some are legit (like on primary buttons). We will only replace them if they are part of typical content structures.
  // Actually, replacing text-slate-50 and text-white in specific components that are backgrounds.
  content = content.replace(/text-slate-50/g, 'text-content');
  content = content.replace(/text-slate-100/g, 'text-content');
  content = content.replace(/text-slate-200/g, 'text-content-secondary');
  content = content.replace(/text-slate-300/g, 'text-content-secondary');
  content = content.replace(/text-slate-400/g, 'text-content-muted');
  content = content.replace(/text-slate-500/g, 'text-content-muted');
  
  // Remove dark: prefix since we are semantic now
  content = content.replace(/dark:text-white/g, 'text-content');
  content = content.replace(/dark:text-slate-100/g, 'text-content');
  content = content.replace(/dark:text-slate-300/g, 'text-content-secondary');
  content = content.replace(/dark:text-slate-400/g, 'text-content-muted');
  content = content.replace(/dark:bg-white\/[^\s'"]+/g, '');
  content = content.replace(/dark:border-white\/[^\s'"]+/g, '');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log('Updated', filePath);
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
console.log('Refactor complete');
