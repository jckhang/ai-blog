#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const PROJECT_DIR = '/Users/yuxiang/workspaces/my_openclaw/.openclaw/workspace/projects/ai-blog';
const ZK_PERMANENT_DIR = path.join(PROJECT_DIR, 'zettelkasten/permanent');

console.log('🔍 Zettelkasten 一致性检查\n');

const files = fs.readdirSync(ZK_PERMANENT_DIR).filter(f => f.endsWith('.md'));

const stats = { system: 0, manual: 0, research: 0, rss: 0, unknown: 0 };
const issues = [];

// 辅助：允许中文、英文字母、数字、连字符
const slugPattern = '[a-zA-Z0-9\u4e00-\u9fff-]+';

files.forEach(file => {
  // 研究扫描: YYYYMMDD-auto-NNN-slug.md
  if (new RegExp(`^\\d{8}-auto-\\d{3}-${slugPattern}\\.md$`).test(file)) {
    stats.research++;
    return;
  }
  // RSS: YYYYMMDD-rss-source-slug.md
  if (new RegExp(`^\\d{8}-rss-${slugPattern}-${slugPattern}\\.md$`).test(file)) {
    stats.rss++;
    return;
  }
  // 系统/手动: NNN-slug.md
  if (new RegExp(`^\\d{3}-${slugPattern}\\.md$`).test(file)) {
    const id = parseInt(file.substring(0, 3), 10);
    if (id >= 1 && id <= 15) stats.system++;
    else if (id >= 16 && id <= 999) stats.manual++;
    else stats.unknown++;
    return;
  }
  stats.unknown++;
  issues.push(`❌ 不符合命名规范: ${file}`);
});

console.log('📊 文件统计:');
console.log(`   系统卡片 (001-015): ${stats.system}`);
console.log(`   手动卡片 (016+): ${stats.manual}`);
console.log(`   研究扫描导入: ${stats.research}`);
console.log(`   RSS 导入: ${stats.rss}`);
console.log(`   未识别: ${stats.unknown}`);

if (issues.length > 0) {
  console.log('\n⚠️  命名问题:');
  issues.forEach(i => console.log(i));
}

// 链接密度
let totalLinks = 0;
files.forEach(file => {
  const content = fs.readFileSync(path.join(ZK_PERMANENT_DIR, file), 'utf-8');
  const links = content.match(/\[\[([^\]]+)\]\]/g) || [];
  totalLinks += links.length;
});
const density = (totalLinks / files.length).toFixed(2);
console.log(`\n🔗 链接统计: 总链接 ${totalLinks}, 笔记 ${files.length}, 密度 ${density}`);

// 孤岛检测
const linkedNotes = new Set();
files.forEach(file => {
  const content = fs.readFileSync(path.join(ZK_PERMANENT_DIR, file), 'utf-8');
  const links = content.match(/\[\[([^\]]+)\]\]/g) || [];
  links.forEach(link => {
    const target = link.replace(/\[\[|\]\]/g, '');
    const targetFile = files.find(f => f === target || f.startsWith(target + '-'));
    if (targetFile) linkedNotes.add(targetFile);
  });
});

const orphans = files.filter(f => !linkedNotes.has(f));
if (orphans.length > 0) {
  console.log(`\n🏝️  孤岛 (${orphans.length}个):`);
  orphans.slice(0, 10).forEach(o => console.log(`   - ${o}`));
  if (orphans.length > 10) console.log(`   ... 还有 ${orphans.length - 10} 个`);
} else {
  console.log('\n🏝️  无孤岛 ✅');
}

// Inbox
const inboxDir = path.join(PROJECT_DIR, 'zettelkasten/inbox');
if (fs.existsSync(inboxDir)) {
  const inboxFiles = fs.readdirSync(inboxDir).filter(f => f.endsWith('.md'));
  console.log(`\n📥 Inbox 文件数: ${inboxFiles.length}`);
}

console.log('\n' + '='.repeat(50));
if (stats.unknown > 0) {
  console.log('⚠️  发现命名不规范的文件');
  process.exit(1);
} else {
  console.log('✅ 命名规范检查通过！');
  process.exit(0);
}
