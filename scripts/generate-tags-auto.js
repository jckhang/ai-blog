#!/usr/bin/env node
/**
 * 自动为 RSS 永久笔记生成智能标签（非embedding方式）
 * 基于：技术术语词典 + 标题提取 + 名词短语识别
 */

const fs = require('fs');
const path = require('path');

const PROJECT_DIR = '/Users/yuxiang/workspaces/my_openclaw/.openclaw/workspace/projects/ai-blog';
const ZK_PERMANENT_DIR = path.join(PROJECT_DIR, 'zettelkasten/permanent');

// 技术术语词典（AI/ML/CS 常见关键词）
const TECH_TERMS = [
  // LLM & NLP
  'llm', 'gpt', 'transformer', 'attention', 'token', 'prompt', 'incontext', 'finetune', 'lora',
  'agent', 'agents', 'multimodal', 'vision', 'language', 'reasoning', 'planning',
  // ML
  'deep learning', 'neural network', 'cnn', 'rnn', 'lstm', 'gnn', 'graph neural',
  'reinforcement learning', 'rl', 'policy', 'reward', 'value function',
  // Vision
  'computer vision', 'cv', 'image', 'video', 'detection', 'segmentation',
  // Infrastructure
  'deployment', 'inference', 'optimization', 'quantization', 'pruning', 'compression',
  'distributed', 'parallel', 'gpu', 'tpu', 'memory',
  // Safety & Ethics
  'safety', 'alignment', 'bias', 'fairness', 'interpretability', 'explainability',
  // Code & Engineering
  'code generation', 'programming', 'software', 'engineering', 'testing',
  // Specific models/approaches
  'diffusion', 'stable diffusion', 'dall-e', 'midjourney',
  'whisper', ' speech', 'audio',
  'claude', 'gemini', 'mistral', 'llama', 'qwen'
];

// 停用词（忽略）
const STOP_WORDS = new Set([
  'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with',
  'by', 'from', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has',
  'had', 'do', 'does', 'did', 'will', 'would', 'should', 'could', 'may', 'might',
  'can', 'this', 'that', 'these', 'those', 'it', 'its', 'they', 'them', 'their',
  'we', 'us', 'our', 'you', 'your', 'i', 'my', 'me', 'he', 'him', 'his', 'she',
  'her', 'hers', 'what', 'which', 'who', 'whom', 'where', 'when', 'why', 'how',
  'all', 'each', 'every', 'both', 'few', 'more', 'most', 'other', 'some', 'such',
  'only', 'own', 'same', 'so', 'than', 'too', 'very', 'just', 'but', 'also',
  // 中文停用词
  '然而', '但是', '因为', '所以', '而且', '或者', '如果', '那么', '当', '对', '于',
  '们', '请', '问', '答', '解', '方', '案', '方', '法', '实', '现', '功', '能',
  '代码', '运行', '测试', '结果', '显示', '说明', '表示', '这', '那', '个', '些',
  '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'
]);

