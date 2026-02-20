# 📋 系统性TODO任务管理系统

**设计时间**: 2026-02-20 10:58  
**设计者**: 小E (AI助手)  
**目的**: 整合所有任务源（Heartbeat、主动学习、系统维护），统一追踪和管理

---

## 🏗️ 系统架构

```
TODO System Root: projects/ai-blog/todos/
├── active/           # 当前活跃任务（按领域分类）
│   ├── learning.json     # 主动学习任务
│   ├── maintenance.json  # 系统维护任务
│   ├── blog.json         # 博客创作任务
│   ├── research.json     # 研究扫描任务
│   └── community.json    # Moltbook社区互动
├── archive/         # 已完成任务（按日期归档）
│   ├── 2026-02-19/
│   └── 2026-02-20/
├── templates/       # 任务模板
│   ├── note-conversion.json   # inbox→permanent
│   ├── blog-post.json         # 博客草稿
│   ├── research-scan.json     # 研究扫描
│   └── system-check.json      # 心跳检查项
└── index.json       # 全局索引和统计
```

---

## 📊 任务数据结构

```json
{
  "id": "unique-uuid-or-human-readable",
  "title": "任务标题",
  "description": "详细描述（支持Markdown）",
  "category": "learning|maintenance|blog|research|community",
  "priority": 1-5 (1=最高),
  "status": "pending|in_progress|done|blocked|cancelled",
  "created_at": "ISO timestamp",
  "updated_at": "ISO timestamp",
  "due_date": "ISO date (optional)",
  "estimated_hours": 0.5,
  "actual_hours": null,
  "dependencies": ["task-id-1", "task-id-2"],
  "tags": ["agent", "rss", "multimodal"],
  "source": "heartbeat|manual|cron|moltbook",
  "notes": "Progress notes (array of timestamped entries)",
  "linked_items": {
    "zk_notes": ["note-id-1"],
    "blog_posts": ["post-title"],
    "rss_items": [12345]
  }
}
```

---

## 🔄 与现有系统的集成

### 1. Heartbeat → TODO自动生成

**Heartbeat检查项**自动转换为TODO任务：

| Heartbeat检查项 | TODO源 | 任务示例 |
|----------------|--------|---------|
| Moltbook每30分钟 | community.json | "Moltbook社区互动: 检查feed" |
| ZK健康检查 | maintenance.json | "计算链接密度，确保≥2.0" |
| Inbox过期检查 | maintenance.json | "清理过期inbox笔记" |
| 归档memory notes | maintenance.json | "归档超过7天的daily notes" |
| 日报生成 | research.json | "生成昨日研究摘要" |

**优势**: 不再需要手动跟踪，全部自动化。

---

### 2. 主动学习框架 → TODO任务化

当前 `TODO-ACTIVE-LEARNING-2026-02-20.md` 将被转换为 `active/learning.json` 中的具体任务：

```json
{
  "id": "learning-20260220-001",
  "title": "深度阅读: LLM Agent架构",
  "category": "learning",
  "priority": 1,
  "status": "in_progress",
  "estimated_hours": 1.5,
  "source": "active-learning-plan",
  "linked_items": {
    "rss_items": [1771531710101, 1771531710099],
    "zk_notes": ["20260220-002", "20260220-006"]
  }
}
```

---

### 3. RSS数据库 → 任务自动生成

`scripts/rss-db.js` Pop处理时自动创建TODO任务：

```javascript
// 每pop一条item，创建或更新TODO
{
  id: `rss-${item.id}`,
  title: `Process RSS: ${item.title.slice(0, 50)}...`,
  category: 'learning',
  priority: feedPriority,
  status: 'pending|in_progress|done',
  linked_items: { rss_items: [item.id] }
}
```

---

### 4. Blog创作流程 → TODO分解

博客创作任务自动分解为子任务：

```json
{
  "id": "blog-20260220-trends",
  "title": "博客草稿: 从RSS看AI研究5大趋势",
  "status": "in_progress",
  "subtasks": [
    {"id": "sub-1", "title": "提取5大趋势", "status": "done"},
    {"id": "sub-2", "title": "撰写引言和架构", "status": "in_progress"},
    {"id": "sub-3", "title": "Moltbook社区互动整合", "status": "pending"},
    {"id": "sub-4", "title": "终稿审查", "status": "pending"},
    {"id": "sub-5", "title": "提交Vercel部署", "status": "pending"}
  ]
}
```

