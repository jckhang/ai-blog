---
title: "Preference Optimization for Review Question Generation Improves Writing Quality"
source: "arxiv-cs-cl RSS"
url: "https://arxiv.org/abs/2602.15849"
date: 2026-02-19T05:00:00.000Z
tags: [rss, arxiv-cs-cl]
status: pending-analysis
---

# Preference Optimization for Review Question Generation Improves Writing Quality

> arXiv:2602.15849v1 Announce Type: new 
Abstract: Peer review relies on substantive, evidence-based questions, yet existing LLM-based approaches often generate surface-level queries, drawing over 50\% of their question tokens from a paper's first page. To bridge this gap, we develop IntelliReward, a novel reward model built from a frozen autoregressive LLM with trainable multi-head transformers over the final 50 token states, which outperforms API-based SFT baselines in predicting expert-level human preferences. By applying Decoupled Clip and Dynamic Sampling Policy Optimization (DAPO) with IntelliReward, we train IntelliAsk, a question-generation model aligned with human standards of effort, evidence, and grounding. We find consistent improvements on reasoning and writing benchmarks, suggesting reviewer-question quality correlates with broader capabilities. Compared to the Qwen3-32B base model, IntelliAsk shows measurable gains across diverse benchmarks, specifically improving performance on reasoning tasks like MuSR (68.3 vs 64.7 Acc) and complex writing evaluations such as WritingBench (8.31 vs 8.07). We release our implementation, expert preference annotations, and the IntelliReward model to provide an automatic evaluation benchmark for grounding, effort, and evidence in LLM-generated review questions.

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
