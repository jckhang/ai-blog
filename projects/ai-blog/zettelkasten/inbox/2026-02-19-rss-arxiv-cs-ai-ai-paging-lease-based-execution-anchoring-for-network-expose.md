---
title: "AI-Paging: Lease-Based Execution Anchoring for Network-Exposed AI-as-a-Service"
source: "arxiv-cs-ai RSS"
url: "https://arxiv.org/abs/2602.15286"
date: 2026-02-19T05:00:00.000Z
tags: [rss, arxiv-cs-ai]
status: pending-analysis
---

# AI-Paging: Lease-Based Execution Anchoring for Network-Exposed AI-as-a-Service

> arXiv:2602.15286v2 Announce Type: replace-cross 
Abstract: With AI-as-a-Service (AIaaS) now deployed across multiple providers and model tiers, selecting the appropriate model instance at run time is increasingly outside the end user's knowledge and operational control. Accordingly, the 6G service providers are envisioned to play a crucial role in exposing AIaaS in a setting where users submit only an intent while the network helps in the intent-to-model matching (resolution) and execution placement under policy, trust, and Quality of Service (QoS) constraints. The network role becomes to discover candidate execution endpoints and selects a suitable model/anchor under policy and QoS constraints in a process referred here to as AI-paging (by analogy to cellular call paging). In the proposed architecture, AI-paging is a control-plane transaction that resolves an intent into an AI service identity (AISI), a scoped session token (AIST), and an expiring admission lease (COMMIT) that authorizes user-plane steering to a selected AI execution anchor (AEXF) under a QoS binding. AI-Paging enforces two invariants: (i) lease-gated steering (without COMMIT, no steering state is installed) and (ii) make-before-break anchoring to support continuity and reliability of AIaaS services under dynamic network conditions. We prototype AI-Paging using existing control- and user-plane mechanisms (service-based control, QoS flows, and policy-based steering) with no new packet headers, ensuring compatibility with existing 3GPP-based exposure and management architectures, and evaluate transaction latency, relocation interruption, enforcement correctness under lease expiry, and audit-evidence overhead under mobility and failures.

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
