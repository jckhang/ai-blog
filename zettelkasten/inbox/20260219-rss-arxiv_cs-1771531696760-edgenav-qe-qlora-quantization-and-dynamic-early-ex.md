---
id: 20260219-rss-arxiv_cs-XXX-edgenav-qe-qlora-quantization-and-dynamic-early-ex
title: EdgeNav-QE: QLoRA Quantization and Dynamic Early Exit for LAM-based Navigation on Edge Devices
created: 2026-02-19
tags: ["rss", "ai_research", "auto-import"]
source: "arXiv.org > Computer Science"
source_url: "https://arxiv.org/abs/2602.15836"
source_type: "article"
content_length: 1246
quality_score: 0.70
---

# EdgeNav-QE: QLoRA Quantization and Dynamic Early Exit for LAM-based Navigation on Edge Devices

## 原文概览

- **来源**: arXiv.org > Computer Science
- **发布时间**: Thu, 19 Feb 2026 00:00:00 -0500
- **原文链接**: https://arxiv.org/abs/2602.15836
- **抓取时间**: 2026-02-19T20:08:16.760Z

## 核心内容

arXiv:2602.15836v1 Announce Type: new 
Abstract: Large Action Models (LAMs) have shown immense potential in autonomous navigation by bridging high-level reasoning with low-level control. However, deploying these multi-billion parameter models on edge devices remains a significant challenge due to memory constraints and latency requirements. In this paper, we propose EdgeNav-QE, a novel framework that integrates Quantized Low-Rank Adaptation (QLoRA) with a dynamic early-exit (DEE) mechanism to optimize LAMs for real-time edge navigation. By quantizing the backbone to 4-bit precision and strategically placing early-exit branches, we enable the model to terminate inference early for simple navigation tasks while retaining full depth for complex decision-making. Experimental results on the Habitat-Sim environment with Matterport3D dataset using OpenVLA-7B backbone, demonstrate that EdgeNav-QE reduces inference latency by 82.7% and memory footprint by 66.7% compared to full-precision baselines, while maintaining 81.8% navigation success rate. Furthermore, it outperforms state-of-the-art static early-exit method by 17.9% in latency, demonstrating the superiority of content-aware adaptive computation for safety-critical applications.

## 关键观点

<!-- TODO: 人工或LLM提取3-5个关键观点 -->

## 相关链接

- [[TODO-添加相关ZK卡片]]

---
*RSS 自动抓取 - 抓取时间: 2026-02-19T20:08:16.760Z*