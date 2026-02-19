---
title: "Differentially Private Non-convex Distributionally Robust Optimization"
source: "arxiv-cs-lg RSS"
url: "https://arxiv.org/abs/2602.16155"
date: 2026-02-19T05:00:00.000Z
tags: [rss, arxiv-cs-lg]
status: pending-analysis
---

# Differentially Private Non-convex Distributionally Robust Optimization

> arXiv:2602.16155v1 Announce Type: new 
Abstract: Real-world deployments routinely face distribution shifts, group imbalances, and adversarial perturbations, under which the traditional Empirical Risk Minimization (ERM) framework can degrade severely.
  Distributionally Robust Optimization (DRO) addresses this issue by optimizing the worst-case expected loss over an uncertainty set of distributions, offering a principled approach to robustness.
  Meanwhile, as training data in DRO always involves sensitive information, safeguarding it against leakage under Differential Privacy (DP) is essential.
  In contrast to classical DP-ERM, DP-DRO has received much less attention due to its minimax optimization structure with uncertainty constraint.
  To bridge the gap, we provide a comprehensive study of DP-(finite-sum)-DRO with $\psi$-divergence and non-convex loss.
  First, we study DRO with general $\psi$-divergence by reformulating it as a minimization problem, and develop a novel $(\varepsilon, \delta)$-DP optimization method, called DP Double-Spider, tailored to this structure.
  Under mild assumptions, we show that it achieves a utility bound of $\mathcal{O}(\frac{1}{\sqrt{n}}+ (\frac{\sqrt{d \log (1/\delta)}}{n \varepsilon})^{2/3})$ in terms of the gradient norm, where $n$ denotes the data size and $d$ denotes the model dimension.
  We further improve the utility rate for specific divergences.
  In particular, for DP-DRO with KL-divergence, by transforming the problem into a compositional finite-sum optimization problem, we develop a DP Recursive-Spider method and show that it achieves a utility bound of $\mathcal{O}((\frac{\sqrt{d \log(1/\delta)}}{n\varepsilon})^{2/3} )$, matching the best-known result for non-convex DP-ERM.
  Experimentally, we demonstrate that our proposed methods outperform existing approaches for DP minimax optimization.

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
