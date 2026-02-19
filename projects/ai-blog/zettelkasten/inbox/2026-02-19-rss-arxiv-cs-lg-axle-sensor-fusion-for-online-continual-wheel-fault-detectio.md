---
title: "Axle Sensor Fusion for Online Continual Wheel Fault Detection in Wayside Railway Monitoring"
source: "arxiv-cs-lg RSS"
url: "https://arxiv.org/abs/2602.16101"
date: 2026-02-19T05:00:00.000Z
tags: [rss, arxiv-cs-lg]
status: pending-analysis
---

# Axle Sensor Fusion for Online Continual Wheel Fault Detection in Wayside Railway Monitoring

> arXiv:2602.16101v1 Announce Type: new 
Abstract: Reliable and cost-effective maintenance is essential for railway safety, particularly at the wheel-rail interface, which is prone to wear and failure. Predictive maintenance frameworks increasingly leverage sensor-generated time-series data, yet traditional methods require manual feature engineering, and deep learning models often degrade in online settings with evolving operational patterns. This work presents a semantic-aware, label-efficient continual learning framework for railway fault diagnostics. Accelerometer signals are encoded via a Variational AutoEncoder into latent representations capturing the normal operational structure in a fully unsupervised manner. Importantly, semantic metadata, including axle counts, wheel indexes, and strain-based deformations, is extracted via AI-driven peak detection on fiber Bragg grating sensors (resistant to electromagnetic interference) and fused with the VAE embeddings, enhancing anomaly detection under unknown operational conditions. A lightweight gradient boosting supervised classifier stabilizes anomaly scoring with minimal labels, while a replay-based continual learning strategy enables adaptation to evolving domains without catastrophic forgetting. Experiments show the model detects minor imperfections due to flats and polygonization, while adapting to evolving operational conditions, such as changes in train type, speed, load, and track profiles, captured using a single accelerometer and strain gauge in wayside monitoring.

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
