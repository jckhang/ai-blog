---
title: "Edge-Local and Qubit-Efficient Quantum Graph Learning for the NISQ Era"
source: "arxiv-cs-lg RSS"
url: "https://arxiv.org/abs/2602.16018"
date: 2026-02-19T05:00:00.000Z
tags: [rss, arxiv-cs-lg]
status: pending-analysis
---

# Edge-Local and Qubit-Efficient Quantum Graph Learning for the NISQ Era

> arXiv:2602.16018v1 Announce Type: cross 
Abstract: Graph neural networks (GNNs) are a powerful framework for learning representations from graph-structured data, but their direct implementation on near-term quantum hardware remains challenging due to circuit depth, multi-qubit interactions, and qubit scalability constraints. In this work, we introduce a fully quantum graph convolutional architecture designed explicitly for unsupervised learning in the noisy intermediate-scale quantum (NISQ) regime. Our approach combines a variational quantum feature extraction layer with an edge-local and qubit-efficient quantum message-passing mechanism inspired by the Quantum Alternating Operator Ansatz (QAOA) framework. Unlike prior models that rely on global operations or multi-controlled unitaries, our model decomposes message passing into pairwise interactions along graph edges using only hardware-native single- and two-qubit gates. This design reduces the qubit requirement from $O(Nn)$ to $O(n)$ for a graph with $N$ nodes and $n$-qubit feature registers, enabling implementation on current quantum devices regardless of graph size. We train the model using the Deep Graph Infomax objective to perform unsupervised node representation learning. Experiments on the Cora citation network and a large-scale genomic SNP dataset demonstrate that our model remains competitive with prior quantum and hybrid approaches.

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
