---
title: "Building Safe and Deployable Clinical Natural Language Processing under Temporal Leakage Constraints"
source: "arxiv-cs-lg RSS"
url: "https://arxiv.org/abs/2602.15852"
date: 2026-02-19T05:00:00.000Z
tags: [rss, arxiv-cs-lg]
status: pending-analysis
---

# Building Safe and Deployable Clinical Natural Language Processing under Temporal Leakage Constraints

> arXiv:2602.15852v1 Announce Type: cross 
Abstract: Clinical natural language processing (NLP) models have shown promise for supporting hospital discharge planning by leveraging narrative clinical documentation. However, note-based models are particularly vulnerable to temporal and lexical leakage, where documentation artifacts encode future clinical decisions and inflate apparent predictive performance. Such behavior poses substantial risks for real-world deployment, where overconfident or temporally invalid predictions can disrupt clinical workflows and compromise patient safety. This study focuses on system-level design choices required to build safe and deployable clinical NLP under temporal leakage constraints. We present a lightweight auditing pipeline that integrates interpretability into the model development process to identify and suppress leakage-prone signals prior to final training. Using next-day discharge prediction after elective spine surgery as a case study, we evaluate how auditing affects predictive behavior, calibration, and safety-relevant trade-offs. Results show that audited models exhibit more conservative and better-calibrated probability estimates, with reduced reliance on discharge-related lexical cues. These findings emphasize that deployment-ready clinical NLP systems should prioritize temporal validity, calibration, and behavioral robustness over optimistic performance.

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
