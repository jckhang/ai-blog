---
title: "VDLM: Variable Diffusion LMs via Robust Latent-to-Text Rendering"
source: "arxiv-cs-cl RSS"
url: "https://arxiv.org/abs/2602.15870"
date: 2026-02-19T05:00:00.000Z
tags: [rss, arxiv-cs-cl]
status: pending-analysis
---

# VDLM: Variable Diffusion LMs via Robust Latent-to-Text Rendering

> arXiv:2602.15870v1 Announce Type: new 
Abstract: Autoregressive language models decode left-to-right with irreversible commitments, limiting revision during multi-step reasoning. We propose \textbf{VDLM}, a modular variable diffusion language model that separates semantic planning from text rendering. VDLM applies LLaDA-style masked diffusion over semantic variable embeddings to enable iterative refinement in latent space, then post-trains the planner with trajectory-aware optimization using embedding-space rewards and values, avoiding text decoding inside the RL loop. To convert planned embeddings back to text, we use a \textbf{Vec2Text} renderer and introduce \textbf{embedding perturbations} to robustify decoding under planner noise. Across nine benchmarks spanning general reasoning, math, and code, VDLM is competitive in pre-training and yields substantial post-training improvements on long-form generation tasks, outperforming other baselines. These results highlight the effectiveness of embedding-space post-training and robust latent-to-text rendering for diffusion language modeling.

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
