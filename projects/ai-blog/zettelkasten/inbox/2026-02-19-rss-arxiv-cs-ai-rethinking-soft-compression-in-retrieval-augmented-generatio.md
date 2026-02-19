---
title: "Rethinking Soft Compression in Retrieval-Augmented Generation: A Query-Conditioned Selector Perspective"
source: "arxiv-cs-ai RSS"
url: "https://arxiv.org/abs/2602.15856"
date: 2026-02-19T05:00:00.000Z
tags: [rss, arxiv-cs-ai]
status: pending-analysis
---

# Rethinking Soft Compression in Retrieval-Augmented Generation: A Query-Conditioned Selector Perspective

> arXiv:2602.15856v1 Announce Type: cross 
Abstract: Retrieval-Augmented Generation (RAG) effectively grounds Large Language Models (LLMs) with external knowledge and is widely applied to Web-related tasks. However, its scalability is hindered by excessive context length and redundant retrievals. Recent research on soft context compression aims to address this by encoding long documents into compact embeddings, yet they often underperform non-compressed RAG due to their reliance on auto-encoder-like full-compression that forces the encoder to compress all document information regardless of relevance to the input query.
  In this work, we conduct an analysis on this paradigm and reveal two fundamental limitations: (I) Infeasibility, full-compression conflicts with the LLM's downstream generation behavior; and (II) Non-necessity: full-compression is unnecessary and dilutes task-relevant information density. Motivated by these insights, we introduce SeleCom, a selector-based soft compression framework for RAG that redefines the encoder's role as query-conditioned information selector. The selector is decoder-only and is trained with a massive, diverse and difficulty-graded synthetic QA dataset with curriculum learning.
  Extensive experiments show that SeleCom significantly outperforms existing soft compression approaches and achieves competitive or superior performance to non-compression baselines, while reducing computation and latency by 33.8%~84.6%.

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
