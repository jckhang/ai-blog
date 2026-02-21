---
id: 20260219-rss-lilian_weng-001-llm-powered-autonomous-agents
title: LLM Powered Autonomous Agents
created: 2026-02-21
tags: ["rss","engineering","auto-import","permanent"]
source: "Lilian Weng's Blog"
source_url: "https://lilianweng.github.io/posts/2023-06-23-agent/"
source_type: "article"
content_length: 2050
quality_score: 0.85
---

# LLM Powered Autonomous Agents

## 来源信息

- **来源**: Lilian Weng's Blog
- **发布时间**: 见原文
- **原文链接**: https://lilianweng.github.io/posts/2023-06-23-agent/
- **采集时间**: 2026-02-21

## 核心内容

Building agents with LLM (large language model) as its core controller is a cool concept. Several proof-of-concepts demos, such as [AutoGPT](https://github.com/Significant-Gravitas/Auto-GPT), [GPT-Engineer](https://github.com/AntonOsika/gpt-engineer) and [BabyAGI](https://github.com/yoheinakajima/babyagi), serve as inspiring examples. The potentiality of LLM extends beyond generating well-written copies, stories, essays and programs; it can be framed as a powerful general problem solver.

# Agent System Overview

In a LLM-powered autonomous agent system, LLM functions as the agent&rsquo;s brain, complemented by several key components:

<ul>
- **Planning**
<ul>
<li>Subgoal and decomposition: The agent breaks down large tasks into smaller, manageable subgoals, enabling efficient handling of complex tasks.

- Reflection and refinement: The agent can do self-criticism and self-reflection over past actions, learn from mistakes and refine them for future steps, thereby improving the quality of final results.

</ul>
</li>
- **Memory**
<ul>
<li>Short-term memory: I would consider all the in-context learning (See [Prompt Engineering](https://lilianweng.github.io/posts/2023-03-15-prompt-engineering/)) as utilizing short-term memory of the model to learn.

- Long-term memory: This provides the agent with the capability to retain and recall (infinite) information over extended periods, often by leveraging an external vector store and fast retrieval.

</ul>
</li>
- **Tool use**
<ul>
<li>The agent learns to call external APIs for extra information that is missing from the model weights (often hard to change after pre-training), including current information, code execution capability, access to proprietary information sources and more.

</ul>
</li>
</ul>
<figure>
	<img src="agent-overview.png" style="width: 100%;"  />
	<figcaption>Overview of a LLM-powered autonomous agent system.</figcaption>
</figure>
# Component One: Planning

A complicated task usually involves many steps. An agent needs to know what they are and plan ahead.

## 关键观点

- 核心主题涉及Powered和Autonomous
- 研究来源: Lilian Weng's Blog
- 内容质量评分: 0.85

## 深度思考

<!-- 对上述观点的反思、质疑、延伸问题 -->

## 相关链接

- [[016-llm-research-automation]]
- [[017-深度研究工具链]]
- [[018-研究扫描自动化的ZK集成策略]]

---
*RSS 自动采集永久化 - 处理时间: 2026-02-21*
