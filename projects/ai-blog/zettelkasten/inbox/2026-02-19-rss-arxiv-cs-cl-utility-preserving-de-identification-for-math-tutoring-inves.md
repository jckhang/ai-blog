---
title: "Utility-Preserving De-Identification for Math Tutoring: Investigating Numeric Ambiguity in the MathEd-PII Benchmark Dataset"
source: "arxiv-cs-cl RSS"
url: "https://arxiv.org/abs/2602.16571"
date: 2026-02-19T05:00:00.000Z
tags: [rss, arxiv-cs-cl]
status: pending-analysis
---

# Utility-Preserving De-Identification for Math Tutoring: Investigating Numeric Ambiguity in the MathEd-PII Benchmark Dataset

> arXiv:2602.16571v1 Announce Type: new 
Abstract: Large-scale sharing of dialogue-based data is instrumental for advancing the science of teaching and learning, yet rigorous de-identification remains a major barrier. In mathematics tutoring transcripts, numeric expressions frequently resemble structured identifiers (e.g., dates or IDs), leading generic Personally Identifiable Information (PII) detection systems to over-redact core instructional content and reduce dataset utility. This work asks how PII can be detected in math tutoring transcripts while preserving their educational utility. To address this challenge, we investigate the "numeric ambiguity" problem and introduce MathEd-PII, the first benchmark dataset for PII detection in math tutoring dialogues, created through a human-in-the-loop LLM workflow that audits upstream redactions and generates privacy-preserving surrogates. The dataset contains 1,000 tutoring sessions (115,620 messages; 769,628 tokens) with validated PII annotations. Using a density-based segmentation method, we show that false PII redactions are disproportionately concentrated in math-dense regions, confirming numeric ambiguity as a key failure mode. We then compare four detection strategies: a Presidio baseline and LLM-based approaches with basic, math-aware, and segment-aware prompting. Math-aware prompting substantially improves performance over the baseline (F1: 0.821 vs. 0.379) while reducing numeric false positives, demonstrating that de-identification must incorporate domain context to preserve analytic utility. This work provides both a new benchmark and evidence that utility-preserving de-identification for tutoring data requires domain-aware modeling.

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
