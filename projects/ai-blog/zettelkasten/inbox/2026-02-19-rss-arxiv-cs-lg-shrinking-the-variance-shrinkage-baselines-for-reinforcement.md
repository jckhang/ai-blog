---
title: "Shrinking the Variance: Shrinkage Baselines for Reinforcement Learning with Verifiable Rewards"
source: "arxiv-cs-lg RSS"
url: "https://arxiv.org/abs/2511.03710"
date: 2026-02-19T05:00:00.000Z
tags: [rss, arxiv-cs-lg]
status: pending-analysis
---

# Shrinking the Variance: Shrinkage Baselines for Reinforcement Learning with Verifiable Rewards

> arXiv:2511.03710v2 Announce Type: replace 
Abstract: Reinforcement Learning with Verifiable Rewards (RLVR) has emerged as a powerful paradigm for post-training large reasoning models (LRMs) using policy-gradient methods such as GRPO. To stabilize training, these methods typically center trajectory rewards by subtracting the empirical mean reward for each prompt. Statistically, this centering acts as a control variate (baseline), reducing the variance of the policy-gradient estimator. In practice, the mean reward is estimated using per-prompt empirical averages computed from the generations for each prompt in a batch. Motivated by Stein's paradox, we propose shrinkage estimators that combine per-prompt and across-prompt means to improve per-prompt mean estimation accuracy, especially in the low-generation regime typical of RLVR. Theoretically, we construct a shrinkage-based baseline that provably yields lower-variance policy-gradient estimators across algorithms. Our baseline is a drop-in replacement for standard per-prompt mean baselines and requires no additional hyperparameters or computation. Empirically, shrinkage baselines consistently outperform empirical-mean baselines, producing lower-variance gradient updates and improved training stability.

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
