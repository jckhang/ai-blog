#!/usr/bin/env node
/**
 * Import Research Scan Highlights into Zettelkasten
 * 将研究扫描的亮点自动导入为永久笔记
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PROJECT_DIR = '/Users/jyxc-dz-0100219/workspace/my_openclaw/workspace/projects/ai-blog';
const ZK_PERMANENT_DIR = path.join(PROJECT_DIR, 'zettelkasten/permanent');
const SCAN_DIR = path.join(PROJECT_DIR, 'content/posts');

// 获取最新的研究扫描文件
function getLatestScanFile() {
  const files = fs.readdirSync(SCAN_DIR)
    .filter(f => f.match(/^\d{4}-\d{2}-\d{2}-llm-research-scan\.md$/))
    .sort()
    .reverse();
  return files[0] ? path.join(SCAN_DIR, files[0]) : null;
}

// 从扫描文件中提取亮点（简化版：提取所有加粗或列表项）
function extractHighlights(content) {
  const lines = content.split('\n');
  const highlights = [];
  let currentHour = '';

  for (const line of lines) {
    // 检测小时标题: ## 14:00-15:00
    const hourMatch = line.match(/^## (\d{2}:\d{2}-\d{2}:\d{2})/);
    if (hourMatch) {
      currentHour = hourMatch[1];
      continue;
    }

    // 提取列表项中的亮点（包含 **bold** 或 项目符号）
    if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
      const text = line.replace(/^[-*]+\s*/, '').trim();
      if (text.includes('**') || text.length > 20) {
        highlights.push({
          hour: currentHour,
          content: text,
          source: 'research-scan'
        });
      }
    }
  }

  return highlights;
}

// 生成永久笔记的 Front Matter 和内容
function createPermanentNote(highlight, index) {
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0];
  const id = `auto-${dateStr.replace(/-/g, '')}-${(index+1).toString().padStart(3, '0')}`;

  // 生成标题（取前30字，移除 markdown 符号）
  let title = highlight.content
    .replace(/\*\*/g, '')
    .replace(/`/g, '')
    .replace(/\[.*?\]\(.*?\)/g, '')
    .substring(0, 40)
    .replace(/[^\u4e00-\u9fa5a-zA-Z0-9\s]/g, '')
    .trim();
  if (!title) title = `Research Highlight ${id}`;

  //  slug
  const slug = title.toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\s-]/g, '')
    .substring(0, 50);

  const filename = `${id}-${slug}.md`;

  // 生成内容
  const content = `---
id: ${id}
title: ${title}
created: ${dateStr}
tags: ["research", "auto-import", "dd:${dateStr}"]
aliases: ["${title}"]
---

# ${title}

${highlight.content}

## 来源

- 来源: 研究扫描 ${highlight.hour ? `(${highlight.hour})` : ''}
- 日期: ${dateStr}
- 自动导入: Yes

## 相关链接

- [[001-zettelkasten-是什么]]
- [[016-llm-research-automation流水线]]

---
*自动生成 - 请人工审核并补充链接*
`;

  return { filename, content, id };
}

// 主流程
async function importHighlights() {
  console.log('🔍 开始导入研究扫描亮点到 Zettelkasten...');

  const scanFile = getLatestScanFile();
  if (!scanFile) {
    console.log('❌ 未找到研究扫描文件');
    return;
  }

  console.log(`📄 扫描文件: ${path.basename(scanFile)}`);

  const content = fs.readFileSync(scanFile, 'utf-8');
  const highlights = extractHighlights(content);

  console.log(`✨ 提取到 ${highlights.length} 条亮点`);

  if (highlights.length === 0) {
    console.log('⚠️  无亮点可导入');
    return;
  }

  // 限制导入数量（避免过多）
  const toImport = highlights.slice(0, 5);
  console.log(`📥 将导入前 ${toImport.length} 条`);

  let imported = 0;
  for (let i = 0; i < toImport.length; i++) {
    const note = createPermanentNote(toImport[i], i);
    const filepath = path.join(ZK_PERMANENT_DIR, note.filename);

    // 写入文件
    fs.writeFileSync(filepath, note.content, 'utf-8');
    console.log(`✅ 创建: ${note.filename}`);
    imported++;
  }

  console.log(`\n🎉 成功导入 ${imported} 张永久笔记到 Zettelkasten`);

  // 统计当前 ZK 状态
  const totalNotes = fs.readdirSync(ZK_PERMANENT_DIR).filter(f => f.endsWith('.md')).length;
  console.log(`📊 ZK 永久笔记总数: ${totalNotes}`);

  // Git 提交
  try {
    execSync('git add -A', { cwd: PROJECT_DIR, stdio: 'ignore' });
    const commitMsg = `feat(auto): import ${imported} research highlights to ZK`;
    execSync(`git commit -m "${commitMsg}" --no-verify`, { cwd: PROJECT_DIR, stdio: 'ignore' });
    console.log('📦 Committed to git');
  } catch (e) {
    console.log('⚠️  Git commit skipped');
  }

  console.log('✅ Import completed');
}

// 运行
importHighlights().catch(err => {
  console.error('❌ Import failed:', err);
  process.exit(1);
});