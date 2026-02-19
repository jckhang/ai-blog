#!/usr/bin/env node
// Evaluate RSS inbox notes for permanent worthiness
const fs = require('fs');
const path = require('path');

const INBOX_DIR = '/Users/yuxiang/workspaces/my_openclaw/.openclaw/workspace/projects/ai-blog/zettelkasten/inbox';
const PERMANENT_DIR = '/Users/yuxiang/workspaces/my_openclaw/.openclaw/workspace/projects/ai-blog/zettelkasten/permanent';

const files = fs.readdirSync(INBOX_DIR).filter(f => f.endsWith('.md') && f.includes('rss-'));
console.log(`Evaluating ${files.length} RSS notes...\n`);

let keep = 0, discard = 0;

for (const file of files) {
  const content = fs.readFileSync(path.join(INBOX_DIR, file), 'utf8');
  const titleMatch = content.match(/^title:\s*"(.*)"/m);
  const fullContentMatch = content.match(/^## Full Content\n\n([\s\S]*?)(?=\n## |$)/m);
  
  const hasFullText = fullContentMatch && fullContentMatch[1].length > 500;
  const wordCount = content.split(/\s+/).length;
  
  // Criteria: full text >500 chars, total >200 words, meaningful title
  const worthy = hasFullText && wordCount > 200 && titleMatch && titleMatch[1].length > 5;
  
  if (worthy) {
    keep++;
    console.log(`✓ KEEP: ${file.substring(0, 50)}... (${wordCount} words, full: ${fullContentMatch ? fullContentMatch[1].length : 0} chars)`);
  } else {
    discard++;
    console.log(`✗ DISCARD: ${file.substring(0, 50)}... (${wordCount} words, full: ${fullContentMatch ? fullContentMatch[1].length : 0} chars)`);
  }
}

console.log(`\nSummary: ${keep} worth keeping, ${discard} to discard`);
