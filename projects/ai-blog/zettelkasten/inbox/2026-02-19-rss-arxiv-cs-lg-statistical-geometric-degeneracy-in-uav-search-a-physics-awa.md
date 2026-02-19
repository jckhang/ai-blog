---
title: "Statistical-Geometric Degeneracy in UAV Search: A Physics-Aware Asymmetric Filtering Approach"
source: "arxiv-cs-lg RSS"
url: "https://arxiv.org/abs/2602.15893"
date: 2026-02-19T05:00:00.000Z
tags: [rss, arxiv-cs-lg]
status: pending-analysis
---

# Statistical-Geometric Degeneracy in UAV Search: A Physics-Aware Asymmetric Filtering Approach

> arXiv:2602.15893v1 Announce Type: cross 
Abstract: Post-disaster survivor localization using Unmanned Aerial Vehicles (UAVs) faces a fundamental physical challenge: the prevalence of Non-Line-of-Sight (NLOS) propagation in collapsed structures. Unlike standard Gaussian noise, signal reflection from debris introduces strictly non-negative ranging biases. Existing robust estimators, typically designed with symmetric loss functions (e.g., Huber or Tukey), implicitly rely on the assumption of error symmetry. Consequently, they experience a theoretical mismatch in this regime, leading to a phenomenon we formally identify as Statistical-Geometric Degeneracy (SGD)-a state where the estimator stagnates due to the coupling of persistent asymmetric bias and limited observation geometry. While emerging data-driven approaches offer alternatives, they often struggle with the scarcity of training data and the sim-to-real gap inherent in unstructured disaster zones. In this work, we propose a physically-grounded solution, the AsymmetricHuberEKF, which explicitly incorporates the non-negative physical prior of NLOS biases via a derived asymmetric loss function. Theoretically, we show that standard symmetric filters correspond to a degenerate case of our framework where the physical constraint is relaxed. Furthermore, we demonstrate that resolving SGD requires not just a robust filter, but specific bilateral information, which we achieve through a co-designed active sensing strategy. Validated in a 2D nadir-view scanning scenario, our approach significantly accelerates convergence compared to symmetric baselines, offering a resilient building block for search operations where data is scarce and geometry is constrained.

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
