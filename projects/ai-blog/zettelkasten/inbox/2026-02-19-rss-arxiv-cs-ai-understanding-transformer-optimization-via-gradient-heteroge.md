---
title: "Understanding Transformer Optimization via Gradient Heterogeneity"
source: "arxiv-cs-ai RSS"
url: "https://arxiv.org/abs/2502.00213"
date: 2026-02-19T05:00:00.000Z
tags: [rss, arxiv-cs-ai]
status: pending-analysis
---

# Understanding Transformer Optimization via Gradient Heterogeneity

> arXiv:2502.00213v4 Announce Type: replace-cross 
Abstract: Transformers are difficult to optimize with stochastic gradient descent (SGD) and largely rely on adaptive optimizers such as Adam. Despite their empirical success, the reasons behind Adam's superior performance over SGD remain poorly understood. In this study, we analyze the optimization of Transformer models through the lens of \emph{gradient heterogeneity}, defined as the variation in gradient norms across parameter blocks. We provide a theoretical analysis showing that gradient heterogeneity, together with Hessian heterogeneity, degrades the convergence of gradient-based methods such as SGD, while sign-based methods are substantially less sensitive to this effect. Adam's coordinate-wise normalization makes its update directions depend mainly on gradient signs, so Adam can be interpreted as a soft variant of SignSGD. Our analysis uses the fact that SGD and SignSGD follow steepest descent directions under different norms, and derives upper bounds on the iteration complexity with implications for learning rate scaling in SignSGD. We further investigate the origin of gradient heterogeneity in Transformer architectures and show that it is strongly influenced by the placement of layer normalization, with Post-LN architectures exhibiting particularly pronounced heterogeneity. Experimental results from fine-tuning Transformers in both NLP and vision domains validate our theoretical analysis. Code is available at https://github.com/tom4649/gradient-heterogeneity.

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
