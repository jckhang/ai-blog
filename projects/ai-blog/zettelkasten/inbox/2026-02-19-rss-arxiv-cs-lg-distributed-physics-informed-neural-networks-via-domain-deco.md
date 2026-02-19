---
title: "Distributed physics-informed neural networks via domain decomposition for fast flow reconstruction"
source: "arxiv-cs-lg RSS"
url: "https://arxiv.org/abs/2602.15883"
date: 2026-02-19T05:00:00.000Z
tags: [rss, arxiv-cs-lg]
status: pending-analysis
---

# Distributed physics-informed neural networks via domain decomposition for fast flow reconstruction

> arXiv:2602.15883v1 Announce Type: new 
Abstract: Physics-Informed Neural Networks (PINNs) offer a powerful paradigm for flow reconstruction, seamlessly integrating sparse velocity measurements with the governing Navier-Stokes equations to recover complete velocity and latent pressure fields. However, scaling such models to large spatiotemporal domains is hindered by computational bottlenecks and optimization instabilities. In this work, we propose a robust distributed PINNs framework designed for efficient flow reconstruction via spatiotemporal domain decomposition. A critical challenge in such distributed solvers is pressure indeterminacy, where independent sub-networks drift into inconsistent local pressure baselines. We address this issue through a reference anchor normalization strategy coupled with decoupled asymmetric weighting. By enforcing a unidirectional information flow from designated master ranks where the anchor point lies to neighboring ranks, our approach eliminates gauge freedom and guarantees global pressure uniqueness while preserving temporal continuity. Furthermore, to mitigate the Python interpreter overhead associated with computing high-order physics residuals, we implement a high-performance training pipeline accelerated by CUDA graphs and JIT compilation. Extensive validation on complex flow benchmarks demonstrates that our method achieves near-linear strong scaling and high-fidelity reconstruction, establishing a scalable and physically rigorous pathway for flow reconstruction and understanding of complex hydrodynamics.

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
