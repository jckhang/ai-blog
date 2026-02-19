---
title: "Chain of Thought in Order: Discovering Learning-Friendly Orders for Arithmetic"
source: "arxiv-cs-lg RSS"
url: "https://arxiv.org/abs/2506.23875"
date: 2026-02-19T05:00:00.000Z
tags: [rss, arxiv-cs-lg]
status: pending-analysis
---

# Chain of Thought in Order: Discovering Learning-Friendly Orders for Arithmetic

> arXiv:2506.23875v3 Announce Type: replace 
Abstract: The chain of thought, i.e., step-by-step reasoning, is one of the fundamental mechanisms of Transformers. While the design of intermediate reasoning steps has been extensively studied and shown to critically influence performance on mathematical, multi-step reasoning tasks, the ordering of these steps has received little attention, despite its significant effect on the difficulty of reasoning. This study addresses a novel task of unraveling the chain of thought -- reordering decoder input tokens into a learning-friendly sequence for Transformers, for learning arithmetic tasks. The proposed pipeline first trains a Transformer on a mixture of target sequences arranged in different orders and then identifies benign orders as those with fast loss drops in the early stage. As the search space grows factorially in sequence length, we propose a two-stage hierarchical approach for inter- and intra-block reordering. Experiments on seven order-sensitive arithmetic tasks show that our method identifies a learning-friendly order out of a few billion candidates. Notably, it recovered the reverse-digit order reported in prior studies for the multiplication task.

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
