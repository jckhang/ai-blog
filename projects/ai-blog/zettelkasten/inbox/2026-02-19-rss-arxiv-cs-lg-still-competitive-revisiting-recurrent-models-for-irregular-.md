---
title: "Still Competitive: Revisiting Recurrent Models for Irregular Time Series Prediction"
source: "arxiv-cs-lg RSS"
url: "https://arxiv.org/abs/2510.16161"
date: 2026-02-19T05:00:00.000Z
tags: [rss, arxiv-cs-lg]
status: pending-analysis
---

# Still Competitive: Revisiting Recurrent Models for Irregular Time Series Prediction

> arXiv:2510.16161v2 Announce Type: replace 
Abstract: Modeling irregularly sampled multivariate time series is a persistent challenge in domains like healthcare and sensor networks. While recent works have explored a variety of complex learning architectures to solve the prediction problems for irregularly sampled time series, it remains unclear what the true benefits of some of these architectures are, and whether clever modifications of simpler and more efficient RNN-based algorithms are still competitive, i.e. they are on par with or even superior to these methods. In this work, we propose and study GRUwE: Gated Recurrent Unit with Exponential basis functions, that builds upon RNN-based architectures for observations made at irregular times. GRUwE supports both regression-based and event-based predictions in continuous time. GRUwE works by maintaining a Markov state representation of the time series that updates with the arrival of irregular observations. The Markov state update relies on two reset mechanisms: (i) observation-triggered reset to account for the new observation, and (ii) time-triggered reset that relies on learnable exponential decays, to support the predictions in continuous time. Our empirical evaluations across several real-world benchmarks on next-observation and next-event prediction tasks demonstrate that GRUwE can indeed achieve competitive or superior performance compared to the recent state-of-the-art (SOTA) methods. Thanks to its simplicity, GRUwE offers compelling advantages: it is easy to implement, requires minimal hyper-parameter tuning efforts, and significantly reduces the computational overhead in the online deployment.

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
