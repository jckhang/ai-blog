---
title: "Muon with Spectral Guidance: Efficient Optimization for Scientific Machine Learning"
source: "arxiv-cs-lg RSS"
url: "https://arxiv.org/abs/2602.16167"
date: 2026-02-19T05:00:00.000Z
tags: [rss, arxiv-cs-lg]
status: pending-analysis
---

# Muon with Spectral Guidance: Efficient Optimization for Scientific Machine Learning

> arXiv:2602.16167v1 Announce Type: new 
Abstract: Physics-informed neural networks and neural operators often suffer from severe optimization difficulties caused by ill-conditioned gradients, multi-scale spectral behavior, and stiffness induced by physical constraints. Recently, the Muon optimizer has shown promise by performing orthogonalized updates in the singular-vector basis of the gradient, thereby improving geometric conditioning. However, its unit-singular-value updates may lead to overly aggressive steps and lack explicit stability guarantees when applied to physics-informed learning. In this work, we propose SpecMuon, a spectral-aware optimizer that integrates Muon's orthogonalized geometry with a mode-wise relaxed scalar auxiliary variable (RSAV) mechanism. By decomposing matrix-valued gradients into singular modes and applying RSAV updates individually along dominant spectral directions, SpecMuon adaptively regulates step sizes according to the global loss energy while preserving Muon's scale-balancing properties. This formulation interprets optimization as a multi-mode gradient flow and enables principled control of stiff spectral components. We establish rigorous theoretical properties of SpecMuon, including a modified energy dissipation law, positivity and boundedness of auxiliary variables, and global convergence with a linear rate under the Polyak-Lojasiewicz condition. Numerical experiments on physics-informed neural networks, DeepONets, and fractional PINN-DeepONets demonstrate that SpecMuon achieves faster convergence and improved stability compared with Adam, AdamW, and the original Muon optimizer on benchmark problems such as the one-dimensional Burgers equation and fractional partial differential equations.

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
