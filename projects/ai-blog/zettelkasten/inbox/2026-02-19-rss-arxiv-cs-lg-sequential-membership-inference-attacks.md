---
title: "Sequential Membership Inference Attacks"
source: "arxiv-cs-lg RSS"
url: "https://arxiv.org/abs/2602.16596"
date: 2026-02-19T05:00:00.000Z
tags: [rss, arxiv-cs-lg]
status: pending-analysis
---

# Sequential Membership Inference Attacks

> arXiv:2602.16596v1 Announce Type: new 
Abstract: Modern AI models are not static. They go through multiple updates in their lifecycles. Thus, exploiting the model dynamics to create stronger Membership Inference (MI) attacks and tighter privacy audits are timely questions. Though the literature empirically shows that using a sequence of model updates can increase the power of MI attacks, rigorous analysis of the `optimal' MI attacks is limited to static models with infinite samples. Hence, we develop an `optimal' MI attack, SeMI*, that uses the sequence of model updates to identify the presence of a target inserted at a certain update step. For the empirical mean computation, we derive the optimal power of SeMI*, while accessing a finite number of samples with or without privacy. Our results retrieve the existing asymptotic analysis. We observe that having access to the model sequence avoids the dilution of MI signals unlike the existing attacks on the final model, where the MI signal vanishes as training data accumulates. Furthermore, an adversary can use SeMI* to tune both the insertion time and the canary to yield tighter privacy audits. Finally, we conduct experiments across data distributions and models trained or fine-tuned with DP-SGD demonstrating that practical variants of SeMI* lead to tighter privacy audits than the baselines.

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
