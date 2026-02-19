---
title: "Zero-Shot Temporal Resolution Domain Adaptation for Spiking Neural Networks"
source: "arxiv-cs-lg RSS"
url: "https://arxiv.org/abs/2411.04760"
date: 2026-02-19T05:00:00.000Z
tags: [rss, arxiv-cs-lg]
status: pending-analysis
---

# Zero-Shot Temporal Resolution Domain Adaptation for Spiking Neural Networks

> arXiv:2411.04760v3 Announce Type: replace 
Abstract: Spiking Neural Networks (SNNs) are biologically-inspired deep neural networks that efficiently extract temporal information while offering promising gains in terms of energy efficiency and latency when deployed on neuromorphic devices. SNN parameters are sensitive to temporal resolution, leading to significant performance drops when the temporal resolution of target data during deployment is not the same as that of the source data used for training, especially when fine-tuning with the target data is not possible during deployment. To address this challenge, we propose three novel domain adaptation methods for adapting neuron parameters to account for the change in time resolution without re-training on target time resolution. The proposed methods are based on a mapping between neuron dynamics in SNNs and State Space Models (SSMs) and are applicable to general neuron models. We evaluate the proposed methods under spatio-temporal data tasks, namely the audio keyword spotting datasets SHD and MSWC, and the neuromorphic image NMINST dataset. Our methods provide an alternative to-and in most cases significantly outperform-the existing reference method that consists of scaling only the time constant. Notably, when the temporal resolution of the target data is double that of the source data, applying one of our proposed methods instead of the benchmark achieves classification accuracy of 89.5% instead of 53.0% on SHD, 93.6% instead of 38.8% on MSWC and 98.5% instead of 97.2% aon NMNIST. Moreover, our results show that high accuracy on high temporal resolution data can be obtained by time-efficient training on lower temporal resolution data.

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
