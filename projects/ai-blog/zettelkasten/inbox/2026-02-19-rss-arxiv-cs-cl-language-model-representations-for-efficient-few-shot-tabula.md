---
title: "Language Model Representations for Efficient Few-Shot Tabular Classification"
source: "arxiv-cs-cl RSS"
url: "https://arxiv.org/abs/2602.15844"
date: 2026-02-19T05:00:00.000Z
tags: [rss, arxiv-cs-cl]
status: pending-analysis
---

# Language Model Representations for Efficient Few-Shot Tabular Classification

> arXiv:2602.15844v1 Announce Type: new 
Abstract: The Web is a rich source of structured data in the form of tables, from product catalogs and knowledge bases to scientific datasets. However, the heterogeneity of the structure and semantics of these tables makes it challenging to build a unified method that can effectively leverage the information they contain. Meanwhile, Large language models (LLMs) are becoming an increasingly integral component of web infrastructure for tasks like semantic search. This raises a crucial question: can we leverage these already-deployed LLMs to classify structured data in web-native tables (e.g., product catalogs, knowledge base exports, scientific data portals), avoiding the need for specialized models or extensive retraining? This work investigates a lightweight paradigm, $\textbf{Ta}$ble $\textbf{R}$epresentation with $\textbf{L}$anguage Model~($\textbf{TaRL}$), for few-shot tabular classification that directly utilizes semantic embeddings of individual table rows. We first show that naive application of these embeddings underperforms compared to specialized tabular models. We then demonstrate that their potentials can be unlocked with two key techniques: removing the common component from all embeddings and calibrating the softmax temperature. We show that a simple meta-learner, trained on handcrafted features, can learn to predict an appropriate temperature. This approach achieves performance comparable to state-of-the-art models in low-data regimes ($k \leq 32$) of semantically-rich tables. Our findings demonstrate the viability of reusing existing LLM infrastructure for efficient semantics-driven pathway to reuse existing LLM infrastructure for Web table understanding.

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
