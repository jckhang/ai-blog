---
title: "Optimization Instability in Autonomous Agentic Workflows for Clinical Symptom Detection"
source: "arxiv-cs-ai RSS"
url: "https://arxiv.org/abs/2602.16037"
date: 2026-02-19T05:00:00.000Z
tags: [rss, arxiv-cs-ai]
status: pending-analysis
---

# Optimization Instability in Autonomous Agentic Workflows for Clinical Symptom Detection

> arXiv:2602.16037v1 Announce Type: new 
Abstract: Autonomous agentic workflows that iteratively refine their own behavior hold considerable promise, yet their failure modes remain poorly characterized. We investigate optimization instability, a phenomenon in which continued autonomous improvement paradoxically degrades classifier performance, using Pythia, an open-source framework for automated prompt optimization. Evaluating three clinical symptoms with varying prevalence (shortness of breath at 23%, chest pain at 12%, and Long COVID brain fog at 3%), we observed that validation sensitivity oscillated between 1.0 and 0.0 across iterations, with severity inversely proportional to class prevalence. At 3% prevalence, the system achieved 95% accuracy while detecting zero positive cases, a failure mode obscured by standard evaluation metrics. We evaluated two interventions: a guiding agent that actively redirected optimization, amplifying overfitting rather than correcting it, and a selector agent that retrospectively identified the best-performing iteration successfully prevented catastrophic failure. With selector agent oversight, the system outperformed expert-curated lexicons on brain fog detection by 331% (F1) and chest pain by 7%, despite requiring only a single natural language term as input. These findings characterize a critical failure mode of autonomous AI systems and demonstrate that retrospective selection outperforms active intervention for stabilization in low-prevalence classification tasks.

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
