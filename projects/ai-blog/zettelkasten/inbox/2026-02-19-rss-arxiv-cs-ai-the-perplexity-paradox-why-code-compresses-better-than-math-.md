---
title: "The Perplexity Paradox: Why Code Compresses Better Than Math in LLM Prompts"
source: "arxiv-cs-ai RSS"
url: "https://arxiv.org/abs/2602.15843"
date: 2026-02-19T05:00:00.000Z
tags: [rss, arxiv-cs-ai]
status: pending-analysis
---

# The Perplexity Paradox: Why Code Compresses Better Than Math in LLM Prompts

> arXiv:2602.15843v1 Announce Type: cross 
Abstract: In "Compress or Route?" (Johnson, 2026), we found that code generation tolerates aggressive prompt compression (r >= 0.6) while chain-of-thought reasoning degrades gradually. That study was limited to HumanEval (164 problems), left the "perplexity paradox" mechanism unvalidated, and provided no adaptive algorithm. This paper addresses all three gaps. First, we validate across six code benchmarks (HumanEval, MBPP, HumanEval+, MultiPL-E) and four reasoning benchmarks (GSM8K, MATH, ARC-Challenge, MMLU-STEM), confirming the compression threshold generalizes across languages and difficulties. Second, we conduct the first per-token perplexity analysis (n=723 tokens), revealing a "perplexity paradox": code syntax tokens are preserved (high perplexity) while numerical values in math problems are pruned despite being task-critical (low perplexity). Signature injection recovers +34 percentage points in pass rate (5.3% to 39.3%; Cohen's h=0.890). Third, we propose TAAC (Task-Aware Adaptive Compression), achieving 22% cost reduction with 96% quality preservation, outperforming fixed-ratio compression by 7%. MBPP validation (n=1,800 trials) confirms systematic variation: 3.6% at r=0.3 to 54.6% at r=1.0.

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
