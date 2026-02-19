#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const PROJECT_DIR = '/Users/yuxiang/workspaces/my_openclaw/.openclaw/workspace/projects/ai-blog';
const ZK_PERMANENT_DIR = path.join(PROJECT_DIR, 'zettelkasten/permanent');

const TECH_TERMS = [
  'llm','gpt','transformer','attention','token','prompt','incontext','finetune','lora',
  'agent','agents','multimodal','vision','language','reasoning','planning','thinking',
  'deep learning','machine learning','neural network','cnn','rnn','lstm','gnn','graph neural',
  'reinforcement learning','rl','policy','reward','value function','q-learning',
  'computer vision','cv','image','video','detection','segmentation','haptic',
  'deployment','inference','optimization','quantization','pruning','compression',
  'distributed','parallel','gpu','tpu','memory','framework',
  'safety','alignment','bias','fairness','interpretability','explainability','hallucination',
  'code generation','programming','software','engineering','testing','implementation',
  'diffusion','dall-e','midjourney','whisper','speech','audio','voice',
  'claude','gemini','mistral','llama','qwen','kimi',
  'openai','anthropic','google deepmind','deepmind','meta','huggingface','github','arxiv','distill','semianalysis',
  'persona','user simulation','enterprise agents','financial institutions','weight banding','a2h protocol','agent-to-human'
];

const STOP_WORDS = new Set([
  'the','a','an','and','or','but','in','on','at','to','for','of','with','by','from',
  'is','are','was','were','be','been','being','have','has','had','do','does','did',
  'will','would','should','could','may','might','can','this','that','these','those',
  'it','its','they','them','their','we','us','our','you','your','i','my','me','he',
  'him','his','she','her','hers','what','which','who','whom','where','when','why','how',
  'all','each','every','both','few','more','most','other','some','such','only','own','same',
  'so','than','too','very','just','but','also','rl','title','source','published time',
  'markdown content','image','username','password','rss','auto-import'
]);

