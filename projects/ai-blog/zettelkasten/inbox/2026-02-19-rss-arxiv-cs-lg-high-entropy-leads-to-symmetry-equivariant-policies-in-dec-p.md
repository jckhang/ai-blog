---
title: "High entropy leads to symmetry equivariant policies in Dec-POMDPs"
source: "arxiv-cs-lg RSS"
url: "https://arxiv.org/abs/2511.22581"
date: 2026-02-19T05:00:00.000Z
tags: [rss, arxiv-cs-lg]
status: pending-analysis
---

# High entropy leads to symmetry equivariant policies in Dec-POMDPs

> arXiv:2511.22581v2 Announce Type: replace 
Abstract: We prove that in any Dec-POMDP, sufficiently high entropy regularization ensures that policy gradient ascent with tabular softmax parametrization always converges, for any initialization, to the same joint policy, and that this joint policy is equivariant w.r.t. all symmetries of the Dec-POMDP. In particular, policies coming from different random seeds will be fully compatible, in that their cross-play returns are equal to their self-play returns. Through extensive empirical evaluation of independent PPO in the Hanabi, Overcooked, and Yokai environments, we find that the entropy coefficient has a massive influence on the cross-play returns between independently trained policies, and that the drop in self-play returns coming from increased entropy regularization can often be counteracted by greedifying the learned policies after training. In Hanabi we achieve a new SOTA in inter-seed cross-play this way. Despite clear limitations of this recipe, which we point out, both our theoretical and empirical results indicate that during hyperparameter sweeps in Dec-POMDPs, one should consider far higher entropy coefficients than is typically done.

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
