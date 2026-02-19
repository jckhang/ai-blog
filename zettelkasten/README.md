# Zettelkasten 卡片笔记系统

基于《卡片笔记写作法》(Sönke Ahrens) 的知识管理系统，使用 **Obsidian** 作为工具。

---

## 🎯 核心原则

1. **原子化** - 每张笔记只包含一个完整思想
2. **链接至上** - 新笔记必须链接到至少一张旧笔记
3. **去上下文化** - 笔记独立成篇，不依赖外部上下文
4. **自下而上** - 主题在积累中涌现，而非预设分类

---

## 📁 文件夹结构

```
zettelkasten/
├── inbox/          # 闪念笔记 (临时，24-48h内处理)
├── literature/     # 文献笔记 (阅读后提炼，带来源)
├── permanent/      # 永久笔记 (核心资产，按ID排序)
├── resources/      # 附件 (图片、PDF、截图)
└── index.json      # 系统索引和配置
```

---

## 🚀 快速开始

### 1. 设置 Obsidian Vault

- 打开 Obsidian
- 选择 "Open folder as vault"
- 导航到 `projects/ai-blog/zettelkasten/`
- 创建 vault

### 2. 核心设置

在 Obsidian 设置中：

- **确保**:
  - 启用 "Use tab switcher" (可选)
  - 关闭自动关闭未修改标签页（保持打开）
- **插件** (推荐):
  - Dataview - 动态查询笔记
  - Periodic Notes - 每日笔记
  - Outliner - 列表编辑
  - Hotkeys++ - 快捷键增强
  - Embed Files - 嵌入预览

### 3. 阅读现有卡片

从 `permanent/` 开始阅读：
- 001 → 002 → 003...
- 使用 **Graph view** 查看链接网络

### 4. 开始写第一张永久笔记

- 原则：一个思想，一张笔记
- 必须链接到至少一张已有笔记
- 使用 `[[ID]]` 或 `[[标题]]` 语法

---

## 📝 工作流程

### 日常

```
阅读/思考 → inbox (快速记录)
    ↓ (每天固定时间review)
inbox → literature (重写，标注来源)
    ↓ (24-48h内)
literature → permanent (原子化 + 链接)
```

### 写作

- 发现某主题的笔记群（在 Graph 中可见）
- 创建新笔记聚合它们
- 补充过渡和逻辑
- 导出 → 文章

---

## 🔗 双向链接语法

```markdown
[[001]]                    # 链接到ID
[[001-zettelkasten-是什么]]  # 链接到文件
[[原子化原则]]             # 使用别名（Obsidian自动识别）
[[003|原子化原则]]         # 显示不同文本
```

**自动补全**: `Cmd/Ctrl + P` 搜索笔记

---

## 📊 质量指标

- **新笔记数**: 目标 ≥1/天
- **链接密度**: 目标 ≥2 outgoing links/笔记
- **孤岛率**: < 5% 笔记无 incoming links
- **原子性**: 单篇内容 < 500 字（除非必须）

---

## 🛠️ 高级技巧

### 使用 Dataview 查询

```dataview
table tags, created
from "zettelkasten/permanent"
where tags = "principle"
sort created asc
```

### 创建索引页

```markdown
# 我的 Zettelkasten

## 核心概念
- [[001-zettelkasten-是什么]]
- [[003-原子化原则]]
- ...

## 最近创建
```dataview
table created
from "zettelkasten/permanent"
sort created desc
limit 10
```
```

### 快速创建

- 推荐使用 `obsidian-cli` 脚本
- 或直接复制模板文件

---

## 📚 参考

- 📖 《卡片笔记写作法》Sönke Ahrens
- 🎥 Atomic Notes (YouTube 系列)
- 🌐 社区: https://forum.obsidian.md
- 📝 本系统生成: 2026-02-19 by 小E

---

**开始写你的第一张永久笔记吧！** ✍️