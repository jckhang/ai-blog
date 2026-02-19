---
title: "Reinforcement Unlearning via Group Relative Policy Optimization"
source: "arxiv-cs-lg RSS"
url: "https://arxiv.org/abs/2601.20568"
date: 2026-02-19T05:00:00.000Z
tags: [rss, arxiv-cs-lg]
status: pending-analysis
---

# Reinforcement Unlearning via Group Relative Policy Optimization

> arXiv:2601.20568v2 Announce Type: replace 
Abstract: During pretraining, LLMs inadvertently memorize sensitive or copyrighted data, posing significant compliance challenges under legal frameworks like the GDPR and the EU AI Act. Fulfilling these mandates demands techniques that can remove information from a deployed model without retraining from scratch. Existing unlearning approaches attempt to address this need, but often leak the very data they aim to erase, sacrifice fluency and robustness, or depend on costly external reward models. We introduce PURGE (Policy Unlearning through Relative Group Erasure), a novel method grounded in the Group Relative Policy Optimization framework that formulates unlearning as a verifiable problem. PURGE uses an intrinsic reward signal that penalizes any mention of forbidden concepts, allowing safe and consistent unlearning. Our approach achieves up to x46 lower token usage per target than state-of-the-art methods, while improving fluency by +5.48% and adversarial robustness by +12.02% over the base model. Extensive evaluation on the Real World Knowledge Unlearning (RWKU) benchmark shows that PURGE reaches 11% unlearning effectiveness while preserving 98% of original utility. PURGE shows that framing LLM unlearning as a verifiable task enables more reliable, efficient, and scalable forgetting, suggesting a promising new direction for unlearning research that combines theoretical guarantees, improved safety, and practical deployment efficiency.

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
