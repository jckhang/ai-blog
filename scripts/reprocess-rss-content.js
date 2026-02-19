#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const https = require('https');

const PROJECT_DIR = '/Users/yuxiang/workspaces/my_openclaw/.openclaw/workspace/projects/ai-blog';
const ZK_PERMANENT_DIR = path.join(PROJECT_DIR, 'zettelkasten/permanent');

function httpsGet(url, opts = {}) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const req = https.get({ hostname: u.hostname, path: u.pathname + u.search, headers: opts.headers || {}, timeout: opts.timeout || 15000 }, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => resolve({ ok: res.statusCode === 200, status: res.statusCode, text: () => Promise.resolve(d) }));
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('Timeout')); });
  });
}

async function fetchFull(url) {
  let cleanUrl = url.replace(/^"|"$/g, '');
  const jinaUrl = `https://r.jina.ai/${cleanUrl.startsWith('http') ? cleanUrl : 'https://'+cleanUrl}`;
  try {
    const res = await httpsGet(jinaUrl);
    if (res.ok) {
      let t = await res.text();
      if (t.length > 300) return t.replace(/^# /, '');
    }
  } catch (e) {}
  return null;
}

async function reprocess() {
  console.log('🔄 重新处理 RSS 卡片 - Jina AI 抓取全文\n');
  const files = fs.readdirSync(ZK_PERMANENT_DIR).filter(f => f.startsWith('2026') && f.includes('-rss-') && f.endsWith('.md'));
  console.log(`📁 找到 ${files.length} 个文件`);
  let success = 0, fail = 0;

  for (const file of files) {
    const fp = path.join(ZK_PERMANENT_DIR, file);
    const content = fs.readFileSync(fp, 'utf-8');

    const urlMatch = content.match(/^source_url:\s*(.+)$/m);
    if (!urlMatch) { console.log(`⏭️  ${file}: 无 source_url`); continue; }
    const url = urlMatch[1].trim().replace(/^"|"$/g, '');

    console.log(`\n📰 ${file}\n   🔗 ${url}`);

    const bodyMatch = content.match(/^---\n[\s\S]*?\n---\n([\s\S]*)$/);
    const body = bodyMatch ? bodyMatch[1] : '';
    if (body.length > 2000) { console.log(`   ⏭️  内容已长`); continue; }

    const full = await fetchFull(url);
    if (!full || full.length < 300) {
      console.log(`   ❌ 失败 (${full ? full.length : 0} chars)`);
      fail++;
      continue;
    }

    console.log(`   ✅ ${full.length} chars`);
    const titleMatch = content.match(/^title:\s*(.+)$/m);
    const title = titleMatch ? titleMatch[1] : 'Untitled';
    const afterSource = content.includes('## 来源') ? content.substring(content.indexOf('## 来源')) : '';
    const newContent = `---\n${content.match(/^---\n[\s\S]*?\n---/)[0].replace(/\n$/, '')}\n---\n\n# ${title}\n\n${full}\n\n${afterSource}`;
    fs.writeFileSync(fp, newContent, 'utf-8');
    success++;
    await new Promise(r => setTimeout(r, 1000));
  }

  console.log(`\n✅ 完成: ${success} 成功, ${fail} 失败`);
  if (success > 0) {
    try {
      require('child_process').execSync('git add -A', { cwd: PROJECT_DIR, stdio: 'ignore' });
      require('child_process').execSync(`git commit -m "feat: reprocess ${success} RSS cards with full Jina AI content" --no-verify`, { cwd: PROJECT_DIR, stdio: 'ignore' });
      console.log('📦 已提交');
    } catch (e) { console.log('⚠️  Git error:', e.message); }
  }
}

reprocess().catch(e => { console.error(e); process.exit(1); });
