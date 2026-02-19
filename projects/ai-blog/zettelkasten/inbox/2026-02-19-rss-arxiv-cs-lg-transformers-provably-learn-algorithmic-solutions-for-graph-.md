---
title: "Transformers Provably Learn Algorithmic Solutions for Graph Connectivity, But Only with the Right Data"
source: "arxiv-cs-lg RSS"
url: "https://arxiv.org/abs/2510.19753"
date: 2026-02-19T05:00:00.000Z
tags: [rss, arxiv-cs-lg]
status: pending-analysis
---

# Transformers Provably Learn Algorithmic Solutions for Graph Connectivity, But Only with the Right Data

> arXiv:2510.19753v2 Announce Type: replace 
Abstract: Transformers often fail to learn generalizable algorithms, instead relying on brittle heuristics. Using graph connectivity as a testbed, we explain this phenomenon both theoretically and empirically. We consider a simplified Transformer architecture, the Disentangled Transformer, and prove that an $L$-layer model can compute connectivity in graphs with diameters up to $3^L$, implementing an algorithm equivalent to computing powers of the adjacency matrix. By analyzing training dynamics, we prove that whether the model learns this strategy hinges on whether most training instances are within this model capacity. Within-capacity graphs (diameter $\leq 3^L$) drive the learning of the algorithmic solution while beyond-capacity graphs drive the learning of a simple heuristic based on node degrees. Finally, we empirically show that restricting training data to stay within a model's capacity makes both standard and Disentangled Transformers learn the exact algorithm.

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
