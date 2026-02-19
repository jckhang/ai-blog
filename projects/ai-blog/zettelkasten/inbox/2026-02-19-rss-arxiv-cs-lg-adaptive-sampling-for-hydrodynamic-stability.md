---
title: "Adaptive Sampling for Hydrodynamic Stability"
source: "arxiv-cs-lg RSS"
url: "https://arxiv.org/abs/2512.13532"
date: 2026-02-19T05:00:00.000Z
tags: [rss, arxiv-cs-lg]
status: pending-analysis
---

# Adaptive Sampling for Hydrodynamic Stability

> arXiv:2512.13532v2 Announce Type: replace-cross 
Abstract: An adaptive sampling approach for efficient detection of bifurcation boundaries in parametrized fluid flow problems is presented herein. The study extends the machine-learning approach of Silvester~(J. Comput. Phys., 553 (2026), 114743), where a classifier network was trained on preselected simulation data to identify bifurcated and nonbifurcated flow regimes. In contrast, the proposed methodology introduces adaptivity through a flow-based deep generative model that automatically refines the sampling of the parameter space. The strategy has two components: a classifier network maps the flow parameters to a bifurcation probability, and a probability density estimation technique (KRnet) for the generation of new samples at each adaptive step. The classifier output provides a probabilistic measure of flow stability, and the Shannon entropy of these predictions is employed as an uncertainty indicator. KRnet is trained to approximate a probability density function that concentrates sampling in regions of high entropy, thereby directing computational effort towards the evolving bifurcation boundary. This coupling between classification and generative modeling establishes a feedback-driven adaptive learning process analogous to error-indicator based refinement in contemporary partial differential equation solution strategies. Starting from a uniform parameter distribution, the new approach achieves accurate bifurcation boundary identification with significantly fewer Navier--Stokes simulations, providing a scalable foundation for high-dimensional stability analysis.

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
