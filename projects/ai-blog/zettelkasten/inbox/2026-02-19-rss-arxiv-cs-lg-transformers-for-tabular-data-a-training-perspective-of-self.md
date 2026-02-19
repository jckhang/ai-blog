---
title: "Transformers for Tabular Data: A Training Perspective of Self-Attention via Optimal Transport"
source: "arxiv-cs-lg RSS"
url: "https://arxiv.org/abs/2512.09530"
date: 2026-02-19T05:00:00.000Z
tags: [rss, arxiv-cs-lg]
status: pending-analysis
---

# Transformers for Tabular Data: A Training Perspective of Self-Attention via Optimal Transport

> arXiv:2512.09530v2 Announce Type: replace-cross 
Abstract: This thesis examines self-attention training through the lens of Optimal Transport (OT) and develops an OT-based alternative for tabular classification. The study tracks intermediate projections of the self-attention layer during training and evaluates their evolution using discrete OT metrics, including Wasserstein distance, Monge gap, optimality, and efficiency. Experiments are conducted on classification tasks with two and three classes, as well as on a biomedical dataset.
  Results indicate that the final self-attention mapping often approximates the OT optimal coupling, yet the training trajectory remains inefficient. Pretraining the MLP section on synthetic data partially improves convergence but is sensitive to their initialization. To address these limitations, an OT-based algorithm is introduced: it generates class-specific dummy Gaussian distributions, computes an OT alignment with the data, and trains an MLP to generalize this mapping. The method achieves accuracy comparable to Transformers while reducing computational cost and scaling more efficiently under standardized inputs, though its performance depends on careful dummy-geometry design. All experiments and implementations are conducted in R.

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
