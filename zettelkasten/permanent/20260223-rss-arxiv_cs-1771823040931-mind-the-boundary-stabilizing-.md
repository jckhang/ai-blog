---
id: 20260223-rss-arxiv_cs-001-mind-the-boundary-stabilizing-gemini-enterprise-a2
title: Mind the Boundary: Stabilizing Gemini Enterprise A2A via a Cloud Run Hub Across Projects and Accounts
created: 2026-04-06
tags: ["rss","ai_research","auto-import","permanent"]
source: "arXiv.org > Computer Science"
source_url: "https://arxiv.org/abs/2602.17675"
source_type: "article"
content_length: 1619
quality_score: 0.70
---

# Mind the Boundary: Stabilizing Gemini Enterprise A2A via a Cloud Run Hub Across Projects and Accounts

## 来源信息

- **来源**: arXiv.org > Computer Science
- **发布时间**: 见原文
- **原文链接**: https://arxiv.org/abs/2602.17675
- **采集时间**: 2026-04-06

## 核心内容

arXiv:2602.17675v1 Announce Type: new 
Abstract: Enterprise conversational UIs increasingly need to orchestrate heterogeneous backend agents and tools across project and account boundaries in a secure and reproducible way. Starting from Gemini Enterprise Agent-to-Agent (A2A) invocation, we implement an A2A Hub orchestrator on Cloud Run that routes queries to four paths: a public A2A agent deployed in a different project, an IAM-protected Cloud Run A2A agent in a different account, a retrieval-augmented generation path combining Discovery Engine and Vertex AI Search with direct retrieval of source text from Google Cloud Storage, and a general question answering path via Vertex AI. We show that practical interoperability is governed not only by protocol compliance but also by Gemini Enterprise UI constraints and boundary-dependent authentication. Real UI requests arrive as text-only inputs and include empty accepted output mode lists, so mixing structured data into JSON-RPC responses can trigger UI errors. To address this, we enforce a text-only compatibility mode on the JSON-RPC endpoint while separating structured outputs and debugging signals into a REST tool API. On a four-query benchmark spanning expense policy, project management assistance, general knowledge, and incident response deadline extraction, we confirm deterministic routing and stable UI responses. For the retrieval path, granting storage object read permissions enables evidence-backed extraction of the fifteen minute deadline. All experiments are reproducible using the repository snapshot tagged a2a-hub-gemini-ui-stable-paper.

## 关键观点

- 智能体(Agent)系统能够自主执行复杂任务，如SQL探索、CAN总线分析
- 核心主题涉及Boundary:和Stabilizing
- 研究来源: arXiv.org > Computer Science
- 内容质量评分: 0.70

## 深度思考

<!-- 对上述观点的反思、质疑、延伸问题 -->

## 相关链接

- (暂无关联卡片)

---
*RSS 自动采集永久化 - 处理时间: 2026-04-06*
