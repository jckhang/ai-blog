# SOP: RSS 内容获取与处理

## 概述

RSS feed 通常只提供文章的摘要、开头段落或简短描述。为了生成高质量的 Zettelkasten 永久笔记，需要访问原始链接获取全文内容。

本 SOP 定义了从 RSS → 全文 → 永久笔记的完整流程。

---

## 📊 流程图

```
RSS Feed 获取
    ↓
解析条目 (title, link, description)
    ↓
去重检查 (是否已存在)
    ↓
内容获取策略 (根据类型选择)
    ↓
    ├─ 直接访问 (web_fetch) → 全文
    ├─ PDF → 下载并解析
    └─ GitHub → git clone 代码库
    ↓
内容清洗 (HTML → Markdown, 去广告, 提取正文)
    ↓
生成永久笔记 (YYYYMMDD-rss-NNN-slug.md)
    ↓
添加链接 (自动 + 人工)
    ↓
Git 提交
```

---

## 🔧 内容获取策略

### 1. **标准网页文章** (大多数情况)

**目标**: 使用 `web_fetch` 获取全文

**步骤**:
```javascript
const response = await web_fetch({
  url: item.link,
  headers: {
    'User-Agent': 'Mozilla/5.0 (compatible; RSSBot/1.0)'
  }
});
const fullText = response.content;  // Markdown 格式
```

**挑战**:
- 部分网站有反爬（Cloudflare, Akamai）
- 可能需要处理登录墙
- 移动端优化网站

**解决方案**:
- 使用 `browser` 工具（需要 Chrome 扩展连接）- 最可靠但慢
- 尝试 textise dot iitty 或文本化服务（如 `https://r.jina.ai/http://URL`）
- 回退到描述内容 + 人工审核

**质量检查**:
- 正文长度 > 500 字符（否则视为失败）
- 包含 `item.title` 关键词（防止抓错页面）
- 提取 `og:description` 或 `<article>` 标签内容

---

### 2. **PDF 论文** (arXiv, 学术博客)

**目标**: 下载并解析 PDF 为文本

**步骤**:
```javascript
// 1. 下载 PDF
const pdfBuffer = await downloadPDF(item.link);

// 2. 解析 (使用 pdf-parse 或 pdf.js)
const text = await pdf.parse(pdfBuffer);

// 3. 提取摘要和正文
const abstract = extractAbstract(text);
const fullText = text;
```

**工具**:
- `pdf-parse` npm 包（已添加到 package.json）
- `pdfjs-dist`（纯 JS，无需系统依赖）

**处理**:
- 如果 PDF 解析失败，使用 arXiv abstract（API 提供）
- 记录论文 ID（如 arXiv:2501.12345）以便后续引用

---

### 3. **GitHub 仓库** (技术博客提及新项目)

**目标**: 克隆仓库，分析 README 和代码结构

**步骤**:
```bash
git clone --depth 1 https://github.com/user/repo.git /tmp/repo-xxxx
# 分析
cat README.md
ls -la src/
# 生成摘要
```

**内容提取**:
- README.md (项目介绍)
- 目录结构 (树形视图)
- package.json / requirements.txt (依赖)
- 关键代码文件（<1000 lines）

**生成笔记**:
- 项目概述
- 技术栈
- 核心算法/架构
- 使用场景

---

### 4. **Substack/Medium/私有博客**

**挑战**: 需要登录或显示"订阅后阅读"

**策略**:
- 使用 `browser` 工具模拟登录（如果已有会话）
- 或只抓取公开可见部分（通常前几段）
- 标记为"部分内容"，建议用户订阅

---

## 🛠️ 技术实现

### Web 内容抓取函数 (rss-monitor.js)

