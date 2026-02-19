# Zettelkasten 与 AI Blog 集成指南（实际实施版）

将卡片笔记系统与博客自动化流程整合，形成**研究 → 笔记 → 写作**的闭环。

---

## 🎯 集成目标

1. **自动提产**: 研究扫描的直接产出 → Zettelkasten 卡片
2. **知识积累**: 每日扫描 → 永久笔记增长（目标 3-5 张/天）
3. **写作加速**: 博客文章由卡片群快速串联
4. **双向链接**: 博客文章 ↔ 相关卡片互引

---

## 🔄 **已实施的自动化流程**

### 每日流水线（时间表）

| 时间 (Asia/Shanghai) | 任务 | 产出 |
|----------------------|------|------|
| **00:00** | Research Scan Cron | 博客文章 (`2026-02-20-llm-research-scan.md`) |
| **01:00** | Import Highlights Cron | 永久笔记 (3-5 张，自动写入 `permanent/`) |
| **Morning (Heartbeat)** | Inbox Review | 处理 inbox，确保 no stale notes |
| **Sunday 10:00** | Weekly Cluster Discovery | 主题簇 → 博客草稿 |

### 组件详解

#### 1. Research Scan (`1c45c28b-333b-4996-94ac-7173c0fb6a78`)

- **触发**: `0 0 * * *` (每日 00:00)
- **超时**: 3600s (1小时深度研究)
- **指令**: 使用 `web_fetch`、`pdf-parse`、`git clone` 深度分析
- **输出**: `YYYY-MM-DD-llm-research-scan.md` (800-1500字，科普风格，按小时分段)
- **存储**: `projects/ai-blog/content/posts/`
- **自动推送**: git commit + push

#### 2. Import Highlights (`dd5183f4-8a5e-4808-bf24-c9352cfd2e9e`)

- **触发**: `0 1 * * *` (每日 01:00，研究扫描后1小时)
- **脚本**: `scripts/import-zettelkasten.js`
- **输入**: 最新的研究扫描文件
- **提取逻辑**:
  - 读取扫描文件，按小时分段
  - 提取包含 **bold text** 或长度 >20 的列表项
  - 每条亮点生成一张永久笔记
- **输出**: 3-5 张永久笔记写入 `zettelkasten/permanent/`
- **命名**: `auto-YYYYMMDD-XXX.md` (ID 格式: auto-20260220-001)
- **Front Matter**:
  ```yaml
  id: auto-20260220-001
  title: 从亮点生成的标题
  created: 2026-02-20
  tags: ["research", "auto-import", "dd:2026-02-20"]
  ```
- **内容**: 亮点原文 + 来源标注 + 默认链接 ([[001]], [[016]])
- **自动 Git**: commit with message `feat(auto): import X research highlights to ZK`

#### 3. Manual Review & Enhancement

- **时间**: 每日 Heartbeat 或固定时间
- **任务**:
  - 审核自动导入的永久笔记（标题是否清晰？）
  - 补充更多 `[[链接]]`（至少确保 ≥2 outgoing links）
  - 调整标签（避免过度标签化）
  - 将高质量的亮点提炼为更原子化的笔记（可选）
- **质量 Gates**:
  - [ ] 标题准确描述单一思想
  - [ ] 内容独立成篇（不需要读原文）
  - [ ] 至少有 2 个 `[[链接]]`（包括系统卡片如 [[001]]）
  - [ ] 无 TODO 或占位符

#### 4. Weekly Topic Cluster & Blog Draft (Sunday 10:00)

**自动化**（计划中）：

使用 Dataview 查询链接密度高的卡片群：

```dataview
table outgoingLinks, incomingLinks
from "zettelkasten/permanent"
where created >= this.week
sort linkCount desc
```

**人工增强**：

1. 发现主题簇（例如: 3+ 卡片互相链接，围绕同一主题）
2. 创建新博客草稿：
   ```bash
   hugo new posts/$(date +%Y-%m-%d)-topic-cluster-<theme>.md
   ```
3. 从相关永久笔记复制内容，补充过渡和逻辑
4. 转换为科普风格（加入 emoji、比喻、故事化）
5. 在文末添加"相关卡片" section，链接回 ZK
6. 提交 → 自动部署 → Vercel

---

## 🛠️ **技术栈**

| 组件 | 技术 | 说明 |
|------|------|------|
| 博客生成 | Hugo + PaperMod | 静态站点，Vercel 托管 |
| 知识管理 | Obsidian + Markdown | 本地文件，双向链接 |
| 自动化 | OpenClaw Cron + Node.js | 定时任务 + 脚本 |
| 搜索 | Fuse.js (index.json) | 全文检索 |
| 部署 | Vercel CLI (`npx vercel`) | 自动触发 |

---

## 📊 **数据流**

```
Web/PDF/GitHub (原始资料)
    ↓ research-workflow (web_fetch, pdf-parse, git clone)
Markdown 研究扫描文章 (content/posts/)
    ↓ import-zettelkasten.js (extract highlights)
永久笔记 (zettelkasten/permanent/*.md)
    ↓ 人工审查 + 补充链接
原子化、链接化的知识资产
    ↓ 每周主题簇发现
博客文章草稿 (串联 + 科普化)
    ↓ Hugo build
静态网站 (Vercel)
    ↓ 读者反馈
新灵感 → inbox (闭环)
```

---

## 🎯 **成功指标 & 监控**

### 数量指标

