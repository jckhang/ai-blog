#!/usr/bin/env node
/**
 * 卡片笔记写作法 - PDF 阅读与卡片提取
 * 分阶段阅读，构建 Zettelkasten 笔记系统
 */

const fs = require('fs');
const path = require('path');
const pdfjsLib = require('pdfjs-dist/legacy/build/pdf.js');

const PDF_PATH = '/Users/yuxiang/Downloads/卡片笔记写作法.pdf';
const OUTPUT_DIR = path.resolve(__dirname, 'zettelkasten');

// 配置 pdf.js 使用本地 worker
pdfjsLib.GlobalWorkerOptions.workerSrc = require('pdfjs-dist/legacy/build/pdf.worker.js');

// 阶段配置
const STAGES = [
  { name: 'stage1-overview', pages: [1, 30], desc: '全书概览、目录、核心概念' },
  { name: 'stage2-principles', pages: [31, 80], desc: '笔记原则、原子化、链接' },
  { name: 'stage3-workflow', pages: [81, 130], desc: '工作流程、工具设置' },
  { name: 'stage4-application', pages: [131, 200], desc: '实际应用、写作技巧' },
  { name: 'stage5-summary', pages: [201, -1], desc: '总结、索引、进阶' }
];

async function extractPDF() {
  try {
    console.log('📚 开始读取 PDF...');
    
    const loadingTask = pdfjsLib.getDocument(PDF_PATH);
    const pdf = await loadingTask.promise;
    const totalPages = pdf.numPages;
    
    console.log(`✅ PDF 读取成功`);
    console.log(`   - 总页数: ${totalPages}`);
    
    // 提取所有页面文本
    const fullText = await extractAllPages(pdf, totalPages);
    console.log(`   - 总字符: ${fullText.length}`);
    
    // 确保输出目录存在
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    
    // 保存完整文本（调试用）
    fs.writeFileSync(path.join(OUTPUT_DIR, 'full-text.txt'), fullText, 'utf-8');
    console.log('💾 完整文本已保存');
    
    // 生成目录结构（基于文本中的章节标记）
    const chapters = detectChapters(fullText);
    console.log('\n📑 检测到章节:');
    chapters.forEach((ch, i) => {
      console.log(`  ${i+1}. ${ch.title} (页${ch.startPage || '?'}-${ch.endPage || '?'})`);
    });
    
    // 保存章节信息
    fs.writeFileSync(path.join(OUTPUT_DIR, 'chapters.json'), JSON.stringify(chapters, null, 2), 'utf-8');
    
    return { text: fullText, chapters, totalPages };
  } catch (error) {
    console.error('❌ PDF 读取失败:', error.message);
    throw error;
  }
}

async function extractAllPages(pdf, totalPages) {
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    try {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .filter(item => item.str && item.str.trim())
        .map(item => item.str)
        .join(' ');
      pages.push(pageText);
      if (i % 10 === 0) console.log(`  - 已处理 ${i}/${totalPages} 页`);
    } catch (e) {
      pages.push(`[Error reading page ${i}]`);
    }
  }
  return pages.join('\n');
}

    console.log(`✅ PDF 读取成功`);
    console.log(`   - 总页数: ${totalPages}`);
    console.log(`   - 总字符: ${text.length}`);

    // 确保输出目录存在
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });

    // 保存完整文本（调试用）
    fs.writeFileSync(path.join(OUTPUT_DIR, 'full-text.txt'), text, 'utf-8');
    console.log('💾 完整文本已保存');

    // 生成目录结构（基于文本中的章节标记）
    const chapters = detectChapters(text);
    console.log('\n📑 检测到章节:');
    chapters.forEach((ch, i) => {
      console.log(`  ${i+1}. ${ch.title} (页${ch.startPage}-${ch.endPage})`);
    });

    // 保存章节信息
    fs.writeFileSync(path.join(OUTPUT_DIR, 'chapters.json'), JSON.stringify(chapters, null, 2), 'utf-8');

    return { text, chapters, totalPages };
  } catch (error) {
    console.error('❌ PDF 读取失败:', error.message);
    throw error;
  }
}

