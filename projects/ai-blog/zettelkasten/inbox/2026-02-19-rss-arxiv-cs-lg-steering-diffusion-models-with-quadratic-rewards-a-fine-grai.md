---
title: "Steering diffusion models with quadratic rewards: a fine-grained analysis"
source: "arxiv-cs-lg RSS"
url: "https://arxiv.org/abs/2602.16570"
date: 2026-02-19T05:00:00.000Z
tags: [rss, arxiv-cs-lg]
status: pending-analysis
---

# Steering diffusion models with quadratic rewards: a fine-grained analysis

> arXiv:2602.16570v1 Announce Type: new 
Abstract: Inference-time algorithms are an emerging paradigm in which pre-trained models are used as subroutines to solve downstream tasks. Such algorithms have been proposed for tasks ranging from inverse problems and guided image generation to reasoning. However, the methods currently deployed in practice are heuristics with a variety of failure modes -- and we have very little understanding of when these heuristics can be efficiently improved.
  In this paper, we consider the task of sampling from a reward-tilted diffusion model -- that is, sampling from $p^{\star}(x) \propto p(x) \exp(r(x))$ -- given a reward function $r$ and pre-trained diffusion oracle for $p$. We provide a fine-grained analysis of the computational tractability of this task for quadratic rewards $r(x) = x^\top A x + b^\top x$. We show that linear-reward tilts are always efficiently sampleable -- a simple result that seems to have gone unnoticed in the literature. We use this as a building block, along with a conceptually new ingredient -- the Hubbard-Stratonovich transform -- to provide an efficient algorithm for sampling from low-rank positive-definite quadratic tilts, i.e. $r(x) = x^\top A x$ where $A$ is positive-definite and of rank $O(1)$. For negative-definite tilts, i.e. $r(x) = - x^\top A x$ where $A$ is positive-definite, we prove that the problem is intractable even if $A$ is of rank 1 (albeit with exponentially-large entries).

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
