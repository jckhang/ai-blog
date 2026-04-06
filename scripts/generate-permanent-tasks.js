#!/usr/bin/env node
/**
 * Generate Permanent Conversion Tasks
 *
 * 扫描 literature/ 目录，找出所有未转换为 permanent 的笔记
 * 输出 JSONL 任务列表供 permanent-converter 处理
 */

const fs = require('fs');
const path = require('path');

const PROJECT_DIR = '/Users/yuxiang/workspaces/my_openclaw/.openclaw/workspace';
const LITERATURE_DIR = path.join(PROJECT_DIR, 'projects', 'ai-blog', 'zettelkasten', 'literature');
const TENTATIVE_DIR = path.join(LITERATURE_DIR, 'tentative');
const PERMANENT_DIR = path.join(PROJECT_DIR, 'projects', 'ai-blog', 'zettelkasten', 'permanent');
const TASKS_DIR = path.join(PROJECT_DIR, 'projects', 'ai-blog', 'scripts', 'tasks');

// 确保目录存在
if (!fs.existsSync(TASKS_DIR)) fs.mkdirSync(TASKS_DIR, { recursive: true });
if (!fs.existsSync(TENTATIVE_DIR)) fs.mkdirSync(TENTATIVE_DIR, { recursive: true });

console.log('🔍 Scanning literature notes for permanent conversion...\n');

// 收集所有literature文件（包括tentative）
const litFiles = [
  ...fs.readdirSync(LITERATURE_DIR).filter(f => f.endsWith('.md')).map(f => ({ file: f, tentative: false })),
  ...fs.readdirSync(TENTATIVE_DIR).filter(f => f.endsWith('.md')).map(f => ({ file: f, tentative: true }))
];

console.log(`   Found ${litFiles.length} literature notes`);

// 读取已有permanent notes的source记录
const permanentSources = new Set();
fs.readdirSync(PERMANENT_DIR).filter(f => f.endsWith('.md')).forEach(f => {
  const content = fs.readFileSync(path.join(PERMANENT_DIR, f), 'utf8');
  const match = content.match(/literature_source:\s*"([^"]+)"/);
  if (match) {
    permanentSources.add(match[1]);
  }
});

// 过滤出未转换的
const tasks = [];
litFiles.forEach(({ file, tentative }) => {
  if (!permanentSources.has(file)) {
    tasks.push({
      file: path.join(tentative ? 'projects/ai-blog/zettelkasten/literature/tentative' : 'projects/ai-blog/zettelkasten/literature', file),
      tentative,
      timestamp: fs.statSync(path.join(tentative ? TENTATIVE_DIR : LITERATURE_DIR, file)).mtimeMs
    });
  }
});

console.log(`   Pending conversion: ${tasks.length} notes`);

if (tasks.length === 0) {
  console.log('   🎉 All literature notes already converted to permanent!');
  process.exit(0);
}

// 按时间排序（优先转换最新的）
tasks.sort((a, b) => b.timestamp - a.timestamp);

// 输出 JSONL
const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
const outFile = path.join(TASKS_DIR, `permanent-convert-${timestamp}.jsonl`);
const jsonl = tasks.map(t => JSON.stringify(t)).join('\n');
fs.writeFileSync(outFile, jsonl, 'utf8');

console.log(`\n📦 Task file generated: ${path.basename(outFile)}`);
console.log(`\n📋 Summary:`);
console.log(`   Total literature notes: ${litFiles.length}`);
console.log(`   Already converted: ${litFiles.length - tasks.length}`);
console.log(`   Need conversion: ${tasks.length}`);
console.log(`   Tentative notes included: ${tasks.filter(t => t.tentative).length}`);
console.log(`\n🚀 To process:`);
console.log(`   node scripts/permanent-convert-orchestrator-v3.js ${path.basename(outFile)}`);
console.log(`   (or integrate into heartbeat)`);
