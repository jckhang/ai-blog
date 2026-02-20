# 📋 TODO Task Management System

系统化的任务管理方案，整合Heartbeat、主动学习、RSS处理、博客创作等所有任务源。

---

## 🏗️ 目录结构

```
projects/ai-blog/todos/
├── active/              # 当前活跃任务（按类别）
│   ├── learning.json   # 主动学习任务
│   ├── maintenance.json # 系统维护任务（来自Heartbeat）
│   ├── blog.json       # 博客创作任务
│   ├── research.json   # 研究扫描任务
│   └── community.json  # Moltbook社区互动
├── archive/            # 归档（按日期）
│   ├── 2026-02-19/
│   └── 2026-02-20/
├── templates/          # 任务模板（预留）
└── index.json          # 全局索引和统计

```

---

## 🚀 快速开始

### 1. 初始同步

首次使用需要从现有系统同步任务：

```bash
cd projects/ai-blog
node scripts/todo-sync.js
```

这将自动创建：
- Heartbeat日常检查任务（Moltbook、磁盘、ZK健康等）
- 今日主动学习任务（从TODO-ACTIVE-LEARNING-xxx.md）
- RSS待处理items（从rss-db.json）
- 博客草稿审查任务

---

### 2. 查看任务列表

```bash
# 查看所有任务
node scripts/todo-manager.js list

# 按分类筛选
node scripts/todo-manager.js list --category=learning

# 按状态筛选
node scripts/todo-manager.js list --status=pending

# 按优先级筛选（1=最高）
node scripts/todo-manager.js list --priority=1
```

---

### 3. 管理任务

**创建任务**:
```bash
node scripts/todo-manager.js create learning "深度阅读: RLHF论文" \
  --priority=1 \
  --due=2026-02-20 \
  --hours=2 \
  --tags="rl,alignment"
```

**开始任务**:
```bash
node scripts/todo-manager.js start learning-20260220-001
```

**完成任务**:
```bash
node scripts/todo-manager.js complete learning-20260220-001 --hours=1.5
```

**阻塞任务**:
```bash
node scripts/todo-manager.js block learning-20260220-001 "等待论文全文"
```

**添加备注**:
```bash
node scripts/todo-manager.js note learning-20260220-001 "发现关键公式12.3"
```

**链接ZK笔记**:
```bash
node scripts/todo-manager.js link learning-20260220-001 20260220-002
```

---

### 4. 查看统计

```bash
node scripts/todo-manager.js stats
```

输出示例：
```
📊 TODO System Statistics:
   Total active tasks: 23
   Completion rate: 45.2%
   By status:
     - pending: 12
     - in_progress: 5
     - done: 6
     - blocked: 0
   By category:
     - learning: 10
     - maintenance: 6
     - blog: 4
     - research: 2
     - community: 1
```

---

### 5. 生成报告

**每日报告**:
```bash
node scripts/todo-report.js daily
```

输出: `projects/ai-blog/reports/todo-report-2026-02-20.md`

**每周报告**:
```bash
node scripts/todo-report.js weekly
```

输出: `projects/ai-blog/reports/todo-report-week-8.md`

---

## 🔄 集成到现有流程

### Heartbeat集成

在 `HEARTBEAT.md` 的任务检查中，添加：

```bash
# 在每个心跳周期执行
node scripts/todo-manager.js stats > memory/heartbeat-todo.log
```

### 自动同步

建议每小时执行一次同步（在Heartbeat中调用）：

```bash
# scripts/heartbeat-sync-todo.sh
#!/bin/bash
cd /Users/yuxiang/workspaces/my_openclaw/.openclaw/workspace/projects/ai-blog
node scripts/todo-sync.js >> memory/todo-sync.log 2>&1
```

---

## 📊 任务数据结构

```json
{
  "id": "learning-20260220-001",
  "title": "深度阅读: LLM Agent架构",
  "description": "从Lilian Weng博客提取三大组件",
  "category": "learning",
  "priority": 1,
  "status": "pending",
  "created_at": "2026-02-20T08:45:00Z",
  "updated_at": "2026-02-20T08:45:00Z",
  "due_date": "2026-02-20",
  "estimated_hours": 1.5,
  "actual_hours": null,
  "dependencies": [],
  "tags": ["agent", "architecture"],
  "source": "active-learning-plan",
  "notes": [
    {
      "timestamp": "2026-02-20T09:00:00Z",
      "content": "已提取Planning组件细节"
    }
  ],
  "linked_items": {
    "zk_notes": ["20260220-002"],
    "blog_posts": [],
    "rss_item_ids": [12345]
  }
}
```

---

## 🎯 优先级定义

| 优先级 | 含义 | 示例 |
|--------|------|------|
| 1 | 紧急重要（今天必须做） | 修复生产环境bug、完成博客草稿 |
| 2 | 重要但不紧急（本周完成） | 深度阅读、系统优化 |
| 3 | 常规任务（按计划进行） | 日常检查、小改进 |
| 4 | 低优先级（有空再做） | 文档整理、重构 |
| 5 | 待定/搁置 | 需要更多信息 |

---

## 📈 状态流转

```
pending → in_progress → done
    ↓
  blocked (需要手动解除)
```

---

## 🏷️ 分类说明

| 分类 | 说明 | 典型来源 |
|------|------|----------|
| learning | 主动学习（深度阅读、技术笔记） | 主动学习计划、RSS内容 |
| maintenance | 系统维护（Heartbeat检查项） | Heartbeat清单 |
| blog | 博客创作与发布 | 草稿、发布流程 |
| research | 研究扫描（自动化任务） | Cron任务 |
| community | 社区互动 | Moltbook、社交媒体 |

---

## 🔧 脚本参考

| 脚本 | 用途 |
|------|------|
| `scripts/todo-manager.js` | 核心CRUD操作 |
| `scripts/todo-sync.js` | 从各源同步任务 |
| `scripts/todo-report.js` | 生成日报/周报 |

---

## 📝 最佳实践

1. **任务粒度**: 每个任务2-4小时可完成，避免过大
2. **每日目标**: 选择1-3个高优先级任务重点完成
3. **链接追踪**: 任务完成后链接相关ZK笔记/博客
4. **时间记录**: 完成后立即记录实际耗时（--hours）
5. **阻塞处理**: 遇到阻塞立即标记，避免无限等待

---

## 🎯 成功指标

- **完成率**: ≥80%（避免任务堆积）
- **平均延迟**: <24小时（优先级1任务）
- **时间估算误差**: <50%（逐步改进）

---

**Version**: 1.0  
**Created**: 2026-02-20  
**Author**: 小E (Eason's AI Assistant)
