---
title: "Quecto-V1: Empirical Analysis of 8-bit Quantized Small Language Models for On-Device Legal Retrieval"
source: "arxiv-cs-cl RSS"
url: "https://arxiv.org/abs/2602.16640"
date: 2026-02-19T05:00:00.000Z
tags: [rss, arxiv-cs-cl]
status: pending-analysis
---

# Quecto-V1: Empirical Analysis of 8-bit Quantized Small Language Models for On-Device Legal Retrieval

> arXiv:2602.16640v1 Announce Type: new 
Abstract: The rapid proliferation of Large Language Models (LLMs) has revolutionized Natural Language Processing (NLP) but has simultaneously created a "resource divide." State-of-the-art legal intelligence systems typically rely on massive parameter counts (7B+) and cloud-based inference, rendering them inaccessible to practitioners in resource-constrained environments and posing significant data sovereignty risks. This paper introduces Quecto-V1, a domain-specific Small Language Model (SLM) engineered to democratize access to Indian legal intelligence. Built upon a custom configuration of the GPT-2 architecture (124 million parameters), Quecto-V1 was trained from scratch exclusively on a corpus of Indian statutes, including the Indian Penal Code (IPC), the Code of Criminal Procedure (CrPC), and the Constitution of India. Unlike generalist models, which prioritize broad world knowledge, our approach maximizes "lexical density" within the legal domain. Furthermore, we address the deployment bottleneck by applying post-training 8-bit quantization (GGUF format), compressing the model to a memory footprint of under 150 MB. Our empirical analysis demonstrates that Quecto-V1 achieves high fidelity in retrieving statutory definitions and penal provisions, outperforming general-purpose SLMs in domain-specific exact match tasks while running entirely offline on consumer-grade CPUs. We further present an ablation study showing that 8-bit quantization yields a 74% reduction in model size with less than 3.5% degradation in retrieval accuracy compared to full-precision baselines. These findings suggest that for specialized, high-stakes domains like law, domain-specific training coupled with aggressive quantization offers a viable, privacy-preserving alternative to monolithic cloud models.

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
