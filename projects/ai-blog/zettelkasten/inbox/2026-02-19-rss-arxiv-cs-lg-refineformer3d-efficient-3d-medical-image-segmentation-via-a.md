---
title: "RefineFormer3D: Efficient 3D Medical Image Segmentation via Adaptive Multi-Scale Transformer with Cross Attention Fusion"
source: "arxiv-cs-lg RSS"
url: "https://arxiv.org/abs/2602.16320"
date: 2026-02-19T05:00:00.000Z
tags: [rss, arxiv-cs-lg]
status: pending-analysis
---

# RefineFormer3D: Efficient 3D Medical Image Segmentation via Adaptive Multi-Scale Transformer with Cross Attention Fusion

> arXiv:2602.16320v1 Announce Type: cross 
Abstract: Accurate and computationally efficient 3D medical image segmentation remains a critical challenge in clinical workflows. Transformer-based architectures often demonstrate superior global contextual modeling but at the expense of excessive parameter counts and memory demands, restricting their clinical deployment. We propose RefineFormer3D, a lightweight hierarchical transformer architecture that balances segmentation accuracy and computational efficiency for volumetric medical imaging. The architecture integrates three key components: (i) GhostConv3D-based patch embedding for efficient feature extraction with minimal redundancy, (ii) MixFFN3D module with low-rank projections and depthwise convolutions for parameter-efficient feature extraction, and (iii) a cross-attention fusion decoder enabling adaptive multi-scale skip connection integration. RefineFormer3D contains only 2.94M parameters, substantially fewer than contemporary transformer-based methods. Extensive experiments on ACDC and BraTS benchmarks demonstrate that RefineFormer3D achieves 93.44\% and 85.9\% average Dice scores respectively, outperforming or matching state-of-the-art methods while requiring significantly fewer parameters. Furthermore, the model achieves fast inference (8.35 ms per volume on GPU) with low memory requirements, supporting deployment in resource-constrained clinical environments. These results establish RefineFormer3D as an effective and scalable solution for practical 3D medical image segmentation.

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
