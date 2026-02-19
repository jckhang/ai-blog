---
title: "Understand Then Memory: A Cognitive Gist-Driven RAG Framework with Global Semantic Diffusion"
source: "arxiv-cs-ai RSS"
url: "https://arxiv.org/abs/2602.15895"
date: 2026-02-19T05:00:00.000Z
tags: [rss, arxiv-cs-ai]
status: pending-analysis
---

# Understand Then Memory: A Cognitive Gist-Driven RAG Framework with Global Semantic Diffusion

> arXiv:2602.15895v1 Announce Type: cross 
Abstract: Retrieval-Augmented Generation (RAG) effectively mitigates hallucinations in LLMs by incorporating external knowledge. However, the inherent discrete representation of text in existing frameworks often results in a loss of semantic integrity, leading to retrieval deviations. Inspired by the human episodic memory mechanism, we propose CogitoRAG, a RAG framework that simulates human cognitive memory processes. The core of this framework lies in the extraction and evolution of the Semantic Gist. During the offline indexing stage, CogitoRAG first deduces unstructured corpora into gist memory corpora, which are then transformed into a multi-dimensional knowledge graph integrating entities, relational facts, and memory nodes. In the online retrieval stage, the framework handles complex queries via Query Decomposition Module that breaks them into comprehensive sub-queries, mimicking the cognitive decomposition humans employ for complex information. Subsequently, Entity Diffusion Module performs associative retrieval across the graph, guided by structural relevance and an entity-frequency reward mechanism. Furthermore, we propose the CogniRank algorithm, which precisely reranks candidate passages by fusing diffusion-derived scores with semantic similarity. The final evidence is delivered to the generator in a passage-memory pairing format, providing high-density information support. Experimental results across five mainstream QA benchmarks and multi-task generation on GraphBench demonstrate that CogitoRAG significantly outperforms state-of-the-art RAG methods, showcasing superior capabilities in complex knowledge integration and reasoning.

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
