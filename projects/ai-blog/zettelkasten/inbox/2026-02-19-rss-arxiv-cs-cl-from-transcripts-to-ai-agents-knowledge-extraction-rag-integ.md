---
title: "From Transcripts to AI Agents: Knowledge Extraction, RAG Integration, and Robust Evaluation of Conversational AI Assistants"
source: "arxiv-cs-cl RSS"
url: "https://arxiv.org/abs/2602.15859"
date: 2026-02-19T05:00:00.000Z
tags: [rss, arxiv-cs-cl]
status: pending-analysis
---

# From Transcripts to AI Agents: Knowledge Extraction, RAG Integration, and Robust Evaluation of Conversational AI Assistants

> arXiv:2602.15859v1 Announce Type: new 
Abstract: Building reliable conversational AI assistants for customer-facing industries remains challenging due to noisy conversational data, fragmented knowledge, and the requirement for accurate human hand-off - particularly in domains that depend heavily on real-time information. This paper presents an end-to-end framework for constructing and evaluating a conversational AI assistant directly from historical call transcripts. Incoming transcripts are first graded using a simplified adaptation of the PIPA framework, focusing on observation alignment and appropriate response behavior, and are filtered to retain only high-quality interactions exhibiting coherent flow and effective human agent responses. Structured knowledge is then extracted from curated transcripts using large language models (LLMs) and deployed as the sole grounding source in a Retrieval-Augmented Generation (RAG) pipeline. Assistant behavior is governed through systematic prompt tuning, progressing from monolithic prompts to lean, modular, and governed designs that ensure consistency, safety, and controllable execution. Evaluation is conducted using a transcript-grounded user simulator, enabling quantitative measurement of call coverage, factual accuracy, and human escalation behavior. Additional red teaming assesses robustness against prompt injection, out-of-scope, and out-of-context attacks. Experiments are conducted in the Real Estate and Specialist Recruitment domains, which are intentionally challenging and currently suboptimal for automation due to their reliance on real-time data. Despite these constraints, the assistant autonomously handles approximately 30 percents of calls, achieves near-perfect factual accuracy and rejection behavior, and demonstrates strong robustness under adversarial testing.

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
