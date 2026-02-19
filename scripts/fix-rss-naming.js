#!/usr/bin/env node
/**
 * 批量修正 RSS 导入文件的命名，从流水号改为语义化
 * 规则: YYYYMMDD-rss-{source_id}-{slug}.md
 *
 * 执行前会显示预览，确认后执行
 */

const fs = require('fs');
const path = require('path');

const PROJECT_DIR = '/Users/yuxiang/workspaces/my_openclaw/.openclaw/workspace/projects/ai-blog';
const ZK_PERMANENT_DIR = path.join(PROJECT_DIR, 'zettelkasten/permanent');

// 读取配置，建立 source_id 映射
const feedsConfig = JSON.parse(fs.readFileSync(path.join(PROJECT_DIR, 'rss-feeds-config.json'), 'utf-8'));

// 建立 title → source_id 的映射 (小写)
const titleToSourceId = {};
feedsConfig.feeds.forEach(feed => {
  // 生成 source_id: 小写，空格转连字符，保留核心词
  const sourceId = feed.title.toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 30);
  titleToSourceId[feed.title.toLowerCase()] = sourceId;
});

console.log('📚 已加载 Feed 映射:');
Object.entries(titleToSourceId).forEach(([title, id]) => {
  console.log(`   ${title} → ${id}`);
});

// 获取所有 rss-*.md 文件（按日期+序号格式）
const files = fs.readdirSync(ZK_PERMANENT_DIR)
  .filter(f => f.match(/^\d{8}-rss-\d{3}-/))
  .sort();

console.log(`\n🔍 找到 ${files.length} 个需要重命名的 RSS 文件`);

// 按文件名分组（同一天的同 source_id 应该合并）
const byDate = {};
files.forEach(f => {
  const match = f.match(/^(\d{8})-rss-\d{3}-(.+)$/);
  if (match) {
    const date = match[1];
    const slug = match[2];
    if (!byDate[date]) byDate[date] = [];
    byDate[date].push({ old: f, slug });
  }
});

// 为每一天的每个 source 重新编号
let totalRenames = 0;
const renamePlan = [];

Object.entries(byDate).forEach(([date, fileList]) => {
  console.log(`\n📅 日期: ${date}`);
  
  // 对于每个文件，尝试匹配 source（通过前文标题关键词）
  fileList.forEach((file, idx) => {
    const oldPath = path.join(ZK_PERMANENT_DIR, file.old);
    const content = fs.readFileSync(oldPath, 'utf-8');
    
    // 提取 title
    const titleMatch = content.match(/^title:\s*(.+)$/m);
    const title = titleMatch ? titleMatch[1].trim() : '';
    
    // 猜测 source_id (基于标题关键词或 feed 标题)
    let sourceId = 'misc';
    for (const [feedTitle, id] of Object.entries(titleToSourceId)) {
      // 简单匹配：如果标题包含 feed 的某个关键词
      const keywords = feedTitle.split(/[\s\-]/).filter(k => k.length > 3);
      if (keywords.some(kw => title.toLowerCase().includes(kw))) {
        sourceId = id;
        break;
      }
    }
    
    // 生成新文件名: YYYYMMDD-rss-{sourceId}-{slug}.md
    const newName = `${date}-rss-${sourceId}-${file.slug}`;
    
    // 避免重复
    let finalName = newName;
    let counter = 1;
    while (fs.existsSync(path.join(ZK_PERMANENT_DIR, finalName)) && finalName !== file.old) {
      const parts = newName.split('.md');
      finalName = `${parts[0]}-${counter}.md`;
      counter++;
    }
    
    renamePlan.push({
      old: file.old,
      new: finalName,
      title: title.substring(0, 50),
      sourceId
    });
    
    console.log(`   ${file.old} → ${finalName} (source: ${sourceId})`);
    totalRenames++;
  });
});

console.log(`\n📊 总计划重命名: ${totalRenames} 个文件`);

// 询问确认（模拟）
console.log('\n⚠️  请审查以上重命名计划');
console.log('执行: node scripts/fix-rss-naming.js --execute');

// 如果传入了 --execute 参数，则执行
if (process.argv.includes('--execute')) {
  console.log('\n🚀 开始执行重命名...');
  renamePlan.forEach(({ old, new }) => {
    const oldPath = path.join(ZK_PERMANENT_DIR, old);
    const newPath = path.join(ZK_PERMANENT_DIR, new);
    fs.renameSync(oldPath, newPath);
    console.log(`✅ ${old} → ${new}`);
  });
  console.log('✅ 全部完成！');
  process.exit(0);
} else {
  console.log('\nℹ️  未执行实际重命名。如需执行，请运行:');
  console.log('   node scripts/fix-rss-naming.js --execute');
  process.exit(0);
}