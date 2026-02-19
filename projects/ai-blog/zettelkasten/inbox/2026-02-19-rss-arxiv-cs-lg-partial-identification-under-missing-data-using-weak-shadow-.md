---
title: "Partial Identification under Missing Data Using Weak Shadow Variables from Pretrained Models"
source: "arxiv-cs-lg RSS"
url: "https://arxiv.org/abs/2602.16061"
date: 2026-02-19T05:00:00.000Z
tags: [rss, arxiv-cs-lg]
status: pending-analysis
---

# Partial Identification under Missing Data Using Weak Shadow Variables from Pretrained Models

> arXiv:2602.16061v1 Announce Type: cross 
Abstract: Estimating population quantities such as mean outcomes from user feedback is fundamental to platform evaluation and social science, yet feedback is often missing not at random (MNAR): users with stronger opinions are more likely to respond, so standard estimators are biased and the estimand is not identified without additional assumptions. Existing approaches typically rely on strong parametric assumptions or bespoke auxiliary variables that may be unavailable in practice. In this paper, we develop a partial identification framework in which sharp bounds on the estimand are obtained by solving a pair of linear programs whose constraints encode the observed data structure. This formulation naturally incorporates outcome predictions from pretrained models, including large language models (LLMs), as additional linear constraints that tighten the feasible set. We call these predictions weak shadow variables: they satisfy a conditional independence assumption with respect to missingness but need not meet the completeness conditions required by classical shadow-variable methods. When predictions are sufficiently informative, the bounds collapse to a point, recovering standard identification as a special case. In finite samples, to provide valid coverage of the identified set, we propose a set-expansion estimator that achieves slower-than-$\sqrt{n}$ convergence rate in the set-identified regime and the standard $\sqrt{n}$ rate under point identification. In simulations and semi-synthetic experiments on customer-service dialogues, we find that LLM predictions are often ill-conditioned for classical shadow-variable methods yet remain highly effective in our framework. They shrink identification intervals by 75--83\% while maintaining valid coverage under realistic MNAR mechanisms.

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
