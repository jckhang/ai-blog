---
title: "Test-Time Adaptation for Tactile-Vision-Language Models"
source: "arxiv-cs-ai RSS"
url: "https://arxiv.org/abs/2602.15873"
date: 2026-02-19T05:00:00.000Z
tags: [rss, arxiv-cs-ai]
status: pending-analysis
---

# Test-Time Adaptation for Tactile-Vision-Language Models

> arXiv:2602.15873v1 Announce Type: cross 
Abstract: Tactile-vision-language (TVL) models are increasingly deployed in real-world robotic and multimodal perception tasks, where test-time distribution shifts are unavoidable. Existing test-time adaptation (TTA) methods provide filtering in unimodal settings but lack explicit treatment of modality-wise reliability under asynchronous cross-modal shifts, leaving them brittle when some modalities become unreliable. We study TTA for TVL models under such shifts and propose a reliability-aware framework that estimates per-modality reliability from prediction uncertainty and perturbation-based responses. This shared reliability signal is used to (i) filter unreliable test samples, (ii) adaptively fuse tactile, visual, and language features, and (iii) regularize test-time optimization with a reliability-guided objective. On the TAG-C benchmark and additional TVL scenarios, our approach consistently outperforms strong TTA baselines, achieving accuracy gains of up to 49.9\% under severe modality corruptions, underscoring the importance of explicit modality-wise reliability modeling for robust test-time adaptation.

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
