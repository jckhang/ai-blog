---
title: "Variable-Length Semantic IDs for Recommender Systems"
source: "arxiv-cs-cl RSS"
url: "https://arxiv.org/abs/2602.16375"
date: 2026-02-19T05:00:00.000Z
tags: [rss, arxiv-cs-cl]
status: pending-analysis
---

# Variable-Length Semantic IDs for Recommender Systems

> arXiv:2602.16375v1 Announce Type: cross 
Abstract: Generative models are increasingly used in recommender systems, both for modeling user behavior as event sequences and for integrating large language models into recommendation pipelines. A key challenge in this setting is the extremely large cardinality of item spaces, which makes training generative models difficult and introduces a vocabulary gap between natural language and item identifiers. Semantic identifiers (semantic IDs), which represent items as sequences of low-cardinality tokens, have recently emerged as an effective solution to this problem.
  However, existing approaches generate semantic identifiers of fixed length, assigning the same description length to all items. This is inefficient, misaligned with natural language, and ignores the highly skewed frequency structure of real-world catalogs, where popular items and rare long-tail items exhibit fundamentally different information requirements. In parallel, the emergent communication literature studies how agents develop discrete communication protocols, often producing variable-length messages in which frequent concepts receive shorter descriptions. Despite the conceptual similarity, these ideas have not been systematically adopted in recommender systems.
  In this work, we bridge recommender systems and emergent communication by introducing variable-length semantic identifiers for recommendation. We propose a discrete variational autoencoder with Gumbel-Softmax reparameterization that learns item representations of adaptive length under a principled probabilistic framework, avoiding the instability of REINFORCE-based training and the fixed-length constraints of prior semantic ID methods.

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
