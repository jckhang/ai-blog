#!/usr/bin/env node
/**
 * 使用 Step3.5-Flash 生成高质量标签
 * 提供 Tag 全集参考，避免失准
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const PROJECT_DIR = '/Users/yuxiang/workspaces/my_openclaw/.openclaw/workspace/projects/ai-blog';
const ZK_PERMANENT_DIR = path.join(PROJECT_DIR, 'zettelkasten/permanent');

// 从环境变量读取 API Key
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
if (!OPENROUTER_API_KEY) {
  console.error('❌ 请设置 OPENROUTER_API_KEY 环境变量');
  process.exit(1);
}

// Tag 全集参考（基于《卡片笔记写作法》+ AI领域常见标签）
const TAG_UNIVERSE = {
  // ZK 核心概念
  zettelkasten: ['zettelkasten', '卡片笔记', '永久笔记', '闪念笔记', '文献笔记', '原子化', '链接', '自下而上', '写作即思考'],
  // AI/ML 技术
  ai_ml: ['llm', 'gpt', 'transformer', 'attention', 'agent', 'multimodal', 'reasoning', 'planning',
         'deep learning', 'neural network', 'cnn', 'rnn', 'lstm', 'gnn', 'graph neural',
         'reinforcement learning', 'rl', 'policy', 'reward', 'inference', 'optimization',
         'quantization', 'pruning', 'compression', 'deployment', 'safety', 'alignment',
         'hallucination', 'bias', 'fairness', 'interpretability', 'code generation'],
  // 研究相关
  research: ['paper', 'arxiv', 'preprint', 'peer-reviewed', 'experiment', 'benchmark', 'dataset',
            'evaluation', 'metrics', 'ablation', 'state-of-the-art', 'sota'],
  // 工程实践
  engineering: ['software', 'implementation', 'framework', 'api', 'library', 'tooling',
               'devops', 'ci/cd', 'testing', 'debugging', 'performance', 'scalability'],
  // 思想文化
  thought: ['philosophy', 'cognitive science', 'thinking', 'reasoning', 'ethics', 'society',
           'impact', 'future', 'trends', 'hype', 'critique'],
  // 来源标识
  source: ['rss', 'research-scan', 'manual', 'auto-import', 'blog', 'twitter', 'github']
};

// 调用 Step3.5-Flash 生成标签
async function generateTagsWithLLM(title, description) {
  const prompt = `You are a tag generator for AI research notes. Given an article title and description, extract 3-5 topical keywords as tags.

Rules:
1. Use concise terms (1-3 words)
2. Prefer technical terms over generic words
3. Use lowercase, hyphenate multi-word terms (e.g., "graph-neural", "large-language-model")
4. Avoid vague terms like "ai", "technology", "content"
5. Output JSON array only, e.g., ["tag1", "tag2", "tag3"]

Title: ${title}
Description: ${description.substring(0, 500)}

Available tag universe for reference (choose from these when possible):
${JSON.stringify(Object.values(TAG_UNIVERSE).flat(), null, 2)}

But you may also create new compound tags if needed.

Tags:`;

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://ai-blog-lemon.vercel.app',
      'X-Title': 'Zettelkasten Tag Generator'
    },
    body: JSON.stringify({
      model: 'stepfun/step-3.5-flash',  // 使用 Step3.5-Flash
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3,
      max_tokens: 50
    })
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${await response.text()}`);
  }

  const data = await response.json();
  const content = data.choices[0].message.content.trim();

  // 尝试解析 JSON
  try {
    // 移除可能的 markdown 代码块
    const cleaned = content.replace(/```json\n?|\n?```/g, '').trim();
    const tags = JSON.parse(cleaned);
    if (Array.isArray(tags)) {
      return tags.map(t => t.toLowerCase().replace(/\s+/g, '-'));
    }
  } catch (e) {
    console.log(`   ⚠️  JSON parse failed: ${content}`);
  }

  // 回退：按逗号/换行分割
  const fallback = content.split(/[,\n]/).map(t => t.trim().toLowerCase().replace(/\s+/g, '-')).filter(Boolean);
  return fallback.slice(0, 5);
}

async function main() {
  console.log('🏷️  使用 Step3.5-Flash 生成智能标签\n');

  const files = fs.readdirSync(ZK_PERMANENT_DIR)
    .filter(f => f.startsWith('2026') && f.includes('-rss-') && f.endsWith('.md'));

  console.log(`📁 找到 ${files.length} 个 RSS 文件`);
  let updated = 0, skipped = 0;

  for (const file of files) {
    const filepath = path.join(ZK_PERMANENT_DIR, file);
    const content = fs.readFileSync(filepath, 'utf-8');

    const titleMatch = content.match(/^title:\s*(.+)$/m);
    if (!titleMatch) { console.log(`⏭️  ${file}: 无 title`); skipped++; continue; }

    const title = titleMatch[1];
    const bodyMatch = content.match(/^---\n[\s\S]*?\n---\n([\s\S]*)$/);
    const description = bodyMatch ? bodyMatch[1].substring(0, 1000) : '';

    console.log(`\n📝 ${file}`);
    console.log(`   标题: ${title.substring(0, 60)}...`);

    try {
      const newTags = await generateTagsWithLLM(title, description);
      console.log(`   ✨ Step3.5 生成: [${newTags.join(', ')}]`);

      // 保留 'rss' 和 'auto-import'
      const finalTags = ['rss', 'auto-import', ...newTags];
      const uniqueTags = [...new Set(finalTags)];

      // 更新文件
      const newContent = content.replace(/^tags:\s*\[([^\]]*)\]$/m, `tags: [${uniqueTags.map(t => `"${t}"`).join(', ')}]`);
      fs.writeFileSync(filepath, newContent, 'utf-8');
      console.log(`   ✅ 已更新`);
      updated++;

      // 避免 API 速率限制
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (e) {
      console.log(`   ❌ 失败: ${e.message}`);
      skipped++;
    }
  }

  console.log(`\n✅ 完成: ${updated} 成功, ${skipped} 失败`);

  if (updated > 0) {
    try {
      require('child_process').execSync('git add -A', { cwd: PROJECT_DIR, stdio: 'ignore' });
      require('child_process').execSync(`git commit -m "feat(llm): generated tags using Step3.5-Flash for ${updated} RSS cards" --no-verify`, { cwd: PROJECT_DIR, stdio: 'ignore' });
      console.log('📦 已提交');
    } catch (e) { console.log('⚠️  Git error:', e.message); }
  }
}

main().catch(e => { console.error(e); process.exit(1); });