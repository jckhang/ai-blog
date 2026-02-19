---
title: "Navigating the Deep: End-to-End Extraction on Deep Neural Networks"
source: "arxiv-cs-lg RSS"
url: "https://arxiv.org/abs/2506.17047"
date: 2026-02-19T05:00:00.000Z
tags: [rss, arxiv-cs-lg]
status: pending-analysis
---

# Navigating the Deep: End-to-End Extraction on Deep Neural Networks

> arXiv:2506.17047v2 Announce Type: replace 
Abstract: Neural network model extraction has recently emerged as an important security concern, as adversaries attempt to recover a network's parameters via black-box queries. Carlini et al. proposed in CRYPTO'20 a model extraction approach, consisting of two steps: signature extraction and sign extraction. However, in practice this signature-extraction method is limited to very shallow networks only, and the proposed sign-extraction method is exponential in time. Recently, Canales-Martinez et al. (Eurocrypt'24) proposed a polynomial-time sign-extraction method, but it assumes the corresponding signatures have already been successfully extracted and can fail on so-called low-confidence neurons.
  In this work, we first revisit and refine the signature extraction process by systematically identifying and addressing for the first time critical limitations of Carlini et al.'s signature-extraction method. These limitations include rank deficiency and noise propagation from deeper layers. To overcome these challenges, we propose efficient algorithmic solutions for each of the identified issues. Our approach permits the extraction of much deeper networks than previously possible. In addition, we propose new methods to improve numerical precision in signature extraction, and enhance the sign extraction part by combining two polynomial methods to avoid exponential exhaustive search in the case of low-confidence neurons. This leads to the very first end-to-end model extraction method that runs in polynomial time.
  We validate our attack through extensive experiments on ReLU-based neural networks, demonstrating significant improvements in extraction depth. For instance, our attack extracts consistently at least eight layers of neural networks trained on either the MNIST or CIFAR-10 datasets, while previous works could barely extract the first three layers of networks of similar width.

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
