---
title: "Adaptive Rank Allocation for Federated Parameter-Efficient Fine-Tuning of Language Models"
source: "arxiv-cs-ai RSS"
url: "https://arxiv.org/abs/2501.14406"
date: 2026-02-19T05:00:00.000Z
tags: [rss, arxiv-cs-ai]
status: pending-analysis
---

# Adaptive Rank Allocation for Federated Parameter-Efficient Fine-Tuning of Language Models

> arXiv:2501.14406v4 Announce Type: replace-cross 
Abstract: Pre-trained Language Models (PLMs) have demonstrated their superiority and versatility in modern Natural Language Processing (NLP), effectively adapting to various downstream tasks through further fine-tuning. Federated Parameter-Efficient Fine-Tuning (FedPEFT) has emerged as a promising solution to address privacy and efficiency challenges in distributed training for PLMs on resource-constrained local devices. However, our measurements reveal two key limitations of FedPEFT: heterogeneous data across devices exacerbates performance degradation of low-rank adaptation, and a fixed parameter configuration results in communication inefficiency. To overcome these limitations, we propose FedARA, a novel adaptive rank allocation framework for federated parameter-efficient fine-tuning of language models. Specifically, FedARA employs truncated Singular Value Decomposition (SVD) adaptation to enhance similar feature representation across clients, significantly mitigating the adverse effects of data heterogeneity. Subsequently, it utilizes dynamic rank allocation to progressively identify critical ranks, effectively improving communication efficiency. Lastly, it leverages rank-based module pruning to automatically remove inactive modules, steadily reducing local computational cost and memory usage in each federated learning round. Extensive experiments show that FedARA consistently outperforms baselines by an average of 6.95% to 8.49% across various datasets and models under heterogeneous data while significantly improving communication efficiency by 2.40$ \times$. Moreover, experiments on various edge devices demonstrate substantial decreases in total training time and energy consumption by up to 48.90% and 46.95%, respectively.

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
