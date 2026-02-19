---
title: "High-Fidelity Network Management for Federated AI-as-a-Service: Cross-Domain Orchestration"
source: "arxiv-cs-ai RSS"
url: "https://arxiv.org/abs/2602.15281"
date: 2026-02-19T05:00:00.000Z
tags: [rss, arxiv-cs-ai]
status: pending-analysis
---

# High-Fidelity Network Management for Federated AI-as-a-Service: Cross-Domain Orchestration

> arXiv:2602.15281v2 Announce Type: replace-cross 
Abstract: To support the emergence of AI-as-a-Service (AIaaS), communication service providers (CSPs) are on the verge of a radical transformation-from pure connectivity providers to AIaaS a managed network service (control-and-orchestration plane that exposes AI models). In this model, the CSP is responsible not only for transport/communications, but also for intent-to-model resolution and joint network-compute orchestration, i.e., reliable and timely end-to-end delivery. The resulting end-to-end AIaaS service thus becomes governed by communications impairments (delay, loss) and inference impairments (latency, error). A central open problem is an operational AIaaS control-and-orchestration framework that enforces high fidelity, particularly under multi-domain federation. This paper introduces an assurance-oriented AIaaS management plane based on Tail-Risk Envelopes (TREs): signed, composable per-domain descriptors that combine deterministic guardrails with stochastic rate-latency-impairment models. Using stochastic network calculus, we derive bounds on end-to-end delay violation probabilities across tandem domains and obtain an optimization-ready risk-budget decomposition. We show that tenant-level reservations prevent bursty traffic from inflating tail latency under TRE contracts. An auditing layer then uses runtime telemetry to estimate extreme-percentile performance, quantify uncertainty, and attribute tail-risk to each domain for accountability. Packet-level Monte-Carlo simulations demonstrate improved p99.9 compliance under overload via admission control and robust tenant isolation under correlated burstiness.

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