// 提取名词短语（简化版：大写词、英文词组、中文技术词）
function extractPhrases(text) {
  const phrases = [];
  
  // 1. 大写英文单词或词组（如 "Large Language Model", "Graph Neural Network"）
  const upperCaseRegex = /([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/g;
  let match;
  while ((match = upperCaseRegex.exec(text)) !== null) {
    const phrase = match[1].toLowerCase();
    if (phrase.length > 3 && phrase.length < 30 && !STOP_WORDS.has(phrase)) {
      phrases.push(phrase);
    }
  }
  
  // 2. 包含连字符的词组（如 "graph-neural", "multi-modal"）
  const hyphenRegex = /([a-z]+(?:-[a-z]+)+)/g;
  while ((match = hyphenRegex.exec(text.toLowerCase())) !== null) {
    if (match[1].length > 5) phrases.push(match[1]);
  }
  
  // 3. 中文技术词（2-4字，不含停用词）
  const chineseRegex = /([\u4e00-\u9fff]{2,4})/g;
  while ((match = chineseRegex.exec(text)) !== null) {
    const word = match[1];
    if (!STOP_WORDS.has(word) && word.length >= 2) {
      phrases.push(word);
    }
  }
  
  return [...new Set(phrases)];  // 去重
}

// 匹配技术术语
function matchTechTerms(text) {
  const lower = text.toLowerCase();
  const matches = [];
  for (const term of TECH_TERMS) {
    if (lower.includes(term)) {
      matches.push(term);
    }
  }
  return matches;
}

// 从 front matter 中读取 feed 分类，确定基础标签
function getBaseTags(content, feedCategory) {
  const tags = new Set();
  
  // 添加 feed 分类（转为小写）
  if (feedCategory) {
    tags.add(feedCategory.toLowerCase());
  }
  
  // 添加 'rss' 标识
  tags.add('rss');
  
  return Array.from(tags);
}

// 生成标签（核心函数）
function generateTags(title, description, feedCategory) {
  const text = title + ' ' + description;
  
  // 1. 提取短语
  const phrases = extractPhrases(text);
  
  // 2. 匹配技术术语
  const techTerms = matchTechTerms(text);
  
  // 3. 合并并去重
  const allTags = [...new Set([...phrases, ...techTerms])];
  
  // 4. 添加基础标签
  const baseTags = getBaseTags('', feedCategory);
  allTags.push(...baseTags);
  
  // 5. 选择最相关的（按优先级：techTerms > phrases > base）
  const priorityScored = allTags.map(tag => {
    let score = 0;
    if (techTerms.includes(tag)) score += 3;
    else if (phrases.includes(tag)) score += 2;
    else score += 1;
    return { tag, score };
  });
  
  priorityScored.sort((a, b) => b.score - a.score);
  
  // 6. 取前 5 个
  const selected = priorityScored.slice(0, 5).map(p => p.tag);
  
  return selected;
}

// 更新笔记的 tags
function updateTagsInFile(filepath, newTags) {
  const content = fs.readFileSync(filepath, 'utf-8');
  
  // 找到 tags: [...] 行
  const tagsLineMatch = content.match(/^tags:\s*\[([^\]]*)\]$/m);
  if (!tagsLineMatch) {
    console.log(`   ⚠️  未找到 tags 字段: ${filepath}`);
    return false;
  }
  
  // 解析现有 tags（保留一些通用标签如 'rss'）
  const existingTags = tagsLineMatch[1].split(',').map(t => t.trim().replace(/^"|"$/g, ''));
  const keepTags = existingTags.filter(t => t === 'rss' || t === 'auto-import');
  
  // 合并：保留通用 + 新生成的
  const finalTags = [...new Set([...keepTags, ...newTags])];
  
  // 替换
  const newTagsLine = `tags: [${finalTags.map(t => `"${t}"`).join(', ')}]`;
  const newContent = content.replace(/^tags:\s*\[([^\]]*)\]$/m, newTagsLine);
  
  fs.writeFileSync(filepath, newContent, 'utf-8');
  return true;
}

// 主流程
async function main() {
  console.log('🏷️  自动标签生成（非embedding方式）\n');
  
  // 获取所有 RSS 文件
  const files = fs.readdirSync(ZK_PERMANENT_DIR)
    .filter(f => f.startsWith('2026') && f.includes('-rss-') && f.endsWith('.md'));
  
  console.log(`📁 找到 ${files.length} 个 RSS 文件`);
  
  let updated = 0;
  let skipped = 0;
  
  for (const file of files) {
    const filepath = path.join(ZK_PERMANENT_DIR, file);
    const content = fs.readFileSync(filepath, 'utf-8');
    
    // 提取 front matter 信息
    const titleMatch = content.match(/^title:\s*(.+)$/m);
    const descMatch = content.match(/^description:/m) || content.match(/^summary:/m);
    const feedSourceMatch = content.match(/^source:\s*(.+)$/m);
    
    if (!titleMatch) {
      console.log(`⏭️  ${file}: 无 title，跳过`);
      skipped++;
      continue;
    }
    
    const title = titleMatch[1];
    // 取正文前 500 字作为描述
    const bodyMatch = content.match(/^---\n[\s\S]*?\n---\n([\s\S]*)$/);
    const description = bodyMatch ? bodyMatch[1].substring(0, 500) : '';
    const feedCategory = feedSourceMatch ? feedSourceMatch[1].toLowerCase() : '';
    
    console.log(`\n📝 ${file}`);
    console.log(`   标题: ${title.substring(0, 60)}...`);
    
    // 生成标签
    const newTags = generateTags(title, description, feedCategory);
    console.log(`   生成标签: [${newTags.join(', ')}]`);
    
    // 更新文件
    if (updateTagsInFile(filepath, newTags)) {
      console.log(`   ✅ 已更新`);
      updated++;
    } else {
      skipped++;
    }
  }
  
  console.log(`\n✅ 完成: ${updated} 个文件已更新，${skipped} 个跳过`);
  
  if (updated > 0) {
    try {
      require('child_process').execSync('git add -A', { cwd: PROJECT_DIR, stdio: 'ignore' });
      require('child_process').execSync(`git commit -m "feat(auto): generated smart tags for ${updated} RSS cards (non-embedding)" --no-verify`, { cwd: PROJECT_DIR, stdio: 'ignore' });
      console.log('📦 已提交到 Git');
    } catch (e) {
      console.log('⚠️  Git 提交失败:', e.message);
    }
  }
}

main().catch(e => {
  console.error('❌ 脚本失败:', e);
  process.exit(1);
});