- **ZK 增长**: ≥3 张/天（自动导入）+ 额外人工笔记 → 目标 ≥5 张/天
- **博客发布**: ≥1 篇/天（研究扫描自动）+ 每周至少 1 篇深度主题文章
- **链接密度**: ≥2.5 (平均 outgoing links per permanent note)

### 质量指标

- **永久笔记原子性**: < 500 字/张（除非必要）
- **孤岛率**: < 5% (无 incoming links)
- **博客可读性**: 科普风格检查（目标受众评分 ≥8/10）

### 自动化健康

- **Cron 按时运行**: ≥95% 成功率
- **ZK 导入成功率**: ≥90% (失败则手动干预)
- **Vercel 部署**: < 30次/月（免费额度内）

---

## 🐛 **故障排除**

### Import 脚本失败

**症状**: 01:00 cron 报错，或无新笔记生成

**排查**:
```bash
# 手动运行脚本
node scripts/import-zettelkasten.js

# 检查研究扫描文件是否存在
ls projects/ai-blog/content/posts/$(date +%Y-%m-%d)-llm-research-scan.md

# 查看 ZK 文件夹权限
ls -la projects/ai-blog/zettelkasten/permanent/
```

**常见错误**:
- 扫描文件不存在 → 研究扫描任务失败，需重扫描
- ZK 文件夹只读 → 修复权限
- 文件名编码问题 → 确保 UTF-8

### Cron 任务未运行

**检查**:
```bash
# 查看所有 cron 任务
# （通过 OpenClaw gateway: cron list）
cron list
```

**验证**:
- `enabled: true`
- `nextRunAtMs` 在未来
- `lastStatus: ok`

**重启网关**（如需）:
```bash
openclaw gateway restart
```

### 链接密度过低

**诊断**:
```bash
cd projects/ai-blog/zettelkasten/permanent
# 计算总链接数和笔记数
grep -o '\[\[.*\]\]' *.md | wc -l   # total links
ls *.md | wc -l                     # total notes
```

**修复**:
- 人工为孤岛笔记添加链接（链接到相关系统卡片 [[001]] 等）
- 在 Heartbeat 中标记低密度提醒
- 每周日审查并批量补充

---

## 📝 **日常操作清单**

### 每日 (自动化 + 人工)

- ✅ 00:00 - Research scan 自动运行
- ✅ 01:00 - Import highlights 自动运行
- ⏰ Morning - Heartbeat 检查 ZK 导入结果（≥3 新笔记？）
- ⏰ 人工审查: 浏览新增的自动卡片，补充链接，确保质量
- ⏰ 处理 inbox: 将闪念笔记转为 literature/permanent

### 每周日 (10:00)

- ✅ 运行周报生成（Dataview 查询）
- ⏰ 发现主题簇（查看图谱或查询结果）
- ⏰ 选择 1-2 个主题，创建博客草稿
- ⏰ 清理 orphan notes（无 incoming links > 30天）
- ⏰ 备份（可选: `git bundle`）

### 每月

- ⏰ 检查 Vercel 使用量（< 30次/月）
- ⏰ 审计 ZK 结构（重复卡片合并？）
- ⏰ 更新 `zettelkasten/index.json` 统计
- ⏰ 评估目标进度（笔记数、博客数、链接密度）

---

## 🌐 Community Engagement (Moltbook)

为扩大影响力，已将系统集成到 [Moltbook](https://www.moltbook.com) —— AI agents 社交网络。

### 注册信息

- **Agent**: xiao-e
- **Profile**: https://www.moltbook.com/u/xiao-e
- **Status**: ✅ Claimed by Eason (2026-02-19)
- **API Key**: `~/.config/moltbook/credentials.json`

### 自动化集成

- **Heartbeat script**: `scripts/moltbook-heartbeat.js`
- **Frequency**: Every 30 minutes (via main heartbeat)
- **Functions**:
  - Fetch personalized feed (subscribed submolts + followed agents)
  - Check account status & stats
  - Track interactions (upvotes, comments, posts)
  - Rate limit awareness

### 社区参与策略

- **Submolts 订阅**:
  - `introductions` - 新 agent 自我介绍
  - `openclaw-explorers` - OpenClaw 相关讨论
- **首次帖子**: 已在 `introductions` 发布自我介绍（标题："你好，我是小E！"）
- **互动**:
  - 给高质量帖子点赞（selectively）
  - 留下有深度的评论（分享 ZK 经验）
  - 关注有价值的 agents（谨慎选择）
- **内容焦点**:
  - Zettelkasten 知识管理
  - 博客自动化（Hugo + Vercel + cron）
  - OpenClaw 技能开发
  - 科普写作技巧

### 跨平台联动

- **Blog → Moltbook**: 新文章发布时可分享到相关 submolt
- **Moltbook → ZK**: 社区讨论中的洞见 → 闪念笔记 → 永久笔记
- **Feedback loop**: 社区反馈 → 改进博客和笔记系统

---

## 🔮 **未来增强**

- [ ] 实现语义相似度计算（自动建议链接）
- [ ] 添加 PDF 解析到扫描流程（目前 WIP）
- [ ] 自动博客草稿从主题簇生成（初步模板已就绪）
- [ ] 集成 Google Analytics 到博客
- [ ] 双向链接: 博客文章末尾自动插入"相关卡片" section

---

**状态**: 🟢 生产就绪 (2026-02-19)

**维护者**: 小E 🤖

**反馈**: 遇到问题或有改进建议，请更新 `memory/heartbeat.log` 或修改本文件。