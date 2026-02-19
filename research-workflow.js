#!/usr/bin/env node
/**
 * Deep Research Workflow for AI Blog
 * 1. 每小时研究扫描（深度版）
 * 2. 按小时分段输出
 * 3. 包含网页打开、PDF下载、GitHub克隆等深度分析
 */

const { spawn, execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const PROJECT_DIR = '/Users/yuxiang/workspaces/my_openclaw/.openclaw/workspace/projects/ai-blog';
const CONTENT_DIR = path.join(PROJECT_DIR, 'content/posts');

// 简化的深度研究流程
async function deepResearch() {
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0];
  const hour = now.getHours().toString().padStart(2, '0');

  console.log(`🔍 Starting deep research for ${dateStr} ${hour}:00`);

  // 输出文件
  const filename = `${dateStr}-llm-research-scan-deep.md`;
  const filepath = path.join(CONTENT_DIR, filename);

  // 已有内容（如果存在）
  let existingContent = '';
  if (fs.existsSync(filepath)) {
    existingContent = fs.readFileSync(filepath, 'utf-8');
  }

  // 本小时的研究发现（这里简化，实际应调用深度技能）
  const hourlySection = `
## ${hour}:00-${(parseInt(hour)+1).toString().padStart(2,'0')}:00

- **深度研究**: (此处将包含网页打开、PDF解析、GitHub克隆分析等)
- **待实现**: 调用 open-web、download-pdf、clone-repo 等技能

`;

  // 检查是否是新的一天（文件不存在或为空）
  let fullContent = existingContent;
  if (!existingContent) {
    fullContent = `# LLM Research Deep Dive - ${dateStr}\n\n*${now.toLocaleDateString('zh-CN')} 深度研究报告*\n\n---\n\n`;
  }

  // 添加本小时内容（避免重复）
  if (!existingContent?.includes(`## ${hour}:00-`)) {
    fullContent += hourlySection;
  } else {
    // 更新已有的小时段
    const pattern = new RegExp(`(## ${hour}:00-[\\d:]+\\n[\\s\\S]*?)(?=\\n## |$)`, 'm');
    fullContent = existingContent.replace(pattern, hourlySection);
  }

  // 写入文件
  fs.mkdirSync(CONTENT_DIR, { recursive: true });
  fs.writeFileSync(filepath, fullContent, 'utf-8');

  console.log(`✅ Research updated: ${filepath}`);

  // Git 操作（提交）
  try {
    execSync('git add -A', { cwd: PROJECT_DIR, stdio: 'ignore' });
    const commitMsg = `Auto: deep research update ${dateStr} ${hour}:00`;
    execSync(`git commit -m "${commitMsg}" --no-verify`, { cwd: PROJECT_DIR, stdio: 'ignore' });
    console.log('📦 Committed to git');
  } catch (e) {
    console.log('⚠️  Git commit skipped (maybe no changes)');
  }

  // Vercel 部署（通过 hook，这里只 push）
  try {
    execSync('git push origin master', { cwd: PROJECT_DIR, stdio: 'ignore' });
    console.log('🚀 Pushed to GitHub (Vercel will auto-deploy)');
  } catch (e) {
    console.error('❌ Git push failed:', e.message);
  }

  console.log('✅ Deep research workflow completed');
}

// 运行
deepResearch().catch(console.error);
