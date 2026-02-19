---
id: 016
title: LLM 研究自动化流水线
created: 2026-02-19
tags: ["automation", "research", "blog"]
aliases: ["研究扫描自动化"]
---

# LLM 研究自动化流水线

通过 OpenClaw cron 任务，实现每日 00:00 自动执行深度研究扫描，产出可直接发布的博客文章。

## 核心机制

- **触发**: `0 0 * * *` (Asia/Shanghai 午夜)
- **超时**: 3600s (1小时深度研究)
- **输出**: `YYYY-MM-DD-llm-research-scan.md`

> 🔗 相关: [[017-深度研究工具链]]

## 技术栈

1. **搜索**: Perplexity Sonar Pro (OpenRouter)
2. **阅读**: `web_fetch` 抓取全文，`pdf-parse` 解码论文
3. **代码**: `git clone` 仓库结构分析
4. **去重**: 基于时间窗和内容指纹
5. **发布**: 自动 git commit + Vercel deploy

## 设计原则

- ⏰ **定时性**: 精确到小时，适合生产任务
- 🔬 **深度**: 最低 800 字，信息密集
- 🎯 **有用**: 聚焦 LLM/Agent/Multimodal
- 📝 **可读**: 科普风格（5-80岁）

## 类似应用

- 个人科研监控
- 行业动态日报
- 技术趋势周报

---
**经验**: 自动化研究的关键是**定义清晰的问题**，而非开放探索。让 LLM 聚焦到"重大发布/突破"而非所有噪音。