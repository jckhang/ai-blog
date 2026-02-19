---
title: "Can Vision-Language Models See Squares? Text-Recognition Mediates Spatial Reasoning Across Three Model Families"
source: "arxiv-cs-lg RSS"
url: "https://arxiv.org/abs/2602.15950"
date: 2026-02-19T05:00:00.000Z
tags: [rss, arxiv-cs-lg]
status: pending-analysis
---

# Can Vision-Language Models See Squares? Text-Recognition Mediates Spatial Reasoning Across Three Model Families

> arXiv:2602.15950v1 Announce Type: cross 
Abstract: We present a simple experiment that exposes a fundamental limitation in vision-language models (VLMs): the inability to accurately localize filled cells in binary grids when those cells lack textual identity. We generate fifteen 15x15 grids with varying density (10.7%-41.8% filled cells) and render each as two image types -- text symbols (. and #) and filled squares without gridlines -- then ask three frontier VLMs (Claude Opus, ChatGPT 5.2, and Gemini 3 Thinking) to transcribe them. In the text-symbol condition, Claude and ChatGPT achieve approximately 91% cell accuracy and 84% F1, while Gemini achieves 84% accuracy and 63% F1. In the filled-squares condition, all three models collapse to 60-73% accuracy and 29-39% F1. Critically, all conditions pass through the same visual encoder -- the text symbols are images, not tokenized text. The text-vs-squares F1 gap ranges from 34 to 54 points across models, demonstrating that VLMs behave as if they possess a high-fidelity text-recognition pathway for spatial reasoning that dramatically outperforms their native visual pathway. Each model exhibits a distinct failure mode in the squares condition -- systematic under-counting (Claude), massive over-counting (ChatGPT), and template hallucination (Gemini) -- but all share the same underlying deficit: severely degraded spatial localization for non-textual visual elements.

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
