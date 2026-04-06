#!/usr/bin/env node
/**
 * Daily Script Hygiene Manager
 *
 * 扫描脚本目录，清理不必要或过时的文件
 * 建议每天通过 cron 运行一次
 *
 * Usage: node projects/ai-blog/scripts/maintain.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PROJECT_DIR = path.join(__dirname, '..', '..');
const SCRIPTS_DIR = path.join(PROJECT_DIR, 'projects', 'ai-blog', 'scripts');
const TASKS_DIR = path.join(SCRIPTS_DIR, 'tasks');
const SKILLS_DIR = path.join(PROJECT_DIR, 'skills');

console.log('🧹 Starting daily script hygiene check...\n');

let cleanupCount = 0;

// 1. 清理 tasks/ 中的旧批次文件（保留最新的5个）
const batchFiles = fs.readdirSync(TASKS_DIR)
  .filter(f => f.startsWith('batch-') && f.endsWith('.jsonl'))
  .map(f => ({
    name: f,
    mtime: fs.statSync(path.join(TASKS_DIR, f)).mtimeMs
  }))
  .sort((a, b) => b.mtime - a.mtime);

if (batchFiles.length > 5) {
  const toDelete = batchFiles.slice(5);
  toDelete.forEach(f => {
    fs.unlinkSync(path.join(TASKS_DIR, f.name));
    cleanupCount++;
    console.log(`  🗑️  Deleted old batch file: ${f.name}`);
  });
} else {
  console.log(`   ✅ Batch files: ${batchFiles.length} (keep latest 5)`);
}

// 2. 清理 tasks/ 中的日志文件（保留最新的3个）
const logFiles = fs.readdirSync(TASKS_DIR)
  .filter(f => f.endsWith('-output.log'))
  .map(f => ({
    name: f,
    mtime: fs.statSync(path.join(TASKS_DIR, f)).mtimeMs
  }))
  .sort((a, b) => b.mtime - a.mtime);

if (logFiles.length > 3) {
  const toDelete = logFiles.slice(3);
  toDelete.forEach(f => {
    fs.unlinkSync(path.join(TASKS_DIR, f.name));
    cleanupCount++;
    console.log(`  🗑️  Deleted old log: ${f.name}`);
  });
} else {
  console.log(`   ✅ Log files: ${logFiles.length} (keep latest 3)`);
}

// 3. 清理 tasks/ 中的 .error.json 调试文件（保留最近10个）
const errorFiles = fs.readdirSync(TASKS_DIR)
  .filter(f => f.endsWith('.error.json'))
  .map(f => ({
    name: f,
    mtime: fs.statSync(path.join(TASKS_DIR, f)).mtimeMs
  }))
  .sort((a, b) => b.mtime - a.mtime);

if (errorFiles.length > 10) {
  const toDelete = errorFiles.slice(10);
  toDelete.forEach(f => {
    fs.unlinkSync(path.join(TASKS_DIR, f.name));
    cleanupCount++;
    console.log(`  🗑️  Deleted old error file: ${f.name}`);
  });
} else {
  console.log(`   ✅ Error files: ${errorFiles.length} (keep latest 10)`);
}

// 4. 检查并清理 skills/ 下的未定义skill
const ALLOWED_SKILLS = ['literature-worker']; // 白名单
const skillDirs = fs.readdirSync(SKILLS_DIR)
  .filter(d => fs.statSync(path.join(SKILLS_DIR, d)).isDirectory());

skillDirs.forEach(dir => {
  if (!ALLOWED_SKILLS.includes(dir)) {
    // 谨慎起见，先记录不删除
    console.log(`   ⚠️  Unknown skill directory: ${dir} (not auto-deleting, review manually)`);
  }
});

// 5. 清理 scripts/ 根目录的临时文件（非 js 且非 markdown）
const tempFiles = fs.readdirSync(SCRIPTS_DIR)
  .filter(f => {
    const ext = path.extname(f).toLowerCase();
    return f !== 'cron.sh' && !['.js', '.md', '.jsonl'].includes(ext);
  });

tempFiles.forEach(f => {
  const filepath = path.join(SCRIPTS_DIR, f);
  if (fs.statSync(filepath).isFile()) {
    fs.unlinkSync(filepath);
    cleanupCount++;
    console.log(`  🗑️  Deleted temp file: ${f}`);
  }
});

// 6. 检查 orchestrator 等核心脚本是否存在
const REQUIRED_SCRIPTS = [
  'literature_orchestrator.js',
  'list-inbox-tasks.js',
  'rss-monitor.js'
];

REQUIRED_SCRIPTS.forEach(script => {
  const exists = fs.existsSync(path.join(SCRIPTS_DIR, script));
  console.log(`   ${exists ? '✅' : '❌'} Required script: ${script}`);
});

console.log('\n' + '='.repeat(60));
console.log(`🧹 Cleanup complete. Total items removed: ${cleanupCount}`);
console.log('='.repeat(60));

// 输出建议的 cron 配置
console.log('\n💡 Suggested cron (hourly maintenance):');
console.log(`0 * * * * cd ${PROJECT_DIR} && node ${path.relative(process.env.HOME, SCRIPTS_DIR)}/maintain.js`);