function extractPhrases(text) {
  const phrases = [];
  const upperCaseRegex = /([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/g;
  let match;
  while ((match = upperCaseRegex.exec(text)) !== null) {
    const phrase = match[1].toLowerCase();
    if (phrase.length > 3 && phrase.length < 30 && !STOP_WORDS.has(phrase)) {
      phrases.push(phrase);
    }
  }
  const hyphenRegex = /([a-z]+(?:-[a-z]+)+)/g;
  while ((match = hyphenRegex.exec(text.toLowerCase())) !== null) {
    if (match[1].length > 5 && !STOP_WORDS.has(match[1])) phrases.push(match[1]);
  }
  const acronymRegex = /\b([A-Z]{2,4})\b/g;
  while ((match = acronymRegex.exec(text)) !== null) {
    const acronym = match[1].toLowerCase();
    if (!STOP_WORDS.has(acronym)) phrases.push(acronym);
  }
  // 匹配已知技术短语
  const techPhrases = text.toLowerCase().match(/(?:deep learning|machine learning|neural network|graph neural|reinforcement learning|computer vision|large language model|natural language processing|model compression|weight banding|reward hacking|extrinsic hallucination|cognitive science|thinking|agent-to-human|enterprise agents|financial institutions)/g);
  if (techPhrases) phrases.push(...techPhrases);
  return [...new Set(phrases)];
}

function matchTechTerms(text) {
  const lower = text.toLowerCase();
  const matches = [];
  for (const term of TECH_TERMS) {
    if (lower.includes(term)) matches.push(term);
  }
  return matches;
}

function getBaseTags(_, feedCategory) {
  const tags = new Set();
  if (feedCategory) tags.add(feedCategory.toLowerCase());
  return Array.from(tags);
}

function generateTags(title, description, feedCategory) {
  const text = (title + ' ' + description).toLowerCase();
  
  const phrases = extractPhrases(text);
  const techTerms = matchTechTerms(text);
  
  let allTags = [...new Set([...phrases, ...techTerms])];
  
  // 过滤
  allTags = allTags.filter(t => t.length >= 4 && t.length <= 30 && !STOP_WORDS.has(t));
  
  // 如果太少，添加 feed 分类
  if (allTags.length < 3 && feedCategory) {
    const extras = {
      'ai_research': ['ai-research','llm','research'],
      'engineering': ['engineering','software','implementation'],
      'thought': ['thought','philosophy','thinking']
    }[feedCategory] || [feedCategory];
    allTags.push(...extras);
    allTags = [...new Set(allTags)];
  }
  
  // 频率排序
  const freq = {};
  allTags.forEach(tag => {
    const regex = new RegExp(tag.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    freq[tag] = (text.match(regex) || []).length;
  });
  
  allTags.sort((a,b) => (freq[b]||0) - (freq[a]||0));
  
  return allTags.slice(0, 5);
}

function updateTagsInFile(filepath, newTags) {
  const content = fs.readFileSync(filepath, 'utf-8');
  const tagsLineMatch = content.match(/^tags:\s*\[([^\]]*)\]$/m);
  if (!tagsLineMatch) return false;
  
  const existingTags = tagsLineMatch[1].split(',').map(t => t.trim().replace(/^"|"$/g, ''));
  const keepTags = existingTags.filter(t => t === 'rss' || t === 'auto-import');
  
  const finalTags = [...new Set([...keepTags, ...newTags])];
  const newTagsLine = `tags: [${finalTags.map(t => `"${t}"`).join(', ')}]`;
  const newContent = content.replace(/^tags:\s*\[([^\]]*)\]$/m, newTagsLine);
  
  fs.writeFileSync(filepath, newContent, 'utf-8');
  return true;
}

async function main() {
  console.log('🏷️  自动标签生成（非embedding方式）\n');
  const files = fs.readdirSync(ZK_PERMANENT_DIR).filter(f => f.startsWith('2026') && f.includes('-rss-') && f.endsWith('.md'));
  console.log(`📁 找到 ${files.length} 个 RSS 文件`);
  
  let updated = 0, skipped = 0;
  
  for (const file of files) {
    const filepath = path.join(ZK_PERMANENT_DIR, file);
    const content = fs.readFileSync(filepath, 'utf-8');
    
    const titleMatch = content.match(/^title:\s*(.+)$/m);
    if (!titleMatch) { console.log(`⏭️  ${file}: 无 title，跳过`); skipped++; continue; }
    
    const title = titleMatch[1];
    const bodyMatch = content.match(/^---\n[\s\S]*?\n---\n([\s\S]*)$/);
    const description = bodyMatch ? bodyMatch[1].substring(0, 500) : '';
    const feedSourceMatch = content.match(/^source:\s*(.+)$/m);
    const feedCategory = feedSourceMatch ? feedSourceMatch[1].toLowerCase() : '';
    
    console.log(`\n📝 ${file}`);
    console.log(`   标题: ${title.substring(0, 60)}...`);
    
    const newTags = generateTags(title, description, feedCategory);
    console.log(`   生成标签: [${newTags.join(', ')}]`);
    
    if (updateTagsInFile(filepath, newTags)) {
      console.log(`   ✅ 已更新`);
      updated++;
    } else skipped++;
  }
  
  console.log(`\n✅ 完成: ${updated} 个文件已更新，${skipped} 个跳过`);
  
  if (updated > 0) {
    try {
      require('child_process').execSync('git add -A', { cwd: PROJECT_DIR, stdio: 'ignore' });
      require('child_process').execSync(`git commit -m "feat(auto): generated improved tags for ${updated} RSS cards" --no-verify`, { cwd: PROJECT_DIR, stdio: 'ignore' });
      console.log('📦 已提交到 Git');
    } catch (e) { console.log('⚠️  Git 提交失败:', e.message); }
  }
}

main().catch(e => { console.error('❌ 脚本失败:', e); process.exit(1); });
