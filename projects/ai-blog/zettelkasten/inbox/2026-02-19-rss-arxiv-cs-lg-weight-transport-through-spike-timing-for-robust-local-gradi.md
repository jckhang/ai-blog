---
title: "Weight transport through spike timing for robust local gradients"
source: "arxiv-cs-lg RSS"
url: "https://arxiv.org/abs/2503.02642"
date: 2026-02-19T05:00:00.000Z
tags: [rss, arxiv-cs-lg]
status: pending-analysis
---

# Weight transport through spike timing for robust local gradients

> arXiv:2503.02642v2 Announce Type: replace-cross 
Abstract: In both machine learning and in computational neuroscience, plasticity in functional neural networks is frequently expressed as gradient descent on a cost. Often, this imposes symmetry constraints that are difficult to reconcile with local computation, as is required for biological networks or neuromorphic hardware. For example, wake-sleep learning in networks characterized by Boltzmann distributions assumes symmetric connectivity. Similarly, the error backpropagation algorithm is notoriously plagued by the weight transport problem between the representation and the error stream. Existing solutions such as feedback alignment circumvent the problem by deferring to the robustness of these algorithms to weight asymmetry. However, they scale poorly with network size and depth. We introduce spike-based alignment learning (SAL), a complementary learning rule for spiking neural networks, which uses spike timing statistics to extract and correct the asymmetry between effective reciprocal connections. Apart from being spike-based and fully local, our proposed mechanism takes advantage of noise. Based on an interplay between Hebbian and anti-Hebbian plasticity, synapses can thereby recover the true local gradient. This also alleviates discrepancies that arise from neuron and synapse variability -- an omnipresent property of physical neuronal networks. We demonstrate the efficacy of our mechanism using different spiking network models. First, SAL can significantly improve convergence to the target distribution in probabilistic spiking networks versus Hebbian plasticity alone. Second, in neuronal hierarchies based on cortical microcircuits, SAL effectively aligns feedback weights to the forward pathway, thus allowing the backpropagation of correct feedback errors. Third, our approach enables competitive performance in deep networks using only local plasticity for weight transport.

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
