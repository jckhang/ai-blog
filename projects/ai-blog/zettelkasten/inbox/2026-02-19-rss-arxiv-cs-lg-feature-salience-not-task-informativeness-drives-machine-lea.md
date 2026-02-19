---
title: "Feature salience -- not task-informativeness -- drives machine learning model explanations"
source: "arxiv-cs-lg RSS"
url: "https://arxiv.org/abs/2602.09238"
date: 2026-02-19T05:00:00.000Z
tags: [rss, arxiv-cs-lg]
status: pending-analysis
---

# Feature salience -- not task-informativeness -- drives machine learning model explanations

> arXiv:2602.09238v3 Announce Type: replace 
Abstract: Explainable AI (XAI) promises to provide insight into machine learning models' decision processes, where one goal is to identify failures such as shortcut learning. This promise relies on the field's assumption that input features marked as important by an XAI must contain information about the target variable. However, it is unclear whether informativeness is indeed the main driver of importance attribution in practice, or if other data properties such as statistical suppression, novelty at test-time, or high feature salience substantially contribute. To clarify this, we trained deep learning models on three variants of a binary image classification task, in which translucent watermarks are either absent, act as class-dependent confounds, or represent class-independent noise. Results for five popular attribution methods show substantially elevated relative importance in watermarked areas (RIW) for all models regardless of the training setting ($R^2 \geq .45$). By contrast, whether the presence of watermarks is class-dependent or not only has a marginal effect on RIW ($R^2 \leq .03$), despite a clear impact impact on model performance and generalisation ability. XAI methods show similar behaviour to model-agnostic edge detection filters and attribute substantially less importance to watermarks when bright image intensities are encoded by smaller instead of larger feature values. These results indicate that importance attribution is most strongly driven by the salience of image structures at test time rather than statistical associations learned by machine learning models. Previous studies demonstrating successful XAI application should be reevaluated with respect to a possibly spurious concurrency of feature salience and informativeness, and workflows using feature attribution methods as building blocks should be scrutinised.

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
