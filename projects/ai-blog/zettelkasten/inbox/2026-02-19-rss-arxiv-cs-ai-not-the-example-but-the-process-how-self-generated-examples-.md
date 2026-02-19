---
title: "Not the Example, but the Process: How Self-Generated Examples Enhance LLM Reasoning"
source: "arxiv-cs-ai RSS"
url: "https://arxiv.org/abs/2602.15863"
date: 2026-02-19T05:00:00.000Z
tags: [rss, arxiv-cs-ai]
status: pending-analysis
---

# Not the Example, but the Process: How Self-Generated Examples Enhance LLM Reasoning

> arXiv:2602.15863v1 Announce Type: cross 
Abstract: Recent studies have shown that Large Language Models (LLMs) can improve their reasoning performance through self-generated few-shot examples, achieving results comparable to manually curated in-context examples. However, the underlying mechanism behind these gains remains unclear, making it hard to decide when and how to apply the technique effectively. In this work, we argue that the key benefit arises not from the generated examples themselves but from the act of creating them. To validate this, on reasoning-intensive tasks across diverse LLM architectures, we systematically evaluate three prompting strategies for in-context learning: (1) Zero-shot prompting; (2) Integrated prompting, where LLMs create and solve problems within a single, unified prompt; and (3) Decoupled prompting, where self-generated examples are reused as in-context examples, but the context of their creation itself is excluded. We conduct experiments across five widely used model architectures, demonstrating that Integrated prompting consistently outperforms both Zero-shot and Decoupled prompting. In contrast, Decoupled prompting offers only marginal gains over Zero-shot. Further, for a more in-depth analysis, we conduct an attention analysis and observe significant differences in attention patterns between Integrated and Decoupled prompting. These findings suggest that the advantage of self-generation prompting comes from the process of problem creation, not the examples themselves, providing valuable insights for designing more effective prompting strategies.

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
