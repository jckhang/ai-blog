#!/usr/bin/env node
/**
 * RSS Monitor - 高质量订阅源监控（基于 Karpathy 理念）
 * 每小时检查一次，新内容抓取全文后导入 Zettelkasten INBOX（待处理）
 * 后续由人工/Heartbeat 分析后决定是否转入 permanent
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const { parseStringPromise } = require('xml2js');

const WORKSPACE = process.env.WORKSPACE || process.cwd();
const PROJECT_DIR = path.join(WORKSPACE, 'projects/ai-blog');
const INBOX_DIR = path.join(PROJECT_DIR, 'zettelkasten/inbox');
const STATE_FILE = path.join(PROJECT_DIR, 'zettelkasten/rss-state.json');

// 配置
const MAX_ITEMS_PER_FEED = 5; // 每个 feed 最多处理 5 条新内容
const DELAY_BETWEEN_ITEMS_MS = 1000; // 内容抓取间隔 1s（避免速率限制）
const MAX_AGE_DAYS = 90; // 只处理最近 90 天内的内容

// 高质量 RSS 订阅源（已验证可用）
const RSS_FEEDS = {
  'distill': 'https://distill.pub/rss.xml',
  'huggingface': 'https://huggingface.co/blog/feed.xml',
  'mit-tech-review': 'https://www.technologyreview.com/feed/',
  'arxiv-cs-ai': 'https://rss.arxiv.org/rss/cs.AI',
  'arxiv-cs-cl': 'https://rss.arxiv.org/rss/cs.CL',
  'arxiv-cs-lg': 'https://rss.arxiv.org/rss/cs.LG',
  'karpathy': 'https://karpathy.github.io/feed.xml',
  'gwern': 'https://www.gwern.net/feed.xml',
  'lesswrong': 'https://lesswrong.com/feed.xml?sequence=feed',
  'ai-alignment': 'https://www.alignmentforum.org/feed.xml'
};

if (!fs.existsSync(INBOX_DIR)) fs.mkdirSync(INBOX_DIR, { recursive: true });

let state = {};
if (fs.existsSync(STATE_FILE)) {
  try {
    state = JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
  } catch (e) {
    console.error('State file parse error, starting fresh');
    state = {};
  }
}

function getClient(url) {
  return url.startsWith('https') ? https : require('http');
}

async function fetchFeed(url) {
  return new Promise((resolve, reject) => {
    const client = getClient(url);
    const req = client.get(url, { timeout: 15000 }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        req.destroy();
        return fetchFeed(res.headers.location).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode}`));
        return;
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', async () => {
        try {
          const parsed = await parseStringPromise(data, { explicitArray: false });
          const items = parsed.rss?.channel?.item || (parsed.feed?.entry || []);
          resolve(items);
        } catch (e) {
          reject(e);
        }
      });
    });
    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('timeout'));
    });
  });
}

async function fetchFullContent(url) {
  try {
    const jinaUrl = `https://r.jina.ai/${url.startsWith('http') ? url : 'https://' + url}`;
    const items = await fetchFeed(jinaUrl);
    if (items && items.length > 0) {
      // Jina returns the full text as a single item
      return items[0];
    }
  } catch (e) {
    console.log(`   ⚠️  Jina AI failed: ${e.message}`);
  }
  return '';
}

function createInboxNote(feedName, item, fullText) {
  const pubDate = new Date(item.pubDate || item.isoDate || item.published || Date.now());
  const dateStr = pubDate.toISOString().split('T')[0];
  const slug = (item.title || 'untitled')
    .replace(/[^\w\u4e00-\u9fa5]+/g, '-')
    .substring(0, 60)
    .toLowerCase();
  const filename = `${dateStr}-rss-${feedName}-${slug}.md`;
  const filepath = path.join(INBOX_DIR, filename);

  if (fs.existsSync(filepath)) return null;

  const content = `---
title: "${item.title.replace(/"/g, '""')}"
source: "${feedName} RSS"
url: "${item.link}"
date: ${pubDate.toISOString()}
tags: [rss, ${feedName}]
status: pending-analysis
---

# ${item.title}

> ${item.description || 'No description available.'}

## Full Content

${fullText || '⚠️ Full content not available (fetch failed).'}

## Analysis Checklist

- [ ] 阅读全文并提取关键观点
- [ ] 与现有 ZK 笔记建立链接 [[...]]
- [ ] 确定是否转为永久笔记
- [ ] 添加适当的标签和元数据
- [ ] 更新摘要

## Related

- 
`;

  return { filepath, content };
}

async function run() {
  console.log(`RSS Monitor (Inbox + Full Content) - ${new Date().toISOString()}`);
  let newCount = 0;
  const now = Date.now();

  for (const [feedName, url] of Object.entries(RSS_FEEDS)) {
    const lastCheck = state[feedName]?.lastCheck || 0;
    try {
      const items = await fetchFeed(url);
      console.log(`  ${feedName}: ${items.length} items`);

      // 过滤新项目并按时间倒序排序
      const cutoffDate = Date.now() - (MAX_AGE_DAYS * 24 * 60 * 60 * 1000);
      const newItems = items
        .filter(item => {
          const itemDate = new Date(item.pubDate || item.isoDate || item.published || 0).getTime();
          return itemDate > lastCheck && itemDate > cutoffDate;
        })
        .sort((a, b) => {
          const dateA = new Date(a.pubDate || a.isoDate || a.published || 0).getTime();
          const dateB = new Date(b.pubDate || b.isoDate || b.published || 0).getTime();
          return dateB - dateA; // 新的在前
        })
        .slice(0, MAX_ITEMS_PER_FEED); // 限制数量

      console.log(`    → Processing ${newItems.length} new items (max ${MAX_ITEMS_PER_FEED}, age < ${MAX_AGE_DAYS}d)`);

      for (const item of newItems) {
        // 抓取全文（Jina AI）
        const fullText = await fetchFullContent(item.link);

        // 创建 inbox 笔记（包含全文）
        const note = createInboxNote(feedName, item, fullText);
        if (note) {
          fs.writeFileSync(note.filepath, note.content, 'utf8');
          newCount++;
          console.log(`    ✓ New inbox: ${item.title.substring(0, 50)}... (full: ${fullText ? fullText.length : 0} chars)`);
        }

        // 避免速率限制
        if (DELAY_BETWEEN_ITEMS_MS > 0 && newItems.indexOf(item) < newItems.length - 1) {
          await new Promise(resolve => setTimeout(resolve, DELAY_BETWEEN_ITEMS_MS));
        }
      }

      state[feedName] = { lastCheck: now, lastRun: now };
    } catch (e) {
      console.error(`  ✗ Error fetching ${feedName}: ${e.message}`);
    }
  }

  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
  console.log(`✅ RSS Monitor: ${newCount} new item(s) → INBOX (full content included)`);
  process.exit(0);
}

run().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
