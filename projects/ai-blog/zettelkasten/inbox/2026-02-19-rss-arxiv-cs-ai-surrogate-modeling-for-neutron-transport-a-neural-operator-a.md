---
title: "Surrogate Modeling for Neutron Transport: A Neural Operator Approach"
source: "arxiv-cs-ai RSS"
url: "https://arxiv.org/abs/2602.15890"
date: 2026-02-19T05:00:00.000Z
tags: [rss, arxiv-cs-ai]
status: pending-analysis
---

# Surrogate Modeling for Neutron Transport: A Neural Operator Approach

> arXiv:2602.15890v1 Announce Type: cross 
Abstract: This work introduces a neural operator based surrogate modeling framework for neutron transport computation. Two architectures, the Deep Operator Network (DeepONet) and the Fourier Neural Operator (FNO), were trained for fixed source problems to learn the mapping from anisotropic neutron sources, Q(x,{\mu}), to the corresponding angular fluxes, {\psi}(x,{\mu}), in a one-dimensional slab geometry. Three distinct models were trained for each neural operator, corresponding to different scattering ratios (c = 0.1, 0.5, & 1.0), providing insight into their performance across distinct transport regimes (absorption-dominated, moderate, and scattering-dominated). The models were subsequently evaluated on a wide range of previously unseen source configurations, demonstrating that FNO generally achieves higher predictive accuracy, while DeepONet offers greater computational efficiency. Both models offered significant speedups that become increasingly pronounced as the scattering ratio increases, requiring <0.3% of the runtime of a conventional S_N solver. The surrogate models were further incorporated into the S_N k-eigenvalue solver, replacing the computationally intensive transport sweep loop with a single forward pass. Across varying fission cross sections and spatial-angular grids, both neural operator solvers reproduced reference eigenvalues with deviations up to 135 pcm for DeepONet and 112 pcm for FNO, while reducing runtime to <0.1% of that of the S_N solver on relatively fine grids. These results demonstrate the strong potential of neural operator frameworks as accurate, efficient, and generalizable surrogates for neutron transport, paving the way for real-time digital twin applications and repeated evaluations, such as in design optimization.

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
