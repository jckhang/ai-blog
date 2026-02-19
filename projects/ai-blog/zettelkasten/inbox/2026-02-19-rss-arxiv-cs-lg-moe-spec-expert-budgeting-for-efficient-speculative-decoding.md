---
title: "MoE-Spec: Expert Budgeting for Efficient Speculative Decoding"
source: "arxiv-cs-lg RSS"
url: "https://arxiv.org/abs/2602.16052"
date: 2026-02-19T05:00:00.000Z
tags: [rss, arxiv-cs-lg]
status: pending-analysis
---

# MoE-Spec: Expert Budgeting for Efficient Speculative Decoding

> arXiv:2602.16052v1 Announce Type: new 
Abstract: Speculative decoding accelerates Large Language Model (LLM) inference by verifying multiple drafted tokens in parallel. However, for Mixture-of-Experts (MoE) models, this parallelism introduces a severe bottleneck: large draft trees activate many unique experts, significantly increasing memory pressure and diminishing speedups from speculative decoding relative to autoregressive decoding. Prior methods reduce speculation depth when MoE verification becomes expensive. We propose MoE-Spec, a training-free verification-time expert budgeting method that decouples speculation depth from memory cost by enforcing a fixed expert capacity limit at each layer, loading only the experts that contribute most to verification and dropping the long tail of rarely used experts that drive bandwidth overhead. Experiments across multiple model scales and datasets show that this method yields 10--30\% higher throughput than state-of-the-art speculative decoding baselines (EAGLE-3) at comparable quality, with flexibility to trade accuracy for further latency reductions through tighter budgets.

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
