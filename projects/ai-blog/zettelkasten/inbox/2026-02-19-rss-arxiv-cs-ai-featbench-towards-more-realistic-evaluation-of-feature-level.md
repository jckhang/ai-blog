---
title: "FeatBench: Towards More Realistic Evaluation of Feature-level Code Generation"
source: "arxiv-cs-ai RSS"
url: "https://arxiv.org/abs/2509.22237"
date: 2026-02-19T05:00:00.000Z
tags: [rss, arxiv-cs-ai]
status: pending-analysis
---

# FeatBench: Towards More Realistic Evaluation of Feature-level Code Generation

> arXiv:2509.22237v2 Announce Type: replace-cross 
Abstract: Evaluating Large Language Models (LLMs) on repository-level feature implementation is a critical frontier in software engineering. However, establishing a benchmark that faithfully mirrors realistic development scenarios remains a significant challenge. Existing feature-level benchmarks generally suffer from two primary limitations: unrealistic task inputs enriched with code hints and significant data leakage risks due to their static nature. To address these limitations, we propose a new benchmark - FeatBench, which introduces the following advances: (1) Realistic Task Inputs. Task inputs consist solely of natural language requirements, strictly devoid of code hints (e.g., function signatures). This format mirrors realistic software development by requiring agents to independently bridge the gap between abstract user intent and concrete code changes. (2) Evolving Data. FeatBench employs a fully automated pipeline to construct new benchmark versions from the latest repositories, effectively mitigating data contamination. The initial release comprises 157 tasks sourced from 27 actively maintained repositories. We evaluate two state-of-the-art agent frameworks with four leading LLMs on FeatBench. The results reveal that FeatBench poses a significant challenge, with the highest resolved rate reaching only 29.94%. Crucially, our analysis uncovers a prevalent behavioral pattern of aggressive implementation, which leads to "scope creep" and widespread regressions where agents break existing features by diverging from the user's explicit intent. We release FeatBench, our automated pipeline, and all experimental results to facilitate further community research.

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
