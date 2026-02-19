---
title: "CHAI: CacHe Attention Inference for text2video"
source: "arxiv-cs-lg RSS"
url: "https://arxiv.org/abs/2602.16132"
date: 2026-02-19T05:00:00.000Z
tags: [rss, arxiv-cs-lg]
status: pending-analysis
---

# CHAI: CacHe Attention Inference for text2video

> arXiv:2602.16132v1 Announce Type: cross 
Abstract: Text-to-video diffusion models deliver impressive results but remain slow because of the sequential denoising of 3D latents. Existing approaches to speed up inference either require expensive model retraining or use heuristic-based step skipping, which struggles to maintain video quality as the number of denoising steps decreases. Our work, CHAI, aims to use cross-inference caching to reduce latency while maintaining video quality. We introduce Cache Attention as an effective method for attending to shared objects/scenes across cross-inference latents. This selective attention mechanism enables effective reuse of cached latents across semantically related prompts, yielding high cache hit rates. We show that it is possible to generate high-quality videos using Cache Attention with as few as 8 denoising steps. When integrated into the overall system, CHAI is 1.65x - 3.35x faster than baseline OpenSora 1.2 while maintaining video quality.

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
