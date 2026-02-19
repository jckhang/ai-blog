---
title: "CaveAgent: Transforming LLMs into Stateful Runtime Operators"
source: "arxiv-cs-ai RSS"
url: "https://arxiv.org/abs/2601.01569"
date: 2026-02-19T05:00:00.000Z
tags: [rss, arxiv-cs-ai]
status: pending-analysis
---

# CaveAgent: Transforming LLMs into Stateful Runtime Operators

> arXiv:2601.01569v2 Announce Type: replace 
Abstract: LLM-based agents are increasingly capable of complex task execution, yet current agentic systems remain constrained by text-centric paradigms that struggle with long-horizon tasks due to fragile multi-turn dependencies and context drift. We present CaveAgent, a framework that shifts tool use from ``LLM-as-Text-Generator'' to ``LLM-as-Runtime-Operator.'' CaveAgent introduces a dual-stream architecture that inverts the conventional paradigm: rather than treating the LLM's text context as the primary workspace with tools as auxiliary, CaveAgent elevates the persistent Python runtime as the central locus of state, with a lightweight semantic stream serving as its orchestrator. Beyond leveraging code generation to resolve interdependent sub-tasks (e.g., loops, conditionals) in a single step, CaveAgent introduces \textit{Stateful Runtime Management}: it injects, manipulates, and retrieves complex Python objects (e.g., DataFrames, database connections) that persist across turns, unlike existing code-based approaches that remain text-bound. CaveAgent further provides a runtime-integrated skill management system that extends the Agent Skills open standard, enabling ecosystem interoperability through executable skill injections. This persistence mechanism serves as a high-fidelity external memory that reduces context drift in multi-turn interactions and preserves processed data for downstream applications without information loss. Evaluations show consistent improvement across challenging benchmarks, enabling CaveAgent to handle data scales that cause context overflow in both JSON-based and code-based agents. The accessible runtime state further provides programmatically verifiable feedback, enabling automated evaluation and reward signal generation without human annotation and establishing a structural foundation for future research in Reinforcement Learning with Verifiable Rewards (RLVR).

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
