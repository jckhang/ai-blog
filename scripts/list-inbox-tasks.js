#!/usr/bin/env node
/**
 * List inbox raw notes as tasks for literature generator
 *
 * 扫描 inbox 目录（包括子目录），生成 JSONL 任务列表
 */

const fs = require('fs');
const path = require('path');

const PROJECT_DIR = '/Users/yuxiang/workspaces/my_openclaw/.openclaw/workspace';
const INBOX_DIR = path.join(PROJECT_DIR, 'projects', 'ai-blog', 'zettelkasten', 'inbox');
const TASKS_DIR = path.join(PROJECT_DIR, 'projects', 'ai-blog', 'scripts', 'tasks');

if (!fs.existsSync(TASKS_DIR)) fs.mkdirSync(TASKS_DIR, { recursive: true });

/**
 * 递归扫描所有 markdown 文件
 */
function scanInbox(dir, base = dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...scanInbox(fullPath, base));
    } else if (entry.name.endsWith('.md')) {
      const relative = path.relative(base, fullPath);
      files.push(relative);
    }
  }

  return files;
}

console.log('🔍 Scanning inbox for raw notes...\n');

const allFiles = scanInbox(INBOX_DIR);
console.log(`   Found ${allFiles.length} markdown files in inbox/`);

// 输出 JSONL
const tasks = allFiles.map(file => ({
  file: path.join('projects/ai-blog/zettelkasten/inbox', file),
  relPath: file
}));

const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
const tasksFile = path.join(TASKS_DIR, `literature-${timestamp}.jsonl`);
const jsonl = tasks.map(t => JSON.stringify(t)).join('\n');
fs.writeFileSync(tasksFile, jsonl, 'utf8');

console.log(`\n📦 Task file: ${tasksFile}`);
console.log(`\n📋 Summary:`);
console.log(`   Total files: ${tasks.length}`);
console.log(`\n🚀 To process:`);
console.log(`   node skills/literature-generator/scripts/generate-literature.js ${tasksFile}`);