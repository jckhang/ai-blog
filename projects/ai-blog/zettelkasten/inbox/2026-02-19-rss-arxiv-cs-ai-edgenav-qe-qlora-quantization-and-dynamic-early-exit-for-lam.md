---
title: "EdgeNav-QE: QLoRA Quantization and Dynamic Early Exit for LAM-based Navigation on Edge Devices"
source: "arxiv-cs-ai RSS"
url: "https://arxiv.org/abs/2602.15836"
date: 2026-02-19T05:00:00.000Z
tags: [rss, arxiv-cs-ai]
status: pending-analysis
---

# EdgeNav-QE: QLoRA Quantization and Dynamic Early Exit for LAM-based Navigation on Edge Devices

> arXiv:2602.15836v1 Announce Type: cross 
Abstract: Large Action Models (LAMs) have shown immense potential in autonomous navigation by bridging high-level reasoning with low-level control. However, deploying these multi-billion parameter models on edge devices remains a significant challenge due to memory constraints and latency requirements. In this paper, we propose EdgeNav-QE, a novel framework that integrates Quantized Low-Rank Adaptation (QLoRA) with a dynamic early-exit (DEE) mechanism to optimize LAMs for real-time edge navigation. By quantizing the backbone to 4-bit precision and strategically placing early-exit branches, we enable the model to terminate inference early for simple navigation tasks while retaining full depth for complex decision-making. Experimental results on the Habitat-Sim environment with Matterport3D dataset using OpenVLA-7B backbone, demonstrate that EdgeNav-QE reduces inference latency by 82.7% and memory footprint by 66.7% compared to full-precision baselines, while maintaining 81.8% navigation success rate. Furthermore, it outperforms state-of-the-art static early-exit method by 17.9% in latency, demonstrating the superiority of content-aware adaptive computation for safety-critical applications.

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
