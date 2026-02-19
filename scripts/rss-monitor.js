#!/usr/bin/env node
/**
 * RSS Monitor - 基于 Karpathy 推荐的高质量 RSS 订阅监控
 * 每小时检查一次，新内容转为 Zettelkasten 永久笔记
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PROJECT_DIR = '/Users/yuxiang/workspaces/my_openclaw/.openclaw/workspace/projects/ai-blog';
const CONFIG_PATH = path.join(PROJECT_DIR, 'rss-feeds-config.json');
const ZK_PERMANENT_DIR = path.join(PROJECT_DIR, 'zettelkasten/permanent');
const INBOX_DIR = path.join(PROJECT_DIR, 'zettelkasten/inbox');

// 加载配置
let config;
try {
  config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8'));
} catch (e) {
  console.error('❌ 配置文件未找到:', CONFIG_PATH);
  process.exit(1);
}

// RSS 解析（简化版，实际应用可使用 'rss-parser' 库）
function parseRSS(content) {
  // 简单的 XML 解析，提取 <item> 或 <entry>
  const items = [];
  const itemRegex = /<(item|entry)[^>]*>([\s\S]*?)<\/(item|entry)>/gi;
  let match;
  while ((match = itemRegex.exec(content)) !== null) {
    const itemXml = match[2];
    const titleMatch = itemXml.match(/<title[^>]*>([^<]*)<\/title>/i);
    const linkMatch = itemXml.match(/<(link|orig-link)[^>]*href=["']([^"']+)["'][^>]*>/i) || itemXml.match(/<link[^>]*>([^<]*)<\/link>/i);
    const descMatch = itemXml.match(/<(description|summary|content)[^>]*>([\s\S]*?)<\/(description|summary|content)>/i);
    const dateMatch = itemXml.match(/<(pubDate|published|updated)[^>]*>([^<]*)<\/(pubDate|published|updated)>/i);

    items.push({
      title: titleMatch ? titleMatch[1].trim() : 'No title',
      link: linkMatch ? linkMatch[2] || linkMatch[1] : '',
      description: descMatch ? descMatch[2].replace(/<[^>]+>/g, '').trim() : '',
      published: dateMatch ? dateMatch[2] : new Date().toISOString()
    });
  }
  return items;
}

// 检查是否已存在（基于链接去重）
function isDuplicate(link) {
  try {
    // 检查 ZK 永久笔记中是否已有
    const notes = fs.readdirSync(ZK_PERMANENT_DIR).filter(f => f.endsWith('.md'));
    for (const note of notes) {
      const content = fs.readFileSync(path.join(ZK_PERMANENT_DIR, note), 'utf-8');
      if (content.includes(link)) {
        return true;
      }
    }
    // 检查 inbox
    if (fs.existsSync(INBOX_DIR)) {
      const inboxNotes = fs.readdirSync(INBOX_DIR).filter(f => f.endsWith('.md'));
      for (const note of inboxNotes) {
        const content = fs.readFileSync(path.join(INBOX_DIR, note), 'utf-8');
        if (content.includes(link)) {
          return true;
        }
      }
    }
  } catch (e) {}
  return false;
}

// 生成 Zettelkasten 永久笔记
function createPermanentNote(item, feed, feedIndex) {
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0]; // YYYY-MM-DD
  const dateCompact = dateStr.replace(/-/g, ''); // YYYYMMDD
  
  const title = item.title.substring(0, 80).replace(/[^\w\s\u4e00-\u9fff-]/g, '').trim();
  const slug = title.toLowerCase().replace(/\s+/g, '-').substring(0, 50);
  
  // 新命名规范: YYYYMMDD-rss-NNN-slug.md
  const filename = `${dateCompact}-rss-${feedIndex:03d}-${slug}.md`;
  
  // ID 使用相同格式（去掉 .md）
  const id = filename.replace('.md', '');

  const content = `---
id: ${id}
title: ${title}
created: ${dateStr}
tags: ["rss", "${feed.category}", "auto-import"]
source: "${feed.title}"
source_url: "${item.link}"
---

# ${title}

${item.description.substring(0, 1000)}

## 来源

- **Feed**: [[${feed.title}]] (${feed.category})
- **链接**: ${item.link}
- **发布时间**: ${item.published}
- **采集时间**: ${now.toISOString()}

## 相关链接

- [[001-zettelkasten-是什么]]
- [[018-研究扫描自动化的ZK集成策略]]

---
*RSS 自动采集 - 请人工审查并补充内容链接*
`;

  return { id, filename, content };
}

// 主监控流程
async function monitor() {
  console.log('📡 RSS Monitor - Starting...\n');
  console.log(`📊 配置: ${config.total_feeds} 个订阅源`);
  
  let totalNew = 0;
  const errors = [];

  // 按优先级处理 feed
  const sortedFeeds = config.feeds.sort((a, b) => a.priority - b.priority);
  
  for (const feed of sortedFeeds) {
    try {
      console.log(`\n📰 检查: ${feed.title} [${feed.category}]`);
      
      // 下载 RSS
      const response = await fetch(feed.url, { timeout: 10000 });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const xml = await response.text();
      
      // 解析条目
      const items = parseRSS(xml);
      console.log(`   找到 ${items.length} 篇文章`);
      
      // 过滤高质量内容
      const highQuality = items.filter(item => 
        item.title.length > 10 &&
        item.description.length > 100 &&
        !isDuplicate(item.link)
      );
      
      console.log(`   ✅ ${highQuality.length} 条新内容待处理`);
      
      // 创建笔记（最多 2 条/feed，避免过多）
      for (let i = 0; i < Math.min(highQuality.length, 2); i++) {
        const note = createPermanentNote(highQuality[i], feed, i + 1);  // feedIndex = 1, 2
        const filepath = path.join(ZK_PERMANENT_DIR, note.filename);
        
        fs.writeFileSync(filepath, note.content, 'utf-8');
        console.log(`   ✍️  创建: ${note.filename}`);
        totalNew++;
      }
      
    } catch (error) {
      console.log(`   ❌ 错误: ${error.message}`);
      errors.push({ feed: feed.title, error: error.message });
    }
  }

  console.log(`\n✅ RSS 监控完成`);
  console.log(`   新增永久笔记: ${totalNew} 张`);
  console.log(`   失败: ${errors.length} 个`);

  if (totalNew > 0) {
    try {
      execSync('git add -A', { cwd: PROJECT_DIR, stdio: 'ignore' });
      const commitMsg = `feat(rss): imported ${totalNew} high-quality articles from ${config.name}`;
      execSync(`git commit -m "${commitMsg}" --no-verify`, { cwd: PROJECT_DIR, stdio: 'ignore' });
      console.log(`   📦 已提交到 Git`);
    } catch (e) {
      console.log(`   ⚠️  Git 提交失败: ${e.message}`);
    }
  }

  // 记录到 Heartbeat
  const logEntry = {
    timestamp: new Date().toISOString(),
    totalFeeds: config.total_feeds,
    newNotes: totalNew,
    errors: errors.length
  };
  console.log('\n📝 Summary:', JSON.stringify(logEntry, null, 2));
}

// 简化的 fetch 函数（使用 Node.js 内置 https）
const https = require('https');
function fetch(url, options = {}) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const req = https.get(urlObj, { timeout: options.timeout || 10000 }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          ok: res.statusCode === 200,
          status: res.statusCode,
          text: () => Promise.resolve(data)
        });
      });
    });
    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Timeout'));
    });
  });
}

// 运行
monitor().catch(err => {
  console.error('❌ RSS Monitor failed:', err);
  process.exit(1);
});