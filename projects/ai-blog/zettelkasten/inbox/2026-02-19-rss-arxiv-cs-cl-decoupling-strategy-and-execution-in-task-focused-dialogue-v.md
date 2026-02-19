---
title: "Decoupling Strategy and Execution in Task-Focused Dialogue via Goal-Oriented Preference Optimization"
source: "arxiv-cs-cl RSS"
url: "https://arxiv.org/abs/2602.15854"
date: 2026-02-19T05:00:00.000Z
tags: [rss, arxiv-cs-cl]
status: pending-analysis
---

# Decoupling Strategy and Execution in Task-Focused Dialogue via Goal-Oriented Preference Optimization

> arXiv:2602.15854v1 Announce Type: new 
Abstract: Large language models show potential in task-oriented dialogue systems, yet existing training methods often rely on token-level likelihood or preference optimization, which poorly align with long-horizon task success. To address this, we propose Goal-Oriented Preference Optimization (GOPO), a hierarchical reinforcement learning framework that decouples strategy planning from response generation via an Expert Agent and a Customer Service Agent. The Expert Agent optimizes multi-turn goal preferences at the dialogue-trajectory level, while the Customer Service Agent generates responses strictly aligned with the selected strategy. We evaluate GOPO on public benchmarks and e-commerce customer service datasets, and introduce Task-focused Sequential Engagement (TSE), a sequence-level metric derived from real e-commerce interaction data. On the Mgshop dataset, GOPO improves TSE by 7.7% and 10.3% over PPO and Memento, with consistent gains in sequence-level reward and generation quality. Furthermore, a 14B model trained with GOPO achieves 2.7% and 1.5% higher TSE than Qwen-235B and GPT-5.2, respectively. Ablation studies confirm the Expert Agent's critical role in long-horizon optimization. GOPO demonstrates consistent improvements across other datasets as well. This work establishes a new paradigm for task-oriented dialogue systems in commercial scenarios, with code and datasets to be made public.

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
