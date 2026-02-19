---
title: "PromptGuard: Soft Prompt-Guided Unsafe Content Moderation for Text-to-Image Models"
source: "arxiv-cs-ai RSS"
url: "https://arxiv.org/abs/2501.03544"
date: 2026-02-19T05:00:00.000Z
tags: [rss, arxiv-cs-ai]
status: pending-analysis
---

# PromptGuard: Soft Prompt-Guided Unsafe Content Moderation for Text-to-Image Models

> arXiv:2501.03544v4 Announce Type: replace-cross 
Abstract: Recent text-to-image (T2I) models have exhibited remarkable performance in generating high-quality images from text descriptions. However, these models are vulnerable to misuse, particularly generating not-safe-for-work (NSFW) content, such as sexually explicit, violent, political, and disturbing images, raising serious ethical concerns. In this work, we present PromptGuard, a novel content moderation technique that draws inspiration from the system prompt mechanism in large language models (LLMs) for safety alignment. Unlike LLMs, T2I models lack a direct interface for enforcing behavioral guidelines. Our key idea is to optimize a safety soft prompt that functions as an implicit system prompt within the T2I model's textual embedding space. This universal soft prompt (P*) directly moderates NSFW inputs, enabling safe yet realistic image generation without altering the inference efficiency or requiring proxy models. We further enhance its reliability and helpfulness through a divide-and-conquer strategy, which optimizes category-specific soft prompts and combines them into holistic safety guidance. Extensive experiments across five datasets demonstrate that PromptGuard effectively mitigates NSFW content generation while preserving high-quality benign outputs. PromptGuard achieves 3.8 times faster than prior content moderation methods, surpassing eight state-of-the-art defenses with an optimal unsafe ratio down to 5.84%.

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
