---
title: "Mitigating Gradient Inversion Risks in Language Models via Token Obfuscation"
source: "arxiv-cs-cl RSS"
url: "https://arxiv.org/abs/2602.15897"
date: 2026-02-19T05:00:00.000Z
tags: [rss, arxiv-cs-cl]
status: pending-analysis
---

# Mitigating Gradient Inversion Risks in Language Models via Token Obfuscation

> arXiv:2602.15897v1 Announce Type: new 
Abstract: Training and fine-tuning large-scale language models largely benefit from collaborative learning, but the approach has been proven vulnerable to gradient inversion attacks (GIAs), which allow adversaries to reconstruct private training data from shared gradients. Existing defenses mainly employ gradient perturbation techniques, e.g., noise injection or gradient pruning, to disrupt GIAs' direct mapping from gradient space to token space. However, these methods often fall short due to the retention of semantics similarity across gradient, embedding, and token spaces. In this work, we propose a novel defense mechanism named GHOST (gradient shield with obfuscated tokens), a token-level obfuscation mechanism that neutralizes GIAs by decoupling the inherent connections across gradient, embedding, and token spaces. GHOST is built upon an important insight: due to the large scale of the token space, there exist semantically distinct yet embedding-proximate tokens that can serve as the shadow substitutes of the original tokens, which enables a semantic disconnection in the token space while preserving the connection in the embedding and gradient spaces. GHOST comprises a searching step, which identifies semantically distinct candidate tokens using a multi-criteria searching process, and a selection step, which selects optimal shadow tokens to ensure minimal disruption to features critical for training by preserving alignment with the internal outputs produced by original tokens. Evaluation across diverse model architectures (from BERT to Llama) and datasets demonstrates the remarkable effectiveness of GHOST in protecting privacy (as low as 1% in recovery rate) and preserving utility (up to 0.92 in classification F1 and 5.45 in perplexity), in both classification and generation tasks against state-of-the-art GIAs and adaptive attack scenarios.

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
