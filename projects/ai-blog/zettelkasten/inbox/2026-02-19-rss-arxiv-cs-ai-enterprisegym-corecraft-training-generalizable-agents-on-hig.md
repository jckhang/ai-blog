---
title: "EnterpriseGym Corecraft: Training Generalizable Agents on High-Fidelity RL Environments"
source: "arxiv-cs-ai RSS"
url: "https://arxiv.org/abs/2602.16179"
date: 2026-02-19T05:00:00.000Z
tags: [rss, arxiv-cs-ai]
status: pending-analysis
---

# EnterpriseGym Corecraft: Training Generalizable Agents on High-Fidelity RL Environments

> arXiv:2602.16179v1 Announce Type: new 
Abstract: We show that training AI agents on high-fidelity reinforcement learning environments produces capabilities that generalize beyond the training distribution. We introduce \corecraft{}, the first environment in \textsc{EnterpriseGym}, Surge AI's suite of agentic RL environments. \corecraft{} is a fully operational enterprise simulation of a customer support organization, comprising over 2,500 entities across 14 entity types with 23 unique tools, designed to measure whether AI agents can perform the multi-step, domain-specific work that real jobs demand. Frontier models such as GPT-5.2 and Claude Opus 4.6 solve fewer than 30\% of tasks when all expert-authored rubric criteria must be satisfied. Using this environment, we train GLM~4.6 with Group Relative Policy Optimization (GRPO) and adaptive clipping. After a single epoch of training, the model improves from 25.37\% to 36.76\% task pass rate on held-out evaluation tasks. More importantly, these gains transfer to out-of-distribution benchmarks: +4.5\% on BFCL Parallel, +7.4\% on $\tau^2$-Bench Retail, and +6.8\% on Toolathlon (Pass@1). We believe three environment properties are consistent with the observed transfer: task-centric world building that optimizes for diverse, challenging tasks; expert-authored rubrics enabling reliable reward computation; and enterprise workflows that reflect realistic professional patterns. Our results suggest that environment quality, diversity, and realism are key factors enabling generalizable agent capabilities.

## Full Content

⚠️ 内容抓取延迟到分析阶段。使用 web_fetch(url) 或 Jina AI 补充。

## Analysis Checklist

- [ ] 阅读全文并提取关键观点
- [ ] 与现有 ZK 笔记建立链接
- [ ] 确定是否转为永久笔记
- [ ] 添加适当的标签和元数据
- [ ] 更新摘要

## Related

- 
