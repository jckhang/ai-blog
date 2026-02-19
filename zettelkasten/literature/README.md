---
id: literature-readme
title: Literature 说明
created: 2026-02-19
tags: ["meta", "literature"]
---

# Literature 文件夹说明

存放**文献笔记 (Literature Notes)**。

## 用途

- 阅读书籍、文章、论文后，提炼核心观点
- **用自己的话重述**，而非直接引用
- 标注出处（来源、页码、URL）
- 每篇文献通常产生 1-2 条笔记

## 与永久笔记的关系

文献笔记是**中间产品**，最终提炼为永久笔记。

- ✅ 文献笔记：针对**特定来源**，有上下文
- ✅ 永久笔记：**去上下文化**的原子知识，可独立存在

## 命名

```
作者-书名-章节-original-id.md
# 示例：
karpathy-teacher-gpt-02012025.md
ahrens-how-to-take-smart-notes-ch1.md
```

## 模板

```markdown
---
id: lit-YYYYMMDD-HHMM
title: 提炼后的核心观点（自己的话）
source: "书名/文章标题"
author: 作者
url: https://...
pages: 23-45  # 或章节
created: YYYY-MM-DD
tags: ["literature"]
---

# 核心观点

用自己的话写出最重要的1-3个观点...

# 原文引用（可选）

> 直接引用原文（如果需要对比）

# 待办

- [ ] 提炼为永久笔记（[[永久笔记ID]]）
- [ ] 补充链接
- [ ] 定期归档或删除
```

## 工作流

1. 阅读时在 `inbox/` 快速记要点
2. 阅读完后1-2天内，重读笔记并转化为文献笔记
3. 每篇文献笔记都指向一个或多个**永久笔记**（通过链接）
4. 定期浏览文献笔记，提取**去上下文化**的永久笔记

---

**关键**: 写文献笔记时问自己：如果忘掉原文，我能从笔记中恢复核心观点吗？