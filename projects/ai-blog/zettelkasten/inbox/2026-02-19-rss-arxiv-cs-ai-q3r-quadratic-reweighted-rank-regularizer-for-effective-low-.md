---
title: "Q3R: Quadratic Reweighted Rank Regularizer for Effective Low-Rank Training"
source: "arxiv-cs-ai RSS"
url: "https://arxiv.org/abs/2511.04485"
date: 2026-02-19T05:00:00.000Z
tags: [rss, arxiv-cs-ai]
status: pending-analysis
---

# Q3R: Quadratic Reweighted Rank Regularizer for Effective Low-Rank Training

> arXiv:2511.04485v2 Announce Type: replace-cross 
Abstract: Parameter-efficient training based on low-rank optimization has become a highly successful tool for fine-tuning large deep learning models. However, these methods often fail for low-rank pre-training, where simultaneously maintaining low-rank weight structure and optimizing the task objective remains challenging. We propose the $\textit{Quadratic Reweighted Rank Regularizer}$ ($\texttt{Q3R}$), which leads to a novel low-rank-inducing training strategy inspired by the Iteratively Reweighted Least Squares (IRLS) framework. $\texttt{Q3R}$ is based on a quadratic regularizer term that majorizes a smoothed log-determinant rank surrogate. Unlike other low-rank training techniques, $\texttt{Q3R}$ can train weight matrices to prescribed low target ranks while achieving predictive performance comparable to dense models, with small computational overhead and full compatibility with existing architectures. For example, we demonstrate a $\texttt{Q3R}$-regularized ViT-Tiny experiment where truncating the model to $60\%$ and $80\%$ of its parameters results in only minor absolute accuracy drops of $1.3\%$ and $4\%$, respectively, on CIFAR-10. We confirm the efficacy of $\texttt{Q3R}$ on Transformers across both vision and language tasks, including low-rank fine-tuning.

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
