---
title: "STAPO: Stabilizing Reinforcement Learning for LLMs by Silencing Rare Spurious Tokens"
source: "arxiv-cs-cl RSS"
url: "https://arxiv.org/abs/2602.15620"
date: 2026-02-19T05:00:00.000Z
tags: [rss, arxiv-cs-cl]
status: pending-analysis
---

# STAPO: Stabilizing Reinforcement Learning for LLMs by Silencing Rare Spurious Tokens

> arXiv:2602.15620v2 Announce Type: replace 
Abstract: Reinforcement Learning (RL) has significantly improved large language model reasoning, but existing RL fine-tuning methods rely heavily on heuristic techniques such as entropy regularization and reweighting to maintain stability. In practice, they often suffer from late-stage performance collapse, leading to degraded reasoning quality and unstable training. Our analysis shows that the magnitude of token-wise policy gradients in RL is negatively correlated with token probability and local policy entropy. We find that training instability can be caused by a tiny fraction of tokens, approximately 0.01\%, which we term \emph{spurious tokens}. When such tokens appear in correct responses, they contribute little to the reasoning outcome but inherit the full sequence-level reward, leading to abnormally amplified gradient updates. To mitigate this instability, we design S2T (silencing spurious tokens) mechanism to efficiently identify spurious tokens through characteristic signals with low probability, low entropy, and positive advantage, and then to suppress their gradient perturbations during optimization. Incorporating this mechanism into a group-based objective, we propose Spurious-Token-Aware Policy Optimization (STAPO), which promotes stable and effective large-scale model refinement. Across six mathematical reasoning benchmarks using Qwen 1.7B, 8B, and 14B base models, STAPO consistently demonstrates superior entropy stability and achieves an average performance improvement of 7.13\% ($\rho_{\mathrm{T}}$=1.0, top-p=1.0) and 3.69\% ($\rho_{\mathrm{T}}$=0.7, top-p=0.9) over GRPO, 20-Entropy and JustRL.

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