function detectChapters(text) {
  // 简单章节检测：查找 "第X章"、数字标题、或空行分隔的大段
  const lines = text.split('\n');
  const chapters = [];
  let currentChapter = { title: '前言', startLine: 0, content: [] };

  lines.forEach((line, idx) => {
    currentChapter.content.push(line);
    // 检测章节标题（常见模式）
    if (/^第[零一二三四五六七八九十\d]+章/.test(line.trim()) ||
        /^Chapter\s+\d+/i.test(line.trim()) ||
        (line.trim().length > 0 && line.length < 50 && /[A-Za-z\u4e00-\u9fa5]/.test(line) && line.trim().match(/^\d+\.\d+\.?\d*\.?\s*/))) {
      if (currentChapter.content.length > 0) {
        chapters.push({
          title: currentChapter.title,
          startLine: currentChapter.startLine,
          endLine: idx - 1,
          content: currentChapter.content.slice(0, -1).join('\n')
        });
      }
      currentChapter = { title: line.trim(), startLine: idx, content: [line] };
    }
  });

  // 添加最后一章
  if (currentChapter.content.length > 0) {
    chapters.push({
      title: currentChapter.title,
      startLine: currentChapter.startLine,
      endLine: lines.length - 1,
      content: currentChapter.content.join('\n')
    });
  }

  // 合并过小的章节（可能是误判）
  const merged = [];
  let buffer = '';
  chapters.forEach(ch => {
    if (ch.content.length < 500) {
      buffer += ch.content + '\n';
    } else {
      if (buffer) {
        merged.push({ title: '杂项/附录', startLine: 0, endLine: 0, content: buffer.trim() });
        buffer = '';
      }
      merged.push(ch);
    }
  });
  if (buffer) merged.push({ title: '杂项/附录', startLine: 0, endLine: 0, content: buffer.trim() });

  // 限制最多章节（避免碎片化）
  return merged.slice(0, 20);
}

async function processStage(stage, text, chapters) {
  console.log(`\n🎯 处理阶段: ${stage.name} - ${stage.desc}`);
  const stageDir = path.join(OUTPUT_DIR, stage.name);
  fs.mkdirSync(stageDir, { recursive: true });

  // 计算页数范围（简化：按字符数估算）
  const totalLength = text.length;
  const startIdx = Math.floor((stage.pages[0] / 100) * totalLength); // 假设100页
  const endIdx = stage.pages[1] === -1 ? totalLength : Math.floor((stage.pages[1] / 100) * totalLength);
  const stageText = text.slice(startIdx, endIdx);

  // 保存阶段原始文本
  fs.writeFileSync(path.join(stageDir, 'raw.txt'), stageText, 'utf-8');

  // 提取关键卡片（基于段落和关键词）
  const cards = extractCards(stageText, stage.name);
  cards.forEach(card => {
    fs.writeFileSync(path.join(stageDir, `card-${card.id}.md`), card.content, 'utf-8');
  });

  console.log(`  ✅ 提取了 ${cards.length} 张卡片`);
  return cards;
}

function extractCards(text, stage) {
  const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 50);
  const cards = [];
  let id = 1;

  paragraphs.forEach(p => {
    const trimmed = p.trim();
    // 简单的卡片判断：包含关键词或足够长的段落
    if (trimmed.length > 200 || /原则|方法|注意|关键|技巧|系统|笔记|卡片|链接|标签/.test(trimmed)) {
      const card = {
        id: `${stage}-${id++}`,
        title: trimmed.substring(0, 50) + (trimmed.length > 50 ? '...' : ''),
        content: `# 卡片 ${stage}-${id-1}\n\n${trimmed}\n\n## 思考\n\n- 如何应用？\n- 与哪些卡片关联？\n\n## 来源\n\n- 出处: 《卡片笔记写作法》${stage}\n- 原始段落: ${trimmed.substring(0, 100)}...`,
        tags: ['卡片笔记', stage],
        links: []
      };
      cards.push(card);
    }
  });

  return cards;
}

// 主流程
(async () => {
  console.log('🚀 开始《卡片笔记写作法》阅读计划\n');

  // 阶段 1: 提取全文
  const { text, chapters, totalPages } = await extractPDF();

  // 保存元数据
  const meta = {
    totalPages,
    totalChars: text.length,
    chapters,
    stages: STAGES,
    createdAt: new Date().toISOString()
  };
  fs.writeFileSync(path.join(OUTPUT_DIR, 'meta.json'), JSON.stringify(meta, null, 2), 'utf-8');

  // 阶段 2-5: 逐阶段处理
  const allCards = [];
  for (const stage of STAGES) {
    const cards = await processStage(stage, text, chapters);
    allCards.push(...cards);
  }

  // 生成卡片索引
  const index = allCards.map(c => ({
    id: c.id,
    title: c.title,
    tags: c.tags,
    path: path.join(c.id, 'index.md')
  }));
  fs.writeFileSync(path.join(OUTPUT_DIR, 'index.json'), JSON.stringify(index, null, 2), 'utf-8');

  console.log('\n✅ 第一阶段完成！');
  console.log(`📊 总计提取卡片: ${allCards.length} 张`);
  console.log(`📁 输出目录: ${OUTPUT_DIR}`);
  console.log('\n下一步: 继续阅读剩余阶段，并建立卡片间的链接关系。');
})();
