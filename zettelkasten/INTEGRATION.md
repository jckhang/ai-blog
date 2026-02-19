# Zettelkasten 与 AI Blog 集成指南

将卡片笔记系统与博客自动化流程整合，形成**研究 → 笔记 → 写作**的闭环。

---

## 🎯 集成目标

1. **自动提产**: 研究扫描的直接产出 → Zettelkasten 卡片
2. **知识积累**: 每日扫描 → 永久笔记增长
3. **写作加速**: 博客文章由卡片群快速串联
4. **双向链接**: 博客文章 ↔ 相关卡片互引

---

## 🔄 工作流整合

### 阶段1: 研究扫描 (cron 自动)

每日 00:00 执行深度研究扫描，完成以下步骤：

1. 扫描过去 24h 新动态
2. 使用 `web_fetch` 读取关键网页全文
3. 下载并解析重要 PDF 论文
4. 克隆相关 GitHub 仓库分析
5. 生成初步要点列表（临时存于 inbox）

### 阶段2: 转化为卡片 (Heartbeat 或手动)

每日 Heartbeat 检查时，自动或手动将扫描要点转为卡片：

```
扫描要点 → 提炼观点 → 永久笔记 (permanent/)
       ↓
  文献笔记 (literature/) - 如果直接引用来源
```

**自动化规则**（待实现）：

- 每条新发现 → 创建 1-2 张永久笔记
- 自动链接到相关已有卡片（基于语义相似度）
- 标签自动添加: `research`, `dd:YYYY-MM-DD`

### 阶段3: 博客生成 (定期)

每周/月，将积累的卡片群转化为博客文章：

1. 在 Obsidian 中发现主题簇（Graph view 或 Dataview 查询）
2. 导出相关笔记（按需补充逻辑）
3. 转换为科普风格（添加 emoji、比喻）
4. 发布到博客 `content/posts/`

---

## 🛠️ 技术实现

### 研究脚本增强 (research-workflow.js)

新增输出格式选项 `--zettelkasten`：

```javascript
// 输出示例:
{
  "cards": [
    {
      "id": "auto-20260219-001",
      "title": "Transformer 架构的新突破",
      "content": "...",
      "tags": ["research", "llm"],
      "sources": ["https://arxiv.org/abs/..."]
    }
  ]
}
```

### 自动导入脚本

`scripts/import-zettelkasten.js`:

- 读取 research scan 输出
- 生成永久笔记文件到 `permanent/`
- 计算相似度并添加初始链接
- 提交到 Git

### 博客发布加速

使用 Dataview 查询自动生成草稿：

```markdown
---
title: "Weekly AI Digest - $(date)"
draft: true
---

# 本周重要发现

```dataview
table tags, created
from "zettelkasten/permanent"
where created >= this.week
sort created desc
```

## 详细分析

<!-- 手动补充 -->
```

---

## 📊 指标追踪

在 `zettelkasten/index.json` 中添加统计：

```json
{
  "stats": {
    "total_permanent": 156,
    "weekly_growth": 7,
    "avg_links_per_card": 2.3,
    "top_tags": ["llm", "agent", "research"]
  }
}
```

通过 Heartbeat 自动更新并报告。

---

## 🚀 优先级任务

### 立即 (本周)

- [ ] 设计 research scan → ZK 卡片映射规则
- [ ] 实现 `research-workflow.js` 的 ZK 输出模式
- [ ] 创建 `import-zettelkasten.js` 脚本
- [ ] 测试一次完整流程 (scan → import → verify)

### 中期 (本月)

- [ ] 建立主题簇发现算法 (基于链接密度)
- [ ] 自动博客草稿生成器
- [ ] 集成到 SOP 文档
- [ ] 记录第一批卡片到 blog posts

### 长期 (下季度)

- [ ] 双向链接: 博客文章引用对应卡片
- [ ] 可视化: 在博客侧边栏显示相关卡片
- [ ] 社区: 分享 ZK 公共导出 (去除私密信息)

---

## 📝 注意事项

- **质量 > 数量**: 不要为了增长而添加低质量笔记
- **原子性**: 每张卡片一个独立思想
- **链接真实**: 只链接真正相关的笔记
- **定期回顾**: 每周查看 Graph，发现主题簇

---

**开始行动**: 明天(02-20)的第一份扫描，尝试完整走通这个流程！🚀