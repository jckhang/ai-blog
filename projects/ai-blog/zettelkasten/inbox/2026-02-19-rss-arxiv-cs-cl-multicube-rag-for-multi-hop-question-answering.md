---
title: "MultiCube-RAG for Multi-hop Question Answering"
source: "arxiv-cs-cl RSS"
url: "https://arxiv.org/abs/2602.15898"
date: 2026-02-19T05:00:00.000Z
tags: [rss, arxiv-cs-cl]
status: pending-analysis
---

# MultiCube-RAG for Multi-hop Question Answering

> arXiv:2602.15898v1 Announce Type: new 
Abstract: Multi-hop question answering (QA) necessitates multi-step reasoning and retrieval across interconnected subjects, attributes, and relations. Existing retrieval-augmented generation (RAG) methods struggle to capture these structural semantics accurately, resulting in suboptimal performance. Graph-based RAGs structure such information in graphs, but the resulting graphs are often noisy and computationally expensive. Moreover, most methods rely on single-step retrieval, neglecting the need for multi-hop reasoning processes. Recent training-based approaches attempt to incentivize the large language models (LLMs) for iterative reasoning and retrieval, but their training processes are prone to unstable convergence and high computational overhead. To address these limitations, we devise an ontology-based cube structure with multiple and orthogonal dimensions to model structural subjects, attributes, and relations. Built on the cube structure, we propose MultiCube-RAG, a training-free method consisting of multiple cubes for multi-step reasoning and retrieval. Each cube specializes in modeling a class of subjects, so that MultiCube-RAG flexibly selects the most suitable cubes to acquire the relevant knowledge precisely. To enhance the query-based reasoning and retrieval, our method decomposes a complex multi-hop query into a set of simple subqueries along cube dimensions and conquers each of them sequentially. Experiments on four multi-hop QA datasets show that MultiCube-RAG improves response accuracy by 8.9% over the average performance of various baselines. Notably, we also demonstrate that our method performs with greater efficiency and inherent explainability.

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
