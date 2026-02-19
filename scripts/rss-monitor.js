#!/usr/bin/env node
/**
 * RSS Monitor - 基于 Karpathy 推荐的高质量 RSS 订阅监控
 * 每小时检查一次，新内容抓取全文后转为 Zettelkasten 永久笔记
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const PROJECT_DIR = '/Users/yuxiang/workspaces/my_openclaw/.openclaw/workspace/projects/ai-blog';
const CONFIG_PATH = path.join(PROJECT_DIR, 'rss-feeds-config.json');
const ZK_PERMANENT_DIR = path.join(PROJECT_DIR, 'zettelkasten/permanent');

// 加载配置
let config;
try {
  config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8'));
} catch (e) {
  console.error('❌ 配置文件未找到:', CONFIG_PATH);
  process.exit(1);
}

// 简易 RSS 解析
function parseRSS(content) {
  const items = [];
  const itemRegex = /<(item|entry)[^>]*>([\s\S]*?)<\/(item|entry)>/gi;
  let match;
  while ((match = itemRegex.exec(content)) !== null) {
    const itemXml = match[2];
    const titleMatch = itemXml.match(/<title[^>]*>([^<]*)<\/title>/i);
    const linkMatch = itemXml.match(/<(link|orig-link)[^>]*href=["']([^"']+)["'][^>]*>/i) || itemXml.match(/<link[^>]*>([^<]*)<\/link>/i);
    const descMatch = itemXml.match(/<(description|summary|content:encoded)[^>]*>([\s\S]*?)<\/(description|summary|content:encoded)>/i);
    const dateMatch = itemXml.match(/<(pubDate|published|updated)[^>]*>([^<]*)<\/(pubDate|published|updated)>/i);

    items.push({
      title: titleMatch ? titleMatch[1].trim() : 'No title',
      link: linkMatch ? (linkMatch[2] || linkMatch[1]) : '',
      description: descMatch ? descMatch[2].replace(/<[^>]+>/g, '').trim() : '',
      published: dateMatch ? dateMatch[2] : new Date().toISOString()
    });
  }
  return items;
}

// 去重检查
function isDuplicate(link) {
  try {
    const notes = fs.readdirSync(ZK_PERMANENT_DIR).filter(f => f.endsWith('.md'));
    for (const note of notes) {
      const content = fs.readFileSync(path.join(ZK_PERMANENT_DIR, note), 'utf-8');
      if (content.includes(link)) return true;
    }
    if (fs.existsSync(INBOX_DIR)) {
      const inboxNotes = fs.readdirSync(INBOX_DIR).filter(f => f.endsWith('.md'));
      for (const note of inboxNotes) {
        const content = fs.readFileSync(path.join(INBOX_DIR, note), 'utf-8');
        if (content.includes(link)) return true;
      }
    }
  } catch (e) {}
  return false;
}

// 简易 HTTP 请求
function httpsGet(url, options = {}) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const req = https.get({
      hostname: urlObj.hostname,
      path: urlObj.pathname + urlObj.search,
      headers: options.headers || {},
      timeout: options.timeout || 15000
    }, (res) => {
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

// 使用 Jina AI Reader（最简单的方式）
async function fetchWithJina(url) {
  // 确保 URL 有协议前缀
  let targetUrl = url;
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    targetUrl = 'https://' + url;
  }
  const jinaUrl = `https://r.jina.ai/${targetUrl}`;
  try {
    const resp = await httpsGet(jinaUrl);
    if (resp.ok) {
      const text = await resp.text();
      // Jina 返回格式: "# Title\n\nContent..."
      // 移除开头的 "# " 如果是标题行
      if (text.startsWith('# ')) {
        return text.substring(2);
      }
      return text;
    }
  } catch (e) {
    console.log(`   ⚠️  Jina AI failed: ${e.message}`);
  }
  return '';
}

// 直接抓取网页
async function fetchDirect(url) {
  try {
    const resp = await httpsGet(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; RSSBot/1.0)'
      }
    });
    if (resp.ok) {
      const html = await resp.text();
      // 简单提取 <article> 或 <main>
      const articleMatch = html.match(/<article[\s\S]*?<\/article>/i) || 
                          html.match(/<main[\s\S]*?<\/main>/i);
      if (articleMatch) {
        return htmlToPlain(articleMatch[0]);
      }
      // 回退：移除 HTML 标签
      return html.replace(/<[^>]+>/g, '\n').replace(/\s+/g, ' ').trim();
    }
  } catch (e) {
    console.log(`   ⚠️  Direct fetch failed: ${e.message}`);
  }
  return '';
}

// 极简 HTML → 文本
function htmlToPlain(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, '\n')
    .replace(/\s+/g, ' ')
    .trim();
}

// 抓取全文（尝试多种策略）
async function fetchFullContent(url, item) {
  // 1. 尝试 Jina AI（最快、最稳）
  let content = await fetchWithJina(url);
  if (content && content.length > 500) {
    return content;
  }

  // 2. 尝试直接抓取
  content = await fetchDirect(url);
  if (content && content.length > 500) {
    return content;
  }

  // 3. 回退到 RSS 描述
  console.log(`   ⚠️  All fetch methods failed, using RSS description`);
  return item.description || '';
}

// 生成永久笔记
function createPermanentNote(item, feed, feedIndex) {
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0];
  const dateCompact = dateStr.replace(/-/g, '');
  const seq = feedIndex.toString().padStart(3, '0');
  
  const title = item.title.substring(0, 80).replace(/[^\w\s\u4e00-\u9fff-]/g, '').trim();
  const slug = title.toLowerCase().replace(/\s+/g, '-').substring(0, 50);
  const filename = `${dateCompact}-rss-${seq}-${slug}.md`;
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

${item.description}

## 来源

- **Feed**: ${feed.title}
- **链接**: ${item.link}
- **发布时间**: ${item.published}
- **采集时间**: ${now.toISOString()}

## 相关链接

- [[001-zettelkasten-是什么]]

---
*RSS 自动采集 - 请人工审查并补充内容链接*
`;

  return { id, filename, content };
}

// 主流程
async function monitor() {
  console.log('📡 RSS Monitor - Starting...\n');
  console.log(`📊 配置: ${config.total_feeds} 个订阅源`);
  
  let totalNew = 0;
  const errors = [];
  const sortedFeeds = config.feeds.sort((a, b) => a.priority - b.priority);
  
  for (const feed of sortedFeeds) {
    try {
      console.log(`\n📰 检查: ${feed.title} [${feed.category}]`);
      
      // 下载 RSS
      const response = await httpsGet(feed.url);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const xml = await response.text();
      
      // 解析条目
      const items = parseRSS(xml);
      console.log(`   找到 ${items.length} 篇文章`);
      
      // 过滤（标题长度 > 10, 未重复）
      const candidates = items.filter(item => 
        item.title.length > 10 && !isDuplicate(item.link)
      );
      
      console.log(`   ✅ ${candidates.length} 条新内容待处理`);
      
      // 限制：每 feed 最多 1 条（避免过载）
      const toImport = candidates.slice(0, 1);
      
      for (let i = 0; i < toImport.length; i++) {
        const note = createPermanentNote(toImport[i], feed, i + 1);
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
      const commitMsg = `feat(rss): imported ${totalNew} article(s) from ${config.name}`;
      execSync(`git commit -m "${commitMsg}" --no-verify`, { cwd: PROJECT_DIR, stdio: 'ignore' });
      console.log(`   📦 已提交到 Git`);
    } catch (e) {
      console.log(`   ⚠️  Git 提交失败: ${e.message}`);
    }
  }

  console.log('\n📝 Summary:', JSON.stringify({
    timestamp: new Date().toISOString(),
    totalFeeds: config.total_feeds,
    newNotes: totalNew,
    errors: errors.length
  }, null, 2));
}

// 运行
monitor().catch(err => {
  console.error('❌ RSS Monitor failed:', err);
  process.exit(1);
});
