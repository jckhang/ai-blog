---
id: 20260219-rss-lilian_weng-001-extrinsic-hallucinations-in-llms
title: Extrinsic Hallucinations in LLMs
created: 2026-02-21
tags: ["rss","engineering","auto-import","permanent"]
source: "Lilian Weng's Blog"
source_url: "https://lilianweng.github.io/posts/2024-07-07-hallucination/"
source_type: "article"
content_length: 1203
quality_score: 0.70
---

# Extrinsic Hallucinations in LLMs

## 来源信息

- **来源**: Lilian Weng's Blog
- **发布时间**: 见原文
- **原文链接**: https://lilianweng.github.io/posts/2024-07-07-hallucination/
- **采集时间**: 2026-02-21

## 核心内容

Hallucination in large language models usually refers to the model generating unfaithful, fabricated, inconsistent, or nonsensical content. As a term, hallucination has been somewhat generalized to cases when the model makes mistakes. Here, I would like to narrow down the problem of hallucination to cases where the model output is fabricated and **not grounded** by either the provided context or world knowledge.

There are two types of hallucination:

<ol>
- In-context hallucination: The model output should be consistent with the source content in context.

- Extrinsic hallucination: The model output should be grounded by the pre-training dataset. However, given the size of the pre-training dataset, it is too expensive to retrieve and identify conflicts per generation. If we consider the pre-training data corpus as a proxy for world knowledge, we essentially try to ensure the model output is factual and verifiable by external world knowledge. Equally importantly, when the model does not know about a fact, it should say so.

</ol>
This post focuses on extrinsic hallucination. To avoid hallucination, LLMs need to be (1) factual and (2) acknowledge not knowing the answer when applicable.

## 关键观点

- 核心主题涉及Extrinsic和Hallucinations
- 研究来源: Lilian Weng's Blog
- 内容质量评分: 0.70

## 深度思考

<!-- 对上述观点的反思、质疑、延伸问题 -->

## 相关链接

- [[016-llm-research-automation]]
- [[017-深度研究工具链]]
- [[018-研究扫描自动化的ZK集成策略]]

---
*RSS 自动采集永久化 - 处理时间: 2026-02-21*
