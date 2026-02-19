---
title: "Align and Adapt: Multimodal Multiview Human Activity Recognition under Arbitrary View Combinations"
source: "arxiv-cs-lg RSS"
url: "https://arxiv.org/abs/2602.08755"
date: 2026-02-19T05:00:00.000Z
tags: [rss, arxiv-cs-lg]
status: pending-analysis
---

# Align and Adapt: Multimodal Multiview Human Activity Recognition under Arbitrary View Combinations

> arXiv:2602.08755v3 Announce Type: replace 
Abstract: Multimodal multiview learning seeks to integrate information from diverse sources to enhance task performance. Existing approaches often struggle with flexible view configurations, including arbitrary view combinations, numbers of views, and heterogeneous modalities. Focusing on the context of human activity recognition, we propose AliAd, a model that combines multiview contrastive learning with a mixture-of-experts module to support arbitrary view availability during both training and inference. Instead of trying to reconstruct missing views, an adjusted center contrastive loss is used for self-supervised representation learning and view alignment, mitigating the impact of missing views on multiview fusion. This loss formulation allows for the integration of view weights to account for view quality. Additionally, it reduces computational complexity from $O(V^2)$ to $O(V)$, where $V$ is the number of views. To address residual discrepancies not captured by contrastive learning, we employ a mixture-of-experts module with a specialized load balancing strategy, tasked with adapting to arbitrary view combinations. We highlight the geometric relationship among components in our model and how they combine well in the latent space. AliAd is validated on four datasets encompassing inertial and human pose modalities, with the number of views ranging from three to nine, demonstrating its performance and flexibility.

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
