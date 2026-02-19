---
title: "SurgRAW: Multi-Agent Workflow with Chain of Thought Reasoning for Robotic Surgical Video Analysis"
source: "arxiv-cs-ai RSS"
url: "https://arxiv.org/abs/2503.10265"
date: 2026-02-19T05:00:00.000Z
tags: [rss, arxiv-cs-ai]
status: pending-analysis
---

# SurgRAW: Multi-Agent Workflow with Chain of Thought Reasoning for Robotic Surgical Video Analysis

> arXiv:2503.10265v2 Announce Type: replace 
Abstract: Robotic-assisted surgery (RAS) is central to modern surgery, driving the need for intelligent systems with accurate scene understanding. Most existing surgical AI methods rely on isolated, task-specific models, leading to fragmented pipelines with limited interpretability and no unified understanding of RAS scene. Vision-Language Models (VLMs) offer strong zero-shot reasoning, but struggle with hallucinations, domain gaps and weak task-interdependency modeling. To address the lack of unified data for RAS scene understanding, we introduce SurgCoTBench, the first reasoning-focused benchmark in RAS, covering 14256 QA pairs with frame-level annotations across five major surgical tasks. Building on SurgCoTBench, we propose SurgRAW, a clinically aligned Chain-of-Thought (CoT) driven agentic workflow for zero-shot multi-task reasoning in surgery. SurgRAW employs a hierarchical reasoning workflow where an orchestrator divides surgical scene understanding into two reasoning streams and directs specialized agents to generate task-level reasoning, while higher-level agents capture workflow interdependencies or ground output clinically. Specifically, we propose a panel discussion mechanism to ensure task-specific agents collaborate synergistically and leverage on task interdependencies. Similarly, we incorporate a retrieval-augmented generation module to enrich agents with surgical knowledge and alleviate domain gaps in general VLMs. We design task-specific CoT prompts grounded in surgical domain to ensure clinically aligned reasoning, reduce hallucinations and enhance interpretability. Extensive experiments show that SurgRAW surpasses mainstream VLMs and agentic systems and outperforms a supervised model by 14.61% accuracy. Dataset and code is available at https://github.com/jinlab-imvr/SurgRAW.git .

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
