---
title: "From Tool Orchestration to Code Execution: A Study of MCP Design Choices"
source: "arxiv-cs-ai RSS"
url: "https://arxiv.org/abs/2602.15945"
date: 2026-02-19T05:00:00.000Z
tags: [rss, arxiv-cs-ai]
status: pending-analysis
---

# From Tool Orchestration to Code Execution: A Study of MCP Design Choices

> arXiv:2602.15945v1 Announce Type: cross 
Abstract: Model Context Protocols (MCPs) provide a unified platform for agent systems to discover, select, and orchestrate tools across heterogeneous execution environments. As MCP-based systems scale to incorporate larger tool catalogs and multiple concurrently connected MCP servers, traditional tool-by-tool invocation increases coordination overhead, fragments state management, and limits support for wide-context operations. To address these scalability challenges, recent MCP designs have incorporated code execution as a first-class capability, an approach called Code Execution MCP (CE-MCP). This enables agents to consolidate complex workflows, such as SQL querying, file analysis, and multi-step data transformations, into a single program that executes within an isolated runtime environment. In this work, we formalize the architectural distinction between context-coupled (traditional) and context-decoupled (CE-MCP) models, analyzing their fundamental scalability trade-offs. Using the MCP-Bench framework across 10 representative servers, we empirically evaluate task behavior, tool utilization patterns, execution latency, and protocol efficiency as the scale of connected MCP servers and available tools increases, demonstrating that while CE-MCP significantly reduces token usage and execution latency, it introduces a vastly expanded attack surface. We address this security gap by applying the MAESTRO framework, identifying sixteen attack classes across five execution phases-including specific code execution threats such as exception-mediated code injection and unsafe capability synthesis. We validate these vulnerabilities through adversarial scenarios across multiple LLMs and propose a layered defense architecture comprising containerized sandboxing and semantic gating. Our findings provide a rigorous roadmap for balancing scalability and security in production-ready executable agent workflows.

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
