---
title: "Scaling Open Discrete Audio Foundation Models with Interleaved Semantic, Acoustic, and Text Tokens"
source: "arxiv-cs-cl RSS"
url: "https://arxiv.org/abs/2602.16687"
date: 2026-02-19T05:00:00.000Z
tags: [rss, arxiv-cs-cl]
status: pending-analysis
---

# Scaling Open Discrete Audio Foundation Models with Interleaved Semantic, Acoustic, and Text Tokens

> arXiv:2602.16687v1 Announce Type: cross 
Abstract: Current audio language models are predominantly text-first, either extending pre-trained text LLM backbones or relying on semantic-only audio tokens, limiting general audio modeling. This paper presents a systematic empirical study of native audio foundation models that apply next-token prediction to audio at scale, jointly modeling semantic content, acoustic details, and text to support both general audio generation and cross-modal capabilities. We provide comprehensive empirical insights for building such models: (1) We systematically investigate design choices -- data sources, text mixture ratios, and token composition -- establishing a validated training recipe. (2) We conduct the first scaling law study for discrete audio models via IsoFLOP analysis on 64 models spanning $3{\times}10^{18}$ to $3{\times}10^{20}$ FLOPs, finding that optimal data grows 1.6$\times$ faster than optimal model size. (3) We apply these lessons to train SODA (Scaling Open Discrete Audio), a suite of models from 135M to 4B parameters on 500B tokens, comparing against our scaling predictions and existing models. SODA serves as a flexible backbone for diverse audio/text tasks -- we demonstrate this by fine-tuning for voice-preserving speech-to-speech translation, using the same unified architecture.

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
