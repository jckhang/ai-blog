---
title: "Automated Histopathology Report Generation via Pyramidal Feature Extraction and the UNI Foundation Model"
source: "arxiv-cs-ai RSS"
url: "https://arxiv.org/abs/2602.16422"
date: 2026-02-19T05:00:00.000Z
tags: [rss, arxiv-cs-ai]
status: pending-analysis
---

# Automated Histopathology Report Generation via Pyramidal Feature Extraction and the UNI Foundation Model

> arXiv:2602.16422v1 Announce Type: cross 
Abstract: Generating diagnostic text from histopathology whole slide images (WSIs) is challenging due to the gigapixel scale of the input and the requirement for precise, domain specific language. We propose a hierarchical vision language framework that combines a frozen pathology foundation model with a Transformer decoder for report generation. To make WSI processing tractable, we perform multi resolution pyramidal patch selection (downsampling factors 2^3 to 2^6) and remove background and artifacts using Laplacian variance and HSV based criteria. Patch features are extracted with the UNI Vision Transformer and projected to a 6 layer Transformer decoder that generates diagnostic text via cross attention. To better represent biomedical terminology, we tokenize the output using BioGPT. Finally, we add a retrieval based verification step that compares generated reports with a reference corpus using Sentence BERT embeddings; if a high similarity match is found, the generated report is replaced with the retrieved ground truth reference to improve reliability.

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
