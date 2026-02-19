---
title: "ReLoop: Structured Modeling and Behavioral Verification for Reliable LLM-Based Optimization"
source: "arxiv-cs-ai RSS"
url: "https://arxiv.org/abs/2602.15983"
date: 2026-02-19T05:00:00.000Z
tags: [rss, arxiv-cs-ai]
status: pending-analysis
---

# ReLoop: Structured Modeling and Behavioral Verification for Reliable LLM-Based Optimization

> arXiv:2602.15983v1 Announce Type: cross 
Abstract: Large language models (LLMs) can translate natural language into optimization code, but silent failures pose a critical risk: code that executes and returns solver-feasible solutions may encode semantically incorrect formulations, creating a feasibility-correctness gap of up to 90 percentage points on compositional problems. We introduce ReLoop, addressing silent failures from two complementary directions. Structured generation decomposes code production into a four-stage reasoning chain (understand, formalize, synthesize, verify) that mirrors expert modeling practice, with explicit variable-type reasoning and self-verification to prevent formulation errors at their source. Behavioral verification detects errors that survive generation by testing whether the formulation responds correctly to solver-based parameter perturbation, without requiring ground truth -- an external semantic signal that bypasses the self-consistency problem inherent in LLM-based code review. The two mechanisms are complementary: structured generation dominates on complex compositional problems, while behavioral verification becomes the largest single contributor on problems with localized formulation defects. Together with execution recovery via IIS-enhanced diagnostics, ReLoop raises correctness from 22.6% to 31.1% and execution from 72.1% to 100.0% on the strongest model, with consistent gains across five models spanning three paradigms (foundation, SFT, RL) and three benchmarks. We additionally release RetailOpt-190, 190 compositional retail optimization scenarios targeting the multi-constraint interactions where LLMs most frequently fail.

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
