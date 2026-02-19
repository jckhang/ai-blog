---
title: "Deep TPC: Temporal-Prior Conditioning for Time Series Forecasting"
source: "arxiv-cs-lg RSS"
url: "https://arxiv.org/abs/2602.16188"
date: 2026-02-19T05:00:00.000Z
tags: [rss, arxiv-cs-lg]
status: pending-analysis
---

# Deep TPC: Temporal-Prior Conditioning for Time Series Forecasting

> arXiv:2602.16188v1 Announce Type: new 
Abstract: LLM-for-time series (TS) methods typically treat time shallowly, injecting positional or prompt-based cues once at the input of a largely frozen decoder, which limits temporal reasoning as this information degrades through the layers. We introduce Temporal-Prior Conditioning (TPC), which elevates time to a first-class modality that conditions the model at multiple depths. TPC attaches a small set of learnable time series tokens to the patch stream; at selected layers these tokens cross-attend to temporal embeddings derived from compact, human-readable temporal descriptors encoded by the same frozen LLM, then feed temporal context back via self-attention. This disentangles time series signal and temporal information while maintaining a low parameter budget. We show that by training only the cross-attention modules and explicitly disentangling time series signal and temporal information, TPC consistently outperforms both full fine-tuning and shallow conditioning strategies, achieving state-of-the-art performance in long-term forecasting across diverse datasets. Code available at: https://github.com/fil-mp/Deep_tpc

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
