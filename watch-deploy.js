#!/usr/bin/env node
/**
 * AI Blog Auto-Deploy Watcher
 * 监控项目目录，检测到文件修改后自动提交并部署
 */

const { execSync, spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// 配置
const PROJECT_DIR = '/Users/yuxiang/workspaces/my_openclaw/.openclaw/workspace/projects/ai-blog';
const DEBOUNCE_MS = 5000; // 防抖：检测到变化后等待5秒再执行
const IGNORE_PATTERNS = [
  '.git/',
  'node_modules/',
  '.hugo_build.lock',
  'public/',
  'resources/',
  '.env',
  'config.local.*'
];

// 状态
let pending = false;
let timer = null;

function log(msg, type = 'INFO') {
  const icon = type === 'INFO' ? 'ℹ️' : type === 'DEPLOY' ? '🚀' : type === 'ERROR' ? '❌' : '⚠️';
  console.log(`${icon} ${msg}`);
}

function hasChanges() {
  try {
    // 检查是否有未提交的更改
    const output = execSync('git status --porcelain', { cwd: PROJECT_DIR, stdio: ['pipe', 'pipe', 'ignore'] });
    return output.toString().trim().length > 0;
  } catch (e) {
    return false;
  }
}

function getChangedFiles() {
  try {
    const output = execSync('git diff --name-only', { cwd: PROJECT_DIR, stdio: ['pipe', 'pipe', 'ignore'] });
    return output.toString().trim().split('\n').filter(f => f);
  } catch (e) {
    return [];
  }
}

function shouldIgnore(file) {
  return IGNORE_PATTERNS.some(pattern => file.includes(pattern) || file.startsWith(pattern));
}

function commitAndDeploy() {
  if (pending) return;
  pending = true;

  try {
    if (!hasChanges()) {
      log('没有检测到更改', 'INFO');
      pending = false;
      return;
    }

    const files = getChangedFiles().filter(f => !shouldIgnore(f));
    if (files.length === 0) {
      log('所有更改都在忽略列表中', 'INFO');
      pending = false;
      return;
    }

    log(`检测到 ${files.length} 个文件变化`, 'DEPLOY');
    files.forEach(f => log(`  - ${f}`));

    // 生成提交信息
    const timestamp = new Date().toLocaleString('zh-CN');
    const hasNewPost = files.some(f => f.startsWith('content/posts/'));
    const commitMsg = hasNewPost
      ? `Auto: new post ${path.basename(files.find(f => f.startsWith('content/posts/')))}`
      : `Auto: update ${timestamp}`;

    log(`提交: "${commitMsg}"`);

    // Git 操作
    execSync('git add -A', { cwd: PROJECT_DIR, stdio: 'ignore' });
    execSync(`git commit -m "${commitMsg}" --no-verify`, { cwd: PROJECT_DIR, stdio: 'ignore' });

    log('推送到 GitHub...', 'DEPLOY');
    execSync('git push origin master', { cwd: PROJECT_DIR, stdio: 'ignore' });

    // Vercel API 触发
    const token = process.env.VERCEL_TOKEN || '';
    const projectId = 'prj_5blqrh8mDYeDnQSuuwRattgH973e';

    log('触发 Vercel 生产部署...', 'DEPLOY');
    const { exec } = require('child_process');
    if (!token) {
      log('未设置 VERCEL_TOKEN 环境变量，跳过 API 触发', 'WARN');
      pending = false;
      return;
    }

  } catch (e) {
    log(`错误: ${e.message}`, 'ERROR');
    pending = false;
  }
}

// 使用 fswatch（如果可用）或轮询
function startWatcher() {
  log('开始监控目录...', 'INFO');

  // 优先尝试使用 fswatch（macOS/Linux）
  try {
    execSync('which fswatch', { stdio: 'ignore' });
    log('使用 fswatch 监听文件变化', 'INFO');

    const fswatch = spawn('fswatch', ['-0', '-e', '.git/', '-e', 'node_modules/', '-e', 'public/', '-e', '.hugo_build.lock', PROJECT_DIR]);

    fswatch.stdout.on('data', (data) => {
      const events = data.toString().split('\0').filter(e => e);
      if (events.length > 0 && !pending) {
        log(`检测到 ${events.length} 个文件变化`, 'INFO');
        clearTimeout(timer);
        timer = setTimeout(commitAndDeploy, DEBOUNCE_MS);
      }
    });

    fswatch.stderr.on('data', (data) => {
      console.error(`fswatch error: ${data}`);
    });

    fswatch.on('close', (code) => {
      log(`fswatch 退出，代码 ${code}`, 'INFO');
      startWatcher(); // 重启
    });

  } catch (e) {
    // 降级到轮询（每10秒检查一次）
    log('fswatch 不可用，使用轮询模式（10秒间隔）', 'INFO');
    setInterval(() => {
      if (!pending && hasChanges()) {
        commitAndDeploy();
      }
    }, 10000);
  }
}

// 启动
log('AI Blog Auto-Deploy 监控启动', 'INFO');
log(`项目目录: ${PROJECT_DIR}`, 'INFO');
startWatcher();
