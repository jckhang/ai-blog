---
title: "Imitation Learning for Combinatorial Optimisation under Uncertainty"
source: "arxiv-cs-lg RSS"
url: "https://arxiv.org/abs/2601.05383"
date: 2026-02-19T05:00:00.000Z
tags: [rss, arxiv-cs-lg]
status: pending-analysis
---

# Imitation Learning for Combinatorial Optimisation under Uncertainty

> arXiv:2601.05383v3 Announce Type: replace 
Abstract: Imitation learning (IL) provides a data-driven framework for approximating policies for large-scale combinatorial optimisation problems formulated as sequential decision problems (SDPs), where exact solution methods are computationally intractable. A central but underexplored aspect of IL in this context is the role of the \emph{expert} that generates training demonstrations. Existing studies employ a wide range of expert constructions, yet lack a unifying framework to characterise their modelling assumptions, computational properties, and impact on learning performance. This paper introduces a systematic taxonomy of experts for imitation learning in combinatorial optimisation under uncertainty. The literature is classified along three principal dimensions: (i) treatment of uncertainty; (ii) level of optimality, distinguishing task-optimal and approximate experts; and (iii) interaction mode with the learner, ranging from one-shot supervision to iterative, interactive schemes. We further identify additional categories capturing other relevant expert characteristics. Building on this taxonomy, we propose a generalised Dataset Aggregation (DAgger) framework that accommodates multiple expert queries, expert aggregation, and flexible interaction strategies.
  The proposed framework is evaluated on a dynamic physician-to-patient assignment problem with stochastic arrivals and capacity constraints. Computational experiments compare learning outcomes across expert types and interaction regimes. The results show that policies learned from stochastic experts consistently outperform those learned from deterministic or full-information experts, while interactive learning improves solution quality using fewer expert demonstrations. Aggregated deterministic experts provide an effective alternative when stochastic optimisation becomes computationally challenging.

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
