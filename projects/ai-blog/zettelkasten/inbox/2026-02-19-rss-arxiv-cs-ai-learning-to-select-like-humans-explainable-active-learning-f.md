---
title: "Learning to Select Like Humans: Explainable Active Learning for Medical Imaging"
source: "arxiv-cs-ai RSS"
url: "https://arxiv.org/abs/2602.13308"
date: 2026-02-19T05:00:00.000Z
tags: [rss, arxiv-cs-ai]
status: pending-analysis
---

# Learning to Select Like Humans: Explainable Active Learning for Medical Imaging

> arXiv:2602.13308v2 Announce Type: replace-cross 
Abstract: Medical image analysis requires substantial labeled data for model training, yet expert annotation is expensive and time-consuming. Active learning (AL) addresses this challenge by strategically selecting the most informative samples for the annotation purpose, but traditional methods solely rely on predictive uncertainty while ignoring whether models learn from clinically meaningful features a critical requirement for clinical deployment. We propose an explainability-guided active learning framework that integrates spatial attention alignment into a sample acquisition process. Our approach advocates for a dual-criterion selection strategy combining: (i) classification uncertainty to identify informative examples, and (ii) attention misalignment with radiologist-defined regions-of-interest (ROIs) to target samples where the model focuses on incorrect features. By measuring misalignment between Grad-CAM attention maps and expert annotations using Dice similarity, our acquisition function judiciously identifies samples that enhance both predictive performance and spatial interpretability. We evaluate the framework using three expert-annotated medical imaging datasets, namely, BraTS (MRI brain tumors), VinDr-CXR (chest X-rays), and SIIM-COVID-19 (chest X-rays). Using only 570 strategically selected samples, our explainability-guided approach consistently outperforms random sampling across all the datasets, achieving 77.22% accuracy on BraTS, 52.37% on VinDr-CXR, and 52.66% on SIIM-COVID. Grad-CAM visualizations confirm that the models trained by our dual-criterion selection focus on diagnostically relevant regions, demonstrating that incorporating explanation guidance into sample acquisition yields superior data efficiency while maintaining clinical interpretability.

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
