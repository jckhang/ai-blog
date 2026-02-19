---
title: "Learning Preference from Observed Rankings"
source: "arxiv-cs-lg RSS"
url: "https://arxiv.org/abs/2602.16476"
date: 2026-02-19T05:00:00.000Z
tags: [rss, arxiv-cs-lg]
status: pending-analysis
---

# Learning Preference from Observed Rankings

> arXiv:2602.16476v1 Announce Type: cross 
Abstract: Estimating consumer preferences is central to many problems in economics and marketing. This paper develops a flexible framework for learning individual preferences from partial ranking information by interpreting observed rankings as collections of pairwise comparisons with logistic choice probabilities. We model latent utility as the sum of interpretable product attributes, item fixed effects, and a low-rank user-item factor structure, enabling both interpretability and information sharing across consumers and items. We further correct for selection in which comparisons are observed: a comparison is recorded only if both items enter the consumer's consideration set, inducing exposure bias toward frequently encountered items. We model pair observability as the product of item-level observability propensities and estimate these propensities with a logistic model for the marginal probability that an item is observable. Preference parameters are then estimated by maximizing an inverse-probability-weighted (IPW), ridge-regularized log-likelihood that reweights observed comparisons toward a target comparison population. To scale computation, we propose a stochastic gradient descent (SGD) algorithm based on inverse-probability resampling, which draws comparisons in proportion to their IPW weights. In an application to transaction data from an online wine retailer, the method improves out-of-sample recommendation performance relative to a popularity-based benchmark, with particularly strong gains in predicting purchases of previously unconsumed products.

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
