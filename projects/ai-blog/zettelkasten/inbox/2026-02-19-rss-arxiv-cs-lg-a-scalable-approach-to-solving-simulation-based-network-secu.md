---
title: "A Scalable Approach to Solving Simulation-Based Network Security Games"
source: "arxiv-cs-lg RSS"
url: "https://arxiv.org/abs/2602.16564"
date: 2026-02-19T05:00:00.000Z
tags: [rss, arxiv-cs-lg]
status: pending-analysis
---

# A Scalable Approach to Solving Simulation-Based Network Security Games

> arXiv:2602.16564v1 Announce Type: new 
Abstract: We introduce MetaDOAR, a lightweight meta-controller that augments the Double Oracle / PSRO paradigm with a learned, partition-aware filtering layer and Q-value caching to enable scalable multi-agent reinforcement learning on very large cyber-network environments. MetaDOAR learns a compact state projection from per node structural embeddings to rapidly score and select a small subset of devices (a top-k partition) on which a conventional low-level actor performs focused beam search utilizing a critic agent. Selected candidate actions are evaluated with batched critic forwards and stored in an LRU cache keyed by a quantized state projection and local action identifiers, dramatically reducing redundant critic computation while preserving decision quality via conservative k-hop cache invalidation. Empirically, MetaDOAR attains higher player payoffs than SOTA baselines on large network topologies, without significant scaling issues in terms of memory usage or training time. This contribution provide a practical, theoretically motivated path to efficient hierarchical policy learning for large-scale networked decision problems.

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