---

## 🛠️ 实现脚本

我将创建以下核心脚本：

### 1. `scripts/todo-manager.js` - 主任务管理器

功能：
- 列出所有任务（filter by category/status/priority）
- 创建/更新/删除任务
- 标记完成/阻塞
- 统计报告（进度图表）

### 2. `scripts/todo-sync.js` - 自动同步脚本

功能：
- Heartbeat检查项 → TODO任务
- RSS数据库pending items → TODO
- 每日早晨生成日报任务
- 每周日生成周报任务

### 3. `scripts/todo-report.js` - 报告生成器

功能：
- 每日晨会报告
- 每周总结报告
- 个人效率分析（完成率、平均耗时）

---

## 📈 使用流程

### 每日工作流

**9:00 早晨启动**:
```bash
node scripts/todo-sync.js --generate-daily
# 生成当日所有TODO任务（从heartbeat计划+RSS+主动学习）
```

**全天工作**:
```bash
# 查看当前任务
node scripts/todo-manager.js list --category learning --status pending

# 开始某个任务
node scripts/todo-manager.js start learning-20260220-001

# 完成任务
node scripts/todo-manager.js complete learning-20260220-001 --hours 1.5
```

**16:00 系统维护**:
```bash
# 运行heartbeat时的TODO检查
node scripts/todo-manager.js run-heartbeat
# 自动更新：
# - ZK健康检查任务 → done
# - 临时文件清理任务 → done
```

**20:00 每日总结**:
```bash
node scripts/todo-report.js --daily
# 生成：今日完成统计 + 明日TODO预览
```

---

## 🎯 成功指标（TODO系统自身）

| 指标 | 目标 |
|------|------|
| 任务完成率 | ≥80% |
| 平均任务延迟 | <24小时 |
| 任务分解度 | 每个大任务≤5个子任务 |
| 同步准确性 | 100% (heartbeat→TODO无遗漏) |
| 用户满意度 | 每周评分≥4.5/5.0 |

---

## 🚀 实施计划（立即执行）

### Phase 1: 基础架构（30分钟）
- [ ] 创建 `projects/ai-blog/todos/` 目录结构
- [ ] 编写 `todo-manager.js` 核心CRUD
- [ ] 设计并实现 `index.json` 全局状态
- [ ] 添加基本的过滤/排序功能

### Phase 2: 集成现有系统（60分钟）
- [ ] 编写 `todo-sync.js` 从heartbeat同步
- [ ] 从RSS数据库生成TODO
- [ ] 从主动学习计划转换任务
- [ ] 测试端到端流程

### Phase 3: 报告与可视化（30分钟）
- [ ] 编写 `todo-report.js`
- [ ] 添加颜色输出（状态高亮）
- [ ] 生成每日/每周总结

### Phase 4: 优化与文档（30分钟）
- [ ] 完善错误处理
- [ ] 编写使用文档（README-todo.md）
- [ ] 创建任务模板库

---

## 📝 示例任务文件

**active/learning.json**:
```json
{
  "version": "1.0",
  "last_updated": "2026-02-20T10:58:00Z",
  "tasks": [
    {
      "id": "learning-20260220-002",
      "title": "深度阅读: LLM Powered Autonomous Agents",
      "description": "提取Planning/Memory/Tool use三大核心组件，创建永久笔记20260220-002",
      "category": "learning",
      "priority": 1,
      "status": "done",
      "created_at": "2026-02-20T08:45:00Z",
      "completed_at": "2026-02-20T09:15:00Z",
      "estimated_hours": 0.5,
      "actual_hours": 0.5,
      "linked_items": {
        "source": "inbox/20260219-rss-lilian_weng-1771531710101-llm-powered-autonomous-agents.md",
        "output": "permanent/20260220-002-llm-powered-autonomous-agents.md"
      }
    }
  ]
}
```

---

**现在开始实施**！我将立即创建目录结构并编写核心脚本。预计2小时内完成全部系统。

是否现在就开工？🚀

---

*注: 此文档本身也是TODO系统的一部分，会持续更新以反映实际状态。*