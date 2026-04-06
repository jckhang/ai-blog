#!/usr/bin/env node
/**
 * Literature Queue Processor
 *
 * 从任务队列中分批处理指定数量的任务
 * 用法: node process-literature-queue.js [batchSize]
 * 默认 batchSize = 10
 */

const fs = require('fs');
const path = require('path');

const PROJECT_DIR = '/Users/yuxiang/workspaces/my_openclaw/.openclaw/workspace';
const TASKS_DIR = path.join(PROJECT_DIR, 'projects', 'ai-blog', 'scripts', 'tasks');
const LOCK_FILE = path.join(TASKS_DIR, 'processing.lock');
const STATE_FILE = path.join(TASKS_DIR, 'queue-state.json');

const batchSize = parseInt(process.argv[2]) || 10;

// 检查锁文件（防止并发）
if (fs.existsSync(LOCK_FILE)) {
  const lockAge = Date.now() - fs.statSync(LOCK_FILE).mtimeMs;
  if (lockAge < 600000) { // 10分钟内
    console.log(`⏳ Another process is running (lock age: ${Math.round(lockAge/1000)}s). Exiting.`);
    process.exit(0);
  } else {
    console.log(`⚠️  Stale lock detected (age: ${Math.round(lockAge/1000)}s), removing...`);
    fs.unlinkSync(LOCK_FILE);
  }
}

// 创建锁
fs.writeFileSync(LOCK_FILE, `Started: ${new Date().toISOString()}\nPID: ${process.pid}`);

// 加载状态
let state = { processed: 0, lastTaskFile: null, lastIndex: 0 };
if (fs.existsSync(STATE_FILE)) {
  try {
    state = JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
  } catch (e) {}
}

// 查找最新的任务文件
const taskFiles = fs.readdirSync(TASKS_DIR)
  .filter(f => f.startsWith('literature-') && f.endsWith('.jsonl'))
  .sort()
  .reverse();

if (taskFiles.length === 0) {
  console.log('📭 No literature task files found.');
  fs.unlinkSync(LOCK_FILE);
  process.exit(0);
}

const currentTaskFile = path.join(TASKS_DIR, taskFiles[0]);
console.log(`📦 Using task file: ${taskFiles[0]}`);
console.log(`   Batch size: ${batchSize}`);
console.log(`   Previously processed: ${state.processed}`);

// 读取任务
const allTasks = fs.readFileSync(currentTaskFile, 'utf8')
  .trim().split('\n')
  .filter(Boolean)
  .map((line, idx) => ({ ...JSON.parse(line), _idx: idx }));

// 计算起始位置
let startIdx = state.lastIndex || state.processed;
if (startIdx >= allTasks.length) {
  console.log('✅ All tasks already processed!');
  fs.unlinkSync(LOCK_FILE);
  if (fs.existsSync(STATE_FILE)) fs.unlinkSync(STATE_FILE);
  process.exit(0);
}

const batchTasks = allTasks.slice(startIdx, startIdx + batchSize);
console.log(`   Processing tasks ${startIdx + 1} - ${startIdx + batchTasks.length} (of ${allTasks.length})`);

if (batchTasks.length === 0) {
  console.log('✅ No more tasks to process.');
  fs.unlinkSync(LOCK_FILE);
  process.exit(0);
}

// 生成临时批次文件
const batchFile = path.join(TASKS_DIR, `batch-${Date.now()}.jsonl`);
fs.writeFileSync(batchFile, batchTasks.map(t => JSON.stringify(t)).join('\n'));

console.log(`   Batch file: ${path.basename(batchFile)}`);
console.log(`   Running literature generator...\n`);

// 调用生成脚本
const { spawn } = require('child_process');
const worker = spawn('node', [
  path.join(PROJECT_DIR, 'skills/literature-generator/scripts/generate-literature.js'),
  batchFile
], {
  cwd: PROJECT_DIR,
  stdio: 'inherit'
});

worker.on('close', (code) => {
  // 清理
  try { fs.unlinkSync(batchFile); } catch (e) {}
  fs.unlinkSync(LOCK_FILE);
  
  if (code === 0) {
    // 更新状态
    state.processed += batchTasks.length;
    state.lastTaskFile = taskFiles[0];
    state.lastIndex = startIdx + batchTasks.length;
    state.lastRun = new Date().toISOString();
    fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
    
    console.log(`\n✅ Batch completed. Total processed: ${state.processed}/${allTasks.length}`);
    
    // 检查是否完成
    if (state.processed >= allTasks.length) {
      console.log('🎉 All tasks finished! Cleaning up state...');
      fs.unlinkSync(STATE_FILE);
    }
  } else {
    console.error(`❌ Batch failed with exit code ${code}. Will retry on next run.`);
    // 不更新状态，下次重试同一批
  }
});

worker.on('error', (err) => {
  console.error('❌ Worker error:', err.message);
  try { fs.unlinkSync(LOCK_FILE); } catch (e) {}
});