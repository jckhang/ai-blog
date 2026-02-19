---
title: "Beyond SGD, Without SVD: Proximal Subspace Iteration LoRA with Diagonal Fractional K-FAC"
source: "arxiv-cs-lg RSS"
url: "https://arxiv.org/abs/2602.16456"
date: 2026-02-19T05:00:00.000Z
tags: [rss, arxiv-cs-lg]
status: pending-analysis
---

# Beyond SGD, Without SVD: Proximal Subspace Iteration LoRA with Diagonal Fractional K-FAC

> arXiv:2602.16456v1 Announce Type: new 
Abstract: Low-Rank Adaptation (LoRA) fine-tunes large models by learning low-rank updates on top of frozen weights, dramatically reducing trainable parameters and memory. In this work, we address the gap between training with full steps with low-rank projections (SVDLoRA) and LoRA fine-tuning. We propose LoRSum, a memory-efficient subroutine that closes this gap for gradient descent by casting LoRA optimization as a proximal sub-problem and solving it efficiently with alternating least squares updates, which we prove to be an implicit block power method. We recover several recently proposed preconditioning methods for LoRA as special cases, and show that LoRSum can also be used for updating a low-rank momentum. In order to address full steps with preconditioned gradient descent, we propose a scaled variant of LoRSum that uses structured metrics such as K-FAC and Shampoo, and we show that storing the diagonal of these metrics still allows them to perform well while remaining memory-efficient. Experiments on a synthetic task, CIFAR-100, and language-model fine-tuning on GLUE, SQuAD v2, and WikiText-103, show that our method can match or improve LoRA baselines given modest compute overhead, while avoiding full-matrix SVD projections and retaining LoRA-style parameter efficiency.

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