```javascript
async function fetchFullContent(url, item) {
  let content = '';
  
  // 策略 1: 尝试 web_fetch (最快)
  try {
    const resp = await web_fetch({ url });
    if (resp.content.length > 500) {
      content = cleanHTML(resp.content);
      return content;
    }
  } catch (e) {
    console.log(`   ⚠️  web_fetch failed: ${e.message}`);
  }
  
  // 策略 2: 使用 Jina AI 阅读器 (免费文本化)
  try {
    const jinaUrl = `https://r.jina.ai/http://${url.replace(/^https?:\/\//, '')}`;
    const resp = await web_fetch({ url: jinaUrl });
    if (resp.content.length > 300) {
      content = resp.content;
      return content;
    }
  } catch (e) {
    console.log(`   ⚠️  Jina AI failed: ${e.message}`);
  }
  
  // 策略 3: 使用 browser 工具（需要手动连接）
  if (useBrowser) {
    content = await fetchWithBrowser(url);
    if (content.length > 500) return content;
  }
  
  // 回退: 使用 RSS 提供的描述
  console.log(`   ⚠️  All methods failed, using RSS description`);
  return item.description || '';
}
```

### 内容清洗函数

```javascript
function cleanHTML(html) {
  // 移除脚本、样式、广告
  let text = html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<nav[\s\S]*?<\/nav>/gi, '')
    .replace(/<footer[\s\S]*?<\/footer>/gi, '');
  
  // 提取 <article> 或 main 内容
  const articleMatch = text.match(/<article[\s\S]*?<\/article>/i);
  if (articleMatch) {
    text = articleMatch[0];
  }
  
  // HTML → Markdown (简单转换)
  text = htmlToMarkdown(text);
  
  // 清理空白
  text = text.replace(/\s+/g, ' ').trim();
  
  return text;
}
```

---

## ✅ 质量控制

### 内容长度检查

| 类型 | 最小长度 | 目标长度 |
|------|----------|----------|
| 技术文章 | 800 字符 | 2000+ |
| 论文摘要 | 500 字符 | 1000+ |
| 博客文章 | 600 字符 | 1500+ |
| 新闻快讯 | 300 字符 | 500+ |

### 去重逻辑

- 基于 `item.link` URL 检查是否已存在（ZK + inbox）
- 基于内容指纹（前500字符的 MD5）避免相似内容
- 基于标题相似度（Levenshtein distance < 0.8）

### 分类优先级

当多个 RSS 源有相似内容时：
1. **优先**: 原始来源（如 arXiv, 官方博客）
2. **次优先**: 高质量个人博客（如 Karpathy, gwern）
3. **补充**: 新闻聚合（如 AI News）

---

## 📝 生成笔记模板

### Front Matter

```yaml
---
id: 20260219-rss-001-why-we-think
title: Why We Think (原题)
created: 2026-02-19
tags: ["rss", "ai_research", "auto-import"]
source: "Gwern.net"
source_url: "https://gwern.net/..."
source_type: "article"  # article|paper|github|news
content_length: 2350  # 字符数
quality_score: 0.85  # 0-1, 基于长度、结构、引用等
---
```

### 正文结构

```markdown
# Why We Think (简化标题)

## 原文概览

- **作者**: Gwern Branwen
- **发布时间**: 2026-02-15
- **原文链接**: https://gwern.net/...
- **阅读时长**: ~10 分钟

## 核心内容

[抓取的全文内容，已清洗和格式化]

## 关键观点

1. [要点1]
2. [要点2]
3. [要点3]

## 相关链接

- [[001-zettelkasten-是什么]]
- [[010-笔记的元数据]]
- [其他相关卡片...]

---
*RSS 自动抓取 - 抓取时间: 2026-02-19 13:45*
```

---

## 🐛 故障排除

### 问题 1: 抓取失败（403/429/Cloudflare）

**症状**: `web_fetch` 返回错误或验证码页面

**解决**:
- 添加 `User-Agent` 头模拟浏览器
- 使用 `browser` 工具（需要用户连接标签）
- 跳过此条目，记录到 `rss-errors.log`

### 问题 2: 内容太短 (< 500 字符)

**症状**: 抓取到的是简短摘要或错误页面

**解决**:
- 检查 URL 是否重定向
- 尝试 Jina AI 阅读器
- 如果仍失败，使用 RSS 提供的内容（标记"部分"）

### 问题 3: 重复内容

**症状**: 同一篇文章被多次抓取

**解决**:
- 确保去重逻辑基于 URL
- 在 `heartbeat-state.json` 中记录已处理 URL
- 定期清理重复笔记

---

## 📊 监控指标

在 Heartbeat 中追踪:

| 指标 | 目标 | 报警阈值 |
|------|------|----------|
| RSS 抓取成功率 | > 85% | < 70% |
| 平均内容长度 | > 1500 字符 | < 800 字符 |
| 处理时间/条目 | < 5s | > 15s |
| 日新增笔记 (RSS) | 5-10 张 | < 3 张 |

---

## 🚀 优化建议

### 短期 (本周)

- [ ] 实现 `web_fetch` 的 `User-Agent` 随机化（避免封锁）
- [ ] 集成 Jina AI 阅读器作为第一选择（成功率最高）
- [ ] 添加 PDF 解析（针对 arXiv）
- [ ] 添加 GitHub 仓库克隆（针对技术博客）

### 中期 (本月)

- [ ] 实现内容质量评分（自动过滤低质量）
- [ ] 添加分类器：article vs paper vs code
- [ ] 实现智能去重（相似度检测）
- [ ] 自动补充链接（基于 embedding 相似度）

### 长期 (下季度)

- [ ] 使用 LLM 总结抓取的内容（提取关键点）
- [ ] 自动生成博客草稿（基于多篇相关文章）
- [ ] 订阅源性能监控（响应时间、成功率）
- [ ] 用户反馈机制（标记"好/差"笔记）

---

## 📚 参考资源

- **RSS 2.0 规范**: https://www.rssboard.org/rss-specification
- **Jina AI Reader**: https://r.jina.ai/http://URL
- **arXiv API**: http://export.arxiv.org/api/query
- **GitHub Archive**: https://www.githubarchive.org/

---

**版本**: 1.0.0 (2026-02-19)  
**维护者**: 小E 🤖  
**状态**: 生产就绪
