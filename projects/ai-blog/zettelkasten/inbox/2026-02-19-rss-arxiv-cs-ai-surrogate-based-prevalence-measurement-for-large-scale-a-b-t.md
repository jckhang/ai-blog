---
title: "Surrogate-Based Prevalence Measurement for Large-Scale A/B Testing"
source: "arxiv-cs-ai RSS"
url: "https://arxiv.org/abs/2602.16111"
date: 2026-02-19T05:00:00.000Z
tags: [rss, arxiv-cs-ai]
status: pending-analysis
---

# Surrogate-Based Prevalence Measurement for Large-Scale A/B Testing

> arXiv:2602.16111v1 Announce Type: cross 
Abstract: Online media platforms often need to measure how frequently users are exposed to specific content attributes in order to evaluate trade-offs in A/B experiments. A direct approach is to sample content, label it using a high-quality rubric (e.g., an expert-reviewed LLM prompt), and estimate impression-weighted prevalence. However, repeatedly running such labeling for every experiment arm and segment is too costly and slow to serve as a default measurement at scale.
  We present a scalable \emph{surrogate-based prevalence measurement} framework that decouples expensive labeling from per-experiment evaluation. The framework calibrates a surrogate signal to reference labels offline and then uses only impression logs to estimate prevalence for arbitrary experiment arms and segments. We instantiate this framework using \emph{score bucketing} as the surrogate: we discretize a model score into buckets, estimate bucket-level prevalences from an offline labeled sample, and combine these calibrated bucket level prevalences with the bucket distribution of impressions in each arm to obtain fast, log-based estimates.
  Across multiple large-scale A/B tests, we validate that the surrogate estimates closely match the reference estimates for both arm-level prevalence and treatment--control deltas. This enables scalable, low-latency prevalence measurement in experimentation without requiring per-experiment labeling jobs.

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
