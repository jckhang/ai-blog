---
title: "Fast KV Compaction via Attention Matching"
source: "arxiv-cs-lg RSS"
url: "https://arxiv.org/abs/2602.16284"
date: 2026-02-19T05:00:00.000Z
tags: [rss, arxiv-cs-lg]
status: pending-analysis
---

# Fast KV Compaction via Attention Matching

> arXiv:2602.16284v1 Announce Type: new 
Abstract: Scaling language models to long contexts is often bottlenecked by the size of the key-value (KV) cache. In deployed settings, long contexts are typically managed through compaction in token space via summarization. However, summarization can be highly lossy, substantially harming downstream performance. Recent work on Cartridges has shown that it is possible to train highly compact KV caches in latent space that closely match full-context performance, but at the cost of slow and expensive end-to-end optimization. This work describes an approach for fast context compaction in latent space through Attention Matching, which constructs compact keys and values to reproduce attention outputs and preserve attention mass at a per-KV-head level. We show that this formulation naturally decomposes into simple subproblems, some of which admit efficient closed-form solutions. Within this framework, we develop a family of methods that significantly push the Pareto frontier of compaction time versus quality, achieving up to 50x compaction in seconds on some datasets with little quality loss.

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
