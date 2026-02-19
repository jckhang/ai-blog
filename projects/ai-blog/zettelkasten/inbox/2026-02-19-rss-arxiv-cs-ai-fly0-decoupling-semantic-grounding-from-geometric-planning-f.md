---
title: "Fly0: Decoupling Semantic Grounding from Geometric Planning for Zero-Shot Aerial Navigation"
source: "arxiv-cs-ai RSS"
url: "https://arxiv.org/abs/2602.15875"
date: 2026-02-19T05:00:00.000Z
tags: [rss, arxiv-cs-ai]
status: pending-analysis
---

# Fly0: Decoupling Semantic Grounding from Geometric Planning for Zero-Shot Aerial Navigation

> arXiv:2602.15875v1 Announce Type: cross 
Abstract: Current Visual-Language Navigation (VLN) methodologies face a trade-off between semantic understanding and control precision. While Multimodal Large Language Models (MLLMs) offer superior reasoning, deploying them as low-level controllers leads to high latency, trajectory oscillations, and poor generalization due to weak geometric grounding. To address these limitations, we propose Fly0, a framework that decouples semantic reasoning from geometric planning. The proposed method operates through a three-stage pipeline: (1) an MLLM-driven module for grounding natural language instructions into 2D pixel coordinates; (2) a geometric projection module that utilizes depth data to localize targets in 3D space; and (3) a geometric planner that generates collision-free trajectories. This mechanism enables robust navigation even when visual contact is lost. By eliminating the need for continuous inference, Fly0 reduces computational overhead and improves system stability. Extensive experiments in simulation and real-world environments demonstrate that Fly0 outperforms state-of-the-art baselines, improving the Success Rate by over 20\% and reducing Navigation Error (NE) by approximately 50\% in unstructured environments. Our code is available at https://github.com/xuzhenxing1/Fly0.

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
