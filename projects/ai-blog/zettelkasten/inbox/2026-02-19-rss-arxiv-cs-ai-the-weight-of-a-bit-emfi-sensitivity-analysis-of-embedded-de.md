---
title: "The Weight of a Bit: EMFI Sensitivity Analysis of Embedded Deep Learning Models"
source: "arxiv-cs-ai RSS"
url: "https://arxiv.org/abs/2602.16309"
date: 2026-02-19T05:00:00.000Z
tags: [rss, arxiv-cs-ai]
status: pending-analysis
---

# The Weight of a Bit: EMFI Sensitivity Analysis of Embedded Deep Learning Models

> arXiv:2602.16309v1 Announce Type: cross 
Abstract: Fault injection attacks on embedded neural network models have been shown as a potent threat. Numerous works studied resilience of models from various points of view. As of now, there is no comprehensive study that would evaluate the influence of number representations used for model parameters against electromagnetic fault injection (EMFI) attacks.
  In this paper, we investigate how four different number representations influence the success of an EMFI attack on embedded neural network models. We chose two common floating-point representations (32-bit, and 16-bit), and two integer representations (8-bit, and 4-bit). We deployed four common image classifiers, ResNet-18, ResNet-34, ResNet-50, and VGG-11, on an embedded memory chip, and utilized a low-cost EMFI platform to trigger faults. Our results show that while floating-point representations exhibit almost a complete degradation in accuracy (Top-1 and Top-5) after a single fault injection, integer representations offer better resistance overall. Especially, when considering the the 8-bit representation on a relatively large network (VGG-11), the Top-1 accuracies stay at around 70% and the Top-5 at around 90%.

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
