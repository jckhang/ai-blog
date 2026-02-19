---
title: "GEPC: Group-Equivariant Posterior Consistency for Out-of-Distribution Detection in Diffusion Models"
source: "arxiv-cs-lg RSS"
url: "https://arxiv.org/abs/2602.00191"
date: 2026-02-19T05:00:00.000Z
tags: [rss, arxiv-cs-lg]
status: pending-analysis
---

# GEPC: Group-Equivariant Posterior Consistency for Out-of-Distribution Detection in Diffusion Models

> arXiv:2602.00191v2 Announce Type: replace 
Abstract: Diffusion models learn a time-indexed score field $\mathbf{s}_\theta(\mathbf{x}_t,t)$ that often inherits approximate equivariances (flips, rotations, circular shifts) from in-distribution (ID) data and convolutional backbones. Most diffusion-based out-of-distribution (OOD) detectors exploit score magnitude or local geometry (energies, curvature, covariance spectra) and largely ignore equivariances. We introduce Group-Equivariant Posterior Consistency (GEPC), a training-free probe that measures how consistently the learned score transforms under a finite group $\mathcal{G}$, detecting equivariance breaking even when score magnitude remains unchanged. At the population level, we propose the ideal GEPC residual, which averages an equivariance-residual functional over $\mathcal{G}$, and we derive ID upper bounds and OOD lower bounds under mild assumptions. GEPC requires only score evaluations and produces interpretable equivariance-breaking maps. On OOD image benchmark datasets, we show that GEPC achieves competitive or improved AUROC compared to recent diffusion-based baselines while remaining computationally lightweight. On high-resolution synthetic aperture radar imagery where OOD corresponds to targets or anomalies in clutter, GEPC yields strong target-background separation and visually interpretable equivariance-breaking maps. Code is available at https://github.com/RouzAY/gepc-diffusion/.

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
