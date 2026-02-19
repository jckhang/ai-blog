---
title: "Why Any-Order Autoregressive Models Need Two-Stream Attention: A Structural-Semantic Tradeoff"
source: "arxiv-cs-lg RSS"
url: "https://arxiv.org/abs/2602.16092"
date: 2026-02-19T05:00:00.000Z
tags: [rss, arxiv-cs-lg]
status: pending-analysis
---

# Why Any-Order Autoregressive Models Need Two-Stream Attention: A Structural-Semantic Tradeoff

> arXiv:2602.16092v1 Announce Type: new 
Abstract: Any-order autoregressive models (AO-ARMs) offer a promising path toward efficient masked diffusion by enabling native key-value caching, but competitive performance has so far required two-stream attention, typically motivated as a means of decoupling token content from position. In this work, we argue that two-stream attention may be serving a more subtle role. We identify a structural-semantic tradeoff in any-order generation: the hidden representation at each step must simultaneously attend to semantically informative tokens for prediction and structurally recent tokens for summarization, objectives that compete for attention capacity in a single stream but can specialize across two streams. To isolate this tradeoff from position-content separation, we propose Decoupled RoPE, a modification to rotary position embeddings that provides target position information without revealing target content. Decoupled RoPE performs competitively at short sequence lengths--where semantic and structural proximity coincide--but degrades as sequence length increases and the two orderings diverge. These results suggest that the success of two-stream attention stems not merely from separating position from content, but from circumventing the deeper structural-semantic tradeoff inherent to any-order generation.

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
