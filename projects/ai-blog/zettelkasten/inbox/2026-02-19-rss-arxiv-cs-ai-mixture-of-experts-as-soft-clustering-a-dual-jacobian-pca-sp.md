---
title: "Mixture-of-Experts as Soft Clustering: A Dual Jacobian-PCA Spectral Geometry Perspective"
source: "arxiv-cs-ai RSS"
url: "https://arxiv.org/abs/2601.11616"
date: 2026-02-19T05:00:00.000Z
tags: [rss, arxiv-cs-ai]
status: pending-analysis
---

# Mixture-of-Experts as Soft Clustering: A Dual Jacobian-PCA Spectral Geometry Perspective

> arXiv:2601.11616v2 Announce Type: replace-cross 
Abstract: Mixture-of-Experts (MoE) architectures are widely used for efficiency and conditional computation, but their effect on the geometry of learned functions and representations remains poorly understood. We study MoEs through a geometric lens, interpreting routing as soft partitioning into overlapping expert-local charts. We introduce a Dual Jacobian-PCA spectral probe that analyzes local function geometry via Jacobian singular value spectra and representation geometry via weighted PCA of routed hidden states. Using a controlled MLP-MoE setting with exact Jacobian computation, we compare dense, Top-k, and fully soft routing under matched capacity. Across random seeds, MoE routing consistently reduces local sensitivity: expert-local Jacobians show smaller leading singular values and faster spectral decay than dense baselines. Weighted PCA reveals that expert-local representations distribute variance across more principal directions, indicating higher effective rank. We further observe low alignment among expert Jacobians, suggesting decomposition into low-overlap expert-specific transformations. Routing sharpness modulates these effects: Top-k routing yields more concentrated, lower-rank expert structure, while fully soft routing produces broader, higher-rank representations. Experiments on a 3-layer transformer with WikiText confirm curvature reduction on natural language and show lower cross-expert alignment for Top-k routing. These findings support interpreting MoEs as soft partitionings of function space that flatten local curvature while redistributing representation variance, yielding testable predictions for expert scaling, hallucination reduction, and ensemble diversity.

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
