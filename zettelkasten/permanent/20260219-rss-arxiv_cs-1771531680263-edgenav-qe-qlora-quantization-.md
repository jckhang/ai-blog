---
id: 20260219-rss-arxiv_cs-001-edgenav-qe-qlora-quantization-and-dynamic-early-ex
title: EdgeNav-QE: QLoRA Quantization and Dynamic Early Exit for LAM-based Navigation on Edge Devices
created: 2026-02-21
tags: ["rss","ai_research","auto-import","permanent"]
source: "arXiv.org > Computer Science"
source_url: "https://arxiv.org/abs/2602.15836"
source_type: "article"
content_length: 1246
quality_score: 0.70
---

# EdgeNav-QE: QLoRA Quantization and Dynamic Early Exit for LAM-based Navigation on Edge Devices

## 来源信息

- **来源**: arXiv.org > Computer Science
- **发布时间**: 见原文
- **原文链接**: https://arxiv.org/abs/2602.15836
- **采集时间**: 2026-02-21

## 核心内容

arXiv:2602.15836v1 Announce Type: new 
Abstract: Large Action Models (LAMs) have shown immense potential in autonomous navigation by bridging high-level reasoning with low-level control. However, deploying these multi-billion parameter models on edge devices remains a significant challenge due to memory constraints and latency requirements. In this paper, we propose EdgeNav-QE, a novel framework that integrates Quantized Low-Rank Adaptation (QLoRA) with a dynamic early-exit (DEE) mechanism to optimize LAMs for real-time edge navigation. By quantizing the backbone to 4-bit precision and strategically placing early-exit branches, we enable the model to terminate inference early for simple navigation tasks while retaining full depth for complex decision-making. Experimental results on the Habitat-Sim environment with Matterport3D dataset using OpenVLA-7B backbone, demonstrate that EdgeNav-QE reduces inference latency by 82.7% and memory footprint by 66.7% compared to full-precision baselines, while maintaining 81.8% navigation success rate. Furthermore, it outperforms state-of-the-art static early-exit method by 17.9% in latency, demonstrating the superiority of content-aware adaptive computation for safety-critical applications.

## 关键观点

- 本文提出了新的方法或框架，针对现有技术的局限性进行改进
- 通过实验验证了方法的有效性，在特定数据集上取得较好结果
- 核心主题涉及EdgeNav-QE:和Quantization
- 研究来源: arXiv.org > Computer Science
- 内容质量评分: 0.70

## 深度思考

<!-- 对上述观点的反思、质疑、延伸问题 -->

## 相关链接

- [[016-llm-research-automation]]
- [[017-深度研究工具链]]
- [[018-研究扫描自动化的ZK集成策略]]

---
*RSS 自动采集永久化 - 处理时间: 2026-02-21*
