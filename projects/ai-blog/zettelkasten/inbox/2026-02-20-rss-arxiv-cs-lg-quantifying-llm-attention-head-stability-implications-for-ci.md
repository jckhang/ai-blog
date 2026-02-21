---
title: "Quantifying LLM Attention-Head Stability: Implications for Circuit Universality"
source: "arxiv-cs-lg RSS"
url: "https://arxiv.org/abs/2602.16740"
date: 2026-02-20T05:00:00.000Z
tags: [rss, arxiv-cs-lg]
status: pending-analysis
---

# Quantifying LLM Attention-Head Stability: Implications for Circuit Universality

> arXiv:2602.16740v1 Announce Type: new 
Abstract: In mechanistic interpretability, recent work scrutinizes transformer "circuits" - sparse, mono or multi layer sub computations, that may reflect human understandable functions. Yet, these network circuits are rarely acid-tested for their stability across different instances of the same deep learning architecture. Without this, it remains unclear whether reported circuits emerge universally across labs or turn out to be idiosyncratic to a particular estimation instance, potentially limiting confidence in safety-critical settings. Here, we systematically study stability across-refits in increasingly complex transformer language models of various sizes. We quantify, layer by layer, how similarly attention heads learn representations across independently initialized training runs. Our rigorous experiments show that (1) middle-layer heads are the least stable yet the most representationally distinct; (2) deeper models exhibit stronger mid-depth divergence; (3) unstable heads in deeper layers become more functionally important than their peers from the same layer; (4) applying weight decay optimization substantially improves attention-head stability across random model initializations; and (5) the residual stream is comparatively stable. Our findings establish the cross-instance robustness of circuits as an essential yet underappreciated prerequisite for scalable oversight, drawing contours around possible white-box monitorability of AI systems.

## Full Content

⚠️ Full content not available (fetch failed).

## Analysis Checklist

- [ ] 阅读全文并提取关键观点
- [ ] 与现有 ZK 笔记建立链接 [[...]]
- [ ] 确定是否转为永久笔记
- [ ] 添加适当的标签和元数据
- [ ] 更新摘要

## Related

- 
