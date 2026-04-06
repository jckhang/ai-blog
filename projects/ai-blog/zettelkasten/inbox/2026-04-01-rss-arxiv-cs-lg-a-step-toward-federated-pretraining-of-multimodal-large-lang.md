---
title: "A Step Toward Federated Pretraining of Multimodal Large Language Models"
source: "arxiv-cs-lg RSS"
url: "https://arxiv.org/abs/2603.26786"
date: 2026-04-01T04:00:00.000Z
tags: [rss, arxiv-cs-lg]
status: pending-analysis
---

# A Step Toward Federated Pretraining of Multimodal Large Language Models

> arXiv:2603.26786v1 Announce Type: new 
Abstract: The rapid evolution of Multimodal Large Language Models (MLLMs) is bottlenecked by the saturation of high-quality public data, while vast amounts of diverse multimodal data remain inaccessible in privacy-sensitive silos. Federated Learning (FL) offers a promising solution to unlock these distributed resources, but existing research focuses predominantly on fine-tuning, leaving the foundational pre-training phase largely unexplored. In this paper, we formally introduce the Federated MLLM Alignment (Fed-MA) task, a lightweight pre-training paradigm that freezes the vision encoder and LLM while collaboratively training the cross-modal projector. We identify two critical challenges in this setting: (i) parameter interference in aggregating local projectors; and (ii) gradient oscillations in one-pass collaborative SGD. To address these challenges, we propose Fed-CMP, a pioneering framework for federated MLLM pre-training. Fed-CMP employs Canonical Reliability-Aware Aggregation, which constructs a canonical space to decompose client projectors into a shared alignment basis and client-specific coefficients, then performs reliability-weighted fusion to suppress parameter interference. Furthermore, Fed-CMP introduces Orthogonality-Preserved Momentum, which applies momentum to the shared alignment basis via orthogonal projection, accumulating historical optimization directions while preserving geometric structure. We construct four federated pre-training scenarios based on public datasets, and extensive experiments validate that Fed-CMP significantly outperforms existing baselines.

## Full Content

arXiv:2603.26786v1 Announce Type: new 
Abstract: The rapid evolution of Multimodal Large Language Models (MLLMs) is bottlenecked by the saturation of high-quality public data, while vast amounts of diverse multimodal data remain inaccessible in privacy-sensitive silos. Federated Learning (FL) offers a promising solution to unlock these distributed resources, but existing research focuses predominantly on fine-tuning, leaving the foundational pre-training phase largely unexplored. In this paper, we formally introduce the Federated MLLM Alignment (Fed-MA) task, a lightweight pre-training paradigm that freezes the vision encoder and LLM while collaboratively training the cross-modal projector. We identify two critical challenges in this setting: (i) parameter interference in aggregating local projectors; and (ii) gradient oscillations in one-pass collaborative SGD. To address these challenges, we propose Fed-CMP, a pioneering framework for federated MLLM pre-training. Fed-CMP employs Canonical Reliability-Aware Aggregation, which constructs a canonical space to decompose client projectors into a shared alignment basis and client-specific coefficients, then performs reliability-weighted fusion to suppress parameter interference. Furthermore, Fed-CMP introduces Orthogonality-Preserved Momentum, which applies momentum to the shared alignment basis via orthogonal projection, accumulating historical optimization directions while preserving geometric structure. We construct four federated pre-training scenarios based on public datasets, and extensive experiments validate that Fed-CMP significantly outperforms existing baselines.

## Analysis Checklist

- [ ] 阅读全文并提取关键观点
- [ ] 与现有 ZK 笔记建立链接 [[...]]
- [ ] 确定是否转为永久笔记
- [ ] 添加适当的标签和元数据
- [ ] 更新摘要

## Related

- 
