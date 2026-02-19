---
id: 20260219-rss-001-extrinsic-hallucinations-in-llms
title: Extrinsic Hallucinations in LLMs
created: 2026-02-19
tags: ["rss", "engineering", "auto-import"]
source: "Lilian Weng's Blog"
source_url: "https://lilianweng.github.io/posts/2024-07-07-hallucination/"
---

# Extrinsic Hallucinations in LLMs

&lt;p&gt;Hallucination in large language models usually refers to the model generating unfaithful, fabricated, inconsistent, or nonsensical content. As a term, hallucination has been somewhat generalized to cases when the model makes mistakes. Here, I would like to narrow down the problem of hallucination to cases where the model output is fabricated and &lt;strong&gt;not grounded&lt;/strong&gt; by either the provided context or world knowledge.&lt;/p&gt;
&lt;p&gt;There are two types of hallucination:&lt;/p&gt;
&lt;ol&gt;
&lt;li&gt;In-context hallucination: The model output should be consistent with the source content in context.&lt;/li&gt;
&lt;li&gt;Extrinsic hallucination: The model output should be grounded by the pre-training dataset. However, given the size of the pre-training dataset, it is too expensive to retrieve and identify conflicts per generation. If we consider the pre-training data corpus as a proxy for world knowledge, we essentially try to ensure the model output is factual and verifiable by external world knowledge. Equally importantly, when the model does not know about a fact, it should say so.&lt;/li&gt;
&lt;/ol&gt;
&lt;p&gt;This post focuses on extrinsic hallucination. To avoid hallucination, LLMs need to be (1) factual and (2) acknowledge not knowing the answer when applicable.&lt;/p&gt;

## 来源

- **Feed**: Lilian Weng's Blog
- **链接**: https://lilianweng.github.io/posts/2024-07-07-hallucination/
- **发布时间**: Sun, 07 Jul 2024 00:00:00 +0000
- **采集时间**: 2026-02-19T06:03:40.131Z

## 相关链接

- [[001-zettelkasten-是什么]]

---
*RSS 自动采集 - 请人工审查并补充内容链接*
